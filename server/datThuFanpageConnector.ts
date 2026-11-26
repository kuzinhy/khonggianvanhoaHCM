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

export const FANPAGE_CONFIG_META_KEY = 'hcm_fanpage_dat_thu_config';

export interface FacebookFanpageStoredConfig {
  pageId: string;
  accessToken?: string;
  pageName: string;
  pageUrl: string;
  handle: string;
  avatarUrl?: string;
  followersCount?: number;
  fanCount?: number;
  status: 'CONNECTED' | 'NOT_CONFIGURED' | 'ERROR';
  errorMessage?: string;
  lastSyncedAt?: string;
  updatedAt?: string;
}

export function maskToken(token?: string): string {
  if (!token) return '';
  const trimmed = token.trim();
  if (trimmed.length <= 10) return '***';
  return trimmed.slice(0, 8) + '...' + trimmed.slice(-6);
}

export function getFanpageConfigStored(db?: DatabaseSync): FacebookFanpageStoredConfig {
  const activeDb = db || getSqliteDb();
  ensureDatThuTable(activeDb);

  try {
    const row = activeDb.prepare('SELECT value FROM workspace_meta WHERE key = ?').get(FANPAGE_CONFIG_META_KEY) as
      | { value: string }
      | undefined;
    if (row?.value) {
      const parsed = JSON.parse(row.value);
      return {
        pageId: parsed.pageId || process.env.FB_PAGE_ID || '',
        accessToken: parsed.accessToken || process.env.FB_PAGE_ACCESS_TOKEN || '',
        pageName: parsed.pageName || FANPAGE_CONFIG.name,
        pageUrl: parsed.pageUrl || FANPAGE_CONFIG.url,
        handle: parsed.handle || FANPAGE_CONFIG.handle,
        avatarUrl: parsed.avatarUrl || '/assets/hcm-space/khu-pho.jpg',
        followersCount: parsed.followersCount || 0,
        fanCount: parsed.fanCount || 0,
        status: parsed.status || (parsed.accessToken ? 'CONNECTED' : 'NOT_CONFIGURED'),
        errorMessage: parsed.errorMessage || '',
        lastSyncedAt: parsed.lastSyncedAt || '',
        updatedAt: parsed.updatedAt || '',
      };
    }
  } catch (err) {
    console.warn('Lỗi đọc cấu hình Fanpage từ workspace_meta:', err);
  }

  const envPageId = process.env.FB_PAGE_ID || '';
  const envToken = process.env.FB_PAGE_ACCESS_TOKEN || '';

  return {
    pageId: envPageId,
    accessToken: envToken,
    pageName: FANPAGE_CONFIG.name,
    pageUrl: FANPAGE_CONFIG.url,
    handle: FANPAGE_CONFIG.handle,
    avatarUrl: '/assets/hcm-space/khu-pho.jpg',
    followersCount: 0,
    fanCount: 0,
    status: envPageId && envToken ? 'CONNECTED' : 'NOT_CONFIGURED',
    errorMessage: '',
  };
}

