/**
 * Dữ liệu Không Gian Văn Hóa Hồ Chí Minh Dành Cho Thiếu Nhi & Học Sinh
 * Nguồn tư liệu: Ban Tuyên giáo, Hội đồng Đội Trung ương, Giáo trình Đạo đức & Lịch sử Tiểu học/THCS,
 * và mô hình Không gian Văn hóa Hồ Chí Minh tại các trường học TP. Thủ Dầu Một.
 */

export interface FiveTeachingsItem {
  number: string;
  title: string;
  shortText: string;
  iconName: string;
  meaning: string;
  historicalContext: string;
  schoolActions: string[];
  homeActions: string[];
  storyTitle: string;
  storyExcerpt: string;
}

export interface UncleHoPhotoItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  imageUrl: string;
  description: string;
  quote: string;
  category: 'THIEU_NHI' | 'TRONG_CAY' | 'DOC_SACH' | 'PHAT_KEO';
}

export interface HistoricalSiteItem {
  id: string;
  name: string;
  location: string;
  province: string;
  role: string;
  yearPeriod: string;
  imageUrl: string;
  summary: string;
  childhoodConnection: string;
  address: string;
}

export interface MoralStoryItem {
  id: string;
  title: string;
  lesson: string;
  suitableAge: string;
  readingTime: string;
  content: string;
  moralLesson: string;
  questions: string[];
}

export interface ChildrenSongItem {
  id: string;
  title: string;
  composer: string;
  year: string;
  famousLyrics: string;
  fullLyrics: string;
  story: string;
  youtubeQuery: string;
}

export interface SchoolArtworkItem {
  id: string;
  title: string;
  studentName: string;
  gradeClass: string;
  schoolName: string;
  award: string;
  imageUrl: string;
  description: string;
}

