// Cơ sở dữ liệu chính thức cho các tính năng nâng cấp đột phá:
// 1. Thử thách 21 ngày "Học và Làm theo Bác" (Chuẩn mực Quy định 144-QĐ/TW & Chỉ thị 07-CT/TW)
// 2. Sổ tay Sinh hoạt Chi bộ Thông minh 2026 (12 kỳ sinh hoạt định kỳ & 4 chuyên đề)
// 3. Kính lúp soi Bản thảo Bút tích Bác Hồ (Handwriting Deep-Zoom)
// 4. Tuyến Du lịch Đỏ Về nguồn Thủ Dầu Một (5 điểm di tích liên hoàn)
// 5. Trung tâm Thống kê Học tập Di sản (Heritage Analytics Metrics)

// ============================================================================
// 1. THỬ THÁCH 21 NGÀY "HỌC VÀ LÀM THEO BÁC" (21-DAY HERITAGE ACTION CHALLENGE)
// ============================================================================
export interface DailyChallengeItem {
  day: number;
  title: string;
  pillar: 'Yêu nước, tôn trọng Nhân dân' | 'Bản lĩnh, đổi mới, sáng tạo' | 'Cần, kiệm, liêm, chính' | 'Đoàn kết, kỷ cương' | 'Gương mẫu, khiêm tốn';
  quote: string;
  quoteSource: string;
  actionTask: string; // Hành động cụ thể cần thực hiện trong ngày
  reflectionQuestion: string; // Câu hỏi tự soi rọi bản thân
  points: number;
  badgeName: string;
  badgeIcon: string;
}

