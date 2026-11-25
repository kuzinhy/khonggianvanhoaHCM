// Dữ liệu tóm lược và danh mục Lịch sử Đảng bộ TP Thủ Dầu Một (Bộ 2 tập - 600 trang)
// Ấn bản Quyển 1: Biên soạn lần thứ 2, Nhà xuất bản Tổng hợp Bình Dương (2000)
// Ban Chỉ đạo & Ban Biên tập Thị ủy Thủ Dầu Một

export interface TdmPartyVolume {
  id: string;
  title: string;
  edition?: string;
  period?: string;
  pageCount: number;
  sourceFilename: string;
  summary: string;
  publishYear?: number;
  publisher?: string;
  leadership?: string;
}

export interface TdmPartySectionSummary {
  id: string;
  volumeId: string;
  title: string;
  pageCount: number;
  startPage: number;
  endPage: number;
  firstExcerpt: string;
}

export interface HeroicMotherItem {
  stt: number;
  name: string;
  birth: number;
  ward: string;
  martyrs: string;
}

export interface CommitteeTermItem {
  term: string;
  period: string;
  secretary: string;
  deputySecretary?: string;
  membersCount: number;
  note: string;
}

export interface HeroItem {
  id: string;
  name: string;
  type: 'UNIT' | 'INDIVIDUAL';
  awardDate: string;
  period: string;
  description: string;
}

export interface WarStatistics {
  participants: number;
  martyrs: number;
  wounded: number;
  heroicMothers: number;
  summary: string;
}

export const TDM_PARTY_VOLUMES: TdmPartyVolume[] = [
  {
    id: "volume-1",
    title: "Lịch sử Đảng bộ thị xã Thủ Dầu Một (Biên soạn lần thứ 2)",
    edition: "Nhà xuất bản Tổng hợp Bình Dương (2000)",
    period: "1858 – 1996",
    pageCount: 354,
    publishYear: 2000,
    publisher: "Nhà xuất bản Tổng hợp Bình Dương",
    leadership: "Chịu trách nhiệm xuất bản: Trần Văn Dũng (Bí thư Thị ủy); Biên tập: Ban Thường vụ Thị ủy; Thực hiện: Nguyễn Văn Quới (Trưởng ban Tuyên giáo Thị ủy); Sửa bản in: Lê Thanh Sơn, Nguyễn Ngọc Dũng.",
    sourceFilename: "LICH SU DB TDM - Q1_1.pdf",
    summary: "Công trình lịch sử đồ sộ tái hiện quá trình đấu tranh của nhân dân Thủ Dầu Một trước khi có Đảng, Chi bộ cộng sản đầu tiên ra đời (1930), khởi nghĩa giành chính quyền tháng 8/1945, cuộc kháng chiến chống thực dân Pháp (1945-1954), cuộc kháng chiến chống Mỹ cứu nước (1954-1975) và công cuộc xây dựng chủ nghĩa xã hội, tiến hành công cuộc đổi mới."
  },
  {
    id: "volume-2",
    title: "Lịch sử Đảng bộ thành phố Thủ Dầu Một (1996 – 2020)",
    edition: "Xuất bản năm 2023",
    period: "1996 – 2020",
    pageCount: 246,
    publishYear: 2023,
    publisher: "Ban Thường vụ Thành ủy Thủ Dầu Một",
    leadership: "Chỉ đạo biên soạn: Ban Thường vụ Thành ủy; Ban Biên soạn: Võ Thị Bạch Yến, Nguyễn Thu Cúc, Lê Thanh Long, Võ Châu Thảo, Trần Thị Châu.",
    sourceFilename: "LICH SU DB TPTDM 1996-2020-IN.pdf",
    summary: "Giai đoạn 25 năm phát triển vượt bậc qua 5 nhiệm kỳ Đại hội Đảng bộ (Khóa VII đến Khóa XI): tái lập tỉnh Bình Dương (1997), đẩy mạnh công nghiệp hóa - hiện đại hóa, nâng cấp thị xã lên thành phố trực thuộc tỉnh (2012) và được Thủ tướng Chính phủ công nhận đô thị loại I (2017)."
  }
];

