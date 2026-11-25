/**
 * Dữ liệu Hệ thống Đa Phương Tiện Không Gian Văn Hóa Hồ Chí Minh
 * 1. Âm vang lời Bác: Bản ghi âm giọng nói lịch sử nguyên bản (VOV & Lưu trữ QG III)
 * 2. Kênh Sáng tạo Trẻ & Video Ngắn: Mô hình truyền thông thanh niên (TikTok / Reels)
 * 3. Tuyển tập Phim tài liệu lịch sử & Điện ảnh Cách mạng
 */

export interface HistoricalSpeechAudio {
  id: string;
  title: string;
  year: string;
  date: string;
  duration: string;
  source: string;
  location: string;
  significance: string;
  youtubeId: string;
  audioUrl?: string; // Nếu có file âm thanh
  transcript: string;
  keyQuotes: string[];
  historicalContext: string;
  tags: string[];
}

export interface YouthShortVideo {
  id: string;
  title: string;
  channel: string;
  platform: 'TIKTOK' | 'YOUTUBE_SHORTS' | 'REELS';
  duration: string;
  viewsCount: string;
  likesCount: string;
  thumbnailUrl: string;
  videoUrl: string;
  youtubeId?: string;
  category: 'KE_CHUYEN' | 'LICH_SU' | 'BAI_HOC_DAO_DUC' | 'GEN_Z_NOI_GUONG' | 'DI_TICH_SO';
  categoryLabel: string;
  summary: string;
  scriptNarration: string;
  hashtags: string[];
  takeaway: string;
}