// 1. 5 ĐIỀU BÁC HỒ DẠY THIẾU NIÊN NHI ĐỒNG
export const FIVE_TEACHINGS_DATA: FiveTeachingsItem[] = [
  {
    number: '01',
    title: 'Yêu Tổ quốc, yêu đồng bào',
    shortText: 'Lòng yêu nước bắt đầu từ tình yêu gia đình, thầy cô, bạn bè và quê hương Đất Thủ.',
    iconName: 'Heart',
    meaning:
      'Tổ quốc là đất nước Việt Nam thiêng liêng; đồng bào là nhân dân, là những người cùng chung một cội nguồn. Yêu Tổ quốc là tự hào về truyền thống ngàn năm dựng nước và giữ nước, trân trọng độc lập tự do mà bao thế hệ cha anh đã hy sinh xương máu. Yêu đồng bào là biết yêu thương, chia sẻ, giúp đỡ mọi người xung quanh.',
    historicalContext:
      'Nhân dịp kỷ niệm 20 năm ngày thành lập Đội Thiếu niên Tiền phong (15/5/1961), Bác Hồ đã gửi thư dặn dò thiếu niên, nhi đồng cả nước 5 điều ngắn gọn, súc tích và mở đầu bằng lời căn dặn cốt lõi này.',
    schoolActions: [
      'Trang nghiêm chào cờ và hát Quốc ca, Đội ca mỗi sáng thứ Hai.',
      'Chăm chỉ tìm hiểu lịch sử dân tộc, tham quan các địa chỉ đỏ như Chùa Hội Khánh, Nhà việc Phú Cường.',
      'Yêu quý bạn bè, không phân biệt đối xử, luôn giúp đỡ bạn có hoàn cảnh khó khăn.',
    ],
    homeActions: [
      'Kính trọng, yêu thương và nghe lời ông bà, cha mẹ.',
      'Quan tâm đến xóm giềng, chào hỏi lễ phép với người lớn tuổi.',
      'Tự hào gìn giữ những nét đẹp truyền thống của gia đình và quê hương.',
    ],
    storyTitle: 'Bác Hồ với chiếc áo ấm cho chú lính gác',
    storyExcerpt:
      'Vào một đêm đông rét buốt ở chiến khu Việt Bắc, thấy chú lính gác đứng co ro dưới gió lạnh, Bác đã ân cần đem chiếc áo trấn thủ ấm áp của mình khoác lên vai chú...',
  },
  {
    number: '02',
    title: 'Học tập tốt, lao động tốt',
    shortText: 'Học để mở mang trí tuệ, lao động để rèn luyện đôi bàn tay khéo léo và ý chí kiên trì.',
    iconName: 'BookOpen',
    meaning:
      'Học tập tốt không chỉ là đạt điểm số cao, mà là học hiểu sâu, học đi đôi với hành, trung thực trong thi cử và có tinh thần tự học suốt đời như Bác Hồ. Lao động tốt là yêu quý lao động, trân trọng giọt mồ hôi của người lao động, tích cực làm việc nhà và trực nhật trường lớp.',
    historicalContext:
      'Bác Hồ dạy: "Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em."',
    schoolActions: [
      'Chuẩn bị bài vở chu đáo trước khi đến lớp, tích cực phát biểu xây dựng bài.',
      'Tự giác trực nhật, quét dọn lớp học, chăm sóc bồn hoa cây cảnh sân trường.',
      'Không quay cóp, trung thực trong kiểm tra và thi cử.',
    ],
    homeActions: [
      'Tự giác học bài đúng giờ, không để cha mẹ phải nhắc nhở.',
      'Giúp đỡ cha mẹ việc nhà phù hợp lứa tuổi: quét nhà, rửa bát, gấp quần áo, tưới cây.',
      'Đọc thêm sách báo bổ ích, rèn luyện kỹ năng sống mỗi ngày.',
    ],
    storyTitle: 'Hai bàn tay trắng và hành trình đi tìm độc lập',
    storyExcerpt:
      'Trước khi rời Bến Nhà Rồng năm 1911, khi được hỏi lấy tiền đâu để đi nước ngoài, người thanh niên Nguyễn Tất Thành đã giơ hai bàn tay lên và nói: "Chúng ta sẽ làm việc, chúng ta sẽ làm bất cứ việc gì để sống và để đi!"...',
  },
  {
    number: '03',
    title: 'Đoàn kết tốt, kỷ luật tốt',
    shortText: 'Đoàn kết tạo nên sức mạnh; kỷ luật giúp tập thể vững bước và bản thân trưởng thành.',
    iconName: 'Users',
    meaning:
      'Đoàn kết là cùng chung một chí hướng, gắn bó như anh em một nhà, giúp nhau cùng tiến bộ. Kỷ luật là tự giác chấp hành nội quy của trường, của lớp, luật lệ giao thông và các quy định của xã hội, coi kỷ luật là sự tự giác chứ không phải ép buộc.',
    historicalContext:
      'Chủ tịch Hồ Chí Minh khẳng định: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công." Trong tập thể thiếu nhi, đoàn kết là nền tảng để Đội Thiếu niên Tiền phong phát triển vững mạnh.',
    schoolActions: [
      'Hòa đồng với các bạn trong lớp, không chia bè phái hay bắt nạt bạn bè.',
      'Đi học đúng giờ, mặc đồng phục chỉnh tề, giữ trật tự trong giờ học.',
      'Nghiêm túc chấp hành điều lệ Đội và nội quy nhà trường.',
    ],
    homeActions: [
      'Gia đình hòa thuận, nhường nhịn em nhỏ, kính trọng anh chị.',
      'Tuân thủ thời gian biểu sinh hoạt và học tập đã thống nhất với cha mẹ.',
      'Chấp hành luật giao thông: đội mũ bảo hiểm khi ngồi trên xe máy.',
    ],
    storyTitle: 'Chiếc đồng hồ và bài học về sự phân công',
    storyExcerpt:
      'Bác Hồ ví tập thể như một cỗ máy đồng hồ tinh xảo: kim giờ, kim phút, quả lắc, lò xo... mỗi bộ phận một chức năng. Nếu kim đòi làm mặt số thì đồng hồ sẽ hỏng ngay...',
  },
  {
    number: '04',
    title: 'Giữ gìn vệ sinh thật tốt',
    shortText: 'Thân thể sạch sẽ thì khỏe mạnh; môi trường sạch đẹp thì cuộc sống trong lành, hạnh phúc.',
    iconName: 'Sparkles',
    meaning:
      'Giữ gìn vệ sinh là rèn luyện nếp sống văn minh: giữ sạch thân thể, sạch quần áo, sạch nơi ở, sạch trường lớp và giữ gìn môi trường thiên nhiên xung quanh không bị ô nhiễm. Vệ sinh tốt chính là bảo vệ sức khỏe cho mình và cho cộng đồng.',
    historicalContext:
      'Bác Hồ có lối sống vô cùng ngăn nắp, giản dị và sạch sẽ. Ngôi nhà sàn của Bác luôn thoáng mát, gọn gàng, đồ đạc được sắp xếp khoa học, ngăn nắp đến từng cuốn sách, cây bút.',
    schoolActions: [
      'Bỏ rác đúng nơi quy định, phân loại rác thải nhựa tại trường học.',
      'Rửa tay sạch bằng xà phòng trước khi ăn và sau khi đi vệ sinh.',
      'Giữ gìn bàn ghế sạch đẹp, không vẽ bậy lên tường lớp học.',
    ],
    homeActions: [
      'Giữ gìn phòng ngủ, góc học tập luôn ngăn nắp, gọn gàng.',
      'Tập thể dục buổi sáng để tăng cường thể lực và đề kháng.',
      'Trồng và chăm sóc cây xanh quanh nhà để không khí thêm trong lành.',
    ],
    storyTitle: 'Ngôi nhà sàn thanh bạch và ao cá râm mát',
    storyExcerpt:
      'Tại Phủ Chủ tịch, ngôi nhà sàn của Bác không hề có đồ đạc xa hoa lộng lẫy, chỉ có chiếc giường đơn, bàn làm việc bằng gỗ mộc mạc và hàng rào râm bụt luôn được quét tước sạch bóng...',
  },
  {
    number: '05',
    title: 'Khiêm tốn, thật thà, dũng cảm',
    shortText: 'Ba đức tính vàng để rèn luyện nhân cách cao đẹp của người Cháu ngoan Bác Hồ.',
    iconName: 'Award',
    meaning:
      'Khiêm tốn là không tự kiêu, không khoe khoang, luôn biết lắng nghe và học hỏi người khác. Thật thà là trung thực, không dối trá, ngay thẳng trong lời nói và hành động. Dũng cảm là không sợ khó khăn, dám nhận khuyết điểm khi mình sai và dám bảo vệ lẽ phải.',
    historicalContext:
      'Ban đầu năm 1961, câu thứ 5 là "Khiêm tốn, thật thà, dũng cảm". Đến năm 1965, khi xem lại tài liệu chuẩn bị in sách nhỏ "Bác Hồ với thiếu nhi", Bác Hồ đã tự tay dùng bút mực đỏ sửa bổ sung từ "Khiêm tốn" lên đầu câu để nhắc nhở các cháu không được kiêu ngạo khi đạt thành tích.',
    schoolActions: [
      'Khi đạt điểm cao không kiêu ngạo, sẵn sàng kèm cặp giúp đỡ bạn học yếu hơn.',
      'Nhặt được của rơi trả lại người đánh mất thông qua thầy cô Tổng phụ trách.',
      'Dũng cảm nhận lỗi khi làm vỡ đồ hoặc làm sai, không đổ lỗi cho bạn.',
    ],
    homeActions: [
      'Nói thật với cha mẹ, không giấu giếm điểm kém hay lỗi lầm.',
      'Biết nói lời "cảm ơn" khi được giúp đỡ và "xin lỗi" khi làm phiền người khác.',
      'Tự tin bày tỏ ý kiến đóng góp xây dựng trong gia đình.',
    ],
    storyTitle: 'Bác Hồ sửa câu nói và bài học chiếc kẹo cho em bé biết nhận lỗi',
    storyExcerpt:
      'Khi chia kẹo cho các cháu thiếu nhi ở trại trẻ mồ côi, có một em bé đứng nép góc không dám nhận kẹo vì trót làm vỡ bát. Bác đã khen em thật thà và vẫn thưởng kẹo cho em vì em đã dũng cảm nhận lỗi...',
  },
];

