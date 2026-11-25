/**
 * DỮ LIỆU CHUYÊN SÂU: BẢN ĐỒ DI TÍCH PHƯỜNG THỦ DẦU MỘT (MỚI)
 * VÀ LỊCH SỬ ĐẢNG BỘ TP. THỦ DẦU MỘT (ĐẾN 1/7/2025) & BIÊN NIÊN SỬ ĐẢNG BỘ PHƯỜNG (TỪ 1/7/2025 ĐẾN NAY)
 * 
 * Nguồn tư liệu kiểm chứng:
 * - Ban Tuyên giáo & Thành ủy Thủ Dầu Một (Lịch sử Đảng bộ TP. Thủ Dầu Một 1930 - 2025)
 * - Nghị quyết Ủy ban Thường vụ Quốc hội về sắp xếp đơn vị hành chính cấp xã (hiệu lực 01/07/2025)
 * - Hồ sơ Di tích Lịch sử - Văn hóa, Kiến trúc Nghệ thuật Sở VHTT&DL Tỉnh Bình Dương
 * - Ban Chỉ đạo xây dựng Không gian Văn hóa Hồ Chí Minh Phường Thủ Dầu Một
 */

export interface ThuDauMotHeritageSite {
  id: string;
  name: string;
  category: 'LỊCH SỬ CÁCH MẠNG' | 'KIẾN TRÚC CỔ' | 'VĂN HÓA TÂM LINH' | 'DI SẢN ĐÔ THỊ';
  rank: 'Di tích Quốc gia' | 'Di tích Cấp Tỉnh' | 'Công trình Di sản Đô thị' | 'Địa chỉ Đỏ Cơ sở';
  address: string;
  coords: { lat: number; lng: number };
  coordsText: string;
  googleMapsUrl: string;
  establishedYear: string;
  visitDuration: string;
  openingHours: string;
  ticketPrice: string;
  thumbnail: string;
  summary: string;
  historicalSignificance: string;
  architecturalHighlights: string[];
  visitorTips: string[];
  audioGuideText: string;
}

export interface HeritageTourRoute {
  id: string;
  title: string;
  theme: string;
  duration: string;
  distance: string;
  recommendedTransport: string;
  description: string;
  siteIds: string[];
  badgeColor: string;
}

export interface PartyHistoryPhase {
  id: string;
  period: string;
  title: string;
  badge: string;
  summary: string;
  milestones: Array<{
    dateOrYear: string;
    eventTitle: string;
    content: string;
    keyFigureOrDocument?: string;
    significanceBadge?: string;
  }>;
  achievements: string[];
}

export interface WardChronologyEntry {
  id: string;
  dateStr: string;
  timestamp: string;
  category: 'XÂY DỰNG ĐẢNG' | 'CHUYỂN ĐỔI SỐ' | 'KHÔNG GIAN VĂN HÓA HCM' | 'CHÍNH QUYỀN ĐÔ THỊ' | 'AN SINH XÃ HỘI';
  title: string;
  summary: string;
  details: string;
  leadingUnit: string;
  documentRef?: string;
  isHighlight?: boolean;
}

