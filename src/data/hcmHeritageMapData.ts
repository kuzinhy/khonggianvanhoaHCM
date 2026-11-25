/**
 * Dữ liệu Bản đồ Di sản Không gian Văn hóa Hồ Chí Minh
 * 1. Hành trình 30 năm bôn ba cứu nước (10 Chặng - 61 Điểm mốc GPS trích xuất từ USSH)
 * 2. Hệ thống Di tích & Địa chỉ đỏ Hồ Chí Minh tại TP.HCM và vùng phụ cận
 * 3. Tác phẩm kinh điển & Văn kiện lập quốc thiêng liêng
 */
import usshRawPoints from './extractedUsshPoints.json';

export interface ClassicRevolutionaryWork {
  id: string;
  title: string;
  originalTitle?: string;
  year: string;
  location: string;
  stageNumber?: number;
  category: 'YEU_SACH' | 'LUAN_THUYET' | 'VAN_KIEN_DANG' | 'THO_VAN' | 'TUYEN_NGON';
  summary: string;
  quoteKey: string;
  significance: string;
  readMoreSnippet: string;
}

export interface UsshPoint {
  id: number;
  pointId: number;
  stage: string;
  stageNumber: number;
  place: string;
  content: string;
  coords: {
    lng: number;
    lat: number;
  };
  extraVisits?: Array<{
    stage: string;
    place: string;
    content: string;
  }>;
}

export interface JourneyStage {
  stageNumber: number;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  pointsCount: number;
}

export interface HeritageStopPoint {
  id: string;
  stageNumber: number;
  order: number;
  year: string;
  name: string;
  location: string;
  country: string;
  alias: string; // Bí danh Người sử dụng
  coords: { x: number; y: number }; // Tọa độ tương đối trên bản đồ phẳng (0 - 100)
  gps?: { lng: number; lat: number }; // Tọa độ GPS chuẩn xác
  events: string;
  historicalSignificance: string;
  memorialSite: string; // Di tích / Điểm lưu niệm ngày nay
  quote?: string;
  audioNarrative?: string;
  classicWorkId?: string; // Tác phẩm kinh điển ra đời / gắn liền
}

export interface HcmRegionalHeritageSite {
  id: string;
  code: string;
  name: string;
  category: 'DI_TICH_BAC_HO' | 'CAN_CU_LICH_SU' | 'KHONG_GIAN_SO' | 'BAO_TANG';
  categoryLabel: string;
  address: string;
  district: string;
  city: string;
  coords: { x: number; y: number }; // Tọa độ tương đối trên bản đồ TP.HCM (0 - 100)
  gps: { lat: number; lng: number };
  summary: string;
  historicalEvent: string;
  visitingInfo: {
    hours: string;
    ticket: string;
    highlights: string[];
  };
  imageUrl: string;
  audioNarrative: string;
}

// 10 Chặng Lịch sử Hành trình 30 năm bôn ba cứu nước
export const JOURNEY_10_STAGES: JourneyStage[] = [
  {
    stageNumber: 1,
    period: '05/6/1911 - Cuối 1911',
    title: 'Khởi hành từ Bến Nhà Rồng - Ra đi tìm đường cứu nước',
    subtitle: 'Rời cảng Sài Gòn trên tàu Amiral Latouche-Tréville mang tên Văn Ba',
    description: 'Từ bến cảng Sài Gòn, người thanh niên Nguyễn Tất Thành quyết chí ra đi tìm hiểu những gì ẩn giấu sau khẩu hiệu Tự do - Bình đẳng - Bác ái của phương Tây để trở về giúp đồng bào.',
    color: '#DC2626',
    pointsCount: 4,
  },
  {
    stageNumber: 2,
    period: '1911 - 1912',
    title: 'Hành trình đại dương & Khảo sát các thuộc địa châu Phi',
    subtitle: 'Vòng quanh châu Phi, qua Singapore, Sri Lanka, Ai Cập, Algérie, Senegal...',
    description: 'Người tận mắt chứng kiến nỗi cơ cực của nhân dân các nước thuộc địa, nhận thức sâu sắc: Ở đâu bọn thực dân cũng tàn bạo, ở đâu người lao động cũng bị áp bức.',
    color: '#D97706',
    pointsCount: 6,
  },
  {
    stageNumber: 3,
    period: '1912 - 1913',
    title: 'Nước Mỹ - Khảo nghiệm văn minh tư bản & Phong trào giải phóng',
    subtitle: 'Đến Boston và New York - Tìm hiểu Tuyên ngôn Độc lập Hoa Kỳ 1776',
    description: 'Người làm việc tại khách sạn Parker House ở Boston, tiếp cận nền văn minh Mỹ, nhận rõ tính chất giới hạn của nền dân chủ tư sản và phong trào đấu tranh của người da màu ở Harlem.',
    color: '#2563EB',
    pointsCount: 5,
  },
  {
    stageNumber: 4,
    period: '1913 - 1917',
    title: 'Vương quốc Anh - Tôi luyện trong phong trào công nhân quốc tế',
    subtitle: 'Sống và lao động tại London - Tham gia Hội Lao động Hải ngoại',
    description: 'Người cào tuyết tại trường Carlton, làm phụ bếp tại khách sạn Drayton Court và Carlton, học tiếng Anh và hòa mình vào phong trào đấu tranh của giai cấp công nhân Anh.',
    color: '#0D9488',
    pointsCount: 5,
  },
  {
    stageNumber: 5,
    period: '1917 - 1923',
    title: 'Nước Pháp - Yêu sách An Nam & Bỏ phiếu thành lập Đảng CS Pháp',
    subtitle: 'Gia nhập Đảng Xã hội Pháp, viết báo Le Paria, đón nhận Luận cương Lênin',
    description: 'Bản Yêu sách 8 điểm (1919) làm rung chuyển Hội nghị Versailles; Đại hội Tours (12/1920) Người bỏ phiếu tán thành Đệ tam Quốc tế, tìm thấy con đường cứu nước đúng đắn.',
    color: '#7C3AED',
    pointsCount: 8,
  },
  {
    stageNumber: 6,
    period: '1923 - 1924',
    title: 'Liên Xô - Quê hương Lênin & Quốc tế Cộng sản',
    subtitle: 'Dự Đại hội V Quốc tế Cộng sản, Quốc tế Nông dân tại Moskva',
    description: 'Người sang Liên Xô, học tập tại Trường Đại học Phương Đông, phát biểu tại Đại hội V Quốc tế Cộng sản bảo vệ quyền tự quyết của các dân tộc thuộc địa phương Đông.',
    color: '#E11D48',
    pointsCount: 6,
  },
  {
    stageNumber: 7,
    period: '1924 - 1927',
    title: 'Quảng Châu (Trung Quốc) - Sáng lập Hội VN Cách mạng Thanh niên',
    subtitle: 'Mở các lớp huấn luyện chính trị, xuất bản tác phẩm Đường Kách mệnh (1927)',
    description: 'Lấy bí danh Lý Thụy, Người huấn luyện thế hệ cán bộ đầu tiên của cách mạng Việt Nam, ra báo Thanh niên - tờ báo cách mạng đầu tiên của nước ta ngày 21/6/1925.',
    color: '#CA8A04',
    pointsCount: 7,
  },
  {
    stageNumber: 8,
    period: '1928 - 1929',
    title: 'Xiêm (Thái Lan) - Thâm nhập phong trào Việt kiều yêu nước',
    subtitle: 'Bí danh Thầu Chín tại Bản Đông, Udon Thani, Nakhon Phanom',
    description: 'Người hòa mình cùng kiều bào mở trường dạy học, dựng chùa, làm đường, củng cố tổ chức Hội Thân ái, khơi dậy tinh thần yêu nước hướng về Tổ quốc.',
    color: '#059669',
    pointsCount: 6,
  },
  {
    stageNumber: 9,
    period: '1930 - 1938',
    title: 'Hương Cảng & Hoạt động bí mật - Sáng lập Đảng Cộng sản Việt Nam',
    subtitle: 'Hội nghị thành lập Đảng 3/2/1930 & Vụ án Tống Văn Sơ tại Hồng Kông',
    description: 'Chủ trì Hội nghị hợp nhất các tổ chức cộng sản tại Cửu Long, thông qua Chánh cương, Sách lược vắn tắt; vượt qua vụ án Tống Văn Sơ mưu trí nhờ luật sư Loseby bảo vệ.',
    color: '#B91C1C',
    pointsCount: 7,
  },
  {
    stageNumber: 10,
    period: '1938 - 1945',
    title: 'Trở về cội nguồn Pác Bó - Lãnh đạo Cách mạng Tháng Tám toàn thắng',
    subtitle: 'Từ Diên An, Côn Minh về Pác Bó (Cao Bằng) ngày 28/01/1941, lập Mặt trận Việt Minh',
    description: 'Sau 30 năm bôn ba, ngày 28/01/1941 Người hôn lên hòn đất Tổ quốc tại Cột mốc 108. Trực tiếp chỉ đạo Hội nghị TW 8, thành lập Đội VN Tuyên truyền Giải phóng quân và chớp thời cơ Cách mạng Tháng Tám 1945.',
    color: '#B45309',
    pointsCount: 6,
  },
];