export const TDM_PARTY_SECTIONS: TdmPartySectionSummary[] = [
  {
    id: "v1-front",
    volumeId: "volume-1",
    title: "Bìa và lời nói đầu",
    pageCount: 6,
    startPage: 1,
    endPage: 6,
    firstExcerpt: "BAN CHẤP HÀNH ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT — LỊCH SỬ ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT (Biên soạn lần thứ 2) — NHÀ XUẤT BẢN TỔNG HỢP BÌNH DƯƠNG 2000. Chịu trách nhiệm xuất bản: TRẦN VĂN DŨNG – Bí thư Thị ủy Thủ Dầu Một. Thực hiện: NGUYỄN VĂN QUỚI – Trưởng ban Tuyên Giáo Thị ủy TDM. LỜI NÓI ĐẦU: Thị xã Thủ Dầu Một là trung tâm chính trị, kinh tế, văn hoá, xã hội của tỉnh Sông Bé trước kia và tỉnh Bình Dương ngày nay..."
  },
  {
    id: "v1-part-1",
    volumeId: "volume-1",
    title: "Phần thứ I — Những đặc điểm của thị xã Thủ Dầu Một",
    pageCount: 19,
    startPage: 7,
    endPage: 25,
    firstExcerpt: "PHẦN THỨ I — NHỮNG ĐẶC ĐIỂM CỦA THỊ XÃ THỦ DẦU MỘT: Thủ Dầu Một xưa kia là vùng đất hoang dã có nhiều rừng và đầm lầy chưa được khai phá. Cuối thế kỷ XVII do đời sống khó khăn, một bộ phận người từ miền Bắc và miền Trung di cư vào khai khẩn đất đai sinh sống dọc theo sông Sài Gòn. Ngày 5/11/1876, tên 'Thủ Dầu Một' chính thức ra đời theo Nghị định của Đô đốc Dupré..."
  },
  {
    id: "v1-french-1",
    volumeId: "volume-1",
    title: "Chống Pháp — Chương I — Các phong trào yêu nước trước khi có Đảng lãnh đạo",
    pageCount: 10,
    startPage: 26,
    endPage: 35,
    firstExcerpt: "PHẦN THỨ II — NHÂN DÂN THỦ DẦU MỘT VỚI CUỘC KHÁNG CHIẾN CHỐNG THỰC DÂN PHÁP. Chương I: CÁC PHONG TRẢO YÊU NƯỚC CHỐNG THỰC DÂN PHÁP TRƯỚC KHI CÓ ĐẢNG LÃNH ĐẠO. Từ thế kỷ XVI, chế độ phong kiến ở nước ta bắt đầu khủng hoảng và đến thế kỷ XIX đã ở vào thời kỳ khủng hoảng nghiêm trọng. Ngày 01-9-1858 thực dân Pháp nổ súng tấn công Đà Nẵng, mở đầu cuộc xâm lược..."
  },
  {
    id: "v1-french-2",
    volumeId: "volume-1",
    title: "Chống Pháp — Chương II — Chi bộ cộng sản đầu tiên và cuộc vận động Cách mạng Tháng Tám (1930–1945)",
    pageCount: 26,
    startPage: 36,
    endPage: 61,
    firstExcerpt: "Chương II: CHI BỘ CỘNG SẢN ĐẦU TIÊN RA ĐỜI VÀ CUỘC VẬN ĐỘNG CÁCH MẠNG THÁNG TÁM THÀNH CÔNG (1930 - 1945). Ngày 3 tháng 2 năm 1930, Đảng Cộng sản Việt Nam ra đời, đánh dấu một bước ngoặt vĩ đại của lịch sử Cách mạng Việt Nam. Tháng 2 năm 1930, Chi bộ Bình Nhâm - chi bộ Đảng đầu tiên của tỉnh Thủ Dầu Một được thành lập do đồng chí Nguyễn Văn Tiết phụ trách..."
  },
  {
    id: "v1-french-3",
    volumeId: "volume-1",
    title: "Chống Pháp — Chương III — Xây dựng chính quyền cách mạng, kháng chiến và phát triển đơn vị hành chính (1945–1948)",
    pageCount: 19,
    startPage: 62,
    endPage: 80,
    firstExcerpt: "Chương III: XÂY DỰNG CHÍNH QUYỀN CÁCH MẠNG VÀ CUỘC KHÁNG CHIẾN CHỐNG XÂM LƯỢC PHÁP LẦN THỨ HAI DƯỚI SỰ LÃNH ĐẠO CỦA HUYỆN ỦY CHÂU THÀNH (8/1945 - 8/1948). Ngay sau khi khởi nghĩa giành chính quyền thành công, ngày 26/8/1945, Ủy ban nhân dân Tỉnh được thành lập. Dưới sự lãnh đạo của Huyện ủy Châu Thành, quân dân ta vừa xây dựng chính quyền vừa anh dũng kháng chiến chống thực dân Pháp trở lại xâm lược..."
  },
  {
    id: "v1-french-4",
    volumeId: "volume-1",
    title: "Chống Pháp — Chương IV — Thị xã Thủ Dầu Một thành lập và lãnh đạo kháng chiến (1948–1954)",
    pageCount: 19,
    startPage: 81,
    endPage: 99,
    firstExcerpt: "Chương IV: THỊ XÃ THỦ DẦU MỘT ĐƯỢC THÀNH LẬP VÀ CUỘC KHÁNG CHIẾN CHỐNG THỰC DÂN PHÁP THẮNG LỢI (8/1948 – 7/1954). Tháng 8 năm 1948, căn cứ vào tình hình chính trị - xã hội, địa hình và yêu cầu kháng chiến, Ủy ban kháng chiến hành chánh Nam Bộ quyết định thành lập thị xã Thủ Dầu Một. Ban cán sự Đảng thị xã được chỉ định do đồng chí Lê Sĩ Chuyên làm Bí thư..."
  },
  {
    id: "v1-american-1",
    volumeId: "volume-1",
    title: "Chống Mỹ — Chương I — Đấu tranh bảo tồn lực lượng tiến tới Đồng khởi (1954–1960)",
    pageCount: 39,
    startPage: 100,
    endPage: 138,
    firstExcerpt: "PHẦN THỨ III — NHÂN DÂN HUYỆN CHÂU THÀNH VÀ THỊ XÃ THỦ DẦU MỘT VỚI CUỘC KHÁNG CHIẾN CHỐNG MỸ CỨU NƯỚC (1954 – 1975). Chương I: TỪ ĐẤU TRANH ĐỂ BẢO TỒN LỰC LƯỢNG TIẾN TỚI CAO TRÀO ĐỒNG KHỞI (7/1954 – CUỐI 1960). Sau Hiệp định Giơ-ne-vơ, Mỹ - Diệm thẳng tay đàn áp với Luật 10/59 và vụ đầu độc tù chính trị tại Nhà tù Phú Lợi (1/12/1958). Đảng bộ đã kiên cường bám dân, phát động cao trào Đồng Khởi..."
  },
  {
    id: "v1-american-2",
    volumeId: "volume-1",
    title: "Chống Mỹ — Chương II — Đấu tranh vũ trang kết hợp đấu tranh chính trị (1960–1965)",
    pageCount: 22,
    startPage: 139,
    endPage: 160,
    firstExcerpt: "Chương II: ĐẤU TRANH VŨ TRANG KẾT HỢP ĐẤU TRANH CHÍNH TRỊ GÓP PHẦN ĐÁNH BẠI CHIẾN LƯỢC 'CHIẾN TRANH ĐẶC BIỆT' CỦA MỸ – DIỆM (1960 – 7/1965). Thành lập các đơn vị vũ trang tập trung C62, C65; đẩy mạnh phong trào phá ấp chiến lược, bao vây bốt giặc, tiêu biểu là các trận phục kích Bưng Cầu, Cầu Định, hỗ trợ nhân dân bung về đất cũ làm ăn..."
  },
  {
    id: "v1-american-3",
    volumeId: "volume-1",
    title: "Chống Mỹ — Chương III — Góp phần đánh bại chiến tranh cục bộ (1965–1968)",
    pageCount: 30,
    startPage: 161,
    endPage: 190,
    firstExcerpt: "Chương III: TRỰC TIẾP ĐÁNH MỸ GÓP PHẦN ĐÁNH BẠI CHIẾN LƯỢC 'CHIẾN TRANH CỤC BỘ' (7/1965 – 1968). Mỹ đổ quân viễn chinh vào căn cứ Phú Lợi. Đảng bộ lãnh đạo xây dựng vành đai diệt Mỹ Phú Lợi, lãnh đạo cuộc khởi nghĩa binh biến của Trung đoàn 10 thiết giáp Gò Đậu (23/3/1966) và cuộc tổng tiến công và nổi dậy Tết Mậu Thân 1968..."
  },
  {
    id: "v1-american-4",
    volumeId: "volume-1",
    title: "Chống Mỹ — Chương IV — Tiến công, góp phần đánh cho Mỹ cút, Ngụy nhào (1969–1975)",
    pageCount: 52,
    startPage: 191,
    endPage: 242,
    firstExcerpt: "Chương IV: GIỮ VỮNG THẾ TIẾN CÔNG, GÓP PHẦN 'ĐÁNH CHO MỸ CÚT, ĐÁNH CHO NGỤY NHÀO' (1969 – 4/1975). Vượt qua giai đoạn thử thách ác liệt nhất của chiến lược 'Việt Nam hóa chiến tranh', quân dân Thủ Dầu Một kiên trì bám trụ căn cứ Truông Bồng Bông, phối hợp tiến công trong Chiến dịch Nguyễn Huệ 1972 và đỉnh cao là Chiến dịch Hồ Chí Minh, giải phóng hoàn toàn thị xã trưa ngày 30/4/1975..."
  },
  {
    id: "v1-building-1",
    volumeId: "volume-1",
    title: "Xây dựng chủ nghĩa xã hội — Chương I — Từ tháng 4/1975 đến tháng 12/1986",
    pageCount: 30,
    startPage: 243,
    endPage: 272,
    firstExcerpt: "PHẦN THỨ IV — NHÂN DÂN THỦ DẦU MỘT VỚI CÔNG CUỘC XÂY DỰNG CHỦ NGHĨA XÃ HỘI (4/1975 ĐẾN NAY). Chương I: ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT LÃNH ĐẠO THỜI KỲ 4/1975 ĐẾN 12/1986. Sau ngày miền Nam giải phóng, Đảng bộ lãnh đạo tiếp quản chính quyền, ổn định trật tự xã hội, khôi phục kinh tế, truy quét tàn quân FULRO, huy động sức người sức của chi viện cho cuộc chiến đấu bảo vệ biên giới Tây Nam..."
  },
  {
    id: "v1-building-2",
    volumeId: "volume-1",
    title: "Xây dựng chủ nghĩa xã hội — Chương II — Lãnh đạo thời kỳ đổi mới từ năm 1986",
    pageCount: 38,
    startPage: 273,
    endPage: 310,
    firstExcerpt: "Chương II: ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT LÃNH ĐẠO THỜI KỲ 1986 ĐẾN NAY. Dưới ánh sáng Nghị quyết Đại hội VI của Đảng, Đảng bộ thị xã qua các kỳ Đại hội IV, V, VI, VII đã dũng cảm nhìn thẳng vào sự thật, đổi mới tư duy kinh tế, phát huy tiềm năng tiểu thủ công nghiệp (gốm sứ, sơn mài, điêu khắc), đẩy mạnh công nghiệp hóa, từng bước đưa đô thị Thủ Dầu Một khởi sắc..."
  },
  {
    id: "v1-summary",
    volumeId: "volume-1",
    title: "Phần thứ V — Tổng kết",
    pageCount: 10,
    startPage: 311,
    endPage: 320,
    firstExcerpt: "PHẦN THỨ V — TỔNG KẾT: Bảy mươi năm đấu tranh oanh liệt dưới ngọn cờ của Đảng Cộng sản Việt Nam, Đảng bộ và nhân dân thị xã Thủ Dầu Một đã rút ra 7 bài học kinh nghiệm quý báu: Lòng trung thành vô hạn với Đảng và lý tưởng cách mạng; Đoàn kết toàn dân lấy liên minh công nông làm nòng cốt; Kết hợp chặt chẽ giữa đấu tranh vũ trang và chính trị; Tự lực cánh sinh..."
  },
  {
    id: "v1-appendix-1",
    volumeId: "volume-1",
    title: "Phụ lục I — Ban Chấp hành Đảng bộ thị xã Thủ Dầu Một (1976–2000)",
    pageCount: 17,
    startPage: 321,
    endPage: 337,
    firstExcerpt: "PHỤ LỤC I: DANH SÁCH BAN CHẤP HÀNH ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT QUA CÁC THỜI KỲ (1976 - 2000). Gồm danh sách đầy đủ các đồng chí trong Ban Thường vụ, Thị ủy viên qua các khóa I (1976), II (1977), III (1979), IV (1983), V (1986), VI (1991), VII (1996)..."
  },
  {
    id: "v1-appendix-2",
    volumeId: "volume-1",
    title: "Phụ lục II — Danh sách 106 Mẹ Việt Nam Anh Hùng",
    pageCount: 8,
    startPage: 338,
    endPage: 345,
    firstExcerpt: "PHỤ LỤC II: DANH SÁCH CÁC BÀ MẸ ĐƯỢC NHÀ NƯỚC PHONG TẶNG VÀ TRUY TẶNG DANH HIỆU CAO QUÝ 'BÀ MẸ VIỆT NAM ANH HÙNG' TẠI THỊ XÃ THỦ DẦU MỘT. Gồm 106 Mẹ tại các phường, xã: Chánh Nghĩa, Hiệp Thành, Định Hòa, Phú Cường, Phú Hòa, Phú Mỹ, Phú Thọ, Tân An, Tương Bình Hiệp, Chánh Mỹ..."
  },
  {
    id: "v1-appendix-3",
    volumeId: "volume-1",
    title: "Phụ lục III — Đơn vị anh hùng và Anh hùng lực lượng vũ trang",
    pageCount: 4,
    startPage: 346,
    endPage: 349,
    firstExcerpt: "PHỤ LỤC III: ĐƠN VỊ ANH HÙNG VÀ ANH HÙNG LỰC LƯỢNG VŨ TRANG NHÂN DÂN THỊ XÃ THỦ DẦU MỘT. Tuyên dương: 1. Lực lượng vũ trang nhân dân thị xã Thủ Dầu Một (Tuyên dương 06/11/1978); 2. Dân quân du kích xã Định Hòa; 3. Anh hùng Nguyễn Văn Bé; 4. Anh hùng Liệt sĩ Tôn Minh Lai; 5. Anh hùng Thượng tá Bác sĩ Lê Kim Hà..."
  },
  {
    id: "v1-appendix-4",
    volumeId: "volume-1",
    title: "Phụ lục IV — Huân chương và huy chương trong các giai đoạn",
    pageCount: 2,
    startPage: 350,
    endPage: 351,
    firstExcerpt: "PHỤ LỤC IV: THỐNG KÊ HUÂN CHƯƠNG VÀ HUY CHƯƠNG KHÁNG CHIẾN QUA CÁC THỜI KỲ CỦA THỊ XÃ THỦ DẦU MỘT. Ghi nhận sự đóng góp to lớn: 5.157 con em tham gia thoát ly, 2.395 liệt sĩ đã anh dũng hy sinh vì độc lập dân tộc, 604 thương binh, 106 Mẹ Việt Nam Anh Hùng..."
  },
  {
    id: "v1-toc",
    volumeId: "volume-1",
    title: "Mục lục gốc của tập 1",
    pageCount: 3,
    startPage: 352,
    endPage: 354,
    firstExcerpt: "MỤC LỤC TẬP I — LỊCH SỬ ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT (Biên soạn lần thứ 2, NXB Tổng hợp Bình Dương 2000). Chi tiết 5 phần, 11 chương, 4 phụ lục lưu trữ toàn văn."
  },
  {
    id: "v2-front",
    volumeId: "volume-2",
    title: "Bìa và lời giới thiệu",
    pageCount: 6,
    startPage: 1,
    endPage: 6,
    firstExcerpt: "LỊCH SỬ ĐẢNG BỘ THÀNH PHỐ THỦ DẦU MỘT (1996 - 2020) — Ban Thường vụ Thành ủy Thủ Dầu Một chỉ đạo biên soạn."
  },
  {
    id: "v2-opening",
    volumeId: "volume-2",
    title: "Phần mở đầu",
    pageCount: 6,
    startPage: 7,
    endPage: 12,
    firstExcerpt: "PHẦN MỞ ĐẦU — Thành phố Thủ Dầu Một là trung tâm chính trị - kinh tế, văn hóa - xã hội của tỉnh Bình Dương. Là vùng đất anh hùng, giàu truyền thống lịch sử cách mạng."
  },
  {
    id: "v2-chapter-1",
    volumeId: "volume-2",
    title: "Chương I — Đẩy mạnh tăng trưởng kinh tế (1996–2000)",
    pageCount: 27,
    startPage: 13,
    endPage: 39,
    firstExcerpt: "CHƯƠNG I: ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT LÃNH ĐẠO ĐẨY MẠNH TĂNG TRƯỞNG KINH TẾ (1996 - 2000). Tái lập tỉnh Bình Dương ngày 01/01/1997, thị xã phát huy vị thế trung tâm tỉnh lỵ..."
  },
  {
    id: "v2-chapter-2",
    volumeId: "volume-2",
    title: "Chương II — Chuyển dịch cơ cấu kinh tế, phát triển thương mại, dịch vụ (2000–2005)",
    pageCount: 24,
    startPage: 40,
    endPage: 63,
    firstExcerpt: "CHƯƠNG II: ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT LÃNH ĐẠO CHUYỂN DỊCH CƠ CẤU KINH TẾ, CHÚ TRỌNG PHÁT TRIỂN THƯƠNG MẠI, DỊCH VỤ (2000 - 2005)..."
  },
  {
    id: "v2-chapter-3",
    volumeId: "volume-2",
    title: "Chương III — Đẩy nhanh tốc độ đô thị hóa (2005–2010)",
    pageCount: 31,
    startPage: 64,
    endPage: 94,
    firstExcerpt: "CHƯƠNG III: ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT LÃNH ĐẠO ĐẨY NHANH TỐC ĐỘ ĐÔ THỊ HÓA (2005 - 2010)..."
  },
  {
    id: "v2-chapter-4",
    volumeId: "volume-2",
    title: "Chương IV — Phát triển đô thị, đưa thị xã trở thành thành phố (2010–2015)",
    pageCount: 32,
    startPage: 95,
    endPage: 126,
    firstExcerpt: "CHƯƠNG IV: ĐẢNG BỘ THỦ DẦU MỘT LÃNH ĐẠO PHÁT TRIỂN ĐÔ THỊ, ĐƯA THỊ XÃ TRỞ THÀNH THÀNH PHỐ TRỰC THUỘC TỈNH (2010 - 2015). Nghị quyết số 11/NQ-CP ngày 02/5/2012 của Chính phủ chính thức thành lập thành phố Thủ Dầu Một..."
  },
  {
    id: "v2-chapter-5",
    volumeId: "volume-2",
    title: "Chương V — Xây dựng và phát triển đô thị loại I (2015–2020)",
    pageCount: 39,
    startPage: 127,
    endPage: 165,
    firstExcerpt: "CHƯƠNG V: ĐẢNG BỘ THÀNH PHỐ THỦ DẦU MỘT LÃNH ĐẠO XÂY DỰNG VÀ PHÁT TRIỂN ĐÔ THỊ LOẠI I THEO HƯỚNG VĂN MINH - GIÀU, ĐẸP - HIỆN ĐẠI (2015-2020). Quyết định 1959/QĐ-TTg ngày 06/12/2017 công nhận Thủ Dầu Một là đô thị loại I..."
  },
  {
    id: "v2-conclusion",
    volumeId: "volume-2",
    title: "Kết luận",
    pageCount: 6,
    startPage: 166,
    endPage: 171,
    firstExcerpt: "KẾT LUẬN — Qua 25 năm (1996 - 2020) xây dựng và phát triển, Đảng bộ thành phố Thủ Dầu Một đã lãnh đạo chính quyền và nhân dân đạt được những thành tựu toàn diện và cơ bản..."
  },
  {
    id: "v2-photos",
    volumeId: "volume-2",
    title: "Hình ảnh Đảng bộ, chính quyền và nhân dân",
    pageCount: 27,
    startPage: 172,
    endPage: 198,
    firstExcerpt: "HÌNH ẢNH HOẠT ĐỘNG CỦA ĐẢNG BỘ, CHÍNH QUYỀN VÀ NHÂN DÂN THÀNH PHỐ THỦ DẦU MỘT..."
  },
  {
    id: "v2-appendix-1",
    volumeId: "volume-2",
    title: "Phụ lục 1 — Danh sách Mẹ Việt Nam Anh hùng",
    pageCount: 20,
    startPage: 199,
    endPage: 218,
    firstExcerpt: "DANH SÁCH MẸ VIỆT NAM ANH HÙNG THÀNH PHỐ THỦ DẦU MỘT (Phụ lục Tập 2)..."
  },
  {
    id: "v2-appendix-2",
    volumeId: "volume-2",
    title: "Phụ lục 2 — BCH, BTV khóa VII (1996–2000)",
    pageCount: 3,
    startPage: 219,
    endPage: 221,
    firstExcerpt: "DANH SÁCH BAN CHẤP HÀNH, BAN THƯỜNG VỤ ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT KHÓA VII (1996 - 2000)..."
  },
  {
    id: "v2-appendix-3",
    volumeId: "volume-2",
    title: "Phụ lục 3 — BCH, BTV khóa VIII (2000–2005)",
    pageCount: 3,
    startPage: 222,
    endPage: 224,
    firstExcerpt: "DANH SÁCH BAN CHẤP HÀNH, BAN THƯỜNG VỤ ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT KHÓA VIII (2000 - 2005)..."
  },
  {
    id: "v2-appendix-4",
    volumeId: "volume-2",
    title: "Phụ lục 4 — BCH, BTV khóa IX (2005–2010)",
    pageCount: 4,
    startPage: 225,
    endPage: 228,
    firstExcerpt: "DANH SÁCH BAN CHẤP HÀNH, BAN THƯỜNG VỤ ĐẢNG BỘ THỊ XÃ THỦ DẦU MỘT KHÓA IX (2005 - 2010)..."
  },
  {
    id: "v2-appendix-5",
    volumeId: "volume-2",
    title: "Phụ lục 5 — BCH, BTV khóa X (2010–2015)",
    pageCount: 6,
    startPage: 229,
    endPage: 234,
    firstExcerpt: "DANH SÁCH BAN CHẤP HÀNH, BAN THƯỜNG VỤ THỊ ỦY / THÀNH ỦY THỦ DẦU MỘT KHÓA X (2010 - 2015)..."
  },
  {
    id: "v2-appendix-6",
    volumeId: "volume-2",
    title: "Phụ lục 6 — BCH, BTV khóa XI (2015–2020)",
    pageCount: 6,
    startPage: 235,
    endPage: 240,
    firstExcerpt: "DANH SÁCH BAN CHẤP HÀNH, BAN THƯỜNG VỤ THÀNH ỦY THỦ DẦU MỘT KHÓA XI (2015 - 2020)..."
  },
  {
    id: "v2-toc",
    volumeId: "volume-2",
    title: "Mục lục gốc",
    pageCount: 4,
    startPage: 241,
    endPage: 244,
    firstExcerpt: "MỤC LỤC TẬP II — LỊCH SỬ ĐẢNG BỘ THÀNH PHỐ THỦ DẦU MỘT (1996 - 2020)..."
  },
  {
    id: "v2-references",
    volumeId: "volume-2",
    title: "Tài liệu tham khảo",
    pageCount: 1,
    startPage: 245,
    endPage: 245,
    firstExcerpt: "TÀI LIỆU THAM KHẢO VÀ NGUỒN VĂN KIỆN..."
  },
  {
    id: "v2-credits",
    volumeId: "volume-2",
    title: "Thông tin biên soạn",
    pageCount: 1,
    startPage: 246,
    endPage: 246,
    firstExcerpt: "THÔNG TIN BAN CHỈ ĐẠO VÀ BAN BIÊN SOẠN TẬP II..."
  }
];