// 2. BỘ SƯU TẬP ẢNH LỊCH SỬ "BÁC HỒ VỚI THIẾU NHI" (Theo 4 khung ảnh trên tường gỗ trường học)
export const UNCLE_HO_PHOTOS: UncleHoPhotoItem[] = [
  {
    id: 'photo_01',
    title: 'Bác Hồ với thiếu nhi',
    subtitle: 'Ân cần quàng khăn đỏ và múa hát cùng các cháu thiếu niên, nhi đồng',
    year: '1961',
    imageUrl: '/assets/hcm-space/anh-bac.png',
    description:
      'Chủ tịch Hồ Chí Minh luôn dành cho các cháu thiếu nhi tình yêu thương bao la như người ông hiền từ. Bác thường đón các cháu vào thăm Phủ Chủ tịch, tặng kẹo, tự tay chỉnh từng chiếc khăn quàng đỏ và căn dặn các cháu chăm ngoan học giỏi.',
    quote: 'Ai yêu các nhi đồng bằng Bác Hồ Chí Minh / Tính các cháu ngoan ngoãn, mặt các cháu xinh xinh.',
    category: 'THIEU_NHI',
  },
  {
    id: 'photo_02',
    title: 'Bác trồng cây',
    subtitle: 'Khởi xướng phong trào "Tết trồng cây" mùa xuân 1960 vì thế hệ mai sau',
    year: '1960',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    description:
      'Mùa xuân năm 1960, Bác Hồ phát động phong trào Tết trồng cây với mong muốn đất nước ngày càng xanh tươi. Bác dạy: "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người."',
    quote: 'Mùa xuân là Tết trồng cây / Làm cho đất nước càng ngày càng xuân.',
    category: 'TRONG_CAY',
  },
  {
    id: 'photo_03',
    title: 'Bác đọc sách',
    subtitle: 'Tấm gương sáng ngời về tinh thần tự học, đọc sách báo và nghiên cứu',
    year: '1954',
    imageUrl: '/assets/hcm-space/tieusu2-1919.png',
    description:
      'Dù bận trăm công nghìn việc lãnh đạo kháng chiến và kiến thiết nước nhà, Bác Hồ vẫn giữ thói quen đọc sách báo mỗi ngày. Bác biết nhiều thứ tiếng nước ngoài hoàn toàn nhờ tinh thần tự học kiên trì, không ngừng nghỉ.',
    quote: 'Học hỏi là một việc phải tiếp tục suốt đời. Suốt đời phải học, lý luận phải liên hệ với thực tế.',
    category: 'DOC_SACH',
  },
  {
    id: 'photo_04',
    title: 'Bác phát kẹo cho các cháu',
    subtitle: 'Niềm vui ấm áp ngày Tết Trung thu và ngày Quốc tế Thiếu nhi',
    year: '1959',
    imageUrl: '/assets/hcm-space/tieusu3-1920.png',
    description:
      'Mỗi dịp Trung thu hay ngày lễ, Bác Hồ lại gửi thư và chuẩn bị kẹo bánh chia cho các cháu thiếu nhi. Những chiếc kẹo ngọt ngào của Bác là phần thưởng vô giá khích lệ tinh thần thi đua "Học tập tốt, lao động tốt".',
    quote: 'Bác mong các cháu chăm ngoan / Mai sau kiến thiết giang san đẹp giàu.',
    category: 'PHAT_KEO',
  },
];

