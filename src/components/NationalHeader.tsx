import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Search,
  Share2,
  Calendar,
  Sparkles,
  Radio,
  BookOpen,
  Box,
  Cloud,
  CheckCircle2,
  RefreshCw,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Database,
  FolderOpen,
  Building2,
  Mic,
  Quote,
  Award,
  Compass,
  User,
  Footprints,
  LogIn,
  UserPlus,
  LogOut,
  Flag,
  Users,
  Eye,
  History,
} from 'lucide-react';
import { SpaceTab } from './ProfessionalNavbar';
import { useApp } from '../AppContext';

interface NationalHeaderProps {
  onOpenSearch: () => void;
  onOpenShare: () => void;
  onToggleAudio: () => void;
  isAudioPlaying: boolean;
  fontSizeLevel: number;
  onCycleFontSize: () => void;
  isBackendConnected: boolean;
  onSelectTab?: (tab: SpaceTab) => void;
  activeTab?: SpaceTab;
  isResearchMode?: boolean;
  onToggleResearchMode?: () => void;
  isCloudSyncing?: boolean;
  onManualCloudSync?: () => void;
  onOpenToanTap?: () => void;
  onOpenChiBoWorkspace?: () => void;
  onOpenQuoteCard?: () => void;
  onOpenVoiceStudio?: () => void;
  onOpenAdminLogin?: () => void;
  onOpenArticleManager?: () => void;
  onOpenGoldenBook?: () => void;
  onOpenRedMap?: () => void;
  onOpenTwentyOneDayChallenge?: () => void;
  onOpenChiBoPocket?: () => void;
  onOpenHandwritingZoom?: () => void;
  onOpenRedTour?: () => void;
  onOpenHeritageAnalytics?: () => void;
  onOpenCitizenAuth?: (mode: 'login' | 'register') => void;
  onOpenGuidedJourney?: () => void;
  canEdit?: boolean;
}