// 1. Kho Bản Ghi Âm Lịch Sử Nguyên Bản "Âm Vang Lời Bác"
export const HISTORICAL_SPEECHES_AUDIO: HistoricalSpeechAudio[] = [
  {
    id: 'speech_01',
    title: 'Tuyên ngôn Độc lập — Khai sinh nước Việt Nam Dân chủ Cộng hòa',
    year: '1945',
    date: '02/09/1945',
    duration: '04:35',
    source: 'Bản ghi âm gốc: Đài Tiếng nói Việt Nam (VOV) & Trung tâm Lưu trữ Quốc gia III',
    location: 'Quảng trường Ba Đình, Hà Nội',
    significance: 'Văn kiện lập quốc thiêng liêng, chấm dứt chế độ thực dân phong kiến, mở ra kỷ nguyên độc lập tự do cho dân tộc Việt Nam.',
    youtubeId: 'Pjpt7aGiY8E',
    transcript:
      'Hỡi đồng bào cả nước! Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc... Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!',
    keyQuotes: [
      'Tôi nói đồng bào nghe rõ không?',
      'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập.',
      'Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy.',
    ],
    historicalContext:
      'Chiều ngày 02/9/1945, trước hơn 50 vạn đồng bào tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh trang nghiêm đọc bản Tuyên ngôn Độc lập. Giọng nói ấm áp, truyền cảm của Người đã lay động trái tim hàng triệu người dân đất Việt.',
    tags: ['Tuyên ngôn Độc lập', 'Ba Đình', '1945', 'Bảo vật Quốc gia', 'VOV'],
  },
  {
    id: 'speech_02',
    title: 'Lời kêu gọi Toàn quốc kháng chiến — Thà hy sinh tất cả chứ nhất định không chịu mất nước',
    year: '1946',
    date: '19/12/1946',
    duration: '03:12',
    source: 'Bản ghi âm gốc: Đài Tiếng nói Việt Nam (VOV)',
    location: 'Làng Vạn Phúc, Hà Đông',
    significance: 'Lời hịch cứu nước hào hùng của non sông, hiệu triệu toàn thể 20 triệu đồng bào đứng lên quyết tử cho Tổ quốc quyết sinh.',
    youtubeId: 'wzJbUfNfG4E',
    transcript:
      'Hỡi đồng bào toàn quốc! Chúng ta muốn hòa bình, chúng ta phải nhân nhượng. Nhưng chúng ta càng nhân nhượng, thực dân Pháp càng lấn tới, vì chúng quyết tâm cướp nước ta lần nữa! Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ. Hỡi đồng bào! Chúng ta phải đứng lên! Bất kỳ đàn ông, đàn bà, bất kỳ người già, người trẻ, không chia tôn giáo, đảng phái, dân tộc. Hễ là người Việt Nam thì phải đứng lên đánh thực dân Pháp để cứu Tổ quốc!',
    keyQuotes: [
      'Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
      'Ai có súng dùng súng. Ai có gươm dùng gươm, không có gươm thì dùng cuốc, thuổng, gậy gộc.',
      'Giờ cứu nước đã đến. Ta phải hy sinh đến giọt máu cuối cùng để giữ gìn đất nước.',
    ],
    historicalContext:
      'Đêm 19/12/1946, khi thực dân Pháp bội ước gửi tối hậu thư đòi tước vũ khí của ta tại Hà Nội, Chủ tịch Hồ Chí Minh đã viết và đọc Lời kêu gọi Toàn quốc kháng chiến, phát sóng qua Đài TNVN sáng 20/12/1946.',
    tags: ['Toàn quốc kháng chiến', '1946', 'Vạn Phúc', 'Hịch cứu nước'],
  },
  {
    id: 'speech_03',
    title: 'Lời kêu gọi chống Mỹ cứu nước — Không có gì quý hơn độc lập, tự do!',
    year: '1966',
    date: '17/07/1966',
    duration: '05:20',
    source: 'Bản ghi âm gốc: Đài Tiếng nói Việt Nam (VOV)',
    location: 'Thủ đô Hà Nội',
    significance: 'Khẳng định chân lý thời đại, đúc kết ý chí sắt đá của toàn dân tộc Việt Nam quyết tâm đánh thắng giặc Mỹ xâm lược.',
    youtubeId: 'bB532b2gPzs',
    transcript:
      'Chiến tranh có thể kéo dài 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa. Hà Nội, Hải Phòng và một số thành phố, xí nghiệp có thể bị tàn phá, song nhân dân Việt Nam quyết không sợ! Không có gì quý hơn độc lập, tự do! Đến ngày thắng lợi, nhân dân ta sẽ xây dựng lại đất nước ta đàng hoàng hơn, to đẹp hơn!',
    keyQuotes: [
      'Không có gì quý hơn độc lập, tự do!',
      'Hà Nội, Hải Phòng và một số thành phố có thể bị tàn phá, song nhân dân Việt Nam quyết không sợ!',
      'Đến ngày thắng lợi, nhân dân ta sẽ xây dựng lại đất nước ta đàng hoàng hơn, to đẹp hơn!',
    ],
    historicalContext:
      'Năm 1966, đế quốc Mỹ điên cuồng leo thang chiến tranh phá hoại miền Bắc bằng không quân, đe dọa ném bom Hà Nội và Hải Phòng. Giọng nói hào sảng của Bác đã tiếp thêm sức mạnh vô song cho quân dân cả nước.',
    tags: ['Không có gì quý hơn độc lập tự do', '1966', 'Chống Mỹ cứu nước', 'Chân lý bất hủ'],
  },
  {
    id: 'speech_04',
    title: 'Thơ chúc Tết Kỷ Dậu 1969 — Lời căn dặn thiêng liêng cuối cùng',
    year: '1969',
    date: 'Giao thừa Tết Kỷ Dậu (01/01/1969)',
    duration: '01:45',
    source: 'Bản ghi âm gốc: Đài Tiếng nói Việt Nam (VOV)',
    location: 'Nhà sàn Bác Hồ, Phủ Chủ tịch, Hà Nội',
    significance: 'Bản ghi âm bài thơ chúc Tết cuối cùng của Bác Hồ gửi đồng bào và chiến sĩ cả nước trước lúc Người đi xa.',
    youtubeId: 'X6YvN9Y7rW8',
    transcript:
      'Năm qua thắng lợi vẻ vang / Năm nay tiền tuyến chắc càng thắng to / Vì độc lập, vì tự do / Đánh cho Mỹ cút, đánh cho ngụy nhào / Tiến lên! Chiến sĩ, đồng bào / Bắc – Nam sum họp, Xuân nào vui hơn!',
    keyQuotes: [
      'Vì độc lập, vì tự do / Đánh cho Mỹ cút, đánh cho ngụy nhào.',
      'Bắc – Nam sum họp, Xuân nào vui hơn!',
    ],
    historicalContext:
      'Đêm giao thừa Tết Kỷ Dậu 1969, qua làn sóng điện Đài TNVN, toàn thể đồng bào và chiến sĩ cả nước xúc động lắng nghe giọng Bác đọc thơ chúc Tết mang hào khí chiến thắng mùa xuân.',
    tags: ['Thơ chúc Tết 1969', 'Kỷ Dậu', 'Đánh cho Mỹ cút đánh cho ngụy nhào', 'Mùa xuân đại thắng'],
  },
  {
    id: 'speech_05',
    title: 'Bác Hồ nói chuyện với Đại hội Thanh niên — Cần, Kiệm, Liêm, Chính',
    year: '1956',
    date: '15/10/1956',
    duration: '03:40',
    source: 'Tư liệu Âm thanh Trung ương Đoàn & Đài TNVN',
    location: 'Hà Nội',
    significance: 'Lời căn dặn ân cần đối với thanh niên: Rường cột của nước nhà, xung kích trên mọi mặt trận kiến thiết đất nước.',
    youtubeId: 'Pjpt7aGiY8E',
    transcript:
      'Thanh niên là người chủ tương lai của nước nhà. Nước nhà thịnh hay suy, yếu hay mạnh một phần lớn là do các thanh niên. Thanh niên muốn làm người chủ tương lai cho xứng đáng thì ngay hiện tại phải rèn luyện tinh thần và lực lượng của mình, phải ra sức làm việc để chuẩn bị cái tương lai đó. Đâu cần thanh niên có, việc gì khó thanh niên đi đầu!',
    keyQuotes: [
      'Đâu cần thanh niên có, việc gì khó thanh niên đi đầu!',
      'Thanh niên là người chủ tương lai của nước nhà.',
      'Không có việc gì khó / Chỉ sợ lòng không bền / Đào núi và lấp biển / Quyết chí ắt làm nên.',
    ],
    historicalContext:
      'Chủ tịch Hồ Chí Minh luôn dành tình yêu thương đặc biệt cho thế hệ trẻ. Người căn dặn thanh niên không được kiêu ngạo, phải biết khiêm tốn, siêng năng và không ngừng học hỏi.',
    tags: ['Thanh niên', 'Lời dạy của Bác', 'Thế hệ trẻ', 'Đâu cần thanh niên có'],
  },
  {
    id: 'speech_06',
    title: 'Di chúc của Chủ tịch Hồ Chí Minh — Lời dặn muôn vàn tình thương yêu',
    year: '1969',
    date: 'Công bố 09/1969',
    duration: '06:15',
    source: 'Trung tâm Lưu trữ Quốc gia III & Viện Hồ Chí Minh',
    location: 'Nhà sàn Phủ Chủ tịch',
    significance: 'Bảo vật Quốc gia vô giá, kết tinh toàn bộ tư tưởng, đạo đức, tâm hồn và tình yêu bao la của Người đối với Đảng, Tổ quốc và nhân loại.',
    youtubeId: 'bB532b2gPzs',
    transcript:
      'Trước hết nói về Đảng: Nhờ đoàn kết chặt chẽ, một lòng một dạ phục vụ giai cấp, phục vụ nhân dân... Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình... Cuối cùng, tôi để lại muôn vàn tình thân yêu cho toàn dân, toàn Đảng, cho toàn thể bộ đội, cho các cháu thanh niên và nhi đồng.',
    keyQuotes: [
      'Giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.',
      'Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, chí công vô tư.',
      'Tôi để lại muôn vàn tình thân yêu cho toàn dân, toàn Đảng, cho toàn thể bộ đội, cho các cháu thanh niên và nhi đồng.',
    ],
    historicalContext:
      'Từ ngày 10/5/1965 đến tháng 5/1969, đúng vào dịp sinh nhật hàng năm, Bác Hồ đã dành trọn tâm huyết, từng nét bút đắn đo sửa chữa để để lại bản Di chúc thiêng liêng cho toàn dân tộc.',
    tags: ['Di chúc', 'Bảo vật Quốc gia', 'Đoàn kết', 'Đạo đức cách mạng'],
  },
];

