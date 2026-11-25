import React, { useState } from 'react';
import {
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  X,
  KeyRound,
  Building2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp, type CurrentUser } from '../AppContext';
import { HoaSenIcon } from './TraditionalMotifs';

interface HcmAdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: CurrentUser) => void;
}

const PRESET_ACCOUNTS: Array<{
  username: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
  unit: string;
  desc: string;
}> = [
  {
    username: 'admin',
    name: 'Đ/c Nguyễn Văn An',
    role: 'ADMIN',
    unit: 'Ban Tuyên giáo Đảng ủy Phường',
    desc: 'Toàn quyền quản trị, duyệt tin, phân quyền và cấu hình hệ thống',
  },
  {
    username: 'tuyengiao',
    name: 'Đ/c Trần Thị Mai',
    role: 'ADMIN',
    unit: 'Tổ Thư ký Không gian Văn hóa HCM',
    desc: 'Quản trị nội dung, thêm sửa xóa bài viết, mô hình và tác phẩm',
  },
  {
    username: 'chibo',
    name: 'Đ/c Lê Hoàng Nam',
    role: 'EDITOR',
    unit: 'Bí thư Chi bộ Khu phố 1',
    desc: 'Đăng tải bài viết cơ sở, sinh hoạt chi bộ, tự đánh giá QĐ 144',
  },
];

export const HcmAdminLoginModal: React.FC<HcmAdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { currentUser, setCurrentUser } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim()) {
      setErrorMsg('Vui lòng nhập tên tài khoản quản trị.');
      return;
    }

    if (!password || password.trim() !== '123456') {
      setErrorMsg('Mật khẩu không chính xác. (Mật khẩu chuẩn hóa ban đầu là: 123456)');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Tìm tài khoản phù hợp trong danh mục hoặc tạo tài khoản hợp lệ
      const matched = PRESET_ACCOUNTS.find((acc) => acc.username.toLowerCase() === username.trim().toLowerCase());

      const loggedUser: CurrentUser = matched
        ? {
            id: `usr-${matched.username}`,
            name: matched.name,
            role: matched.role,
            unit: matched.unit,
          }
        : {
            id: `usr-${Date.now()}`,
            name: username.trim(),
            role: 'EDITOR',
            unit: 'Chi bộ / Đơn vị trực thuộc',
          };

      setCurrentUser(loggedUser);
      try {
        localStorage.setItem('hcm_logged_user', JSON.stringify(loggedUser));
      } catch {}

      if (onLoginSuccess) onLoginSuccess(loggedUser);
      onClose();
    }, 400);
  };

  const handleSelectPreset = (acc: typeof PRESET_ACCOUNTS[0]) => {
    setUsername(acc.username);
    setPassword('123456');
    setErrorMsg(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl border-2 border-[#C59A55] shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header trang trọng phong cách Đảng & Chính quyền */}
        <div className="bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#54121E] px-6 py-5 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#E5D3B2] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C59A55]/20 border border-[#C59A55]/60 flex items-center justify-center p-2">
              <HoaSenIcon className="w-7 h-7 text-[#C59A55]" />
            </div>
            <div>
              <div className="text-[10.5px] font-bold text-[#E5D3B2] tracking-[0.16em] uppercase">
                HỆ THỐNG XÁC THỰC QUẢN TRỊ
              </div>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                Đăng Nhập Cổng Biên Tập
              </h3>
              <p className="text-[11px] text-[#E5D3B2]/80">
                Không Gian Văn Hóa HCM • Phường Thủ Dầu Một
              </p>
            </div>
          </div>
        </div>

        {/* Nội dung Form */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#262321] uppercase tracking-wider mb-1.5">
                Tài khoản / Tên đồng chí *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#67615B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin, tuyengiao, chibo..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5D3B2] bg-[#FAF7F0] focus:bg-white focus:border-[#751D2C] focus:ring-2 focus:ring-[#751D2C]/20 text-sm font-medium text-[#262321] outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#262321] uppercase tracking-wider mb-1.5">
                Mật khẩu xác thực *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#67615B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5D3B2] bg-[#FAF7F0] focus:bg-white focus:border-[#751D2C] focus:ring-2 focus:ring-[#751D2C]/20 text-sm font-medium text-[#262321] outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#67615B] hover:text-[#262321] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập vào hệ thống'}</span>
            </button>
          </form>

          {/* Tài khoản mẫu tiện dụng cho Ban Tuyên giáo & Chi bộ */}
          <div className="pt-2 border-t border-[#E5D3B2]/60">
            <div className="text-[11px] font-bold text-[#67615B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59A55]" />
              <span>Chọn nhanh tài khoản phân quyền:</span>
            </div>

            <div className="space-y-1.5">
              {PRESET_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => handleSelectPreset(acc)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                    username === acc.username
                      ? 'border-[#751D2C] bg-rose-50/70 font-semibold text-[#751D2C]'
                      : 'border-[#E5D3B2]/50 hover:bg-[#FAF7F0] text-[#262321]'
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>{acc.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#C59A55]/20 text-[#751D2C]">
                        {acc.role === 'ADMIN' ? 'Toàn quyền' : 'Chi bộ'}
                      </span>
                    </div>
                    <div className="text-[10.5px] text-[#67615B]">{acc.unit}</div>
                  </div>
                  <span className="text-[10px] text-[#67615B] font-mono">@{acc.username}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
