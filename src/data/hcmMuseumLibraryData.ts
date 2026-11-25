// Dữ liệu Thư viện Ấn phẩm & Công trình Nghiên cứu Bảo tàng Hồ Chí Minh
// Nguồn tham chiếu chính thống: Bảo tàng Hồ Chí Minh (https://baotanghochiminh.vn/thu-vien-tai-lieu.htm & https://baotanghochiminh.vn/an-pham.htm)
// Phối hợp cùng Nhà xuất bản Chính trị quốc gia Sự thật, Viện Hồ Chí Minh và Ban Quản lý Lăng

export type MuseumPubCategory =
  | 'ALL_DOCS'      // Toàn văn & Văn kiện tải về
  | 'BIOGRAPHY'     // Biên niên tiểu sử & Tiểu sử
  | 'IDEOLOGY'      // Tư tưởng, Đạo đức & Phong cách
  | 'RELICS'        // Kỷ vật & Di sản bảo tàng
  | 'PROCEEDINGS'   // Kỷ yếu khoa học & Công bố mới
  | 'PRACTICE';     // Học Bác trong thực tiễn & Điển hình

export interface MuseumPublicationItem {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  category: MuseumPubCategory;
  categoryLabel: string;
  publisher: string;
  authorOrEditor: string;
  publishYear: number | string;
  totalPages?: number;
  coverImage?: string;
  pdfDownloadUrl?: string;        // Đường dẫn tải trực tiếp PDF từ baotanghochiminh.vn
  fileSize?: string;
  officialSourceUrl: string;      // Đường dẫn bài viết gốc tại baotanghochiminh.vn
  summary: string;
  tableOfContentsOrChapters: string[];
  keyHistoricalInsights: string[];
  localApplicationForTDM: string; // Vận dụng cho cán bộ, nhân dân Phường Thủ Dầu Một (QĐ 144 / CT 07)
  citationStandard: string;       // Trích dẫn khoa học chuẩn
  featuredQuote?: string;
}

export const MUSEUM_CATEGORIES_CONFIG: { id: 'ALL' | MuseumPubCategory; label: string; count: number }[] = [
  { id: 'ALL', label: 'Tất cả tư liệu Bảo tàng', count: 16 },
  { id: 'ALL_DOCS', label: 'Toàn văn & Tải PDF', count: 3 },
  { id: 'BIOGRAPHY', label: 'Biên niên & Tiểu sử', count: 4 },
  { id: 'IDEOLOGY', label: 'Tư tưởng & Phong cách', count: 3 },
  { id: 'RELICS', label: 'Bảo vật & Hiện vật', count: 2 },
  { id: 'PROCEEDINGS', label: 'Kỷ yếu & Công bố KH', count: 2 },
  { id: 'PRACTICE', label: 'Thực tiễn & Điển hình', count: 2 },
];