// =========================================================================
// 1. HỆ THỐNG 08 DI TÍCH TRỌNG ĐIỂM TRÊN ĐỊA BÀN PHƯỜNG THỦ DẦU MỘT (MỚI)
// =========================================================================
export const THU_DAU_MOT_HERITAGE_SITES: ThuDauMotHeritageSite[] = [
  {
    id: 'site-nhotruyenthong',
    name: 'Nhà Truyền Thống Thủ Dầu Một',
    category: 'LỊCH SỬ CÁCH MẠNG',
    rank: 'Di tích Cấp Tỉnh',
    address: 'Đường Ngô Quyền & Bến Bạch Đằng, P. Thủ Dầu Một',
    coords: { lat: 10.9791654, lng: 106.653276 },
    coordsText: '10°58\'45.0"N 106°39\'11.8"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Xây dựng trên nền Nhà việc Phú Cường (thế kỷ 19)',
    visitDuration: '45 – 60 phút',
    openingHours: '07:30 – 17:00 (Thứ Ba đến Chủ Nhật, ngày lễ mở cửa bình thường)',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/ben-nha-rong-06.jpg',
    summary:
      'Phục dựng trang trọng trên nền móng di tích Nhà việc Phú Cường (Nhà Làng Phú Cường) xưa — nơi hội tụ các phong trào yêu nước và ngày toàn thắng 30/04/1975.',
    historicalSignificance:
      'Tại đây sáng ngày 25/8/1945, nhân dân Đất Thủ nổi dậy giành chính quyền thắng lợi. Ngày 30/4/1975, các cánh quân giải phóng tiến vào giải phóng hoàn toàn thị xã Thủ Dầu Một. Nơi đây hiện lưu giữ Không gian Tưởng niệm Chủ tịch Hồ Chí Minh và hàng trăm kỷ vật chiến tranh.',
    architecturalHighlights: [
      'Bia đá chứng tích Nhà việc Phú Cường ghi danh các anh hùng liệt sĩ',
      'Khuôn viên công viên cây xanh ven bờ sông Sài Gòn thoáng đãng gần 1.000m²',
      'Khu trưng bày xe ngựa cổ và xe kéo truyền thống Nam Bộ đầu thế kỷ 20',
      'Không gian số hóa thực tế ảo 3D VR phục vụ học tập từ xa',
    ],
    visitorTips: [
      'Trang phục lịch sự khi vào Gian tưởng niệm Bác Hồ',
      'Có bãi đỗ xe máy và ô tô thuận tiện ngay bên bờ sông Bạch Đằng',
      'Có mã QR quét nghe thuyết minh tự động tại từng tủ hiện vật',
    ],
    audioGuideText:
      'Chào mừng quý khách đến với Nhà Truyền Thống Thủ Dầu Một, phục dựng trên nền móng Di tích Nhà việc Phú Cường xưa bên dòng sông Sài Gòn. Nơi đây lưu dấu những mốc son chói lọi trong hai cuộc kháng chiến và là Không gian Văn hóa Hồ Chí Minh thiêng liêng của địa phương.',
  },
  {
    id: 'site-chuahoikhanh',
    name: 'Chùa Hội Khánh — Nơi Cụ Nguyễn Sinh Sắc Hoạt Động Yêu Nước',
    category: 'VĂN HÓA TÂM LINH',
    rank: 'Di tích Quốc gia',
    address: 'Số 35 Đường Bác sĩ Yersin, P. Thủ Dầu Một',
    coords: { lat: 10.977778, lng: 106.659722 },
    coordsText: '10°58\'40"N 106°39\'35"E',
    googleMapsUrl: 'https://maps.app.goo.gl/4XWjhJ7a8c5Q3Pcf8',
    establishedYear: 'Năm 1741 (đời vua Lê Hiển Tông)',
    visitDuration: '60 – 90 phút',
    openingHours: '06:00 – 19:30 hàng ngày',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    summary:
      'Ngôi cổ tự hơn 280 năm tuổi, nơi Cụ Phó bảng Nguyễn Sinh Sắc (thân sinh Bác Hồ) cùng các chí sĩ thành lập Hội Danh dự yêu nước (1923 – 1926).',
    historicalSignificance:
      'Từ năm 1923 đến 1926, cụ Nguyễn Sinh Sắc đến chùa Hội Khánh dạy học, bốc thuốc cứu dân nghèo và sáng lập Hội Danh dự yêu nước, ươm mầm tinh thần cách mạng độc lập cho nhiều thế hệ chí sĩ Đất Thủ. Chùa sở hữu tượng Phật nhập Niết bàn trên mái dài 52m, cao 12m (xác lập Kỷ lục Châu Á năm 2013).',
    architecturalHighlights: [
      'Kiến trúc gỗ tứ trụ cổ truyền Nam Bộ với hàng trăm mộc bản kinh Phật quý',
      'Đại tượng Phật Thích Ca nhập Niết bàn trên mái chùa dài 52m độc nhất vô nhị',
      'Bức bao lam Cửu Long chạm khắc tinh xảo bằng gỗ mít thế kỷ 18',
      'Khu vườn tượng 18 vị La Hán thanh tịnh rợp bóng cây cổ thụ',
    ],
    visitorTips: [
      'Nên kết hợp viếng mộ các bậc tiền hiền và bảo tàng tư liệu Cụ Nguyễn Sinh Sắc',
      'Khu vực chánh điện giữ trật tự và không mặc áo sát nách/váy ngắn',
      'Vào ngày Rằm và mùng Một chùa có phục vụ cơm chay thanh đạm miễn phí',
    ],
    audioGuideText:
      'Chùa Hội Khánh là Di tích Lịch sử - Văn hóa cấp Quốc gia. Nơi đây vinh dự được cụ thân sinh Bác Hồ — Phó bảng Nguyễn Sinh Sắc dừng chân bốc thuốc và gieo mầm Hội Danh dự yêu nước. Ngôi chùa cũng nổi tiếng với tượng Phật nằm dài 52 mét trên mái đạt kỷ lục châu Á.',
  },
  {
    id: 'site-nhacotranvanvang',
    name: 'Nhà Cổ Trần Công Vàng (Trần Văn Vàng)',
    category: 'KIẾN TRÚC CỔ',
    rank: 'Di tích Quốc gia',
    address: 'Số 21 Đường Ngô Quyền, P. Thủ Dầu Một',
    coords: { lat: 10.978333, lng: 106.653333 },
    coordsText: '10°58\'42"N 106°39\'12"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Xây dựng từ 1889 – 1892',
    visitDuration: '30 – 45 phút',
    openingHours: '08:00 – 11:30 và 13:30 – 17:00 (vui lòng liên hệ ban quản lý di tích)',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/card-tac-pham.jpg',
    summary:
      'Tuyệt tác kiến trúc nhà chữ Đinh Nam Bộ bằng danh mộc, bảo lưu nguyên vẹn hệ thống hoành phi, câu đối, bao lam khảm xà cừ óng ánh hơn 130 năm.',
    historicalSignificance:
      'Xếp hạng Di tích Kiến trúc Nghệ thuật cấp Quốc gia năm 1993. Là một trong những ngôi nhà cổ tiêu biểu nhất vùng Đông Nam Bộ, thể hiện đỉnh cao nghệ thuật chạm khắc mộc và văn hóa gia tộc truyền thống của Đất Thủ.',
    architecturalHighlights: [
      'Kiến trúc nhà chữ Đinh (3 gian 2 chái) hoàn toàn bằng gỗ quý căm xe, gõ đỏ',
      'Hệ thống vì kèo, xiên, trâm chạm lộng đề tài mai lan cúc trúc, nho sóc tinh vi',
      'Bộ bao lam khảm ốc xà cừ ngũ sắc lấp lánh nguyên bản từ cuối thế kỷ 19',
      'Vật dụng cổ: trường kỷ, sập gụ, tủ thờ và liễn đối chữ Nho sơn son thếp vàng',
    ],
    visitorTips: [
      'Không sờ tay mạnh hoặc dựa người vào các bao lam khảm xà cừ cổ',
      'Khoảng cách rất gần (chỉ 150m) từ Nhà truyền thống Thủ Dầu Một, thuận tiện đi bộ',
    ],
    audioGuideText:
      'Nhà cổ Trần Công Vàng là Di tích Kiến trúc Nghệ thuật cấp Quốc gia, minh chứng rực rỡ cho bàn tay tài hoa của người thợ mộc Bình Dương. Toàn bộ kết cấu gỗ chữ Đinh và các hoa văn cẩn xà cừ vẫn giữ trọn vẹn nét tôn nghiêm qua hơn một thế kỷ.',
  },
  {
    id: 'site-nhacotranvanho',
    name: 'Nhà Cổ Trần Văn Hổ (Đốc Phủ Sử)',
    category: 'KIẾN TRÚC CỔ',
    rank: 'Di tích Quốc gia',
    address: 'Số 18 Đường Bạch Đằng, P. Thủ Dầu Một',
    coords: { lat: 10.977222, lng: 106.651389 },
    coordsText: '10°58\'38"N 106°39\'05"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Xây dựng năm 1890 (năm Canh Dần)',
    visitDuration: '30 – 45 phút',
    openingHours: '08:00 – 17:00 hàng ngày',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/card-cuoc-doi.jpg',
    summary:
      'Ngôi nhà cổ độc đáo hướng mặt ra sông Sài Gòn của Đốc phủ sứ Trần Văn Hổ, kiệt tác chạm lộng tứ linh, hoa điểu và điển tích Nam Bộ thế kỷ 19.',
    historicalSignificance:
      'Được xếp hạng Di tích Kiến trúc Nghệ thuật cấp Quốc gia năm 1993. Cùng với Nhà cổ Trần Công Vàng, ngôi nhà phản ánh đời sống văn hóa, phong lưu và tài hoa thủ công mỹ nghệ của vùng đất thương cảng Thủ Dầu Một xưa.',
    architecturalHighlights: [
      'Hệ thống cột gỗ căm xe bóng loáng với các bệ đá xanh kiên cố',
      'Bao lam tiền điện chạm trổ Tứ Linh (Long - Lân - Quy - Phụng) sống động',
      'Sân vườn cổ thụ nhìn thẳng ra bờ kè sông Bạch Đằng lộng gió',
      'Sưu tập đồ đồng, gốm sứ Lái Thiêu - Thủ Dầu Một cổ xưa',
    ],
    visitorTips: [
      'Góc chụp ảnh đẹp nhất là hiên tiền sảnh nhìn qua khung cửa vòm gỗ ra sân vườn',
      'Nên kết hợp dạo bộ tuyến phố đi bộ Bạch Đằng và ngắm hoàng hôn trên sông',
    ],
    audioGuideText:
      'Nhà cổ Trần Văn Hổ xây dựng năm 1890, nằm ngay mặt tiền đường Bạch Đằng soi bóng sông Sài Gòn. Ngôi nhà được công nhận di tích quốc gia nhờ kết cấu danh mộc và những đường nét chạm trổ tinh xảo của các bậc thầy mộc Đất Thủ.',
  },
  {
    id: 'site-chothudaumot',
    name: 'Chợ Thủ Dầu Một & Tháp Đồng Hồ Cổ',
    category: 'DI SẢN ĐÔ THỊ',
    rank: 'Công trình Di sản Đô thị',
    address: 'Đường Trần Hưng Đạo & Nguyễn Thái Học, P. Thủ Dầu Một',
    coords: { lat: 10.979167, lng: 106.650556 },
    coordsText: '10°58\'45"N 106°39\'02"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Khánh thành năm 1935',
    visitDuration: '45 – 60 phút',
    openingHours: 'Mở cửa 24/7 (Chợ đêm và phố ẩm thực từ 18:00 – 23:00)',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/khu-pho.jpg',
    summary:
      'Biểu tượng văn hóa đô thị Đất Thủ gần 100 năm tuổi với Tháp Đồng hồ 4 mặt kiêu hãnh bên dòng sông Sài Gòn tấp nập.',
    historicalSignificance:
      'Được người Pháp xây dựng năm 1935 nhằm phục vụ thương cảng bến sông sầm uất. Nơi đây là trung tâm giao thương gốm sứ, đồ mộc, nông sản khắp miền Đông và Tây Nam Bộ, gắn bó máu thịt với ký ức bao thế hệ người dân Thủ Dầu Một.',
    architecturalHighlights: [
      'Tháp đồng hồ hình bát giác 4 mặt kiểu Pháp vươn cao giữa ngã ba chợ',
      'Mái vòm chợ cổ thông thoáng với kết cấu vì kèo thép kiên cố thời thuộc Pháp',
      'Khu phố thương mại cổ xung quanh với nhà ống phong cách Đông Dương',
    ],
    visitorTips: [
      'Thưởng thức các món đặc sản Đất Thủ: Bánh bèo bì Mỹ Liên, bún riêu, chè trôi nước',
      'Buổi tối phố đi bộ ven chợ có đèn lồng chiếu sáng lung linh rất đẹp',
    ],
    audioGuideText:
      'Chợ Thủ Dầu Một với tháp đồng hồ cổ kính xây dựng từ năm 1935 là trái tim giao thương và linh hồn của đô thị Đất Thủ bên bờ sông Sài Gòn thơ mộng.',
  },
  {
    id: 'site-dinhphucuong',
    name: 'Đình Thần Phú Cường (Đình Bà Lụa Xưa)',
    category: 'LỊCH SỬ CÁCH MẠNG',
    rank: 'Di tích Cấp Tỉnh',
    address: 'Đường Ngô Quyền, P. Thủ Dầu Một',
    coords: { lat: 10.980556, lng: 106.655556 },
    coordsText: '10°58\'50"N 106°39\'20"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Đầu thế kỷ 19 (vua Tự Đức sắc phong năm 1852)',
    visitDuration: '30 – 40 phút',
    openingHours: '07:00 – 18:00 hàng ngày',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    summary:
      'Nơi phụng thờ Thành hoàng Bổn cảnh và các bậc tiền hiền khai hoang mở đất Bình An – Thủ Dầu Một; trung tâm sinh hoạt tín ngưỡng dân gian lâu đời.',
    historicalSignificance:
      'Được vua Tự Đức ban sắc phong "Thần Thành Hoàng Bổn Cảnh" ngày 29 tháng 11 năm Nhâm Tý (1852). Đình là nơi hội họp bí mật của các chiến sĩ cách mạng địa phương thời kỳ tiền khởi nghĩa 1945.',
    architecturalHighlights: [
      'Kiến trúc đình làng Nam Bộ truyền thống: Tiền tế, Chánh điện, Nhà giảng',
      'Bản Sắc phong thần bằng lụa quý của triều đình nhà Nguyễn còn lưu giữ nguyên bản',
      'Họa tiết đắp nổi Lưỡng long chầu nguyệt và gốm men xanh đặc trưng Đất Thủ',
    ],
    visitorTips: [
      'Lễ Kỳ Yên đình Phú Cường diễn ra vào tháng 11 âm lịch hàng năm với nhiều nghi lễ cổ',
    ],
    audioGuideText:
      'Đình Thần Phú Cường là di tích tâm linh gắn liền với cội nguồn khai hoang mở đất Thủ Dầu Một, được vua Tự Đức ban sắc phong năm 1852 và từng là cơ sở nuôi giấu cán bộ cách mạng.',
  },
  {
    id: 'site-chuaba',
    name: 'Miếu Bà Thiên Hậu (Chùa Bà Bình Dương — Cơ Sở 1)',
    category: 'VĂN HÓA TÂM LINH',
    rank: 'Công trình Di sản Đô thị',
    address: 'Số 04 Đường Nguyễn Du, P. Thủ Dầu Một',
    coords: { lat: 10.976667, lng: 106.655000 },
    coordsText: '10°58\'36"N 106°39\'18"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Khởi dựng giữa thế kỷ 19',
    visitDuration: '45 – 60 phút',
    openingHours: '06:00 – 21:00 hàng ngày',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/ueh-3d.jpg',
    summary:
      'Trung tâm văn hóa tín ngưỡng dân gian của 4 bang cộng đồng người Hoa và người Việt, nổi tiếng khắp cả nước với Lễ hội Rằm tháng Giêng nghĩa tình.',
    historicalSignificance:
      'Là biểu tượng của tinh thần tương thân tương ái. Lễ hội rằm tháng Giêng tại chùa Bà nổi danh là "lễ hội miễn phí" với hàng trăm điểm phát nước, khăn lạnh, đồ ăn, xe ôm miễn phí phục vụ hàng vạn du khách thập phương.',
    architecturalHighlights: [
      'Nghệ thuật phù điêu gốm đắp nổi điển tích Tam Quốc và Bát Tiên trên mái ngói',
      'Kiến trúc tiền sảnh tứ giác với chuông đồng đúc năm 1883',
      'Lư hương lớn bằng đá khối và tượng Bà Thiên Hậu Thánh Mẫu uy nghiêm',
    ],
    visitorTips: [
      'Mùa lễ hội Rằm tháng Giêng (tháng 1 âm lịch) có lễ rước kiệu Bà rất long trọng',
      'Khuôn viên có chuẩn bị sẵn nước uống và nhang thơm miễn phí cho khách thập phương',
    ],
    audioGuideText:
      'Miếu Bà Thiên Hậu Thủ Dầu Một là biểu tượng tín ngưỡng và nét đẹp văn hóa "nghĩa tình Đất Thủ", nơi hội tụ tình đoàn kết các dân tộc anh em qua nhiều thế kỷ.',
  },
  {
    id: 'site-lochen',
    name: 'Di Tích Chi Bộ Lò Chén Tân Khánh — Phú Cường',
    category: 'LỊCH SỬ CÁCH MẠNG',
    rank: 'Địa chỉ Đỏ Cơ sở',
    address: 'Khu vực Lò Gốm Sứ Tân Khánh — Phú Cường, P. Thủ Dầu Một',
    coords: { lat: 10.986667, lng: 106.661111 },
    coordsText: '10°59\'12"N 106°39\'40"E',
    googleMapsUrl: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    establishedYear: 'Tháng 02/1936',
    visitDuration: '30 – 45 phút',
    openingHours: '08:00 – 17:00 (mở cửa đón tiếp các đoàn học tập truyền thống)',
    ticketPrice: 'Miễn phí 100%',
    thumbnail: '/assets/hcm-space/tieusu3-1920.png',
    summary:
      'Địa chỉ đỏ thiêng liêng — Nơi thành lập Chi bộ Đảng Cộng sản đầu tiên của Thủ Dầu Một vào tháng 2/1936, gieo ngọn lửa cách mạng vào giai cấp công nhân gốm sứ.',
    historicalSignificance:
      'Đánh dấu bước ngoặt quyết định phong trào công nhân và nhân dân Đất Thủ bước vào quỹ đạo đấu tranh có tổ chức dưới ngọn cờ của Đảng Cộng sản Việt Nam, trực tiếp dẫn tới cuộc Tổng khởi nghĩa Tháng Tám 1945.',
    architecturalHighlights: [
      'Bia lưu niệm mốc thành lập Chi bộ Đảng đầu tiên của Thủ Dầu Một',
      'Khu vực lò nung gốm truyền thống bảo lưu kỹ thuật làm gốm thủ công Đất Thủ',
    ],
    visitorTips: [
      'Thích hợp cho các buổi sinh hoạt chuyên đề Chi bộ, Lễ kết nạp Đảng viên và Đoàn viên mới',
    ],
    audioGuideText:
      'Di tích Chi bộ Lò Chén Tân Khánh Phú Cường là cội nguồn của Đảng bộ thành phố Thủ Dầu Một ngày nay, nơi ngọn cờ Đảng soi sáng cho giai cấp công nhân gốm sứ vươn lên đấu tranh giành độc lập.',
  },
];