// Danh sách các điểm dừng chân tiêu biểu (Phân bố theo 10 chặng lịch sử)
export const HERITAGE_STOP_POINTS: HeritageStopPoint[] = [
  // Chặng 1: Bến Nhà Rồng - Ra đi (1911)
  {
    id: 'stop_01',
    stageNumber: 1,
    order: 1,
    year: 'Tháng 9/1910 - 02/1911',
    name: 'Trường Dục Thanh (Phan Thiết, Bình Thuận)',
    location: 'Phan Thiết, Tỉnh Bình Thuận, Việt Nam',
    country: 'Việt Nam',
    alias: 'Thầy giáo Nguyễn Tất Thành',
    coords: { x: 73, y: 72 },
    events: 'Dạy chữ Quốc ngữ, chữ Hán và rèn luyện thể dục cho học sinh nghèo; truyền bá lòng yêu nước thương dân trước khi vào Sài Gòn.',
    historicalSignificance: 'Mốc son chuẩn bị tâm thế giáo dục, nâng cao dân trí và rèn luyện thể lực trước chuyến đi vĩ đại.',
    memorialSite: 'Khu Di tích Lịch sử - Văn hóa Trường Dục Thanh, TP. Phan Thiết.',
    quote: 'Muốn cứu nước phải mở mang dân trí, bồi dưỡng nhân tài.',
    audioNarrative: 'Tại trường Dục Thanh bên dòng sông Cà Ty hiền hòa, thầy giáo Thành đã đem nhiệt huyết tuổi trẻ gieo những hạt mầm yêu nước đầu tiên.',
  },
  {
    id: 'stop_02',
    stageNumber: 1,
    order: 2,
    year: 'Tháng 2/1911 - 04/6/1911',
    name: 'Căn nhà số 5 Châu Văn Liêm (Quận 5, Sài Gòn)',
    location: 'Quận 5, TP. Hồ Chí Minh, Việt Nam',
    country: 'Việt Nam',
    alias: 'Nguyễn Tất Thành',
    coords: { x: 71, y: 75 },
    events: 'Nơi Người tạm trú tại phân hiệu Liên Thành Thương Quán trước khi xuống tàu ra nước ngoài.',
    historicalSignificance: 'Di tích quốc gia đặc biệt ghi dấu những ngày chuẩn bị cuối cùng trên đất mẹ Sài Gòn.',
    memorialSite: 'Di tích lịch sử Nhà số 5 đường Châu Văn Liêm, Phường 14, Quận 5.',
    quote: 'Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác họ làm như thế nào, rồi trở về giúp đồng bào ta.',
  },
  {
    id: 'stop_03',
    stageNumber: 1,
    order: 3,
    year: '05/6/1911',
    name: 'Bến Cảng Nhà Rồng (Sài Gòn)',
    location: 'Cảng Sài Gòn, TP. Hồ Chí Minh',
    country: 'Việt Nam',
    alias: 'Anh Văn Ba (phụ bếp)',
    coords: { x: 72, y: 76 },
    events: 'Người bước lên con tàu buôn Đô đốc Latouche-Tréville nhận công việc phụ bếp, chính thức mở đầu hành trình 30 năm tìm đường cứu nước.',
    historicalSignificance: 'Khởi điểm thiêng liêng của con đường giải phóng dân tộc Việt Nam trong thế kỷ 20.',
    memorialSite: 'Bảo tàng Hồ Chí Minh - Chi nhánh TP. Hồ Chí Minh (Bến Nhà Rồng).',
    quote: 'Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn, đấy là tất cả những điều tôi hiểu.',
  },
  {
    id: 'stop_04',
    stageNumber: 1,
    order: 4,
    year: '08/6/1911',
    name: 'Cảng Singapore',
    location: 'Singapore, Eo biển Malacca',
    country: 'Singapore',
    alias: 'Văn Ba',
    coords: { x: 68, y: 80 },
    events: 'Điểm dừng chân hải ngoại đầu tiên của tàu Latouche-Tréville, tiếp xúc thực tế thuộc địa của đế quốc Anh.',
    historicalSignificance: 'Bắt đầu khảo sát trực tiếp hệ thống thương mại và cai trị thuộc địa của phương Tây.',
    memorialSite: 'Bia tưởng niệm Chủ tịch Hồ Chí Minh tại Công viên Bảo tàng Văn minh Châu Á Singapore (khánh thành 2008).',
  },

  // Chặng 2: Châu Phi & Đại Tây Dương (1911 - 1912)
  {
    id: 'stop_05',
    stageNumber: 2,
    order: 5,
    year: '14/6/1911',
    name: 'Cảng Colombo (Sri Lanka)',
    location: 'Colombo, Sri Lanka, Ấn Độ Dương',
    country: 'Sri Lanka',
    alias: 'Văn Ba',
    coords: { x: 58, y: 70 },
    events: 'Tàu tiếp than và lương thực, Người quan sát đời sống người lao động bản xứ tại Nam Á.',
    historicalSignificance: 'Ghi nhận sự khốn cùng của những người phu bến cảng dưới ách cai trị thuộc địa Anh.',
    memorialSite: 'Tượng đài Chủ tịch Hồ Chí Minh tại Thư viện Công cộng Colombo (Sri Lanka).',
  },
  {
    id: 'stop_06',
    stageNumber: 2,
    order: 6,
    year: 'Tháng 7/1911',
    name: 'Cảng Port Said & Kênh đào Suez (Ai Cập)',
    location: 'Port Said, Ai Cập',
    country: 'Ai Cập',
    alias: 'Văn Ba',
    coords: { x: 48, y: 48 },
    events: 'Tàu qua kênh đào Suez, Người chứng kiến hàng vạn phu người Ả Rập bị bóc lột đến kiệt sức để đào kênh.',
    historicalSignificance: 'Nhận thức sâu sắc rằng nhân dân lao động các nước Ả Rập và Phi Châu cũng chịu chung số phận bị bóc lột tàn bạo.',
    memorialSite: 'Khu lưu niệm và tư liệu tại Ai Cập.',
  },
  {
    id: 'stop_07',
    stageNumber: 2,
    order: 7,
    year: '06/7/1911',
    name: 'Cảng Marseille (Pháp)',
    location: 'Marseille, Miền Nam nước Pháp',
    country: 'Pháp',
    alias: 'Văn Ba',
    coords: { x: 43, y: 35 },
    events: 'Lần đầu tiên đặt chân lên đất Pháp. Người quan sát người Pháp ở chính quốc và thấy có cả những người nghèo khổ, tốt bụng.',
    historicalSignificance: 'Bước đầu phân biệt rõ giữa nhân dân lao động Pháp tiến bộ với bè lũ thực dân xâm lược.',
    memorialSite: 'Bia tưởng niệm tại Bến cảng Marseille, Pháp.',
  },
  {
    id: 'stop_08',
    stageNumber: 2,
    order: 8,
    year: 'Tháng 10/1911 - 1912',
    name: 'Cảng Dakar (Senegal) & Bờ biển Tây Phi',
    location: 'Dakar, Senegal, Tây Phi',
    country: 'Senegal',
    alias: 'Văn Ba',
    coords: { x: 30, y: 55 },
    events: 'Theo các chuyến tàu buôn đi vòng quanh bờ biển Tây Phi, chứng kiến cảnh thực dân ném người lao động da đen xuống biển trong bão.',
    historicalSignificance: 'Hình thành luận điểm: Chủ nghĩa thực dân là kẻ thù chung của toàn thể các dân tộc bị áp bức trên thế giới.',
    memorialSite: 'Tư liệu lưu trữ tại Dakar, Senegal.',
  },

  // Chặng 3: Hoa Kỳ (1912 - 1913)
  {
    id: 'stop_09',
    stageNumber: 3,
    order: 9,
    year: 'Tháng 12/1912',
    name: 'Boston (Massachusetts, Hoa Kỳ)',
    location: 'Boston, Hoa Kỳ',
    country: 'Hoa Kỳ',
    alias: 'Nguyễn Tất Thành',
    coords: { x: 18, y: 34 },
    events: 'Làm thợ làm bánh tại khách sạn nổi tiếng Parker House, tìm hiểu Tuyên ngôn Độc lập Mỹ năm 1776.',
    historicalSignificance: 'Hấp thu những giá trị nhân quyền và tự do trong Tuyên ngôn Độc lập Mỹ, sau này đưa vào mở đầu Tuyên ngôn Độc lập 1945.',
    memorialSite: 'Khách sạn Omni Parker House, TP. Boston (bàn làm việc và hình ảnh Bác Hồ được trân trọng lưu giữ).',
    quote: 'Tất cả mọi người sinh ra đều có quyền bình đẳng. Tạo hóa ban cho họ những quyền không ai có thể xâm phạm được...',
  },
  {
    id: 'stop_10',
    stageNumber: 3,
    order: 10,
    year: 'Đầu năm 1913',
    name: 'New York (Khu Harlem & Đảo Ellis)',
    location: 'New York, Hoa Kỳ',
    country: 'Hoa Kỳ',
    alias: 'Nguyễn Tất Thành',
    coords: { x: 20, y: 36 },
    events: 'Đến khu người da đen Harlem, tìm hiểu phong trào đấu tranh bình đẳng chủng tộc, thăm Tượng Nữ thần Tự do.',
    historicalSignificance: 'Người nhận định: Tượng Nữ thần Tự do tỏa sáng trên biển cả, nhưng ngay dưới chân tượng, người da màu vẫn chưa có quyền bình đẳng thực sự.',
    memorialSite: 'Địa chỉ lưu niệm tại thành phố New York.',
  },

  // Chặng 4: Vương quốc Anh (1913 - 1917)
  {
    id: 'stop_11',
    stageNumber: 4,
    order: 11,
    year: '1913 - 1914',
    name: 'Khách sạn Drayton Court (Ealing, London)',
    location: 'Ealing, London, Vương quốc Anh',
    country: 'Vương quốc Anh',
    alias: 'Nguyễn Tất Thành',
    coords: { x: 40, y: 28 },
    events: 'Làm thợ quét tuyết, đốt lò, phục vụ bàn; kiên trì tự học tiếng Anh mỗi ngày sau giờ làm việc vất vả.',
    historicalSignificance: 'Rèn luyện ý chí phi thường và năng lực ngoại ngữ trong môi trường công nghiệp phát triển nhất thời bấy giờ.',
    memorialSite: 'Khách sạn Drayton Court Hotel, London.',
  },
  {
    id: 'stop_12',
    stageNumber: 4,
    order: 12,
    year: '1914 - 1917',
    name: 'Khách sạn Carlton (Haymarket, London)',
    location: 'Haymarket, London, Vương quốc Anh',
    country: 'Vương quốc Anh',
    alias: 'Nguyễn Tất Thành',
    coords: { x: 41, y: 29 },
    events: 'Làm việc cùng vua đầu bếp Auguste Escoffier; gia nhập Hội Lao động Hải ngoại (Overseas Workers Association).',
    historicalSignificance: 'Hòa mình vào phong trào công nhân tiến bộ tại Luân Đôn, theo dõi sát sao Chiến tranh thế giới thứ nhất.',
    memorialSite: 'Biển đồng lưu niệm màu xanh (Blue Plaque) trên tòa nhà New Zealand House (nguyên là khách sạn Carlton).',
  },

  // Chặng 5: Nước Pháp & Đón nhận Luận cương Lênin (1917 - 1923)
  {
    id: 'stop_13',
    stageNumber: 5,
    order: 13,
    year: '18/6/1919',
    name: 'Hội nghị Hòa bình Versailles (Paris, Pháp)',
    location: 'Versailles / Paris, Pháp',
    country: 'Pháp',
    alias: 'Nguyễn Ái Quốc',
    coords: { x: 42, y: 31 },
    events: 'Thay mặt Hội những người An Nam yêu nước, gửi bản Yêu sách của nhân dân An Nam gồm 8 điểm đòi các quyền tự do tối thiểu.',
    historicalSignificance: 'Lần đầu tiên danh xưng Nguyễn Ái Quốc xuất hiện công khai trên trường quốc tế, gây tiếng vang lớn trong dư luận Pháp và các thuộc địa.',
    memorialSite: 'Tư liệu lưu trữ ngoại giao Pháp tại Paris.',
  },
  {
    id: 'stop_14',
    stageNumber: 5,
    order: 14,
    year: 'Tháng 7/1920',
    name: 'Số 9 ngõ Compoint (Quận 17, Paris)',
    location: 'Paris, Pháp',
    country: 'Pháp',
    alias: 'Nguyễn Ái Quốc',
    coords: { x: 43, y: 32 },
    events: 'Căn phòng nhỏ nơi Người đọc "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của Lênin trên báo L\'Humanité.',
    historicalSignificance: 'Mốc chuyển biến quyết định: Tìm thấy con đường giải phóng cho dân tộc - con đường cách mạng vô sản.',
    memorialSite: 'Cánh cửa và hiện vật phòng trọ số 9 ngõ Compoint được lưu giữ nguyên trạng tại Bảo tàng Lịch sử Sống ở Montreuil, Pháp.',
    quote: 'Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi vui mừng đến phát khóc lên...',
  },
  {
    id: 'stop_15',
    stageNumber: 5,
    order: 15,
    year: '25 - 30/12/1920',
    name: 'Đại hội XVIII Đảng Xã hội Pháp (TP. Tours)',
    location: 'Tours, Thung lũng sông Loire, Pháp',
    country: 'Pháp',
    alias: 'Nguyễn Ái Quốc',
    coords: { x: 41, y: 33 },
    events: 'Bỏ phiếu tán thành gia nhập Quốc tế thứ Ba (Quốc tế Cộng sản) và tham gia sáng lập Đảng Cộng sản Pháp.',
    historicalSignificance: 'Người trở thành người cộng sản Việt Nam đầu tiên, gắn phong trào giải phóng dân tộc với cách mạng vô sản thế giới.',
    memorialSite: 'Trung tâm Hội nghị TP. Tours, Pháp.',
  },
  {
    id: 'stop_16',
    stageNumber: 5,
    order: 16,
    year: '1921 - 1923',
    name: 'Hội Liên hiệp Thuộc địa & Báo Người Cùng Khổ (Le Paria)',
    location: 'Paris, Pháp',
    country: 'Pháp',
    alias: 'Nguyễn Ái Quốc',
    coords: { x: 42, y: 32 },
    events: 'Sáng lập Hội Liên hiệp Thuộc địa, chủ nhiệm kiêm chủ bút báo Le Paria, viết tác phẩm "Bản án chế độ thực dân Pháp".',
    historicalSignificance: 'Đòn tấn công trực diện vào chủ nghĩa thực dân Pháp trên mặt trận báo chí và lý luận chính trị.',
    memorialSite: 'Tượng bán thân Chủ tịch Hồ Chí Minh tại Công viên Montreau, TP. Montreuil (ngoại ô Paris).',
  },

  // Chặng 6: Liên Xô (1923 - 1924)
  {
    id: 'stop_17',
    stageNumber: 6,
    order: 17,
    year: '30/6/1923',
    name: 'Thủ đô Moskva (Liên Xô)',
    location: 'Moskva, Liên Xô (nay là CHLB Nga)',
    country: 'Nga',
    alias: 'Chen Vang (Trần Vương)',
    coords: { x: 55, y: 24 },
    events: 'Đến thủ đô Liên Xô, học tập tại Trường Đại học Phương Đông (KUTV), tiếp cận trực tiếp trung tâm cách mạng thế giới.',
    historicalSignificance: 'Nghiên cứu sâu sắc chủ nghĩa Mác - Lênin và kinh nghiệm Cách mạng Tháng Mười Nga.',
    memorialSite: 'Quảng trường Hồ Chí Minh và Tượng đài Bác Hồ trang nghiêm tại thủ đô Moskva.',
  },
  {
    id: 'stop_18',
    stageNumber: 6,
    order: 18,
    year: '17/6 - 08/7/1924',
    name: 'Đại hội V Quốc tế Cộng sản (Moskva)',
    location: 'Điện Kremlin, Moskva, Liên Xô',
    country: 'Nga',
    alias: 'Nguyễn Ái Quốc',
    coords: { x: 56, y: 25 },
    events: 'Đọc tham luận quan trọng, thẳng thắn phê bình các đảng cộng sản Tây Âu chưa quan tâm đúng mức đến vấn đề thuộc địa.',
    historicalSignificance: 'Khẳng định vai trò độc lập, chủ động và tiềm năng cách mạng to lớn của các dân tộc thuộc địa.',
    memorialSite: 'Viện Phương Đông học Moskva.',
  },

  // Chặng 7: Quảng Châu (1924 - 1927)
  {
    id: 'stop_19',
    stageNumber: 7,
    order: 19,
    year: '11/11/1924',
    name: 'Quảng Châu (Quảng Đông, Trung Quốc)',
    location: 'Quảng Châu, Trung Quốc',
    country: 'Trung Quốc',
    alias: 'Lý Thụy / Vương',
    coords: { x: 74, y: 52 },
    events: 'Đến Quảng Châu trong phái bộ Borodin, lựa chọn thanh niên yêu nước trong tổ chức Tâm Tâm Xã để thành lập Cộng sản đoàn.',
    historicalSignificance: 'Bắt đầu quá trình chuẩn bị trực tiếp về tổ chức, cán bộ và tư tưởng cho sự ra đời của Đảng.',
    memorialSite: 'Khu Di tích Trụ sở Hội Việt Nam Cách mạng Thanh niên tại số 13 - 13/1 đường Văn Minh, Quảng Châu.',
  },
  {
    id: 'stop_20',
    stageNumber: 7,
    order: 20,
    year: '21/6/1925',
    name: 'Báo Thanh Niên (Quảng Châu)',
    location: 'Số 13 đường Văn Minh, Quảng Châu',
    country: 'Trung Quốc',
    alias: 'Nguyễn Ái Quốc',
    coords: { x: 75, y: 53 },
    events: 'Sáng lập Hội Việt Nam Cách mạng Thanh niên và xuất bản số báo Thanh Niên đầu tiên, đặt nền móng cho Báo chí Cách mạng Việt Nam.',
    historicalSignificance: 'Cơ quan ngôn luận cách mạng đầu tiên truyền bá chủ nghĩa Mác - Lênin về nước.',
    memorialSite: 'Nhà lưu niệm Báo Thanh Niên tại Quảng Châu.',
  },

  // Chặng 8: Xiêm / Thái Lan (1928 - 1929)
  {
    id: 'stop_21',
    stageNumber: 8,
    order: 21,
    year: 'Tháng 7/1928 - 11/1929',
    name: 'Bản Đông (Phichit) & Udon Thani (Thái Lan)',
    location: 'Bản Đông, Tỉnh Phichit & Nakhon Phanom, Thái Lan',
    country: 'Thái Lan',
    alias: 'Thầu Chín',
    coords: { x: 67, y: 64 },
    events: 'Xây dựng cơ sở cách mạng trong cộng đồng Việt kiều, cùng dân vỡ đất, làm ruộng, mở trường học, dịch sách cách mạng.',
    historicalSignificance: 'Xây dựng khối đại đoàn kết kiều bào hướng về Tổ quốc, biến vùng Đông Bắc Xiêm thành bàn đạp cách mạng.',
    memorialSite: 'Khu Tưởng niệm Chủ tịch Hồ Chí Minh tại Bản Đông (tỉnh Phichit) và Nakhon Phanom (Thái Lan).',
  },

  // Chặng 9: Hương Cảng - Thành lập Đảng (1930 - 1938)
  {
    id: 'stop_22',
    stageNumber: 9,
    order: 22,
    year: '06/01 - 07/02/1930',
    name: 'Bán đảo Cửu Long (Hương Cảng / Hồng Kông)',
    location: 'Cửu Long (Kowloon), Hồng Kông',
    country: 'Trung Quốc (Hồng Kông)',
    alias: 'Tống Văn Sơ / Vương',
    coords: { x: 76, y: 54 },
    events: 'Chủ trì Hội nghị hợp nhất các tổ chức cộng sản, sáng lập Đảng Cộng sản Việt Nam; soạn thảo Chính cương, Sách lược vắn tắt.',
    historicalSignificance: 'Bước ngoặt vĩ đại nhất của lịch sử cách mạng Việt Nam: Chấm dứt thời kỳ khủng hoảng về đường lối cứu nước.',
    memorialSite: 'Di tích Khách sạn Kim Mậu và Công viên Tống Vương Đài tại Cửu Long.',
  },
  {
    id: 'stop_23',
    stageNumber: 9,
    order: 23,
    year: '06/6/1931 - 1933',
    name: 'Nhà ngục Victoria & Vụ án Tống Văn Sơ (Hồng Kông)',
    location: 'Nhà tù Victoria, Trung Hoàn, Hồng Kông',
    country: 'Trung Quốc (Hồng Kông)',
    alias: 'Tống Văn Sơ',
    coords: { x: 77, y: 55 },
    events: 'Bị cảnh sát Anh bắt giữ vô cớ; nhờ sự bào chữa công tâm của Luật sư Francis Loseby, Người được trả tự do thoát khỏi nanh vuốt thực dân Pháp.',
    historicalSignificance: 'Minh chứng cho bản lĩnh kiên cường, sự mưu trí và tình đoàn kết quốc tế cao đẹp.',
    memorialSite: 'Tổ hợp Di tích Trung tâm Di sản Tai Kwun (nguyên là Nhà tù Victoria), Hồng Kông.',
  },

  // Chặng 10: Trở về Pác Bó - Cách mạng Tháng Tám (1938 - 1945)
  {
    id: 'stop_24',
    stageNumber: 10,
    order: 24,
    year: '28/01/1941',
    name: 'Cột mốc 108 & Hang Cốc Bó (Pác Bó, Cao Bằng)',
    location: 'Trường Hà, Hà Quảng, Cao Bằng, Việt Nam',
    country: 'Việt Nam',
    alias: 'Già Thu / Bác Ké',
    coords: { x: 69, y: 38 },
    events: 'Sau 30 năm bôn ba, Người vượt qua mốc 108 trở về đất mẹ Tổ quốc, cúi mình hôn lên hòn đất quê hương.',
    historicalSignificance: 'Mở ra kỷ nguyên trực tiếp lãnh đạo phong trào giải phóng dân tộc tại quê nhà.',
    memorialSite: 'Khu Di tích Quốc gia Đặc biệt Pác Bó (Hang Cốc Bó, Suối Lênin, Núi Các Mác, Cột mốc 108 nay là mốc 675).',
    quote: 'Bác đã về đây, Tổ quốc ơi! / Nhớ thương hòn đất ấm hơi Người / Ba mươi năm ấy, chân không nghỉ / Mà đến bây giờ mới tới nơi!',
  },
  {
    id: 'stop_25',
    stageNumber: 10,
    order: 25,
    year: 'Tháng 5/1945 - 08/1945',
    name: 'Lán Nà Nưa & Cây đa Tân Trào (Tuyên Quang)',
    location: 'Tân Trào, Sơn Dương, Tuyên Quang',
    country: 'Việt Nam',
    alias: 'Hồ Chí Minh',
    coords: { x: 68, y: 40 },
    events: 'Chủ trì Quốc dân Đại hội Tân Trào, thông qua Lệnh Tổng khởi nghĩa, thành lập Ủy ban Dân tộc Giải phóng Việt Nam.',
    historicalSignificance: 'Thủ đô Khu Giải phóng - Nơi phát lệnh Tổng khởi nghĩa Cách mạng Tháng Tám thành công trên phạm vi cả nước.',
    memorialSite: 'Khu Di tích Quốc gia Đặc biệt Tân Trào.',
    quote: 'Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!',
  },
  {
    id: 'stop_26',
    stageNumber: 10,
    order: 26,
    year: '02/9/1945',
    name: 'Quảng trường Ba Đình (Hà Nội)',
    location: 'Quảng trường Ba Đình, Hà Nội',
    country: 'Việt Nam',
    alias: 'Chủ tịch Hồ Chí Minh',
    coords: { x: 70, y: 42 },
    events: 'Thay mặt Chính phủ Lâm thời đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    historicalSignificance: 'Mốc son chói lọi nhất: Chấm dứt hơn 80 năm đô hộ của thực dân, mở ra kỷ nguyên độc lập tự do cho dân tộc.',
    memorialSite: 'Lăng Chủ tịch Hồ Chí Minh & Khu Di tích Phủ Chủ tịch tại Quảng trường Ba Đình.',
  },
];

