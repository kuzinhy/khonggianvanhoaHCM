import crypto from 'node:crypto';
import { Router } from 'express';
import { getSqliteDb, withSqliteTransaction } from './db/sqliteClient';
import {
  authenticateUser,
  revokeSession,
  getEffectiveActor,
  EDITOR_ROLES,
  VERIFIER_ROLES,
  APPROVER_ROLES,
  requireApiRoles,
  sanitizeAuditPayload,
} from './apiIdentity';
import {
  fetchPortalArticleDetail,
  fetchPortalFeed,
  isValidPortalArticlePath,
  PORTAL_CHANNELS,
  type PortalChannelKey,
} from './hcmPortalConnector';
import {
  createOrUpdateDossier,
  ensureHcmV2Initialized,
  getDossierWithVersions,
  HCM_VERIFIER_ROLES,
  HCM_APPROVER_ROLES,
  listCategories,
  listDossiers,
  listEditorialLogs,
  listSources,
  listSyncLogs,
  listTopics,
  listTours,
  proposeEnrichmentDraftForDossier,
  rollbackDossierVersion,
  runInventoryAudit,
  syncOfficialSourceToDrafts,
  transitionDossierWorkflow,
  updateSourceConfig,
  createCorrectionRequest,
  listCorrections,
  updateCorrectionStatus,
  recordVisitorPing,
  getVisitorStats,
  resetVisitorStats,
  setVisitorStats,
  type HcmActor,
} from './hcmDossierRepository';

function extractActor(req: any): HcmActor {
  const u = req.apiActor || req.authUser || req.user || {};
  return {
    uid: String(u.uid || u.id || 'anonymous'),
    name: String(u.name || u.email || 'Cán bộ Tuyên giáo'),
    role: String(u.role || 'viewer').toLowerCase(),
  };
}

export type HcmSection = 'MILESTONE' | 'WORK' | 'QUOTE' | 'MODEL' | 'NEWS';

export interface HcmSpaceSettings {
  title: string;
  badgeText: string;
  unitText: string;
  description: string;
  updatedAt?: string;
}

export interface HcmCulturalEntry {
  id: string;
  section: HcmSection;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  quote: string;
  imageUrl: string;
  status: 'PUBLISHED' | 'DRAFT';
  sortOrder: number;
  updatedByUid?: string;
  updatedAt: string;
}

export const DEFAULT_HCM_SPACE_SETTINGS: HcmSpaceSettings = {
  title: 'Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một',
  badgeText: 'Đảng ủy Phường Thủ Dầu Một · Kết luận 01-KL/TW & Quy định 144-QĐ/TW',
  unitText: 'Ban Tuyên giáo & Dân vận Đảng ủy phường Thủ Dầu Một',
  description:
    'Không gian số trưng bày di sản tư tưởng, đạo đức, phong cách Hồ Chí Minh và các mô hình tiêu biểu do Đảng ủy phường Thủ Dầu Một trực tiếp biên tập, quản trị.',
};