// Danh sách các tập Hồ Chí Minh Toàn tập PDF có link tải trực tiếp từ máy chủ Bảo tàng Hồ Chí Minh
export const HCM_TOAN_TAP_PDF_LINKS = [
  { vol: 1, period: '1912 – 1925', size: '2.6 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854955124509744.pdf' },
  { vol: 2, period: '1926 – 1930', size: '2.7 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854954092411931.pdf' },
  { vol: 3, period: '1930 – 1945', size: '2.5 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854952179536571.pdf' },
  { vol: 4, period: '1945 – 1946', size: '2.5 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854950227973143.pdf' },
  { vol: 5, period: '1947 – 1948', size: '2.8 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854949255935436.pdf' },
  { vol: 6, period: '1949 – 1950', size: '2.4 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854947990929214.pdf' },
  { vol: 7, period: '1951 – 1952', size: '2.6 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854947010311492.pdf' },
  { vol: 8, period: '1953 – 1954', size: '2.4 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854945883053512.pdf' },
  { vol: 9, period: '1955 – 1957', size: '2.5 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854943727753726.pdf' },
  { vol: 10, period: '1957 – 1958', size: '2.6 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854942385215368.pdf' },
  { vol: 11, period: '1958 – 1959', size: '2.7 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854814846411358.pdf' },
  { vol: 12, period: '1959 – 1960', size: '3.1 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854814194954214.pdf' },
  { vol: 13, period: '1961 – 1962', size: '2.4 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854812994688106.pdf' },
  { vol: 14, period: '1963 – 1965', size: '3.3 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854715153032256.pdf' },
  { vol: 15, period: '1965 – 1969', size: '2.9 MB', url: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854714264142695.pdf' },
];

export const HCM_MUSEUM_PUBLICATIONS: MuseumPublicationItem[] = [
  {
    id: 'mpub_01',
    code: 'BTHCM-TT15',
    title: 'Hồ Chí Minh Toàn Tập (Trọn bộ 15 Tập PDF Toàn Văn)',
    subtitle: 'Nguồn văn bản số hóa chính thức do Bảo tàng Hồ Chí Minh cung cấp',
    category: 'ALL_DOCS',
    categoryLabel: 'Toàn văn & Tải PDF',
    publisher: 'NXB Chính trị quốc gia Sự thật & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam',
    publishYear: 'Xuất bản lần thứ 3 (Bản số hóa chuẩn)',
    totalPages: 10500,
    fileSize: '~40 MB (Trọn bộ 15 tệp PDF)',
    pdfDownloadUrl: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636854955124509744.pdf',
    officialSourceUrl: 'https://baotanghochiminh.vn/thu-vien-tai-lieu.htm',
    summary:
      'Kho tài liệu số hóa toàn văn 15 tập Hồ Chí Minh Toàn tập do Bảo tàng Hồ Chí Minh trực tiếp lưu trữ trên hệ thống thư viện tài liệu. Bao gồm gần 3.300 tác phẩm, bài viết, bức điện, sắc lệnh của Chủ tịch Hồ Chí Minh từ năm 1912 đến năm 1969.',
    tableOfContentsOrChapters: [
      'Tập 1: 1912 – 1925 (Bản yêu sách An Nam, Báo Le Paria, Bản án chế độ thực dân Pháp)',
      'Tập 2: 1926 – 1930 (Đường Kách mệnh, Thành lập Đảng CSVN)',
      'Tập 3: 1930 – 1945 (Chương trình Việt Minh, Khởi nghĩa Tháng Tám)',
      'Tập 4: 1945 – 1946 (Tuyên ngôn Độc lập, Kháng chiến bảo vệ độc lập)',
      'Tập 5: 1947 – 1948 (Sửa đổi lối làm việc, Kháng chiến kiến quốc)',
      'Tập 6: 1949 – 1950 (Bài báo Dân vận, Chiến dịch Biên giới)',
      'Tập 7 – 15: 1951 – 1969 (Đại hội II, Chiến dịch Điện Biên Phủ, Kháng chiến chống Mỹ, Bản Di chúc)',
    ],
    keyHistoricalInsights: [
      'Nguồn cấp A có giá trị pháp lý và tính chính thống tối cao trong hệ thống tư liệu Đảng.',
      'Cung cấp liên kết tải trực tiếp từng tập PDF từ máy chủ của Bảo tàng Hồ Chí Minh.',
    ],
    localApplicationForTDM:
      'Tạo điều kiện để cán bộ, đảng viên thuộc 26 chi bộ Phường Thủ Dầu Một tải và tra cứu toàn văn mọi bài viết của Bác phục vụ nghiên cứu, giảng dạy và sinh hoạt chi bộ.',
    citationStandard:
      'Hồ Chí Minh: Toàn tập (15 tập), NXB Chính trị quốc gia Sự thật, Hà Nội, 2011 (Lưu trữ số tại Thư viện Bảo tàng Hồ Chí Minh).',
  },
  {
    id: 'mpub_02',
    code: 'BTHCM-BNTS',
    title: 'Hồ Chí Minh Biên Niên Tiểu Sử (Bộ 10 Tập Đồ Sộ)',
    subtitle: 'Công trình khoa học lịch sử tra cứu chuẩn mực quốc gia theo ngày tháng năm',
    category: 'BIOGRAPHY',
    categoryLabel: 'Biên niên & Tiểu sử',
    publisher: 'NXB Chính trị quốc gia Sự thật',
    authorOrEditor: 'Viện Hồ Chí Minh và các lãnh tụ của Đảng & Bảo tàng Hồ Chí Minh',
    publishYear: 'Tái bản có sửa chữa, bổ sung',
    totalPages: 6850,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Bộ sách đồ sộ gồm 10 tập, ghi chép tường tận, chính xác từng ngày, tháng, năm về cuộc đời và hoạt động cách mạng của Bác Hồ từ năm 1890 đến 1969. Là công trình tham khảo nền tảng của mọi nghiên cứu về Hồ Chí Minh.',
    tableOfContentsOrChapters: [
      'Tập 1 (1890 – 1929): Tuổi trẻ và những năm bôn ba tìm đường cứu nước',
      'Tập 2 (1930 – 1945): Thành lập Đảng Cộng sản Việt Nam đến Cách mạng Tháng Tám',
      'Tập 3 (1945 – 1946): Xây dựng và bảo vệ chính quyền cách mạng non trẻ',
      'Tập 4 (1946 – 1950): Toàn quốc kháng chiến và chiến thắng Biên giới',
      'Tập 5 (1951 – 1954): Đại hội Đảng lần thứ II đến Chiến thắng Điện Biên Phủ',
      'Tập 6 (1954 – 1957): Khôi phục kinh tế, hòa bình ở miền Bắc',
      'Tập 7 (1958 – 1960): Kế hoạch 3 năm và Đại hội III của Đảng',
      'Tập 8 (1961 – 1963): Xây dựng CNXH và phong trào thi đua yêu nước',
      'Tập 9 (1964 – 1966): Kháng chiến chống Mỹ, "Không có gì quý hơn độc lập tự do"',
      'Tập 10 (1967 – 1969): Tổng tiến công Mậu Thân và bản Di chúc lịch sử',
    ],
    keyHistoricalInsights: [
      'Khảo chứng khoa học chính xác từng mốc sự kiện, loại bỏ các sai lệch về niên đại trong lịch sử.',
      'Cung cấp tư liệu gốc để xác thực hành trình bôn ba của Người qua gần 30 quốc gia và vùng lãnh thổ.',
    ],
    localApplicationForTDM:
      'Tư liệu nghiên cứu chuẩn chỉ phục vụ biên soạn Lịch sử Đảng bộ Phường Thủ Dầu Một và các bài giảng truyền thống cho thanh thiếu nhi.',
    citationStandard:
      'Viện Hồ Chí Minh - Bảo tàng Hồ Chí Minh: Hồ Chí Minh Biên niên tiểu sử (10 tập), NXB Chính trị quốc gia Sự thật, Hà Nội.',
  },
  {
    id: 'mpub_03',
    code: 'BTHCM-KY-YEU-1000',
    title: 'Kỷ Yếu Hội Thảo Quốc Gia: Hành Trình Tìm Đường Cứu Nước Của Nguyễn Tất Thành',
    subtitle: 'Gần 1.000 trang nghiên cứu công bố các tư liệu lưu trữ quốc tế mới',
    category: 'PROCEEDINGS',
    categoryLabel: 'Kỷ yếu & Công bố KH',
    publisher: 'NXB Chính trị quốc gia Sự thật & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Bảo tàng Hồ Chí Minh (TS. Vũ Mạnh Hà chủ biên) & BQL Lăng Chủ tịch HCM',
    publishYear: '2021',
    totalPages: 986,
    officialSourceUrl: 'https://baotanghochiminh.vn/gan-1-000-trang-sach-tai-hien-chan-thuc-hanh-trinh-tim-duong-cuu-nuoc-cua-nguyen-tat-thanh-ho-chi-minh.htm',
    summary:
      'Công trình kỷ yếu hội thảo khoa học cấp quốc gia đồ sộ nhất nhân kỷ niệm 110 năm Ngày Bác ra đi tìm đường cứu nước (05/6/1911 – 05/6/2021). Quy tụ hơn 80 bài tham luận sâu sắc của các nhà khoa học, chuyên gia lịch sử đầu ngành.',
    tableOfContentsOrChapters: [
      'Phần I: Bối cảnh lịch sử và quyết định mang tính bước ngoặt từ Bến cảng Nhà Rồng (1911)',
      'Phần II: Hành trình khảo sát thực tiễn qua các châu lục và sự lựa chọn con đường cách mạng vô sản',
      'Phần III: Giá trị thời đại và bài học đối với công cuộc đổi mới, hội nhập quốc tế của Việt Nam',
      'Phần IV: Bảo tồn và phát huy hệ thống di tích lưu niệm Chủ tịch Hồ Chí Minh trên cả nước',
    ],
    keyHistoricalInsights: [
      'Công bố các tài liệu lưu trữ mật thám Pháp mới khai thác về hành tung của Nguyễn Tất Thành - Văn Ba.',
      'Làm sáng rõ mối liên hệ giữa các điểm dừng chân tại phương Nam trước khi Người lên tàu Amiral Latouche-Tréville.',
    ],
    localApplicationForTDM:
      'Liên kết trực tiếp với các điểm di tích Đất Thủ như Chùa Hội Khánh (nơi cụ Phó bảng Nguyễn Sinh Sắc từng hoạt động Hội Danh Dự) và Tour Về nguồn Bác Hồ.',
    citationStandard:
      'Bảo tàng Hồ Chí Minh: Sự kiện Nguyễn Tất Thành - Hồ Chí Minh đi tìm đường cứu nước: Ý nghĩa lịch sử và giá trị thời đại, NXB CTQG Sự thật, Hà Nội, 2021.',
  },
  {
    id: 'mpub_04',
    code: 'BTHCM-NAM-BO',
    title: 'Nam Bộ Là Thành Đồng Của Tổ Quốc (Ấn Bản 2025)',
    subtitle: 'Tuyển tập các tác phẩm, bài nói, bức thư của Bác Hồ gửi đồng bào miền Nam',
    category: 'IDEOLOGY',
    categoryLabel: 'Tư tưởng & Phong cách',
    publisher: 'NXB Chính trị quốc gia Sự thật & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Chủ tịch Hồ Chí Minh (Bảo tàng Hồ Chí Minh khảo cứu, giới thiệu)',
    publishYear: '2025 (Kỷ niệm 50 năm giải phóng miền Nam)',
    totalPages: 412,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Tập hợp trọn vẹn các trước tác, thư từ, điện văn, lời căn dặn của Bác đối với quân dân Nam Bộ trong suốt hai cuộc kháng chiến chống Pháp và chống Mỹ (1945–1969); thể hiện tình cảm thiêng liêng "Miền Nam luôn ở trong trái tim tôi".',
    tableOfContentsOrChapters: [
      'Chương I: Thư gửi đồng bào Nam Bộ sau ngày Toàn quốc kháng chiến (1945 – 1946)',
      'Chương II: "Nam Bộ là máu của máu Việt Nam, thịt của thịt Việt Nam" (1946 – 1954)',
      'Chương III: Trăn trở khôn nguôi về ngày giải phóng và thống nhất non sông (1954 – 1969)',
      'Chương IV: Dấu ấn tình cảm của Bác với chiến sĩ và mẹ Việt Nam anh hùng miền Đông Nam Bộ',
    ],
    keyHistoricalInsights: [
      'Khẳng định danh hiệu cao quý "Thành đồng Tổ quốc" mà Người đã phong tặng cho Nam Bộ tháng 2/1946.',
      'Ý chí sắt đá về sự toàn vẹn lãnh thổ và khối đại đoàn kết toàn dân tộc.',
    ],
    localApplicationForTDM:
      'Bồi đắp truyền thống cách mạng kiên trung của Đảng bộ và nhân dân Thủ Dầu Một — Bình Dương, nơi có Chi bộ Lò Chén Tân Khánh và Nhà tù Phú Lợi quật khởi.',
    citationStandard:
      'Chủ tịch Hồ Chí Minh: Nam Bộ là thành đồng của Tổ quốc, NXB Chính trị quốc gia Sự thật, Hà Nội, 2025.',
    featuredQuote:
      'Đồng bào Nam Bộ là dân nước Việt Nam. Sông có thể cạn, núi có thể mòn, song chân lý đó không bao giờ thay đổi!',
  },
  {
    id: 'mpub_05',
    code: 'BTHCM-BAO-VAT-5',
    title: 'Hồ Chí Minh — Bộ Tác Phẩm Bảo Vật Quốc Gia (Trọn Bộ 5 Cuốn)',
    subtitle: 'Năm kiệt tác được Thủ tướng Chính phủ công nhận Bảo vật Quốc gia',
    category: 'RELICS',
    categoryLabel: 'Bảo vật & Hiện vật',
    publisher: 'NXB Trẻ phối hợp Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Chủ tịch Hồ Chí Minh',
    publishYear: 'Ấn bản trang trọng',
    totalPages: 890,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Bộ ấn phẩm đặc biệt in màu, trang nhã tái bản 5 tác phẩm được công nhận Bảo vật Quốc gia theo Quyết định số 1426/QĐ-TTg của Thủ tướng Chính phủ: Đường Kách mệnh (1927), Nhật ký trong tù (1942–1943), Lời kêu gọi toàn quốc kháng chiến (1946), Lời kêu gọi 17/7/1966 và Bản Di chúc thiêng liêng (1969).',
    tableOfContentsOrChapters: [
      'Cuốn 1: Đường Kách mệnh (1927) — Giáo trình lý luận đầu tiên của cách mạng Việt Nam',
      'Cuốn 2: Nhật ký trong tù (1942 – 1943) — Kiệt tác thi ca ngục tù mang tinh thần thép',
      'Cuốn 3: Lời kêu gọi Toàn quốc kháng chiến (1946) — Hịch non sông bảo vệ độc lập',
      'Cuốn 4: Lời kêu gọi chống Mỹ cứu nước (17/7/1966) — "Không có gì quý hơn độc lập, tự do"',
      'Cuốn 5: Bản Di chúc của Chủ tịch Hồ Chí Minh (1965 – 1969) — Bảo vật muôn đời của Dân tộc',
    ],
    keyHistoricalInsights: [
      'Ấn bản chuẩn mực kèm ảnh chụp nguyên bản các trang bản thảo bút tích gốc của Bác.',
      'Mỗi tác phẩm đánh dấu một bước ngoặt lịch sử quyết định vận mệnh của Tổ quốc.',
    ],
    localApplicationForTDM:
      'Phục vụ trưng bày trang trọng tại Tủ sách Di sản Bác Hồ tại trụ sở Đảng ủy - UBND Phường Thủ Dầu Một và 26 nhà văn hóa khu phố.',
    citationStandard:
      'Hồ Chí Minh: Bộ tác phẩm Bảo vật Quốc gia (5 cuốn), NXB Trẻ, TP. Hồ Chí Minh.',
  },
  {
    id: 'mpub_06',
    code: 'BTHCM-PHONG-CACH',
    title: 'Bộ Sách Phong Cách Hồ Chí Minh (Trọn Bộ 4 Chuyên Khảo)',
    subtitle: 'Tư duy — Làm việc — Ứng xử — Lối sống',
    category: 'IDEOLOGY',
    categoryLabel: 'Tư tưởng & Phong cách',
    publisher: 'NXB Chính trị quốc gia Sự thật & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Nhóm nghiên cứu chuyên sâu Bảo tàng Hồ Chí Minh',
    publishYear: '2021 (Tái bản 2024)',
    totalPages: 1250,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Bộ chuyên khảo 4 tập phân tích sâu sắc và có hệ thống 4 trụ cột phong cách mẫu mực của Chủ tịch Hồ Chí Minh. Là tài liệu nền tảng thiết thực nhất để triển khai Quy định 144-QĐ/TW về chuẩn mực đạo đức cách mạng của cán bộ, đảng viên cơ sở.',
    tableOfContentsOrChapters: [
      'Tập 1: Phong cách Tư duy Hồ Chí Minh (Độc lập, tự chủ, sáng tạo, gắn liền lý luận với thực tiễn)',
      'Tập 2: Phong cách Làm việc Hồ Chí Minh (Khoa học, dân chủ, quần chúng, sâu sát cơ sở, nêu gương)',
      'Tập 3: Phong cách Ứng xử Hồ Chí Minh (Khiêm tốn, nhã nhặn, chân tình, bao dung, giàu lòng nhân ái)',
      'Tập 4: Phong cách Lối sống Hồ Chí Minh (Thanh cao, giản dị, cần kiệm liêm chính, chí công vô tư)',
    ],
    keyHistoricalInsights: [
      'Chứng minh tính nhất quán tuyệt đối giữa tư tưởng vĩ đại và hành vi ứng xử đời thường của Bác.',
      'Làm rõ phương pháp lãnh đạo bằng nêu gương: "Muốn người ta theo, mình phải làm gương trước".',
    ],
    localApplicationForTDM:
      'Nội dung rèn luyện nòng cốt cho đội ngũ cán bộ công chức Phường Thủ Dầu Một trong việc nâng cao chỉ số phục vụ nhân dân, thái độ niềm nở, không sách nhiễu.',
    citationStandard:
      'Bảo tàng Hồ Chí Minh: Phong cách Hồ Chí Minh (4 tập: Tư duy, Làm việc, Ứng xử, Lối sống), NXB CTQG Sự thật, Hà Nội.',
    featuredQuote:
      'Cần, Kiệm, Liêm, Chính là bốn đức tính cơ bản của con người, như bốn mùa của trời, bốn phương của đất.',
  },
  {
    id: 'mpub_07',
    code: 'BTHCM-DIEN-HINH',
    title: 'Những Điển Hình Tiên Tiến Học Tập Và Làm Theo Bác Hồ (PDF Toàn Văn)',
    subtitle: 'Tài liệu toàn văn 21 MB xuất bản phục vụ sơ kết Kết luận 01-KL/TW',
    category: 'ALL_DOCS',
    categoryLabel: 'Toàn văn & Tải PDF',
    publisher: 'Ban Tuyên giáo Trung ương & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Hội đồng Khoa học Bảo tàng Hồ Chí Minh',
    publishYear: 'Tài liệu lưu trữ thư viện điện tử',
    totalPages: 560,
    fileSize: '21.3 MB (Tệp PDF đầy đủ)',
    pdfDownloadUrl: 'https://baotanghochiminh.vn/pic/FileLibrary/Nhung-die_636573158176791030.pdf',
    officialSourceUrl: 'https://baotanghochiminh.vn/thu-vien-tai-lieu.htm',
    summary:
      'Tài liệu toàn văn định dạng PDF được lưu giữ trực tiếp trên thư viện số Bảo tàng Hồ Chí Minh, tập hợp các tấm gương tập thể, cá nhân điển hình xuất sắc nhất toàn quốc trong việc vận dụng sáng tạo tư tưởng, đạo đức, phong cách của Bác vào phát triển kinh tế - xã hội.',
    tableOfContentsOrChapters: [
      'Phần I: Điển hình đổi mới lề lối làm việc, cải cách thủ tục hành chính phục vụ dân',
      'Phần II: Tấm gương cán bộ, đảng viên tận tụy vì cộng đồng nơi địa bàn dân cư',
      'Phần III: Các mô hình kinh tế xanh, an sinh xã hội nghĩa tình mang đậm dấu ấn Bác Hồ',
    ],
    keyHistoricalInsights: [
      'Thực hiện lời dạy của Bác: "Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền".',
      'Cung cấp kinh nghiệm thực chứng từ cơ sở cấp xã/phường trên khắp ba miền.',
    ],
    localApplicationForTDM:
      'Soi rọi và hoàn thiện 4 mô hình học Bác tại Phường Thủ Dầu Một (Chi bộ 4 tốt, Khu phố không rác, Ngày thứ Bảy văn minh, Bàn tiếp dân 5 biết).',
    citationStandard:
      'Ban Tuyên giáo Trung ương - Bảo tàng Hồ Chí Minh: Những điển hình tiên tiến trong học tập và làm theo Bác Hồ, Hà Nội.',
  },
  {
    id: 'mpub_08',
    code: 'BTHCM-TIEU-SU-DOCX',
    title: 'Hồ Chí Minh — Tiểu Sử Toàn Văn (Văn Bản Nghiên Cứu)',
    subtitle: 'Tài liệu tóm tắt cuộc đời và sự nghiệp dựa trên tư liệu chân thực',
    category: 'ALL_DOCS',
    categoryLabel: 'Toàn văn & Tải PDF',
    publisher: 'Viện Hồ Chí Minh & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Ban Nghiên cứu Lịch sử Đảng và Bảo tàng Hồ Chí Minh',
    publishYear: 'Tài liệu Thư viện số',
    totalPages: 240,
    fileSize: '202 KB (Định dạng DOCX)',
    pdfDownloadUrl: 'https://baotanghochiminh.vn/pic/FileLibrary/HO-CHI-MI_636572259955845730.docx',
    officialSourceUrl: 'https://baotanghochiminh.vn/thu-vien-tai-lieu.htm',
    summary:
      'Văn bản tổng kết cuộc đời hoạt động cách mạng của Người, phân tích bối cảnh thời đại, sự hình thành tư tưởng cứu nước và vai trò lãnh đạo cách mạng Việt Nam. Tài liệu tải trực tiếp dạng DOCX thuận tiện cho tra cứu và biên soạn bài giảng.',
    tableOfContentsOrChapters: [
      '1. Thời niên thiếu và bối cảnh đất nước cuối thế kỷ XIX (1890 – 1911)',
      '2. Ba mươi năm bôn ba hải ngoại tìm đường cứu nước (1911 – 1941)',
      '3. Về nước lãnh đạo phong trào giải phóng dân tộc (1941 – 1945)',
      '4. Hai cuộc kháng chiến trường kỳ và những năm tháng cuối đời (1945 – 1969)',
    ],
    keyHistoricalInsights: [
      'Tóm tắt súc tích, hệ thống hóa chặt chẽ theo các giai đoạn phát triển tư duy chính trị của Bác.',
    ],
    localApplicationForTDM:
      'Tài liệu giảng dạy nhận thức về Đảng cho học sinh, sinh viên, đoàn viên ưu tú tại Phường Thủ Dầu Một.',
    citationStandard:
      'Bảo tàng Hồ Chí Minh: Hồ Chí Minh - Tiểu sử, Thư viện số Bảo tàng Hồ Chí Minh.',
  },
  {
    id: 'mpub_09',
    code: 'BTHCM-THAI-LAN',
    title: 'Bác Là Hồ Chí Minh & Bác Hồ Ở Thái Lan (Xuất Bản 2025)',
    subtitle: 'Bộ đôi ấn phẩm khảo cứu đặc biệt về hoạt động quốc tế dưới bí danh Thầu Chín',
    category: 'BIOGRAPHY',
    categoryLabel: 'Biên niên & Tiểu sử',
    publisher: 'Nhà xuất bản Giáo dục Việt Nam & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Bảo tàng Hồ Chí Minh & Hội Hữu nghị Việt Nam - Thái Lan',
    publishYear: '2025 (Ra mắt 30/07/2025)',
    totalPages: 480,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Bộ ấn phẩm mới nhất giới thiệu các tư liệu lịch sử quý giá về thời gian Người hoạt động tại Thái Lan (Bản Đông, Udon Thani, Nakhon Phanom) và các bài viết đánh giá sâu sắc của các nhà giáo dục, học giả trong và ngoài nước về nhân cách Bác.',
    tableOfContentsOrChapters: [
      'Tập 1: Bác Hồ ở Thái Lan — Hoạt động cách mạng dưới bí danh Thầu Chín (1928 – 1929)',
      'Tập 2: Bác là Hồ Chí Minh — Di sản nhân văn và tầm vóc văn hóa toàn cầu',
      'Phần khảo cứu: Khu tưởng niệm Chủ tịch Hồ Chí Minh tại Nakhon Phanom và Bản Đông hôm nay',
    ],
    keyHistoricalInsights: [
      'Bài học kinh điển về công tác dân vận trong kiều bào: đoàn kết, dạy chữ, sống hòa đồng và tôn trọng luật pháp nước sở tại.',
    ],
    localApplicationForTDM:
      'Ứng dụng vào công tác vận động quần chúng, kiều bào và thân nhân kiều bào có nguồn gốc tại địa bàn Phường Thủ Dầu Một.',
    citationStandard:
      'Bảo tàng Hồ Chí Minh: Bác là Hồ Chí Minh - Bác Hồ ở Thái Lan, NXB Giáo dục Việt Nam, Hà Nội, 2025.',
  },
  {
    id: 'mpub_10',
    code: 'BTHCM-BAN-DO-30N',
    title: 'Bản Đồ Hành Trình 30 Năm Tìm Đường Cứu Nước Của Bác Hồ',
    subtitle: 'Ấn phẩm bản đồ trực quan khổ lớn (1m × 70cm) mô tả toàn bộ hải trình 1911–1941',
    category: 'BIOGRAPHY',
    categoryLabel: 'Biên niên & Tiểu sử',
    publisher: 'NXB Trẻ & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Ban Nghiên cứu Tư liệu Lịch sử NXB Trẻ & Bảo tàng Hồ Chí Minh',
    publishYear: '2021',
    totalPages: 1,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Ấn phẩm trực quan độc đáo thể hiện chi tiết tọa độ, hải trình qua gần 30 quốc gia và vùng lãnh thổ của Nguyễn Tất Thành từ Bến cảng Nhà Rồng (05/6/1911) cho đến ngày Người trở về Tổ quốc qua cột mốc 108 Pác Bó (28/01/1941).',
    tableOfContentsOrChapters: [
      'Chặng 1: Hành trình biển qua Pháp, các nước Châu Phi và Châu Mỹ (1911 – 1917)',
      'Chặng 2: Hoạt động sôi nổi tại Pháp và tìm thấy Luận cương Lênin (1917 – 1923)',
      'Chặng 3: Hoạt động tại Liên Xô và Trung Quốc, thành lập Hội VNCM Thanh niên (1923 – 1927)',
      'Chặng 4: Xiêm (Thái Lan), Hương Cảng và ngày trở về Pác Bó (1928 – 1941)',
    ],
    keyHistoricalInsights: [
      'Chuyển tải khối lượng dữ liệu lịch sử đồ sộ thành bản đồ địa lý trực quan sinh động.',
    ],
    localApplicationForTDM:
      'Được số hóa và tích hợp trực tiếp vào chuyên mục "Dấu Chân Người (20 Tọa độ)" trên Không gian Văn hóa Hồ Chí Minh Phường Thủ Dầu Một.',
    citationStandard:
      'NXB Trẻ - Bảo tàng Hồ Chí Minh: Bản đồ hành trình 30 năm tìm đường cứu nước của Bác Hồ, TP. Hồ Chí Minh, 2021.',
  },
  {
    id: 'mpub_11',
    code: 'BTHCM-DANH-NGON',
    title: 'Hồ Chí Minh: Danh Ngôn Tư Tưởng Và Đạo Đức',
    subtitle: 'Tuyển chọn những câu trích dẫn chuẩn mực từ 10.000 trang Toàn tập',
    category: 'IDEOLOGY',
    categoryLabel: 'Tư tưởng & Phong cách',
    publisher: 'NXB Thông tấn & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'GS.TS Nguyễn Như Ý (Chủ biên)',
    publishYear: '2020',
    totalPages: 520,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Công trình tra cứu công phu tuyển chọn các câu danh ngôn, lời căn dặn cốt lõi của Người về độc lập tự do, xây dựng Đảng, đạo đức công vụ, giáo dục thế hệ trẻ, lòng yêu nước và tình đoàn kết quốc tế.',
    tableOfContentsOrChapters: [
      'Chủ đề 1: Độc lập dân tộc và chủ nghĩa xã hội',
      'Chủ đề 2: Xây dựng Đảng cầm quyền trong sạch, vững mạnh',
      'Chủ đề 3: Đạo đức cách mạng: Cần, Kiệm, Liêm, Chính, Chí công vô tư',
      'Chủ đề 4: Lòng yêu thương con người và đại đoàn kết toàn dân',
      'Chủ đề 5: Bồi dưỡng thế hệ cách mạng cho đời sau',
    ],
    keyHistoricalInsights: [
      'Mỗi câu danh ngôn đều có nguồn dẫn chính xác về số tập và số trang trong bộ Hồ Chí Minh Toàn tập.',
    ],
    localApplicationForTDM:
      'Tích hợp vào chức năng "Tạo thiệp trích dẫn di sản" và hệ thống pano tuyên truyền cổ động tại các tuyến phố văn minh Phường Thủ Dầu Một.',
    citationStandard:
      'GS.TS Nguyễn Như Ý: Hồ Chí Minh - Danh ngôn tư tưởng và đạo đức, NXB Thông tấn, Hà Nội, 2020.',
  },
  {
    id: 'mpub_12',
    code: 'BTHCM-130N-TOLAM',
    title: 'Chùm Sách Chuyên Khảo 130 Năm Ngày Sinh Chủ Tịch Hồ Chí Minh',
    subtitle: 'Bộ 4 công trình lý luận chính trị chuyên sâu của các nhà khoa học đầu ngành',
    category: 'PROCEEDINGS',
    categoryLabel: 'Kỷ yếu & Công bố KH',
    publisher: 'NXB Chính trị quốc gia Sự thật & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Đại tướng, GS.TS Tô Lâm (chủ biên) & Các nhà khoa học lý luận',
    publishYear: '2020',
    totalPages: 1420,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Chùm 4 tác phẩm lý luận xuất sắc gồm: "Xây dựng Đảng trong Công an nhân dân theo tư tưởng Hồ Chí Minh" (GS.TS Tô Lâm chủ biên); "Tư tưởng Hồ Chí Minh về cách mạng giải phóng dân tộc" (Nguyễn Việt Hùng); "Triết lý hành động Hồ Chí Minh" (TS. Yên Ngọc Trung); "Tư tưởng Hồ Chí Minh về phát triển xã hội" (TS. Lê Thị Hằng).',
    tableOfContentsOrChapters: [
      'Sách 1: Xây dựng Đảng trong lực lượng CAND theo tư tưởng Hồ Chí Minh',
      'Sách 2: Tư tưởng giải phóng dân tộc — Một số vấn đề lý luận và thực tiễn hôm nay',
      'Sách 3: Triết lý hành động Hồ Chí Minh — Thống nhất giữa lý luận và thực hành cách mạng',
      'Sách 4: Tư tưởng về phát triển xã hội hài hòa, công bằng và tiến bộ',
    ],
    keyHistoricalInsights: [
      'Phát triển lý luận xây dựng lực lượng vũ trang nhân dân trung thành tuyệt đối với Đảng và Tổ quốc.',
      'Làm sáng rõ triết lý hành động vì dân, vì nước của Chủ tịch Hồ Chí Minh.',
    ],
    localApplicationForTDM:
      'Tài liệu nghiên cứu cho Công an Phường Thủ Dầu Một và Ban Chỉ huy Quân sự Phường trong thực hiện Sáu điều Bác Hồ dạy CAND.',
    citationStandard:
      'Đại tướng GS.TS Tô Lâm (chủ biên): Xây dựng Đảng trong Công an nhân dân theo tư tưởng Hồ Chí Minh, NXB CTQG Sự thật, Hà Nội, 2020.',
  },
  {
    id: 'mpub_13',
    code: 'BTHCM-MOI-KY-VAT',
    title: 'Mỗi Kỷ Vật Một Câu Chuyện (Trọn Bộ 3 Tập)',
    subtitle: 'Lai lịch và ý nghĩa thiêng liêng của 68 kỷ vật vô giá lưu giữ tại Bảo tàng',
    category: 'RELICS',
    categoryLabel: 'Bảo vật & Hiện vật',
    publisher: 'Bảo tàng Hồ Chí Minh (19 Ngọc Hà, Ba Đình, Hà Nội)',
    authorOrEditor: 'Hội đồng Khoa học & Ban Trưng bày Bảo tàng Hồ Chí Minh',
    publishYear: 'Ấn bản tái bản',
    totalPages: 680,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Tái hiện hoàn cảnh lịch sử, xuất xứ và bài học nhân văn sâu xa của các hiện vật gốc: Chiếc vali mây khi Người về nước 1941, Đôi dép cao su Bác đi suốt 20 năm, Chiếc máy chữ Hermes Baby, Bộ ka ki bạc màu, Chiếc quạt cọ Pác Bó...',
    tableOfContentsOrChapters: [
      'Tập 1: Những kỷ vật thời kỳ bôn ba tìm đường cứu nước và Pác Bó (1911 – 1945)',
      'Tập 2: Kỷ vật trong kháng chiến chống Pháp và Chiến khu Việt Bắc (1946 – 1954)',
      'Tập 3: Kỷ vật nơi Nhà sàn Phủ Chủ tịch và những năm tháng cuối đời (1954 – 1969)',
    ],
    keyHistoricalInsights: [
      'Mỗi kỷ vật là một bài học trực quan sinh động về lối sống giản dị, tiết kiệm và tình yêu thương con người.',
    ],
    localApplicationForTDM:
      'Tư liệu thuyết minh cho mô hình Nhà truyền thống Thủ Dầu Một số hóa 3D và các hiện vật trưng bày tại Phường.',
    citationStandard:
      'Bảo tàng Hồ Chí Minh: Mỗi kỷ vật một câu chuyện (3 tập), Hà Nội.',
  },
  {
    id: 'mpub_14',
    code: 'BTHCM-QUOC-TE',
    title: 'Người Nga Viết Về Chủ Tịch Hồ Chí Minh',
    subtitle: 'Góc nhìn học thuật và hồi ức của các nhà nghiên cứu, ngoại giao Nga',
    category: 'PRACTICE',
    categoryLabel: 'Thực tiễn & Điển hình',
    publisher: 'NXB Thông tin và Truyền thông & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Viện Phương Đông - Viện Hàn lâm Khoa học Nga & Bảo tàng Hồ Chí Minh',
    publishYear: '2020',
    totalPages: 360,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Tập hợp các nghiên cứu, hồi ức của các chuyên gia Nga từng làm việc, gặp gỡ Bác Hồ tại Quốc tế Cộng sản và các chuyến thăm Liên Xô, khẳng định vai trò cầu nối lịch sử thắt chặt tình hữu nghị bền vững giữa hai dân tộc.',
    tableOfContentsOrChapters: [
      'Chương I: Những năm tháng hoạt động của đồng chí Nguyễn Ái Quốc tại Quốc tế Cộng sản (1923 – 1938)',
      'Chương II: Các nhà nghiên cứu Xô Viết khám phá tư tưởng Hồ Chí Minh',
      'Chương III: Tình cảm của nhân dân Nga đối với Người hôm nay',
    ],
    keyHistoricalInsights: [
      'Khai thác kho tư liệu lưu trữ mật tại Moscow về phong trào cộng sản quốc tế.',
    ],
    localApplicationForTDM:
      'Bồi dưỡng kiến thức lịch sử quốc tế cho thế hệ trẻ Đất Thủ.',
    citationStandard:
      'Bảo tàng Hồ Chí Minh: Người Nga viết về Chủ tịch Hồ Chí Minh, NXB Thông tin và Truyền thông, Hà Nội, 2020.',
  },
  {
    id: 'mpub_15',
    code: 'BTHCM-TUYEN-NGON',
    title: 'Bác Hồ Viết Tuyên Ngôn Độc Lập',
    subtitle: 'Tái hiện thời khắc lịch sử tại ngôi nhà 48 Hàng Ngang mùa thu năm 1945',
    category: 'BIOGRAPHY',
    categoryLabel: 'Biên niên & Tiểu sử',
    publisher: 'NXB Kim Đồng & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Kiều Mai Sơn (Khảo cứu lịch sử)',
    publishYear: '2021',
    totalPages: 216,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Khảo cứu tường tận quá trình Chủ tịch Hồ Chí Minh soạn thảo bản Tuyên ngôn Độc lập tại căn gác số 48 Hàng Ngang (Hà Nội), lấy ý kiến của các đồng chí trong Trung ương Đảng và hoàn thiện văn kiện khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    tableOfContentsOrChapters: [
      'Chương I: Từ Tân Trào về Hà Nội những ngày mùa thu lịch sử',
      'Chương II: Căn phòng gác hai số 48 Hàng Ngang và ánh đèn đêm soạn thảo văn kiện',
      'Chương III: Trí tuệ uyên bác khi trích dẫn Tuyên ngôn Độc lập của Mỹ và Pháp',
      'Chương IV: Ngày mùng 2 tháng 9 năm 1945 tại Quảng trường Ba Đình rực nắng',
    ],
    keyHistoricalInsights: [
      'Làm sáng rõ tính pháp lý và tầm vóc nhân loại của bản Tuyên ngôn Độc lập năm 1945.',
    ],
    localApplicationForTDM:
      'Tài liệu sinh hoạt truyền thống vào dịp Quốc khánh 2/9 tại các khu phố Phường Thủ Dầu Một.',
    citationStandard:
      'Kiều Mai Sơn: Bác Hồ viết Tuyên ngôn Độc lập, NXB Kim Đồng, Hà Nội, 2021.',
  },
  {
    id: 'mpub_16',
    code: 'BTHCM-SACH-ANH-50N',
    title: 'Sách Ảnh: 50 Năm Thực Hiện Di Chúc Của Chủ Tịch Hồ Chí Minh',
    subtitle: 'Ấn phẩm tư liệu ảnh đặc biệt quy mô song ngữ Việt — Anh',
    category: 'RELICS',
    categoryLabel: 'Bảo vật & Hiện vật',
    publisher: 'NXB Thông tấn & Bảo tàng Hồ Chí Minh',
    authorOrEditor: 'Viện Hồ Chí Minh, BQL Lăng và Bảo tàng Hồ Chí Minh',
    publishYear: '2019',
    totalPages: 320,
    officialSourceUrl: 'https://baotanghochiminh.vn/an-pham-ve-ho-chi-minh.htm',
    summary:
      'Tuyển tập hơn 400 bức ảnh tư liệu lịch sử quý giá ghi lại quá trình Người viết và sửa chữa Di chúc qua các năm từ 1965 đến 1969; cùng những thành tựu vẻ vang của toàn Đảng, toàn dân ta trong 50 năm thực hiện trọn vẹn lời căn dặn thiêng liêng của Người.',
    tableOfContentsOrChapters: [
      'Phần I: Chủ tịch Hồ Chí Minh và tài liệu "Tuyệt đối bí mật" (1965 – 1969)',
      'Phần II: Non sông thu về một mối — Thỏa ước nguyện thiêng liêng của Bác (1969 – 1975)',
      'Phần III: Xây dựng đất nước ta "Đàng hoàng hơn, to đẹp hơn" trong thời kỳ Đổi mới',
    ],
    keyHistoricalInsights: [
      'Minh chứng bằng hình ảnh chân thực về tình cảm thiêng liêng và ý chí sắt đá của Người gửi lại cho muôn đời sau.',
    ],
    localApplicationForTDM:
      'Tài liệu trực quan phong phú cho các cuộc triển lãm ảnh và hội thi trực tuyến về Không gian Văn hóa Hồ Chí Minh tại địa phương.',
    citationStandard:
      'NXB Thông tấn - Bảo tàng Hồ Chí Minh: 50 năm thực hiện Di chúc của Chủ tịch Hồ Chí Minh (1969–2019), Hà Nội, 2019.',
  },
];