// 3. 5 ĐỊA DANH LỊCH SỬ DẤU CHÂN BÁC (Theo 5 thẻ gỗ chân tường)
export const HISTORICAL_SITES: HistoricalSiteItem[] = [
  {
    id: 'site_lang_sen',
    name: 'Làng Sen (Kim Liên)',
    location: 'Xã Kim Liên, huyện Nam Đàn',
    province: 'Tỉnh Nghệ An',
    role: 'Quê hương tuổi thơ của Bác Hồ',
    yearPeriod: '1890 – 1901',
    imageUrl: '/assets/hcm-space/tieusu1-1911.png',
    summary:
      'Làng Sen là quê nội của Chủ tịch Hồ Chí Minh. Ngôi nhà lá 5 gian mộc mạc bên rặng tre xanh ngát là nơi gắn liền với những năm tháng ấu thơ ấm áp tình thương của người mẹ Hoàng Thị Loan và người cha Nguyễn Sinh Sắc.',
    childhoodConnection:
      'Cậu bé Nguyễn Sinh Cung đã lớn lên trong lời ru ngọt ngào của mẹ, tình yêu lao động và chứng kiến nỗi cơ cực của người dân lầm than, từ đó ấp ủ lòng yêu nước thương dân sâu sắc.',
    address: 'Khu Di tích Quốc gia đặc biệt Kim Liên, Nam Đàn, Nghệ An',
  },
  {
    id: 'site_hang_pac_bo',
    name: 'Hang Pác Bó',
    location: 'Xã Trường Hà, huyện Hà Quảng',
    province: 'Tỉnh Cao Bằng',
    role: 'Nơi Bác trở về Tổ quốc lãnh đạo cách mạng',
    yearPeriod: 'Từ 28/01/1941',
    imageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    summary:
      'Sau 30 năm bôn ba qua 4 châu lục, ngày 28/01/1941, Bác Hồ đã cúi mình hôn lên nắm đất thiêng liêng của Tổ quốc tại cột mốc 108 và chọn Hang Pác Bó làm căn cứ địa cách mạng đầu tiên.',
    childhoodConnection:
      'Hình ảnh Bác Hồ ngồi bên chiếc bàn đá chông chênh bên bờ suối dịch sử Đảng đã trở thành bài thơ bất hủ mà mọi học sinh tiểu học đều được học: "Sáng ra bờ suối, tối vào hang / Cháo bẹ rau măng vẫn sẵn sàng".',
    address: 'Khu Di tích Quốc gia đặc biệt Pác Bó, Hà Quảng, Cao Bằng',
  },
  {
    id: 'site_thac_lenin',
    name: 'Suối Lê-nin (Thác Lê-nin)',
    location: 'Xã Trường Hà, huyện Hà Quảng',
    province: 'Tỉnh Cao Bằng',
    role: 'Danh thắng lịch sử bên chân núi Các Mác',
    yearPeriod: '1941 – 1945',
    imageUrl: '/assets/hcm-space/quoc-te.jpg',
    summary:
      'Dòng suối trong vắt như ngọc bích uốn lượn quanh chân núi Các Mác hùng vĩ. Bác Hồ đã tự tay đặt tên cho dòng suối là Suối Lê-nin và ngọn núi là Núi Các Mác để khẳng định con đường cách mạng vô sản chân chính.',
    childhoodConnection:
      'Nơi đây lưu dấu những giờ phút Bác thư thái ngồi câu cá, đàm đạo việc nước và hòa mình vào thiên nhiên núi rừng đại ngàn Việt Bắc.',
    address: 'Khu Di tích Quốc gia đặc biệt Pác Bó, Cao Bằng',
  },
  {
    id: 'site_nha_san',
    name: 'Nhà sàn Bác Hồ',
    location: 'Khu Phủ Chủ tịch, Ba Đình',
    province: 'Thủ đô Hà Nội',
    role: 'Nơi Bác sống và làm việc lâu nhất (15 năm)',
    yearPeriod: '1954 – 1969',
    imageUrl: '/assets/hcm-space/bac-ho-wicker-chair.jpg',
    summary:
      'Ngôi nhà sàn gỗ giản dị theo kiểu nhà đồng bào dân tộc thiểu số Việt Bắc, nép mình dưới rặng xoài râm mát và nhìn ra ao cá biếc. Đây là biểu tượng mẫu mực của lối sống thanh bạch, cần kiệm liêm chính.',
    childhoodConnection:
      'Hàng triệu thiếu nhi trong và ngoài nước khi về Thủ đô viếng Bác đều mong ước được bước lên bậc thang gỗ nhà sàn và vỗ tay gọi đàn cá Bác Hồ dưới bờ ao râm bóng mát.',
    address: 'Số 1 Hoàng Hoa Thám, Ba Đình, Hà Nội',
  },
  {
    id: 'site_ben_nha_rong',
    name: 'Bến Nhà Rồng',
    location: 'Số 1 Nguyễn Tất Thành, Phường 12, Quận 4',
    province: 'TP. Hồ Chí Minh',
    role: 'Nơi Bác ra đi tìm đường cứu nước ngày 05/6/1911',
    yearPeriod: '05/06/1911',
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    summary:
      'Ngày 05/6/1911, từ thương cảng Sài Gòn, người thanh niên yêu nước Nguyễn Tất Thành với tên gọi Văn Ba đã lên con tàu buôn Đô đốc Latouche-Tréville ra đi tìm đường cứu nước, mở đầu hành trình 30 năm bôn ba vĩ đại.',
    childhoodConnection:
      'Tấm gương dấn thân không sợ gian lao, quyết tâm vì độc lập của Tổ quốc từ tuổi đôi mươi là ngọn đèn soi đường cho tuổi trẻ và thiếu nhi noi theo.',
    address: 'Bảo tàng Hồ Chí Minh – Chi nhánh TP. Hồ Chí Minh, Quận 4',
  },
  {
    id: 'site_chua_hoi_khanh',
    name: 'Chùa Hội Khánh & Đất Thủ',
    location: 'Đường Chùa Hội Khánh, Phường Phú Cường',
    province: 'TP. Thủ Dầu Một (Bình Dương)',
    role: 'Dấu ấn cụ Phó bảng Nguyễn Sinh Sắc & Hội Danh dự',
    yearPeriod: '1923 – 1926',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    summary:
      'Tại Chùa Hội Khánh cổ kính của Đất Thủ, thân sinh Bác Hồ là cụ Phó bảng Nguyễn Sinh Sắc đã cùng Hòa thượng Từ Văn và các chí sĩ yêu nước sáng lập Hội Danh dự yêu nước, bốc thuốc chữa bệnh cho người nghèo và gieo mầm cách mạng.',
    childhoodConnection:
      'Đây là niềm tự hào sâu sắc của học sinh và thiếu nhi Thủ Dầu Một khi quê hương mình được vinh dự lưu dấu bước chân của thân sinh Chủ tịch Hồ Chí Minh kính yêu.',
    address: 'Số 35 đường Yersin / Chùa Hội Khánh, TP. Thủ Dầu Một',
  },
];

