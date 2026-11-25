// Dữ liệu chính thức thu thập từ Bảo tàng Hồ Chí Minh (https://baotanghochiminh.vn)
// Bao gồm:
// 1. Hệ thống Trưng bày Thường xuyên (06 Tổ hợp không gian biểu tượng lớn & Gian khánh tiết)
// 2. Chuyên mục "Hiện Vật Kể Chuyện" (12 hiện vật kỷ vật lịch sử tiêu biểu)
// 3. Hệ thống 14 Bảo tàng Chi nhánh & Di tích Lưu niệm Chủ tịch Hồ Chí Minh toàn quốc
// 4. Các Chuyên đề Nghiên cứu & Chuyện kể Giáo dục Truyền thống

export interface MuseumZoneToHop {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  officialBthcmUrl: string;
  architecturalSymbolism: string; // Biểu tượng nghệ thuật bảo tàng học
  contentSummary: string; // Nội dung khái quát
  keyArtifacts: string[]; // Hiện vật tiêu biểu trong tổ hợp
  ideologicalValue: string; // Giá trị tư tưởng & bài học
  localConnectionToTDM?: string; // Mối liên hệ với Thủ Dầu Một
}

export interface BthcmArtifactStory {
  id: string;
  code: string;
  title: string;
  category: 'Kỷ vật đời thường' | 'Hiện vật kháng chiến' | 'Kỷ vật kháng chiến' | 'Văn kiện - Ấn phẩm' | 'Tặng phẩm ngoại giao' | 'Tác phẩm nghệ thuật';
  yearOrPeriod: string;
  origin: string; // Xuất xứ / Nơi lưu giữ gốc
  imageUrl: string;
  fallbackImageUrl?: string;
  officialBthcmUrl: string;
  story: string; // Câu chuyện hiện vật xúc động
  moralLesson: string; // Chuẩn mực đạo đức Quy định 144-QĐ/TW & Chỉ thị 07-CT/TW
  citation: string;
}

export interface BthcmHeritageBranch {
  id: string;
  title: string;
  branchType: 'Khu di tích Quốc gia đặc biệt' | 'Bảo tàng Chi nhánh' | 'Di tích Lịch sử Cách mạng' | 'Khu di tích Lịch sử Cách mạng' | 'Quảng trường Tượng đài';
  region: 'Miền Bắc' | 'Miền Trung' | 'Tây Nguyên' | 'Miền Nam' | 'Đất Thủ - Bình Dương';
  location: string;
  historicalEra: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  officialBthcmUrl: string;
  significance: string;
  connectionToTDM?: string;
}

export interface BthcmStoryArticle {
  id: string;
  title: string;
  category: 'Chuyện kể về Bác' | 'Nghiên cứu tư tưởng' | 'Giáo dục truyền thống';
  authorOrSource: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  officialBthcmUrl: string;
  summary: string;
  coreMoralLesson: string;
}

// 1. TỔNG QUAN KIẾN TRÚC & GIAN KHÁNH TIẾT BẢO TÀNG HỒ CHÍ MINH
export const BTHCM_OVERVIEW_INFO = {
  name: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
  address: 'Số 19 phố Ngọc Hà, quận Ba Đình, TP. Hà Nội',
  inaugurationDate: '19/5/1990 (Đúng dịp Kỷ niệm 100 năm ngày sinh Chủ tịch Hồ Chí Minh)',
  architecturalConcept:
    'Công trình mang hình tượng bông sen trắng thanh cao gần 20 mét, biểu trưng cho cuộc đời giản dị, trong sáng của Chủ tịch Hồ Chí Minh và tấm lòng kính yêu, tri ân sâu sắc của toàn thể nhân dân Việt Nam đối với Người.',
  ceremonialHall: {
    title: 'Gian Khánh Tiết — Trái Tim Của Bảo Tàng',
    description:
      'Trung tâm gian khánh tiết đặt tượng đồng toàn thân Chủ tịch Hồ Chí Minh trong tư thế đứng giơ tay chào đồng bào và bạn bè quốc tế. Phía sau tượng là biểu tượng Mặt trời chân lý và hình ảnh cây đa Tân Trào, Pác Bó - cội nguồn sức mạnh đại đoàn kết toàn dân tộc.',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/pic-Produ_636690247600159821_HasThumb_Thumb.jpg',
    officialUrl: 'https://baotanghochiminh.vn/gioi-thieu-chung-ve-trung-bay-thuong-xuyen-cua-bao-tang-ho-chi-minh.htm',
  },
};