// 2. Kênh Sáng Tạo Trẻ & Video Ngắn (Shorts / Reels - Tinh thần "Đẹp Nhất Tên Người")
export const YOUTH_SHORT_VIDEOS: YouthShortVideo[] = [
  {
    id: 'short_01',
    title: '30 năm bôn ba cứu nước của Bác tóm tắt trong 90 giây',
    channel: 'Tuổi Trẻ Tuyên Giáo & USSH Youth',
    platform: 'TIKTOK',
    duration: '01:30',
    viewsCount: '1.2M',
    likesCount: '148.5K',
    thumbnailUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    videoUrl: 'https://www.tiktok.com/@depnhattennguoi_ussh',
    youtubeId: 'Pjpt7aGiY8E',
    category: 'LICH_SU',
    categoryLabel: 'Lịch sử qua góc nhìn trẻ',
    summary: 'Infographic chuyển động tóm lược 10 chặng đường bôn ba qua gần 30 quốc gia trên 4 châu lục của người thanh niên Văn Ba.',
    scriptNarration:
      'Ngày 5/6/1911, từ Bến Nhà Rồng, anh Ba 21 tuổi xuống tàu với hai bàn tay trắng. 30 năm sau, Người trở về Pác Bó với kim chỉ nam độc lập tự do cho Tổ quốc!',
    hashtags: ['#BacHo', '#DepNhatTenNguoi', '#LichSuVietNam', '#GenZYeuNuoc', '#BenNhaRong'],
    takeaway: 'Ý chí dấn thân, không ngại gian khó của tuổi trẻ vì lý tưởng lớn.',
  },
  {
    id: 'short_02',
    title: 'Bí mật căn nhà số 5 Châu Văn Liêm — Nơi Bác ở trước khi xuất dương',
    channel: 'Khám Phá Di Sản Sài Gòn',
    platform: 'TIKTOK',
    duration: '01:15',
    viewsCount: '890K',
    likesCount: '95.2K',
    thumbnailUrl: '/assets/hcm-space/khu-pho.jpg',
    videoUrl: 'https://www.tiktok.com/@depnhattennguoi_ussh',
    youtubeId: 'wzJbUfNfG4E',
    category: 'DI_TICH_SO',
    categoryLabel: 'Check-in Địa chỉ đỏ',
    summary: 'Tour dạo quanh căn nhà phố cổ Quận 5, ngắm nhìn chiếc giường gỗ, bàn trà mộc mạc lưu dấu bước chân thầy giáo Thành năm 1911.',
    scriptNarration:
      'Giữa lòng Chợ Lớn sầm uất có một căn nhà hai tầng cổ kính ít người để ý. Đó chính là phân hiệu Liên Thành Thương Quán, nơi Bác Hồ đã lưu lại những tháng ngày cuối cùng trước khi ra đi.',
    hashtags: ['#DiaChiDo', '#SaiGonXua', '#ChauVanLiem', '#KhongGianVanHoaHCM'],
    takeaway: 'Trân trọng các giá trị lịch sử ngay giữa lòng phố thị hiện đại.',
  },
  {
    id: 'short_03',
    title: 'Đôi dép cao su của Bác Hồ và bài học "Sống xanh - Tiết kiệm" cho Gen Z',
    channel: 'Góc Nhìn Sinh Viên',
    platform: 'REELS',
    duration: '01:05',
    viewsCount: '675K',
    likesCount: '82.4K',
    thumbnailUrl: '/assets/hcm-space/tieusu3-1920.png',
    videoUrl: 'https://www.tiktok.com/@depnhattennguoi_ussh',
    youtubeId: 'bB532b2gPzs',
    category: 'BAI_HOC_DAO_DUC',
    categoryLabel: 'Lối sống văn minh',
    summary: 'Câu chuyện đôi dép lốp ra đời từ năm 1947 gắn bó suốt 20 năm cùng Bác, liên hệ với lối sống tối giản và bảo vệ môi trường của giới trẻ hôm nay.',
    scriptNarration:
      'Đôi dép lốp giản dị của Bác không chỉ là biểu tượng tiết kiệm, mà còn là bài học về sự tự tin, liêm khiết và hòa mình với nhân dân.',
    hashtags: ['#HocTapBacHo', '#LoiSongToiGia', '#GenZSongXanh', '#QuyDinh144'],
    takeaway: 'Thực hành tiết kiệm, giản dị và không lãng phí theo Quy định 144-QĐ/TW.',
  },
  {
    id: 'short_04',
    title: 'Bản Yêu sách 8 điểm 1919 — Khi chàng trai 29 tuổi làm rung chuyển Versailles',
    channel: 'Sử Ca Việt Nam',
    platform: 'YOUTUBE_SHORTS',
    duration: '01:28',
    viewsCount: '1.5M',
    likesCount: '162K',
    thumbnailUrl: '/assets/hcm-space/tieusu2-1919.png',
    videoUrl: 'https://www.tiktok.com/@depnhattennguoi_ussh',
    youtubeId: 'gJd-I-vg2aA',
    category: 'KE_CHUYEN',
    categoryLabel: 'Kể chuyện vĩ nhân',
    summary: 'Câu chuyện Người thanh niên Nguyễn Ái Quốc mặc bộ âu phục thuê đàng hoàng bước vào sào huyệt các cường quốc đế quốc đòi tự do cho dân tộc.',
    scriptNarration:
      'Không súng đạn, chỉ với bản Yêu sách 8 điểm và lòng tự tôn dân tộc, Nguyễn Ái Quốc đã khiến toàn nước Pháp và giới cầm quyền quốc tế phải nhắc tên Việt Nam!',
    hashtags: ['#NguyenAiQuoc', '#Versailles1919', '#NgoaiGiaoVietNam', '#TuHaoDanToc'],
    takeaway: 'Bản lĩnh ngoại giao, sự kiên định bảo vệ quyền lợi quốc gia dân tộc.',
  },
  {
    id: 'short_05',
    title: 'Thử thách 21 ngày nói lời đẹp, làm việc tử tế theo gương Bác',
    channel: 'Đoàn Thanh Niên & Tuyên Giáo Số',
    platform: 'TIKTOK',
    duration: '01:10',
    viewsCount: '520K',
    likesCount: '64.8K',
    thumbnailUrl: '/assets/hcm-space/chan-dung-bac.png',
    videoUrl: 'https://www.tiktok.com/@depnhattennguoi_ussh',
    youtubeId: 'kiV65do4zD4',
    category: 'GEN_Z_NOI_GUONG',
    categoryLabel: 'Hành động đẹp mỗi ngày',
    summary: 'Chiến dịch lan tỏa văn hóa ứng xử chuẩn mực trong học đường và công sở: Đúng giờ, lắng nghe, giúp đỡ đồng nghiệp và nói không với tin giả.',
    scriptNarration:
      'Học Bác không ở đâu xa: Đó là 5 phút đúng giờ mỗi sáng, nụ cười niềm nở khi tiếp xúc nhân dân, và sự trung thực trong từng công việc nhỏ.',
    hashtags: ['#ThuThach21Ngay', '#TuHaoThanhNienHCM', '#ChiThi07', '#HanhDongDep'],
    takeaway: 'Chuyển hóa nhận thức thành hành động cụ thể, thiết thực hàng ngày.',
  },
  {
    id: 'short_06',
    title: 'Tour thực tế ảo 3D: Khám phá Không gian Văn hóa Hồ Chí Minh trong 60 giây',
    channel: 'Chuyển Đổi Số Tuyên Giáo',
    platform: 'REELS',
    duration: '01:00',
    viewsCount: '430K',
    likesCount: '51.3K',
    thumbnailUrl: '/assets/hcm-space/khu-pho.jpg',
    videoUrl: 'https://www.tiktok.com/@depnhattennguoi_ussh',
    youtubeId: 'Pjpt7aGiY8E',
    category: 'DI_TICH_SO',
    categoryLabel: 'Công nghệ số bảo tàng',
    summary: 'Trải nghiệm bảo tàng ảo 3D 8 chuyên đề, lật mở 15 tập Toàn tập và tra cứu bản đồ cứu nước chỉ với một chạm trên smartphone.',
    scriptNarration:
      'Không cần đi xa, chỉ cần một chiếc điện thoại, bạn có thể bước vào bảo tàng 3D, nghe giọng Bác đọc Tuyên ngôn Độc lập và tra cứu hàng ngàn trang tư liệu quý!',
    hashtags: ['#VirtualTour3D', '#ChuyenDoiSo', '#BaoTangAo', '#KhongGianSoHCM'],
    takeaway: 'Ứng dụng công nghệ số đưa di sản của Bác đến gần hơn với thế hệ trẻ.',
  },
];