export const TWENTY_ONE_DAY_CHALLENGE: DailyChallengeItem[] = [
  {
    day: 1,
    title: 'Khởi đầu với sự Cần kiệm & Đúng giờ',
    pillar: 'Cần, kiệm, liêm, chính',
    quote: 'Ai làm việc gì cũng phải cần kiệm. Làm việc mà không cần kiệm thì như xây nhà trên cát.',
    quoteSource: 'Sửa đổi lối làm việc (1947), Toàn tập, Tập 5, tr. 293',
    actionTask: 'Đi làm đúng giờ, lập danh sách 3 việc quan trọng nhất trong ngày và giải quyết dứt điểm.',
    reflectionQuestion: 'Hôm nay mình có lãng phí thời gian hay tài sản công vụ nào không?',
    points: 10,
    badgeName: 'Hạt mầm Kỷ cương',
    badgeIcon: '🌱',
  },
  {
    day: 2,
    title: 'Tiết kiệm điện nước & Văn phòng xanh',
    pillar: 'Cần, kiệm, liêm, chính',
    quote: 'Tiết kiệm không phải là bủn xỉn. Việc đáng tiêu một vạn cũng tiêu, việc không đáng tiêu một đồng cũng không tiêu.',
    quoteSource: 'Thực hành tiết kiệm, chống tham ô, lãng phí (1952), Toàn tập, Tập 7, tr. 355',
    actionTask: 'Tắt các thiết bị điện khi rời phòng làm việc, giảm in ấn giấy, tận dụng tài liệu số hóa.',
    reflectionQuestion: 'Mình đã đóng góp gì cụ thể để chống lãng phí tại nơi làm việc và gia đình?',
    points: 10,
    badgeName: 'Búp Sen Cần Kiệm',
    badgeIcon: '💡',
  },
  {
    day: 3,
    title: 'Lắng nghe nhân dân với thái độ ân cần',
    pillar: 'Yêu nước, tôn trọng Nhân dân',
    quote: 'Việc gì lợi cho dân, ta phải hết sức làm. Việc gì hại đến dân, ta phải hết sức tránh.',
    quoteSource: 'Thư gửi các đồng chí Bắc Bộ (1945), Toàn tập, Tập 4, tr. 65',
    actionTask: 'Tiếp nhận ý kiến đóng góp của một người dân hoặc đồng nghiệp với nụ cười và sự tận tình hướng dẫn.',
    reflectionQuestion: 'Thái độ phục vụ của mình hôm nay đã thực sự làm người dân hài lòng chưa?',
    points: 10,
    badgeName: 'Cầu Nối Thân Dân',
    badgeIcon: '🤝',
  },
  {
    day: 4,
    title: 'Đọc và suy ngẫm 1 trang sách lý luận',
    pillar: 'Bản lĩnh, đổi mới, sáng tạo',
    quote: 'Học hỏi là một việc phải tiếp tục suốt đời. Không ai có thể tự cho mình là biết đủ rồi.',
    quoteSource: 'Nói chuyện tại lớp chỉnh Đảng Trung ương (1953), Toàn tập, Tập 8, tr. 103',
    actionTask: 'Đọc ít nhất 1 tác phẩm hoặc 1 bài nói của Bác trong Tủ sách số Hồ Chí Minh Toàn tập.',
    reflectionQuestion: 'Hôm nay mình đã tiếp thu thêm được tri thức hoặc luận điểm cách mạng mới nào?',
    points: 15,
    badgeName: 'Ngọn Đuốc Tri Thức',
    badgeIcon: '📖',
  },
  {
    day: 5,
    title: 'Chân thành tự phê bình và góp ý xây dựng',
    pillar: 'Đoàn kết, kỷ cương',
    quote: 'Tự phê bình và phê bình như rửa mặt hàng ngày. Rửa mặt thì mặt mới sạch, phê bình thì Đảng mới mạnh.',
    quoteSource: 'Sửa đổi lối làm việc (1947), Toàn tập, Tập 5, tr. 279',
    actionTask: 'Nhìn nhận thẳng thắn 1 thiếu sót gần đây của bản thân và chủ động xin lỗi hoặc khắc phục.',
    reflectionQuestion: 'Khi nhận được lời góp ý từ cấp dưới hoặc đồng nghiệp, mình có cởi mở đón nhận không?',
    points: 15,
    badgeName: 'Gương Soi Liêm Chính',
    badgeIcon: '🪞',
  },
  {
    day: 6,
    title: 'Chia sẻ yêu thương & Giúp đỡ một hoàn cảnh khó khăn',
    pillar: 'Yêu nước, tôn trọng Nhân dân',
    quote: 'Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.',
    quoteSource: 'Trả lời các nhà báo nước ngoài (1946), Toàn tập, Tập 4, tr. 187',
    actionTask: 'Quyên góp hoặc trực tiếp hỗ trợ một người già neo đơn, trẻ em có hoàn cảnh khó khăn tại khu phố.',
    reflectionQuestion: 'Trái tim mình đã thực sự rung động trước những mảnh đời khó khăn quanh mình chưa?',
    points: 15,
    badgeName: 'Trái Tim Nhân Ái',
    badgeIcon: '❤️',
  },
  {
    day: 7,
    title: 'Tổng kết tuần 1: Củng cố chữ Liêm & Kỷ luật',
    pillar: 'Cần, kiệm, liêm, chính',
    quote: 'Cụ Khổng Tử nói: Người mà không liêm, không bằng súc vật. Người cán bộ mà không liêm thì làm sao lãnh đạo dân được.',
    quoteSource: 'Hồ Chí Minh Toàn tập, Tập 6, tr. 127',
    actionTask: 'Kiểm điểm lại công việc trong tuần, bảo đảm 100% minh bạch, công tâm, không tư lợi.',
    reflectionQuestion: 'Có quyết định nào trong tuần mình bị chi phối bởi tình cảm riêng tư hay lợi ích nhóm không?',
    points: 20,
    badgeName: 'Chiến Sĩ Tuần 1',
    badgeIcon: '🎖️',
  },
  {
    day: 8,
    title: 'Chủ động đổi mới phương pháp làm việc',
    pillar: 'Bản lĩnh, đổi mới, sáng tạo',
    quote: 'Cách mạng là phá cái cũ đổi ra cái mới, phá cái xấu đổi ra cái tốt.',
    quoteSource: 'Đường Kách mệnh (1927), Toàn tập, Tập 2, tr. 284',
    actionTask: 'Đề xuất 1 sáng kiến nhỏ để rút ngắn thời gian xử lý thủ tục hoặc nâng cao chất lượng công vụ.',
    reflectionQuestion: 'Mình có đang rơi vào lối mòn quan liêu, ngại thay đổi không?',
    points: 15,
    badgeName: 'Ý Tưởng Sáng Tạo',
    badgeIcon: '💡',
  },
  {
    day: 9,
    title: 'Giữ gìn sự đoàn kết như giữ con ngươi mắt mình',
    pillar: 'Đoàn kết, kỷ cương',
    quote: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.',
    quoteSource: 'Bài nói tại Đại hội Mặt trận Tổ quốc Việt Nam (1962), Toàn tập, Tập 13, tr. 453',
    actionTask: 'Hàn gắn hoặc làm trung gian hòa giải một hiểu lầm nhỏ giữa hai đồng nghiệp hoặc bà con lối xóm.',
    reflectionQuestion: 'Lời nói và hành động của mình hôm nay có góp phần xây dựng sự đồng thuận nội bộ không?',
    points: 15,
    badgeName: 'Cầu Nối Đoàn Kết',
    badgeIcon: '🤝',
  },
  {
    day: 10,
    title: 'Thực hiện nói đi đôi với làm',
    pillar: 'Gương mẫu, khiêm tốn',
    quote: 'Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền.',
    quoteSource: 'Chăm sóc thế hệ cách mạng cho đời sau (1969), Toàn tập, Tập 1, tr. 284',
    actionTask: 'Hoàn thành trọn vẹn một lời hứa mà mình đã cam kết với nhân dân hoặc gia đình.',
    reflectionQuestion: 'Giữa lời nói và việc làm thực tế của mình có khoảng cách nào chưa?',
    points: 15,
    badgeName: 'Lời Hứa Son Sắt',
    badgeIcon: '⭐',
  },
  {
    day: 11,
    title: 'Rèn luyện thân thể theo gương Bác',
    pillar: 'Bản lĩnh, đổi mới, sáng tạo',
    quote: 'Mỗi một người dân yếu ớt, tức là cả nước yếu ớt, mỗi một người dân mạnh khỏe, tức là cả nước mạnh khỏe.',
    quoteSource: 'Sức khỏe và thể dục (1946), Toàn tập, Tập 4, tr. 241',
    actionTask: 'Dành ít nhất 30 phút đi bộ, chạy bộ hoặc tập thể dục ngoài trời nâng cao sức khỏe.',
    reflectionQuestion: 'Mình đã duy trì thói quen sống lành mạnh để có đủ năng lượng phụng sự nhân dân chưa?',
    points: 10,
    badgeName: 'Sức Sống Khỏe Khoắn',
    badgeIcon: '🏃',
  },
  {
    day: 12,
    title: 'Giữ gìn môi trường xanh - sạch - đẹp tại khu dân cư',
    pillar: 'Yêu nước, tôn trọng Nhân dân',
    quote: 'Mùa xuân là Tết trồng cây, làm cho đất nước càng ngày càng xuân.',
    quoteSource: 'Tết trồng cây (1960), Toàn tập, Tập 12, tr. 437',
    actionTask: 'Tham gia quét dọn ngõ phố, nhặt rác hoặc trồng thêm một chậu cây xanh tại nơi ở.',
    reflectionQuestion: 'Không gian sống xung quanh mình đã thực sự văn minh, sạch sẽ chưa?',
    points: 15,
    badgeName: 'Mầm Xanh Môi Trường',
    badgeIcon: '🌿',
  },
  {
    day: 13,
    title: 'Phụng sự nhân dân không màng danh lợi',
    pillar: 'Cần, kiệm, liêm, chính',
    quote: 'Cán bộ Đảng, cán bộ chính quyền không phải là "quan cách mạng" để đè đầu cưỡi cổ nhân dân.',
    quoteSource: 'Nói chuyện tại Hội nghị cán bộ toàn quốc (1948), Toàn tập, Tập 5, tr. 74',
    actionTask: 'Xử lý công việc của dân vượt tiến độ quy định mà không đòi hỏi bất kỳ sự đền đáp nào.',
    reflectionQuestion: 'Khi giải quyết công việc, động cơ đầu tiên của mình là trách nhiệm hay danh tiếng cá nhân?',
    points: 15,
    badgeName: 'Người Đầy Tớ Trung Thành',
    badgeIcon: '🛡️',
  },
  {
    day: 14,
    title: 'Tổng kết tuần 2: Nâng tầm chuẩn mực Đạo đức công vụ',
    pillar: 'Gương mẫu, khiêm tốn',
    quote: 'Đạo đức cách mạng không phải trên trời sa xuống. Nó do đấu tranh, rèn luyện bền bỉ hàng ngày mà phát triển và củng cố.',
    quoteSource: 'Đạo đức cách mạng (1958), Toàn tập, Tập 11, tr. 612',
    actionTask: 'Tự đánh giá lại 5 chuẩn mực của Quy định 144-QĐ/TW trong 2 tuần vừa qua.',
    reflectionQuestion: 'Mình đã cảm thấy tâm hồn thanh thản và phong cách làm việc đĩnh đạc hơn chưa?',
    points: 20,
    badgeName: 'Chiến Sĩ Tuần 2',
    badgeIcon: '🎖️',
  },
  {
    day: 15,
    title: 'Bảo vệ lẽ phải & Đấu tranh với tiêu cực',
    pillar: 'Bản lĩnh, đổi mới, sáng tạo',
    quote: 'Dũng cảm đấu tranh với khuyết điểm của mình và của người khác, không nể nang, không xuê xoa.',
    quoteSource: 'Sửa đổi lối làm việc (1947), Toàn tập, Tập 5, tr. 301',
    actionTask: 'Thẳng thắn góp ý chân thành một hành vi chưa chuẩn mực trong cuộc họp hoặc sinh hoạt.',
    reflectionQuestion: 'Mình có im lặng trước cái sai vì sợ đụng chạm không?',
    points: 20,
    badgeName: 'Lá Chắn Chính Trực',
    badgeIcon: '⚔️',
  },
  {
    day: 16,
    title: 'Tôn trọng phụ nữ và bình đẳng gia đình',
    pillar: 'Yêu nước, tôn trọng Nhân dân',
    quote: 'Non sông gấm vóc Việt Nam do phụ nữ ta, trẻ cũng như già, ra sức dệt thêu mà thêm tốt đẹp, rực rỡ.',
    quoteSource: 'Nói chuyện tại Đại hội phụ nữ toàn quốc (1950), Toàn tập, Tập 6, tr. 431',
    actionTask: 'Chủ động chia sẻ việc nhà với người thân trong gia đình hoặc hỗ trợ đồng nghiệp nữ.',
    reflectionQuestion: 'Gia đình mình đã thực sự là tổ ấm văn hóa kiểu mẫu chưa?',
    points: 15,
    badgeName: 'Ấm Áp Gia Đình',
    badgeIcon: '🏡',
  },
  {
    day: 17,
    title: 'Chăm sóc và giáo dục thế hệ măng non',
    pillar: 'Yêu nước, tôn trọng Nhân dân',
    quote: 'Trẻ em như búp trên cành, biết ăn ngủ, biết học hành là ngoan.',
    quoteSource: 'Kêu gọi trẻ em (1941), Toàn tập, Tập 3, tr. 228',
    actionTask: 'Dành 1 giờ kể chuyện lịch sử Bác Hồ cho con cháu hoặc thiếu nhi trong xóm.',
    reflectionQuestion: 'Mình đã làm gương sáng về lối sống cho con em noi theo chưa?',
    points: 15,
    badgeName: 'Ươm Mầm Tương Lai',
    badgeIcon: '👶',
  },
  {
    day: 18,
    title: 'Khiêm tốn, học hỏi từ đồng chí, đồng nghiệp',
    pillar: 'Gương mẫu, khiêm tốn',
    quote: 'Tự kiêu tự đại là kẻ thù số một của tiến bộ. Người ta ai cũng có cái hay để mình học tập.',
    quoteSource: 'Nói chuyện tại Hội nghị chiến sĩ thi đua (1952), Toàn tập, Tập 7, tr. 407',
    actionTask: 'Chủ động hỏi han, học một kinh nghiệm xử lý công việc hay từ một đồng nghiệp trẻ hơn.',
    reflectionQuestion: 'Cái tôi của mình có đang ngăn cản mình học hỏi những điều mới mẻ không?',
    points: 15,
    badgeName: 'Bông Lúa Uốn Mình',
    badgeIcon: '🌾',
  },
  {
    day: 19,
    title: 'Thực hành văn hóa ứng xử trên không gian mạng',
    pillar: 'Đoàn kết, kỷ cương',
    quote: 'Nói viết phải thiết thực, rõ ràng, không hoa mỹ rỗng tuếch, bảo vệ chân lý và đường lối đúng đắn.',
    quoteSource: 'Nói chuyện với cán bộ tuyên truyền (1953), Toàn tập, Tập 8, tr. 210',
    actionTask: 'Chia sẻ 1 thông điệp tích cực, 1 tấm gương người tốt việc tốt hoặc hình ảnh đẹp về đất nước trên mạng xã hội.',
    reflectionQuestion: 'Những bình luận, tương tác trên mạng của mình hôm nay có mang tính xây dựng không?',
    points: 15,
    badgeName: 'Không Gian Mạng Trong Sạch',
    badgeIcon: '🌐',
  },
  {
    day: 20,
    title: 'Kiểm tra lại toàn bộ công việc chưa hoàn tất',
    pillar: 'Cần, kiệm, liêm, chính',
    quote: 'Làm việc gì cũng phải có đầu có đuôi, có chuẩn bị, có thực hiện và có tổng kết.',
    quoteSource: 'Sửa đổi lối làm việc (1947), Toàn tập, Tập 5, tr. 320',
    actionTask: 'Rà soát danh mục công việc tháng này, giải quyết dứt điểm các việc còn tồn đọng.',
    reflectionQuestion: 'Mình có để hồ sơ công việc nào bị ngâm trễ không lý do chính đáng không?',
    points: 20,
    badgeName: 'Bền Bỉ Kiên Định',
    badgeIcon: '🎯',
  },
  {
    day: 21,
    title: 'Ngày Vinh Quang: Hoàn thành 21 Ngày Học Bác & Nhận Chứng Nhận',
    pillar: 'Gương mẫu, khiêm tốn',
    quote: 'Không có việc gì khó, chỉ sợ lòng không bền. Đào núi và lấp biển, quyết chí ắt làm nên.',
    quoteSource: 'Tặng thanh niên xung phong (1951), Toàn tập, Tập 6, tr. 95',
    actionTask: 'Viết một đoạn nhật ký ngắn (3-5 câu) về sự thay đổi của bản thân sau 21 ngày và xuất Giấy Chứng Nhận Điện Tử.',
    reflectionQuestion: '21 ngày qua đã trở thành thói quen sống và làm việc suốt đời của mình như thế nào?',
    points: 30,
    badgeName: 'Đảng Viên Tiên Phong 2026',
    badgeIcon: '🏆',
  },
];