// 2. HỆ THỐNG 06 TỔ HỢP KHÔNG GIAN BIỂU TƯỢNG (TRƯNG BÀY THƯỜNG XUYÊN)
export const BTHCM_PERMANENT_EXHIBITIONS: MuseumZoneToHop[] = [
  {
    id: 'th_01',
    order: 1,
    title: 'Tổ hợp 1: Quê Hương & Gia Đình Chủ Tịch Hồ Chí Minh',
    subtitle: 'Nôi ấm nuôi dưỡng tâm hồn và nhân cách người thanh niên Nguyễn Tất Thành',
    period: '1890 – 1911',
    location: 'Làng Sen & Làng Hoàng Trù, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/10_636843746999059227_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/to-hop-1-que-huong-gia-dinh-chu-tich-ho-chi-minh.htm',
    architecturalSymbolism:
      'Hình tượng mái nhà tranh xứ Nghệ mộc mạc, khung cửi dệt vải, chiếc võng đay và ngọn đèn dầu lạc. Không gian toát lên vẻ ấm áp, thanh bạch của một gia đình nhà nho nghèo yêu nước thương dân.',
    contentSummary:
      'Tái hiện cội nguồn quê hương Làng Sen, nơi cậu bé Nguyễn Sinh Cung chào đời và trải qua tuổi thơ êm đềm nhưng sớm chứng kiến cảnh nước mất nhà tan. Khắc họa sâu đậm công lao dạy dỗ của người cha - cụ Phó bảng Nguyễn Sinh Sắc và đức hy sinh tần tảo của người mẹ - bà Hoàng Thị Loan.',
    keyArtifacts: [
      'Bộ khung cửi dệt vải của thân mẫu Hoàng Thị Loan',
      'Chiếc võng đay Bác nằm thuở ấu thơ',
      'Bộ bàn ghế, giá sách, nghiên mực và cối tán thuốc của cụ Nguyễn Sinh Sắc',
      'Chiếc rương gỗ Người thường men theo lúc chập chững tập đi',
    ],
    ideologicalValue:
      'Giá trị giáo dục gia phong, tình mẫu tử, lòng nhân ái và hun đúc ý chí quật khởi giải phóng dân tộc từ cội nguồn quê hương xứ sở.',
    localConnectionToTDM:
      'Cụ Phó bảng Nguyễn Sinh Sắc sau này đã vào Nam Bộ, dừng chân tại Chùa Hội Khánh (Thủ Dầu Một) sáng lập Hội Danh Dự (1923–1926) truyền bá lòng yêu nước và bốc thuốc cứu dân nghèo.',
  },
  {
    id: 'th_02',
    order: 2,
    title: 'Tổ hợp 2: Bão Táp Cách Mạng Xô Viết Nghệ Tĩnh',
    subtitle: 'Cuộc tổng diễn tập đầu tiên khẳng định sức mạnh vô địch của giai cấp công - nông',
    period: '1930 – 1931',
    location: 'Nghệ An & Hà Tĩnh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/A8_636843752808353430_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/to-hop-2-xo-viet-nghe-tinh.htm',
    architecturalSymbolism:
      'Nghệ thuật trưng bày tương phản đối lập: Một bên là sự xa hoa của thực dân phong kiến (xe tay, đồ đắt tiền), một bên là mâm cơm đạm bạc, áo tơi lá của nông dân; kết hợp sắc xanh hòa bình của quê hương và sắc đỏ kiên cường của ngọn lửa cách mạng.',
    contentSummary:
      'Mô phỏng cao trào cách mạng 1930–1931 với đỉnh cao là Xô Viết Nghệ Tĩnh dưới sự lãnh đạo của Đảng Cộng sản Việt Nam vừa mới thành lập do Lãnh tụ Nguyễn Ái Quốc sáng lập. Nhân dân vùng lên đập tan xiềng xích thực dân, lập chính quyền tự quản của công nông.',
    keyArtifacts: [
      'Trống lệnh, tù và và giáo mác tự rèn của các đội Tự vệ đỏ',
      'Tài liệu truyền đơn in thạch của Xô Viết Nghệ Tĩnh',
      'Mâm đồng, bát sành và áo tơi của người nông dân xứ Nghệ',
    ],
    ideologicalValue:
      'Tinh thần bất khuất, liên minh công - nông bền vững, niềm tin sắt son vào sự lãnh đạo của Đảng và con đường giải phóng giai cấp, giải phóng dân tộc.',
    localConnectionToTDM:
      'Phong trào công nhân đồn điền cao su Bình Dương và công nhân Lò chén, gốm sứ Thủ Dầu Một sớm tiếp thu ngọn lửa cách mạng từ những năm 1930.',
  },
  {
    id: 'th_03',
    order: 3,
    title: 'Tổ hợp 3: Pác Bó Cội Nguồn Cách Mạng',
    subtitle: 'Nơi Bác Hồ về nước sau 30 năm bôn ba, mở ra trang sử mới khai sinh nước Việt Nam mới',
    period: '1941 – 1945',
    location: 'Hang Cốc Bó, xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/58_636844397596308501_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/to-hop-3-pac-bo-cach-mang.htm',
    architecturalSymbolism:
      'Khối phù điêu đá núi hùng vĩ kết hợp hình ảnh suối Lê-nin trong vắt và bàn đá chông chênh. Biểu trưng cho sự hòa quyện tuyệt đẹp giữa thiên nhiên non sông và tâm hồn thi sĩ - chiến sĩ của Bác Hồ.',
    contentSummary:
      'Tháng 01/1941, Người đặt chân trở về Tổ quốc tại mốc 108. Tại Pác Bó, Bác chủ trì Hội nghị Trung ương 8 (05/1941) thành lập Mặt trận Việt Minh, xuất bản báo Việt Nam Độc Lập, chỉ đạo thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (12/1944) chuẩn bị thế và lực cho Tổng khởi nghĩa Tháng Tám.',
    keyArtifacts: [
      'Máy chữ Hermes Baby Bác trực tiếp dùng đánh máy văn kiện',
      'Chiếc bàn đá chông chênh dịch sử Đảng',
      'Tờ báo Việt Nam Độc Lập số 1 do Bác vẽ tranh cổ động và viết bài',
      'Chiếc làn mây đựng tài liệu bí mật của Bác tại hang Cốc Bó',
    ],
    ideologicalValue:
      'Nghệ thuật chớp thời cơ lịch sử, tinh thần tự lực tự cường: "Đem sức ta mà tự giải phóng cho ta", xây dựng căn cứ địa cách mạng vững chắc.',
    localConnectionToTDM:
      'Ngọn cờ Mặt trận Việt Minh từ Pác Bó đã thổi bùng phong trào cách mạng khắp miền Đông Nam Bộ, dẫn tới cuộc khởi nghĩa giành chính quyền thắng lợi vẻ vang tại tỉnh lỵ Thủ Dầu Một ngày 25/8/1945.',
  },
  {
    id: 'th_04',
    order: 4,
    title: 'Tổ hợp 4: Toàn Dân Chiến Đấu 1946 – 1954',
    subtitle: 'Biểu tượng Bông hoa Năm cánh chiến thắng trên mảnh đất kháng chiến',
    period: '1946 – 1954',
    location: 'Chiến khu Việt Bắc & Chiến trường Điện Biên Phủ',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/A_636844400636909842_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/banner-hoctap.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/to-hop-4-viet-nam-chien-dau-1946-1954.htm',
    architecturalSymbolism:
      'Cấu trúc đài hoa 5 cánh bung nở rực rỡ, mỗi cánh hoa đại diện cho một nhân tố quyết định đưa kháng chiến đến thắng lợi: Đảng lãnh đạo; Khối đại đoàn kết toàn dân; Lực lượng vũ trang nhân dân; Hậu phương kháng chiến; và Tình đoàn kết quốc tế.',
    contentSummary:
      'Khái quát 9 năm trường kỳ kháng chiến chống thực dân Pháp theo Lời kêu gọi Toàn quốc kháng chiến của Chủ tịch Hồ Chí Minh (19/12/1946). Tái hiện Chiến khu Việt Bắc - Thủ đô kháng chiến, Chiến dịch Biên giới 1950 đến đỉnh cao Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" (07/5/1954).',
    keyArtifacts: [
      'Chiếc mũ cát và áo Kaki Bác đội tại Chiến dịch Biên giới 1950',
      'Bản Lời kêu gọi Toàn quốc kháng chiến viết tại Vạn Phúc 1946',
      'Khẩu hiệu "Thà hy sinh tất cả chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ"',
      'Mô hình Bếp Hoàng Cầm và xe đạp thồ Điện Biên Phủ',
    ],
    ideologicalValue:
      'Đường lối chiến tranh nhân dân, toàn dân, toàn diện, trường kỳ và tự lực cánh sinh. Bản lĩnh kiên cường quyết tử cho Tổ quốc quyết sinh.',
    localConnectionToTDM:
      'Chiến khu Đ kiên cường và căn cứ Thuận An Hòa tại Thủ Dầu Một đã góp phần làm nên những chiến công vang dội của quân và dân miền Đông Nam Bộ trong cuộc kháng chiến 9 năm.',
  },
  {
    id: 'th_05',
    order: 5,
    title: 'Tổ hợp 5: Gian Tưởng Niệm Chủ Tịch Hồ Chí Minh',
    subtitle: 'Bầu trời thu Hà Nội tháng Chín 1969 và niềm tiếc thương vô hạn của non sông',
    period: 'Tháng 9/1969 & Bất tử cùng thời gian',
    location: 'Quảng trường Ba Đình & Thủ đô Hà Nội',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/131_636844394694079404_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/tieusu4-1928.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/to-hop-5-gian-tuong-niem-chu-tich-ho-chi-minh.htm',
    architecturalSymbolism:
      'Ngôi đền thờ tượng trưng mang dáng dấp kiến trúc đình chùa truyền thống dân tộc với vòm mái cong thanh thoát; phía sau là bầu trời xanh với những giọt nước mưa tuôn rơi biểu trưng cho trận mưa 5 ngày 5 đêm của trời đất Hà Nội; các dải kim loại dát mỏng tượng trưng cho ngàn vạn dòng nước mắt tri ân.',
    contentSummary:
      'Không gian thiêng liêng tưởng niệm giây phút Bác Hồ về cõi vĩnh hằng ngày 02/9/1969. Toàn cảnh lễ Quốc tang tại Quảng trường Ba Đình với hơn 100 ngàn đồng bào và đại biểu quốc tế. Nơi trưng bày các bức điện chia buồn, dải băng tang từ hơn 100 quốc gia trên thế giới khẳng định tầm vóc thời đại của Danh nhân văn hóa Hồ Chí Minh.',
    keyArtifacts: [
      'Bản Di chúc thiêng liêng lịch sử của Chủ tịch Hồ Chí Minh (1965 – 1969)',
      'Bộ quần áo lụa nâu và đôi dép cao su Người dùng những ngày cuối đời',
      'Những dải băng tang và sổ tang lưu lại chữ ký các nguyên thủ quốc gia',
      'Hàng ngàn bức điện chia buồn của nhân dân yêu chuộng hòa bình thế giới',
    ],
    ideologicalValue:
      'Di chúc của Người là bảo vật vô giá, soi đường cho sự nghiệp giải phóng miền Nam, thống nhất đất nước và công cuộc xây dựng, chỉnh đốn Đảng ngày nay.',
    localConnectionToTDM:
      'Thực hiện Di chúc thiêng liêng của Bác, Đảng bộ và nhân dân Thủ Dầu Một kiên cường giữ vững địa bàn cửa ngõ Sài Gòn, tiến lên đại thắng mùa Xuân 1975.',
  },
  {
    id: 'th_06',
    order: 6,
    title: 'Tổ hợp 6: Kháng Chiến Chống Mỹ & Đại Thắng Mùa Xuân 1975',
    subtitle: 'Đài sen chiến thắng toàn vẹn non sông theo lời Bác dặn',
    period: '1954 – 1975',
    location: 'Cả nước vì miền Nam ruột thịt & Chiến dịch Hồ Chí Minh lịch sử',
    imageUrl: 'https://baotanghochiminh.vn/pic/Product/166_636844388958126768_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/nha-rong.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/to-hop-6-khang-chien-chong-my-xam-luoc-va-chien-thang-mua-xuan-1975.htm',
    architecturalSymbolism:
      'Hình tượng nghệ thuật Đài Sen nở hoa với các lớp cánh đan xen, mỗi lớp cánh thể hiện một chặng đường lịch sử hào hùng: Miền Bắc xây dựng CNXH; Đường Trường Sơn huyền thoại; Phong trào Đồng Khởi; Mậu Thân 1968; Điện Biên Phủ trên không 1972; và Chiến dịch Hồ Chí Minh mùa xuân 1975.',
    contentSummary:
      'Khái quát 30 năm chiến đấu bền bỉ (1954–1975) thực hiện chân lý thiêng liêng Bác Hồ đúc kết: "Không có gì quý hơn độc lập tự do!". Cả nước chung sức đồng lòng: "Xẻ dọc Trường Sơn đi cứu nước", đánh cho Mỹ cút, đánh cho Ngụy nhào, giải phóng hoàn toàn miền Nam, non sông thu về một mối.',
    keyArtifacts: [
      'Bản thảo Lời kêu gọi đồng bào và chiến sĩ cả nước (17/7/1966) của Bác Hồ',
      'Cột mốc đường Trường Sơn - Đường mòn Hồ Chí Minh',
      'Tập ảnh tư liệu Chiến dịch Hồ Chí Minh lịch sử 30/4/1975',
      'Lá cờ Mặt trận Dân tộc Giải phóng miền Nam tung bay trên Dinh Độc Lập',
    ],
    ideologicalValue:
      'Khát vọng hòa bình, thống nhất non sông; niềm tin tất thắng vào sức mạnh toàn dân tộc khi có tư tưởng đúng đắn soi đường.',
    localConnectionToTDM:
      'Thủ Dầu Một được hoàn toàn giải phóng vào trưa ngày 30/4/1975, mở đường cho các cánh quân tiến vào giải phóng Sài Gòn - Gia Định.',
  },
];

