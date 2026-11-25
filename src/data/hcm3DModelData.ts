// Cơ sở dữ liệu chính thống cho Mô hình 3D & Sa bàn Không gian Văn hóa Hồ Chí Minh
// Thiết kế theo các chủ đề lịch sử, tư tưởng, đạo đức và phong cách Hồ Chí Minh
// Dẫn nguồn Cấp A: Bảo tàng Hồ Chí Minh, Khu di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch & Hồ Chí Minh Toàn tập

export interface Artifact3DItem {
  id: string;
  name: string;
  category: string;
  era: string;
  year: string;
  origin: string; // Nơi lưu giữ bản gốc
  dimensions?: string;
  significance: string; // Ý nghĩa tư tưởng / chuẩn mực đạo đức QĐ 144
  story: string; // Câu chuyện lịch sử xúc động
  citation: string; // Nguồn dẫn chứng
  audioText: string;
  imageUrl: string;
  accentColor: string;
  badges: string[];
  hotspots?: {
    id: string;
    angle: number; // Góc xoay 0-360 độ
    title: string;
    description: string;
  }[];
}

export interface SpatialZone3D {
  id: string;
  order: number;
  themeTitle: string;
  shortTitle: string;
  period: string;
  coordinates: { x: number; y: number; z: number }; // Tọa độ trên sa bàn isometric
  wallColor: string;
  pillarColor: string;
  quote: string;
  quoteSource: string;
  summary: string;
  keyArtifacts: string[];
  ideologicalFocus: string; // Trọng tâm tư tưởng & Chỉ thị 07
  imageUrl: string;
  videoDuration?: string;
}