// =========================================================================
// 2. 03 TOUR DU KHẢO DI SẢN GỢI Ý (HERITAGE DISCOVERY ROUTES)
// =========================================================================
export const THU_DAU_MOT_TOUR_ROUTES: HeritageTourRoute[] = [
  {
    id: 'tour-bac-ho',
    title: 'Tour 1: Hành Trình Về Nguồn & Dấu Ấn Bác Hồ',
    theme: 'Lịch sử cách mạng & Di sản Hồ Chí Minh',
    duration: 'Nửa ngày (khoảng 3.5 giờ)',
    distance: '3.2 km',
    recommendedTransport: 'Đi bộ hoặc xe đạp dạo bờ sông',
    description:
      'Khám phá Nhà truyền thống Thủ Dầu Một, viếng Chùa Hội Khánh nơi cụ Nguyễn Sinh Sắc ươm mầm Hội Danh dự yêu nước và tìm hiểu nguồn cội Chi bộ Đảng đầu tiên.',
    siteIds: ['site-nhotruyenthong', 'site-chuahoikhanh', 'site-lochen'],
    badgeColor: 'from-[#751D2C] to-[#5B1522]',
  },
  {
    id: 'tour-kien-truc-co',
    title: 'Tour 2: Tinh Hoa Kiến Trúc & Nhà Cổ Trăm Năm Đất Thủ',
    theme: 'Nghệ thuật chạm khắc gỗ & Di sản đô thị sông nước',
    duration: '2.5 giờ',
    distance: '1.8 km',
    recommendedTransport: 'Đi bộ thư thả ngắm phố',
    description:
      'Dạo bước qua 2 ngôi nhà cổ quốc gia Trần Công Vàng và Trần Văn Hổ, chiêm ngưỡng nghệ thuật khảm xà cừ đỉnh cao và check-in Tháp Đồng hồ chợ cổ 1935 ven sông Bạch Đằng.',
    siteIds: ['site-nhacotranvanvang', 'site-nhacotranvanho', 'site-chothudaumot'],
    badgeColor: 'from-[#C59A55] to-[#996C26]',
  },
  {
    id: 'tour-tam-linh-nghia-tinh',
    title: 'Tour 3: Sắc Màu Văn Hóa Tâm Linh & Lễ Hội Nghĩa Tình',
    theme: 'Đình miếu cổ truyền & Nét đẹp thiện nguyện Đất Thủ',
    duration: '3.0 giờ',
    distance: '2.6 km',
    recommendedTransport: 'Xe máy hoặc xe điện du lịch',
    description:
      'Hòa mình vào không gian thanh tịnh Chùa Hội Khánh, dâng hương Đình thần Phú Cường sắc phong 1852 và tìm hiểu Miếu Bà Thiên Hậu với nét đẹp lễ hội vì cộng đồng.',
    siteIds: ['site-chuahoikhanh', 'site-dinhphucuong', 'site-chuaba'],
    badgeColor: 'from-[#1E3A8A] to-[#1E293B]',
  },
];

