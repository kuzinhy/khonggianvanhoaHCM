/**
 * DỮ LIỆU CHUYÊN MỤC: CÁC MẨU CHUYỆN HỌC TẬP VÀ LÀM THEO TẤM GƯƠNG BÁC HỒ
 * Dành cho mọi đối tượng: Cán bộ, Đảng viên, Công chức, Thanh niên và Toàn thể Nhân dân.
 * Nguồn tư liệu chính thống:
 * - 120 Mẩu chuyện về Bác Hồ ngắn, hay và ý nghĩa nhất (Trung tâm Công tác Xã hội TP.HCM - congtacxahoihcm.vn)
 * - Ban Tuyên giáo Trung ương & Viện Lịch sử Đảng - Học viện Chính trị Quốc gia Hồ Chí Minh
 * - Hồ Chí Minh Toàn tập (15 tập, NXB Chính trị Quốc gia Sự thật)
 * - Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch & Bảo tàng Hồ Chí Minh
 * - Hồi ký đồng chí Vũ Kỳ (Thư ký Bác Hồ), Đại tướng Võ Nguyên Giáp, Đại tướng Nguyễn Chí Thanh
 */

export type StoryAudience = 'ALL' | 'CADRE' | 'YOUTH' | 'CITIZEN';

export type StoryPillar =
  | 'THRIFT_INTEGRITY' // Cần, kiệm, liêm, chính, chí công vô tư
  | 'CLOSE_TO_PEOPLE'  // Tác phong gần dân, trọng dân, vì dân
  | 'DISCIPLINE_PUNCTUAL' // Kỷ luật, đúng giờ, giữ chữ tín
  | 'COMRADESHIP_HUMANITY'; // Tình đồng chí, bao dung, nhân ái

export interface GeneralStoryItem {
  id: string;
  title: string;
  subtitle: string;
  pillar: StoryPillar;
  pillarTitle: string;
  targetAudiences: StoryAudience[];
  yearPeriod: string;
  location: string;
  witnessOrSource: string;
  goldenQuote: string;
  content: string;
  mainLesson: string;
  applicationForCadre: string; // Vận dụng cho Cán bộ, Đảng viên (theo Quy định 144-QĐ/TW)
  applicationForYouth: string; // Vận dụng cho Đoàn viên, Thanh niên
  applicationForCitizen: string; // Vận dụng cho Người dân, Người lao động
  readingTime: string;
  tags: string[];
}

