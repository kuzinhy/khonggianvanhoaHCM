// <!-- Lucian UX/UI Prompt #403 & #401 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#403 · https://lucianlabs.dev/uxui-prompt/#401 -->
import React, { useState, useRef } from 'react';
import { X, ShieldCheck, AlertCircle, Mail, ArrowRight } from 'lucide-react';
import { useApp, type CurrentUser } from '../AppContext';
import { loginWithGoogle, loginWithQuickGmail } from '../services/hcmAuthService';

export interface LucianSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: CurrentUser) => void;
}

export const LucianSignInModal: React.FC<LucianSignInModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const { setCurrentUser } = useApp();

  // #403 Email Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [formBusy, setFormBusy] = useState(false);
  const [formOk, setFormOk] = useState(false);
  const [errorType, setErrorType] = useState<'NONE' | 'EMAIL' | 'PASSWORD'>('NONE');
  const [errorMessage, setErrorMessage] = useState('');

  // #401 Google Button State
  const [googleBusy, setGoogleBusy] = useState(false);
  const [googleOk, setGoogleOk] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [quickGmailInput, setQuickGmailInput] = useState('');

  // Email input shake refs
  const emailFieldRef = useRef<HTMLDivElement>(null);
  const pwFieldRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Handle #403 Email Sign-In
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formBusy || formOk) return;

    setErrorType('NONE');
    setErrorMessage('');

    // Basic email check
    const emailValid = /\S+@\S+\.\S+/.test(email);
    if (!emailValid) {
      setErrorType('EMAIL');
      setErrorMessage('Vui lòng kiểm tra lại địa chỉ email');
      if (emailFieldRef.current) {
        emailFieldRef.current.classList.remove('is-shake');
        void emailFieldRef.current.offsetWidth;
        emailFieldRef.current.classList.add('is-shake');
      }
      return;
    }

    // Checking password (accept any password >= 4 chars, or 'lucian2026' / 'hcm2026' for instant demo)
    setFormBusy(true);

    setTimeout(() => {
      setFormBusy(false);

      if (password.length < 4) {
        setErrorType('PASSWORD');
        setErrorMessage('Mật khẩu chưa chính xác (Tối thiểu 4 ký tự)');
        if (pwFieldRef.current) {
          pwFieldRef.current.classList.remove('is-shake');
          void pwFieldRef.current.offsetWidth;
          pwFieldRef.current.classList.add('is-shake');
        }
        return;
      }

      // Success
      setFormOk(true);
      const username = email.split('@')[0];
      const displayName =
        username.charAt(0).toUpperCase() + username.slice(1).replace(/[._]/g, ' ');

      const user: CurrentUser = {
        id: `email-${username.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        name: displayName,
        email: email,
        role: 'CITIZEN',
        unit: 'Công dân Không gian Văn hóa HCM',
        phone: '',
        khuPho: 'Khu phố 1',
        affiliation: 'Nhân dân',
        studyTimeMinutes: 15,
        quizScores: [95],
        memorizedQuotes: ['Không có gì quý hơn độc lập, tự do!'],
        savedExhibits: ['exhibit_01'],
        completedTours: ['Hành trình 30 năm cứu nước'],
        lastActiveAt: new Date().toISOString(),
      };

      setCurrentUser(user);
      onAuthSuccess?.(user);

      setTimeout(() => {
        setFormOk(false);
        onClose();
      }, 1600);
    }, 650);
  };

  // Handle #401 Real Google OAuth Sign-In via Firebase
  const handleGoogleClick = async () => {
    if (googleBusy || googleOk) return;

    setGoogleBusy(true);
    setGoogleError(null);
    setNeedsSetup(false);

    try {
      const result = await loginWithGoogle();
      setGoogleBusy(false);

      if (result.success && result.user) {
        setGoogleOk(true);
        setCurrentUser(result.user);
        onAuthSuccess?.(result.user);

        setTimeout(() => {
          setGoogleOk(false);
          onClose();
        }, 1200);
      } else {
        if (result.errorCode === 'auth/popup-closed-by-user' || result.errorCode === 'auth/cancelled-popup-request') {
          // Người dùng chủ động đóng popup
          return;
        }
        setGoogleError(result.error || 'Đăng nhập Google chưa thành công.');
        if (result.needsConsoleSetup) {
          setNeedsSetup(true);
        }
      }
    } catch (err: any) {
      setGoogleBusy(false);
      setGoogleError(err?.message || 'Có lỗi xảy ra khi kết nối máy chủ Google.');
    }
  };

  // Đăng nhập nhanh bằng Gmail khi gặp rào cản OAuth hoặc muốn truy cập tức thì
  const handleQuickGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = quickGmailInput.trim();
    if (!clean || !clean.includes('@')) {
      setGoogleError('Vui lòng nhập đúng định dạng email (VD: hoten@gmail.com)');
      return;
    }
    const loggedUser = loginWithQuickGmail(clean);
    setGoogleOk(true);
    setCurrentUser(loggedUser);
    onAuthSuccess?.(loggedUser);

    setTimeout(() => {
      setGoogleOk(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-amber-400/70 p-6 sm:p-7 shadow-2xl text-white space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Cổng Đăng Nhập Di Sản</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif">
              Không Gian Văn Hóa Hồ Chí Minh
            </h3>
            <p className="text-xs text-slate-400">
              Đăng nhập để đồng bộ tiến độ học tập và tự đánh giá Đảng viên
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================================================================= */}
        {/* 1. GOOGLE SIGN-IN BUTTON (Lucian UX/UI Prompt #401)                */}
        {/* ================================================================= */}
        <div className="flex justify-center">
          <button
            type="button"
            className={`u401-b ${googleBusy ? 'is-busy' : ''} ${googleOk ? 'is-ok' : ''} cursor-pointer w-full justify-center`}
            aria-busy={googleBusy}
            onClick={handleGoogleClick}
          >
            <span className="u401-ic" aria-hidden="true">
              {/* Google G Brand Mark */}
              <svg className="u401-g" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              {/* Spinning 4-color Ring */}
              <svg className="u401-arc" viewBox="0 0 20 20">
                <g>
                  <circle cx="10" cy="10" r="8" stroke="#EA4335" strokeDashoffset="0" />
                  <circle cx="10" cy="10" r="8" stroke="#4285F4" strokeDashoffset="-12.57" />
                  <circle cx="10" cy="10" r="8" stroke="#34A853" strokeDashoffset="-25.13" />
                  <circle cx="10" cy="10" r="8" stroke="#FBBC05" strokeDashoffset="-37.7" />
                </g>
              </svg>
              {/* Checkmark */}
              <svg className="u401-ck" viewBox="0 0 20 20">
                <path d="M4.8 10.4l3.4 3.4 7-7.4" />
              </svg>
            </span>
            <span className="u401-lb">
              <span className="s0">Tiếp tục với Google</span>
              <span className="s1" aria-hidden="true">
                Đang kết nối…
              </span>
              <span className="s2" aria-hidden="true">
                Đã đăng nhập thành công
              </span>
            </span>
          </button>
        </div>

        {/* Thông báo lỗi Google Auth hoặc gợi ý thiết lập */}
        {googleError && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-300">{googleError}</p>
                {needsSetup && (
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    💡 <em>Gợi ý:</em> Hãy bật Google Provider trong Firebase Console và cấp quyền cho <code>localhost</code> tại <strong>Authentication &gt; Settings &gt; Authorized domains</strong>.
                  </p>
                )}
              </div>
            </div>

            {/* Form nhập nhanh Gmail cá nhân dự phòng */}
            <form onSubmit={handleQuickGmailSubmit} className="pt-2 border-t border-amber-500/20 space-y-1.5">
              <span className="block text-[11px] text-slate-300 font-medium">
                Hoặc nhập trực tiếp địa chỉ Gmail để đăng nhập ngay:
              </span>
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    value={quickGmailInput}
                    onChange={(e) => setQuickGmailInput(e.target.value)}
                    placeholder="VD: hoten@gmail.com"
                    className="w-full pl-8 pr-2 py-1.5 text-xs rounded-xl bg-slate-950/70 border border-amber-400/40 text-white placeholder-slate-500 outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Vào ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/80" />
          </div>
          <span className="relative bg-slate-900 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            hoặc đăng nhập email
          </span>
        </div>

        {/* ================================================================= */}
        {/* 2. EMAIL SIGN-IN FORM (Lucian UX/UI Prompt #403)                  */}
        {/* ================================================================= */}
        <div className="ux u403-wrap">
          <form className="u403-form" noValidate onSubmit={handleEmailSubmit}>
            {/* Email Field with Floating Label */}
            <div
              ref={emailFieldRef}
              className={`u403-f ${emailFocused ? 'is-f' : ''} ${
                emailFocused || email ? 'is-up' : ''
              } ${errorType === 'EMAIL' ? 'is-err' : ''}`}
            >
              <input
                className="u403-in"
                type="email"
                autoComplete="username"
                spellCheck={false}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorType === 'EMAIL') setErrorType('NONE');
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <label>Địa chỉ Email</label>
            </div>

            {/* Password Field with Floating Label & Realistic Blinking Eye */}
            <div
              ref={pwFieldRef}
              className={`u403-f u403-pw ${pwFocused ? 'is-f' : ''} ${
                pwFocused || password ? 'is-up' : ''
              } ${errorType === 'PASSWORD' ? 'is-err' : ''}`}
            >
              <input
                className="u403-in"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorType === 'PASSWORD') setErrorType('NONE');
                }}
                onFocus={() => setPwFocused(true)}
                onBlur={() => setPwFocused(false)}
              />
              <label>Mật khẩu</label>

              {/* Realistic Eye SVG Button */}
              <button
                type="button"
                className="u403-eye cursor-pointer"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <g className="lid">
                    <path d="M2 10s3-5.2 8-5.2S18 10 18 10s-3 5.2-8 5.2S2 10 2 10z" />
                    <circle cx="10" cy="10" r="2.4" />
                  </g>
                  <g className="lash">
                    <path d="M3 10.4c2 2.4 4.4 3.4 7 3.4s5-1 7-3.4M6 13l-1 1.6M10 14v1.8M14 13l1 1.6" />
                  </g>
                </svg>
              </button>
            </div>

            {/* Error Message */}
            <p className={`u403-msg ${errorType !== 'NONE' ? 'is-on' : ''}`} aria-live="polite">
              {errorMessage}
            </p>

            {/* Submit Button that Morphs into Round Check */}
            <button
              type="submit"
              className={`u403-go ${formBusy ? 'is-busy' : ''} ${formOk ? 'is-ok' : ''} cursor-pointer`}
              aria-busy={formBusy}
            >
              <span>Đăng nhập</span>
              <i aria-hidden="true" />
              <svg viewBox="0 0 22 22" aria-hidden="true">
                <path d="M5.5 11.5l4 4L17 7.5" />
              </svg>
            </button>
          </form>
        </div>

        {/* Footer Hint */}
        <div className="text-center pt-1 border-t border-slate-800">
          <p className="text-[11.5px] text-slate-400">
            Gợi ý demo: Bất kỳ email hợp lệ &amp; mật khẩu từ 4 ký tự (vd: <code>hcm2026</code>)
          </p>
        </div>
      </div>

      {/* Scoped CSS based on Lucian UX/UI Prompts #401 & #403 */}
      <style>{`
        /* --- #401 GOOGLE BUTTON STYLES --- */
        .u401-b {
          position: relative;
          isolation: isolate;
          height: 42px;
          display: flex;
          align-items: center;
          padding: 0 16px 0 12px;
          border: 1px solid #475569;
          border-radius: 21px;
          background: #FFFFFF;
          color: #1E293B;
          font-family: Roboto, -apple-system, sans-serif;
          font-size: 13.5px;
          font-weight: 550;
          letter-spacing: .2px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,.25);
          transition: transform .5s cubic-bezier(.34,1.45,.64,1), box-shadow .3s ease;
        }
        .u401-b:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px -8px rgba(0,0,0,.4);
        }
        .u401-b:active {
          transform: translateY(0) scale(.96);
        }
        .u401-ic {
          position: relative;
          width: 20px;
          height: 20px;
          flex: none;
          margin-right: 10px;
        }
        .u401-ic svg {
          position: absolute;
          inset: 0;
          width: 20px;
          height: 20px;
          overflow: visible;
        }
        .u401-g {
          transition: transform .5s cubic-bezier(.34,1.45,.64,1), opacity .25s;
        }
        .u401-arc {
          opacity: 0;
          transform: scale(.35) rotate(-120deg);
          transition: transform .55s cubic-bezier(.34,1.45,.64,1), opacity .2s;
        }
        .u401-arc g {
          transform-origin: 10px 10px;
          animation: u401-spin .9s linear infinite;
        }
        .u401-arc circle {
          fill: none;
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-dasharray: 8.6 41.7;
        }
        .u401-ck {
          opacity: 0;
          transform: scale(.4);
          transition: transform .5s cubic-bezier(.34,1.45,.64,1), opacity .2s;
        }
        .u401-ck path {
          fill: none;
          stroke: #16A34A;
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 18;
          stroke-dashoffset: 18;
          transition: stroke-dashoffset .4s ease .08s;
        }
        @keyframes u401-spin {
          to { transform: rotate(360deg); }
        }
        .u401-b.is-busy .u401-g,
        .u401-b.is-ok .u401-g {
          opacity: 0;
          transform: scale(.3) rotate(90deg);
        }
        .u401-b.is-busy .u401-arc {
          opacity: 1;
          transform: none;
        }
        .u401-b.is-ok .u401-arc {
          opacity: 0;
          transform: scale(1.5);
        }
        .u401-b.is-ok .u401-ck {
          opacity: 1;
          transform: none;
        }
        .u401-b.is-ok .u401-ck path {
          stroke-dashoffset: 0;
        }
        .u401-lb {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          overflow-x: clip;
          transition: width .55s cubic-bezier(.34,1.45,.64,1);
        }
        .u401-lb span {
          grid-area: 1/1;
          justify-self: center;
          transition: opacity .22s, transform .45s cubic-bezier(.34,1.45,.64,1), filter .3s;
        }
        .u401-lb .s1, .u401-lb .s2 {
          opacity: 0;
          transform: translateY(9px);
          filter: blur(2px);
        }
        .u401-b.is-busy .u401-lb .s0,
        .u401-b.is-ok .u401-lb .s0,
        .u401-b.is-ok .u401-lb .s1 {
          opacity: 0;
          transform: translateY(-9px);
          filter: blur(2px);
        }
        .u401-b.is-busy .u401-lb .s1,
        .u401-b.is-ok .u401-lb .s2 {
          opacity: 1;
          transform: none;
          filter: none;
        }

        /* --- #403 EMAIL FORM STYLES --- */
        .u403-wrap {
          position: relative;
          width: 100%;
        }
        .u403-form {
          width: 100%;
          margin: 0;
        }
        .u403-f {
          position: relative;
          height: 52px;
          border-radius: 14px;
          background: #1E293B;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
          transition: box-shadow .2s;
        }
        .u403-f + .u403-f {
          margin-top: 10px;
        }
        .u403-f:hover {
          box-shadow: inset 0 0 0 1px #94A3B8;
        }
        .u403-f.is-f {
          box-shadow: inset 0 0 0 1.5px #F59E0B, 0 0 0 3px rgba(245, 158, 11, 0.25);
        }
        .u403-f.is-err {
          box-shadow: inset 0 0 0 1.5px #EF4444;
        }
        .u403-f::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: -1px;
          height: 2px;
          border-radius: 2px;
          background: #EF4444;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .5s cubic-bezier(.2,.8,.2,1);
        }
        .u403-f.is-err::after {
          transform: scaleX(1);
        }
        .u403-f.is-shake {
          animation: u403-shake .45s cubic-bezier(.36,.07,.19,.97);
        }
        @keyframes u403-shake {
          15% { transform: translateX(-7px); }
          35% { transform: translateX(6px); }
          55% { transform: translateX(-4px); }
          75% { transform: translateX(2px); }
        }
        .u403-f label {
          position: absolute;
          left: 15px;
          top: 17px;
          font-size: 13.5px;
          color: #94A3B8;
          transform-origin: left top;
          transition: transform .4s cubic-bezier(.34,1.45,.64,1), color .2s;
          pointer-events: none;
        }
        .u403-f.is-up label {
          transform: translateY(-10px) scale(.76);
          color: #CBD5E1;
        }
        .u403-f.is-f label {
          color: #F59E0B;
        }
        .u403-f.is-err label {
          color: #EF4444;
        }
        .u403-in {
          position: absolute;
          inset: 0;
          width: 100%;
          padding: 21px 15px 6px;
          border: 0;
          border-radius: 14px;
          background: none;
          outline: none;
          font-size: 13.5px;
          color: #F8FAFC;
        }
        .u403-in[type="password"] {
          letter-spacing: .14em;
        }
        .u403-pw .u403-in {
          padding-right: 48px;
        }
        .u403-eye {
          position: absolute;
          right: 8px;
          top: 9px;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 9px;
          background: none;
          color: #94A3B8;
          transition: color .2s, background .2s;
        }
        .u403-eye:hover {
          color: #F8FAFC;
          background: rgba(255, 255, 255, 0.1);
        }
        .u403-eye svg {
          width: 20px;
          height: 20px;
          overflow: visible;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .u403-eye .lid {
          transform-origin: 10px 10px;
          transform: scaleY(.1);
          transition: transform .45s cubic-bezier(.34,1.45,.64,1);
        }
        .u403-eye .lash {
          opacity: 1;
          transition: opacity .2s, transform .4s cubic-bezier(.34,1.45,.64,1);
          transform-origin: 10px 10px;
        }
        .u403-eye[aria-pressed="true"] .lid {
          transform: none;
        }
        .u403-eye[aria-pressed="true"] .lash {
          opacity: 0;
          transform: translateY(-3px);
        }
        .u403-msg {
          min-height: 20px;
          margin: 0;
          padding: 4px 4px 0;
          font-size: 11.5px;
          font-weight: 600;
          color: #EF4444;
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity .2s, transform .35s cubic-bezier(.34,1.45,.64,1);
        }
        .u403-msg.is-on {
          opacity: 1;
          transform: none;
        }
        .u403-go {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          height: 48px;
          margin: 6px auto 0;
          padding: 0;
          border: 0;
          border-radius: 14px;
          background: #DC2626;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          overflow: hidden;
          transition: width .55s cubic-bezier(.34,1.45,.64,1), border-radius .45s ease, background .35s, transform .4s cubic-bezier(.34,1.45,.64,1);
        }
        .u403-go:hover {
          transform: translateY(-1px);
          background: #B91C1C;
        }
        .u403-go:active {
          transform: scale(.97);
        }
        .u403-go > * {
          grid-area: 1/1;
          transition: opacity .2s, transform .4s cubic-bezier(.34,1.45,.64,1);
        }
        .u403-go i {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid currentColor;
          border-right-color: transparent;
          opacity: 0;
          transform: scale(.5);
          animation: u403-spin .7s linear infinite;
        }
        .u403-go svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0;
          transform: scale(.5);
        }
        .u403-go svg path {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          transition: stroke-dashoffset .4s ease .1s;
        }
        @keyframes u403-spin {
          to { transform: rotate(360deg); }
        }
        .u403-go.is-busy,
        .u403-go.is-ok {
          width: 48px;
          border-radius: 24px;
          cursor: default;
        }
        .u403-go.is-busy span,
        .u403-go.is-ok span {
          opacity: 0;
          transform: scale(.8);
        }
        .u403-go.is-busy i {
          opacity: 1;
          transform: none;
        }
        .u403-go.is-ok {
          background: #10B981 !important;
          color: #FFFFFF;
        }
        .u403-go.is-ok svg {
          opacity: 1;
          transform: none;
        }
        .u403-go.is-ok svg path {
          stroke-dashoffset: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .u403-f, .u403-go, .u401-b {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};
