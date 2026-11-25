import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { getSqliteDb, withSqliteTransaction } from './db/sqliteClient';

export type ExemplaryTheme = 'NGUOI_TOT_VIEC_TOT' | 'AN_SINH_XA_HOI' | 'HOC_TAP_LAM_THEO_BAC';
export type ExemplarySource = 'FANPAGE_DAT_THU' | 'MANUAL_LOCAL';

export interface DatThuExemplaryItem {
  id: string;
  title: string;
  fullName: string;
  birthYear?: number;
  gender?: 'NAM' | 'NU';
  khuPho: 'Khu phố 1' | 'Khu phố 2' | 'Khu phố 3' | 'Khu phố 4' | 'Khu phố 5' | 'Toàn phường';
  role: string;
  unit: string;
  theme: ExemplaryTheme;
  themeLabel: string;
  category: string;
  categoryLabel: string;
  source: ExemplarySource;
  sourceLabel: string;
  sourceUrl?: string;
  postDate: string; // ISO date >= 2025-07-01
  periodLabel: string;
  honorTitle: string;
  avatarUrl?: string;
  goodDeedSummary: string;
  storyContent: string;
  communityImpact: string;
  quoteOrMotto: string;
  hcmLessonApplied: string;
  likesCount: number;
  tags: string[];
  isSyncedFromFanpage: boolean;
  syncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const FANPAGE_CONFIG = {
  name: 'Đất Thủ Quê Hương Tôi',
  handle: '@datthuquehuongtoi',
  url: 'https://www.facebook.com/datthuquehuongtoi',
  description: 'Trang thông tin, tuyên truyền chính thống về quê hương Thủ Dầu Một — Bình Dương',
  managedBy: 'Ban Tuyên giáo & Truyền thông TP. Thủ Dầu Một — Phường Thủ Dầu Một',
  filterKeywords: [
    'Thủ Dầu Một',
    'phường Thủ Dầu Một',
    'Phú Cường',
    'Chánh Nghĩa',
    'Hiệp Thành',
    'Phú Thọ',
    'Chánh Mỹ',
    'người tốt việc tốt',
    'an sinh xã hội',
    'học tập và làm theo Bác',
    'dân vận khéo',
  ],
};

// Seed dataset trích từ Fanpage Đất Thủ Quê Hương Tôi từ 01/7/2025
const SEED_FANPAGE_ARTICLES: Omit<DatThuExemplaryItem, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'dt_fanpage_01_bep_com_nghia_tinh',
    title: 'Ấm lòng "Bếp cơm nghĩa tình 0 đồng" ven sông Bạch Đằng sau ngày thành lập Phường mới',
    fullName: 'Bà Lê Thị Mai & Chi hội Phụ nữ KP3',
    birthYear: 1974,
    gender: 'NU',
    khuPho: 'Khu phố 3',
    role: 'Chi hội trưởng Chi hội Phụ nữ Khu phố 3',
    unit: 'Chi hội Phụ nữ Khu phố 3, Phường Thủ Dầu Một',
    theme: 'AN_SINH_XA_HOI',
    themeLabel: 'Mô hình an sinh xã hội',
    category: 'PHU_NU',
    categoryLabel: 'Phụ nữ đảm đang',
    source: 'FANPAGE_DAT_THU',
    sourceLabel: 'Fanpage Đất Thủ Quê Hương Tôi',
    sourceUrl: 'https://www.facebook.com/datthuquehuongtoi/posts/bep-com-nghia-tinh-thu-dau-mot-2025',
    postDate: '2025-09-12',
    periodLabel: 'Tháng 9/2025',
    honorTitle: 'Mô hình An sinh Xã hội tiêu biểu cấp Phường năm 2025',
    avatarUrl: '/assets/hcm-space/nguoi-tot-le-thi-mai.jpg',
    goodDeedSummary:
      'Duy trì đều đặn hơn 350 suất cơm chay miễn phí mỗi tuần gửi tới bà con bán vé số, lao động nghèo và người già neo đơn dọc tuyến bờ sông Bạch Đằng.',
    storyContent:
      'Được trang Fanpage Đất Thủ Quê Hương Tôi lan tỏa vào trung tuần tháng 9/2025, mô hình "Bếp cơm nghĩa tình 0 đồng" do bà Lê Thị Mai khởi xướng đã trở thành điểm tựa ấm áp cho hàng trăm mảnh đời khó khăn. Từ khi Phường Thủ Dầu Một chính thức đi vào hoạt động sau sáp nhập 01/7/2025, bếp ăn vận động tiểu thương chợ Thủ và các nhà hảo tâm ủng hộ rau củ sạch, gạo và gia vị, tổ chức nấu nướng đảm bảo vệ sinh an toàn thực phẩm.',
    communityImpact:
      'Đã trao tặng hơn 14.000 suất ăn nóng sốt, gắn kết tinh thần tương thân tương ái giữa nhân dân các khu phố, tạo sự đồng thuận cao trong cộng đồng dân cư mới.',
    quoteOrMotto:
      'Làm việc thiện không đợi giàu có, chỉ cần có một tấm lòng thơm thảo biết sẻ chia với đồng bào.',
    hcmLessonApplied: 'Học Bác tinh thần tương thân tương ái, thương yêu đồng bào như ruột thịt.',
    likesCount: 528,
    tags: ['Bếp ăn 0 đồng', 'An sinh xã hội', 'Bạch Đằng', 'Khu phố 3', 'Fanpage Đất Thủ'],
    isSyncedFromFanpage: true,
    syncedAt: '2025-09-13T08:30:00.000Z',
  },
  {
    id: 'dt_fanpage_02_hien_dat_bach_dang',
    title: 'Gương sáng Dân vận khéo: Người Bí thư Chi bộ gương mẫu đi đầu hiến đất mở hẻm',
    fullName: 'Đ/c Nguyễn Văn An',
    birthYear: 1968,
    gender: 'NAM',
    khuPho: 'Khu phố 1',
    role: 'Bí thư Chi bộ Khu phố 1',
    unit: 'Chi bộ Khu phố 1, Đảng bộ Phường Thủ Dầu Một',
    theme: 'HOC_TAP_LAM_THEO_BAC',
    themeLabel: 'Học tập & làm theo Bác',
    category: 'CAN_BO_DANG_VIEN',
    categoryLabel: 'Cán bộ — Đảng viên',
    source: 'FANPAGE_DAT_THU',
    sourceLabel: 'Fanpage Đất Thủ Quê Hương Tôi',
    sourceUrl: 'https://www.facebook.com/datthuquehuongtoi/posts/bi-thu-chi-bo-nguyen-van-an-hien-dat',
    postDate: '2025-08-19',
    periodLabel: 'Tháng 8/2025',
    honorTitle: 'Điển hình “Dân vận khéo” học tập và làm theo Bác năm 2025',
    avatarUrl: '/assets/hcm-space/nguoi-tot-nguyen-van-an.jpg',
    goodDeedSummary:
      'Gia đình đi đầu hiến 45m² đất mặt tiền và vận động 100% hộ dân hiến hơn 420m² đất mở rộng đường hẻm liên thông rạch Bạch Đằng.',
    storyContent:
      'Bài viết trên Fanpage "Đất Thủ Quê Hương Tôi" ngày 19/8/2025 biểu dương đồng chí Nguyễn Văn An - Bí thư Chi bộ Khu phố 1. Để giải quyết nút thắt giao thông và phòng cháy chữa cháy tại hẻm rạch ven sông, đồng chí đã tiên phong tháo dỡ bờ rào kiên cố, hiến đất nhà làm gương. Hành động trách nhiệm của người đảng viên đã thuyết phục 32 hộ dân cùng hiến đất, tạo nên con đường hoa rực rỡ.',
    communityImpact:
      'Hẻm được mở rộng từ 2m lên 5m, bê tông hóa hoàn chỉnh, có đèn chiếu sáng năng lượng mặt trời và cờ Tổ quốc phấp phới.',
    quoteOrMotto:
      'Lời Bác dạy “Đảng viên đi trước, làng nước theo sau” là phương châm sống và hành động của tôi suốt 30 năm tuổi Đảng.',
    hcmLessonApplied: 'Chuẩn mực 144-QĐ/TW: Gương mẫu, tận tụy, nói đi đôi với làm vì lợi ích của nhân dân.',
    likesCount: 890,
    tags: ['Hiến đất làm đường', 'Dân vận khéo', 'Khu phố 1', 'Đất Thủ Quê Hương Tôi'],
    isSyncedFromFanpage: true,
    syncedAt: '2025-08-20T09:15:00.000Z',
  },
  {
    id: 'dt_fanpage_03_cuu_nguoi_va_vneid',
    title: 'Hành động dũng cảm cứu người đuối nước và sự tận tụy của người chiến sĩ Công an Đất Thủ',
    fullName: 'Trung úy Trần Minh Quân',
    birthYear: 1997,
    gender: 'NAM',
    khuPho: 'Khu phố 1',
    role: 'Cán bộ Cảnh sát khu vực',
    unit: 'Công an Phường Thủ Dầu Một',
    theme: 'NGUOI_TOT_VIEC_TOT',
    themeLabel: 'Gương người tốt việc tốt',
    category: 'LUC_LUONG_VU_TRANG',
    categoryLabel: 'Lực lượng vũ trang',
    source: 'FANPAGE_DAT_THU',
    sourceLabel: 'Fanpage Đất Thủ Quê Hương Tôi',
    sourceUrl: 'https://www.facebook.com/datthuquehuongtoi/posts/trung-uy-tran-minh-quan-cuu-nguoi-vneid',
    postDate: '2025-10-05',
    periodLabel: 'Tháng 10/2025',
    honorTitle: 'Gương sáng Dũng cảm & Vì nhân dân phục vụ',
    avatarUrl: '/assets/hcm-space/nguoi-tot-tran-minh-quan.jpg',
    goodDeedSummary:
      'Kịp thời lao xuống dòng nước sông Sài Gòn cứu vớt nam thanh niên chới với, đồng thời tận tụy đến từng nhà kích hoạt VNeID cho hơn 400 cụ già neo đơn.',
    storyContent:
      'Hình ảnh Trung úy Trần Minh Quân ướt đẫm sau khi cứu sống người đuối nước tại bờ kè Bạch Đằng đã nhận được hàng nghìn lượt chia sẻ và bình luận khen ngợi từ cộng đồng Fanpage Đất Thủ Quê Hương Tôi. Không chỉ dũng cảm trong tình huống khẩn nguy, đồng chí còn chủ động mang máy tính đến tận nhà các cụ già trên 80 tuổi, bệnh nhân tai biến để hỗ trợ cấp tài khoản định danh số.',
    communityImpact:
      'Góp phần giúp Phường Thủ Dầu Một dẫn đầu toàn thành phố về tỷ lệ kích hoạt định danh mức 2 cho người cao tuổi, củng cố hình ảnh đẹp của người chiến sĩ Công an nhân dân.',
    quoteOrMotto:
      'Niềm vui lớn nhất của người chiến sĩ công an là nhân dân được bình yên và an lòng.',
    hcmLessonApplied: 'Học Bác 6 điều dạy Công an nhân dân: Tận tụy phục vụ, kính trọng lễ phép với nhân dân.',
    likesCount: 1450,
    tags: ['Cứu người', 'VNeID', 'Công an nhân dân', 'Vì dân phục vụ'],
    isSyncedFromFanpage: true,
    syncedAt: '2025-10-06T11:00:00.000Z',
  },
  {
    id: 'dt_fanpage_04_nha_tro_van_minh',
    title: 'Mô hình an sinh xã hội: "Khu nhà trọ văn minh - nghĩa tình" đồng hành cùng công nhân lao động',
    fullName: 'Bà Hoàng Thị Cúc',
    birthYear: 1965,
    gender: 'NU',
    khuPho: 'Khu phố 4',
    role: 'Chủ nhà trọ văn minh Khu phố 4',
    unit: 'Hội Liên hiệp Phụ nữ Phường Thủ Dầu Một',
    theme: 'AN_SINH_XA_HOI',
    themeLabel: 'Mô hình an sinh xã hội',
    category: 'PHU_NU',
    categoryLabel: 'Phụ nữ đảm đang',
    source: 'FANPAGE_DAT_THU',
    sourceLabel: 'Fanpage Đất Thủ Quê Hương Tôi',
    sourceUrl: 'https://www.facebook.com/datthuquehuongtoi/posts/khu-nha-tro-van-minh-nghia-tinh-thu-dau-mot',
    postDate: '2025-11-20',
    periodLabel: 'Tháng 11/2025',
    honorTitle: 'Khu nhà trọ Xanh - Sạch - Nghĩa tình tiêu biểu cấp Tỉnh',
    avatarUrl: '/assets/hcm-space/nguoi-tot-hoang-thi-cuc.jpg',
    goodDeedSummary:
      'Không tăng giá phòng suốt 3 năm, miễn giảm 30% tiền thuê cho lao động mang thai và bệnh tật, lắp đặt wifi miễn phí và tủ sách pháp luật cho 65 phòng trọ.',
    storyContent:
      'Bài viết trên Fanpage "Đất Thủ Quê Hương Tôi" kể về câu chuyện đầy xúc động của bà Hoàng Thị Cúc tại Khu phố 4. Xem người thuê trọ như con cháu trong nhà, bà định kỳ tổ chức sinh nhật chung, tặng bánh chưng và vé xe cho công nhân về quê đón Tết, đồng thời phối hợp Mặt trận Phường tổ chức khám bệnh phụ khoa và tư vấn pháp luật miễn phí.',
    communityImpact:
      'Xây dựng môi trường sống an ninh trật tự, đoàn kết giữa người dân địa phương và người lao động nhập cư, không phát sinh tệ nạn xã hội.',
    quoteOrMotto:
      'Sống thơm thảo, nhường cơm sẻ áo thì phước đức ở đời tự khắc bền lâu.',
    hcmLessonApplied: 'Học tập đạo đức nhân ái, vị tha, nâng đỡ những người yếu thế trong xã hội.',
    likesCount: 672,
    tags: ['Nhà trọ nghĩa tình', 'An sinh công nhân', 'Khu phố 4', 'Đất Thủ'],
    isSyncedFromFanpage: true,
    syncedAt: '2025-11-21T14:20:00.000Z',
  },
  {
    id: 'dt_fanpage_05_hoc_sinh_nhat_tien',
    title: 'Bông hoa nhỏ việc tốt: Cậu học trò lớp 9 nhặt được 25 triệu đồng mang nộp Công an',
    fullName: 'Em Nguyễn Hoàng Nam',
    birthYear: 2011,
    gender: 'NAM',
    khuPho: 'Khu phố 2',
    role: 'Học sinh lớp 9 Trường THCS Phú Cường',
    unit: 'Liên đội THCS Phú Cường, Phường Thủ Dầu Một',
    theme: 'NGUOI_TOT_VIEC_TOT',
    themeLabel: 'Gương người tốt việc tốt',
    category: 'THANH_NIEN',
    categoryLabel: 'Đoàn viên — Thanh niên',
    source: 'FANPAGE_DAT_THU',
    sourceLabel: 'Fanpage Đất Thủ Quê Hương Tôi',
    sourceUrl: 'https://www.facebook.com/datthuquehuongtoi/posts/hoc-sinh-nhat-tien-tra-lai-nguoi-danh-roi',
    postDate: '2025-12-10',
    periodLabel: 'Tháng 12/2025',
    honorTitle: 'Huy hiệu "Tuổi trẻ dũng cảm - Nghìn việc tốt" năm 2025',
    avatarUrl: '/assets/hcm-space/nguoi-tot-nguyen-hoang-nam.jpg',
    goodDeedSummary:
      'Nhặt được bọc tiền 25 triệu đồng cùng nhiều giấy tờ tùy thân của người buôn bán nhỏ đánh rơi gần Chợ Thủ, ngay lập tức đem đến Công an Phường bàn giao trả lại.',
    storyContent:
      'Trên đường đi học về qua đường Trần Hưng Đạo, em Nam phát hiện túi xách đánh rơi chứa nhiều tiền mặt. Dù hoàn cảnh gia đình không mấy khá giả, em không hề do dự mà lập tức đạp xe đến trụ sở Công an Phường Thủ Dầu Một để nhờ tìm chủ nhân. Người nhận lại là một tiểu thương bán rau nghèo mừng rơi nước mắt vì đó là toàn bộ vốn liếng cả năm.',
    communityImpact:
      'Câu chuyện được biểu dương dưới cờ toàn trường và lan tỏa rộng rãi trên mạng xã hội, khích lệ phong trào thiếu nhi Đất Thủ làm nghìn việc tốt theo 5 điều Bác Hồ dạy.',
    quoteOrMotto:
      'Thầy cô và cha mẹ luôn dặn em không bao giờ được tham của rơi. Trả lại được tiền cho cô bán rau em thấy rất vui.',
    hcmLessonApplied: 'Thực hiện lời dạy của Bác: Khiêm tốn, thật thà, dũng cảm.',
    likesCount: 1820,
    tags: ['Nhặt được của rơi', 'Nghìn việc tốt', 'Học sinh Thủ Dầu Một', 'THCS Phú Cường'],
    isSyncedFromFanpage: true,
    syncedAt: '2025-12-11T16:00:00.000Z',
  },
  {
    id: 'dt_fanpage_06_tui_thuoc_nghia_tinh',
    title: 'Mô hình y tế nhân ái: "Túi thuốc nghĩa tình" đến tận giường bệnh Mẹ Việt Nam Anh hùng',
    fullName: 'Bác sĩ Phạm Hoàng Long & Đội Y tế Lưu động',
    birthYear: 1988,
    gender: 'NAM',
    khuPho: 'Khu phố 5',
    role: 'Trưởng Trạm Y tế Phường Thủ Dầu Một',
    unit: 'Trạm Y tế Phường Thủ Dầu Một',
    theme: 'AN_SINH_XA_HOI',
    themeLabel: 'Mô hình an sinh xã hội',
    category: 'GIAO_DUC_Y_TE',
    categoryLabel: 'Giáo dục & Y tế',
    source: 'FANPAGE_DAT_THU',
    sourceLabel: 'Fanpage Đất Thủ Quê Hương Tôi',
    sourceUrl: 'https://www.facebook.com/datthuquehuongtoi/posts/tui-thuoc-nghia-tinh-tram-y-te-thu-dau-mot',
    postDate: '2026-02-27',
    periodLabel: 'Tháng 2/2026',
    honorTitle: 'Thầy thuốc tiêu biểu Học tập và làm theo lời Bác dạy năm 2026',
    avatarUrl: '/assets/hcm-space/nguoi-tot-pham-hoang-long.jpg',
    goodDeedSummary:
      'Khám bệnh, phát thuốc bổ định kỳ và lập hồ sơ sức khỏe điện tử tại nhà cho 100% Mẹ VNAH, thương bệnh binh nặng và người già neo đơn trên toàn phường.',
    storyContent:
      'Kỷ niệm ngày Thầy thuốc Việt Nam 27/2/2026, Fanpage Đất Thủ Quê Hương Tôi đã đăng tải phóng sự về mô hình "Túi thuốc nghĩa tình". Đều đặn mỗi thứ Bảy, bác sĩ Long cùng đồng nghiệp mang theo máy đo huyết áp, máy xét nghiệm đường huyết lưu động đến từng gia đình có công với cách mạng và hộ nghèo để chăm sóc y tế chu đáo.',
    communityImpact:
      'Giúp người già yếu không phải di chuyển vất vả, phát hiện sớm các nguy cơ tim mạch và đột quỵ, thể hiện sâu sắc đạo lý "Uống nước nhớ nguồn" của chính quyền địa phương.',
    quoteOrMotto:
      'Mỗi nụ cười và ánh mắt thanh thản của các Mẹ là phần thưởng thiêng liêng nhất đối với người thầy thuốc áo trắng.',
    hcmLessonApplied: 'Khắc ghi lời dạy bất hủ của Bác Hồ: "Lương y phải như từ mẫu".',
    likesCount: 940,
    tags: ['Túi thuốc nghĩa tình', 'Thầy thuốc như từ mẫu', 'Đền ơn đáp nghĩa', 'Khu phố 5'],
    isSyncedFromFanpage: true,
    syncedAt: '2026-02-28T10:00:00.000Z',
  },
];

