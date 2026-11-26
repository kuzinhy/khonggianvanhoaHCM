export type HcmSection = 'MILESTONE' | 'WORK' | 'QUOTE' | 'MODEL' | 'NEWS';

export interface HcmSpaceSettingsDto {
  title: string;
  badgeText: string;
  unitText: string;
  description: string;
  updatedAt?: string;
}

export interface HcmCulturalEntryDto {
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

export type HcmChecklistMap = Record<string, Record<string, boolean>>;

const LOCAL_CACHE_KEY = 'HCM_CULTURAL_SPACE_THU_DAU_MOT_V1';
const LOCAL_CHECKLIST_KEY = 'HCM_CULTURAL_CHECKLIST_TDM_V1';

export const DEFAULT_LOCAL_SETTINGS: HcmSpaceSettingsDto = {
  title: 'Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một',
  badgeText: 'Đảng ủy Phường Thủ Dầu Một · Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW',
  unitText: 'Ban Tuyên giáo & Dân vận Đảng ủy phường Thủ Dầu Một',
  description:
    'Không gian số trưng bày di sản tư tưởng, đạo đức, phong cách Hồ Chí Minh và các mô hình tiêu biểu do Đảng ủy phường Thủ Dầu Một trực tiếp biên tập, quản trị.',
};

export const DEFAULT_LOCAL_ITEMS: HcmCulturalEntryDto[] = [
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
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
    updatedAt: '',
  },
  {
    id: 'model_tdm_tu_sach_qr',
    section: 'MODEL',
    title: 'Mô hình Tủ sách Bác Hồ số & Bản tin sinh hoạt chi bộ qua mã QR',
    subtitle: 'Ban Tuyên giáo Đảng ủy & 26 Chi bộ cơ sở',
    location: '26 Chi bộ trực thuộc Phường Thủ Dầu Một',
    summary:
      'Triển khai bảng mã QR tra cứu 15 tập Hồ Chí Minh Toàn tập, tài liệu học tập Chỉ thị 07-CT/TW (thay thế Chỉ thị 05-CT/TW) và Quy định 144-QĐ/TW tại văn phòng 26 chi bộ, điểm sinh hoạt khu phố và trường học trên địa bàn.',
    quote: '"Học để làm việc, làm người, làm cán bộ. Học để phụng sự Đoàn thể, giai cấp và nhân dân, Tổ quốc và nhân loại." — Hồ Chí Minh',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sortOrder: 1,
    updatedAt: '2026-11-20T08:00:00Z',
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
    updatedAt: '2026-11-21T09:30:00Z',
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
    updatedAt: '2026-11-22T10:15:00Z',
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
    updatedAt: '2026-11-22T14:00:00Z',
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
    updatedAt: '2026-11-23T08:30:00Z',
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
    updatedAt: '2026-11-23T09:00:00Z',
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
    updatedAt: '2026-11-23T10:00:00Z',
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
    updatedAt: '2026-11-20T15:30:00Z',
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
    updatedAt: '2026-11-15T09:00:00Z',
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
    updatedAt: '2026-11-10T08:00:00Z',
  },
];

function readLocalCache(): { settings: HcmSpaceSettingsDto; items: HcmCulturalEntryDto[] } {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.settings && Array.isArray(parsed.items)) {
        return parsed;
      }
    }
  } catch {}
  return { settings: DEFAULT_LOCAL_SETTINGS, items: DEFAULT_LOCAL_ITEMS };
}

function writeLocalCache(data: { settings: HcmSpaceSettingsDto; items: HcmCulturalEntryDto[] }) {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
  } catch {}
}

export async function fetchHcmSpaceState(): Promise<{
  settings: HcmSpaceSettingsDto;
  items: HcmCulturalEntryDto[];
  checklist: HcmChecklistMap;
  syncedFromServer: boolean;
}> {
  let localChecklist: HcmChecklistMap = {};
  try {
    localChecklist = JSON.parse(localStorage.getItem(LOCAL_CHECKLIST_KEY) || '{}');
  } catch {}

  try {
    const res = await fetch('/api/hcm-space');
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json.data) {
        writeLocalCache(json.data);
        if (json.data.checklist) {
          try {
            localStorage.setItem(LOCAL_CHECKLIST_KEY, JSON.stringify(json.data.checklist));
          } catch {}
        }
        return { checklist: json.data.checklist || localChecklist, ...json.data, syncedFromServer: true };
      }
    }
  } catch {}
  const local = readLocalCache();
  return { ...local, checklist: localChecklist, syncedFromServer: false };
}