export const DEFAULT_HCM_ENTRIES: Array<Omit<HcmCulturalEntry, 'updatedAt'>> = [
  {
    id: 'ms_1911',
    section: 'MILESTONE',
    title: 'Ra đi tìm đường cứu nước tại Bến Nhà Rồng',
    subtitle: '05/6/1911',
    location: 'Sài Gòn — TP. Hồ Chí Minh',
    summary:
      'Người thanh niên Nguyễn Tất Thành rời bến cảng Nhà Rồng trên con tàu Đô đốc Latouche-Tréville, mở đầu hành trình 30 năm bôn ba tìm con đường giải phóng dân tộc.',
    quote: '"Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn..."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 1,
  },
  {
    id: 'ms_1930',
    section: 'MILESTONE',
    title: 'Sáng lập Đảng Cộng sản Việt Nam',
    subtitle: '03/02/1930',
    location: 'Cửu Long — Hương Cảng',
    summary:
      'Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản, thông qua Chính cương vắn tắt, Sách lược vắn tắt — bước ngoặt vĩ đại của cách mạng Việt Nam.',
    quote: '"Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 2,
  },
  {
    id: 'ms_1941',
    section: 'MILESTONE',
    title: 'Trở về Tổ quốc tại Pác Bó',
    subtitle: '28/01/1941',
    location: 'Pác Bó — Cao Bằng',
    summary:
      'Sau 30 năm hoạt động ở nước ngoài, Người trở về trực tiếp lãnh đạo phong trào cách mạng trong nước, sáng lập Mặt trận Việt Minh và Đội Việt Nam Tuyên truyền Giải phóng quân.',
    quote: '"Non sông Việt Nam có trở nên tươi đẹp hay không... chính là nhờ một phần lớn ở công học tập của các em."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 3,
  },
  {
    id: 'ms_1945',
    section: 'MILESTONE',
    title: 'Đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa',
    subtitle: '02/9/1945',
    location: 'Quảng trường Ba Đình — Hà Nội',
    summary:
      'Thay mặt Chính phủ lâm thời, Chủ tịch Hồ Chí Minh trịnh trọng tuyên bố nền độc lập tự do của dân tộc Việt Nam trước toàn thể quốc dân và thế giới.',
    quote: '"Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 4,
  },
  {
    id: 'ms_1954',
    section: 'MILESTONE',
    title: 'Kháng chiến kiến quốc & Chiến thắng Điện Biên Phủ',
    subtitle: '1946–1954',
    location: 'Chiến khu Việt Bắc — Điện Biên Phủ',
    summary:
      'Lãnh đạo toàn dân, toàn quân thực hiện đường lối kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh, làm nên chiến thắng "lừng lẫy năm châu, chấn động địa cầu".',
    quote: '"Không có gì quý hơn độc lập, tự do."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 5,
  },
  {
    id: 'ms_1969',
    section: 'MILESTONE',
    title: 'Bản Di chúc thiêng liêng của Chủ tịch Hồ Chí Minh',
    subtitle: '1965–1969',
    location: 'Phủ Chủ tịch — Hà Nội',
    summary:
      'Kết tinh toàn bộ tư tưởng, đạo đức, tầm nhìn chiến lược về xây dựng Đảng cầm quyền trong sạch, vững mạnh và chăm lo đời sống hạnh phúc của Nhân dân.',
    quote: '"Đầu tiên là công việc đối với con người... Bồi dưỡng thế hệ cách mạng cho đời sau là một việc rất quan trọng và rất cần thiết."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 6,
  },
  {
    id: 'work_duong_kach_menh',
    section: 'WORK',
    title: 'Đường Kách mệnh',
    subtitle: 'Năm 1927',
    location: 'Quảng Châu',
    summary:
      'Tập hợp bài giảng huấn luyện cán bộ cách mạng tại Quảng Châu, nêu rõ 23 điều tư cách một người cách mạng: Cần, Kiệm, Liêm, Chính; tự mình phải gương mẫu trước Nhân dân.',
    quote: '"Tự mình phải: Cần kiệm. Hòa mà không tư. Cả quyết sửa lỗi mình. Cẩn thận mà không nhút nhát."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 1,
  },
  {
    id: 'work_nhat_ky',
    section: 'WORK',
    title: 'Ngục trung nhật ký (Nhật ký trong tù)',
    subtitle: '1942–1943',
    location: 'Quảng Tây',
    summary:
      'Tập thơ gồm 133 bài bằng chữ Hán phản ánh ý chí kiên cường, tinh thần lạc quan cách mạng và phong thái nhân văn cao đẹp trong hoàn cảnh lao tù.',
    quote: '"Thân thể ở trong lao / Tinh thần ở ngoài lao / Muốn nên sự nghiệp lớn / Tinh thần càng phải cao."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 2,
  },
  {
    id: 'work_tuyen_ngon',
    section: 'WORK',
    title: 'Tuyên ngôn Độc lập',
    subtitle: '02/9/1945',
    location: 'Hà Nội',
    summary:
      'Văn kiện lập quốc khẳng định quyền sống, quyền tự do và quyền mưu cầu hạnh phúc của dân tộc Việt Nam trước toàn thế giới tại Quảng trường Ba Đình.',
    quote: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 3,
  },
  {
    id: 'work_sua_doi',
    section: 'WORK',
    title: 'Sửa đổi lối làm việc',
    subtitle: 'Năm 1947',
    location: 'Việt Bắc',
    summary:
      'Tác phẩm nền tảng về xây dựng Đảng, nêu 5 đức tính của người cách mạng (Nhân, Nghĩa, Trí, Dũng, Liêm), chống bệnh quan liêu, chủ quan, hình thức.',
    quote: '"Cán bộ là cái gốc của mọi công việc. Muôn việc thành công hoặc thất bại đều do cán bộ tốt hoặc kém."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 4,
  },
  {
    id: 'work_di_chuc',
    section: 'WORK',
    title: 'Di chúc của Chủ tịch Hồ Chí Minh',
    subtitle: '1965–1969',
    location: 'Hà Nội',
    summary:
      'Bảo vật quốc gia kết tinh tư tưởng, tình cảm suốt đời vì nước vì dân; căn dặn giữ gìn sự đoàn kết thống nhất trong Đảng như giữ gìn con ngươi của mắt mình.',
    quote: '"Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, chí công vô tư."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 5,
  },
  {
    id: 'work_ban_an_thuc_dan',
    section: 'WORK',
    title: 'Bản án chế độ thực dân Pháp (Le Procès de la colonisation française)',
    subtitle: 'Năm 1925',
    location: 'Paris — Pháp',
    summary:
      'Tác phẩm chính luận đanh thép vạch trần bản chất tàn bạo, bóc lột của chủ nghĩa thực dân tại các thuộc địa; kêu gọi sự đoàn kết chiến đấu giữa giai cấp vô sản chính quốc và các dân tộc bị áp bức.',
    quote: '"Chủ nghĩa thực dân là một con đỉa hai vòi, một vòi bám vào giai cấp vô sản ở chính quốc và một vòi bám vào các dân tộc thuộc địa."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 6,
  },
  {
    id: 'work_dan_van',
    section: 'WORK',
    title: 'Dân vận',
    subtitle: '15/10/1949',
    location: 'Báo Sự Thật số 120',
    summary:
      'Cương lĩnh mẫu mực về công tác Dân vận của Đảng. Xác định bản chất: "Nước ta là nước dân chủ. Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân." Nêu rõ phương châm: "Óc nghĩ, mắt trông, tai nghe, chân đi, miệng nói, tay làm".',
    quote: '"Dân vận kém thì việc gì cũng kém. Dân vận khéo thì việc gì cũng thành công."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 7,
  },
  {
    id: 'work_dao_duc_cach_mang',
    section: 'WORK',
    title: 'Đạo đức cách mạng',
    subtitle: 'Tháng 12/1958',
    location: 'Tạp chí Học tập số 12',
    summary:
      'Tác phẩm khẳng định đạo đức cách mạng là nền tảng của người cán bộ. Muốn hoàn thành sự nghiệp vẻ vang, người cách mạng phải đặt lợi ích của Đảng, của Nhân dân lên trên hết, kiên quyết quét sạch chủ nghĩa cá nhân.',
    quote: '"Người cách mạng phải có đạo đức, không có đạo đức thì dù tài giỏi mấy cũng không lãnh đạo được nhân dân."',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 8,
  },
  {
    id: 'quote_dan',
    section: 'QUOTE',
    title: 'Việc gì lợi cho dân, ta phải hết sức làm. Việc gì hại đến dân, ta phải hết sức tránh.',
    subtitle: 'Đạo đức công vụ & Gần dân',
    location: 'Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng (17/10/1945)',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 1,
  },
  {
    id: 'quote_neu_guong',
    section: 'QUOTE',
    title: 'Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền.',
    subtitle: 'Công tác Tuyên giáo & Cán bộ',
    location: 'Hồ Chí Minh Toàn tập — về nêu gương cách mạng',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 2,
  },
  {
    id: 'quote_doan_ket',
    section: 'QUOTE',
    title: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.',
    subtitle: 'Đoàn kết dân tộc',
    location: 'Bài nói chuyện tại Hội nghị mở rộng Ủy ban Trung ương MTTQ Việt Nam (1962)',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 3,
  },
  {
    id: 'quote_144',
    section: 'QUOTE',
    title:
      '1) Yêu nước, tôn trọng Nhân dân; 2) Bản lĩnh, đổi mới, sáng tạo; 3) Cần, kiệm, liêm, chính, chí công vô tư; 4) Đoàn kết, kỷ cương, tình thương, trách nhiệm; 5) Gương mẫu, khiêm tốn, tu dưỡng suốt đời.',
    subtitle: 'Chuẩn mực Quy định 144-QĐ/TW (2024)',
    location: 'Quy định 144-QĐ/TW ngày 09/5/2024 của Bộ Chính trị',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 4,
  },
  {
    id: 'quote_dan_van_kheo',
    section: 'QUOTE',
    title: 'Dân vận kém thì việc gì cũng kém. Dân vận khéo thì việc gì cũng thành công.',
    subtitle: 'Công tác Dân vận cơ sở',
    location: 'Tác phẩm "Dân vận" (15/10/1949)',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 5,
  },
  {
    id: 'quote_hoc_suot_doi',
    section: 'QUOTE',
    title: 'Học để làm việc, làm người, làm cán bộ. Học để phụng sự Đoàn thể, giai cấp và nhân dân, Tổ quốc và nhân loại.',
    subtitle: 'Mục đích học tập của người cách mạng',
    location: 'Huấn thị tại Lớp cán bộ Trung cấp (1949)',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 6,
  },
  {
    id: 'quote_day_to_nhan_dan',
    section: 'QUOTE',
    title: 'Cán bộ là người đầy tớ của nhân dân, chứ không phải là "quan cách mạng" để đè đầu cưỡi cổ nhân dân.',
    subtitle: 'Đạo đức công vụ & Tinh thần phục vụ',
    location: 'Bài nói chuyện tại Đại hội Thanh niên tích cực (1956)',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 7,
  },
  {
    id: 'quote_de_muoi_lan',
    section: 'QUOTE',
    title: 'Dễ mười lần không dân cũng chịu, khó trăm lần dân liệu cũng xong.',
    subtitle: 'Sức mạnh to lớn của Nhân dân',
    location: 'Lời đúc kết của Chủ tịch Hồ Chí Minh về bài học dựa vào dân',
    summary: '',
    quote: '',
    imageUrl: '',
    status: 'PUBLISHED',
    sortOrder: 8,
  },
  {
    id: 'model_tdm_tu_sach_qr',
    section: 'MODEL',
    title: 'Mô hình Tủ sách Bác Hồ số & Bản tin sinh hoạt chi bộ qua mã QR',
    subtitle: 'Ban Tuyên giáo Đảng ủy & 26 Chi bộ cơ sở',
    location: '26 Chi bộ trực thuộc Phường Thủ Dầu Một',
    summary:
      'Triển khai bảng mã QR tra cứu 15 tập Hồ Chí Minh Toàn tập, tài liệu học tập, thực hành Chỉ thị 07-CT/TW (thay thế Chỉ thị 05-CT/TW) và Quy định 144-QĐ/TW tại văn phòng 26 chi bộ, điểm sinh hoạt khu phố và trường học trên địa bàn.',
    quote: '"Học để làm việc, làm người, làm cán bộ. Học để phụng sự Đoàn thể, giai cấp và nhân dân, Tổ quốc và nhân loại." — Hồ Chí Minh',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sortOrder: 1,
  },
  {
    id: 'model_tdm_dan_van_kheo',
    section: 'MODEL',
    title: 'Mô hình Dân vận khéo: "Gần dân, sát việc - Lắng nghe tiếng nói Nhân dân"',
    subtitle: 'Khối Dân vận & Ủy ban MTTQ phường',
    location: 'Địa bàn các khu phố phường Thủ Dầu Một',
    summary:
      'Thực hiện phương châm "Óc nghĩ, mắt trông, tai nghe, chân đi, miệng nói, tay làm", định kỳ thứ Bảy hằng tuần cán bộ xuống từng khu phố đối thoại trực tiếp, giải quyết kịp thời phản ánh của Nhân dân trong 48 giờ.',
    quote: '"Dân vận kém thì việc gì cũng kém. Dân vận khéo thì việc gì cũng thành công." — Bài báo Dân vận (1949)',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    status: 'PUBLISHED',
    sortOrder: 2,
  },
  {
    id: 'model_tdm_nu_cuoi_cong_so',
    section: 'MODEL',
    title: 'Mô hình "Nụ cười công sở - Nâng cao đạo đức công vụ theo tư tưởng Hồ Chí Minh"',
    subtitle: 'Chi bộ Cơ quan UBND & Bộ phận Một cửa',
    location: 'Bộ phận Tiếp nhận & Trả kết quả Phường Thủ Dầu Một',
    summary:
      'Xây dựng hình ảnh cán bộ, công chức chuẩn mực, văn minh, lịch sự; cam kết "4 xin, 4 luôn" (xin chào, xin lỗi, xin cảm ơn, xin phép; luôn mỉm cười, luôn nhẹ nhàng, luôn lắng nghe, luôn giúp đỡ); tỷ lệ giải quyết hồ sơ đúng và trước hạn đạt 99,8%.',
    quote: '"Cán bộ là người đầy tớ của nhân dân, phải một lòng một dạ phục vụ nhân dân." — Hồ Chí Minh',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    status: 'PUBLISHED',
    sortOrder: 3,
  },
  {
    id: 'model_tdm_thanh_nien_chuyen_doi_so',
    section: 'MODEL',
    title: 'Mô hình "Đội hình Thanh niên số lan tỏa tư tưởng Bác & Hỗ trợ dịch vụ công"',
    subtitle: 'Đoàn Thanh niên Cộng sản Hồ Chí Minh phường',
    location: 'Các điểm công cộng & Nhà sinh hoạt cộng đồng',
    summary:
      'Đoàn viên thanh niên thành lập tổ lưu động hỗ trợ người dân kích hoạt tài khoản định danh điện tử, số hóa tư liệu lịch sử di tích Nhà tù Phú Lợi, tổ chức cuộc thi trực tuyến tìm hiểu lịch sử Đảng bộ và cuộc đời Bác.',
    quote: '"Đâu cần thanh niên có, việc gì khó có thanh niên." — Lời căn dặn của Bác',
    imageUrl: '/assets/hcm-space/duong-sach.jpg',
    status: 'PUBLISHED',
    sortOrder: 4,
  },
  {
    id: 'model_tdm_tuyen_hem_van_minh',
    section: 'MODEL',
    title: 'Mô hình Tuyến hẻm tự quản "Xanh - Sạch - Đẹp - An toàn nghĩa tình"',
    subtitle: 'Chi bộ Khu phố 1 & Chi bộ Khu phố 3',
    location: 'Hẻm 42 & Hẻm 78 đường Cách Mạng Tháng Tám',
    summary:
      'Vận động Nhân dân hiến đất mở rộng hẻm, lắp đặt hệ thống chiếu sáng năng lượng mặt trời, camera an ninh tự quản và vẽ tranh bích họa tuyên truyền bảo vệ môi trường, văn minh đô thị.',
    quote: '"Dễ mười lần không dân cũng chịu, khó trăm lần dân liệu cũng xong." — Hồ Chí Minh',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sortOrder: 5,
  },
  {
    id: 'model_tdm_ong_ba_mau_muc',
    section: 'MODEL',
    title: 'Mô hình "Gia đình gương mẫu - Ông bà mẫu mực, con cháu thảo hiền gắn với Quy định 144"',
    subtitle: 'Hội Cựu chiến binh & Hội Liên hiệp Phụ nữ phường',
    location: 'Toàn địa bàn phường Thủ Dầu Một',
    summary:
      'Phát huy vai trò nêu gương của cán bộ hưu trí, cựu chiến binh trong giáo dục truyền thống yêu nước cho thế hệ trẻ; 100% hội viên đăng ký gia đình văn minh, không có tệ nạn xã hội.',
    quote: '"Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền." — Hồ Chí Minh',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    status: 'PUBLISHED',
    sortOrder: 6,
  },
  {
    id: 'news_tdm_quy_dinh_144',
    section: 'NEWS',
    title: 'Đảng ủy phường tổ chức Hội nghị quán triệt Quy định 144-QĐ/TW gắn với xây dựng Không gian Văn hóa HCM',
    subtitle: '23/11/2026',
    location: 'Hội trường Đảng ủy Phường Thủ Dầu Một',
    summary:
      'Hơn 250 cán bộ, đảng viên tham dự hội nghị trực tiếp kết hợp trực tuyến, thảo luận sâu về 5 chuẩn mực đạo đức cách mạng của cán bộ cơ sở và ký cam kết hành động năm 2026.',
    quote: '100% chi bộ hoàn thành việc đưa chuẩn mực Quy định 144 vào tiêu chí đánh giá đảng viên định kỳ hằng tháng.',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    status: 'PUBLISHED',
    sortOrder: 1,
  },
  {
    id: 'news_tdm_toa_dam_dan_van',
    section: 'NEWS',
    title: 'Tọa đàm chuyên đề "Khắc ghi lời Bác dạy về công tác Dân vận trong thời kỳ chuyển đổi số"',
    subtitle: '20/11/2026',
    location: 'Trung tâm Học tập Cộng đồng Phường',
    summary:
      'Trao đổi 12 tham luận thực tiễn về ứng dụng công nghệ thông tin trong nắm bắt dư luận xã hội, tiếp nhận ý kiến Nhân dân qua Zalo/Portal và giải quyết thủ tục hành chính công.',
    quote: '"Lấy sự hài lòng và niềm tin của người dân làm thước đo cao nhất của công tác Dân vận cơ sở."',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    status: 'PUBLISHED',
    sortOrder: 2,
  },
  {
    id: 'news_tdm_hoi_thi_theo_chan_bac',
    section: 'NEWS',
    title: 'Khai mạc Hội thi trực tuyến "Theo chân Bác - Sáng mãi niềm tin" phường Thủ Dầu Một năm 2026',
    subtitle: '15/11/2026',
    location: 'Nền tảng Tuyên giáo số trực tuyến',
    summary:
      'Hội thi thu hút hơn 1.200 lượt dự thi của đoàn viên, thanh niên, hội viên các đoàn thể và Nhân dân trên địa bàn qua 12 câu hỏi trắc nghiệm tương tác và phần tự luận.',
    quote: 'Giải nhất tuần 1 thuộc về Chi bộ Quân sự phường với 100% bài thi đạt điểm tuyệt đối.',
    imageUrl: '/assets/hcm-space/duong-sach.jpg',
    status: 'PUBLISHED',
    sortOrder: 3,
  },
  {
    id: 'news_tdm_khanh_thanh_tu_sach',
    section: 'NEWS',
    title: 'Khánh thành Không gian đọc sách mở và Tủ sách Bác Hồ tại Nhà văn hóa Khu phố 2',
    subtitle: '10/11/2026',
    location: 'Nhà Văn hóa Khu phố 2',
    summary:
      'Trưng bày hơn 300 đầu sách về cuộc đời, sự nghiệp của Bác Hồ, hồi ký các nhà cách mạng tiền bối và hệ thống mã QR tra cứu sách điện tử miễn phí cho thanh thiếu nhi.',
    quote: 'Không gian văn hóa Hồ Chí Minh là nơi kết nối cộng đồng, bồi dưỡng nhân cách và tình yêu quê hương đất nước.',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sortOrder: 4,
  },
];