// Hệ thống 10 Địa chỉ đỏ & Di tích Hồ Chí Minh tại TP.HCM và vùng lân cận
export const HCM_REGIONAL_HERITAGE_SITES: HcmRegionalHeritageSite[] = [
  {
    id: 'hcm_site_01',
    code: 'BTHCM-SG',
    name: 'Bảo tàng Hồ Chí Minh - Chi nhánh TP.HCM (Bến Nhà Rồng)',
    category: 'DI_TICH_BAC_HO',
    categoryLabel: 'Di tích Lịch sử Đặc biệt',
    address: 'Số 01 Nguyễn Tất Thành, Phường 12, Quận 4',
    district: 'Quận 4',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 54, y: 52 },
    gps: { lat: 10.7681, lng: 106.7067 },
    summary: 'Nơi người thanh niên yêu nước Nguyễn Tất Thành ra đi tìm đường cứu nước ngày 05/6/1911. Hiện lưu giữ hơn 20.000 tư liệu, hiện vật quý về cuộc đời Người.',
    historicalEvent: 'Ngày 05/6/1911, từ bến cảng này, Người bước lên tàu Latouche-Tréville ra đi tìm đường giải phóng dân tộc.',
    visitingInfo: {
      hours: '07:30 - 11:30 & 13:30 - 17:00 (Thứ Ba đến Chủ Nhật)',
      ticket: 'Miễn phí cho người Việt Nam',
      highlights: ['Tượng đài Bác Hồ với thiếu nhi miền Nam', 'Cầu tàu lịch sử Bến Nhà Rồng', 'Phòng trưng bày 9 chuyên đề thời kỳ bôn ba'],
    },
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    audioNarrative: 'Bến Nhà Rồng, nơi dòng sông Sài Gòn chứng kiến bước chân lịch sử của người thanh niên 21 tuổi ôm trọn hoài bão vì nước vì dân.',
  },
  {
    id: 'hcm_site_02',
    code: 'DT-CVL',
    name: 'Di tích Lịch sử Nhà số 5 Châu Văn Liêm',
    category: 'DI_TICH_BAC_HO',
    categoryLabel: 'Di tích Lịch sử Quốc gia',
    address: 'Số 5 đường Châu Văn Liêm, Phường 14, Quận 5',
    district: 'Quận 5',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 42, y: 58 },
    gps: { lat: 10.7534, lng: 106.6575 },
    summary: 'Nguyên là trụ sở phân hiệu của Liên Thành Thương Quán tại Chợ Lớn. Bác Hồ đã ở đây từ tháng 2/1911 đến trước ngày xuống tàu sang Pháp.',
    historicalEvent: 'Tại đây, Nguyễn Tất Thành được các hội viên Liên Thành giúp đỡ nơi ăn chốn ở và phương tiện liên lạc để tìm việc trên tàu buôn.',
    visitingInfo: {
      hours: '08:00 - 11:30 & 13:30 - 16:30 (Thứ Hai đến Thứ Sáu)',
      ticket: 'Miễn phí',
      highlights: ['Không gian kiến trúc phố người Hoa đầu thế kỷ 20', 'Bản đồ hành trình vào Sài Gòn', 'Các hiện vật sinh hoạt đơn sơ của Bác'],
    },
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    audioNarrative: 'Căn nhà số 5 Châu Văn Liêm là chặng dừng chân ấm áp nghĩa tình đồng bào phương Nam chở che cho người thanh niên Nguyễn Tất Thành.',
  },
  {
    id: 'hcm_site_03',
    code: 'TD-NH',
    name: 'Công viên Tượng đài Chủ tịch Hồ Chí Minh (Phố đi bộ Nguyễn Huệ)',
    category: 'DI_TICH_BAC_HO',
    categoryLabel: 'Công trình Văn hóa Tiêu biểu',
    address: 'Trước trụ sở HĐND - UBND TP.HCM, đường Nguyễn Huệ, Phường Bến Nghé, Quận 1',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 52, y: 48 },
    gps: { lat: 10.7769, lng: 106.7009 },
    summary: 'Tượng đài Bác Hồ bằng hợp kim đồng cao 7,2m khánh thành nhân dịp kỷ niệm 125 năm ngày sinh của Bác (19/5/2015), hướng ánh nhìn ấm áp ra sông Sài Gòn.',
    historicalEvent: 'Khẳng định tình cảm thiêng liêng "Miền Nam trong trái tim tôi" và lòng kính yêu vô hạn của Đảng bộ, nhân dân TP.HCM đối với Bác.',
    visitingInfo: {
      hours: 'Mở cửa 24/7 (Không gian công cộng)',
      ticket: 'Tự do',
      highlights: ['Phố đi bộ Nguyễn Huệ', 'Tòa nhà trụ sở HĐND & UBND TP', 'Địa điểm sinh hoạt chính trị, dâng hoa báo công của Đảng bộ thành phố'],
    },
    imageUrl: '/assets/hcm-space/chan-dung-bac.png',
    audioNarrative: 'Tượng đài Bác Hồ đứng uy nghiêm giữa lòng thành phố mang tên Người, giơ tay chào đón đồng bào và bạn bè quốc tế.',
  },
  {
    id: 'hcm_site_04',
    code: 'DT-CUCHI',
    name: 'Đền Tưởng niệm Liệt sĩ Bến Dược & Địa đạo Củ Chi',
    category: 'CAN_CU_LICH_SU',
    categoryLabel: 'Di tích Lịch sử Quốc gia Đặc biệt',
    address: 'Ấp Phú Hiệp, Xã Phú Mỹ Hưng, Huyện Củ Chi',
    district: 'Huyện Củ Chi',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 22, y: 22 },
    gps: { lat: 11.1444, lng: 106.4631 },
    summary: 'Vùng Đất thép thành đồng với hệ thống địa đạo dài hơn 250km trong lòng đất và đền Bến Dược khắc tên 45.639 anh hùng liệt sĩ miền Nam.',
    historicalEvent: 'Biểu tượng sáng ngời cho tinh thần "Không có gì quý hơn độc lập, tự do" của Chủ tịch Hồ Chí Minh trên chiến trường Nam Bộ.',
    visitingInfo: {
      hours: '07:30 - 17:00 hàng ngày',
      ticket: 'Có bán vé theo quy định',
      highlights: ['Hầm chỉ huy ngầm', 'Trải nghiệm chui địa đạo thực tế', 'Đền Bến Dược thắp hương tưởng niệm Bác và các anh hùng liệt sĩ'],
    },
    imageUrl: '/assets/hcm-space/dia-dao-cu-chi.jpg',
    audioNarrative: 'Địa đạo Củ Chi huyền thoại - minh chứng cho ý chí sắt đá và lòng trung kiên của quân dân miền Nam quyết tâm giải phóng quê hương theo lời Bác.',
  },
  {
    id: 'hcm_site_05',
    code: 'DT-RUNGSAC',
    name: 'Khu Di tích Lịch sử Căn cứ Rừng Sác (Cần Giờ)',
    category: 'CAN_CU_LICH_SU',
    categoryLabel: 'Di tích Lịch sử Căn cứ Kháng chiến',
    address: 'Xã Long Hòa, Huyện Cần Giờ, TP. Hồ Chí Minh',
    district: 'Huyện Cần Giờ',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 68, y: 88 },
    gps: { lat: 10.5186, lng: 106.8778 },
    summary: 'Căn cứ thủy quân đặc công Rừng Sác Đoàn 10 anh hùng áp sát đầu não Sài Gòn, kiên cường bám trụ giữa rừng ngập mặn.',
    historicalEvent: 'Nơi ghi dấu những chiến công hiển hách của Bộ đội Đặc công Rừng Sác đánh kho xăng Nhà Bè, cảng sông Lòng Tàu.',
    visitingInfo: {
      hours: '07:30 - 16:30 hàng ngày',
      ticket: 'Vé tham quan KDL Sinh thái Cần Giờ',
      highlights: ['Tái hiện sinh hoạt ngầm trong rừng đước', 'Tượng đài Đặc công Rừng Sác', 'Hệ sinh thái rừng ngập mặn UNESCO'],
    },
    imageUrl: '/assets/hcm-space/rung-sac.jpg',
    audioNarrative: 'Rừng Sác Cần Giờ, bản hùng ca bất tử của các chiến sĩ đặc công kiên cường bám rễ đước, bảo vệ cửa ngõ cách mạng phương Nam.',
  },
  {
    id: 'hcm_site_06',
    code: 'KGVH-USSH',
    name: 'Không gian Văn hóa Hồ Chí Minh - Trường ĐH KHXH&NV (ĐHQG-HCM)',
    category: 'KHONG_GIAN_SO',
    categoryLabel: 'Không gian Số & Đại học Tiêu biểu',
    address: 'Số 10 - 12 Đinh Tiên Hoàng, Phường Bến Nghé, Quận 1',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 50, y: 44 },
    gps: { lat: 10.7874, lng: 106.7011 },
    summary: 'Mô hình không gian văn hóa học đường kết hợp giữa phòng trưng bày trực quan, Tủ sách Bác Hồ và chuyên trang số hóa kgvhhcm.hcmussh.edu.vn.',
    historicalEvent: 'Phát huy tư tưởng học tập suốt đời của Bác trong môi trường nghiên cứu khoa học xã hội và sinh viên trí thức.',
    visitingInfo: {
      hours: '08:00 - 17:00 các ngày làm việc',
      ticket: 'Tự do cho giảng viên, sinh viên và khách tham quan',
      highlights: ['Bản đồ 10 chặng bôn ba của Bác', 'Tủ sách hơn 500 tư liệu số', 'Kênh sáng tạo số TikTok Đẹp Nhất Tên Người'],
    },
    imageUrl: '/assets/hcm-space/ussh-kgvh.jpg',
    audioNarrative: 'Không gian văn hóa Hồ Chí Minh tại trường Nhân văn - nơi lan tỏa tư tưởng, phong cách của Người tới các thế hệ sinh viên.',
  },
  {
    id: 'hcm_site_07',
    code: 'KGVH-THUVIEN',
    name: 'Không gian Văn hóa Hồ Chí Minh - Thư viện Khoa học Tổng hợp TP.HCM',
    category: 'KHONG_GIAN_SO',
    categoryLabel: 'Thư viện & Kho Ebook Quốc gia',
    address: 'Số 69 Lý Tự Trọng, Phường Bến Thành, Quận 1',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    coords: { x: 50, y: 50 },
    gps: { lat: 10.7758, lng: 106.6966 },
    summary: 'Kho tài nguyên số hóa khổng lồ với hơn 3.000 đầu sách, tài liệu quý và báo chí cách mạng xuất bản qua các thời kỳ về Chủ tịch Hồ Chí Minh.',
    historicalEvent: 'Trung tâm nghiên cứu học thuật và lưu trữ văn hóa số hàng đầu khu vực phía Nam.',
    visitingInfo: {
      hours: '07:30 - 17:00 (Thứ Hai đến Thứ Bảy)',
      ticket: 'Thẻ bạn đọc thư viện / Tra cứu trực tuyến tự do',
      highlights: ['Khu tra cứu sách điện tử Ebook', 'Tủ sách quý xuất bản trước 1975', 'Triển lãm chuyên đề theo các ngày lễ lớn'],
    },
    imageUrl: '/assets/hcm-space/thu-vien-tphcm.jpg',
    audioNarrative: 'Thư viện Khoa học Tổng hợp TP.HCM lưu giữ kho tàng tri thức về Bác Hồ cho các nhà nghiên cứu và thế hệ trẻ tương lai.',
  },
  {
    id: 'hcm_site_08',
    code: 'KGVH-TDM',
    name: 'Không gian Văn hóa Hồ Chí Minh — Phường Thủ Dầu Một',
    category: 'KHONG_GIAN_SO',
    categoryLabel: 'Không gian Cơ sở Địa bàn Đô thị',
    address: 'Trung tâm Hành chính & Nhà văn hóa 5 Khu phố, Phường Thủ Dầu Một',
    district: 'TP. Thủ Dầu Một',
    city: 'Bình Dương',
    coords: { x: 55, y: 15 },
    gps: { lat: 10.9804, lng: 106.6519 },
    summary: 'Mô hình chuyển đổi số toàn diện theo Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW: Bảo tàng 3D, Bản đồ di sản số, 12 bộ câu hỏi trắc nghiệm và Bản cam kết tu dưỡng Đảng viên.',
    historicalEvent: 'Đưa việc học tập và làm theo Bác gắn chặt với đời sống khu phố, công chức một cửa và thanh niên địa bàn.',
    visitingInfo: {
      hours: 'Phục vụ trực tuyến 24/7 & Nhà văn hóa khu phố mở cửa hàng ngày',
      ticket: 'Miễn phí hoàn toàn',
      highlights: ['Bảo tàng ảo 3D 8 chuyên đề', 'Bản đồ số địa bàn 5 khu phố', 'Trợ lý AI Tuyên giáo TDM'],
    },
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    audioNarrative: 'Không gian Văn hóa Hồ Chí Minh cơ sở phường Thủ Dầu Một - nhịp cầu số kết nối tư tưởng của Bác vào từng nếp sống, con người khu phố.',
  },
];