// 4. TRUYỆN KỂ ĐẠO ĐỨC VỀ BÁC HỒ DÀNH CHO THIẾU NHI
export const MORAL_STORIES: MoralStoryItem[] = [
  {
    id: 'story_01',
    title: 'Ai ngoan sẽ được thưởng',
    lesson: 'Thật thà, dũng cảm nhận lỗi là đức tính đáng quý nhất',
    suitableAge: 'Tiểu học (Lớp 1 – 5)',
    readingTime: '3 phút',
    content:
      'Một buổi sáng, Bác Hồ đến thăm một trại nhi đồng. Vừa thấy Bác, các em nhỏ đã reo vang, ùa ra đón Bác. Bác dắt tay hai em nhỏ nhất đi vào lớp. Bác đi thăm phòng ngủ, phòng ăn, nhà bếp rồi trở lại phòng họp. Bác hỏi các em:\n- Các cháu chơi có vui không?\n- Thưa Bác, vui lắm ạ!\n- Các cháu ăn có no không?\n- No lắm ạ!\n- Các cô có mắng phạt các cháu không?\n- Không ạ!\nBác cười hiền từ: "Thế thì tốt lắm! Bây giờ Bác chia kẹo cho các cháu. Cháu nào ngoan thì được thưởng, cháu nào không ngoan thì không được thưởng. Các cháu có đồng ý không?"\n- Đồng ý ạ! — Cả phòng đồng thanh reo lên.\nCác em nhỏ xếp hàng lần lượt đến nhận kẹo từ tay Bác. Đến lượt bạn Tộ, Tộ đứng nép vào góc và lí nhí: "Thưa Bác, hôm nay cháu chưa ngoan, cháu đã làm vỡ bát, cháu không dám nhận kẹo của Bác đâu ạ!"\nBác mỉm cười ân cần xoa đầu Tộ và nói: "Cháu biết nhận lỗi thế là dũng cảm lắm! Người dũng cảm nhận khuyết điểm cũng là người ngoan, cháu xứng đáng được nhận phần kẹo này."\nTộ xúc động nhận lấy chiếc kẹo Bác trao, trong lòng ngập tràn niềm vui và tự hứa từ nay sẽ cẩn thận và chăm ngoan hơn nữa.',
    moralLesson:
      'Ai cũng có thể mắc sai lầm, nhưng điều quan trọng nhất là phải thật thà, dũng cảm nhận lỗi và sửa chữa. Sự trung thực luôn được mọi người tôn trọng và yêu quý.',
    questions: [
      'Tại sao bạn Tộ ban đầu không dám nhận kẹo của Bác?',
      'Bác Hồ đã nói gì khi bạn Tộ thật thà nhận lỗi?',
      'Em rút ra được bài học gì cho bản thân khi trót mắc khuyết điểm?',
    ],
  },
  {
    id: 'story_02',
    title: 'Bát chè sẻ đôi',
    lesson: 'Tinh thần sẻ chia, đồng cam cộng khổ với mọi người',
    suitableAge: 'Tiểu học & THCS',
    readingTime: '3 phút',
    content:
      'Thời kỳ ở chiến khu Việt Bắc, đồng chí phục vụ nấu được một bát chè đỗ đen rất ngon mang lên cho Bác Hồ bồi dưỡng vì thấy Bác dạo này gầy và mệt mỏi.\nBác nhìn bát chè thơm phức rồi quay sang hỏi đồng chí phục vụ:\n- Chú đã ăn chè chưa?\n- Dạ thưa Bác, chè chỉ đủ nấu một bát riêng cho Bác thôi ạ.\nBác mỉm cười, cầm chiếc thìa cẩn thận chia bát chè làm hai phần bằng nhau rồi nói:\n- Nào, chú một nửa, Bác một nửa. Kháng chiến gian khổ, cán bộ chiến sĩ ta cùng chịu đói chịu rét, có bát chè ngọt thì Bác cháu ta cùng chia nhau ăn mới vui!\nNgười phục vụ nghẹn ngào nhìn Bác, cảm nhận được tình thương bao la của vị lãnh tụ vĩ đại luôn nghĩ đến người khác trước khi nghĩ đến mình.',
    moralLesson:
      'Sống trong tập thể phải biết chia ngọt sẻ bùi, không mưu cầu đặc quyền cho riêng mình. Tinh thần sẻ chia làm cho tình bạn, tình đồng chí thêm ấm áp, bền chặt.',
    questions: [
      'Khi nhận bát chè, Bác Hồ đã làm gì đầu tiên?',
      'Câu nói nào của Bác thể hiện tinh thần sẻ chia sâu sắc?',
      'Ở trường, em đã chia sẻ đồ dùng hoặc giúp đỡ bạn bè như thế nào?',
    ],
  },
  {
    id: 'story_03',
    title: 'Bác Hồ với cây vú sữa miền Nam',
    lesson: 'Tình cảm sắt son, thủy chung hướng về miền Nam ruột thịt',
    suitableAge: 'Tiểu học & THCS',
    readingTime: '4 phút',
    content:
      'Năm 1954, sau Hiệp định Giơ-ne-vơ, đồng bào miền Nam gửi tặng Bác Hồ một cây vú sữa nhỏ tượng trưng cho tấm lòng son sắt của nhân dân miền Nam đối với Bác.\nBác mừng lắm, tự tay Bác chọn mảnh đất tốt nhất cạnh nhà làm việc để trồng cây vú sữa. Hàng ngày, sau giờ làm việc, Bác tự tay tưới nước, bắt sâu, vun gốc cho cây. Những ngày mùa đông giá rét, Bác lấy rơm rạ quấn quanh thân cây để giữ ấm cho cây khỏi chết cóng.\nMỗi lần đón các đoàn cán bộ, chiến sĩ hay thiếu nhi miền Nam ra thăm miền Bắc, Bác đều dẫn ra xem cây vú sữa và nói: "Bác chăm cây vú sữa này cũng như Bác ngày đêm nhớ về đồng bào và các cháu thiếu nhi miền Nam ruột thịt!"',
    moralLesson:
      'Lòng thủy chung, son sắt và tình yêu thương đất nước là sợi dây thiêng liêng gắn kết mọi miền Tổ quốc Bắc – Trung – Nam một nhà.',
    questions: [
      'Cây vú sữa miền Nam do ai gửi tặng Bác Hồ?',
      'Bác Hồ đã chăm sóc cây vú sữa như thế nào?',
      'Cây vú sữa tượng trưng cho điều gì trong trái tim Bác?',
    ],
  },
  {
    id: 'story_04',
    title: 'Thời gian quý báu lắm',
    lesson: 'Tôn trọng giờ giấc, quý trọng thời gian của mình và của người khác',
    suitableAge: 'Tiểu học & THCS',
    readingTime: '3 phút',
    content:
      'Bác Hồ là người quý trọng thời gian nhất. Bác không bao giờ để ai phải đợi mình một phút nào. Một lần, Bác có hẹn đi họp với một đoàn cán bộ vào lúc 8 giờ sáng. Trời mưa tầm tã, đường sá sình lầy lội, xe của Bác gặp sự cố. Bác liền xuống xe, cùng đồng chí bảo vệ xắn quần đi bộ qua bãi bùn để kịp đến đúng giờ.\nKhi Bác bước vào phòng họp, đồng hồ điểm đúng 8 giờ. Quần áo Bác ướt sũng nước mưa, nhưng nụ cười Bác vẫn rạng rỡ. Bác nói với hội nghị:\n- Thời gian quý báu lắm các chú ạ. Bác đến muộn 10 phút thì 50 đồng chí ngồi đây cộng lại là mất toi 500 phút quý báu của kháng chiến rồi!',
    moralLesson:
      'Đúng giờ thể hiện sự tôn trọng chính mình và tôn trọng người khác. Thời gian trôi qua không bao giờ lấy lại được, vì vậy học sinh phải biết quý trọng từng phút giây học tập.',
    questions: [
      'Bác Hồ đã làm cách nào để đến buổi họp đúng giờ dù trời mưa to?',
      'Bác đã làm phép tính gì để nhắc nhở mọi người về giá trị thời gian?',
      'Em rèn luyện thói quen đúng giờ trong việc học như thế nào?',
    ],
  },
];