const SEEDED_META_KEY = 'hcm_space_seeded_v1';
const SETTINGS_META_KEY = 'hcm_space_settings';
const CHECKLIST_META_KEY = 'hcm_space_checklist_thudaumot';

export type HcmChecklistMap = Record<string, Record<string, boolean>>;

function rowToEntry(row: Record<string, any>): HcmCulturalEntry {
  return {
    id: String(row.id),
    section: row.section as HcmSection,
    title: String(row.title),
    subtitle: String(row.subtitle || ''),
    location: String(row.location || ''),
    summary: String(row.summary || ''),
    quote: String(row.quote || ''),
    imageUrl: String(row.image_url || ''),
    status: row.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
    sortOrder: Number(row.sort_order || 0),
    updatedByUid: row.updated_by_uid || undefined,
    updatedAt: String(row.updated_at || ''),
  };
}

export function ensureHcmSeeded(dbPath?: string): void {
  const db = getSqliteDb(dbPath);
  const flag = db.prepare('SELECT value FROM workspace_meta WHERE key = ?').get(SEEDED_META_KEY) as
    | { value: string }
    | undefined;
  if (flag) return;

  const now = new Date().toISOString();
  withSqliteTransaction(db, () => {
    const insertEntry = db.prepare(
      `INSERT OR IGNORE INTO hcm_cultural_entries (
         id, section, title, subtitle, location, summary, quote, image_url, status, sort_order, updated_by_uid, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'system', ?)`
    );
    for (const item of DEFAULT_HCM_ENTRIES) {
      insertEntry.run(
        item.id,
        item.section,
        item.title,
        item.subtitle,
        item.location,
        item.summary,
        item.quote,
        item.imageUrl,
        item.status,
        item.sortOrder,
        now
      );
    }
    db.prepare(
      `INSERT OR IGNORE INTO workspace_meta (key, value, updated_at) VALUES (?, ?, ?)`
    ).run(SETTINGS_META_KEY, JSON.stringify({ ...DEFAULT_HCM_SPACE_SETTINGS, updatedAt: now }), now);
    db.prepare(`INSERT OR REPLACE INTO workspace_meta (key, value, updated_at) VALUES (?, '1', ?)`).run(
      SEEDED_META_KEY,
      now
    );
  });
}

