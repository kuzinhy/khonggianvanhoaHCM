/**
 * Cơ sở dữ liệu: Bác Hồ Với Ngày Này Năm Xưa
 * Biên soạn dựa trên:
 * - Hồ Chí Minh Biên niên tiểu sử (NXB Chính trị quốc gia Sự thật)
 * - Hồ Chí Minh Toàn tập (15 tập, NXB CTQG Sự thật, 2011)
 * - Tư liệu từ Bảo tàng Hồ Chí Minh (baotanghochiminh.vn)
 */

export interface OnThisDayEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  summary: string;
  category: 'SỰ KIỆN LỊCH SỬ' | 'LỜI BÁC DẠY' | 'SẮC LỆNH - VĂN KIỆN' | 'HOẠT ĐỘNG NGOẠI GIAO' | 'DÂN VẬN & CƠ SỞ';
  location?: string;
  quote?: string;
  citation: string;
  historicalContext?: string;
  chiBoApplication?: string;
}

export const ON_THIS_DAY_DATABASE: OnThisDayEvent[] = [
  // Tháng 11
  {
    id: 'otd-11-24-1',
    day: 24,
    month: 11,
    year: 1946,
    title: 'Dự và phát biểu tại Hội nghị Văn hóa toàn quốc lần thứ nhất',
    location: 'Nhà hát Lớn Hà Nội',
    category: 'LỜI BÁC DẠY',
    summary: 'Chủ tịch Hồ Chí Minh khẳng định luận điểm bất hủ: "Văn hóa soi đường cho quốc dân đi". Người chỉ rõ văn hóa phải phục vụ nhân dân, phục vụ cách mạng và kháng chiến.',
    quote: 'Văn hóa nghệ thuật cũng là một mặt trận. Anh chị em là chiến sĩ trên mặt trận ấy. Văn hóa phải soi đường cho quốc dân đi.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 515–516',
    historicalContext: 'Trong bối cảnh thực dân Pháp chuẩn bị tái chiếm Thủ đô, Hội nghị Văn hóa toàn quốc đặt nền móng cho nền văn hóa dân tộc - khoa học - đại chúng.',
    chiBoApplication: 'Chi bộ vận dụng trong việc xây dựng nếp sống văn hóa, phát triển văn hóa học tập suốt đời tại khu phố.'
  },
  {
    id: 'otd-11-24-2',
    day: 24,
    month: 11,
    year: 1953,
    title: 'Gửi thư khen ngợi cán bộ và chiến sĩ Mặt trận Tây Bắc',
    location: 'Chiến khu Việt Bắc',
    category: 'SẮC LỆNH - VĂN KIỆN',
    summary: 'Bác nhắc nhở bộ đội ta phải phát huy tinh thần chịu đựng gian khổ, tuyệt đối giữ nghiêm kỷ luật dân vận, giúp đỡ đồng bào các dân tộc.',
    quote: 'Bộ đội ta là bộ đội của nhân dân, đi đến đâu dân cũng yêu quý, như thế mới đánh thắng giặc.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 8, tr. 340',
    historicalContext: 'Thời điểm chuẩn bị mở màn chiến dịch Đông Xuân 1953 - 1954 tiến tới Điện Biên Phủ.',
    chiBoApplication: 'Bài học về kỷ cương, tinh thần gắn bó máu thịt với nhân dân của cán bộ đảng viên.'
  },
  {
    id: 'otd-11-24-3',
    day: 24,
    month: 11,
    year: 1965,
    title: 'Viết bài "Nông dân ta ngày nay" đăng trên báo Nhân Dân',
    location: 'Hà Nội',
    category: 'DÂN VẬN & CƠ SỞ',
    summary: 'Biểu dương bà con nông dân miền Bắc hăng hái thi đua sản xuất, vừa cày cấy vừa sẵn sàng chiến đấu, đóng góp lương thực cho tiền tuyến miền Nam.',
    quote: 'Mỗi người làm việc bằng hai để đền đáp lại đồng bào miền Nam ruột thịt.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 14, tr. 670',
    historicalContext: 'Giai đoạn đế quốc Mỹ leo thang ném bom phá hoại miền Bắc, phong trào "Thóc không thiếu một cân, quân không thiếu một người".',
    chiBoApplication: 'Vận động đảng viên và quần chúng thi đua lao động, tiết kiệm, hoàn thành tốt nhiệm vụ phát triển kinh tế cơ sở.'
  },
  {
    id: 'otd-11-23-1',
    day: 23,
    month: 11,
    year: 1940,
    title: 'Theo dõi và đánh giá cao tinh thần khởi nghĩa Nam Kỳ',
    location: 'Quảng Tây (Trung Quốc)',
    category: 'SỰ KIỆN LỊCH SỬ',
    summary: 'Đồng chí Nguyễn Ái Quốc biểu dương tinh thần quật khởi của quân và dân Nam Bộ, khẳng định đó là tiếng súng báo hiệu cho cuộc khởi nghĩa toàn quốc.',
    quote: 'Đó là những tiếng súng báo hiệu cho cuộc khởi nghĩa toàn quốc, là bước đấu tranh oanh liệt của nhân dân ta.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 3, tr. 235',
    historicalContext: 'Ngày Khởi nghĩa Nam Kỳ bùng nổ, xuất hiện lá cờ đỏ sao vàng đầu tiên.',
    chiBoApplication: 'Giáo dục truyền thống yêu nước, kiên trung bất khuất cho thế hệ trẻ và đảng viên mới.'
  },
  {
    id: 'otd-11-23-2',
    day: 23,
    month: 11,
    year: 1946,
    title: 'Ký Sắc lệnh thành lập Hội Chữ thập đỏ Việt Nam',
    location: 'Hà Nội',
    category: 'SẮC LỆNH - VĂN KIỆN',
    summary: 'Chủ tịch Hồ Chí Minh nhận lời làm Chủ tịch danh dự đầu tiên của Hội Hồng thập tự Việt Nam (nay là Hội Chữ thập đỏ Việt Nam), đặt nền móng cho công tác nhân đạo nhân văn.',
    quote: 'Phải xuất phát từ tình thương yêu đồng bào vô hạn mà chăm lo cho người nghèo khó, người gặp rủi ro.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 498',
    historicalContext: 'Đại hội Hồng thập tự Việt Nam họp tại đình làng Thanh Ấm (Ứng Hòa, Hà Tây nay là Hà Nội).',
    chiBoApplication: 'Thực hiện phong trào đền ơn đáp nghĩa, chăm lo an sinh xã hội tại 21 khu phố.'
  },
  {
    id: 'otd-11-25-1',
    day: 25,
    month: 11,
    year: 1945,
    title: 'Ký Chỉ thị "Kháng chiến kiến quốc" của Ban Thường vụ Trung ương Đảng',
    location: 'Hà Nội',
    category: 'SẮC LỆNH - VĂN KIỆN',
    summary: 'Chỉ thị lịch sử xác định rõ kẻ thù chính của dân tộc lúc này là thực dân Pháp xâm lược; đề ra 4 nhiệm vụ cấp bách: củng cố chính quyền, chống thực dân Pháp, bài trừ nội phản, cải thiện đời sống nhân dân.',
    quote: 'Dân tộc trên hết, Tổ quốc trên hết.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 115–120',
    historicalContext: 'Chính quyền non trẻ đối mặt thù trong giặc ngoài (Pháp ở miền Nam, Tưởng ở miền Bắc, nạn đói, nạn dốt).',
    chiBoApplication: 'Bài học về xác định trọng tâm, trọng điểm, bảo vệ kỷ cương tổ chức Đảng cơ sở.'
  },
  // Các mốc lịch sử tiêu biểu khác trong năm
  {
    id: 'otd-01-06',
    day: 6,
    month: 1,
    year: 1946,
    title: 'Chủ tịch Hồ Chí Minh đi bỏ phiếu Tổng tuyển cử đầu tiên',
    location: 'Hà Nội',
    category: 'SỰ KIỆN LỊCH SỬ',
    summary: 'Bác Hồ cùng nhân dân cả nước tham gia cuộc bầu cử Quốc hội khóa I, khẳng định quyền làm chủ thiêng liêng của nhân dân Việt Nam.',
    quote: 'Tổng tuyển cử là một dịp cho toàn thể quốc dân tự do lựa chọn những người có tài, có đức, để gánh vác việc nước.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 153',
    chiBoApplication: 'Thực hiện quyền dân chủ cơ sở, phát huy vai trò giám sát của Mặt trận và nhân dân.'
  },
  {
    id: 'otd-02-03',
    day: 3,
    month: 2,
    year: 1930,
    title: 'Hội nghị thành lập Đảng Cộng sản Việt Nam thành công',
    location: 'Cửu Long (Hương Cảng)',
    category: 'SỰ KIỆN LỊCH SỬ',
    summary: 'Nguyễn Ái Quốc chủ trì hội nghị hợp nhất 3 tổ chức cộng sản thành một Đảng duy nhất lấy tên là Đảng Cộng sản Việt Nam, thông qua Cương lĩnh chính trị đầu tiên.',
    quote: 'Đảng ta là đạo đức, là văn minh, là thống nhất, độc lập, là hòa bình, ấm no.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 3, tr. 1–5 & Tập 12, tr. 403',
    chiBoApplication: 'Sinh hoạt chi bộ chuyên đề ngày thành lập Đảng, bồi dưỡng lý tưởng cách mạng cho đảng viên.'
  },
  {
    id: 'otd-03-08',
    day: 8,
    month: 3,
    year: 1952,
    title: 'Thư gửi phụ nữ nhân dịp Quốc tế Phụ nữ và khởi nghĩa Hai Bà Trưng',
    location: 'Chiến khu Việt Bắc',
    category: 'DÂN VẬN & CƠ SỞ',
    summary: 'Bác ca ngợi truyền thống vẻ vang của phụ nữ Việt Nam và giao nhiệm vụ thi đua sản xuất, nuôi dạy con tốt, tham gia quản lý nhà nước.',
    quote: 'Non sông gấm vóc Việt Nam do phụ nữ ta, trẻ cũng như già, ra sức dệt thêu mà thêm tốt đẹp rực rỡ.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 7, tr. 340',
    chiBoApplication: 'Phát huy vai trò của phụ nữ trong công tác chi bộ, chính quyền và phong trào dân vận khéo.'
  },
  {
    id: 'otd-05-19',
    day: 19,
    month: 5,
    year: 1941,
    title: 'Thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh)',
    location: 'Pác Bó (Cao Bằng)',
    category: 'SỰ KIỆN LỊCH SỬ',
    summary: 'Bác chủ trì Hội nghị Trung ương 8, quyết định thành lập Mặt trận Việt Minh để đoàn kết toàn dân tộc đứng lên đánh Pháp, đuổi Nhật.',
    quote: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 3, tr. 250',
    chiBoApplication: 'Tăng cường khối đại đoàn kết toàn dân tộc tại khu dân cư, phát huy vai trò Mặt trận.'
  },
  {
    id: 'otd-09-02',
    day: 2,
    month: 9,
    year: 1945,
    title: 'Đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',
    location: 'Ba Đình (Hà Nội)',
    category: 'SỰ KIỆN LỊCH SỬ',
    summary: 'Chủ tịch Hồ Chí Minh long trọng tuyên bố trước quốc dân đồng bào và toàn thế giới sự ra đời của nước Việt Nam Dân chủ Cộng hòa.',
    quote: 'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 1–4',
    chiBoApplication: 'Giáo dục lòng tự hào dân tộc, kiên định con đường độc lập dân tộc gắn liền CNXH.'
  },
  {
    id: 'otd-10-15',
    day: 15,
    month: 10,
    year: 1949,
    title: 'Công bố bài báo kinh điển "Dân vận" trên báo Sự thật',
    location: 'Chiến khu Việt Bắc',
    category: 'LỜI BÁC DẠY',
    summary: 'Bài viết đúc kết tư tưởng Hồ Chí Minh về công tác dân vận, xác định dân vận là việc sống còn của cách mạng.',
    quote: 'Dân vận kém thì việc gì cũng kém. Dân vận khéo thì việc gì cũng thành công. Óc nghĩ, mắt trông, tai nghe, chân đi, miệng nói, tay làm.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 6, tr. 232–234',
    chiBoApplication: 'Tiêu chuẩn thực hành công tác dân vận khéo cho từng đảng viên và cán bộ khu phố.'
  },
  {
    id: 'otd-12-19',
    day: 19,
    month: 12,
    year: 1946,
    title: 'Ra Lời kêu gọi Toàn quốc kháng chiến',
    location: 'Vạn Phúc (Hà Đông)',
    category: 'SỰ KIỆN LỊCH SỬ',
    summary: 'Hiệu triệu toàn thể dân tộc Việt Nam đứng lên kháng chiến chống thực dân Pháp xâm lược.',
    quote: 'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
    citation: 'Hồ Chí Minh Toàn tập, Tập 4, tr. 534',
    chiBoApplication: 'Nêu cao tinh thần cảnh giác cách mạng, bảo vệ an ninh trật tự và kỷ cương Đảng.'
  }
];

/**
 * Lấy các sự kiện của một ngày cụ thể (mặc định lấy theo ngày hiện tại)
 */
export function getEventsForDate(day?: number, month?: number): OnThisDayEvent[] {
  const now = new Date();
  const d = day !== undefined ? day : now.getDate();
  const m = month !== undefined ? month : now.getMonth() + 1;

  const matches = ON_THIS_DAY_DATABASE.filter(
    (ev) => ev.day === d && ev.month === m
  );

  if (matches.length > 0) {
    return matches;
  }

  // Nếu ngày hôm nay chưa có sự kiện riêng trong DB mẫu, lấy các sự kiện gần nhất trong tháng hoặc tiêu biểu
  const monthMatches = ON_THIS_DAY_DATABASE.filter((ev) => ev.month === m);
  if (monthMatches.length > 0) {
    return monthMatches;
  }

  // Fallback về sự kiện tháng 11
  return ON_THIS_DAY_DATABASE.slice(0, 3);
}