// =========================================================================
// TÁC PHẨM KINH ĐIỂN & VĂN KIỆN LẬP QUỐC THIÊNG LIÊNG
// =========================================================================
export const CLASSIC_REVOLUTIONARY_WORKS: ClassicRevolutionaryWork[] = [
  {
    id: 'work_1919_versailles',
    title: 'Bản Yêu sách của nhân dân An Nam',
    originalTitle: 'Revendications du peuple annamite',
    year: '18/06/1919',
    location: 'Hội nghị Hòa bình Versailles (Paris, Pháp)',
    stageNumber: 4,
    category: 'YEU_SACH',
    summary:
      'Văn kiện ngoại giao đầu tiên của Nguyễn Ái Quốc gửi tới Hội nghị Versailles đòi các quyền tự do dân chủ cơ bản: tự do báo chí, ngôn luận, lập hội, ân xá tù chính trị và bình đẳng pháp lý.',
    quoteKey: 'Nhân dân An Nam đòi hỏi cho mình những quyền tự do mà mọi dân tộc văn minh đều được hưởng.',
    significance:
      'Lần đầu tiên tiếng nói chính nghĩa của nhân dân Việt Nam vang lên tại diễn đàn quốc tế; đưa tên tuổi Nguyễn Ái Quốc trở thành biểu tượng đấu tranh của dân tộc.',
    readMoreSnippet:
      'Bản Yêu sách gồm 8 điểm: 1. Tổng ân xá cho tất cả những người bản xứ bị tù đày chính trị; 2. Cải cách nền công lý ở Đông Dương; 3. Tự do báo chí và tự do ngôn luận; 4. Tự do lập hội và hội họp; 5. Tự do cư trú và xuất cảnh; 6. Tự do học tập, thành lập các trường kỹ thuật và chuyên nghiệp; 7. Thay thế chế độ ra sắc lệnh bằng chế độ ra các đạo luật; 8. Có đại biểu thường trực của người bản xứ do người bản xứ bầu ra tại Nghị viện Pháp.',
  },
  {
    id: 'work_1920_lenin',
    title: 'Sơ thảo Luận cương về vấn đề Dân tộc và Thuộc địa',
    originalTitle: 'Première ébauche des thèses sur les questions nationale et coloniale',
    year: '07/1920',
    location: 'Số 9 ngõ Compoint, Quận 17, Paris',
    stageNumber: 4,
    category: 'LUAN_THUYET',
    summary:
      'Luận cương của V.I. Lênin đăng trên báo L’Humanité. Đọc bản luận cương, Nguyễn Ái Quốc đã khóc vì xúc động khi tìm thấy ánh sáng soi đường giải phóng cho dân tộc.',
    quoteKey: 'Hỡi đồng bào bị đày đọa đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!',
    significance:
      'Bước ngoặt quyết định chuyển từ chủ nghĩa yêu nước chân chính sang chủ nghĩa cộng sản khoa học; xác lập con đường cách mạng vô sản là con đường duy nhất đúng đắn.',
    readMoreSnippet:
      'Ngồi một mình trong buồng tối, Người nói to lên như đang nói trước quần chúng đông đảo: "Hỡi đồng bào bị đày đọa đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!". Từ đó, Người hoàn toàn tin theo Lênin, tin theo Quốc tế thứ ba.',
  },
  {
    id: 'work_1925_ban_an',
    title: 'Bản án chế độ thực dân Pháp',
    originalTitle: 'Le Procès de la colonisation française',
    year: '1925',
    location: 'Thư quán Lao động, Paris',
    stageNumber: 4,
    category: 'LUAN_THUYET',
    summary:
      'Kiệt tác chính luận vạch trần tội ác dã man, bóc lột của thực dân Pháp đối với nhân dân các thuộc địa Đông Dương, châu Phi, đồng thời chỉ rõ sức mạnh quật khởi của các dân tộc bị áp bức.',
    quoteKey: 'Chủ nghĩa tư bản là một con đỉa có một cái vòi bám vào giai cấp vô sản ở chính quốc và một cái vòi khác bám vào giai cấp vô sản ở thuộc địa.',
    significance:
      'Đặt nền tảng lý luận đanh thép kết hợp phong trào giải phóng dân tộc thuộc địa với phong trào cách mạng vô sản quốc tế.',
    readMoreSnippet:
      'Tác phẩm gồm 12 chương và phụ lục "Gửi thanh niên Việt Nam", phơi bày toàn diện bộ mặt thật của "sứ mạng khai hóa văn minh", từ thuế máu, đầu độc rượu cồn, thuốc phiện đến việc bắt lính làm bia đỡ đạn.',
  },
  {
    id: 'work_1927_duong_kach_menh',
    title: 'Đường Kách mệnh',
    originalTitle: 'Đường Kách mệnh (1927)',
    year: '1927',
    location: 'Tổng bộ Hội Việt Nam Cách mạng Thanh niên (Quảng Châu)',
    stageNumber: 5,
    category: 'LUAN_THUYET',
    summary:
      'Cuốn sách giáo khoa chính trị đầu tiên của cách mạng Việt Nam, tập hợp các bài giảng của Nguyễn Ái Quốc tại các lớp huấn luyện cán bộ ở Quảng Châu.',
    quoteKey: 'Cách mệnh trước hết phải có Đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức và vô sản giai cấp mọi nơi.',
    significance:
      'Chuẩn bị toàn diện về chính trị, tư tưởng và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam vào mùa xuân năm 1930.',
    readMoreSnippet:
      'Mở đầu tác phẩm, Bác nêu 23 tiêu chuẩn tư cách của người cách mệnh: tự mình phải cần kiệm, hòa mà không tư, cả quyết sửa lỗi mình, hy sinh, ít lòng tham muốn về vật chất; đối với người phải khoan thứ, nghiêm khắc với mình; đối với việc phải xem xét hoàn cảnh kỹ càng, có lòng bền gan, không sợ hy sinh.',
  },
  {
    id: 'work_1930_chanh_cuong',
    title: 'Cương lĩnh chính trị đầu tiên của Đảng',
    originalTitle: 'Chánh cương vắn tắt & Sách lược vắn tắt',
    year: '03/02/1930',
    location: 'Bán đảo Cửu Long (Kowloon, Hồng Kông)',
    stageNumber: 7,
    category: 'VAN_KIEN_DANG',
    summary:
      'Cương lĩnh do Nguyễn Ái Quốc soạn thảo và được Hội nghị hợp nhất thông qua, xác định đường lối chiến lược: làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản.',
    quoteKey: 'Đảng là đội tiên phong của vô sản giai cấp, phải thu phục cho được đại bộ phận giai cấp mình, phải làm cho giai cấp mình lãnh đạo được dân chúng.',
    significance:
      'Ngọn cờ tập hợp toàn dân tộc, chấm dứt thời kỳ khủng hoảng sâu sắc về đường lối cứu nước kéo dài hàng thập kỷ.',
    readMoreSnippet:
      'Văn kiện vạch rõ: Đánh đổ đế quốc Pháp và bọn phong kiến; làm cho nước Việt Nam hoàn toàn độc lập; lập chính phủ công nông binh; tổ chức quân đội công nông; tịch thu ruộng đất của đế quốc làm của công chia cho dân cày nghèo.',
  },
  {
    id: 'work_1941_lich_su_nuoc_ta',
    title: 'Lịch sử nước ta (Thơ diễn ca lịch sử)',
    originalTitle: 'Lịch sử nước ta (1942)',
    year: '02/1942',
    location: 'Hang Cốc Bó, Pác Bó, Cao Bằng',
    stageNumber: 10,
    category: 'THO_VAN',
    summary:
      'Tập thơ lục bát 208 câu Bác viết để tuyên truyền lịch sử dựng nước và giữ nước cho đồng bào, bồi dưỡng lòng yêu nước và ý chí quật cường.',
    quoteKey: 'Dân ta phải biết sử ta / Cho tường gốc tích nước nhà Việt Nam / Kể năm hơn bốn ngàn năm / Tổ tiên rực rỡ, anh em thuận hòa...',
    significance:
      'Khơi dậy lòng tự hào dân tộc, dự báo thiên tài: "1945 - Việt Nam độc lập", đưa phong trào Việt Minh phát triển như vũ bão.',
    readMoreSnippet:
      'Bằng thể thơ lục bát bình dị, dễ nhớ, Bác điểm lại toàn bộ dòng chảy hào hùng từ thời Hồng Bàng, Hai Bà Trưng, Lý Thường Kiệt, Trần Hưng Đạo, Lê Lợi, Quang Trung đến phong trào cách mạng hiện đại.',
  },
  {
    id: 'work_1942_nguc_trung_nhat_ky',
    title: 'Nhật ký trong tù (Ngục trung nhật ký)',
    originalTitle: 'Ngục trung nhật ký (獄中日記)',
    year: '1942 - 1943',
    location: 'Các nhà tù tỉnh Quảng Tây, Trung Quốc',
    stageNumber: 10,
    category: 'THO_VAN',
    summary:
      'Tập thơ chữ Hán gồm 133 bài thơ được Bác viết trong chuỗi ngày bị chính quyền Tưởng Giới Thạch bắt giam vô cớ và giải qua 18 nhà lao.',
    quoteKey: 'Thân thể ở trong lao / Tinh thần ở ngoài lao / Muốn nên sự nghiệp lớn / Tinh thần càng phải cao!',
    significance:
      'Bảo vật quốc gia, viên ngọc quý của văn học cách mạng thế giới, thể hiện ý chí thép, nhân cách văn hóa vĩ đại và tinh thần lạc quan cách mạng tuyệt đối.',
    readMoreSnippet:
      'Những bài thơ bất hủ như: "Lai Tân", "Ngắm trăng" (Vọng nguyệt), "Giải đi sớm" (Tảo giải), "Mới ra tù tập leo núi" đã trở thành biểu tượng cho sức mạnh tinh thần bất khuất của người chiến sĩ cách mạng Hồ Chí Minh.',
  },
];

// =========================================================================
// 61 TỌA ĐỘ GPS CHUẨN XÁC TRÍCH XUẤT TỪ CHUYÊN TRANG USSH
// =========================================================================
function parseStageNumber(stageStr: string): number {
  const match = stageStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 1;
}

export const USSH_61_GPS_POINTS: UsshPoint[] = (usshRawPoints as Array<{
  id: number;
  pointId: number;
  stage: string;
  place: string;
  content: string;
  coords: { lng: number; lat: number };
  extraVisits?: Array<{ stage: string; place: string; content: string }>;
}>).map((item) => ({
  ...item,
  stageNumber: parseStageNumber(item.stage),
}));