export function getHcmSpaceState(dbPath?: string): {
  settings: HcmSpaceSettings;
  items: HcmCulturalEntry[];
  checklist: HcmChecklistMap;
} {
  ensureHcmSeeded(dbPath);
  const db = getSqliteDb(dbPath);
  const metaRow = db.prepare('SELECT value FROM workspace_meta WHERE key = ?').get(SETTINGS_META_KEY) as
    | { value: string }
    | undefined;
  let settings: HcmSpaceSettings = DEFAULT_HCM_SPACE_SETTINGS;
  if (metaRow?.value) {
    try {
      settings = { ...DEFAULT_HCM_SPACE_SETTINGS, ...JSON.parse(metaRow.value) };
    } catch {}
  }

  const checkRow = db.prepare('SELECT value FROM workspace_meta WHERE key = ?').get(CHECKLIST_META_KEY) as
    | { value: string }
    | undefined;
  let checklist: HcmChecklistMap = {};
  if (checkRow?.value) {
    try {
      checklist = JSON.parse(checkRow.value);
    } catch {}
  }

  const rows = db
    .prepare('SELECT * FROM hcm_cultural_entries ORDER BY section ASC, sort_order ASC, updated_at DESC')
    .all() as Array<Record<string, any>>;

  return {
    settings,
    items: rows.map(rowToEntry),
    checklist,
  };
}