export async function saveHcmChecklist(
  unitName: string,
  checked: Record<string, boolean>
): Promise<{ data: HcmChecklistMap; syncedFromServer: boolean }> {
  let current: HcmChecklistMap = {};
  try {
    current = JSON.parse(localStorage.getItem(LOCAL_CHECKLIST_KEY) || '{}');
  } catch {}
  const fallbackNext = { ...current, [unitName]: checked };

  try {
    const res = await fetch('/api/hcm-space/checklist', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unitName, checked }),
    });
    if (res.ok) {
      const json = await res.json();
      try {
        localStorage.setItem(LOCAL_CHECKLIST_KEY, JSON.stringify(json.data));
      } catch {}
      return { data: json.data, syncedFromServer: true };
    }
  } catch {}
  try {
    localStorage.setItem(LOCAL_CHECKLIST_KEY, JSON.stringify(fallbackNext));
  } catch {}
  return { data: fallbackNext, syncedFromServer: false };
}

export async function saveHcmSpaceSettings(
  settings: Partial<HcmSpaceSettingsDto>
): Promise<{ data: HcmSpaceSettingsDto; syncedFromServer: boolean }> {
  try {
    const res = await fetch('/api/hcm-space/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      const json = await res.json();
      const cache = readLocalCache();
      writeLocalCache({ ...cache, settings: json.data });
      return { data: json.data, syncedFromServer: true };
    }
  } catch {}
  const cache = readLocalCache();
  const next = { ...cache.settings, ...settings, updatedAt: new Date().toISOString() };
  writeLocalCache({ ...cache, settings: next });
  return { data: next, syncedFromServer: false };
}

export async function createHcmEntry(
  payload: Omit<HcmCulturalEntryDto, 'id' | 'updatedAt' | 'updatedByUid'>
): Promise<{ data: HcmCulturalEntryDto; syncedFromServer: boolean }> {
  try {
    const res = await fetch('/api/hcm-space/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const json = await res.json();
      const cache = readLocalCache();
      writeLocalCache({ ...cache, items: [...cache.items, json.data] });
      return { data: json.data, syncedFromServer: true };
    }
  } catch {}
  const cache = readLocalCache();
  const localItem: HcmCulturalEntryDto = {
    ...payload,
    id: `local_${payload.section.toLowerCase()}_${Date.now()}`,
    updatedAt: new Date().toISOString(),
  };
  writeLocalCache({ ...cache, items: [...cache.items, localItem] });
  return { data: localItem, syncedFromServer: false };
}

export async function updateHcmEntry(
  id: string,
  patch: Partial<Omit<HcmCulturalEntryDto, 'id' | 'section'>>
): Promise<{ data: HcmCulturalEntryDto; syncedFromServer: boolean }> {
  try {
    const res = await fetch(`/api/hcm-space/entries/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const json = await res.json();
      const cache = readLocalCache();
      writeLocalCache({
        ...cache,
        items: cache.items.map((it) => (it.id === id ? json.data : it)),
      });
      return { data: json.data, syncedFromServer: true };
    }
  } catch {}
  const cache = readLocalCache();
  let updatedItem: HcmCulturalEntryDto | undefined;
  const nextItems = cache.items.map((it) => {
    if (it.id !== id) return it;
    updatedItem = { ...it, ...patch, updatedAt: new Date().toISOString() };
    return updatedItem;
  });
  writeLocalCache({ ...cache, items: nextItems });
  return { data: updatedItem!, syncedFromServer: false };
}

export async function deleteHcmEntry(id: string): Promise<{ syncedFromServer: boolean }> {
  try {
    const res = await fetch(`/api/hcm-space/entries/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const cache = readLocalCache();
      writeLocalCache({ ...cache, items: cache.items.filter((it) => it.id !== id) });
      return { syncedFromServer: true };
    }
  } catch {}
  const cache = readLocalCache();
  writeLocalCache({ ...cache, items: cache.items.filter((it) => it.id !== id) });
  return { syncedFromServer: false };
}

export type PortalChannelKey = 'tin-tuc' | 'guong-dien-hinh' | 'tu-tuong' | 'the-gioi';

export interface PortalFeedArticleDto {
  id: string;
  channel: PortalChannelKey;
  channelLabel: string;
  date: string;
  title: string;
  snippet: string;
  imageUrl: string;
  articlePath: string;
  articleUrl: string;
}

export interface PortalFeedResponseDto {
  connected: boolean;
  channel: { key: PortalChannelKey; label: string; url: string };
  fetchedAt: string;
  fromCache: boolean;
  articles: PortalFeedArticleDto[];
  error?: string;
}

export interface PortalArticleDetailDto {
  title: string;
  publishedAt: string;
  summary: string;
  paragraphs: string[];
  images: Array<{ url: string; caption: string }>;
  sourceUrl: string;
}