// ============================================================================
// 2. SỔ TAY SINH HOẠT CHI BỘ ĐIỆN TỬ (CHIBO DIGITAL POCKET)
// ============================================================================
export interface ChiBoMonthlyPlan {
  month: number;
  themeTitle: string;
  centralDirective: string;
  coreQuote: string;
  quoteSource: string;
  suggestedAgenda: string[];
  actionTarget: string;
  bulletinHighlights: string[];
}

export const CHI_BO_ANNUAL_PLANS: ChiBoMonthlyPlan[] = [
  {
    month: 1,
    themeTitle: 'Tháng 1: Mùa Xuân Nghĩ Về Đảng — Tự Soi Tự Sửa Đầu Năm',
    centralDirective: 'Quán triệt Nghị quyết đầu năm gắn với 5 chuẩn mực đạo đức Quy định 144-QĐ/TW',
    coreQuote: 'Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, chí công vô tư.',
    quoteSource: 'Di chúc (1969), Toàn tập, Tập 15, tr. 622',
    suggestedAgenda: [
      '1. Thông tin thời sự đầu năm và tình hình an ninh trật tự địa bàn khu phố.',
      '2. Đánh giá kết quả chăm lo Tết cho các đối tượng chính sách, người nghèo.',
      '3. Từng đảng viên ký cam kết tu dưỡng rèn luyện theo Quy định 144-QĐ/TW năm 2026.',
      '4. Triển khai kế hoạch xây dựng Chi bộ 4 tốt.',
    ],
    actionTarget: '100% đảng viên hoàn thành bản cam kết tu dưỡng và không có hộ nghèo nào không có Tết.',
    bulletinHighlights: [
      'Gắn kết sinh hoạt chi bộ với công tác dân vận khéo tại khu dân cư.',
      'Đẩy mạnh số hóa tài liệu sinh hoạt chi bộ qua mã QR.',
    ],
  },
  {
    month: 2,
    themeTitle: 'Tháng 2: Kỷ Niệm 96 Năm Ngày Thành Lập Đảng (03/02/1930)',
    centralDirective: 'Tuyên truyền truyền thống vẻ vang của Đảng và vai trò sáng lập của Lãnh tụ Nguyễn Ái Quốc',
    coreQuote: 'Đảng không phải là một tổ chức để làm quan phát tài. Đảng phải làm tròn nhiệm vụ giải phóng dân tộc, làm cho Tổ quốc giàu mạnh, đồng bào sung sướng.',
    quoteSource: 'Bài nói tại Hội nghị cán bộ (1953), Toàn tập, Tập 8, tr. 280',
    suggestedAgenda: [
      '1. Sinh hoạt chuyên đề: 96 năm cờ Đảng soi sáng con đường cách mạng.',
      '2. Tuyên dương đảng viên hoàn thành xuất sắc nhiệm vụ và kết nạp đảng viên mới.',
      '3. Thảo luận giải pháp nâng cao chất lượng sinh hoạt chi bộ khu phố.',
    ],
    actionTarget: 'Tổ chức sinh hoạt chuyên đề kỷ niệm ngày thành lập Đảng tại Di tích Nhà truyền thống.',
    bulletinHighlights: [
      'Giới thiệu tác phẩm Đường Kách mệnh (1927) và Cương lĩnh chính trị đầu tiên.',
    ],
  },
  {
    month: 3,
    themeTitle: 'Tháng 3: Tháng Thanh Niên & Công Tác Dân Vận Khéo',
    centralDirective: 'Phát huy vai trò xung kích của đoàn viên thanh niên và công tác dân vận của Đảng',
    coreQuote: 'Dân vận kém thì việc gì cũng kém. Dân vận khéo thì việc gì cũng thành công.',
    quoteSource: 'Dân vận (1949), Toàn tập, Tập 6, tr. 232',
    suggestedAgenda: [
      '1. Đánh giá hoạt động Tháng Thanh niên và các công trình thanh niên tại phường.',
      '2. Chi bộ phân công đảng viên phụ trách giúp đỡ quần chúng ưu tú và hộ gia đình khó khăn.',
      '3. Thảo luận mô hình Tuyến đường văn minh đô thị.',
    ],
    actionTarget: 'Giới thiệu ít nhất 1 quần chúng ưu tú trẻ tuổi cho Đảng xem xét kết nạp.',
    bulletinHighlights: [
      'Thực hành phong cách trọng dân, gần dân, hiểu dân, học dân và có trách nhiệm với dân.',
    ],
  },
  {
    month: 4,
    themeTitle: 'Tháng 4: Đại Thắng Mùa Xuân & Khát Vọng Thống Nhất Non Sông',
    centralDirective: 'Giáo dục truyền thống cách mạng hào hùng nhân kỷ niệm 30/4 và Ngày giải phóng Thủ Dầu Một',
    coreQuote: 'Nước Việt Nam là một, dân tộc Việt Nam là một. Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi.',
    quoteSource: 'Tuyên bố với quốc dân (1946), Toàn tập, Tập 4, tr. 280',
    suggestedAgenda: [
      '1. Gặp mặt, tri ân các cựu chiến binh, gia đình liệt sĩ và người có công tại khu phố.',
      '2. Kể chuyện lịch sử ngày 30/4/1975 giải phóng thị xã Thủ Dầu Một.',
      '3. Tổ chức cho đảng viên tham quan Bảo tàng và Không gian Văn hóa Hồ Chí Minh 3D.',
    ],
    actionTarget: 'Vận động 100% hộ gia đình treo cờ Tổ quốc trang trọng trong dịp lễ 30/4 - 01/5.',
    bulletinHighlights: [
      'Phát huy tinh thần chiến thắng 30/4 vào công cuộc phát triển kinh tế - văn hóa cơ sở.',
    ],
  },
  {
    month: 5,
    themeTitle: 'Tháng 5: Kỷ Niệm 136 Năm Ngày Sinh Bác Hồ (19/5/1890)',
    centralDirective: 'Sinh hoạt chuyên đề cao điểm Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh',
    coreQuote: 'Người cách mạng phải có đạo đức cách mạng làm nền tảng, mới hoàn thành được nhiệm vụ cách mạng vẻ vang.',
    quoteSource: 'Đạo đức cách mạng (1958), Toàn tập, Tập 11, tr. 611',
    suggestedAgenda: [
      '1. Báo cáo sơ kết 01 năm thực hiện Kết luận 01-KL/TW và Quy định 144-QĐ/TW tại Chi bộ.',
      '2. Biểu dương các gương điển hình tiên tiến trong học tập Bác tại khu dân cư.',
      '3. Tổ chức dâng hoa tưởng niệm Bác tại Không gian văn hóa cơ sở.',
    ],
    actionTarget: 'Chi bộ đăng ký 01 công trình / mô hình cụ thể dâng lên Bác nhân dịp 19/5.',
    bulletinHighlights: [
      'Tập trung bồi dưỡng 5 chuẩn mực đạo đức cách mạng cho từng cán bộ, đảng viên.',
    ],
  },
  {
    month: 6,
    themeTitle: 'Tháng 6: Thi Đua Ái Quốc & Đạo Đức Công Vụ',
    centralDirective: 'Hưởng ứng Lời kêu gọi Thi đua ái quốc (11/6/1948) và xây dựng văn hóa công sở liêm chính',
    coreQuote: 'Thi đua là yêu nước, yêu nước thì phải thi đua. Và những người thi đua là những người yêu nước nhất.',
    quoteSource: 'Lời kêu gọi thi đua ái quốc (1948), Toàn tập, Tập 5, tr. 558',
    suggestedAgenda: [
      '1. Sơ kết công tác 6 tháng đầu năm của chi bộ và phương hướng 6 tháng cuối năm.',
      '2. Đánh giá chất lượng phục vụ nhân dân của đội ngũ cán bộ, công chức là đảng viên.',
      '3. Phát động đợt thi đua cao điểm chào mừng ngày chuyển đổi số địa phương.',
    ],
    actionTarget: 'Không có cán bộ, đảng viên nào bị nhân dân phản ánh về thái độ nhũng nhiễu, tiêu cực.',
    bulletinHighlights: [
      'Tự soi rọi tinh thần Cần - Kiệm - Liêm - Chính trong xử lý công vụ.',
    ],
  },
  {
    month: 7,
    themeTitle: 'Tháng 7: Uống Nước Nhớ Nguồn & Đền Ơn Đáp Nghĩa (27/7)',
    centralDirective: 'Tri ân các anh hùng liệt sĩ, thương bệnh binh và gia đình có công với cách mạng',
    coreQuote: 'Thương binh, bệnh binh, gia đình liệt sĩ là những người có công với Tổ quốc, với nhân dân. Bổn phận của chúng ta là phải biết ơn, thương yêu và giúp đỡ họ.',
    quoteSource: 'Thư gửi Ban vận động thương binh (1947), Toàn tập, Tập 5, tr. 204',
    suggestedAgenda: [
      '1. Phân công đảng viên đến thăm hỏi, tặng quà các gia đình thương binh, liệt sĩ.',
      '2. Tham gia dâng hương tại Nghĩa trang Liệt sĩ và Nhà bia tưởng niệm.',
      '3. Rà soát việc thực hiện chính sách bảo trợ xã hội trên địa bàn khu phố.',
    ],
    actionTarget: '100% gia đình chính sách trên địa bàn khu phố được thăm hỏi ân cần, chu đáo.',
    bulletinHighlights: [
      'Truyền thống nghĩa tình ngàn đời của dân tộc ta là sức mạnh vô địch.',
    ],
  },
  {
    month: 8,
    themeTitle: 'Tháng 8: Mùa Thu Cách Mạng — Tinh Thần Độc Lập Tự Cường',
    centralDirective: 'Kỷ niệm Cách mạng Tháng Tám (19/8) và ngày truyền thống Công an Nhân dân',
    coreQuote: 'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
    quoteSource: 'Lời kêu gọi toàn quốc kháng chiến (1946), Toàn tập, Tập 4, tr. 534',
    suggestedAgenda: [
      '1. Tuyên truyền ý nghĩa lịch sử Cách mạng Tháng Tám và bài học chớp thời cơ.',
      '2. Đánh giá phong trào Toàn dân bảo vệ an ninh Tổ quốc tại khu dân cư.',
      '3. Thảo luận các giải pháp phòng chống tội phạm, tệ nạn xã hội.',
    ],
    actionTarget: 'Xây dựng khu phố đạt tiêu chuẩn an toàn về an ninh trật tự.',
    bulletinHighlights: [
      'Khơi dậy ngọn lửa tự hào dân tộc và ý chí tự lực tự cường trong mỗi đảng viên.',
    ],
  },
  {
    month: 9,
    themeTitle: 'Tháng 9: Khắc Ghi Di Chúc Thiêng Liêng Của Bác Hồ',
    centralDirective: 'Học tập Di chúc Chủ tịch Hồ Chí Minh và kỷ niệm Ngày Quốc khánh 02/9',
    coreQuote: 'Điều mong muốn cuối cùng của tôi là: Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh.',
    quoteSource: 'Di chúc (1969), Toàn tập, Tập 15, tr. 624',
    suggestedAgenda: [
      '1. Đọc lại toàn văn Bản Di chúc của Bác Hồ và liên hệ thực tiễn tại Chi bộ.',
      '2. Thảo luận chuyên đề: Đoàn kết trong Đảng là sinh mệnh của Đảng.',
      '3. Kiểm điểm tiến độ thực hiện các chỉ tiêu nghị quyết chi bộ năm 2026.',
    ],
    actionTarget: 'Tất cả đảng viên thuộc lòng những lời dặn cốt lõi trong Di chúc của Bác.',
    bulletinHighlights: [
      'Di chúc là ngọn đuốc soi đường cho công cuộc xây dựng, chỉnh đốn Đảng.',
    ],
  },
  {
    month: 10,
    themeTitle: 'Tháng 10: Dân Vận Khéo Trong Thời Kỳ Số Hóa',
    centralDirective: 'Đổi mới công tác dân vận của Đảng trong bối cảnh chính quyền điện tử và đô thị thông minh',
    coreQuote: 'Lực lượng của dân rất to. Việc dân vận rất quan trọng. Dân vận khéo thì việc gì cũng thành công.',
    quoteSource: 'Dân vận (1949), Toàn tập, Tập 6, tr. 234',
    suggestedAgenda: [
      '1. Triển khai các nền tảng số của phường (App phản ánh hiện trường, dịch vụ công trực tuyến).',
      '2. Đảng viên đi đầu hướng dẫn người cao tuổi, bà con nhân dân cài đặt và sử dụng dịch vụ số.',
      '3. Đánh giá hiệu quả mô hình Tổ công nghệ số cộng đồng.',
    ],
    actionTarget: 'Tối thiểu 85% thủ tục hành chính của bà con được thực hiện trực tuyến.',
    bulletinHighlights: [
      'Dân vận số là phương thức mới để gần dân và giải quyết nhanh chóng nguyện vọng của dân.',
    ],
  },
  {
    month: 11,
    themeTitle: 'Tháng 11: Ngày Hội Đại Đoàn Kết Toàn Dân Tộc (18/11)',
    centralDirective: 'Phát huy sức mạnh khối đại đoàn kết toàn dân tộc tại khu dân cư',
    coreQuote: 'Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.',
    quoteSource: 'Di chúc (1969), Toàn tập, Tập 15, tr. 622',
    suggestedAgenda: [
      '1. Chuẩn bị tổ chức Ngày hội Đại đoàn kết toàn dân tộc ở khu dân cư.',
      '2. Biểu dương các gia đình văn hóa tiêu biểu và người tốt việc tốt.',
      '3. Đóng góp ý kiến cho Ban công tác Mặt trận và các đoàn thể khu phố.',
    ],
    actionTarget: '100% hộ dân tham gia Ngày hội Đại đoàn kết với không khí phấn khởi, gắn kết.',
    bulletinHighlights: [
      'Tình làng nghĩa xóm, tương thân tương ái là cội nguồn của sự bình yên và phát triển.',
    ],
  },
  {
    month: 12,
    themeTitle: 'Tháng 12: Kiểm Điểm Đánh Giá Cuối Năm & Quân Đội Nhân Dân (22/12)',
    centralDirective: 'Kiểm điểm, đánh giá xếp loại chất lượng tổ chức đảng và đảng viên cuối năm nghiêm túc, thực chất',
    coreQuote: 'Muốn đoàn kết chặt chẽ thì phải phê bình và tự phê bình thật thà. Phải thành khẩn, không nên giấu giếm khuyết điểm.',
    quoteSource: 'Nói chuyện tại Hội nghị chỉnh huấn (1953), Toàn tập, Tập 8, tr. 102',
    suggestedAgenda: [
      '1. Kiểm điểm tập thể Chi ủy và đánh giá, xếp loại đảng viên theo Quy định 144-QĐ/TW.',
      '2. Lắng nghe ý kiến nhận xét của cấp ủy nơi cư trú (theo Quy định 213-QĐ/TW).',
      '3. Biểu dương, khen thưởng các đảng viên xuất sắc năm 2026.',
      '4. Đề ra phương hướng, mục tiêu trọng tâm cho năm mới.',
    ],
    actionTarget: 'Chi bộ đạt danh hiệu "Hoàn thành xuất sắc nhiệm vụ", 100% đảng viên hoàn thành tốt nhiệm vụ trở lên.',
    bulletinHighlights: [
      'Đánh giá đúng thực chất, không hình thức, lấy sự hài lòng của nhân dân làm thước đo cao nhất.',
    ],
  },
];