// 3. CHUYÊN MỤC "HIỆN VẬT KỂ CHUYỆN" CHÍNH THỨC TỪ BẢO TÀNG HỒ CHÍ MINH (12 KỶ VẬT TIÊU BIỂU)
export const BTHCM_ARTIFACT_STORIES: BthcmArtifactStory[] = [
  {
    id: 'art_st_01',
    code: 'BTHCM-HV-01',
    title: 'Bộ Đồ Ăn Giản Dị Của Chủ Tịch Hồ Chí Minh',
    category: 'Kỷ vật đời thường',
    yearOrPeriod: '1954 – 1969',
    origin: 'Kho cơ sở Bảo tàng Hồ Chí Minh (Hà Nội)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/Untitled_639189459048023713_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-bo-do-an-cua-chu-tich-ho-chi-minh.htm',
    story:
      'Bộ đồ ăn của Bác Hồ chỉ gồm một chiếc bát sành men trắng mộc mạc, một đôi đũa tre vót thô, một chiếc thìa nhỏ và chiếc đĩa nhỏ để thức ăn. Bác luôn ăn uống hết sức thanh đạm: cá kho tương, canh rau muống, vài quả cà pháo. Bác dặn các đồng chí phục vụ: "Ăn bao nhiêu lấy bấy nhiêu, không được để thừa cơm thừa thức ăn, vì hạt gạo là mồ hôi nước mắt của người nông dân."',
    moralLesson:
      'Quy định 144: Chuẩn mực CẦN, KIỆM, LIÊM, CHÍNH. Thực hành tiết kiệm từ bữa ăn hàng ngày, chống lãng phí, sống thanh bạch, mẫu mực.',
    citation: 'Bảo tàng Hồ Chí Minh — Chuyên mục Hiện vật kể chuyện.',
  },
  {
    id: 'art_st_02',
    code: 'BTHCM-HV-02',
    title: 'Túi Đựng Cơm Và Nước Uống Của Bác Hồ Khi Đi Công Tác',
    category: 'Kỷ vật đời thường',
    yearOrPeriod: '1947 – 1965',
    origin: 'Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/3_639183389699964362_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/anh-bac.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-tui-dung-com-va-nuoc-uong-cua-chu-tich-ho-chi-minh.htm',
    story:
      'Mỗi khi đi công tác cơ sở hay thăm các đơn vị bộ đội, hợp tác xã, Bác đều chuẩn bị sẵn cơm nắm, muối vừng và bình nước sôi trong chiếc túi vải này. Đến giờ trưa, Bác cho dừng xe dưới tán cây râm mát để ăn, nhất định không báo trước cho địa phương để tránh việc đón rước linh đình, tốn kém tiền bạc và công sức của nhân dân.',
    moralLesson:
      'Quy định 144: Chuẩn mực DÂN LÀ GỐC & ĐỨC TÍNH TRỌNG DÂN. Không gây phiền hà cho dân, không quan cách sách nhiễu cơ sở.',
    citation: 'Tư liệu Hiện vật Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_03',
    code: 'BTHCM-HV-03',
    title: 'Đôi Guốc Gỗ Mộc Của Chủ Tịch Hồ Chí Minh',
    category: 'Kỷ vật đời thường',
    yearOrPeriod: '1954 – 1969',
    origin: 'Khu di tích Phủ Chủ tịch & Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/3_639183287359446552_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/chandungbac.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-doi-guoc-go-moc-cua-chu-tich-ho-chi-minh.htm',
    story:
      'Bên cạnh đôi dép lốp huyền thoại, Bác còn sử dụng đôi guốc gỗ đẽo thô này để đi lại quanh nhà sàn và ra vườn tưới cây. Khi guốc mòn quai, Bác nhờ chiến sĩ cần vụ thay quai da tận dụng từ mảnh da vụn. Đôi guốc gỗ mộc là minh chứng cho một vị Chủ tịch nước nhưng mang trọn nét bình dị của một lão nông Việt Nam.',
    moralLesson:
      'Quy định 144: Phong cách sống giản dị, khiêm nhường, không màng danh lợi, hòa nhập trọn vẹn với đời sống của người dân lao động.',
    citation: 'Chuyên đề Kỷ vật Bác Hồ — BTHCM.',
  },
  {
    id: 'art_st_04',
    code: 'BTHCM-HV-04',
    title: 'Báo Lính Kách Mệnh Số 2 (Tháng 02/1927)',
    category: 'Văn kiện - Ấn phẩm',
    yearOrPeriod: 'Tháng 02/1927',
    origin: 'Quảng Châu, Trung Quốc (Lưu giữ tại BTHCM)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/Bao-linh-_639197902796442533_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-bao-linh-kach-menh-so-2-thang-02-1927.htm',
    story:
      'Tờ báo do đồng chí Nguyễn Ái Quốc sáng lập và trực tiếp chỉ đạo biên tập tại Quảng Châu (Trung Quốc) để tuyên truyền, giác ngộ binh lính người Việt trong quân đội viễn chinh Pháp. Báo in bằng kỹ thuật thạch ấn thủ công, dùng lời văn mộc mạc, dễ hiểu khuyên nhủ binh lính không nên cầm súng bắn lại đồng bào ruột thịt.',
    moralLesson:
      'Công tác dân vận khéo, tư tưởng đại đoàn kết và nghệ thuật tuyên truyền giác ngộ cách mạng theo tư tưởng Hồ Chí Minh.',
    citation: 'Kho tư liệu báo chí cách mạng — Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_05',
    code: 'BTHCM-HV-05',
    title: 'Bút Tích Chữ Ký Của Bác Trong Sổ Vàng Tòa Thị Chính Paris (04/7/1946)',
    category: 'Văn kiện - Ấn phẩm',
    yearOrPeriod: '04/7/1946',
    origin: 'Thành phố Paris, Pháp',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/_639104796483701293_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/tieusu3-1920.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-tai-lieu-but-tich-chu-ky-cua-chu-tich-ho-chi-minh-trong-trang-so-vang-cua-toa-thi-chinh-tai-thanh-pho-paris-ngay-4-7-1946.htm',
    story:
      'Trong chuyến thăm chính thức nước Pháp năm 1946 với tư cách là Thượng khách của Chính phủ Pháp, Chủ tịch Hồ Chí Minh đã đến thăm Tòa Thị chính Paris và lưu lại dòng bút tích trang trọng cùng chữ ký thanh thoát trong Sổ vàng. Bút tích thể hiện khát vọng hòa bình chân thành của dân tộc Việt Nam và tầm vóc ngoại giao lỗi lạc của Chủ tịch nước.',
    moralLesson:
      'Ngoại giao Hồ Chí Minh: Dĩ bất biến, ứng vạn biến; kiên định độc lập chủ quyền nhưng luôn chân thành kết nối hòa bình, hữu nghị giữa các dân tộc.',
    citation: 'Tài liệu lưu trữ Ngoại giao — Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_06',
    code: 'BTHCM-HV-06',
    title: 'Đồng Tiền Tài Chính Đầu Tiên In Hình Bác Hồ (1946)',
    category: 'Kỷ vật kháng chiến',
    yearOrPeriod: '1946',
    origin: 'Bộ Tài chính & Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/3_639255810916492443_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-dong-tien-nuoc-viet-nam-dan-chu-cong-hoa-in-hinh-chan-dung-chu-tich-ho-chi-minh.htm',
    story:
      'Tờ giấy bạc tài chính đầu tiên của nước Việt Nam Dân chủ Cộng hòa mang hình chân dung Bác Hồ kính yêu, thường được nhân dân gọi thân thương là "Tiền Cụ Hồ". Sự ra đời của đồng tiền đã khẳng định nền độc lập tài chính của Nhà nước non trẻ, đập tan âm mưu phá hoại kinh tế của thù trong giặc ngoài.',
    moralLesson:
      'Khẳng định chủ quyền quốc gia độc lập về mọi mặt kinh tế, chính trị, văn hóa; bài học giữ gìn kỷ cương tài chính công minh, trong sạch.',
    citation: 'Bảo tàng Hồ Chí Minh (Sưu tập Tiền tệ lịch sử).',
  },
  {
    id: 'art_st_07',
    code: 'BTHCM-HV-07',
    title: 'Bức Họa Chân Dung Bác Vẽ Bằng Máu Của Họa Sĩ Lê Duy Ứng',
    category: 'Tác phẩm nghệ thuật',
    yearOrPeriod: '28/4/1975',
    origin: 'Cửa ngõ Sài Gòn (Lưu giữ tại BTHCM)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/2_639150428264739588_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-chan-dung-chu-tich-ho-chi-minh-ve-bang-mau-cua-hoa-si-le-duy-ung.htm',
    story:
      'Ngày 28/4/1975, tại cửa ngõ Sài Gòn trong Chiến dịch Hồ Chí Minh, người chiến sĩ - họa sĩ Lê Duy Ứng bị trúng đạn pháo hỏng đôi mắt. Trong giây phút cận kề sinh tử giữa chiến trường, anh đã chấm những giọt máu chảy từ khóe mắt mình vẽ nên bức chân dung Bác Hồ với dòng chữ cháy bỏng: "Ánh sáng và niềm tin. Con nguyện dâng trọn đời cho Bác!".',
    moralLesson:
      'Lòng trung thành vô hạn với Đảng, với Bác Hồ và Tổ quốc; ý chí sắt đá vượt lên mọi nghịch cảnh hy sinh vì độc lập dân tộc.',
    citation: 'Hiện vật lịch sử cấp quốc gia — Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_08',
    code: 'BTHCM-HV-08',
    title: 'Chiếc Gậy Dây Leo Đồng Chí Hồ Văn Đại Tặng Bác (Tết 1969)',
    category: 'Tặng phẩm ngoại giao',
    yearOrPeriod: 'Xuân Kỷ Dậu 1969',
    origin: 'Quảng Bình (Bảo tàng Hồ Chí Minh lưu giữ)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/3_639150403213250946_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/bac-ho-wicker-chair.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-gay-day-leo-dong-chi-ho-van-dai-tang-chu-tich-ho-chi-minh-nhan-dip-tet-nguyen-dan-1969.htm',
    story:
      'Chiếc gậy được làm từ một loại dây leo rừng bền dẻo đặc biệt của vùng đất lửa Quảng Bình, do đồng chí Hồ Văn Đại - một cán bộ địa phương cẩn thận đẽo gọt gửi tặng Bác làm gậy chống đi bộ tập thể dục. Bác rất quý chiếc gậy này, Người thường dùng nó để chống khi tản bộ trong vườn Phủ Chủ tịch những tháng ngày cuối đời.',
    moralLesson:
      'Tình cảm gắn bó keo sơn giữa Bác Hồ và đồng bào, chiến sĩ tuyến đầu lửa đạn; phong cách rèn luyện thể lực bền bỉ, ý chí kiên định.',
    citation: 'Kỷ vật Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_09',
    code: 'BTHCM-HV-09',
    title: 'Vỏ Hộp Xà Phòng Giấu Tài Liệu Của Nhà In Bí Mật 157 Nguyễn Trãi',
    category: 'Kỷ vật kháng chiến',
    yearOrPeriod: 'Kháng chiến chống Mỹ',
    origin: 'Sài Gòn - Chợ Lớn (Bảo tàng Hồ Chí Minh)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/2_639144305989233296_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-vo-hop-xa-phong-my-dung-de-dung-tai-lieu-chuyen-di-cac-noi-cua-ba-le-thi-nuoi-cong-tac-tai-nha-in-bi-mat-157-nguyen-trai-sai-gon.htm',
    story:
      'Vỏ hộp xà phòng do bà Lê Thị Nuôi sử dụng khéo léo để ngụy trang, cất giấu các tài liệu, chỉ thị bí mật của Đảng và thư từ của Bác Hồ chuyển từ chiến khu vào nội thành Sài Gòn qua mắt mạng lưới mật thám dày đặc của địch. Chiếc hộp đơn sơ là chứng tích của lòng dũng cảm, mưu trí của những chiến sĩ biệt động nội đô.',
    moralLesson:
      'Lòng dũng cảm vô song, sáng tạo, mưu trí trong công tác bảo vệ bí mật của Đảng và giữ vững mạch máu thông tin liên lạc cách mạng.',
    citation: 'Bảo tàng Hồ Chí Minh — Sưu tập Kỷ vật Kháng chiến miền Nam.',
  },
  {
    id: 'art_st_10',
    code: 'BTHCM-HV-10',
    title: 'Tập Thơ "Trọng Tuyển" Kính Tặng Bác Hồ',
    category: 'Văn kiện - Ấn phẩm',
    yearOrPeriod: '1960',
    origin: 'Kho tư liệu BTHCM',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/tap-tho-t_639197911348662117_HasThumb_Thumb.png',
    fallbackImageUrl: '/assets/hcm-space/duong-sach.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-tang-pham-tap-tho-trong-tuyen-kinh-tang-bac-ho.htm',
    story:
      'Tập thơ tuyển chọn những vần thơ ca ngợi Đảng, Bác Hồ và tinh thần lao động xây dựng đất nước của các tầng lớp nhân dân, văn nghệ sĩ cả nước kính dâng lên Bác nhân dịp sinh nhật lần thứ 70. Bác luôn xem thơ ca là vũ khí sắc bén trên mặt trận tư tưởng văn hóa: "Văn hóa nghệ thuật cũng là một mặt trận. Anh chị em là chiến sĩ trên mặt trận ấy".',
    moralLesson:
      'Xây dựng đời sống văn hóa tinh thần lành mạnh, bồi dưỡng lòng yêu nước, niềm tự hào dân tộc thông qua các tác phẩm văn học nghệ thuật chân chính.',
    citation: 'Hiện vật sách quý — Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_11',
    code: 'BTHCM-HV-11',
    title: 'Sách "Không Có Gì Quý Hơn Độc Lập Tự Do" Xuất Bản Năm 1968',
    category: 'Văn kiện - Ấn phẩm',
    yearOrPeriod: '1968',
    origin: 'NXB Sự Thật (Lưu giữ tại BTHCM)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/2_639119279737575965_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-sach-khong-co-gi-quy-hon-doc-lap-tu-do-nam-1968.htm',
    story:
      'Cuốn sách tập hợp những bài nói, bài viết và lời kêu gọi bất hủ của Chủ tịch Hồ Chí Minh trong giai đoạn kháng chiến chống Mỹ cứu nước ác liệt nhất. Chân lý "Không có gì quý hơn độc lập tự do" được in trang trọng nơi bìa sách, trở thành nguồn cổ vũ tinh thần to lớn cho hàng triệu chiến sĩ ngoài mặt trận và đồng bào hậu phương.',
    moralLesson:
      'Khẳng định chân lý độc lập tự do là quyền thiêng liêng cao nhất của mọi dân tộc; tinh thần kiên quyết bảo vệ toàn vẹn chủ quyền lãnh thổ.',
    citation: 'Kho sách quý Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'art_st_12',
    code: 'BTHCM-HV-12',
    title: 'Bản Nhạc "Tiến Quân Ca" & Báo Cứu Quốc Năm 1945',
    category: 'Văn kiện - Ấn phẩm',
    yearOrPeriod: 'Tháng 8/1945',
    origin: 'Hà Nội (Bảo tàng Hồ Chí Minh lưu giữ)',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/1_639106393019746376_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/tieusu1-1911.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/hien-vat-ke-chuyen-ban-nhac-tien-quan-ca.htm',
    story:
      'Bản in đầu tiên của bài hát Tiến Quân Ca do nhạc sĩ Văn Cao sáng tác, được Bác Hồ và Trung ương Đảng chọn làm Quốc ca của nước Việt Nam Dân chủ Cộng hòa, cùng tờ báo Cứu Quốc - cơ quan ngôn luận của Tổng bộ Việt Minh phát hành trong những ngày bão táp Cách mạng Tháng Tám năm 1945.',
    moralLesson:
      'Biểu tượng thiêng liêng của hồn thiêng sông núi, khơi dậy tinh thần tự tôn dân tộc và trách nhiệm bảo vệ cờ đỏ sao vàng của mọi thế hệ công dân.',
    citation: 'Kho bảo vật Cách mạng Tháng Tám — BTHCM.',
  },
];