export function createHcmSpaceRouter(dbPath?: string): Router {
  const router = Router();
  router.use((_, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  // 1. Lấy cấu hình và toàn bộ mục trưng bày / mô hình của Không gian Văn hóa HCM — Phường Thủ Dầu Một
  router.get('/', requireApiRoles('owner', 'admin', 'manager', 'leader', 'staff', 'member', 'viewer'), (_req, res, next) => {
    try {
      res.json({ success: true, data: getHcmSpaceState(dbPath) });
    } catch (err) {
      next(err);
    }
  });

  // 2. Cập nhật tiêu đề, mô tả & đơn vị chủ quản Không gian Văn hóa HCM
  router.put('/settings', requireApiRoles(...EDITOR_ROLES), (req, res, next) => {
    try {
      ensureHcmSeeded(dbPath);
      const db = getSqliteDb(dbPath);
      const current = getHcmSpaceState(dbPath).settings;
      const now = new Date().toISOString();
      const nextSettings: HcmSpaceSettings = {
        title: String(req.body?.title || current.title).trim().slice(0, 200),
        badgeText: String(req.body?.badgeText || current.badgeText).trim().slice(0, 200),
        unitText: String(req.body?.unitText || current.unitText).trim().slice(0, 200),
        description: String(req.body?.description || current.description).trim().slice(0, 1200),
        updatedAt: now,
      };
      db.prepare(`INSERT OR REPLACE INTO workspace_meta (key, value, updated_at) VALUES (?, ?, ?)`).run(
        SETTINGS_META_KEY,
        JSON.stringify(nextSettings),
        now
      );
      res.json({ success: true, data: nextSettings });
    } catch (err) {
      next(err);
    }
  });

  // 3. Thêm mới mốc lịch sử, tác phẩm, trích dẫn hoặc bài viết mô hình Phường Thủ Dầu Một
  router.post('/entries', requireApiRoles(...EDITOR_ROLES), (req, res, next) => {
    try {
      ensureHcmSeeded(dbPath);
      const db = getSqliteDb(dbPath);
      const sectionRaw = String(req.body?.section || 'MODEL').toUpperCase();
      const section: HcmSection = (['MILESTONE', 'WORK', 'QUOTE', 'MODEL', 'NEWS'].includes(sectionRaw)
        ? sectionRaw
        : 'MODEL') as HcmSection;
      const title = String(req.body?.title || '').trim().slice(0, 300);
      if (!title) {
        return res.status(400).json({ success: false, error: 'Cần nhập tiêu đề hoặc nội dung chính.' });
      }
      const now = new Date().toISOString();
      const id = `hcm_${section.toLowerCase()}_${crypto.randomUUID().slice(0, 8)}`;
      const entry: HcmCulturalEntry = {
        id,
        section,
        title,
        subtitle: String(req.body?.subtitle || '').trim().slice(0, 200),
        location: String(req.body?.location || '').trim().slice(0, 200),
        summary: String(req.body?.summary || '').trim().slice(0, 6000),
        quote: String(req.body?.quote || '').trim().slice(0, 1000),
        imageUrl: String(req.body?.imageUrl || '').trim().slice(0, 300000),
        status: req.body?.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
        sortOrder: Number.isFinite(Number(req.body?.sortOrder)) ? Number(req.body.sortOrder) : 99,
        updatedByUid: req.apiActor?.uid || '',
        updatedAt: now,
      };

      db.prepare(
        `INSERT INTO hcm_cultural_entries (
           id, section, title, subtitle, location, summary, quote, image_url, status, sort_order, updated_by_uid, updated_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        entry.id,
        entry.section,
        entry.title,
        entry.subtitle,
        entry.location,
        entry.summary,
        entry.quote,
        entry.imageUrl,
        entry.status,
        entry.sortOrder,
        entry.updatedByUid || '',
        entry.updatedAt
      );

      res.json({ success: true, data: entry });
    } catch (err) {
      next(err);
    }
  });

  // 4. Chỉnh sửa mục trưng bày hoặc bài viết mô hình
  router.patch('/entries/:id', requireApiRoles(...EDITOR_ROLES), (req, res, next) => {
    try {
      ensureHcmSeeded(dbPath);
      const db = getSqliteDb(dbPath);
      const existingRow = db.prepare('SELECT * FROM hcm_cultural_entries WHERE id = ?').get(req.params.id) as
        | Record<string, any>
        | undefined;
      if (!existingRow) {
        return res.status(404).json({ success: false, error: 'Không tìm thấy mục cần sửa.' });
      }
      const current = rowToEntry(existingRow);
      const now = new Date().toISOString();
      const updated: HcmCulturalEntry = {
        ...current,
        title: typeof req.body?.title === 'string' && req.body.title.trim() ? req.body.title.trim().slice(0, 300) : current.title,
        subtitle: typeof req.body?.subtitle === 'string' ? req.body.subtitle.trim().slice(0, 200) : current.subtitle,
        location: typeof req.body?.location === 'string' ? req.body.location.trim().slice(0, 200) : current.location,
        summary: typeof req.body?.summary === 'string' ? req.body.summary.trim().slice(0, 6000) : current.summary,
        quote: typeof req.body?.quote === 'string' ? req.body.quote.trim().slice(0, 1000) : current.quote,
        imageUrl: typeof req.body?.imageUrl === 'string' ? req.body.imageUrl.trim().slice(0, 300000) : current.imageUrl,
        status: req.body?.status === 'DRAFT' ? 'DRAFT' : req.body?.status === 'PUBLISHED' ? 'PUBLISHED' : current.status,
        sortOrder: Number.isFinite(Number(req.body?.sortOrder)) ? Number(req.body.sortOrder) : current.sortOrder,
        updatedByUid: req.apiActor?.uid || current.updatedByUid,
        updatedAt: now,
      };

      db.prepare(
        `UPDATE hcm_cultural_entries
         SET title = ?, subtitle = ?, location = ?, summary = ?, quote = ?, image_url = ?,
             status = ?, sort_order = ?, updated_by_uid = ?, updated_at = ?
         WHERE id = ?`
      ).run(
        updated.title,
        updated.subtitle,
        updated.location,
        updated.summary,
        updated.quote,
        updated.imageUrl,
        updated.status,
        updated.sortOrder,
        updated.updatedByUid || '',
        updated.updatedAt,
        req.params.id
      );

      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  });

  // 5. Xóa mục trưng bày hoặc bài viết mô hình (Chỉ Cấp Phê duyệt / Quản trị viên)
  router.delete('/entries/:id', requireApiRoles(...APPROVER_ROLES), (req, res, next) => {
    try {
      ensureHcmSeeded(dbPath);
      const db = getSqliteDb(dbPath);
      const result = db.prepare('DELETE FROM hcm_cultural_entries WHERE id = ?').run(req.params.id);
      if (!result.changes) {
        return res.status(404).json({ success: false, error: 'Không tìm thấy mục cần xóa.' });
      }
      res.json({ success: true, deletedId: req.params.id });
    } catch (err) {
      next(err);
    }
  });

  // 6. Lưu Checklist Bộ 5 Tiêu chí Không gian Văn hóa HCM theo khu phố/chi bộ phường Thủ Dầu Một
  router.put('/checklist', requireApiRoles(...EDITOR_ROLES), (req, res, next) => {
    try {
      ensureHcmSeeded(dbPath);
      const db = getSqliteDb(dbPath);
      const unitName = String(req.body?.unitName || 'Đảng ủy phường Thủ Dầu Một').trim().slice(0, 120);
      const checkedMap = req.body?.checked && typeof req.body.checked === 'object' ? req.body.checked : {};
      const current = getHcmSpaceState(dbPath).checklist;
      const nextChecklist: HcmChecklistMap = {
        ...current,
        [unitName]: checkedMap,
      };
      const now = new Date().toISOString();
      db.prepare(`INSERT OR REPLACE INTO workspace_meta (key, value, updated_at) VALUES (?, ?, ?)`).run(
        CHECKLIST_META_KEY,
        JSON.stringify(nextChecklist),
        now
      );
      res.json({ success: true, data: nextChecklist });
    } catch (err) {
      next(err);
    }
  });

  // 7. Kết nối trực tiếp nguồn tin Không gian văn hóa HCM từ Cổng TTĐT TP.HCM (hochiminhcity.gov.vn)
  router.get('/portal-feed', requireApiRoles('owner', 'admin', 'manager', 'leader', 'staff', 'member', 'viewer'), async (req, res, next) => {
    try {
      const rawChannel = String(req.query?.channel || 'tin-tuc').trim() as PortalChannelKey;
      const channel: PortalChannelKey = rawChannel in PORTAL_CHANNELS ? rawChannel : 'tin-tuc';
      const forceRefresh = req.query?.refresh === '1' || req.query?.refresh === 'true';
      const result = await fetchPortalFeed(channel, forceRefresh);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  });

  // 8. Đọc toàn văn & ảnh minh họa một bài viết chính thống trên hochiminhcity.gov.vn
  router.get('/portal-article', requireApiRoles('owner', 'admin', 'manager', 'leader', 'staff', 'member', 'viewer'), async (req, res, next) => {
    try {
      const articlePath = String(req.query?.path || '').trim();
      if (!isValidPortalArticlePath(articlePath)) {
        return res.status(400).json({
          success: false,
          error: 'Đường dẫn bài viết không hợp lệ (chỉ chấp nhận /web/hcm/... trên hochiminhcity.gov.vn).',
        });
      }
      const detail = await fetchPortalArticleDetail(articlePath);
      res.json({ success: true, data: detail });
    } catch (err) {
      next(err);
    }
  });

  // =========================================================================
  // V2 — KIẾN TRÚC 3 CẤP, QUẢN TRỊ 10 PHÂN HỆ CMS, RBAC & KIỂM CHỨNG NGUỒN
  // =========================================================================
  const ALL_READ_ROLES = ['owner', 'admin', 'manager', 'leader', 'verifier', 'staff', 'member', 'viewer'] as const;

  router.get('/v2/overview', requireApiRoles(...ALL_READ_ROLES), (req, res, next) => {
    try {
      ensureHcmV2Initialized(dbPath);
      const actor = extractActor(req);
      const isContributor = ['owner', 'admin', 'manager', 'leader', 'verifier', 'staff', 'member'].includes(actor.role);
      const allDossiers = listDossiers({}, dbPath);
      const visibleDossiers = isContributor ? allDossiers : allDossiers.filter((d) => d.publishStatus === 'PUBLISHED');

      res.json({
        success: true,
        data: {
          actor,
          canContribute: isContributor,
          canApprove: HCM_APPROVER_ROLES.has(actor.role),
          categories: listCategories(dbPath),
          topics: listTopics(dbPath),
          tours: listTours(dbPath),
          dossiers: visibleDossiers,
          sources: isContributor ? listSources(dbPath) : [],
          syncLogs: isContributor ? listSyncLogs(25, dbPath) : [],
          editorialLogs: isContributor ? listEditorialLogs(40, dbPath) : [],
          audit: runInventoryAudit(dbPath),
        },
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/v2/dossiers/:id', requireApiRoles(...ALL_READ_ROLES), (req, res, next) => {
    try {
      const result = getDossierWithVersions(req.params.id, dbPath);
      if (!result) return res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ.' });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  });

  router.post('/v2/dossiers', requireApiRoles(...EDITOR_ROLES), (req, res, next) => {
    try {
      const actor = extractActor(req);
      const created = createOrUpdateDossier(req.body || {}, actor, dbPath);
      res.json({ success: true, data: created });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Dữ liệu hồ sơ không hợp lệ.' });
    }
  });

  router.patch('/v2/dossiers/:id', requireApiRoles(...EDITOR_ROLES), (req, res, next) => {
    try {
      const actor = extractActor(req);
      const updated = createOrUpdateDossier({ ...req.body, id: req.params.id }, actor, dbPath);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Không cập nhật được hồ sơ.' });
    }
  });

  router.post('/v2/dossiers/:id/workflow', requireApiRoles(...EDITOR_ROLES, 'verifier'), (req, res) => {
    const actor = extractActor(req);
    const action = String(req.body?.action || '').toUpperCase() as
      | 'SUBMIT_REVIEW'
      | 'VERIFY'
      | 'FLAG_NEEDS_VERIFICATION'
      | 'REJECT'
      | 'PUBLISH'
      | 'ARCHIVE';
    if (!['SUBMIT_REVIEW', 'VERIFY', 'FLAG_NEEDS_VERIFICATION', 'REJECT', 'PUBLISH', 'ARCHIVE'].includes(action)) {
      return res.status(400).json({ success: false, error: 'Hành động workflow không hợp lệ.' });
    }
    if (action !== 'SUBMIT_REVIEW' && !HCM_APPROVER_ROLES.has(actor.role)) {
      return res.status(403).json({
        success: false,
        error: 'Không đủ thẩm quyền: chỉ Người kiểm chứng / Phê duyệt mới được xác minh, xuất bản hoặc lưu trữ.',
      });
    }
    try {
      const updated = transitionDossierWorkflow(
        req.params.id,
        action,
        actor,
        String(req.body?.note || ''),
        dbPath
      );
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Chuyển trạng thái thất bại.' });
    }
  });

  router.post('/v2/dossiers/:id/rollback', requireApiRoles('owner', 'admin', 'manager', 'leader', 'verifier'), (req, res) => {
    const actor = extractActor(req);
    const versionNum = Number(req.body?.versionNum);
    if (!Number.isFinite(versionNum) || versionNum < 1) {
      return res.status(400).json({ success: false, error: 'Số phiên bản cần khôi phục không hợp lệ.' });
    }
    try {
      const restored = rollbackDossierVersion(req.params.id, versionNum, actor, dbPath);
      res.json({ success: true, data: restored });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Khôi phục thất bại.' });
    }
  });

  router.post('/v2/dossiers/:id/enrich-draft', requireApiRoles(...EDITOR_ROLES), (req, res) => {
    try {
      const actor = extractActor(req);
      const draft = proposeEnrichmentDraftForDossier(req.params.id, actor, dbPath);
      res.json({ success: true, data: draft });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Không tạo được bản nháp đề xuất.' });
    }
  });

  router.put('/v2/sources/:id', requireApiRoles('owner', 'admin', 'manager', 'leader', 'verifier'), (req, res) => {
    try {
      const updated = updateSourceConfig(req.params.id, req.body || {}, dbPath);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Không cập nhật được cấu hình nguồn.' });
    }
  });

  router.post('/v2/sources/sync', requireApiRoles(...EDITOR_ROLES, 'verifier'), async (req, res, next) => {
    try {
      const actor = extractActor(req);
      const sourceId = req.body?.sourceId ? String(req.body.sourceId) : '';
      const force = Boolean(req.body?.force) && HCM_APPROVER_ROLES.has(actor.role);
      const targets = sourceId
        ? listSources(dbPath).filter((s) => s.id === sourceId && s.isEnabled)
        : listSources(dbPath).filter((s) => s.isEnabled);
      const logs = [];
      for (const s of targets) {
        logs.push(await syncOfficialSourceToDrafts(s.id, actor, force, dbPath));
      }
      res.json({ success: true, data: { logs, sources: listSources(dbPath) } });
    } catch (err) {
      next(err);
    }
  });

  // =========================================================================
  // XÁC THỰC MÁY CHỦ QUẢN LÝ (SERVER-SIDE AUTHENTICATION & SESSIONS)
  // =========================================================================
  router.post('/auth/login', (req, res) => {
    const email = String(req.body?.email || '');
    const password = String(req.body?.password || '');
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Vui lòng cung cấp email và mật khẩu.' });
    }
    const result = authenticateUser(email, password);
    if (!result) {
      return res.status(401).json({ success: false, error: 'Email hoặc mật khẩu không chính xác.' });
    }
    res.json({ success: true, data: result });
  });

  router.post('/auth/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      revokeSession(authHeader.slice(7).trim());
    }
    res.json({ success: true, message: 'Đã đăng xuất phiên làm việc.' });
  });

  router.get('/auth/me', (req, res) => {
    const actor = getEffectiveActor(req);
    res.json({ success: true, data: actor });
  });

  // =========================================================================
  // TIẾP NHẬN GÓP Ý & ĐỀ NGHỊ ĐÍNH CHÍNH TỪ BẠN ĐỌC (CITIZEN CORRECTIONS)
  // =========================================================================
  router.post('/corrections', (req, res) => {
    // Chống gửi rác: kiểm tra honeypot `website` (nếu có nội dung -> spam bot)
    if (req.body?.website) {
      return res.status(400).json({ success: false, error: 'Yêu cầu không hợp lệ.' });
    }
    const description = String(req.body?.description || '').trim();
    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng mô tả chi tiết nội dung cần góp ý hoặc đính chính (tối thiểu 10 ký tự).',
      });
    }

    try {
      const created = createCorrectionRequest(
        {
          targetId: req.body?.targetId || '',
          targetTitle: req.body?.targetTitle || 'Tư liệu chung',
          targetType: req.body?.targetType || 'DOSSIER',
          issueType: req.body?.issueType || 'FACT',
          description,
          evidenceUrl: req.body?.evidenceUrl || '',
          contactInfo: req.body?.contactInfo || '',
        },
        dbPath
      );
      res.json({
        success: true,
        data: created,
        message: 'Đã tiếp nhận đề nghị đính chính. Ban biên tập & thẩm định sẽ tiến hành đối chiếu theo quy trình.',
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không thể lưu đề nghị đính chính.' });
    }
  });

  router.get('/corrections', requireApiRoles(...VERIFIER_ROLES), (req, res) => {
    try {
      const status = req.query.status ? String(req.query.status) : undefined;
      const list = listCorrections(status, dbPath);
      res.json({ success: true, data: list });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không lấy được danh sách góp ý.' });
    }
  });

  router.patch('/corrections/:id', requireApiRoles(...VERIFIER_ROLES), (req, res) => {
    try {
      const actor = extractActor(req);
      const status = req.body?.status;
      if (!['RECEIVED', 'VERIFYING', 'RESOLVED', 'NEED_MORE_INFO', 'REJECTED'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Trạng thái xử lý không hợp lệ.' });
      }
      const updated = updateCorrectionStatus(
        req.params.id,
        {
          status,
          adminNotes: req.body?.adminNotes,
        },
        actor,
        dbPath
      );
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err?.message || 'Không cập nhật được trạng thái xử lý.' });
    }
  });

  // =========================================================================
  // NHẬT KÝ THẨM ĐỊNH & KIỂM TOÁN HỆ THỐNG AN TOÀN (AUDIT LOGS)
  // =========================================================================
  router.get('/audit-logs', requireApiRoles(...APPROVER_ROLES), (req, res) => {
    try {
      const limit = Math.min(100, Math.max(10, Number(req.query.limit) || 40));
      const logs = listEditorialLogs(limit, dbPath);
      res.json({
        success: true,
        data: logs.map((l) => ({
          ...l,
          note: sanitizeAuditPayload(l.note),
        })),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không lấy được nhật ký kiểm toán.' });
    }
  });

  // =========================================================================
  // BỘ ĐẾM LƯỢT TRUY CẬP VÀ NGƯỜI DÙNG ĐANG ONLINE (VISITOR & ONLINE STATS)
  // =========================================================================
  router.get('/visitor/stats', (_req, res) => {
    try {
      const stats = getVisitorStats(dbPath);
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không thể lấy số liệu thống kê truy cập.' });
    }
  });

  router.post(['/visitor/ping', '/visitor/heartbeat'], (req, res) => {
    try {
      const sessionId = req.body?.sessionId ? String(req.body.sessionId).slice(0, 100) : undefined;
      const isNewVisit = Boolean(req.body?.isNewVisit);
      const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').slice(0, 50);
      const stats = recordVisitorPing({ sessionId, isNewVisit, ip }, dbPath);
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không thể ghi nhận lượt truy cập.' });
    }
  });

  router.post('/visitor/reset', (_req, res) => {
    try {
      const stats = resetVisitorStats(dbPath);
      res.json({ success: true, data: stats, message: 'Đã đặt lại số liệu thống kê truy cập theo số phiên thực tế.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không thể đặt lại số liệu thống kê.' });
    }
  });

  router.post('/visitor/set', (req, res) => {
    try {
      const { todayVisits, thisMonthVisits, totalVisits } = req.body || {};
      const stats = setVisitorStats({ todayVisits, thisMonthVisits, totalVisits }, dbPath);
      res.json({ success: true, data: stats, message: 'Đã cập nhật mốc số liệu thống kê thành công.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || 'Không thể cập nhật mốc số liệu.' });
    }
  });

  return router;
}

/** Tác vụ nền kiểm tra định kỳ các nguồn chính thống theo lịch Hằng ngày / Hằng tuần */
export function startHcmSourceScheduler(dbPath?: string): ReturnType<typeof setInterval> {
  const runTick = async () => {
    try {
      const sources = listSources(dbPath).filter((s) => s.isEnabled && s.scheduleFreq !== 'MANUAL');
      const nowMs = Date.now();
      const systemActor: HcmActor = { uid: 'scheduler', name: 'Tác vụ Đồng bộ Tự động', role: 'staff' };
      for (const s of sources) {
        const intervalHours = s.scheduleFreq === 'DAILY' ? 24 : 24 * 7;
        const elapsedHours = s.lastCheckedAt ? (nowMs - Date.parse(s.lastCheckedAt)) / 3600000 : Infinity;
        if (elapsedHours >= intervalHours) {
          await syncOfficialSourceToDrafts(s.id, systemActor, false, dbPath);
        }
      }
    } catch {
      /* background check errors are captured in sync logs */
    }
  };
  return setInterval(() => void runTick(), 6 * 60 * 60 * 1000);
}