// ============================================================================
// 3. KÍNH LÚP SOI BẢN THẢO BÚT TÍCH BÁC HỒ (HANDWRITING DEEP-ZOOM)
// ============================================================================
export interface HandwritingDocument {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  significance: string;
  rawImageUrl: string;
  fallbackImageUrl: string;
  dimensions: string;
  totalAnnotations: number;
  annotatedHotspots: {
    id: string;
    xPercent: number; // Tọa độ % trên ảnh
    yPercent: number;
    label: string;
    originalWord: string;
    revisedWord: string;
    explanation: string; // Lý do Bác gạch xóa sửa từ
    moralLesson: string; // Bài học về sự cẩn trọng ngôn từ
  }[];
}

export const HISTORICAL_HANDWRITING_COLLECTION: HandwritingDocument[] = [
  {
    id: 'hw_dichuc_1965',
    title: 'Bản Thảo Di Chúc Viết Tay (Năm 1965)',
    subtitle: 'Tài liệu Tuyệt đối bí mật khởi thảo đúng dịp sinh nhật lần thứ 75 của Bác',
    year: '10 – 15/5/1965',
    significance: 'Bảo vật Quốc gia số 1. Khởi nguồn của bản Di chúc thiêng liêng, thể hiện tầm nhìn xuyên thế kỷ và tình thương bao la.',
    rawImageUrl: '/assets/hcm-space/di-chuc-1965-handwriting.png',
    fallbackImageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    dimensions: 'Khổ giấy A4, viết bằng mực xanh tím và bút mực Parker',
    totalAnnotations: 4,
    annotatedHotspots: [
      {
        id: 'hs_01',
        xPercent: 28,
        yPercent: 22,
        label: 'Về chỉnh đốn Đảng',
        originalWord: 'Đảng ta cần phải củng cố...',
        revisedWord: 'Trước hết nói về Đảng... việc cần phải làm trước tiên là chỉnh đốn lại Đảng',
        explanation: 'Bác gạch bỏ chữ "củng cố" mang tính hành chính đơn thuần để thay bằng "chỉnh đốn lại Đảng", đặt công tác xây dựng Đảng lên vị trí then chốt hàng đầu cho sự tồn vong của chế độ.',
        moralLesson: 'Bài học về tính tiên quyết của công tác xây dựng và chỉnh đốn Đảng trong sạch, vững mạnh.',
      },
      {
        id: 'hs_02',
        xPercent: 55,
        yPercent: 48,
        label: 'Về thế hệ thanh niên',
        originalWord: 'Đoàn viên và thanh niên nói chung là hăng hái...',
        revisedWord: 'Đoàn viên và thanh niên ta nói chung là tốt... Bồi dưỡng thế hệ cách mạng cho đời sau là một việc rất quan trọng và rất cần thiết',
        explanation: 'Bác khẳng định bản chất "tốt" của tuổi trẻ và dùng hai từ khẳng định mạnh mẽ "rất quan trọng và rất cần thiết" để nhắc nhở toàn Đảng không bao giờ được lơ là chăm lo bồi dưỡng thanh niên.',
        moralLesson: 'Niềm tin tuyệt đối và trách nhiệm lớn lao của các cấp ủy Đảng đối với thế hệ tương lai.',
      },
      {
        id: 'hs_03',
        xPercent: 72,
        yPercent: 68,
        label: 'Về nhân dân lao động',
        originalWord: 'Nhân dân lao động nước ta...',
        revisedWord: 'Nhân dân lao động ta bao đời chịu đựng gian khổ... Đảng phải có kế hoạch thật tốt để phát triển kinh tế và văn hóa, nhằm không ngừng nâng cao đời sống của nhân dân',
        explanation: 'Bác nhấn mạnh chữ "bao đời chịu đựng gian khổ" với lòng thương cảm sâu sắc và chỉ thị "Đảng phải có kế hoạch thật tốt", không được nói chung chung mà phải hành động thiết thực chăm lo đời sống dân sinh.',
        moralLesson: 'Tư tưởng Dân là gốc, mục đích tối thượng của cách mạng là đem lại hạnh phúc thực sự cho nhân dân.',
      },
      {
        id: 'hs_04',
        xPercent: 40,
        yPercent: 88,
        label: 'Về phong trào cộng sản quốc tế',
        originalWord: 'Tôi mong rằng...',
        revisedWord: 'Tôi mong rằng Đảng ta sẽ ra sức hoạt động, góp phần đắc lực vào việc khôi phục lại khối đoàn kết giữa các đảng anh em',
        explanation: 'Bác cẩn trọng chọn từ "ra sức hoạt động, góp phần đắc lực" với tinh thần trách nhiệm quốc tế vô sản trong sáng, kiên trì hàn gắn bất đồng.',
        moralLesson: 'Tinh thần quốc tế trong sáng, hòa hiếu và trách nhiệm cao của ngoại giao Việt Nam.',
      },
    ],
  },
  {
    id: 'hw_tuyenngon_1945',
    title: 'Bản Thảo Tuyên Ngôn Độc Lập (Năm 1945)',
    subtitle: 'Soạn thảo tại căn gác số 48 Hàng Ngang, Hà Nội',
    year: '28 – 30/8/1945',
    significance: 'Bảo vật Quốc gia. Văn kiện pháp lý lịch sử khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    rawImageUrl: '/assets/hcm-space/tuyen-ngon-1945-manuscript.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    dimensions: 'Khổ giấy mỏng, đánh máy bằng máy chữ Hermes Baby kèm bút tích sửa tay bằng bút chì đỏ và mực đen',
    totalAnnotations: 3,
    annotatedHotspots: [
      {
        id: 'tn_01',
        xPercent: 32,
        yPercent: 18,
        label: 'Mở đầu Tuyên ngôn',
        originalWord: 'Tất cả mọi người sinh ra đều có quyền bình đẳng...',
        revisedWord: 'Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được...',
        explanation: 'Bác khéo léo trích dẫn Tuyên ngôn Độc lập Mỹ 1776 và Tuyên ngôn Nhân quyền Pháp 1789 để "gậy ông đập lưng ông", khẳng định tính chính danh không thể chối cãi của nền độc lập Việt Nam.',
        moralLesson: 'Nghệ thuật lập luận đỉnh cao, biến chân lý của nhân loại thành vũ khí bảo vệ độc lập dân tộc.',
      },
      {
        id: 'tn_02',
        xPercent: 50,
        yPercent: 52,
        label: 'Mở rộng từ quyền con người sang quyền dân tộc',
        originalWord: 'Đó là quyền của con người...',
        revisedWord: 'Suy rộng ra, câu ấy có ý nghĩa là: Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do',
        explanation: 'Đây là cống hiến lý luận vĩ đại của Bác: Nâng tầm từ quyền tự do cá nhân lên thành QUYỀN TỰ QUYẾT VÀ BÌNH ĐẲNG CỦA MỌI DÂN TỘC bị áp bức trên thế giới.',
        moralLesson: 'Tầm vóc tư tưởng giải phóng dân tộc mang giá trị thời đại sâu sắc.',
      },
      {
        id: 'tn_03',
        xPercent: 65,
        yPercent: 82,
        label: 'Lời thề giữ vững độc lập',
        originalWord: 'Nhân dân Việt Nam quyết tâm giữ vững...',
        revisedWord: 'Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!',
        explanation: 'Bác dùng các từ ngữ dứt khoát "Toàn thể dân tộc", "tất cả tinh thần và lực lượng, tính mạng và của cải", thể hiện ý chí sắt đá không có gì lay chuyển nổi.',
        moralLesson: 'Ý chí quyết tử cho Tổ quốc quyết sinh, tinh thần tự lực tự cường cao độ.',
      },
    ],
  },
];

