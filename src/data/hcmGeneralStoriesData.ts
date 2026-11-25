/**
 * DỮ LIỆU CHUYÊN MỤC: CÁC MẨU CHUYỆN HỌC TẬP VÀ LÀM THEO TẤM GƯƠNG BÁC HỒ
 * Dành cho mọi đối tượng: Cán bộ, Đảng viên, Công chức, Thanh niên và Toàn thể Nhân dân.
 * Nguồn tư liệu:
 * - Trung tâm Công tác Xã hội - Giáo dục Dạy nghề Thiếu niên TP.HCM (congtacxahoihcm.vn)
 * - Ban Tuyên giáo Trung ương & Viện Lịch sử Đảng
 * - Bộ tư liệu "120 Mẩu chuyện về Bác ngắn, hay và ý nghĩa nhất"
 * - Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch & Bảo tàng Hồ Chí Minh
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
  applicationForCadre: string; // Vận dụng cho Cán bộ, Đảng viên (theo Quy định 144)
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
    subtitle: 'Nỗi lòng của vị Chủ tịch nước trước giọt nước mắt của chị Chín',
    pillar: 'CLOSE_TO_PEOPLE',
    pillarTitle: 'Gần Dân, Trọng Dân, Vì Dân Phục Vụ',
    targetAudiences: ['CADRE', 'CITIZEN', 'YOUTH'],
    yearPeriod: 'Đêm Giao thừa Tết Nhâm Dần 1962',
    location: 'Ngõ Chợ Khâm Thiên, Hà Nội',
    witnessOrSource: 'Theo hồi ký đồng chí Vũ Kỳ (Thư ký Bác Hồ) & Khu Di tích Phủ Chủ tịch',
    goldenQuote: 'Một người làm Chủ tịch nước mà để cho dân nghèo ăn Tết như thế này là Chủ tịch nước có lỗi!',
    content:
      'Tối 30 Tết Nhâm Dần (1962), trước lúc giao thừa chuyển giao năm mới, Bác Hồ căn dặn các đồng chí cảnh vệ: "Tối nay Bác cháu ta đi chúc Tết nhưng không đến nhà cán bộ to, mà đến những nhà nghèo nhất ở Thủ đô".\\nXe đưa Bác đến ngõ Chợ Khâm Thiên, dừng trước một căn nhà xiêu vẹo, ẩm thấp của chị Chín — một người phụ nữ góa chồng, một mình bươn chải nuôi ba đứa con nhỏ bằng nghề gánh nước thuê. Lúc Bác bước vào cửa, chị Chín đang lúi húi đặt đôi thùng gánh nước xuống góc nhà, trên bàn thờ không có lấy một nén hương, ba đứa trẻ đang ngồi co ro bên mâm cơm nguội ngắt.\\nThấy Bác Hồ bước vào trong chiếc áo dạ ấm áp và đôi mắt sáng hiền từ, chị Chín sững sờ đánh rơi chiếc đòn gánh xuống đất, rồi ôm chầm lấy Bác khóc nức nở:\\n- Bác ơi... Sao Bác lại đến nhà con? Nhà con nghèo hèn, rách rưới thế này cơ mà!\\nBác Hồ rưng rưng nước mắt, ân cần vỗ về người phụ nữ nghèo khổ:\\n- Bác không đến thăm những gia đình như mẹ con cháu thì Bác còn đến thăm ai? Năm mới, Bác chúc gia đình cháu mạnh khỏe, các cháu chăm ngoan học giỏi.\\nBác tự tay trao bánh chưng, kẹo ngọt và lì xì cho từng đứa trẻ. Trên đường trở về Nhà sàn, Bác trầm ngâm không nói một lời suốt chặng đường dài. Về đến nơi, Bác bảo đồng chí thư ký: "Một người làm Chủ tịch nước mà để cho nhân dân mình còn nghèo đói, túng thiếu trong đêm giao thừa như thế này là Chủ tịch nước có lỗi với dân!". Sau Tết đó, Bác chỉ thị cho Ủy ban Hành chính Hà Nội phải tìm ngay việc làm ổn định cho chị Chín và chăm lo cho các gia đình lao động khó khăn.',
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
      'Ở cơ quan Phủ Chủ tịch, ai cũng biết Bác Hồ có một chiếc áo gối bằng vải bông nhuộm màu nâu sồng đã sờn rách ở mép. Một hôm, đồng chí phục vụ thấy chiếc gối đã quá cũ, vải bở bục ra, liền tự ý mang đi cất và thay vào đó một chiếc áo gối mới tinh khôi bằng lụa mềm do một đơn vị gửi biếu Bác.\\nBuổi trưa, khi Bác chuẩn bị ngả lưng nghỉ, nhìn thấy chiếc gối mới, Bác hỏi:\\n- Chiếc gối cũ của Bác đâu rồi chú?\\n- Dạ thưa Bác, chiếc gối kia rách mép rồi ạ, cháu thay chiếc gối mới này để Bác nằm cho êm và giữ gìn sức khỏe.\\nBác Hồ lắc đầu nhẹ nhàng bảo:\\n- Chú tìm lại chiếc gối cũ mang lên đây cho Bác. Nó mới rách một miếng nhỏ ở góc, chú lấy kim chỉ khéo léo vá lại là còn dùng được thêm mấy năm nữa. Đất nước ta đang còn nghèo, đồng bào miền Bắc đang thắt lưng buộc bụng xây dựng hậu phương, đồng bào miền Nam đang đổ máu dưới mưa bom bão đạn, mình là lãnh đạo mà dùng đồ xa hoa, lãng phí thì coi sao được?\\nNgười phục vụ nghẹn ngào mang chiếc gối cũ về, cẩn thận ngồi vá lại từng đường kim mũi chỉ rồi mang lên đặt lại trên chiếc giường gỗ đơn sơ của Bác. Chiếc gối vá ấy đã theo Bác suốt những năm tháng làm việc vì nước vì dân cho đến khi Bác đi xa.',
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
      'Trong một chuyến Bác Hồ đi thăm và làm việc tại một tỉnh miền núi phía Bắc, Bác đến dự hội nghị sơ kết phong trào sản xuất và nói chuyện thân mật với hơn ba trăm cán bộ, đảng viên địa phương.\\nBuổi nói chuyện thành công rực rỡ, cán bộ ai nấy đều phấn khởi trước những lời căn dặn mộc mạc mà thấm thía của Bác. Kết thúc buổi làm việc, đồng chí Bí thư Tỉnh ủy cung kính tiến lại bên Bác, trên tay cầm một chiếc phong bì dày dặn và thưa:\\n- Thưa Bác, Ban Thường vụ Tỉnh ủy xin phép gửi Bác chút kinh phí bồi dưỡng tiền nói chuyện và tiền xăng xe đi đường của Bác ạ!\\nBác Hồ nghiêm nét mặt, khoát tay dứt khoát không nhận và hỏi:\\n- Tiền này ở đâu ra mà các chú trích ra đưa cho Bác?\\n- Dạ thưa Bác, kinh phí này trích từ ngân quỹ tiếp khách của cơ quan Tỉnh ủy ạ.\\nBác nghiêm nghị nhắc nhở:\\n- Ngân sách Tỉnh ủy là tiền của Nhà nước, do mồ hôi nước mắt của bà con nhân dân đóng thuế nộp vào để lo việc chung, phát triển đường sá trường trạm. Bác đi thăm dân, nói chuyện với cán bộ là trách nhiệm của người đầy tớ phục vụ nhân dân, Đảng và Nhà nước đã trả lương hàng tháng cho Bác rồi. Các chú tuyệt đối không được bày ra thói phong bì bồi dưỡng vô nguyên tắc như thế này! Chú mang ngay số tiền này nhập lại vào công quỹ để mua thêm sách vở cho các cháu học sinh vùng cao nghèo.',
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
      'Đầu năm 1958, đợt hạn hán nghiêm trọng kéo dài làm các cánh đồng lúa ngoại thành Hà Nội nứt nẻ, lúa non có nguy cơ chết khô. Nghe tin, Bác Hồ không ngồi ở văn phòng xem báo cáo mà trực tiếp đi thị sát cánh đồng xã Tả Thanh Oai.\\nĐến nơi, thấy bà con nông dân đang hối hả gầu sòng, gầu dây tát nước từ sông Nhuệ vào đồng cứu lúa, Bác cởi ngay đôi dép cao su để trên bờ, xắn quần quá đầu gối rồi thoăn thoắt lội xuống bùn lầy cùng bà con.\\nBác cầm một đầu dây gầu dai, phối hợp nhịp nhàng tát nước với một lão nông tri điền. Từng gầu nước mát lành cuồn cuộn đổ vào mương dẫn ra cánh đồng khô hạn trong tiếng cười rạng rỡ của nhân dân. Mồ hôi ướt đầm trán Bác, nhưng Bác vẫn thoăn thoắt đưa tay theo nhịp gầu.\\nSau hơn một tiếng đồng hồ tát nước cùng nhân dân, Bác lên bờ rửa chân tay, chia kẹo cho các cháu nhỏ và thân mật nói chuyện với các đồng chí cán bộ huyện, xã đi cùng:\\n- Các chú thấy đấy, lúa cần nước như con người cần cơm ăn. Cán bộ không thể đứng trên bờ chỉ tay năm ngón mà phải cùng lội ruộng với dân, cùng chịu bùn lấm lem mới hiểu hết nỗi nhọc nhằn của người nông dân một nắng hai sương làm ra hạt gạo!',
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
      'Thời kỳ Bác Hồ hoạt động bí mật ở hang Pác Bó (Cao Bằng), Bác thường sống chan hòa với đồng bào người Tày, người Nùng. Một lần chuẩn bị lên đường đi công tác xa, một em bé gái người Tày níu tay áo Bác nũng nịu dặn: "Bác ơi, khi nào Bác về, Bác nhớ mua cho cháu một chiếc vòng bạc đeo tay nhé!". Bác mỉm cười xoa đầu em và hứa: "Được rồi, Bác về Bác sẽ mua cho cháu!".\\nHai năm sau, trải qua bao nhiêu biến cố, tù đày gian nan của thực dân và công việc bộn bề chuẩn bị khởi nghĩa, Bác Hồ mới có dịp trở lại bản Pác Bó. Mọi người ùa ra đón Bác trong niềm vui mừng khôn xiết. Cô bé ngày trước nay đã lớn hơn, e thẹn đứng nép sau lưng mẹ, chính em và mọi người trong bản cũng đã hoàn toàn quên bẵng lời dặn dò trẻ con năm xưa.\\nThế nhưng, vừa bước vào nhà, Bác Hồ mở túi vải, lấy ra một chiếc vòng bạc nhỏ sáng lấp lánh còn mới nguyên và đặt vào bàn tay nhỏ bé của em. Em bé và cha mẹ xúc động đứng lặng người đi không nói nên lời.\\nBác Hồ mỉm cười ân cần nói với các đồng chí cán bộ đi cùng:\\n- Cháu bé dặn Bác mua chiếc vòng bạc từ hai năm trước. Mình đã hứa với một đứa trẻ thì dù trải qua bao năm tháng gian khổ, dù bận trăm công nghìn việc cũng phải giữ cho kỳ được chữ tín. Giữ lời hứa là danh dự, là phẩm giá của người làm cách mạng. Nếu không giữ lời với một đứa trẻ thì làm sao nhân dân tin cậy được mình?',
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
      'Năm 1956, trong công cuộc Cải cách ruộng đất ở miền Bắc, do áp dụng rập khuôn và nóng vội, Đảng và Nhà nước ta đã phạm phải một số sai lầm nghiêm trọng làm oan sai cho một số cán bộ, đảng viên và người dân lương thiện.\\nKhi phát hiện ra sai lầm, Bác Hồ và Trung ương Đảng kiên quyết lãnh đạo công tác sửa sai triệt để. Tại Hội nghị Trung ương và sau đó trước hàng vạn đồng bào tại Quảng trường Ba Đình, Bác Hồ đã bước lên bục phát biểu.\\nVị Chủ tịch nước tóc bạc phơ không né tránh, không đổ lỗi cho hoàn cảnh hay cấp dưới. Bác nghẹn ngào tự nhận trách nhiệm cao nhất về mình. Khi nói về những nỗi oan uổng, mất mát của người dân và đồng chí, Bác đã rút chiếc khăn tay lau đi những giọt nước mắt lăn dài trên gò má.\\nBác nói bằng tất cả sự chân thành, đau xót:\\n- Người ta ai cũng có thể phạm sai lầm. Có lỗi thì phải thật thà nhận lỗi và kiên quyết sửa chữa. Trung ương Đảng và Bác xin chân thành nhận khuyết điểm trước toàn thể nhân dân. Chúng ta sai ở đâu, kiên quyết sửa chữa ngay ở đó để trả lại danh dự và tài sản cho bà con cô bác và các đồng chí bị oan!\\nHành động rơi nước mắt và dũng cảm nhận lỗi công khai trước quốc dân đồng bào của Bác đã làm hàng triệu con tim rung động, củng cố vững chắc niềm tin sắt son của nhân dân đối với Đảng.',
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
      'Trên bàn làm việc của Bác Hồ ở Nhà sàn, bao giờ cũng có một chồng phong bì thư được xếp thật ngay ngắn. Điều đặc biệt là hầu hết những chiếc phong bì đó đều là phong bì đã qua sử dụng do các cơ quan, đoàn thể gửi tài liệu đến cho Bác.\\nMỗi khi nhận được thư từ, tài liệu, Bác dùng một con dao nhỏ rọc giấy rất khéo léo dọc theo mép phong bì để không làm rách giấy. Sau đó, Bác cẩn thận lộn mặt trong còn trắng ra ngoài, dùng hồ dán mép lại, biến thành một chiếc phong bì mới tinh để gửi thư cho các cơ quan, đơn vị.\\nBác còn căn dặn các đồng chí văn phòng: Những văn bản, tài liệu nào chỉ in một mặt, mặt sau còn trắng thì tuyệt đối không được vứt vào sọt rác, mà phải cắt nhỏ lại thành từng tập giấy nháp để ghi chép nội dung công việc hàng ngày.\\nMột đồng chí cán bộ buột miệng hỏi: "Thưa Bác, Bác là Chủ tịch nước, Nhà nước đâu thiếu gì phong bì và giấy trắng mà Bác phải làm kỳ công thế ạ?".\\nBác Hồ mỉm cười giải thích ân cần:\\n- Đúng là Nhà nước không thiếu, nhưng tiết kiệm một tờ giấy, một chiếc phong bì tuy nhỏ, nhưng hàng triệu cán bộ, công chức trên cả nước cùng tiết kiệm thì mỗi năm Nhà nước dôi ra hàng trăm tấn giấy, tiết kiệm được hàng tỷ đồng tiền thuế của dân để mua thêm máy móc, xây thêm trường học cho các cháu nhỏ!',
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
      'Mỗi lần Bác Hồ đi công tác kiểm tra tình hình sản xuất ở các địa phương, Bác luôn yêu cầu giữ bí mật đến phút chót, xe đi không bật còi ủ, không có đoàn xe cảnh sát dẫn đường huyên náo.\\nMột lần Bác về thăm một hợp tác xã nông nghiệp. Khi xe gần đến địa phận xã, Bác thấy hai bên đường quét tước sạch sẽ bất thường, cờ hoa khẩu hiệu giăng rực rỡ, cán bộ huyện xã mặc quần áo com-lê đứng thành hàng dài chờ đợi. Bác liền bảo đồng chí lái xe cho xe rẽ ngoặt sang một con đường đất nhỏ dẫn thẳng vào xóm nghèo cuối xã.\\nBác đến thẳng sân nhà của một bà cụ neo đơn, ngồi nói chuyện hỏi thăm tình hình thu hoạch lúa mùa, việc chia thóc của hợp tác xã thực chất ra sao. Sau đó, Bác mới đi bộ ra trụ sở xã nơi các đồng chí lãnh đạo địa phương đang hốt hoảng tìm kiếm Bác.\\nBác ôn tồn nhưng rất nghiêm khắc phê bình:\\n- Bác về thăm để nắm bắt thực tế đời sống của bà con xem còn khó khăn gì, chứ không phải về để dự tiệc tùng, cờ hoa phô trương! Các chú chuẩn bị đón rước linh đình thế này làm tốn kém công sức của dân, quét tước sạch sẽ một đoạn đường để che mắt Bác thì làm sao Bác thấy được thực chất cái đói, cái khổ của dân?',
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
];
