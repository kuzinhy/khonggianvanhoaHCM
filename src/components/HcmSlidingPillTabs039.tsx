/**
 * <!-- Lucian UX/UI Prompt #039 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#039 -->
 * 
 * Sliding Pill Tabs (039, Menus & Tabs)
 * Ported to React 19 for Không Gian Văn Hóa Hồ Chí Minh
 * Features:
 * - Gliding & stretching spring pill indicator across tabs
 * - Row-by-row directional slide-in animation for tab contents
 * - Full Keyboard navigation with Left/Right Arrow keys
 * - Authentic project datasets: 3D VR, Thiếu Nhi, 120 Mẩu Chuyện, 600 Trang Sử, Di Sản & Đời Sống
 * - Light and Dark theme support with prefers-color-scheme and data-theme
 * - prefers-reduced-motion accessibility compliance
 */

import React, { useRef, useState, useEffect, useId, useCallback } from 'react';
import {
  Box,
  Smile,
  BookOpen,
  Flag,
  Landmark,
  Heart,
  ChevronRight,
  ShieldCheck,
  Building2,
  MapPin,
  Award,
  Sparkles,
  History,
  FileText,
  Clock,
  Compass,
  X,
} from 'lucide-react';
import type { SpaceTab } from './ProfessionalNavbar';
import { hcmSfx } from '../services/hcmSoundEffects';

export interface SlidingNavRowItem {
  title: string;
  subtitle: string;
  meta: string;
  gradient: string;
  badge?: string;
  icon: React.ElementType;
  onSelect: () => void;
}

export interface SlidingNavTabCluster {
  id: string;
  name: string;
  shortName: string;
  badge?: string;
  items: SlidingNavRowItem[];
}

export interface HcmSlidingPillTabs039Props {
  initialClusterId?: string | null;
  onClusterChange?: (clusterId: string) => void;
  onSelectTab: (tab: SpaceTab) => void;
  onOpenRedMap?: () => void;
  onClose?: () => void;
  className?: string;
  isDropdown?: boolean;
}

