import { SpaceTab } from '../components/ProfessionalNavbar';

export type HcmDomainKey =
  | SpaceTab
  | 'GOLDEN_BOOK'
  | 'RED_MAP';

export interface HcmDomainInfo {
  key: HcmDomainKey;
  path: string;
  slug: string;
  label: string;
  title: string;
  isModal?: boolean;
}

export const HCM_DOMAINS: Record<HcmDomainKey, HcmDomainInfo> = {
  FOYER: {
    key: 'FOYER',
    path: '/gioi-thieu',
    slug: 'gioi-thieu',
    label: 'Giới thiệu',
    title: 'Giới Thiệu · Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một',
  },
  EXHIBIT: {
    key: 'EXHIBIT',
    path: '/kham-pha-di-san',
    slug: 'kham-pha-di-san',
    label: 'Khám phá di sản',
    title: 'Khám Phá Di Sản & Bảo Tàng 3D · Không Gian Văn Hóa Hồ Chí Minh',
  },
  BOOKS: {
    key: 'BOOKS',
    path: '/thu-vien-so',
    slug: 'thu-vien-so',
    label: 'Thư viện số',
    title: 'Thư Viện Số & Tác Phẩm Toàn Tập · Không Gian Văn Hóa Hồ Chí Minh',
  },
  NEWS: {
    key: 'NEWS',
    path: '/tin-tuc',
    slug: 'tin-tuc',
    label: 'Tin tức',
    title: 'Tin Tức & Sự Kiện Hoạt Động · Phường Thủ Dầu Một',
  },
  PARTY_HISTORY: {
    key: 'PARTY_HISTORY',
    path: '/lich-su-dang-bo',
    slug: 'lich-su-dang-bo',
    label: 'Lịch sử Đảng bộ',
    title: 'Lịch Sử Đảng Bộ TP Thủ Dầu Một (1930 - 2025 · 600 Trang)',
  },
  TDM_HOUSE: {
    key: 'TDM_HOUSE',
    path: '/di-tich-dat-thu',
    slug: 'di-tich-dat-thu',
    label: 'Di tích Đất Thủ',
    title: 'Di Tích Lịch Sử & Nhà Truyền Thống Đất Thủ (3D)',
  },
  TDM_CHRONOLOGY: {
    key: 'TDM_CHRONOLOGY',
    path: '/bien-nien-su-phuong',
    slug: 'bien-nien-su-phuong',
    label: 'Biên niên sử phường',
    title: 'Biên Niên Sử Phường Thủ Dầu Một (Từ Lúc Hình Thành 01/07/2025 Đến Nay)',
  },
  EXEMPLARY_PEOPLE: {
    key: 'EXEMPLARY_PEOPLE',
    path: '/guong-sang-tieu-bieu',
    slug: 'guong-sang-tieu-bieu',
    label: 'Gương sáng tiêu biểu',
    title: 'Gương Sáng Tiêu Biểu & Người Tốt Việc Tốt Phường Thủ Dầu Một (Từ 01/07/2025 Đến Nay)',
  },
  GOLDEN_BOOK: {
    key: 'GOLDEN_BOOK',
    path: '/so-vang',
    slug: 'so-vang',
    label: 'Sổ vàng',
    title: 'Sổ Vàng Truyền Thống Số & Lời Hứa Danh Dự Với Bác',
    isModal: true,
  },
  RED_MAP: {
    key: 'RED_MAP',
    path: '/dia-chi-do',
    slug: 'dia-chi-do',
    label: 'Địa chỉ đỏ',
    title: 'Bản Đồ Số Di Sản & Không Gian Văn Hóa Hồ Chí Minh',
    isModal: true,
  },
  BIO: {
    key: 'BIO',
    path: '/tieu-su',
    slug: 'tieu-su',
    label: 'Cuộc đời & Sự nghiệp',
    title: 'Tiểu Sử Cuộc Đời & Sự Nghiệp Chủ Tịch Hồ Chí Minh',
  },
  TIMELINE: {
    key: 'TIMELINE',
    path: '/dong-thoi-gian',
    slug: 'dong-thoi-gian',
    label: 'Dòng thời gian',
    title: 'Biên Niên Sử & Dòng Thời Gian Lịch Sử Hồ Chí Minh (1890–1969)',
  },
  QUOTES: {
    key: 'QUOTES',
    path: '/loi-bac-day',
    slug: 'loi-bac-day',
    label: 'Lời Bác dạy',
    title: 'Lời Bác Dạy & Chuẩn Mực Đạo Đức Cách Mạng',
  },
  FOOTPRINTS: {
    key: 'FOOTPRINTS',
    path: '/dau-chan-bac',
    slug: 'dau-chan-bac',
    label: 'Dấu chân Bác',
    title: 'Dấu Chân Hành Trình Bác Hồ Trên Bản Đồ',
  },
  MEDIA: {
    key: 'MEDIA',
    path: '/da-phuong-tien',
    slug: 'da-phuong-tien',
    label: 'Đa phương tiện',
    title: 'Kho Tư Liệu Âm Thanh VOV & Video Phim Tư Liệu Bác Hồ',
  },
  MODELS: {
    key: 'MODELS',
    path: '/mo-hinh',
    slug: 'mo-hinh',
    label: 'Mô hình học tập',
    title: 'Mô Hình Không Gian Văn Hóa Hồ Chí Minh Tiêu Biểu Cơ Sở',
  },
  EVALUATION: {
    key: 'EVALUATION',
    path: '/tieu-chi-danh-gia',
    slug: 'tieu-chi-danh-gia',
    label: 'Tiêu chí đánh giá',
    title: 'Bộ Tiêu Chí Đánh Giá Không Gian Văn Hóa Hồ Chí Minh',
  },
  AI_STUDIO: {
    key: 'AI_STUDIO',
    path: '/ai-studio',
    slug: 'ai-studio',
    label: 'AI Studio',
    title: 'AI Studio Thuyết Minh & Giọng Đọc Lời Bác Dạy',
  },
  EXPLORER: {
    key: 'EXPLORER',
    path: '/khao-cuu',
    slug: 'khao-cuu',
    label: 'Khảo cứu tư liệu',
    title: 'Khảo Cứu Tư Liệu & Thư Mục Di Sản Hồ Chí Minh',
  },
  CMS: {
    key: 'CMS',
    path: '/quan-tri-cms',
    slug: 'quan-tri-cms',
    label: 'Quản trị CMS',
    title: 'Hệ Thống Quản Trị Nội Dung (CMS)',
  },
};