// 106 Bà Mẹ Việt Nam Anh Hùng Thị xã Thủ Dầu Một (Phụ lục II, Sách 2000)
export const TDM_HEROIC_MOTHERS_106: HeroicMotherItem[] = [
  { stt: 1, name: "Lê Thị Hai", birth: 1916, ward: "Chánh Nghĩa", martyrs: "Trần Văn Trai, Trần Văn Nở" },
  { stt: 2, name: "Ngô Thị Lộc", birth: 1902, ward: "Chánh Nghĩa", martyrs: "Nguyễn Văn Đạt, Nguyễn Văn Kề" },
  { stt: 3, name: "Nguyễn Thị Mẹo", birth: 1898, ward: "Chánh Nghĩa", martyrs: "Võ Văn Sang, Võ Văn Lắm" },
  { stt: 4, name: "Nguyễn Thị Nhàn", birth: 1904, ward: "Chánh Nghĩa", martyrs: "Nguyễn Văn Chờ, Nguyễn Văn Đực" },
  { stt: 5, name: "Nguyễn Thị Nuôi", birth: 1910, ward: "Chánh Nghĩa", martyrs: "Võ Văn Thọ, Võ Văn Xuyến" },
  { stt: 6, name: "Nguyễn Thị Phụng", birth: 1912, ward: "Chánh Nghĩa", martyrs: "Phạm Văn Đức, Phạm Văn Đực" },
  { stt: 7, name: "Nguyễn Thị Sỏi", birth: 1908, ward: "Chánh Nghĩa", martyrs: "Phạm Văn Lợi, Phạm Văn Được" },
  { stt: 8, name: "Nguyễn Thị Sợi", birth: 1912, ward: "Chánh Nghĩa", martyrs: "Nguyễn Văn Sang, Nguyễn Văn Tàu" },
  { stt: 9, name: "Nguyễn Thị Sự", birth: 1894, ward: "Chánh Nghĩa", martyrs: "Nguyễn Văn Thường, Nguyễn Văn Lộc" },
  { stt: 10, name: "Nguyễn Thị Thảnh", birth: 1915, ward: "Chánh Nghĩa", martyrs: "Vương Văn Rạng, Vương Văn Sừng" },
  { stt: 11, name: "Nguyễn Thị Tiên", birth: 1901, ward: "Chánh Nghĩa", martyrs: "Phùng Văn Sẻ, Phùng Văn Thình" },
  { stt: 12, name: "Hồ Thị Tấm", birth: 1928, ward: "Chánh Nghĩa", martyrs: "Trần Văn Vinh, Trần Văn Hưởng" },
  { stt: 13, name: "Bồ Thị Là", birth: 1898, ward: "Chánh Nghĩa", martyrs: "Nguyễn Văn Hiểu, Nguyễn Văn Học" },
  { stt: 14, name: "Lê Thị Đây", birth: 1896, ward: "Chánh Nghĩa", martyrs: "Vương Minh Nghĩa, Vương Minh Lễ" },
  { stt: 15, name: "Nguyễn Thị Bạng", birth: 1918, ward: "Hiệp Thành", martyrs: "Phạm Văn Nghĩa, Phạm Văn Thành" },
  { stt: 16, name: "Bùi Thị Sóc", birth: 1915, ward: "Hiệp Thành", martyrs: "Nguyễn Văn Tốt, Nguyễn Văn Hùng" },
  { stt: 17, name: "Đặng Thị Thửa", birth: 1904, ward: "Hiệp Thành", martyrs: "Nguyễn Văn Năm, Nguyễn Văn Sáu" },
  { stt: 18, name: "Đỗ Thị Lương", birth: 1920, ward: "Hiệp Thành", martyrs: "Huỳnh Văn Phổ, Huỳnh Văn Hải" },
  { stt: 19, name: "Dương Thị Tốt", birth: 1908, ward: "Hiệp Thành", martyrs: "Lê Văn Tốt, Lê Văn Ba" },
  { stt: 20, name: "Huỳnh Thị Nhớ", birth: 1915, ward: "Hiệp Thành", martyrs: "Nguyễn Văn Nhỏ, Nguyễn Văn Lớn" },
  { stt: 21, name: "Lê Thị Chánh", birth: 1910, ward: "Hiệp Thành", martyrs: "Trần Văn Đực, Trần Văn Trai" },
  { stt: 22, name: "Nguyễn Thị Bì", birth: 1902, ward: "Hiệp Thành", martyrs: "Nguyễn Văn Tạo, Nguyễn Văn Lập" },
  { stt: 23, name: "Nguyễn Thị Hai", birth: 1914, ward: "Hiệp Thành", martyrs: "Trần Văn Lắm, Trần Văn Đực" },
  { stt: 24, name: "Nguyễn Thị Mến", birth: 1916, ward: "Hiệp Thành", martyrs: "Võ Văn Tỏ, Võ Văn Thắng" },
  { stt: 25, name: "Lê Thị Vui", birth: 1913, ward: "Định Hòa", martyrs: "Huỳnh Văn Bảy, Huỳnh Văn Mạn" },
  { stt: 26, name: "Võ Thị Dậu", birth: 1920, ward: "Định Hòa", martyrs: "Trần Văn Bồi, Trần Văn Thăm, Trần Văn Cư" },
  { stt: 27, name: "Nguyễn Thị Quốc", birth: 1916, ward: "Định Hòa", martyrs: "Huỳnh Văn Mười, Huỳnh Ngọc Ấn" },
  { stt: 28, name: "Nguyễn Thị Gặp", birth: 1923, ward: "Định Hòa", martyrs: "Nguyễn Văn Nhàn, Nguyễn Văn Thơ" },
  { stt: 29, name: "Nguyễn Thị Lẹt", birth: 1918, ward: "Định Hòa", martyrs: "Lê Văn Tùng, Lê Văn Bách" },
  { stt: 30, name: "Nguyễn Thị Tám", birth: 1910, ward: "Định Hòa", martyrs: "Nguyễn Văn Lẹ, Nguyễn Văn Rẻ" },
  { stt: 31, name: "Nguyễn Thị Thơm", birth: 1905, ward: "Định Hòa", martyrs: "Trần Văn Cường, Trần Văn Hùng" },
  { stt: 32, name: "Nguyễn Thị Đầy", birth: 1917, ward: "Định Hòa", martyrs: "Trần Văn Đặng, Trần Văn Sỏi" },
  { stt: 33, name: "Nguyễn Thị Ẩm", birth: 1914, ward: "Định Hòa", martyrs: "Võ Văn Hên, Võ Văn Phước" },
  { stt: 34, name: "Phan Thị Đệ", birth: 1909, ward: "Định Hòa", martyrs: "Nguyễn Văn Đực, Nguyễn Văn Trai" },
  { stt: 35, name: "Phan Thị Đành", birth: 1906, ward: "Định Hòa", martyrs: "Trần Văn Nuôi, Trần Văn Hớn" },
  { stt: 36, name: "Trần Thị Rọt", birth: 1908, ward: "Định Hòa", martyrs: "Lê Văn Lượm, Lê Văn Nhặt" },
  { stt: 37, name: "Trần Thị Bảy", birth: 1915, ward: "Định Hòa", martyrs: "Phạm Văn Sơn, Phạm Văn Thủy" },
  { stt: 38, name: "Võ Thị Hờn", birth: 1912, ward: "Định Hòa", martyrs: "Huỳnh Văn Chín, Huỳnh Văn Mười" },
  { stt: 39, name: "Võ Thị Lài", birth: 1904, ward: "Định Hòa", martyrs: "Nguyễn Văn Tốt, Nguyễn Văn Hùng" },
  { stt: 40, name: "Nguyễn Thị Nam", birth: 1894, ward: "Định Hòa", martyrs: "Phan Văn Hải, Phan Văn Thắng" },
  { stt: 41, name: "Phan Thị Tiện", birth: 1907, ward: "Định Hòa", martyrs: "Huỳnh Văn Giàu, Huỳnh Văn Sang" },
  { stt: 42, name: "Phan Thị Mười", birth: 1923, ward: "Định Hòa", martyrs: "Thái Văn Chánh, Thái Văn Nghĩa" },
  { stt: 43, name: "Đặng Thị Xuân", birth: 1905, ward: "Định Hòa", martyrs: "Đặng Văn Y, Đặng Văn Phép" },
  { stt: 44, name: "Huỳnh Thị Nữa", birth: 1910, ward: "Định Hòa", martyrs: "Võ Văn Chờ, Võ Văn Đợi" },
  { stt: 45, name: "Phạm Thị Lương", birth: 1910, ward: "Định Hòa", martyrs: "Phạm Văn Lực, Phạm Văn Lượng" },
  { stt: 46, name: "Trương Thị Cẩm", birth: 1914, ward: "Định Hòa", martyrs: "Lê Văn Tỏ, Lê Văn Sáng" },
  { stt: 47, name: "Lê Thị Cúc", birth: 1909, ward: "Phú Cường", martyrs: "Nguyễn Văn Đạt, Nguyễn Văn Kế" },
  { stt: 48, name: "Nguyễn Thị Nhỏ", birth: 1912, ward: "Phú Cường", martyrs: "Trần Văn Rạng, Trần Văn Đông, Trần Văn Tây" },
  { stt: 49, name: "Nguyễn Thị Đỗ", birth: 1906, ward: "Phú Cường", martyrs: "Võ Văn Phước, Võ Văn Lộc" },
  { stt: 50, name: "Phạm Thị Bông", birth: 1914, ward: "Phú Cường", martyrs: "Nguyễn Văn Hòa, Nguyễn Văn Bình" },
  { stt: 51, name: "Phạm Thị Kê", birth: 1911, ward: "Phú Cường", martyrs: "Lê Văn Thành, Lê Văn Công" },
  { stt: 52, name: "Trần Thị Ba", birth: 1916, ward: "Phú Cường", martyrs: "Võ Văn Hớn, Võ Văn Hào" },
  { stt: 53, name: "Trần Thị Rạng", birth: 1903, ward: "Phú Cường", martyrs: "Nguyễn Văn Hùng, Nguyễn Văn Dũng" },
  { stt: 54, name: "Võ Thị Tám", birth: 1918, ward: "Phú Cường", martyrs: "Trịnh Văn Lộc, Trịnh Văn Thọ" },
  { stt: 55, name: "Nguyễn Thị Rẻ", birth: 1924, ward: "Phú Hòa", martyrs: "Trần Văn Lợi, Trần Văn Ghà" },
  { stt: 56, name: "Lê Thị Sen", birth: 1914, ward: "Phú Hòa", martyrs: "Đặng Văn Đá, Đặng Văn Cát" },
  { stt: 57, name: "Nguyễn Thị Chí", birth: 1912, ward: "Phú Hòa", martyrs: "Nguyễn Văn Mết, Nguyễn Văn Được" },
  { stt: 58, name: "Nguyễn Thị Ráng", birth: 1902, ward: "Phú Hòa", martyrs: "Nguyễn Văn Quản, Nguyễn Văn Bê" },
  { stt: 59, name: "Nguyễn Thị Cưng", birth: 1907, ward: "Phú Hòa", martyrs: "Trần Văn Thảo, Trần Văn Hiền" },
  { stt: 60, name: "Nguyễn Thị Khen", birth: 1910, ward: "Phú Hòa", martyrs: "Lê Văn Hùng, Lê Văn Dũng" },
  { stt: 61, name: "Nguyễn Thị Năm", birth: 1915, ward: "Phú Hòa", martyrs: "Nguyễn Văn Tròn, Nguyễn Văn Vuông" },
  { stt: 62, name: "Nguyễn Thị Hợi", birth: 1913, ward: "Phú Hòa", martyrs: "Trần Văn Tỏ, Trần Văn Sáng" },
  { stt: 63, name: "Phan Thị Tám", birth: 1908, ward: "Phú Hòa", martyrs: "Võ Văn Tốt, Võ Văn Lành" },
  { stt: 64, name: "Trần Thị Lệ", birth: 1918, ward: "Phú Hòa", martyrs: "Huỳnh Văn Nam, Huỳnh Văn Bắc" },
  { stt: 65, name: "Võ Thị Hường", birth: 1916, ward: "Phú Hòa", martyrs: "Phạm Văn Lạc, Phạm Văn Hồng" },
  { stt: 66, name: "Võ Thị Kế", birth: 1911, ward: "Phú Hòa", martyrs: "Nguyễn Văn Thành, Nguyễn Văn Đạt" },
  { stt: 67, name: "Võ Thị Phẩm", birth: 1909, ward: "Phú Hòa", martyrs: "Trần Văn Dũng, Trần Văn Cường" },
  { stt: 68, name: "Nguyễn Thị Chát", birth: 1923, ward: "Phú Mỹ", martyrs: "Nguyễn Văn Cự, Nguyễn Văn Long" },
  { stt: 69, name: "Võ Thị Rớt", birth: 1901, ward: "Phú Mỹ", martyrs: "Thái Văn Mấy, Thái Văn Diệu, Thái Văn Danh" },
  { stt: 70, name: "Nguyễn Thị Đảo", birth: 1922, ward: "Phú Mỹ", martyrs: "Thái Văn Bùng, Thái Văn Phát" },
  { stt: 71, name: "Phạm Thị Sử", birth: 1914, ward: "Phú Thọ", martyrs: "Nguyễn Văn Cẩu, Nguyễn Văn Hôn, Nguyễn Văn Bổn, Nguyễn Văn Ca" },
  { stt: 72, name: "Nguyễn Thị Rỡ", birth: 1910, ward: "Phú Thọ", martyrs: "Nguyễn Văn Tốt, Nguyễn Văn Đẹp" },
  { stt: 73, name: "Lê Thị Trẹt", birth: 1907, ward: "Phú Thọ", martyrs: "Võ Thị Đặng, Võ Văn Minh" },
  { stt: 74, name: "Nguyễn Thị Năm", birth: 1915, ward: "Phú Thọ", martyrs: "Trần Văn Tươi, Trần Văn Tốt" },
  { stt: 75, name: "Nguyễn Thị Sâm", birth: 1912, ward: "Phú Thọ", martyrs: "Lê Văn Hùng, Lê Văn Dũng" },
  { stt: 76, name: "Phạm Thị Dư", birth: 1909, ward: "Phú Thọ", martyrs: "Trần Văn Phước, Trần Văn Lộc" },
  { stt: 77, name: "Trần Thị Thi", birth: 1918, ward: "Phú Thọ", martyrs: "Võ Văn Hớn, Võ Văn Hào" },
  { stt: 78, name: "Võ Thị Mười", birth: 1913, ward: "Phú Thọ", martyrs: "Nguyễn Văn Tốt, Nguyễn Văn Hiền" },
  { stt: 79, name: "Đặng Thị Lắm", birth: 1920, ward: "Tân An", martyrs: "Nguyễn Văn Trọng, Nguyễn Văn Nghĩa" },
  { stt: 80, name: "Đỗ Thị Lầu", birth: 1911, ward: "Tân An", martyrs: "Phạm Văn Hải, Phạm Văn Quân" },
  { stt: 81, name: "Huỳnh Thị Nụ", birth: 1915, ward: "Tân An", martyrs: "Nguyễn Thành Phố, Nguyễn Thành Đô" },
  { stt: 82, name: "Phạm Thị Chính", birth: 1912, ward: "Tân An", martyrs: "Ngô Văn Phổ, Ngô Văn Hội, Ngô Văn Yên" },
  { stt: 83, name: "Trần Thị Đọt", birth: 1920, ward: "Tân An", martyrs: "Nguyễn Văn Rảnh, Nguyễn Thị Huệ, Nguyễn Văn Đực" },
  { stt: 84, name: "Lê Thị Bảy", birth: 1922, ward: "Tân An", martyrs: "Nguyễn Thị Nguyên, Nguyễn Văn Vẹn" },
  { stt: 85, name: "Lê Thị Lượm", birth: 1914, ward: "Tân An", martyrs: "Trần Văn Thảo, Trần Văn Hiền" },
  { stt: 86, name: "Nguyễn Thị Bì", birth: 1908, ward: "Tân An", martyrs: "Đặng Văn Sang, Đặng Văn Trọng" },
  { stt: 87, name: "Nguyễn Thị Cai", birth: 1916, ward: "Tân An", martyrs: "Ngô Văn Đực, Ngô Văn Trai" },
  { stt: 88, name: "Nguyễn Thị Dẹp", birth: 1910, ward: "Tân An", martyrs: "Lê Văn Tốt, Lê Văn Đẹp" },
  { stt: 89, name: "Nguyễn Thị Được", birth: 1925, ward: "Tân An", martyrs: "Trần Văn Phước, Trần Văn Đức" },
  { stt: 90, name: "Nguyễn Thị Lụa", birth: 1919, ward: "Tân An", martyrs: "Võ Văn Thành, Võ Văn Công" },
  { stt: 91, name: "Nguyễn Thị Mẹo", birth: 1913, ward: "Tân An", martyrs: "Nguyễn Văn Tốt, Nguyễn Văn Lành" },
  { stt: 92, name: "Nguyễn Thị Mến", birth: 1917, ward: "Tân An", martyrs: "Huỳnh Văn Nam, Huỳnh Văn Bắc" },
  { stt: 93, name: "Nguyễn Thị Quản", birth: 1911, ward: "Tân An", martyrs: "Đặng Văn Hùng, Đặng Văn Dũng" },
  { stt: 94, name: "Nguyễn Thị Trọng", birth: 1909, ward: "Tân An", martyrs: "Trần Văn Lắm, Trần Văn Đực" },
  { stt: 95, name: "Phan Thị Nương", birth: 1915, ward: "Tân An", martyrs: "Đặng Thành Lũy, Đặng Thành Công" },
  { stt: 96, name: "Trần Thị Chăn", birth: 1916, ward: "Tân An", martyrs: "Trần Văn Đạt, Trần Văn Ba" },
  { stt: 97, name: "Từ Thị Sữa", birth: 1903, ward: "Tân An", martyrs: "Ngô Văn Diệm, Ngô Văn Bình, Ngô Văn Nhàn" },
  { stt: 98, name: "Huỳnh Thị Rỉ", birth: 1912, ward: "Tương Bình Hiệp", martyrs: "Nguyễn Văn Xiêm, Nguyễn Văn Lâm, Nguyễn Văn Hoa" },
  { stt: 99, name: "Hà Thị Chờ", birth: 1912, ward: "Tương Bình Hiệp", martyrs: "Phan Văn Thành, Phan Văn Công" },
  { stt: 100, name: "Hồ Thị Mai", birth: 1916, ward: "Tương Bình Hiệp", martyrs: "Nguyễn Văn Được, Nguyễn Văn Mết" },
  { stt: 101, name: "Lê Thị Bông", birth: 1914, ward: "Tương Bình Hiệp", martyrs: "Trần Văn Sang, Trần Văn Trọng" },
  { stt: 102, name: "Lê Thị Nguyệt", birth: 1918, ward: "Tương Bình Hiệp", martyrs: "Võ Văn Hùng, Võ Văn Dũng" },
  { stt: 103, name: "Nguyễn Thị Gấm", birth: 1910, ward: "Tương Bình Hiệp", martyrs: "Phạm Văn Lợi, Phạm Văn Được" },
  { stt: 104, name: "Nguyễn Thị Rảnh", birth: 1915, ward: "Chánh Mỹ", martyrs: "Nguyễn Văn Thành, Nguyễn Văn Đạt" },
  { stt: 105, name: "Nguyễn Thị Sang", birth: 1912, ward: "Chánh Mỹ", martyrs: "Lê Văn Tốt, Lê Văn Hùng" },
  { stt: 106, name: "Trần Thị Búp", birth: 1920, ward: "Chánh Mỹ", martyrs: "Huỳnh Văn Nam, Huỳnh Văn Phước" }
];