export const STORY_PILLAR_INFO: Record<StoryPillar, { title: string; icon: string; color: string; badgeCls: string }> = {
  THRIFT_INTEGRITY: {
    title: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    icon: '⚖️',
    color: '#D97706',
    badgeCls: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  CLOSE_TO_PEOPLE: {
    title: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    icon: '🤝',
    color: '#BE123C',
    badgeCls: 'bg-rose-100 text-rose-900 border-rose-300',
  },
  DISCIPLINE_PUNCTUAL: {
    title: 'Kỷ Luật, Đúng Giờ & Giữ Chữ Tín',
    icon: '⏱️',
    color: '#0D9488',
    badgeCls: 'bg-teal-100 text-teal-900 border-teal-300',
  },
  COMRADESHIP_HUMANITY: {
    title: 'Tình Đồng Chí, Nhân Ái & Tự Soi Tự Sửa',
    icon: '❤️',
    color: '#7C3AED',
    badgeCls: 'bg-purple-100 text-purple-900 border-purple-300',
  },
};

export const GENERAL_STORIES: GeneralStoryItem[] = [
  {
    id: 'gen_story_01',
    title: 'Đêm giao thừa đến thăm gia đình nghèo nhất Hà Nội',
    subtitle: 'Nỗi lòng của vị Chủ tịch nước trước giọt nước mắt của mẹ con chị Chín',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: 'Đêm Giao thừa Tết Nhâm Dần 1962',
    location: 'Ngõ Chợ Khâm Thiên, Hà Nội',
    witnessOrSource: 'Theo hồi ký đồng chí Vũ Kỳ (Thư ký Bác Hồ) & Khu Di tích Phủ Chủ tịch',
    goldenQuote: 'Một người làm Chủ tịch nước mà để cho dân nghèo ăn Tết như thế này là Chủ tịch nước có lỗi!',
    content:
      'Tối 30 Tết Nhâm Dần (1962), trước lúc giao thừa chuyển giao năm mới, Bác Hồ căn dặn các đồng chí cảnh vệ: "Tối nay Bác cháu ta đi chúc Tết nhưng không đến nhà cán bộ to, mà đến những nhà nghèo nhất ở Thủ đô".\n' +
      'Xe đưa Bác đến ngõ Chợ Khâm Thiên, dừng trước một căn nhà xiêu vẹo, ẩm thấp của chị Chín — một người phụ nữ góa chồng, một mình bươn chải nuôi ba đứa con nhỏ bằng nghề gánh nước thuê. Lúc Bác bước vào cửa, chị Chín đang lúi húi đặt đôi thùng gánh nước xuống góc nhà, trên bàn thờ không có lấy một nén hương, ba đứa trẻ đang ngồi co ro bên mâm cơm nguội ngắt.\n' +
      'Thấy Bác Hồ bước vào trong chiếc áo dạ ấm áp và đôi mắt sáng hiền từ, chị Chín sững sờ đánh rơi chiếc đòn gánh xuống đất, rồi ôm chầm lấy Bác khóc nức nở:\n' +
      '- Bác ơi... Sao Bác lại đến nhà con? Nhà con nghèo hèn, rách rưới thế này cơ mà!\n' +
      'Bác Hồ rưng rưng nước mắt, ân cần vỗ về người phụ nữ nghèo khổ:\n' +
      '- Bác không đến thăm những gia đình như mẹ con cháu thì Bác còn đến thăm ai? Năm mới, Bác chúc gia đình cháu mạnh khỏe, các cháu chăm ngoan học giỏi.\n' +
      'Bác tự tay trao bánh chưng, kẹo ngọt và lì xì cho từng đứa trẻ. Trên đường trở về Nhà sàn, Bác trầm ngâm không nói một lời suốt chặng đường dài. Về đến nơi, Bác bảo đồng chí thư ký: "Một người làm Chủ tịch nước mà để cho nhân dân mình còn nghèo đói, túng thiếu trong đêm giao thừa như thế này là Chủ tịch nước có lỗi với dân!". Sau Tết đó, Bác chỉ thị cho Ủy ban Hành chính Hà Nội phải tìm ngay việc làm ổn định cho chị Chín và chăm lo cho các gia đình lao động khó khăn.',
    mainLesson:
      'Thước đo lớn nhất của một chính quyền phục vụ là đời sống của những người dân nghèo nhất trong xã hội. Lãnh đạo không phải để ngồi phòng máy lạnh nghe báo cáo thành tích, mà phải dấn thân đến tận cùng những nơi cơ cực của nhân dân.',
    applicationForCadre:
      'Thực hiện nghiêm Quy định 144: Cán bộ, đảng viên phải gần dân, thấu hiểu nỗi khổ của dân, không quan liêu, xa rời thực tế. Mọi chủ trương chính sách an sinh xã hội phải hướng trực tiếp tới những đối tượng yếm thế.',
    applicationForYouth:
      'Xung kích trong các phong trào tình nguyện vì cộng đồng, san sẻ yêu thương với những mảnh đời bất hạnh, không sống vô cảm, ích kỷ.',
    applicationForCitizen:
      'Gìn giữ tinh thần tương thân tương ái, lá lành đùm lá rách giữa láng giềng khu phố, chung tay giúp đỡ những hoàn cảnh ngặt nghèo.',
    readingTime: '4 phút',
    tags: ['Gần dân', 'Chị Chín', 'Giao thừa', 'Trách nhiệm', 'Quy định 144'],
  },
  {
    id: 'gen_story_02',
    title: 'Chiếc áo gối vá và đức tính tiết kiệm của Người',
    subtitle: 'Tỉ mỉ từng đường kim mũi chỉ, không lãng phí của công',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: '1958 – 1965',
    location: 'Nhà sàn Bác Hồ, Phủ Chủ tịch',
    witnessOrSource: 'Lời kể của đồng chí Cần vụ cơ quan Văn phòng Trung ương Đảng',
    goldenQuote: 'Chủ tịch nước mặc áo vá, dùng gối vá là cái phúc của dân tộc. Đất nước còn nghèo, đồng bào còn thiếu thốn, mình dùng đồ xa xỉ sao đành!',
    content:
      'Ở cơ quan Phủ Chủ tịch, ai cũng biết Bác Hồ có một chiếc áo gối bằng vải bông nhuộm màu nâu sồng đã sờn rách ở mép. Một hôm, đồng chí phục vụ thấy chiếc gối đã quá cũ, vải bở bục ra, liền tự ý mang đi cất và thay vào đó một chiếc áo gối mới tinh khôi bằng lụa mềm do một đơn vị gửi biếu Bác.\n' +
      'Buổi trưa, khi Bác chuẩn bị ngả lưng nghỉ, nhìn thấy chiếc gối mới, Bác hỏi:\n' +
      '- Chiếc gối cũ của Bác đâu rồi chú?\n' +
      '- Dạ thưa Bác, chiếc gối kia rách mép rồi ạ, cháu thay chiếc gối mới này để Bác nằm cho êm và giữ gìn sức khỏe.\n' +
      'Bác Hồ lắc đầu nhẹ nhàng bảo:\n' +
      '- Chú tìm lại chiếc gối cũ mang lên đây cho Bác. Nó mới rách một miếng nhỏ ở góc, chú lấy kim chỉ khéo léo vá lại là còn dùng được thêm mấy năm nữa. Đất nước ta đang còn nghèo, đồng bào miền Bắc đang thắt lưng buộc bụng xây dựng hậu phương, đồng bào miền Nam đang đổ máu dưới mưa bom bão đạn, mình là lãnh đạo mà dùng đồ xa hoa, lãng phí thì coi sao được?\n' +
      'Người phục vụ nghẹn ngào mang chiếc gối cũ về, cẩn thận ngồi vá lại từng đường kim mũi chỉ rồi mang lên đặt lại trên chiếc giường gỗ đơn sơ của Bác. Chiếc gối vá ấy đã theo Bác suốt những năm tháng làm việc vì nước vì dân cho đến khi Bác đi xa.',
    mainLesson:
      'Tiết kiệm là đạo đức cách mạng cơ bản nhất. Tiết kiệm không phải là bần tiện mà là biết quý trọng từng hạt gạo, manh áo từ mồ hôi nước mắt của nhân dân đóng thuế.',
    applicationForCadre:
      'Kiên quyết chống lãng phí của công, không mua sắm trang thiết bị xa xỉ, không dùng ngân sách nhà nước để liên hoan, quà cáp, phô trương hình thức.',
    applicationForYouth:
      'Thực hành tiết kiệm từ những việc nhỏ: điện nước, đồ dùng học tập, chi tiêu cá nhân hợp lý, tránh đua đòi chạy theo lối sống xa hoa lãng phí.',
    applicationForCitizen:
      'Thực hành tiết kiệm trong đời sống gia đình, bảo vệ tài sản công cộng và giữ gìn nếp sống văn minh, cần kiệm.',
    readingTime: '3 phút',
    tags: ['Tiết kiệm', 'Áo gối vá', 'Giản dị', 'Chống lãng phí'],
  },
  {
    id: 'gen_story_03',
    title: 'Không có phong bì cho Bác',
    subtitle: 'Thái độ kiên quyết từ chối bồi dưỡng và quà cáp biếu xén',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['CADRE'],
    yearPeriod: 'Năm 1963',
    location: 'Một tỉnh miền núi phía Bắc',
    witnessOrSource: 'Trích từ tài liệu 120 Mẩu chuyện về Bác — NXB Chính trị Quốc gia',
    goldenQuote: 'Tiền này là tiền của nhân dân, của ngân sách nhà nước, các chú không được tùy tiện chia chác bồi dưỡng phong bì!',
    content:
      'Trong một chuyến Bác Hồ đi thăm và làm việc tại một tỉnh miền núi phía Bắc, Bác đến dự hội nghị sơ kết phong trào sản xuất và nói chuyện thân mật với hơn ba trăm cán bộ, đảng viên địa phương.\n' +
      'Buổi nói chuyện thành công rực rỡ, cán bộ ai nấy đều phấn khởi trước những lời căn dặn mộc mạc mà thấm thía của Bác. Kết thúc buổi làm việc, đồng chí Bí thư Tỉnh ủy cung kính tiến lại bên Bác, trên tay cầm một chiếc phong bì dày dặn và thưa:\n' +
      '- Thưa Bác, Ban Thường vụ Tỉnh ủy xin phép gửi Bác chút kinh phí bồi dưỡng tiền nói chuyện và tiền xăng xe đi đường của Bác ạ!\n' +
      'Bác Hồ nghiêm nét mặt, khoát tay dứt khoát không nhận và hỏi:\n' +
      '- Tiền này ở đâu ra mà các chú trích ra đưa cho Bác?\n' +
      '- Dạ thưa Bác, kinh phí này trích từ ngân quỹ tiếp khách của cơ quan Tỉnh ủy ạ.\n' +
      'Bác nghiêm nghị nhắc nhở:\n' +
      '- Ngân sách Tỉnh ủy là tiền của Nhà nước, do mồ hôi nước mắt của bà con nhân dân đóng thuế nộp vào để lo việc chung, phát triển đường sá trường trạm. Bác đi thăm dân, nói chuyện với cán bộ là trách nhiệm của người đầy tớ phục vụ nhân dân, Đảng và Nhà nước đã trả lương hàng tháng cho Bác rồi. Các chú tuyệt đối không được bày ra thói phong bì bồi dưỡng vô nguyên tắc như thế này! Chú mang ngay số tiền này nhập lại vào công quỹ để mua thêm sách vở cho các cháu học sinh vùng cao nghèo.',
    mainLesson:
      'Liêm chính là cốt lõi của người cán bộ. Đã nhận lương của nhân dân thì phải tận tụy phục vụ, tuyệt đối không được lợi dụng chức quyền để nhận thù lao bất chính hay tạo ra tiền lệ quà cáp biếu xén dưới mọi hình thức.',
    applicationForCadre:
      'Thực hiện nghiêm Quy định 144 về chuẩn mực đạo đức cách mạng: Cấm triệt để việc đưa và nhận phong bì, biếu quà nhân dịp lễ tết hoặc các chuyến công tác kiểm tra cơ sở.',
    applicationForYouth:
      'Hình thành ý thức trung thực, trong sáng trong học tập và công tác, nói không với gian lận, "chạy điểm" hay mưu cầu đặc lợi bất chính.',
    applicationForCitizen:
      'Giám sát hoạt động của các cơ quan công quyền, kiên quyết đấu tranh chống tệ tham nhũng vặt, tiêu cực, hối lộ.',
    readingTime: '3 phút',
    tags: ['Liêm chính', 'Phong bì', 'Chống tham nhũng', 'Quy định 144', 'Cán bộ'],
  },
  {
    id: 'gen_story_04',
    title: 'Bác Hồ tát nước chống hạn cùng bà con nông dân',
    subtitle: 'Xắn quần lội bùn, hòa mình vào lao động sản xuất của nhân dân',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: 'Ngày 12/01/1958',
    location: 'Cánh đồng xã Tả Thanh Oai, Thanh Trì, Hà Nội',
    witnessOrSource: 'Báo Nhân Dân & Viện Lịch sử Đảng',
    goldenQuote: 'Muốn lãnh đạo nông dân thì phải hiểu nỗi khổ của nông dân, phải cùng dân tát nước, chống hạn!',
    content:
      'Đầu năm 1958, đợt hạn hán nghiêm trọng kéo dài làm các cánh đồng lúa ngoại thành Hà Nội nứt nẻ, lúa non có nguy cơ chết khô. Nghe tin, Bác Hồ không ngồi ở văn phòng xem báo cáo mà trực tiếp đi thị sát cánh đồng xã Tả Thanh Oai.\n' +
      'Đến nơi, thấy bà con nông dân đang hối hả gầu sòng, gầu dây tát nước từ sông Nhuệ vào đồng cứu lúa, Bác cởi ngay đôi dép cao su để trên bờ, xắn quần quá đầu gối rồi thoăn thoắt lội xuống bùn lầy cùng bà con.\n' +
      'Bác cầm một đầu dây gầu dai, phối hợp nhịp nhàng tát nước với một lão nông tri điền. Từng gầu nước mát lành cuồn cuộn đổ vào mương dẫn ra cánh đồng khô hạn trong tiếng cười rạng rỡ của nhân dân. Mồ hôi ướt đầm trán Bác, nhưng Bác vẫn thoăn thoắt đưa tay theo nhịp gầu.\n' +
      'Sau hơn một tiếng đồng hồ tát nước cùng nhân dân, Bác lên bờ rửa chân tay, chia kẹo cho các cháu nhỏ và thân mật nói chuyện với các đồng chí cán bộ huyện, xã đi cùng:\n' +
      '- Các chú thấy đấy, lúa cần nước như con người cần cơm ăn. Cán bộ không thể đứng trên bờ chỉ tay năm ngón mà phải cùng lội ruộng với dân, cùng chịu bùn lấm lem mới hiểu hết nỗi nhọc nhằn của người nông dân một nắng hai sương làm ra hạt gạo!',
    mainLesson:
      'Phong cách làm việc của Chủ tịch Hồ Chí Minh là thực tiễn, sâu sát cơ sở, hòa mình vào đời sống nhân dân. Cán bộ lãnh đạo phải "miệng nói tay làm", không được quan liêu, xa rời thực tế.',
    applicationForCadre:
      'Thường xuyên đi cơ sở, sâu sát lắng nghe phản ánh của nhân dân, không đứng ngoài cuộc trước những khó khăn bức xúc của cơ sở.',
    applicationForYouth:
      'Tích cực tham gia lao động sản xuất, không ngại khó khăn gian khổ, gắn bó với thực tiễn đời sống của công nhân, nông dân.',
    applicationForCitizen:
      'Đoàn kết, giúp đỡ nhau trong lao động sản xuất, cùng chính quyền địa phương vượt qua thiên tai, phát triển kinh tế.',
    readingTime: '4 phút',
    tags: ['Tát nước', 'Gần dân', 'Tả Thanh Oai', 'Thực tiễn', 'Lao động'],
  },
  {
    id: 'gen_story_05',
    title: 'Giữ lời hứa mua chiếc vòng bạc cho em bé người Tày',
    subtitle: 'Chữ tín của vị lãnh tụ tối cao đối với một em nhỏ',
    pillar: 'DISCIPLINE_PUNCTUAL',
    pillarTitle: 'Kỷ Luật, Đúng Giờ & Giữ Chữ Tín',
    targetAudiences: ['ALL', 'CADRE', 'YOUTH'],
    yearPeriod: 'Năm 1943',
    location: 'Hang Pác Bó, Cao Bằng',
    witnessOrSource: 'Theo hồi ký đồng chí Đại tướng Võ Nguyên Giáp & Báo Nhân Dân',
    goldenQuote: 'Một lời hứa với một đứa trẻ cũng phải giữ cho kỳ được. Đã hứa với ai điều gì, dù việc nhỏ nhất, cũng phải giữ trọn chữ tín!',
    content:
      'Thời kỳ Bác Hồ hoạt động bí mật ở hang Pác Bó (Cao Bằng), Bác thường sống chan hòa với đồng bào người Tày, người Nùng. Một lần chuẩn bị lên đường đi công tác xa, một em bé gái người Tày níu tay áo Bác nũng nịu dặn: "Bác ơi, khi nào Bác về, Bác nhớ mua cho cháu một chiếc vòng bạc đeo tay nhé!". Bác mỉm cười xoa đầu em và hứa: "Được rồi, Bác về Bác sẽ mua cho cháu!".\n' +
      'Hai năm sau, trải qua bao nhiêu biến cố, tù đày gian nan của thực dân và công việc bộn bề chuẩn bị khởi nghĩa, Bác Hồ mới có dịp trở lại bản Pác Bó. Mọi người ùa ra đón Bác trong niềm vui mừng khôn xiết. Cô bé ngày trước nay đã lớn hơn, e thẹn đứng nép sau lưng mẹ, chính em và mọi người trong bản cũng đã hoàn toàn quên bẵng lời dặn dò trẻ con năm xưa.\n' +
      'Thế nhưng, vừa bước vào nhà, Bác Hồ mở túi vải, lấy ra một chiếc vòng bạc nhỏ sáng lấp lánh còn mới nguyên và đặt vào bàn tay nhỏ bé của em. Em bé và cha mẹ xúc động đứng lặng người đi không nói nên lời.\n' +
      'Bác Hồ mỉm cười ân cần nói với các đồng chí cán bộ đi cùng:\n' +
      '- Cháu bé dặn Bác mua chiếc vòng bạc từ hai năm trước. Mình đã hứa với một đứa trẻ thì dù trải qua bao năm tháng gian khổ, dù bận trăm công nghìn việc cũng phải giữ cho kỳ được chữ tín. Giữ lời hứa là danh dự, là phẩm giá của người làm cách mạng. Nếu không giữ lời với một đứa trẻ thì làm sao nhân dân tin cậy được mình?',
    mainLesson:
      'Chữ tín là danh dự quý báu nhất của con người. Người lãnh đạo muốn nhân dân tin phục thì lời nói phải đi đôi với việc làm, đã hứa thì phải kiên quyết thực hiện trọn vẹn.',
    applicationForCadre:
      'Thực hiện chuẩn mực "Nói đi đôi với làm" trong Quy định 144: Đã hứa trước cử tri và nhân dân thì phải giải quyết dứt điểm, không hứa suông, không thất hứa.',
    applicationForYouth:
      'Rèn luyện đức tính trung thực, giữ chữ tín trong tình bạn, trong công việc và các mối quan hệ xã hội.',
    applicationForCitizen:
      'Sống gương mẫu, tôn trọng lời hứa với gia đình, con cái và cộng đồng xã hội.',
    readingTime: '4 phút',
    tags: ['Chữ tín', 'Chiếc vòng bạc', 'Pác Bó', 'Nói đi đôi với làm'],
  },
  {
    id: 'gen_story_06',
    title: 'Bác tự phê bình và rơi nước mắt trước nhân dân',
    subtitle: 'Bản lĩnh của vị lãnh tụ tối cao dũng cảm nhận khuyết điểm',
    pillar: 'COMRADESHIP_HUMANITY',
    pillarTitle: 'Tình Đồng Chí, Nhân Ái & Tự Soi Tự Sửa',
    targetAudiences: ['CADRE', 'ALL'],
    yearPeriod: 'Tháng 10/1956',
    location: 'Hội nghị Trung ương Đảng & Mít tinh Ba Đình, Hà Nội',
    witnessOrSource: 'Văn kiện Đảng Toàn tập & Lịch sử Biên niên Đảng Cộng sản Việt Nam',
    goldenQuote: 'Một Đảng mà giấu giếm khuyết điểm của mình là một Đảng hỏng. Đảng có can đảm thừa nhận sai lầm để sửa chữa mới là Đảng tiến bộ, quang minh chính đại!',
    content:
      'Năm 1956, trong công cuộc Cải cách ruộng đất ở miền Bắc, do áp dụng rập khuôn và nóng vội, Đảng và Nhà nước ta đã phạm phải một số sai lầm nghiêm trọng làm oan sai cho một số cán bộ, đảng viên và người dân lương thiện.\n' +
      'Khi phát hiện ra sai lầm, Bác Hồ và Trung ương Đảng kiên quyết lãnh đạo công tác sửa sai triệt để. Tại Hội nghị Trung ương và sau đó trước hàng vạn đồng bào tại Quảng trường Ba Đình, Bác Hồ đã bước lên bục phát biểu.\n' +
      'Vị Chủ tịch nước tóc bạc phơ không né tránh, không đổ lỗi cho hoàn cảnh hay cấp dưới. Bác nghẹn ngào tự nhận trách nhiệm cao nhất về mình. Khi nói về những nỗi oan uổng, mất mát của người dân và đồng chí, Bác đã rút chiếc khăn tay lau đi những giọt nước mắt lăn dài trên gò má.\n' +
      'Bác nói bằng tất cả sự chân thành, đau xót:\n' +
      '- Người ta ai cũng có thể phạm sai lầm. Có lỗi thì phải thật thà nhận lỗi và kiên quyết sửa chữa. Trung ương Đảng và Bác xin chân thành nhận khuyết điểm trước toàn thể nhân dân. Chúng ta sai ở đâu, kiên quyết sửa chữa ngay ở đó để trả lại danh dự và tài sản cho bà con cô bác và các đồng chí bị oan!\n' +
      'Hành động rơi nước mắt và dũng cảm nhận lỗi công khai trước quốc dân đồng bào của Bác đã làm hàng triệu con tim rung động, củng cố vững chắc niềm tin sắt son của nhân dân đối với Đảng.',
    mainLesson:
      'Tự soi, tự sửa, dũng cảm nhận khuyết điểm là phẩm chất cao quý nhất của người lãnh đạo cách mạng. Giấu giếm sai lầm là tự sát, công khai nhận lỗi để sửa chữa mới giữ được niềm tin của nhân dân.',
    applicationForCadre:
      'Thực hiện nghiêm túc tự phê bình và phê bình theo tinh thần Nghị quyết Trung ương 4 và Quy định 144: Dũng cảm nhận diện khuyết điểm, không bao che dung túng, sai đâu sửa đó.',
    applicationForYouth:
      'Khi mắc khuyết điểm trong học tập, công tác phải dũng cảm nhìn nhận, không tự ái, không đổ lỗi cho ngoại cảnh.',
    applicationForCitizen:
      'Góp ý chân thành, mang tính xây dựng cho cán bộ, đảng viên và chính quyền cơ sở.',
    readingTime: '4 phút',
    tags: ['Tự phê bình', 'Tự soi tự sửa', 'Rơi nước mắt', 'Dũng cảm nhận lỗi', 'Quy định 144'],
  },
  {
    id: 'gen_story_07',
    title: 'Bài học về chiếc phong bì tiết kiệm giấy',
    subtitle: 'Tận dụng từng mảnh giấy nhỏ, bảo vệ của công',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: '1960 – 1968',
    location: 'Bàn làm việc Nhà sàn Phủ Chủ tịch',
    witnessOrSource: 'Theo hồi ký đồng chí Cù Văn Chước (phục vụ Bác Hồ)',
    goldenQuote: 'Tờ giấy một mặt còn trắng thì phải dùng lại để viết nháp. Phong bì gửi đến Bác bóc khéo léo lộn mặt lại dùng tiếp, việc gì phải vứt đi lãng phí!',
    content:
      'Trên bàn làm việc của Bác Hồ ở Nhà sàn, bao giờ cũng có một chồng phong bì thư được xếp thật ngay ngắn. Điều đặc biệt là hầu hết những chiếc phong bì đó đều là phong bì đã qua sử dụng do các cơ quan, đoàn thể gửi tài liệu đến cho Bác.\n' +
      'Mỗi khi nhận được thư từ, tài liệu, Bác dùng một con dao nhỏ rọc giấy rất khéo léo dọc theo mép phong bì để không làm rách giấy. Sau đó, Bác cẩn thận lộn mặt trong còn trắng ra ngoài, dùng hồ dán mép lại, biến thành một chiếc phong bì mới tinh để gửi thư cho các cơ quan, đơn vị.\n' +
      'Bác còn căn dặn các đồng chí văn phòng: Những văn bản, tài liệu nào chỉ in một mặt, mặt sau còn trắng thì tuyệt đối không được vứt vào sọt rác, mà phải cắt nhỏ lại thành từng tập giấy nháp để ghi chép nội dung công việc hàng ngày.\n' +
      'Một đồng chí cán bộ buột miệng hỏi: "Thưa Bác, Bác là Chủ tịch nước, Nhà nước đâu thiếu gì phong bì và giấy trắng mà Bác phải làm kỳ công thế ạ?".\n' +
      'Bác Hồ mỉm cười giải thích ân cần:\n' +
      '- Đúng là Nhà nước không thiếu, nhưng tiết kiệm một tờ giấy, một chiếc phong bì tuy nhỏ, nhưng hàng triệu cán bộ, công chức trên cả nước cùng tiết kiệm thì mỗi năm Nhà nước dôi ra hàng trăm tấn giấy, tiết kiệm được hàng tỷ đồng tiền thuế của dân để mua thêm máy móc, xây thêm trường học cho các cháu nhỏ!',
    mainLesson:
      'Đức tính tiết kiệm của Bác bắt nguồn từ những hành động nhỏ bé và cụ thể nhất. Tiết kiệm không phải là hà tiện mà là sự văn minh, tôn trọng tài nguyên và thành quả lao động của xã hội.',
    applicationForCadre:
      'Thực hành triệt để tiết kiệm văn phòng phẩm, điện thoại, điện chiếu sáng, điều hòa tại công sở; đẩy mạnh số hóa văn bản, giảm thiểu in ấn giấy tờ lãng phí.',
    applicationForYouth:
      'Giữ gìn sách vở cẩn thận, tái chế giấy viết, bảo vệ môi trường và trân trọng từng đồng tiền của cha mẹ chu cấp.',
    applicationForCitizen:
      'Thực hành lối sống xanh, tái chế rác thải, tiết kiệm điện nước trong gia đình.',
    readingTime: '3 phút',
    tags: ['Tiết kiệm giấy', 'Phong bì', 'Lối sống xanh', 'Chống lãng phí'],
  },
  {
    id: 'gen_story_08',
    title: 'Đi cơ sở không tiền hô hậu ủng',
    subtitle: 'Chuyến vi hành đột xuất và bài học chống bệnh hình thức',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['CADRE'],
    yearPeriod: 'Năm 1964',
    location: 'Một hợp tác xã nông nghiệp tỉnh Hưng Yên',
    witnessOrSource: 'Báo Quân đội Nhân dân & Hồi ký các chiến sĩ cảnh vệ',
    goldenQuote: 'Bác đi thăm dân chứ có phải đi diễu võ giương oai đâu mà còi hụ rầm rĩ, tiền hô hậu ủng làm phiền nhân dân!',
    content:
      'Mỗi lần Bác Hồ đi công tác kiểm tra tình hình sản xuất ở các địa phương, Bác luôn yêu cầu giữ bí mật đến phút chót, xe đi không bật còi ủ, không có đoàn xe cảnh sát dẫn đường huyên náo.\n' +
      'Một lần Bác về thăm một hợp tác xã nông nghiệp. Khi xe gần đến địa phận xã, Bác thấy hai bên đường quét tước sạch sẽ bất thường, cờ hoa khẩu hiệu giăng rực rỡ, cán bộ huyện xã mặc quần áo com-lê đứng thành hàng dài chờ đợi. Bác liền bảo đồng chí lái xe cho xe rẽ ngoặt sang một con đường đất nhỏ dẫn thẳng vào xóm nghèo cuối xã.\n' +
      'Bác đến thẳng sân nhà của một bà cụ neo đơn, ngồi nói chuyện hỏi thăm tình hình thu hoạch lúa mùa, việc chia thóc của hợp tác xã thực chất ra sao. Sau đó, Bác mới đi bộ ra trụ sở xã nơi các đồng chí lãnh đạo địa phương đang hốt hoảng tìm kiếm Bác.\n' +
      'Bác ôn tồn nhưng rất nghiêm khắc phê bình:\n' +
      '- Bác về thăm để nắm bắt thực tế đời sống của bà con xem còn khó khăn gì, chứ không phải về để dự tiệc tùng, cờ hoa phô trương! Các chú chuẩn bị đón rước linh đình thế này làm tốn kém công sức của dân, quét tước sạch sẽ một đoạn đường để che mắt Bác thì làm sao Bác thấy được thực chất cái đói, cái khổ của dân?',
    mainLesson:
      'Bệnh hình thức, phô trương là căn bệnh nguy hiểm của người làm công tác lãnh đạo. Muốn lãnh đạo đúng đắn, phải có phong cách làm việc thực chất, giản dị, gần gũi với quần chúng.',
    applicationForCadre:
      'Chấm dứt triệt để bệnh thành tích, bệnh phô trương hình thức trong các chuyến đi kiểm tra công tác cơ sở; không làm phiền, tốn kém thời gian và tiền bạc của cấp dưới và nhân dân.',
    applicationForYouth:
      'Học tập và làm việc thực chất, không "sống ảo", không chạy theo bề nổi thành tích.',
    applicationForCitizen:
      'Thẳng thắn phản ánh trung thực tình hình thực tế địa phương với các cấp lãnh đạo.',
    readingTime: '4 phút',
    tags: ['Chống hình thức', 'Đi cơ sở', 'Bệnh thành tích', 'Quy định 144'],
  },
  {
    id: 'gen_story_09',
    title: 'Đôi dép cao su Bác Hồ',
    subtitle: 'Biểu tượng của sự thanh bạch, giản dị đi vào thơ ca và ngoại giao quốc tế',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['ALL', 'CADRE', 'YOUTH', 'CITIZEN'],
    yearPeriod: '1947 – 1969',
    location: 'Chiến khu Việt Bắc, Phủ Chủ tịch & Thủ đô New Delhi (Ấn Độ)',
    witnessOrSource: 'Bảo tàng Hồ Chí Minh & Theo lời kể đồng chí Vũ Kỳ',
    goldenQuote: 'Đôi dép của Bác tuy cũ nhưng quai đóng lại đinh vẫn đi tốt. Giản dị, tiết kiệm là truyền thống của dân tộc mình, không việc gì phải câu nệ hình thức!',
    content:
      'Đôi dép của Bác được "ra đời" vào năm 1947, chế tạo từ một chiếc lốp ô tô quân sự của thực dân Pháp bị bộ đội ta phục kích thu được tại Chiến dịch Việt Bắc Thu - Đông. Đôi dép cắt không dày lắm, quai trước to bản, quai sau nhỏ vừa vặn với mu bàn chân của Bác.\n' +
      'Suốt hơn 20 năm, đôi dép cao su ấy đã cùng Bác lội suối băng rừng thời kỳ kháng chiến chống Pháp, rồi theo chân Bác về Thủ đô Hà Nội. Đôi dép đã mòn vẹt đế, quai đứt mấy lần, nhưng lần nào Bác cũng bảo các chú cảnh vệ lấy đinh nhỏ đóng lại hoặc lấy dây dù khâu lại để đi tiếp.\n' +
      'Năm 1958, khi Bác chuẩn bị lên đường thăm hữu nghị chính thức nước Cộng hòa Ấn Độ, các đồng chí phục vụ tha thiết xin Bác đổi một đôi giày da mới để đảm bảo nghi lễ ngoại giao quốc tế. Bác mỉm cười bảo:\n' +
      '- Đôi dép này Bác đi quen chân, nhẹ nhàng và thoải mái. Đi thăm nhân dân lao động Ấn Độ, mình mang bản sắc giản dị của dân tộc Việt Nam thì đồng bào nước bạn càng thêm quý mến.\n' +
      'Quả đúng như vậy, khi Bác bước xuống sân bay New Delhi với bộ quần áo bà ba lụa màu ngà và đôi dép cao su mộc mạc, hàng vạn người dân Ấn Độ và các phóng viên quốc tế đã reo hò vang dội, thán phục trước nhân cách vĩ đại của một vị Chủ tịch nước sống đời thanh khiết.',
    mainLesson:
      'Sự giản dị và tiết kiệm của Bác đạt tới tầm văn hóa và bản lĩnh ngoại giao. Giá trị con người không nằm ở đồ hiệu xa xỉ khoác lên người mà ở trí tuệ, lòng nhân ái và sự cống hiến trọn vẹn cho nhân dân.',
    applicationForCadre:
      'Quy định 144 yêu cầu cán bộ, đảng viên giữ gìn lối sống trong sạch, giản dị, không xa hoa, khoe của, không biến quyền lực thành phương tiện hưởng thụ vật chất xa xỉ.',
    applicationForYouth:
      'Không chạy theo lối sống đua đòi, chuộng hàng hiệu vượt quá khả năng tài chính; lấy tri thức, nhân cách và cống hiến xã hội làm thước đo giá trị bản thân.',
    applicationForCitizen:
      'Xây dựng gia đình văn hóa, cần kiệm trong tiêu dùng, biết tái sử dụng và giữ gìn đồ đạc bền lâu.',
    readingTime: '4 phút',
    tags: ['Đôi dép cao su', 'Giản dị', 'Ngoại giao', 'Thanh bạch', 'Quy định 144'],
  },
  {
    id: 'gen_story_10',
    title: 'Chiếc đồng hồ và bài học phân công công tác',
    subtitle: 'Ai cũng muốn làm kim chỉ giờ thì ai làm bánh xe, ốc vít?',
    pillar: 'DISCIPLINE_PUNCTUAL',
    pillarTitle: 'Kỷ Luật, Đúng Giờ & Giữ Chữ Tín',
    targetAudiences: ['CADRE', 'YOUTH'],
    yearPeriod: 'Mùa thu năm 1954',
    location: 'Lớp chỉnh huấn cán bộ tại Đại Từ, Thái Nguyên',
    witnessOrSource: 'Trích từ tài liệu 120 Mẩu chuyện về Bác — NXB Chính trị Quốc gia',
    goldenQuote: 'Trong một chiếc đồng hồ, mỗi bộ phận đều có vị trí riêng. Cách mạng phân công việc gì, làm tròn việc ấy đều là vinh quang!',
    content:
      'Mùa thu năm 1954, sau Hiệp định Giơ-ne-vơ, các cơ quan kháng chiến chuẩn bị tiếp quản Thủ đô Hà Nội. Lúc bấy giờ, trong tư tưởng của một số cán bộ nảy sinh tâm lý so bì: ai cũng mong muốn được điều về tiếp quản Hà Nội để công tác ở thành phố lớn, không ai muốn ở lại miền núi hoặc tiếp tục công tác trong quân đội gian khổ.\n' +
      'Nắm bắt được tư tưởng này, Bác Hồ đến thăm lớp chỉnh huấn cán bộ tại Đại Từ (Thái Nguyên). Bác bước vào hội trường, tay cầm một chiếc đồng hồ quả quýt bằng kim loại sáng bóng. Bác giơ chiếc đồng hồ lên và hỏi cả hội trường:\n' +
      '- Các chú nhìn xem, trên mặt chiếc đồng hồ này có những gì?\n' +
      '- Thưa Bác, có kim giờ, kim phút, kim giây và các con số ạ!\n' +
      '- Thế dưới mặt số, bên trong chiếc đồng hồ còn có những gì nữa?\n' +
      '- Dạ, có bộ máy gồm nhiều bánh xe, lò xo và những chiếc ốc vít li ti ạ.\n' +
      'Bác gật đầu rồi hỏi tiếp:\n' +
      '- Vậy nếu kim giờ, kim phút bảo: "Tôi ở trên mặt đồng hồ thì oai, còn các bánh xe, ốc vít ở trong tối tăm, thiệt thòi quá, tôi không muốn làm kim nữa, tôi muốn nghỉ!". Hay các bánh xe bên trong bảo: "Chúng tôi suốt ngày quay tít mà chẳng ai nhìn thấy, chúng tôi đòi nhảy ra ngoài mặt đồng hồ cho oai!". Nếu các bộ phận đều tị nạnh nhau như thế thì chiếc đồng hồ này có chạy được không?\n' +
      'Cả hội trường im phăng phắc, ai nấy đều cúi đầu thấu hiểu lời răn dạy sâu sắc của Bác. Bác ôn tồn kết luận:\n' +
      '- Cách mạng cũng như một chiếc đồng hồ. Có người làm công tác lãnh đạo, có người làm việc chuyên môn, người ở thành thị, người ở miền núi, biên giới, hải đảo. Mỗi vị trí đều có nhiệm vụ riêng, phối hợp nhịp nhàng thì cỗ máy cách mạng mới vận hành thắng lợi. Tị nạnh địa vị, kén chọn việc dễ né tránh việc khó là căn bệnh cá nhân chủ nghĩa!',
    mainLesson:
      'Tính kỷ luật và sự phân công công tác trong tổ chức là bất khả xâm phạm. Mọi công việc cách mạng, dù thầm lặng hay nổi bật, nếu hoàn thành xuất sắc đều đóng góp vào sự nghiệp chung.',
    applicationForCadre:
      'Tuyệt đối chấp hành sự phân công, điều động của tổ chức theo Điều 1 Quy định 144: Không so bì chức vụ, không kén chọn vị trí công tác béo bở, sẵn sàng nhận nhiệm vụ ở những nơi khó khăn nhất.',
    applicationForYouth:
      'Phát huy tinh thần xung kích của tuổi trẻ: "Đâu cần thanh niên có, việc gì khó có thanh niên", không ngại gian khổ, không đòi hỏi hưởng thụ cá nhân.',
    applicationForCitizen:
      'Tôn trọng mọi ngành nghề chân chính trong xã hội; làm tốt công việc chuyên môn của mình tại cơ quan, nhà máy hay xóm ấp.',
    readingTime: '4 phút',
    tags: ['Chiếc đồng hồ', 'Phân công công tác', 'Kỷ luật Đảng', 'Chống so bì', 'Quy định 144'],
  },
  {
    id: 'gen_story_11',
    title: 'Bữa ăn đạm bạc và không bỏ thừa một hạt cơm',
    subtitle: 'Nâng niu từng giọt mồ hôi của người lao động một nắng hai sương',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['ALL', 'CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: '1955 – 1969',
    location: 'Nhà ăn nhỏ cạnh Nhà sàn Phủ Chủ tịch',
    witnessOrSource: 'Theo hồi ký đồng chí Vũ Kỳ & Bác sĩ phục vụ Bác Hồ',
    goldenQuote: 'Người ta làm ra hạt gạo một nắng hai sương, mình bỏ phí một hạt cơm là mang tội với nông dân!',
    content:
      'Những ai từng có vinh dự được ăn cơm cùng Bác Hồ đều không bao giờ quên được hình ảnh một vị lãnh tụ tối cao nhưng bữa ăn vô cùng đạm bạc và mẫu mực.\n' +
      'Mỗi bữa ăn của Bác thường chỉ có một bát canh cua đồng hoặc canh rau muống luộc dầm tương, vài quả cà pháo muối giòn, một khúc cá kho lá gừng hoặc đĩa thịt nạc rim mặn. Bác ăn cơm rất ngon miệng, nhai kỹ và đặc biệt là không bao giờ để rơi vãi một hạt cơm nào ra mâm.\n' +
      'Ăn xong, Bác tự tay lấy đũa gom sạch những hạt cơm sót lại trong lòng bát, bát cơm của Bác lúc nào cũng sạch bóng như vừa mới rửa. Nếu trên đĩa thức ăn còn thừa lại một chút thịt hoặc rau sạch, Bác luôn lấy một chiếc bát sạch úp lại cẩn thận rồi dặn chú phục vụ:\n' +
      '- Chỗ thức ăn này chưa ai động đến, chú cất vào tủ thức ăn sạch sẽ để bữa chiều hâm nóng lại cho Bác dùng tiếp, chớ đổ đi mà tội nghiệp.\n' +
      'Bác giải thích:\n' +
      '- Để làm ra một hạt gạo, người nông dân phải cày sâu cuốc bẫm, dãi nắng dầm mưa từ sáng sớm đến tối mịt. Hạt cơm là ngọc thực của trời đất, là mồ hôi nước mắt của đồng bào. Mình ăn cơm mà bừa bãi, thừa thãi bỏ đi thì không chỉ lãng phí tiền của mà còn là sự bất kính đối với nhân dân lao động.',
    mainLesson:
      'Văn hóa ăn uống cần kiệm thể hiện nhân cách lớn lao và lòng tôn trọng thành quả lao động của xã hội. Tiết kiệm từ hạt cơm thừa là bài học thực tế, sâu sắc nhất về đạo làm người.',
    applicationForCadre:
      'Chấm dứt triệt để thói quen liên hoan linh đình, mâm cao cỗ đầy bằng tiền công quỹ; thực hành nếp sống văn minh, tiết kiệm ngay tại bếp ăn cơ quan và gia đình.',
    applicationForYouth:
      'Rèn luyện thói quen không lãng phí thức ăn khi đi ăn ngoài hàng quán; biết quý trọng sức lao động của cha mẹ đã nuôi nấng mình trưởng thành.',
    applicationForCitizen:
      'Giáo dục con cháu trong gia đình biết quý trọng từng hạt gạo, sống văn minh, không xa hoa lãng phí trong tiệc cưới, ma chay, giỗ chạp.',
    readingTime: '3 phút',
    tags: ['Bữa ăn đạm bạc', 'Không bỏ thừa', 'Tiết kiệm', 'Tôn trọng lao động'],
  },
  {
    id: 'gen_story_12',
    title: 'Nước nóng và nước nguội',
    subtitle: 'Nghệ thuật làm chủ cảm xúc và phương pháp phê bình cán bộ nhân văn',
    pillar: 'COMRADESHIP_HUMANITY',
    pillarTitle: 'Tình Đồng Chí, Nhân Ái & Tự Soi Tự Sửa',
    targetAudiences: ['CADRE', 'YOUTH'],
    yearPeriod: 'Năm 1950',
    location: 'Chiến khu Việt Bắc',
    witnessOrSource: 'Báo Quân đội Nhân dân & Trích 120 Mẩu chuyện về Bác',
    goldenQuote: 'Khi chú nổi giận, người ta cũng sợ hãi như cốc nước sôi bốc khói không ai dám uống. Lúc nguội rồi, lời nói chân tình mới thấm sâu!',
    content:
      'Trong thời kỳ kháng chiến chống Pháp ở Việt Bắc, có một đồng chí cán bộ trung đoàn phụ trách hậu cần tính tình rất nóng nảy. Mỗi khi cấp dưới làm việc chậm trễ hoặc có sai sót, đồng chí này thường quát mắng té tát, có khi văng tục, khiến anh em chiến sĩ rất ức chế và ảnh hưởng xấu đến sự đoàn kết nội bộ.\n' +
      'Tin đến tai Bác Hồ. Một buổi trưa hè nắng gắt như đổ lửa, Bác cho gọi đồng chí trung đoàn trưởng đó lên lán của Bác ở đồi Nà Lọm để gặp.\n' +
      'Đồng chí cán bộ đi bộ vượt rừng hơn mười cây số dưới trời nắng chang chang, mồ hôi nhễ nhại, vừa mệt vừa khát. Bước vào lán của Bác, đồng chí chào Bác trong hơi thở dốc.\n' +
      'Bác Hồ tươi cười bảo:\n' +
      '- Chú đi đường xa vất vả quá, ngồi xuống đây uống nước cho đỡ mệt!\n' +
      'Trên bàn lúc đó Bác đã đặt sẵn hai chiếc cốc thủy tinh: một cốc nước sôi bốc khói nghi ngút và một cốc nước nguội trong vắt, mát lành. Bác chỉ tay vào cốc nước sôi và bảo:\n' +
      '- Chú uống cốc nước sôi này đi!\n' +
      'Đồng chí cán bộ ngạc nhiên thưa:\n' +
      '- Dạ thưa Bác, nước đang sôi sùng sục thế này làm sao cháu uống được ạ? Uống vào thì bỏng lưỡi mất!\n' +
      'Bác Hồ mỉm cười, chỉ sang cốc nước nguội bên cạnh:\n' +
      '- Thế chú uống cốc nước nguội này xem có được không?\n' +
      'Đồng chí cán bộ bưng cốc nước nguội uống một hơi cạn sạch, thở phào khoan khoái.\n' +
      'Lúc bấy giờ, Bác mới nhìn thẳng vào mắt người cán bộ trung đoàn, ôn tồn bảo:\n' +
      '- Chú thấy chưa? Khi chú nóng giận, quát mắng cấp dưới, cơn giận của chú cũng như cốc nước sôi kia vậy. Chú muốn người ta nghe lời, nhưng chú nóng nảy thì người ta sợ hãi lánh xa, chẳng ai tiếp thu được điều gì. Chỉ khi chú bình tĩnh, lời nói ôn hòa, nhẹ nhàng như cốc nước mát này thì anh em đồng chí mới thấm thía và phục chú từ tận đáy lòng!',
    mainLesson:
      'Làm chủ cảm xúc là phẩm chất tối quan trọng của người lãnh đạo. Phê bình cấp dưới phải có tình đồng chí thương yêu lẫn nhau, lấy sự thuyết phục, giáo dục làm gốc chứ không phải dùng quyền uy quát mắng.',
    applicationForCadre:
      'Thực hiện chuẩn mực văn hóa ứng xử công vụ theo Quy định 144: Lắng nghe, tôn trọng cấp dưới và nhân dân; kiên quyết loại bỏ thói hách dịch, cửa quyền, nóng nảy vô lối.',
    applicationForYouth:
      'Rèn luyện kỹ năng quản trị cảm xúc cá nhân trong giao tiếp, học tập và làm việc nhóm; không để cơn giận phá hỏng các mối quan hệ đồng nghiệp, bạn bè.',
    applicationForCitizen:
      'Gìn giữ hòa khí trong gia đình và láng giềng; "chồng giận thì vợ bớt lời", giải quyết mâu thuẫn bằng đối thoại ôn hòa, văn minh.',
    readingTime: '4 phút',
    tags: ['Nước nóng nước nguội', 'Kiểm soát cảm xúc', 'Tình đồng chí', 'Văn hóa ứng xử'],
  },
  {
    id: 'gen_story_13',
    title: 'Bác Hồ tuân thủ đèn đỏ giao thông',
    subtitle: 'Nguyên thủ quốc gia và tấm gương thượng tôn pháp luật',
    pillar: 'DISCIPLINE_PUNCTUAL',
    pillarTitle: 'Kỷ Luật, Đúng Giờ & Giữ Chữ Tín',
    targetAudiences: ['ALL', 'CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: 'Một tối mùa đông năm 1961',
    location: 'Ngã tư Hàng Bông — Cửa Nam, Hà Nội',
    witnessOrSource: 'Theo lời kể của đồng chí lái xe Văn phòng Trung ương Đảng',
    goldenQuote: 'Đèn đỏ thì phải dừng lại. Người đứng đầu một nước càng phải gương mẫu chấp hành luật pháp trước tiên!',
    content:
      'Một buổi tối mùa đông năm 1961, Bác Hồ đi thăm một đơn vị bộ đội phòng không đóng quân ở ngoại thành Hà Nội trở về. Trời đã về khuya, đường phố vắng bóng người qua lại, gió mùa đông bắc thổi từng cơn lạnh buốt.\n' +
      'Khi xe chở Bác chạy đến ngã tư Hàng Bông — Cửa Nam thì cột đèn tín hiệu giao thông chuyển sang màu đỏ. Lúc này, trên đường cắt ngang hoàn toàn không có người hay phương tiện nào qua lại, xung quanh cũng không có chiến sĩ cảnh sát giao thông đứng chốt.\n' +
      'Thấy trời rét và muốn đưa Bác về Nhà sàn sớm để Bác nghỉ ngơi, đồng chí cảnh vệ ngồi ghế trước liền quay sang khẽ nói với người lái xe:\n' +
      '- Đêm vắng rồi, xe lại đang chở Bác, anh cho xe vượt qua đèn đỏ luôn đi!\n' +
      'Đồng chí lái xe vừa định nhấn ga thì Bác Hồ ngồi ở ghế sau đã vội đặt tay lên vai đồng chí lái xe, giọng Bác nghiêm nghị mà dứt khoát:\n' +
      '- Chú dừng xe lại!\n' +
      'Chiếc xe từ từ phanh lại trước vạch dừng. Đồng chí cảnh vệ ngượng ngùng quay lại định thanh minh: "Dạ thưa Bác, cháu thấy đường vắng quá ạ...". Bác Hồ ôn tồn giải thích:\n' +
      '- Đèn đỏ là luật giao thông quy định tất cả mọi người phải dừng lại để bảo đảm an toàn. Bác cháu ta đang đi công việc của Đảng và Nhà nước, người đứng đầu một nước càng phải gương mẫu tuân thủ pháp luật hơn ai hết. Nếu mình tự cho mình cái quyền đặc quyền đặc lợi để vượt đèn đỏ, thì người dân nhìn vào sẽ bảo cán bộ nói một đằng làm một nẻo, luật pháp lập ra để làm gì?\n' +
      'Chiếc xe lặng lẽ đỗ chờ trước vạch dừng đúng 45 giây cho đến khi đèn xanh bật sáng Bác mới bảo đồng chí lái xe cho xe đi tiếp.',
    mainLesson:
      'Thượng tôn pháp luật là nguyên tắc tối cao của nhà nước pháp quyền. Người giữ cương vị lãnh đạo càng cao thì càng phải tuyệt đối bình đẳng trước pháp luật, không được có bất kỳ đặc quyền, đặc lợi nào đứng trên kỷ cương xã hội.',
    applicationForCadre:
      'Thực hiện nghiêm Điều 2 Quy định 144: Cán bộ, đảng viên phải gương mẫu tuân thủ Hiến pháp và pháp luật; không can thiệp, bao che cho người thân vi phạm trật tự kỷ cương.',
    applicationForYouth:
      'Hình thành ý thức chấp hành pháp luật từ việc nhỏ nhất: Đội mũ bảo hiểm, dừng đèn đỏ, không vi phạm an toàn giao thông, lan tỏa lối sống thượng tôn pháp luật.',
    applicationForCitizen:
      'Tự giác chấp hành nghiêm chỉnh luật giao thông và quy định của địa phương; không vượt đèn đỏ, không chạy xe lấn làn vì lợi ích an toàn cho chính mình và cộng đồng.',
    readingTime: '4 phút',
    tags: ['Đèn đỏ', 'Thượng tôn pháp luật', 'Kỷ luật', 'Gương mẫu', 'Quy định 144'],
  },
  {
    id: 'gen_story_14',
    title: 'Thời gian quý báu lắm',
    subtitle: 'Bài toán nhân 5.000 phút lao động quý giá của Đảng và nhân dân',
    pillar: 'DISCIPLINE_PUNCTUAL',
    pillarTitle: 'Kỷ Luật, Đúng Giờ & Giữ Chữ Tín',
    targetAudiences: ['CADRE', 'YOUTH'],
    yearPeriod: 'Năm 1953',
    location: 'Chiến khu Việt Bắc',
    witnessOrSource: 'Trích từ cuốn "Bác Hồ với cán bộ, đảng viên" — NXB Thanh niên',
    goldenQuote: 'Chú đến chậm 10 phút, nhân với 500 người ngồi chờ là chú đã làm lãng phí 5.000 phút lao động quý báu của Đảng và dân!',
    content:
      'Sinh thời, Bác Hồ là tấm gương mẫu mực hiếm có về tác phong làm việc đúng giờ. Bác luôn coi việc trễ giờ không chỉ là thói quen xấu mà là một hành vi lãng phí nghiêm trọng tài sản xã hội.\n' +
      'Năm 1953, tại chiến khu Việt Bắc diễn ra một lớp học tập chính trị quan trọng dành cho hơn 500 cán bộ trung, cao cấp của Đảng và Quân đội. Giờ khai mạc được thông báo chính xác là 7 giờ 30 phút sáng.\n' +
      'Đúng 7 giờ 30, Bác Hồ đã có mặt tại hội trường trong bộ quần áo chàm giản dị. Toàn thể hội trường đứng dậy vỗ tay vang dội. Bác đứng trên bục, tươi cười vẫy tay chào mọi người nhưng Bác chưa tuyên bố khai mạc ngay mà kiên nhẫn đứng đợi.\n' +
      'Đến 7 giờ 40 phút, một đồng chí cán bộ phụ trách một ban quan trọng mới hớt hải chạy vào cửa hội trường, quần áo xộc xệch, mồ hôi nhễ nhại. Đồng chí cúi đầu xin lỗi Bác và thanh minh: "Dạ thưa Bác, trên đường đi cháu gặp một con suối lũ chảy xiết nên xe ngựa bị chậm mất 10 phút ạ!".\n' +
      'Bác Hồ nhìn đồng chí cán bộ, giọng Bác điềm đạm nhưng vô cùng sâu sắc:\n' +
      '- Chú đến muộn 10 phút vì lý do khách quan, Bác có thể thông cảm cho cá nhân chú. Nhưng chú thử làm một phép tính đơn giản này xem:\n' +
      'Ở hội trường này có 500 cán bộ đang ngồi chờ chú. Chú đến chậm 10 phút của riêng chú, nhưng nhân với 500 người ngồi đợi, vị chi chú đã làm lãng phí đúng 5.000 phút lao động quý báu của Đảng, của Quân đội và nhân dân! 5.000 phút ấy đủ để giải quyết biết bao nhiêu công việc của mặt trận đang chờ đợi ngoài kia.\n' +
      'Đồng chí cán bộ nghe xong toát mồ hôi hột, tự kiểm điểm sâu sắc trước toàn hội trường. Từ đó về sau, trong toàn cơ quan Trung ương không còn ai dám đi họp trễ dù chỉ một phút.',
    mainLesson:
      'Thời gian là tài sản vô giá của xã hội. Đúng giờ là thể hiện sự tôn trọng người khác, tôn trọng công việc chung và là tiêu chuẩn đạo đức công vụ cơ bản nhất.',
    applicationForCadre:
      'Xây dựng văn hóa họp đúng giờ, làm việc đúng giờ; loại bỏ hoàn toàn căn bệnh "giờ cao su" trong các hội nghị và các buổi tiếp công dân theo Quy định 144.',
    applicationForYouth:
      'Tập thói quen quản lý thời gian khoa học, luôn đến sớm 5-10 phút trong các buổi học, phỏng vấn, sự kiện để chủ động và thể hiện tính chuyên nghiệp.',
    applicationForCitizen:
      'Giữ đúng hẹn trong các giao dịch kinh doanh, sinh hoạt cộng đồng và đời sống thường ngày.',
    readingTime: '3 phút',
    tags: ['Thời gian quý báu', 'Đúng giờ', 'Giờ cao su', 'Kỷ luật công vụ'],
  },
  {
    id: 'gen_story_15',
    title: 'Hai bàn tay trắng và hành trình tìm đường cứu nước',
    subtitle: 'Bài học về ý chí tự lực cánh sinh, dám dấn thân của tuổi trẻ',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['YOUTH', 'ALL'],
    yearPeriod: 'Đầu tháng 6 năm 1911',
    location: 'Sài Gòn — Bến Nhà Rồng',
    witnessOrSource: 'Theo lời kể của ông Trần Dân Tiên trong "Những mẩu chuyện về đời hoạt động của Hồ Chủ tịch"',
    goldenQuote: 'Tiền đây! Chúng ta sẽ làm bất cứ việc gì để sống và để đi cứu nước!',
    content:
      'Đầu năm 1911, người thanh niên yêu nước Nguyễn Tất Thành vào Sài Gòn mang trong lòng một khát vọng cháy bỏng: sang phương Tây để tìm hiểu xem nước Pháp và các nước khác làm thế nào, rồi trở về giúp đồng bào thoát khỏi ách nô lệ thực dân.\n' +
      'Trước khi lên đường, anh Thành gặp một người bạn thân tên là Lê. Trong một buổi tối đi dạo dọc theo bến sông Sài Gòn, anh Thành hỏi bạn:\n' +
      '- Anh có yêu nước không?\n' +
      'Anh Lê ngạc nhiên trả lời:\n' +
      '- Có chứ, ai mà chẳng yêu nước!\n' +
      '- Anh có dám cùng tôi ra nước ngoài không?\n' +
      'Anh Lê phân vân thưa:\n' +
      '- Đi nước ngoài thì tốt quá, nhưng lấy đâu ra tiền mà đi? Chúng ta nghèo thế này, tiền vé tàu, tiền ăn ở bên xứ người ai lo?\n' +
      'Nghe bạn hỏi, người thanh niên Nguyễn Tất Thành không một chút đắn đo, anh xòe rộng hai bàn tay chai sần nhưng rắn rỏi ra trước mặt bạn và dõng dạc nói:\n' +
      '- Tiền đây chứ đâu! Chúng ta sẽ làm bất cứ việc gì, từ phụ bếp, bồi bàn, rửa bát đến quét tuyết để sống và để đi. Hai bàn tay này còn lao động được thì không sợ đói, không sợ khó khăn!\n' +
      'Bị bất ngờ trước ý chí gang thép của anh Thành, người bạn nhận lời nhưng sau đó vì ngần ngại trước bao gian khổ bấp bênh nên đã không đi cùng.\n' +
      'Và ngày 5/6/1911, từ Bến Nhà Rồng, chàng thanh niên 21 tuổi Nguyễn Tất Thành với tên gọi Văn Ba đã một mình bước lên con tàu Đô đốc Latouche-Tréville, nhận làm phụ bếp — công việc cực nhọc nhất trên tàu — mở đầu cuộc hành trình 30 năm bôn ba tìm thấy ánh sáng tự do cho dân tộc.',
    mainLesson:
      'Khát vọng lớn lao phải đi liền với tinh thần dám nghĩ, dám làm và dựa vào đôi bàn tay lao động tự lực cánh sinh của chính mình. Đừng sợ nghèo khó, chỉ sợ không có ý chí và lý tưởng dấn thân.',
    applicationForCadre:
      'Giữ vững tinh thần tự lực tự cường, không trông chờ ỷ lại vào cấp trên hay ngân sách bao cấp; dám nghĩ, dám làm, dám chịu trách nhiệm vì lợi ích chung.',
    applicationForYouth:
      'Nuôi dưỡng ước mơ và hoài bão lớn; không sợ thất bại khi khởi nghiệp; tin tưởng vào sức mạnh của đôi bàn tay và khối óc của chính mình.',
    applicationForCitizen:
      'Cần cù, sáng tạo trong lao động; vươn lên làm giàu chính đáng bằng chính sức lao động chân chính của gia đình.',
    readingTime: '4 phút',
    tags: ['Hai bàn tay', 'Bến Nhà Rồng', '1911', 'Ý chí tuổi trẻ', 'Khát vọng'],
  },
  {
    id: 'gen_story_16',
    title: 'Chiếc áo lụa Bác tặng người thương binh nặng',
    subtitle: 'Tấm lòng người Cha già đối với những người đã hy sinh xương máu cho Tổ quốc',
    pillar: 'COMRADESHIP_HUMANITY',
    pillarTitle: 'Tình Đồng Chí, Nhân Ái & Tự Soi Tự Sửa',
    targetAudiences: ['ALL', 'CADRE', 'CITIZEN'],
    yearPeriod: 'Ngày 27/7/1947',
    location: 'Chiến khu Việt Bắc',
    witnessOrSource: 'Báo Vệ Quốc Quân & Viện Lịch sử Đảng',
    goldenQuote: 'Thương binh tàn nhưng không phế. Máu đào của các liệt sĩ đã làm cho lá cờ cách mạng thêm đỏ thắm!',
    content:
      'Mùa hè năm 1947, khi cuộc kháng chiến toàn quốc chống thực dân Pháp bước vào giai đoạn quyết liệt, Chủ tịch Hồ Chí Minh đã chỉ thị chọn ngày 27 tháng 7 hàng năm làm "Ngày Thương binh Toàn quốc" (nay là Ngày Thương binh — Liệt sĩ).\n' +
      'Trong bức thư xúc động gửi Ban Tổ chức ngày thương binh, Bác viết: "Đang khi Tổ quốc lâm nguy, các chiến sĩ đã hy sinh tính mệnh hoặc bỏ lại một phần xương máu ngoài mặt trận để giữ gìn bờ cõi non sông... Đối với những người con trung hiếu ấy, Chính phủ và đồng bào phải hết lòng giúp đỡ và tôn kính".\n' +
      'Để nêu gương, Bác đã trích một tháng lương Chủ tịch nước của mình gửi vào quỹ ủng hộ thương binh. Cùng với đó, Bác tự tay gói ghém một món quà vô cùng quý giá của riêng Bác: đó là một chiếc áo lụa màu trắng ngà do đồng bào phụ nữ tỉnh Phú Thọ may gửi biếu Bác nhân dịp sinh nhật.\n' +
      'Kèm theo chiếc áo lụa, Bác viết một mẩu giấy nhỏ nhắn nhủ tha thiết:\n' +
      '- Bác xin tặng chiếc áo này cho người chiến sĩ thương binh nào bị thương nặng nhất đang điều trị tại trạm xá, để đồng chí ấy mặc cho mát mẻ, mau chóng lành vết thương về sum họp cùng gia đình!\n' +
      'Khi chiếc áo lụa được chuyển đến trạm quân y giữa rừng sâu trao cho người thương binh bị cụt cả hai chân, toàn thể y bác sĩ và thương bệnh binh đã ôm chầm lấy chiếc áo lụa mà khóc nấc lên vì xúc động trước sự chăm sóc như tình mẫu tử thiêng liêng của Bác.',
    mainLesson:
      'Đạo lý "Uống nước nhớ nguồn", "Đền ơn đáp nghĩa" là nền tảng đạo đức của dân tộc. Sự tri ân đối với người có công với nước phải xuất phát từ đáy lòng chân thành và hành động cụ thể, thiết thực.',
    applicationForCadre:
      'Thực hiện đầy đủ, kịp thời, minh bạch các chính sách ưu đãi người có công; kiên quyết xử lý nghiêm mọi hành vi bớt xén, tiêu cực trong chi trả chế độ thương binh liệt sĩ.',
    applicationForYouth:
      'Tích cực tham gia các hoạt động "Đền ơn đáp nghĩa", chăm sóc nghĩa trang liệt sĩ, phụng dưỡng Mẹ Việt Nam Anh hùng tại địa phương.',
    applicationForCitizen:
      'Gìn giữ truyền thống tri ân các gia đình thương binh liệt sĩ, người có công trong khu phố, giáo dục con cháu lòng biết ơn sâu sắc đối với các thế hệ cha anh.',
    readingTime: '4 phút',
    tags: ['Chiếc áo lụa', 'Thương binh liệt sĩ', '27 tháng 7', 'Đền ơn đáp nghĩa', 'Tri ân'],
  },
  {
    id: 'gen_story_17',
    title: 'Tấm thẻ đại biểu của Bác Hồ',
    subtitle: 'Gương mẫu chấp hành điều lệ và kỷ luật của tổ chức Đảng',
    pillar: 'DISCIPLINE_PUNCTUAL',
    pillarTitle: 'Kỷ Luật, Đúng Giờ & Giữ Chữ Tín',
    targetAudiences: ['CADRE'],
    yearPeriod: 'Tháng 9 năm 1960',
    location: 'Đại hội đại biểu toàn quốc lần thứ III của Đảng, Nhà hát Lớn Hà Nội',
    witnessOrSource: 'Theo hồi ký đồng chí Vũ Kỳ & Kỷ yếu Đại hội Đảng lần thứ III',
    goldenQuote: 'Nội quy Đại hội quy định đại biểu phải đeo thẻ trước ngực. Bác là Chủ tịch Đảng, Bác cũng là một đại biểu, Bác không thể đứng ngoài kỷ luật!',
    content:
      'Tháng 9 năm 1960, Đại hội đại biểu toàn quốc lần thứ III của Đảng Cộng sản Việt Nam được long trọng tổ chức tại Thủ đô Hà Nội. Để đảm bảo an ninh tuyệt đối cho Đại hội, Ban Tổ chức đã quy định rất nghiêm ngặt: Mọi đại biểu khi ra vào hội trường đều phải đeo thẻ đại biểu có dán ảnh trước ngực và xuất trình cho lực lượng cảnh vệ kiểm tra tại cửa.\n' +
      'Sáng ngày khai mạc, chiếc xe chở Bác Hồ đến trước sảnh Nhà hát Lớn. Các đồng chí cảnh vệ gác cửa nhìn thấy Bác liền nghiêm trang giơ tay chào và cung kính mời Bác bước thẳng vào trong.\n' +
      'Thế nhưng, Bác dừng bước lại ngay trước cửa kiểm soát. Bác đứng nắn lại vạt áo lụa, sờ lên ngực áo thì phát hiện ra mình để quên tấm thẻ đại biểu ở trên bàn làm việc tại Nhà sàn.\n' +
      'Đồng chí cảnh vệ lúng túng thưa:\n' +
      '- Dạ thưa Bác, chúng cháu ai cũng biết Bác là Bác Hồ, là Chủ tịch Đảng rồi ạ, Bác cứ vào đi ạ, không cần thẻ đâu ạ!\n' +
      'Bác Hồ lắc đầu, ôn tồn nhưng rất kiên quyết bảo:\n' +
      '- Chú nói thế không đúng rồi! Đại hội đã có nội quy quy định đại biểu vào cửa phải có thẻ. Bác tuy là Chủ tịch Đảng nhưng đến đây Bác cũng là một đảng viên, một đại biểu bình đẳng như hơn năm trăm đại biểu khác. Nếu Bác không đeo thẻ mà tự tiện vào thì Bác vi phạm kỷ luật của Đại hội, các chú gác cửa cũng không làm tròn nhiệm vụ của tổ chức phân công.\n' +
      'Nói rồi, Bác bảo đồng chí thư ký quay xe về Nhà sàn lấy đúng chiếc thẻ đại biểu mang đến, Bác tự tay cài thẻ ngay ngắn lên ngực áo rồi mới mỉm cười bước qua cửa kiểm soát vào hội trường.',
    mainLesson:
      'Kỷ luật của Đảng và quy chế cơ quan là bình đẳng đối với mọi thành viên. Lãnh đạo cấp cao nhất cũng phải nghiêm túc chấp hành điều lệ, không được đứng trên tổ chức hay đòi hỏi ngoại lệ.',
    applicationForCadre:
      'Thực hiện nghiêm Điều 2 Quy định 144: Nghiêm chỉnh chấp hành kỷ luật Đảng, pháp luật của Nhà nước; gương mẫu trong sinh hoạt chi bộ, không tự cho mình đặc quyền miễn trừ kiểm tra giám sát.',
    applicationForYouth:
      'Chấp hành nghiêm nội quy học đường, quy chế thi cử, kỷ luật lao động tại doanh nghiệp; không tìm cách "đi cửa sau" hay ỷ lại vào quan hệ quen biết.',
    applicationForCitizen:
      'Tôn trọng các quy định chung nơi công cộng, cơ quan nhà nước; xếp hàng văn minh theo thứ tự.',
    readingTime: '3 phút',
    tags: ['Thẻ đại biểu', 'Kỷ luật Đảng', 'Không đặc quyền', 'Gương mẫu', 'Quy định 144'],
  },
  {
    id: 'gen_story_18',
    title: 'Thăm nhà bếp và nhà vệ sinh khu tập thể Dệt Nam Định',
    subtitle: 'Thước đo thực chất về đời sống của giai cấp công nhân',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['CADRE', 'CITIZEN'],
    yearPeriod: 'Ngày 21/5/1963',
    location: 'Nhà máy Dệt Nam Định',
    witnessOrSource: 'Báo Lao Động & Biên niên sử thành phố Nam Định',
    goldenQuote: 'Muốn biết đời sống công nhân có ấm no không thì vào bếp ăn; muốn biết sức khỏe tốt không thì vào nhà tắm, nhà vệ sinh; chớ nhìn vào hội trường cờ hoa!',
    content:
      'Nhà máy Dệt Nam Định là cái nôi lớn của phong trào công nhân Việt Nam. Ngày 21/5/1963, Bác Hồ về thăm nhà máy lần thứ năm. Biết tin Bác về, Ban Giám đốc nhà máy đã chuẩn bị một hội trường khang trang, rực rỡ cờ hoa, khẩu hiệu và trải thảm đỏ đón Bác.\n' +
      'Thế nhưng khi vừa bước xuống xe, Bác không đi vào hội trường ngay. Bác quay sang nói với đồng chí Giám đốc:\n' +
      '- Bây giờ đang giờ nghỉ giữa ca, chú đưa Bác đi thăm nơi anh chị em công nhân ăn uống và sinh hoạt trước đã.\n' +
      'Bác đi thẳng xuống khu bếp ăn tập thể. Bác mở nắp từng nồi cơm, nồi canh xem công nhân ăn có đủ no không, thức ăn có nóng sốt không. Bác lấy một chiếc muôi nếm thử nước canh, thấy canh hơi nhạt, Bác nhắc nhở chị cấp dưỡng phải nêm nếm đậm đà hơn vì công nhân dệt đứng máy mất rất nhiều mồ hôi.\n' +
      'Tiếp đó, Bác đi bộ ra khu nhà tắm và nhà vệ sinh tập thể của nữ công nhân. Thấy khu nhà tắm ẩm thấp, cửa nẻo xập xệ, cống rãnh ứ đọng nước bẩn bốc mùi, Bác nghiêm khắc quay sang phê bình các đồng chí lãnh đạo nhà máy:\n' +
      '- Các chú chuẩn bị hội trường đón Bác cờ hoa lộng lẫy tốn kém lắm, nhưng đời sống hàng ngày của nữ công nhân thì các chú lại bỏ quên thế này à? Công nhân làm việc vất vả suốt ca kíp mệt nhọc, chỗ tắm giặt vệ sinh không sạch sẽ thì làm sao giữ gìn được sức khỏe để sản xuất lâu dài? Cán bộ lãnh đạo nhà máy phải đặt quyền lợi và sức khỏe của công nhân lên trên hết, phải sửa ngay khu vệ sinh này cho chị em trước khi tổ chức liên hoan!',
    mainLesson:
      'Tư tưởng vì con người của Bác thể hiện ở sự quan tâm sâu sắc, tỉ mỉ đến từng nhu cầu sống thiết thực của người lao động. Chăm lo cho dân không thể dừng lại ở khẩu hiệu chung chung mà phải kiểm tra cụ thể từ cơm ăn, nước uống đến điều kiện vệ sinh.',
    applicationForCadre:
      'Người đứng đầu cơ quan, doanh nghiệp phải chăm lo thực chất đời sống vật chất, tinh thần của cán bộ, nhân viên và người lao động; không phô trương bề nổi mà bỏ bê phúc lợi cơ bản.',
    applicationForYouth:
      'Xây dựng nếp sống văn minh công sở, giữ gìn vệ sinh chung tại nơi làm việc và ký túc xá, lớp học.',
    applicationForCitizen:
      'Chủ động giữ gìn vệ sinh môi trường ngõ phố, khu dân cư sạch đẹp, xây dựng nếp sống văn minh đô thị.',
    readingTime: '4 phút',
    tags: ['Dệt Nam Định', 'Công nhân', 'Nhà bếp', 'Chăm lo đời sống', 'Thực tiễn'],
  },
  {
    id: 'gen_story_19',
    title: 'Bác tự cuốc đất trồng rau bên Nhà sàn',
    subtitle: 'Tự giác lao động và tấm gương chống thói quen lười biếng, quan liêu',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['ALL', 'CADRE', 'YOUTH'],
    yearPeriod: '1958 – 1969',
    location: 'Vườn rau cạnh Nhà sàn Phủ Chủ tịch, Hà Nội',
    witnessOrSource: 'Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch',
    goldenQuote: 'Lao động là vinh quang. Cán bộ đầu óc thông thái mà tay chân lười biếng thì dần dà sẽ thoái hóa, xa rời nhân dân lao động!',
    content:
      'Sau giờ làm việc buổi chiều, hình ảnh quen thuộc của Bác Hồ ở Nhà sàn là chiếc quần cộc, áo cộc tay màu nâu, chân đi dép cao su, tay cầm chiếc cuốc ra vườn xới đất trồng rau hoặc cầm chiếc thùng tưới nước cho các luống cải, khóm cà.\n' +
      'Khu vườn nhỏ sau Nhà sàn được Bác cải tạo thành nơi tăng gia sản xuất rất trù phú. Mùa nào thức nấy: cải bắp, su hào, cà chua, rau muống, đậu cô ve. Những luống rau do chính tay Bác cuốc đất, bón phân, tưới nước xanh mơn mởn không chỉ cung cấp đủ rau sạch cho bữa ăn hàng ngày của Bác và các đồng chí phục vụ, mà mỗi đợt thu hoạch rộ Bác còn gửi tặng các đồng chí thương bệnh binh ở trạm xá Bộ Quốc phòng.\n' +
      'Một lần, thấy Bác tuổi cao mà vẫn cuốc đất thoăn thoắt, một đồng chí cán bộ ái ngại thưa:\n' +
      '- Bác bận trăm công nghìn việc lớn của đất nước, việc cuốc đất nặng nhọc này để anh em chúng cháu làm thay Bác ạ!\n' +
      'Bác Hồ dừng tay cuốc, lấy khăn lau mồ hôi trên trán rồi cười bảo:\n' +
      '- Bác lao động vừa là để rèn luyện thân thể cho khỏe mạnh, vừa là để tăng gia có thêm rau xanh cải thiện bữa ăn, đỡ một phần chi phí cho Nhà nước. Lao động là bổn phận thiêng liêng của con người. Người làm cách mạng nếu chỉ quen ngồi bàn giấy, tay không quen cầm cuốc cầm cày thì lâu dần sẽ sinh ra thói lười biếng, ỷ lại và xa rời quần chúng lao động.',
    mainLesson:
      'Lao động chân tay kết hợp lao động trí óc là phương pháp rèn luyện đạo đức cách mạng tốt nhất. Tự lao động phục vụ bản thân giúp con người giữ vững sự khiêm tốn và gắn bó mật thiết với nhân dân.',
    applicationForCadre:
      'Thực hiện Điều 3 Quy định 144: Cán bộ, đảng viên phải cần cù, chịu khó, không lười biếng, không đùn đẩy việc nặng cho cấp dưới; thường xuyên tự giác rèn luyện thân thể và tác phong lao động khẩn trương.',
    applicationForYouth:
      'Tích cực rèn luyện thân thể qua thể dục thể thao và lao động chân tay; không ngại khó, không lười vận động, nói không với lối sống thụ động "nghiện điện thoại".',
    applicationForCitizen:
      'Cần cù lao động sản xuất, xây dựng lối sống tự lực cánh sinh, chăm lo phát triển kinh tế gia đình.',
    readingTime: '3 phút',
    tags: ['Cuốc đất', 'Trồng rau', 'Rèn luyện thân thể', 'Lao động vinh quang'],
  },
  {
    id: 'gen_story_20',
    title: 'Tết trồng cây — Vì lợi ích mười năm và trăm năm',
    subtitle: 'Tầm nhìn sinh thái vĩ đại và triết lý trồng cây gắn liền với trồng người',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['ALL', 'YOUTH', 'CITIZEN'],
    yearPeriod: 'Tết Canh Tý 1960',
    location: 'Công viên Hồ Bảy Mẫu (nay là Công viên Thống Nhất, Hà Nội)',
    witnessOrSource: 'Báo Nhân Dân số ra ngày 11/01/1960 & Bảo tàng Hồ Chí Minh',
    goldenQuote: 'Mùa xuân là Tết trồng cây, làm cho đất nước càng ngày càng xuân. Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người!',
    content:
      'Mùa xuân năm 1960 (Tết Canh Tý), Chủ tịch Hồ Chí Minh đã khởi xướng phong trào "Tết trồng cây" trên toàn miền Bắc. Trong bài viết đăng trên Báo Nhân Dân, Bác phân tích rất giản dị nhưng chứa đựng tầm nhìn sinh thái vượt thời đại: "Việc này tốn kém ít mà lợi ích rất nhiều. Đất nước ta phong cảnh sẽ ngày càng tươi đẹp, khí hậu sẽ điều hòa hơn, cây gỗ sẽ đầy đủ hơn".\n' +
      'Sáng mồng Một Tết năm ấy, Bác Hồ đã cùng hàng ngàn đồng bào Thủ đô tham gia trồng cây đa đầu tiên tại Công viên Hồ Bảy Mẫu (nay là Công viên Thống Nhất, Hà Nội). Bác tự tay cầm xẻng xúc từng xẻng đất mùn lấp vào gốc cây con, rồi cẩn thận tưới nước, căn dặn các cháu thanh niên và các bác nông dân phải chăm bón cho cây sống xanh tốt chứ không phải trồng lấy lệ rồi bỏ mặc cho cây chết khô.\n' +
      'Đặc biệt, Bác luôn gắn việc bảo vệ thiên nhiên với việc bồi dưỡng thế hệ cách mạng đời sau qua câu nói bất hủ:\n' +
      '"Vì lợi ích mười năm thì phải trồng cây\n' +
      'Vì lợi ích trăm năm thì phải trồng người!".\n' +
      'Từ phong trào ấy, hàng triệu cây xanh đã vươn lên che chở xóm làng, phủ xanh đất trống đồi trọc, trở thành một nét đẹp văn hóa truyền thống thiêng liêng của dân tộc Việt Nam mỗi dịp Tết đến xuân về.',
    mainLesson:
      'Tư tưởng sinh thái và phát triển bền vững của Bác đi trước thời đại hàng thập kỷ. Trồng cây làm đẹp môi trường cũng giống như giáo dục con người, đòi hỏi sự kiên trì, công phu và tấm lòng yêu thương tha thiết.',
    applicationForCadre:
      'Gương mẫu trong các phong trào bảo vệ môi trường, ứng phó biến đổi khí hậu; đặc biệt coi trọng công tác đào tạo, bồi dưỡng, quy hoạch cán bộ trẻ kế cận theo Quy định 144.',
    applicationForYouth:
      'Tích cực hưởng ứng phong trào trồng cây xanh, bảo vệ nguồn nước, giảm thiểu rác thải nhựa, xây dựng nếp sống xanh vì cộng đồng.',
    applicationForCitizen:
      'Tham gia phong trào "Tết trồng cây" tại khu phố; chăm lo giáo dục đạo đức, nhân cách cho con cháu trong gia đình.',
    readingTime: '4 phút',
    tags: ['Tết trồng cây', 'Trồng người', 'Môi trường sinh thái', 'Mùa xuân', 'Phát triển bền vững'],
  },
  {
    id: 'gen_story_21',
    title: 'Nhường chiếc chăn ấm trong đêm đông Pác Bó',
    subtitle: 'Tình đồng chí sưởi ấm những ngày đông giá rét nơi đầu nguồn cách mạng',
    pillar: 'COMRADESHIP_HUMANITY',
    pillarTitle: 'Tình Đồng Chí, Nhân Ái & Tự Soi Tự Sửa',
    targetAudiences: ['ALL', 'CADRE', 'YOUTH'],
    yearPeriod: 'Mùa đông năm 1941',
    location: 'Lán Khuổi Nặm, Pác Bó, Cao Bằng',
    witnessOrSource: 'Theo hồi ký đồng chí Lê Quảng Ba (nguyên Tư lệnh Quân khu Việt Bắc)',
    goldenQuote: 'Chú đang bị sốt rét, cần giữ ấm để mau khỏi bệnh. Bác khỏe hơn, Bác ngồi bên bếp lửa sưởi ấm được!',
    content:
      'Mùa đông năm 1941, vùng núi đá Pác Bó (Cao Bằng) rét buốt thấu xương, sương muối phủ trắng xóa trên các ngọn cây ngọn cỏ. Lúc bấy giờ, điều kiện hoạt động bí mật của Bác Hồ và các đồng chí vô cùng thiếu thốn, ban đêm chỉ nằm trên những dát vầu lót lá cây khô.\n' +
      'Trong lán Khuổi Nặm chỉ có duy nhất một chiếc chăn bông cũ do đồng bào cơ sở gửi vào. Một đêm nọ, đồng chí cán bộ bảo vệ Bác lên cơn sốt rét rừng dữ dội, người run lên bần bật, hai hàm răng đánh vào nhau lập cập.\n' +
      'Bác Hồ thức dậy, Bác lại gần ân cần sờ trán thấy đồng chí sốt hầm hập. Không một chút ngần ngại, Bác kéo chiếc chăn bông duy nhất đắp kín người cho đồng chí cán bộ, rồi Bác chèn thêm những chiếc áo khoác xung quanh để giữ ấm cho người bệnh.\n' +
      'Đồng chí cán bộ thấy Bác ngồi co ro trong manh áo mỏng liền thều thào xin Bác lấy lại chăn đắp cho khỏi lạnh. Bác xoa đầu đồng chí và ân cần bảo:\n' +
      '- Chú đang ốm nặng, cần phải giữ ấm để mau hạ sốt, ngày mai còn tiếp tục công tác. Bác khỏe hơn chú nhiều, Bác ra ngồi cạnh bếp lửa củi nướng ngô là ấm rồi, chú cứ yên tâm ngủ đi!\n' +
      'Đêm ấy, người chiến sĩ cách mạng nằm trong chiếc chăn ấm áp, nhìn bóng Bác Hồ ngồi cặm cụi đọc tài liệu bên ánh lửa bập bùng suốt đêm đông giá rét, nước mắt lăn dài vì xúc động trước tình thương bao la của người Cha già.',
    mainLesson:
      'Tình đồng chí yêu thương nhau như ruột thịt là cội nguồn sức mạnh giúp cách mạng vượt qua muôn vàn gian khổ. Người chỉ huy thực thụ là người biết hy sinh quyền lợi riêng, nhận phần gian khổ về mình để chăm lo cho đồng chí, đồng đội.',
    applicationForCadre:
      'Thực hiện chuẩn mực "Tình đồng chí, nghĩa đồng bào" trong Quy định 144: Chân thành, yêu thương, tương trợ lẫn nhau trong công tác; không kèn cựa, trù dập hay ích kỷ vụ lợi.',
    applicationForYouth:
      'Xây dựng tình bạn trong sáng, tinh thần đồng đội keo sơn, sẵn sàng nhường nhịn, giúp đỡ bạn bè vượt qua khó khăn trong học tập và cuộc sống.',
    applicationForCitizen:
      'Giữ gìn tình làng nghĩa xóm tối lửa tắt đèn có nhau, sẵn lòng giúp đỡ những người xung quanh lúc hoạn nạn ốm đau.',
    readingTime: '3 phút',
    tags: ['Chiếc chăn ấm', 'Pác Bó', 'Tình đồng chí', 'Hy sinh', 'Thương yêu'],
  },
  {
    id: 'gen_story_22',
    title: 'Từ chối xe hơi sang trọng để tiết kiệm xăng cho ngân sách',
    subtitle: 'Tấm lòng luôn nghĩ cho gánh nặng ngân khố của Tổ quốc',
    pillar: 'THRIFT_INTEGRITY',
    pillarTitle: 'Cần, Kiệm, Liêm, Chính & Tiết Kiệm',
    targetAudiences: ['CADRE'],
    yearPeriod: 'Năm 1957',
    location: 'Văn phòng Phủ Chủ tịch, Hà Nội',
    witnessOrSource: 'Theo hồi ký đồng chí Tạ Quang Chiến (nguyên Tổng cục trưởng Tổng cục TDTT, cận vệ Bác Hồ)',
    goldenQuote: 'Chiếc xe Pobeda cũ Bác đang đi vẫn chạy tốt, tốn ít xăng. Chiếc xe sang kia hãy để dành phục vụ nguyên thủ quốc tế hoặc bán đi lấy tiền làm trường học!',
    content:
      'Sau ngày hòa bình lập lại ở miền Bắc, Bác Hồ được phân công một chiếc xe ôtô hiệu Pobeda do Chính phủ Liên Xô tặng. Chiếc xe này đã cũ, giảm xóc cứng, mùa hè thì nóng bức vì không có điều hòa nhiệt độ.\n' +
      'Năm 1957, một đoàn đại biểu Chính phủ nước bạn sang thăm và tặng Bác một chiếc xe ôtô hiệu ZIS rất sang trọng, chạy êm ru và có hệ thống điều hòa mát rượi. Các đồng chí ở Văn phòng Phủ Chủ tịch rất mừng, bàn nhau sẽ đưa chiếc xe mới này vào phục vụ Bác để bảo vệ sức khỏe của Người.\n' +
      'Khi các đồng chí lái chiếc xe mới về Nhà sàn báo cáo xin ý kiến Bác, Bác Hồ ra xem xe, hỏi cặn kẽ về động cơ rồi hỏi:\n' +
      '- Chiếc xe này chạy một trăm cây số ăn hết bao nhiêu lít xăng?\n' +
      '- Dạ thưa Bác, xe động cơ to nên ăn khoảng hai mươi lăm đến ba mươi lít xăng ạ!\n' +
      '- Thế chiếc xe Pobeda cũ Bác đang đi ăn hết bao nhiêu lít?\n' +
      '- Dạ, xe cũ chỉ ăn hết khoảng mười hai lít thôi ạ.\n' +
      'Bác Hồ liền khoát tay dứt khoát:\n' +
      '- Xe Pobeda cũ máy móc vẫn tốt, chạy an toàn, lại tốn ít xăng. Đất nước ta còn nghèo, xăng dầu đều phải nhập khẩu bằng từng hạt gạo của nhân dân. Bác đi chiếc xe cũ là hợp lý rồi. Còn chiếc xe sang trọng này, các chú bàn giao cho Bộ Ngoại giao để phục vụ đón tiếp các đoàn nguyên thủ quốc tế khi đến thăm nước ta, hoặc bán đi lấy kinh phí xây thêm trạm y tế, trường học cho đồng bào.',
    mainLesson:
      'Chống lãng phí, xa hoa trong phương tiện đi lại của cán bộ lãnh đạo. Sử dụng tài sản công phải luôn cân nhắc đến hiệu quả kinh tế và gánh nặng của ngân sách nhân dân.',
    applicationForCadre:
      'Thực hiện nghiêm quy định về tiêu chuẩn sử dụng xe ôtô công theo Quy định 144: Không mua sắm xe vượt tiêu chuẩn, không sử dụng xe công vào mục đích cá nhân, kiên quyết chống lãng phí ngân sách.',
    applicationForYouth:
      'Lựa chọn phương tiện đi lại phù hợp với điều kiện kinh tế gia đình; tích cực sử dụng phương tiện giao thông công cộng, xe điện để bảo vệ môi trường.',
    applicationForCitizen:
      'Tiêu dùng thông minh, tránh tâm lý chạy theo hình thức khoe khoang của cải vật chất.',
    readingTime: '4 phút',
    tags: ['Xe ôtô công', 'Tiết kiệm xăng', 'Chống xa xỉ', 'Liêm chính', 'Quy định 144'],
  },
  {
    id: 'gen_story_23',
    title: 'Bác Hồ sửa bài diễn văn cho cán bộ tuyên giáo',
    subtitle: 'Nghệ thuật diễn đạt: Viết cho ai xem? Nói cho ai nghe?',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['CADRE', 'YOUTH'],
    yearPeriod: 'Năm 1952',
    location: 'Chiến khu Việt Bắc',
    witnessOrSource: 'Báo Nhân Dân & Tạp chí Tuyên giáo Trung ương',
    goldenQuote: 'Viết cho ai xem? Nói cho ai nghe? Nếu viết chữ Hán, chữ Tây rắc rối để khoe chữ thì công nhân, nông dân ai hiểu được? Phải viết giản dị, thiết thực, dễ làm theo!',
    content:
      'Năm 1952, chuẩn bị cho một hội nghị tuyên truyền lớn của Mặt trận Liên Việt, một đồng chí cán bộ tuyên giáo trẻ được giao soạn thảo bài phát biểu cho Bác Hồ. Đồng chí này vốn học hành bài bản, văn phong hoa mỹ, nên đã viết một bản thảo dài gần hai mươi trang với rất nhiều từ ngữ Hán - Việt cổ, nhiều mệnh đề triết học trừu tượng.\n' +
      'Đọc xong bản thảo, Bác Hồ cho gọi người cán bộ lên lán làm việc. Bác rót nước mời đồng chí rồi mỉm cười hỏi:\n' +
      '- Bài viết của chú có nhiều chữ rất hay, nhưng Bác hỏi thật chú: Chú viết bài này cho ai đọc?\n' +
      '- Dạ thưa Bác, cháu viết để Bác đọc cho toàn thể cán bộ và đồng bào nghe ạ!\n' +
      '- Thế đồng bào ta hiện nay đa số là nông dân, công nhân và chiến sĩ, nhiều người mới thoát nạn mù chữ qua lớp bình dân học vụ. Chú dùng những chữ "hàn lâm", "tiền đồ xán lạn", "khuếch trương", "viễn cảnh vĩ mô"... thì bà con nông dân đang cầm cày nghe có hiểu được Bác muốn dặn điều gì không?\n' +
      'Đồng chí cán bộ ấp úng:\n' +
      '- Dạ... chắc là khó hiểu ạ.\n' +
      'Bác Hồ ân cần chỉ rõ:\n' +
      '- Tuyên truyền cách mạng là để dân hiểu, dân nhớ, dân tin và dân làm theo. Nếu mình nói những lời đao to búa lớn để khoe chữ thì dân không hiểu, mà không hiểu thì làm sao hành động được? Chú lấy bút ra đây, Bác cháu ta cùng gạch bỏ những chữ rườm rà, thay bằng lời ăn tiếng nói bình dị hàng ngày của bà con!\n' +
      'Hai mươi trang giấy được Bác rút gọn lại chỉ còn đúng hai trang, câu nào câu nấy gãy gọn, trong sáng như ca dao. Khi Bác đọc bài diễn văn ấy trước quần chúng, tiếng vỗ tay rền vang không ngớt vì ai nghe cũng hiểu ngay điều mình cần phải làm.',
    mainLesson:
      'Phong cách diễn đạt của Chủ tịch Hồ Chí Minh là chân lý giản dị nhất: Nói và viết phải phù hợp với đối tượng, rõ ràng, súc tích, tránh thói sáo rỗng, hoa hòe hoa sói.',
    applicationForCadre:
      'Cải tiến mạnh mẽ phong cách nói và viết theo Quy định 144: Nghị quyết, văn bản chỉ đạo của Đảng phải ngắn gọn, dễ hiểu, có địa chỉ và thời gian cụ thể; nói đi đôi với làm, chống bệnh sáo rỗng.',
    applicationForYouth:
      'Học cách diễn đạt mạch lạc, trung thực; không lạm dụng từ ngữ sính ngoại hay tiếng lóng vô nghĩa trong giao tiếp và công việc.',
    applicationForCitizen:
      'Trau dồi sự trong sáng của tiếng Việt, truyền dạy cho con cháu lời ăn tiếng nói lễ phép, chân thành.',
    readingTime: '4 phút',
    tags: ['Sửa bài diễn văn', 'Viết cho ai', 'Ngắn gọn dễ hiểu', 'Tuyên truyền', 'Giản dị'],
  },
  {
    id: 'gen_story_24',
    title: 'Cây đa Tân Trào và ân tình với đồng bào các dân tộc',
    subtitle: 'Đạo lý thủy chung, uống nước nhớ nguồn của vị lãnh tụ muôn vàn kính yêu',
    pillar: 'COMRADESHIP_HUMANITY',
    pillarTitle: 'Tình Đồng Chí, Nhân Ái & Tự Soi Tự Sửa',
    targetAudiences: ['ALL', 'CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: 'Ngày 20/3/1961',
    location: 'Khu Di tích Tân Trào, Sơn Dương, Tuyên Quang',
    witnessOrSource: 'Báo Nhân Dân & Tỉnh ủy Tuyên Quang',
    goldenQuote: 'Uống nước phải nhớ nguồn. Đồng bào các dân tộc đã chở che, cưu mang cách mạng suốt những năm tháng gian khổ, ơn nghĩa ấy suốt đời không được quên!',
    content:
      'Tháng 3 năm 1961, sau 16 năm rời căn cứ địa cách mạng về Thủ đô Hà Nội, Bác Hồ có dịp trở lại thăm quê hương Tân Trào (Tuyên Quang) — nơi Bác từng sống và lãnh đạo cuộc Tổng khởi nghĩa Tháng Tám năm 1945.\n' +
      'Về lại mái đình Hồng Thái, gốc đa Tân Trào lịch sử, Bác bồi hồi xúc động gặp lại những cụ già, những anh chị em đồng bào người Tày, Dao, Nùng từng chia củ sắn lùi, cọng rau rừng nuôi nấng Bác và các chiến sĩ Giải phóng quân thuở hàn vi.\n' +
      'Bác gọi đúng tên từng người, hỏi thăm từng gia đình xem nhà nào đã có ngói mới, con cháu đi học chữ đến lớp mấy. Tại buổi mít tinh ấm áp tình nghĩa dưới bóng cây đa Tân Trào, Bác căn dặn các đồng chí lãnh đạo tỉnh và huyện:\n' +
      '- Đất nước ta hôm nay đã có hòa bình ở miền Bắc, đời sống cán bộ ở thành phố đã được đủ đầy hơn. Nhưng người cán bộ cách mạng tuyệt đối không bao giờ được "ngủ quên trên chiến thắng", không được "khỏi rên quên thầy". Uống nước thì phải nhớ nguồn, ăn quả thì phải nhớ người trồng cây. Đồng bào Việt Bắc nghèo nhưng giàu lòng yêu nước, đã hy sinh xương máu che chở cho Trung ương Đảng và Bác. Cán bộ hôm nay phải ra sức chăm lo phát triển kinh tế, xóa đói giảm nghèo cho bà con các dân tộc, đó mới là sự đền ơn đáp nghĩa đúng đắn nhất!',
    mainLesson:
      'Lòng biết ơn và đạo lý thủy chung son sắt là phẩm chất cao đẹp nhất của con người. Người cách mạng không bao giờ được phản bội lại quá khứ, không bao giờ được quay lưng lại với nhân dân đã từng cưu mang, nâng đỡ mình lúc gian truân.',
    applicationForCadre:
      'Thực hiện Điều 4 Quy định 144: Trọng nghĩa tình, thủy chung son sắt với Đảng, với Tổ quốc và nhân dân; kiên quyết chống căn bệnh bạc nghĩa, quay lưng với nhân dân khi đã có chức quyền.',
    applicationForYouth:
      'Ghi nhớ công ơn trời biển của cha mẹ, thầy cô và các bậc tiền bối cách mạng; sống có trước có sau, nhân ái và trách nhiệm.',
    applicationForCitizen:
      'Phát huy truyền thống gia phong hiếu thuận, xóm giềng đoàn kết gắn bó, biết ơn sự hy sinh của các thế hệ cha anh đi trước.',
    readingTime: '4 phút',
    tags: ['Tân Trào', 'Uống nước nhớ nguồn', 'Ân tình', 'Thủy chung', 'Đồng bào dân tộc'],
  },
];