/**
 * Phân tích URL hiện tại (pathname, hash, search) để lấy domain key tương ứng
 */
export function parseDomainFromUrl(): HcmDomainKey {
  if (typeof window === 'undefined') return 'FOYER';

  const pathname = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const searchParams = new URLSearchParams(window.location.search);
  const tabParam = searchParams.get('tab')?.toUpperCase();

  // 1. Kiểm tra query param ?tab=
  if (tabParam && tabParam in HCM_DOMAINS) {
    return tabParam as HcmDomainKey;
  }

  // 2. Chuỗi định danh từ path hoặc hash
  const rawTarget = pathname || hash;
  if (!rawTarget || rawTarget === 'index.html') return 'FOYER';

  // 3. So khớp với các domain đã định nghĩa
  for (const domain of Object.values(HCM_DOMAINS)) {
    if (rawTarget === domain.slug || rawTarget === domain.path.replace(/^\/+/, '')) {
      return domain.key;
    }
  }

  // 4. Các alias phổ biến hỗ trợ người dùng gõ link tắt
  const ALIASES: Record<string, HcmDomainKey> = {
    'home': 'FOYER',
    'trang-chu': 'FOYER',
    'gioi-thieu': 'FOYER',
    'kham-pha': 'EXHIBIT',
    'kham-pha-di-san': 'EXHIBIT',
    'trien-lam': 'EXHIBIT',
    'bao-tang': 'EXHIBIT',
    '3d': 'EXHIBIT',
    'thu-vien': 'BOOKS',
    'thu-vien-so': 'BOOKS',
    'sach': 'BOOKS',
    'toan-tap': 'BOOKS',
    'tin-tuc': 'NEWS',
    'su-kien': 'NEWS',
    'lich-su-dang-bo': 'PARTY_HISTORY',
    'dang-bo': 'PARTY_HISTORY',
    '600tr': 'PARTY_HISTORY',
    'di-tich': 'TDM_HOUSE',
    'di-tich-dat-thu': 'TDM_HOUSE',
    'nha-truyen-thong': 'TDM_HOUSE',
    'dat-thu': 'TDM_HOUSE',
    'bien-nien-su-phuong': 'TDM_CHRONOLOGY',
    'bien-nien-su-tdm': 'TDM_CHRONOLOGY',
    'guong-sang': 'EXEMPLARY_PEOPLE',
    'guong-sang-tieu-bieu': 'EXEMPLARY_PEOPLE',
    'nguoi-tot-viec-tot': 'EXEMPLARY_PEOPLE',
    'dien-hinh': 'EXEMPLARY_PEOPLE',
    'phuong-thu-dau-mot': 'TDM_CHRONOLOGY',
    '1-7-2025': 'TDM_CHRONOLOGY',
    'so-vang': 'GOLDEN_BOOK',
    'dia-chi-do': 'RED_MAP',
    'ban-do': 'RED_MAP',
    'ban-do-di-san': 'RED_MAP',
    'tieu-su': 'BIO',
    'cuoc-doi': 'BIO',
    'timeline': 'TIMELINE',
    'dong-thoi-gian': 'TIMELINE',
    'bien-nien-su': 'TIMELINE',
    'loi-bac-day': 'QUOTES',
    'tu-tuong': 'QUOTES',
    'dau-chan-bac': 'FOOTPRINTS',
    'hai-trinh': 'FOOTPRINTS',
    'media': 'MEDIA',
    'da-phuong-tien': 'MEDIA',
    'am-thanh': 'MEDIA',
    'video': 'MEDIA',
    'mo-hinh': 'MODELS',
    'danh-gia': 'EVALUATION',
    'ai-studio': 'AI_STUDIO',
    'khao-cuu': 'EXPLORER',
    'cms': 'CMS',
  };

  if (ALIASES[rawTarget]) {
    return ALIASES[rawTarget];
  }

  return 'FOYER';
}

/**
 * Cập nhật URL trình duyệt theo domain tương ứng (HTML5 History API)
 */
export function updateBrowserUrl(domainKey: HcmDomainKey, replace: boolean = false): void {
  if (typeof window === 'undefined') return;

  const domain = HCM_DOMAINS[domainKey];
  if (!domain) return;

  const targetPath = domain.path;
  const currentPath = window.location.pathname;

  // Khi vừa tải trang tại '/', giữ nguyên '/' không bắt buộc phải đổi URL
  if (replace && domainKey === 'FOYER' && currentPath === '/') {
    if (domain.title) {
      document.title = domain.title;
    }
    return;
  }

  if (currentPath !== targetPath) {
    if (replace) {
      window.history.replaceState({ domainKey }, domain.title, targetPath);
    } else {
      window.history.pushState({ domainKey }, domain.title, targetPath);
    }
  }

  if (domain.title) {
    document.title = domain.title;
  }
}
