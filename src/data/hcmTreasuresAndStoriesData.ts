/**
 * DỮ LIỆU CHUYÊN SÂU: BẢO VẬT QUỐC GIA, BÚT TÍCH LỊCH SỬ & 10 CHUYỆN KỂ BÁC HỒ
 * 
 * Nguồn tư liệu kiểm chứng:
 * - Quyết định số 1426/QĐ-TTg và Quyết định số 2283/QĐ-TTg của Thủ tướng Chính phủ về công nhận Bảo vật Quốc gia
 * - Cục Lưu trữ Văn phòng Trung ương Đảng
 * - Bảo tàng Hồ Chí Minh (baotanghochiminh.vn)
 * - Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch (ditichphuchutich.gov.vn)
 * - NXB Chính trị quốc gia Sự thật & Ban Tuyên giáo Trung ương
 */

export interface NationalTreasureItem {
  id: string;
  name: string;
  category: 'BẢO VẬT QUỐC GIA' | 'BÚT TÍCH VIẾT TAY' | 'KỶ VẬT LỊCH SỬ';
  decisionNumber: string;
  decisionYear: number;
  creationPeriod: string;
  currentLocation: string;
  material: string;
  dimensions: string;
  significance: string;
  historicalContext: string;
  originalQuote?: string;
  imageUrl: string;
  audioVoiceText: string;
  citation: string;
}

export interface ExpandedStoryItem {
  id: string;
  title: string;
  topic: string;
  period: string;
  summary: string;
  fullStory: string;
  moralLesson: string;
  applicationForOfficials: string;
  source: string;
}