// =========================================================================
// 3. LỊCH SỬ ĐẢNG BỘ THÀNH PHỐ THỦ DẦU MỘT (1930 — 01/07/2025)
// =========================================================================
export const TDM_CITY_PARTY_HISTORY_PHASES: PartyHistoryPhase[] = [
  {
    id: 'phase-1',
    period: '1923 — 1945',
    title: 'Khởi Nguồn Phong Trào Yêu Nước, Thành Lập Chi Bộ Đầu Tiên & Giành Chính Quyền 1945',
    badge: 'Mốc son Khởi nguyên',
    summary:
      'Từ hạt mầm yêu nước của Cụ Phó bảng Nguyễn Sinh Sắc tại Chùa Hội Khánh đến Chi bộ Lò Chén Phú Cường 1936, Đảng bộ lãnh đạo nhân dân giành chính quyền mùa thu Tháng Tám lịch sử.',
    milestones: [
      {
        dateOrYear: '1923 – 1926',
        eventTitle: 'Cụ Phó bảng Nguyễn Sinh Sắc thành lập Hội Danh dự yêu nước tại Chùa Hội Khánh',
        content:
          'Cụ thân sinh Chủ tịch Hồ Chí Minh cùng cụ Phan Đình Viện lập hội bí mật dạy học, chữa bệnh cho dân nghèo và tuyên truyền lòng yêu nước, mở đường cho ánh sáng cách mạng chiếu rọi Đất Thủ.',
        keyFigureOrDocument: 'Cụ Nguyễn Sinh Sắc, Cụ Phan Đình Viện',
        significanceBadge: 'Hạt mầm tư tưởng',
      },
      {
        dateOrYear: 'Tháng 02/1936',
        eventTitle: 'Thành lập Chi bộ Đảng đầu tiên tại Lò Chén Phú Cường (Thủ Dầu Một)',
        content:
          'Đồng chí Trương Văn Nhâm và các đồng chí cốt cán tổ chức thành lập chi bộ trong công nhân gốm sứ. Đây là tổ chức Đảng Cộng sản đầu tiên trên địa bàn thị xã, lãnh đạo các phong trào bãi công đòi dân sinh dân chủ.',
        keyFigureOrDocument: 'Chi bộ Lò Chén Phú Cường',
        significanceBadge: 'Chi bộ đầu tiên',
      },
      {
        dateOrYear: '25/08/1945',
        eventTitle: 'Tổng khởi nghĩa Tháng Tám giành chính quyền tại Thủ Dầu Một',
        content:
          'Hàng vạn quần chúng, công nhân và thanh niên Tiền phong rầm rộ kéo về trung tâm Nhà việc Phú Cường, lật đổ chính quyền bù nhìn phát xít, lập nên Ủy ban Nhân dân Cách mạng tỉnh Thủ Dầu Một.',
        keyFigureOrDocument: 'Lệnh Tổng khởi nghĩa',
        significanceBadge: 'Thắng lợi Tháng Tám',
      },
    ],
    achievements: [
      'Gieo mầm phong trào cách mạng trong giai cấp công nhân lò gốm và thợ mộc',
      'Xây dựng hệ thống cơ sở Đảng bí mật trong lòng quần chúng nhân dân',
      'Lãnh đạo cuộc khởi nghĩa Tháng Tám 1945 nhanh gọn, triệt để, không đổ máu',
    ],
  },
  {
    id: 'phase-2',
    period: '1945 — 1975',
    title: 'Ba Mươi Năm Kiên Cường Kháng Chiến Chống Thực Dân Pháp & Đế Quốc Mỹ Xâm Lược',
    badge: 'Bản hùng ca Kháng chiến',
    summary:
      'Đảng bộ thị xã Thủ Dầu Một lãnh đạo quân và dân kiên cường bám trụ đô thị, xây dựng vành đai bao vây địch, góp phần làm nên Đại thắng Mùa Xuân 1975 giải phóng hoàn toàn quê hương.',
    milestones: [
      {
        dateOrYear: '1946 – 1954',
        eventTitle: 'Kháng chiến chống thực dân Pháp — Xây dựng căn cứ kháng chiến đô thị',
        content:
          'Thị xã Thủ Dầu Một là mặt trận đối đầu trực diện. Lực lượng tự vệ và công an xung phong thị xã phối hợp Chiến khu Đ và Tam Giác Sắt liên tục đánh bại các cuộc hành quân càn quét của địch.',
        keyFigureOrDocument: 'Đội Tự vệ Thị xã Thủ Dầu Một',
      },
      {
        dateOrYear: '1960 – 1968',
        eventTitle: 'Thành lập Đội Biệt động Thị xã & Cuộc Tổng tiến công Tết Mậu Thân 1968',
        content:
          'Đội Biệt động thị xã Thủ Dầu Một tổ chức hàng chục trận đánh táo bạo vào các cơ quan đầu não ngụy quyền, Tòa Hành chính tỉnh, trại giam, làm rung chuyển tuyến phòng thủ phía Bắc Sài Gòn.',
        keyFigureOrDocument: 'Đội Biệt động Thị xã Thủ Dầu Một',
        significanceBadge: 'Mậu Thân 1968',
      },
      {
        dateOrYear: '30/04/1975',
        eventTitle: 'Chiến dịch Hồ Chí Minh lịch sử — Giải phóng hoàn toàn Thị xã Thủ Dầu Một',
        content:
          'Các cánh quân chủ lực phối hợp lực lượng vũ trang địa phương đồng loạt tiến công, đánh chiếm Tiểu khu Phú Cường, giải phóng thị xã vào sáng 30/4/1975; non sông thu về một mối.',
        keyFigureOrDocument: 'Đại thắng Mùa Xuân 1975',
        significanceBadge: 'Giải phóng quê hương',
      },
    ],
    achievements: [
      'Bảo vệ trọn vẹn lực lượng cách mạng và xây dựng thế trận lòng dân vững chắc',
      'Được Nhà nước phong tặng danh hiệu Anh hùng Lực lượng Vũ trang Nhân dân',
      'Đóng góp sức người, sức của to lớn cho sự nghiệp giải phóng hoàn toàn miền Nam',
    ],
  },
  {
    id: 'phase-3',
    period: '1975 — 2012',
    title: 'Hàn Gắn Vết Thương Chiến Tranh, Công Nghiệp Hóa & Thành Lập Thành Phố Thủ Dầu Một',
    badge: 'Đổi mới & Đô thị hóa',
    summary:
      'Vượt qua muôn vàn khó khăn thời hậu chiến, Đảng bộ lãnh đạo nhân dân khôi phục kinh tế, phát huy làng nghề gốm sứ — sơn mài, đưa thị xã vươn lên thành phố trực thuộc tỉnh năm 2012.',
    milestones: [
      {
        dateOrYear: '1976 – 1985',
        eventTitle: 'Khắc phục hậu quả chiến tranh, ổn định đời sống nhân dân',
        content:
          'Xây dựng lại các công trình công cộng bị tàn phá, hợp tác hóa tiểu thủ công nghiệp làng nghề Đất Thủ, chăm lo chính sách thương binh liệt sĩ và an sinh xã hội.',
      },
      {
        dateOrYear: '01/01/1997',
        eventTitle: 'Tái lập tỉnh Bình Dương — Thị xã Thủ Dầu Một là trung tâm tỉnh lỵ',
        content:
          'Thực hiện chủ trương chia tách tỉnh Sông Bé thành Bình Dương và Bình Phước; Đảng bộ thị xã tập trung quy hoạch không gian đô thị ven sông Sài Gòn hiện đại, văn minh.',
        keyFigureOrDocument: 'Nghị quyết Quốc hội khóa IX',
        significanceBadge: 'Trung tâm Tỉnh lỵ',
      },
      {
        dateOrYear: '02/05/2012',
        eventTitle: 'Chính phủ ban hành Nghị quyết thành lập Thành Phố Thủ Dầu Một',
        content:
          'Nghị quyết số 11/NQ-CP của Chính phủ chính thức thành lập TP. Thủ Dầu Một thuộc tỉnh Bình Dương, ghi nhận bước trưởng thành vượt bậc về quy mô kinh tế, hạ tầng và quản lý đô thị.',
        keyFigureOrDocument: 'Nghị quyết 11/NQ-CP',
        significanceBadge: 'Trở thành Thành phố',
      },
    ],
    achievements: [
      'Tốc độ tăng trưởng kinh tế bình quân đạt trên 15%/năm',
      'Hạ tầng giao thông, trường học, công viên cây xanh được đầu tư đồng bộ',
      'Hoàn thành xuất sắc nhiệm vụ xóa đói giảm nghèo bền vững',
    ],
  },
  {
    id: 'phase-4',
    period: '2012 — 01/07/2025',
    title: 'Xây Dựng Đô Thị Loại I, Đô Thị Thông Minh & Lan Tỏa Không Gian Văn Hóa Hồ Chí Minh',
    badge: 'Đô thị loại I văn minh',
    summary:
      'Được công nhận Đô thị loại I năm 2017; Đảng bộ thành phố lãnh đạo thực hiện thắng lợi các mục tiêu phát triển xanh, số hóa hành chính và triển khai Không gian Văn hóa Hồ Chí Minh sâu rộng.',
    milestones: [
      {
        dateOrYear: '06/12/2017',
        eventTitle: 'Thủ tướng Chính phủ công nhận TP. Thủ Dầu Một là Đô thị loại I',
        content:
          'Quyết định số 1959/QĐ-TTg của Thủ tướng Chính phủ khẳng định vị thế đô thị hạt nhân phát triển công nghiệp — dịch vụ hiện đại hàng đầu vùng kinh tế trọng điểm phía Nam.',
        keyFigureOrDocument: 'Quyết định 1959/QĐ-TTg',
        significanceBadge: 'Đô thị loại I',
      },
      {
        dateOrYear: '2020 – 2025',
        eventTitle: 'Đại hội Đại biểu Đảng bộ Thành phố Thủ Dầu Một lần thứ XII',
        content:
          'Đề ra mục tiêu: Xây dựng Thủ Dầu Một phát triển theo hướng đô thị thông minh, văn minh, giàu đẹp, hiện đại; nâng cao chất lượng sống nhân dân, tỷ lệ hài lòng đạt trên 99%.',
        keyFigureOrDocument: 'Nghị quyết Đại hội XII Đảng bộ TP',
        significanceBadge: 'Nhiệm kỳ XII',
      },
      {
        dateOrYear: '2023 – 2025',
        eventTitle: 'Xây dựng Không gian Văn hóa Hồ Chí Minh & Hoàn tất sắp xếp Đơn vị Hành chính',
        content:
          '100% cơ quan, trường học, khu phố xây dựng Không gian Văn hóa Hồ Chí Minh; Đảng bộ lãnh đạo thực hiện thành công chủ trương sắp xếp đơn vị hành chính cấp xã của Ủy ban Thường vụ Quốc hội.',
        keyFigureOrDocument: 'Chỉ thị 05-CT/TW & Đề án Sắp xếp ĐVHC',
        significanceBadge: 'Chuẩn bị bước ngoặt 1/7/2025',
      },
    ],
    achievements: [
      'Kinh tế duy trì mức phát triển cao, cơ cấu thương mại - dịch vụ chiếm trên 60%',
      'Cảnh quan đô thị xanh - sạch - đẹp, hệ thống công viên ven sông Sài Gòn kiểu mẫu',
      'Hệ thống chính trị trong sạch, vững mạnh; khối đại đoàn kết toàn dân được củng cố',
    ],
  },
];

