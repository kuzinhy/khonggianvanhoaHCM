import React, { useState } from 'react';
import {
  User,
  Phone,
  Lock,
  MapPin,
  Heart,
  CheckCircle2,
  X,
  Compass,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { useApp, type CurrentUser } from '../AppContext';
import { GoogleIcon } from './GoogleIcon';
import { loginWithGoogle, loginWithQuickGmail } from '../services/hcmAuthService';

interface HcmCitizenAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onAuthSuccess?: (user: CurrentUser) => void;
}

interface StoredCitizen {
  id: string;
  name: string;
  phone: string;
  khuPho: string;
  affiliation: 'Đảng viên' | 'Đoàn viên' | 'Hội viên' | 'Nhân dân' | 'Thanh niên';
  passwordHash: string;
  registeredAt: string;
}

const CITIZENS_STORAGE_KEY = 'hcm_registered_citizens';

export const HcmCitizenAuthModal: React.FC<HcmCitizenAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'register',
  onAuthSuccess,
}) => {
  const { setCurrentUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [khuPho, setKhuPho] = useState('Khu phố 1');
  const [affiliation, setAffiliation] = useState<'Đảng viên' | 'Đoàn viên' | 'Hội viên' | 'Nhân dân' | 'Thanh niên'>('Nhân dân');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Đăng nhập bằng Google / Gmail
  const [gmailInput, setGmailInput] = useState('');
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [isGoogleBusy, setIsGoogleBusy] = useState(false);

  // Đăng nhập tài khoản Google thật chuẩn xác qua Firebase OAuth
  const handleRealGoogleAuth = async () => {
    setIsGoogleBusy(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const result = await loginWithGoogle();
      setIsGoogleBusy(false);

      if (result.success && result.user) {
        setSuccessMsg(`Đăng nhập thành công với tài khoản Google: ${result.user.name}`);
        setCurrentUser(result.user);
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(result.user!);
          onClose();
        }, 600);
      } else {
        if (
          result.errorCode === 'auth/popup-closed-by-user' ||
          result.errorCode === 'auth/cancelled-popup-request'
        ) {
          return;
        }
        setErrorMsg(result.error || 'Đăng nhập Google thất bại');
      }
    } catch (err: any) {
      setIsGoogleBusy(false);
      setErrorMsg(err?.message || 'Có lỗi khi kết nối Google');
    }
  };

  const handleGmailAuth = (targetEmail?: string, customDisplayName?: string) => {
    setErrorMsg(null);
    const emailToUse = (targetEmail || gmailInput).trim();
    if (!emailToUse) {
      setErrorMsg('Vui lòng nhập địa chỉ Gmail của bạn.');
      return;
    }
    if (!emailToUse.includes('@')) {
      setErrorMsg('Địa chỉ email chưa đúng định dạng. Ví dụ: nguyenvanan@gmail.com');
      return;
    }

    const loggedUser = loginWithQuickGmail(emailToUse, customDisplayName);
    setCurrentUser(loggedUser);
    setSuccessMsg(`Đăng nhập thành công với tài khoản Gmail: ${emailToUse}`);

    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(loggedUser);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại hoặc mã định danh.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Mật khẩu tối thiểu từ 4 ký tự trở lên.');
      return;
    }

    // Kiểm tra danh sách đã có
    let citizens: StoredCitizen[] = [];
    try {
      const saved = localStorage.getItem(CITIZENS_STORAGE_KEY);
      if (saved) citizens = JSON.parse(saved);
    } catch {}

    const existing = citizens.find((c) => c.phone.trim() === phone.trim());
    if (existing) {
      setErrorMsg('Số điện thoại/định danh này đã được đăng ký. Vui lòng chuyển sang tab Đăng Nhập.');
      return;
    }

    const citizenId = `citizen-${phone.trim().replace(/\D/g, '') || Date.now()}`;
    const newCitizen: StoredCitizen = {
      id: citizenId,
      name: name.trim(),
      phone: phone.trim(),
      khuPho,
      affiliation,
      passwordHash: password,
      registeredAt: new Date().toISOString(),
    };

    citizens.push(newCitizen);
    try {
      localStorage.setItem(CITIZENS_STORAGE_KEY, JSON.stringify(citizens));
    } catch {}

    const loggedUser: CurrentUser = {
      id: citizenId,
      name: newCitizen.name,
      role: 'CITIZEN',
      unit: `${khuPho} (Phường Thủ Dầu Một)`,
      phone: newCitizen.phone,
      khuPho: newCitizen.khuPho,
      affiliation: newCitizen.affiliation,
      registeredAt: newCitizen.registeredAt,
      lastVisitedSection: 'BIO',
      lastVisitedStageId: 'stage_1_tuoitho',
      lastVisitedTitle: 'Chặng 1: Thời niên thiếu & Quê hương Nam Đàn (1890 – 1911)',
      lastVisitedAt: new Date().toISOString(),
      completedStages: [],
    };

    try {
      localStorage.setItem('hcm_logged_user', JSON.stringify(loggedUser));
    } catch {}

    setCurrentUser(loggedUser);
    setSuccessMsg('Đăng ký thành công! Hệ thống sẵn sàng hướng dẫn bạn tìm hiểu theo cuộc đời Bác.');

    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(loggedUser);
      onClose();
    }, 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!phone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại hoặc mã định danh.');
      return;
    }

    let citizens: StoredCitizen[] = [];
    try {
      const saved = localStorage.getItem(CITIZENS_STORAGE_KEY);
      if (saved) citizens = JSON.parse(saved);
    } catch {}

    if (!password.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu đăng nhập.');
      return;
    }

    const matched = citizens.find(
      (c) => c.phone.trim() === phone.trim() && c.passwordHash === password
    );

    let loggedUser: CurrentUser;

    if (matched) {
      // Phục hồi tiến trình học tập đã lưu của người dân
      let resumeData: any = {};
      try {
        const savedResume = localStorage.getItem(`hcm_citizen_resume_${matched.id}`);
        if (savedResume) resumeData = JSON.parse(savedResume);
      } catch {}

      loggedUser = {
        id: matched.id,
        name: matched.name,
        role: 'CITIZEN',
        unit: `${matched.khuPho} (Phường Thủ Dầu Một)`,
        phone: matched.phone,
        khuPho: matched.khuPho,
        affiliation: matched.affiliation,
        registeredAt: matched.registeredAt,
        lastVisitedSection: resumeData.lastVisitedSection || 'BIO',
        lastVisitedStageId: resumeData.lastVisitedStageId || 'stage_1_tuoitho',
        lastVisitedTitle: resumeData.lastVisitedTitle || 'Chặng 1: Thời niên thiếu & Quê hương Nam Đàn',
        lastVisitedAt: new Date().toISOString(),
        completedStages: resumeData.completedStages || [],
      };
    } else {
      // Cho phép đăng nhập nhanh tạo profile người dân
      const citizenId = `citizen-${phone.trim().replace(/\D/g, '') || Date.now()}`;
      loggedUser = {
        id: citizenId,
        name: name.trim() || `Công dân ${phone.trim().slice(-4) || 'Đất Thủ'}`,
        role: 'CITIZEN',
        unit: `${khuPho} (Phường Thủ Dầu Một)`,
        phone: phone.trim(),
        khuPho,
        affiliation,
        registeredAt: new Date().toISOString(),
        lastVisitedSection: 'BIO',
        lastVisitedStageId: 'stage_1_tuoitho',
        lastVisitedTitle: 'Chặng 1: Thời niên thiếu & Quê hương Nam Đàn',
        lastVisitedAt: new Date().toISOString(),
        completedStages: [],
      };
    }

    try {
      localStorage.setItem('hcm_logged_user', JSON.stringify(loggedUser));
    } catch {}

    setCurrentUser(loggedUser);
    setSuccessMsg(`Chào mừng ${loggedUser.name} đăng nhập thành công!`);

    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(loggedUser);
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (kp: string, demoName: string, demoAffiliation: CurrentUser['affiliation']) => {
    const demoId = `citizen-demo-${kp.replace(/\s+/g, '').toLowerCase()}`;
    let resumeData: any = {};
    try {
      const savedResume = localStorage.getItem(`hcm_citizen_resume_${demoId}`);
      if (savedResume) resumeData = JSON.parse(savedResume);
    } catch {}

    const loggedUser: CurrentUser = {
      id: demoId,
      name: demoName,
      role: 'CITIZEN',
      unit: `${kp} (Phường Thủ Dầu Một)`,
      phone: '0908123456',
      khuPho: kp,
      affiliation: demoAffiliation,
      registeredAt: new Date().toISOString(),
      lastVisitedSection: resumeData.lastVisitedSection || 'TDM_HOUSE',
      lastVisitedStageId: resumeData.lastVisitedStageId || 'stage_2_bontimduong',
      lastVisitedTitle: resumeData.lastVisitedTitle || 'Chặng 2: Ra đi tìm đường cứu nước & Bôn ba năm châu',
      lastVisitedAt: new Date().toISOString(),
      completedStages: resumeData.completedStages || ['stage_1_tuoitho'],
    };

    try {
      localStorage.setItem('hcm_logged_user', JSON.stringify(loggedUser));
    } catch {}

    setCurrentUser(loggedUser);
    if (onAuthSuccess) onAuthSuccess(loggedUser);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-[#C59A55] shadow-2xl overflow-hidden animate-in zoom-in-95 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon Đỏ Mận Vàng Kim */}
        <div className="bg-gradient-to-r from-[#751D2C] via-[#8B2332] to-[#5C1420] px-6 py-4 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#751D2C] flex items-center justify-center font-black shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-amber-200 uppercase tracking-widest block">
                Cổng Bạn Đọc &amp; Công Dân
              </span>
              <h3 className="text-lg font-bold text-amber-100 font-serif leading-tight">
                Không Gian Văn Hóa Hồ Chí Minh
              </h3>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium animate-in fade-in">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ===================================================================
              KHỐI 1: ĐĂNG NHẬP NHANH BẰNG GMAIL (ƯU TIÊN HÀNG ĐẦU, 1 CHẠM)
              =================================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-sky-50/70 border-2 border-[#C59A55]/40 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white shadow-xs border border-slate-200">
                  <GoogleIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Đăng Nhập Nhanh Bằng Gmail
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Không cần nhớ mật khẩu, đồng bộ tức thì
                  </p>
                </div>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                1 Chạm
              </span>
            </div>

            {/* Nút đăng nhập Google OAuth chính thức 1 chạm */}
            <div>
              <button
                type="button"
                disabled={isGoogleBusy}
                onClick={handleRealGoogleAuth}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border-2 border-[#4285F4] text-slate-800 font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5 group active:scale-[0.99]"
              >
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <span className="text-slate-800 group-hover:text-[#4285F4] transition-colors">
                  {isGoogleBusy ? 'Đang mở cửa sổ Google...' : 'Đăng nhập bằng tài khoản Google (1 chạm)'}
                </span>
              </button>
            </div>

            {/* Nhập Gmail cá nhân (Phương thức dự phòng) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/70">
              <label className="block text-[11px] font-bold text-slate-700">
                Hoặc nhập nhanh địa chỉ Gmail của bạn:
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={gmailInput}
                    onChange={(e) => setGmailInput(e.target.value)}
                    placeholder="VD: nguyenvanan@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] outline-none bg-white font-medium"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleGmailAuth();
                      }
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleGmailAuth()}
                  className="px-4 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0 flex items-center gap-1.5 lucian-spring-btn"
                >
                  <span>Đăng nhập</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tài khoản Gmail mẫu bấm là vào ngay */}
            <div className="space-y-1.5 pt-1 border-t border-slate-200/70">
              <span className="text-[11px] text-slate-500 font-medium block">
                Hoặc chọn nhanh tài khoản Gmail mẫu bên dưới:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Nguyễn Văn An', email: 'nguyenvanan.hcm@gmail.com', desc: 'Cư dân Khu phố 1' },
                  { name: 'Trần Thị Bình', email: 'tranthibinh.tdm@gmail.com', desc: 'Đoàn viên Khu phố 3' },
                  { name: 'Lê Quang Thành', email: 'lequangthanh.hcm@gmail.com', desc: 'Hội viên CCB' },
                  { name: 'Phạm Hồng Ánh', email: 'honganh.thudaumot@gmail.com', desc: 'Học sinh - Sinh viên' },
                ].map((g, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleGmailAuth(g.email, g.name)}
                    className="p-2.5 rounded-xl bg-white hover:bg-sky-50/80 border border-slate-200 hover:border-sky-300 text-left transition-all cursor-pointer flex items-center gap-2.5 group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#4285F4] group-hover:text-white flex items-center justify-center font-bold text-xs text-[#751D2C] shrink-0 border border-slate-200 transition-colors">
                      {g.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 text-[11.5px] truncate group-hover:text-[#4285F4]">
                        {g.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {g.email}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================================
              KHỐI 2: TÙY CHỌN SỐ ĐIỆN THOẠI TRUYỀN THỐNG (COLLAPSIBLE / OPTIONAL)
              =================================================================== */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowPhoneAuth((p) => !p)}
              className="w-full py-2 text-center text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{showPhoneAuth ? 'Thu gọn tùy chọn Số điện thoại' : 'Tùy chọn: Đăng ký / Đăng nhập bằng Số điện thoại'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPhoneAuth ? 'rotate-180' : ''}`} />
            </button>

            {showPhoneAuth && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-3.5 animate-in fade-in">
                {/* Tab Switcher: Đăng ký vs Đăng nhập */}
                <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      mode === 'register'
                        ? 'bg-white text-[#751D2C] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-600" />
                    <span>Đăng Ký Mới</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      mode === 'login'
                        ? 'bg-white text-[#751D2C] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>Đăng Nhập</span>
                  </button>
                </div>

                {mode === 'register' ? (
                  /* FORM ĐĂNG KÝ */
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Họ và tên của bạn: *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="VD: Nguyễn Văn Bình"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#751D2C] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Số điện thoại: *
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#751D2C] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mật khẩu: *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Tối thiểu 4 ký tự"
                            className="w-full px-3 pr-8 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#751D2C] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-[#751D2C] hover:bg-[#8B2332] text-amber-100 font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Hoàn Tất Đăng Ký
                    </button>
                  </form>
                ) : (
                  /* FORM ĐĂNG NHẬP */
                  <form onSubmit={handleLogin} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Số điện thoại: *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="VD: 0908123456"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#751D2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mật khẩu:
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#751D2C] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-[#751D2C] hover:bg-[#8B2332] text-amber-100 font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Đăng Nhập
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
