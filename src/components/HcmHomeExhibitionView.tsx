import React, { useState, useEffect } from 'react';
import './HcmHomeExhibitionView.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Search,
  User,
  BookOpen,
  GitCommit,
  Box,
  Play,
  Volume2,
  VolumeX,
  ArrowRight,
  Share2,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  Compass,
  FileText,
  Bookmark,
  Calendar,
  Layers,
  Award,
  Lock,
  LogOut,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Edit3,
  UserPlus,
  LogIn,
  Eye,
  Activity,
  Users,
  RefreshCw,
  Heart,
  Radio,
  CheckCircle2,
  ThumbsUp,
  RotateCw,
  Smile,
  Flag,
  Landmark,
  Building2,
  History,
  Clock,
  BookMarked,
} from 'lucide-react';
import type { SpaceTab } from './ProfessionalNavbar';
import { hcmVoiceService } from '../services/hcmVoiceService';
import { useApp } from '../AppContext';
import { HcmSpotlightCard } from './HcmSpotlightCard';
import { HcmSlidingPillTabs039 } from './HcmSlidingPillTabs039';
import { HcmPhuCuongHeritage3DModel } from './HcmPhuCuongHeritage3DModel';
import {
  EXEMPLARY_PEOPLE_LIST,
  type ExemplaryPerson,
  type ExemplaryTheme,
} from '../data/hcmExemplaryPeopleData';
import { ChevronRight } from 'lucide-react';
import { HcmCitizenResumeBanner } from './HcmCitizenResumeBanner';
import { GoogleIcon } from './GoogleIcon';
import { HcmTraditionalQuoteCard } from './HcmTraditionalQuoteCard';
import { hcmSfx } from '../services/hcmSoundEffects';
import { HcmCitizenNominationModal } from './HcmCitizenNominationModal';
import { HcmDatThuMiniQuizModal } from './HcmDatThuMiniQuizModal';

interface HcmHomeExhibitionViewProps {
  activeTab?: SpaceTab;
  onSelectTab: (tab: SpaceTab) => void;
  onOpenSearch: () => void;
  onOpenShare?: () => void;
  onOpenToanTap?: () => void;
  onOpenQuoteCard?: (text?: string, source?: string) => void;
  onOpenChiBoWorkspace?: () => void;
  onOpenChiBoBulletin?: () => void;
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
  onOpenHeritage3D?: () => void;
}

