import crypto from 'node:crypto';
import { getSqliteDb, withSqliteTransaction } from './db/sqliteClient';
import { harvestOfficialSource, type OfficialHarvestItem } from './hcmPortalConnector';
import {
  computeTrigramSimilarity,
  normalizeVietnameseText,
  safeJsonParse,
} from './utils/textSimilarity';

export type HcmDossierType =
  | 'EVENT'
  | 'WORK'
  | 'MEDIA'
  | 'ARTIFACT'
  | 'PERSON'
  | 'RESEARCH'
  | 'LOCAL_ACTIVITY';

export type HcmVerificationStatus = 'VERIFIED' | 'NEEDS_VERIFICATION' | 'REJECTED';
export type HcmPublishStatus = 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

export interface HcmActor {
  uid: string;
  name: string;
  role: string;
}

export interface HcmCategoryRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HcmTopicRecord {
  id: string;
  categoryId: string;
  title: string;
  audienceTag: string;
  eraRange: string;
  description: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface HcmDossierRecord {
  id: string;
  title: string;
  dossierType: HcmDossierType;
  categoryIds: string[];
  topicId: string;
  tags: string[];
  audiences: string[];
  summary: string;
  content: string;
  timelineDate: string;
  location: string;
  imageUrl: string;
  imageCaption: string;
  sourceName: string;
  sourceUrl: string;
  author: string;
  publisher: string;
  publishYear: string;
  licenseInfo: string;
  collectedAt: string;
  verifiedAt: string;
  verificationStatus: HcmVerificationStatus;
  publishStatus: HcmPublishStatus;
  createdBy: string;
  updatedBy: string;
  verifiedBy: string;
  approvedBy: string;
  version: number;
  isAiDraft: boolean;
  duplicateOfId: string;
  missingFields: string[];
  createdAt: string;
  updatedAt: string;
}

export interface HcmDossierVersionRecord {
  id: string;
  dossierId: string;
  versionNum: number;
  snapshot: HcmDossierRecord;
  changeNote: string;
  actorUid: string;
  actorName: string;
  createdAt: string;
}

export interface HcmSourceRecord {
  id: string;
  name: string;
  domain: string;
  url: string;
  fetchMode: 'HTML' | 'RSS' | 'API';
  trustTier: 'PRIMARY' | 'OFFICIAL';
  licenseNote: string;
  scheduleFreq: 'DAILY' | 'WEEKLY' | 'MANUAL';
  rateLimitMinutes: number;
  isEnabled: boolean;
  lastCheckedAt: string;
  lastStatus: string;
  lastError: string;
  itemsImported: number;
}

export interface HcmSyncLogRecord {
  id: string;
  sourceId: string;
  sourceName: string;
  startedAt: string;
  finishedAt: string;
  status: 'SUCCESS' | 'SKIPPED' | 'ERROR';
  fetchedCount: number;
  draftsCreated: number;
  duplicatesSkipped: number;
  message: string;
}

export interface HcmEditorialLogRecord {
  id: string;
  dossierId: string;
  action: string;
  actorUid: string;
  actorName: string;
  actorRole: string;
  note: string;
  createdAt: string;
}

export interface HcmTourRecord {
  id: string;
  title: string;
  audience: string;
  description: string;
  durationLabel: string;
  dossierIds: string[];
  isPublished: boolean;
  sortOrder: number;
  updatedAt: string;
}

export const HCM_VERIFIER_ROLES = new Set(['verifier', 'approver', 'admin', 'owner', 'manager', 'leader']);
export const HCM_APPROVER_ROLES = new Set(['approver', 'admin', 'owner', 'manager', 'leader']);

const SEED_META_KEY = 'hcm_v2_seeded_v1';

const INITIAL_CATEGORIES: Array<Omit<HcmCategoryRecord, 'createdAt' | 'updatedAt'>> = [
  { id: 'cat_bio', slug: 'cuoc-doi-su-nghiep', title: 'Cuộc đời & Sự nghiệp', description: '06 chương tiểu sử và 30 mốc biên niên lịch sử chuẩn xác.', iconName: 'History', sortOrder: 1, isActive: true },
  { id: 'cat_works', slug: 'tac-pham-loi-day', title: 'Tác phẩm & Lời Bác dạy', description: '15 tập Hồ Chí Minh Toàn tập, tác phẩm kinh điển và trích dẫn xác thực.', iconName: 'BookMarked', sortOrder: 2, isActive: true },
  { id: 'cat_exhibit', slug: 'bao-tang-trung-bay', title: 'Bảo tàng & Hiện vật Số', description: '08 gian trưng bày hiện vật, di tích quốc gia và không gian 3D.', iconName: 'Landmark', sortOrder: 3, isActive: true },
  { id: 'cat_world', slug: 'dau-chan-quoc-te', title: 'Dấu chân Người & Thế giới', description: 'Hành trình 30 năm tìm đường cứu nước qua 20 tọa độ lịch sử.', iconName: 'Compass', sortOrder: 4, isActive: true },
  { id: 'cat_media', slug: 'kho-anh-clip-audio', title: 'Ảnh, Clip & Âm thanh Di sản', description: 'Phim tài liệu VTV24, trình chiếu lịch sử, bản ghi âm và phóng sự ảnh.', iconName: 'Film', sortOrder: 5, isActive: true },
  { id: 'cat_local', slug: 'thu-dau-mot-thuc-tien', title: 'Tin tức & Mô hình Thủ Dầu Một', description: 'Hoạt động chi bộ, Dân vận khéo, di tích và mô hình tại phường Thủ Dầu Một.', iconName: 'Award', sortOrder: 6, isActive: true },
  { id: 'cat_ideology', slug: 'tu-tuong-quy-dinh-144', title: 'Tư tưởng, Đạo đức & Học tập', description: 'Chỉ thị 05-CT/TW, Quy định 144-QĐ/TW và chuyên đề rèn luyện cán bộ.', iconName: 'ShieldCheck', sortOrder: 7, isActive: true },
];

const INITIAL_TOPICS: Array<Omit<HcmTopicRecord, 'createdAt' | 'updatedAt'>> = [
  { id: 'top_niên_thieu', categoryId: 'cat_bio', title: 'Thời niên thiếu & Khởi đầu cứu nước (1890–1920)', audienceTag: 'Học sinh & Đoàn viên', eraRange: '1890–1920', description: 'Quê hương Hoàng Trù – Làng Sen, Huế, Dục Thanh và Bến Nhà Rồng 1911.', sortOrder: 1 },
  { id: 'top_lap_dang', categoryId: 'cat_bio', title: 'Sáng lập Đảng & Cách mạng Tháng Tám (1920–1945)', audienceTag: 'Cán bộ & Đảng viên', eraRange: '1920–1945', description: 'Quảng Châu, Hương Cảng 1930, Pác Bó 1941 và Tuyên ngôn Độc lập 1945.', sortOrder: 2 },
  { id: 'top_khang_chien', categoryId: 'cat_bio', title: 'Kháng chiến Kiến quốc & Di chúc 1969 (1945–1969)', audienceTag: 'Toàn dân', eraRange: '1945–1969', description: 'Điện Biên Phủ, Nhà sàn Phủ Chủ tịch và Di chúc thiêng liêng.', sortOrder: 3 },
  { id: 'top_toan_tap', categoryId: 'cat_works', title: 'Tủ sách Hồ Chí Minh Toàn tập (NXB CTQG Sự thật)', audienceTag: 'Nghiên cứu', eraRange: '1912–1969', description: 'Bộ 15 tập tác phẩm, thư từ, bài nói và bài viết gốc.', sortOrder: 4 },
  { id: 'top_di_tich', categoryId: 'cat_exhibit', title: 'Bảo tàng Hồ Chí Minh & Di tích Cách mạng', audienceTag: 'Tham quan phổ thông', eraRange: '1911–Nay', description: 'Bến Nhà Rồng, Nhà sàn, Bảo tàng HCM và Di tích Nhà tù Phú Lợi.', sortOrder: 5 },
  { id: 'top_quoc_te', categoryId: 'cat_world', title: 'Hành trình 5 Châu & UNESCO Tôn vinh', audienceTag: 'Đoàn viên & Nghiên cứu', eraRange: '1911–1987', description: '20 tọa độ toàn cầu và Nghị quyết UNESCO 24C/18.65.', sortOrder: 6 },
  { id: 'top_phim_audio', categoryId: 'cat_media', title: 'Kho Tư liệu Nghe – Nhìn Lịch sử', audienceTag: 'Tham quan phổ thông', eraRange: '1945–Nay', description: 'Clip VTV24 xác thực, bản ghi âm Đài Tiếng nói Việt Nam.', sortOrder: 7 },
  { id: 'top_tdm_news', categoryId: 'cat_local', title: 'Hoạt động Đảng bộ & Khu phố Thủ Dầu Một', audienceTag: 'Cán bộ & Nhân dân', eraRange: '2024–Nay', description: 'Tin tức sinh hoạt 26 chi bộ, Hoa viên Bạch Đằng và mô hình cơ sở.', sortOrder: 8 },
  { id: 'top_144', categoryId: 'cat_ideology', title: 'Chỉ thị 05-CT/TW & Quy định 144-QĐ/TW', audienceTag: 'Cán bộ & Đảng viên', eraRange: '2024–Nay', description: '5 chuẩn mực đạo đức cách mạng trong giai đoạn mới.', sortOrder: 9 },
  { id: 'top_nhan_vat', categoryId: 'cat_bio', title: 'Nhân vật Lịch sử & Đồng chí Gắn bó với Bác', audienceTag: 'Nghiên cứu', eraRange: '1911–1969', description: 'Chủ tịch Tôn Đức Thắng, các bậc tiền bối và đồng bào Nam Bộ.', sortOrder: 10 },
];

const INITIAL_SOURCES: HcmSourceRecord[] = [
  {
    id: 'src_hochiminhcity',
    name: 'Cổng TTĐT TP.HCM — Không gian Văn hóa HCM',
    domain: 'hochiminhcity.gov.vn',
    url: 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa',
    fetchMode: 'HTML',
    trustTier: 'PRIMARY',
    licenseNote: 'Cơ quan hành chính nhà nước — Cho phép trích dẫn thông tin công khai ghi rõ nguồn.',
    scheduleFreq: 'DAILY',
    rateLimitMinutes: 30,
    isEnabled: true,
    lastCheckedAt: '',
    lastStatus: 'READY',
    lastError: '',
    itemsImported: 0,
  },
  {
    id: 'src_baochinhphu_rss',
    name: 'Báo Điện tử Chính phủ (RSS Chính thức)',
    domain: 'baochinhphu.vn',
    url: 'https://baochinhphu.vn/home.rss',
    fetchMode: 'RSS',
    trustTier: 'PRIMARY',
    licenseNote: 'RSS chính thức Cổng Thông tin Điện tử Chính phủ — Ghi rõ nguồn Chinhphu.vn.',
    scheduleFreq: 'DAILY',
    rateLimitMinutes: 30,
    isEnabled: true,
    lastCheckedAt: '',
    lastStatus: 'READY',
    lastError: '',
    itemsImported: 0,
  },
  {
    id: 'src_hochiminh_vn',
    name: 'Trang Tư liệu Hồ Chí Minh (Ban Tuyên giáo TW)',
    domain: 'hochiminh.vn',
    url: 'https://hochiminh.vn',
    fetchMode: 'HTML',
    trustTier: 'PRIMARY',
    licenseNote: 'Cổng tư liệu chính thống về Chủ tịch Hồ Chí Minh — Tham chiếu biên niên, tác phẩm.',
    scheduleFreq: 'WEEKLY',
    rateLimitMinutes: 120,
    isEnabled: true,
    lastCheckedAt: '',
    lastStatus: 'READY',
    lastError: '',
    itemsImported: 0,
  },
  {
    id: 'src_baotanghcm',
    name: 'Bảo tàng Hồ Chí Minh',
    domain: 'baotanghochiminh.vn',
    url: 'https://baotanghochiminh.vn',
    fetchMode: 'HTML',
    trustTier: 'PRIMARY',
    licenseNote: 'Hệ thống Bảo tàng & Di tích lưu niệm Chủ tịch Hồ Chí Minh — Tham chiếu hiện vật, di tích.',
    scheduleFreq: 'WEEKLY',
    rateLimitMinutes: 120,
    isEnabled: true,
    lastCheckedAt: '',
    lastStatus: 'READY',
    lastError: '',
    itemsImported: 0,
  },
  {
    id: 'src_dangcongsan',
    name: 'Cổng TTĐT Đảng Cộng sản Việt Nam',
    domain: 'dangcongsan.vn',
    url: 'https://dangcongsan.vn',
    fetchMode: 'HTML',
    trustTier: 'PRIMARY',
    licenseNote: 'Cơ quan Trung ương Đảng Cộng sản Việt Nam — Văn kiện, chỉ thị, nghị quyết chính thống.',
    scheduleFreq: 'DAILY',
    rateLimitMinutes: 60,
    isEnabled: true,
    lastCheckedAt: '',
    lastStatus: 'READY',
    lastError: '',
    itemsImported: 0,
  },
  {
    id: 'src_nxbctqg',
    name: 'NXB Chính trị Quốc gia Sự thật',
    domain: 'nxbctqg.org.vn',
    url: 'https://nxbctqg.org.vn',
    fetchMode: 'HTML',
    trustTier: 'OFFICIAL',
    licenseNote: 'Đơn vị xuất bản bộ Hồ Chí Minh Toàn tập — Chỉ lập danh mục thư mục tham khảo, bảo vệ bản quyền.',
    scheduleFreq: 'WEEKLY',
    rateLimitMinutes: 180,
    isEnabled: true,
    lastCheckedAt: '',
    lastStatus: 'READY',
    lastError: '',
    itemsImported: 0,
  },
];

const BASELINE_DOSSIERS: Array<
  Omit<
    HcmDossierRecord,
    'createdBy' | 'updatedBy' | 'verifiedBy' | 'approvedBy' | 'version' | 'missingFields' | 'createdAt' | 'updatedAt'
  >
> = [
  {
    id: 'dos_ev_1911',
    title: 'Nguyễn Tất Thành rời Bến Nhà Rồng ra đi tìm đường cứu nước (05/6/1911)',
    dossierType: 'EVENT',
    categoryIds: ['cat_bio', 'cat_world'],
    topicId: 'top_niên_thieu',
    tags: ['Bến Nhà Rồng', '1911', 'Văn Ba', 'Tìm đường cứu nước'],
    audiences: ['Tham quan phổ thông', 'Đoàn viên & Học sinh', 'Cán bộ & Đảng viên'],
    summary: 'Ngày 05/6/1911, từ cảng Nhà Rồng (Sài Gòn), người thanh niên Nguyễn Tất Thành với tên Văn Ba lên tàu Amiral Latouche-Tréville bắt đầu hành trình 30 năm tìm đường cứu nước.',
    content: 'Trước sự bế tắc của các phong trào yêu nước cuối thế kỷ XIX đầu XX, Nguyễn Tất Thành quyết định sang phương Tây xem nước Pháp và các nước làm như thế nào rồi trở về giúp đồng bào. Sự kiện mở đầu chặng đường lịch sử 30 năm bôn ba qua nhiều châu lục để đến với chủ nghĩa Mác – Lênin.',
    timelineDate: '05/06/1911',
    location: 'Bến Nhà Rồng, Sài Gòn',
    imageUrl: '/assets/hcm-space/nha-rong.jpg',
    imageCaption: 'Bảo tàng Hồ Chí Minh — Chi nhánh TP.HCM (Bến Nhà Rồng).',
    sourceName: 'Cổng TTĐT TP.HCM — Cuộc đời, Sự nghiệp Hồ Chí Minh',
    sourceUrl: 'https://hochiminhcity.gov.vn/cuoc-doi-su-nghiep',
    author: 'Ban Nghiên cứu Lịch sử Đảng',
    publisher: 'NXB Chính trị quốc gia Sự thật',
    publishYear: '2011',
    licenseInfo: 'Tư liệu lịch sử chính thống — Công khai phục vụ giáo dục',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_ev_1945',
    title: 'Đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa (02/9/1945)',
    dossierType: 'EVENT',
    categoryIds: ['cat_bio', 'cat_works'],
    topicId: 'top_lap_dang',
    tags: ['02/9/1945', 'Ba Đình', 'Tuyên ngôn Độc lập'],
    audiences: ['Tham quan phổ thông', 'Cán bộ & Đảng viên', 'Nghiên cứu'],
    summary: 'Chiều 02/9/1945 tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tuyên bố sự ra đời của nước Việt Nam mới.',
    content: 'Kế thừa tinh thần bất hủ về quyền con người và khẳng định quyền độc lập tự do của toàn thể dân tộc Việt Nam, Tuyên ngôn Độc lập mở ra kỷ nguyên mới: kỷ nguyên độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
    timelineDate: '02/09/1945',
    location: 'Quảng trường Ba Đình, Hà Nội',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    imageCaption: 'Minh họa tư liệu tuyên truyền độc lập dân tộc.',
    sourceName: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 1–4',
    sourceUrl: 'https://hochiminh.vn',
    author: 'Chủ tịch Hồ Chí Minh',
    publisher: 'NXB Chính trị quốc gia Sự thật',
    publishYear: '2011',
    licenseInfo: 'Văn kiện lịch sử quốc gia',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_work_dichuc',
    title: 'Bản Di chúc thiêng liêng của Chủ tịch Hồ Chí Minh (1965–1969)',
    dossierType: 'WORK',
    categoryIds: ['cat_works', 'cat_ideology'],
    topicId: 'top_toan_tap',
    tags: ['Di chúc', 'Xây dựng Đảng', 'Đạo đức cách mạng'],
    audiences: ['Cán bộ & Đảng viên', 'Nghiên cứu', 'Toàn dân'],
    summary: 'Bảo vật quốc gia được Bác Hồ khởi thảo từ tháng 5/1965 đến tháng 5/1969, căn dặn toàn Đảng giữ gìn đoàn kết, chỉnh đốn Đảng và chăm lo đời sống Nhân dân.',
    content: 'Di chúc nhấn mạnh: "Đầu tiên là công việc đối với con người"; "Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, chí công vô tư"; đồng thời chăm lo thế hệ trẻ vừa hồng vừa chuyên.',
    timelineDate: '1965–1969',
    location: 'Phủ Chủ tịch, Hà Nội',
    imageUrl: '/assets/hcm-space/anh-bac.png',
    imageCaption: 'Chân dung Chủ tịch Hồ Chí Minh — Di sản tư tưởng trường tồn.',
    sourceName: 'Hồ Chí Minh Toàn tập, Tập 15, tr. 621–624',
    sourceUrl: 'https://hochiminh.vn',
    author: 'Chủ tịch Hồ Chí Minh',
    publisher: 'NXB Chính trị quốc gia Sự thật',
    publishYear: '2011',
    licenseInfo: 'Bảo vật quốc gia — Văn kiện Đảng công khai',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_work_danvan',
    title: 'Bài báo "Dân vận" (15/10/1949) — Kim chỉ nam công tác vận động quần chúng',
    dossierType: 'WORK',
    categoryIds: ['cat_works', 'cat_ideology', 'cat_local'],
    topicId: 'top_144',
    tags: ['Dân vận khéo', 'Lấy dân làm gốc', 'X.Y.Z'],
    audiences: ['Cán bộ & Đảng viên', 'Nghiên cứu'],
    summary: 'Công bố trên báo Sự thật ngày 15/10/1949, xác định "Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân" và 6 yêu cầu óc nghĩ, mắt trông, tai nghe, chân đi, miệng nói, tay làm.',
    content: 'Tác phẩm ngắn gọn, súc tích nhưng tổng kết toàn bộ lý luận và phương pháp dân vận của Đảng: Dân vận kém thì việc gì cũng kém, dân vận khéo thì việc gì cũng thành công.',
    timelineDate: '15/10/1949',
    location: 'Chiến khu Việt Bắc',
    imageUrl: '/assets/hcm-space/hoasen.png',
    imageCaption: 'Họa tiết hoa sen thanh cao gắn với phong cách gần dân.',
    sourceName: 'Hồ Chí Minh Toàn tập, Tập 6, tr. 232–234',
    sourceUrl: 'https://hochiminh.vn',
    author: 'X.Y.Z (Chủ tịch Hồ Chí Minh)',
    publisher: 'NXB Chính trị quốc gia Sự thật',
    publishYear: '2011',
    licenseInfo: 'Tác phẩm kinh điển — Phổ biến rộng rãi',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_artifact_tdt',
    title: 'Chuyên đề Bác Hồ & Chủ tịch Tôn Đức Thắng — Tình đồng chí keo sơn Nam – Bắc',
    dossierType: 'PERSON',
    categoryIds: ['cat_exhibit', 'cat_bio'],
    topicId: 'top_nhan_vat',
    tags: ['Tôn Đức Thắng', 'Bảo tàng', 'Đại đoàn kết'],
    audiences: ['Tham quan phổ thông', 'Nghiên cứu', 'Đoàn viên & Học sinh'],
    summary: 'Hồ sơ nhân vật và không gian trưng bày tái hiện tình bạn chiến đấu cao đẹp giữa Chủ tịch Hồ Chí Minh và Chủ tịch Tôn Đức Thắng — người con ưu tú của Nam Bộ.',
    content: 'Trong sự nghiệp giải phóng dân tộc và xây dựng đất nước, Chủ tịch Tôn Đức Thắng là người bạn chiến đấu kiên trung, suốt đời học tập và noi gương cần kiệm liêm chính của Chủ tịch Hồ Chí Minh.',
    timelineDate: '1945–1969',
    location: 'Bảo tàng Tôn Đức Thắng & Miền Nam',
    imageUrl: '/assets/hcm-space/bao-tang-tdt.jpg',
    imageCaption: 'Không gian trưng bày chuyên đề tại Bảo tàng Tôn Đức Thắng.',
    sourceName: 'Cổng TTĐT TP.HCM — Phóng sự Không gian Văn hóa HCM',
    sourceUrl: 'https://hochiminhcity.gov.vn/vi/web/hcm/w/nhung-khong-gian-van-hoa-ho-chi-minh-noi-bat-o-thanh-pho-mang-ten-bac',
    author: 'Bảo tàng Tôn Đức Thắng',
    publisher: 'Cổng TTĐT TP.HCM',
    publishYear: '2026',
    licenseInfo: 'Tư liệu báo chí chính thống',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_artifact_tdm_phuloi',
    title: 'Di tích Nhà tù Phú Lợi & Không gian Văn hóa HCM Phường Thủ Dầu Một',
    dossierType: 'ARTIFACT',
    categoryIds: ['cat_exhibit', 'cat_local'],
    topicId: 'top_tdm_news',
    tags: ['Thủ Dầu Một', 'Nhà tù Phú Lợi', 'Hoa viên Bạch Đằng', 'Di tích'],
    audiences: ['Tham quan phổ thông', 'Cán bộ & Đảng viên', 'Đoàn viên & Học sinh'],
    summary: 'Kết nối giáo dục truyền thống cách mạng địa phương (Nhà tù Phú Lợi, Hoa viên Bạch Đằng) với 26 chi bộ và các khu phố Phường Thủ Dầu Một.',
    content: 'Không gian trưng bày tại phường Thủ Dầu Một kết hợp bảng ảnh mốc lịch sử, di tích cách mạng địa phương, tủ sách điện tử 15 tập Hồ Chí Minh Toàn tập và bảng mã QR để đảng viên, đoàn viên và người dân tra cứu thuận tiện.',
    timelineDate: '1957–Nay',
    location: 'Phường Thủ Dầu Một',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    imageCaption: 'Mô hình Không gian Văn hóa HCM mở tại công viên khu dân cư.',
    sourceName: 'Ban Tuyên giáo & Dân vận Đảng ủy Phường Thủ Dầu Một',
    sourceUrl: 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa',
    author: 'Đảng ủy Phường Thủ Dầu Một',
    publisher: 'Tuyên giáo số Thủ Dầu Một',
    publishYear: '2026',
    licenseInfo: 'Tài sản nội bộ Đảng ủy Phường Thủ Dầu Một',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_media_vtv24',
    title: 'Phim tài liệu VTV24: Nguyễn Ái Quốc, Hồ Chí Minh — Hành trình đi tìm hình của Nước',
    dossierType: 'MEDIA',
    categoryIds: ['cat_media', 'cat_bio'],
    topicId: 'top_phim_audio',
    tags: ['VTV24', 'Phim tài liệu', '1911–1941'],
    audiences: ['Tham quan phổ thông', 'Đoàn viên & Học sinh', 'Cán bộ & Đảng viên'],
    summary: 'Phim tài liệu truyền hình do VTV24 sản xuất, tái hiện 30 năm tìm đường cứu nước của Nguyễn Ái Quốc – Hồ Chí Minh.',
    content: 'Phục vụ trình chiếu tại các buổi sinh hoạt chi bộ định kỳ, sinh hoạt đoàn thanh niên và góc trải nghiệm Không gian Văn hóa Hồ Chí Minh trực tuyến.',
    timelineDate: '1911–1941',
    location: 'Việt Nam — Pháp — Anh — Mỹ — Liên Xô',
    imageUrl: '/assets/hcm-space/tieusu1-1911.png',
    imageCaption: 'Tư liệu hành trình 1911 — hochiminhcity.gov.vn.',
    sourceName: 'Đài Truyền hình Việt Nam (VTV24)',
    sourceUrl: 'https://www.youtube.com/watch?v=Pjpt7aGiY8E',
    author: 'Ban Truyền hình Đối ngoại — VTV24',
    publisher: 'Đài Truyền hình Việt Nam',
    publishYear: '2024',
    licenseInfo: 'Video nhúng công khai chính thức VTV24 (youtube-nocookie)',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
  {
    id: 'dos_research_144',
    title: 'Nghiên cứu Chuyên đề: Thực hành Quy định 144-QĐ/TW tại Đảng bộ Phường Thủ Dầu Một',
    dossierType: 'RESEARCH',
    categoryIds: ['cat_ideology', 'cat_local'],
    topicId: 'top_144',
    tags: ['Quy định 144-QĐ/TW', 'Cần Kiệm Liêm Chính', 'Thủ Dầu Một'],
    audiences: ['Cán bộ & Đảng viên', 'Nghiên cứu'],
    summary: 'Cụ thể hóa 5 chuẩn mực đạo đức cách mạng của Bộ Chính trị vào đánh giá xếp loại chi bộ và chất lượng phục vụ Nhân dân phường Thủ Dầu Một.',
    content: 'Kết hợp 5 tiêu chí Quy định 144-QĐ/TW với Bộ 5 Tiêu chí Không gian Văn hóa HCM (20 mục đánh giá) để đo lường thực chất mức độ chuyển biến nhận thức và hành động nêu gương của cán bộ, đảng viên.',
    timelineDate: '09/05/2024 – Nay',
    location: 'Phường Thủ Dầu Một',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    imageCaption: 'Không gian học tập số 3D & Infographic chuyên đề.',
    sourceName: 'Quy định 144-QĐ/TW của Bộ Chính trị',
    sourceUrl: 'https://dangcongsan.vn',
    author: 'Ban Xây dựng Đảng — Phường Thủ Dầu Một',
    publisher: 'Ban Tuyên giáo & Dân vận',
    publishYear: '2026',
    licenseInfo: 'Văn kiện hướng dẫn công tác Đảng',
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED',
    publishStatus: 'PUBLISHED',
    isAiDraft: false,
    duplicateOfId: '',
  },
];

const INITIAL_TOURS: Array<Omit<HcmTourRecord, 'updatedAt'>> = [
  {
    id: 'tour_pho_thong',
    title: 'Hành trình 1: Hành trình Tìm đường Cứu nước & Độc lập (Dành cho Khách tham quan)',
    audience: 'Tham quan phổ thông',
    description: 'Lộ trình 15 phút qua Bến Nhà Rồng 1911, Tuyên ngôn Độc lập 1945, phim VTV24 và Di tích Thủ Dầu Một.',
    durationLabel: '15 phút · 4 điểm dừng',
    dossierIds: ['dos_ev_1911', 'dos_media_vtv24', 'dos_ev_1945', 'dos_artifact_tdm_phuloi'],
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: 'tour_dang_vien',
    title: 'Hành trình 2: Chuyên đề Xây dựng Đảng & Quy định 144-QĐ/TW (Dành cho Cán bộ, Đảng viên)',
    audience: 'Cán bộ & Đảng viên',
    description: 'Sinh hoạt chuyên đề trọng tâm: Di chúc 1969, Dân vận 1949, Quy định 144 và thực tiễn Thủ Dầu Một.',
    durationLabel: '20 phút · 4 điểm dừng',
    dossierIds: ['dos_work_dichuc', 'dos_work_danvan', 'dos_research_144', 'dos_artifact_tdm_phuloi'],
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: 'tour_doan_vien',
    title: 'Hành trình 3: Tuổi trẻ Học tập & Làm theo Lời Bác (Dành cho Đoàn viên, Học sinh)',
    audience: 'Đoàn viên & Học sinh',
    description: 'Truyền cảm hứng cống hiến từ tuổi trẻ Nguyễn Tất Thành, Tình đồng chí Bác Hồ – Bác Tôn và di tích địa phương.',
    durationLabel: '12 phút · 4 điểm dừng',
    dossierIds: ['dos_ev_1911', 'dos_artifact_tdt', 'dos_media_vtv24', 'dos_artifact_tdm_phuloi'],
    isPublished: true,
    sortOrder: 3,
  },
];

export const computeTitleSimilarity = computeTrigramSimilarity;
const normalizeText = normalizeVietnameseText;

export function computeMissingFields(d: Partial<HcmDossierRecord>): string[] {
  const missing: string[] = [];
  if (!String(d.sourceUrl || '').trim()) missing.push('Thiếu đường dẫn nguồn (URL)');
  if (!String(d.sourceName || '').trim()) missing.push('Thiếu tên nguồn tham chiếu');
  if (!String(d.imageUrl || '').trim()) missing.push('Thiếu hình ảnh minh họa');
  if (!String(d.summary || '').trim() || String(d.summary || '').trim().length < 25) {
    missing.push('Thiếu tóm tắt đạt chuẩn');
  }
  if (!String(d.author || '').trim() && !String(d.publisher || '').trim()) {
    missing.push('Thiếu tác giả / đơn vị xuất bản');
  }
  if (!String(d.licenseInfo || '').trim()) missing.push('Thiếu thông tin quyền sử dụng');
  if (d.verificationStatus !== 'VERIFIED') missing.push('Cần kiểm chứng nội dung');
  return missing;
}

function rowToDossier(row: Record<string, any>): HcmDossierRecord {
  const dossier: HcmDossierRecord = {
    id: String(row.id),
    title: String(row.title || ''),
    dossierType: (row.dossier_type || 'RESEARCH') as HcmDossierType,
    categoryIds: safeJsonParse<string[]>(row.category_ids_json, []),
    topicId: String(row.topic_id || ''),
    tags: safeJsonParse<string[]>(row.tags_json, []),
    audiences: safeJsonParse<string[]>(row.audiences_json, []),
    summary: String(row.summary || ''),
    content: String(row.content || ''),
    timelineDate: String(row.timeline_date || ''),
    location: String(row.location || ''),
    imageUrl: String(row.image_url || ''),
    imageCaption: String(row.image_caption || ''),
    sourceName: String(row.source_name || ''),
    sourceUrl: String(row.source_url || ''),
    author: String(row.author || ''),
    publisher: String(row.publisher || ''),
    publishYear: String(row.publish_year || ''),
    licenseInfo: String(row.license_info || ''),
    collectedAt: String(row.collected_at || ''),
    verifiedAt: String(row.verified_at || ''),
    verificationStatus: (row.verification_status || 'NEEDS_VERIFICATION') as HcmVerificationStatus,
    publishStatus: (row.publish_status || 'DRAFT') as HcmPublishStatus,
    createdBy: String(row.created_by || ''),
    updatedBy: String(row.updated_by || ''),
    verifiedBy: String(row.verified_by || ''),
    approvedBy: String(row.approved_by || ''),
    version: Number(row.version || 1),
    isAiDraft: Boolean(row.is_ai_draft),
    duplicateOfId: String(row.duplicate_of_id || ''),
    missingFields: safeJsonParse<string[]>(row.missing_fields_json, []),
    createdAt: String(row.created_at || ''),
    updatedAt: String(row.updated_at || ''),
  };
  return { ...dossier, missingFields: computeMissingFields(dossier) };
}

function writeVersionAndLog(
  db: any,
  dossier: HcmDossierRecord,
  action: string,
  changeNote: string,
  actor: HcmActor
): void {
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO hcm_dossier_versions (id, dossier_id, version_num, snapshot_json, change_note, actor_uid, actor_name, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    `ver_${crypto.randomUUID().slice(0, 10)}`,
    dossier.id,
    dossier.version,
    JSON.stringify(dossier),
    changeNote,
    actor.uid,
    actor.name,
    now
  );

  db.prepare(
    `INSERT INTO hcm_editorial_logs (id, dossier_id, action, actor_uid, actor_name, actor_role, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    `edlog_${crypto.randomUUID().slice(0, 10)}`,
    dossier.id,
    action,
    actor.uid,
    actor.name,
    actor.role,
    changeNote,
    now
  );
}

function insertDossierRow(db: any, d: HcmDossierRecord): void {
  const missing = computeMissingFields(d);
  db.prepare(
    `INSERT OR REPLACE INTO hcm_dossiers (
      id, title, dossier_type, category_ids_json, topic_id, tags_json, audiences_json,
      summary, content, timeline_date, location, image_url, image_caption,
      source_name, source_url, author, publisher, publish_year, license_info,
      collected_at, verified_at, verification_status, publish_status,
      created_by, updated_by, verified_by, approved_by, version, is_ai_draft, duplicate_of_id,
      missing_fields_json, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    d.id,
    d.title,
    d.dossierType,
    JSON.stringify(d.categoryIds),
    d.topicId,
    JSON.stringify(d.tags),
    JSON.stringify(d.audiences),
    d.summary,
    d.content,
    d.timelineDate,
    d.location,
    d.imageUrl,
    d.imageCaption,
    d.sourceName,
    d.sourceUrl,
    d.author,
    d.publisher,
    d.publishYear,
    d.licenseInfo,
    d.collectedAt,
    d.verifiedAt,
    d.verificationStatus,
    d.publishStatus,
    d.createdBy,
    d.updatedBy,
    d.verifiedBy,
    d.approvedBy,
    d.version,
    d.isAiDraft ? 1 : 0,
    d.duplicateOfId,
    JSON.stringify(missing),
    d.createdAt,
    d.updatedAt
  );
}

/** Khởi tạo & di trú an toàn dữ liệu 3 cấp (không xóa dữ liệu cũ, có thể rollback) */
export function ensureHcmV2Initialized(dbPath?: string): void {
  const db = getSqliteDb(dbPath);
  const flag = db.prepare('SELECT value FROM workspace_meta WHERE key = ?').get(SEED_META_KEY) as
    | { value: string }
    | undefined;
  if (flag) return;

  withSqliteTransaction(db, () => {
    const again = db.prepare('SELECT value FROM workspace_meta WHERE key = ?').get(SEED_META_KEY);
    if (again) return;

    const now = new Date().toISOString();

    for (const c of INITIAL_CATEGORIES) {
      db.prepare(
        `INSERT OR IGNORE INTO hcm_categories (id, slug, title, description, icon_name, sort_order, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(c.id, c.slug, c.title, c.description, c.iconName, c.sortOrder, c.isActive ? 1 : 0, now, now);
    }

    for (const t of INITIAL_TOPICS) {
      db.prepare(
        `INSERT OR IGNORE INTO hcm_topics (id, category_id, title, audience_tag, era_range, description, sort_order, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(t.id, t.categoryId, t.title, t.audienceTag, t.eraRange, t.description, t.sortOrder, now, now);
    }

    for (const s of INITIAL_SOURCES) {
      db.prepare(
        `INSERT OR IGNORE INTO hcm_sources (id, name, domain, url, fetch_mode, trust_tier, license_note, schedule_freq, rate_limit_minutes, is_enabled, last_checked_at, last_status, last_error, items_imported)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        s.id,
        s.name,
        s.domain,
        s.url,
        s.fetchMode,
        s.trustTier,
        s.licenseNote,
        s.scheduleFreq,
        s.rateLimitMinutes,
        s.isEnabled ? 1 : 0,
        s.lastCheckedAt,
        s.lastStatus,
        s.lastError,
        s.itemsImported
      );
    }

    for (const tour of INITIAL_TOURS) {
      db.prepare(
        `INSERT OR IGNORE INTO hcm_tours (id, title, audience, description, duration_label, dossier_ids_json, is_published, sort_order, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        tour.id,
        tour.title,
        tour.audience,
        tour.description,
        tour.durationLabel,
        JSON.stringify(tour.dossierIds),
        tour.isPublished ? 1 : 0,
        tour.sortOrder,
        now
      );
    }

    const systemActor: HcmActor = { uid: 'system-seed', name: 'Hệ thống Chuẩn hóa Tri thức', role: 'admin' };

    for (const base of BASELINE_DOSSIERS) {
      const record: HcmDossierRecord = {
        ...base,
        createdBy: systemActor.uid,
        updatedBy: systemActor.uid,
        verifiedBy: 'Ban Biên tập Tuyên giáo',
        approvedBy: 'Đảng ủy Phường Thủ Dầu Một',
        version: 1,
        missingFields: computeMissingFields(base),
        createdAt: now,
        updatedAt: now,
      };
      insertDossierRow(db, record);
      writeVersionAndLog(db, record, 'MIGRATE_BASELINE', 'Khởi tạo hồ sơ chuẩn có kiểm chứng nguồn', systemActor);
    }

    // Migrate non-destructively any custom entries from legacy hcm_cultural_entries (if not overlapping baseline)
    const legacyRows = db.prepare('SELECT * FROM hcm_cultural_entries').all() as Array<Record<string, any>>;
    for (const lr of legacyRows) {
      const legacyId = `legacy_${lr.id}`;
      const section = String(lr.section || 'MODEL');
      const dType: HcmDossierType =
        section === 'MILESTONE' ? 'EVENT' : section === 'WORK' ? 'WORK' : section === 'QUOTE' ? 'RESEARCH' : 'LOCAL_ACTIVITY';
      const catId =
        section === 'MILESTONE'
          ? 'cat_bio'
          : section === 'WORK' || section === 'QUOTE'
            ? 'cat_works'
            : 'cat_local';
      const topicId =
        section === 'MILESTONE' ? 'top_lap_dang' : section === 'WORK' ? 'top_toan_tap' : 'top_tdm_news';

      // Check near-duplicate against seeded baselines so we accurately link duplicate_of_id without deleting legacy records
      const existingBase = BASELINE_DOSSIERS.find((b) => computeTitleSimilarity(b.title, String(lr.title || '')) >= 0.72);
      const isQuoteOrNoSummary = !String(lr.summary || '').trim();
      const record: HcmDossierRecord = {
        id: legacyId,
        title: String(lr.title || ''),
        dossierType: dType,
        categoryIds: [catId],
        topicId,
        tags: [section, String(lr.location || 'Thủ Dầu Một')].filter(Boolean),
        audiences: ['Cán bộ & Đảng viên', 'Tham quan phổ thông'],
        summary: String(lr.summary || lr.quote || lr.title || ''),
        content: [lr.summary, lr.quote ? `Trích dẫn: ${lr.quote}` : ''].filter(Boolean).join('\n\n'),
        timelineDate: String(lr.subtitle || ''),
        location: String(lr.location || 'Phường Thủ Dầu Một'),
        imageUrl: String(lr.image_url || ''),
        imageCaption: lr.image_url ? String(lr.title || '') : '',
        sourceName: 'Di trú từ kho HCM Space cơ sở (hcm_cultural_entries)',
        sourceUrl: '',
        author: '',
        publisher: 'Đảng ủy Phường Thủ Dầu Một',
        publishYear: '2026',
        licenseInfo: 'Dữ liệu di trú cần bổ sung nguồn tham chiếu chuẩn',
        collectedAt: String(lr.updated_at || now),
        verifiedAt: '',
        verificationStatus: 'NEEDS_VERIFICATION',
        publishStatus: lr.status === 'DRAFT' ? 'DRAFT' : 'APPROVED',
        createdBy: String(lr.updated_by_uid || 'legacy-import'),
        updatedBy: String(lr.updated_by_uid || 'legacy-import'),
        verifiedBy: '',
        approvedBy: '',
        version: 1,
        isAiDraft: false,
        duplicateOfId: existingBase?.id || '',
        missingFields: [],
        createdAt: String(lr.updated_at || now),
        updatedAt: String(lr.updated_at || now),
      };
      if (isQuoteOrNoSummary && lr.quote) {
        record.summary = String(lr.quote);
      }
      record.missingFields = computeMissingFields(record);
      insertDossierRow(db, record);
      writeVersionAndLog(
        db,
        record,
        'MIGRATE_LEGACY',
        existingBase ? `Di trú từ bảng cũ (phát hiện gần trùng với ${existingBase.id})` : 'Di trú từ bảng cũ — gắn nhãn Cần xác minh nguồn',
        systemActor
      );
    }

    db.prepare(`INSERT OR REPLACE INTO workspace_meta (key, value, updated_at) VALUES (?, ?, ?)`).run(
      SEED_META_KEY,
      '1',
      now
    );
  });
}

/** Rollback toàn bộ bảng V2 mở rộng (bảo toàn 100% hcm_cultural_entries và workspace_meta cũ) */
export function rollbackHcmV2Migration(dbPath?: string): { rolledBack: boolean } {
  const db = getSqliteDb(dbPath);
  withSqliteTransaction(db, () => {
    for (const tbl of [
      'hcm_tours',
      'hcm_editorial_logs',
      'hcm_sync_logs',
      'hcm_sources',
      'hcm_dossier_versions',
      'hcm_dossiers',
      'hcm_topics',
      'hcm_categories',
    ]) {
      db.exec(`DROP TABLE IF EXISTS ${tbl};`);
    }
    db.prepare('DELETE FROM workspace_meta WHERE key = ?').run(SEED_META_KEY);
  });
  return { rolledBack: true };
}

export function listCategories(dbPath?: string): HcmCategoryRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  return (db.prepare('SELECT * FROM hcm_categories ORDER BY sort_order ASC').all() as Array<Record<string, any>>).map(
    (r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      iconName: r.icon_name,
      sortOrder: Number(r.sort_order),
      isActive: Boolean(r.is_active),
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    })
  );
}

export function listTopics(dbPath?: string): HcmTopicRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  return (db.prepare('SELECT * FROM hcm_topics ORDER BY sort_order ASC').all() as Array<Record<string, any>>).map((r) => ({
    id: r.id,
    categoryId: r.category_id,
    title: r.title,
    audienceTag: r.audience_tag,
    eraRange: r.era_range,
    description: r.description,
    sortOrder: Number(r.sort_order),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function listTours(dbPath?: string): HcmTourRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  return (db.prepare('SELECT * FROM hcm_tours ORDER BY sort_order ASC').all() as Array<Record<string, any>>).map((r) => ({
    id: r.id,
    title: r.title,
    audience: r.audience,
    description: r.description,
    durationLabel: r.duration_label,
    dossierIds: safeJsonParse<string[]>(r.dossier_ids_json, []),
    isPublished: Boolean(r.is_published),
    sortOrder: Number(r.sort_order),
    updatedAt: r.updated_at,
  }));
}

export function listDossiers(
  filters: {
    search?: string;
    categoryId?: string;
    topicId?: string;
    dossierType?: string;
    audience?: string;
    verificationStatus?: string;
    publishStatus?: string;
    onlyAiDrafts?: boolean;
    onlyMissingSource?: boolean;
    onlyDuplicates?: boolean;
  } = {},
  dbPath?: string
): HcmDossierRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const rows = (db.prepare('SELECT * FROM hcm_dossiers ORDER BY updated_at DESC').all() as Array<Record<string, any>>).map(
    rowToDossier
  );
  const q = normalizeText(filters.search || '');
  return rows.filter((d) => {
    if (filters.categoryId && filters.categoryId !== 'ALL' && !d.categoryIds.includes(filters.categoryId)) return false;
    if (filters.topicId && filters.topicId !== 'ALL' && d.topicId !== filters.topicId) return false;
    if (filters.dossierType && filters.dossierType !== 'ALL' && d.dossierType !== filters.dossierType) return false;
    if (filters.audience && filters.audience !== 'ALL' && !d.audiences.includes(filters.audience)) return false;
    if (filters.verificationStatus && filters.verificationStatus !== 'ALL' && d.verificationStatus !== filters.verificationStatus) {
      return false;
    }
    if (filters.publishStatus && filters.publishStatus !== 'ALL' && d.publishStatus !== filters.publishStatus) {
      return false;
    }
    if (filters.onlyAiDrafts && !d.isAiDraft) return false;
    if (filters.onlyMissingSource && d.missingFields.length === 0) return false;
    if (filters.onlyDuplicates && !d.duplicateOfId) return false;
    if (q) {
      const hay = normalizeText(`${d.title} ${d.summary} ${d.content} ${d.tags.join(' ')} ${d.location} ${d.sourceName}`);
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getDossierWithVersions(
  dossierId: string,
  dbPath?: string
): { dossier: HcmDossierRecord; versions: HcmDossierVersionRecord[] } | null {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const row = db.prepare('SELECT * FROM hcm_dossiers WHERE id = ?').get(dossierId) as Record<string, any> | undefined;
  if (!row) return null;
  const versions = (
    db
      .prepare('SELECT * FROM hcm_dossier_versions WHERE dossier_id = ? ORDER BY version_num DESC')
      .all(dossierId) as Array<Record<string, any>>
  ).map((v) => ({
    id: String(v.id),
    dossierId: String(v.dossier_id),
    versionNum: Number(v.version_num),
    snapshot: safeJsonParse<HcmDossierRecord>(v.snapshot_json, rowToDossier(row)),
    changeNote: String(v.change_note || ''),
    actorUid: String(v.actor_uid || ''),
    actorName: String(v.actor_name || ''),
    createdAt: String(v.created_at || ''),
  }));
  return { dossier: rowToDossier(row), versions };
}

export function createOrUpdateDossier(
  input: Partial<HcmDossierRecord> & { id?: string; changeNote?: string },
  actor: HcmActor,
  dbPath?: string
): HcmDossierRecord {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const now = new Date().toISOString();
  const existingRow = input.id
    ? (db.prepare('SELECT * FROM hcm_dossiers WHERE id = ?').get(input.id) as Record<string, any> | undefined)
    : undefined;

  const isApprover = HCM_APPROVER_ROLES.has(actor.role.toLowerCase());

  return withSqliteTransaction(db, () => {
    if (existingRow) {
      const prev = rowToDossier(existingRow);
      // Staff/Member cannot directly elevate to VERIFIED or PUBLISHED through patch
      const nextVerification = isApprover
        ? (input.verificationStatus ?? prev.verificationStatus)
        : prev.verificationStatus === 'VERIFIED' && (input.title !== prev.title || input.content !== prev.content)
          ? 'NEEDS_VERIFICATION'
          : prev.verificationStatus;
      const nextPublish = isApprover
        ? (input.publishStatus ?? prev.publishStatus)
        : prev.publishStatus === 'PUBLISHED'
          ? 'PENDING_REVIEW'
          : prev.publishStatus;

      const updated: HcmDossierRecord = {
        ...prev,
        title: String(input.title ?? prev.title).trim().slice(0, 320),
        dossierType: (input.dossierType ?? prev.dossierType) as HcmDossierType,
        categoryIds: Array.isArray(input.categoryIds) ? input.categoryIds : prev.categoryIds,
        topicId: String(input.topicId ?? prev.topicId),
        tags: Array.isArray(input.tags) ? input.tags : prev.tags,
        audiences: Array.isArray(input.audiences) ? input.audiences : prev.audiences,
        summary: String(input.summary ?? prev.summary).trim().slice(0, 2000),
        content: String(input.content ?? prev.content).trim().slice(0, 12000),
        timelineDate: String(input.timelineDate ?? prev.timelineDate).trim().slice(0, 100),
        location: String(input.location ?? prev.location).trim().slice(0, 200),
        imageUrl: String(input.imageUrl ?? prev.imageUrl).trim().slice(0, 300000),
        imageCaption: String(input.imageCaption ?? prev.imageCaption).trim().slice(0, 300),
        sourceName: String(input.sourceName ?? prev.sourceName).trim().slice(0, 240),
        sourceUrl: String(input.sourceUrl ?? prev.sourceUrl).trim().slice(0, 500),
        author: String(input.author ?? prev.author).trim().slice(0, 200),
        publisher: String(input.publisher ?? prev.publisher).trim().slice(0, 200),
        publishYear: String(input.publishYear ?? prev.publishYear).trim().slice(0, 40),
        licenseInfo: String(input.licenseInfo ?? prev.licenseInfo).trim().slice(0, 240),
        verificationStatus: nextVerification,
        publishStatus: nextPublish,
        updatedBy: actor.uid,
        version: prev.version + 1,
        updatedAt: now,
      };
      updated.missingFields = computeMissingFields(updated);
      insertDossierRow(db, updated);
      writeVersionAndLog(
        db,
        updated,
        'UPDATE',
        input.changeNote || `Cập nhật hồ sơ (phiên bản v${updated.version})`,
        actor
      );
      return updated;
    }

    const title = String(input.title || '').trim().slice(0, 320);
    if (!title) throw new Error('Cần nhập tiêu đề hồ sơ.');

    const existingList = listDossiers({}, dbPath);
    const dup = existingList.find((ex) => computeTitleSimilarity(ex.title, title) >= 0.78);

    const created: HcmDossierRecord = {
      id: `dos_${crypto.randomUUID().slice(0, 10)}`,
      title,
      dossierType: (input.dossierType || 'RESEARCH') as HcmDossierType,
      categoryIds: Array.isArray(input.categoryIds) && input.categoryIds.length > 0 ? input.categoryIds : ['cat_local'],
      topicId: String(input.topicId || 'top_tdm_news'),
      tags: Array.isArray(input.tags) ? input.tags : [],
      audiences: Array.isArray(input.audiences) && input.audiences.length > 0 ? input.audiences : ['Cán bộ & Đảng viên'],
      summary: String(input.summary || '').trim().slice(0, 2000),
      content: String(input.content || '').trim().slice(0, 12000),
      timelineDate: String(input.timelineDate || '').trim().slice(0, 100),
      location: String(input.location || '').trim().slice(0, 200),
      imageUrl: String(input.imageUrl || '').trim().slice(0, 300000),
      imageCaption: String(input.imageCaption || '').trim().slice(0, 300),
      sourceName: String(input.sourceName || '').trim().slice(0, 240),
      sourceUrl: String(input.sourceUrl || '').trim().slice(0, 500),
      author: String(input.author || '').trim().slice(0, 200),
      publisher: String(input.publisher || '').trim().slice(0, 200),
      publishYear: String(input.publishYear || '').trim().slice(0, 40),
      licenseInfo: String(input.licenseInfo || '').trim().slice(0, 240),
      collectedAt: now,
      verifiedAt: '',
      verificationStatus: 'NEEDS_VERIFICATION',
      publishStatus: 'DRAFT',
      createdBy: actor.uid,
      updatedBy: actor.uid,
      verifiedBy: '',
      approvedBy: '',
      version: 1,
      isAiDraft: Boolean(input.isAiDraft),
      duplicateOfId: dup?.id || '',
      missingFields: [],
      createdAt: now,
      updatedAt: now,
    };
    created.missingFields = computeMissingFields(created);
    insertDossierRow(db, created);
    writeVersionAndLog(db, created, 'CREATE_DRAFT', input.changeNote || 'Khởi tạo hồ sơ nháp mới', actor);
    return created;
  });
}

export function transitionDossierWorkflow(
  dossierId: string,
  action: 'SUBMIT_REVIEW' | 'VERIFY' | 'FLAG_NEEDS_VERIFICATION' | 'REJECT' | 'PUBLISH' | 'ARCHIVE',
  actor: HcmActor,
  note = '',
  dbPath?: string
): HcmDossierRecord {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const row = db.prepare('SELECT * FROM hcm_dossiers WHERE id = ?').get(dossierId) as Record<string, any> | undefined;
  if (!row) throw new Error('Không tìm thấy hồ sơ.');
  const prev = rowToDossier(row);
  const role = actor.role.toLowerCase();
  const isVerifier = HCM_VERIFIER_ROLES.has(role);
  const isApprover = HCM_APPROVER_ROLES.has(role);
  const now = new Date().toISOString();

  // Kiểm soát thẩm quyền 4 bước nghiêm ngặt:
  // 1. SUBMIT_REVIEW (Bản nháp -> Chờ kiểm chứng): Biên tập viên hoặc cao hơn
  // 2. VERIFY / FLAG_NEEDS_VERIFICATION (Kiểm chứng nguồn): Người kiểm chứng (verifier) hoặc cấp duyệt
  // 3. PUBLISH / ARCHIVE (Phê duyệt xuất bản / Lưu trữ): CẤP PHÊ DUYỆT (approver / admin) - Người kiểm chứng không được tự duyệt xuất bản!
  if (action === 'SUBMIT_REVIEW') {
    // Được phép
  } else if (action === 'VERIFY' || action === 'FLAG_NEEDS_VERIFICATION' || action === 'REJECT') {
    if (!isVerifier) {
      throw new Error('Vai trò của bạn không có thẩm quyền kiểm chứng tư liệu. Thao tác yêu cầu vai trò Người kiểm chứng (verifier) trở lên.');
    }
  } else if (action === 'PUBLISH' || action === 'ARCHIVE') {
    if (!isApprover) {
      throw new Error('Vai trò của bạn không có thẩm quyền phê duyệt / xuất bản. Thao tác xuất bản yêu cầu cấp Phê duyệt (approver / admin).');
    }
  }

  let nextVerification = prev.verificationStatus;
  let nextPublish = prev.publishStatus;
  let verifiedAt = prev.verifiedAt;
  let verifiedBy = prev.verifiedBy;
  let approvedBy = prev.approvedBy;

  switch (action) {
    case 'SUBMIT_REVIEW':
      nextPublish = 'PENDING_REVIEW';
      break;
    case 'VERIFY':
      if (!prev.sourceName && !prev.sourceUrl) {
        throw new Error('Không thể đánh dấu ĐÃ KIỂM CHỨNG khi hồ sơ chưa có nguồn tham khảo.');
      }
      nextVerification = 'VERIFIED';
      nextPublish = prev.publishStatus === 'DRAFT' || prev.publishStatus === 'PENDING_REVIEW' ? 'APPROVED' : prev.publishStatus;
      verifiedAt = now;
      verifiedBy = actor.name;
      break;
    case 'FLAG_NEEDS_VERIFICATION':
      nextVerification = 'NEEDS_VERIFICATION';
      if (nextPublish === 'PUBLISHED') nextPublish = 'PENDING_REVIEW';
      break;
    case 'REJECT':
      nextVerification = 'REJECTED';
      nextPublish = 'DRAFT';
      break;
    case 'PUBLISH':
      if (prev.verificationStatus !== 'VERIFIED') {
        throw new Error('Nguyên tắc kiểm duyệt: Chỉ được xuất bản hồ sơ ở trạng thái ĐÃ KIỂM CHỨNG.');
      }
      nextPublish = 'PUBLISHED';
      approvedBy = actor.name;
      break;
    case 'ARCHIVE':
      nextPublish = 'ARCHIVED';
      break;
  }

  return withSqliteTransaction(db, () => {
    const next: HcmDossierRecord = {
      ...prev,
      verificationStatus: nextVerification,
      publishStatus: nextPublish,
      verifiedAt,
      verifiedBy,
      approvedBy,
      isAiDraft: action === 'PUBLISH' ? false : prev.isAiDraft,
      updatedBy: actor.uid,
      version: prev.version + 1,
      updatedAt: now,
    };
    next.missingFields = computeMissingFields(next);
    insertDossierRow(db, next);
    writeVersionAndLog(db, next, action, note || `Chuyển trạng thái: ${action}`, actor);
    return next;
  });
}

export function rollbackDossierVersion(
  dossierId: string,
  versionNum: number,
  actor: HcmActor,
  dbPath?: string
): HcmDossierRecord {
  if (!HCM_APPROVER_ROLES.has(actor.role.toLowerCase())) {
    throw new Error('Chỉ Người kiểm chứng / Phê duyệt mới được khôi phục phiên bản.');
  }
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const currentRow = db.prepare('SELECT * FROM hcm_dossiers WHERE id = ?').get(dossierId) as Record<string, any> | undefined;
  const verRow = db
    .prepare('SELECT * FROM hcm_dossier_versions WHERE dossier_id = ? AND version_num = ?')
    .get(dossierId, versionNum) as Record<string, any> | undefined;
  if (!currentRow || !verRow) throw new Error('Không tìm thấy phiên bản cần khôi phục.');

  const current = rowToDossier(currentRow);
  const snap = safeJsonParse<HcmDossierRecord>(verRow.snapshot_json, current);
  const now = new Date().toISOString();

  return withSqliteTransaction(db, () => {
    const restored: HcmDossierRecord = {
      ...snap,
      id: current.id,
      version: current.version + 1,
      updatedBy: actor.uid,
      updatedAt: now,
    };
    restored.missingFields = computeMissingFields(restored);
    insertDossierRow(db, restored);
    writeVersionAndLog(db, restored, 'ROLLBACK', `Khôi phục về phiên bản v${versionNum}`, actor);
    return restored;
  });
}

export function listSources(dbPath?: string): HcmSourceRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  return (db.prepare('SELECT * FROM hcm_sources ORDER BY id ASC').all() as Array<Record<string, any>>).map((r) => ({
    id: r.id,
    name: r.name,
    domain: r.domain,
    url: r.url,
    fetchMode: r.fetch_mode,
    trustTier: r.trust_tier,
    licenseNote: r.license_note,
    scheduleFreq: r.schedule_freq,
    rateLimitMinutes: Number(r.rate_limit_minutes),
    isEnabled: Boolean(r.is_enabled),
    lastCheckedAt: r.last_checked_at,
    lastStatus: r.last_status,
    lastError: r.last_error,
    itemsImported: Number(r.items_imported),
  }));
}

export function updateSourceConfig(
  sourceId: string,
  patch: Partial<Pick<HcmSourceRecord, 'scheduleFreq' | 'isEnabled' | 'rateLimitMinutes'>>,
  dbPath?: string
): HcmSourceRecord {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const existing = listSources(dbPath).find((s) => s.id === sourceId);
  if (!existing) throw new Error('Không tìm thấy nguồn dữ liệu.');
  const nextFreq = patch.scheduleFreq ?? existing.scheduleFreq;
  const nextEnabled = patch.isEnabled ?? existing.isEnabled;
  const nextLimit = Number.isFinite(Number(patch.rateLimitMinutes))
    ? Math.max(5, Math.min(1440, Number(patch.rateLimitMinutes)))
    : existing.rateLimitMinutes;

  db.prepare(`UPDATE hcm_sources SET schedule_freq = ?, is_enabled = ?, rate_limit_minutes = ? WHERE id = ?`).run(
    nextFreq,
    nextEnabled ? 1 : 0,
    nextLimit,
    sourceId
  );
  return listSources(dbPath).find((s) => s.id === sourceId)!;
}

export function listSyncLogs(limit = 30, dbPath?: string): HcmSyncLogRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  return (db.prepare('SELECT * FROM hcm_sync_logs ORDER BY started_at DESC LIMIT ?').all(limit) as Array<Record<string, any>>).map(
    (r) => ({
      id: r.id,
      sourceId: r.source_id,
      sourceName: r.source_name,
      startedAt: r.started_at,
      finishedAt: r.finished_at,
      status: r.status,
      fetchedCount: Number(r.fetched_count),
      draftsCreated: Number(r.drafts_created),
      duplicatesSkipped: Number(r.duplicates_skipped),
      message: r.message,
    })
  );
}

export function listEditorialLogs(limit = 40, dbPath?: string): HcmEditorialLogRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  return (
    db.prepare('SELECT * FROM hcm_editorial_logs ORDER BY created_at DESC LIMIT ?').all(limit) as Array<Record<string, any>>
  ).map((r) => ({
    id: r.id,
    dossierId: r.dossier_id,
    action: r.action,
    actorUid: r.actor_uid,
    actorName: r.actor_name,
    actorRole: r.actor_role,
    note: r.note,
    createdAt: r.created_at,
  }));
}

/** Chạy cơ chế thu thập thông minh -> kiểm tra trùng -> tạo hồ sơ NHÁP chờ duyệt */
export async function syncOfficialSourceToDrafts(
  sourceId: string,
  actor: HcmActor,
  forceBypassRateLimit = false,
  dbPath?: string,
  customHarvester?: (source: HcmSourceRecord) => Promise<OfficialHarvestItem[]>
): Promise<HcmSyncLogRecord> {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  const source = listSources(dbPath).find((s) => s.id === sourceId);
  if (!source) throw new Error('Nguồn chính thống không tồn tại.');

  const startedAt = new Date().toISOString();
  if (!source.isEnabled) {
    throw new Error(`Nguồn "${source.name}" hiện đang tạm tắt.`);
  }

  if (!forceBypassRateLimit && source.lastCheckedAt) {
    const elapsedMin = (Date.now() - Date.parse(source.lastCheckedAt)) / 60000;
    if (Number.isFinite(elapsedMin) && elapsedMin < source.rateLimitMinutes) {
      const log: HcmSyncLogRecord = {
        id: `sync_${crypto.randomUUID().slice(0, 10)}`,
        sourceId: source.id,
        sourceName: source.name,
        startedAt,
        finishedAt: new Date().toISOString(),
        status: 'SKIPPED',
        fetchedCount: 0,
        draftsCreated: 0,
        duplicatesSkipped: 0,
        message: `Áp dụng giới hạn tần suất (${source.rateLimitMinutes} phút). Còn ${Math.ceil(source.rateLimitMinutes - elapsedMin)} phút.`,
      };
      db.prepare(
        `INSERT INTO hcm_sync_logs (id, source_id, source_name, started_at, finished_at, status, fetched_count, drafts_created, duplicates_skipped, message)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(log.id, log.sourceId, log.sourceName, log.startedAt, log.finishedAt, log.status, 0, 0, 0, log.message);
      return log;
    }
  }

  try {
    const harvested = customHarvester ? await customHarvester(source) : await harvestOfficialSource(source);
    const existing = listDossiers({}, dbPath);
    let draftsCreated = 0;
    let duplicatesSkipped = 0;

    withSqliteTransaction(db, () => {
      const now = new Date().toISOString();
      for (const item of harvested) {
        const dup = existing.find(
          (ex) =>
            (ex.sourceUrl && ex.sourceUrl === item.sourceUrl) ||
            computeTitleSimilarity(ex.title, item.title) >= 0.72
        );
        if (dup) {
          duplicatesSkipped += 1;
          continue;
        }

        const draft: HcmDossierRecord = {
          id: `dos_ai_${crypto.randomUUID().slice(0, 10)}`,
          title: item.title,
          dossierType: item.dossierType,
          categoryIds: item.dossierType === 'WORK' ? ['cat_works'] : item.dossierType === 'ARTIFACT' ? ['cat_exhibit'] : ['cat_local'],
          topicId: item.dossierType === 'WORK' ? 'top_toan_tap' : 'top_tdm_news',
          tags: [source.domain, 'AI-ThuThap', item.dossierType],
          audiences: ['Cán bộ & Đảng viên', 'Tham quan phổ thông'],
          summary: item.summary,
          content: `${item.summary}\n\n[Bản nháp do hệ thống tự động thu thập từ nguồn chính thống ${source.name}. Cần kiểm chứng đầy đủ trước khi xuất bản.]`,
          timelineDate: item.publishedAt,
          location: 'Nguồn chính thống quốc gia',
          imageUrl: item.imageUrl,
          imageCaption: item.imageUrl ? item.title : '',
          sourceName: item.sourceName,
          sourceUrl: item.sourceUrl,
          author: '',
          publisher: item.publisher,
          publishYear: String(item.publishedAt || '').match(/\d{4}/)?.[0] || String(new Date().getFullYear()),
          licenseInfo: item.licenseInfo,
          collectedAt: now,
          verifiedAt: '',
          verificationStatus: 'NEEDS_VERIFICATION',
          publishStatus: 'DRAFT',
          createdBy: 'ai-collector',
          updatedBy: actor.uid,
          verifiedBy: '',
          approvedBy: '',
          version: 1,
          isAiDraft: true,
          duplicateOfId: '',
          missingFields: [],
          createdAt: now,
          updatedAt: now,
        };
        draft.missingFields = computeMissingFields(draft);
        insertDossierRow(db, draft);
        writeVersionAndLog(db, draft, 'AI_DRAFT_COLLECTED', `Thu thập nháp từ ${source.domain}`, actor);
        existing.push(draft);
        draftsCreated += 1;
      }

      db.prepare(
        `UPDATE hcm_sources SET last_checked_at = ?, last_status = 'OK', last_error = '', items_imported = items_imported + ? WHERE id = ?`
      ).run(now, draftsCreated, source.id);
    });

    const finishedAt = new Date().toISOString();
    const log: HcmSyncLogRecord = {
      id: `sync_${crypto.randomUUID().slice(0, 10)}`,
      sourceId: source.id,
      sourceName: source.name,
      startedAt,
      finishedAt,
      status: 'SUCCESS',
      fetchedCount: harvested.length,
      draftsCreated,
      duplicatesSkipped,
      message: `Đã thu thập ${harvested.length} mục: tạo ${draftsCreated} hồ sơ nháp chờ duyệt, bỏ qua ${duplicatesSkipped} mục trùng.`,
    };
    db.prepare(
      `INSERT INTO hcm_sync_logs (id, source_id, source_name, started_at, finished_at, status, fetched_count, drafts_created, duplicates_skipped, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      log.id,
      log.sourceId,
      log.sourceName,
      log.startedAt,
      log.finishedAt,
      log.status,
      log.fetchedCount,
      log.draftsCreated,
      log.duplicatesSkipped,
      log.message
    );
    return log;
  } catch (err: any) {
    const finishedAt = new Date().toISOString();
    const msg = err?.message || 'Lỗi kết nối nguồn';
    db.prepare(`UPDATE hcm_sources SET last_checked_at = ?, last_status = 'ERROR', last_error = ? WHERE id = ?`).run(
      finishedAt,
      msg,
      source.id
    );
    const errLog: HcmSyncLogRecord = {
      id: `sync_${crypto.randomUUID().slice(0, 10)}`,
      sourceId: source.id,
      sourceName: source.name,
      startedAt,
      finishedAt,
      status: 'ERROR',
      fetchedCount: 0,
      draftsCreated: 0,
      duplicatesSkipped: 0,
      message: msg,
    };
    db.prepare(
      `INSERT INTO hcm_sync_logs (id, source_id, source_name, started_at, finished_at, status, fetched_count, drafts_created, duplicates_skipped, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(errLog.id, errLog.sourceId, errLog.sourceName, errLog.startedAt, errLog.finishedAt, errLog.status, 0, 0, 0, msg);
    return errLog;
  }
}

/** Kiểm toán toàn bộ hồ sơ hiện có: thống kê, phát hiện thiếu nguồn/trùng lặp */
export function runInventoryAudit(dbPath?: string): {
  totalDossiers: number;
  byPublishStatus: Record<string, number>;
  byVerificationStatus: Record<string, number>;
  byType: Record<string, number>;
  missingSourceCount: number;
  aiDraftCount: number;
  duplicateCount: number;
  duplicatePairs: Array<{ dossierId: string; title: string; duplicateOfId: string; targetTitle: string; similarity: number }>;
  incompleteDossiers: Array<{ id: string; title: string; missingFields: string[] }>;
} {
  const all = listDossiers({}, dbPath);
  const byPublishStatus: Record<string, number> = {};
  const byVerificationStatus: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const duplicatePairs: Array<{ dossierId: string; title: string; duplicateOfId: string; targetTitle: string; similarity: number }> = [];
  const incompleteDossiers: Array<{ id: string; title: string; missingFields: string[] }> = [];

  for (let i = 0; i < all.length; i += 1) {
    const d = all[i];
    byPublishStatus[d.publishStatus] = (byPublishStatus[d.publishStatus] || 0) + 1;
    byVerificationStatus[d.verificationStatus] = (byVerificationStatus[d.verificationStatus] || 0) + 1;
    byType[d.dossierType] = (byType[d.dossierType] || 0) + 1;
    if (d.missingFields.length > 0) {
      incompleteDossiers.push({ id: d.id, title: d.title, missingFields: d.missingFields });
    }
    if (d.duplicateOfId) {
      const target = all.find((x) => x.id === d.duplicateOfId);
      if (target) {
        duplicatePairs.push({
          dossierId: d.id,
          title: d.title,
          duplicateOfId: target.id,
          targetTitle: target.title,
          similarity: Number(computeTitleSimilarity(d.title, target.title).toFixed(2)),
        });
      }
    }
  }

  return {
    totalDossiers: all.length,
    byPublishStatus,
    byVerificationStatus,
    byType,
    missingSourceCount: all.filter((d) => !d.sourceUrl).length,
    aiDraftCount: all.filter((d) => d.isAiDraft).length,
    duplicateCount: duplicatePairs.length,
    duplicatePairs,
    incompleteDossiers,
  };
}

/** Đề xuất bản nháp bổ sung thông tin còn thiếu từ nguồn chính thống (không ghi đè hồ sơ đã kiểm chứng) */
export function proposeEnrichmentDraftForDossier(
  dossierId: string,
  actor: HcmActor,
  dbPath?: string
): HcmDossierRecord {
  ensureHcmV2Initialized(dbPath);
  const found = getDossierWithVersions(dossierId, dbPath);
  if (!found) throw new Error('Không tìm thấy hồ sơ.');
  const base = found.dossier;
  const missing = computeMissingFields(base);
  const now = new Date().toISOString();

  // Ghép nguồn gợi ý chuẩn hóa (không bịa URL)
  const suggestedSourceUrl =
    base.sourceUrl ||
    (base.dossierType === 'WORK' || base.dossierType === 'EVENT'
      ? 'https://hochiminh.vn'
      : base.dossierType === 'ARTIFACT'
        ? 'https://baotanghochiminh.vn'
        : 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa');

  const draftId = `dos_enrich_${crypto.randomUUID().slice(0, 8)}`;
  const enrichmentNote = `[ĐỀ XUẤT BỔ SUNG TỰ ĐỘNG CHO HỒ SƠ ${base.id}]\nCác trường còn thiếu được phát hiện: ${missing.join(', ') || 'Không'}.\nĐề nghị biên tập viên kiểm chứng liên kết gốc trước khi hợp nhất và phê duyệt.`;

  const draft: HcmDossierRecord = {
    ...base,
    id: draftId,
    title: `[Bản nháp bổ sung] ${base.title}`.slice(0, 320),
    sourceUrl: suggestedSourceUrl,
    sourceName: base.sourceName || 'Cổng Tư liệu Hồ Chí Minh chính thống (Cần xác minh)',
    licenseInfo: base.licenseInfo || 'CẦN XÁC MINH điều kiện sử dụng khi kiểm duyệt',
    content: base.content ? `${base.content}\n\n${enrichmentNote}` : enrichmentNote,
    verificationStatus: 'NEEDS_VERIFICATION',
    publishStatus: 'DRAFT',
    createdBy: 'ai-enricher',
    updatedBy: actor.uid,
    verifiedBy: '',
    approvedBy: '',
    verifiedAt: '',
    version: 1,
    isAiDraft: true,
    duplicateOfId: base.id,
    missingFields: [],
    createdAt: now,
    updatedAt: now,
  };
  draft.missingFields = computeMissingFields(draft);

  const db = getSqliteDb(dbPath);
  withSqliteTransaction(db, () => {
    insertDossierRow(db, draft);
    writeVersionAndLog(db, draft, 'AI_ENRICH_PROPOSED', `Tạo bản nháp bổ sung trường thiếu cho ${base.id}`, actor);
  });
  return draft;
}

// =========================================================================
// TIẾP NHẬN GÓP Ý & ĐỀ NGHỊ ĐÍNH CHÍNH TỪ NHÂN DÂN / BẠN ĐỌC (CITIZEN CORRECTIONS)
// =========================================================================
export interface HcmCorrectionRecord {
  id: string;
  targetId: string;
  targetTitle: string;
  targetType: string;
  issueType: string;
  description: string;
  evidenceUrl: string;
  contactInfo: string;
  status: 'RECEIVED' | 'VERIFYING' | 'RESOLVED' | 'NEED_MORE_INFO' | 'REJECTED';
  adminNotes: string;
  resolvedAt: string;
  createdAt: string;
  updatedAt: string;
}

export function ensureCorrectionsTable(db: any): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS hcm_corrections (
      id TEXT PRIMARY KEY,
      target_id TEXT NOT NULL,
      target_title TEXT NOT NULL,
      target_type TEXT NOT NULL,
      issue_type TEXT NOT NULL,
      description TEXT NOT NULL,
      evidence_url TEXT,
      contact_info TEXT,
      status TEXT NOT NULL DEFAULT 'RECEIVED',
      admin_notes TEXT,
      resolved_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_corrections_status ON hcm_corrections(status);
  `);
}

export function createCorrectionRequest(
  input: {
    targetId: string;
    targetTitle: string;
    targetType?: string;
    issueType: string;
    description: string;
    evidenceUrl?: string;
    contactInfo?: string;
  },
  dbPath?: string
): HcmCorrectionRecord {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureCorrectionsTable(db);
  const now = new Date().toISOString();
  const id = `cor_${crypto.randomUUID().slice(0, 10)}`;
  const record: HcmCorrectionRecord = {
    id,
    targetId: String(input.targetId || '').trim().slice(0, 100),
    targetTitle: String(input.targetTitle || 'Tư liệu chung').trim().slice(0, 300),
    targetType: String(input.targetType || 'DOSSIER').trim().slice(0, 50),
    issueType: String(input.issueType || 'FACT').trim().slice(0, 50),
    description: String(input.description || '').trim().slice(0, 4000),
    evidenceUrl: String(input.evidenceUrl || '').trim().slice(0, 500),
    contactInfo: String(input.contactInfo || '').trim().slice(0, 200),
    status: 'RECEIVED',
    adminNotes: '',
    resolvedAt: '',
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(`
    INSERT INTO hcm_corrections (
      id, target_id, target_title, target_type, issue_type, description, evidence_url, contact_info, status, admin_notes, resolved_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    record.id,
    record.targetId,
    record.targetTitle,
    record.targetType,
    record.issueType,
    record.description,
    record.evidenceUrl,
    record.contactInfo,
    record.status,
    record.adminNotes,
    record.resolvedAt,
    record.createdAt,
    record.updatedAt
  );

  return record;
}

export function listCorrections(status?: string, dbPath?: string): HcmCorrectionRecord[] {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureCorrectionsTable(db);
  let rows: Array<Record<string, any>>;
  if (status && status !== 'ALL') {
    rows = db.prepare('SELECT * FROM hcm_corrections WHERE status = ? ORDER BY created_at DESC').all(status) as Array<Record<string, any>>;
  } else {
    rows = db.prepare('SELECT * FROM hcm_corrections ORDER BY created_at DESC').all() as Array<Record<string, any>>;
  }
  return rows.map((r) => ({
    id: r.id,
    targetId: r.target_id,
    targetTitle: r.target_title,
    targetType: r.target_type,
    issueType: r.issue_type,
    description: r.description,
    evidenceUrl: r.evidence_url || '',
    contactInfo: r.contact_info || '',
    status: r.status,
    adminNotes: r.admin_notes || '',
    resolvedAt: r.resolved_at || '',
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function updateCorrectionStatus(
  id: string,
  input: { status: 'RECEIVED' | 'VERIFYING' | 'RESOLVED' | 'NEED_MORE_INFO' | 'REJECTED'; adminNotes?: string },
  actor: HcmActor,
  dbPath?: string
): HcmCorrectionRecord {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureCorrectionsTable(db);
  const existing = db.prepare('SELECT * FROM hcm_corrections WHERE id = ?').get(id) as Record<string, any> | undefined;
  if (!existing) throw new Error('Không tìm thấy bản ghi góp ý / đề nghị đính chính.');

  const now = new Date().toISOString();
  const nextNotes = input.adminNotes !== undefined ? String(input.adminNotes).trim().slice(0, 2000) : (existing.admin_notes || '');
  const resolvedAt = (input.status === 'RESOLVED' || input.status === 'REJECTED') ? now : (existing.resolved_at || '');

  db.prepare(`
    UPDATE hcm_corrections
    SET status = ?, admin_notes = ?, resolved_at = ?, updated_at = ?
    WHERE id = ?
  `).run(input.status, nextNotes, resolvedAt, now, id);

  return {
    id: existing.id,
    targetId: existing.target_id,
    targetTitle: existing.target_title,
    targetType: existing.target_type,
    issueType: existing.issue_type,
    description: existing.description,
    evidenceUrl: existing.evidence_url || '',
    contactInfo: existing.contact_info || '',
    status: input.status,
    adminNotes: nextNotes,
    resolvedAt,
    createdAt: existing.created_at,
    updatedAt: now,
  };
}

// =========================================================================
// THỐNG KÊ LƯỢT TRUY CẬP VÀ NGƯỜI DÙNG ĐANG TRỰC TUYẾN (VISITOR & ONLINE STATS)
// =========================================================================
export interface HcmVisitorStats {
  onlineCount: number;
  todayVisits: number;
  thisMonthVisits: number;
  totalVisits: number;
  lastUpdated: string;
}

export function ensureVisitorStatsTable(db: any): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS hcm_visitor_metrics (
      metric_key TEXT PRIMARY KEY,
      metric_value INTEGER NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS hcm_visitor_sessions (
      session_id TEXT PRIMARY KEY,
      ip_address TEXT,
      last_active INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_visitor_sessions_active ON hcm_visitor_sessions(last_active);
  `);

  const now = new Date().toISOString();
  const vnDate = new Date(Date.now() + 7 * 3600000);
  const dateStr = vnDate.toISOString().slice(0, 10);
  const monthStr = dateStr.slice(0, 7);

  // Khởi tạo các giá trị mốc nền tảng (Chuẩn hóa số đếm thực tế)
  db.prepare(`INSERT OR IGNORE INTO hcm_visitor_metrics (metric_key, metric_value, updated_at) VALUES ('total_visits', 1, ?)`).run(now);
  db.prepare(`INSERT OR IGNORE INTO hcm_visitor_metrics (metric_key, metric_value, updated_at) VALUES ('today_visits', 1, ?)`).run(now);
  db.prepare(`INSERT OR IGNORE INTO hcm_visitor_metrics (metric_key, metric_value, updated_at) VALUES ('month_visits', 1, ?)`).run(now);
  db.prepare(`INSERT OR IGNORE INTO hcm_visitor_metrics (metric_key, metric_value, updated_at) VALUES ('last_date_key', ?, ?)`).run(Number(dateStr.replace(/-/g, '')), now);
  db.prepare(`INSERT OR IGNORE INTO hcm_visitor_metrics (metric_key, metric_value, updated_at) VALUES ('last_month_key', ?, ?)`).run(Number(monthStr.replace(/-/g, '')), now);
}

export function recordVisitorPing(
  input: { sessionId?: string; isNewVisit?: boolean; ip?: string },
  dbPath?: string
): HcmVisitorStats {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureVisitorStatsTable(db);

  const now = new Date();
  const nowIso = now.toISOString();
  const nowMs = Date.now();
  const vnDate = new Date(nowMs + 7 * 3600000);
  const dateInt = Number(vnDate.toISOString().slice(0, 10).replace(/-/g, ''));
  const monthInt = Number(vnDate.toISOString().slice(0, 7).replace(/-/g, ''));

  // Kiểm tra đổi ngày / đổi tháng để reset đúng chu kỳ
  const currentDateRow = db.prepare(`SELECT metric_value FROM hcm_visitor_metrics WHERE metric_key = 'last_date_key'`).get() as { metric_value: number } | undefined;
  if (!currentDateRow || currentDateRow.metric_value !== dateInt) {
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = 1, updated_at = ? WHERE metric_key = 'today_visits'`).run(nowIso);
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'last_date_key'`).run(dateInt, nowIso);
  }

  const currentMonthRow = db.prepare(`SELECT metric_value FROM hcm_visitor_metrics WHERE metric_key = 'last_month_key'`).get() as { metric_value: number } | undefined;
  if (!currentMonthRow || currentMonthRow.metric_value !== monthInt) {
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = 1, updated_at = ? WHERE metric_key = 'month_visits'`).run(nowIso);
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'last_month_key'`).run(monthInt, nowIso);
  }

  // Nếu là lượt truy cập mới (phiên mới) -> Tăng bộ đếm
  if (input.isNewVisit) {
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = metric_value + 1, updated_at = ? WHERE metric_key = 'total_visits'`).run(nowIso);
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = metric_value + 1, updated_at = ? WHERE metric_key = 'today_visits'`).run(nowIso);
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = metric_value + 1, updated_at = ? WHERE metric_key = 'month_visits'`).run(nowIso);
  }

  // Cập nhật phiên trực tuyến (Session heartbeat)
  const sessionId = String(input.sessionId || '').trim() || `sess_${nowMs}_${Math.random().toString(36).slice(2, 8)}`;
  db.prepare(`
    INSERT INTO hcm_visitor_sessions (session_id, ip_address, last_active, created_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(session_id) DO UPDATE SET
      last_active = excluded.last_active,
      ip_address = excluded.ip_address
  `).run(sessionId, input.ip || '', nowMs, nowIso);

  // Thu dọn các phiên cũ hơn 24 giờ
  db.prepare(`DELETE FROM hcm_visitor_sessions WHERE last_active < ?`).run(nowMs - 24 * 3600 * 1000);

  return getVisitorStats(dbPath);
}

export function getVisitorStats(dbPath?: string): HcmVisitorStats {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureVisitorStatsTable(db);

  const nowMs = Date.now();
  // Đếm số phiên hoạt động trong 5 phút gần nhất
  const activeSessionsRow = db.prepare(`
    SELECT COUNT(DISTINCT session_id) as active_count
    FROM hcm_visitor_sessions
    WHERE last_active >= ?
  `).get(nowMs - 5 * 60 * 1000) as { active_count: number } | undefined;

  const rawActive = activeSessionsRow?.active_count || 1;
  // Số lượng đang online thực tế: số phiên đang kết nối trong 5 phút qua
  const onlineCount = Math.max(1, rawActive);

  const getMetric = (key: string, fallback: number) => {
    const row = db.prepare(`SELECT metric_value FROM hcm_visitor_metrics WHERE metric_key = ?`).get(key) as { metric_value: number } | undefined;
    return row ? Number(row.metric_value) : fallback;
  };

  const totalVisits = getMetric('total_visits', 1);
  const todayVisits = getMetric('today_visits', 1);
  const thisMonthVisits = getMetric('month_visits', 1);

  return {
    onlineCount,
    todayVisits,
    thisMonthVisits,
    totalVisits,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Đặt lại số liệu thống kê lượt truy cập theo số phiên thực tế
 */
export function resetVisitorStats(dbPath?: string): HcmVisitorStats {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureVisitorStatsTable(db);

  const now = new Date();
  const nowIso = now.toISOString();
  const nowMs = Date.now();
  const vnDate = new Date(nowMs + 7 * 3600000);
  const dateInt = Number(vnDate.toISOString().slice(0, 10).replace(/-/g, ''));
  const monthInt = Number(vnDate.toISOString().slice(0, 7).replace(/-/g, ''));

  const sessionCountRow = db.prepare(`SELECT COUNT(*) as count FROM hcm_visitor_sessions`).get() as { count: number } | undefined;
  const realCount = Math.max(1, sessionCountRow?.count || 1);

  db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'total_visits'`).run(realCount, nowIso);
  db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'today_visits'`).run(realCount, nowIso);
  db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'month_visits'`).run(realCount, nowIso);
  db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'last_date_key'`).run(dateInt, nowIso);
  db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'last_month_key'`).run(monthInt, nowIso);

  return getVisitorStats(dbPath);
}

/**
 * Điều chỉnh mốc số liệu thống kê truy cập chủ động (dành cho quản trị)
 */
export function setVisitorStats(
  input: { todayVisits?: number; thisMonthVisits?: number; totalVisits?: number },
  dbPath?: string
): HcmVisitorStats {
  ensureHcmV2Initialized(dbPath);
  const db = getSqliteDb(dbPath);
  ensureVisitorStatsTable(db);
  const nowIso = new Date().toISOString();

  if (typeof input.totalVisits === 'number' && input.totalVisits >= 0) {
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'total_visits'`).run(input.totalVisits, nowIso);
  }
  if (typeof input.thisMonthVisits === 'number' && input.thisMonthVisits >= 0) {
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'month_visits'`).run(input.thisMonthVisits, nowIso);
  }
  if (typeof input.todayVisits === 'number' && input.todayVisits >= 0) {
    db.prepare(`UPDATE hcm_visitor_metrics SET metric_value = ?, updated_at = ? WHERE metric_key = 'today_visits'`).run(input.todayVisits, nowIso);
  }

  return getVisitorStats(dbPath);
}
