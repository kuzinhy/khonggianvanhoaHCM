import type { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'node:crypto';

export type UserRole = 'viewer' | 'editor' | 'verifier' | 'approver' | 'admin';

export interface ApiActor {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  emailVerified: boolean;
  provider: 'session' | 'guest';
}

declare global {
  namespace Express {
    interface Request {
      apiActor?: ApiActor;
      authUser?: ApiActor;
      user?: ApiActor;
      rawBody?: Buffer;
    }
  }
}

// Định nghĩa các nhóm quyền chuẩn
export const EDITOR_ROLES: UserRole[] = ['editor', 'verifier', 'approver', 'admin'];
export const VERIFIER_ROLES: UserRole[] = ['verifier', 'approver', 'admin'];
export const APPROVER_ROLES: UserRole[] = ['approver', 'admin'];
export const ADMIN_ROLES: UserRole[] = ['admin'];

// Khách vãng lai mặc định (Strict Guest Actor)
export const GUEST_ACTOR: ApiActor = {
  uid: 'guest',
  email: '',
  name: 'Khách tham quan',
  role: 'viewer',
  emailVerified: false,
  provider: 'guest',
};

// Kho tài khoản máy chủ quản lý (Server-Managed Account Store)
// Trong môi trường quản trị thực, mật khẩu được băm và kiểm tra tại máy chủ
export interface ManagedAccount {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string; // SHA-256 with salt
  isActive: boolean;
}

const SALT = 'HCM_SPACE_AUTH_SALT_2026_TDM';

function hashPassword(pass: string): string {
  return crypto.createHash('sha256').update(pass + SALT).digest('hex');
}

export const MANAGED_ACCOUNTS: ManagedAccount[] = [
  {
    uid: 'acc_editor_01',
    email: 'editor@tuyengiao.hcm.gov.vn',
    name: 'Cán bộ Biên tập Tuyên giáo',
    role: 'editor',
    passwordHash: hashPassword('Editor@2026'),
    isActive: true,
  },
  {
    uid: 'acc_verifier_01',
    email: 'verifier@tuyengiao.hcm.gov.vn',
    name: 'Chuyên gia Thẩm định Lịch sử',
    role: 'verifier',
    passwordHash: hashPassword('Verifier@2026'),
    isActive: true,
  },
  {
    uid: 'acc_approver_01',
    email: 'approver@tuyengiao.hcm.gov.vn',
    name: 'Ban Thường trực Đảng ủy',
    role: 'approver',
    passwordHash: hashPassword('Approver@2026'),
    isActive: true,
  },
  {
    uid: 'acc_admin_01',
    email: 'admin@tuyengiao.hcm.gov.vn',
    name: 'Quản trị viên Hệ thống Số',
    role: 'admin',
    passwordHash: hashPassword('Admin@HCM2026'),
    isActive: true,
  },
];

// Server Session Token Cache (Token -> ApiActor)
interface ActiveSession {
  token: string;
  actor: ApiActor;
  createdAt: number;
  expiresAt: number;
}

const activeSessions = new Map<string, ActiveSession>();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 giờ

export function authenticateUser(email: string, pass: string): { token: string; actor: ApiActor } | null {
  const normEmail = email.trim().toLowerCase();
  const acc = MANAGED_ACCOUNTS.find((a) => a.email.toLowerCase() === normEmail && a.isActive);
  if (!acc) return null;

  const inputHash = hashPassword(pass);
  if (acc.passwordHash !== inputHash) return null;

  const actor: ApiActor = {
    uid: acc.uid,
    email: acc.email,
    name: acc.name,
    role: acc.role,
    emailVerified: true,
    provider: 'session',
  };

  const token = 'hcm_sec_' + crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  activeSessions.set(token, {
    token,
    actor,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  });

  return { token, actor };
}

export function revokeSession(token: string): void {
  activeSessions.delete(token);
}

/**
 * Xác minh danh tính tuyệt đối từ máy chủ.
 * BẢO MẬT: TUYỆT ĐỐI KHÔNG tin cậy các trường tự khai báo từ trình duyệt (như x-user-role, x-user-id).
 */
export function getEffectiveActor(req: Request): ApiActor {
  if (req.apiActor) return req.apiActor;

  // Trích xuất Bearer token từ Authorization header
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    const session = activeSessions.get(token);
    if (session) {
      if (Date.now() < session.expiresAt) {
        req.apiActor = session.actor;
        req.authUser = session.actor;
        req.user = session.actor;
        return session.actor;
      } else {
        // Hết hạn
        activeSessions.delete(token);
      }
    }
  }

  // Mặc định hoàn toàn là khách vãng lai (không cấp quyền)
  const guest = { ...GUEST_ACTOR };
  req.apiActor = guest;
  req.authUser = guest;
  req.user = guest;
  return guest;
}

/**
 * Middleware kiểm tra quyền truy cập theo vai trò.
 * BẢO VỆ CHẶT CHẼ:
 * - Khách không đăng nhập hoặc thiếu quyền BỊ TỪ CHỐI THỰC SỰ (401 / 403).
 * - Không cho phép cơ chế dev bypass quyền hạn trong bất kỳ môi trường nào.
 */
export const requireApiRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const actor = getEffectiveActor(req);

    // Nếu endpoint mở cho 'viewer' và yêu cầu vai trò cho phép viewer
    const permitsViewer = allowedRoles.some((r) => r.toLowerCase() === 'viewer');

    if (allowedRoles.length > 0) {
      const match = allowedRoles.some((r) => r.toLowerCase() === actor.role.toLowerCase());

      if (!match) {
        // Nếu là khách chưa đăng nhập cố tình gọi endpoint nội bộ
        if (actor.role === 'viewer' && !permitsViewer) {
          return res.status(401).json({
            success: false,
            error: 'Yêu cầu đăng nhập tài khoản quản trị để thực hiện thao tác này.',
            code: 'UNAUTHENTICATED',
          });
        }

        // Đã đăng nhập nhưng quyền hạn không đủ
        return res.status(403).json({
          success: false,
          error: `Truy cập bị từ chối: Thao tác này yêu cầu quyền hạn [${allowedRoles.join(', ')}]. Vai trò hiện tại của bạn là '${actor.role}'.`,
          code: 'FORBIDDEN',
        });
      }
    }

    next();
  };
};

/**
 * Ghi nhật ký thao tác quản trị an toàn (Audit Log)
 * Không ghi mật khẩu, mã bí mật hoặc dữ liệu cá nhân không cần thiết.
 */
export function sanitizeAuditPayload(data: any): string {
  if (!data || typeof data !== 'object') return '';
  const sanitized = { ...data };
  // Xóa các trường nhạy cảm
  delete sanitized.password;
  delete sanitized.passwordHash;
  delete sanitized.token;
  delete sanitized.secret;
  delete sanitized.authorization;
  delete sanitized.idToken;
  try {
    const str = JSON.stringify(sanitized);
    return str.length > 500 ? str.slice(0, 500) + '...' : str;
  } catch {
    return '[Không thể tuần tự hóa]';
  }
}
