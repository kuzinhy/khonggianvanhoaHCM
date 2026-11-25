import React, { useRef, useState, useEffect } from 'react';
import { HCM_DOMAINS } from '../utils/hcmNavigation';
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
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Flag,
  History,
} from 'lucide-react';

export type SpaceTab =
  | 'FOYER'
  | 'PARTY_HISTORY'
  | 'TDM_HOUSE'
  | 'TDM_CHRONOLOGY'
  | 'EXEMPLARY_PEOPLE'
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
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeCls?: string;
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
  totalNewsCount = 6,
  wardModelsCount = 4,
  dossierCount = 41,
  cmsPendingCount = 0,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs: TabConfig[] = [
    {
      id: 'FOYER',
      label: 'Sảnh Trung Tâm',
      icon: Landmark,
    },
    {
      id: 'PARTY_HISTORY',
      label: 'Lịch Sử Đảng Bộ TP Thủ Dầu Một',
      icon: Flag,
      badge: '600 Trang',
      badgeCls: 'bg-amber-400 text-slate-950 font-black',
    },
    {
      id: 'TDM_HOUSE',
      label: 'Di Tích & Nhà Truyền Thống Đất Thủ',
      icon: Building2,
      badge: 'Bản đồ 3D',
      badgeCls: 'bg-rose-100 text-[#751D2C] font-bold',
    },
    {
      id: 'TDM_CHRONOLOGY',
      label: 'Biên Niên Sử Phường (Từ 1/7/2025)',
      icon: History,
      badge: 'Từ 01/7/2025',
      badgeCls: 'bg-amber-400 text-slate-950 font-black',
    },
    {
      id: 'EXEMPLARY_PEOPLE',
      label: 'Gương Sáng Tiêu Biểu',
      icon: Sparkles,
      badge: 'Người tốt việc tốt',
      badgeCls: 'bg-gradient-to-r from-rose-600 to-[#881337] text-white font-bold',
    },
    {
      id: 'NEWS',
      label: 'Tin Tức - 4 Nguồn',
      icon: FileText,
      badge: String(totalNewsCount),
      badgeCls: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'BIO',
      label: 'Cuộc Đời & Sự Nghiệp',
      icon: BookOpen,
      badge: '6 Chương',
      badgeCls: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'TIMELINE',
      label: '08 Thời Kỳ & Timeline',
      icon: Calendar,
      badge: '8',
      badgeCls: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'BOOKS',
      label: 'Tác Phẩm & Tủ Sách',
      icon: BookMarked,
      badge: '15+',
      badgeCls: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'QUOTES',
      label: 'Lời Bác Dạy & Tư Tưởng',
      icon: Quote,
      badge: '12+',
      badgeCls: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'FOOTPRINTS',
      label: 'Bản Đồ Di Sản',
      icon: Compass,
      badge: '10 Chặng',
      badgeCls: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'MEDIA',
      label: 'Đa Phương Tiện',
      icon: Film,
      badge: 'VOV · Video Trẻ',
      badgeCls: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'MODELS',
      label: 'Học Bác Tại Phường',
      icon: Award,
      badge: String(wardModelsCount),
      badgeCls: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'EVALUATION',
      label: 'Bộ Tiêu Chí Đánh Giá',
      icon: ShieldCheck,
      badge: 'QĐ 144',
      badgeCls: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'EXHIBIT',
      label: 'Trưng Bày BTHCM & 3D',
      icon: Box,
      badge: 'Bảo tàng & 3D',
      badgeCls: 'bg-amber-500 text-slate-950 font-black',
    },
    {
      id: 'AI_STUDIO',
      label: 'Trợ Lý AI Tham Mưu',
      icon: Sparkles,
      badge: 'AI',
      badgeCls: 'bg-indigo-100 text-indigo-800',
    },
    ...(canEdit
      ? [
          {
            id: 'CMS' as SpaceTab,
            label: 'Quản Trị Di Sản CMS',
            icon: Sliders,
            badge: cmsPendingCount > 0 ? String(cmsPendingCount) : undefined,
            badgeCls: 'bg-red-600 text-white',
          },
        ]
      : []),
  ];

  const [isPaused, setIsPaused] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const scrollPosRef = useRef<number>(0);

  // Danh sách tabs nhân đôi để tạo vòng lặp vô tận mượt mà từ phải sang trái
  const displayTabs = [...tabs, ...tabs];

  // Tự động cuộn chậm từ phải sang trái (nội dung trôi sang trái)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastTime = performance.now();
    scrollPosRef.current = el.scrollLeft;
    const speed = 32; // Tốc độ chạy chậm, êm ái, dễ đọc (pixels/giây)

    const step = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!isPaused && el) {
        scrollPosRef.current += speed * delta;
        const halfScroll = el.scrollWidth / 2;
        if (halfScroll > 0 && scrollPosRef.current >= halfScroll) {
          scrollPosRef.current -= halfScroll;
        }
        el.scrollLeft = scrollPosRef.current;
      } else if (el) {
        // Đồng bộ vị trí khi người dùng kéo cuộn bằng tay hoặc rê chuột
        scrollPosRef.current = el.scrollLeft;
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPaused, tabs.length]);

  // Tự động cuộn pill đang active vào tầm mắt khi chuyển tab hoặc mở trực tiếp URL
  useEffect(() => {
    if (!scrollRef.current) return;
    const timer = setTimeout(() => {
      const activeEl = scrollRef.current?.querySelector('.is-active-tab') as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
      setTimeout(() => {
        if (scrollRef.current) scrollPosRef.current = scrollRef.current.scrollLeft;
      }, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
      setTimeout(() => {
        if (scrollRef.current) scrollPosRef.current = scrollRef.current.scrollLeft;
      }, 300);
    }
  };

  return (
    <nav
      aria-label="Thanh điều hướng Không gian Văn hóa Hồ Chí Minh"
      className="sticky top-0 z-30 w-full bg-gradient-to-r from-[#FFFBFB] via-[#FFF5F7]/95 to-[#FFFBFB] backdrop-blur-md border-b border-rose-100 shadow-2xs select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative flex items-center">
        {/* Nút tạm dừng / phát tự động cuộn */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-100 shrink-0 mr-1 z-10 cursor-pointer"
          title={isPaused ? 'Bật tự động chạy menu' : 'Tạm dừng chạy menu'}
        >
          {isPaused ? <Play className="w-3 h-3 text-emerald-600 fill-current" /> : <Pause className="w-3 h-3 text-slate-600 fill-current" />}
        </button>

        {/* Left Scroll Button (Mobile / Desktop) */}
        <button
          type="button"
          onClick={scrollLeft}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-100 shrink-0 mr-1 z-10 cursor-pointer"
          title="Cuộn sang trái"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Pills Row */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {displayTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            const domainInfo = HCM_DOMAINS[tab.id];
            const targetPath = domainInfo?.path || '/';

            return (
              <a
                key={`${tab.id}-${idx}`}
                href={targetPath}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTab(tab.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border ${
                  isActive
                    ? 'is-active-tab bg-gradient-to-r from-[#751D2C] via-[#851E32] to-[#751D2C] text-white border-[#851E32] shadow-xs ring-1 ring-rose-400/40'
                    : 'bg-white hover:bg-[#FFF1F3] text-slate-700 hover:text-[#751D2C] border-rose-100/90 shadow-2xs'
                }`}
                title={tab.label}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-yellow-300' : 'text-slate-600'
                  }`}
                />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-red-900 text-yellow-300 border border-yellow-400/40'
                        : tab.badgeCls || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={scrollRight}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-100 shrink-0 ml-1 z-10 cursor-pointer"
          title="Cuộn sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