// 5. BÀI HÁT THIẾU NHI VỀ BÁC HỒ
export const CHILDREN_SONGS: ChildrenSongItem[] = [
  {
    id: 'song_01',
    title: 'Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng',
    composer: 'Nhạc sĩ Phong Nhã',
    year: '1945',
    famousLyrics: 'Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng / Ai yêu Bác Hồ Chí Minh hơn thiếu nhi Việt Nam...',
    fullLyrics:
      'Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng\nAi yêu Bác Hồ Chí Minh hơn thiếu nhi Việt Nam\nBác chúng em dáng cao cao, người thanh thanh\nBác chúng em mắt như sao, râu hơi dài\nBác chúng em nước da nâu vì sương gió\nBác chúng em thề cương quyết trả thù nhà\n\nHồ Chí Minh kính yêu, chúng em kính yêu Bác Hồ Chí Minh trọn một đời\nHồ Chí Minh kính yêu, Bác đã bao năm bôn ba nước ngoài vì giống nòi\nBác nay tuy đã già rồi, già rồi nhưng vẫn vui tươi\nNgày ngày chúng cháu múa hát ca ngợi Bác\nBác đưa chúng em đi tới chân trời tươi sáng ngời muôn đời!',
    story:
      'Bài hát được nhạc sĩ Phong Nhã sáng tác vào cuối năm 1945, ngay sau ngày Quốc khánh 02/9. Đây là bài hát thiếu nhi bất hủ nhất, đi cùng năm tháng của bao thế hệ măng non Việt Nam.',
    youtubeQuery: 'Ai yeu Bac Ho Chi Minh hon thieu nien nhi dong',
  },
  {
    id: 'song_02',
    title: 'Đêm qua em mơ gặp Bác Hồ',
    composer: 'Nhạc sĩ Xuân Giao',
    year: '1969',
    famousLyrics: 'Đêm qua em mơ gặp Bác Hồ / Râu Bác dài tóc Bác bạc phơ / Em âu yếm hôn đôi má Bác...',
    fullLyrics:
      'Đêm qua em mơ gặp Bác Hồ\nRâu Bác dài tóc Bác bạc phơ\nEm âu yếm hôn đôi má Bác\nVui múa hát em hát tặng Bác\n\nBác mỉm cười Bác khen em ngoan\nBác xoa đầu Bác khen em chăm\nEm hứa với Bác chăm ngoan học giỏi\nLàm nghìn việc tốt theo lời Bác khuyên!',
    story:
      'Giai điệu trong sáng, tha thiết diễn tả giấc mơ thần tiên của một em bé được gặp Bác Hồ, được Bác xoa đầu và khen ngoan.',
    youtubeQuery: 'Dem qua em mo gap Bac Ho',
  },
  {
    id: 'song_03',
    title: 'Bác Hồ người cho em tất cả',
    composer: 'Nhạc sĩ Hoàng Long - Hoàng Lân',
    year: '1975',
    famousLyrics: 'Cho ánh nắng sớm mai là mẹ và cô giáo / Cho trang sách thơm tho là thầy cô kính yêu / Cho em tình thương bao la là Bác Hồ kính yêu...',
    fullLyrics:
      'Cho ánh nắng ban mai là mẹ và cô giáo\nCho trang sách thơm tho là thầy cô kính yêu\nCho quả ngọt hoa thơm là đất trời xứ sở\nCho em tình thương bao la là Bác Hồ kính yêu!\n\nTừ hạt mầm nhỏ bé em lớn lên từng ngày\nNhờ công ơn nuôi dưỡng của gia đình, thầy cô\nVà lời Bác dạy bảo cho em thành người tốt\nNguyện noi gương Bác Hồ làm đẹp non sông này!',
    story:
      'Bài hát dạy các em lòng biết ơn sâu sắc đối với cha mẹ, thầy cô, quê hương và đặc biệt là công ơn trời biển của Bác Hồ kính yêu.',
    youtubeQuery: 'Bac Ho nguoi cho em tat ca',
  },
  {
    id: 'song_04',
    title: 'Như có Bác trong ngày đại thắng',
    composer: 'Nhạc sĩ Phạm Tuyên',
    year: '1975',
    famousLyrics: 'Như có Bác Hồ trong ngày vui đại thắng / Lời Bác nay đã thành chiến thắng huy hoàng...',
    fullLyrics:
      'Như có Bác Hồ trong ngày vui đại thắng\nLời Bác nay đã thành chiến thắng huy hoàng\nBa mươi năm đấu tranh giành toàn vẹn non sông\nBa mươi năm dân chủ cộng hòa kháng chiến đã thành công!\n\nViệt Nam - Hồ Chí Minh!\nViệt Nam - Hồ Chí Minh!\nViệt Nam - Hồ Chí Minh!\nViệt Nam - Hồ Chí Minh!',
    story:
      'Được nhạc sĩ Phạm Tuyên sáng tác trong đêm 28/4/1975 và phát sóng đúng trưa 30/4/1975 khi đất nước hoàn toàn thống nhất. Bài hát giản dị, hào hùng vang lên trong mọi dịp lễ hội của thiếu nhi cả nước.',
    youtubeQuery: 'Nhu co Bac trong ngay dai thang',
  },
];