// ============================================================================
// 4. TUYẾN DU LỊCH ĐỎ VỀ NGUỒN THỦ DẦU MỘT (RED TOUR NAVIGATOR)
// ============================================================================
export interface RedTourStop {
  stopOrder: number;
  name: string;
  category: 'Di tích Quốc gia' | 'Nhà truyền thống' | 'Nhà cổ trăm năm' | 'Làng nghề truyền thống';
  address: string;
  distanceFromStart: string; // Khoảng cách từ điểm xuất phát
  estimatedDuration: string; // Thời gian tham quan gợi ý
  imageUrl: string;
  fallbackImageUrl: string;
  historicSignificance: string;
  heritageConnection: string; // Mối liên kết với Bác Hồ và Cách mạng
  audioTourGuide: string;
  coordinates: { lat: number; lng: number };
}

export const RED_TOUR_THU_DAU_MOT: RedTourStop[] = [
  {
    stopOrder: 1,
    name: 'Di Tích Lịch Sử Quốc Gia Chùa Hội Khánh',
    category: 'Di tích Quốc gia',
    address: 'Số 35 đường Yersin, Phường Phú Cường, Thủ Dầu Một, Bình Dương',
    distanceFromStart: '0 km (Điểm xuất phát)',
    estimatedDuration: '45 phút',
    imageUrl: '/assets/hcm-space/card-khong-gian-3d.jpg',
    fallbackImageUrl: '/assets/hcm-space/khu-pho.jpg',
    historicSignificance: 'Ngôi chùa cổ xây dựng từ năm 1741, giữ kỷ lục tượng Phật nằm trên mái dài nhất châu Á. Nơi cụ Phó bảng Nguyễn Sinh Sắc - thân sinh Chủ tịch Hồ Chí Minh - từng dừng chân hoạt động.',
    heritageConnection: 'Trong giai đoạn 1923–1926, cụ Nguyễn Sinh Sắc cùng Hòa thượng Từ Văn và các nhà nho yêu nước sáng lập "Hội Danh Dự" tại đây để truyền bá lòng yêu nước, tinh thần tương thân tương ái và bốc thuốc chữa bệnh cho đồng bào nghèo.',
    audioTourGuide: 'Chào mừng quý vị đến với Chùa Hội Khánh, điểm di tích số 1 trong Tour Về Nguồn Thủ Dầu Một. Nơi đây từng in dấu chân người cha kính yêu của Bác Hồ...',
    coordinates: { lat: 10.9785, lng: 106.6621 },
  },
  {
    stopOrder: 2,
    name: 'Nhà Truyền Thống Phường & Thành Phố Thủ Dầu Một',
    category: 'Nhà truyền thống',
    address: 'Trung tâm Phường Thủ Dầu Một, Bình Dương',
    distanceFromStart: '1.2 km',
    estimatedDuration: '40 phút',
    imageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    fallbackImageUrl: '/assets/hcm-space/ueh-3d.jpg',
    historicSignificance: 'Nơi lưu giữ hơn 500 hiện vật, tài liệu và hình ảnh quý giá về lịch sử đấu tranh kiên cường của quân và dân Đất Thủ qua hai cuộc kháng chiến.',
    heritageConnection: 'Trưng bày chuyên đề về cuộc Khởi nghĩa giành chính quyền ngày 25/8/1945 tại Thủ Dầu Một theo lời hiệu triệu của Mặt trận Việt Minh và Bác Hồ, cùng ký ức chiến thắng mùa Xuân 1975.',
    audioTourGuide: 'Nhà Truyền Thống là pho sử sống động về tinh thần bất khuất của Đảng bộ và nhân dân Thủ Dầu Một, nơi thế hệ hôm nay học tập và noi gương các bậc tiền bối cách mạng...',
    coordinates: { lat: 10.9812, lng: 106.6645 },
  },
  {
    stopOrder: 3,
    name: 'Di Tích Kiến Trúc Nghệ Thuật Nhà Cổ Trần Văn Vàng',
    category: 'Nhà cổ trăm năm',
    address: 'Đường 30/4, Phường Phú Cường, Thủ Dầu Một, Bình Dương',
    distanceFromStart: '2.1 km',
    estimatedDuration: '30 phút',
    imageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    fallbackImageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    historicSignificance: 'Ngôi nhà rường Nam Bộ tiêu biểu được xây dựng bằng gỗ quý chạm trổ hoa văn tinh xảo, thể hiện tài hoa đỉnh cao của nghệ nhân Đất Thủ xưa.',
    heritageConnection: 'Nơi từng là điểm nuôi giấu cán bộ cách mạng bí mật trong thời kỳ kháng chiến chống thực dân Pháp, minh chứng cho lòng kiên trung vì nước của người dân Thủ Dầu Một.',
    audioTourGuide: 'Bước vào Nhà cổ Trần Văn Vàng, quý vị không chỉ chiêm ngưỡng nét hoa văn gỗ tuyệt mỹ mà còn cảm nhận được sự chở che của lòng dân đối với cán bộ cách mạng...',
    coordinates: { lat: 10.9754, lng: 106.6598 },
  },
  {
    stopOrder: 4,
    name: 'Di Tích Lò Chén Đại Hưng (Lò Gốm Cổ Thủ Dầu Một)',
    category: 'Làng nghề truyền thống',
    address: 'Phường Tương Bình Hiệp, Thủ Dầu Một, Bình Dương',
    distanceFromStart: '4.5 km',
    estimatedDuration: '45 phút',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    fallbackImageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    historicSignificance: 'Lò gốm cổ hơn 160 năm tuổi, lưu giữ phương thức sản xuất gốm thủ công bằng lò bầu truyền thống lớn nhất Nam Bộ.',
    heritageConnection: 'Cái nôi phong trào đấu tranh của công nhân gốm sứ Thủ Dầu Một từ những năm 1930 dưới sự lãnh đạo của Chi bộ Đảng đầu tiên, kiên cường bám trụ sản xuất vừa đóng góp cho kháng chiến.',
    audioTourGuide: 'Lò gốm Đại Hưng rực lửa hơn một thế kỷ qua chính là biểu tượng cho bàn tay lao động cần cù, sáng tạo và khí chất kiên cường của công nhân lao động Đất Thủ...',
    coordinates: { lat: 11.0021, lng: 106.6489 },
  },
  {
    stopOrder: 5,
    name: 'Không Gian Văn Hóa Hồ Chí Minh 3D & Phòng Tưởng Niệm Trung Tâm',
    category: 'Nhà truyền thống',
    address: 'Trụ sở Đảng ủy - HĐND - UBND Phường Thủ Dầu Một',
    distanceFromStart: '6.0 km (Điểm tổng kết)',
    estimatedDuration: '60 phút',
    imageUrl: '/assets/hcm-space/nha-rong.jpg',
    fallbackImageUrl: '/assets/hcm-space/chandungbac.png',
    historicSignificance: 'Không gian văn hóa Hồ Chí Minh cơ sở kiểu mẫu, tích hợp công nghệ số hóa 3D thực tế ảo, thư viện Toàn tập và trạm học tập Quy định 144-QĐ/TW.',
    heritageConnection: 'Điểm hội tụ tâm huyết của toàn thể cán bộ, đảng viên và nhân dân Phường trong việc đưa tư tưởng, đạo đức, phong cách Hồ Chí Minh thấm sâu vào đời sống hàng ngày.',
    audioTourGuide: 'Điểm dừng chân cuối cùng của Tour Du Lịch Đỏ là Không Gian Văn Hóa Hồ Chí Minh số hóa, nơi mỗi chúng ta tự soi rọi và tiếp thêm sức mạnh cống hiến cho quê hương...',
    coordinates: { lat: 10.9801, lng: 106.6633 },
  },
];