export const HcmSlidingPillTabs039: React.FC<HcmSlidingPillTabs039Props> = ({
  initialClusterId = 'VR_HERITAGE',
  onClusterChange,
  onSelectTab,
  onOpenRedMap,
  onClose,
  className = '',
  isDropdown = false,
}) => {
  const rootId = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // 06 Cụm Dữ Liệu Thực Tế Chuẩn Mực của Không Gian Văn Hóa Hồ Chí Minh
  const NAV_CLUSTERS: SlidingNavTabCluster[] = [
    {
      id: 'VR_HERITAGE',
      name: 'Nhà Truyền Thống 3D',
      shortName: '3D VR',
      badge: 'VR 360°',
      items: [
        {
          title: 'Không Gian Văn Hóa HCM (3D VR)',
          subtitle: 'Sảnh tưởng niệm Bác, avatar 3D & 4 cánh lịch sử',
          meta: 'VR 3D',
          gradient: 'linear-gradient(140deg, #881337, #BE123C)',
          badge: 'MỚI',
          icon: Box,
          onSelect: () => onSelectTab('EXHIBIT'),
        },
        {
          title: 'Nhà Việc Phú Cường & 05 Gian Số',
          subtitle: 'Phục dựng 3D, hiện vật quý ven sông Bạch Đằng',
          meta: '360°',
          gradient: 'linear-gradient(140deg, #C59A55, #B28236)',
          badge: 'Di Tích',
          icon: Building2,
          onSelect: () => onSelectTab('TDM_HOUSE'),
        },
        {
          title: 'Bản Đồ 12 Địa Chỉ Đỏ & Di Tích',
          subtitle: '12 di tích lịch sử cách mạng & văn hóa Đất Thủ',
          meta: '12 Điểm',
          gradient: 'linear-gradient(140deg, #047857, #10B981)',
          badge: '12 Chặng',
          icon: MapPin,
          onSelect: () => {
            if (onOpenRedMap) onOpenRedMap();
            else onSelectTab('TDM_HOUSE');
          },
        },
        {
          title: 'Tư Vấn Kỹ Thuật Số Hóa 3D Thực Địa',
          subtitle: 'Quy trình chuẩn chụp 360° 8K và nhúng WebGL',
          meta: 'WebGL',
          gradient: 'linear-gradient(140deg, #1E3A8A, #3B82F6)',
          badge: 'Công Nghệ',
          icon: Sparkles,
          onSelect: () => onSelectTab('TDM_HOUSE'),
        },
      ],
    },
    {
      id: 'KIDS_SPACE',
      name: 'Không Gian Thiếu Nhi',
      shortName: 'Thiếu Nhi',
      badge: '5 Điều Bác',
      items: [
        {
          title: 'Không Gian Thiếu Nhi Đất Thủ',
          subtitle: 'Vách gỗ học đường 5 Điều Bác dạy, góc học tập sinh động',
          meta: '5 Điều',
          gradient: 'linear-gradient(140deg, #D97706, #F59E0B)',
          badge: 'Trường Học',
          icon: Smile,
          onSelect: () => onSelectTab('KIDS'),
        },
        {
          title: '15 Mẩu Chuyện Bác Hồ Có Giọng Đọc',
          subtitle: 'Truyện kể xúc động có tích hợp giọng đọc AI truyền cảm',
          meta: 'Audio AI',
          gradient: 'linear-gradient(140deg, #881337, #E11D48)',
          badge: '15 Truyện',
          icon: BookOpen,
          onSelect: () => onSelectTab('KIDS'),
        },
        {
          title: 'Hội Thi Búp Sen Vàng (Đố Vui)',
          subtitle: 'Trắc nghiệm kiến thức lịch sử, cấp Giấy chứng nhận tức thì',
          meta: 'Đố Vui',
          gradient: 'linear-gradient(140deg, #047857, #059669)',
          badge: 'Chứng Nhận',
          icon: Award,
          onSelect: () => onSelectTab('KIDS'),
        },
        {
          title: 'Hòm Thư Báo Công & Rèn Luyện 5 Điều',
          subtitle: 'Báo công dâng Bác những việc làm tốt hàng tuần',
          meta: 'Báo Công',
          gradient: 'linear-gradient(140deg, #4338CA, #6366F1)',
          badge: 'Nghĩa Tình',
          icon: Heart,
          onSelect: () => onSelectTab('KIDS'),
        },
      ],
    },
    {
      id: 'STORIES_LEARNING',
      name: 'Chuyện Kể Học Bác',
      shortName: 'Chuyện Kể',
      badge: '120 Chuyện',
      items: [
        {
          title: 'Toàn Bộ 120 Mẩu Chuyện Về Bác',
          subtitle: 'Kho tư liệu chính thống, sâu sắc và truyền cảm hứng',
          meta: '120 Mẩu',
          gradient: 'linear-gradient(140deg, #881337, #9F1239)',
          badge: 'Nổi Bật',
          icon: BookOpen,
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
        {
          title: 'Cán Bộ, Đảng Viên (Quy Định 144)',
          subtitle: 'Học tập chuẩn mực cần, kiệm, liêm, chính, chí công vô tư',
          meta: 'Chuẩn Mực',
          gradient: 'linear-gradient(140deg, #B45309, #D97706)',
          badge: 'QĐ 144',
          icon: ShieldCheck,
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
        {
          title: 'Đoàn Viên, Thanh Niên (Rèn Đức Luyện Tài)',
          subtitle: 'Khát vọng cống hiến, tinh thần tự học và vượt khó',
          meta: 'Tuổi Trẻ',
          gradient: 'linear-gradient(140deg, #0284C7, #0EA5E9)',
          badge: 'Khát Vọng',
          icon: Sparkles,
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
        {
          title: 'Toàn Thể Nhân Dân (Đời Sống Thường Nhật)',
          subtitle: 'Tình cảm của Bác với nhân dân, lối sống giản dị',
          meta: 'Cộng Đồng',
          gradient: 'linear-gradient(140deg, #059669, #10B981)',
          badge: 'Thực Tiễn',
          icon: Heart,
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
      ],
    },
    {
      id: 'PARTY_HISTORY',
      name: 'Lịch Sử Đảng Bộ TP',
      shortName: 'Lịch Sử',
      badge: '600 Trang',
      items: [
        {
          title: 'Toàn Văn Pho Sử Vàng 600 Trang',
          subtitle: 'Lật giở đọc sách điện tử 2 tập sách lịch sử Đảng bộ',
          meta: '600 Trang',
          gradient: 'linear-gradient(140deg, #881337, #BE123C)',
          badge: 'Toàn Tập',
          icon: Flag,
          onSelect: () => onSelectTab('PARTY_HISTORY'),
        },
        {
          title: '04 Thời Kỳ Lịch Sử Kháng Chiến',
          subtitle: 'Từ Chi bộ Lò Chén 1936 qua hai cuộc kháng chiến vẻ vang',
          meta: '4 Thời Kỳ',
          gradient: 'linear-gradient(140deg, #C59A55, #D97706)',
          badge: 'Mốc Son',
          icon: History,
          onSelect: () => onSelectTab('PARTY_HISTORY'),
        },
        {
          title: 'Biên Niên Sử Phường (Từ 01/7/2025)',
          subtitle: 'Mốc son phát triển đô thị sau sáp nhập phường mới',
          meta: '2025-2026',
          gradient: 'linear-gradient(140deg, #047857, #10B981)',
          badge: 'Mới Nhất',
          icon: Building2,
          onSelect: () => onSelectTab('TDM_CHRONOLOGY'),
        },
        {
          title: 'Tra Cứu Toàn Văn Dữ Liệu Lịch Sử',
          subtitle: 'Công cụ tìm kiếm thông minh theo nhân vật, địa danh, trận đánh',
          meta: 'Tra Cứu',
          gradient: 'linear-gradient(140deg, #4338CA, #6366F1)',
          badge: 'Tìm Kiếm',
          icon: FileText,
          onSelect: () => onSelectTab('PARTY_HISTORY'),
        },
      ],
    },
    {
      id: 'HERITAGE',
      name: 'Di Sản Hồ Chí Minh',
      shortName: 'Di Sản',
      badge: 'Kho Tàng',
      items: [
        {
          title: 'Cuộc Đời & Sự Nghiệp (6 Chương)',
          subtitle: 'Hành trình từ làng Sen bôn ba cứu nước đến Di chúc 1969',
          meta: '6 Chương',
          gradient: 'linear-gradient(140deg, #881337, #E11D48)',
          badge: 'Tiểu Sử',
          icon: History,
          onSelect: () => onSelectTab('BIO'),
        },
        {
          title: 'Tủ Sách Kinh Điển 15 Tác Phẩm',
          subtitle: 'Bảo vật Quốc gia: Đường Kách Mệnh, Tuyên Ngôn Độc Lập...',
          meta: '15 Tập',
          gradient: 'linear-gradient(140deg, #B45309, #F59E0B)',
          badge: 'Bảo Vật',
          icon: BookOpen,
          onSelect: () => onSelectTab('BOOKS'),
        },
        {
          title: 'Dòng Thời Gian & 30 Mốc Son',
          subtitle: 'Biên niên sự kiện lịch sử chuẩn cấp A được thẩm định',
          meta: '30 Mốc',
          gradient: 'linear-gradient(140deg, #0284C7, #38BDF8)',
          badge: 'Biên Niên',
          icon: Clock,
          onSelect: () => onSelectTab('TIMELINE'),
        },
        {
          title: 'Tư Tưởng, Đạo Đức & Lời Dạy Của Bác',
          subtitle: '12 Danh ngôn kinh điển, chuẩn mực đạo đức cách mạng',
          meta: '12 Lời',
          gradient: 'linear-gradient(140deg, #059669, #34D399)',
          badge: 'Danh Ngôn',
          icon: ShieldCheck,
          onSelect: () => onSelectTab('QUOTES'),
        },
      ],
    },
    {
      id: 'COMMUNITY',
      name: 'Rèn Luyện & Đời Sống',
      shortName: 'Đời Sống',
      badge: 'Nghĩa Tình',
      items: [
        {
          title: 'Gương Người Tốt Việc Tốt Đất Thủ',
          subtitle: 'Tuyên dương tập thể, cá nhân học và làm theo lời Bác',
          meta: 'Điển Hình',
          gradient: 'linear-gradient(140deg, #881337, #BE123C)',
          badge: 'Lan Tỏa',
          icon: Award,
          onSelect: () => onSelectTab('EXEMPLARY_PEOPLE'),
        },
        {
          title: 'Biên Niên Sử Phường Thủ Dầu Một',
          subtitle: 'Mô hình phát triển đô thị, an sinh xã hội sau sáp nhập',
          meta: 'Từ 01/7/25',
          gradient: 'linear-gradient(140deg, #047857, #10B981)',
          badge: 'Chính Quyền',
          icon: Landmark,
          onSelect: () => onSelectTab('TDM_CHRONOLOGY'),
        },
        {
          title: 'Bản Tin & Mô Hình Cơ Sở Mới Nhất',
          subtitle: 'Chỉ thị 07-CT/TW, phong trào thi đua tại 5 phân khu',
          meta: 'Tin Tức',
          gradient: 'linear-gradient(140deg, #0284C7, #06B6D4)',
          badge: 'Cơ Sở',
          icon: FileText,
          onSelect: () => onSelectTab('NEWS'),
        },
        {
          title: 'Tự Đánh Giá Chuẩn Mực Không Gian VH',
          subtitle: 'Bảng tiêu chí tự chấm điểm cho chi bộ, cơ quan, trường học',
          meta: 'Tiêu Chí',
          gradient: 'linear-gradient(140deg, #4338CA, #818CF8)',
          badge: 'Khảo Sát',
          icon: ShieldCheck,
          onSelect: () => onSelectTab('EVALUATION'),
        },
      ],
    },
  ];

  // Tìm index tương ứng từ initialClusterId
  const getInitialIndex = (): number => {
    if (!initialClusterId) return 0;
    const found = NAV_CLUSTERS.findIndex((c) => c.id === initialClusterId);
    return found >= 0 ? found : 0;
  };

  const [activeTabIdx, setActiveTabIdx] = useState<number>(getInitialIndex);

  // Lists display state for row-by-row directional slide transition
  interface ListLayer {
    id: string;
    items: SlidingNavRowItem[];
    direction: number; // 1: slide from right, -1: slide from left, 0: initial
    status: 'entering' | 'active' | 'exiting';
  }

  const [layers, setLayers] = useState<ListLayer[]>([
    {
      id: `list-${getInitialIndex()}-${Date.now()}`,
      items: NAV_CLUSTERS[getInitialIndex()].items,
      direction: 0,
      status: 'active',
    },
  ]);

  // Cập nhật vị trí và độ rộng của sliding pill
  const updatePill = useCallback((animate = true) => {
    const tabEl = tabButtonsRef.current[activeTabIdx];
    const pill = pillRef.current;
    if (!tabEl || !pill) return;

    if (!animate) {
      pill.style.transition = 'none';
    }

    pill.style.setProperty('--x', `${tabEl.offsetLeft}px`);
    pill.style.setProperty('--w', `${tabEl.offsetWidth}px`);

    if (!animate) {
      void pill.offsetWidth; // Force reflow
      pill.style.transition = '';
    }
  }, [activeTabIdx]);

  // Đồng bộ vị trí pill khi tab thay đổi hoặc khi resize
  useEffect(() => {
    updatePill(true);
  }, [activeTabIdx, updatePill]);

  useEffect(() => {
    // Initial pill setup without transition
    const timer = setTimeout(() => updatePill(false), 30);
    window.addEventListener('resize', () => updatePill(false));
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', () => updatePill(false));
    };
  }, [updatePill]);

  // Chuyển tab với hiệu ứng kéo dài viên nhộng & trượt từng dòng
  const selectTab = useCallback((newIdx: number, shouldFocus = false) => {
    if (newIdx === activeTabIdx) return;
    hcmSfx.playClick(650);

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dir = newIdx > activeTabIdx ? 1 : -1;
    setActiveTabIdx(newIdx);
    if (onClusterChange) {
      onClusterChange(NAV_CLUSTERS[newIdx].id);
    }

    if (tabButtonsRef.current[newIdx]) {
      if (shouldFocus) {
        tabButtonsRef.current[newIdx]?.focus();
      }
      tabButtonsRef.current[newIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }

    const newLayerId = `list-${newIdx}-${Date.now()}`;
    const newItems = NAV_CLUSTERS[newIdx].items;

    if (isReduced) {
      setLayers([
        {
          id: newLayerId,
          items: newItems,
          direction: 0,
          status: 'active',
        },
      ]);
      return;
    }

    // Tạo layer mới trượt vào, đồng thời đẩy layer cũ trượt ra
    setLayers((prev) => {
      const exiting = prev.map((l) => ({
        ...l,
        status: 'exiting' as const,
        direction: dir,
      }));
      return [
        ...exiting,
        {
          id: newLayerId,
          items: newItems,
          direction: dir,
          status: 'entering' as const,
        },
      ];
    });

    // Sau khi DOM nhận layer entering, kích hoạt chuyển sang active để CSS transition chạy
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLayers((prev) =>
          prev.map((l) => (l.id === newLayerId ? { ...l, status: 'active' as const } : l))
        );
      });
    });

    // Dọn dẹp layer cũ sau thời gian chạy animation (700ms)
    setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.id === newLayerId));
    }, 700);
  }, [activeTabIdx, NAV_CLUSTERS, onClusterChange]);

  // Đồng bộ khi prop initialClusterId thay đổi từ bên ngoài (ví dụ click từ thanh menu chính)
  useEffect(() => {
    if (initialClusterId) {
      const found = NAV_CLUSTERS.findIndex((c) => c.id === initialClusterId);
      if (found >= 0 && found !== activeTabIdx) {
        selectTab(found);
      }
    }
  }, [initialClusterId, activeTabIdx, selectTab, NAV_CLUSTERS]);

  // Điều hướng bằng bàn phím theo chuẩn WAI-ARIA
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx = -1;
    if (e.key === 'ArrowRight') {
      nextIdx = (index + 1) % NAV_CLUSTERS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (index - 1 + NAV_CLUSTERS.length) % NAV_CLUSTERS.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = NAV_CLUSTERS.length - 1;
    } else if (e.key === 'Escape' && onClose) {
      e.preventDefault();
      onClose();
      return;
    }

    if (nextIdx !== -1) {
      e.preventDefault();
      selectTab(nextIdx, true);
    }
  };

  const panelId = `u039-panel-${rootId}`;

  return (
    <div className={`ux u039-wrapper ${isDropdown ? 'u039-dropdown' : ''} ${className}`}>
      {/* Scoped CSS chứa toàn bộ cấu trúc, biến màu và chuyển động gốc của Lucian #039 */}
      <style>{`
        .ux, .ux *, .ux *::before, .ux *::after {
          box-sizing: border-box;
        }
        .ux {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: var(--ux-ink);
          -webkit-font-smoothing: antialiased;
          letter-spacing: -0.01em;
          -webkit-tap-highlight-color: transparent;
          word-break: keep-all;
          overflow-wrap: break-word;
        }

        :root {
          color-scheme: light;
          --ux-page: #FFFDFD;
          --ux-surface: #FFFFFF;
          --ux-surface-2: #FBF7F7;
          --ux-surface-3: #F5EEEE;
          --ux-ink: #1F1517;
          --ux-ink-2: #6E5359;
          --ux-ink-3: #9C7D84;
          --ux-line: rgba(136, 19, 55, 0.12);
          --ux-line-2: rgba(136, 19, 55, 0.22);
          --ux-accent: #881337;
          --ux-accent-2: #C59A55;
          --ux-accent-soft: rgba(136, 19, 55, 0.12);
          --ux-accent-ink: #FFFFFF;
          --ux-mint: #059669;
          --ux-warn: #D97706;
          --ux-danger: #E11D48;
          --ux-glass: rgba(255, 255, 255, 0.92);
          --ux-glass-line: rgba(255, 255, 255, 0.95);
          --ux-shadow: rgba(80, 20, 40, 0.12);
          --ux-shadow-strong: rgba(80, 20, 40, 0.28);
          --ux-grad: linear-gradient(120deg, #881337, #BE123C 55%, #C59A55);
          --ux-ease: cubic-bezier(.2, .8, .2, 1);
          --ux-spring: cubic-bezier(.34, 1.45, .64, 1);
        }

        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) {
            color-scheme: dark;
            --ux-page: #0C0A0D;
            --ux-surface: #181419;
            --ux-surface-2: #221D24;
            --ux-surface-3: #2E2831;
            --ux-ink: #F9F3F4;
            --ux-ink-2: rgba(249, 243, 244, 0.72);
            --ux-ink-3: rgba(249, 243, 244, 0.45);
            --ux-line: rgba(255, 255, 255, 0.1);
            --ux-line-2: rgba(255, 255, 255, 0.18);
            --ux-accent: #FB7185;
            --ux-accent-2: #FBBF24;
            --ux-accent-soft: rgba(251, 113, 133, 0.18);
            --ux-accent-ink: #1F1517;
            --ux-mint: #34D399;
            --ux-warn: #FBBF24;
            --ux-danger: #F43F5E;
            --ux-glass: rgba(24, 20, 25, 0.92);
            --ux-glass-line: rgba(255, 255, 255, 0.15);
            --ux-shadow: rgba(0, 0, 0, 0.45);
            --ux-shadow-strong: rgba(0, 0, 0, 0.75);
            --ux-grad: linear-gradient(120deg, #FB7185, #F43F5E 55%, #FBBF24);
          }
        }

        :root[data-theme="dark"] {
          color-scheme: dark;
          --ux-page: #0C0A0D;
          --ux-surface: #181419;
          --ux-surface-2: #221D24;
          --ux-surface-3: #2E2831;
          --ux-ink: #F9F3F4;
          --ux-ink-2: rgba(249, 243, 244, 0.72);
          --ux-ink-3: rgba(249, 243, 244, 0.45);
          --ux-line: rgba(255, 255, 255, 0.1);
          --ux-line-2: rgba(255, 255, 255, 0.18);
          --ux-accent: #FB7185;
          --ux-accent-2: #FBBF24;
          --ux-accent-soft: rgba(251, 113, 133, 0.18);
          --ux-accent-ink: #1F1517;
          --ux-mint: #34D399;
          --ux-warn: #FBBF24;
          --ux-danger: #F43F5E;
          --ux-glass: rgba(24, 20, 25, 0.92);
          --ux-glass-line: rgba(255, 255, 255, 0.15);
          --ux-shadow: rgba(0, 0, 0, 0.45);
          --ux-shadow-strong: rgba(0, 0, 0, 0.75);
          --ux-grad: linear-gradient(120deg, #FB7185, #F43F5E 55%, #FBBF24);
        }

        .u039-wrapper {
          position: relative;
          width: 660px;
          max-width: min(660px, calc(100vw - 24px));
        }

        .u039-dropdown {
          background: var(--ux-surface);
          border-radius: 28px;
          border: 1px solid var(--ux-line-2);
          box-shadow: 0 20px 40px -15px var(--ux-shadow-strong), 0 0 0 1px var(--ux-line);
          padding: 16px;
        }

        .u039-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--ux-line);
        }

        .u039-tabs {
          position: relative;
          display: flex;
          padding: 5px;
          border-radius: 999px;
          background: var(--ux-surface-2);
          box-shadow: 0 0 0 1px var(--ux-line);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .u039-tabs::-webkit-scrollbar {
          display: none;
        }

        .u039-pill {
          position: absolute;
          left: 0;
          top: 5px;
          bottom: 5px;
          width: var(--w, 90px);
          border-radius: 999px;
          background: var(--ux-accent);
          transform: translateX(var(--x, 5px));
          box-shadow: 0 8px 18px -6px var(--ux-shadow-strong);
          transition: transform .5s var(--ux-spring), width .5s var(--ux-spring);
          pointer-events: none;
          z-index: 0;
        }

        .u039-tab {
          position: relative;
          flex: 1 1 0;
          min-width: max-content;
          height: 38px;
          border: 0;
          padding: 0 9px;
          border-radius: 999px;
          background: none;
          font-size: 12px;
          font-weight: 700;
          color: var(--ux-ink-2);
          white-space: nowrap;
          transition: color .35s var(--ux-ease);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          user-select: none;
          z-index: 1;
        }

        .u039-tab[aria-selected="true"] {
          color: #FFFFFF;
        }

        .u039-tab:focus-visible {
          outline: 2px solid var(--ux-accent);
          outline-offset: 2px;
        }

        .u039-tab-badge {
          font-size: 9.5px;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.2);
          color: inherit;
        }
        .u039-tab[aria-selected="false"] .u039-tab-badge {
          background: var(--ux-accent-soft);
          color: var(--ux-accent);
        }

        .u039-panel {
          position: relative;
          height: 310px;
          margin-top: 12px;
          overflow: hidden;
          border-radius: 20px;
        }

        .u039-list {
          position: absolute;
          inset: 0;
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .u039-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 12px;
          border-radius: 16px;
          background: var(--ux-surface);
          box-shadow: 0 0 0 1px var(--ux-line);
          transition: transform .55s var(--ux-spring), opacity .35s var(--ux-ease), background .2s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .u039-row:hover {
          background: var(--ux-surface-2);
          box-shadow: 0 4px 12px -4px var(--ux-shadow), 0 0 0 1px var(--ux-line-2);
        }

        .u039-art {
          position: relative;
          width: 44px;
          height: 44px;
          flex: none;
          border-radius: 13px;
          background: var(--g);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 10px -2px var(--ux-shadow);
        }

        .u039-art::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 25%, rgba(255,255,255,.45), transparent 55%);
        }

        .u039-row-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }

        .u039-row b {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: -0.015em;
          color: var(--ux-ink);
          min-width: 0;
        }

        .u039-row b span:first-child {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .u039-row small {
          display: block;
          margin-top: 2px;
          font-size: 11.5px;
          color: var(--ux-ink-3);
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .u039-row em {
          margin-left: auto;
          font-style: normal;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--ux-ink-3);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          padding-left: 8px;
          flex-shrink: 0;
        }

        .u039-badge {
          padding: 2px 5.5px;
          border-radius: 5px;
          font-size: 9.5px;
          font-weight: 800;
          background: var(--ux-accent-soft);
          color: var(--ux-accent);
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* prefers-reduced-motion overrides */
        @media (prefers-reduced-motion: reduce) {
          .ux, .ux *, .ux *::before, .ux *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* Header thông tin khi ở chế độ dropdown */}
      {isDropdown && (
        <div className="u039-header">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-700 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-900">
              Khám Phá Các Phân Hệ Không Gian Văn Hóa HCM
            </span>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng bảng điều hướng"
              className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* 1. Thanh Tabs với Sliding Pill (#039) */}
      <div
        ref={tabsRef}
        className="u039-tabs"
        role="tablist"
        aria-label="Danh mục Không gian Văn hóa Hồ Chí Minh"
      >
        <span ref={pillRef} className="u039-pill" aria-hidden="true" />
        {NAV_CLUSTERS.map((cluster, idx) => {
          const isSelected = idx === activeTabIdx;
          return (
            <button
              key={cluster.id}
              ref={(el) => {
                tabButtonsRef.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => selectTab(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="u039-tab"
            >
              <span>{cluster.shortName}</span>
              {cluster.badge && (
                <span className="u039-tab-badge">{cluster.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Content Panel với hiệu ứng trượt từng dòng theo hướng di chuyển (#039) */}
      <div
        ref={panelRef}
        id={panelId}
        className="u039-panel"
        role="tabpanel"
        aria-label={NAV_CLUSTERS[activeTabIdx].name}
      >
        {layers.map((layer) => {
          // Calculate row transform and opacity based on status and direction
          const isEntering = layer.status === 'entering';
          const isExiting = layer.status === 'exiting';

          return (
            <ul key={layer.id} className="u039-list">
              {layer.items.map((row, k) => {
                const IconComponent = row.icon;
                let transformStyle = '';
                let opacityStyle = 1;

                if (isEntering) {
                  transformStyle = `translateX(${layer.direction * 70}%)`;
                  opacityStyle = 0;
                } else if (isExiting) {
                  transformStyle = `translateX(${-layer.direction * 60}%)`;
                  opacityStyle = 0;
                }

                return (
                  <li
                    key={row.title}
                    style={{
                      transitionDelay: `${k * 45}ms`,
                      transform: transformStyle,
                      opacity: opacityStyle,
                    }}
                    onClick={() => {
                      hcmSfx.playClick(800);
                      row.onSelect();
                      if (onClose) onClose();
                    }}
                    className="u039-row"
                  >
                    <span
                      className="u039-art"
                      style={{ ['--g' as any]: row.gradient }}
                      aria-hidden="true"
                    >
                      <IconComponent className="w-5 h-5 text-white stroke-[2.2]" />
                    </span>
                    <span className="u039-row-info">
                      <b>
                        <span>{row.title}</span>
                        {row.badge && <span className="u039-badge">{row.badge}</span>}
                      </b>
                      <small>{row.subtitle}</small>
                    </span>
                    <em>{row.meta}</em>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};
