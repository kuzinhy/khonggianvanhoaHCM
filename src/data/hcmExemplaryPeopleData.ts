export type ExemplaryCategory =
  | 'CAN_BO_DANG_VIEN'
  | 'THANH_NIEN'
  | 'PHU_NU'
  | 'CUU_CHIEN_BINH'
  | 'LUC_LUONG_VU_TRANG'
  | 'GIAO_DUC_Y_TE'
  | 'QUAN_CHUNG_NHAN_DAN';

export interface ExemplaryPerson {
  id: string;
  fullName: string;
  birthYear: number;
  gender: 'NAM' | 'NU';
  khuPho: 'Khu phố 1' | 'Khu phố 2' | 'Khu phố 3' | 'Khu phố 4' | 'Khu phố 5';
  role: string;
  unit: string;
  category: ExemplaryCategory;
  categoryLabel: string;
  recognitionDate: string; // ISO date / Month (All from 01/07/2025 to present)
  periodLabel: string;
  honorTitle: string; // e.g. "Gương Dân vận khéo tiêu biểu", "Chiến sĩ thi đua", "Người tốt việc tốt 2025"
  avatarUrl: string;
  goodDeedSummary: string;
  storyContent: string;
  communityImpact: string;
  quoteOrMotto: string;
  hcmLessonApplied: string;
  likesCount: number;
  tags: string[];
}

export const EXEMPLARY_CATEGORIES_CONFIG: {
  key: ExemplaryCategory | 'ALL';
  label: string;
  iconName: string;
}[] = [
  { key: 'ALL', label: 'Tất cả gương sáng', iconName: 'Sparkles' },
  { key: 'CAN_BO_DANG_VIEN', label: 'Cán bộ — Đảng viên', iconName: 'Award' },
  { key: 'THANH_NIEN', label: 'Đoàn viên — Thanh niên', iconName: 'Zap' },
  { key: 'PHU_NU', label: 'Phụ nữ đảm đang', iconName: 'Heart' },
  { key: 'CUU_CHIEN_BINH', label: 'Cựu chiến binh gương mẫu', iconName: 'Shield' },
  { key: 'LUC_LUONG_VU_TRANG', label: 'Lực lượng vũ trang', iconName: 'Flame' },
  { key: 'GIAO_DUC_Y_TE', label: 'Giáo dục & Y tế', iconName: 'BookOpen' },
  { key: 'QUAN_CHUNG_NHAN_DAN', label: 'Quần chúng nhân dân', iconName: 'Users' },
];