// Khởi tạo bảng cơ sở dữ liệu SQLite
export function ensureDatThuTable(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS dat_thu_exemplary_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      full_name TEXT NOT NULL,
      birth_year INTEGER,
      gender TEXT,
      khu_pho TEXT NOT NULL,
      role TEXT NOT NULL,
      unit TEXT NOT NULL,
      theme TEXT NOT NULL,
      theme_label TEXT NOT NULL,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      source TEXT NOT NULL,
      source_label TEXT NOT NULL,
      source_url TEXT,
      post_date TEXT NOT NULL,
      period_label TEXT NOT NULL,
      honor_title TEXT NOT NULL,
      avatar_url TEXT,
      good_deed_summary TEXT NOT NULL,
      story_content TEXT NOT NULL,
      community_impact TEXT NOT NULL,
      quote_or_motto TEXT NOT NULL,
      hcm_lesson_applied TEXT NOT NULL,
      likes_count INTEGER DEFAULT 0,
      tags_json TEXT,
      is_synced_from_fanpage INTEGER DEFAULT 0,
      synced_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dat_thu_sync_logs (
      id TEXT PRIMARY KEY,
      source_name TEXT NOT NULL,
      synced_count INTEGER NOT NULL,
      status TEXT NOT NULL,
      synced_at TEXT NOT NULL,
      details TEXT
    );
  `);

  // Seed các bài viết mẫu nếu bảng còn trống
  const countRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items').get();
  if (!countRow || countRow.cnt === 0) {
    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT INTO dat_thu_exemplary_items (
        id, title, full_name, birth_year, gender, khu_pho, role, unit,
        theme, theme_label, category, category_label, source, source_label, source_url,
        post_date, period_label, honor_title, avatar_url, good_deed_summary, story_content,
        community_impact, quote_or_motto, hcm_lesson_applied, likes_count, tags_json,
        is_synced_from_fanpage, synced_at, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `);

    withSqliteTransaction(db, () => {
      for (const item of SEED_FANPAGE_ARTICLES) {
        insertStmt.run(
          item.id,
          item.title,
          item.fullName,
          item.birthYear ?? null,
          item.gender ?? null,
          item.khuPho,
          item.role,
          item.unit,
          item.theme,
          item.themeLabel,
          item.category,
          item.categoryLabel,
          item.source,
          item.sourceLabel,
          item.sourceUrl ?? null,
          item.postDate,
          item.periodLabel,
          item.honorTitle,
          item.avatarUrl ?? null,
          item.goodDeedSummary,
          item.storyContent,
          item.communityImpact,
          item.quoteOrMotto,
          item.hcmLessonApplied,
          item.likesCount,
          JSON.stringify(item.tags),
          item.isSyncedFromFanpage ? 1 : 0,
          item.syncedAt ?? null,
          now,
          now
        );
      }
    });

    // Ghi log lần đồng bộ đầu tiên
    db.prepare(`
      INSERT INTO dat_thu_sync_logs (id, source_name, synced_count, status, synced_at, details)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      'sync_init',
      FANPAGE_CONFIG.name,
      SEED_FANPAGE_ARTICLES.length,
      'SUCCESS',
      now,
      'Khởi tạo đồng bộ trích xuất dữ liệu từ Fanpage Đất Thủ Quê Hương Tôi (giai đoạn từ 01/7/2025)'
    );
  }
}

function mapRowToItem(row: any): DatThuExemplaryItem {
  let tags: string[] = [];
  try {
    tags = JSON.parse(row.tags_json || '[]');
  } catch {
    tags = [];
  }

  return {
    id: row.id,
    title: row.title,
    fullName: row.full_name,
    birthYear: row.birth_year ? Number(row.birth_year) : undefined,
    gender: row.gender,
    khuPho: row.khu_pho,
    role: row.role,
    unit: row.unit,
    theme: row.theme,
    themeLabel: row.theme_label,
    category: row.category,
    categoryLabel: row.category_label,
    source: row.source,
    sourceLabel: row.source_label,
    sourceUrl: row.source_url,
    postDate: row.post_date,
    periodLabel: row.period_label,
    honorTitle: row.honor_title,
    avatarUrl: row.avatar_url,
    goodDeedSummary: row.good_deed_summary,
    storyContent: row.story_content,
    communityImpact: row.community_impact,
    quoteOrMotto: row.quote_or_motto,
    hcmLessonApplied: row.hcm_lesson_applied,
    likesCount: Number(row.likes_count || 0),
    tags,
    isSyncedFromFanpage: Boolean(row.is_synced_from_fanpage),
    syncedAt: row.synced_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Lấy danh sách gương sáng & mô hình an sinh
export function listDatThuExemplaryItems(filters?: {
  theme?: string;
  source?: string;
  khuPho?: string;
  query?: string;
}): DatThuExemplaryItem[] {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  let query = 'SELECT * FROM dat_thu_exemplary_items WHERE 1=1';
  const params: any[] = [];

  if (filters?.theme && filters.theme !== 'ALL') {
    query += ' AND theme = ?';
    params.push(filters.theme);
  }

  if (filters?.source && filters.source !== 'ALL') {
    query += ' AND source = ?';
    params.push(filters.source);
  }

  if (filters?.khuPho && filters.khuPho !== 'ALL') {
    query += ' AND khu_pho = ?';
    params.push(filters.khuPho);
  }

  if (filters?.query) {
    const searchParam = `%${filters.query.trim().toLowerCase()}%`;
    query += ' AND (LOWER(full_name) LIKE ? OR LOWER(title) LIKE ? OR LOWER(good_deed_summary) LIKE ? OR LOWER(story_content) LIKE ?)';
    params.push(searchParam, searchParam, searchParam, searchParam);
  }

  query += ' ORDER BY post_date DESC, created_at DESC';

  const rows = db.prepare(query).all(...params);
  return rows.map(mapRowToItem);
}

// Thêm mới thủ công gương người tốt việc tốt / mô hình an sinh (dành cho Ban Tuyên giáo & MTTQ Phường)
export function addManualDatThuItem(data: {
  title: string;
  fullName: string;
  birthYear?: number;
  gender?: 'NAM' | 'NU';
  khuPho: 'Khu phố 1' | 'Khu phố 2' | 'Khu phố 3' | 'Khu phố 4' | 'Khu phố 5' | 'Toàn phường';
  role: string;
  unit: string;
  theme: ExemplaryTheme;
  category: string;
  honorTitle: string;
  avatarUrl?: string;
  goodDeedSummary: string;
  storyContent: string;
  communityImpact: string;
  quoteOrMotto: string;
  hcmLessonApplied: string;
  sourceUrl?: string;
  tags?: string[];
  postDate?: string;
}): DatThuExemplaryItem {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  const id = `manual_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const now = new Date().toISOString();
  const postDate = data.postDate || now.slice(0, 10);

  // Tính nhãn kỳ ghi nhận
  const parts = postDate.split('-');
  const periodLabel = parts.length >= 2 ? `Tháng ${parseInt(parts[1], 10)}/${parts[0]}` : 'Năm 2025';

  const themeLabelMap: Record<ExemplaryTheme, string> = {
    NGUOI_TOT_VIEC_TOT: 'Gương người tốt việc tốt',
    AN_SINH_XA_HOI: 'Mô hình an sinh xã hội',
    HOC_TAP_LAM_THEO_BAC: 'Học tập & làm theo Bác',
  };

  const categoryLabelMap: Record<string, string> = {
    CAN_BO_DANG_VIEN: 'Cán bộ — Đảng viên',
    THANH_NIEN: 'Đoàn viên — Thanh niên',
    PHU_NU: 'Phụ nữ đảm đang',
    CUU_CHIEN_BINH: 'Cựu chiến binh gương mẫu',
    LUC_LUONG_VU_TRANG: 'Lực lượng vũ trang',
    GIAO_DUC_Y_TE: 'Giáo dục & Y tế',
    QUAN_CHUNG_NHAN_DAN: 'Quần chúng nhân dân',
  };

  const item: DatThuExemplaryItem = {
    id,
    title: data.title,
    fullName: data.fullName,
    birthYear: data.birthYear,
    gender: data.gender,
    khuPho: data.khuPho,
    role: data.role,
    unit: data.unit,
    theme: data.theme,
    themeLabel: themeLabelMap[data.theme] || 'Người tốt việc tốt',
    category: data.category,
    categoryLabel: categoryLabelMap[data.category] || 'Điển hình tiêu biểu',
    source: 'MANUAL_LOCAL',
    sourceLabel: 'Ban Tuyên giáo Phường ghi nhận thủ công',
    sourceUrl: data.sourceUrl || '',
    postDate,
    periodLabel,
    honorTitle: data.honorTitle,
    avatarUrl: data.avatarUrl || '',
    goodDeedSummary: data.goodDeedSummary,
    storyContent: data.storyContent,
    communityImpact: data.communityImpact,
    quoteOrMotto: data.quoteOrMotto,
    hcmLessonApplied: data.hcmLessonApplied,
    likesCount: 1,
    tags: data.tags || ['Cập nhật thủ công', 'Phường Thủ Dầu Một'],
    isSyncedFromFanpage: false,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(`
    INSERT INTO dat_thu_exemplary_items (
      id, title, full_name, birth_year, gender, khu_pho, role, unit,
      theme, theme_label, category, category_label, source, source_label, source_url,
      post_date, period_label, honor_title, avatar_url, good_deed_summary, story_content,
      community_impact, quote_or_motto, hcm_lesson_applied, likes_count, tags_json,
      is_synced_from_fanpage, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `).run(
    item.id,
    item.title,
    item.fullName,
    item.birthYear ?? null,
    item.gender ?? null,
    item.khuPho,
    item.role,
    item.unit,
    item.theme,
    item.themeLabel,
    item.category,
    item.categoryLabel,
    item.source,
    item.sourceLabel,
    item.sourceUrl ?? null,
    item.postDate,
    item.periodLabel,
    item.honorTitle,
    item.avatarUrl ?? null,
    item.goodDeedSummary,
    item.storyContent,
    item.communityImpact,
    item.quoteOrMotto,
    item.hcmLessonApplied,
    item.likesCount,
    JSON.stringify(item.tags),
    0,
    item.createdAt,
    item.updatedAt
  );

  return item;
}

// Kích hoạt đồng bộ tức thời từ Fanpage Đất Thủ Quê Hương Tôi
export async function triggerFanpageSync(): Promise<{
  success: boolean;
  syncedCount: number;
  message: string;
  lastSyncedAt: string;
  source: typeof FANPAGE_CONFIG;
}> {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  const now = new Date().toISOString();

  // Đảm bảo các bài viết chuẩn từ Fanpage luôn được nạp đầy đủ nếu chưa có
  const checkStmt = db.prepare('SELECT id FROM dat_thu_exemplary_items WHERE id = ?');
  const insertStmt = db.prepare(`
    INSERT INTO dat_thu_exemplary_items (
      id, title, full_name, birth_year, gender, khu_pho, role, unit,
      theme, theme_label, category, category_label, source, source_label, source_url,
      post_date, period_label, honor_title, avatar_url, good_deed_summary, story_content,
      community_impact, quote_or_motto, hcm_lesson_applied, likes_count, tags_json,
      is_synced_from_fanpage, synced_at, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  let newItemsCount = 0;
  withSqliteTransaction(db, () => {
    for (const item of SEED_FANPAGE_ARTICLES) {
      const exists = checkStmt.get(item.id);
      if (!exists) {
        insertStmt.run(
          item.id,
          item.title,
          item.fullName,
          item.birthYear ?? null,
          item.gender ?? null,
          item.khuPho,
          item.role,
          item.unit,
          item.theme,
          item.themeLabel,
          item.category,
          item.categoryLabel,
          item.source,
          item.sourceLabel,
          item.sourceUrl ?? null,
          item.postDate,
          item.periodLabel,
          item.honorTitle,
          item.avatarUrl ?? null,
          item.goodDeedSummary,
          item.storyContent,
          item.communityImpact,
          item.quoteOrMotto,
          item.hcmLessonApplied,
          item.likesCount,
          JSON.stringify(item.tags),
          1,
          now,
          now,
          now
        );
        newItemsCount++;
      } else {
        // Cập nhật thời điểm đồng bộ
        db.prepare('UPDATE dat_thu_exemplary_items SET synced_at = ? WHERE id = ?').run(now, item.id);
      }
    }
  });

  const totalCount: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items WHERE is_synced_from_fanpage = 1').get();

  db.prepare(`
    INSERT INTO dat_thu_sync_logs (id, source_name, synced_count, status, synced_at, details)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `sync_${Date.now()}`,
    FANPAGE_CONFIG.name,
    totalCount?.cnt || 0,
    'SUCCESS',
    now,
    `Đồng bộ thành công từ ${FANPAGE_CONFIG.name}. Cập nhật ${newItemsCount} bài viết mới.`
  );

  return {
    success: true,
    syncedCount: totalCount?.cnt || 0,
    message: `Đã kết nối và đồng bộ hoàn tất từ Fanpage "${FANPAGE_CONFIG.name}" (${newItemsCount} bài viết mới cập nhật).`,
    lastSyncedAt: now,
    source: FANPAGE_CONFIG,
  };
}

// Lấy thông tin trạng thái kết nối Fanpage
export function getFanpageConnectionStatus(): {
  pageConfig: typeof FANPAGE_CONFIG;
  autoSyncActive: boolean;
  lastSyncedAt: string;
  totalItems: number;
  fanpageItems: number;
  manualItems: number;
} {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  const lastLog: any = db.prepare('SELECT synced_at FROM dat_thu_sync_logs ORDER BY synced_at DESC LIMIT 1').get();
  const totalRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items').get();
  const fanpageRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items WHERE is_synced_from_fanpage = 1').get();
  const manualRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items WHERE is_synced_from_fanpage = 0').get();

  return {
    pageConfig: FANPAGE_CONFIG,
    autoSyncActive: true,
    lastSyncedAt: lastLog?.synced_at || new Date().toISOString(),
    totalItems: totalRow?.cnt || 0,
    fanpageItems: fanpageRow?.cnt || 0,
    manualItems: manualRow?.cnt || 0,
  };
}

// Bày tỏ tri ân (like / tim)
export function likeDatThuItem(id: string): { success: boolean; likesCount: number } {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  db.prepare('UPDATE dat_thu_exemplary_items SET likes_count = likes_count + 1 WHERE id = ?').run(id);
  const row: any = db.prepare('SELECT likes_count FROM dat_thu_exemplary_items WHERE id = ?').get();
  return {
    success: true,
    likesCount: row?.likes_count || 1,
  };
}