export async function fetchHcmPortalFeed(
  channel: PortalChannelKey = 'tin-tuc',
  refresh = false
): Promise<PortalFeedResponseDto> {
  const qs = new URLSearchParams({ channel, ...(refresh ? { refresh: '1' } : {}) });
  try {
    const res = await fetch(`/api/hcm-space/portal-feed?${qs.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json.data) return json.data;
    }
  } catch {}
  return {
    connected: false,
    channel: {
      key: channel,
      label: 'Cổng TTĐT hochiminhcity.gov.vn',
      url: 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa',
    },
    fetchedAt: new Date().toISOString(),
    fromCache: false,
    articles: [],
    error: 'Không kết nối được máy chủ cục bộ để tải nguồn tin trực tuyến.',
  };
}

export async function fetchHcmPortalArticle(articlePath: string): Promise<PortalArticleDetailDto | null> {
  try {
    const res = await fetch(`/api/hcm-space/portal-article?path=${encodeURIComponent(articlePath)}`);
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json.data) return json.data;
    }
  } catch {}
  return null;
}

// =========================================================================
// FANPAGE "ĐẤT THỦ QUÊ HƯƠNG TÔI" (FACEBOOK GRAPH API & FEED CLIENT)
// =========================================================================
export interface FanpageConfigDto {
  name: string;
  handle: string;
  url: string;
  description: string;
  pageId?: string;
  hasToken?: boolean;
  tokenPreview?: string;
  avatarUrl?: string;
  followersCount?: number;
  status?: 'CONNECTED' | 'NOT_CONFIGURED' | 'ERROR';
  errorMessage?: string;
}

export interface FanpageConnectionStatusDto {
  pageConfig: FanpageConfigDto;
  autoSyncActive: boolean;
  lastSyncedAt: string;
  totalItems: number;
  fanpageItems: number;
  manualItems: number;
  isConfigured: boolean;
}

export async function fetchFanpageStatus(): Promise<FanpageConnectionStatusDto | null> {
  try {
    const res = await fetch('/api/hcm-space/fanpage-dat-thu/status');
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json.data) return json.data;
    }
  } catch {}
  return null;
}

export async function saveFanpageCredentials(payload: {
  pageId: string;
  accessToken: string;
  pageName?: string;
  pageUrl?: string;
}): Promise<{ success: boolean; message: string; config?: any; error?: string }> {
  try {
    const res = await fetch('/api/hcm-space/fanpage-dat-thu/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    return { success: false, message: 'Lỗi mạng khi kết nối máy chủ', error: err?.message || String(err) };
  }
}

export async function syncFanpageFeed(): Promise<{
  success: boolean;
  syncedCount: number;
  message: string;
  lastSyncedAt: string;
  isLiveMetaApi?: boolean;
}> {
  try {
    const res = await fetch('/api/hcm-space/fanpage-dat-thu/sync', { method: 'POST' });
    const json = await res.json();
    return json;
  } catch (err: any) {
    return {
      success: false,
      syncedCount: 0,
      message: err?.message || 'Không thể đồng bộ từ Fanpage lúc này',
      lastSyncedAt: new Date().toISOString(),
    };
  }
}

export async function fetchFanpageArticles(): Promise<any[]> {
  try {
    const res = await fetch('/api/hcm-space/fanpage-dat-thu/items');
    if (res.ok) {
      const json = await res.json();
      if (json?.success && Array.isArray(json.data)) return json.data;
    }
  } catch {}
  return [];
}

// =========================================================================
// V2 — 3-TIER ARCHIVE & 10-MODULE CMS CLIENT
// =========================================================================
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

export interface HcmCategoryDto {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
}

export interface HcmTopicDto {
  id: string;
  categoryId: string;
  title: string;
  audienceTag: string;
  eraRange: string;
  description: string;
  sortOrder: number;
}

export interface HcmDossierDto {
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

export interface HcmDossierVersionDto {
  id: string;
  dossierId: string;
  versionNum: number;
  snapshot: HcmDossierDto;
  changeNote: string;
  actorUid: string;
  actorName: string;
  createdAt: string;
}

export interface HcmSourceDto {
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

export interface HcmSyncLogDto {
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

export interface HcmEditorialLogDto {
  id: string;
  dossierId: string;
  action: string;
  actorUid: string;
  actorName: string;
  actorRole: string;
  note: string;
  createdAt: string;
}

export interface HcmTourDto {
  id: string;
  title: string;
  audience: string;
  description: string;
  durationLabel: string;
  dossierIds: string[];
  isPublished: boolean;
  sortOrder: number;
}

export interface HcmInventoryAuditDto {
  totalDossiers: number;
  byPublishStatus: Record<string, number>;
  byVerificationStatus: Record<string, number>;
  byType: Record<string, number>;
  missingSourceCount: number;
  aiDraftCount: number;
  duplicateCount: number;
  duplicatePairs: Array<{ dossierId: string; title: string; duplicateOfId: string; targetTitle: string; similarity: number }>;
  incompleteDossiers: Array<{ id: string; title: string; missingFields: string[] }>;
}

export interface HcmV2OverviewDto {
  actor: { uid: string; name: string; role: string };
  canContribute: boolean;
  canApprove: boolean;
  categories: HcmCategoryDto[];
  topics: HcmTopicDto[];
  tours: HcmTourDto[];
  dossiers: HcmDossierDto[];
  sources: HcmSourceDto[];
  syncLogs: HcmSyncLogDto[];
  editorialLogs: HcmEditorialLogDto[];
  audit: HcmInventoryAuditDto;
}

async function callV2Json<T>(url: string, init?: RequestInit): Promise<T> {
  const token = getHcmAuthToken();
  const headers = new Headers(init?.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, { ...init, headers });
  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.error || `HTTP ${res.status}`);
  }
  return json.data as T;
}

function buildStaticV2OverviewFallback(): HcmV2OverviewDto {
  const categories: HcmCategoryDto[] = [
    { id: 'cat_bio', slug: 'cuoc-doi-su-nghiep', title: 'Cuộc đời & Sự nghiệp', description: '06 chương tiểu sử và 30 mốc biên niên lịch sử chuẩn xác.', iconName: 'History', sortOrder: 1, isActive: true },
    { id: 'cat_works', slug: 'tac-pham-loi-day', title: 'Tác phẩm & Lời Bác dạy', description: '15 tập Hồ Chí Minh Toàn tập, tác phẩm kinh điển và trích dẫn xác thực.', iconName: 'BookMarked', sortOrder: 2, isActive: true },
    { id: 'cat_exhibit', slug: 'bao-tang-trung-bay', title: 'Bảo tàng & Hiện vật Số', description: '08 gian trưng bày hiện vật, di tích quốc gia và không gian 3D.', iconName: 'Landmark', sortOrder: 3, isActive: true },
    { id: 'cat_world', slug: 'dau-chan-quoc-te', title: 'Dấu chân Người & Thế giới', description: 'Hành trình 30 năm tìm đường cứu nước qua 20 tọa độ lịch sử.', iconName: 'Compass', sortOrder: 4, isActive: true },
    { id: 'cat_media', slug: 'kho-anh-clip-audio', title: 'Ảnh, Clip & Âm thanh Di sản', description: 'Phim tài liệu VTV24, trình chiếu lịch sử, bản ghi âm và phóng sự ảnh.', iconName: 'Film', sortOrder: 5, isActive: true },
    { id: 'cat_local', slug: 'thu-dau-mot-thuc-tien', title: 'Tin tức & Mô hình Thủ Dầu Một', description: 'Hoạt động chi bộ, Dân vận khéo, di tích và mô hình tại phường Thủ Dầu Một.', iconName: 'Award', sortOrder: 6, isActive: true },
    { id: 'cat_ideology', slug: 'tu-tuong-quy-dinh-144', title: 'Tư tưởng, Đạo đức & Học tập', description: 'Chỉ thị 07-CT/TW, Quy định 144-QĐ/TW và chuyên đề rèn luyện cán bộ.', iconName: 'ShieldCheck', sortOrder: 7, isActive: true },
  ];
  const topics: HcmTopicDto[] = [
    { id: 'top_niên_thieu', categoryId: 'cat_bio', title: 'Thời niên thiếu & Khởi đầu cứu nước (1890–1920)', audienceTag: 'Học sinh & Đoàn viên', eraRange: '1890–1920', description: 'Quê hương Hoàng Trù – Làng Sen, Huế, Dục Thanh và Bến Nhà Rồng 1911.', sortOrder: 1 },
    { id: 'top_lap_dang', categoryId: 'cat_bio', title: 'Sáng lập Đảng & Cách mạng Tháng Tám (1920–1945)', audienceTag: 'Cán bộ & Đảng viên', eraRange: '1920–1945', description: 'Quảng Châu, Hương Cảng 1930, Pác Bó 1941 và Tuyên ngôn Độc lập 1945.', sortOrder: 2 },
    { id: 'top_khang_chien', categoryId: 'cat_bio', title: 'Kháng chiến Kiến quốc & Di chúc 1969 (1945–1969)', audienceTag: 'Toàn dân', eraRange: '1945–1969', description: 'Điện Biên Phủ, Nhà sàn Phủ Chủ tịch và Di chúc thiêng liêng.', sortOrder: 3 },
    { id: 'top_toan_tap', categoryId: 'cat_works', title: 'Tủ sách Hồ Chí Minh Toàn tập (NXB CTQG Sự thật)', audienceTag: 'Nghiên cứu', eraRange: '1912–1969', description: 'Bộ 15 tập tác phẩm, thư từ, bài nói và bài viết gốc.', sortOrder: 4 },
    { id: 'top_di_tich', categoryId: 'cat_exhibit', title: 'Bảo tàng Hồ Chí Minh & Di tích Cách mạng', audienceTag: 'Tham quan phổ thông', eraRange: '1911–Nay', description: 'Bến Nhà Rồng, Nhà sàn, Bảo tàng HCM và Di tích Nhà tù Phú Lợi.', sortOrder: 5 },
    { id: 'top_quoc_te', categoryId: 'cat_world', title: 'Hành trình 5 Châu & UNESCO Tôn vinh', audienceTag: 'Đoàn viên & Nghiên cứu', eraRange: '1911–1987', description: '20 tọa độ toàn cầu và Nghị quyết UNESCO 24C/18.65.', sortOrder: 6 },
    { id: 'top_phim_audio', categoryId: 'cat_media', title: 'Kho Tư liệu Nghe – Nhìn Lịch sử', audienceTag: 'Tham quan phổ thông', eraRange: '1945–Nay', description: 'Clip VTV24 xác thực, bản ghi âm Đài Tiếng nói Việt Nam.', sortOrder: 7 },
    { id: 'top_tdm_news', categoryId: 'cat_local', title: 'Hoạt động Đảng bộ & Khu phố Thủ Dầu Một', audienceTag: 'Cán bộ & Nhân dân', eraRange: '2024–Nay', description: 'Tin tức sinh hoạt 26 chi bộ, Hoa viên Bạch Đằng và mô hình cơ sở.', sortOrder: 8 },
    { id: 'top_144', categoryId: 'cat_ideology', title: 'Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW', audienceTag: 'Cán bộ & Đảng viên', eraRange: '2024–Nay', description: '5 chuẩn mực đạo đức cách mạng trong giai đoạn mới.', sortOrder: 9 },
    { id: 'top_nhan_vat', categoryId: 'cat_bio', title: 'Nhân vật Lịch sử & Đồng chí Gắn bó với Bác', audienceTag: 'Nghiên cứu', eraRange: '1911–1969', description: 'Chủ tịch Tôn Đức Thắng, các bậc tiền bối và đồng bào Nam Bộ.', sortOrder: 10 },
  ];
  const baseMeta = {
    collectedAt: '2026-11-23T08:00:00Z',
    verifiedAt: '2026-11-23T08:00:00Z',
    verificationStatus: 'VERIFIED' as const,
    publishStatus: 'PUBLISHED' as const,
    createdBy: 'system-seed',
    updatedBy: 'system-seed',
    verifiedBy: 'Ban Biên tập Tuyên giáo',
    approvedBy: 'Đảng ủy Phường Thủ Dầu Một',
    version: 1,
    isAiDraft: false,
    duplicateOfId: '',
    missingFields: [],
    createdAt: '2026-11-23T08:00:00Z',
    updatedAt: '2026-11-23T08:00:00Z',
  };
  const dossiers: HcmDossierDto[] = [
    {
      ...baseMeta,
      id: 'dos_ev_1911',
      title: 'Nguyễn Tất Thành rời Bến Nhà Rồng ra đi tìm đường cứu nước (05/6/1911)',
      dossierType: 'EVENT',
      categoryIds: ['cat_bio', 'cat_world'],
      topicId: 'top_niên_thieu',
      tags: ['Bến Nhà Rồng', '1911', 'Tìm đường cứu nước'],
      audiences: ['Tham quan phổ thông', 'Đoàn viên & Học sinh', 'Cán bộ & Đảng viên'],
      summary: 'Ngày 05/6/1911, từ cảng Nhà Rồng (Sài Gòn), người thanh niên Nguyễn Tất Thành với tên Văn Ba lên tàu Amiral Latouche-Tréville bắt đầu hành trình 30 năm tìm đường cứu nước.',
      content: 'Sự kiện mở đầu chặng đường lịch sử 30 năm bôn ba qua nhiều châu lục để tìm con đường giải phóng dân tộc.',
      timelineDate: '05/06/1911',
      location: 'Bến Nhà Rồng, Sài Gòn',
      imageUrl: '/assets/hcm-space/nha-rong.jpg',
      imageCaption: 'Bảo tàng Hồ Chí Minh — Chi nhánh TP.HCM (Bến Nhà Rồng).',
      sourceName: 'Cổng TTĐT TP.HCM — Cuộc đời, Sự nghiệp Hồ Chí Minh',
      sourceUrl: 'https://hochiminhcity.gov.vn/cuoc-doi-su-nghiep',
      author: 'Ban Nghiên cứu Lịch sử Đảng',
      publisher: 'NXB Chính trị quốc gia Sự thật',
      publishYear: '2011',
      licenseInfo: 'Tư liệu lịch sử chính thống',
    },
    {
      ...baseMeta,
      id: 'dos_ev_1945',
      title: 'Đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa (02/9/1945)',
      dossierType: 'EVENT',
      categoryIds: ['cat_bio', 'cat_works'],
      topicId: 'top_lap_dang',
      tags: ['Ba Đình', '1945', 'Tuyên ngôn Độc lập'],
      audiences: ['Tham quan phổ thông', 'Cán bộ & Đảng viên', 'Đoàn viên & Học sinh'],
      summary: 'Tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh thay mặt Chính phủ Lâm thời đọc Tuyên ngôn Độc lập.',
      content: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do độc lập."',
      timelineDate: '02/09/1945',
      location: 'Quảng trường Ba Đình, Hà Nội',
      imageUrl: '/assets/hcm-space/ba-dinh-1945.jpg',
      imageCaption: 'Quảng trường Ba Đình lịch sử ngày 02/9/1945.',
      sourceName: 'Cổng Tư liệu Hồ Chí Minh (hochiminh.vn)',
      sourceUrl: 'https://hochiminh.vn',
      author: 'Chủ tịch Hồ Chí Minh',
      publisher: 'Hồ Chí Minh Toàn tập — Tập 4',
      publishYear: '1945',
      licenseInfo: 'Văn kiện lịch sử quốc gia',
    },
    {
      ...baseMeta,
      id: 'dos_work_dichuc',
      title: 'Di chúc của Chủ tịch Hồ Chí Minh (1965–1969) — Bảo vật Quốc gia',
      dossierType: 'WORK',
      categoryIds: ['cat_works', 'cat_ideology'],
      topicId: 'top_toan_tap',
      tags: ['Di chúc', 'Bảo vật Quốc gia', '1969'],
      audiences: ['Cán bộ & Đảng viên', 'Nghiên cứu', 'Tham quan phổ thông'],
      summary: 'Văn kiện lý luận – thực tiễn vô giá về xây dựng, chỉnh đốn Đảng, chăm lo đời sống nhân dân và bồi dưỡng thế hệ trẻ.',
      content: '"Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng."',
      timelineDate: '10/05/1969',
      location: 'Phủ Chủ tịch, Hà Nội',
      imageUrl: '/assets/hcm-space/di-chuc-1969.jpg',
      imageCaption: 'Bản thảo Di chúc Chủ tịch Hồ Chí Minh năm 1969.',
      sourceName: 'Bảo tàng Hồ Chí Minh & NXB CTQG Sự thật',
      sourceUrl: 'https://baotanghochiminh.vn',
      author: 'Chủ tịch Hồ Chí Minh',
      publisher: 'NXB Chính trị quốc gia Sự thật',
      publishYear: '1969',
      licenseInfo: 'Bảo vật Quốc gia (Quyết định 1426/QĐ-TTg)',
    },
    {
      ...baseMeta,
      id: 'dos_work_danvan',
      title: 'Tác phẩm "Dân vận" (Báo Sự Thật, 15/10/1949) — Kim chỉ nam phường Thủ Dầu Một',
      dossierType: 'WORK',
      categoryIds: ['cat_works', 'cat_local', 'cat_ideology'],
      topicId: 'top_tdm_news',
      tags: ['Dân vận khéo', 'Bút danh X.Y.Z', 'Thủ Dầu Một'],
      audiences: ['Cán bộ & Đảng viên', 'Nghiên cứu'],
      summary: 'Khẳng định bản chất "Nước ta là nước dân chủ — Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân."',
      content: 'Được Đảng ủy Phường Thủ Dầu Một lấy làm trọng tâm triển khai mô hình "Dân vận khéo" tại 26 chi bộ.',
      timelineDate: '15/10/1949',
      location: 'Chiến khu Việt Bắc',
      imageUrl: '/assets/hcm-space/dan-van-kheo.jpg',
      imageCaption: 'Hoạt động Dân vận khéo phục vụ nhân dân cơ sở.',
      sourceName: 'Báo Sự Thật — Hồ Chí Minh Toàn tập Tập 6',
      sourceUrl: 'https://dangcongsan.vn',
      author: 'Chủ tịch Hồ Chí Minh (X.Y.Z)',
      publisher: 'NXB Chính trị quốc gia Sự thật',
      publishYear: '1949',
      licenseInfo: 'Tác phẩm chính thống của Chủ tịch Hồ Chí Minh',
    },
    {
      ...baseMeta,
      id: 'dos_artifact_tdt',
      title: 'Tình đồng chí Bác Hồ – Bác Tôn & Không gian Văn hóa tại Bảo tàng Tôn Đức Thắng',
      dossierType: 'ARTIFACT',
      categoryIds: ['cat_exhibit', 'cat_bio'],
      topicId: 'top_nhan_vat',
      tags: ['Bác Hồ', 'Bác Tôn', 'Nam Bộ'],
      audiences: ['Tham quan phổ thông', 'Đoàn viên & Học sinh', 'Cán bộ & Đảng viên'],
      summary: 'Hiện vật và tư liệu khắc họa tình đồng chí thủy chung giữa Chủ tịch Hồ Chí Minh và Chủ tịch Tôn Đức Thắng.',
      content: 'Biểu tượng đoàn kết Bắc – Nam và cống hiến suốt đời vì độc lập dân tộc.',
      timelineDate: '1946–1969',
      location: 'Bảo tàng Tôn Đức Thắng, TP.HCM',
      imageUrl: '/assets/hcm-space/bac-ton.jpg',
      imageCaption: 'Không gian trưng bày chuyên đề tại Bảo tàng Tôn Đức Thắng.',
      sourceName: 'Cổng TTĐT TP.HCM — Phóng sự Không gian Văn hóa HCM',
      sourceUrl: 'https://hochiminhcity.gov.vn/vi/web/hcm/w/nhung-khong-gian-van-hoa-ho-chi-minh-noi-bat-o-thanh-pho-mang-ten-bac',
      author: 'Bảo tàng Tôn Đức Thắng',
      publisher: 'Cổng TTĐT TP.HCM',
      publishYear: '2026',
      licenseInfo: 'Tư liệu báo chí chính thống',
    },
    {
      ...baseMeta,
      id: 'dos_artifact_tdm_phuloi',
      title: 'Di tích Nhà tù Phú Lợi & Không gian Văn hóa HCM Phường Thủ Dầu Một',
      dossierType: 'ARTIFACT',
      categoryIds: ['cat_exhibit', 'cat_local'],
      topicId: 'top_tdm_news',
      tags: ['Thủ Dầu Một', 'Nhà tù Phú Lợi', 'Hoa viên Bạch Đằng'],
      audiences: ['Tham quan phổ thông', 'Cán bộ & Đảng viên', 'Đoàn viên & Học sinh'],
      summary: 'Kết nối giáo dục truyền thống cách mạng địa phương (Nhà tù Phú Lợi, Hoa viên Bạch Đằng) với 26 chi bộ Phường Thủ Dầu Một.',
      content: 'Kết hợp bảng ảnh mốc lịch sử, di tích cách mạng địa phương, tủ sách điện tử và bảng mã QR.',
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
    },
    {
      ...baseMeta,
      id: 'dos_media_vtv24',
      title: 'Phim tài liệu VTV24: Nguyễn Ái Quốc, Hồ Chí Minh — Hành trình đi tìm hình của Nước',
      dossierType: 'MEDIA',
      categoryIds: ['cat_media', 'cat_bio'],
      topicId: 'top_phim_audio',
      tags: ['VTV24', 'Phim tài liệu', '1911–1941'],
      audiences: ['Tham quan phổ thông', 'Đoàn viên & Học sinh', 'Cán bộ & Đảng viên'],
      summary: 'Phim tài liệu truyền hình do VTV24 sản xuất, tái hiện 30 năm tìm đường cứu nước của Nguyễn Ái Quốc – Hồ Chí Minh.',
      content: 'Phục vụ trình chiếu tại các buổi sinh hoạt chi bộ định kỳ và sinh hoạt đoàn thanh niên.',
      timelineDate: '1911–1941',
      location: 'Việt Nam — Pháp — Anh — Mỹ — Liên Xô',
      imageUrl: '/assets/hcm-space/tieusu1-1911.png',
      imageCaption: 'Tư liệu hành trình 1911 — hochiminhcity.gov.vn.',
      sourceName: 'Đài Truyền hình Việt Nam (VTV24)',
      sourceUrl: 'https://www.youtube.com/watch?v=Pjpt7aGiY8E',
      author: 'Ban Truyền hình Đối ngoại — VTV24',
      publisher: 'Đài Truyền hình Việt Nam',
      publishYear: '2024',
      licenseInfo: 'Video nhúng công khai chính thức VTV24',
    },
    {
      ...baseMeta,
      id: 'dos_research_144',
      title: 'Nghiên cứu Chuyên đề: Thực hành Quy định 144-QĐ/TW tại Đảng bộ Phường Thủ Dầu Một',
      dossierType: 'RESEARCH',
      categoryIds: ['cat_ideology', 'cat_local'],
      topicId: 'top_144',
      tags: ['Quy định 144-QĐ/TW', 'Cần Kiệm Liêm Chính', 'Thủ Dầu Một'],
      audiences: ['Cán bộ & Đảng viên', 'Nghiên cứu'],
      summary: 'Cụ thể hóa 5 chuẩn mực đạo đức cách mạng của Bộ Chính trị vào đánh giá xếp loại chi bộ phường Thủ Dầu Một.',
      content: 'Kết hợp 5 tiêu chí Quy định 144-QĐ/TW với Bộ 5 Tiêu chí Không gian Văn hóa HCM.',
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
    },
  ];
  const tours: HcmTourDto[] = [
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
  return {
    actor: { uid: 'guest', name: 'Khách tham quan', role: 'viewer' },
    canContribute: false,
    canApprove: false,
    categories,
    topics,
    tours,
    dossiers,
    sources: [],
    syncLogs: [],
    editorialLogs: [],
    audit: {
      totalDossiers: dossiers.length,
      byPublishStatus: { PUBLISHED: dossiers.length },
      byVerificationStatus: { VERIFIED: dossiers.length },
      byType: { EVENT: 2, WORK: 2, ARTIFACT: 2, MEDIA: 1, RESEARCH: 1 },
      missingSourceCount: 0,
      aiDraftCount: 0,
      duplicateCount: 0,
      duplicatePairs: [],
      incompleteDossiers: [],
    },
  };
}

export async function fetchHcmV2Overview(): Promise<HcmV2OverviewDto | null> {
  try {
    return await callV2Json<HcmV2OverviewDto>('/api/hcm-space/v2/overview');
  } catch {
    return buildStaticV2OverviewFallback();
  }
}

export async function fetchHcmDossierDetail(
  id: string
): Promise<{ dossier: HcmDossierDto; versions: HcmDossierVersionDto[] } | null> {
  try {
    return await callV2Json(`/api/hcm-space/v2/dossiers/${encodeURIComponent(id)}`);
  } catch {
    return null;
  }
}

export async function saveHcmDossierV2(
  payload: Partial<HcmDossierDto> & { id?: string; changeNote?: string }
): Promise<HcmDossierDto> {
  if (payload.id) {
    return callV2Json<HcmDossierDto>(`/api/hcm-space/v2/dossiers/${encodeURIComponent(payload.id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  return callV2Json<HcmDossierDto>('/api/hcm-space/v2/dossiers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function runHcmDossierWorkflow(
  id: string,
  action: 'SUBMIT_REVIEW' | 'VERIFY' | 'FLAG_NEEDS_VERIFICATION' | 'REJECT' | 'PUBLISH' | 'ARCHIVE',
  note = ''
): Promise<HcmDossierDto> {
  return callV2Json<HcmDossierDto>(`/api/hcm-space/v2/dossiers/${encodeURIComponent(id)}/workflow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, note }),
  });
}

export async function rollbackHcmDossierVersion(id: string, versionNum: number): Promise<HcmDossierDto> {
  return callV2Json<HcmDossierDto>(`/api/hcm-space/v2/dossiers/${encodeURIComponent(id)}/rollback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ versionNum }),
  });
}

export async function proposeHcmEnrichmentDraft(id: string): Promise<HcmDossierDto> {
  return callV2Json<HcmDossierDto>(`/api/hcm-space/v2/dossiers/${encodeURIComponent(id)}/enrich-draft`, {
    method: 'POST',
  });
}

export async function updateHcmSourceConfigV2(
  sourceId: string,
  patch: Partial<Pick<HcmSourceDto, 'scheduleFreq' | 'isEnabled' | 'rateLimitMinutes'>>
): Promise<HcmSourceDto> {
  return callV2Json<HcmSourceDto>(`/api/hcm-space/v2/sources/${encodeURIComponent(sourceId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
}

export async function syncHcmSourcesV2(sourceId?: string, force = false): Promise<{
  logs: HcmSyncLogDto[];
  sources: HcmSourceDto[];
}> {
  return callV2Json('/api/hcm-space/v2/sources/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceId: sourceId || '', force }),
  });
}

// =========================================================================
// TIẾP NHẬN GÓP Ý & ĐỀ NGHỊ ĐÍNH CHÍNH TƯ LIỆU TỪ BẠN ĐỌC
// =========================================================================
export interface CitizenCorrectionPayload {
  targetId: string;
  targetTitle: string;
  targetType?: string;
  issueType: string;
  description: string;
  evidenceUrl?: string;
  contactInfo?: string;
  website?: string;
}

export interface HcmCorrectionItemDto {
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

export async function submitCitizenCorrection(payload: CitizenCorrectionPayload): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/hcm-space/corrections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.error || 'Gửi đề nghị đính chính không thành công.');
  }
  return json;
}

export async function fetchCorrectionsList(status?: string): Promise<HcmCorrectionItemDto[]> {
  const qs = status ? `?status=${encodeURIComponent(status)}` : '';
  const token = getHcmAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`/api/hcm-space/corrections${qs}`, { headers });
  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.error || 'Không thể lấy danh sách đề nghị đính chính.');
  }
  return json.data as HcmCorrectionItemDto[];
}

export async function updateCorrectionStatusClient(
  id: string,
  status: 'RECEIVED' | 'VERIFYING' | 'RESOLVED' | 'NEED_MORE_INFO' | 'REJECTED',
  adminNotes?: string
): Promise<HcmCorrectionItemDto> {
  const token = getHcmAuthToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`/api/hcm-space/corrections/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status, adminNotes }),
  });
  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.error || 'Không cập nhật được trạng thái xử lý.');
  }
  return json.data as HcmCorrectionItemDto;
}

// =========================================================================
// QUẢN LÝ PHIÊN XÁC THỰC MÁY CHỦ CHO BAN BIÊN TẬP & THẨM ĐỊNH
// =========================================================================
const HCM_AUTH_TOKEN_KEY = 'hcm_space_admin_token_v1';

export function getHcmAuthToken(): string {
  try {
    return localStorage.getItem(HCM_AUTH_TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setHcmAuthToken(token: string): void {
  try {
    if (token) {
      localStorage.setItem(HCM_AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(HCM_AUTH_TOKEN_KEY);
    }
  } catch {}
}

export async function hcmAdminLogin(email: string, pass: string): Promise<{ token: string; actor: any }> {
  const res = await fetch('/api/hcm-space/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const json = await res.json();
  if (!res.ok || !json?.success) {
    throw new Error(json?.error || 'Đăng nhập thất bại.');
  }
  setHcmAuthToken(json.data.token);
  return json.data;
}

export async function hcmAdminLogout(): Promise<void> {
  const token = getHcmAuthToken();
  if (token) {
    try {
      await fetch('/api/hcm-space/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }
  setHcmAuthToken('');
}
