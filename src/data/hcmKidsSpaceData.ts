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
  subtitle?: string;
  lesson: string;
  suitableAge: string;
  gradeCategory: 'Lớp 1 – 3' | 'Lớp 4 – 5' | 'THCS' | 'Tất cả';
  teachingGroup: 'DIEU_1' | 'DIEU_2' | 'DIEU_3' | 'DIEU_4' | 'DIEU_5'; // Phân loại theo 5 Điều Bác Hồ dạy
  teachingGroupTitle: string;
  readingTime: string;
  icon: string;
  historicalPeriod: string; // Năm & Bối cảnh lịch sử có thật
  historicalSource: string; // Nguồn trích dẫn chính thống
  goldenQuote: string; // Chi tiết vàng hoặc lời nói xúc động của Bác
  content: string;
  moralLesson: string;
  dailyActionPledge: string; // Việc tốt bé thực hành hôm nay
  questions: string[];
  audioGuide?: string;
  interactiveQuiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
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
    title: 'Bác với thiếu nhi',
    subtitle: 'Ân cần quàng khăn đỏ và múa hát cùng các cháu thiếu niên, nhi đồng',
    year: '1961',
    imageUrl: '/assets/hcm-space/bac-voi-thieu-nhi-card.jpg',
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
    imageUrl: '/assets/hcm-space/bac-trong-cay-card.jpg',
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
    imageUrl: '/assets/hcm-space/bac-doc-sach-card.jpg',
    description:
      'Dù bận trăm công nghìn việc lãnh đạo kháng chiến và kiến thiết nước nhà, Bác Hồ vẫn giữ thói quen đọc sách báo mỗi ngày. Bác biết nhiều thứ tiếng nước ngoài hoàn toàn nhờ tinh thần tự học kiên trì, không ngừng nghỉ.',
    quote: 'Học hỏi là một việc phải tiếp tục suốt đời. Suốt đời phải học, lý luận phải liên hệ với thực tế.',
    category: 'DOC_SACH',
  },
  {
    id: 'photo_04',
    title: 'Bác phát kẹo',
    subtitle: 'Niềm vui ấm áp ngày Tết Trung thu và ngày Quốc tế Thiếu nhi',
    year: '1959',
    imageUrl: '/assets/hcm-space/bac-phat-keo-card.jpg',
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
    name: 'Làng Sen (Nghệ An)',
    location: 'Xã Kim Liên, huyện Nam Đàn',
    province: 'Tỉnh Nghệ An',
    role: 'Quê hương tuổi thơ của Bác Hồ',
    yearPeriod: '1890 – 1901',
    imageUrl: '/assets/hcm-space/relic_lang_sen.jpg',
    summary:
      'Làng Sen là quê nội của Chủ tịch Hồ Chí Minh. Ngôi nhà lá 5 gian mộc mạc bên rặng tre xanh ngát là nơi gắn liền với những năm tháng ấu thơ ấm áp tình thương của người mẹ Hoàng Thị Loan và người cha Nguyễn Sinh Sắc.',
    childhoodConnection:
      'Cậu bé Nguyễn Sinh Cung đã lớn lên trong lời ru ngọt ngào của mẹ, tình yêu lao động và chứng kiến nỗi cơ cực của người dân lầm than, từ đó ấp ủ lòng yêu nước thương dân sâu sắc.',
    address: 'Khu Di tích Quốc gia đặc biệt Kim Liên, Nam Đàn, Nghệ An',
  },
  {
    id: 'site_hang_pac_bo',
    name: 'Hang Pác Bó (Cao Bằng)',
    location: 'Xã Trường Hà, huyện Hà Quảng',
    province: 'Tỉnh Cao Bằng',
    role: 'Nơi Bác trở về Tổ quốc lãnh đạo cách mạng',
    yearPeriod: 'Từ 28/01/1941',
    imageUrl: '/assets/hcm-space/relic_hang_pac_bo.jpg',
    summary:
      'Sau 30 năm bôn ba qua 4 châu lục, ngày 28/01/1941, Bác Hồ đã cúi mình hôn lên nắm đất thiêng liêng của Tổ quốc tại cột mốc 108 và chọn Hang Pác Bó làm căn cứ địa cách mạng đầu tiên.',
    childhoodConnection:
      'Hình ảnh Bác Hồ ngồi bên chiếc bàn đá chông chênh bên bờ suối dịch sử Đảng đã trở thành bài thơ bất hủ mà mọi học sinh tiểu học đều được học: "Sáng ra bờ suối, tối vào hang / Cháo bẹ rau măng vẫn sẵn sàng".',
    address: 'Khu Di tích Quốc gia đặc biệt Pác Bó, Hà Quảng, Cao Bằng',
  },
  {
    id: 'site_thac_lenin',
    name: 'Thác Lê-nin (Cao Bằng)',
    location: 'Xã Trường Hà, huyện Hà Quảng',
    province: 'Tỉnh Cao Bằng',
    role: 'Danh thắng lịch sử bên chân núi Các Mác',
    yearPeriod: '1941 – 1945',
    imageUrl: '/assets/hcm-space/relic_thac_lenin.jpg',
    summary:
      'Dòng suối trong vắt như ngọc bích uốn lượn quanh chân núi Các Mác hùng vĩ. Bác Hồ đã tự tay đặt tên cho dòng suối là Suối Lê-nin và ngọn núi là Núi Các Mác để khẳng định con đường cách mạng vô sản chân chính.',
    childhoodConnection:
      'Nơi đây lưu dấu những giờ phút Bác thư thái ngồi câu cá, đàm đạo việc nước và hòa mình vào thiên nhiên núi rừng đại ngàn Việt Bắc.',
    address: 'Khu Di tích Quốc gia đặc biệt Pác Bó, Cao Bằng',
  },
  {
    id: 'site_nha_san',
    name: 'Nhà sàn Bác Hồ (Phủ Chủ tịch)',
    location: 'Khu Phủ Chủ tịch, Ba Đình',
    province: 'Thủ đô Hà Nội',
    role: 'Nơi Bác sống và làm việc lâu nhất (15 năm)',
    yearPeriod: '1954 – 1969',
    imageUrl: '/assets/hcm-space/relic_nha_san.jpg',
    summary:
      'Ngôi nhà sàn gỗ giản dị theo kiểu nhà đồng bào dân tộc thiểu số Việt Bắc, nép mình dưới rặng xoài râm mát và nhìn ra ao cá biếc. Đây là biểu tượng mẫu mực của lối sống thanh bạch, cần kiệm liêm chính.',
    childhoodConnection:
      'Hàng triệu thiếu nhi trong và ngoài nước khi về Thủ đô viếng Bác đều mong ước được bước lên bậc thang gỗ nhà sàn và vỗ tay gọi đàn cá Bác Hồ dưới bờ ao râm bóng mát.',
    address: 'Số 1 Hoàng Hoa Thám, Ba Đình, Hà Nội',
  },
  {
    id: 'site_ben_nha_rong',
    name: 'Bến Nhà Rồng (TP. Hồ Chí Minh)',
    location: 'Số 1 Nguyễn Tất Thành, Phường 12, Quận 4',
    province: 'TP. Hồ Chí Minh',
    role: 'Nơi Bác ra đi tìm đường cứu nước ngày 05/6/1911',
    yearPeriod: '05/06/1911',
    imageUrl: '/assets/hcm-space/relic_ben_nha_rong.jpg',
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
// 4. TUYỂN TẬP 15 TRUYỆN KỂ ĐẠO ĐỨC CHÍNH THỐNG VỀ BÁC HỒ (CHUẨN 5 ĐIỀU BÁC DẠY & BỘ GD&ĐT)
export const MORAL_STORIES: MoralStoryItem[] = [
  {
    id: 'story_01',
    title: 'Ai ngoan sẽ được thưởng',
    subtitle: 'Lòng dũng cảm nhận lỗi của bạn Tộ',
    lesson: 'Thật thà, dũng cảm nhận lỗi là đức tính đáng quý nhất',
    suitableAge: 'Tiểu học (Lớp 1 – 5)',
    gradeCategory: 'Lớp 1 – 3',
    teachingGroup: 'DIEU_5',
    teachingGroupTitle: 'Điều 5: Khiêm tốn, thật thà, dũng cảm',
    readingTime: '3 phút',
    icon: '🍬',
    historicalPeriod: 'Năm 1946 • Trại Nhi đồng Hà Nội',
    historicalSource: 'Theo sách "Bác Hồ kính yêu" — Nhà xuất bản Kim Đồng',
    goldenQuote: 'Cháu biết nhận lỗi thế là dũng cảm lắm! Người dũng cảm nhận khuyết điểm cũng là người ngoan, cháu xứng đáng được nhận phần kẹo này.',
    content:
      'Một buổi sáng mùa thu, Bác Hồ đến thăm một trại nhi đồng ở Thủ đô Hà Nội. Vừa thấy Bác, các em nhỏ đã reo vang, ùa ra đón Bác như đón người ông kính yêu đi xa về. Bác dắt tay hai em nhỏ nhất đi vào lớp. Bác ân cần đi thăm phòng ngủ, phòng ăn, nhà bếp rồi trở lại phòng họp. Bác hỏi các em:\n- Các cháu chơi có vui không?\n- Thưa Bác, vui lắm ạ!\n- Các cháu ăn có no không?\n- No lắm ạ!\n- Các cô có mắng phạt các cháu không?\n- Không ạ!\nBác cười hiền từ: "Thế thì tốt lắm! Bây giờ Bác chia kẹo cho các cháu. Cháu nào ngoan thì được thưởng, cháu nào không ngoan thì không được thưởng. Các cháu có đồng ý không?"\n- Đồng ý ạ! — Cả phòng đồng thanh reo lên trong tiếng vỗ tay rộn rã.\nCác em nhỏ xếp hàng ngay ngắn lần lượt đến nhận kẹo từ tay Bác. Đến lượt bạn Tộ, Tộ đứng nép vào góc tường, hai tay nắm chặt vạt áo và lí nhí: "Thưa Bác, hôm nay cháu chưa ngoan, cháu đã làm vỡ bát ăn cơm, cháu không dám nhận kẹo của Bác đâu ạ!"\nCả phòng im phăng phắc. Bác Hồ mỉm cười ân cần, bước lại gần xoa đầu Tộ và nói dịu dàng: "Cháu biết nhận lỗi thế là dũng cảm lắm! Người dũng cảm nhận khuyết điểm cũng là người ngoan, cháu xứng đáng được nhận phần kẹo này."\nTộ xúc động nghẹn ngào đón lấy chiếc kẹo Bác trao, trong lòng ngập tràn niềm vui và tự hứa từ nay sẽ luôn cẩn thận, chăm ngoan hơn nữa.',
    moralLesson:
      'Trong học tập và cuộc sống, ai cũng có thể mắc sai lầm. Điều quan trọng nhất là phải thật thà, dũng cảm nhận lỗi để sửa chữa. Lòng trung thực luôn mang lại sự thanh thản và được mọi người tin yêu, tôn trọng.',
    dailyActionPledge:
      'Hôm nay em sẽ dũng cảm nói thật với thầy cô hoặc cha mẹ nếu trót làm sai điều gì, tuyệt đối không đổ lỗi cho bạn bè.',
    questions: [
      'Tại sao bạn Tộ ban đầu không dám xếp hàng nhận kẹo của Bác Hồ?',
      'Bác Hồ đã nói gì và có thái độ như thế nào khi bạn Tộ thật thà nhận lỗi?',
      'Em rút ra được bài học gì cho bản thân khi trót làm hỏng đồ dùng ở lớp hoặc ở nhà?',
    ],
    interactiveQuiz: {
      question: 'Vì sao bạn Tộ vẫn được Bác Hồ thưởng kẹo dù đã trót làm vỡ chiếc bát ăn cơm?',
      options: [
        'Vì bạn Tộ là học sinh nhỏ tuổi nhất trong trại nhi đồng',
        'Vì bạn Tộ đã dũng cảm, thật thà nhận lỗi lầm của mình',
        'Vì chiếc bát vỡ không có giá trị gì đáng kể',
        'Vì Bác Hồ còn thừa nhiều kẹo nên chia hết cho cả lớp',
      ],
      correctAnswer: 1,
      explanation: 'Bác Hồ dạy: "Người dũng cảm nhận khuyết điểm cũng là người ngoan", lòng trung thực và dũng cảm nhận lỗi là đức tính cao quý nhất.',
    },
  },
  {
    id: 'story_02',
    title: 'Bát chè sẻ đôi',
    subtitle: 'Chia ngọt sẻ bùi giữa núi rừng Việt Bắc',
    lesson: 'Tinh thần sẻ chia, đồng cam cộng khổ với đồng chí, đồng đội',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'Lớp 1 – 3',
    teachingGroup: 'DIEU_3',
    teachingGroupTitle: 'Điều 3: Đoàn kết tốt, kỷ luật tốt',
    readingTime: '3 phút',
    icon: '🥣',
    historicalPeriod: 'Năm 1950 • Chiến khu Định Hóa, Việt Bắc',
    historicalSource: 'Lời kể của chiến sĩ cần vụ cơ quan Trung ương Đảng — Khu Di tích Phủ Chủ tịch',
    goldenQuote: 'Kháng chiến gian khổ, cán bộ chiến sĩ ta cùng chịu đói chịu rét, có bát chè ngọt thì Bác cháu ta cùng chia nhau ăn mới vui!',
    content:
      'Thời kỳ ở chiến khu Việt Bắc, đời sống vô cùng thiếu thốn, gian khổ. Một hôm, đồng chí phục vụ cơ quan kiếm được ít đỗ đen và chút đường hiếm hoi, bèn nấu một bát chè thơm ngon mang lên cho Bác Hồ bồi dưỡng vì thấy mấy ngày nay Bác gầy đi nhiều và thức khuya làm việc.\nBác nhìn bát chè thơm phức bốc khói nhẹ rồi ngẩng lên hỏi ân cần:\n- Chú đã ăn chè chưa?\n- Dạ thưa Bác, chè ít lắm, chỉ đủ nấu một bát riêng để Bác bồi dưỡng sức khỏe thôi ạ.\nBác mỉm cười hiền hậu, cầm chiếc thìa cẩn thận chia bát chè thành hai phần thật đều nhau trong sự ngỡ ngàng của đồng chí phục vụ, rồi Bác nói:\n- Nào, chú một nửa, Bác một nửa. Kháng chiến gian khổ, cán bộ chiến sĩ ta cùng chịu đói chịu rét, có bát chè ngọt thì Bác cháu ta cùng chia nhau ăn mới vui! Chú không ăn thì Bác cũng không ăn đâu.\nNgười phục vụ nghẹn ngào nhìn Bác, mắt rưng rưng xúc động. Anh bưng nửa bát chè mà cảm nhận được tình thương bao la của vị Cha già dân tộc luôn nghĩ đến người khác trước khi nghĩ đến bản thân mình.',
    moralLesson:
      'Sống trong tập thể gia đình và trường lớp phải biết chia ngọt sẻ bùi, không mưu cầu đặc quyền cho riêng mình. Tinh thần đoàn kết, sẻ chia chân thành làm cho tình bạn thêm gắn bó, ấm áp.',
    dailyActionPledge:
      'Hôm nay em sẽ sẵn sàng chia sẻ nửa chiếc bánh hoặc hộp bút màu cho bạn cùng bàn khi bạn gặp khó khăn.',
    questions: [
      'Khi nhận được bát chè đỗ đen bồi dưỡng, câu hỏi đầu tiên của Bác Hồ là gì?',
      'Bác Hồ đã xử lý bát chè như thế nào để đồng chí phục vụ cùng được thưởng thức?',
      'Hành động chia bát chè của Bác thể hiện phẩm chất đạo đức cao đẹp nào?',
    ],
    interactiveQuiz: {
      question: 'Câu nói nào của Bác Hồ thể hiện sâu sắc tinh thần sẻ chia gian khổ với đồng chí, đồng đội?',
      options: [
        'Bác thích ăn chè đỗ đen hơn các món ăn khác',
        'Có bát chè ngọt thì Bác cháu ta cùng chia nhau ăn mới vui!',
        'Để ngày mai Bác ăn cũng chưa muộn đâu chú',
        'Chú mang bát chè này về cho gia đình chú nhé',
      ],
      correctAnswer: 1,
      explanation: 'Bác luôn tâm niệm: Kháng chiến gian khổ thì cùng chịu đói chịu rét, có ngọt bùi thì cùng san sẻ với nhau.',
    },
  },
  {
    id: 'story_03',
    title: 'Bác Hồ với cây vú sữa miền Nam',
    subtitle: 'Nỗi nhớ thương máu thịt hướng về miền Nam',
    lesson: 'Tình cảm sắt son, thủy chung hướng về miền Nam ruột thịt',
    suitableAge: 'Tất cả (Lớp 1 – 9)',
    gradeCategory: 'Lớp 4 – 5',
    teachingGroup: 'DIEU_1',
    teachingGroupTitle: 'Điều 1: Yêu Tổ quốc, yêu đồng bào',
    readingTime: '4 phút',
    icon: '🌳',
    historicalPeriod: 'Năm 1954 • Phủ Chủ tịch, Hà Nội',
    historicalSource: 'Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch & Lịch sử Đội TNTP',
    goldenQuote: 'Bác chăm cây vú sữa này cũng như Bác ngày đêm nhớ về đồng bào và các cháu thiếu nhi miền Nam ruột thịt!',
    content:
      'Cuối năm 1954, sau khi Hiệp định Giơ-ne-vơ được ký kết, đồng bào và chiến sĩ miền Nam tập kết ra Bắc mang theo một món quà vô cùng đặc biệt dâng tặng Bác Hồ: một cây vú sữa nhỏ của quê hương miền Nam ruột thịt.\nNhận được cây, Bác xúc động vô cùng. Bác tự tay chọn vị trí đất tốt nhất ngay sát ngôi nhà làm việc trong Phủ Chủ tịch để trồng cây. Chiều nào cũng vậy, sau giờ làm việc bận rộn với việc nước, Bác lại dành thời gian tự tay xách từng thùng nước tưới cho cây vú sữa, vun xới gốc và bắt từng con sâu nhỏ.\nVào những ngày mùa đông miền Bắc rét buốt thấu xương, sợ cây vú sữa miền Nam quen nắng ấm không chịu nổi gió bấc, Bác lấy rơm rạ quấn cẩn thận quanh thân cây và làm hàng rào che chắn gió rét cho cây.\nMỗi lần có các đoàn đại biểu, cán bộ, chiến sĩ hay các cháu thiếu nhi miền Nam ra thăm Thủ đô, Bác đều dẫn ra bên cây vú sữa xanh tốt. Bác vỗ về cây và nói bằng giọng nghẹn ngào: "Bác chăm cây vú sữa này cũng như Bác ngày đêm nhớ về đồng bào và các cháu thiếu nhi miền Nam ruột thịt. Miền Nam luôn ở trong trái tim tôi!"',
    moralLesson:
      'Lòng yêu nước bắt nguồn từ tình yêu đồng bào, tình nghĩa gắn bó máu thịt Bắc – Trung – Nam một nhà. Lòng thủy chung son sắt là đạo lý ngàn đời của dân tộc Việt Nam.',
    dailyActionPledge:
      'Hôm nay em sẽ chăm sóc tưới nước cho cây xanh ở trường hoặc ở nhà, và tìm hiểu về các bạn thiếu nhi ở hải đảo xa xôi.',
    questions: [
      'Cây vú sữa miền Nam được trao tặng Bác Hồ vào thời gian và hoàn cảnh nào?',
      'Bác Hồ đã tự tay chăm sóc và bảo vệ cây vú sữa trong mùa đông như thế nào?',
      'Hình ảnh cây vú sữa tượng trưng cho điều thiêng liêng gì trong trái tim Bác Hồ?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ đã làm gì để bảo vệ cây vú sữa miền Nam khỏi bị chết cóng trong mùa đông giá rét?',
      options: [
        'Đem cây trồng vào trong phòng làm việc ấm áp',
        'Lấy rơm rạ quấn quanh thân cây và làm rào che chắn gió lạnh',
        'Thắp đèn sưởi ấm liên tục suốt ngày đêm',
        'Nhờ các nhà khoa học nước ngoài sang chăm sóc',
      ],
      correctAnswer: 1,
      explanation: 'Bác cẩn thận lấy rơm rạ bọc quanh thân cây như người mẹ quấn áo ấm cho con, nâng niu tình cảm của đồng bào miền Nam.',
    },
  },
  {
    id: 'story_04',
    title: 'Thời gian quý báu lắm',
    subtitle: 'Bài học đúng giờ và phép tính 500 phút',
    lesson: 'Tôn trọng giờ giấc, quý trọng thời gian của mình và của người khác',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'Lớp 4 – 5',
    teachingGroup: 'DIEU_3',
    teachingGroupTitle: 'Điều 3: Đoàn kết tốt, kỷ luật tốt',
    readingTime: '3 phút',
    icon: '⏰',
    historicalPeriod: 'Năm 1953 • Chiến khu Việt Bắc',
    historicalSource: 'Tuyển tập "Bác Hồ với phong trào thi đua yêu nước" — NXB Chính trị Quốc gia',
    goldenQuote: 'Thời gian quý báu lắm các chú ạ. Bác đến muộn 10 phút thì 50 đồng chí ngồi đây cộng lại là mất toi 500 phút quý báu của kháng chiến rồi!',
    content:
      'Bác Hồ là người coi trọng thời gian và giữ kỷ luật giờ giấc chuẩn xác nhất. Suốt cả cuộc đời, Bác không bao giờ để bất kỳ ai phải chờ đợi mình dù chỉ một phút.\nMột lần, Bác có lịch hẹn chủ trì buổi họp quan trọng với 50 cán bộ lãnh đạo tại chiến khu vào đúng 8 giờ sáng. Không may, đêm trước trời đổ mưa tầm tã làm đường rừng lầy lội, nước suối dâng cao. Chiếc xe chở Bác bị chết máy giữa bãi lầy lội cách địa điểm họp gần hai cây số.\nĐồng chí lái xe lo lắng toát mồ hôi, nhưng Bác đã dứt khoát bảo: "Không thể để các đồng chí đợi được!". Nói rồi, Bác xắn cao quần, cởi giày dép đưa cho đồng chí bảo vệ cầm hộ, rồi cùng xăm xắn lội qua bùn đất trơn trượt để đi bộ cho kịp.\nĐồng hồ điểm đúng 8 giờ vang lên cũng là lúc Bác bước vào phòng họp. Ống quần Bác còn lấm tấm vết bùn đỏ, áo ướt đẫm mồ hôi nhưng nụ cười của Bác vẫn vô cùng rạng rỡ. Bác tươi cười chào mọi người rồi thân mật nhắc nhở:\n- Các chú thấy đấy, thời gian quý báu lắm. Bác làm Chủ tịch nước mà đến muộn 10 phút, thì 50 đồng chí ngồi đây nhân lên là mất đứt 500 phút quý báu của công cuộc kháng chiến rồi! Giữ đúng giờ là tôn trọng chính mình và tôn trọng đồng đội.',
    moralLesson:
      'Đúng giờ là thước đo của văn hóa và lòng tự trọng. Thời gian đã trôi qua thì ngàn vàng cũng không mua lại được. Người học sinh có kỷ luật tốt phải luôn đi học đúng giờ và nộp bài đúng hạn.',
    dailyActionPledge:
      'Hôm nay em sẽ tự giác đi ngủ sớm và thức dậy đúng giờ, đến lớp trước 15 phút để chuẩn bị bài học thật chu đáo.',
    questions: [
      'Bác Hồ đã làm thế nào để đến buổi họp đúng giờ dù xe gặp sự cố giữa đường sình lầy?',
      'Bác Hồ đã làm phép tính 500 phút như thế nào để nhắc nhở mọi người về giá trị thời gian?',
      'Em đã rèn luyện thói quen đúng giờ trong việc học tập và sinh hoạt hàng ngày như thế nào?',
    ],
    interactiveQuiz: {
      question: 'Phép tính "500 phút quý báu" của Bác Hồ nhắc nhở bài học đạo đức sâu sắc nào?',
      options: [
        'Muốn họp nhanh thì phải chuẩn bị trước đồng hồ',
        'Đến muộn của một cá nhân sẽ làm lãng phí thời gian quý giá của cả tập thể',
        'Đường rừng lầy lội thì không nên đi họp đúng giờ',
        'Chỉ có người đứng đầu mới cần phải tính toán thời gian',
      ],
      correctAnswer: 1,
      explanation: 'Nếu 1 người đến muộn 10 phút trong phòng họp 50 người, tổng số thời gian lãng phí là 500 phút của tập thể.',
    },
  },
  {
    id: 'story_05',
    title: 'Chiếc áo ấm đêm đông',
    subtitle: 'Chiếc áo trấn thủ Bác trao tặng chú lính gác',
    lesson: 'Tình yêu thương bao la và sự quan tâm sâu sắc tới chiến sĩ',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'Lớp 1 – 3',
    teachingGroup: 'DIEU_1',
    teachingGroupTitle: 'Điều 1: Yêu Tổ quốc, yêu đồng bào',
    readingTime: '3 phút',
    icon: '🧥',
    historicalPeriod: 'Mùa đông 1951 • Rừng Định Hóa, Thái Nguyên',
    historicalSource: 'Theo hồi ký của các chiến sĩ cảnh vệ bảo vệ Bác Hồ — Viện Lịch sử Đảng',
    goldenQuote: 'Bác ngồi trong nhà còn đỡ lạnh, chú đứng gác ngoài trời gió bấc thế này rét lắm. Chú mặc vào để giữ sức khỏe mà bảo vệ cơ quan!',
    content:
      'Một đêm mùa đông năm 1951 ở chiến khu Việt Bắc, gió mùa đông bắc tràn về từng cơn rít qua khe núi buốt thấu xương. Bác Hồ vẫn miệt mài thức khuya làm việc bên ngọn đèn dầu nhỏ trong lán tranh.\nNgước nhìn qua khung cửa sổ, Bác thấy người chiến sĩ cảnh vệ trẻ tuổi đang bồng súng đứng gác dưới màn mưa phùn giá buốt. Chú chiến sĩ chỉ mặc một chiếc áo mỏng, đôi hàm răng đánh vào nhau lập cập, hai bờ vai run lên từng chặp vì cái rét cắt da cắt thịt.\nBác Hồ đứng dậy, lặng lẽ đi tới góc giường, cầm lấy chiếc áo trấn thủ chần bông ấm áp của mình. Bác bước nhẹ nhàng ra cửa lán, đến bên chú chiến sĩ và ân cần khoác chiếc áo lên đôi vai gầy đang run rẩy của chú.\nNgười chiến sĩ giật mình quay lại, thấy Bác thì xúc động trào nước mắt, nghẹn ngào thưa: "Bác ơi, Bác mặc cho ấm ạ! Cháu còn trẻ, cháu chịu đựng được rét, Bác mà bị ốm thì toàn dân lo lắm ạ!".\nBác Hồ vỗ vai chú trìu mến, ánh mắt sáng ngời tình thương bao la: "Bác ngồi trong nhà còn đỡ lạnh, chú đứng gác ngoài trời gió bấc thế này rét buốt lắm. Chú mặc vào để giữ ấm cơ thể mà bảo vệ cơ quan kháng chiến!".',
    moralLesson:
      'Tình yêu thương con người không nằm ở những lời nói hoa mỹ mà thể hiện ở sự thấu hiểu, quan tâm chân thành từ những hành động nhỏ bé và giản dị nhất.',
    dailyActionPledge:
      'Hôm nay em sẽ quan tâm hỏi thăm sức khỏe ông bà, cha mẹ hoặc giúp đỡ một bạn nhỏ có hoàn cảnh khó khăn trong lớp.',
    questions: [
      'Bác Hồ đã nhìn thấy điều gì khi ngước mắt nhìn qua khung cửa sổ giữa đêm đông giá rét?',
      'Tại sao chú chiến sĩ cảnh vệ ban đầu không dám nhận chiếc áo bông của Bác trao?',
      'Câu chuyện gợi cho em cảm xúc gì về tình yêu thương của Bác đối với bộ đội cụ Hồ?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ đã trao tặng vật gì cho chú chiến sĩ cảnh vệ đứng gác dưới mưa phùn rét buốt?',
      options: [
        'Một đôi găng tay len mới',
        'Chiếc áo trấn thủ chần bông ấm áp của chính Bác',
        'Một chiếc chăn bông hoa rực rỡ',
        'Một ngọn đèn dầu đang cháy sáng',
      ],
      correctAnswer: 1,
      explanation: 'Bác cởi chính chiếc áo trấn thủ bông ấm áp của mình để khoác lên vai chú chiến sĩ gác đêm đông.',
    },
  },
  {
    id: 'story_06',
    title: 'Hai bàn tay trắng',
    subtitle: 'Ý chí kiên cường và câu nói bất hủ năm 1911',
    lesson: 'Ý chí tự lập, không ngại gian khó để theo đuổi lý tưởng lớn',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'THCS',
    teachingGroup: 'DIEU_2',
    teachingGroupTitle: 'Điều 2: Học tập tốt, lao động tốt',
    readingTime: '4 phút',
    icon: '🤝',
    historicalPeriod: 'Tháng 6/1911 • Thương cảng Sài Gòn — Bến Nhà Rồng',
    historicalSource: 'Tác phẩm "Búp sen xanh" — Nhà văn Sơn Tùng & Lịch sử Đảng bộ TP',
    goldenQuote: 'Đây, tiền ở đây! Chúng ta có hai bàn tay, chúng ta sẽ làm việc. Chúng ta sẽ làm bất cứ việc gì để sống và để đi cứu nước!',
    content:
      'Năm 1911, khi nhân dân ta còn chìm đắm trong ách áp bức lầm than của thực dân Pháp, người thanh niên yêu nước Nguyễn Tất Thành tròn 21 tuổi đã ấp ủ quyết tâm cháy bỏng ra đi tìm con đường giải phóng cho dân tộc.\nTrước ngày lên đường, anh Thành đến tìm một người bạn thân là anh Lê để rủ cùng đi. Nghe anh Thành nói về kế hoạch sang tận các nước phương Tây để xem người ta làm thế nào rồi trở về giúp đồng bào, anh Lê ngỡ ngàng hỏi:\n- Chúng ta lấy đâu ra tiền mà đi hả Thành? Chuyến đi xa xôi vạn dặm tốn kém lắm!\nAnh Thành nhìn bạn với đôi mắt sáng ngời niềm tin, rồi từ từ giơ hai bàn tay rắn rỏi của mình ra phía trước và dứt khoát nói:\n- Đây, tiền ở đây! Chúng ta có hai bàn tay, chúng ta sẽ làm việc. Chúng ta sẽ làm bất cứ việc gì để sống và để đi!\nSau đó, anh Thành với tên gọi Văn Ba đã xin xuống làm phụ bếp trên con tàu buôn Đô đốc Latouche-Tréville. Hàng ngày, anh phải dậy từ 4 giờ sáng, cào than, quét dọn hầm tàu, bưng bê những chiếc chảo gang nặng trịch dưới đáy tàu nóng hầm hập. Dù lao động vô cùng cực nhọc nhưng ý chí giải phóng non sông của Người không bao giờ lung lay.',
    moralLesson:
      'Bàn tay lao động chân chính và ý chí nghị lực là tài sản quý giá nhất của con người. Tuổi trẻ có ước mơ lớn phải biết tự lập, dám dấn thân vượt qua mọi gian khổ để vươn tới thành công.',
    dailyActionPledge:
      'Hôm nay em sẽ tự giác hoàn thành toàn bộ bài tập về nhà và tự tay dọn dẹp phòng học của mình mà không cần ai nhắc nhở.',
    questions: [
      'Khi người bạn hỏi về tiền bạc để đi sang phương Tây, anh Nguyễn Tất Thành đã trả lời thế nào?',
      'Trên con tàu bôn ba cứu nước, anh Văn Ba đã làm những công việc vất vả gì?',
      'Ý nghĩa của hình ảnh "Hai bàn tay trắng" giúp em hiểu thế nào về tinh thần tự lập?',
    ],
    interactiveQuiz: {
      question: 'Khi được người bạn hỏi: "Chúng ta lấy đâu ra tiền mà đi?", anh Thành đã trả lời bằng hành động nào?',
      options: [
        'Chỉ tay vào chiếc túi vải đựng đầy tiền tiết kiệm',
        'Xòe hai bàn tay của mình ra và nói: "Đây, tiền ở đây!"',
        'Nói rằng sẽ đi vay tiền của các nhà hảo tâm',
        'Bảo bạn hãy chờ gia đình gửi tiền trợ cấp',
      ],
      correctAnswer: 1,
      explanation: 'Anh Thành tin tưởng tuyệt đối vào sức lao động của đôi bàn tay và khối óc của chính mình.',
    },
  },
  {
    id: 'story_07',
    title: 'Chiếc đồng hồ và bài học phân công',
    subtitle: 'Kim giờ, kim phút và chiếc bánh xe thầm lặng',
    lesson: 'Tinh thần trách nhiệm và sự phối hợp nhịp nhàng trong tập thể',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'Lớp 4 – 5',
    teachingGroup: 'DIEU_3',
    teachingGroupTitle: 'Điều 3: Đoàn kết tốt, kỷ luật tốt',
    readingTime: '3 phút',
    icon: '⏱️',
    historicalPeriod: 'Năm 1954 • Lớp chỉnh huấn cán bộ tại Việt Bắc',
    historicalSource: 'Giáo trình Đạo đức Đội Thiếu niên Tiền phong Hồ Chí Minh & NXB Giáo Dục',
    goldenQuote: 'Trong chiếc đồng hồ, bánh xe, lò xo nằm kín bên trong, nếu đòi ra mặt số như kim thì đồng hồ chạy sao được? Công việc nào phục vụ nhân dân cũng đều vẻ vang!',
    content:
      'Vào mùa thu năm 1954, chuẩn bị về tiếp quản Thủ đô Hà Nội, Bác Hồ đến nói chuyện tại một lớp tập huấn cán bộ. Lúc bấy giờ, một số đồng chí có tâm lý muốn xin chuyển sang làm các công tác ở trung tâm, nổi bật hơn mà không muốn ở lại làm nhiệm vụ thầm lặng ở vùng sâu vùng xa.\nBác bước lên bục, không phê bình ai mà nhẹ nhàng rút trong túi áo ra một chiếc đồng hồ quả quýt bằng kim loại sáng bóng. Bác mỉm cười giơ chiếc đồng hồ lên và hỏi:\n- Trong chiếc đồng hồ này, các chú thấy bộ phận nào là quan trọng nhất?\nNgười thì bảo kim giờ, người bảo kim phút, người lại nói quả lắc hoặc lò xo dây cót. Bác gật đầu bảo:\n- Các chú nói đều có phần đúng. Nhưng nếu kim giờ đòi nhảy sang làm kim phút, kim giây đòi to như kim giờ, hay chiếc bánh xe nằm kín mít bên trong đòi nhảy ra mặt số để ai cũng nhìn thấy, thì chiếc đồng hồ này có chạy được không?\nCả hội trường đồng thanh đáp: "Dạ thưa Bác, đồng hồ sẽ hỏng ngay ạ!".\nBác liền kết luận thật sâu sắc: "Đúng vậy! Trong một cỗ máy cũng như trong tập thể cách mạng, mỗi người được phân công một nhiệm vụ riêng. Kim chỉ giờ chỉ phút chạy trên mặt số thì ai cũng thấy, nhưng bánh xe nằm sâu bên trong cũng quan trọng không kém. Đã làm việc phục vụ nhân dân thì công việc nào cũng vẻ vang nếu mình hoàn thành xuất sắc!".',
    moralLesson:
      'Tập thể vững mạnh khi mỗi thành viên biết tôn trọng nhiệm vụ của mình và của bạn bè. Không nên so bì, ghen tị hay tranh giành vị trí nổi bật, mà hãy tận tâm hoàn thành tốt phần việc được giao.',
    dailyActionPledge:
      'Hôm nay em sẽ làm thật tốt phần việc trực nhật hoặc bài tập nhóm được phân công, không so đo tị nạnh với các bạn.',
    questions: [
      'Bác Hồ đã mượn hình ảnh cỗ máy chiếc đồng hồ để dạy cho cán bộ bài học gì?',
      'Điều gì sẽ xảy ra nếu các bánh xe bên trong đòi nhảy ra ngoài mặt số như kim đồng hồ?',
      'Ở lớp học, các bạn cán bộ lớp và các tổ viên cần phối hợp như thế nào để lớp tiến bộ?',
    ],
    interactiveQuiz: {
      question: 'Qua câu chuyện "Chiếc đồng hồ", Bác Hồ muốn gửi gắm thông điệp gì đến chúng ta?',
      options: [
        'Mỗi học sinh đều phải mua một chiếc đồng hồ quả quýt',
        'Mỗi bộ phận, mỗi công việc đều có giá trị vẻ vang khi hoàn thành tốt nhiệm vụ',
        'Chỉ có những người làm ở vị trí nổi bật mới đóng góp cho xã hội',
        'Chiếc kim đồng hồ quan trọng gấp trăm lần các bánh xe bên trong',
      ],
      correctAnswer: 1,
      explanation: 'Bác dạy: Mọi công việc phục vụ tập thể đều vẻ vang và bình đẳng như nhau, quan trọng là làm tròn trách nhiệm.',
    },
  },
  {
    id: 'story_08',
    title: 'Nước nóng, nước nguội',
    subtitle: 'Nghệ thuật kiềm chế cảm xúc và lời nói hòa nhã',
    lesson: 'Bài học về kiềm chế cảm xúc, điềm tĩnh khi xử lý công việc',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'THCS',
    teachingGroup: 'DIEU_5',
    teachingGroupTitle: 'Điều 5: Khiêm tốn, thật thà, dũng cảm',
    readingTime: '3 phút',
    icon: '🍵',
    historicalPeriod: 'Năm 1952 • Phủ Chủ tịch thời chiến',
    historicalSource: 'Theo lời kể của đồng chí Tạ Quang Chiến (người được Bác đặt tên)',
    goldenQuote: 'Khi chú nóng giận, lời nói chú như cốc nước sôi vậy, cấp dưới làm sao nuốt trôi? Điềm tĩnh, dịu dàng như cốc nước mát này thì ai cũng lắng nghe.',
    content:
      'Một đồng chí cán bộ trung đoàn có tính tình rất nóng nảy, mỗi khi cấp dưới phạm lỗi thì thường hay quát mắng gay gắt khiến anh em chiến sĩ hoang mang, nội bộ thiếu hòa khí. Bác Hồ biết chuyện liền cho gọi đồng chí ấy lên gặp Bác.\nTrưa hôm ấy trời nắng chang chang như đổ lửa. Đồng chí cán bộ đi bộ qua quãng đường rừng dài, mồ hôi nhễ nhại, vừa mệt vừa khát nước. Bước vào phòng làm việc của Bác, đồng chí thấy trên bàn Bác đã để sẵn hai chiếc cốc:\nMột cốc nước sôi bốc khói nghi ngút, và một cốc nước đun sôi để nguội trong vắt, mát lành.\nSau lời chào thân mật, Bác chỉ tay vào cốc nước đang bốc khói và bảo:\n- Chú đang khát nước, chú uống cốc này đi!\nĐồng chí cán bộ bối rối thưa: "Thưa Bác, nước đang sôi nóng bỏng thế này, làm sao cháu uống ngay được ạ!".\nBác Hồ mỉm cười hiền hậu, đưa cốc nước mát cho đồng chí rồi ân cần bảo:\n- Chú nói rất đúng! Nước nóng thế thì ai mà uống cho được. Lúc chú nóng giận, lời nói của chú cũng gay gắt bỏng rát như cốc nước sôi kia vậy, người khác nghe làm sao mà lọt tai được? Chi bằng chú hãy điềm tĩnh, hòa nhã như cốc nước nguội mát lành này, chỉ rõ cái sai để anh em sửa chữa, có phải ai cũng vui vẻ lắng nghe không?',
    moralLesson:
      'Khi nóng giận, lời nói thiếu suy nghĩ có thể làm tổn thương sâu sắc người khác. Học sinh phải rèn luyện đức tính điềm tĩnh, biết lắng nghe và nói năng hòa nhã, lịch sự trong mọi hoàn cảnh.',
    dailyActionPledge:
      'Hôm nay khi gặp chuyện không như ý hoặc bất đồng ý kiến với bạn bè, em sẽ hít thở sâu 3 giây và nói chuyện nhẹ nhàng.',
    questions: [
      'Hai cốc nước đặt trên bàn làm việc của Bác Hồ có điểm gì khác nhau?',
      'Bác Hồ đã khuyên vị cán bộ điều gì qua hình ảnh so sánh giữa cốc nước sôi và cốc nước nguội?',
      'Khi em cảm thấy bực tức ở trường hay ở nhà, em làm cách nào để kiềm chế cơn giận dữ?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ đã so sánh lời nói lúc nóng giận với hình ảnh nào?',
      options: [
        'Như cốc nước đá lạnh buốt xương',
        'Như cốc nước sôi bỏng rát, người khác không thể nào nuốt trôi',
        'Như dòng suối mát lành chảy qua rừng cây',
        'Như một cơn mưa rào mùa hạ',
      ],
      correctAnswer: 1,
      explanation: 'Bác dạy: Khi nóng giận lời nói như nước sôi gây bỏng rát, người nghe không tiếp nhận được; điềm tĩnh như nước mát thì ai cũng thấu hiểu.',
    },
  },
  {
    id: 'story_09',
    title: 'Ba chiếc ba lô',
    subtitle: 'Gánh vác gian khổ đồng đều, không màng đặc quyền',
    lesson: 'Tính bình đẳng, công bằng, không mưu cầu đặc quyền cho bản thân',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'Lớp 4 – 5',
    teachingGroup: 'DIEU_3',
    teachingGroupTitle: 'Điều 3: Đoàn kết tốt, kỷ luật tốt',
    readingTime: '3 phút',
    icon: '🎒',
    historicalPeriod: 'Năm 1948 • Trên đường hành quân chiến dịch',
    historicalSource: 'Báo Thiếu niên Tiền phong & Tuyển tập Chuyện kể Bác Hồ',
    goldenQuote: 'Bác cháu ta cùng đi đường xa gian khổ như nhau. Phải chia đều đồ đạc ra ba phần bằng nhau, cùng gánh vác trách nhiệm thì mới bình đẳng!',
    content:
      'Trong một chuyến công tác băng rừng lội suối kéo dài nhiều ngày, đoàn của Bác Hồ gồm có Bác và hai đồng chí bảo vệ trẻ tuổi. Vì lo lắng Bác đã cao tuổi, sức khỏe quý giá, hai đồng chí bàn nhau chuẩn bị ba chiếc ba lô với trọng lượng rất khác nhau:\nChiếc ba lô to nặng nhất đựng gạo và xoong nồi dành cho đồng chí to khỏe; chiếc ba lô vừa đựng tài liệu dành cho đồng chí kia; còn chiếc ba lô nhỏ và nhẹ nhất chỉ đựng vài bộ quần áo lụa và chiếc khăn mặt thì để dành riêng cho Bác đeo.\nĐoàn hành quân được một chặng đường dài, mồ hôi ướt đẫm lưng áo. Khi đến một con suối mát, Bác cho đoàn dừng chân nghỉ ngơi. Nhìn thấy chiếc ba lô của hai chú căng phồng nặng trĩu, còn chiếc của mình xẹp lép, Bác liền bảo:\n- Nào, các chú mở cả ba chiếc ba lô ra cho Bác xem trong đó có những gì nào!\nSau khi kiểm tra, Bác nghiêm nét mặt và nói:\n- Các chú thương Bác là tốt, nhưng Bác cháu ta cùng đi đường xa gian khổ như nhau. Chú gánh nặng, Bác gánh nhẹ thì không công bằng. Phải dồn đồ đạc lại và chia đều thành ba phần bằng nhau, mỗi người gánh vác một phần trách nhiệm thì đi đường mới bền sức và vui vẻ được!\nHai đồng chí bảo vệ nhìn nhau cảm phục, lập tức chia lại đồ đạc theo đúng lời Bác dạy.',
    moralLesson:
      'Người lãnh đạo chân chính luôn san sẻ khó khăn với mọi người, không bao giờ dùng cương vị để hưởng thụ an nhàn cho riêng mình. Tinh thần công bằng, bình đẳng là nền tảng của tình đồng đội.',
    dailyActionPledge:
      'Hôm nay em sẽ chủ động giúp đỡ cha mẹ việc nhà và chia sẻ đồ đạc công bằng khi sinh hoạt cùng bạn bè.',
    questions: [
      'Vì sao hai đồng chí bảo vệ lại chuẩn bị chiếc ba lô nhẹ nhất cho Bác Hồ?',
      'Thái độ của Bác Hồ như thế nào khi phát hiện ra sự chênh lệch giữa ba chiếc ba lô?',
      'Bài học về ba chiếc ba lô gợi cho em suy nghĩ gì về sự công bằng trong làm việc nhóm?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ đã yêu cầu sắp xếp lại ba chiếc ba lô hành quân như thế nào?',
      options: [
        'Để hai đồng chí bảo vệ gánh hết toàn bộ đồ đạc cho Bác',
        'Chia đều đồ đạc thành ba phần bằng nhau để mỗi người cùng gánh vác',
        'Bỏ bớt gạo và tài liệu lại dọc đường để đi cho nhanh',
        'Thuê người dân địa phương gánh hộ đồ đạc',
      ],
      correctAnswer: 1,
      explanation: 'Bác yêu cầu chia đều đồ đạc làm ba phần bằng nhau để cùng gánh vác trách nhiệm và đảm bảo tính công bằng, bình đẳng.',
    },
  },
  {
    id: 'story_10',
    title: 'Đôi dép cao su của Bác',
    subtitle: 'Di vật thiêng liêng và bài học cần kiệm',
    lesson: 'Lối sống giản dị, cần kiệm, gắn bó máu thịt với nhân dân',
    suitableAge: 'Tiểu học (Lớp 1 – 5)',
    gradeCategory: 'Lớp 1 – 3',
    teachingGroup: 'DIEU_2',
    teachingGroupTitle: 'Điều 2: Học tập tốt, lao động tốt',
    readingTime: '3 phút',
    icon: '🩴',
    historicalPeriod: '1947 – 1969 • Từ Chiến khu Việt Bắc về Thủ đô Hà Nội',
    historicalSource: 'Bảo tàng Hồ Chí Minh — Di vật đôi dép cao su lịch sử',
    goldenQuote: 'Dép còn đóng quai đi tốt, chưa hỏng, mua đôi mới tốn tiền của nhân dân!',
    content:
      'Đôi dép cao su của Bác Hồ được làm từ một chiếc lốp ô tô quân sự cũ của thực dân Pháp bị quân ta bắt được từ chiến dịch năm 1947. Đôi dép có hai quai trước bắt chéo, hai quai sau song song, đế được cắt vừa vặn bàn chân Bác.\nĐôi dép lốp giản dị ấy đã cùng Bác lội suối, trèo đèo suốt những năm tháng kháng chiến trường kỳ ở chiến khu Việt Bắc, theo Bác về Thủ đô Hà Nội, và cùng Bác đi thăm các nước bạn bè trên thế giới.\nNhiều lần quai dép bị tụt chốt, mòn vẹt đế, các đồng chí phục vụ cơ quan nhiều lần đề nghị Bác cho thay một đôi dép da mới trang trọng hơn. Nhưng lần nào Bác cũng cười từ chối và bảo:\n- Dép này của Bác còn đi tốt lắm, chỉ cần đóng lại cái quai là dùng được rồi. Mua đôi mới tốn tiền của Nhà nước, tốn mồ hôi nước mắt của nhân dân đóng thuế!\nCho đến tận những ngày tháng cuối cùng của cuộc đời, đôi dép cao su mộc mạc ấy vẫn luôn ở bên Người, trở thành biểu tượng bất tử về nhân cách thanh cao, giản dị tuyệt vời của một vị Chủ tịch nước.',
    moralLesson:
      'Thực hành tiết kiệm từ những vật dụng nhỏ bé nhất là phẩm chất đạo đức cao đẹp. Tiết kiệm không phải là bủn xỉn mà là biết trân trọng mồ hôi công sức lao động của cha mẹ và nhân dân.',
    dailyActionPledge:
      'Hôm nay em sẽ giữ gìn sách vở thật cẩn thận, không lãng phí giấy trắng và dùng bút chì đến hết ruột.',
    questions: [
      'Đôi dép cao su của Bác Hồ được làm từ vật liệu gì và có từ năm nào?',
      'Vì sao Bác Hồ nhiều lần từ chối thay đôi dép mới dù đôi dép cũ đã mòn vẹt quai?',
      'Em đã thực hành thói quen tiết kiệm đồ dùng học tập và quần áo của mình như thế nào?',
    ],
    interactiveQuiz: {
      question: 'Lý do Bác Hồ không muốn thay đôi dép cao su mới là gì?',
      options: [
        'Vì Bác không tìm được đôi dép nào vừa cỡ chân',
        'Vì đôi dép còn dùng tốt, mua mới sẽ tốn tiền của nhân dân đóng thuế',
        'Vì Bác sợ mang dép da bị trơn trượt khi đi mưa',
        'Vì không có cửa hàng nào bán dép da ở Hà Nội',
      ],
      correctAnswer: 1,
      explanation: 'Bác luôn tâm niệm: Tiết kiệm từng đồng tiền thuế của nhân dân là đạo đức cách mạng của người lãnh đạo.',
    },
  },
  {
    id: 'story_11',
    title: 'Bác Hồ học tiếng nước ngoài trên đường bôn ba',
    subtitle: 'Viết từ mới lên cánh tay và nghị lực tự học phi thường',
    lesson: 'Tinh thần tự học bền bỉ, kiên trì trau dồi tri thức mỗi ngày',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'THCS',
    teachingGroup: 'DIEU_2',
    teachingGroupTitle: 'Điều 2: Học tập tốt, lao động tốt',
    readingTime: '4 phút',
    icon: '📖',
    historicalPeriod: '1912 – 1920 • Anh quốc và Pháp',
    historicalSource: 'Tác phẩm "Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch" — Trần Dân Tiên',
    goldenQuote: 'Mỗi ngày học thuộc mười từ mới. Viết lên cánh tay, vừa làm việc vừa nhẩm lại, tối về viết lại ra giấy cho kỳ nhớ mới thôi!',
    content:
      'Để tìm hiểu bản chất của chủ nghĩa thực dân và tìm đường cứu nước, Bác Hồ biết rằng điều quan trọng bậc nhất là phải thông thạo tiếng nói của các nước. Người đã tự học tiếng Pháp, tiếng Anh và nhiều ngoại ngữ khác trong điều kiện vô cùng thiếu thốn.\nThời kỳ làm phụ bếp trên con tàu biển vượt đại dương, mỗi sáng sớm khi quét dọn boong tàu, Bác tìm những tờ báo cũ của hành khách bỏ lại. Bác cẩn thận cắt những mẩu tin nhỏ, gặp từ nào mới thì hỏi các thủy thủ người Pháp hoặc tra cứu từ điển.\nBác có một phương pháp học vô cùng độc đáo: Mỗi sáng, Bác viết khoảng 10 từ mới lên cánh tay của mình. Suốt cả ngày, vừa gánh than, bưng đồ ăn, Bác vừa nhìn vào cánh tay để nhẩm đi nhẩm lại từng từ một. Đến tối, sau khi xong mọi việc mệt lả, Bác dùng que diêm thắp sáng và chép lại những từ đó vào một cuốn sổ nhỏ cho đến khi thuộc làu làu.\nNhờ tinh thần tự học kiên trì phi thường ấy, sau này Bác Hồ đã nói và viết thông thạo gần 10 ngoại ngữ khác nhau, có thể viết báo bằng tiếng Pháp, dịch tài liệu tiếng Anh, tiếng Nga và đối thoại trôi chảy với các nguyên thủ quốc gia.',
    moralLesson:
      'Không có khó khăn nào ngăn nổi bước chân của người có ý chí tự học. Tự học là chiếc chìa khóa vạn năng mở ra kho tàng tri thức của nhân loại.',
    dailyActionPledge:
      'Hôm nay em sẽ ghi nhớ ít nhất 5 từ vựng tiếng Anh mới và dán lên góc bàn học để ôn tập.',
    questions: [
      'Khi làm việc trên con tàu vượt đại dương, Bác Hồ đã tự học ngoại ngữ bằng cách nào?',
      'Cách Bác viết từ mới lên cánh tay dạy cho em bài học gì về việc tận dụng thời gian học tập?',
      'Em có kế hoạch rèn luyện môn Ngoại ngữ hoặc môn học yêu thích như thế nào?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ đã áp dụng phương pháp độc đáo nào để học thuộc từ vựng ngoại ngữ mỗi ngày?',
      options: [
        'Thuê gia sư riêng dạy kèm mỗi tối',
        'Viết từ mới lên cánh tay để vừa làm việc vừa nhẩm thuộc',
        'Chỉ học ngữ pháp mà không cần học từ vựng',
        'Chờ đến khi có thời gian rảnh rỗi mới mở sách học',
      ],
      correctAnswer: 1,
      explanation: 'Bác viết từ mới lên cánh tay để tranh thủ từng giây phút lao động vừa làm vừa học, tối về viết lại ra giấy cho kỳ thuộc.',
    },
  },
  {
    id: 'story_12',
    title: 'Ngăn nắp, sạch sẽ từ căn nhà sàn đơn sơ',
    subtitle: 'Nếp sống khoa học và sạch sẽ của Người',
    lesson: 'Rèn luyện thói quen ngăn nắp, giữ gìn vệ sinh nơi ở và học tập',
    suitableAge: 'Tiểu học (Lớp 1 – 5)',
    gradeCategory: 'Lớp 1 – 3',
    teachingGroup: 'DIEU_4',
    teachingGroupTitle: 'Điều 4: Giữ gìn vệ sinh thật tốt',
    readingTime: '3 phút',
    icon: '🏡',
    historicalPeriod: '1958 – 1969 • Nhà sàn Bác Hồ tại Phủ Chủ tịch',
    historicalSource: 'Ban Quản lý Khu Di tích Phủ Chủ tịch & Báo Thiếu niên Tiền phong',
    goldenQuote: 'Nơi ở và làm việc sạch sẽ, ngăn nắp thì tinh thần mới sảng khoái, làm việc mới hiệu quả và ít ốm đau.',
    content:
      'Bất kỳ ai từng có vinh dự đến thăm ngôi nhà sàn của Bác Hồ tại Phủ Chủ tịch đều vô cùng xúc động trước nếp sống thanh bạch, ngăn nắp và sạch sẽ đến mẫu mực của Người.\nCăn phòng ngủ và phòng làm việc của Bác chỉ rộng hơn chục mét vuông, đồ đạc vô cùng đơn sơ: một chiếc giường đơn trải chiếu cói, một chiếc bàn làm việc bằng gỗ mộc, chiếc quạt lá cọ và ngọn đèn bàn nhỏ.\nĐiều đặc biệt là mọi đồ vật đều được Bác sắp đặt hết sức gọn gàng, trật tự. Những cuốn sách Bác đang đọc được xếp ngay ngắn theo từng chủ đề; chiếc bút mực, lọ mực, hộp diêm đều đặt đúng vị trí quy định để khi cần, dù trong đêm tối cúp điện, Bác đưa tay ra là lấy được ngay mà không cần tìm kiếm.\nBuổi sáng sau khi thức dậy và tập thể dục, Bác tự tay gấp chăn màn vuông vắn như viên gạch, quét dọn căn phòng sạch bóng rồi mới bắt đầu làm việc. Bác thường nhắc nhở cán bộ và các cháu thiếu nhi: "Nơi ở và góc học tập sạch sẽ, ngăn nắp thì tinh thần mới sảng khoái, làm việc mới hiệu quả và bảo vệ được sức khỏe!".',
    moralLesson:
      'Giữ gìn vệ sinh thân thể và nơi ở gọn gàng là biểu hiện của nếp sống văn minh. Người học sinh chăm ngoan phải luôn giữ cho góc học tập và lớp học của mình sạch đẹp mỗi ngày.',
    dailyActionPledge:
      'Hôm nay em sẽ tự tay dọn dẹp bàn học của mình thật sạch sẽ và gấp chăn màn ngay sau khi thức dậy.',
    questions: [
      'Đồ đạc trong căn nhà sàn của Bác Hồ được bài trí và sắp xếp như thế nào?',
      'Vì sao Bác Hồ dù bận trăm công nghìn việc vẫn tự tay quét dọn và gấp chăn màn ngăn nắp?',
      'Em đã tự giác sắp xếp góc học tập ở nhà và ngăn bàn ở lớp học ra sao?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ dạy cán bộ và thiếu nhi điều gì về việc giữ gìn nơi ở sạch sẽ, ngăn nắp?',
      options: [
        'Chỉ cần dọn dẹp khi có khách quý đến thăm nhà',
        'Nơi ở sạch sẽ, ngăn nắp thì tinh thần sảng khoái, làm việc hiệu quả và ít ốm đau',
        'Gọn gàng là việc của người lớn, học sinh không cần bận tâm',
        'Nên sắm nhiều đồ đạc đắt tiền để trang trí phòng',
      ],
      correctAnswer: 1,
      explanation: 'Bác dạy nếp sống ngăn nắp, khoa học giúp rèn luyện tính kỷ luật và mang lại sức khỏe dồi dào.',
    },
  },
  {
    id: 'story_13',
    title: 'Bài học rửa tay sạch trước khi ăn kẹo',
    subtitle: 'Lời nhắc nhở ân cần về vệ sinh thân thể',
    lesson: 'Ý thức giữ gìn vệ sinh cá nhân, phòng bệnh và bảo vệ sức khỏe',
    suitableAge: 'Mầm non & Tiểu học (Lớp 1 – 3)',
    gradeCategory: 'Lớp 1 – 3',
    teachingGroup: 'DIEU_4',
    teachingGroupTitle: 'Điều 4: Giữ gìn vệ sinh thật tốt',
    readingTime: '3 phút',
    icon: '🧼',
    historicalPeriod: 'Năm 1956 • Bác Hồ đón các cháu mẫu giáo tại Phủ Chủ tịch',
    historicalSource: 'Báo Nhi Đồng — Tuyển tập Bác Hồ với thiếu niên nhi đồng',
    goldenQuote: 'Bác có kẹo ngon cho các cháu đây. Nhưng trước khi ăn kẹo, các cháu hãy chìa hai bàn tay ra xem tay ai sạch nhất nào!',
    content:
      'Nhân dịp Tết Trung thu năm 1956, Bác Hồ mời một đoàn các em nhỏ mẫu giáo và nhi đồng Thủ đô vào Phủ Chủ tịch vui liên hoan phá cỗ cùng Bác.\nCác em nhỏ tung tăng chạy nhảy quanh vườn hoa, chơi đùa bắt bướm ríu rít như đàn chim non. Khi các cháu tập hợp lại quanh bàn tiệc có kẹo thơm và bánh nướng, Bác Hồ mỉm cười trìu mến bước ra với một túi kẹo lớn trên tay.\nCác em nhỏ háo hức xoe tròn đôi mắt ngước nhìn Bác. Bác chưa vội chia kẹo ngay mà dịu dàng bảo:\n- Bác có rất nhiều kẹo ngon chia cho các cháu đây! Nhưng trước khi nhận kẹo, Bác muốn xem bạn nào có bàn tay sạch nhất nào. Các cháu hãy giơ hai bàn tay ra phía trước cho Bác xem!\nCác em nhỏ liền xòe hai bàn tay ra. Bác đi từng hàng, cúi xuống ngắm nghía từng bàn tay nhỏ. Có bạn tay sạch hồng hào được Bác khen, nhưng cũng có vài bạn vừa mải mê nghịch đất cát dưới gốc cây nên bàn tay còn lấm lem bụi bẩn.\nBác ân cần dẫn các em ấy lại bên vòi nước sạch, tự tay Bác lấy xà phòng hướng dẫn các cháu xoa đều lòng bàn tay, mu bàn tay và từng kẽ ngón tay rồi rửa lại dưới làn nước trong vắt. Sau khi lau tay khô ráo, Bác mới chia kẹo cho từng cháu và ân cần căn dặn:\n- Bàn tay chúng ta làm việc, cầm bút, cầm phấn rất dễ dính vi khuẩn. Các cháu phải luôn nhớ rửa tay sạch bằng xà phòng trước khi ăn cơm và sau khi đi vệ sinh để khỏi bị đau bụng, ốm đau nhé!',
    moralLesson:
      'Giữ gìn vệ sinh đôi bàn tay là bước đơn giản nhưng quan trọng nhất để bảo vệ sức khỏe cho chính mình và cộng đồng. Phòng bệnh hơn chữa bệnh.',
    dailyActionPledge:
      'Hôm nay em sẽ thực hiện đúng quy trình 6 bước rửa tay bằng xà phòng trước khi ăn cơm và sau khi chơi thể thao.',
    questions: [
      'Trước khi chia kẹo cho các em nhỏ, Bác Hồ đã yêu cầu các em làm điều gì?',
      'Bác Hồ đã xử lý như thế nào đối với các bạn nhỏ có bàn tay còn dính bụi bẩn?',
      'Tại sao việc rửa tay bằng xà phòng trước khi ăn lại vô cùng quan trọng đối với học sinh?',
    ],
    interactiveQuiz: {
      question: 'Bác Hồ đã ân cần nhắc nhở các em nhỏ điều gì về việc rửa tay sạch sẽ?',
      options: [
        'Chỉ cần rửa tay một lần mỗi tuần là đủ',
        'Rửa tay sạch bằng xà phòng trước khi ăn và sau khi đi vệ sinh để phòng tránh bệnh tật',
        'Rửa tay bằng nước ngọt có ga cho thơm',
        'Không cần rửa tay nếu thấy tay vẫn còn trắng',
      ],
      correctAnswer: 1,
      explanation: 'Bác dạy thói quen vệ sinh khoa học: Luôn rửa sạch tay bằng xà phòng trước khi ăn để vi khuẩn không xâm nhập vào cơ thể.',
    },
  },
  {
    id: 'story_14',
    title: 'Bác Hồ với các dũng sĩ tí hon miền Nam',
    subtitle: 'Vòng tay ấm áp đón dũng sĩ Hồ Văn Mến (Bình Dương)',
    lesson: 'Lòng yêu nước, căm thù giặc và ý chí kiên cường vì độc lập dân tộc',
    suitableAge: 'Tiểu học & THCS',
    gradeCategory: 'THCS',
    teachingGroup: 'DIEU_1',
    teachingGroupTitle: 'Điều 1: Yêu Tổ quốc, yêu đồng bào',
    readingTime: '4 phút',
    icon: '🎖️',
    historicalPeriod: 'Tháng 2/1969 • Phủ Chủ tịch, Hà Nội',
    historicalSource: 'Gặp gỡ Đoàn thiếu nhi dũng sĩ miền Nam — Bảo tàng Lịch sử Quân sự Việt Nam',
    goldenQuote: 'Các cháu tuy nhỏ tuổi nhưng chí khí không nhỏ! Bác cháu ta cùng chung một dòng máu Lạc Hồng, Nam Bắc nhất định sum họp một nhà!',
    content:
      'Đầu năm 1969, Trung ương Đảng và Bác Hồ đón một đoàn đại biểu đặc biệt ra thăm miền Bắc: Đoàn thiếu nhi dũng sĩ diệt Mỹ miền Nam. Trong đoàn có em Hồ Văn Mến — người thiếu niên dũng sĩ kiên cường quê ở An Sơn (vùng đất Lái Thiêu, Thủ Dầu Một, Bình Dương), cùng các bạn Đoàn Văn Luyện, Huỳnh Thị Kiểng...\nKhi đoàn bước vào phòng khách Phủ Chủ tịch, Bác Hồ và Bác Tôn Đức Thắng đã đứng đợi sẵn từ cửa. Nhìn các dũng sĩ tí hon người gầy guộc, trên mình còn mang những vết sẹo thương tật vì bom đạn kẻ thù, đôi mắt Bác Hồ ngân ngấn lệ.\nBác ôm ghì từng cháu vào lòng, hôn lên trán, lên má các em. Bác ân cần hỏi thăm quê hương Bình Dương kiên cường đánh giặc ra sao, gia đình các cháu thế nào, vết thương ở chân của Hồ Văn Mến có còn nhức nhối khi trái gió trở trời không.\nBác cầm tay em Hồ Văn Mến và xúc động nói:\n- Các cháu tuy nhỏ tuổi nhưng chí khí không hề nhỏ! Tuổi trẻ miền Nam đã làm rạng danh non sông đất nước. Bác luôn tự hào về các cháu thiếu nhi miền Nam anh hùng!\nBác dặn dò các cháu phải cố gắng học tập văn hóa thật tốt, rèn luyện sức khỏe để sau này khi miền Nam hoàn toàn giải phóng, non sông thu về một mối, các cháu sẽ là những kỹ sư, bác sĩ, thầy giáo tài ba xây dựng lại quê hương đàng hoàng hơn, to đẹp hơn.',
    moralLesson:
      'Tuổi nhỏ chí lớn, lòng yêu nước nồng nàn không phân biệt lứa tuổi. Thiếu nhi Bình Dương và thiếu nhi cả nước luôn tự hào tiếp bước truyền thống anh hùng của cha anh.',
    dailyActionPledge:
      'Hôm nay em sẽ tìm hiểu và kể cho bạn bè nghe về gương anh hùng dũng sĩ thiếu nhi Hồ Văn Mến của quê hương Bình Dương Đất Thủ.',
    questions: [
      'Trong đoàn thiếu nhi dũng sĩ miền Nam ra thăm Bác Hồ năm 1969, dũng sĩ Hồ Văn Mến quê ở đâu?',
      'Thái độ và cử chỉ của Bác Hồ khi gặp gỡ các dũng sĩ tí hon miền Nam thể hiện tình cảm gì?',
      'Bác Hồ đã căn dặn các dũng sĩ nhỏ tuổi nhiệm vụ quan trọng gì cho tương lai mai sau?',
    ],
    interactiveQuiz: {
      question: 'Dũng sĩ thiếu nhi Hồ Văn Mến trong đoàn dũng sĩ miền Nam ra thăm Bác Hồ là người con của quê hương nào?',
      options: [
        'Vùng đất Thừa Thiên Huế',
        'Vùng đất Lái Thiêu — Thủ Dầu Một (Bình Dương)',
        'Quê hương đất thép Củ Chi',
        'Quê hương Đồng Tháp Mười',
      ],
      correctAnswer: 1,
      explanation: 'Dũng sĩ Hồ Văn Mến sinh ra tại An Sơn (Lái Thiêu, Bình Dương), lập nhiều chiến công hiển hách khi tuổi đời còn rất nhỏ và vinh dự được gặp Bác Hồ năm 1969.',
    },
  },
  {
    id: 'story_15',
    title: 'Không ai được vào trước',
    subtitle: 'Bài học bình đẳng và tự giác xếp hàng của vị Chủ tịch nước',
    lesson: 'Tôn trọng kỷ luật chung, khiêm tốn, bình đẳng, không nhận quyền ưu tiên',
    suitableAge: 'Tất cả (Lớp 1 – 9)',
    gradeCategory: 'Lớp 4 – 5',
    teachingGroup: 'DIEU_5',
    teachingGroupTitle: 'Điều 5: Khiêm tốn, thật thà, dũng cảm',
    readingTime: '3 phút',
    icon: '🎟️',
    historicalPeriod: 'Năm 1961 • Chùa Một Cột, Hà Nội',
    historicalSource: 'Theo hồi ký các chiến sĩ cảnh vệ bảo vệ Bác Hồ & Ban Tuyên giáo Trung ương',
    goldenQuote: 'Bác là Chủ tịch nước nhưng khi đi tham quan cũng là một người công dân. Đã là công dân thì phải xếp hàng mua vé như mọi người, không được chen ngang!',
    content:
      'Vào một ngày nghỉ cuối tuần năm 1961, Bác Hồ cùng các đồng chí cảnh vệ đi dạo và ghé thăm di tích Chùa Một Cột ở Thủ đô Hà Nội. Hôm ấy là ngày rằm, nhân dân và các cháu học sinh đến viếng cảnh chùa rất đông, xếp thành một hàng dài trước cổng soát vé.\nThấy Bác Hồ đến, đồng chí phụ trách bảo vệ di tích liền vội vã chạy ra mở rộng cánh cổng phụ và cung kính mời:\n- Dạ thưa Bác, mời Bác và các đồng chí đi cửa này vào trước ạ để khỏi phải chờ đợi!\nBác Hồ dừng bước, lắc đầu từ chối và nghiêm nghị nói:\n- Không được đâu chú! Ai đến trước thì vào trước, ai đến sau thì vào sau. Bác là Chủ tịch nước nhưng khi đi tham quan cũng là một người công dân bình thường như mọi người. Đã là công dân thì phải có kỷ luật, phải xếp hàng theo thứ tự, không được nhận quyền ưu tiên chen ngang làm gương xấu cho nhân dân và các cháu nhỏ!\nNói rồi, Bác hòa mình vào dòng người, vui vẻ đứng xếp hàng kiên nhẫn từng bước một cho đến khi tới lượt mình mua vé vào cửa.\nNhìn thấy vị lãnh tụ kính yêu sống mẫu mực, khiêm nhường đến từng cử chỉ nhỏ, đồng bào ai nấy đều rưng rưng xúc động và tự giác noi theo trật tự.',
    moralLesson:
      'Kỷ luật và sự công bằng tạo nên một xã hội văn minh. Không ai được phép tự cho mình đứng trên quy định chung của tập thể. Học sinh cần rèn luyện thói quen tự giác xếp hàng nơi công cộng.',
    dailyActionPledge:
      'Hôm nay em sẽ tự giác xếp hàng ngay ngắn khi vào lớp, khi mua đồ ăn ở căng-tin và khi tham gia giao thông.',
    questions: [
      'Khi người phụ trách mời Bác đi cửa ưu tiên để vào chùa trước, Bác Hồ đã phản ứng ra sao?',
      'Câu nói của Bác về tư cách người công dân bình thường dạy cho chúng ta bài học đạo đức gì?',
      'Em thể hiện văn hóa xếp hàng nơi công cộng (trường học, siêu thị, khu vui chơi) như thế nào?',
    ],
    interactiveQuiz: {
      question: 'Khi đi tham quan Chùa Một Cột, Bác Hồ đã làm gương việc gì trước nhân dân?',
      options: [
        'Nhận lời đi cửa phụ ưu tiên để vào nhanh hơn',
        'Tự giác đứng xếp hàng mua vé theo thứ tự như mọi người công dân bình thường',
        'Yêu cầu ban quản lý đóng cửa chùa để Bác tham quan một mình',
        'Nhờ người khác xếp hàng mua vé hộ mình',
      ],
      correctAnswer: 1,
      explanation: 'Bác dạy: Dù ở cương vị nào thì trước pháp luật và kỷ luật công cộng, mọi công dân đều bình đẳng và phải tự giác xếp hàng.',
    },
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