// =========================================================================
// 4. BIÊN NIÊN SỬ ĐẢNG BỘ PHƯỜNG THỦ DẦU MỘT (TỪ 01/07/2025 ĐẾN NAY)
// =========================================================================
export const TDM_WARD_PARTY_CHRONOLOGY: WardChronologyEntry[] = [
  {
    id: 'chronology-01',
    dateStr: '01/07/2025',
    timestamp: '2025-07-01',
    category: 'XÂY DỰNG ĐẢNG',
    title: 'MỐC SON LỊCH SỬ: Công bố Quyết định thành lập Đảng bộ Phường Thủ Dầu Một mới',
    summary:
      'Thực hiện Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp các đơn vị hành chính cấp xã, chính thức thành lập Đảng bộ và Phường Thủ Dầu Một mới từ ngày 01/07/2025.',
    details:
      'Ban Thường vụ Tỉnh ủy/Thành ủy long trọng tổ chức Lễ công bố Quyết định thành lập Đảng bộ phường Thủ Dầu Một; chỉ định Ban Chấp hành Đảng bộ, Ban Thường vụ, Bí thư và các Phó Bí thư Đảng ủy phường khóa mới. Đây là bước ngoặt mang tính lịch sử, mở ra kỷ nguyên phát triển tập trung, tinh gọn, hiệu lực và hiệu quả.',
    leadingUnit: 'Ban Thường vụ Đảng ủy Phường',
    documentRef: 'Nghị quyết UBTVQH & Quyết định Ban Thường vụ Thành ủy',
    isHighlight: true,
  },
  {
    id: 'chronology-02',
    dateStr: '05/07/2025',
    timestamp: '2025-07-05',
    category: 'CHÍNH QUYỀN ĐÔ THỊ',
    title: 'Vận hành thông suốt bộ máy hành chính công vụ, không làm gián đoạn quyền lợi nhân dân',
    summary:
      'Trung tâm Phục vụ Hành chính công phường Thủ Dầu Một đi vào hoạt động với phương châm "Hết việc chứ không hết giờ", giải quyết 100% hồ sơ giấy tờ chuyển đổi địa chỉ cư trú thông suốt.',
    details:
      'Đảng ủy chỉ đạo UBND phường phối hợp Công an phường cấp đổi giấy tờ, hỗ trợ người dân và doanh nghiệp cập nhật thông tin đơn vị hành chính mới hoàn toàn miễn phí, nhanh chóng trên cổng dịch vụ công trực tuyến và ứng dụng VNeID.',
    leadingUnit: 'Đảng ủy - UBND Phường',
    documentRef: 'Kế hoạch số 02-KH/UBND',
  },
  {
    id: 'chronology-03',
    dateStr: '15/07/2025',
    timestamp: '2025-07-15',
    category: 'CHUYỂN ĐỔI SỐ',
    title: 'Triển khai mô hình "Chi bộ số" và "Sổ tay Đảng viên điện tử" trên toàn Đảng bộ',
    summary:
      '100% chi bộ trực thuộc (chi bộ khu phố, trường học, cơ quan, quân sự, công an) ứng dụng phần mềm Chi bộ số vào sinh hoạt định kỳ và học tập nghị quyết.',
    details:
      'Thực hiện chuyển đổi số mạnh mẽ trong công tác Đảng: điểm danh số hóa, gửi tài liệu sinh hoạt trước 03 ngày, biểu quyết trực tuyến, tra cứu tài liệu nghiệp vụ Đảng và hệ thống hóa văn kiện chính trị cấp A.',
    leadingUnit: 'Ban Tổ chức Đảng ủy Phường',
    documentRef: 'Chuyên đề số 01-CĐ/ĐU',
    isHighlight: true,
  },
  {
    id: 'chronology-03-b',
    dateStr: '27/07/2025',
    timestamp: '2025-07-27',
    category: 'AN SINH XÃ HỘI',
    title: 'Đền ơn đáp nghĩa: Thăm hỏi, chăm lo Mẹ Việt Nam Anh hùng và gia đình chính sách tại 5 phân khu',
    summary:
      'Đảng ủy - HĐND - UBND - UBMTTQ Việt Nam phường tổ chức thăm, tặng quà cho hơn 250 gia đình liệt sĩ, thương bệnh binh và phụng dưỡng suốt đời các Mẹ VNAH.',
    details:
      'Đoàn công tác do Bí thư Đảng ủy và Chủ tịch UBND phường dẫn đầu đã đến dâng hương tại Nghĩa trang Liệt sĩ và thăm từng hộ gia đình chính sách khó khăn, khẳng định truyền thống "Uống nước nhớ nguồn" của Đảng bộ và nhân dân Đất Thủ.',
    leadingUnit: 'Khối Dân vận & Phòng LĐ-TB&XH Phường',
    documentRef: 'Kế hoạch số 08-KH/ĐU-UBND',
  },
  {
    id: 'chronology-04',
    dateStr: '19/08/2025',
    timestamp: '2025-08-19',
    category: 'KHÔNG GIAN VĂN HÓA HCM',
    title: 'Kỷ niệm 80 năm Cách mạng Tháng Tám tại Nhà truyền thống & Phát động thi đua cao điểm',
    summary:
      'Tổ chức Lễ dâng hương Chủ tịch Hồ Chí Minh tại Nhà truyền thống Thủ Dầu Một; phát động đợt thi đua đặc biệt "Học Bác mỗi ngày — Làm việc gương mẫu".',
    details:
      'Đảng ủy phường tổ chức buổi gặp mặt các thế hệ lão thành cách mạng, trao huy hiệu Đảng cho các đảng viên 40, 50, 60 năm tuổi Đảng; kết nạp 15 quần chúng ưu tú là đoàn viên thanh niên vào Đảng Cộng sản Việt Nam ngay tại Gian tưởng niệm Bác.',
    leadingUnit: 'Đảng ủy Phường & Đoàn Thanh niên',
    documentRef: 'Thông tri số 03-TT/ĐU',
  },
  {
    id: 'chronology-05',
    dateStr: '02/09/2025',
    timestamp: '2025-09-02',
    category: 'KHÔNG GIAN VĂN HÓA HCM',
    title: 'Ban hành Nghị quyết chuyên đề: Xây dựng Không gian Văn hóa Hồ Chí Minh gắn với Di tích Đất Thủ',
    summary:
      'Nghị quyết số 04-NQ/ĐU xác định mục tiêu đưa Không gian Văn hóa Hồ Chí Minh trở thành giá trị tinh thần cốt lõi trong đời sống nhân dân phường Thủ Dầu Một.',
    details:
      'Quy hoạch trục di sản văn hóa tâm linh — lịch sử kết nối từ Nhà truyền thống Thủ Dầu Một ven sông Bạch Đằng đến Chùa Hội Khánh, Nhà cổ Trần Văn Hổ, Trần Công Vàng và Tháp Đồng hồ cổ; số hóa 3D toàn diện để nhân dân và bạn bè quốc tế trải nghiệm trực tuyến.',
    leadingUnit: 'Ban Chấp hành Đảng bộ Phường',
    documentRef: 'Nghị quyết số 04-NQ/ĐU',
    isHighlight: true,
  },
  {
    id: 'chronology-06',
    dateStr: '15/10/2025',
    timestamp: '2025-10-15',
    category: 'CHÍNH QUYỀN ĐÔ THỊ',
    title: 'Khánh thành Công viên Di sản Sinh thái Ven Sông Sài Gòn & Tuyến phố đi bộ văn minh',
    summary:
      'Công trình chỉnh trang đô thị chào mừng thành lập Đảng bộ phường mới, tạo không gian sinh hoạt cộng đồng xanh — sạch — đẹp cho hàng ngàn người dân.',
    details:
      'Tuyến phố đi bộ kết hợp chiếu sáng nghệ thuật, không gian đọc sách Bác Hồ ngoài trời, điểm truy cập wifi công cộng miễn phí và lắp đặt các biển chỉ dẫn di tích thông minh bằng mã QR tương tác.',
    leadingUnit: 'UBND Phường & Khối Dân vận',
    documentRef: 'Báo cáo số 88/BC-UBND',
  },
  {
    id: 'chronology-07',
    dateStr: '20/11/2025',
    timestamp: '2025-11-20',
    category: 'KHÔNG GIAN VĂN HÓA HCM',
    title: 'Hội thi "Lời Bác Dạy Trong Tim Chúng Con" & Ra mắt Tủ sách Hồ Chí Minh tại các trường học',
    summary:
      'Toàn bộ các trường học trên địa bàn phường hoàn thành góc Không gian Văn hóa Hồ Chí Minh với hơn 2.000 đầu sách quý phục vụ học sinh và thầy cô giáo.',
    details:
      'Tổ chức hội thi kể chuyện Bác Hồ, thi viết cảm nhận học tập theo Di chúc của Bác; phát động phong trào "Nói lời hay, làm việc tốt, giữ gìn trường lớp xanh sạch đẹp" theo 5 Điều Bác Hồ dạy.',
    leadingUnit: 'Chi bộ các Trường học & Hội đồng Đội',
  },
  {
    id: 'chronology-08',
    dateStr: '22/12/2025',
    timestamp: '2025-12-22',
    category: 'XÂY DỰNG ĐẢNG',
    title: 'Hội nghị Tổng kết công tác xây dựng Đảng năm 2025 & Triển khai nhiệm vụ năm 2026',
    summary:
      'Đảng bộ phường Thủ Dầu Một được đánh giá Hoàn thành xuất sắc nhiệm vụ; 100% chỉ tiêu kinh tế, văn hóa, xã hội và quốc phòng - an ninh đều đạt và vượt kế hoạch.',
    details:
      'Đảng ủy khen thưởng 8 tập thể chi bộ trong sạch vững mạnh tiêu biểu và 45 đảng viên xuất sắc; biểu dương các mô hình điển hình dân vận khéo trong việc vận động nhân dân chỉnh trang đô thị và bảo tồn di tích.',
    leadingUnit: 'Ban Chấp hành Đảng bộ Phường',
    documentRef: 'Nghị quyết Hội nghị Ban Chấp hành',
    isHighlight: true,
  },
  {
    id: 'chronology-09',
    dateStr: '03/02/2026',
    timestamp: '2026-02-03',
    category: 'XÂY DỰNG ĐẢNG',
    title: 'Kỷ niệm 96 năm Ngày thành lập Đảng & 90 năm Ngày thành lập Chi bộ Lò Chén đầu tiên',
    summary:
      'Lễ kỷ niệm trang trọng tổ chức tại Di tích Lò Chén Tân Khánh — Phú Cường và Nhà truyền thống Thủ Dầu Một; phát động đợt sinh hoạt chính trị sâu rộng trong toàn Đảng bộ.',
    details:
      'Báo cáo chuyên đề lịch sử: "Từ Chi bộ Lò Chén Phú Cường 1936 đến Đảng bộ Phường Thủ Dầu Một đổi mới và hội nhập 2026". Tuyên dương các công nhân, thợ thủ công tiêu biểu tiếp nối tinh thần cách mạng của cha anh.',
    leadingUnit: 'Đảng ủy Phường & Ban Tuyên giáo',
    documentRef: 'Kế hoạch số 12-KH/ĐU',
  },
  {
    id: 'chronology-09-b',
    dateStr: '19/05/2026',
    timestamp: '2026-05-19',
    category: 'KHÔNG GIAN VĂN HÓA HCM',
    title: 'Kỷ niệm 136 năm Ngày sinh Bác Hồ & Tuyên dương các Chi bộ kiểu mẫu làm theo lời Bác',
    summary:
      'Lễ kỷ niệm 136 năm Ngày sinh Chủ tịch Hồ Chí Minh (19/5/1890 – 19/5/2026); sơ kết 05 năm thực hiện Kết luận 01-KL/TW của Bộ Chính trị.',
    details:
      'Tuyên dương 12 tập thể chi bộ và 35 cá nhân cán bộ, đảng viên tiêu biểu có mô hình học tập và làm theo Bác hiệu quả, có sức lan tỏa sâu rộng trong cộng đồng dân cư 5 phân khu.',
    leadingUnit: 'Ban Thường vụ Đảng ủy Phường',
    documentRef: 'Quyết định Khen thưởng số 45-QĐ/ĐU',
    isHighlight: true,
  },
  {
    id: 'chronology-09-c',
    dateStr: '01/07/2026',
    timestamp: '2026-07-01',
    category: 'XÂY DỰNG ĐẢNG',
    title: 'KỶ NIỆM 01 NĂM THÀNH LẬP PHƯỜNG THỦ DẦU MỘT MỚI (01/07/2025 — 01/07/2026)',
    summary:
      'Nhìn lại 1 năm vận hành đơn vị hành chính mới: Bộ máy tinh gọn, hiệu lực, kinh tế tăng trưởng vượt bậc, an sinh xã hội đảm bảo vững chắc.',
    details:
      'Hội nghị sơ kết 1 năm thực hiện Nghị quyết của UBTV Quốc hội: 100% hồ sơ hành chính được số hóa, đời sống nhân dân 5 phân khu ngày càng phồn vinh, an ninh trật tự được giữ vững.',
    leadingUnit: 'Ban Chấp hành Đảng bộ Phường',
    documentRef: 'Báo cáo Tổng kết 01 năm số 100/BC-ĐU',
    isHighlight: true,
  },
  {
    id: 'chronology-10',
    dateStr: 'Tháng 11/2026',
    timestamp: '2026-11-24',
    category: 'CHUYỂN ĐỔI SỐ',
    title: 'Chính thức ra mắt Nền tảng "Không Gian Văn Hóa Hồ Chí Minh Trực Tuyến & Bản Đồ Số Di Tích Đất Thủ"',
    summary:
      'Hoàn thành số hóa 3D toàn diện Nhà truyền thống Thủ Dầu Một, Chùa Hội Khánh, Nhà cổ Trần Văn Hổ, Trần Công Vàng và Bộ Biên niên sử Đảng bộ phục vụ nhân dân từ xa.',
    details:
      'Hệ thống tích hợp công nghệ thực tế ảo 360°, thuyết minh âm thanh đa phương tiện, kho dữ liệu Hồ Chí Minh Toàn tập 15 tập, phục vụ cán bộ, đảng viên, thế hệ trẻ và nhân dân cả nước tham quan, học tập mọi lúc mọi nơi.',
    leadingUnit: 'Đảng ủy Phường Thủ Dầu Một',
    documentRef: 'Quyết định vận hành chính thức',
    isHighlight: true,
  },
];