export const EXEMPLARY_PEOPLE_LIST: ExemplaryPerson[] = [
  {
    id: 'exp_01_nguyen_van_an',
    fullName: 'Nguyễn Văn An',
    birthYear: 1968,
    gender: 'NAM',
    khuPho: 'Khu phố 1',
    role: 'Bí thư Chi bộ kiêm Trưởng Ban Công tác Mặt trận',
    unit: 'Chi bộ Khu phố 1, Phường Thủ Dầu Một',
    category: 'CAN_BO_DANG_VIEN',
    categoryLabel: 'Cán bộ — Đảng viên',
    recognitionDate: '2025-08-19',
    periodLabel: 'Tháng 8/2025',
    honorTitle: 'Điển hình “Dân vận khéo” cấp Phường năm 2025',
    avatarUrl: '/assets/hcm-space/nguoi-tot-nguyen-van-an.jpg',
    goodDeedSummary:
      'Đi đầu hiến 45m² đất gia đình và kiên trì vận động 100% hộ dân hiến hơn 420m² đất mở rộng hẻm ven sông Bạch Đằng, xây dựng tuyến đường cờ Tổ quốc sáng - xanh - sạch - đẹp.',
    storyContent:
      'Ngay sau khi thành lập phường mới từ 01/7/2025, đồng chí Nguyễn Văn An đã bắt tay ngay vào rà soát các tuyến hẻm nhỏ hẹp ven sông Sài Gòn. Bằng sự tận tụy, “miệng nói, tay làm, tai lắng nghe”, đồng chí cùng gia đình gương mẫu tự nguyện tháo dỡ tường rào, hiến 45m² đất mặt tiền trị giá hàng trăm triệu đồng để mở rộng đường. Noi gương người Bí thư Chi bộ, 32 hộ dân dọc tuyến hẻm đồng lòng hiến đất và góp ngày công bê tông hóa 100% tuyến đường, lắp đặt hệ thống đèn năng lượng mặt trời và giá treo cờ Tổ quốc đồng bộ.',
    communityImpact:
      'Tuyến hẻm từ 2m được mở rộng lên 5m, xe cứu hỏa và ô tô ra vào thuận tiện, diện mạo đô thị khu phố 1 khang trang, sạch đẹp rõ rệt, trở thành tuyến đường kiểu mẫu sau sáp nhập phường.',
    quoteOrMotto:
      'Muốn dân tin, dân theo thì đảng viên phải đi trước. Lời Bác dạy “Dễ trăm lần không dân cũng chịu, khó vạn lần dân liệu cũng xong” luôn là kim chỉ nam trong từng việc làm.',
    hcmLessonApplied: 'Học tập phong cách dân vận của Bác: Tôn trọng dân, gần dân, gương mẫu đi đầu.',
    likesCount: 342,
    tags: ['Hiến đất làm đường', 'Dân vận khéo', 'Khu phố 1', 'Bạch Đằng'],
  },
  {
    id: 'exp_02_le_thi_mai',
    fullName: 'Lê Thị Mai',
    birthYear: 1974,
    gender: 'NU',
    khuPho: 'Khu phố 3',
    role: 'Chủ tịch Hội Liên hiệp Phụ nữ',
    unit: 'Hội LHPN Phường Thủ Dầu Một',
    category: 'PHU_NU',
    categoryLabel: 'Phụ nữ đảm đang',
    recognitionDate: '2025-09-10',
    periodLabel: 'Tháng 9/2025',
    honorTitle: 'Gương phụ nữ Thủ Dầu Một “Giỏi việc nước, đảm việc nhà”',
    avatarUrl: '/assets/hcm-space/nguoi-tot-le-thi-mai.jpg',
    goodDeedSummary:
      'Sáng lập và duy trì mô hình “Bếp ăn Nghĩa tình Bác Hồ”, nấu và phát miễn phí hơn 350 suất cơm dinh dưỡng mỗi tuần cho người lao động nghèo và thân nhân bệnh nhân có hoàn cảnh khó khăn.',
    storyContent:
      'Từ ngày 01/7/2025 khi đơn vị hành chính phường mới đi vào hoạt động, bà Lê Thị Mai đã chủ động kết nối các tiểu thương chợ truyền thống, các nhà hảo tâm và chị em phụ nữ trên địa bàn để thành lập “Bếp ăn Nghĩa tình Bác Hồ”. Đều đặn vào thứ Ba và thứ Sáu hàng tuần, từ 4 giờ sáng, gian bếp tại Nhà văn hóa khu phố đã đỏ lửa. Từng phần cơm nóng hổi, đầy đủ dinh dưỡng được trao tận tay các cô chú bán vé số, công nhân vệ sinh và người nhà bệnh nhân tại Bệnh viện Đa khoa tỉnh.',
    communityImpact:
      'Đã trao tặng hơn 6.000 suất cơm nghĩa tình và 120 phần quà trị giá hơn 200 triệu đồng, lan tỏa sâu rộng tinh thần “Tương thân tương ái, lá lành đùm lá rách” trên toàn địa bàn phường.',
    quoteOrMotto:
      'Mỗi suất cơm gửi trao không chỉ là vật chất, mà là hơi ấm tình người, là sự sẻ chia theo tinh thần Bác dạy suốt đời vì nhân dân cần lao.',
    hcmLessonApplied: 'Học tập lòng nhân ái, tình thương yêu bao la của Bác đối với đồng bào nghèo.',
    likesCount: 428,
    tags: ['Bếp ăn nghĩa tình', 'Từ thiện', 'Phụ nữ', 'Cơm 0 đồng'],
  },
  {
    id: 'exp_03_tran_minh_quan',
    fullName: 'Trần Minh Quân',
    birthYear: 1996,
    gender: 'NAM',
    khuPho: 'Khu phố 2',
    role: 'Trung úy, Cán bộ Cảnh sát khu vực',
    unit: 'Công an Phường Thủ Dầu Một',
    category: 'LUC_LUONG_VU_TRANG',
    categoryLabel: 'Lực lượng vũ trang',
    recognitionDate: '2025-10-15',
    periodLabel: 'Tháng 10/2025',
    honorTitle: 'Chiến sĩ Công an nhân dân dũng cảm, vì nước quên thân, vì dân phục vụ',
    avatarUrl: '/assets/hcm-space/nguoi-tot-tran-minh-quan.jpg',
    goodDeedSummary:
      'Dũng cảm lao mình xuống dòng nước xiết ven sông Sài Gòn cứu sống 2 em nhỏ đuối nước; đồng thời tích cực đi đầu trong chiến dịch số hóa định danh điện tử VNeID lưu động tận nhà cho người già neo đơn.',
    storyContent:
      'Chiều ngày 28/8/2025, trong lúc tuần tra đảm bảo an ninh trật tự ven công viên Bạch Đằng, nghe tiếng tri hô cứu người, Trung úy Trần Minh Quân không ngần ngại cởi bỏ sắc phục, lao thẳng xuống dòng sông sâu nước đang chảy xiết, tiếp cận và lần lượt đưa 2 em nhỏ bị trượt chân đuối nước lên bờ an toàn, kịp thời hô hấp nhân tạo cứu sống các cháu. Không dừng lại ở hành động dũng cảm, trong công tác chuyên môn, Trung úy Quân còn tình nguyện mang máy móc đến tận giường bệnh, nhà dân neo đơn để kích hoạt định danh VNeID mức 2 cho hơn 400 cụ già.',
    communityImpact:
      'Được Giám đốc Công an Tỉnh tặng Giấy khen đột xuất về gương dũng cảm; củng cố niềm tin vững chắc, làm đẹp thêm hình ảnh người chiến sĩ Công an nhân dân trong lòng bà con Đất Thủ.',
    quoteOrMotto:
      'Khi nhân dân cần, người chiến sĩ Công an phải có mặt ngay. Cứu người là mệnh lệnh từ trái tim, là chuẩn mực danh dự của lực lượng CAND học tập 6 điều Bác Hồ dạy.',
    hcmLessonApplied: 'Thực hiện 6 điều Bác Hồ dạy Công an nhân dân: Tận tụy vì dân, dũng cảm mưu trí.',
    likesCount: 512,
    tags: ['Cứu người đuối nước', 'Công an dũng cảm', 'VNeID', 'Khu phố 2'],
  },
  {
    id: 'exp_04_dang_huu_tai',
    fullName: 'Đặng Hữu Tài',
    birthYear: 1952,
    gender: 'NAM',
    khuPho: 'Khu phố 4',
    role: 'Thương binh 4/4, Chi hội trưởng Chi hội Cựu chiến binh',
    unit: 'Chi hội Cựu chiến binh Khu phố 4',
    category: 'CUU_CHIEN_BINH',
    categoryLabel: 'Cựu chiến binh gương mẫu',
    recognitionDate: '2025-11-20',
    periodLabel: 'Tháng 11/2025',
    honorTitle: 'Gương Cựu chiến binh tiêu biểu “Học tập và làm theo Bác”',
    avatarUrl: '/assets/hcm-space/nguoi-tot-dang-huu-tai.jpg',
    goodDeedSummary:
      'Trích tiền trợ cấp thương binh nhận đỡ đầu học phí dài hạn cho 5 em học sinh nghèo mồ côi; xây dựng “Tủ sách Bác Hồ và lịch sử Đất Thủ” với hơn 600 đầu sách tại nhà sinh hoạt cộng đồng.',
    storyContent:
      'Trở về đời thường với vết thương trên cơ thể, người cựu chiến binh Đặng Hữu Tài luôn khắc ghi lời dạy “Thương binh tàn nhưng không phế”. Sau khi phường Thủ Dầu Một sáp nhập đơn vị hành chính mới, ông đã chủ động trích từ phần phụ cấp thương binh hàng tháng để nhận nuôi, hỗ trợ học phí cho 5 em học sinh mồ côi, có nguy cơ bỏ học. Đồng thời, ông tự tay đóng kệ gỗ, kêu gọi con cháu và đồng đội quyên góp hơn 600 cuốn sách tư liệu lịch sử, sách về Bác Hồ để thành lập không gian đọc sách miễn phí cho thanh thiếu nhi trong khu phố.',
    communityImpact:
      'Giúp 5 em học sinh tiếp tục đến trường và đạt danh hiệu học sinh giỏi; tủ sách cộng đồng thu hút bình quân 40 lượt thanh thiếu niên đến đọc và tìm hiểu truyền thống mỗi tuần.',
    quoteOrMotto:
      'Còn sống là còn cống hiến cho quê hương. Nuôi dạy thế hệ trẻ nên người chính là tiếp nối ngọn lửa cách mạng mà Bác Hồ và đồng đội đã dày công gìn giữ.',
    hcmLessonApplied: 'Học tập ý chí kiên trung, tinh thần trách nhiệm trọn đời với thế hệ tương lai.',
    likesCount: 389,
    tags: ['Đỡ đầu học sinh nghèo', 'Cựu chiến binh', 'Tủ sách Bác Hồ', 'Khu phố 4'],
  },
  {
    id: 'exp_05_phan_quynh_nhu',
    fullName: 'Phan Quỳnh Như',
    birthYear: 2004,
    gender: 'NU',
    khuPho: 'Khu phố 2',
    role: 'Bí thư Đoàn trường, Trưởng nhóm Chuyển đổi số thanh niên',
    unit: 'Đoàn Thanh niên Cộng sản Hồ Chí Minh Phường Thủ Dầu Một',
    category: 'THANH_NIEN',
    categoryLabel: 'Đoàn viên — Thanh niên',
    recognitionDate: '2025-12-05',
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
  },
  {
    id: 'exp_06_nguyen_van_thuan',
    fullName: 'Nguyễn Văn Thuận',
    birthYear: 1958,
    gender: 'NAM',
    khuPho: 'Khu phố 5',
    role: 'Nghệ nhân gốm truyền thống',
    unit: 'Lò gốm cổ Đại Hưng, Khu phố 5',
    category: 'QUAN_CHUNG_NHAN_DAN',
    categoryLabel: 'Quần chúng nhân dân',
    recognitionDate: '2026-01-12',
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
  },
  {
    id: 'exp_07_tran_thi_anh_tuyet',
    fullName: 'Trần Thị Ánh Tuyết',
    birthYear: 1985,
    gender: 'NU',
    khuPho: 'Khu phố 4',
    role: 'Giáo viên Tổng phụ trách Đội',
    unit: 'Trường Tiểu học Nguyễn Du, Phường Thủ Dầu Một',
    category: 'GIAO_DUC_Y_TE',
    categoryLabel: 'Giáo dục & Y tế',
    recognitionDate: '2026-02-27',
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
  },
  {
    id: 'exp_08_pham_hoang_long',
    fullName: 'Phạm Hoàng Long',
    birthYear: 1980,
    gender: 'NAM',
    khuPho: 'Khu phố 1',
    role: 'Bác sĩ CKII, Trưởng Trạm Y tế',
    unit: 'Trạm Y tế Phường Thủ Dầu Một',
    category: 'GIAO_DUC_Y_TE',
    categoryLabel: 'Giáo dục & Y tế',
    recognitionDate: '2026-03-08',
    periodLabel: 'Tháng 3/2026',
    honorTitle: 'Thầy thuốc tiêu biểu “Lương y như từ mẫu” cấp Tỉnh',
    avatarUrl: '/assets/hcm-space/nguoi-tot-pham-hoang-long.jpg',
    goodDeedSummary:
      'Khởi xướng chương trình “Thầy thuốc tình nguyện vì sức khỏe cộng đồng”, định kỳ khám bệnh, phát thuốc tận nhà vào thứ Bảy cho các Mẹ VNAH, thương binh nặng và người già neo đơn.',
    storyContent:
      'Dưới sự điều hành tận tụy của Bác sĩ Long, Trạm Y tế phường Thủ Dầu Một sau sáp nhập đã nâng cấp toàn diện chất lượng chăm sóc sức khỏe ban đầu cho người dân. Hiểu được nỗi khó khăn của các cụ già neo đơn, thương bệnh binh đi lại khó khăn, Bác sĩ Long đã vận động các y bác sĩ tình nguyện mang máy đo điện tim, máy thử đường huyết, cơ số thuốc đến tận từng gia đình. Đã có hơn 380 lượt người cao tuổi được chăm sóc chu đáo, phát hiện và can thiệp kịp thời nhiều ca bệnh tim mạch nguy hiểm.',
    communityImpact:
      'Được người dân tin yêu trìu mến gọi là “Bác sĩ của người nghèo”; tỷ lệ người dân tham gia bảo hiểm y tế và lập hồ sơ sức khỏe điện tử tại phường đạt 98,5%.',
    quoteOrMotto:
      'Hạnh phúc của người thầy thuốc là nhìn thấy nụ cười bình an của người bệnh. Lời dạy “Lương y phải như từ mẫu” là lương tâm nghề nghiệp tôi giữ trọn suốt đời.',
    hcmLessonApplied: 'Thực hiện lời Bác dạy ngành y tế: Tận tâm, chu đáo, hết lòng vì sinh mệnh nhân dân.',
    likesCount: 450,
    tags: ['Bác sĩ nhân ái', 'Khám bệnh tại nhà', 'Chăm lo sức khỏe', 'Lương y từ mẫu'],
  },
];