// =========================================================================
// 1. HỆ THỐNG 08 BẢO VẬT QUỐC GIA & BÚT TÍCH LỊCH SỬ VÔ GIÁ CỦA BÁC HỒ
// =========================================================================
export const NATIONAL_TREASURES_COLLECTION: NationalTreasureItem[] = [
  {
    id: 'treasure-duong-kach-menh',
    name: 'Cuốn Sách "Đường Kách Mệnh" (Bản gốc xuất bản năm 1927)',
    category: 'BẢO VẬT QUỐC GIA',
    decisionNumber: 'Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ (Đợt 1)',
    decisionYear: 2012,
    creationPeriod: 'Năm 1927 tại Quảng Châu, Trung Quốc',
    currentLocation: 'Bảo tàng Lịch sử Quốc gia (Hà Nội)',
    material: 'Giấy dó truyền thống in thạch, bìa bọc vải thô',
    dimensions: 'Khổ 13cm x 19cm, 100 trang',
    significance:
      'Cuốn sách giáo trình lý luận đầu tiên chuẩn bị về mặt chính trị, tư tưởng và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam vào ngày 03/02/1930.',
    historicalContext:
      'Năm 1925-1927, đồng chí Nguyễn Ái Quốc mở các lớp huấn luyện chính trị tại Quảng Châu (Trung Quốc) để đào tạo cán bộ cho Hội Việt Nam Cách mạng Thanh niên. Các bài giảng của Người được Bộ Tuyên truyền của Hội tập hợp in thành cuốn sách lịch sử này.',
    originalQuote:
      'Đảng muốn vững thì phải có chủ nghĩa làm cốt, trong đảng ai ai cũng phải hiểu, ai ai cũng phải theo chủ nghĩa ấy. Đảng mà không có chủ nghĩa cũng như người không có trí khôn, tàu không có bàn chỉ nam.',
    imageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    audioVoiceText:
      'Đường Kách Mệnh là Bảo vật Quốc gia đợt 1 năm 2012. Cuốn sách do Nguyễn Ái Quốc biên soạn năm 1927, đặt nền móng lý luận cho sự thành lập Đảng Cộng sản Việt Nam.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 2, tr. 279–347, NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'treasure-nhat-ky-trong-tu',
    name: 'Tập Thơ Bút Tích "Nhật Ký Trong Tù" (1942 – 1943)',
    category: 'BẢO VẬT QUỐC GIA',
    decisionNumber: 'Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ (Đợt 1)',
    decisionYear: 2012,
    creationPeriod: '29/08/1942 – 10/09/1943 tại các nhà lao tỉnh Quảng Tây',
    currentLocation: 'Bảo tàng Lịch sử Quốc gia (Hà Nội)',
    material: 'Sổ tay giấy bản viết mực đen chữ Hán bằng bút lông',
    dimensions: 'Khổ 9.5cm x 12.5cm, 133 bài thơ tứ tuyệt và ghi chép',
    significance:
      'Kiệt tác thi ca cách mạng thế giới, bức chân dung tinh thần tự họa của một bậc đại nhân, đại trí, đại dũng, biến chốn lao tù tối tăm thành trường học rèn luyện ý chí gang thép.',
    historicalContext:
      'Tháng 8/1942, Nguyễn Ái Quốc lấy tên là Hồ Chí Minh lên đường sang Trung Quốc công tác thì bị chính quyền Tưởng Giới Thạch bắt giữ vô cớ và giải qua gần 30 nhà lao của 13 huyện thuộc tỉnh Quảng Tây.',
    originalQuote:
      'Thân thể ở trong lao / Tinh thần ở ngoài lao / Muốn nên sự nghiệp lớn / Tinh thần phải càng cao.',
    imageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    audioVoiceText:
      'Nhật Ký Trong Tù là Bảo vật Quốc gia đợt 1. Tập thơ gồm 133 bài thơ chữ Hán viết trong chốn ngục tù Quảng Tây, thể hiện tinh thần lạc quan cách mạng phi thường của Bác.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 3, NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'treasure-loi-keu-goi-khang-chien',
    name: 'Bút Tích "Lời Kêu Gọi Toàn Quốc Kháng Chiến" (19/12/1946)',
    category: 'BẢO VẬT QUỐC GIA',
    decisionNumber: 'Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ (Đợt 1)',
    decisionYear: 2012,
    creationPeriod: 'Đêm 19 tháng 12 năm 1946 tại Vạn Phúc, Hà Đông',
    currentLocation: 'Bảo tàng Lịch sử Quốc gia & Cục Lưu trữ Văn phòng TW Đảng',
    material: 'Giấy viết chữ đen mực Cửu Long bằng bút máy',
    dimensions: '02 trang giấy viết tay khổ A4',
    significance:
      'Hịch cứu nước của thời đại Hồ Chí Minh, thổi bùng ngọn lửa quyết tử để Tổ quốc quyết sinh, mở đầu cuộc kháng chiến 9 năm chống thực dân Pháp trường kỳ.',
    historicalContext:
      'Sau khi thực dân Pháp gửi tối hậu thư đòi tước vũ khí của tự vệ Thủ đô, tại ngôi nhà của ông Nguyễn Văn Dương ở làng Vạn Phúc (Hà Đông), Chủ tịch Hồ Chí Minh đã chủ trì Hội nghị Thường vụ Trung ương Đảng và chấp bút bản Lời kêu gọi lịch sử.',
    originalQuote:
      'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ. Hỡi đồng bào! Chúng ta phải đứng lên!',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    audioVoiceText:
      'Bút tích Lời kêu gọi toàn quốc kháng chiến đêm 19 tháng 12 năm 1946 là Bảo vật Quốc gia, hiệu triệu toàn thể dân tộc đứng lên bảo vệ độc lập non sông.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 534, NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'treasure-loi-keu-goi-1966',
    name: 'Bản Thảo Ghi Âm & Viết Tay "Không Có Gì Quý Hơn Độc Lập, Tự Do" (17/07/1966)',
    category: 'BẢO VẬT QUỐC GIA',
    decisionNumber: 'Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ (Đợt 1)',
    decisionYear: 2012,
    creationPeriod: 'Tháng 7 năm 1966 tại Hà Nội',
    currentLocation: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
    material: 'Bản thảo đánh máy có bút tích sửa chữa bằng mực đỏ của Bác và băng ghi âm gốc',
    dimensions: '03 trang khổ tiêu chuẩn',
    significance:
      'Chân lý bất hủ của dân tộc Việt Nam và nhân loại tiến bộ trong thế kỷ 20, khẳng định ý chí sắt đá đánh bại cuộc chiến tranh phá hoại của đế quốc Mỹ.',
    historicalContext:
      'Khi giặc Mỹ ồ ạt đưa hàng chục vạn quân viễn chinh vào miền Nam và leo thang ném bom ác liệt miền Bắc (kể cả Hà Nội và Hải Phòng), Bác Hồ ra lời kêu gọi thiêng liêng trên Đài Tiếng nói Việt Nam sáng 17/7/1966.',
    originalQuote:
      'Chiến tranh có thể kéo dài 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa. Hà Nội, Hải Phòng và một số thành phố, xí nghiệp có thể bị tàn phá, song nhân dân Việt Nam quyết không sợ! Không có gì quý hơn độc lập, tự do.',
    imageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    audioVoiceText:
      'Chân lý Không có gì quý hơn độc lập tự do trong Lời kêu gọi ngày 17 tháng 7 năm 1966 là Bảo vật Quốc gia, nguồn sức mạnh vô địch đưa cuộc kháng chiến chống Mỹ đến thắng lợi hoàn toàn.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 15, tr. 130–133, NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'treasure-di-chuc',
    name: 'Bản Di Chúc Lịch Sử Viết Tay Của Chủ Tịch Hồ Chí Minh (1965 – 1969)',
    category: 'BẢO VẬT QUỐC GIA',
    decisionNumber: 'Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ (Đợt 1)',
    decisionYear: 2012,
    creationPeriod: 'Khởi thảo từ 10/05/1965, sửa chữa bổ sung đến tháng 5/1969',
    currentLocation: 'Cục Lưu trữ Văn phòng Trung ương Đảng (Hà Nội)',
    material: 'Các bản viết tay bằng mực xanh, mực đỏ và bản đánh máy có chữ ký Bác Hồ',
    dimensions: 'Tập hồ sơ lưu trữ đặc biệt gồm các bản 1965, 1968 và 1969',
    significance:
      'Văn kiện lịch sử vô giá, quốc bảo tinh thần kết tinh tinh hoa tư tưởng, đạo đức, tâm hồn trong sáng và niềm tin tất thắng của vị Cha già dân tộc trước lúc đi xa.',
    historicalContext:
      'Bác bắt đầu viết những dòng đầu tiên vào dịp sinh nhật 75 tuổi (tháng 5/1965). Mỗi năm vào dịp tháng 5, Bác lại dành 1 tiếng đồng hồ để đọc lại, sửa đổi và bổ sung thêm những dặn dò ân cần cho Đảng và nhân dân.',
    originalQuote:
      'Trước hết nói về Đảng: Phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình... Điều mong muốn cuối cùng của tôi là: Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh.',
    imageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    audioVoiceText:
      'Bản Di chúc thiêng liêng là Bảo vật Quốc gia vô giá, kết tinh trọn vẹn tư tưởng đạo đức Hồ Chí Minh, là ngọn đuốc soi đường cho các thế hệ cách mạng Việt Nam.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 15, tr. 611–624, NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'treasure-but-tich-dan-van',
    name: 'Bút Tích Bài Báo "Dân Vận" (Đăng Báo Sự Thật Ngày 15/10/1949)',
    category: 'BÚT TÍCH VIẾT TAY',
    decisionNumber: 'Tư liệu Bút tích Di sản Quốc gia',
    decisionYear: 2015,
    creationPeriod: 'Tháng 10 năm 1949 tại Chiến khu Việt Bắc',
    currentLocation: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
    material: 'Bản thảo viết tay ký bút danh X.Y.Z',
    dimensions: '02 trang giấy mỏng thời kháng chiến',
    significance:
      'Cương lĩnh hành động mẫu mực về công tác dân vận của Đảng: "Dân vận kém thì việc gì cũng kém. Dân vận khéo thì việc gì cũng thành công".',
    historicalContext:
      'Giữa lúc cuộc kháng chiến chống Pháp bước vào giai đoạn quyết liệt, Bác viết bài báo để chấn chỉnh bệnh quan liêu, mệnh lệnh của một số cán bộ và khơi dậy sức mạnh vô địch của toàn dân.',
    originalQuote:
      'Dân vận là vận động tất cả lực lượng của mỗi một người dân không để sót một người dân nào, góp thành lực lượng toàn dân... Phải: óc nghĩ, mắt trông, tai nghe, chân đi, miệng nói, tay làm.',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    audioVoiceText:
      'Bút tích bài báo Dân vận viết ngày 15 tháng 10 năm 1949 là ngọn cờ dẫn đường cho công tác dân vận của Đảng: Dân vận khéo thì việc gì cũng thành công.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 6, tr. 232–234, NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'treasure-may-danh-chu',
    name: 'Chiếc Máy Đánh Chữ Hiệu Hermes Baby Của Bác Hồ',
    category: 'KỶ VẬT LỊCH SỬ',
    decisionNumber: 'Kỷ vật Di sản Quốc gia Đặc biệt',
    decisionYear: 2010,
    creationPeriod: 'Sử dụng từ năm 1945 đến năm 1969',
    currentLocation: 'Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch (Nhà Sàn)',
    material: 'Kim loại sơn đen, cơ cấu cơ khí chữ nhỏ gọn nhẹ',
    dimensions: 'Kích thước nhỏ gọn 28cm x 28cm x 6cm, nặng khoảng 3.5kg',
    significance:
      'Công cụ làm việc giản dị đã cùng Bác soạn thảo hàng ngàn chỉ thị, sắc lệnh, bài báo và những bức thư động viên chiến sĩ ngoài mặt trận.',
    historicalContext:
      'Chiếc máy chữ nhỏ được Bác mang theo trong ba lô suốt những năm tháng ở rừng sâu Việt Bắc và sau này đặt tại bàn làm việc tầng 2 Nhà sàn gỗ Phủ Chủ tịch.',
    originalQuote:
      'Cán bộ phải siêng năng, làm việc có phương pháp, phải chịu khó viết ngắn gọn, súc tích để nhân dân dễ hiểu, dễ nhớ, dễ làm theo.',
    imageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    audioVoiceText:
      'Chiếc máy đánh chữ Hermes Baby nhỏ gọn trên bàn làm việc Nhà Sàn là nhân chứng lịch sử nơi Bác Hồ soạn thảo hàng ngàn văn kiện chiến lược cho cách mạng.',
    citation: 'Hồ sơ hiện vật Khu di tích Phủ Chủ tịch, Hà Nội',
  },
  {
    id: 'treasure-doi-dep-cao-su',
    name: 'Sưu Tập Hiện Vật "Đôi Dép Cao Su Bác Hồ"',
    category: 'KỶ VẬT LỊCH SỬ',
    decisionNumber: 'Kỷ vật Di sản Quốc gia Đặc biệt',
    decisionYear: 2010,
    creationPeriod: '1947 – 1969',
    currentLocation: 'Bảo tàng Hồ Chí Minh & Khu Di tích Phủ Chủ tịch',
    material: 'Lốp cao su quân sự xe tải, quai chèn cao su đen',
    dimensions: 'Cỡ chân 40, đế cao su mòn vẹt qua năm tháng',
    significance:
      'Biểu tượng văn hóa bất hủ của thế kỷ 20, minh chứng sống động cho phong cách sống thanh cao, giản dị, hòa mình vào đời sống cần lao của Chủ tịch nước.',
    historicalContext:
      'Chế tác năm 1947 từ lốp xe tải quân sự Pháp tịch thu được tại Việt Bắc. Bác đã mang đôi dép này đi khắp các nẻo đường kháng chiến và trong các chuyến ngoại giao cấp nhà nước.',
    originalQuote:
      'Dép vẫn còn đi tốt, các chú chỉ cần đóng thêm quai vào là được. Khi nào không sửa được nữa hãy hay.',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    audioVoiceText:
      'Đôi dép cao su của Bác Hồ là biểu tượng bất tử của đức tính cần kiệm, liêm chính và tình yêu thương vô hạn với nhân dân.',
    citation: 'Hồ sơ hiện vật Bảo tàng Hồ Chí Minh',
  },
];

