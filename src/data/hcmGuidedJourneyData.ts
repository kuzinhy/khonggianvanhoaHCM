// ============================================================================
// DỮ LIỆU LỘ TRÌNH HƯỚNG DẪN HỌC TẬP THEO CUỘC ĐỜI & DẤU MỐC CỦA BÁC
// Dành cho người dân tìm hiểu sâu sắc, tuần tự và tự động ghi nhớ tiến trình
// ============================================================================

import type { SpaceTab } from '../components/ProfessionalNavbar';

export interface LifeStageItem {
  id: string;
  order: number;
  period: string; // VD: 1890 – 1911
  title: string;
  subtitle: string;
  historicalMilestone: string;
  significance: string; // Ý nghĩa giáo dục để người dân thấu hiểu sâu sắc hơn
  coreLesson: string; // Bài học hành động cho nhân dân hôm nay
  targetTab: SpaceTab; // Chuyên mục chuyển đến trong hệ thống
  subContentId?: string; // ID nội dung chi tiết nếu có
  keyQuote: string;
  quoteSource: string;
  suggestedNextId: string | null;
  badgeName: string;
  badgeIcon: string;
}

export const HO_CHI_MINH_LIFE_STAGES: LifeStageItem[] = [
  {
    id: 'stage_1_tuoitho',
    order: 1,
    period: '1890 – 1911',
    title: 'Thời Niên Thiếu & Quê Hương Nam Đàn',
    subtitle: 'Nguồn cội gia đình hiếu học, lòng nhân ái và hun đúc chí lớn',
    historicalMilestone: 'Cậu bé Nguyễn Sinh Cung sinh ngày 19/5/1890 tại làng Sen, Nam Đàn, Nghệ An. Sớm thấu hiểu nỗi thống khổ của người dân mất nước dưới ách thực dân phong kiến.',
    significance: 'Giai đoạn nền tảng hình thành nhân cách: Thừa hưởng nếp sống thanh bạch, chính trực từ người cha - cụ Phó bảng Nguyễn Sinh Sắc, và đức hy sinh, tình thương bao la của người mẹ - bà Hoàng Thị Loan.',
    coreLesson: 'Bài học về đạo hiếu, nền nếp gia phong, tinh thần hiếu học và lòng trắc ẩn trước nỗi cơ cực của đồng bào nghèo.',
    targetTab: 'BIO',
    subContentId: 'ch-1',
    keyQuote: 'Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.',
    quoteSource: 'Hồ Chí Minh Toàn tập, Tập 1',
    suggestedNextId: 'stage_2_bontimduong',
    badgeName: 'Mầm Xanh Nhân Nghĩa',
    badgeIcon: '🌱',
  },
  {
    id: 'stage_2_bontimduong',
    order: 2,
    period: '1911 – 1920',
    title: 'Ra Đi Tìm Đường Cứu Nước & Tìm Thấy Chân Lý',
    subtitle: 'Bến cảng Nhà Rồng, lao động gian khổ bôn ba năm châu và đến với Luận cương Lênin',
    historicalMilestone: 'Ngày 5/6/1911, từ Bến cảng Nhà Rồng trên con tàu Đô đốc Latouche-Tréville, Người thanh niên Nguyễn Tất Thành mang tên Văn Ba bắt đầu hành trình vĩ đại qua ba đại dương, bốn châu lục.',
    significance: 'Người không đi theo lối mòn của các bậc tiền bối sang phương Đông (Đông Du) mà sang thẳng các nước phương Tây để tìm hiểu bản chất của "Tự do - Bình đẳng - Bác ái". Tháng 7/1920, Người đọc Luận cương của Lênin và tìm thấy con đường giải phóng cho dân tộc.',
    coreLesson: 'Ý chí kiên định vượt khó, tinh thần tự lực cánh sinh, dám nghĩ dám làm và tư duy đổi mới sáng tạo không ngừng.',
    targetTab: 'TDM_HOUSE',
    subContentId: 'chua-hoi-khanh',
    keyQuote: 'Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi mừng đến phát khóc lên.',
    quoteSource: 'Con đường dẫn tôi đến chủ nghĩa Lênin (1960)',
    suggestedNextId: 'stage_3_thanhlapdang',
    badgeName: 'Ngọn Lửa Tìm Đường',
    badgeIcon: '🔥',
  },
  {
    id: 'stage_3_thanhlapdang',
    order: 3,
    period: '1920 – 1930',
    title: 'Sáng Lập Đảng Cộng Sản Việt Nam',
    subtitle: 'Chuẩn bị về chính trị, tư tưởng, tổ chức và bước ngoặt mùa Xuân 1930',
    historicalMilestone: 'Người tham gia sáng lập Đảng Cộng sản Pháp (1920), xuất bản báo Người Cùng Khổ (Le Paria), viết "Bản án chế độ thực dân Pháp", tác phẩm kinh điển "Đường Kách mệnh" (1927). Đầu năm 1930 tại Hương Cảng, Người chủ trì Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam.',
    significance: 'Chấm dứt cuộc khủng hoảng sâu sắc về đường lối và tổ chức lãnh đạo phong trào giải phóng dân tộc Việt Nam suốt mấy mươi năm, mở ra bước ngoặt lịch sử quyết định mọi thắng lợi của cách mạng.',
    coreLesson: 'Bài học về sức mạnh của tổ chức, sự đoàn kết kỷ cương, lý luận gắn liền với thực tiễn cách mạng.',
    targetTab: 'BOOKS',
    subContentId: 'duong-kach-menh',
    keyQuote: 'Cách mệnh trước hết phải có cái gì? Trước hết phải có Đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức.',
    quoteSource: 'Đường Kách mệnh (1927)',
    suggestedNextId: 'stage_4_doclap1945',
    badgeName: 'Ngọn Đuốc Tiên Phong',
    badgeIcon: '⭐',
  },
  {
    id: 'stage_4_doclap1945',
    order: 4,
    period: '1930 – 1945',
    title: 'Cách Mạng Tháng Tám & Khai Sinh Nước Việt Nam Mới',
    subtitle: 'Về nguồn Pác Bó, 14 tháng ngục tù gian nan và Tuyên ngôn Độc lập 2/9/1945',
    historicalMilestone: 'Năm 1941, Bác về nước tại Pác Bó (Cao Bằng) trực tiếp lãnh đạo phong trào. Năm 1942–1943 bị giam cầm trong các nhà lao Tưởng Giới Thạch, sáng tác "Nhật ký trong tù". Tháng 8/1945, chớp thời cơ lãnh đạo Tổng khởi nghĩa thắng lợi. Ngày 2/9/1945, đọc Tuyên ngôn Độc lập tại Ba Đình.',
    significance: 'Đập tan ách thống trị thực dân phong kiến ngót một thế kỷ, khai sinh nước Việt Nam Dân chủ Cộng hòa - Nhà nước công nông đầu tiên ở Đông Nam Á. Đưa dân tộc ta bước vào kỷ nguyên độc lập, tự do.',
    coreLesson: 'Bài học dự báo và nắm bắt thời cơ; niềm tin tuyệt đối vào sức mạnh của toàn thể nhân dân; khí phách bất khuất "thà hy sinh tất cả chứ nhất định không chịu mất nước".',
    targetTab: 'BOOKS',
    subContentId: 'tuyen-ngon-doc-lap',
    keyQuote: 'Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!',
    quoteSource: 'Lời Bác dặn đồng chí Võ Nguyên Giáp tại lán Nà Nưa (1945)',
    suggestedNextId: 'stage_5_khangchien',
    badgeName: 'Ngôi Sao Độc Lập',
    badgeIcon: '🌟',
  },
  {
    id: 'stage_5_khangchien',
    order: 5,
    period: '1945 – 1954',
    title: 'Kháng Chiến Chín Năm & Chiến Thắng Điện Biên Phủ',
    subtitle: '"Lời kêu gọi toàn quốc kháng chiến" và "Lừng lẫy năm châu, chấn động địa cầu"',
    historicalMilestone: 'Ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến. Bác cùng Trung ương Đảng lên Chiến khu Việt Bắc, lãnh đạo toàn dân trường kỳ kháng chiến với tinh thần "Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh", kết thúc bằng chiến thắng lịch sử Điện Biên Phủ (7/5/1954).',
    significance: 'Chứng minh một chân lý vĩ đại: Một dân tộc dù nhỏ bé, nhưng đoàn kết một lòng, có đường lối đúng đắn thì hoàn toàn có thể đánh thắng kẻ thù xâm lược hùng mạnh.',
    coreLesson: 'Bài học về xây dựng thế trận lòng dân, tinh thần cần kiệm liêm chính thời chiến, hết lòng chăm lo cho bộ đội và dân công hỏa tuyến.',
    targetTab: 'TIMELINE',
    subContentId: 'milestone-1954',
    keyQuote: 'Không có gì quý hơn độc lập, tự do!',
    quoteSource: 'Lời kêu gọi đồng bào và chiến sĩ cả nước',
    suggestedNextId: 'stage_6_dichuc1969',
    badgeName: 'Bản Lĩnh Thép',
    badgeIcon: '🛡️',
  },
  {
    id: 'stage_6_dichuc1969',
    order: 6,
    period: '1954 – 1969',
    title: 'Xây Dựng Miền Bắc, Đấu Tranh Thống Nhất & Bản Di Chúc Thiêng Liêng',
    subtitle: 'Ngôi nhà sàn đơn sơ, đạo đức cách mạng mẫu mực và muôn vàn tình thân yêu',
    historicalMilestone: 'Lãnh đạo đồng thời hai nhiệm vụ chiến lược: Xây dựng CNXH ở miền Bắc và đấu tranh giải phóng miền Nam. Nếp sống giản dị nơi Nhà sàn Ba Đình, chăm lo từng việc lớn việc nhỏ của đất nước. Từ năm 1965 đến 1969, Bác dày công viết và sửa bản Di chúc lịch sử trước lúc đi xa ngày 2/9/1969.',
    significance: 'Di chúc là văn kiện vô giá, kết tinh trọn vẹn tư tưởng, đạo đức và phong cách Hồ Chí Minh. Người dặn dò kỹ lưỡng về chỉnh đốn Đảng, bồi dưỡng thanh niên, kế hoạch nâng cao đời sống nhân dân sau ngày hòa bình.',
    coreLesson: 'Gương mẫu khiêm tốn, chống chủ nghĩa cá nhân, nói đi đôi với làm, luôn đặt lợi ích của Đảng và của nhân dân lên trên hết, trước hết.',
    targetTab: 'BOOKS',
    subContentId: 'di-chuc',
    keyQuote: 'Điều mong muốn cuối cùng của tôi là: Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh, và góp phần xứng đáng vào sự nghiệp cách mạng thế giới.',
    quoteSource: 'Di chúc Chủ tịch Hồ Chí Minh (1969)',
    suggestedNextId: 'stage_7_thudaumot',
    badgeName: 'Trái Tim Bất Diệt',
    badgeIcon: '❤️',
  },
  {
    id: 'stage_7_thudaumot',
    order: 7,
    period: 'Hiện nay – 2026',
    title: 'Di Sản Bác Hồ Với Đất Thủ & Thực Hành Học Tập Hôm Nay',
    subtitle: 'Thực hiện Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW tại phường Thủ Dầu Một',
    historicalMilestone: 'Vùng Đất Thủ - Bình Dương tự hào là nơi thân sinh của Bác - cụ Phó bảng Nguyễn Sinh Sắc từng dừng chân tại Chùa Hội Khánh lập Hội Danh Dự gieo mầm cách mạng. Đảng bộ và nhân dân phường Thủ Dầu Một hôm nay tiếp nối truyền thống, xây dựng Không Gian Văn Hóa Hồ Chí Minh sâu rộng, thiết thực.',
    significance: 'Đưa việc học tập và làm theo tư tưởng, đạo đức, phong cách của Người trở thành thói quen tự giác, lẽ sống tự nhiên của mỗi cán bộ, đảng viên, đoàn viên, thanh niên và nhân dân địa phương.',
    coreLesson: 'Mỗi ngày làm một việc tốt vì nhân dân, rèn luyện 5 chuẩn mực đạo đức cách mạng, đoàn kết xây dựng phường Thủ Dầu Một ngày càng văn minh, giàu đẹp.',
    targetTab: 'TDM_HOUSE',
    subContentId: 'nhadatthu',
    keyQuote: 'Việc gì có lợi cho dân, ta phải hết sức làm. Việc gì có hại cho dân, ta phải hết sức tránh.',
    quoteSource: 'Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng (1945)',
    suggestedNextId: null,
    badgeName: 'Công Dân Gương Mẫu',
    badgeIcon: '🏅',
  },
];

// Helper lấy chặng tiếp theo
export function getNextLifeStage(currentStageId: string): LifeStageItem | null {
  const current = HO_CHI_MINH_LIFE_STAGES.find(s => s.id === currentStageId);
  if (!current || !current.suggestedNextId) return null;
  return HO_CHI_MINH_LIFE_STAGES.find(s => s.id === current.suggestedNextId) || null;
}