export const NationalHeader: React.FC<NationalHeaderProps> = ({
  onOpenSearch,
  onOpenShare,
  onToggleAudio,
  isAudioPlaying,
  fontSizeLevel,
  onCycleFontSize,
  isBackendConnected,
  onSelectTab,
  activeTab,
  isResearchMode = false,
  onToggleResearchMode,
  isCloudSyncing = false,
  onManualCloudSync,
  onOpenToanTap,
  onOpenChiBoWorkspace,
  onOpenQuoteCard,
  onOpenVoiceStudio,
  onOpenAdminLogin,
  onOpenArticleManager,
  onOpenGoldenBook,
  onOpenRedMap,
  onOpenTwentyOneDayChallenge,
  onOpenChiBoPocket,
  onOpenHandwritingZoom,
  onOpenRedTour,
  onOpenHeritageAnalytics,
  onOpenCitizenAuth,
  onOpenGuidedJourney,
  canEdit = false,
}) => {
  const { currentUser, logout, visitorStats } = useApp();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
      };
      const dateStr = now.toLocaleDateString('vi-VN', options);
      const timeStr = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
      setCurrentDateTime(`${formattedDate} · ${timeStr}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="w-full bg-white text-slate-800 shadow-xs border-b border-rose-100 select-none relative z-40">
      {/* 1. Dignified Ceremonial Ribbon - Thanh dải băng Quốc gia trang trọng */}
      <div className="bg-gradient-to-r from-[#7D070B] via-[#8B1425] to-[#70060A] text-amber-100 py-1.5 px-3 sm:px-6 border-b border-rose-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-semibold gap-2">
          {/* Slogan Đảng & Bác Hồ */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-80"></span>
            <span className="tracking-widest font-black uppercase text-yellow-300 drop-shadow-xs">
              ĐẢNG CỘNG SẢN VIỆT NAM QUANG VINH MUÔN NĂM
            </span>
            <span className="hidden md:inline text-amber-200/50">•</span>
            <span className="hidden md:inline text-amber-100/90 font-medium">
              Chủ tịch Hồ Chí Minh vĩ đại sống mãi trong sự nghiệp chúng ta!
            </span>
          </div>

          {/* Ngày giờ, Bộ đếm Online & Máy chủ API */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 ml-auto text-[11px]">
            {/* Bộ đếm Đang Online & Lượt truy cập */}
            <div className="flex items-center gap-2 bg-black/40 px-2.5 py-0.5 rounded-full border border-amber-300/35 text-[10.5px] shadow-inner">
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold" title="Số lượng người dùng đang truy cập trực tuyến cùng thời điểm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>{visitorStats.onlineCount} đang online</span>
              </span>
              <span className="text-amber-200/40">|</span>
              <span className="text-amber-200 font-medium flex items-center gap-1" title="Tổng lượt truy cập Cổng Không gian Văn hóa Hồ Chí Minh">
                <Eye className="w-3 h-3 text-amber-300" />
                <span className="text-amber-300 font-extrabold">{visitorStats.totalVisits.toLocaleString('vi-VN')}</span> lượt xem
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-amber-100/90 font-medium">
              <Calendar className="w-3.5 h-3.5 text-yellow-300" />
              <span>{currentDateTime}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-0.5 rounded-full border border-amber-300/30">
              <Database className="w-3 h-3 text-emerald-400" />
              <span className="text-[10.5px]">
                {isBackendConnected ? (
                  <span className="text-emerald-300 font-bold">Máy chủ API: Trực tuyến</span>
                ) : (
                  <span className="text-amber-300 font-bold">Cơ sở dữ liệu cục bộ</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Header Bar - Sáng đẹp, thông tin đầy đủ, cân đối chuyên nghiệp trên 1 hàng */}
      <div className="bg-white/95 backdrop-blur-md px-3 sm:px-6 py-2 flex items-center justify-between gap-3 max-w-7xl mx-auto overflow-hidden">
        {/* Left: Biểu trưng Hoa Sen Vàng + Tiêu đề + Huy hiệu Phường */}
        <a
          href="/gioi-thieu"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab?.('FOYER');
          }}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          title="Về Trang chủ Không Gian Văn Hóa Hồ Chí Minh"
        >
          {/* Huy hiệu Biểu tượng Phường Thủ Dầu Một trang trọng */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center ring-2 ring-[#C59A55]/70 border border-[#ECC880] group-hover:scale-105 transition-transform shrink-0 relative overflow-hidden">
            <img
              src="/assets/hcm-space/logo-phuong-thu-dau-mot.png"
              alt="Biểu trưng Phường Thủ Dầu Một"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const nextEl = e.currentTarget.nextElementSibling;
                if (nextEl) (nextEl as HTMLElement).style.display = 'block';
              }}
            />
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#F8D882] fill-current filter drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.4)] hidden"
              aria-label="Biểu tượng Hoa Sen"
            >
              {/* Cánh sen trung tâm */}
              <path d="M50 10 C59 32 63 54 50 84 C37 54 41 32 50 10 Z" opacity="0.98" />
              {/* Lớp cánh sen hai bên tầng 1 */}
              <path d="M50 20 C28 32 14 54 28 80 C40 75 46 60 50 20 Z" opacity="0.9" />
              <path d="M50 20 C72 32 86 54 72 80 C60 75 54 60 50 20 Z" opacity="0.9" />
              {/* Lớp cánh sen bung nở tầng 2 */}
              <path d="M50 30 C16 46 6 66 16 84 C32 80 42 70 50 30 Z" opacity="0.75" />
              <path d="M50 30 C84 46 94 66 84 84 C68 80 58 70 50 30 Z" opacity="0.75" />
              {/* Đài sen */}
              <ellipse cx="50" cy="85" rx="18" ry="3.5" opacity="0.95" />
            </svg>
          </div>

          <div className="shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-sm lg:text-base font-black text-slate-900 group-hover:text-[#751D2C] transition-colors leading-tight font-serif tracking-tight whitespace-nowrap">
                Không Gian Văn Hóa Hồ Chí Minh
              </h1>
              <span className="bg-red-50 text-red-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-red-200 shrink-0">
                Phường Thủ Dầu Một
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate mt-0.5 hidden sm:block">
              Tham quan số hóa 3D • Tương tác hiện vật &amp; cấu phần di tích • Chỉ thị 07 &amp; QĐ 144
            </p>
          </div>
        </a>

        {/* Right: Header Action Controls - Bố cục gọn gàng, tự co giãn thông minh không bị tràn */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
          {/* Nút Hướng Dẫn Lộ Trình Cuộc Đời & Dấu Mốc Của Bác */}
          {onOpenGuidedJourney && (
            <button
              type="button"
              onClick={onOpenGuidedJourney}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[11px] font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer shrink-0"
              title="Hướng dẫn truy cập từng nội dung theo cuộc đời & dấu mốc của Bác"
            >
              <Compass className="w-3.5 h-3.5 text-amber-100 animate-spin-slow" />
              <span>Dấu Chân Bác</span>
            </button>
          )}

          {/* Phân hệ Tài khoản Người dân Thủ Dầu Một */}
          {currentUser?.role === 'CITIZEN' ? (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 text-[11px] font-bold shrink-0">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover border border-amber-400 shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-3.5 h-3.5 text-[#751D2C]" />
              )}
              <span className="hidden sm:inline">{currentUser.name.split(' ').slice(-2).join(' ')}</span>
              <span className="text-[10px] bg-red-100 text-[#751D2C] px-1.5 py-0.5 rounded font-semibold">
                {currentUser.khuPho || 'Cư dân'}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-slate-400 hover:text-red-700 ml-0.5 p-0.5 cursor-pointer"
                title="Đăng xuất người dân"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : currentUser?.role === 'VIEWER' && onOpenCitizenAuth ? (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onOpenCitizenAuth('register')}
                className="px-2 py-1 rounded-xl bg-[#751D2C] hover:bg-[#8B2332] text-amber-100 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
                title="Đăng ký tài khoản người dân học tập và ghi nhớ lộ trình"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">Đăng Ký Người Dân</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenCitizenAuth('login')}
                className="px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer shadow-2xs"
                title="Đăng nhập tài khoản người dân"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden md:inline">Đăng Nhập</span>
              </button>
            </div>
          ) : null}

          {/* Lịch Sử Đảng Bộ TP Thủ Dầu Một Button */}
          {onSelectTab && (
            <button
              type="button"
              onClick={() => onSelectTab('PARTY_HISTORY')}
              className="px-2 py-1 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-950 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Lịch sử Đảng bộ TP Thủ Dầu Một (Bộ 2 tập - 600 trang)"
            >
              <Flag className="w-3.5 h-3.5 text-red-700" />
              <span className="hidden xl:inline">Lịch Sử Đảng Bộ</span>
            </button>
          )}

          {/* Biên Niên Sử Phường Thủ Dầu Một (Từ 01/7/2025) Button */}
          {onSelectTab && (
            <button
              type="button"
              onClick={() => onSelectTab('TDM_CHRONOLOGY')}
              className={`px-2 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs ${
                activeTab === 'TDM_CHRONOLOGY'
                  ? 'border-rose-500 bg-rose-700 text-amber-200'
                  : 'border-amber-300 bg-amber-50 hover:bg-amber-100 text-[#751D2C]'
              }`}
              title="Biên niên sử Đảng bộ Phường Thủ Dầu Một (Từ 01/7/2025 đến nay)"
            >
              <History className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden xl:inline">Biên Niên Sử Phường</span>
              <span className="text-[9px] bg-[#751D2C] text-amber-300 px-1 py-0.2 rounded font-extrabold">Từ 1/7/2025</span>
            </button>
          )}

          {/* Hồ Chí Minh Toàn Tập Button */}
          {onOpenToanTap && (
            <button
              type="button"
              onClick={onOpenToanTap}
              className="px-2 py-1 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Tra cứu 15 Tập Hồ Chí Minh Toàn tập (Google Drive)"
            >
              <FolderOpen className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden xl:inline">Toàn Tập</span>
            </button>
          )}

          {/* Sổ Vàng Truyền Thống Số */}
          {onOpenGoldenBook && (
            <button
              type="button"
              onClick={onOpenGoldenBook}
              className="px-2 py-1 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Mở Sổ vàng truyền thống số & ký cam kết học tập theo Bác"
            >
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden xl:inline">Sổ Vàng</span>
            </button>
          )}

          {/* Bản Đồ Địa Chỉ Đỏ & Bản Đồ Số */}
          {onOpenRedMap && (
            <button
              type="button"
              onClick={onOpenRedMap}
              className="px-2 py-1 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-950 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Bản đồ số sinh động: Dấu chân Bác trên bản đồ Việt Nam (Hoàng Sa - Trường Sa) & Bản đồ Phường Thủ Dầu Một"
            >
              <Compass className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden xl:inline">Bản Đồ Số</span>
            </button>
          )}

          {/* 🎯 Thử thách 21 ngày */}
          {onOpenTwentyOneDayChallenge && (
            <button
              type="button"
              onClick={onOpenTwentyOneDayChallenge}
              className="hidden 2xl:inline-flex px-2 py-1 rounded-xl border border-rose-400 bg-rose-50 hover:bg-rose-100 text-rose-900 text-[11px] font-bold items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Thử thách 21 ngày Học và làm theo Bác (Quy định 144-QĐ/TW)"
            >
              <span>🎯 21 Ngày</span>
            </button>
          )}

          {/* 📱 Sổ tay Chi bộ 2026 */}
          {onOpenChiBoPocket && (
            <button
              type="button"
              onClick={onOpenChiBoPocket}
              className="hidden 2xl:inline-flex px-2 py-1 rounded-xl border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950 text-[11px] font-bold items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Sổ tay sinh hoạt Chi bộ số 2026 (Chỉ thị 07-CT/TW)"
            >
              <span>📱 Sổ Tay Chi Bộ</span>
            </button>
          )}

          {/* 🚩 Tuyến Đỏ Về Nguồn Thủ Dầu Một */}
          {onOpenRedTour && (
            <button
              type="button"
              onClick={onOpenRedTour}
              className="hidden 2xl:inline-flex px-2 py-1 rounded-xl border border-red-400 bg-red-50 hover:bg-red-100 text-[#751D2C] text-[11px] font-bold items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Tuyến Du Lịch Đỏ Về Nguồn Thủ Dầu Một (5 trạm liên hoàn)"
            >
              <span>🚩 Tuyến Đỏ</span>
            </button>
          )}

          {/* Sinh Hoạt Chi Bộ Button (màn hình lớn) */}
          {onOpenChiBoWorkspace && (
            <button
              type="button"
              onClick={onOpenChiBoWorkspace}
              className="hidden 2xl:inline-flex px-2 py-1 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[11px] font-bold items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Nghiệp vụ sinh hoạt Chi bộ, 12 chuyên đề & Phiếu QĐ 144"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chi Bộ</span>
            </button>
          )}

          {/* Tạo Thiệp MXH Button (màn hình lớn) */}
          {onOpenQuoteCard && (
            <button
              type="button"
              onClick={onOpenQuoteCard}
              className="hidden 2xl:inline-flex px-2 py-1 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-900 text-[11px] font-bold items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Tạo thiệp chia sẻ lời Bác dạy đăng mạng xã hội (Zalo, Facebook)"
            >
              <Quote className="w-3.5 h-3.5 text-rose-700" />
              <span>Thiệp MXH</span>
            </button>
          )}

          {/* Quản Trị Bài Viết (CRUD) - chỉ hiện khi cán bộ có quyền canEdit */}
          {canEdit && onOpenArticleManager && (
            <button
              type="button"
              onClick={onOpenArticleManager}
              className="px-2 py-1 rounded-xl border border-[#751D2C] bg-[#751D2C] hover:bg-[#5B1522] text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
              title="Quản trị, thêm sửa xóa bài viết, tư liệu và mô hình cơ sở"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Biên Tập</span>
            </button>
          )}

          {/* Audio Recital button */}
          <button
            type="button"
            onClick={onToggleAudio}
            className={`px-2 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shrink-0 ${
              isAudioPlaying
                ? 'bg-rose-700 text-white border-rose-800 animate-pulse shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Phát / Dừng tư liệu giọng đọc Chủ tịch Hồ Chí Minh"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-200" />
            ) : (
              <Radio className="w-3.5 h-3.5 text-rose-700" />
            )}
            <span className="hidden lg:inline">
              {isAudioPlaying ? 'Đang phát' : 'Giọng Bác'}
            </span>
          </button>

          {/* Tra cứu nhanh */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-xs shrink-0"
            title="Tra cứu nhanh mốc lịch sử, tác phẩm, trích dẫn (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Tra Cứu</span>
          </button>

          {/* Cỡ chữ */}
          <button
            type="button"
            onClick={onCycleFontSize}
            className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer shrink-0"
            title="Thay đổi cỡ chữ hiển thị"
          >
            <span className="text-[10.5px] font-extrabold px-1">A</span>
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer shrink-0"
            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Chia sẻ & QR */}
          <button
            type="button"
            onClick={onOpenShare}
            className="p-1 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition shadow-xs cursor-pointer shrink-0"
            title="Chia sẻ & Mã QR"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