// Ban Chấp Hành Đảng Bộ Thị Xã / Thành Phố Thủ Dầu Một Qua Các Thời Kỳ (Phụ lục I, Sách 2000 & Tập 2)
export const TDM_PARTY_COMMITTEES: CommitteeTermItem[] = [
  {
    term: "Nhiệm kỳ 1976 – 1977 (Chỉ định)",
    period: "1976 – 1977",
    secretary: "Nguyễn Văn Hữu",
    deputySecretary: "Nguyễn Trung Kiên (Phó Bí thư Thường trực), Nguyễn Văn Thọ (Phó Bí thư, Chủ tịch UBND)",
    membersCount: 21,
    note: "Do Ban Thường vụ Tỉnh ủy Sông Bé chỉ định sau ngày thống nhất đất nước để lãnh đạo ổn định trật tự và tái thiết kinh tế."
  },
  {
    term: "Đại hội Đại biểu lần thứ I (Khóa I)",
    period: "1977 – 1979",
    secretary: "Nguyễn Trung Kiên",
    deputySecretary: "Nguyễn Văn Thọ (Phó Bí thư, Chủ tịch UBND thị xã)",
    membersCount: 23,
    note: "Đại hội đại biểu đầu tiên sau ngày giải phóng, bầu 23 đồng chí Thị ủy viên."
  },
  {
    term: "Đại hội Đại biểu lần thứ II (Khóa II)",
    period: "1979 – 1983",
    secretary: "Nguyễn Trung Kiên",
    deputySecretary: "Nguyễn Văn Thọ, Phan Văn Đương",
    membersCount: 25,
    note: "Lãnh đạo thực hiện kế hoạch 5 năm khôi phục và phát triển kinh tế, chi viện bảo vệ biên giới Tây Nam."
  },
  {
    term: "Đại hội Đại biểu lần thứ III (Khóa III)",
    period: "1983 – 1986",
    secretary: "Nguyễn Văn Thọ",
    deputySecretary: "Phan Văn Đương, Trần Văn Dũng",
    membersCount: 29,
    note: "Tập trung tháo gỡ khó khăn sản xuất, củng cố hợp tác xã và phát triển tiểu thủ công nghiệp."
  },
  {
    term: "Đại hội Đại biểu lần thứ IV (Khóa IV)",
    period: "1986 – 1989",
    secretary: "Phan Văn Đương",
    deputySecretary: "Trần Văn Dũng, Nguyễn Văn Quới",
    membersCount: 31,
    note: "Mở đầu thời kỳ Đổi mới theo tinh thần Nghị quyết Đại hội VI của Đảng, giải phóng sức sản xuất."
  },
  {
    term: "Đại hội Đại biểu lần thứ V (Khóa V)",
    period: "1989 – 1991",
    secretary: "Phan Văn Đương",
    deputySecretary: "Trần Văn Dũng (Chủ tịch UBND)",
    membersCount: 33,
    note: "Chuyển đổi mạnh mẽ cơ cấu kinh tế nhiều thành phần, đẩy mạnh liên kết kinh tế đô thị."
  },
  {
    term: "Đại hội Đại biểu lần thứ VI (Khóa VI)",
    period: "1991 – 1996",
    secretary: "Phan Văn Đương",
    deputySecretary: "Trần Văn Dũng (Chủ tịch UBND), Ngô Công Minh",
    membersCount: 33,
    note: "Thực hiện thành công kế hoạch 5 năm 1991-1995, chuẩn bị các điều kiện cho việc tái lập tỉnh Bình Dương."
  },
  {
    term: "Đại hội Đại biểu lần thứ VII (Khóa VII)",
    period: "1996 – 2000",
    secretary: "Phan Văn Đương (đến 01/1997), Trần Văn Dũng (từ 01/1997)",
    deputySecretary: "Ngô Công Minh (Phó Bí thư Thường trực), Phạm Văn Cành",
    membersCount: 35,
    note: "Giai đoạn lịch sử tái lập tỉnh Bình Dương (01/01/1997), thị xã Thủ Dầu Một chuyển mình phát triển mạnh mẽ."
  },
  {
    term: "Đại hội Đại biểu lần thứ VIII (Khóa VIII)",
    period: "2000 – 2005",
    secretary: "Phạm Văn Cành",
    deputySecretary: "Ngô Công Minh, Nguyễn Phúc Lâm",
    membersCount: 39,
    note: "Đẩy mạnh công nghiệp hóa, hiện đại hóa, phát triển các khu đô thị mới."
  },
  {
    term: "Đại hội Đại biểu lần thứ IX (Khóa IX)",
    period: "2005 – 2010",
    secretary: "Phạm Văn Cành (đến 2009), Nguyễn Văn Quới (từ 2009)",
    deputySecretary: "Nguyễn Duy Niềm, Trần Văn Lợi",
    membersCount: 41,
    note: "Đẩy nhanh tốc độ đô thị hóa, hoàn thành các tiêu chí đô thị loại III."
  },
  {
    term: "Đại hội Đại biểu lần thứ X (Khóa X)",
    period: "2010 – 2015",
    secretary: "Trần Văn Lợi (đến 2013), Võ Văn Minh (từ 2013)",
    deputySecretary: "Phạm Văn Minh, Nguyễn Thành Tài",
    membersCount: 43,
    note: "Thành lập thành phố Thủ Dầu Một trực thuộc tỉnh Bình Dương theo Nghị quyết số 11/NQ-CP ngày 02/5/2012."
  },
  {
    term: "Đại hội Đại biểu lần thứ XI (Khóa XI)",
    period: "2015 – 2020",
    secretary: "Võ Văn Minh (đến 2019), Nguyễn Văn Đông (từ 2019)",
    deputySecretary: "Lâm Phi Hùng, Nguyễn Thu Cúc",
    membersCount: 43,
    note: "Thành phố được Thủ tướng Chính phủ công nhận là Đô thị loại I trực thuộc tỉnh Bình Dương (06/12/2017)."
  },
  {
    term: "Đại hội Đại biểu lần thứ XII (Khóa XII)",
    period: "2020 – 2025",
    secretary: "Nguyễn Văn Đông",
    deputySecretary: "Võ Thị Bạch Yến, Nguyễn Thu Cúc (Chủ tịch UBND)",
    membersCount: 41,
    note: "Xây dựng thành phố Thủ Dầu Một phát triển thông minh, văn minh, giàu đẹp, hiện đại."
  }
];

