import React, { useRef, useState, useEffect } from 'react';
import {
  Landmark,
  Building2,
  FileText,
  BookOpen,
  Calendar,
  BookMarked,
  Quote,
  Compass,
  Film,
  Award,
  ShieldCheck,
  Box,
  Sparkles,
  Sliders,
  ChevronDown,
  Flag,
  History,
  Smile,
  Heart,
  HelpCircle,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { hcmSfx } from '../services/hcmSoundEffects';

export type SpaceTab =
  | 'FOYER'
  | 'PARTY_HISTORY'
  | 'TDM_HOUSE'
  | 'TDM_CHRONOLOGY'
  | 'EXEMPLARY_PEOPLE'
  | 'KIDS'
  | 'STORIES_LEARNING'
  | 'NEWS'
  | 'BIO'
  | 'TIMELINE'
  | 'BOOKS'
  | 'QUOTES'
  | 'FOOTPRINTS'
  | 'MEDIA'
  | 'MODELS'
  | 'EVALUATION'
  | 'EXHIBIT'
  | 'AI_STUDIO'
  | 'EXPLORER'
  | 'CMS';

export interface TabConfig {
  id: SpaceTab;
  label: string;
  shortLabel?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeCls?: string;
}

export interface NavCluster {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeCls?: string;
  tabs: TabConfig[];
}

interface ProfessionalNavbarProps {
  activeTab: SpaceTab;
  onSelectTab: (tab: SpaceTab) => void;
  canEdit?: boolean;
  totalNewsCount?: number;
  wardModelsCount?: number;
  dossierCount?: number;
  cmsPendingCount?: number;
}

export const ProfessionalNavbar: React.FC<ProfessionalNavbarProps> = ({
  activeTab,
  onSelectTab,
  canEdit = true,
  totalNewsCount = 28,
  wardModelsCount = 4,
  dossierCount = 41,
  cmsPendingCount = 0,
}) => {
  const [openClusterId, setOpenClusterId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Cấu trúc 5 Cụm danh mục chuẩn mực
  const clusters: NavCluster[] = [
    {
      id: 'FOYER_CLUSTER',
      label: 'Sảnh Trung Tâm',
      shortLabel: 'Trang Chủ',
      icon: Landmark,
      tabs: [
        {
          id: 'FOYER',
          label: 'Sảnh Trung Tâm Toàn Cảnh',
          description: 'Cổng thông tin tổng quan, điểm nhấn di tích và chuyển đổi số',
          icon: Landmark,
        },
      ],
    },
    {
      id: 'TDM_CLUSTER',
      label: 'Đất Thủ Anh Hùng',
      shortLabel: 'Đất Thủ',
      icon: Flag,
      badge: 'Trọng điểm',
      badgeCls: 'bg-rose-100 text-[#751D2C] font-bold',
      tabs: [
        {
          id: 'PARTY_HISTORY',
          label: 'Lịch Sử Đảng Bộ TP Thủ Dầu Một',
          description: '600 trang tư liệu lịch sử số hóa lật giở tương tác',
          icon: Flag,
          badge: '600 Trang',
          badgeCls: 'bg-amber-400 text-slate-950 font-black',
        },
        {
          id: 'TDM_HOUSE',
          label: 'Di Tích & Nhà Truyền Thống Số 3D',
          description: 'Phục dựng 3D Di tích Nhà việc Phú Cường & bản đồ số',
          icon: Building2,
          badge: 'Bản đồ 3D',
          badgeCls: 'bg-rose-100 text-[#751D2C] font-bold',
        },
        {
          id: 'TDM_CHRONOLOGY',
          label: 'Biên Niên Sử Phường (Từ 01/7/2025)',
          description: 'Mô hình phát triển đô thị, an sinh xã hội sau sáp nhập',
          icon: History,
          badge: 'Từ 01/7/2025',
          badgeCls: 'bg-amber-400 text-slate-950 font-black',
        },
        {
          id: 'FOOTPRINTS',
          label: 'Bản Đồ Di Sản & Dấu Chân Bác',
          description: '10 chặng hành trình cứu nước và địa chỉ đỏ Đất Thủ',
          icon: Compass,
          badge: '10 Chặng',
          badgeCls: 'bg-emerald-100 text-emerald-800 font-bold',
        },
      ],
    },
    {
      id: 'HERITAGE_CLUSTER',
      label: 'Di Sản Hồ Chí Minh',
      shortLabel: 'Di Sản Bác',
      icon: BookOpen,
      tabs: [
        {
          id: 'BIO',
          label: 'Cuộc Đời & Sự Nghiệp Vĩ Đại',
          description: '6 chương biên niên sử trọn vẹn về cuộc đời Chủ tịch Hồ Chí Minh',
          icon: BookOpen,
          badge: '6 Chương',
          badgeCls: 'bg-amber-100 text-amber-900 font-bold',
        },
        {
          id: 'TIMELINE',
          label: '08 Thời Kỳ Lịch Sử & Timeline',
          description: 'Dòng thời gian sự kiện lịch sử qua các mốc son cứu nước',
          icon: Calendar,
          badge: '8 Thời Kỳ',
          badgeCls: 'bg-blue-100 text-blue-800 font-bold',
        },
        {
          id: 'BOOKS',
          label: 'Tác Phẩm & Tủ Sách Toàn Tập',
          description: '15 tập Hồ Chí Minh Toàn tập và tác phẩm kinh điển',
          icon: BookMarked,
          badge: '15+ Tập',
          badgeCls: 'bg-amber-100 text-amber-900 font-bold',
        },
        {
          id: 'QUOTES',
          label: 'Lời Bác Dạy & Tư Tưởng',
          description: 'Trích dẫn xác thực, phát âm thanh và tạo thiệp chia sẻ',
          icon: Quote,
          badge: '12+',
          badgeCls: 'bg-rose-100 text-rose-800 font-bold',
        },
        {
          id: 'MEDIA',
          label: 'Đa Phương Tiện & Giọng Nói VOV',
          description: 'Bản ghi âm giọng đọc Bác Hồ gốc VOV và tư liệu phim trẻ',
          icon: Film,
          badge: 'VOV · Video',
          badgeCls: 'bg-rose-100 text-rose-800 font-bold',
        },
        {
          id: 'EXHIBIT',
          label: 'Trưng Bày BTHCM & Không Gian 3D',
          description: 'Không gian số hóa bảo tàng ảo và hiện vật 3D tương tác',
          icon: Box,
          badge: '3D VR',
          badgeCls: 'bg-amber-500 text-slate-950 font-black',
        },
      ],
    },
    {
      id: 'PRACTICE_CLUSTER',
      label: 'Rèn Luyện & Thiếu Nhi',
      shortLabel: 'Rèn Luyện',
      icon: Heart,
      badge: 'Thiếu Nhi ★',
      badgeCls: 'bg-amber-400 text-slate-950 font-black',
      tabs: [
        {
          id: 'KIDS',
          label: 'Không Gian Thiếu Nhi Vâng Lời Bác',
          description: 'Vách gỗ học đường, 10 truyện kể TTS, đố vui nhận giấy khen, 5 điều Bác dạy',
          icon: Smile,
          badge: 'Học sinh & Đội',
          badgeCls: 'bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-black',
        },
        {
          id: 'EXEMPLARY_PEOPLE',
          label: 'Gương Sáng Tiêu Biểu Đất Thủ',
          description: 'Người tốt việc tốt, phong trào học tập và làm theo lời Bác',
          icon: Sparkles,
          badge: 'Gương Sáng',
          badgeCls: 'bg-gradient-to-r from-rose-600 to-[#881337] text-white font-bold',
        },
        {
          id: 'MODELS',
          label: 'Học Bác Tại Phường',
          description: 'Các mô hình thực tiễn tại các khu phố và đoàn thể Thủ Dầu Một',
          icon: Award,
          badge: String(wardModelsCount),
          badgeCls: 'bg-rose-100 text-rose-800 font-bold',
        },
        {
          id: 'EVALUATION',
          label: 'Bộ Tiêu Chí Đánh Giá QĐ 144',
          description: 'Chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới',
          icon: ShieldCheck,
          badge: 'QĐ 144',
          badgeCls: 'bg-emerald-100 text-emerald-800 font-bold',
        },
      ],
    },
    {
      id: 'UTILITIES_CLUSTER',
      label: 'Truyền Thông & Tiện Ích',
      shortLabel: 'Tiện Ích',
      icon: FileText,
      badge: String(totalNewsCount),
      badgeCls: 'bg-rose-100 text-rose-800 font-bold',
      tabs: [
        {
          id: 'NEWS',
          label: 'Tin Tức 4 Nguồn Báo Chí',
          description: 'Báo Bình Dương, Thành ủy, Báo Nhân Dân, Tạp chí Xây dựng Đảng',
          icon: FileText,
          badge: String(totalNewsCount),
          badgeCls: 'bg-rose-100 text-rose-800 font-bold',
        },
        {
          id: 'AI_STUDIO',
          label: 'Trợ Lý AI Tham Mưu Hồ Chí Minh',
          description: 'Hỏi đáp tư tưởng, tra cứu văn kiện và gợi ý bài giảng tuyên truyền',
          icon: Sparkles,
          badge: 'AI Trực Tuyến',
          badgeCls: 'bg-indigo-100 text-indigo-800 font-bold',
        },
        {
          id: 'EXPLORER',
          label: 'Tra Cứu Hồ Sơ Tư Liệu Toàn Văn',
          description: 'Tìm kiếm nhanh hơn 41 hồ sơ văn kiện, tác phẩm và hiện vật',
          icon: Search,
          badge: `${dossierCount} Hồ Sơ`,
          badgeCls: 'bg-slate-200 text-slate-800 font-bold',
        },
        ...(canEdit
          ? [
              {
                id: 'CMS' as SpaceTab,
                label: 'Cổng Quản Trị Di Sản CMS',
                description: 'Kiểm duyệt bài viết, chỉnh sửa dữ liệu số hóa',
                icon: Sliders,
                badge: cmsPendingCount > 0 ? String(cmsPendingCount) : 'Quản trị',
                badgeCls: 'bg-red-600 text-white font-bold',
              },
            ]
          : []),
      ],
    },
  ];

  // Tìm cụm hiện tại đang chứa activeTab
  const activeCluster = clusters.find((c) => c.tabs.some((t) => t.id === activeTab)) || clusters[0];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenClusterId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTabItem = (tabId: SpaceTab) => {
    hcmSfx.playClick(650);
    onSelectTab(tabId);
    setOpenClusterId(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navContainerRef}
      aria-label="Thanh điều hướng Không gian Văn hóa Hồ Chí Minh"
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs select-none"
    >
      {/* ========================================================================= */}
      {/* TẦNG 1: 5 CỤM DANH MỤC LỚN (DESKTOP) & NÚT MOBILE MENU                     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-13 gap-2">
          {/* Logo/Icon mini đại diện */}
          <button
            type="button"
            onClick={() => handleSelectTabItem('FOYER')}
            className="flex items-center gap-2 text-rose-900 font-serif font-black text-sm sm:text-base tracking-tight shrink-0 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-700 to-[#751D2C] text-white flex items-center justify-center shadow-xs">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="hidden md:inline font-bold">Không Gian Văn Hóa HCM</span>
          </button>

          {/* 5 CỤM MENU CHÍNH (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-1.5 flex-1 justify-center">
            {clusters.map((cluster) => {
              const ClusterIcon = cluster.icon;
              const isClusterActive = activeCluster.id === cluster.id;
              const isOpen = openClusterId === cluster.id;
              const isSingleFoyer = cluster.id === 'FOYER_CLUSTER';

              return (
                <div key={cluster.id} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (isSingleFoyer) {
                        handleSelectTabItem('FOYER');
                      } else {
                        hcmSfx.playClick(550);
                        setOpenClusterId(isOpen ? null : cluster.id);
                      }
                    }}
                    onMouseEnter={() => {
                      if (!isSingleFoyer) setOpenClusterId(cluster.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                      isClusterActive
                        ? 'bg-gradient-to-r from-rose-50 to-amber-50 text-[#751D2C] border border-rose-300 shadow-2xs'
                        : 'text-slate-700 hover:text-rose-800 hover:bg-rose-50/60'
                    }`}
                  >
                    <ClusterIcon
                      className={`w-4 h-4 ${isClusterActive ? 'text-rose-700' : 'text-slate-500'}`}
                    />
                    <span>{cluster.label}</span>

                    {cluster.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold uppercase shrink-0 ${
                          cluster.badgeCls || 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {cluster.badge}
                      </span>
                    )}

                    {!isSingleFoyer && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-rose-700' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* FLYOUT DROPDOWN CHO CỤM */}
                  {!isSingleFoyer && isOpen && (
                    <div
                      onMouseLeave={() => setOpenClusterId(null)}
                      className="absolute top-full left-0 mt-1.5 w-80 sm:w-96 rounded-2xl bg-white border border-rose-200 shadow-2xl p-2.5 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-rose-800">
                          {cluster.label}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {cluster.tabs.length} chuyên mục
                        </span>
                      </div>

                      <div className="max-h-[380px] overflow-y-auto space-y-1 pr-0.5">
                        {cluster.tabs.map((tab) => {
                          const TabIcon = tab.icon;
                          const isTabActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => handleSelectTabItem(tab.id)}
                              className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                                isTabActive
                                  ? 'bg-rose-50 border border-rose-300 ring-1 ring-rose-300/60'
                                  : 'hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                  isTabActive
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-rose-100/70 text-rose-800'
                                }`}
                              >
                                <TabIcon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <h4
                                    className={`text-xs sm:text-sm font-bold truncate ${
                                      isTabActive ? 'text-rose-900 font-extrabold' : 'text-slate-900'
                                    }`}
                                  >
                                    {tab.label}
                                  </h4>
                                  {tab.badge && (
                                    <span
                                      className={`text-[9.5px] px-1.5 py-0.2 rounded-md shrink-0 font-bold ${
                                        tab.badgeCls || 'bg-rose-100 text-rose-800'
                                      }`}
                                    >
                                      {tab.badge}
                                    </span>
                                  )}
                                </div>
                                {tab.description && (
                                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                                    {tab.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* NÚT THIẾU NHI NHANH & MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectTabItem('KIDS')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs ${
                activeTab === 'KIDS'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
              }`}
            >
              <Smile className="w-4 h-4 fill-current text-slate-950" />
              <span>Góc Thiếu Nhi</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Mở danh mục di sản"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TẦNG 2: THANH PHÂN HỆ CON TRỰC TIẾP (SUB-PILL ROW) - DỄ CHUYỂN NHANH      */}
      {/* Hiển thị các tab con của Cụm đang chọn để người dùng bấm ngay mà không cần rê chuột */}
      {/* ========================================================================= */}
      {activeCluster.tabs.length > 1 && (
        <div className="border-t border-rose-100/80 bg-gradient-to-r from-rose-50/40 via-amber-50/30 to-rose-50/40 px-3 sm:px-6 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] font-black text-rose-900 shrink-0 uppercase tracking-wide mr-1 flex items-center gap-1">
              <activeCluster.icon className="w-3.5 h-3.5 text-rose-700" />
              <span className="hidden sm:inline">{activeCluster.label}:</span>
            </span>

            {activeCluster.tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSelectTabItem(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-800 border border-slate-200'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.1 rounded font-black ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : tab.badgeCls || 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBILE DRAWER ACCORDION (KHI BẤM NÚT HAMBURGER TRÊN ĐIỆN THOẠI)             */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-rose-200 bg-white max-h-[80vh] overflow-y-auto p-4 space-y-4 animate-in slide-in-from-top duration-200 shadow-2xl">
          {clusters.map((cluster) => {
            const ClusterIcon = cluster.icon;
            const isClusterActive = activeCluster.id === cluster.id;

            return (
              <div key={cluster.id} className="space-y-1.5 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-900">
                  <ClusterIcon className="w-4 h-4 text-rose-700" />
                  <span>{cluster.label}</span>
                  {cluster.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                      {cluster.badge}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-1 pl-2">
                  {cluster.tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const isTabActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleSelectTabItem(tab.id)}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                          isTabActive
                            ? 'bg-rose-700 text-white'
                            : 'bg-slate-50 hover:bg-rose-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <TabIcon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </div>
                        {tab.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                              isTabActive ? 'bg-white/20 text-white' : tab.badgeCls || 'bg-rose-200 text-rose-900'
                            }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
};