// 6. TRANH VẼ THIẾU NHI ĐẤT THỦ VỀ BÁC HỒ (Mô hình sáng tạo tại các trường học Thủ Dầu Một)
export const SCHOOL_ARTWORKS: SchoolArtworkItem[] = [
  {
    id: 'art_01',
    title: 'Bác Hồ quàng khăn đỏ cho chúng em',
    studentName: 'Nguyễn Ngọc Mai Anh',
    gradeClass: 'Lớp 4A1',
    schoolName: 'Trường Tiểu học Nguyễn Du (Thủ Dầu Một)',
    award: 'Giải Nhất Hội thi Nét vẽ tuổi thơ 2026',
    imageUrl: '/assets/hcm-space/khong-gian-thieu-nhi-wall.jpg',
    description:
      'Bức tranh vẽ Bác Hồ mặc bộ đồ bà ba trắng giản dị, mỉm cười hiền hậu thắt chiếc khăn quàng đỏ tươi cho một bạn đội viên dưới bóng cây hoa phượng rực rỡ.',
  },
  {
    id: 'art_02',
    title: 'Chúng em chăm sóc vườn hoa ơn Bác',
    studentName: 'Trần Minh Khang',
    gradeClass: 'Lớp 5C',
    schoolName: 'Trường Tiểu học Phú Cường (Thủ Dầu Một)',
    award: 'Giải Nhì phong trào Em làm nghìn việc tốt',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    description:
      'Các bạn học sinh cùng nhau tưới nước, nhặt cỏ, chăm sóc công trình măng non bồn hoa Bác Hồ trong sân trường ngập tràn ánh nắng.',
  },
  {
    id: 'art_03',
    title: 'Về nguồn Chùa Hội Khánh nhớ ơn Bác',
    studentName: 'Lê Hoàng Yến Nhi',
    gradeClass: 'Lớp 7A3',
    schoolName: 'Trường THCS Chu Văn An (Thủ Dầu Một)',
    award: 'Giải Xuất sắc Hành trình Địa chỉ đỏ',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    description:
      'Bức tranh màu nước tái hiện chuyến hành trình về nguồn của Liên đội tại Chùa Hội Khánh, nơi ghi dấu cụ Phó bảng Nguyễn Sinh Sắc.',
  },
  {
    id: 'art_04',
    title: 'Ước mơ ra thăm Lăng Bác',
    studentName: 'Phạm Đức Huy',
    gradeClass: 'Lớp 3B',
    schoolName: 'Trường Tiểu học Lê Hồng Phong (Thủ Dầu Một)',
    award: 'Giải Triển vọng Hội thi Mỹ thuật Măng non',
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    description:
      'Bức tranh hồn nhiên vẽ các bạn nhỏ miền Nam mang hoa sen thắm ra Hà Nội viếng Lăng Bác và ngắm hàng tre xanh ngát bên Quảng trường Ba Đình.',
  },
];
