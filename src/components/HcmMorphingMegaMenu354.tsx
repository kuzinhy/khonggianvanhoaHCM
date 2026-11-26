/* Lucian UX/UI Prompt #354 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#354 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Flag,
  Box,
  Smile,
  Heart,
  Sparkles,
  History,
  Clock,
  ShieldCheck,
  ExternalLink,
  Award,
  Building2,
  MapPin,
  FileText,
  RefreshCw,
  Landmark,
  ChevronDown,
} from 'lucide-react';
import type { SpaceTab } from './ProfessionalNavbar';
import { hcmSfx } from '../services/hcmSoundEffects';
import './HcmMorphingMegaMenu354.css';

export interface MorphingMenuItem {
  title: string;
  subtitle: string;
  meta: string;
  badge?: string;
  icon: React.ElementType;
  gradient: string;
  onSelect: () => void;
}

export interface MorphingTabGroup {
  id: string;
  label: string;
  headerTitle: string;
  headerTag: string;
  badge?: string;
  icon: React.ElementType;
  activeTabs: SpaceTab[];
  panelWidth?: number;
  items: MorphingMenuItem[];
}

export interface HcmMorphingMegaMenu354Props {
  activeTab: SpaceTab;
  onSelectTab: (tab: SpaceTab) => void;
  onOpenRedMap?: () => void;
  onOpenGuidedJourney?: () => void;
  onOpenArticleManager?: () => void;
  onOpenHeritageAnalytics?: () => void;
  onOpenCitizenAuth?: (mode: 'login' | 'register') => void;
  onSyncFanpage?: () => void;
  fanpageSyncStatus?: 'idle' | 'syncing' | 'synced';
  setIsNominationModalOpen?: (open: boolean) => void;
  setIsMiniQuizOpen?: (open: boolean) => void;
}

export const HcmMorphingMegaMenu354: React.FC<HcmMorphingMegaMenu354Props> = ({
  activeTab,
  onSelectTab,
  onOpenRedMap,
  onOpenGuidedJourney,
  onOpenArticleManager,
  onOpenHeritageAnalytics,
  onOpenCitizenAuth,
  onSyncFanpage,
  fanpageSyncStatus = 'idle',
  setIsNominationModalOpen,
  setIsMiniQuizOpen,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pnRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [noTransition, setNoTransition] = useState<boolean>(false);
  
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActiveIndexRef = useRef<number>(-1);

  // 07 Cụm dữ liệu chuẩn mực theo thứ tự đã phê duyệt
  const TAB_GROUPS: MorphingTabGroup[] = [
    {
      id: 'HERITAGE',
      label: 'Di Sản Hồ Chí Minh',
      headerTitle: 'KHO TÀNG DI SẢN HỒ CHÍ MINH',
      headerTag: 'DI SẢN VÔ GIÁ',
      icon: BookOpen,
      activeTabs: ['BIO', 'TIMELINE', 'BOOKS', 'QUOTES', 'MEDIA', 'OFFICIAL_PORTALS'],
      panelWidth: 420,
      items: [
        {
          title: 'Cuộc Đời & Sự Nghiệp (6 Chương)',
          subtitle: 'Hành trình từ làng Sen bôn ba cứu nước đến Di chúc 1969',
          meta: '6 Chương',
          badge: 'Tiểu Sử',
          icon: History,
          gradient: 'linear-gradient(140deg, #881337, #E11D48)',
          onSelect: () => onSelectTab('BIO'),
        },
        {
          title: 'Tủ Sách Kinh Điển 15 Tác Phẩm',
          subtitle: 'Bảo vật Quốc gia: Đường Kách Mệnh, Tuyên Ngôn Độc Lập...',
          meta: '15 Tập',
          badge: 'Bảo Vật',
          icon: BookOpen,
          gradient: 'linear-gradient(140deg, #B45309, #F59E0B)',
          onSelect: () => onSelectTab('BOOKS'),
        },
        {
          title: 'Dòng Thời Gian & 30 Mốc Son',
          subtitle: 'Biên niên sự kiện lịch sử chuẩn cấp A được thẩm định',
          meta: '30 Mốc',
          badge: 'Biên Niên',
          icon: Clock,
          gradient: 'linear-gradient(140deg, #0284C7, #38BDF8)',
          onSelect: () => onSelectTab('TIMELINE'),
        },
        {
          title: 'Tư Tưởng, Đạo Đức & Lời Dạy Của Bác',
          subtitle: '12 Danh ngôn kinh điển, chuẩn mực đạo đức cách mạng',
          meta: '12 Lời',
          badge: 'Danh Ngôn',
          icon: ShieldCheck,
          gradient: 'linear-gradient(140deg, #059669, #34D399)',
          onSelect: () => onSelectTab('QUOTES'),
        },
        {
          title: '08 Chuyên Trang Tư Liệu Về Bác',
          subtitle: 'Phủ Chủ tịch, Bảo tàng HCM, Lăng Bác, NXB Sự Thật...',
          meta: '8 Cổng',
          badge: 'Thẩm Định',
          icon: ExternalLink,
          gradient: 'linear-gradient(140deg, #991B1B, #DC2626)',
          onSelect: () => onSelectTab('OFFICIAL_PORTALS'),
        },
      ],
    },
    {
      id: 'STORIES_LEARNING',
      label: 'Chuyện Kể Học Bác',
      headerTitle: '120 MẨU CHUYỆN HỌC TẬP THEO BÁC',
      headerTag: '120 CHUYỆN',
      badge: '120 Chuyện',
      icon: BookOpen,
      activeTabs: ['STORIES_LEARNING'],
      panelWidth: 385,
      items: [
        {
          title: 'Toàn Bộ 120 Mẩu Chuyện Về Bác',
          subtitle: 'Kho tàng chuyện kể có phân loại chủ đề, rút ra bài học sâu sắc',
          meta: '120 Bài',
          badge: 'Toàn Tập',
          icon: BookOpen,
          gradient: 'linear-gradient(140deg, #881337, #E11D48)',
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
        {
          title: 'Cán Bộ, Đảng Viên (Quy Định 144)',
          subtitle: 'Bài học cần, kiệm, liêm, chính, chí công vô tư, nêu gương sáng',
          meta: 'Cán Bộ',
          badge: 'Chuẩn Mực',
          icon: Award,
          gradient: 'linear-gradient(140deg, #B45309, #F59E0B)',
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
        {
          title: 'Đoàn Viên, Thanh Niên (Rèn Đức Luyện Tài)',
          subtitle: 'Khát vọng cống hiến, tinh thần dấn thân vì Tổ quốc của tuổi trẻ',
          meta: 'Tuổi Trẻ',
          badge: 'Thế Hệ Trẻ',
          icon: Sparkles,
          gradient: 'linear-gradient(140deg, #0284C7, #38BDF8)',
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
        {
          title: 'Toàn Thể Nhân Dân (Đời Sống Thường Nhật)',
          subtitle: 'Lối sống giản dị, tình yêu thương đồng bào, tinh thần đại đoàn kết',
          meta: 'Đời Sống',
          badge: 'Nhân Dân',
          icon: Smile,
          gradient: 'linear-gradient(140deg, #059669, #34D399)',
          onSelect: () => onSelectTab('STORIES_LEARNING'),
        },
      ],
    },
    {
      id: 'PARTY_HISTORY',
      label: 'Lịch Sử Đảng Bộ TP',
      headerTitle: 'LỊCH SỬ ĐẢNG BỘ THỦ DẦU MỘT',
      headerTag: '600 TRANG SỬ',
      badge: '600 Trang',
      icon: Flag,
      activeTabs: ['PARTY_HISTORY', 'TDM_CHRONOLOGY', 'FOOTPRINTS'],
      panelWidth: 400,
      items: [
        {
          title: 'Toàn Văn Pho Sử Vàng 600 Trang',
          subtitle: 'Lật giở đọc sách điện tử 2 tập sách lịch sử Đảng bộ địa phương',
          meta: '600 Trang',
          badge: 'Toàn Tập',
          icon: Flag,
          gradient: 'linear-gradient(140deg, #881337, #BE123C)',
          onSelect: () => onSelectTab('PARTY_HISTORY'),
        },
        {
          title: '04 Thời Kỳ Lịch Sử Kháng Chiến',
          subtitle: 'Từ Chi bộ Lò Chén 1936 qua hai cuộc kháng chiến vẻ vang',
          meta: '4 Thời Kỳ',
          badge: 'Mốc Son',
          icon: History,
          gradient: 'linear-gradient(140deg, #C59A55, #B28236)',
          onSelect: () => onSelectTab('PARTY_HISTORY'),
        },
        {
          title: 'Biên Niên Sử Phường (Từ 01/7/2025)',
          subtitle: 'Mốc son phát triển đô thị sau sáp nhập phường mới',
          meta: '2025-2026',
          badge: 'Mới Nhất',
          icon: Building2,
          gradient: 'linear-gradient(140deg, #059669, #10B981)',
          onSelect: () => onSelectTab('TDM_CHRONOLOGY'),
        },
        {
          title: 'Tuyến Đỏ 12 Địa Chỉ Đỏ & Di Tích',
          subtitle: 'Lộ trình tham quan di tích lịch sử & văn hóa Đất Thủ',
          meta: '12 Điểm',
          badge: 'Lộ Trình',
          icon: MapPin,
          gradient: 'linear-gradient(140deg, #1E3A8A, #3B82F6)',
          onSelect: () => {
            if (onOpenGuidedJourney) onOpenGuidedJourney();
            else onSelectTab('FOOTPRINTS');
          },
        },
      ],
    },
    {
      id: 'VR_HERITAGE',
      label: 'Nhà Truyền Thống 3D',
      headerTitle: 'CÔNG TRÌNH SỐ HÓA 3D TRỌNG ĐIỂM',
      headerTag: '2026',
      badge: 'VR 360°',
      icon: Box,
      activeTabs: ['EXHIBIT', 'TDM_HOUSE'],
      panelWidth: 395,
      items: [
        {
          title: 'Không Gian Văn Hóa HCM (3D VR) & Sa Bàn',
          subtitle: '08 gian chủ đề lịch sử, avatar 3D & thuyết minh Cấp A',
          meta: 'VR 360°',
          badge: '08 Gian Số',
          icon: Box,
          gradient: 'linear-gradient(140deg, #881337, #BE123C)',
          onSelect: () => onSelectTab('EXHIBIT'),
        },
        {
          title: 'Bộ Sưu Tập Hiện Vật & Bảo Vật 3D',
          subtitle: 'Xoay 360 độ hiện vật di sản quý giá & thuyết minh tương tác',
          meta: 'Bảo Vật 3D',
          badge: 'Hiện Vật',
          icon: Sparkles,
          gradient: 'linear-gradient(140deg, #B45309, #F59E0B)',
          onSelect: () => onSelectTab('EXHIBIT'),
        },
        {
          title: 'Nhà Việc Phú Cường & 05 Gian Số',
          subtitle: 'Tham quan 360°, hiện vật quý ven sông Bạch Đằng',
          meta: '360°',
          badge: 'Di Tích',
          icon: Building2,
          gradient: 'linear-gradient(140deg, #C59A55, #B28236)',
          onSelect: () => onSelectTab('TDM_HOUSE'),
        },
        {
          title: 'Bản Đồ 12 Địa Chỉ Đỏ & Di Tích',
          subtitle: '12 di tích lịch sử cách mạng & văn hóa Đất Thủ',
          meta: '12 Điểm',
          badge: '12 Chặng',
          icon: MapPin,
          gradient: 'linear-gradient(140deg, #047857, #10B981)',
          onSelect: () => {
            if (onOpenRedMap) onOpenRedMap();
            else onSelectTab('TDM_HOUSE');
          },
        },
      ],
    },
    {
      id: 'KIDS_SPACE',
      label: 'Không Gian Thiếu Nhi',
      headerTitle: 'BÚP SEN HỒNG ĐẤT THỦ — THIẾU NHI BÁC HỒ',
      headerTag: '5 ĐIỀU BÁC',
      badge: '5 Điều Bác',
      icon: Smile,
      activeTabs: ['KIDS'],
      panelWidth: 385,
      items: [
        {
          title: 'Không Gian Thiếu Nhi Đất Thủ',
          subtitle: 'Vách gỗ học đường 5 Điều Bác dạy, góc học tập sinh động',
          meta: '5 Điều',
          badge: 'Vách Gỗ',
          icon: Smile,
          gradient: 'linear-gradient(140deg, #D97706, #F59E0B)',
          onSelect: () => onSelectTab('KIDS'),
        },
        {
          title: 'Thư Viện Thiếu Nhi & Truyện Tranh',
          subtitle: 'Kho sách tranh Bác Hồ với thiếu nhi, sách gương người tốt',
          meta: 'Tranh Màu',
          badge: 'Sách Tranh',
          icon: BookOpen,
          gradient: 'linear-gradient(140deg, #059669, #10B981)',
          onSelect: () => onSelectTab('KIDS'),
        },
        {
          title: 'Đố Vui Tìm Hiểu Bác Hồ & Di Sản',
          subtitle: 'Bộ câu hỏi tương tác nhận huy hiệu Cháu ngoan Bác Hồ',
          meta: '10 Câu',
          badge: 'Trắc Nghiệm',
          icon: Award,
          gradient: 'linear-gradient(140deg, #7C3AED, #A78BFA)',
          onSelect: () => {
            if (setIsMiniQuizOpen) setIsMiniQuizOpen(true);
            else onSelectTab('KIDS');
          },
        },
        {
          title: 'Nhật Ký Làm Nghìn Việc Tốt',
          subtitle: 'Góc ghi nhận những hành động đẹp của thiếu nhi Thủ Dầu Một',
          meta: 'Hoa Điểm 10',
          badge: 'Rèn Luyện',
          icon: Heart,
          gradient: 'linear-gradient(140deg, #BE123C, #FB7185)',
          onSelect: () => onSelectTab('KIDS'),
        },
      ],
    },
    {
      id: 'COMMUNITY',
      label: 'Rèn Luyện & Đời Sống',
      headerTitle: 'HỌC TẬP & LÀM THEO TƯ TƯỞNG BÁC',
      headerTag: 'LAN TỎA',
      icon: Heart,
      activeTabs: ['EXEMPLARY_PEOPLE', 'MODELS', 'EVALUATION'],
      panelWidth: 390,
      items: [
        {
          title: 'Gương Điển Hình Học Bác',
          subtitle: 'Những câu chuyện người thật việc thật tiêu biểu tại địa phương',
          meta: 'Gương Tốt',
          badge: 'Gương Sáng',
          icon: Award,
          gradient: 'linear-gradient(140deg, #881337, #BE123C)',
          onSelect: () => onSelectTab('EXEMPLARY_PEOPLE'),
        },
        {
          title: 'Mô Hình Học Tập Tiêu Biểu',
          subtitle: 'Các mô hình hiệu quả từ chi bộ, khu phố và cơ quan',
          meta: '8 Mô Hình',
          badge: 'Nhân Rộng',
          icon: Landmark,
          gradient: 'linear-gradient(140deg, #047857, #10B981)',
          onSelect: () => onSelectTab('MODELS'),
        },
        {
          title: 'Tự Đánh Giá Học Tập Hằng Tháng',
          subtitle: 'Công cụ trắc nghiệm tự soi rọi, rèn luyện theo tấm gương Bác',
          meta: 'Tự Soi Rọi',
          badge: 'Tu Dưỡng',
          icon: ShieldCheck,
          gradient: 'linear-gradient(140deg, #1E3A8A, #3B82F6)',
          onSelect: () => onSelectTab('EVALUATION'),
        },
        {
          title: 'Giới Thiệu Gương Sáng Mới',
          subtitle: 'Đề xuất gương điển hình tiên tiến người tốt việc tốt',
          meta: 'Tuyên Dương',
          badge: 'Đóng Góp',
          icon: Heart,
          gradient: 'linear-gradient(140deg, #B45309, #F59E0B)',
          onSelect: () => {
            if (setIsNominationModalOpen) setIsNominationModalOpen(true);
            else onSelectTab('EXEMPLARY_PEOPLE');
          },
        },
      ],
    },
    {
      id: 'UTILITIES',
      label: 'Tin Tức & Tiện Ích',
      headerTitle: 'BẢN TIN HOẠT ĐỘNG & KẾT NỐI SỐ',
      headerTag: 'CẬP NHẬT',
      icon: Sparkles,
      activeTabs: ['NEWS'],
      panelWidth: 405,
      items: [
        {
          title: 'Bản Tin Văn Hóa Thủ Dầu Một',
          subtitle: 'Tin tức, phóng sự hoạt động Không gian văn hóa Hồ Chí Minh',
          meta: 'Tin Nhanh',
          badge: 'Mới Nhất',
          icon: FileText,
          gradient: 'linear-gradient(140deg, #881337, #E11D48)',
          onSelect: () => onSelectTab('NEWS'),
        },
        {
          title: 'Fanpage Đất Thủ Quê Hương Tôi',
          subtitle: 'Trang thông tin cộng đồng tuyên truyền chính thống',
          meta: 'Facebook',
          badge: 'Mạng Xã Hội',
          icon: ExternalLink,
          gradient: 'linear-gradient(140deg, #1877F2, #3B82F6)',
          onSelect: () => onSelectTab('NEWS'),
        },
        {
          title: 'Đồng Bộ Dữ Liệu Fanpage',
          subtitle: fanpageSyncStatus === 'syncing' ? 'Đang đồng bộ từ Facebook...' : 'Tải tức thời bài viết mới nhất từ Fanpage về hệ thống',
          meta: fanpageSyncStatus === 'syncing' ? 'Đang Xử Lý' : 'API',
          badge: 'Trực Tuyến',
          icon: RefreshCw,
          gradient: 'linear-gradient(140deg, #059669, #34D399)',
          onSelect: () => onSyncFanpage?.(),
        },
        {
          title: '08 Chuyên Trang Tư Liệu Trung Ương',
          subtitle: 'Phủ Chủ tịch, Bảo tàng HCM, Lăng Bác, NXB Sự thật...',
          meta: 'Tư Liệu',
          badge: '8 Cổng',
          icon: ExternalLink,
          gradient: 'linear-gradient(140deg, #991B1B, #DC2626)',
          onSelect: () => onSelectTab('OFFICIAL_PORTALS'),
        },
      ],
    },
  ];

  // Tính toán vị trí biến hình Morphing (w, h, x, cx)
  const updateMorphingMetrics = useCallback((targetIndex: number, wasAlreadyOpen: boolean) => {
    if (targetIndex < 0 || targetIndex >= TAB_GROUPS.length) return;
    const rootEl = rootRef.current;
    const pnEl = pnRef.current;
    const carEl = carRef.current;
    const tabEl = tabRefs.current[targetIndex];
    const pageEl = pageRefs.current[targetIndex];

    if (!rootEl || !pnEl || !carEl || !tabEl || !pageEl) return;

    const rootRect = rootEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();

    // Tính tâm x của tab mục tiêu đối với root
    const cx = tabRect.left - rootRect.left + tabRect.width / 2;

    // Chiều rộng và chiều cao đo đạc thực tế của trang nội dung
    const targetGroup = TAB_GROUPS[targetIndex];
    const w = targetGroup?.panelWidth || Math.min(420, Math.max(380, pageEl.scrollWidth || 390));
    const h = (pageEl.scrollHeight || 300) + 4;

    // Giữ panel luôn nằm trong khung nhìn an toàn của root
    const minX = 4;
    const maxX = Math.max(minX, rootRect.width - w - 8);
    const x = Math.max(minX, Math.min(maxX, cx - w / 2));

    pnEl.style.setProperty('--w', `${w}px`);
    pnEl.style.setProperty('--h', `${h}px`);
    pnEl.style.setProperty('--x', `${x}px`);
    carEl.style.setProperty('--cx', `${cx - 7}px`);

    if (!wasAlreadyOpen) {
      setNoTransition(true);
      requestAnimationFrame(() => {
        setNoTransition(false);
      });
    }
  }, [TAB_GROUPS.length]);

  const openMenu = useCallback((index: number) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const wasOpen = isOpen && currentIndex >= 0;
    lastActiveIndexRef.current = currentIndex;
    setCurrentIndex(index);
    setIsOpen(true);

    // Cập nhật vị trí và kích thước biến hình
    requestAnimationFrame(() => {
      updateMorphingMetrics(index, wasOpen);
    });
  }, [currentIndex, isOpen, updateMorphingMetrics]);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setCurrentIndex(-1);
    }, 220);
  }, []);

  const handleTabClick = (index: number) => {
    hcmSfx.playClick(600);
    if (isOpen && currentIndex === index) {
      setIsOpen(false);
      setCurrentIndex(-1);
    } else {
      openMenu(index);
    }
  };

  // Hỗ trợ bàn phím: Left/Right Arrow, Escape, Tab, Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isOpen) {
        setIsOpen(false);
        if (currentIndex >= 0 && tabRefs.current[currentIndex]) {
          tabRefs.current[currentIndex]?.focus();
        }
        setCurrentIndex(-1);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const focusedIdx = tabRefs.current.findIndex((el) => el === document.activeElement);
      const baseIdx = currentIndex >= 0 ? currentIndex : (focusedIdx >= 0 ? focusedIdx : 0);
      const nextIdx = (baseIdx + 1) % TAB_GROUPS.length;
      openMenu(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const focusedIdx = tabRefs.current.findIndex((el) => el === document.activeElement);
      const baseIdx = currentIndex >= 0 ? currentIndex : (focusedIdx >= 0 ? focusedIdx : 0);
      const prevIdx = (baseIdx - 1 + TAB_GROUPS.length) % TAB_GROUPS.length;
      openMenu(prevIdx);
      tabRefs.current[prevIdx]?.focus();
    }
  };

  // Tự động đóng khi click ra ngoài
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setCurrentIndex(-1);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`ux u354 ${isOpen ? 'is-open' : ''} ${noTransition ? 'no-t' : ''}`}
      onMouseLeave={scheduleClose}
      onKeyDown={handleKeyDown}
    >
      {/* Thanh nút điều hướng chính */}
      <ul ref={navRef} className="u354-nav" aria-label="Điều hướng chính">
        {/* 0. Sảnh Trung Tâm (Link trang chủ) */}
        <li>
          <a
            href="/gioi-thieu"
            onClick={(e) => {
              e.preventDefault();
              hcmSfx.playClick(600);
              onSelectTab('FOYER');
              setIsOpen(false);
              setCurrentIndex(-1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`u354-tab ${
              activeTab === 'FOYER' && !isOpen
                ? 'text-[#881337] bg-rose-50 shadow-2xs font-extrabold border border-rose-200'
                : 'text-slate-800 hover:text-[#881337] hover:bg-rose-50/70'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-rose-700" />
            <span>Sảnh Trung Tâm</span>
          </a>
        </li>

        {/* 07 Tab mục có dropdown morphing */}
        {TAB_GROUPS.map((tab, idx) => {
          const TabIcon = tab.icon;
          const isTabActive = tab.activeTabs.includes(activeTab) || (isOpen && currentIndex === idx);
          const isExpanded = isOpen && currentIndex === idx;

          return (
            <li key={tab.id} className="relative">
              <button
                ref={(el) => { tabRefs.current[idx] = el; }}
                type="button"
                className="u354-tab"
                aria-expanded={isExpanded}
                data-active={isTabActive ? 'true' : 'false'}
                onMouseEnter={() => openMenu(idx)}
                onClick={() => handleTabClick(idx)}
              >
                <TabIcon className="w-3.5 h-3.5 text-rose-700" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[8.5px] xl:text-[9px] px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-2xs">
                    {tab.badge}
                  </span>
                )}
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-250 ease-out ${
                    isExpanded ? 'rotate-180 text-rose-700' : ''
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Caret nhọn di chuyển theo panel */}
      <span ref={carRef} className="u354-car" aria-hidden="true" />

      {/* Panel trượt & biến đổi kích thước Morphing */}
      <div
        ref={pnRef}
        className="u354-pn"
        onMouseEnter={() => {
          if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
          }
        }}
      >
        <div className="u354-ct">
          {TAB_GROUPS.map((tab, idx) => {
            // Xác định hướng trượt ngang:
            // - Nếu là trang hiện tại: translateX(0)
            // - Nếu nằm bên trái trang hiện tại: .l (translateX(-40px))
            // - Nếu nằm bên phải trang hiện tại: .r (translateX(40px))
            let pageClass = 'u354-pg';
            if (currentIndex === idx) {
              pageClass += '';
            } else if (idx < currentIndex) {
              pageClass += ' l';
            } else {
              pageClass += ' r';
            }

            return (
              <div
                key={tab.id}
                ref={(el) => { pageRefs.current[idx] = el; }}
                className={pageClass}
                aria-hidden={currentIndex !== idx}
              >
                {/* Header phân khu */}
                <div className="u354-pg-header">
                  <span className="flex items-center gap-1.5">
                    <tab.icon className="w-3.5 h-3.5 text-rose-700" />
                    {tab.headerTitle}
                  </span>
                  <span className="tag">{tab.headerTag}</span>
                </div>

                {/* Danh sách mục con */}
                {tab.items.map((item, itemIdx) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={itemIdx}
                      type="button"
                      tabIndex={currentIndex === idx ? 0 : -1}
                      onClick={() => {
                        hcmSfx.playClick(600);
                        item.onSelect();
                        setIsOpen(false);
                        setCurrentIndex(-1);
                      }}
                      className="u354-it group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <i style={{ background: item.gradient }}>
                          <ItemIcon className="w-4 h-4 text-white" />
                        </i>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <b>{item.title}</b>
                            {item.badge && (
                              <span className="u354-badge">{item.badge}</span>
                            )}
                          </div>
                          <span className="desc truncate">{item.subtitle}</span>
                        </div>
                      </div>
                      <span className="u354-meta">{item.meta}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
