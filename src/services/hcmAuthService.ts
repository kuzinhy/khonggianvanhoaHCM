import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebase';
import type { CurrentUser } from '../AppContext';

export interface AuthResult {
  success: boolean;
  user?: CurrentUser;
  error?: string;
  errorCode?: string;
  needsConsoleSetup?: boolean;
}

/**
 * Định dạng thông tin từ tài khoản Google Firebase Auth thành CurrentUser chuẩn
 */
export function formatFirebaseUser(fbUser: FirebaseUser): CurrentUser {
  const cleanId = `google-${fbUser.uid}`;
  let resumeData: any = {};
  try {
    const savedResume = localStorage.getItem(`hcm_citizen_resume_${cleanId}`);
    if (savedResume) resumeData = JSON.parse(savedResume);
  } catch {}

  const displayName =
    fbUser.displayName ||
    (fbUser.email ? fbUser.email.split('@')[0] : 'Công dân Google');

  return {
    id: cleanId,
    name: displayName,
    email: fbUser.email || undefined,
    photoURL: fbUser.photoURL || undefined,
    role: 'CITIZEN',
    unit: 'Công dân Không gian Văn hóa HCM (Google)',
    phone: fbUser.phoneNumber || '',
    khuPho: resumeData.khuPho || 'Cư dân',
    affiliation: resumeData.affiliation || 'Nhân dân',
    registeredAt: resumeData.registeredAt || new Date().toISOString(),
    lastVisitedSection: resumeData.lastVisitedSection || 'BIO',
    lastVisitedStageId: resumeData.lastVisitedStageId || 'stage_1_tuoitho',
    lastVisitedTitle:
      resumeData.lastVisitedTitle ||
      'Chặng 1: Thời niên thiếu & Quê hương Nam Đàn (1890 – 1911)',
    lastVisitedAt: new Date().toISOString(),
    completedStages: resumeData.completedStages || [],
    studyTimeMinutes: resumeData.studyTimeMinutes || 0,
    quizScores: resumeData.quizScores || [],
    memorizedQuotes: resumeData.memorizedQuotes || [],
    savedExhibits: resumeData.savedExhibits || [],
    completedTours: resumeData.completedTours || [],
  };
}

/**
 * Đăng nhập chuẩn bằng Google OAuth Popup (Firebase Auth)
 */
export async function loginWithGoogle(): Promise<AuthResult> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const loggedUser = formatFirebaseUser(result.user);

    try {
      localStorage.setItem('hcm_logged_user', JSON.stringify(loggedUser));
    } catch {}

    return { success: true, user: loggedUser };
  } catch (error: any) {
    const code = error?.code || '';
    const message = error?.message || 'Đăng nhập Google không thành công.';

    // Người dùng chủ động đóng popup
    if (
      code === 'auth/popup-closed-by-user' ||
      code === 'auth/cancelled-popup-request'
    ) {
      return {
        success: false,
        error: 'Đã đóng cửa sổ đăng nhập Google.',
        errorCode: code,
      };
    }

    if (code === 'auth/popup-blocked') {
      return {
        success: false,
        error:
          'Trình duyệt đã chặn cửa sổ bật lên (popup). Vui lòng cho phép popup để đăng nhập Google.',
        errorCode: code,
      };
    }

    if (code === 'auth/unauthorized-domain') {
      return {
        success: false,
        error:
          'Tên miền hiện tại (localhost) chưa được cấp quyền trong Firebase Console (Authentication > Settings > Authorized domains).',
        errorCode: code,
        needsConsoleSetup: true,
      };
    }

    if (code === 'auth/operation-not-allowed') {
      return {
        success: false,
        error:
          'Dự án Firebase chưa bật nhà cung cấp Google (Google Sign-In Provider trong Firebase Console).',
        errorCode: code,
        needsConsoleSetup: true,
      };
    }

    return {
      success: false,
      error: `Lỗi xác thực Google: ${message} (${code})`,
      errorCode: code,
    };
  }
}

/**
 * Đăng nhập nhanh bằng địa chỉ Gmail (cơ chế hỗ trợ dự phòng linh hoạt)
 */
export function loginWithQuickGmail(email: string, name?: string): CurrentUser {
  const cleanEmail = email.trim();
  const username = cleanEmail.split('@')[0];
  const cleanId = `gmail-${username.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  let resumeData: any = {};
  try {
    const savedResume = localStorage.getItem(`hcm_citizen_resume_${cleanId}`);
    if (savedResume) resumeData = JSON.parse(savedResume);
  } catch {}

  const formattedName =
    name ||
    username
      .replace(/[._]/g, ' ')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') ||
    'Công dân Gmail';

  const loggedUser: CurrentUser = {
    id: cleanId,
    name: formattedName,
    email: cleanEmail,
    role: 'CITIZEN',
    unit: 'Cư dân Không gian Văn hóa HCM (Gmail)',
    phone: '',
    khuPho: resumeData.khuPho || 'Cư dân',
    affiliation: resumeData.affiliation || 'Nhân dân',
    registeredAt: resumeData.registeredAt || new Date().toISOString(),
    lastVisitedSection: resumeData.lastVisitedSection || 'BIO',
    lastVisitedStageId: resumeData.lastVisitedStageId || 'stage_1_tuoitho',
    lastVisitedTitle:
      resumeData.lastVisitedTitle ||
      'Chặng 1: Thời niên thiếu & Quê hương Nam Đàn (1890 – 1911)',
    lastVisitedAt: new Date().toISOString(),
    completedStages: resumeData.completedStages || [],
    studyTimeMinutes: resumeData.studyTimeMinutes || 0,
    quizScores: resumeData.quizScores || [],
    memorizedQuotes: resumeData.memorizedQuotes || [],
    savedExhibits: resumeData.savedExhibits || [],
    completedTours: resumeData.completedTours || [],
  };

  try {
    localStorage.setItem('hcm_logged_user', JSON.stringify(loggedUser));
  } catch {}

  return loggedUser;
}

/**
 * Đăng xuất an toàn khỏi Firebase và xóa phiên làm việc
 */
export async function logoutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch {}
  try {
    localStorage.removeItem('hcm_logged_user');
  } catch {}
}