// 4. HỆ THỐNG 14 BẢO TÀNG CHI NHÁNH & DI TÍCH LƯU NIỆM TOÀN QUỐC CỦA BẢO TÀNG HỒ CHÍ MINH
export const BTHCM_HERITAGE_SYSTEM_SITES: BthcmHeritageBranch[] = [
  {
    id: 'site_01',
    title: 'Khu Di Tích Quốc Gia Đặc Biệt Pác Bó',
    branchType: 'Khu di tích Quốc gia đặc biệt',
    region: 'Miền Bắc',
    location: 'Xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng',
    historicalEra: '1941 – 1945',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/Pac-Bo-Ca_636564453736773869_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/khu-di-tich-quoc-gia-dac-biet-pac-bo-cao-bang.htm',
    significance: 'Cội nguồn cách mạng, nơi Bác Hồ về nước đầu năm 1941 sau 30 năm bôn ba và lãnh đạo phong trào giải phóng dân tộc.',
  },
  {
    id: 'site_02',
    title: 'Khu Di Tích Quốc Gia Đặc Biệt Tân Trào',
    branchType: 'Khu di tích Quốc gia đặc biệt',
    region: 'Miền Bắc',
    location: 'Huyện Sơn Dương, tỉnh Tuyên Quang',
    historicalEra: '1945 & 1947 – 1954',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/cay-da-ta_636564457572663270_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/banner-hoctap.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/khu-di-tich-quoc-gia-dac-biet-tan-trao-tuyen-quang.htm',
    significance: 'Thủ đô Khu giải phóng, nơi diễn ra Quốc dân Đại hội Tân Trào quyết định Tổng khởi nghĩa giành chính quyền Tháng Tám năm 1945.',
  },
  {
    id: 'site_03',
    title: 'Khu Tưởng Niệm Chủ Tịch Hồ Chí Minh Tại Nghĩa Lộ',
    branchType: 'Khu di tích Lịch sử Cách mạng',
    region: 'Miền Bắc',
    location: 'Thị xã Nghĩa Lộ, tỉnh Yên Bái',
    historicalEra: 'Kháng chiến chống Pháp',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/64-HT-Lar_636564507832627975_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/khu-tuong-niem-chu-tich-ho-chi-minh-tai-thi-xa-nghia-lo-yen-bai.htm',
    significance: 'Địa chỉ đỏ ghi dấu tình cảm gắn bó son sắt giữa Bác Hồ với đồng bào các dân tộc vùng Tây Bắc.',
  },
  {
    id: 'site_04',
    title: 'Di Tích Lịch Sử 48 Hàng Ngang (Hà Nội)',
    branchType: 'Di tích Lịch sử Cách mạng',
    region: 'Miền Bắc',
    location: 'Số 48 phố Hàng Ngang, quận Hoàn Kiếm, TP. Hà Nội',
    historicalEra: 'Tháng 8 – 9/1945',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/48-Hang-N_636564475385642114_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/tieusu4-1928.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/di-tich-lich-su-48-hang-ngang-ha-noi.htm',
    significance: 'Nơi Chủ tịch Hồ Chí Minh đã viết bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.',
  },
  {
    id: 'site_05',
    title: 'Di Tích Vạn Phúc — Nơi Bác Viết Lời Kêu Gọi Toàn Quốc Kháng Chiến',
    branchType: 'Di tích Lịch sử Cách mạng',
    region: 'Miền Bắc',
    location: 'Phường Vạn Phúc, quận Hà Đông, TP. Hà Nội',
    historicalEra: 'Tháng 12/1946',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/Van-Phuc-_636564479157617859_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/di-tich-noi-chu-tich-ho-chi-minh-viet-loi-keu-goi-toan-quoc-khang-chien-tai-phuong-van-phuc-quan-ha-dong-ha-noi.htm',
    significance: 'Nơi Bác Hồ chủ trì Hội nghị Ban Thường vụ Trung ương Đảng và khởi thảo "Lời kêu gọi Toàn quốc kháng chiến" lịch sử (19/12/1946).',
  },
  {
    id: 'site_06',
    title: 'Khu Di Tích Kim Liên — Nam Đàn (Nghệ An)',
    branchType: 'Khu di tích Quốc gia đặc biệt',
    region: 'Miền Trung',
    location: 'Xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An',
    historicalEra: '1890 – 1906',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/Que-noi-L_636839185034721743_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/khu-di-tich-kim-lien-xa-kim-lien-huyen-nam-dan-tinh-nghe-an.htm',
    significance: 'Quê nội và Quê ngoại Bác Hồ, nơi nuôi dưỡng tuổi thơ và những bước đi đầu tiên của người con kiệt xuất dân tộc.',
  },
  {
    id: 'site_07',
    title: 'Quảng Trường Hồ Chí Minh Tại TP. Vinh (Nghệ An)',
    branchType: 'Quảng trường Tượng đài',
    region: 'Miền Trung',
    location: 'Thành phố Vinh, tỉnh Nghệ An',
    historicalEra: 'Hiện đại',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/01-chon-L_636839185099929857_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/quang-truong-ho-chi-minh-tai-thanh-pho-vinh-nghe-an.htm',
    significance: 'Không gian văn hóa tưởng niệm quy mô lớn với tượng đài Bác Hồ sừng sững trên quê hương Xô Viết anh hùng.',
  },
  {
    id: 'site_08',
    title: 'Bảo Tàng Hồ Chí Minh — Chi Nhánh Thừa Thiên Huế',
    branchType: 'Bảo tàng Chi nhánh',
    region: 'Miền Trung',
    location: 'Số 7 đường Lê Lợi, TP. Huế (kèm Di tích làng Dương Nỗ)',
    historicalEra: '1895 – 1909',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/Hue-HT-La_636564490410321476_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/bao-tang-ho-chi-minh-chi-nhanh-thua-thien-hue.htm',
    significance: 'Nơi lưu giữ những kỷ niệm sâu sắc về thời niên thiếu 10 năm Bác Hồ sống, học tập tại kinh thành Huế và Trường Quốc học.',
  },
  {
    id: 'site_09',
    title: 'Bảo Tàng Hồ Chí Minh — Chi Nhánh Quân Khu 5',
    branchType: 'Bảo tàng Chi nhánh',
    region: 'Miền Trung',
    location: 'Số 1 Duy Tân, quận Hải Châu, TP. Đà Nẵng',
    historicalEra: 'Kháng chiến chống Mỹ',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/htb_636530825487647854_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/anh-bac.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/bao-tang-ho-chi-minh-chi-nhanh-quan-khu-5.htm',
    significance: 'Trưng bày tình cảm đặc biệt thiêng liêng của quân và dân Khu 5 anh dũng kiên cường đối với Bác Hồ, có phiên bản Nhà sàn Bác Hồ.',
  },
  {
    id: 'site_10',
    title: 'Bảo Tàng Hồ Chí Minh — Chi Nhánh Gia Lai & Kon Tum',
    branchType: 'Bảo tàng Chi nhánh',
    region: 'Tây Nguyên',
    location: 'Thành phố Pleiku, tỉnh Gia Lai',
    historicalEra: 'Kháng chiến & Tình cảm Bác với Tây Nguyên',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/BTHCM-GL-_636564494617032086_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/bao-tang-ho-chi-minh-chi-nhanh-gia-lai-va-kontum.htm',
    significance: 'Minh chứng cho tấm lòng thủy chung son sắt của đồng bào các dân tộc Tây Nguyên: "Bác Hồ là Mặt trời soi sáng buôn làng".',
  },
  {
    id: 'site_11',
    title: 'Bảo Tàng Hồ Chí Minh — Chi Nhánh Bình Thuận (Trường Dục Thanh)',
    branchType: 'Bảo tàng Chi nhánh',
    region: 'Miền Nam',
    location: 'Số 39 đường Trưng Nhị, TP. Phan Thiết, tỉnh Bình Thuận',
    historicalEra: '1910 – 1911',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/BTHCM-Bin_636564497397451117_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/duong-sach.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/bao-tang-ho-chi-minh-chi-nhanh-binh-thuan.htm',
    significance: 'Di tích trường Dục Thanh, nơi thầy giáo trẻ Nguyễn Tất Thành dạy học truyền bá lòng yêu nước trước khi vào Sài Gòn ra đi cứu nước.',
  },
  {
    id: 'site_12',
    title: 'Bảo Tàng Hồ Chí Minh — Chi Nhánh TP. Hồ Chí Minh (Bến Nhà Rồng)',
    branchType: 'Bảo tàng Chi nhánh',
    region: 'Miền Nam',
    location: 'Số 1 Nguyễn Tất Thành, Quận 4, TP. Hồ Chí Minh',
    historicalEra: '05/6/1911 – Nay',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/Nha-rong-_636839180899778480_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/nha-rong.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/bao-tang-ho-chi-minh-chi-nhanh-thanh-pho-ho-chi-minh.htm',
    significance: 'Bến cảng lịch sử bên sông Sài Gòn, điểm khởi đầu hành trình 30 năm vượt trùng dương tìm đường cứu nước của Bác.',
    connectionToTDM: 'Thủ Dầu Một là hậu phương kết nối giao thương và phong trào cách mạng trực tiếp với Bến Nhà Rồng - Sài Gòn.',
  },
  {
    id: 'site_13',
    title: 'Khu Di Tích Mộ Cụ Phó Bảng Nguyễn Sinh Sắc',
    branchType: 'Di tích Lịch sử Cách mạng',
    region: 'Miền Nam',
    location: 'Phường 4, TP. Cao Lãnh, tỉnh Đồng Tháp',
    historicalEra: '1927 – 1929',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/chon-2-La_636839180950166569_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/di-tich-nguyen-sinh-sac-thi-xa-cao-lanh-tinh-dong-thap.htm',
    significance: 'Nơi an nghỉ ngàn thu của thân phụ Chủ tịch Hồ Chí Minh - nhà nho yêu nước trọn đời vì dân vì nước.',
    connectionToTDM: 'Có mối liên hệ mật thiết với Di tích Chùa Hội Khánh (Thủ Dầu Một), nơi cụ dừng chân hoạt động trong Hội Danh Dự trước khi về Cao Lãnh.',
  },
  {
    id: 'site_14',
    title: 'Bảo Tàng Hồ Chí Minh — Chi Nhánh Đồng Bằng Sông Cửu Long',
    branchType: 'Bảo tàng Chi nhánh',
    region: 'Miền Nam',
    location: 'Số 6 Đại lộ Hòa Bình, quận Ninh Kiều, TP. Cần Thơ',
    historicalEra: 'Kháng chiến chống Mỹ & Đền thờ Bác ở Nam Bộ',
    imageUrl: 'https://baotanghochiminh.vn/pic/Service/Quan-khu-_636839178577090401_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/bao-tang-ho-chi-minh-chi-nhanh-dong-bang-song-cuu-long.htm',
    significance: 'Nơi lưu giữ ký ức về hàng trăm ngôi Đền thờ Bác Hồ được đồng bào Nam Bộ bí mật dựng lên ngay giữa vùng địch chiếm đóng.',
  },
  {
    id: 'site_tdm',
    title: 'Di Tích Lịch Sử Quốc Gia Chùa Hội Khánh & Nhà Truyền Thống Đất Thủ',
    branchType: 'Di tích Lịch sử Cách mạng',
    region: 'Đất Thủ - Bình Dương',
    location: 'Phường Phú Cường & Phường Thủ Dầu Một, Bình Dương',
    historicalEra: '1923 – 1926 & Thời kỳ Đảng bộ',
    imageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    fallbackImageUrl: '/assets/hcm-space/khu-pho.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/he-thong.htm',
    significance: 'Điểm di tích vệ tinh thiêng liêng trên địa bàn Phường Thủ Dầu Một, gắn với phong trào yêu nước của cụ Phó bảng Nguyễn Sinh Sắc.',
    connectionToTDM: 'Cái nôi giáo dục truyền thống cách mạng trọng tâm cho cán bộ, đảng viên và thế hệ trẻ Phường Thủ Dầu Một.',
  },
];

