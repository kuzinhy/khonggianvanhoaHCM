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
  category: 'LỊCH SỬ CÁCH MẠNG' | 'KIẾN TRÚC CỔ' | 'VĂN HÓA TÂM LINH' | 'DI SẢN ĐÔ THỊ' | string;
  rank: 'Di tích Quốc gia' | 'Di tích Cấp Tỉnh' | 'Công trình Di sản Đô thị' | 'Địa chỉ Đỏ Cơ sở' | string;
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
// 1. HỆ THỐNG 12 DI TÍCH TRỌNG ĐIỂM TRÊN ĐỊA BÀN PHƯỜNG THỦ DẦU MỘT (MỚI)
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
  {
    id: 'site-nhatuphuloi',
    name: 'Di Tích Lịch Sử Quốc Gia Nhà Tù Phú Lợi',
    category: 'LỊCH SỬ CÁCH MẠNG',
    rank: 'Di tích Quốc gia',
    address: 'Đường 1 Tháng 12, P. Phú Lợi, TP. Thủ Dầu Một',
    coords: { lat: 10.982222, lng: 106.680556 },
    coordsText: '10°58\'56"N 106°40\'50"E',
    googleMapsUrl: 'https://maps.app.goo.gl/354u4vTzJ4eJbX4J8',
    establishedYear: '1957 (Thời kỳ chống Mỹ - Diệm)',
    visitDuration: '1.5 – 2.0 giờ',
    openingHours: '07:30 – 11:30 & 13:30 – 17:00 (Thứ 3 đến Chủ Nhật)',
    ticketPrice: 'Miễn phí cho đoàn học tập truyền thống',
    thumbnail: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    summary:
      'Được mệnh danh là "Địa ngục trần gian" miền Nam – Nơi giam cầm hàng ngàn chiến sĩ cách mạng và chứng tích vụ đầu độc tù nhân Phú Lợi ngày 01/12/1958 gây chấn động lương tri thế giới.',
    historicalSignificance:
      'Biểu tượng sáng ngời cho tinh thần bất khuất, kiên trung của các chiến sĩ cộng sản. Cuộc đấu tranh của tù nhân Phú Lợi đã trở thành ngọn cờ hiệu triệu toàn miền Nam nổi dậy trong phong trào Đồng Khởi 1960.',
    architecturalHighlights: [
      'Khu trại giam bằng tôn và dây thép gai kiên cố thời chiến tranh',
      'Đài tưởng niệm các chiến sĩ cách mạng hy sinh ngày 1/12/1958',
      'Nhà trưng bày hiện vật, hình ảnh tố cáo tội ác đế quốc và tay sai',
      'Khu xà lim giam giữ biệt lập và các công sự phòng thủ xưa',
    ],
    visitorTips: [
      'Dâng hương tại tượng đài tưởng niệm trước khi vào tham quan các gian trưng bày',
      'Lắng nghe thuyết minh về bản anh hùng ca bất khuất của các nữ tù nhân và chiến sĩ cộng sản',
    ],
    audioGuideText:
      'Di tích Lịch sử Quốc gia Nhà tù Phú Lợi là minh chứng hùng hồn cho tinh thần quả cảm kiên cường "Thà hy sinh chứ không chịu khuất phục" của những người con cách mạng Việt Nam anh dũng.',
  },
  {
    id: 'site-loludaihung',
    name: 'Di Tích Lịch Sử — Văn Hóa Cấp Tỉnh Lò Lu Đại Hưng',
    category: 'DI SẢN ĐÔ THỊ',
    rank: 'Di tích Cấp Tỉnh',
    address: 'Ấp 1, Xã Tương Bình Hiệp, TP. Thủ Dầu Một',
    coords: { lat: 11.011667, lng: 106.650833 },
    coordsText: '11°00\'42"N 106°39\'03"E',
    googleMapsUrl: 'https://maps.app.goo.gl/Ucm1qU8h7v9Vf2Lp7',
    establishedYear: 'Khoảng thế kỷ 18 (Hơn 160 năm lịch sử)',
    visitDuration: '45 – 60 phút',
    openingHours: '07:30 – 17:00 hàng ngày',
    ticketPrice: 'Miễn phí tham quan',
    thumbnail: '/assets/hcm-space/card-khong-gian-3d.jpg',
    summary:
      'Lò gốm nung củi truyền thống có tuổi đời lâu đời nhất vùng Nam Bộ, lưu giữ trọn vẹn phương thức nung lu, hũ da lươn cổ truyền Đất Thủ.',
    historicalSignificance:
      'Đại diện cho văn hóa lao động cần cù, sáng tạo của cư dân bản địa kết hợp với thợ gốm người Hoa di cư, tạo nên dòng gốm Đại Hưng nức tiếng khắp Nam Kỳ lục tỉnh và giao thương quốc tế qua sông Sài Gòn.',
    architecturalHighlights: [
      'Hệ thống lò rồng (lò bao) dài hàng chục mét uốn lượn theo triền đồi',
      'Khu chế tác đất sét, bàn xoay thủ công và hàng ngàn sản phẩm lu sành phơi nắng',
      'Không gian làng nghề mộc mạc bên rặng tre và con rạch hiền hòa',
    ],
    visitorTips: [
      'Trải nghiệm trực tiếp xoay vuốt đất sét trên bàn xoay thủ công cùng nghệ nhân',
      'Gặp gỡ các nghệ nhân gốm lão thành chia sẻ về lửa lò Đại Hưng qua thế kỷ',
    ],
    audioGuideText:
      'Lò lu Đại Hưng là bảo tàng sống của nghề gốm sứ Bình Dương, nơi giữ mãi ngọn lửa nghề truyền thống và hồn cốt văn hóa thủ công Đất Thủ qua hàng trăm năm.',
  },
  {
    id: 'site-bendo-bachdang',
    name: 'Bến Đò Bạch Đằng & Công Viên Di Sản Ven Sông',
    category: 'DI SẢN ĐÔ THỊ',
    rank: 'Công trình Di sản Đô thị',
    address: 'Đường Bạch Đằng, P. Thủ Dầu Một',
    coords: { lat: 10.9798, lng: 106.6521 },
    coordsText: '10°58\'47"N 106°39\'08"E',
    googleMapsUrl: 'https://maps.app.goo.gl/hVpC9hW5x9n1a2Kk6',
    establishedYear: 'Hình thành từ thế kỷ 18 bên dòng sông Sài Gòn',
    visitDuration: '1.0 – 1.5 giờ',
    openingHours: 'Mở cửa tự do 24/7',
    ticketPrice: 'Miễn phí',
    thumbnail: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    summary:
      'Bến đò giao thương lịch sử bên sông Sài Gòn, chứng kiến ngày hội khởi nghĩa Tháng Tám 1945 và là không gian sinh hoạt văn hóa, lễ hội ven sông đặc sắc của Đất Thủ.',
    historicalSignificance:
      'Cửa ngõ đường thủy huyết mạch nối Thủ Dầu Một với Sài Gòn – Chợ Lớn và vùng Lục Tỉnh. Nơi các chiến sĩ biệt động và quần chúng cách mạng vượt sông làm nên những chiến công vang dội.',
    architecturalHighlights: [
      'Công viên hoa viên ven sông rợp bóng cây cổ thụ mát rượi',
      'Tuyến đường đi bộ Bạch Đằng đón gió sông trong lành và ngắm hoàng hôn',
      'Bến tàu du lịch kết nối các tour sinh thái đường sông Đất Thủ',
    ],
    visitorTips: [
      'Thời điểm dạo mát đẹp nhất là bình minh hoặc chiều tà ngắm hoàng hôn buông trên sông Sài Gòn',
      'Kết hợp tham quan Chợ cổ Thủ Dầu Một và Nhà truyền thống ven sông liền kề',
    ],
    audioGuideText:
      'Bến Bạch Đằng không chỉ là tuyến giao thương thủy sầm uất xưa kia mà hôm nay đã trở thành công viên di sản văn hóa, nơi nhịp sống hiện đại hòa quyện cùng ký ức hào hùng của dòng sông lịch sử.',
  },
  {
    id: 'site-dinhphuvan',
    name: 'Đình Thần Phú Văn',
    category: 'VĂN HÓA TÂM LINH',
    rank: 'Di tích Cấp Tỉnh',
    address: 'Khu phố 3, P. Phú Cường (nay thuộc P. Thủ Dầu Một)',
    coords: { lat: 10.9855, lng: 106.6572 },
    coordsText: '10°59\'08"N 106°39\'26"E',
    googleMapsUrl: 'https://maps.app.goo.gl/d8Xv5M4zF8L1a3Kp8',
    establishedYear: 'Đầu thế kỷ 19',
    visitDuration: '30 – 45 phút',
    openingHours: '07:30 – 17:00 hàng ngày',
    ticketPrice: 'Miễn phí',
    thumbnail: '/assets/hcm-space/card-tac-pham.jpg',
    summary:
      'Ngôi đình cổ mang đậm dấu ấn tín ngưỡng dân gian Nam Bộ, nơi thờ Thành hoàng Bổn cảnh và lưu giữ nhiều hiện vật điêu khắc gỗ tinh xảo.',
    historicalSignificance:
      'Trong những năm kháng chiến chống Pháp và chống Mỹ, đình là cơ sở bí mật nuôi giấu cán bộ cách mạng, điểm hội họp của các tổ chức thanh niên yêu nước Đất Thủ.',
    architecturalHighlights: [
      'Kiến trúc đình tam gian hai chái lợp ngói âm dương cổ kính',
      'Các bức hoành phi, bao lam chạm khắc tứ linh, tứ quý sơn son thếp vàng đỉnh cao',
      'Khu võ ca truyền thống nơi tổ chức hát bội trong các dịp lễ Kỳ yên hàng năm',
    ],
    visitorTips: [
      'Trang phục lịch sự trang nghiêm khi viếng đình và thắp hương',
      'Chiêm ngưỡng các mảng chạm khắc gỗ tinh xảo của thợ thủ công Đất Thủ xưa',
    ],
    audioGuideText:
      'Đình thần Phú Văn là một góc bình yên giữa lòng đô thị, gìn giữ cội nguồn tâm linh và đạo lý uống nước nhớ nguồn của người dân Đất Thủ qua nhiều thế hệ.',
  },
];