// ============================================================================
// 5. TRUNG TÂM THỐNG KÊ HỌC TẬP DI SẢN (HERITAGE ANALYTICS METRICS)
// ============================================================================
export interface ChiBoAnalyticsRecord {
  chiBoId: string;
  chiBoName: string;
  totalPartyMembers: number;
  activeLearnersCount: number;
  challengeCompletedCount: number;
  quizzesPassedCount: number;
  goldenBookEntriesCount: number;
  monthlyMeetingQrScans: number;
  topLearningScore: number;
  rankBadge: 'Xuất sắc' | 'Tốt' | 'Khá';
}

export const INITIAL_CHIBO_ANALYTICS: ChiBoAnalyticsRecord[] = [
  {
    chiBoId: 'cb_01',
    chiBoName: 'Chi bộ Khu phố 1 (Phường Thủ Dầu Một)',
    totalPartyMembers: 48,
    activeLearnersCount: 47,
    challengeCompletedCount: 38,
    quizzesPassedCount: 46,
    goldenBookEntriesCount: 32,
    monthlyMeetingQrScans: 48,
    topLearningScore: 98,
    rankBadge: 'Xuất sắc',
  },
  {
    chiBoId: 'cb_02',
    chiBoName: 'Chi bộ Khu phố 2 (Phường Thủ Dầu Một)',
    totalPartyMembers: 52,
    activeLearnersCount: 50,
    challengeCompletedCount: 41,
    quizzesPassedCount: 49,
    goldenBookEntriesCount: 29,
    monthlyMeetingQrScans: 52,
    topLearningScore: 96,
    rankBadge: 'Xuất sắc',
  },
  {
    chiBoId: 'cb_03',
    chiBoName: 'Chi bộ Khu phố 3 (Phường Thủ Dầu Một)',
    totalPartyMembers: 40,
    activeLearnersCount: 38,
    challengeCompletedCount: 30,
    quizzesPassedCount: 37,
    goldenBookEntriesCount: 24,
    monthlyMeetingQrScans: 40,
    topLearningScore: 94,
    rankBadge: 'Xuất sắc',
  },
  {
    chiBoId: 'cb_04',
    chiBoName: 'Chi bộ Khu phố 4 (Phường Thủ Dầu Một)',
    totalPartyMembers: 45,
    activeLearnersCount: 42,
    challengeCompletedCount: 33,
    quizzesPassedCount: 41,
    goldenBookEntriesCount: 27,
    monthlyMeetingQrScans: 44,
    topLearningScore: 92,
    rankBadge: 'Tốt',
  },
  {
    chiBoId: 'cb_05',
    chiBoName: 'Chi bộ Quân sự Phường',
    totalPartyMembers: 18,
    activeLearnersCount: 18,
    challengeCompletedCount: 18,
    quizzesPassedCount: 18,
    goldenBookEntriesCount: 18,
    monthlyMeetingQrScans: 18,
    topLearningScore: 100,
    rankBadge: 'Xuất sắc',
  },
  {
    chiBoId: 'cb_06',
    chiBoName: 'Chi bộ Công an Phường',
    totalPartyMembers: 26,
    activeLearnersCount: 26,
    challengeCompletedCount: 25,
    quizzesPassedCount: 26,
    goldenBookEntriesCount: 26,
    monthlyMeetingQrScans: 26,
    topLearningScore: 99,
    rankBadge: 'Xuất sắc',
  },
  {
    chiBoId: 'cb_07',
    chiBoName: 'Chi bộ Trường Mầm non & Tiểu học',
    totalPartyMembers: 35,
    activeLearnersCount: 34,
    challengeCompletedCount: 29,
    quizzesPassedCount: 35,
    goldenBookEntriesCount: 31,
    monthlyMeetingQrScans: 35,
    topLearningScore: 97,
    rankBadge: 'Xuất sắc',
  },
  {
    chiBoId: 'cb_08',
    chiBoName: 'Chi bộ Cơ quan Phường',
    totalPartyMembers: 32,
    activeLearnersCount: 32,
    challengeCompletedCount: 31,
    quizzesPassedCount: 32,
    goldenBookEntriesCount: 30,
    monthlyMeetingQrScans: 32,
    topLearningScore: 99,
    rankBadge: 'Xuất sắc',
  },
];