// 5. CHUYÊN ĐỀ NGHIÊN CỨU & BÀI HỌC GIÁO DỤC TRUYỀN THỐNG (BẢO TÀNG HỒ CHÍ MINH)
export const BTHCM_RESEARCH_STORIES: BthcmStoryArticle[] = [
  {
    id: 'rs_01',
    title: '“Trường, Kỳ, Kháng, Chiến, Nhất, Định, Thắng, Lợi” — Giai Thoại 8 Cận Vệ Của Bác',
    category: 'Chuyện kể về Bác',
    authorOrSource: 'Phòng Nghiên cứu Sưu tầm — Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/ta_quang__637937341320938194_HasThumb_Thumb.jpeg',
    fallbackImageUrl: '/assets/hcm-space/tieusu4-1928.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/truong-ky-khang-chien-nhat-dinh-thang-loi-giai-thoai-dac-biet-ve-8-can-ve-cua-bac.htm',
    summary:
      'Trong những năm tháng kháng chiến tại Việt Bắc, Bác Hồ đã tự tay đặt tên cho 8 đồng chí cận vệ thân cận ghép lại thành khẩu hiệu chiến lược: TRƯỜNG - KỲ - KHÁNG - CHIẾN - NHẤT - ĐỊNH - THẮNG - LỢI. Mỗi lần gọi tên một đồng chí là một lần nhắc nhở toàn thể chiến sĩ về niềm tin tất thắng vào cuộc kháng chiến của toàn dân tộc.',
    coreMoralLesson:
      'Niềm tin sắt đá vào lý tưởng cách mạng, tinh thần kiên trì bền bỉ, tính kỷ cương và sự gắn bó nghĩa tình giữa lãnh tụ với cấp dưới.',
  },
  {
    id: 'rs_02',
    title: 'Vận Dụng Tư Tưởng Hồ Chí Minh Về Đức Liêm Và Chính Trong Giai Đoạn Hiện Nay',
    category: 'Nghiên cứu tư tưởng',
    authorOrSource: 'Tạp chí Thông tin Tư liệu Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/ho-chi-mi_638588847481341735_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/chandungbac.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/van-dung-tu-tuong-ho-chi-minh-ve-duc-liem-va-chinh-trong-phong-chong-tham-nhung-tieu-cuc-hien-nay.htm',
    summary:
      'Phân tích sâu sắc quan điểm của Bác: "Trời có bốn mùa: Xuân, Hạ, Thu, Đông. Đất có bốn phương: Đông, Tây, Nam, Bắc. Người có bốn đức: Cần, Kiệm, Liêm, Chính. Thiếu một mùa, thì không thành trời. Thiếu một phương, thì không thành đất. Thiếu một đức, thì không thành người". Ứng dụng cốt lõi vào công tác cán bộ theo Quy định 144-QĐ/TW.',
    coreMoralLesson:
      'Quy định 144: Chuẩn mực Liêm chính, không tham nhũng tiêu cực, chí công vô tư, phụng sự Tổ quốc và phục vụ nhân dân.',
  },
  {
    id: 'rs_03',
    title: '“Chỉ Sợ Lòng Dân Không Yên” — Phong Cách Gần Dân, Trọng Dân Của Bác Hồ',
    category: 'Chuyện kể về Bác',
    authorOrSource: 'Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/pic-Custo_638150213545605019_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/anh-bac.png',
    officialBthcmUrl: 'https://baotanghochiminh.vn/chi-so-long-dan-khong-yen.htm',
    summary:
      'Câu chuyện ghi lại những trăn trở của Chủ tịch Hồ Chí Minh mỗi khi đất nước gặp khó khăn hạn hán, lũ lụt hay chiến tranh: "Dễ trăm lần không dân cũng chịu, khó vạn lần dân liệu cũng xong". Bác căn dặn cán bộ từ trung ương đến cơ sở: Điều gì có lợi cho dân ta phải hết sức làm, điều gì có hại cho dân ta phải hết sức tránh.',
    coreMoralLesson:
      'Quy định 144: Dân là gốc, đặt lợi ích của nhân dân lên trên hết, trước hết; lắng nghe tâm tư nguyện vọng của quần chúng cơ sở.',
  },
  {
    id: 'rs_04',
    title: 'Nữ Anh Hùng 6 Lần Vinh Dự Được Gặp Bác Hồ',
    category: 'Chuyện kể về Bác',
    authorOrSource: 'Bảo tàng Hồ Chí Minh',
    imageUrl: 'https://baotanghochiminh.vn/pic/Customer/pic-Custo_639025491740511388_HasThumb_Thumb.jpg',
    fallbackImageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    officialBthcmUrl: 'https://baotanghochiminh.vn/nu-anh-hung-6-lan-vinh-du-duoc-gap-bac-ho.htm',
    summary:
      'Ký ức xúc động của nữ Anh hùng LLVTND miền Nam trong những lần ra miền Bắc chữa bệnh và vinh dự được Bác Hồ mời cơm tại Phủ Chủ tịch. Từng lời dặn dò ân cần, cái vỗ vai, gắp từng miếng thức ăn của Bác thể hiện tình thương mênh mông như trời biển Người dành cho đồng bào miền Nam đi trước về sau.',
    coreMoralLesson:
      'Tình cảm Bắc - Nam ruột thịt son sắt; bài học khiêm tốn, giữ gìn đạo đức cách mạng khi được Đảng và nhân dân tin cậy giao trọng trách.',
  },
];