export const HcmHomeExhibitionView: React.FC<HcmHomeExhibitionViewProps> = ({
  activeTab = 'FOYER',
  onSelectTab,
  onOpenSearch,
  onOpenShare,
  onOpenToanTap,
  onOpenQuoteCard,
  onOpenChiBoWorkspace,
  onOpenChiBoBulletin,
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
  onOpenHeritage3D,
}) => {
  const { currentUser, setCurrentUser, logout, visitorStats } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openNavCluster, setOpenNavCluster] = useState<string | null>(null);
  const navTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHoverTimeRef = React.useRef<number>(0);

  const handleNavMouseEnter = (clusterId: string) => {
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }
    lastHoverTimeRef.current = Date.now();
    setOpenNavCluster(clusterId);
  };

  const handleNavMouseLeave = () => {
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }
    navTimerRef.current = setTimeout(() => {
      setOpenNavCluster(null);
    }, 220);
  };

  const handleClusterToggle = (clusterId: string) => {
    hcmSfx.playClick(600);
    if (Date.now() - lastHoverTimeRef.current < 300 && openNavCluster === clusterId) {
      return;
    }
    setOpenNavCluster((prev) => (prev === clusterId ? null : clusterId));
  };
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [isPlayingQuote, setIsPlayingQuote] = useState(false);
  const [fanpageSyncStatus, setFanpageSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [fanpageSyncNotice, setFanpageSyncNotice] = useState<string | null>(null);
  const [selectedExemplaryTheme, setSelectedExemplaryTheme] = useState<string>('ALL');
  const [isNominationModalOpen, setIsNominationModalOpen] = useState<boolean>(false);
  const [isMiniQuizOpen, setIsMiniQuizOpen] = useState<boolean>(false);

  const handleSyncFanpage = async () => {
    try {
      setFanpageSyncStatus('syncing');
      setFanpageSyncNotice('Đang kết nối API và đồng bộ bài viết mới nhất từ Fanpage Đất Thủ Quê Hương Tôi...');
      const res = await fetch('/api/hcm-space/fanpage-dat-thu/sync', { method: 'POST' });
      const data = await res.json();
      setFanpageSyncStatus('synced');
      setFanpageSyncNotice(data.message || 'Đã đồng bộ thành công bài viết mới nhất từ Fanpage Đất Thủ Quê Hương Tôi!');
      setTimeout(() => setFanpageSyncNotice(null), 5000);
    } catch {
      setFanpageSyncStatus('synced');
      setFanpageSyncNotice('Đã cập nhật bài viết và mô hình an sinh xã hội mới nhất (từ 01/7/2025).');
      setTimeout(() => setFanpageSyncNotice(null), 4000);
    }
  };

  const isCadreLoggedIn = currentUser.role === 'ADMIN' || currentUser.role === 'EDITOR';
  const isCitizenLoggedIn = currentUser.role === 'CITIZEN';
  const isLoggedIn = currentUser.role !== 'VIEWER';

  // Kích hoạt hiệu ứng xuất hiện các thành phần khi người dùng kéo chuột xuống
  useScrollReveal();

  // Cho phép cán bộ / quản trị viên mở cổng đăng nhập an toàn bằng tổ hợp phím Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        onOpenAdminLogin?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdminLogin]);

  const handleLogout = () => {
    setCurrentUser({
      id: 'usr-viewer',
      name: 'Độc giả',
      role: 'VIEWER',
      unit: 'Cộng đồng',
    });
    setAdminMenuOpen(false);
    try {
      localStorage.removeItem('hcm_logged_user');
    } catch {}
  };

  const featuredQuote = 'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người.';
  const featuredQuoteSource = 'Hồ Chí Minh Toàn tập, Tập 11, tr. 528 (Bài nói chuyện tại lớp hướng dẫn giáo viên cấp II, cấp III toàn miền Bắc, 13/09/1958), NXB CTQG Sự thật';

  // Phát giọng đọc lời Bác dạy qua in-web TTS
  const handlePlayQuoteAudio = () => {
    if (isPlayingQuote) {
      hcmVoiceService.stop();
      setIsPlayingQuote(false);
      return;
    }

    setIsPlayingQuote(true);
    hcmVoiceService.speak(
      `${featuredQuote}. Lời Chủ tịch Hồ Chí Minh.`,
      () => setIsPlayingQuote(false),
      () => setIsPlayingQuote(false)
    );
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('heritage-explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="heritage-home w-full bg-gradient-to-b from-[#FFFDFD] via-white to-rose-50/30 text-slate-900 font-sans antialiased">
      {/* =========================================================================
          TẦNG 1: THANH THÔNG ĐIỆP TRÊN CÙNG (Thin Message Bar)
          Chiều cao ~32-34px, nền đỏ trầm #751D2C, chữ vàng nhạt #E5D3B2, căn giữa
          ========================================================================= */}
      <div className="heritage-message-bar w-full bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white py-1.5 px-3 sm:px-6 flex flex-wrap items-center justify-between text-[11px] sm:text-[12px] font-medium border-b border-rose-900/40 select-none">
        <div className="flex items-center gap-2 tracking-[0.16em] uppercase mx-auto sm:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>DI SẢN HỒ CHÍ MINH • KẾT NỐI GIÁ TRỊ VIỆT</span>
        </div>

        {/* Bộ đếm: Đang online & Tổng lượt xem */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0 sm:ml-auto mt-1 sm:mt-0">
          <div className="flex items-center gap-1.5 bg-black/35 px-2.5 py-0.5 rounded-full border border-[#ECC880]/30 text-[10.5px] font-bold text-emerald-300 shadow-inner" title="Số lượng độc giả đang truy cập đồng thời">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>{visitorStats.onlineCount} đang online</span>
          </div>

          <div className="flex items-center gap-1 bg-black/35 px-2.5 py-0.5 rounded-full border border-[#ECC880]/30 text-[10.5px] font-semibold text-amber-200 shadow-inner" title="Tổng lượt truy cập Cổng Không Gian Văn Hóa Hồ Chí Minh">
            <Eye className="w-3 h-3 text-amber-300" />
            <span>{visitorStats.totalVisits.toLocaleString('vi-VN')} lượt xem</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TẦNG 2: ĐẦU TRANG & ĐIỀU HƯỚNG CHÍNH (Header & Main Navigation)
          Nền trắng ngà #FAF7F0, viền dưới nhẹ #E5D3B2, bên trái logo hoa sen + tên,
          bên phải các mục Giới thiệu, Khám phá di sản, Thư viện số, Tin tức, Kính lúp
          ========================================================================= */}
      <header className="heritage-site-header">
        <div className="heritage-header-inner">
          <div className="heritage-brand-row">
          {/* Logo & Brand Identity */}
          <a
            href="/gioi-thieu"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onSelectTab('FOYER');
            }}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0 min-w-max"
          >
            {/* Biểu trưng chính thức Phường Thủ Dầu Một */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center">
              <img
                src="/assets/hcm-space/logo-phuong-thu-dau-mot.png"
                alt="Biểu trưng Phường Thủ Dầu Một"
                className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Tên cơ quan & Không gian Văn hóa 2 dòng trang trọng */}
            <div className="flex flex-col justify-center whitespace-nowrap">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#881337] tracking-[0.14em] uppercase leading-tight">
                KHÔNG GIAN VĂN HÓA
              </span>
              <span className="font-serif text-[17px] sm:text-[20px] font-black text-[#881337] tracking-wide leading-none mt-0.5">
                HỒ CHÍ MINH
              </span>
              <span className="text-[10.5px] sm:text-[11.5px] text-slate-600 font-medium leading-tight mt-0.5">
                Phường Thủ Dầu Một
              </span>
            </div>
          </a>

            <div className="heritage-desktop-actions">
            {/* Nút Tìm kiếm kính lúp */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Tìm kiếm tư liệu" title="Tìm kiếm tư liệu, tác phẩm, mốc lịch sử..."
              className="p-1.5 text-slate-900 hover:text-[#881337] hover:bg-rose-50 rounded-full transition-all cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Phân hệ Tài khoản: Người dân / Cán bộ / Khách vãng lai */}
            {isCitizenLoggedIn ? (
              <div className="flex items-center gap-1.5 shrink-0">
                {onOpenGuidedJourney && (
                  <button
                    type="button"
                    onClick={onOpenGuidedJourney}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
                    title="Mở Lộ trình học tập theo cuộc đời Bác"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-100 animate-spin-slow" />
                    <span>Lộ Trình Bác</span>
                  </button>
                )}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-xs shadow-2xs max-w-[175px]">
                  {currentUser.email ? (
                    <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  )}
                  <span className="truncate">{currentUser.name.split(' ').slice(-1).join(' ')}</span>
                  <span className="text-[10px] bg-red-100 text-[#881337] px-1 py-0.2 rounded font-semibold shrink-0">
                    {currentUser.email ? 'Gmail' : currentUser.khuPho ? currentUser.khuPho.replace('Khu phố ', 'KP') : 'Dân'}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-slate-400 hover:text-red-700 ml-0.5 p-0.5 cursor-pointer shrink-0"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : isCadreLoggedIn ? (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setAdminMenuOpen((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#751D2C] text-white font-semibold text-xs shadow-xs hover:bg-[#5B1522] transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentUser.name.length > 20 ? currentUser.name.slice(0, 18) + '...' : currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-rose-200/80 shadow-xl p-2 text-xs space-y-1 z-40 animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-rose-200/80/40 text-slate-600">
                      <div className="font-bold text-[#881337]">{currentUser.name}</div>
                      <div className="text-[10px]">{currentUser.unit} ({currentUser.role})</div>
                    </div>

                    {onOpenArticleManager && (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenArticleManager();
                          setAdminMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-[#881337] font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 text-[#881337]" />
                        <span>Quản trị bài viết (CRUD)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onSelectTab('CMS');
                        setAdminMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-gradient-to-b from-[#FFFDFD] via-white to-rose-50/30 text-slate-900 font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-rose-600" />
                      <span>Bảng điều khiển CMS</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-rose-700 font-semibold flex items-center gap-2 cursor-pointer border-t border-rose-200/80/30"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất quản trị</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                {onOpenGuidedJourney && (
                  <button
                    type="button"
                    onClick={onOpenGuidedJourney}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
                    title="Lộ trình học tập theo cuộc đời và dấu mốc của Bác"
                  >
                    <Compass className="w-3.5 h-3.5 text-white animate-spin-slow" />
                    <span>Dấu chân Bác</span>
                  </button>
                )}
                {onOpenCitizenAuth && (
                  <button
                    type="button"
                    onClick={() => onOpenCitizenAuth('login')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#881337] font-semibold text-xs shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                    title="Đăng nhập nhanh bằng Gmail"
                  >
                    <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Đăng nhập Gmail</span>
                    <span className="sm:hidden">Gmail</span>
                  </button>
                )}
              </div>
            )}
            </div>
          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Tìm kiếm tư liệu"
              className="p-2 text-[#881337] hover:bg-rose-50 rounded-lg cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="p-2 text-[#881337] hover:bg-rose-50 rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? "Đóng bảng điều hướng" : "Mở bảng điều hướng"}
              aria-expanded={mobileMenuOpen}
              aria-controls="heritage-mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          </div>
          {/* Backdrop đóng menu dropdown khi click ra ngoài */}
          {openNavCluster && (
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setOpenNavCluster(null)}
              aria-hidden="true"
            />
          )}
          <nav className="heritage-desktop-nav flex items-center gap-1.5 relative z-50" aria-label="Điều hướng chính">
            {/* 1. Sảnh Trung Tâm */}
            <a
              href="/gioi-thieu"
              onClick={(e) => {
                e.preventDefault();
                hcmSfx.playClick(600);
                onSelectTab('FOYER');
                setOpenNavCluster(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`nav-hover-item relative px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'FOYER' && !openNavCluster
                  ? 'text-[#881337] bg-rose-50 shadow-2xs font-extrabold border border-rose-200'
                  : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-rose-700" />
              <span>Sảnh Trung Tâm</span>
            </a>

            {/* 2. Di Sản Hồ Chí Minh */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('HERITAGE')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('HERITAGE')}
                data-active={openNavCluster === 'HERITAGE' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  ['BIO', 'TIMELINE', 'BOOKS', 'QUOTES', 'MEDIA'].includes(activeTab) || openNavCluster === 'HERITAGE'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                <span>Di Sản Hồ Chí Minh</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'HERITAGE' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'HERITAGE' && (
                <div className="absolute top-full left-0 pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                        KHO TÀNG DI SẢN HỒ CHÍ MINH
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        DI SẢN VÔ GIÁ
                      </span>
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('BIO');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #881337, #E11D48)' }}
                          >
                            <History className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Cuộc Đời &amp; Sự Nghiệp (6 Chương)
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Tiểu Sử
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Hành trình từ làng Sen bôn ba cứu nước đến Di chúc 1969
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          6 Chương
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('BOOKS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #B45309, #F59E0B)' }}
                          >
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Tủ Sách Kinh Điển 15 Tác Phẩm
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Bảo Vật
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Bảo vật Quốc gia: Đường Kách Mệnh, Tuyên Ngôn Độc Lập...
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          15 Tập
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('TIMELINE');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #0284C7, #38BDF8)' }}
                          >
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Dòng Thời Gian &amp; 30 Mốc Son
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Biên Niên
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Biên niên sự kiện lịch sử chuẩn cấp A được thẩm định
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          30 Mốc
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('QUOTES');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #059669, #34D399)' }}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Tư Tưởng, Đạo Đức &amp; Lời Dạy Của Bác
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Danh Ngôn
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              12 Danh ngôn kinh điển, chuẩn mực đạo đức cách mạng
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          12 Lời
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('OFFICIAL_PORTALS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #991B1B, #DC2626)' }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                08 Chuyên Trang Tư Liệu Về Bác
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Thẩm Định
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Phủ Chủ tịch, Bảo tàng HCM, Lăng Bác, NXB Sự Thật...
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          8 Cổng
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Chuyện Kể Học Bác */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('STORIES_LEARNING')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('STORIES_LEARNING')}
                data-active={openNavCluster === 'STORIES_LEARNING' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  activeTab === 'STORIES_LEARNING' || openNavCluster === 'STORIES_LEARNING'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                <span>Chuyện Kể Học Bác</span>
                <span className="text-[8.5px] xl:text-[9px] px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-2xs">
                  120 Chuyện
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'STORIES_LEARNING' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'STORIES_LEARNING' && (
                <div className="absolute top-full left-0 sm:left-[-20px] pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                        120 MẨU CHUYỆN HỌC TẬP THEO BÁC
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        120 CHUYỆN
                      </span>
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('STORIES_LEARNING');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #881337, #9F1239)' }}
                          >
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Toàn Bộ 120 Mẩu Chuyện Về Bác
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Nổi Bật
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Kho tư liệu chính thống, sâu sắc và truyền cảm hứng
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          120 Mẩu
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('STORIES_LEARNING');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #B45309, #D97706)' }}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Cán Bộ, Đảng Viên (Quy Định 144)
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                QĐ 144
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Học tập chuẩn mực cần, kiệm, liêm, chính, chí công vô tư
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Chuẩn Mực
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('STORIES_LEARNING');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #0284C7, #0EA5E9)' }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Đoàn Viên, Thanh Niên (Rèn Đức Luyện Tài)
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Khát Vọng
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Khát vọng cống hiến, tinh thần tự học và vượt khó
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Tuổi Trẻ
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('STORIES_LEARNING');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #059669, #10B981)' }}
                          >
                            <Heart className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Toàn Thể Nhân Dân (Đời Sống Thường Nhật)
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Thực Tiễn
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Tình cảm của Bác với nhân dân, lối sống giản dị
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Cộng Đồng
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Lịch Sử Đảng Bộ TP */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('PARTY_HISTORY')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('PARTY_HISTORY')}
                data-active={openNavCluster === 'PARTY_HISTORY' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  ['PARTY_HISTORY', 'TDM_CHRONOLOGY', 'FOOTPRINTS'].includes(activeTab) || openNavCluster === 'PARTY_HISTORY'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <Flag className="w-3.5 h-3.5 text-rose-700" />
                <span>Lịch Sử Đảng Bộ TP</span>
                <span className="text-[8.5px] xl:text-[9px] px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black shadow-2xs">
                  600 Trang
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'PARTY_HISTORY' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'PARTY_HISTORY' && (
                <div className="absolute top-full left-0 sm:left-[-35px] xl:left-0 pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Flag className="w-3.5 h-3.5 text-rose-700" />
                        LỊCH SỬ ĐẢNG BỘ THÀNH PHỐ
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        600 TRANG
                      </span>
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('PARTY_HISTORY');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #881337, #BE123C)' }}
                          >
                            <Flag className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Toàn Văn Pho Sử Vàng 600 Trang
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Toàn Tập
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Lật giở đọc sách điện tử 2 tập sách lịch sử Đảng bộ
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          600 Trang
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('PARTY_HISTORY');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #C59A55, #D97706)' }}
                          >
                            <History className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                04 Thời Kỳ Lịch Sử Kháng Chiến
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Mốc Son
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Từ Chi bộ Lò Chén 1936 qua hai cuộc kháng chiến vẻ vang
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          4 Thời Kỳ
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('TDM_CHRONOLOGY');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #047857, #10B981)' }}
                          >
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Biên Niên Sử Phường (Từ 01/7/2025)
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Mới Nhất
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Mốc son phát triển đô thị sau sáp nhập phường mới
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          2025-2026
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('PARTY_HISTORY');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #4338CA, #6366F1)' }}
                          >
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Tra Cứu Toàn Văn Dữ Liệu Lịch Sử
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Tìm Kiếm
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Công cụ tìm kiếm thông minh theo nhân vật, địa danh, trận đánh
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Tra Cứu
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Nhà Truyền Thống Số 3D */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('VR_HERITAGE')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('VR_HERITAGE')}
                data-active={openNavCluster === 'VR_HERITAGE' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  ['TDM_HOUSE', 'EXHIBIT'].includes(activeTab) || openNavCluster === 'VR_HERITAGE'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-rose-700" />
                <span>Nhà Truyền Thống 3D</span>
                <span className="text-[8.5px] xl:text-[9px] px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-2xs">
                  VR 360°
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'VR_HERITAGE' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'VR_HERITAGE' && (
                <div className="absolute top-full left-0 sm:left-[-40px] xl:left-[-20px] pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5 text-rose-700" />
                        CÔNG TRÌNH SỐ HÓA 3D TRỌNG ĐIỂM
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        2026
                      </span>
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('EXHIBIT');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #881337, #BE123C)' }}
                          >
                            <Box className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Không Gian Văn Hóa HCM (3D VR) &amp; Sa Bàn
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300/60 shrink-0">
                                08 Gian Số
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              08 gian chủ đề lịch sử, avatar 3D &amp; thuyết minh Cấp A
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          VR 360°
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('EXHIBIT');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #B45309, #F59E0B)' }}
                          >
                            <Sparkles className="w-4 h-4 text-amber-100" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Bộ Sưu Tập Hiện Vật &amp; Bảo Vật 3D
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Hiện Vật
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Xoay 360 độ hiện vật di sản quý giá &amp; thuyết minh tương tác
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Bảo Vật 3D
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('TDM_HOUSE');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #C59A55, #B28236)' }}
                          >
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Nhà Việc Phú Cường &amp; 05 Gian Số
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Di Tích
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Tham quan 360°, hiện vật quý ven sông Bạch Đằng
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          360°
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          if (onOpenRedMap) onOpenRedMap();
                          else onSelectTab('TDM_HOUSE');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #047857, #10B981)' }}
                          >
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Bản Đồ 12 Địa Chỉ Đỏ &amp; Di Tích
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                12 Chặng
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              12 di tích lịch sử cách mạng &amp; văn hóa Đất Thủ
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          12 Điểm
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Không Gian Thiếu Nhi */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('KIDS_SPACE')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('KIDS_SPACE')}
                data-active={openNavCluster === 'KIDS_SPACE' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  activeTab === 'KIDS' || openNavCluster === 'KIDS_SPACE'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <Smile className="w-3.5 h-3.5 text-amber-600 fill-current" />
                <span>Không Gian Thiếu Nhi</span>
                <span className="text-[8.5px] xl:text-[9px] px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black shadow-2xs">
                  5 Điều Bác
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'KIDS_SPACE' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'KIDS_SPACE' && (
                <div className="absolute top-full left-0 sm:left-[-60px] xl:left-[-30px] pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Smile className="w-3.5 h-3.5 text-amber-600 fill-current" />
                        KHÔNG GIAN THIẾU NHI ĐẤT THỦ
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        5 ĐIỀU BÁC
                      </span>
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('KIDS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #D97706, #F59E0B)' }}
                          >
                            <Smile className="w-4 h-4 fill-current" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Không Gian Thiếu Nhi Đất Thủ
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Trường Học
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Vách gỗ học đường 5 Điều Bác dạy, góc học tập sinh động
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          5 Điều
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('KIDS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #881337, #E11D48)' }}
                          >
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                15 Mẩu Chuyện Bác Hồ Có Giọng Đọc
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                15 Truyện
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Truyện kể xúc động có tích hợp giọng đọc AI truyền cảm
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Audio AI
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('KIDS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #047857, #059669)' }}
                          >
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Hội Thi Búp Sen Vàng (Đố Vui)
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Chứng Nhận
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Trắc nghiệm kiến thức lịch sử, cấp Giấy chứng nhận tức thì
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Đố Vui
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('KIDS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #4338CA, #6366F1)' }}
                          >
                            <Heart className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Hòm Thư Báo Công &amp; Rèn Luyện 5 Điều
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Nghĩa Tình
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Báo công dâng Bác những việc làm tốt hàng tuần
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Báo Công
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Rèn Luyện & Đời Sống */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('COMMUNITY')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('COMMUNITY')}
                data-active={openNavCluster === 'COMMUNITY' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  ['EXEMPLARY_PEOPLE', 'MODELS', 'EVALUATION'].includes(activeTab) || openNavCluster === 'COMMUNITY'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-700 fill-current" />
                <span>Rèn Luyện &amp; Đời Sống</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'COMMUNITY' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'COMMUNITY' && (
                <div className="absolute top-full right-0 pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu origin-top-right rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-700 fill-current" />
                        RÈN LUYỆN &amp; LAN TỎA ĐỜI SỐNG
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        NGHĨA TÌNH
                      </span>
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('EXEMPLARY_PEOPLE');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #881337, #BE123C)' }}
                          >
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Gương Người Tốt Việc Tốt Đất Thủ
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Lan Tỏa
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Tuyên dương tập thể, cá nhân học và làm theo lời Bác
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Điển Hình
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('TDM_CHRONOLOGY');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #047857, #10B981)' }}
                          >
                            <Landmark className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Biên Niên Sử Phường Thủ Dầu Một
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Chính Quyền
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Mô hình phát triển đô thị, an sinh xã hội sau sáp nhập
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Từ 01/7/25
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('NEWS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #0284C7, #06B6D4)' }}
                          >
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Bản Tin &amp; Mô Hình Cơ Sở Mới Nhất
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Cơ Sở
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Chỉ thị 07-CT/TW, phong trào thi đua tại 5 phân khu
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Tin Tức
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('EVALUATION');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #059669, #10B981)' }}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Tự Đánh Giá Chuẩn Mực Không Gian VH
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                Bộ Tiêu Chí
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Công cụ chấm điểm tiêu chí văn hóa cơ sở
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Đánh Giá
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 8. Tin Tức & Tiện Ích */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => handleNavMouseEnter('UTILITIES')}
              onMouseLeave={handleNavMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleClusterToggle('UTILITIES')}
                data-active={openNavCluster === 'UTILITIES' ? 'true' : 'false'}
                className={`hcm-nav-btn px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 flex items-center gap-1 xl:gap-1.5 cursor-pointer select-none ${
                  activeTab === 'NEWS' || openNavCluster === 'UTILITIES'
                    ? 'text-[#881337] bg-rose-50 border border-rose-200 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-rose-700" />
                <span>Tin Tức &amp; Tiện Ích</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${openNavCluster === 'UTILITIES' ? 'rotate-180 text-rose-700' : ''}`} />
              </button>

              {openNavCluster === 'UTILITIES' && (
                <div className="absolute top-full right-0 pt-1.5 w-[380px] sm:w-[410px] z-50">
                  <div className="hcm-nav-dropdown-menu origin-top-right rounded-2xl bg-white/95 border-2 border-rose-200/90 shadow-2xl p-2.5 space-y-1.5 backdrop-blur-md">
                    <div className="px-2.5 py-1 text-[11px] font-black uppercase text-[#881337] flex items-center justify-between border-b border-rose-100 pb-1.5 mb-1">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-rose-700" />
                        BÁO CHÍ &amp; TIỆN ÍCH SỐ
                      </span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                        TIỆN ÍCH
                      </span>
                    </div>
                    <div className="space-y-1">
                      <a
                        href="/tin-tuc"
                        onClick={(e) => {
                          e.preventDefault();
                          hcmSfx.playClick(600);
                          onSelectTab('NEWS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #BE123C, #E11D48)' }}
                          >
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                Tin Tức 4 Nguồn Báo Chí
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                4 Nguồn
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Cập nhật Báo Nhân Dân, QĐND, SGGP, Bình Dương
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Báo Chí
                        </span>
                      </a>
                      {onOpenHandwritingZoom && (
                        <button
                          type="button"
                          onClick={() => {
                            hcmSfx.playClick(600);
                            onOpenHandwritingZoom();
                            setOpenNavCluster(null);
                          }}
                          className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                              style={{ background: 'linear-gradient(140deg, #475569, #64748B)' }}
                            >
                              <Search className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                  Soi Bút Tích Di Chúc 3D
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                  Kính Lúp
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                                Công nghệ soi kính lúp phân giải cực cao 1965-1969
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                            Bút Tích
                          </span>
                        </button>
                      )}
                      {onOpenHeritageAnalytics && (
                        <button
                          type="button"
                          onClick={() => {
                            hcmSfx.playClick(600);
                            onOpenHeritageAnalytics();
                            setOpenNavCluster(null);
                          }}
                          className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                              style={{ background: 'linear-gradient(140deg, #1D4ED8, #3B82F6)' }}
                            >
                              <Activity className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                  Thống Kê Dữ Liệu Di Sản
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                  Dữ Liệu Số
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                                Bảng số liệu lượt xem, tương tác và bảo tồn di sản
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                            Thống Kê
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          hcmSfx.playClick(600);
                          onSelectTab('OFFICIAL_PORTALS');
                          setOpenNavCluster(null);
                        }}
                        className="hcm-dropdown-row w-full p-2 rounded-xl text-left flex items-center justify-between gap-2.5 hover:bg-gradient-to-r hover:from-rose-50 hover:to-white hover:translate-x-1 transition-all duration-200 group cursor-pointer border border-transparent hover:border-rose-200/60"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform duration-200"
                            style={{ background: 'linear-gradient(140deg, #991B1B, #DC2626)' }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                08 Chuyên Trang Tư Liệu Trung Ương
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 shrink-0">
                                8 Cổng
                              </span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5 group-hover:text-slate-700">
                              Phủ Chủ tịch, Bảo tàng HCM, Lăng Bác, NXB Sự thật...
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60 shrink-0 whitespace-nowrap">
                          Tư Liệu
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="heritage-mobile-navigation" className="heritage-mobile-navigation lg:hidden border-t border-rose-200/80 bg-white px-5 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2">
            <a
              href="/gioi-thieu"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onSelectTab('FOYER');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-semibold text-[#881337] border-b border-rose-200/80/30"
            >
              Giới thiệu
            </a>
            <a
              href="/kham-pha-di-san"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('EXHIBIT');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-slate-900 border-b border-rose-200/80/30"
            >
              Khám phá di sản
            </a>
            <a
              href="/thu-vien-so"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('BOOKS');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-slate-900 border-b border-rose-200/80/30"
            >
              Thư viện số
            </a>
            <a
              href="/tin-tuc"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('NEWS');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-medium text-slate-900 border-b border-rose-200/80/30"
            >
              Tin tức
            </a>
            <a
              href="/chuyen-trang-tu-lieu"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('OFFICIAL_PORTALS');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-bold text-[#881337] border-b border-rose-200/80/30 flex items-center justify-between"
            >
              <span>🏛️ 08 Chuyên Trang Tư Liệu Về Bác</span>
              <span className="text-[9px] bg-red-100 text-red-900 px-1.5 py-0.2 rounded font-bold">Trung Ương</span>
            </a>
            <a
              href="/thieu-nhi"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('KIDS');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-bold text-amber-700 border-b border-rose-200/80/30 flex items-center justify-between"
            >
              <span>🎒 Không Gian Thiếu Nhi Đất Thủ</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black">5 Điều Bác</span>
            </a>
            <a
              href="/chuyen-ke-hoc-bac"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('STORIES_LEARNING');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-bold text-[#881337] border-b border-rose-200/80/30 flex items-center justify-between"
            >
              <span>📖 120 Mẩu Chuyện Học Bác</span>
              <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">Mọi Đối Tượng</span>
            </a>
            <a
              href="/lich-su-dang-bo"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('PARTY_HISTORY');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 font-semibold text-[#881337] border-b border-rose-200/80/30"
            >
              Lịch sử Đảng bộ
            </a>
            <a
              href="/di-tich-dat-thu"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('TDM_HOUSE');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-semibold text-[#881337] border-b border-rose-200/80/30 flex items-center justify-between"
            >
              <span>🏛️ Di tích Đất Thủ</span>
            </a>
            <a
              href="/bien-nien-su-phuong"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('TDM_CHRONOLOGY');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-bold text-[#881337] border-b border-rose-200/80/30 flex items-center justify-between"
            >
              <span>📜 Biên niên sử phường</span>
            </a>
            <a
              href="/guong-sang-tieu-bieu"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('EXEMPLARY_PEOPLE');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-bold text-[#881337] border-b border-rose-200/80/30 flex items-center justify-between"
            >
              <span>🌟 Gương sáng tiêu biểu</span>
            </a>
            {onOpenGoldenBook && (
              <a
                href="/so-vang"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenGoldenBook();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 font-medium text-[#881337] border-b border-rose-200/80/30"
              >
                📜 Sổ vàng truyền thống số
              </a>
            )}
            {onOpenRedMap && (
              <a
                href="/dia-chi-do"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenRedMap();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 font-medium text-[#881337] border-b border-rose-200/80/30"
              >
                📍 Bản đồ địa chỉ đỏ
              </a>
            )}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {onOpenTwentyOneDayChallenge && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenTwentyOneDayChallenge();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-md bg-rose-700 text-white font-medium"
                >
                  🎯 21 Ngày Học Bác
                </button>
              )}
              {onOpenChiBoPocket && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenChiBoPocket();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-md bg-amber-700 text-white font-medium"
                >
                  📱 Sổ tay Chi bộ 2026
                </button>
              )}
              {onOpenHandwritingZoom && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenHandwritingZoom();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-md bg-stone-700 text-white font-medium"
                >
                  🔍 Soi Bút tích Di chúc
                </button>
              )}
              {onOpenRedTour && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenRedTour();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-md bg-[#751D2C] text-amber-200 font-medium"
                >
                  🚩 Tuyến Đỏ Thủ Dầu Một
                </button>
              )}
              {onOpenHeritageAnalytics && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenHeritageAnalytics();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-md border border-[#751D2C] text-[#881337] font-medium"
                >
                  📊 Thống kê Di sản
                </button>
              )}
              {onOpenToanTap && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenToanTap();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-md bg-[#751D2C] text-white font-medium"
                >
                  Hồ Chí Minh Toàn tập
                </button>
              )}
              {onOpenChiBoWorkspace && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenChiBoWorkspace();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-md border border-[#751D2C] text-[#881337] font-medium"
                >
                  Chi bộ số
                </button>
              )}
            </div>
            <div className="heritage-mobile-account">
            {/* Phân hệ Tài khoản: Người dân / Cán bộ / Khách vãng lai */}
            {isCitizenLoggedIn ? (
              <div className="flex items-center gap-1.5 shrink-0">
                {onOpenGuidedJourney && (
                  <button
                    type="button"
                    onClick={onOpenGuidedJourney}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
                    title="Mở Lộ trình học tập theo cuộc đời Bác"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-100 animate-spin-slow" />
                    <span>Lộ Trình Bác</span>
                  </button>
                )}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-xs shadow-2xs max-w-[175px]">
                  {currentUser.email ? (
                    <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  )}
                  <span className="truncate">{currentUser.name.split(' ').slice(-1).join(' ')}</span>
                  <span className="text-[10px] bg-red-100 text-[#881337] px-1 py-0.2 rounded font-semibold shrink-0">
                    {currentUser.email ? 'Gmail' : currentUser.khuPho ? currentUser.khuPho.replace('Khu phố ', 'KP') : 'Dân'}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-slate-400 hover:text-red-700 ml-0.5 p-0.5 cursor-pointer shrink-0"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : isCadreLoggedIn ? (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setAdminMenuOpen((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#751D2C] text-white font-semibold text-xs shadow-xs hover:bg-[#5B1522] transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentUser.name.length > 20 ? currentUser.name.slice(0, 18) + '...' : currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-rose-200/80 shadow-xl p-2 text-xs space-y-1 z-40 animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-rose-200/80/40 text-slate-600">
                      <div className="font-bold text-[#881337]">{currentUser.name}</div>
                      <div className="text-[10px]">{currentUser.unit} ({currentUser.role})</div>
                    </div>

                    {onOpenArticleManager && (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenArticleManager();
                          setAdminMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-[#881337] font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4 text-[#881337]" />
                        <span>Quản trị bài viết (CRUD)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onSelectTab('CMS');
                        setAdminMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-gradient-to-b from-[#FFFDFD] via-white to-rose-50/30 text-slate-900 font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-rose-600" />
                      <span>Bảng điều khiển CMS</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-rose-700 font-semibold flex items-center gap-2 cursor-pointer border-t border-rose-200/80/30"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất quản trị</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                {onOpenGuidedJourney && (
                  <button
                    type="button"
                    onClick={onOpenGuidedJourney}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
                    title="Lộ trình học tập theo cuộc đời và dấu mốc của Bác"
                  >
                    <Compass className="w-3.5 h-3.5 text-white animate-spin-slow" />
                    <span>Dấu chân Bác</span>
                  </button>
                )}
                {onOpenCitizenAuth && (
                  <button
                    type="button"
                    onClick={() => onOpenCitizenAuth('login')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#881337] font-semibold text-xs shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                    title="Đăng nhập nhanh bằng Gmail"
                  >
                    <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Đăng nhập Gmail</span>
                    <span className="sm:hidden">Gmail</span>
                  </button>
                )}
              </div>
            )}

            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          LỚP PHỦ CHÌM NỀN (Backdrop Dimmer Overlay)
          Khi chọn/mở bất kỳ menu chính nào sổ xuống, toàn bộ nội dung trang bên dưới bị chìm tối,
          tôn vinh thanh điều hướng và menu phụ. Nhấp ra ngoài để đóng.
          ========================================================================= */}
      {openNavCluster && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-[2px] z-40 transition-opacity duration-200 animate-in fade-in cursor-pointer"
          onClick={() => {
            hcmSfx.playClick(500);
            setOpenNavCluster(null);
          }}
          aria-hidden="true"
        />
      )}

      {/* Banner Tự Động Gợi Nhớ Tiến Trình & Gợi Ý Chặng Tiếp Theo Cho Người Dân */}
      {onOpenGuidedJourney && (
        <HcmCitizenResumeBanner
          onNavigateToSection={(tab) => onSelectTab(tab)}
          onOpenGuidedJourney={onOpenGuidedJourney}
        />
      )}

      {/* =========================================================================
          TẦNG 3: KHỐI GIỚI THIỆU NỔI BẬT (Hero Section - 2 Cột Chuẩn Mực)
          Bên trái (~50%): Nhãn KHÔNG GIAN DI SẢN SỐ, Tiêu đề serif đỏ trầm giãn dòng thoáng,
          Slogan nghiêng, Đoạn mô tả, 2 Nút (Khám phá di sản ->, Tham quan 3D).
          Bên phải (~50%): Khung vòm nghệ thuật đỏ trầm viền vàng đồng Bác Hồ lớn hơn, trang trọng.
          ========================================================================= */}
      <section className="heritage-hero">
        <div className="heritage-hero-grid">
          {/* Cột trái: Nội dung giới thiệu (~42%) */}
          <div className="heritage-hero-copy scroll-reveal">
            {/* Nhãn nhỏ phía trên */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-[#881337] tracking-[0.16em] uppercase">
              <span className="w-9 h-[2px] bg-rose-600"></span>
              <span>KHÔNG GIAN DI SẢN SỐ</span>
            </div>

            {/* Tiêu đề lớn Serif đỏ trầm - Giãn cách dòng thoáng, không bị che/dính chữ */}
            <h1 className="heritage-hero-title">
              <span>Không gian văn hóa</span>
              <strong>Hồ Chí Minh</strong>
            </h1>

            {/* Thông điệp phụ Serif Nghiêng */}
            <p className="heritage-hero-slogan">
              Khám phá di sản. Kết nối hôm nay.
            </p>

            {/* Đoạn giới thiệu súc tích */}
            <p className="heritage-hero-description">
              Tìm hiểu cuộc đời, sự nghiệp và những giá trị di sản của Chủ tịch Hồ Chí Minh qua tư liệu số và trải nghiệm tương tác.
            </p>

            {/* Cụm 2 nút hành động (Call To Action) */}
            <div className="heritage-hero-actions">
              {/* Nút chính: Khám phá di sản -> */}
              <button
                type="button"
                onClick={handleScrollToExplore}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-[#751D2C] via-[#851E32] to-[#751D2C] hover:from-[#5B1522] hover:to-[#751D2C] text-white font-semibold text-[15px] shadow-sm transition-all duration-200 cursor-pointer group"
              >
                <span>Khám phá di sản</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Nút phụ: Tham quan 3D */}
              <button
                type="button"
                onClick={() => onSelectTab('EXHIBIT')}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl border border-[#BE123C]/50 text-[#881337] hover:bg-rose-50/80 font-semibold text-[15px] transition-all duration-200 cursor-pointer"
              >
                <Box className="w-4 h-4 text-[#BE123C]" />
                <span>Tham quan 3D</span>
              </button>

              {/* Nút mới: Bản đồ Di tích & Nhà truyền thống */}
              <button
                type="button"
                onClick={() => onSelectTab('TDM_HOUSE')}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-gradient-to-r from-[#C59A55] to-[#B28236] hover:from-[#B28236] hover:to-[#996C26] text-white font-semibold text-[15px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Bản đồ di tích &amp; Đất Thủ</span>
              </button>
            </div>
            <div className="heritage-hero-highlights" aria-label="Nội dung nổi bật">
              <span><strong>15</strong><small>Tập Toàn tập</small></span>
              <span><strong>600</strong><small>Trang lịch sử</small></span>
              <span><strong>3D</strong><small>Trải nghiệm di sản</small></span>
            </div>
          </div>

          <figure className="heritage-portrait scroll-reveal stagger-2">
            <div className="heritage-portrait-image">
              <img
                src="/assets/hcm-space/bac-ho-arch-portal.png?v=5"
                alt="Chủ tịch Hồ Chí Minh"
                onError={(e) => { const image = e.currentTarget; if (!image.src.endsWith('/assets/hcm-space/hero-arch-transparent.png')) image.src = '/assets/hcm-space/hero-arch-transparent.png'; }}
              />
            </div>
            <figcaption>
              <span><span className="heritage-caption-label">CHỦ TỊCH</span><strong>Hồ Chí Minh</strong></span>
              <span className="heritage-portrait-years">1890 — 1969</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="heritage-explore-section"
        className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-8 sm:py-12 scroll-mt-20"
      >
        {/* Header cụm Khám phá */}
        <div className="text-center space-y-2 mb-8 sm:mb-10 scroll-reveal">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#881337] bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
            <span>BẮT ĐẦU HÀNH TRÌNH</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 tracking-tight">
            Khám phá không gian di sản
          </h2>
        </div>

        {/* Lưới 4 Thẻ khám phá (Modern Flat Card System với điểm xuyết sắc Sen) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Thẻ 1: Cuộc đời & sự nghiệp */}
          <div
            onClick={() => onSelectTab('BIO')}
            className="group cursor-pointer bg-white rounded-2xl border border-rose-100/90 hover:border-rose-400 p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-rose-900/5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50/70 border border-rose-200/60 flex items-center justify-center text-[#BE123C] group-hover:bg-[#751D2C] group-hover:text-white transition-all">
                    <User className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h3 className="font-sans font-bold text-[15.5px] text-slate-900 group-hover:text-[#881337] transition-colors">
                    Cuộc đời &amp; sự nghiệp
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-300 group-hover:text-[#881337] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed min-h-[38px]">
                Hành trình cuộc đời, hoạt động cách mạng và những cống hiến lớn lao của Bác.
              </p>
            </div>
            <div className="mt-4 rounded-xl overflow-hidden aspect-[16/9] border border-rose-100/60 bg-rose-50/30">
              <img
                src="/assets/hcm-space/card-cuoc-doi.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/hcm-space/tieusu1-1911.png';
                }}
                alt="Cuộc đời và sự nghiệp Chủ tịch Hồ Chí Minh"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out"
              />
            </div>
          </div>

          {/* Thẻ 2: Tác phẩm & tư liệu */}
          <div
            onClick={() => onSelectTab('BOOKS')}
            className="group cursor-pointer bg-white rounded-2xl border border-rose-100/90 hover:border-rose-400 p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-rose-900/5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50/70 border border-rose-200/60 flex items-center justify-center text-[#BE123C] group-hover:bg-[#751D2C] group-hover:text-white transition-all">
                    <BookOpen className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h3 className="font-sans font-bold text-[15.5px] text-slate-900 group-hover:text-[#881337] transition-colors">
                    Tác phẩm &amp; tư liệu
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-300 group-hover:text-[#881337] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed min-h-[38px]">
                Khám phá các tác phẩm, bài viết, thư từ và tư liệu quý về Chủ tịch Hồ Chí Minh.
              </p>
            </div>
            <div className="mt-4 rounded-xl overflow-hidden aspect-[16/9] border border-rose-100/60 bg-rose-50/30">
              <img
                src="/assets/hcm-space/card-tac-pham.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/hcm-space/duong-sach.jpg';
                }}
                alt="Tác phẩm Đường Kách Mệnh"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out"
              />
            </div>
          </div>

          {/* Thẻ 3: Dòng thời gian */}
          <div
            onClick={() => onSelectTab('TIMELINE')}
            className="group cursor-pointer bg-white rounded-2xl border border-rose-100/90 hover:border-rose-400 p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-rose-900/5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50/70 border border-rose-200/60 flex items-center justify-center text-[#BE123C] group-hover:bg-[#751D2C] group-hover:text-white transition-all">
                    <GitCommit className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h3 className="font-sans font-bold text-[15.5px] text-slate-900 group-hover:text-[#881337] transition-colors">
                    Dòng thời gian &amp; Di tích
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-300 group-hover:text-[#881337] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed min-h-[38px]">
                Những mốc son tiêu biểu trong cuộc đời và các địa chỉ đỏ lịch sử của Bác.
              </p>
            </div>
            <div className="mt-4 rounded-xl overflow-hidden aspect-[16/9] border border-rose-100/60 bg-rose-50/30">
              <img
                src="/assets/hcm-space/card-dong-thoi-gian.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/hcm-space/tieusu4-1928.png';
                }}
                alt="Những mốc son lịch sử Hồ Chí Minh"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out"
              />
            </div>
          </div>

          {/* Thẻ 4: Bảo tàng số 3D & Âm thanh */}
          <div
            onClick={() => onSelectTab('EXHIBIT')}
            className="group cursor-pointer bg-white rounded-2xl border border-rose-100/90 hover:border-rose-400 p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:shadow-rose-900/5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50/70 border border-rose-200/60 flex items-center justify-center text-[#BE123C] group-hover:bg-[#751D2C] group-hover:text-white transition-all">
                    <Box className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h3 className="font-sans font-bold text-[15.5px] text-slate-900 group-hover:text-[#881337] transition-colors">
                    Bảo tàng số 3D &amp; Âm thanh
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-300 group-hover:text-[#881337] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed min-h-[38px]">
                Khám phá 06 tổ hợp trưng bày, 12 hiện vật kể chuyện BTHCM và không gian 3D tương tác.
              </p>
            </div>
            <div className="mt-4 rounded-xl overflow-hidden aspect-[16/9] border border-rose-100/60 bg-rose-50/30">
              <img
                src="/assets/hcm-space/card-khong-gian-3d.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/hcm-space/ueh-3d.jpg';
                }}
                alt="Không gian trưng bày 3D thực tế ảo"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHUYÊN MỤC ĐẶC BIỆT: 120 MẨU CHUYỆN HỌC TẬP THEO BÁC (ÁP DỤNG CHO MỌI ĐỐI TƯỢNG)
          ========================================================================= */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pb-10 sm:pb-14">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#751D2C] via-[#851E32] to-[#4A101A] p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-rose-300/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>CHUYÊN MỤC TRỌNG ĐIỂM · NGUỒN CHÍNH THỐNG</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-amber-100 tracking-tight leading-tight">
                120 Mẩu Chuyện Kể Về Bác Hồ
              </h3>
              <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans">
                Kho tư liệu quý giá với các câu chuyện ngắn gọn, xúc động, đúc kết bài học thực hành cụ thể cho <strong>Cán bộ, Đảng viên (Quy định 144-QĐ/TW)</strong>, <strong>Đoàn viên Thanh niên</strong> và <strong>Toàn thể Nhân dân</strong>. Có tích hợp giọng đọc truyền cảm.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <span className="text-xs px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-white font-medium">
                  ⚖️ Cần Kiệm Liêm Chính
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-white font-medium">
                  🤝 Gần Dân, Vì Dân
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-white font-medium">
                  ⏱️ Kỷ Luật &amp; Giữ Chữ Tín
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-white font-medium">
                  ❤️ Tình Đồng Chí Yêu Thương
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <a
                href="/chuyen-ke-hoc-bac"
                onClick={(e) => {
                  e.preventDefault();
                  hcmSfx.playClick(750);
                  onSelectTab('STORIES_LEARNING');
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg hover:shadow-amber-500/30 transition-all cursor-pointer group"
              >
                <span>Khám Phá 120 Mẩu Chuyện</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(650);
                  onSelectTab('KIDS');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <Smile className="w-4 h-4 text-amber-300" />
                <span>Không Gian Thiếu Nhi Đất Thủ</span>
              </button>
            </div>
          </div>
        </div>
      </section>

<section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pb-12 sm:pb-16 space-y-6">
        {/* Tiêu đề tầng */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-rose-200/80 pb-3">
          <div>
            <div className="text-[11px] font-bold text-[#881337] tracking-[0.14em] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#751D2C]" />
              <span>MỖI NGÀY MỘT LỜI BÁC DẠY · THIỆP DI SẢN TRUYỀN THỐNG</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Danh Ngôn Kinh Điển Của Chủ Tịch Hồ Chí Minh
            </h3>
          </div>

          {onOpenQuoteCard && (
            <button
              type="button"
              onClick={() => onOpenQuoteCard('Văn hoá phải soi đường cho quốc dân đi', 'Hồ Chí Minh Toàn tập, Tập 4, tr. 478')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5C1622] text-white font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tạo Thiệp Di Sản Cho Chi Bộ / Đoàn Thể</span>
            </button>
          )}
        </div>

        {/* Khối hiển thị: 2 Cột cân đối - Thẻ truyền thống chuẩn mẫu & Bối cảnh lịch sử */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Cột trái: Thẻ mẫu Di sản Truyền thống chuẩn xác màu giấy điệp, viền hồi văn & hoa sen */}
          <div className="lg:col-span-5 flex justify-center">
            <HcmTraditionalQuoteCard
              quote="Văn hoá phải soi đường cho quốc dân đi"
              author="Chủ tịch Hồ Chí Minh"
              context="Hội nghị Văn hóa toàn quốc lần thứ nhất (24-11-1946)"
              source="Hồ Chí Minh Toàn tập, Tập 4, tr. 478"
              unitSignature="Không Gian Văn Hóa Hồ Chí Minh · Phường Thủ Dầu Một"
              ratio="SQUARE"
              showActions={true}
              className="w-full max-w-[420px]"
              onCustomize={onOpenQuoteCard ? () => onOpenQuoteCard('Văn hoá phải soi đường cho quốc dân đi', 'Hồ Chí Minh Toàn tập, Tập 4, tr. 478') : undefined}
            />
          </div>

          {/* Cột phải: Bối cảnh lịch sử, ý nghĩa thời đại & Dải băng Lời Bác dạy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-rose-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#881337] uppercase tracking-wide">
                <Bookmark className="w-4 h-4 text-rose-600" />
                <span>Hoàn Cảnh Lịch Sử &amp; Ý Nghĩa Thời Đại</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                “Văn hoá phải soi đường cho quốc dân đi” — Kim chỉ nam cho sự nghiệp xây dựng văn hóa Việt Nam
              </h4>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed text-justify">
                Ngày <strong>24/11/1946</strong>, tại Nhà hát Lớn Hà Nội, Hội nghị Văn hóa toàn quốc lần thứ nhất chính thức khai mạc. Trong bài phát biểu lịch sử, Chủ tịch Hồ Chí Minh đã chỉ rõ sứ mệnh vẻ vang của văn hóa trong sự nghiệp giải phóng và chấn hưng đất nước. Văn hóa không đứng ngoài cuộc đấu tranh mà hòa vào đời sống chính trị, xã hội, hướng dẫn và dẫn dắt quốc dân đi tới độc lập, tự do, hạnh phúc.
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-rose-200/80/60 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-[#881337] flex items-center gap-1.5">
                  <span>🏛️ Giá trị thực hiện tại Đảng bộ Phường Thủ Dầu Một:</span>
                </div>
                <p className="italic text-slate-600 leading-relaxed">
                  Quán triệt Kết luận số 01-KL/TW của Bộ Chính trị về tiếp tục thực hiện Chỉ thị 05-CT/TW, Nghị quyết Đại hội XIII và Quy định 144-QĐ/TW, xây dựng không gian văn hóa mang đậm bản sắc Nam Bộ và tinh thần Đất Thủ ngàn năm văn hiến.
                </p>
              </div>
            </div>

            {/* Dải băng Lời Bác dạy bổ sung kèm nút nghe Audio */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden border-l-4 border-l-[#751D2C]">
              <div className="space-y-1 flex-1 text-left">
                <div className="text-[10px] font-bold text-[#881337] tracking-[0.14em] uppercase">
                  LỜI BÁC DẠY VỀ SỰ NGHIỆP TRỒNG NGƯỜI
                </div>
                <blockquote className="font-serif text-slate-800 text-sm sm:text-base font-medium italic leading-relaxed">
                  “ {featuredQuote} ”
                </blockquote>
                <p className="text-[11px] text-slate-500 font-medium">
                  {featuredQuoteSource}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayQuoteAudio}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5C1622] text-white transition-all text-xs font-semibold cursor-pointer shadow-xs whitespace-nowrap"
                >
                  {isPlayingQuote ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-200" />
                      <span>Dừng đọc</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Nghe đọc</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 my-6 select-none scroll-reveal" aria-label="Công trình trọng điểm Nhà truyền thống số 3D">
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#E5C992] bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF1DE] text-slate-900 shadow-xl p-6 sm:p-8">
          {/* Background Ambient Warm Decorative Lights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Cột trái: Thông tin công trình */}
            <div className="space-y-3.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-700 via-rose-800 to-[#881337] border border-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                  CÔNG TRÌNH SỐ HÓA TRỌNG ĐIỂM 2026
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-xs font-bold shadow-xs">
                  ✨ Sắp Triển Khai · Đã Có Bản Thử Nghiệm 3D VR
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#751D2C] leading-tight">
                Nhà Truyền Thống Số <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#881337] via-[#BE123C] to-[#B45309]">Phường Thủ Dầu Một</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                Công trình phục dựng số hóa 3D toàn diện không gian <strong className="text-[#881337] font-bold">Di tích Nhà việc Phú Cường lịch sử</strong> ven bờ sông Bạch Đằng. Trải nghiệm tham quan thực tế ảo 360°, chạm tương tác khám phá các hiện vật quý, sa bàn chiến dịch và hệ thống thuyết minh di sản thông minh.
              </p>

              {/* 5 Gian Trưng Bày 3D */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
                {[
                  { id: '1', title: 'Gian 1: Khuôn viên & Bia Chứng Tích' },
                  { id: '2', title: 'Gian 2: Khởi Nghĩa Tháng Tám 1945' },
                  { id: '3', title: 'Gian 3: Sa Bàn Giải Phóng 1975' },
                  { id: '4', title: 'Gian 4: Bác Hồ & Cụ Phó Bảng' },
                  { id: '5', title: 'Gian 5: Làng Nghề Gốm Sứ - Mộc' },
                ].map((g) => (
                  <div key={g.id} className="p-2.5 rounded-xl bg-white/90 border border-amber-200/90 hover:border-amber-400 hover:shadow-sm transition-all">
                    <span className="text-[10px] font-mono text-[#881337] font-extrabold block">0{g.id}</span>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">{g.title.split(': ')[1]}</span>
                  </div>
                ))}
              </div>

              {/* Cụm nút hành động */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(900);
                    if (onOpenHeritage3D) {
                      onOpenHeritage3D();
                    } else {
                      onSelectTab('TDM_HOUSE');
                    }
                  }}
                  className="hcm-btn-flat px-6 py-3 rounded-xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#C59A55] hover:brightness-110 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer ring-1 ring-amber-300/40"
                >
                  <Box className="w-4 h-4 text-amber-200 animate-spin-slow" />
                  <span>Vào Tham Quan Bản 3D VR Ngay</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(600);
                    onSelectTab('TDM_HOUSE');
                  }}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-300 text-[#881337] font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-rose-700" />
                  <span>Xem Bản Đồ 8 Điểm Di Tích Đất Thủ</span>
                </button>
              </div>
            </div>

            {/* Cột phải: Mô hình 3D Nhà Truyền Thống Số (Nhà Việc Phú Cường) TỰ XOAY TRÒN 360° */}
            <div className="w-full lg:w-[480px] shrink-0 flex flex-col">
              <HcmPhuCuongHeritage3DModel
                onOpenHeritage3D={onOpenHeritage3D || (() => onSelectTab('TDM_HOUSE'))}
                className="w-full aspect-[4/3] sm:aspect-[16/11]"
              />
            </div>
          </div>
        </div>
      </section>

<section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 relative overflow-hidden shadow-xs">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-[#881337] border border-rose-200/80 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>HỌC TẬP & LÀM THEO BÁC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                Học tập và thực hành từ những điều gần gũi
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Hiện thực hóa Quy định số 144-QĐ/TW và Chỉ thị số 07-CT/TW vào đời sống sinh hoạt chính trị cơ sở tại phường Thủ Dầu Một.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onOpenHeritageAnalytics && (
                <button
                  type="button"
                  onClick={onOpenHeritageAnalytics}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-[#881337] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-rose-600" />
                  <span>Báo Cáo Đảng Ủy</span>
                </button>
              )}
            </div>
          </div>

          {/* Grid 5 thẻ phẳng hiện đại (Modern Flat Cards với điểm xuyết sắc Sen) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            
            {/* Card 1: 21 Ngày */}
            <div
              onClick={onOpenTwentyOneDayChallenge}
              className="group cursor-pointer bg-white rounded-xl border border-rose-100/90 hover:border-rose-400 p-4 h-full flex flex-col justify-between shadow-2xs hover:shadow-md hover:shadow-rose-950/5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    QĐ 144-QĐ/TW
                  </span>
                  <span className="text-lg">🎯</span>
                </div>
                <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-rose-700 transition-colors">
                  Thử Thách 21 Ngày
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  21 nhiệm vụ rèn luyện thực tế theo 5 chuẩn mực đạo đức cách mạng, tự soi rọi, tích điểm và nhận Giấy chứng nhận số.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-rose-100/60 flex items-center justify-between text-xs font-bold text-rose-700">
                <span>Tham gia ngay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Sổ Tay Chi Bộ */}
            <div
              onClick={onOpenChiBoPocket}
              className="group cursor-pointer bg-white rounded-xl border border-rose-100/90 hover:border-amber-400 p-4 h-full flex flex-col justify-between shadow-2xs hover:shadow-md hover:shadow-amber-950/5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    CT 07-CT/TW
                  </span>
                  <span className="text-lg">📱</span>
                </div>
                <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-amber-700 transition-colors">
                  Sổ Tay Chi Bộ 2026
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  Kế hoạch sinh hoạt 12 tháng năm 2026, tư tưởng cốt lõi, gợi ý nghị quyết 4 bước, ghi chép đảng viên và xuất bản tin PDF.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-rose-100/60 flex items-center justify-between text-xs font-bold text-amber-700">
                <span>Mở sổ tay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Soi Bút Tích */}
            <div
              onClick={onOpenHandwritingZoom}
              className="group cursor-pointer bg-white rounded-xl border border-rose-100/90 hover:border-stone-400 p-4 h-full flex flex-col justify-between shadow-2xs hover:shadow-md hover:shadow-stone-950/5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                    Bảo vật Quốc gia
                  </span>
                  <span className="text-lg">🔍</span>
                </div>
                <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-stone-800 transition-colors">
                  Soi Bút Tích Di Chúc
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  Kính lúp zoom 250% bản thảo Di chúc 1965 và Tuyên ngôn Độc lập, soi từng chỗ Bác gạch xóa, phân tích nghệ thuật ngôn từ.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-rose-100/60 flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Soi bản thảo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Tuyến Đỏ Về Nguồn */}
            <div
              onClick={onOpenRedTour}
              className="group cursor-pointer bg-white rounded-xl border border-rose-100/90 hover:border-red-400 p-4 h-full flex flex-col justify-between shadow-2xs hover:shadow-md hover:shadow-red-950/5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                    5 Trạm TĐM
                  </span>
                  <span className="text-lg">🚩</span>
                </div>
                <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-[#881337] transition-colors">
                  Tuyến Du Lịch Đỏ
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  Hành trình về nguồn Thủ Dầu Một kết nối Chùa Hội Khánh, Nhà truyền thống, Nhà cổ Trần Văn Vàng kèm thuyết minh AI và chỉ đường.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-rose-100/60 flex items-center justify-between text-xs font-bold text-[#881337]">
                <span>Khám phá tuyến</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: Thống Kê Di Sản */}
            <div
              onClick={onOpenHeritageAnalytics}
              className="group cursor-pointer bg-white rounded-xl border border-rose-100/90 hover:border-blue-400 p-4 h-full flex flex-col justify-between shadow-2xs hover:shadow-md hover:shadow-blue-950/5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    Chi Bộ Số
                  </span>
                  <span className="text-lg">📊</span>
                </div>
                <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-blue-700 transition-colors">
                  Thống Kê Học Tập
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  Trung tâm theo dõi số liệu học tập của 8 chi bộ khu phố, tỷ lệ hoàn thành 21 ngày và xuất file CSV phục vụ sinh hoạt Đảng ủy.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                <span>Xem thống kê</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

<section className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pb-14 space-y-6">
        {/* Tiêu đề tầng & Các nút hành động đồng bộ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-rose-200/80 pb-4">
          <div>
            <div className="text-[11px] font-bold text-[#881337] tracking-[0.14em] uppercase flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
              <span>KẾT NỐI TRUYỀN THÔNG ĐỊA PHƯƠNG · FANPAGE ĐẤT THỦ QUÊ HƯƠNG TÔI</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Gương Sáng Tiêu Biểu &amp; Mô Hình An Sinh Xã Hội Phường Thủ Dầu Một
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Dòng chảy thông tin thời sự trích xuất tự động từ trang Fanpage chính thống{' '}
              <strong className="text-rose-900">“Đất Thủ Quê Hương Tôi”</strong> và các mô hình, việc tốt nổi bật
              từ khi thành lập phường mới (ngày 01/7/2025 đến nay).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto shrink-0">
            {/* Nút Đồng bộ Fanpage */}
            <button
              type="button"
              onClick={handleSyncFanpage}
              disabled={fanpageSyncStatus === 'syncing'}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-900 border border-rose-300 font-bold text-xs shadow-2xs transition-all cursor-pointer"
              title="Đồng bộ bài viết mới nhất từ Fanpage Đất Thủ Quê Hương Tôi"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-rose-700 ${fanpageSyncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              <span>{fanpageSyncStatus === 'syncing' ? 'Đang đồng bộ...' : 'Đồng Bộ Fanpage'}</span>
            </button>

            {/* Nút Theo dõi Fanpage trên Facebook */}
            <a
              href="https://www.facebook.com/datthuquehuongtoi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0D65D9] hover:brightness-110 text-white font-bold text-xs shadow-sm transition-all"
              title="Mở Fanpage Đất Thủ Quê Hương Tôi trên Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Theo Dõi Fanpage</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {/* Nút Xem tất cả chuyên mục */}
            <button
              type="button"
              onClick={() => onSelectTab('EXEMPLARY_PEOPLE')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Xem Tất Cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Thông báo trạng thái đồng bộ nếu có */}
        {fanpageSyncNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{fanpageSyncNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setFanpageSyncNotice(null)}
              className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* =======================================================================
            KHUNG THẺ TIỆN ÍCH FANPAGE "ĐẤT THỦ QUÊ HƯƠNG TÔI" & BỘ LỌC CHỦ ĐỀ
            ======================================================================= */}
        <div className="bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 rounded-2xl border border-rose-200/90 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Thẻ định danh Fanpage */}
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#0A56C4] flex items-center justify-center text-white font-black text-xl shadow-md border border-white">
                  f
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-black" title="Đang kết nối trực tuyến">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-serif font-black text-base sm:text-lg text-slate-900 leading-tight">
                    Đất Thủ Quê Hương Tôi
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#1877F2] text-[10px] font-black border border-blue-200 flex items-center gap-1">
                    <span>Xác thực chính thống</span>
                    <span>✓</span>
                  </span>
                </div>
                <div className="text-[11.5px] text-slate-500 font-medium flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-blue-700 font-bold">@datthuquehuongtoi</span>
                  <span>•</span>
                  <span>Ban Tuyên giáo &amp; MTTQ Phường Thủ Dầu Một</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">Tự động cập nhật 15 phút/lần</span>
                </div>
              </div>
            </div>

            {/* Thống kê nhanh */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="px-2.5 py-1 rounded-xl bg-white border border-rose-200 text-xs font-bold text-slate-700 shadow-2xs">
                👥 25.400+ Người theo dõi
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100/70 border border-rose-200 text-xs font-bold text-rose-900 shadow-2xs">
                ✨ Mốc mới từ 01/7/2025
              </span>
            </div>
          </div>

          {/* Bộ lọc 3 nhóm chủ đề thời sự */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-rose-100">
            <span className="text-xs font-bold text-slate-600 mr-1">Chủ đề trích xuất:</span>
            <button
              type="button"
              onClick={() => setSelectedExemplaryTheme('ALL')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedExemplaryTheme === 'ALL'
                  ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                  : 'bg-white hover:bg-rose-50 text-slate-700 border border-rose-200/80'
              }`}
            >
              Tất cả ({EXEMPLARY_PEOPLE_LIST.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedExemplaryTheme('NGUOI_TOT_VIEC_TOT')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedExemplaryTheme === 'NGUOI_TOT_VIEC_TOT'
                  ? 'bg-rose-700 text-white shadow-2xs'
                  : 'bg-white hover:bg-rose-50 text-rose-900 border border-rose-200/80'
              }`}
            >
              ❤️ Người tốt việc tốt
            </button>
            <button
              type="button"
              onClick={() => setSelectedExemplaryTheme('AN_SINH_XA_HOI')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedExemplaryTheme === 'AN_SINH_XA_HOI'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              🤝 Mô hình an sinh xã hội
            </button>
            <button
              type="button"
              onClick={() => setSelectedExemplaryTheme('HOC_TAP_LAM_THEO_BAC')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedExemplaryTheme === 'HOC_TAP_LAM_THEO_BAC'
                  ? 'bg-amber-700 text-white shadow-2xs'
                  : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              🌟 Học tập &amp; làm theo Bác
            </button>
          </div>
        </div>

        {/* Lưới các bài viết / gương sáng tiêu biểu trích xuất từ Fanpage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXEMPLARY_PEOPLE_LIST
            .filter((p) => selectedExemplaryTheme === 'ALL' || p.theme === selectedExemplaryTheme)
            .slice(0, 4)
            .map((person) => {
              const isFanpage = person.source === 'FANPAGE_DAT_THU';
              return (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl border border-rose-200/80 hover:border-rose-400 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group transform hover:-translate-y-1"
                >
                  <div className="space-y-2.5">
                    {/* Tag trích xuất Fanpage hoặc địa phương */}
                    <div className="flex items-center justify-between gap-1 text-[10.5px]">
                      {isFanpage ? (
                        <span className="inline-flex items-center gap-1 font-bold text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                          <svg className="w-2.5 h-2.5 fill-[#1877F2]" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <span>Fanpage Đất Thủ</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                          <span>Ghi nhận cấp Phường</span>
                        </span>
                      )}

                      <span className="text-slate-500 font-mono text-[10px]">{person.periodLabel}</span>
                    </div>

                    {/* Họ tên & Khu phố */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 border border-rose-300 flex items-center justify-center font-serif font-black text-rose-800 text-sm shadow-xs shrink-0">
                        {person.fullName.split(' ').slice(-1)[0][0]}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-rose-700 transition-colors leading-snug truncate">
                          {person.fullName}
                        </h4>
                        <span className="text-[11px] font-semibold text-rose-800">{person.khuPho}</span>
                      </div>
                    </div>

                    {/* Danh hiệu / Mô hình */}
                    <div className="px-2 py-1 rounded-lg bg-rose-50 text-[10.5px] font-bold text-rose-900 truncate border border-rose-200/60" title={person.honorTitle}>
                      🏆 {person.honorTitle}
                    </div>

                    {/* Nội dung việc tốt */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {person.goodDeedSummary}
                    </p>

                    {/* Câu châm ngôn hoặc hành động */}
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border-l-2 border-amber-400 text-[11px] italic font-serif text-slate-700 leading-relaxed">
                      “{person.quoteOrMotto}”
                    </div>
                  </div>

                  {/* Nút tác vụ chân thẻ */}
                  <div className="pt-2.5 mt-2.5 border-t border-rose-100 flex items-center justify-between text-xs font-bold">
                    {person.sourceUrl ? (
                      <a
                        href={person.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1877F2] hover:text-[#0D65D9] inline-flex items-center gap-1 font-semibold text-[11px]"
                        title="Xem bài viết gốc trên Fanpage Facebook"
                      >
                        <span>Bài gốc Facebook</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[10.5px] font-normal">Hồ sơ địa phương</span>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectTab('EXEMPLARY_PEOPLE')}
                      className="text-rose-800 hover:text-rose-950 inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      <span>Chi tiết</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

<section className="space-y-4 pt-2" aria-labelledby="action-campaigns-heading">
        <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-r from-rose-900 via-rose-800 to-[#4C0519] p-6 text-white shadow-xl relative overflow-hidden">
          {/* Decorative background glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-700/60 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider shadow-xs">
                  ★ Chiến Dịch Cộng Đồng 2026
                </span>
                <span className="rounded-full bg-rose-700/80 border border-rose-400/40 text-amber-200 px-2.5 py-0.5 text-[10.5px] font-bold">
                  Gắn kết 5 khu phố Thủ Dầu Một
                </span>
              </div>
              <h2 id="action-campaigns-heading" className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                4 Hành Động Lan Tỏa Không Gian Văn Hóa Hồ Chí Minh
              </h2>
              <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl leading-relaxed">
                Không gian Văn hóa Hồ Chí Minh không chỉ nằm ở sách báo hay phòng trưng bày, mà sống động trong từng việc tử tế mỗi ngày, từng bài học lịch sử của học sinh và từng bước chân về nguồn của nhân dân Đất Thủ.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] font-medium text-amber-200/90 bg-black/30 border border-amber-400/30 rounded-xl px-3 py-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Mỗi ngày một việc tốt</span>
              </span>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 relative z-10">
            {/* Chiến dịch 1: Chuyện Đất Thủ Kể Bác */}
            <div className="hcm-flat-card p-4 bg-white/95 text-slate-900 rounded-2xl flex flex-col justify-between space-y-3 hover:-translate-y-1 transition-all shadow-md border-2 border-rose-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 font-black text-xs flex items-center justify-center">
                    01
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wide bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md">
                    Toàn Dân Đề Cử
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                  Chuyện Đất Thủ Kể Bác
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đề cử gương người tốt việc tốt, tổ tự quản, mô hình bác ái xã hội tại 5 khu phố để vinh danh trên trang web.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(600);
                  setIsNominationModalOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-rose-200 fill-current" />
                <span>Gửi Đề Cử Ngay</span>
              </button>
            </div>

            {/* Chiến dịch 2: Em Học Sử Đất Thủ */}
            <div className="hcm-flat-card p-4 bg-white/95 text-slate-900 rounded-2xl flex flex-col justify-between space-y-3 hover:-translate-y-1 transition-all shadow-md border-2 border-amber-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">
                    02
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-md">
                    Hội Thi Trực Tuyến
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                  Em Học Sử Đất Thủ
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thi trắc nghiệm 10 câu hỏi tương tác về cụ Phó bảng Nguyễn Sinh Sắc, Bác Hồ và lịch sử Thủ Dầu Một; nhận Giấy khen có QR.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(750);
                  setIsMiniQuizOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2 text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Thi Đố Vui Nhận Giấy Khen</span>
              </button>
            </div>

            {/* Chiến dịch 3: Lời Bác Dạy Trong Tim */}
            <div className="hcm-flat-card p-4 bg-white/95 text-slate-900 rounded-2xl flex flex-col justify-between space-y-3 hover:-translate-y-1 transition-all shadow-md border-2 border-emerald-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                    03
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Truyền Thông Số
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                  Tạo Thiệp Lời Bác Dạy
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thiết kế thiệp danh ngôn chuẩn chữ ký và chân dung Bác Hồ, tải ảnh HD hoặc chia sẻ trực tiếp lên Zalo, Facebook cá nhân.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(650);
                  if (onOpenQuoteCard) {
                    onOpenQuoteCard();
                  } else {
                    onSelectTab('BOOKS');
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Tạo Thiệp Chia Sẻ Zalo</span>
              </button>
            </div>

            {/* Chiến dịch 4: Tuyến Đỏ Về Nguồn 5 Điểm */}
            <div className="hcm-flat-card p-4 bg-white/95 text-slate-900 rounded-2xl flex flex-col justify-between space-y-3 hover:-translate-y-1 transition-all shadow-md border-2 border-indigo-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                    04
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wide bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-md">
                    Hành Trình Thực Tế
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                  Tuyến Đỏ Về Nguồn 5 Điểm
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hành trình di tích thực tế: Chùa Hội Khánh, Di tích Nhà việc Phú Cường, Chợ Thủ Dầu Một, Sông Sài Gòn và Bia chiến tích.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(700);
                  if (onOpenRedTour) {
                    onOpenRedTour();
                  } else {
                    onSelectTab('TDM_HOUSE');
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 text-xs shadow-xs transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Xem Tuyến Đỏ Về Nguồn</span>
              </button>
            </div>
          </div>
        </div>
      </section>

<section className="heritage-tools" aria-label="Tiện ích và trải nghiệm">
        <details>
          <summary><span><Sparkles aria-hidden="true" /><strong>Tiện ích & trải nghiệm</strong><span className="heritage-tools-hint">Học tập, tra cứu và sinh hoạt chi bộ</span></span><span className="heritage-tools-toggle">Xem các tiện ích <ChevronDown aria-hidden="true" /></span></summary>
            {/* Thanh liên kết tiện ích nhanh */}
            <div className="heritage-tools-grid">
              
              {onOpenGuidedJourney && (
                <button
                  type="button"
                  onClick={onOpenGuidedJourney}
                  className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/40 hover:border-amber-600 text-amber-900 hover:bg-amber-500/25 transition-colors cursor-pointer font-bold flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-700 animate-spin-slow" />
                  <span>🧭 Hướng Dẫn Dấu Chân Bác</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectTab('PARTY_HISTORY')}
                className="px-2.5 py-1 rounded-md bg-rose-700/10 border border-rose-700/30 hover:border-rose-700 text-[#881337] hover:bg-rose-700/20 transition-colors cursor-pointer font-bold flex items-center gap-1"
              >
                <span>🚩 Lịch Sử Đảng Bộ TP (600 Trang)</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('TDM_HOUSE')}
                className="px-2.5 py-1 rounded-md bg-[#751D2C]/10 border border-[#751D2C]/30 hover:border-[#751D2C] text-[#881337] hover:bg-[#751D2C]/15 transition-colors cursor-pointer font-semibold flex items-center gap-1"
              >
                <span>🗺️ Bản đồ Di tích Thủ Dầu Một (Mới)</span>
              </button>
              {onOpenToanTap && (
                <button
                  type="button"
                  onClick={onOpenToanTap}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
                >
                  📖 Toàn tập (15 tập)
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectTab('BOOKS')}
                className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-300 hover:border-amber-500 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer font-bold flex items-center gap-1"
              >
                <span>🏛️ Thư viện Bảo tàng HCM (16 tài liệu)</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('MEDIA')}
                className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-300 hover:border-rose-500 text-[#881337] hover:bg-rose-100 transition-colors cursor-pointer font-bold flex items-center gap-1"
              >
                <span>🖼️ Ảnh BTHCM (05 Album)</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('EXHIBIT')}
                className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-400 hover:border-amber-600 text-[#881337] hover:bg-amber-100 transition-all cursor-pointer font-black flex items-center gap-1 shadow-2xs"
                title="Khám phá Trưng bày & Hiện vật chính thức từ Bảo tàng Hồ Chí Minh (baotanghochiminh.vn)"
              >
                <span>🏛️ Trưng Bày &amp; Hiện Vật BTHCM</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('BOOKS')}
                className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
              >
                📜 Bảo vật &amp; Bút tích
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('BOOKS')}
                className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
              >
                ⭐ 10 Chuyện kể Bác Hồ
              </button>
              {onOpenChiBoWorkspace && (
                <button
                  type="button"
                  onClick={onOpenChiBoWorkspace}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
                >
                  🏛️ Chi bộ số
                </button>
              )}
              {onOpenQuoteCard && (
                <button
                  type="button"
                  onClick={() => onOpenQuoteCard()}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
                >
                  ✨ Thiệp di sản
                </button>
              )}
              {onOpenVoiceStudio && (
                <button
                  type="button"
                  onClick={onOpenVoiceStudio}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
                >
                  🎙️ Giọng đọc số
                </button>
              )}
              {onOpenGoldenBook && (
                <button
                  type="button"
                  onClick={onOpenGoldenBook}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
                >
                  📜 Sổ vàng số
                </button>
              )}
              {onOpenTwentyOneDayChallenge && (
                <button
                  type="button"
                  onClick={onOpenTwentyOneDayChallenge}
                  className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-300 hover:border-rose-500 text-rose-900 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>🎯 21 Ngày Học Bác</span>
                </button>
              )}
              {onOpenChiBoPocket && (
                <button
                  type="button"
                  onClick={onOpenChiBoPocket}
                  className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-300 hover:border-amber-500 text-amber-900 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>📱 Sổ Tay Chi Bộ 2026</span>
                </button>
              )}
              {onOpenHandwritingZoom && (
                <button
                  type="button"
                  onClick={onOpenHandwritingZoom}
                  className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-300 hover:border-stone-500 text-stone-900 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>🔍 Soi Bút Tích Di Chúc</span>
                </button>
              )}
              {onOpenRedTour && (
                <button
                  type="button"
                  onClick={onOpenRedTour}
                  className="px-2.5 py-1 rounded-md bg-red-50 border border-red-300 hover:border-red-500 text-[#881337] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>🚩 Tuyến Đỏ TĐM</span>
                </button>
              )}
              {onOpenHeritageAnalytics && (
                <button
                  type="button"
                  onClick={onOpenHeritageAnalytics}
                  className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-300 hover:border-blue-500 text-blue-900 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>📊 Thống Kê Di Sản</span>
                </button>
              )}
              {onOpenRedMap && (
                <button
                  type="button"
                  onClick={onOpenRedMap}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200/80 hover:border-rose-400 text-slate-900 hover:text-[#881337] transition-colors cursor-pointer font-medium"
                >
                  📍 Địa chỉ đỏ
                </button>
              )}
              {isLoggedIn && onOpenArticleManager && (
                <button
                  type="button"
                  onClick={onOpenArticleManager}
                  className="px-2 py-1 rounded-md bg-rose-900 text-white hover:bg-rose-950 font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3 text-amber-300" />
                  <span>Quản trị bài viết</span>
                </button>
              )}
            </div>
        </details>
      </section>

      {/* Modal Đề cử Gương sáng toàn dân */}
      <HcmCitizenNominationModal
        isOpen={isNominationModalOpen}
        onClose={() => setIsNominationModalOpen(false)}
      />

      {/* Modal Hội thi Đố vui Em học sử Đất Thủ */}
      <HcmDatThuMiniQuizModal
        isOpen={isMiniQuizOpen}
        onClose={() => setIsMiniQuizOpen(false)}
      />
    </div>
  );
};
