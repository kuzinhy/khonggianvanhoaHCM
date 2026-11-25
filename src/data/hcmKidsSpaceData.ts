/**
 * Dữ liệu Không Gian Văn Hóa Hồ Chí Minh Dành Cho Thiếu Nhi & Học Sinh (Bản Nâng Cấp Toàn Diện)
 * Nguồn tư liệu:
 * - Hội đồng Đội Trung ương & Nhà Xuất bản Kim Đồng
 * - Giáo trình Đạo đức & Lịch sử Tiểu học, THCS (Bộ GD&ĐT)
 * - Ban Tuyên giáo Thành ủy Thủ Dầu Một & Phòng Giáo dục - Đào tạo TP. Thủ Dầu Một
 * - Mô hình Không gian Văn hóa Hồ Chí Minh trong trường học tại các Liên đội TP. Thủ Dầu Một
 */

export interface FiveTeachingsItem {
  number: string;
  title: string;
  shortText: string;
  iconName: string;
  badgeColor: string;
  meaning: string;
  historicalContext: string;
  checklistItems: string[]; // Các tiêu chí tự rèn luyện hàng ngày
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
  icon: string;
  content: string;
  moralLesson: string;
  questions: string[];
  audioGuide?: string;
}

export interface ChildrenSongItem {
  id: string;
  title: string;
  composer: string;
  year: string;
  tag: string;
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

export interface KidsQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface ColoringPageItem {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Dễ (Lớp 1-3)' | 'Trung bình (Lớp 4-5)' | 'Nâng cao (THCS)';
  imageUrl: string;
  guidance: string;
}

export interface SchoolBrigadeItem {
  id: string;
  schoolName: string;
  brigadeName: string;
  ward: string;
  highlightModel: string;
  studentCount: number;
  goodDeedsCount: number;
}

// 1. 5 ĐIỀU BÁC HỒ DẠY THIẾU NIÊN NHI ĐỒNG (Kèm Góc Tự Rèn Luyện Checklist)
export const FIVE_TEACHINGS_DATA: FiveTeachingsItem[] = [
  {
    number: '01',
    title: 'Yêu Tổ quốc, yêu đồng bào',
    shortText: 'Lòng yêu nước bắt đầu từ tình yêu gia đình, thầy cô, bạn bè và quê hương Đất Thủ.',
    iconName: 'Heart',
    badgeColor: 'bg-rose-600 text-white',
    meaning:
      'Tổ quốc là đất nước Việt Nam thiêng liêng; đồng bào là nhân dân, là những người cùng chung một bọc mẹ Âu Cơ. Yêu Tổ quốc là tự hào về truyền thống ngàn năm dựng nước và giữ nước, trân trọng độc lập tự do mà bao thế hệ cha anh đã hy sinh xương máu. Yêu đồng bào là biết yêu thương, chia sẻ, đùm bọc, giúp đỡ mọi người xung quanh.',
    historicalContext:
      'Nhân dịp kỷ niệm 20 năm ngày thành lập Đội Thiếu niên Tiền phong (15/5/1961), Bác Hồ đã gửi thư dặn dò thiếu niên, nhi đồng cả nước 5 điều ngắn gọn, súc tích và mở đầu bằng lời căn dặn cốt lõi này.',
    checklistItems: [
      'Nghiêm trang chào cờ và hát to Quốc ca, Đội ca mỗi sáng thứ Hai',
      'Yêu quý bạn bè trong lớp, không chê bai hay phân biệt đối xử',
      'Tìm hiểu và tự hào về lịch sử Thủ Dầu Một, Chùa Hội Khánh, Di tích Nhà việc Phú Cường',
      'Kính trọng, lễ phép chào hỏi người lớn tuổi trong gia đình và xóm giềng',
    ],
    schoolActions: [
      'Trang nghiêm chào cờ và hát Quốc ca, Đội ca mỗi sáng thứ Hai.',
      'Chăm chỉ tìm hiểu lịch sử dân tộc, tham gia các buổi sinh hoạt chuyên đề Không gian văn hóa Bác Hồ.',
      'Yêu quý bạn bè, không phân biệt đối xử, luôn giúp đỡ bạn có hoàn cảnh khó khăn.',
    ],
    homeActions: [
      'Kính trọng, yêu thương và nghe lời dạy bảo của ông bà, cha mẹ.',
      'Quan tâm đến xóm giềng, chào hỏi lễ phép với người lớn tuổi.',
      'Tự hào gìn giữ những nét đẹp truyền thống và nếp sống văn minh gia đình.',
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
    badgeColor: 'bg-amber-500 text-slate-950',
    meaning:
      'Học tập tốt không chỉ là đạt điểm số cao, mà là học hiểu sâu, học đi đôi với hành, trung thực trong thi cử và có tinh thần tự học suốt đời như Bác Hồ. Lao động tốt là yêu quý lao động, trân trọng giọt mồ hôi của người lao động, tích cực làm việc nhà và trực nhật trường lớp.',
    historicalContext:
      'Bác Hồ dạy: "Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em."',
    checklistItems: [
      'Chuẩn bị đầy đủ sách vở và làm bài tập trước khi đến lớp',
      'Trung thực tuyệt đối: không quay cóp bài, không nhìn bài của bạn',
      'Tự giác giúp cha mẹ việc nhà: quét nhà, rửa bát, gấp chăn màn',
      'Tích cực tham gia trực nhật lớp và phong trào "Kế hoạch nhỏ"',
    ],
    schoolActions: [
      'Chuẩn bị bài vở chu đáo trước khi đến lớp, tích cực giơ tay phát biểu xây dựng bài.',
      'Tự giác trực nhật, quét dọn lớp học, chăm sóc bồn hoa công trình măng non sân trường.',
      'Không quay cóp, trung thực trong kiểm tra và thi cử.',
    ],
    homeActions: [
      'Tự giác học bài đúng giờ, không để cha mẹ phải nhắc nhở.',
      'Giúp đỡ cha mẹ việc nhà phù hợp lứa tuổi: quét nhà, rửa bát, gấp quần áo, tưới cây.',
      'Đọc thêm sách báo bổ ích, rèn luyện thói quen đọc sách 20 phút mỗi ngày.',
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
    badgeColor: 'bg-emerald-600 text-white',
    meaning:
      'Đoàn kết là cùng chung một chí hướng, gắn bó như anh em một nhà, giúp nhau cùng tiến bộ trong học tập và rèn luyện. Kỷ luật là tự giác chấp hành nội quy của trường, của lớp, luật lệ giao thông và các quy định của xã hội.',
    historicalContext:
      'Chủ tịch Hồ Chí Minh khẳng định: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công." Trong tập thể thiếu nhi, đoàn kết là nền tảng để Đội Thiếu niên Tiền phong phát triển vững mạnh.',
    checklistItems: [
      'Đi học đúng giờ, mặc đúng đồng phục và đeo khăn quàng đỏ ngay ngắn',
      'Hòa đồng, không gây gổ, cãi vã hay bắt nạt bạn bè',
      'Giữ trật tự, tập trung lắng nghe thầy cô giảng bài',
      'Đội mũ bảo hiểm khi ngồi trên xe máy, đi bộ đúng phần đường',
    ],
    schoolActions: [
      'Hòa đồng với các bạn trong lớp, nhiệt tình tham gia nhóm "Đôi bạn cùng tiến".',
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
      'Bác Hồ ví tập thể như một cỗ máy đồng hồ tinh xảo: kim giờ, kim phút, quả lắc, bánh răng... mỗi bộ phận một chức năng. Nếu kim đòi làm mặt số thì đồng hồ sẽ hỏng ngay...',
  },
  {
    number: '04',
    title: 'Giữ gìn vệ sinh thật tốt',
    shortText: 'Thân thể sạch sẽ thì khỏe mạnh; môi trường sạch đẹp thì cuộc sống trong lành, hạnh phúc.',
    iconName: 'Sparkles',
    badgeColor: 'bg-blue-600 text-white',
    meaning:
      'Giữ gìn vệ sinh là rèn luyện nếp sống văn minh: giữ sạch thân thể, sạch quần áo, sạch góc học tập, sạch lớp học và giữ gìn môi trường thiên nhiên xung quanh xanh - sạch - đẹp.',
    historicalContext:
      'Bác Hồ có lối sống vô cùng ngăn nắp, giản dị và sạch sẽ. Ngôi nhà sàn của Bác luôn thoáng mát, gọn gàng, đồ đạc được sắp xếp khoa học, ngăn nắp đến từng cuốn sách, cây bút.',
    checklistItems: [
      'Bỏ rác đúng thùng rác, không xả rác bừa bãi trong lớp và sân trường',
      'Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh',
      'Giữ gìn góc học tập và phòng ngủ luôn ngăn nắp, sạch sẽ',
      'Không viết, vẽ bậy lên bàn ghế, tường lớp học',
    ],
    schoolActions: [
      'Bỏ rác đúng nơi quy định, phân loại rác thải tại trường học.',
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
    badgeColor: 'bg-purple-600 text-white',
    meaning:
      'Khiêm tốn là không tự kiêu, không khoe khoang, luôn biết lắng nghe và học hỏi người khác. Thật thà là trung thực, không dối trá, ngay thẳng trong lời nói và hành động. Dũng cảm là không sợ khó khăn, dám nhận khuyết điểm khi mình sai và dám bảo vệ lẽ phải.',
    historicalContext:
      'Ban đầu năm 1961, câu thứ 5 là "Khiêm tốn, thật thà, dũng cảm". Đến năm 1965, khi xem lại tài liệu chuẩn bị in sách nhỏ "Bác Hồ với thiếu nhi", Bác Hồ đã tự tay dùng bút mực đỏ sửa bổ sung từ "Khiêm tốn" lên đầu câu để nhắc nhở các cháu không được kiêu ngạo khi đạt thành tích.',
    checklistItems: [
      'Dũng cảm nhận lỗi khi mình làm sai, không đổ lỗi cho người khác',
      'Nhặt được của rơi trả lại người đánh mất',
      'Không kiêu căng khi đạt điểm cao hay được khen thưởng',
      'Luôn nói thật với cha mẹ, thầy cô giáo và bạn bè',
    ],
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

// 2. BỘ SƯU TẬP ẢNH LỊCH SỬ "BÁC HỒ VỚI THIẾU NHI"
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

// 3. 6 ĐỊA DANH LỊCH SỬ DẤU CHÂN BÁC & ĐẤT THỦ
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

// 4. TUYỂN TẬP 10 TRUYỆN KỂ ĐẠO ĐỨC VỀ BÁC HỒ CHO THIẾU NHI (CHUẨN BỘ GD&ĐT)
export const MORAL_STORIES: MoralStoryItem[] = [
  {
    id: 'story_01',
    title: 'Ai ngoan sẽ được thưởng',
    lesson: 'Thật thà, dũng cảm nhận lỗi là đức tính đáng quý nhất',
    suitableAge: 'Tiểu học (Lớp 1 – 5)',
    readingTime: '3 phút',
    icon: '🍬',
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
    icon: '🥣',
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
    icon: '🌳',
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
    icon: '⏰',
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
  {
    id: 'story_05',
    title: 'Chiếc áo ấm đêm đông',
    lesson: 'Tình yêu thương bao la và sự quan tâm sâu sắc tới chiến sĩ',
    suitableAge: 'Tiểu học & THCS',
    readingTime: '3 phút',
    icon: '🧥',
    content:
      'Mùa đông năm 1951 ở chiến khu Việt Bắc, gió bấc thổi từng cơn lạnh buốt thấu xương. Bác Hồ đang ngồi làm việc khuya bên ngọn đèn dầu. Nhìn ra ngoài hiên, Bác thấy chú chiến sĩ cảnh vệ đứng gác dưới mưa phùn, người run lên từng chặp vì giá rét.\nBác liền đứng dậy, cởi chiếc áo trấn thủ bông ấm áp của mình, đi nhẹ nhàng ra cửa và khoác lên vai chú lính gác. Chú xúc động rơi nước mắt: "Thưa Bác, Bác mặc cho ấm ạ, cháu trẻ cháu chịu được!"\nBác vỗ vai chú trìu mến: "Bác ngồi trong nhà còn đỡ lạnh, chú đứng gác ngoài trời gió bấc thế này rét lắm. Chú mặc vào để giữ sức khỏe mà bảo vệ cơ quan!"',
    moralLesson:
      'Tình yêu thương con người bắt đầu từ những hành động quan tâm nhỏ bé, chân thành nhất đối với những người xung quanh.',
    questions: [
      'Bác Hồ đã làm gì khi thấy chú lính gác đứng dưới gió rét?',
      'Hành động của Bác thể hiện phẩm chất cao quý nào?',
      'Em có thể làm gì để chia sẻ sự ấm áp với những người khó khăn?',
    ],
  },
  {
    id: 'story_06',
    title: 'Hai bàn tay trắng',
    lesson: 'Ý chí tự lập, không ngại gian khó để theo đuổi lý tưởng lớn',
    suitableAge: 'THCS (Lớp 6 – 9)',
    readingTime: '4 phút',
    icon: '🤝',
    content:
      'Trước khi rời Tổ quốc ra đi tìm đường cứu nước năm 1911, anh thanh niên Nguyễn Tất Thành rủ người bạn thân là anh Lê cùng đi. Anh Lê hỏi:\n- Chúng ta lấy đâu ra tiền mà đi?\nAnh Thành xòe hai bàn tay ra và dứt khoát nói:\n- Đây, tiền ở đây! Chúng ta có hai bàn tay, chúng ta sẽ làm việc. Chúng ta sẽ làm bất cứ việc gì để sống và để đi!\nSau đó, anh Thành đã xuống tàu Đô đốc Latouche-Tréville nhận làm phụ bếp, gánh than, quét dọn vô cùng cực nhọc nhưng ý chí không hề lay chuyển.',
    moralLesson:
      'Bàn tay và khối óc là tài sản quý giá nhất. Chỉ cần có ý chí kiên định và lòng dũng cảm, con người có thể vượt qua mọi chông gai để vươn tới thành công.',
    questions: [
      'Anh Thành đã trả lời bạn mình bằng hành động và câu nói gì?',
      'Trên con tàu sang Pháp, anh Thành đã làm những công việc gì?',
      'Bài học về đôi bàn tay gợi cho em suy nghĩ gì về tính tự lập?',
    ],
  },
  {
    id: 'story_07',
    title: 'Chiếc đồng hồ và bài học phân công',
    lesson: 'Tinh thần trách nhiệm và sự phối hợp nhịp nhàng trong tập thể',
    suitableAge: 'Tiểu học & THCS',
    readingTime: '3 phút',
    icon: '⏱️',
    content:
      'Tại một lớp học chính trị, Bác Hồ rút trong túi áo ra một chiếc đồng hồ quả quýt bằng kim loại sáng bóng. Bác hỏi cán bộ:\n- Trong chiếc đồng hồ này, các chú thấy bộ phận nào quan trọng?\nCó người nói kim giờ, có người nói kim phút, có người nói quả lắc, bánh xe.\nBác mỉm cười nói: "Đúng vậy, mỗi bộ phận đều có nhiệm vụ riêng. Kim chỉ giờ, kim chỉ phút chạy trên mặt số, ai cũng nhìn thấy. Nhưng bánh xe, lò xo nằm kín bên trong, nếu nó đòi ra ngoài mặt số như kim thì đồng hồ có chạy được không?\nTrong cách mạng và học tập cũng vậy, mỗi người một nhiệm vụ, công việc nào cũng vẻ vang nếu hoàn thành tốt."',
    moralLesson:
      'Tập thể vững mạnh khi mỗi cá nhân biết tôn trọng nhiệm vụ của mình và của bạn bè, không ghen tị hay tranh giành vị trí nổi bật.',
    questions: [
      'Bác Hồ đã mượn hình ảnh chiếc đồng hồ để dạy bài học gì?',
      'Nếu bánh xe đòi nhảy lên mặt số thì điều gì sẽ xảy ra?',
      'Trong lớp học, em thấy các bạn lớp trưởng, tổ trưởng, học sinh cần phối hợp thế nào?',
    ],
  },
  {
    id: 'story_08',
    title: 'Nước nóng, nước nguội',
    lesson: 'Bài học về kiềm chế cảm xúc, điềm tĩnh khi xử lý công việc',
    suitableAge: 'THCS (Lớp 6 – 9)',
    readingTime: '3 phút',
    icon: '🍵',
    content:
      'Một đồng chí cán bộ trung đoàn có tính nóng nảy, hay mắng mỏ cấp dưới được Bác gọi lên Phủ Chủ tịch. Khi đồng chí bước vào, trời nắng gắt, mồ hôi nhễ nhại. Trên bàn Bác đặt sẵn hai cốc nước: một cốc nước sôi bốc khói nghi ngút và một cốc nước mát trong lành.\nBác chỉ cốc nước sôi nói:\n- Chú uống đi!\nĐồng chí ngạc nhiên: "Thưa Bác, nước nóng quá, làm sao uống được ạ!"\nBác cười hiền hậu: "Đúng rồi! Nước nóng chú không uống được. Cũng như khi chú nổi giận, lời nói chú như cốc nước sôi vậy, cấp dưới làm sao nuốt trôi? Điềm tĩnh, dịu dàng như cốc nước mát này thì ai cũng lắng nghe."',
    moralLesson:
      'Khi nóng giận, lời nói có thể làm tổn thương người khác. Hãy học cách hít thở sâu, giữ bình tĩnh để tìm ra cách giải quyết đúng đắn nhất.',
    questions: [
      'Hai cốc nước trên bàn Bác có gì khác nhau?',
      'Bác Hồ khuyên vị cán bộ điều gì qua hình ảnh cốc nước nóng?',
      'Khi gặp chuyện bực mình ở trường, em làm thế nào để giữ bình tĩnh?',
    ],
  },
  {
    id: 'story_09',
    title: 'Ba chiếc ba lô',
    lesson: 'Tính bình đẳng, công bằng, không mưu cầu đặc quyền',
    suitableAge: 'Tiểu học & THCS',
    readingTime: '3 phút',
    icon: '🎒',
    content:
      'Trong một chuyến công tác băng rừng lội suối, đoàn của Bác gồm có Bác và hai đồng chí bảo vệ. Đồng chí bảo vệ thấy Bác tuổi cao nên chuẩn bị ba chiếc ba lô: chiếc to nặng nhất dành cho mình, chiếc vừa cho bạn, còn chiếc ba lô nhỏ nhẹ nhất dành cho Bác.\nĐi được một quãng, Bác cho đoàn dừng chân nghỉ và hỏi:\n- Chú mở ba lô ra cho Bác xem trong đó có những gì nào?\nThấy ba lô của các chú đựng toàn gạo, tài liệu nặng trịch, còn ba lô của Bác chỉ có chiếc khăn mặt và bộ quần áo, Bác không đồng ý. Bác nói:\n- Bác cháu ta cùng đi đường xa gian khổ như nhau. Phải chia đều đồ đạc ra ba phần bằng nhau, cùng gánh vác trách nhiệm thì mới bình đẳng!',
    moralLesson:
      'Người lãnh đạo chân chính luôn san sẻ khó khăn với mọi người, không bao giờ dùng chức vụ để mưu cầu sự an nhàn cho riêng mình.',
    questions: [
      'Vì sao các chú bảo vệ chuẩn bị cho Bác chiếc ba lô nhẹ nhất?',
      'Bác Hồ đã yêu cầu sắp xếp lại ba lô như thế nào?',
      'Em học được bài học gì về sự công bằng trong làm việc nhóm?',
    ],
  },
  {
    id: 'story_10',
    title: 'Đôi dép cao su của Bác',
    lesson: 'Lối sống giản dị, cần kiệm, gắn bó máu thịt với nhân dân',
    suitableAge: 'Tiểu học (Lớp 1 – 5)',
    readingTime: '3 phút',
    icon: '🩴',
    content:
      'Đôi dép cao su của Bác được làm từ một chiếc lốp ô tô quân sự cũ từ năm 1947. Đôi dép ấy đã theo chân Bác đi khắp chiến khu Việt Bắc, sang tận nước ngoài và về lại Thủ đô Hà Nội.\nNhiều lần quai dép bị đứt, các đồng chí bảo vệ đề nghị Bác thay đôi dép mới, nhưng Bác đều bảo:\n- Dép còn đóng quai đi tốt, chưa hỏng, mua đôi mới tốn tiền của nhân dân!\nĐôi dép lốp giản dị đã trở thành biểu tượng thiêng liêng của một vị Chủ tịch nước sống cả cuộc đời thanh bạch, vì dân vì nước.',
    moralLesson:
      'Thực hành tiết kiệm từ những vật dụng nhỏ nhất là phẩm chất đáng quý của người học sinh văn minh.',
    questions: [
      'Đôi dép của Bác Hồ được làm từ vật liệu gì?',
      'Vì sao Bác không chịu đổi đôi dép mới khi quai dép bị tuột?',
      'Em đã thực hành tiết kiệm đồ dùng học tập và quần áo như thế nào?',
    ],
  },
];

// 5. 8 BÀI HÁT THIẾU NHI BẤT HỦ VỀ BÁC HỒ
export const CHILDREN_SONGS: ChildrenSongItem[] = [
  {
    id: 'song_01',
    title: 'Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng',
    composer: 'Nhạc sĩ Phong Nhã',
    year: '1945',
    tag: 'Bài ca Đội bất hủ',
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
    tag: 'Giấc mơ tuổi thơ',
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
    tag: 'Lòng biết ơn sâu sắc',
    famousLyrics: 'Cho ánh nắng sớm mai là mẹ và cô giáo / Cho trang sách thơm tho là thầy cô kính yêu / Cho em tình thương bao la là Bác Hồ kính yêu...',
    fullLyrics:
      'Cho ánh nắng ban mai là mẹ và cô giáo\nCho trang sách thơm tho là thầy cô kính yêu\nCho quả ngọt hoa thơm là đất trời xứ sở\nCho em tình thương bao la là Bác Hồ kính yêu!\n\nTừ hạt mầm nhỏ bé em lớn lên từng ngày\nNhờ công ơn nuôi dưỡng của gia đình, thầy cô\nVà lời Bác dạy bảo cho em thành người tốt\nNguyện noi gương Bác Hồ làm đẹp non sông này!',
    story:
      'Bài hát dạy các em lòng biết ơn sâu sắc đối với cha mẹ, thầy cô, quê hương và đặc biệt là công ơn trời biển của Bác Hồ kính yêu.',
    youtubeQuery: 'Bac Ho nguoi cho em tat ca',
  },
  {
    id: 'song_04',
    title: 'Từ rừng xanh cháu về thăm lăng Bác',
    composer: 'Nhạc sĩ Hoàng Long - Hoàng Lân',
    year: '1978',
    tag: 'Thiếu nhi vùng cao',
    famousLyrics: 'Đi từ bản làng xa xôi chân em bước qua bao suối đèo / Về Thủ đô thăm Bác Hồ kính yêu...',
    fullLyrics:
      'Đi từ bản làng xa xôi chân em bước qua bao suối đèo\nKhăn quàng đỏ bay phấp phới trong nắng mai\nVề Thủ đô rộn rã bước chân vui\nĐược vào Lăng viếng Bác lòng bồi hồi xốn xang!\n\nNhìn Bác ngủ yên bình trong hương hoa thơm ngát\nLời Bác dặn năm xưa vẫn vang vọng núi rừng\nCháu xin hứa học chăm, rèn luyện tốt\nĐể mai này xây dựng quê hương đẹp tươi!',
    story:
      'Tình cảm thiêng liêng, trong trẻo của các em thiếu nhi các dân tộc thiểu số vùng cao lặn lội về Thủ đô Hà Nội vào Lăng viếng Bác Hồ.',
    youtubeQuery: 'Tu rung xanh chau ve tham lang Bac',
  },
  {
    id: 'song_05',
    title: 'Như có Bác trong ngày đại thắng',
    composer: 'Nhạc sĩ Phạm Tuyên',
    year: '1975',
    tag: 'Bài ca non sông thống nhất',
    famousLyrics: 'Như có Bác Hồ trong ngày vui đại thắng / Lời Bác nay đã thành chiến thắng huy hoàng...',
    fullLyrics:
      'Như có Bác Hồ trong ngày vui đại thắng\nLời Bác nay đã thành chiến thắng huy hoàng\nBa mươi năm đấu tranh giành toàn vẹn non sông\nBa mươi năm dân chủ cộng hòa kháng chiến đã thành công!\n\nViệt Nam - Hồ Chí Minh!\nViệt Nam - Hồ Chí Minh!\nViệt Nam - Hồ Chí Minh!\nViệt Nam - Hồ Chí Minh!',
    story:
      'Được nhạc sĩ Phạm Tuyên sáng tác trong đêm 28/4/1975 và phát sóng đúng trưa 30/4/1975 khi đất nước hoàn toàn thống nhất. Bài hát giản dị, hào hùng vang lên trong mọi dịp lễ hội của thiếu nhi cả nước.',
    youtubeQuery: 'Nhu co Bac trong ngay dai thang',
  },
  {
    id: 'song_06',
    title: 'Khăn quàng thắm mãi vai em',
    composer: 'Nhạc sĩ Ngô Ngọc Báu',
    year: '1970',
    tag: 'Tự hào người đội viên',
    famousLyrics: 'Khi em vào Đội chiếc khăn quàng đỏ tươi / Như một lời hứa với Bác kính yêu...',
    fullLyrics:
      'Khi em vào Đội chiếc khăn quàng đỏ tươi\nNhư một lời hứa với Bác kính yêu\nKhăn quàng thắm mãi trên vai em từng ngày\nNhắc nhở em chăm ngoan rèn luyện thành người tốt\n\nMàu khăn đỏ như máu thắm cha anh\nSoi sáng đường em tiến bước dưới cờ Đội quang vinh!',
    story:
      'Khăn quàng đỏ là một phần của lá cờ Tổ quốc. Bài hát bồi đắp niềm tự hào khi các em được đứng vào hàng ngũ Đội Thiếu niên Tiền phong Hồ Chí Minh.',
    youtubeQuery: 'Khan quang tham mai vai em',
  },
  {
    id: 'song_07',
    title: 'Em mơ gặp Bác Hồ',
    composer: 'Nhạc sĩ Xuân Giao',
    year: '1972',
    tag: 'Bài ca tuổi thần tiên',
    famousLyrics: 'Em mơ gặp Bác Hồ trong giấc ngủ say nồng / Bác phát cho em chiếc kẹo thơm ngon...',
    fullLyrics:
      'Em mơ gặp Bác Hồ trong giấc ngủ say nồng\nBác phát cho em chiếc kẹo thơm ngon\nBác hỏi em học hành có chăm chỉ không\nEm thưa với Bác: Cháu luôn là Cháu ngoan Bác Hồ!',
    story:
      'Hình ảnh Bác Hồ luôn hiện diện trong giấc ngủ và tâm thức hồn nhiên của các em nhỏ như người ông ruột thịt trong gia đình.',
    youtubeQuery: 'Em mo gap Bac Ho',
  },
  {
    id: 'song_08',
    title: 'Hành khúc Đội TNTP Hồ Chí Minh',
    composer: 'Nhạc sĩ Phong Nhã',
    year: '1954',
    tag: 'Đội ca chính thức',
    famousLyrics: 'Cùng nhau ta đi lên nối bước anh hùng / Như tổ quốc hào hùng tiến lên...',
    fullLyrics:
      'Cùng nhau ta đi lên theo bước anh hùng\nNhư cánh chim tung bay trên trời quê hương\nĐội ta mang tên Bác Hồ vĩ đại\nQuyết tâm học hành làm rạng rỡ non sông!\n\nTiến lên! Đoàn viên măng non Việt Nam!\nTiến lên! Vì ngày mai tương lai tươi sáng!',
    story:
      'Bài hát chính thức được chọn làm Đội ca của Đội Thiếu niên Tiền phong Hồ Chí Minh vang lên trang nghiêm trong tất cả các buổi lễ Chào cờ đầu tuần tại các trường học.',
    youtubeQuery: 'Doi ca Phong Nha',
  },
];

// 6. BỘ 10 CÂU HỎI ĐỐ VUI THIẾU NHI VÂNG LỜI BÁC (CÓ CẤP GIẤY KHEN QR)
export const KIDS_QUIZ_QUESTIONS: KidsQuizQuestion[] = [
  {
    id: 1,
    topic: '5 Điều Bác Hồ Dạy',
    question: 'Điều thứ nhất trong 5 Điều Bác Hồ dạy thiếu niên, nhi đồng là gì?',
    options: [
      'A. Học tập tốt, lao động tốt',
      'B. Yêu Tổ quốc, yêu đồng bào',
      'C. Đoàn kết tốt, kỷ luật tốt',
      'D. Khiêm tốn, thật thà, dũng cảm',
    ],
    correctAnswer: 1,
    explanation:
      'Điều 1 trong 5 Điều Bác Hồ dạy là: "Yêu Tổ quốc, yêu đồng bào". Lòng yêu nước bắt đầu từ tình thương yêu gia đình, thầy cô và nhân dân.',
  },
  {
    id: 2,
    topic: 'Lịch sử Đội TNTP',
    question: 'Bác Hồ đã gửi bức thư căn dặn 5 Điều cho thiếu nhi nhân dịp kỷ niệm ngày lễ nào?',
    options: [
      'A. Ngày thành lập Quân đội nhân dân (22/12)',
      'B. Kỷ niệm 20 năm thành lập Đội TNTP Hồ Chí Minh (15/5/1961)',
      'C. Ngày Quốc khánh 02/9',
      'D. Ngày Tết Trung thu 1945',
    ],
    correctAnswer: 1,
    explanation:
      'Nhân dịp kỷ niệm 20 năm ngày thành lập Đội (15/5/1941 – 15/5/1961), Bác Hồ đã gửi thư căn dặn 5 Điều nổi tiếng.',
  },
  {
    id: 3,
    topic: 'Lịch sử Đội TNTP',
    question: 'Vào năm 1965, Bác Hồ đã tự tay dùng bút mực đỏ sửa bổ sung từ nào vào đầu Điều 5?',
    options: [
      'A. Dũng cảm',
      'B. Cần cù',
      'C. Khiêm tốn',
      'D. Tiết kiệm',
    ],
    correctAnswer: 2,
    explanation:
      'Năm 1965, Bác đã bổ sung từ "Khiêm tốn" để thành câu trọn vẹn: "Khiêm tốn, thật thà, dũng cảm", nhắc nhở thiếu nhi không tự mãn.',
  },
  {
    id: 4,
    topic: 'Dấu Chân Bác Hồ',
    question: 'Quê hương Làng Sen tuổi thơ của Chủ tịch Hồ Chí Minh thuộc tỉnh nào nước ta?',
    options: [
      'A. Tỉnh Nghệ An',
      'B. Tỉnh Hà Tĩnh',
      'C. Tỉnh Thanh Hóa',
      'D. Tỉnh Thừa Thiên Huế',
    ],
    correctAnswer: 0,
    explanation:
      'Làng Sen thuộc xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An là quê nội của Bác Hồ kính yêu.',
  },
  {
    id: 5,
    topic: 'Lịch sử Cứu Nước',
    question: 'Ngày 05/6/1911, người thanh niên Nguyễn Tất Thành đã ra đi tìm đường cứu nước từ địa danh lịch sử nào?',
    options: [
      'A. Cảng Hải Phòng',
      'B. Cảng Đà Nẵng',
      'C. Bến Nhà Rồng (Sài Gòn - TP.HCM)',
      'D. Bến Ninh Kiều (Cần Thơ)',
    ],
    correctAnswer: 2,
    explanation:
      'Ngày 05/6/1911, người thanh niên yêu nước Văn Ba đã lên con tàu Amiral Latouche-Tréville từ Bến Nhà Rồng ra đi tìm đường cứu nước.',
  },
  {
    id: 6,
    topic: 'Di Tích Đất Thủ',
    question: 'Tại TP. Thủ Dầu Một, ngôi chùa cổ nào là nơi thân sinh Bác Hồ (cụ Phó bảng Nguyễn Sinh Sắc) từng dạy học và lập Hội Danh dự yêu nước?',
    options: [
      'A. Chùa Bà Thiên Hậu',
      'B. Chùa Hội Khánh',
      'C. Chùa Tây Tạng',
      'D. Chùa Châu Thới',
    ],
    correctAnswer: 1,
    explanation:
      'Chùa Hội Khánh là Di tích Lịch sử - Văn hóa quốc gia tại Thủ Dầu Một, nơi cụ Nguyễn Sinh Sắc truyền bá lòng yêu nước những năm 1923–1926.',
  },
  {
    id: 7,
    topic: 'Đạo Đức Bác Hồ',
    question: 'Trong câu chuyện "Ai ngoan sẽ được thưởng", bạn Tộ đã được Bác khen ngợi và thưởng kẹo vì điều gì?',
    options: [
      'A. Vì bạn hát hay nhất lớp',
      'B. Vì bạn đạt điểm 10 môn Toán',
      'C. Vì bạn thật thà, dũng cảm nhận lỗi khi làm vỡ bát',
      'D. Vì bạn chạy nhanh nhất trại nhi đồng',
    ],
    correctAnswer: 2,
    explanation:
      'Bác Hồ khen bạn Tộ biết thật thà và dũng cảm nhận khuyết điểm của mình. Dũng cảm nhận lỗi chính là một đức tính rất ngoan.',
  },
  {
    id: 8,
    topic: 'Môi Trường & Đời Sống',
    question: 'Phong trào "Tết trồng cây" do Bác Hồ phát động bắt đầu vào mùa xuân năm nào?',
    options: [
      'A. Mùa xuân 1945',
      'B. Mùa xuân 1954',
      'C. Mùa xuân 1960',
      'D. Mùa xuân 1975',
    ],
    correctAnswer: 2,
    explanation:
      'Mùa xuân năm 1960, Bác Hồ đã phát động Tết trồng cây với câu thơ: "Mùa xuân là Tết trồng cây / Làm cho đất nước càng ngày càng xuân".',
  },
  {
    id: 9,
    topic: 'Âm Nhạc Tuổi Thơ',
    question: 'Nhạc sĩ nào là tác giả bài hát bất hủ "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng"?',
    options: [
      'A. Nhạc sĩ Phong Nhã',
      'B. Nhạc sĩ Phạm Tuyên',
      'C. Nhạc sĩ Xuân Giao',
      'D. Nhạc sĩ Hoàng Long',
    ],
    correctAnswer: 0,
    explanation:
      'Nhạc sĩ Phong Nhã đã sáng tác bài hát này vào cuối năm 1945. Ông được mệnh danh là "người chép sử Đội bằng âm nhạc".',
  },
  {
    id: 10,
    topic: 'Bác Hồ Với Giáo Dục',
    question: 'Điền từ còn thiếu vào câu khẩu hiệu bất hủ của Bác: "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng ..."?',
    options: [
      'A. Rừng',
      'B. Người',
      'C. Lúa',
      'D. Hoa',
    ],
    correctAnswer: 1,
    explanation:
      'Bác Hồ dạy: "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người." Đây là kim chỉ nam cho sự nghiệp giáo dục trồng người.',
  },
];

// 7. GÓC TÔ MÀU TRANH BÁC HỒ (COLORING PAGES FOR SCHOOL SESSIONS)
export const COLORING_PAGES: ColoringPageItem[] = [
  {
    id: 'color_01',
    title: 'Bác Hồ quàng khăn đỏ cho học sinh',
    subtitle: 'Nét vẽ ấm áp tình thương của Bác dành cho đội viên thiếu niên tiền phong',
    difficulty: 'Dễ (Lớp 1-3)',
    imageUrl: '/assets/hcm-space/khong-gian-thieu-nhi-wall.jpg',
    guidance: 'Khăn quàng màu đỏ thắm, áo học sinh màu trắng, hoa sen dưới chân màu hồng dịu.',
  },
  {
    id: 'color_02',
    title: 'Bác Hồ trồng cây mùa xuân',
    subtitle: 'Bác cầm xẻng vun đất cho mầm non mới nhú bên bờ sông xanh biếc',
    difficulty: 'Trung bình (Lớp 4-5)',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    guidance: 'Mầm cây màu xanh mướt, đất nâu ấm áp, bộ quần áo kaki của Bác màu vàng nhạt.',
  },
  {
    id: 'color_03',
    title: 'Nhà sàn Bác Hồ và đàn cá tung tăng',
    subtitle: 'Ngôi nhà sàn gỗ nép dưới rặng xoài râm mát và ao cá Ba Đình',
    difficulty: 'Trung bình (Lớp 4-5)',
    imageUrl: '/assets/hcm-space/bac-ho-wicker-chair.jpg',
    guidance: 'Mái nhà gỗ nâu trầm, mặt nước ao cá xanh ngọc bích, hàng rào dâm bụt đỏ rực.',
  },
  {
    id: 'color_04',
    title: 'Ngôi nhà tranh Làng Sen quê Bác',
    subtitle: 'Mái tranh mộc mạc bên luống sen ngát hương tuổi thơ cậu bé Nguyễn Sinh Cung',
    difficulty: 'Nâng cao (THCS)',
    imageUrl: '/assets/hcm-space/tieusu1-1911.png',
    guidance: 'Mái rơm vàng sậm, đầm sen hồng ngát, rặng tre xanh viền quanh làng quê thanh bình.',
  },
];

// 8. LIÊN ĐỘI TIÊU BIỂU CÁC TRƯỜNG HỌC TẠI TP. THỦ DẦU MỘT
export const SCHOOL_BRIGADES: SchoolBrigadeItem[] = [
  {
    id: 'sch_01',
    schoolName: 'Trường Tiểu học Nguyễn Du',
    brigadeName: 'Liên đội Nguyễn Du',
    ward: 'Phường Phú Cường',
    highlightModel: 'Không gian văn hóa Bác Hồ học đường & Tủ sách măng non',
    studentCount: 1450,
    goodDeedsCount: 3820,
  },
  {
    id: 'sch_02',
    schoolName: 'Trường Tiểu học Phú Cường',
    brigadeName: 'Liên đội Phú Cường',
    ward: 'Phường Phú Cường',
    highlightModel: 'Công trình Măng non Vườn hoa ơn Bác & Về nguồn Chùa Hội Khánh',
    studentCount: 1280,
    goodDeedsCount: 3410,
  },
  {
    id: 'sch_03',
    schoolName: 'Trường Tiểu học Lê Hồng Phong',
    brigadeName: 'Liên đội Lê Hồng Phong',
    ward: 'Phường Phú Hòa',
    highlightModel: 'Nhật ký nghìn việc tốt & Phong trào Kế hoạch nhỏ nuôi heo đất',
    studentCount: 1620,
    goodDeedsCount: 4120,
  },
  {
    id: 'sch_04',
    schoolName: 'Trường THCS Chu Văn An',
    brigadeName: 'Liên đội Chu Văn An',
    ward: 'Phường Hiệp Thành',
    highlightModel: 'Hành trình Địa chỉ đỏ số hóa & CLB Em yêu lịch sử Đất Thủ',
    studentCount: 1850,
    goodDeedsCount: 4950,
  },
  {
    id: 'sch_05',
    schoolName: 'Trường THCS Phú Cường',
    brigadeName: 'Liên đội THCS Phú Cường',
    ward: 'Phường Phú Cường',
    highlightModel: 'Phòng truyền thống số hóa & Diễn đàn Khát vọng cống hiến tuổi trẻ',
    studentCount: 1390,
    goodDeedsCount: 3670,
  },
  {
    id: 'sch_06',
    schoolName: 'Trường Tiểu học Tương Bình Hiệp',
    brigadeName: 'Liên đội Tương Bình Hiệp',
    ward: 'Phường Tương Bình Hiệp',
    highlightModel: 'Làng nghề sơn mài truyền thống noi gương Bác yêu lao động',
    studentCount: 980,
    goodDeedsCount: 2890,
  },
];

// 9. TRANH VẼ THIẾU NHI ĐẤT THỦ VỀ BÁC HỒ
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