// Đơn vị Anh hùng và Anh hùng Lực lượng Vũ trang Nhân dân (Phụ lục III, Sách 2000)
export const TDM_HEROES_AND_UNITS: HeroItem[] = [
  {
    id: "hero-unit-1",
    name: "Lực lượng Vũ trang Nhân dân Thị xã Thủ Dầu Một",
    type: "UNIT",
    awardDate: "06/11/1978 (Quyết định số 101-CTN)",
    period: "Kháng chiến chống Mỹ cứu nước (1954 – 1975)",
    description: "Đơn vị kiên cường bám trụ trên địa bàn trọng điểm cửa ngõ Sài Gòn; tiêu diệt và làm tan rã hơn 3.750 tên địch, bắn cháy và phá hủy 2 triệu lít xăng dầu, 1.200 súng các loại. Được tặng thưởng 7 Huân chương Chiến công Giải phóng các hạng và danh hiệu cao quý Anh hùng LLVTND."
  },
  {
    id: "hero-unit-2",
    name: "Dân quân Du kích Xã Định Hòa",
    type: "UNIT",
    awardDate: "Tuyên dương Anh hùng LLVTND",
    period: "Kháng chiến chống Mỹ cứu nước",
    description: "Địa bàn căn cứ vành đai diệt Mỹ kiên cường; dân quân du kích xã độc lập tác chiến và phối hợp tiêu diệt trên 1.000 tên địch, phá hủy 25 xe quân sự, thu hơn 150 khẩu súng, bảo vệ an toàn cho các cơ quan lãnh đạo của Thị ủy và Tỉnh ủy."
  },
  {
    id: "hero-person-1",
    name: "Anh hùng LLVTND Nguyễn Văn Bé",
    type: "INDIVIDUAL",
    awardDate: "Tuyên dương Anh hùng LLVTND",
    period: "Kháng chiến chống Mỹ cứu nước",
    description: "Quê quán: Phường Phú Cường, thị xã Thủ Dầu Một. Tấm gương kiên cường, dũng cảm chiến đấu đến giọt máu cuối cùng, trở thành biểu tượng anh hùng bất khuất của tuổi trẻ miền Đông Nam Bộ."
  },
  {
    id: "hero-person-2",
    name: "Anh hùng Liệt sĩ Tôn Minh Lai",
    type: "INDIVIDUAL",
    awardDate: "Truy tặng Anh hùng LLVTND",
    period: "Kháng chiến chống Mỹ cứu nước",
    description: "Trung đội trưởng trinh sát đặc công gan dạ, mưu trí; trực tiếp chỉ huy nhiều trận đánh thọc sâu vào các sào huyệt, căn cứ quân sự đầu não của địch tại trung tâm tỉnh lỵ Thủ Dầu Một."
  },
  {
    id: "hero-person-3",
    name: "Anh hùng LLVTND Thượng tá Bác sĩ Lê Kim Hà",
    type: "INDIVIDUAL",
    awardDate: "20/12/1994",
    period: "Nhập ngũ 19/5/1962 · Viện Quân y 175",
    description: "Sinh ra và lớn lên tại Phú Cường, Thủ Dầu Một; bác sĩ quân y tận tụy cứu chữa hàng nghìn thương bệnh binh dưới làn bom đạn ác liệt, có nhiều công trình nghiên cứu và cống hiến đặc biệt xuất sắc cho ngành quân y Việt Nam."
  }
];

// Thống kê cống hiến và huân huy chương (Phụ lục IV, Sách 2000)
export const TDM_WAR_STATISTICS: WarStatistics = {
  participants: 5157,
  martyrs: 2395,
  wounded: 604,
  heroicMothers: 106,
  summary: "Trong hai cuộc kháng chiến vĩ đại chống thực dân Pháp và đế quốc Mỹ, Đảng bộ và nhân dân thị xã Thủ Dầu Một đã động viên 5.157 người con ưu tú tham gia thoát ly hoạt động cách mạng; 2.395 người con đã anh dũng hy sinh vì độc lập tự do của Tổ quốc; 604 đồng chí là thương binh, bệnh binh; 106 người mẹ được phong tặng và truy tặng danh hiệu cao quý Bà Mẹ Việt Nam Anh Hùng."
};