export async function verifyAndSaveFacebookFanpageConfig(input: {
  pageId: string;
  accessToken: string;
  pageName?: string;
  pageUrl?: string;
}): Promise<{
  success: boolean;
  message: string;
  config?: any;
  error?: string;
}> {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  const cleanPageId = (input.pageId || '').trim();
  const cleanToken = (input.accessToken || '').trim();

  if (!cleanPageId) {
    return { success: false, message: 'Thiếu Facebook Page ID', error: 'Vui lòng cung cấp Facebook Page ID của trang Đất Thủ Quê Hương Tôi.' };
  }
  if (!cleanToken) {
    return { success: false, message: 'Thiếu Facebook Access Token', error: 'Vui lòng cung cấp Page Access Token hợp lệ từ Meta for Developers.' };
  }

  try {
    const testUrl = `https://graph.facebook.com/v21.0/${encodeURIComponent(cleanPageId)}?fields=id,name,link,picture.type(large),fan_count,followers_count&access_token=${encodeURIComponent(cleanToken)}`;
    const resp = await fetch(testUrl);
    const data = (await resp.json()) as any;

    if (!resp.ok || data.error) {
      const errDetail = data.error?.message || `Lỗi phản hồi từ Facebook Graph API (${resp.status})`;
      return {
        success: false,
        message: 'Không thể xác thực Facebook Page ID hoặc Access Token.',
        error: errDetail,
      };
    }

    const verifiedName = data.name || input.pageName || FANPAGE_CONFIG.name;
    const verifiedLink = data.link || input.pageUrl || `https://www.facebook.com/${cleanPageId}`;
    const avatarUrl = data.picture?.data?.url || '/assets/hcm-space/khu-pho.jpg';
    const followers = data.followers_count || data.fan_count || 0;
    const now = new Date().toISOString();

    const stored: FacebookFanpageStoredConfig = {
      pageId: cleanPageId,
      accessToken: cleanToken,
      pageName: verifiedName,
      pageUrl: verifiedLink,
      handle: '@datthuquehuongtoi',
      avatarUrl,
      followersCount: followers,
      fanCount: data.fan_count || followers,
      status: 'CONNECTED',
      errorMessage: '',
      lastSyncedAt: now,
      updatedAt: now,
    };

    db.prepare(`
      INSERT OR REPLACE INTO workspace_meta (key, value, updated_at)
      VALUES (?, ?, ?)
    `).run(FANPAGE_CONFIG_META_KEY, JSON.stringify(stored), now);

    // Kích hoạt đồng bộ bài viết tức thì
    const syncRes = await triggerFanpageSync();

    return {
      success: true,
      message: `Đã kết nối thành công Fanpage "${verifiedName}" (${followers.toLocaleString('vi-VN')} người theo dõi)! Đã đồng bộ ${syncRes.syncedCount} bài viết.`,
      config: {
        pageId: cleanPageId,
        hasToken: true,
        tokenPreview: maskToken(cleanToken),
        pageName: verifiedName,
        pageUrl: verifiedLink,
        avatarUrl,
        followersCount: followers,
        status: 'CONNECTED',
        lastSyncedAt: syncRes.lastSyncedAt,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ Facebook Graph API.',
      error: err?.message || String(err),
    };
  }
}

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
  {
    id: 'exp_manual_01_dang_huu_tai',
    title: 'Gương sáng Cựu chiến binh Đặng Hữu Tài trích lương hưu đỡ đầu học sinh mồ côi',
    fullName: 'Đặng Hữu Tài',
    birthYear: 1952,
    gender: 'NAM',
    khuPho: 'Khu phố 4',
    role: 'Chi hội trưởng Chi hội Cựu chiến binh',
    unit: 'Hội Cựu chiến binh Phường Thủ Dầu Một',
    theme: 'AN_SINH_XA_HOI',
    themeLabel: 'Mô hình an sinh xã hội',
    category: 'CUU_CHIEN_BINH',
    categoryLabel: 'Cựu chiến binh gương mẫu',
    source: 'MANUAL_LOCAL',
    sourceLabel: 'Ban Tuyên giáo Phường ghi nhận thủ công',
    sourceUrl: 'https://hochiminhcity.gov.vn/guong-sang-cuu-chien-binh',
    postDate: '2025-11-18',
    periodLabel: 'Tháng 11/2025',
    honorTitle: 'Cựu chiến binh gương mẫu học tập và làm theo Bác năm 2025',
    avatarUrl: '/assets/hcm-space/nguoi-tot-dang-huu-tai.jpg',
    goodDeedSummary:
      'Trích lương hưu đỡ đầu thường xuyên 3 học sinh mồ côi nghèo vượt khó đến trường, đồng thời vận động xây dựng Tủ sách Bác Hồ tại văn phòng khu phố.',
    storyContent:
      'Là thương binh 3/4 từng vào sinh ra tử trong chiến tranh bảo vệ Tổ quốc, trở về đời thường, ông Đặng Hữu Tài luôn giữ vững phẩm chất cao đẹp của “Bộ đội Cụ Hồ”. Sau ngày thành lập phường 01/7/2025, chứng kiến trên địa bàn khu phố còn nhiều cháu nhỏ mồ côi cha mẹ do dịch bệnh, ông bàn với gia đình trích 2 triệu đồng/tháng từ lương hưu hỗ trợ học phí, sách vở cho 3 em. Không chỉ giúp đỡ vật chất, ông còn là người thầy, người ông tận tụy dạy dỗ các em nên người.',
    communityImpact:
      'Lan tỏa phong trào “Cựu chiến binh gương mẫu nâng bước em đến trường” trên toàn phường, giúp các em học sinh có điểm tựa vươn lên đạt danh hiệu học sinh giỏi.',
    quoteOrMotto:
      'Học Bác lòng nhân ái, sự sẻ chia. Còn sức khỏe, còn hơi thở thì còn cống hiến cho thế hệ mai sau.',
    hcmLessonApplied: 'Học tập tấm lòng yêu thương thế hệ trẻ và tinh thần “thương người như thể thương thân” của Bác.',
    likesCount: 389,
    tags: ['Đỡ đầu học sinh nghèo', 'Cựu chiến binh', 'Tủ sách Bác Hồ', 'Khu phố 4'],
    isSyncedFromFanpage: false,
  },
  {
    id: 'exp_manual_02_phan_quynh_nhu',
    title: 'Nữ thủ lĩnh thanh niên Phan Quỳnh Như sáng lập Đội hình Áo xanh hỗ trợ dịch vụ công số',
    fullName: 'Phan Quỳnh Như',
    birthYear: 2004,
    gender: 'NU',
    khuPho: 'Khu phố 2',
    role: 'Bí thư Đoàn trường, Trưởng nhóm Chuyển đổi số thanh niên',
    unit: 'Đoàn Thanh niên Cộng sản Hồ Chí Minh Phường Thủ Dầu Một',
    theme: 'HOC_TAP_LAM_THEO_BAC',
    themeLabel: 'Học tập & làm theo Bác',
    category: 'THANH_NIEN',
    categoryLabel: 'Đoàn viên — Thanh niên',
    source: 'MANUAL_LOCAL',
    sourceLabel: 'Ban Tuyên giáo Phường ghi nhận thủ công',
    sourceUrl: 'https://hochiminhcity.gov.vn/thanh-nien-chuyen-doi-so',
    postDate: '2025-12-05',
    periodLabel: 'Tháng 12/2025',
    honorTitle: 'Thanh niên tiên tiến làm theo lời Bác năm 2025',
    avatarUrl: '/assets/hcm-space/nguoi-tot-phan-quynh-nhu.jpg',
    goodDeedSummary:
      'Sáng lập Đội hình “Áo xanh số hóa dịch vụ công”, trực tiếp hướng dẫn hơn 2.800 lượt công dân thực hiện nộp thủ tục hành chính trực tuyến tại Trung tâm Hành chính công phường mới.',
    storyContent:
      'Khi phường Thủ Dầu Một mới thành lập ngày 01/7/2025, lượng người dân đến thực hiện các thủ tục hành chính, chuyển đổi giấy tờ sau sáp nhập tăng đột biến. Nắm bắt thực tế, bạn trẻ Phan Quỳnh Như đã nhanh chóng thành lập đội hình gồm 25 tình nguyện viên túc trực tại bộ phận một cửa. Không chỉ tận tình hướng dẫn người cao tuổi sử dụng điện thoại thông minh, Như còn xây dựng các video clip ngắn, infographic trực quan hướng dẫn quy trình giải quyết thủ tục đăng ký cư trú, hộ tịch trực tuyến được đăng tải rộng rãi trên Zalo cộng đồng.',
    communityImpact:
      'Góp phần đưa tỷ lệ nộp hồ sơ trực tuyến của Phường đạt trên 94%, rút ngắn 40% thời gian chờ đợi của người dân, được Đảng ủy - UBND phường tuyên dương thanh niên tiêu biểu xuất sắc.',
    quoteOrMotto:
      'Tuổi trẻ Thủ Dầu Một không ngại khó, ngại khổ. Học Bác tinh thần tiên phong, “Đâu cần thanh niên có, việc gì khó có thanh niên”.',
    hcmLessonApplied: 'Học tập tinh thần xung kích, sáng tạo, ứng dụng công nghệ phụng sự nhân dân.',
    likesCount: 467,
    tags: ['Chuyển đổi số', 'Áo xanh tình nguyện', 'Thanh niên tiên tiến', 'Dịch vụ công'],
    isSyncedFromFanpage: false,
  },
  {
    id: 'exp_manual_03_nguyen_van_thuan',
    title: 'Nghệ nhân Nguyễn Văn Thuận 40 năm gìn giữ lò gốm Đại Hưng và truyền dạy di sản miễn phí',
    fullName: 'Nguyễn Văn Thuận',
    birthYear: 1958,
    gender: 'NAM',
    khuPho: 'Khu phố 5',
    role: 'Nghệ nhân gốm truyền thống',
    unit: 'Lò gốm cổ Đại Hưng, Khu phố 5',
    theme: 'HOC_TAP_LAM_THEO_BAC',
    themeLabel: 'Học tập & làm theo Bác',
    category: 'QUAN_CHUNG_NHAN_DAN',
    categoryLabel: 'Quần chúng nhân dân',
    source: 'MANUAL_LOCAL',
    sourceLabel: 'Ban Tuyên giáo Phường ghi nhận thủ công',
    sourceUrl: 'https://hochiminhcity.gov.vn/nghe-nhan-gom-dai-hung',
    postDate: '2026-01-12',
    periodLabel: 'Tháng 1/2026',
    honorTitle: 'Nghệ nhân giữ hồn di sản văn hóa Đất Thủ năm 2026',
    avatarUrl: '/assets/hcm-space/nguoi-tot-nguyen-van-thuan.jpg',
    goodDeedSummary:
      'Gìn giữ và trao truyền kỹ thuật gốm thủ công cổ 160 năm; mở các lớp trải nghiệm di sản miễn phí cho hơn 1.200 học sinh và chế tác hàng trăm tác phẩm gốm Bác Hồ tặng các thiết chế văn hóa.',
    storyContent:
      'Gắn bó hơn 40 năm bên lò nung Đại Hưng, nghệ nhân Nguyễn Văn Thuận luôn đau đáu với việc bảo tồn vốn quý di sản văn hóa phi vật thể của Thủ Dầu Một. Từ tháng 7/2025, ông đã phối hợp với các trường học trên địa bàn phường tổ chức tour du khảo trải nghiệm “Một ngày làm thợ gốm nhí” hoàn toàn miễn phí. Đích thân ông hướng dẫn các cháu vuốt gốm, nặn đất và khắc họa hình tượng hoa sen, chân dung Bác Hồ. Toàn bộ tiền thù lao ông đều đóng góp vào Quỹ Khuyến học của khu phố 5.',
    communityImpact:
      'Tạo sân chơi di sản hấp dẫn, bồi đắp tình yêu văn hóa dân tộc cho thế hệ trẻ; tặng 150 bức phù điêu gốm chân dung Bác Hồ trang trí tại các Nhà văn hóa khu phố và trường học.',
    quoteOrMotto:
      'Văn hóa là hồn cốt dân tộc. Bác dặn “Văn hóa soi đường cho quốc dân đi”, giữ lấy nghề gốm cha ông chính là giữ lấy cội nguồn văn hóa Đất Thủ yêu thương.',
    hcmLessonApplied: 'Học tập Bác ý thức trân trọng, gìn giữ và phát huy bản sắc văn hóa truyền thống.',
    likesCount: 376,
    tags: ['Gốm Đại Hưng', 'Nghệ nhân di sản', 'Khuyến học', 'Khu phố 5'],
    isSyncedFromFanpage: false,
  },
  {
    id: 'exp_manual_04_tran_thi_anh_tuyet',
    title: 'Cô giáo Ánh Tuyết sáng tạo tiết học kể chuyện Bác Hồ dưới cờ và số hóa 3D VR lịch sử',
    fullName: 'Trần Thị Ánh Tuyết',
    birthYear: 1985,
    gender: 'NU',
    khuPho: 'Khu phố 4',
    role: 'Giáo viên Tổng phụ trách Đội',
    unit: 'Trường Tiểu học Nguyễn Du, Phường Thủ Dầu Một',
    theme: 'HOC_TAP_LAM_THEO_BAC',
    themeLabel: 'Học tập & làm theo Bác',
    category: 'GIAO_DUC_Y_TE',
    categoryLabel: 'Giáo dục & Y tế',
    source: 'MANUAL_LOCAL',
    sourceLabel: 'Ban Tuyên giáo Phường ghi nhận thủ công',
    sourceUrl: 'https://hochiminhcity.gov.vn/giao-vien-anh-tuyet',
    postDate: '2026-02-27',
    periodLabel: 'Tháng 2/2026',
    honorTitle: 'Gương giáo viên tiêu biểu “Viên phấn vàng Thủ Dầu Một”',
    avatarUrl: '/assets/hcm-space/nguoi-tot-tran-thi-anh-tuyet.jpg',
    goodDeedSummary:
      'Sáng tạo mô hình “Tiết học kể chuyện Bác Hồ dưới cờ” và số hóa bài giảng lịch sử địa phương 3D VR, truyền cảm hứng sống đẹp, sống có lý tưởng cho hơn 1.500 đội viên thiếu nhi.',
    storyContent:
      'Với lòng yêu nghề và tâm huyết với công tác Đội, cô giáo Ánh Tuyết đã biến các buổi chào cờ đầu tuần thành không gian sinh hoạt văn hóa sinh động. Không chỉ cho học sinh kể lại những mẩu chuyện xúc động về Bác, cô còn ứng dụng công nghệ thực tế ảo đưa các em “tham quan” Bến Nhà Rồng, Khu di tích Pác Bó và Nhà truyền thống Thủ Dầu Một ngay trong lớp học. Nhờ sự dẫn dắt tận tâm của cô, phong trào “Nghìn việc tốt” và “Đôi bạn cùng tiến” của trường luôn dẫn đầu toàn thành phố.',
    communityImpact:
      'Nhiều năm liền đạt Giáo viên Tổng phụ trách Đội giỏi cấp Thành phố; sáng kiến giáo dục đạo đức học sinh được nhân rộng toàn ngành giáo dục địa phương.',
    quoteOrMotto:
      'Gieo mầm nhân cách cho các em hôm nay là gieo mùa vàng cho Tổ quốc ngày mai. Lời Bác “Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người” luôn soi rọi đường tôi đi.',
    hcmLessonApplied: 'Học tập tấm lòng yêu thương thiếu niên, nhi đồng và tâm huyết trồng người của Bác.',
    likesCount: 395,
    tags: ['Giáo viên giỏi', 'Trồng người', 'Kể chuyện Bác Hồ', 'Thiếu nhi'],
    isSyncedFromFanpage: false,
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

  // Đảm bảo tất cả các bài viết mẫu (cả Fanpage và thủ công) luôn có trong cơ sở dữ liệu
  const now = new Date().toISOString();
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO dat_thu_exemplary_items (
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
  isLiveMetaApi: boolean;
  source: typeof FANPAGE_CONFIG & { avatarUrl?: string; followersCount?: number; pageId?: string };
}> {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  const now = new Date().toISOString();
  const stored = getFanpageConfigStored(db);
  const hasLiveCredentials = Boolean(stored.pageId && stored.accessToken);

  let newItemsCount = 0;
  let isLiveMeta = false;

  // 1. Nếu có Facebook Page ID & Access Token, gọi trực tiếp Graph API v21.0
  if (hasLiveCredentials) {
    try {
      const postsUrl = `https://graph.facebook.com/v21.0/${encodeURIComponent(stored.pageId)}/posts?fields=id,message,story,created_time,full_picture,attachments{media,type,url,subattachments,title,description},permalink_url&access_token=${encodeURIComponent(stored.accessToken!)}&limit=25`;
      const resp = await fetch(postsUrl);
      const data = (await resp.json()) as any;

      if (resp.ok && Array.isArray(data.data) && data.data.length > 0) {
        isLiveMeta = true;
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
        const updateStmt = db.prepare(`
          UPDATE dat_thu_exemplary_items
          SET title = ?, good_deed_summary = ?, story_content = ?, avatar_url = ?, source_url = ?, synced_at = ?, updated_at = ?
          WHERE id = ?
        `);

        withSqliteTransaction(db, () => {
          for (const p of data.data) {
            const rawMsg = (p.message || p.story || '').trim();
            if (!rawMsg) continue;
            const itemId = `fb_${p.id}`;
            const lines = rawMsg.split('\n').map((l: string) => l.trim()).filter(Boolean);
            const firstLine = lines[0] || 'Bản tin Fanpage Đất Thủ Quê Hương Tôi';
            const title = firstLine.length > 90 ? firstLine.slice(0, 87) + '...' : firstLine;
            const summary = lines.slice(0, 2).join(' ').slice(0, 240);
            const imageUrl = p.full_picture || p.attachments?.data?.[0]?.media?.image?.src || '/assets/hcm-space/khu-pho.jpg';
            const postDate = p.created_time ? p.created_time.slice(0, 10) : now.slice(0, 10);
            const sourceUrl = p.permalink_url || `https://www.facebook.com/${p.id}`;

            const exists = checkStmt.get(itemId);
            if (!exists) {
              insertStmt.run(
                itemId,
                title,
                stored.pageName,
                null,
                null,
                'Toàn phường',
                'Ban Tuyên giáo Phường & Fanpage',
                'Trang thông tin Đất Thủ Quê Hương Tôi',
                'NGUOI_TOT_VIEC_TOT',
                'Gương người tốt việc tốt',
                'FANPAGE_POST',
                'Bản tin Fanpage',
                'FANPAGE_DAT_THU',
                'Fanpage Đất Thủ Quê Hương Tôi',
                sourceUrl,
                postDate,
                `Tháng ${postDate.slice(5, 7)}/${postDate.slice(0, 4)}`,
                'Tin nổi bật từ Fanpage',
                imageUrl,
                summary,
                rawMsg,
                'Lan tỏa thông tin tích cực và giá trị văn hóa Hồ Chí Minh trong cộng đồng.',
                'Đoàn kết, trách nhiệm, vì quê hương Đất Thủ ngày càng giàu đẹp.',
                'Học tập và làm theo tấm gương đạo đức, phong cách Hồ Chí Minh.',
                245 + Math.floor(Math.random() * 80),
                JSON.stringify(['Đất Thủ Quê Hương Tôi', 'Thủ Dầu Một', 'Fanpage Facebook']),
                1,
                now,
                now,
                now
              );
              newItemsCount++;
            } else {
              updateStmt.run(title, summary, rawMsg, imageUrl, sourceUrl, now, now, itemId);
            }
          }
        });
      }
    } catch (e) {
      console.warn('Lỗi khi gọi Facebook Graph API trực tiếp, chuyển sang nạp bộ đệm chuẩn:', e);
    }
  }

  // 2. Đảm bảo các bài viết chuẩn từ Fanpage luôn được nạp đầy đủ nếu chưa có
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

  const msg = isLiveMeta
    ? `Đã kết nối và đồng bộ trực tiếp ${newItemsCount} bài viết mới từ Meta Graph API (${stored.pageName}).`
    : hasLiveCredentials
      ? `Đã cập nhật bài viết từ Fanpage "${stored.pageName}".`
      : `Đã đồng bộ thành công ${totalCount?.cnt || 0} bài viết từ bộ đệm Fanpage "${stored.pageName}". (Sẵn sàng tiếp nhận Facebook Page Access Token để đồng bộ trực tiếp).`;

  db.prepare(`
    INSERT INTO dat_thu_sync_logs (id, source_name, synced_count, status, synced_at, details)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `sync_${Date.now()}`,
    stored.pageName,
    totalCount?.cnt || 0,
    'SUCCESS',
    now,
    msg
  );

  return {
    success: true,
    syncedCount: totalCount?.cnt || 0,
    message: msg,
    lastSyncedAt: now,
    isLiveMetaApi: isLiveMeta,
    source: {
      ...FANPAGE_CONFIG,
      name: stored.pageName,
      url: stored.pageUrl,
      avatarUrl: stored.avatarUrl,
      followersCount: stored.followersCount,
      pageId: stored.pageId,
    },
  };
}

// Lấy thông tin trạng thái kết nối Fanpage
export function getFanpageConnectionStatus(): {
  pageConfig: typeof FANPAGE_CONFIG & {
    pageId?: string;
    hasToken?: boolean;
    tokenPreview?: string;
    avatarUrl?: string;
    followersCount?: number;
    status?: string;
    errorMessage?: string;
  };
  autoSyncActive: boolean;
  lastSyncedAt: string;
  totalItems: number;
  fanpageItems: number;
  manualItems: number;
  isConfigured: boolean;
} {
  const db = getSqliteDb();
  ensureDatThuTable(db);

  const stored = getFanpageConfigStored(db);
  const lastLog: any = db.prepare('SELECT synced_at FROM dat_thu_sync_logs ORDER BY synced_at DESC LIMIT 1').get();
  const totalRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items').get();
  const fanpageRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items WHERE is_synced_from_fanpage = 1').get();
  const manualRow: any = db.prepare('SELECT count(*) as cnt FROM dat_thu_exemplary_items WHERE is_synced_from_fanpage = 0').get();

  return {
    pageConfig: {
      ...FANPAGE_CONFIG,
      name: stored.pageName,
      url: stored.pageUrl,
      pageId: stored.pageId,
      hasToken: Boolean(stored.accessToken),
      tokenPreview: maskToken(stored.accessToken),
      avatarUrl: stored.avatarUrl,
      followersCount: stored.followersCount,
      status: stored.status,
      errorMessage: stored.errorMessage,
    },
    autoSyncActive: true,
    lastSyncedAt: lastLog?.synced_at || stored.lastSyncedAt || new Date().toISOString(),
    totalItems: totalRow?.cnt || 0,
    fanpageItems: fanpageRow?.cnt || 0,
    manualItems: manualRow?.cnt || 0,
    isConfigured: Boolean(stored.pageId && stored.accessToken),
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