// 8 GIAN CHỦ ĐỀ CHÍNH THỐNG TRÊN SA BÀN 3D
export const SPATIAL_3D_ZONES: SpatialZone3D[] = [
  {
    id: 'zone_1',
    order: 1,
    themeTitle: 'Chủ đề 1: Tuổi Thiếu Niên & Quyết Chí Ra Đi Cứu Nước',
    shortTitle: 'Gian 1: Nuôi Ý Chí',
    period: '1890 – 1911',
    coordinates: { x: 15, y: 75, z: 0 },
    wallColor: '#8B2635',
    pillarColor: '#C9A96E',
    quote: 'Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.',
    quoteSource: 'Theo lời kể của Bác Hồ về thời thanh niên tại Sài Gòn (1911)',
    summary: 'Tái hiện không gian quê hương Làng Sen, Hoàng Trù (Nghệ An), kinh thành Huế cổ kính, mái trường Dục Thanh (Phan Thiết) và Bến Nhà Rồng lịch sử - nơi người thanh niên yêu nước Nguyễn Tất Thành bước lên con tàu Amiral Latouche-Tréville ra đi tìm đường cứu nước.',
    keyArtifacts: ['Chiếc thẻ bài Văn Ba', 'Bộ bàn ghế Trường Dục Thanh', 'Mô hình Tàu Latouche-Tréville'],
    ideologicalFocus: 'Ý chí yêu nước nồng nàn, tinh thần tự lập, dám dấn thân tìm con đường cách mạng mới cho độc lập dân tộc.',
    imageUrl: '/assets/hcm-space/nha-rong.jpg',
    videoDuration: '14:20',
  },
  {
    id: 'zone_2',
    order: 2,
    themeTitle: 'Chủ đề 2: Ba Mươi Năm Bôn Ba Vượt Trùng Dương Tìm Đường Cứu Nước',
    shortTitle: 'Gian 2: Tìm Ánh Sáng',
    period: '1911 – 1941',
    coordinates: { x: 35, y: 65, z: 0 },
    wallColor: '#1E3A8A',
    pillarColor: '#F59E0B',
    quote: 'Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi mừng đến phát khóc lên.',
    quoteSource: 'Con đường dẫn tôi đến chủ nghĩa Lênin (1960), Toàn tập, Tập 12, tr. 561',
    summary: 'Hành trình qua 3 đại dương, 4 châu lục (Pháp, Anh, Mỹ, Liên Xô, Trung Quốc,...). Giai đoạn gửi Bản Yêu sách của nhân dân An Nam (1919), bỏ phiếu tán thành Quốc tế III tại Đại hội Tours (1920), sáng lập Hội Việt Nam Cách mạng Thanh niên và chủ trì hợp nhất thành lập Đảng Cộng sản Việt Nam (03/02/1930).',
    keyArtifacts: ['Viên gạch sưởi mùa đông Paris', 'Bản Yêu sách nhân dân An Nam', 'Tác phẩm Đường Kách mệnh 1927'],
    ideologicalFocus: 'Sự kiên định lý tưởng độc lập dân tộc gắn liền với chủ nghĩa xã hội; khả năng học hỏi, hòa mình cùng nhân dân lao động thế giới.',
    imageUrl: '/assets/hcm-space/tieusu3-1920.png',
    videoDuration: '18:45',
  },
  {
    id: 'zone_3',
    order: 3,
    themeTitle: 'Chủ đề 3: Về Nguồn Pác Bó, Cách Mạng Tháng Tám & Độc Lập 1945',
    shortTitle: 'Gian 3: Khai Sinh Nước',
    period: '1941 – 1945',
    coordinates: { x: 55, y: 55, z: 0 },
    wallColor: '#991B1B',
    pillarColor: '#FDE047',
    quote: 'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập.',
    quoteSource: 'Tuyên ngôn Độc lập (02/9/1945), Toàn tập, Tập 4, tr. 3',
    summary: 'Hình ảnh Bác Hồ trở về Tổ quốc qua cột mốc 108 tại Pác Bó (Cao Bằng) sau 30 năm xa cách. Trực tiếp chỉ đạo Hội nghị Trung ương 8, thành lập Mặt trận Việt Minh, thành lập Đội Việt Nam Tuyên truyền Giải phóng quân, lãnh đạo Cách mạng Tháng Tám toàn thắng và đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình lịch sử.',
    keyArtifacts: ['Máy chữ Hermes Baby Pác Bó', 'Chiếc áo Kaki và Mũ cát 1945', 'Bản Tuyên ngôn Độc lập nguyên bản'],
    ideologicalFocus: 'Nghệ thuật chớp thời cơ cách mạng, tư tưởng đại đoàn kết toàn dân tộc, tinh thần tự lực tự cường "đem sức ta mà tự giải phóng cho ta".',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    videoDuration: '22:10',
  },
  {
    id: 'zone_4',
    order: 4,
    themeTitle: 'Chủ đề 4: Toàn Quốc Kháng Chiến & Chiến Thắng Điện Biên Phủ',
    shortTitle: 'Gian 4: Kháng Chiến Toàn Thắng',
    period: '1946 – 1954',
    coordinates: { x: 75, y: 45, z: 0 },
    wallColor: '#065F46',
    pillarColor: '#FBBF24',
    quote: 'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
    quoteSource: 'Lời kêu gọi toàn quốc kháng chiến (19/12/1946), Toàn tập, Tập 4, tr. 534',
    summary: '9 năm kháng chiến trường kỳ gian khổ ở Chiến khu Việt Bắc “Thủ đô gió ngàn”. Tinh thần “Dĩ bất biến, ứng vạn biến”, vừa kháng chiến vừa kiến quốc, lãnh đạo Chiến dịch Biên giới 1950 và đỉnh cao là Chiến dịch Điện Biên Phủ 1954 “lừng lẫy năm châu, chấn động địa cầu”.',
    keyArtifacts: ['Áo bông Bác mặc ở Chiến dịch Biên giới', 'Ống nhòm chỉ huy mặt trận', 'Tờ báo Cứu Quốc và Lời kêu gọi toàn quốc kháng chiến'],
    ideologicalFocus: 'Đường lối chiến tranh nhân dân, toàn dân, toàn diện, trường kỳ; nêu cao ý chí quyết chiến quyết thắng bảo vệ độc lập tự do.',
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    videoDuration: '16:30',
  },
  {
    id: 'zone_5',
    order: 5,
    themeTitle: 'Chủ đề 5: Xây Dựng Miền Bắc, Hướng Về Miền Nam & Bản Di Chúc Thiêng Liêng',
    shortTitle: 'Gian 5: Di Chúc Lịch Sử',
    period: '1954 – 1969',
    coordinates: { x: 85, y: 25, z: 0 },
    wallColor: '#831843',
    pillarColor: '#F59E0B',
    quote: 'Miền Nam yêu quý luôn luôn ở trong trái tim tôi. Nam Bắc là một nhà, là anh em ruột thịt, quyết không thể chia cắt.',
    quoteSource: 'Thư gửi đồng bào miền Nam (1956), Toàn tập, Tập 10, tr. 396',
    summary: 'Lãnh đạo công cuộc xây dựng chủ nghĩa xã hội ở miền Bắc làm hậu phương vững chắc cho tiền tuyến miền Nam đánh Mỹ. Tình cảm ruột thịt sắt son của Bác với đồng bào, chiến sĩ miền Nam và những trăn trở tâm huyết Người gửi gắm trong Di chúc thiêng liêng năm 1969.',
    keyArtifacts: ['Bản thảo Di chúc viết tay (Bảo vật Quốc gia)', 'Đồng hồ Poljot kỷ niệm', 'Đôi dép cao su huyền thoại'],
    ideologicalFocus: 'Xây dựng Đảng trong sạch vững mạnh, bồi dưỡng thế hệ cách mạng cho đời sau, cần kiệm liêm chính chí công vô tư.',
    imageUrl: '/assets/hcm-space/anh-bac.png',
    videoDuration: '25:00',
  },
  {
    id: 'zone_6',
    order: 6,
    themeTitle: 'Chủ đề 6: Sa Bàn Không Gian Nhà Sàn, Vườn Cây & Ao Cá Bác Hồ',
    shortTitle: 'Gian 6: Nhà Sàn Giản Dị',
    period: '1958 – 1969 (Khu di tích Phủ Chủ tịch)',
    coordinates: { x: 65, y: 15, z: 0 },
    wallColor: '#0F766E',
    pillarColor: '#E2E8F0',
    quote: 'Nơi ở của Bác Hồ: Nhà gỗ mộc mạc nép dưới bóng dừa và hàng râm bụt, bên cạnh ao sen thơm ngát và vườn cây xanh tươi bốn mùa.',
    quoteSource: 'Khu di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch',
    summary: 'Mô phỏng 3D kiến trúc Nhà sàn Bác Hồ - ngôi nhà bằng gỗ bình dị giữa lòng Hà Nội, nơi Bác sống và làm việc suốt 11 năm. Thể hiện trọn vẹn phong cách sống thanh cao, giản dị, hòa hợp với thiên nhiên và gắn bó máu thịt với nhân dân.',
    keyArtifacts: ['Bàn làm việc mộc mạc', 'Giá sách của Bác bên cửa sổ', 'Chiếc quạt lá cọ và bộ ấm chén trà'],
    ideologicalFocus: 'Đạo đức cách mạng mẫu mực: chống xa hoa, lãng phí; sống liêm khiết, khiêm tốn, hòa mình với nhân dân.',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    videoDuration: '12:15',
  },
  {
    id: 'zone_7',
    order: 7,
    themeTitle: 'Chủ đề 7: Tủ Sách Di Sản Hồ Chí Minh Toàn Tập & Tác Phẩm Kinh Điển',
    shortTitle: 'Gian 7: Tủ Sách Di Sản',
    period: '1890 – 1969 (Kho sách số hóa Cấp A)',
    coordinates: { x: 40, y: 20, z: 0 },
    wallColor: '#4338CA',
    pillarColor: '#FBBF24',
    quote: 'Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền.',
    quoteSource: 'Hồ Chí Minh Toàn tập, Tập 1, tr. 284',
    summary: 'Không gian số hóa tương tác toàn văn 15 tập sách Hồ Chí Minh Toàn tập (NXB Chính trị quốc gia Sự thật) kết nối Google Drive và 5 tác phẩm bảo vật quốc gia: Đường Kách mệnh (1927), Nhật ký trong tù (1942–1943), Lời kêu gọi toàn quốc kháng chiến (1946), Lời kêu gọi đồng bào và chiến sĩ cả nước (1966), Bản Di chúc (1969).',
    keyArtifacts: ['Tủ sách 15 tập Toàn tập số hóa', 'Bản in Đường Kách mệnh 1927', 'Bản gốc Nhật ký trong tù bằng chữ Hán'],
    ideologicalFocus: 'Học tập suốt đời, đọc sách nghiên cứu lý luận gắn với thực tiễn, truyền cảm hứng văn hóa đọc trong toàn Đảng và xã hội.',
    imageUrl: '/assets/hcm-space/duong-sach.jpg',
    videoDuration: '15:40',
  },
  {
    id: 'zone_8',
    order: 8,
    themeTitle: 'Chủ đề 8: Lan Tỏa Không Gian Văn Hóa HCM Tại Chi Bộ Cơ Sở (Chỉ thị 07 & QĐ 144)',
    shortTitle: 'Gian 8: Thực Hành Chi Bộ',
    period: '2026 – Nay (Kỷ nguyên vươn mình)',
    coordinates: { x: 20, y: 40, z: 0 },
    wallColor: '#B45309',
    pillarColor: '#FEF08A',
    quote: 'Cán bộ là cái gốc của mọi công việc. Muôn việc thành công hoặc thất bại, đều do cán bộ tốt hoặc kém.',
    quoteSource: 'Sửa đổi lối làm việc (1947), Toàn tập, Tập 5, tr. 309',
    summary: 'Không gian giới thiệu mô hình thực tiễn Không gian Văn hóa Hồ Chí Minh cơ sở tại Đảng bộ phường và các khu phố: Góc văn hóa chi bộ, Tủ sách số mã QR, Phiếu tự rèn luyện 5 chuẩn mực Quy định 144-QĐ/TW, sinh hoạt chuyên đề theo Chỉ thị 07-CT/TW năm 2026.',
    keyArtifacts: ['Bộ chuẩn mực đạo đức 144-QĐ/TW', 'Cây tri ân Bác Hồ tại khu phố', 'Bản tin sinh hoạt chi bộ điện tử'],
    ideologicalFocus: 'Học Bác bằng hành động cụ thể, phục vụ nhân dân tận tụy, xây dựng chi bộ trong sạch vững mạnh.',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    videoDuration: '10:50',
  },
];