// =========================================================================
// 2. 04 TOUR DU KHẢO DI SẢN GỢI Ý (HERITAGE DISCOVERY ROUTES)
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
  {
    id: 'tour-diachi-do',
    title: 'Tour 4: Địa Chỉ Đỏ Kháng Chiến & Vành Đai Cách Mạng Đất Thủ',
    theme: 'Truyền thống yêu nước, tôi luyện ý chí & ký ức hào hùng',
    duration: 'Cả ngày (khoảng 5.0 giờ)',
    distance: '6.5 km',
    recommendedTransport: 'Xe ô tô du lịch hoặc đoàn xe máy',
    description:
      'Tuyến hành trình về nguồn đặc biệt kết nối Di tích Nhà việc Phú Cường, Chi bộ Lò Chén 1936, Di tích Quốc gia Nhà tù Phú Lợi và Chùa Hội Khánh — dấu ấn lịch sử hào hùng của quân và dân Thủ Dầu Một.',
    siteIds: ['site-nhatruyenthong', 'site-lochen', 'site-nhatuphuloi', 'site-chuahoikhanh'],
    badgeColor: 'from-[#881337] to-[#991B1B]',
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


// =========================================================================
// 5. CÁC BÀI VIẾT & CHUYÊN ĐỀ LỊCH SỬ CHÍNH THỐNG VỀ ĐẤT THỦ & BÁC HỒ
// =========================================================================
export interface HistoricalArticleItem {
  id: string;
  title: string;
  category: 'LỊCH SỬ CÁCH MẠNG' | 'BÁC HỒ VỚI ĐẤT THỦ' | 'XÂY DỰNG ĐẢNG' | 'DI SẢN VĂN HÓA';
  summary: string;
  author: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  keyQuotes?: string[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    calloutText?: string;
    subImage?: string;
  }[];
  relatedSiteIds?: string[];
  referenceSources: string[];
}

export const THU_DAU_MOT_HISTORICAL_ARTICLES: HistoricalArticleItem[] = [
  {
    id: 'art-nguyen-sinh-sac',
    title: 'Cụ Phó bảng Nguyễn Sinh Sắc và ngọn lửa yêu nước tại Chùa Hội Khánh',
    category: 'BÁC HỒ VỚI ĐẤT THỦ',
    summary:
      'Tìm hiểu giai đoạn cụ Phó bảng Nguyễn Sinh Sắc — thân sinh Chủ tịch Hồ Chí Minh — dừng chân tại Thủ Dầu Một (1923 - 1926), sáng lập Hội Danh Dự yêu nước, gieo mầm tư tưởng cách mạng vào lòng nhân sĩ Đất Thủ.',
    author: 'Ban Tuyên giáo & Hội Khoa học Lịch sử Tỉnh',
    publishedDate: '19/05/2026',
    readTime: '6 phút đọc',
    coverImage: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    tags: ['Cụ Nguyễn Sinh Sắc', 'Chùa Hội Khánh', 'Hội Danh Dự', 'Đất Thủ', 'Bác Hồ'],
    keyQuotes: [
      'Đại sự khởi ư tế, tích tiểu thành đại. Lòng yêu nước thương dân bắt đầu từ việc làm điều thiện, trừ điều ác cho đồng bào.',
      'Dấu chân cụ Nguyễn Sinh Sắc tại Chùa Hội Khánh là sợi dây tâm linh và lịch sử thiêng liêng nối liền Đất Thủ với Bác Hồ kính yêu.',
    ],
    contentSections: [
      {
        heading: '1. Hành trình phương Nam và điểm dừng chân Chùa Hội Khánh',
        paragraphs: [
          'Sau khi từ quan, rời bỏ chốn quan trường thối nát của triều đình nhà Nguyễn, cụ Phó bảng Nguyễn Sinh Sắc đã bôn ba khắp các tỉnh Nam Bộ, hành nghề bốc thuốc chữa bệnh cứu người và tìm kiếm những bậc chí sĩ chung chí hướng cứu quốc.',
          'Khoảng những năm 1923 – 1926, cụ Nguyễn Sinh Sắc đã nhiều lần lui tới và lưu lại chùa Hội Khánh (Thủ Dầu Một). Nơi đây, với sự che chở của Hòa thượng Từ Văn — một bậc cao tăng uyên thâm và có tinh thần dân tộc sâu sắc — cụ Sắc đã mở lớp dạy chữ Nho, bốc thuốc nam trị bệnh cho dân nghèo và đàm đạo việc nước với các nhân sĩ yêu nước địa phương.',
        ],
        calloutText: 'Tại chùa Hội Khánh, cụ Sắc đã cùng Hòa thượng Từ Văn và thầy giáo Som thành lập Hội Danh Dự — một tổ chức yêu nước kín đáo với tôn chỉ cổ vũ lòng tự hào dân tộc, giúp đỡ người hoạn nạn.',
      },
      {
        heading: '2. Hoạt động của Hội Danh Dự và ảnh hưởng sâu rộng',
        paragraphs: [
          'Hội Danh Dự tuy hoạt động dưới vỏ bọc tương tế, thiện nguyện và chấn hưng văn hóa, nhưng thực chất là cái nôi giác ngộ tinh thần yêu nước cho tầng lớp thanh niên, thợ thủ công và trí thức Đất Thủ. Cụ Sắc thường dùng các câu chuyện lịch sử dân tộc, gương anh hùng dựng nước và giữ nước để khơi dậy ngọn lửa quật khởi trong lòng môn đệ.',
          'Nhiều hội viên của Hội Danh Dự sau này đã trở thành những hạt nhân nòng cốt tham gia các phong trào đấu tranh cách mạng, gia nhập tổ chức Việt Nam Thanh niên Cách mạng Đồng chí Hội và sau đó là Đảng Cộng sản Việt Nam tại Thủ Dầu Một.',
        ],
      },
      {
        heading: '3. Di sản bất tử và niềm tự hào của Đảng bộ và Nhân dân',
        paragraphs: [
          'Ngày nay, gian nhà phía sau chùa Hội Khánh — nơi cụ Nguyễn Sinh Sắc từng ngồi bốc thuốc và giảng bài — đã được trùng tu, trở thành một không gian lưu niệm tôn nghiêm. Mỗi độ Tết đến, Xuân về hay vào dịp kỷ niệm ngày sinh Bác Hồ (19/5), các thế hệ cán bộ, đảng viên và người dân Thủ Dầu Một lại tề tựu về đây để tưởng niệm bậc thân sinh vĩ đại của Người.',
        ],
      },
    ],
    relatedSiteIds: ['site-chuahoikhanh', 'site-nhatruyenthong'],
    referenceSources: [
      'Lịch sử Đảng bộ tỉnh Bình Dương (1930 - 2020), NXB Chính trị Quốc gia Sự thật',
      'Hồ sơ Di tích Lịch sử Chùa Hội Khánh, Sở Văn hóa - Thể thao và Du lịch tỉnh Bình Dương',
      'Kỷ yếu Hội thảo Khoa học: Cụ Phó bảng Nguyễn Sinh Sắc với vùng đất Nam Bộ, 2019',
    ],
  },
  {
    id: 'art-chi-bo-lo-chen',
    title: 'Chi bộ Lò Chén Phú Cường (1936) – Ngọn cờ đầu của phong trào công nhân Đất Thủ',
    category: 'LỊCH SỬ CÁCH MẠNG',
    summary:
      'Sự ra đời của Chi bộ Lò Chén tháng 02/1936 đánh dấu bước ngoặt quyết định phong trào công nhân gốm sứ và nhân dân lao động Thủ Dầu Một bước vào quỹ đạo đấu tranh cách mạng có tổ chức dưới sự lãnh đạo của Đảng.',
    author: 'Ban Tuyên giáo Đảng ủy Phường Thủ Dầu Một',
    publishedDate: '03/02/2026',
    readTime: '7 phút đọc',
    coverImage: '/assets/hcm-space/card-cuoc-doi.jpg',
    tags: ['Chi bộ Lò Chén', 'Phong trào công nhân', 'Lịch sử Đảng bộ', '1936', 'Phú Cường'],
    keyQuotes: [
      'Chi bộ Lò Chén là hạt giống đỏ đầu tiên nảy mầm trên mảnh đất Thủ Dầu Một kiên cường, nơi ngọn cờ Đảng soi rọi con đường giải phóng giai cấp và giải phóng dân tộc.',
    ],
    contentSections: [
      {
        heading: '1. Bối cảnh lịch sử và phong trào công nhân gốm sứ Đất Thủ',
        paragraphs: [
          'Vào những năm 1930, Thủ Dầu Một là trung tâm sản xuất gốm sứ thủ công mỹ nghệ lớn nhất Nam Kỳ với hàng chục lò gốm sứ, tập trung hàng ngàn thợ gốm, phu lò và thợ mộc sơn mài. Công nhân ở đây phải làm việc quần quật 12-14 giờ mỗi ngày trong điều kiện nóng bức, độc hại nhưng đồng lương rẻ mạt và bị giới chủ cúp phạt tàn nhẫn.',
          'Dưới ảnh hưởng của cao trào cách mạng 1930 - 1931 và phong trào Mặt trận Dân chủ Đông Dương, tư tưởng Mác-Lênin đã lan truyền mạnh mẽ vào xưởng thợ. Các cán bộ Xứ ủy Nam Kỳ đã bí mật về Thủ Dầu Một để gầy dựng cơ sở cách mạng trong hàng ngũ công nhân lò gốm.',
        ],
      },
      {
        heading: '2. Sự ra đời của Chi bộ Lò Chén tháng 02/1936',
        paragraphs: [
          'Tháng 02/1936, tại một căn chòi nhỏ bên cạnh Lò gốm Tân Khánh – Phú Cường, Chi bộ Đảng Cộng sản đầu tiên của vùng Thủ Dầu Một chính thức được thành lập gồm 3 đảng viên trung kiên: đồng chí Trương Văn Bền, đồng chí Nguyễn Văn Tiết và đồng chí Hồ Văn Cống.',
          'Ngay sau khi thành lập, Chi bộ đã nhanh chóng lãnh đạo công nhân lò gốm bãi công đòi tăng lương, giảm giờ làm, chống đánh đập và đòi tự do nghiệp đoàn. Cuộc bãi công của hơn 500 thợ gốm Phú Cường đã thắng lợi rực rỡ, buộc giới chủ phải nhượng bộ, tạo tiếng vang lớn khắp miền Đông Nam Bộ.',
        ],
        calloutText: 'Từ đốm lửa Lò Chén, tổ chức Đảng đã phát triển rộng khắp ra các đồn điền cao su Dầu Tiếng, các xưởng mộc Chợ Thủ và nông thôn các xã lân cận, chuẩn bị lực lượng cho cuộc Cách mạng Tháng Tám 1945.',
      },
      {
        heading: '3. Bài học về sự gắn bó máu thịt với giai cấp công nhân và nhân dân',
        paragraphs: [
          'Thực tiễn 90 năm lịch sử đã chứng minh: Chi bộ Lò Chén thành công là nhờ các đảng viên luôn "ba cùng" với người lao động, thấu hiểu tâm tư, bảo vệ quyền lợi chính đáng của quần chúng. Đây là bài học vô giá đối với công tác xây dựng chỉnh đốn Đảng tại Đảng bộ phường Thủ Dầu Một hôm nay.',
        ],
      },
    ],
    relatedSiteIds: ['site-lochen', 'site-loludaihung', 'site-nhatruyenthong'],
    referenceSources: [
      'Lịch sử Đảng bộ TP. Thủ Dầu Một (1930 - 2025), Ban Tuyên giáo Thành ủy',
      'Lịch sử phong trào công nhân và Công đoàn tỉnh Bình Dương, NXB Lao Động',
      'Hồ sơ lưu trữ Chi bộ Lò Chén Phú Cường, Bảo tàng tỉnh Bình Dương',
    ],
  },
  {
    id: 'art-khoi-nghia-nha-viec',
    title: 'Khởi nghĩa Tháng Tám 1945 và Mùa Xuân 1975 toàn thắng tại Nhà việc Phú Cường',
    category: 'LỊCH SỬ CÁCH MẠNG',
    summary:
      'Nhà việc Phú Cường (nay là Nhà truyền thống Thủ Dầu Một) — chứng nhân lịch sử của hai mốc son rực rỡ: ngày 25/8/1945 giành chính quyền về tay nhân dân và sáng ngày 30/4/1975 lá cờ chiến thắng tung bay giải phóng hoàn toàn Đất Thủ.',
    author: 'Hội Cựu Chiến binh & Đoàn Thanh niên Phường',
    publishedDate: '30/04/2026',
    readTime: '8 phút đọc',
    coverImage: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    tags: ['Nhà việc Phú Cường', 'Khởi nghĩa 1945', 'Giải phóng 1975', 'Nhà truyền thống', 'Thủ Dầu Một'],
    keyQuotes: [
      'Sáng 25/8/1945, rừng cờ đỏ sao vàng rực rỡ bên bờ sông Sài Gòn. Tiếng reo hò dậy đất của hàng vạn đồng bào tại Nhà việc Phú Cường đã chôn vùi chế độ thực dân phong kiến.',
      'Sáng 30/4/1975, cờ Mặt trận Dân tộc Giải phóng tung bay trên nóc Tòa Tỉnh trưởng và Nhà việc Phú Cường, non sông thu về một mối.',
    ],
    contentSections: [
      {
        heading: '1. Vị trí chiến lược của Nhà việc Phú Cường xưa',
        paragraphs: [
          'Nhà việc Phú Cường (Nhà Làng Phú Cường) được xây dựng từ thời thuộc Pháp ven ngã ba sông Sài Gòn, vốn là trung tâm quyền lực hành chính của bộ máy cai trị thực dân tại tỉnh lỵ Thủ Dầu Một. Nơi đây kiểm soát chặt chẽ cả đường bộ lẫn tuyến giao thông đường thủy huyết mạch nối miền Đông với Sài Gòn.',
          'Chính vì tính chất trọng yếu đó, Nhà việc Phú Cường luôn là mục tiêu tiến công hàng đầu trong các kế hoạch khởi nghĩa giải phóng của quân và dân cách mạng.',
        ],
      },
      {
        heading: '2. Ngày 25/8/1945: Khởi nghĩa rung chuyển bờ sông Bạch Đằng',
        paragraphs: [
          'Thực hiện Lệnh khởi nghĩa của Xứ ủy Nam Kỳ, sáng sớm ngày 25/8/1945, dưới sự chỉ đạo của Tỉnh ủy lâm thời Thủ Dầu Một, hàng vạn công nhân cao su Dầu Tiếng, thợ gốm Phú Cường, thợ mộc Chợ Thủ cùng đông đảo nông dân mang gậy gộc, giáo mác, súng tự tạo rầm rộ kéo về thị xã.',
          'Đoàn biểu tình đã bao vây chặt Nhà việc Phú Cường và Dinh Tỉnh trưởng, buộc tỉnh trưởng ngụy quyền phải đầu hàng vô điều kiện và trao nộp toàn bộ vũ khí, ấn tín. Lần đầu tiên trong lịch sử, lá cờ đỏ sao vàng kiêu hãnh tung bay trên nóc Nhà việc Phú Cường trong tiếng vỗ tay rền vang của biển người.',
        ],
        calloutText: 'Cuộc khởi nghĩa giành chính quyền tại Nhà việc Phú Cường ngày 25/8/1945 đã diễn ra nhanh gọn, triệt để và không đổ máu, thể hiện sự mưu trí, quả cảm và sức mạnh đại đoàn kết dân tộc.',
      },
      {
        heading: '3. Đại thắng Mùa Xuân 30/4/1975 và diện mạo Nhà Truyền Thống hôm nay',
        paragraphs: [
          'Ba mươi năm sau, trong Chiến dịch Hồ Chí Minh lịch sử, vào lúc 10 giờ 30 phút ngày 30/4/1975, các mũi tiến công của quân giải phóng phối hợp với lực lượng biệt động nội thành đã chiếm lĩnh toàn bộ thị xã Thủ Dầu Một, cắm cờ chiến thắng tại Nhà việc Phú Cường, đập tan sào huyệt cuối cùng của chế độ Sài Gòn.',
          'Hôm nay, trên nền di tích xưa, Đảng bộ và chính quyền đã xây dựng Nhà truyền thống Thủ Dầu Một khang trang, phục dựng số hóa 3D VR hiện đại, trở thành "địa chỉ đỏ" giáo dục truyền thống cách mạng cho muôn đời sau.',
        ],
      },
    ],
    relatedSiteIds: ['site-nhatruyenthong', 'site-bendo-bachdang', 'site-chothudaumot'],
    referenceSources: [
      'Bình Dương – Lịch sử 30 năm kháng chiến chống Mỹ cứu nước (1954 - 1975)',
      'Hồi ký cách mạng của các tướng lĩnh và lão thành cách mạng Đất Thủ',
      'Tài liệu lịch sử Đảng bộ Phường Thủ Dầu Một, 2025',
    ],
  },
  {
    id: 'art-kgvh-hcm-dat-thu',
    title: 'Xây dựng Không gian Văn hóa Hồ Chí Minh – Động lực phát triển văn hóa, con người Thủ Dầu Một',
    category: 'XÂY DỰNG ĐẢNG',
    summary:
      'Quán triệt Nghị quyết Đại hội Đảng các cấp, Phường Thủ Dầu Một triển khai toàn diện Không gian Văn hóa Hồ Chí Minh cả về vật thể, phi vật thể và trên không gian số, tạo sức lan tỏa sâu rộng trong đời sống nhân dân.',
    author: 'Ban Chỉ đạo Xây dựng Không gian Văn hóa HCM Phường',
    publishedDate: '15/05/2026',
    readTime: '6 phút đọc',
    coverImage: '/assets/hcm-space/card-khong-gian-3d.jpg',
    tags: ['Không gian văn hóa Hồ Chí Minh', 'Thủ Dầu Một', 'Đô thị văn minh', 'Chuyển đổi số', 'Con người Đất Thủ'],
    keyQuotes: [
      'Không gian Văn hóa Hồ Chí Minh không chỉ là những phòng trưng bày cố định, mà phải hiện hữu sống động trong từng nếp nghĩ, lời ăn tiếng nói, tinh thần tương thân tương ái nghĩa tình của người dân Thủ Dầu Một.',
    ],
    contentSections: [
      {
        heading: '1. Ý nghĩa chiến lược của Không gian Văn hóa Hồ Chí Minh tại cơ sở',
        paragraphs: [
          'Thủ Dầu Một là vùng đất giàu truyền thống yêu nước và cách mạng, nơi lưu dấu ấn của cụ Phó bảng Nguyễn Sinh Sắc và phong trào công nhân quật khởi. Việc xây dựng Không gian Văn hóa Hồ Chí Minh là vinh dự và trách nhiệm thiêng liêng của toàn thể hệ thống chính trị.',
          'Không gian văn hóa này bao gồm 3 trụ cột đồng bộ: (1) Không gian văn hóa vật thể tại các công sở, trường học, di tích; (2) Không gian văn hóa phi vật thể thấm sâu vào văn hóa ứng xử, đạo đức lối sống "Nghĩa tình Đất Thủ"; và (3) Không gian văn hóa số trên môi trường mạng phục vụ nhân dân tương tác 24/7.',
        ],
      },
      {
        heading: '2. Những kết quả nổi bật sau ngày sáp nhập phường mới (01/07/2025)',
        paragraphs: [
          'Sau khi thực hiện sắp xếp đơn vị hành chính mới, Đảng ủy Phường Thủ Dầu Một đã phát động phong trào thi đua "Mỗi chi bộ một công trình văn hóa Hồ Chí Minh". Đến nay, 100% chi bộ khu phố, trường học, trạm y tế đã hoàn thành tủ sách Bác Hồ, vách gỗ 5 Điều Bác dạy cho thiếu nhi.',
          'Đặc biệt, Cổng thông tin Không gian Văn hóa Hồ Chí Minh trực tuyến tích hợp mô hình 3D VR Nhà việc Phú Cường, 600 trang lịch sử Đảng bộ số hóa, kho 120 mẩu chuyện kể có giọng đọc AI truyền cảm đã thu hút hàng trăm ngàn lượt người truy cập học tập.',
        ],
        calloutText: 'Mô hình "Bếp cơm nghĩa tình 0 đồng", "Tủ sách trao tay", "Hòm thư báo công dâng Bác" đã biến việc học Bác thành hành động cụ thể, giản dị mà chan chứa tình người.',
      },
      {
        heading: '3. Phương hướng tiếp tục lan tỏa trong kỷ nguyên mới',
        paragraphs: [
          'Thời gian tới, phường tiếp tục đầu tư số hóa toàn diện 12 địa chỉ đỏ, tổ chức các hội thi "Chúng em kể chuyện Bác Hồ", giải thưởng "Công dân trẻ tiêu biểu làm theo lời Bác", quyết tâm xây dựng Thủ Dầu Một thành đô thị văn minh, thông minh, giàu đẹp và nghĩa tình.',
        ],
      },
    ],
    relatedSiteIds: ['site-nhatruyenthong', 'site-chuahoikhanh'],
    referenceSources: [
      'Nghị quyết Đại hội Đảng bộ Phường Thủ Dầu Một nhiệm kỳ 2025 - 2030',
      'Đề án Xây dựng Nếp sống văn hóa, văn minh đô thị TP. Thủ Dầu Một',
      'Chỉ thị số 05-CT/TW và Kết luận số 01-KL/TW của Bộ Chính trị',
    ],
  },
  {
    id: 'art-hoc-tap-quy-dinh-144',
    title: 'Chuẩn mực đạo đức cách mạng của cán bộ, đảng viên theo Quy định 144-QĐ/TW gắn với học Bác',
    category: 'XÂY DỰNG ĐẢNG',
    summary:
      'Phân tích sâu 5 chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới theo Quy định số 144-QĐ/TW của Bộ Chính trị, soi chiếu qua tấm gương mẫu mực cần, kiệm, liêm, chính của Chủ tịch Hồ Chí Minh.',
    author: 'Ủy ban Kiểm tra & Ban Tổ chức Đảng ủy Phường',
    publishedDate: '10/06/2026',
    readTime: '7 phút đọc',
    coverImage: '/assets/hcm-space/card-tac-pham.jpg',
    tags: ['Quy định 144-QĐ/TW', 'Chuẩn mực đạo đức', 'Cần kiệm liêm chính', 'Cán bộ đảng viên', 'Học tập Bác'],
    keyQuotes: [
      'Đạo đức cách mạng không phải trên trời sa xuống. Nó do đấu tranh, rèn luyện bền bỉ hàng ngày mà phát triển và củng cố. Cũng như ngọc càng mài càng sáng, vàng càng luyện càng trong.',
      'Cán bộ là cái gốc của mọi công việc. Muốn nhân dân tin, cán bộ phải làm gương trước: việc gì có lợi cho dân phải hết sức làm, việc gì có hại cho dân phải hết sức tránh.',
    ],
    contentSections: [
      {
        heading: '1. Tầm quan trọng của Quy định 144-QĐ/TW trong tình hình hiện nay',
        paragraphs: [
          'Ngày 09/05/2024, Bộ Chính trị ban hành Quy định số 144-QĐ/TW về "Chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới". Đây là văn kiện đặc biệt quan trọng nhằm xây dựng đội ngũ cán bộ vừa "hồng" vừa "chuyên", có đủ phẩm chất, năng lực và uy tín ngang tầm nhiệm vụ.',
          'Quy định 144 kế thừa trọn vẹn tư tưởng Hồ Chí Minh về đạo đức cách mạng, cụ thể hóa thành 5 chuẩn mực cô đọng, rõ ràng, là tấm gương soi hàng ngày cho mỗi cán bộ, đảng viên tự soi, tự sửa.',
        ],
      },
      {
        heading: '2. Năm chuẩn mực đạo đức cốt lõi soi chiếu qua cuộc đời Bác Hồ',
        paragraphs: [
          'Điều 1: Yêu nước, tôn trọng Nhân dân, tuyệt đối trung thành với Đảng, với Tổ quốc. Bác Hồ từng căn dặn: "Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân". Phụng sự Tổ quốc là mục tiêu tối thượng.',
          'Điều 2: Bản lĩnh, đổi mới, sáng tạo, hội nhập. Bác luôn dám nghĩ, dám làm, dám vượt qua những lối mòn để tìm ra con đường cứu nước đúng đắn cho dân tộc.',
          'Điều 3: Cần, kiệm, liêm, chính, chí công vô tư. Bác suốt đời sống thanh bạch, đôi dép lốp, bộ quần áo kaki sờn vai, chiếc nhà sàn mộc mạc, không mảy may tơ hào của công.',
          'Điều 4: Đoàn kết, kỷ cương, tình thương, trách nhiệm. Đoàn kết trong Đảng là hạt nhân của khối đại đoàn kết toàn dân tộc.',
          'Điều 5: Gương mẫu, khiêm tốn, tu dưỡng rèn luyện, học tập suốt đời.',
        ],
        calloutText: 'Tại Đảng bộ Phường Thủ Dầu Một, mỗi cán bộ, đảng viên đều ký cam kết tu dưỡng 5 chuẩn mực đạo đức Quy định 144, lấy sự hài lòng của người dân làm thước đo cao nhất của hiệu quả công tác.',
      },
      {
        heading: '3. Đưa chuẩn mực đạo đức vào nền nếp sinh hoạt Chi bộ',
        paragraphs: [
          'Thông qua Không gian Văn hóa Hồ Chí Minh số và ứng dụng "Sổ tay Đảng viên điện tử", các chi bộ phường tổ chức sinh hoạt chuyên đề định kỳ, biểu dương kịp thời những tấm gương liêm chính, tận tụy, đồng thời kiên quyết đấu tranh phòng chống suy thoái, "tự diễn biến", "tự chuyển hóa".',
        ],
      },
    ],
    relatedSiteIds: ['site-nhatruyenthong', 'site-lochen'],
    referenceSources: [
      'Quy định số 144-QĐ/TW ngày 09/05/2024 của Bộ Chính trị',
      'Hồ Chí Minh Toàn tập, Tập 5, Tập 15, NXB Chính trị Quốc gia Sự thật',
      'Hướng dẫn số 159-HD/BTGTW của Ban Tuyên giáo Trung ương thực hiện Quy định 144-QĐ/TW',
    ],
  },
];