// =========================================================================
// 2. KHO 10 CÂU CHUYỆN KỂ VỀ BÁC HỒ & BÀI HỌC ĐẠO ĐỨC CÁCH MẠNG
// =========================================================================
export const EXPANDED_HCM_STORIES_10: ExpandedStoryItem[] = [
  {
    id: 'story-01',
    title: '1. Đôi dép cao su mộc mạc',
    topic: 'Cần kiệm, liêm chính & Lối sống thanh bạch',
    period: '1947 – 1969',
    summary: 'Đôi dép làm từ lốp ô tô quân sự theo Bác suốt chặng đường kháng chiến và các hoạt động ngoại giao quốc tế.',
    fullStory:
      'Đôi dép của Bác được chế tạo năm 1947 từ một chiếc lốp ô tô quân sự Pháp thu được ở chiến khu Việt Bắc. Trong suốt hơn 20 năm kháng chiến chống Pháp rồi chống Mỹ, đôi dép ấy đã cùng Bác lội suối trèo đèo, thăm bộ đội, nông dân và các công trường hầm mỏ.\n\nKhi Bác sang thăm Liên Xô hay Ấn Độ, các vị nguyên thủ nước bạn và phóng viên quốc tế đều kính phục trước phong thái ung dung và đôi dép giản dị của một vị Chủ tịch nước. Nhiều lần các đồng chí phục vụ thấy dép mòn xin thay đôi mới, Bác cười bảo: "Dép vẫn còn đi tốt, các chú chỉ cần đóng thêm quai vào là được". Đôi dép cao su đã trở thành biểu tượng bất tử cho đức tính giản dị, cần kiệm suốt đời của Người.',
    moralLesson: 'Bài học về lối sống giản dị, cần kiệm, chống xa hoa lãng phí; luôn đồng cảm và gắn bó máu thịt với đời sống gian khó của nhân dân.',
    applicationForOfficials: 'Cán bộ, đảng viên cơ sở phải triệt để thực hành tiết kiệm công quỹ, không phô trương hình thức, gần dân và chia sẻ với dân.',
    source: 'Thư viện Khoa học Tổng hợp TP.HCM & Bảo tàng Hồ Chí Minh',
  },
  {
    id: 'story-02',
    title: '2. Thời gian quý báu lắm (Bài học về đúng giờ)',
    topic: 'Tác phong làm việc khoa học & Kỷ luật thời gian',
    period: 'Năm 1953 tại Chiến khu Việt Bắc',
    summary: 'Bác phê bình ân cần nhưng sâu sắc việc chậm trễ giờ họp, nhắc nhở thời gian của tập thể là tài sản vô giá.',
    fullStory:
      'Năm 1953, Bác đến dự một hội nghị cán bộ tổng kết chiến dịch ở chiến khu. Trời mưa to gió lớn, đường rừng trơn trượt lầy lội, nhưng Bác vẫn đến đúng giờ quy định. Tuy nhiên, một đồng chí cán bộ cấp tướng phụ trách đơn vị lại đến muộn mất 10 phút. Đồng chí áy náy xin lỗi Bác vì trời mưa đường trơn.\n\nBác nhìn đồng chí cán bộ, mỉm cười ân cần nhưng nghiêm khắc nói: "Chú đến muộn 10 phút. Ở đây có 100 cán bộ đang chờ chú. Chú lấy 10 phút nhân với 100 người, thành ra chú đã làm lãng phí 1.000 phút của tập thể cách mạng. Thời gian quý báu lắm, chú làm lãng phí thì lấy gì bù đắp lại được?". Đồng chí cán bộ thấm thía sâu sắc và từ đó về sau không bao giờ đi muộn một phút nào.',
    moralLesson: 'Thời gian là tài sản của xã hội. Đúng giờ là biểu hiện đầu tiên của tinh thần kỷ luật, lòng tôn trọng người khác và tinh thần trách nhiệm với công việc.',
    applicationForOfficials: 'Cán bộ công chức phải tuân thủ nghiêm ngặt giờ làm việc, giải quyết hồ sơ đúng hẹn cho công dân, không để dân phải chờ đợi.',
    source: 'Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch',
  },
  {
    id: 'story-03',
    title: '3. Chiếc đồng hồ và bài học tổ chức đoàn kết',
    topic: 'Ý thức tổ chức, kỷ luật & Tinh thần đoàn kết',
    period: 'Năm 1954 tại Đại Từ, Thái Nguyên',
    summary: 'Hình tượng chiếc đồng hồ quả quýt giáo dục cán bộ không so bì địa vị, hết lòng làm tròn nhiệm vụ được phân công.',
    fullStory:
      'Mùa thu năm 1954, chuẩn bị tiếp quản Thủ đô, một số cán bộ có tư tưởng so bì, ai cũng muốn về thành phố làm việc, không muốn nhận nhiệm vụ ở miền núi xa xôi. Bác Hồ đến thăm và cầm chiếc đồng hồ quả quýt hỏi: "Trong chiếc đồng hồ này có kim giờ, kim phút, có các bánh xe và ốc vít bên trong. Nếu chiếc ốc vít bảo tôi không ở bên trong nữa, tôi muốn ra ngoài làm kim giờ, thì chiếc đồng hồ có chạy được không?".\n\nCả hội trường lặng đi vì thấm thía lời Người. Bác kết luận: "Công việc cách mạng cũng vậy, tổ chức phân công nhiệm vụ gì thì làm tròn nhiệm vụ ấy. Mỗi người một việc, đều vì mục tiêu chung phụng sự Tổ quốc. Đừng so bì kèn cựa vị trí sang hèn".',
    moralLesson: 'Bài học về sự tôn trọng kỷ luật tổ chức, tinh thần đại đoàn kết, không kèn cựa quyền lực, đặt lợi ích tập thể lên trên cái tôi cá nhân.',
    applicationForOfficials: 'Đảng viên tuyệt đối phục tùng sự điều động, luân chuyển công tác của Đảng bộ; tận tụy ở mọi cương vị được giao.',
    source: 'Ban Tuyên giáo Trung ương & NXB Chính trị quốc gia Sự thật',
  },
  {
    id: 'story-04',
    title: '4. Nước nóng và nước nguội (Nghệ thuật ứng xử)',
    topic: 'Kỹ năng kiềm chế cảm xúc & Ứng xử nhân văn',
    period: 'Thời kỳ kháng chiến chống Pháp',
    summary: 'Cách giáo dục tinh tế của Bác giúp người cán bộ quản lý nhận ra sai lầm của tính nóng giận khi làm việc với cấp dưới.',
    fullStory:
      'Một đồng chí cán bộ phụ trách trung đoàn có tính rất nóng nảy, mỗi khi cấp dưới có khuyết điểm là quát tháo, nặng lời. Bác cho gọi đồng chí ấy lên gặp. Trời mùa hè oi ả, đồng chí đi bộ đường xa mồ hôi ướt đẫm lưng áo. Khi đến nơi, thấy trên bàn Bác đã chuẩn bị sẵn hai cốc nước: một cốc nước sôi bốc hơi nghi ngút và một cốc nước mát trong lành.\n\nBác chỉ cốc nước sôi và bảo: "Chú uống đi". Đồng chí cán bộ giật mình: "Thưa Bác, nước nóng thế này làm sao uống được ạ?". Bác mỉm cười hiền từ, đưa cốc nước mát cho đồng chí rồi nói: "Đúng thế! Nước nóng quá thì không ai uống được. Cơn giận của con người cũng như cốc nước sôi ấy. Khi chú nóng giận quát tháo cấp dưới, thì lời nói của chú dù đúng người ta cũng không tiếp thu được. Chỉ có sự điềm đạm, chân thành như cốc nước mát này mới cảm hóa được lòng người thôi chú ạ".',
    moralLesson: 'Bài học sâu sắc về sự kiềm chế cơn nóng giận, phong cách ứng xử văn minh, lấy sự chân thành và tình thương yêu để thuyết phục con người.',
    applicationForOfficials: 'Cán bộ tiếp dân và lãnh đạo đơn vị phải luôn giữ thái độ hòa nhã, lắng nghe, không hách dịch, nhũng nhiễu hay cáu gắt.',
    source: 'Bảo tàng Hồ Chí Minh (Hà Nội)',
  },
  {
    id: 'story-05',
    title: '5. Chiếc áo trấn thủ mùa đông',
    topic: 'Tình thương yêu đồng bào, chiến sĩ',
    period: 'Mùa đông năm 1946',
    summary: 'Món quà ấm áp của nhân dân gửi Bác và quyết định cảm động trao tặng lại chiến sĩ xuất sắc nhất nơi đầu sóng ngọn gió.',
    fullStory:
      'Mùa đông năm 1946 tại chiến khu Việt Bắc rét buốt. Đồng bào gom góp từng chút len bông may tặng Bác một chiếc áo trấn thủ ấm áp. Nhận áo, Bác rưng rưng xúc động, nhưng rồi Người bảo đồng chí cần vụ: "Mùa đông này rét lắm. Các chiến sĩ ngoài mặt trận đang canh gác trên chiến hào, quần áo phong phanh hơn Bác. Chú hãy đem chiếc áo ấm này gửi tặng chiến sĩ nào lập công xuất sắc nhất ngoài mặt trận".\n\nCử chỉ của Bác thắp lên ngọn lửa sưởi ấm hàng vạn trái tim người lính, tiếp thêm sức mạnh cho bộ đội ta vượt qua mùa đông buốt giá để chiến đấu giành thắng lợi.',
    moralLesson: 'Phong cách lãnh đạo "lo trước thiên hạ, vui sau thiên hạ", luôn đặt sự an nguy và đời sống của chiến sĩ, nhân dân lên trước bản thân.',
    applicationForOfficials: 'Lãnh đạo cơ sở phải đi đầu trong việc chăm lo đời sống các gia đình chính sách, hộ nghèo, người có hoàn cảnh khó khăn.',
    source: 'Thư viện Khoa học Tổng hợp TP.HCM',
  },
  {
    id: 'story-06',
    title: '6. Bát chè xẻ đôi (Tình nghĩa đồng chí)',
    topic: 'Bình đẳng, không đặc quyền đặc lợi',
    period: 'Chiến khu Việt Bắc',
    summary: 'Sự quan tâm ân cần và tinh thần sẻ ngọt chia bùi của Bác với người phục vụ trong những ngày sốt rét gian khổ.',
    fullStory:
      'Trong kháng chiến, Bác bị một trận sốt rét nặng kéo dài, người gầy rộc. Đồng chí cần vụ nấu được một bát chè hạt sen nhỏ mang lên mời Bác bồi dưỡng. Bác nhìn bát chè rồi nhìn đồng chí cần vụ thức trắng đêm chăm sóc Bác. Bác lấy chiếc thìa chia đôi bát chè làm hai phần bằng nhau rồi bảo: "Bác một nửa, chú một nửa. Kháng chiến gian khổ, anh em ta cùng chia sẻ".\n\nĐồng chí từ chối, Bác dứt khoát: "Chú không ăn thì Bác cũng không ăn". Tình cảm chân thành ấy đã gắn kết lãnh tụ và nhân dân thành một khối thống nhất keo sơn.',
    moralLesson: 'Bài học về sự công bằng, không hưởng thụ đặc quyền đặc lợi, luôn đồng cam cộng khổ cùng cấp dưới và đồng chí.',
    applicationForOfficials: 'Kiên quyết đẩy lùi chủ nghĩa cá nhân, tư tưởng hưởng thụ, quan liêu xa rời quần chúng trong đội ngũ cán bộ.',
    source: 'Thư viện Khoa học Tổng hợp TP.HCM',
  },
  {
    id: 'story-07',
    title: '7. Bác không muốn làm phiền ai',
    topic: 'Tính tự lập, khiêm tốn & Tôn trọng công sức người khác',
    period: 'Tại Nhà sàn Phủ Chủ tịch (1958 – 1969)',
    summary: 'Dù tuổi cao và là Chủ tịch nước, Bác vẫn tự giặt quần áo, quét dọn phòng làm việc, không muốn người khác phải phục vụ mình.',
    fullStory:
      'Ở Nhà sàn, Bác tự tay gấp chăn màn, quét dọn bàn làm việc ngăn nắp. Buổi tối làm việc xong, Bác tự tắt đèn, đóng cửa sổ. Những chiếc áo sờn rách, Bác nhờ vá lại để mặc tiếp. Bác thường dặn các đồng chí phục vụ: "Các chú còn nhiều công việc của Đảng và Nhà nước, việc gì Bác tự làm được thì để Bác làm, đừng làm phiền đến mọi người".\n\nNgay cả những khi đi công tác xa, Bác cũng dặn cơ quan không được tổ chức đón tiếp linh đình gà vịt tốn kém tiền bạc của nhân dân. Bác thường mang theo nắm cơm vắt với muối vừng để ăn dọc đường.',
    moralLesson: 'Bài học sâu sắc về tính tự lập, khiêm nhường, không ỷ lại địa vị để bắt người khác hầu hạ, phục dịch bản thân.',
    applicationForOfficials: 'Thực hiện phong cách làm việc giản dị, không tiếp khách xa hoa lãng phí, tự giác trong công việc hàng ngày.',
    source: 'Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch',
  },
  {
    id: 'story-08',
    title: '8. Hai bàn tay trắng cứu nước',
    topic: 'Ý chí kiên định, tự lực cánh sinh & Dám dấn thân',
    period: 'Ngày 05/06/1911 tại Bến Nhà Rồng',
    summary: 'Cuộc trò chuyện lịch sử giữa Người thanh niên Nguyễn Tất Thành và anh Tư Lê trước ngày bước chân lên tàu ra đi tìm đường cứu nước.',
    fullStory:
      'Năm 1911 tại Sài Gòn, Nguyễn Tất Thành hỏi người bạn là anh Tư Lê: "Tôi muốn đi ra nước ngoài xem nước Pháp và các nước khác làm thế nào, rồi trở về giúp đồng bào ta. Anh có muốn đi cùng tôi không?".\n\nAnh Tư Lê ngập ngừng: "Nhưng chúng ta lấy tiền đâu mà đi?". Người thanh niên Nguyễn Tất Thành giơ hai bàn tay ra và nói dõng dạc: "Đây, tiền đây! Chúng ta sẽ làm bất cứ việc gì để sống và để đi!". Hai bàn tay lao động chai sạn ấy đã đưa Người đi khắp năm châu bốn biển, vượt qua bao sóng gió hiểm nguy để tìm ra con đường cứu nước đúng đắn cho cả dân tộc.',
    moralLesson: 'Bài học về lòng yêu nước nồng nàn, ý chí tự lực cánh sinh, dám nghĩ, dám làm, dám dấn thân vượt qua mọi gian khó.',
    applicationForOfficials: 'Khơi dậy khát vọng cống hiến, tinh thần đổi mới sáng tạo, dám nghĩ dám làm vì lợi ích chung của quê hương Đất Thủ.',
    source: 'Bảo tàng Hồ Chí Minh — Chi nhánh TP. Hồ Chí Minh',
  },
  {
    id: 'story-09',
    title: '9. Bác Hồ tắm cho các cháu thiếu nhi',
    topic: 'Tình yêu thương trẻ thơ & Giáo dục mầm non',
    period: 'Năm 1950 tại chiến khu',
    summary: 'Hình ảnh Người cha già tự tay múc nước tắm rửa, chăm sóc từng bữa ăn cho các em nhỏ mồ côi nơi chiến khu.',
    fullStory:
      'Trong kháng chiến, cơ quan có nuôi một số cháu bé mồ côi cha mẹ do bom đạn giặc. Những buổi chiều rảnh việc nước, Bác lại ra giếng múc từng xô nước ấm, tự tay tắm rửa, kỳ cọ sạch sẽ cho các cháu. Bác cắt móng tay, chia kẹo và dạy các cháu hát múa.\n\nBác căn dặn các cán bộ bảo mẫu: "Trẻ em như búp trên cành. Nuôi dạy trẻ em phải kiên trì, lấy tình thương yêu làm đầu, chăm lo cho các cháu ăn no mặc ấm, học hành thành người có đức có tài".',
    moralLesson: 'Tình cảm bao la của Bác đối với thế hệ tương lai; tầm quan trọng của giáo dục tình thương và sự chăm sóc mầm non của đất nước.',
    applicationForOfficials: 'Toàn xã hội và nhà trường phải chung tay chăm lo, bảo vệ trẻ em, không để trẻ em nào bị bỏ lại phía sau.',
    source: 'Nhà xuất bản Kim Đồng & Bảo tàng Hồ Chí Minh',
  },
  {
    id: 'story-10',
    title: '10. Vì lợi ích mười năm trồng cây, vì lợi ích trăm năm trồng người',
    topic: 'Tầm nhìn chiến lược giáo dục & Bảo vệ môi trường',
    period: '1958 – 1960',
    summary: 'Lời huấn thị mang tầm thời đại của Bác về chiến lược bồi dưỡng thế hệ cách mạng cho đời sau và phong trào Tết Trồng cây.',
    fullStory:
      'Ngày 13/09/1958, nói chuyện tại lớp bồi dưỡng giáo viên, Bác Hồ căn dặn câu nói đã trở thành kim chỉ nam cho nền giáo dục nước nhà: "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người. Giáo dục là sự nghiệp vẻ vang, thầy cô giáo phải là tấm gương sáng cho học sinh noi theo".\n\nMùa xuân năm 1960, Bác khởi xướng phong trào "Tết Trồng cây" với mong muốn non sông xanh tươi và đất nước phát triển bền vững. Lời Bác dạy mãi mãi soi sáng cho mọi công cuộc đổi mới giáo dục và bảo vệ môi trường sinh thái hôm nay.',
    moralLesson: 'Bài học về tầm nhìn chiến lược lâu dài: Đầu tư cho con người là đầu tư cho tương lai trường tồn của đất nước.',
    applicationForOfficials: 'Xây dựng môi trường giáo dục văn hóa, nhân văn; xây dựng các trường học hạnh phúc và khu phố xanh sạch đẹp tại Thủ Dầu Một.',
    source: 'Hồ Chí Minh Toàn tập, Tập 11, tr. 528, NXB Chính trị quốc gia Sự thật',
  },
];