// 8 HIỆN VẬT DI SẢN 3D TƯƠNG TÁC 360 ĐỘ (VẬT THỂ QUỐC GIA & BẢO VẬT)
export const ARTIFACTS_3D_COLLECTION: Artifact3DItem[] = [
  {
    id: 'art_01',
    name: 'Đôi Dép Cao Su Lịch Sử Của Bác Hồ',
    category: 'Hiện vật sinh hoạt đời thường',
    era: '1947 – 1969',
    year: '1947',
    origin: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
    dimensions: 'Dài 26.5 cm, đế lốp ô tô quân sự, 4 quai cao su đen',
    significance: 'Chuẩn mực Quy định 144: Cần, Kiệm, Liêm, Chính. Biểu tượng bất diệt của tinh thần tiết kiệm, giản dị, gần gũi của vị lãnh tụ tối cao.',
    story: 'Đôi dép cao su được làm từ lốp ô tô quân sự chiến lợi phẩm do bộ đội ta thu được từ quân Pháp tại chiến dịch Việt Bắc thu đông 1947. Bác dùng đôi dép này trong suốt hơn 20 năm, từ chiến khu Việt Bắc cho đến khi về Hà Nội, đi thăm các địa phương và cả khi đi công thắp nước ngoài. Khi quai dép bị tuột, các đồng chí cảnh vệ xin thay đôi mới, Bác đều cười bảo: "Đôi dép này còn đi được, quai tuột thì đóng đinh lại là xong, đừng lãng phí."',
    citation: 'Hồ Chí Minh Biên niên tiểu sử & Kỷ vật Bác Hồ, NXB CTQG Sự thật',
    audioText: 'Đôi dép cao su của Bác Hồ, ra đời năm 1947 tại chiến khu Việt Bắc, là biểu tượng trường tồn cho phong cách sống giản dị, cần kiệm và liêm chính của Chủ tịch Hồ Chí Minh.',
    imageUrl: '/assets/hcm-space/anh-bac.png',
    accentColor: '#B45309',
    badges: ['Bảo vật lịch sử', 'Quy định 144: Cần Kiệm', 'Chiến khu Việt Bắc'],
    hotspots: [
      { id: 'hp1', angle: 45, title: 'Đế lốp ô tô', description: 'Cắt từ lốp ô tô quân sự Pháp thu được năm 1947, chịu ma sát tốt trên đường rừng.' },
      { id: 'hp2', angle: 180, title: 'Quai cao su bản dày', description: 'Bốn quai cao su đen ép nhiệt, được Bác bảo dưỡng và dùng suốt 22 năm.' },
      { id: 'hp3', angle: 300, title: 'Vết đinh cài quai', description: 'Dấu tích các chiến sĩ cảnh vệ đóng lại đinh giữ quai theo lời căn dặn tiết kiệm của Bác.' },
    ],
  },
  {
    id: 'art_02',
    name: 'Chiếc Vali Mây Bôn Ba Ba Mươi Năm Tìm Đường Cứu Nước',
    category: 'Hành trang hành trình cách mạng',
    era: '1911 – 1941',
    year: '1911',
    origin: 'Khu di tích Pác Bó (Cao Bằng) & Bảo tàng Hồ Chí Minh',
    dimensions: 'Kích thước: 60 x 38 x 22 cm, đan bằng mây tre tự nhiên, có khóa đồng',
    significance: 'Chuẩn mực Quy định 144: Bản lĩnh, đổi mới, sáng tạo, hội nhập. Biểu tượng ý chí kiên định vượt qua ngàn dặm gian lao vì độc lập của dân tộc.',
    story: 'Chiếc vali đan bằng mây mộc mạc là người bạn đường tri kỷ của Bác suốt 30 năm bôn ba qua các nước Pháp, Anh, Mỹ, Nga, Trung Quốc,... Chiếc vali dùng để đựng vài bộ quần áo sờn vai, những bản thảo ghi chép, tài liệu nghiên cứu và sách lý luận. Tháng 01/1941, chính chiếc vali này theo chân Bác vượt qua cột mốc 108 trở về đất mẹ Pác Bó.',
    citation: 'Hồ Chí Minh - Hành trình 30 năm tìm đường cứu nước, NXB Thông tin & Truyền thông',
    audioText: 'Chiếc vali mây đồng hành cùng người thanh niên yêu nước Nguyễn Tất Thành qua ba đại dương và bốn châu lục, chứa đựng cả kho tàng tư tưởng cứu nước vĩ đại.',
    imageUrl: '/assets/hcm-space/tieusu1-1911.png',
    accentColor: '#1E3A8A',
    badges: ['Hành trình 1911–1941', 'Hội nhập quốc tế', 'Mốc 108 Pác Bó'],
    hotspots: [
      { id: 'hp1', angle: 60, title: 'Mây đan thủ công', description: 'Khung mây đan đượm màu thời gian qua 30 năm sương gió.' },
      { id: 'hp2', angle: 160, title: 'Khóa đồng xách tay', description: 'Khóa đồng cổ điển đơn sơ, bảo vệ an toàn các tài liệu cách mạng bí mật.' },
      { id: 'hp3', angle: 280, title: 'Ngăn chứa tài liệu', description: 'Nơi Bác cất giữ bản thảo Luận cương Lênin và tài liệu thành lập Đảng.' },
    ],
  },
  {
    id: 'art_03',
    name: 'Chiếc Máy Chữ Hermes Baby Tại Hang Cốc Bó',
    category: 'Phương tiện soạn thảo văn kiện cách mạng',
    era: '1941 – 1945',
    year: '1941',
    origin: 'Bảo tàng Lịch sử Quốc gia & Bảo tàng Hồ Chí Minh',
    dimensions: 'Hiệu Hermes Baby Thụy Sĩ, trọng lượng 3.8 kg, bàn phím cơ chữ La-tinh',
    significance: 'Chuẩn mực Quy định 144: Tinh thần trách nhiệm, kỷ cương, tận tụy với công việc cách mạng.',
    story: 'Chiếc máy chữ nhỏ gọn hiệu Hermes Baby được Bác mang từ nước ngoài về hang Pác Bó. Trên chiếc máy chữ này, giữa núi rừng hiểm trở "Bàn đá chông chênh dịch sử Đảng", Bác đã trực tiếp đánh máy bản dịch Lịch sử Đảng Cộng sản Liên Xô, soạn thảo Điều lệ Mặt trận Việt Minh, tờ báo Việt Nam Độc Lập và các chỉ thị quân sự đầu tiên.',
    citation: 'Bảo tàng Hồ Chí Minh - Hiện vật kể chuyện lịch sử',
    audioText: 'Chiếc máy chữ Hermes Baby tại hang Cốc Bó Pác Bó là công cụ Bác Hồ trực tiếp đánh máy những văn kiện chỉ đạo khởi nghĩa giành chính quyền năm 1945.',
    imageUrl: '/assets/hcm-space/tieusu4-1928.png',
    accentColor: '#047857',
    badges: ['Pác Bó 1941', 'Soạn thảo văn kiện', 'Thủ công cơ khí'],
    hotspots: [
      { id: 'hp1', angle: 45, title: 'Bàn phím cơ nhỏ gọn', description: 'Bàn phím La-tinh cơ học bền bỉ, gõ nhịp nhàng trong hang đá Pác Bó.' },
      { id: 'hp2', angle: 180, title: 'Trục cuốn giấy', description: 'Trục cuốn nhỏ, vừa vặn với các khổ giấy mỏng dùng in ấn bí mật trong rừng.' },
    ],
  },
  {
    id: 'art_04',
    name: 'Bộ Quần Áo Kaki Và Mũ Cát Ngày Độc Lập 02/9/1945',
    category: 'Trang phục nguyên thủ quốc gia',
    era: '1945',
    year: '1945',
    origin: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
    dimensions: 'Áo cổ bẻ 4 túi, vải kaki màu cỏ úa; mũ cát bọc vải trắng',
    significance: 'Chuẩn mực Quy định 144: Gương mẫu, khiêm tốn, gần gũi với nhân dân. Đại diện cho hình ảnh một vị Chủ tịch nước từ nhân dân mà ra, vì nhân dân mà phục vụ.',
    story: 'Trước ngày Lễ Độc lập 02/9/1945, các đồng chí chuẩn bị may comple trang trọng cho Bác, nhưng Bác bảo: "Nước ta còn nghèo, nhân dân còn đói khổ, Bác mặc giản dị thế này là phù hợp nhất". Bác chọn bộ kaki màu cỏ úa do thợ may phố Hàng Trống cắt may. Hình ảnh Bác trong bộ quần áo kaki cùng nụ cười hiền từ trên lễ đài Ba Đình đã khắc sâu vào trái tim triệu triệu người con đất Việt.',
    citation: 'Tuyên ngôn Độc lập 1945 - Kỷ vật và Chứng tích, NXB CTQG Sự thật',
    audioText: 'Bộ quần áo Kaki và chiếc mũ cát Bác Hồ mặc tại Lễ Tuyên ngôn Độc lập 02 tháng 9 năm 1945 là minh chứng hùng hồn cho sự khiêm tốn và tấm lòng hòa cùng nhân dân của Bác.',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    accentColor: '#991B1B',
    badges: ['Ba Đình 02/9/1945', 'Trang phục Lịch sử', 'Khiêm tốn mẫu mực'],
    hotspots: [
      { id: 'hp1', angle: 90, title: 'Bốn túi áo tiện dụng', description: 'Thiết kế 4 túi ngoài đơn giản, đựng bút viết và kính lão.' },
      { id: 'hp2', angle: 210, title: 'Chất vải Kaki bền bỉ', description: 'Vải kaki may mộc mạc, không mạ vàng hay đính cúc quý phái.' },
    ],
  },
  {
    id: 'art_05',
    name: 'Bản Thảo Di Chúc Của Chủ Tịch Hồ Chí Minh (1965 – 1969)',
    category: 'Văn kiện Quốc gia - Bảo vật Quốc gia',
    era: '1965 – 1969',
    year: '1969',
    origin: 'Cục Lưu trữ Văn phòng Trung ương Đảng & Bảo tàng Hồ Chí Minh',
    dimensions: 'Gồm các trang đánh máy và bản viết tay bổ sung bằng mực đỏ và xanh',
    significance: 'Chuẩn mực Quy định 144: Tuyệt đối trung thành với Đảng, vì Nhân dân; đoàn kết kỷ cương; dặn dò xây dựng Đảng và bồi dưỡng thế hệ cách mạng.',
    story: 'Bác bắt đầu viết bản thảo Di chúc vào dịp sinh nhật lần thứ 75 (tháng 5/1965) đúng lúc 9 giờ sáng. Suốt 4 năm từ 1965 đến 1969, mỗi năm vào dịp tháng 5, Bác lại mang bản thảo ra đọc lại, sửa chữa từng câu từng chữ với tình yêu thương bao la dành cho toàn Đảng, toàn quân và toàn dân ta. Di chúc đã được Nhà nước công nhận là Bảo vật Quốc gia.',
    citation: 'Bảo vật Quốc gia: Di chúc của Chủ tịch Hồ Chí Minh, Quyết định Thủ tướng Chính phủ',
    audioText: 'Bản thảo Di chúc của Bác Hồ là một công trình lý luận và đạo đức vô giá, căn dặn về sự đoàn kết trong Đảng như giữ gìn con ngươi của mắt mình.',
    imageUrl: '/assets/hcm-space/tieusu2-1919.png',
    accentColor: '#7C2D12',
    badges: ['Bảo vật Quốc gia', 'Di chúc 1969', 'Lời dặn muôn đời'],
    hotspots: [
      { id: 'hp1', angle: 50, title: 'Lời dặn về Đảng', description: 'Đoạn viết nhấn mạnh: Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta.' },
      { id: 'hp2', angle: 180, title: 'Lời dặn về thế hệ trẻ', description: 'Bồi dưỡng thế hệ cách mạng cho đời sau là một việc rất quan trọng và rất cần thiết.' },
    ],
  },
  {
    id: 'art_06',
    name: 'Viên Gạch Sưởi Mùa Đông Paris Năm 1920',
    category: 'Chứng tích nghị lực phi thường',
    era: '1920 – 1923',
    year: '1920',
    origin: 'Nhà số 9 ngõ Compoint, Quận 17, Paris, Pháp (Phục chế chuẩn)',
    dimensions: 'Gạch đất nung chịu nhiệt, kích thước 22 x 10.5 x 6 cm',
    significance: 'Chuẩn mực Quy định 144: Bản lĩnh kiên cường, vượt qua mọi gian khổ khắc nghiệt nhất để cống hiến cho Tổ quốc.',
    story: 'Trong những năm tháng hoạt động tại Paris hoa lệ nhưng đầy tuyết giá, người thanh niên Nguyễn Ái Quốc sống trong căn phòng trọ chật hẹp không có lò sưởi ở ngõ Compoint. Mỗi buổi sáng trước khi đi làm thợ chụp ảnh, Bác đặt viên gạch vào lò sưởi của chủ nhà. Tối về, Bác lấy viên gạch còn nóng ấm, bọc vào tờ báo cũ rồi đặt dưới đệm để sưởi ấm qua đêm đông buốt giá để tiếp tục đọc sách và viết báo tố cáo tội ác thực dân.',
    citation: 'Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch, Trần Dân Tiên',
    audioText: 'Viên gạch sưởi ấm mùa đông Paris là chứng tích cảm động cho ý chí phi thường và ngọn lửa nồng nàn yêu nước của chàng thanh niên Nguyễn Ái Quốc.',
    imageUrl: '/assets/hcm-space/tieusu3-1920.png',
    accentColor: '#B91C1C',
    badges: ['Paris 1920', 'Ý chí phi thường', 'Ngõ Compoint'],
    hotspots: [
      { id: 'hp1', angle: 90, title: 'Bề mặt đất nung', description: 'Gạch nung thô mộc giữ nhiệt bền qua từng đêm tuyết lạnh Paris.' },
      { id: 'hp2', angle: 270, title: 'Vết ố than lò', description: 'Dấu tích sưởi nóng trong lò than mỗi sớm mùa đông nước Pháp.' },
    ],
  },
  {
    id: 'art_07',
    name: 'Chiếc Đồng Hồ Quả Quýt Bác Hồ Trao Tặng Chiến Sĩ',
    category: 'Vật phẩm giáo dục tư tưởng',
    era: '1954',
    year: '1954',
    origin: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
    dimensions: 'Đồng hồ bỏ túi vỏ bạc, đường kính 4.8 cm, chữ số La Mã',
    significance: 'Chuẩn mực Quy định 144: Đoàn kết, kỷ cương, trách nhiệm. Mỗi cá nhân là một bánh răng nhịp nhàng trong bộ máy cách mạng chung.',
    story: 'Tại một lớp học chính trị sau ngày tiếp quản Thủ đô, thấy một số cán bộ muốn chuyển sang công tác khác có vẻ vinh dự hơn, Bác rút chiếc đồng hồ quả quýt trong túi ra và hỏi: "Trong chiếc đồng hồ này, kim giây, kim phút, bánh xe, dây cót... bộ phận nào quan trọng?". Cán bộ trả lời bộ phận nào cũng quan trọng. Bác bảo: "Cách mạng cũng như chiếc đồng hồ, việc nào Đảng giao cũng là vẻ vang. Nếu ai cũng muốn làm kim chỉ giờ, thì chiếc đồng hồ có chạy được không?". Bài học giản dị mà sâu sắc ấy đã lay động tất cả cán bộ.',
    citation: 'Bài học chiếc đồng hồ quả quýt - Chuyện kể Bác Hồ, NXB Thanh Niên',
    audioText: 'Câu chuyện chiếc đồng hồ quả quýt là bài học sâu sắc của Bác về tinh thần trách nhiệm, kỷ cương và sự phân công lao động trong tổ chức Đảng.',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    accentColor: '#D97706',
    badges: ['Bài học chiếc đồng hồ', 'Kỷ cương & Đoàn kết', 'Công tác cán bộ'],
    hotspots: [
      { id: 'hp1', angle: 120, title: 'Mặt số La Mã', description: 'Các con số và kim chỉ giờ nhắc nhở bài học về sự phối hợp nhịp nhàng.' },
      { id: 'hp2', angle: 240, title: 'Dây cót và bánh răng', description: 'Biểu trưng cho từng vị trí công tác thầm lặng nhưng tối quan trọng trong guồng máy cách mạng.' },
    ],
  },
  {
    id: 'art_08',
    name: 'Bộ Ấm Chén Trà Mộc Mạc Tại Bàn Gỗ Nhà Sàn',
    category: 'Đồ dùng tiếp khách của Bác',
    era: '1958 – 1969',
    year: '1958',
    origin: 'Khu di tích Phủ Chủ tịch (Hà Nội)',
    dimensions: 'Gốm men dong xanh lam Bát Tràng, ấm trà và 6 chén quân mộc',
    significance: 'Chuẩn mực Quy định 144: Gần gũi, tình thương, trọng dân, hiếu khách, văn hóa ứng xử cao đẹp.',
    story: 'Tại tầng 1 Nhà sàn, trên chiếc bàn gỗ đơn sơ, bộ ấm chén gốm mộc mạc này đã từng đón tiếp hàng trăm đoàn khách quý: từ các nguyên thủ quốc gia, các nhà báo quốc tế bạn bè năm châu, cho đến các anh hùng dũng sĩ diệt Mỹ miền Nam, các cháu thiếu nhi dũng cảm và các mẹ liệt sĩ. Bác tự tay rót trà mời khách với nụ cười ấm áp, thể hiện nét đẹp văn hóa hiếu khách truyền thống Việt Nam.',
    citation: 'Bác Hồ với các tầng lớp nhân dân, NXB Lao Động',
    audioText: 'Bộ ấm chén men dong Bát Tràng tại Nhà sàn Bác Hồ gắn liền với những câu chuyện tiếp đón nhân dân và bạn bè quốc tế chan chứa nghĩa tình.',
    imageUrl: '/assets/hcm-space/nha-rong.jpg',
    accentColor: '#0D9488',
    badges: ['Nhà sàn Bác Hồ', 'Trọng dân & Nghĩa tình', 'Gốm Bát Tràng'],
    hotspots: [
      { id: 'hp1', angle: 80, title: 'Ấm pha trà men lam', description: 'Gốm truyền thống Bát Tràng mộc mạc, bình dị và đậm hồn quê.' },
      { id: 'hp2', angle: 200, title: 'Chén quân tiếp khách', description: 'Những chén trà Bác tự tay nâng mời đồng bào, chiến sĩ và bạn bè quốc tế.' },
    ],
  },
];
