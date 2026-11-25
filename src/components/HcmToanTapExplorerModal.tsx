import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  X,
  FolderOpen,
  BookMarked,
  Copy,
  Check,
  Calendar,
  Layers,
  Sparkles,
  Download,
} from 'lucide-react';

export const HCM_TOAN_TAP_DRIVE_URL =
  'https://drive.google.com/drive/folders/1KrvSjp_Y1RIFsZC56wWqQG1wvx_S9uOs?hl=vi';

export interface ToanTapVolumeDetail {
  volume: number;
  title: string;
  period: string;
  years: [number, number];
  totalPages: number;
  keyWorks: string[];
  description: string;
  coreTheses: string[];
  pdfName: string;
}

export const TOAN_TAP_15_VOLUMES_DETAILS: ToanTapVolumeDetail[] = [
  {
    volume: 1,
    title: 'Hồ Chí Minh Toàn Tập — Tập 1 (1890 – 1925)',
    period: '1890 – 1925',
    years: [1890, 1925],
    totalPages: 536,
    keyWorks: [
      'Bản Yêu sách của nhân dân An Nam (1919)',
      'Tham luận tại Đại hội XVIII Đảng Xã hội Pháp (Tours, 1920)',
      'Các bài viết trên báo Le Paria (Người cùng khổ, 1922–1924)',
      'Báo cáo về phong trào cách mạng thuộc địa tại Quốc tế Cộng sản V (1924)'
    ],
    description:
      'Giai đoạn hình thành tư tưởng yêu nước, xuất dương tìm đường cứu nước, tìm thấy chủ nghĩa Mác – Lênin và hoạt động sôi nổi tại Pháp, Liên Xô, Trung Quốc.',
    coreTheses: [
      'Quyền dân tộc tự quyết và quyền bình đẳng của các dân tộc bị áp bức',
      'Con đường giải phóng dân tộc gắn liền với cách mạng vô sản',
      'Đoàn kết giữa phong trào công nhân chính quốc và phong trào giải phóng thuộc địa'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_1.pdf'
  },
  {
    volume: 2,
    title: 'Hồ Chí Minh Toàn Tập — Tập 2 (1925 – 1930)',
    period: '1925 – 1930',
    years: [1925, 1930],
    totalPages: 574,
    keyWorks: [
      'Bản án chế độ thực dân Pháp (Le Procès de la colonisation française, 1925)',
      'Đường Kách mệnh (1927)',
      'Các bài huấn luyện chính trị trên báo Thanh niên (1925–1927)',
      'Chương trình và điều lệ Hội Việt Nam Cách mạng Thanh niên'
    ],
    description:
      'Chuẩn bị toàn diện về tư tưởng, lý luận, chính trị và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam.',
    coreTheses: [
      'Cách mạng là sự nghiệp của quần chúng công nông',
      'Đảng cách mạng phải có chủ nghĩa làm cốt (chủ nghĩa Mác – Lênin)',
      '23 điều tư cách người cách mạng: Cần, Kiệm, Liêm, Chính'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_2.pdf'
  },
  {
    volume: 3,
    title: 'Hồ Chí Minh Toàn Tập — Tập 3 (1930 – 1945)',
    period: '1930 – 1945',
    years: [1930, 1945],
    totalPages: 642,
    keyWorks: [
      'Chánh cương vắn tắt & Sách lược vắn tắt của Đảng (1930)',
      'Lời kêu gọi nhân dịp thành lập Đảng (03/02/1930)',
      'Ngục trung nhật ký (Nhật ký trong tù, 133 bài thơ, 1942–1943)',
      'Chỉ thị thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (1944)',
      'Nghị quyết Hội nghị Trung ương 8 thành lập Mặt trận Việt Minh (1941)'
    ],
    description:
      'Sáng lập Đảng, vượt qua khủng hoảng lao tù, về nước trực tiếp lãnh đạo cao trào cách mạng tiến tới Cách mạng Tháng Tám.',
    coreTheses: [
      'Đặt quyền lợi dân tộc giải phóng lên trên hết, trước hết',
      'Tập hợp sức mạnh toàn dân trong Mặt trận Việt Minh',
      'Quân đội từ nhân dân mà ra, vì nhân dân mà chiến đấu'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_3.pdf'
  },
  {
    volume: 4,
    title: 'Hồ Chí Minh Toàn Tập — Tập 4 (1945 – 1946)',
    period: '1945 – 1946',
    years: [1945, 1946],
    totalPages: 612,
    keyWorks: [
      'Tuyên ngôn Độc lập (02/09/1945)',
      'Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng (17/10/1945)',
      'Thư gửi các cháu học sinh nhân ngày khai trường đầu tiên (09/1945)',
      'Lời kêu gọi toàn quốc kháng chiến (19/12/1946)',
      'Diễn văn tại Hội nghị Văn hóa toàn quốc lần thứ nhất (24/11/1946)'
    ],
    description:
      'Xây dựng và bảo vệ chính quyền dân chủ nhân dân non trẻ trước thù trong giặc ngoài; thực thi sách lược "Dĩ bất biến, ứng vạn biến".',
    coreTheses: [
      'Nước Việt Nam có quyền hưởng tự do và độc lập',
      'Việc gì lợi cho dân, ta phải hết sức làm; việc gì hại đến dân, ta phải hết sức tránh',
      'Văn hóa soi đường cho quốc dân đi'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_4.pdf'
  },
  {
    volume: 5,
    title: 'Hồ Chí Minh Toàn Tập — Tập 5 (1947 – 1948)',
    period: '1947 – 1948',
    years: [1947, 1948],
    totalPages: 782,
    keyWorks: [
      'Đời sống mới (1947)',
      'Sửa đổi lối làm việc (10/1947)',
      'Lời kêu gọi Thi đua ái quốc (11/06/1948)',
      'Thư gửi Hội nghị Công an toàn quốc (Tư cách người Công an cách mệnh, 1948)'
    ],
    description:
      'Chỉ đạo kháng chiến trường kỳ và kiến quốc, cẩm nang xây dựng Đảng, chỉnh đốn đội ngũ cán bộ và nếp sống văn hóa mới.',
    coreTheses: [
      'Cán bộ là gốc của mọi công việc; muôn việc thành công hoặc thất bại đều do cán bộ tốt hoặc kém',
      'Thi đua là yêu nước, yêu nước thì phải thi đua',
      'Cần kiệm liêm chính chí công vô tư trong đời sống thường nhật'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_5.pdf'
  },
  {
    volume: 6,
    title: 'Hồ Chí Minh Toàn Tập — Tập 6 (1949 – 1950)',
    period: '1949 – 1950',
    years: [1949, 1950],
    totalPages: 596,
    keyWorks: [
      'Bài báo Dân vận trên báo Sự thật (15/10/1949)',
      'Thế nào là Cần, Kiệm, Liêm, Chính (06/1949)',
      'Thư gửi Hội nghị Cán bộ Trung cấp (1949)',
      'Chỉ đạo chiến dịch Biên giới Thu Đông 1950'
    ],
    description:
      'Bước chuyển giai đoạn cách mạng sang phản công, hoàn thiện lý luận về công tác dân vận và đạo đức cách mạng.',
    coreTheses: [
      'Dân vận kém thì việc gì cũng kém; Dân vận khéo thì việc gì cũng thành công',
      'Trời có bốn mùa, Đất có bốn phương, Người có bốn đức Cần Kiệm Liêm Chính',
      'Học để phụng sự Tổ quốc, phụng sự Nhân dân'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_6.pdf'
  },
  {
    volume: 7,
    title: 'Hồ Chí Minh Toàn Tập — Tập 7 (1951 – 1952)',
    period: '1951 – 1952',
    years: [1951, 1952],
    totalPages: 568,
    keyWorks: [
      'Báo cáo chính trị tại Đại hội đại biểu toàn quốc lần thứ II của Đảng (1951)',
      'Phát biểu tại Đại hội Chiến sĩ thi đua toàn quốc lần thứ I (01/05/1952)',
      'Thực hành tiết kiệm và chống tham ô, lãng phí, quan liêu (1952)'
    ],
    description:
      'Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam; phát động phong trào chống "giặc nội xâm" tham ô, lãng phí.',
    coreTheses: [
      'Đảng Lao động Việt Nam là Đảng của giai cấp công nhân và của cả dân tộc',
      'Tham ô, lãng phí và bệnh quan liêu là kẻ thù nguy hiểm của nhân dân',
      'Thi đua ái quốc là đòn bẩy đưa kháng chiến tới thắng lợi'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_7.pdf'
  },
  {
    volume: 8,
    title: 'Hồ Chí Minh Toàn Tập — Tập 8 (1953 – 1954)',
    period: '1953 – 1954',
    years: [1953, 1954],
    totalPages: 614,
    keyWorks: [
      'Chỉ đạo Chiến dịch Điện Biên Phủ (1954)',
      'Thư khen ngợi bộ đội, dân công Điện Biên Phủ (08/05/1954)',
      'Nói chuyện với Đại đoàn Quân Tiên Phong tại Đền Hùng (19/09/1954)',
      'Báo cáo về việc tiếp quản Thủ đô Hà Nội (10/1954)'
    ],
    description:
      'Đỉnh cao chiến thắng Điện Biên Phủ chấn động địa cầu, giải phóng hoàn toàn miền Bắc và tiếp quản Thủ đô.',
    coreTheses: [
      'Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước',
      'Chiến thắng là do sức mạnh toàn dân, toàn diện dưới sự lãnh đạo của Đảng',
      'Giữ gìn phẩm chất bộ đội Cụ Hồ khi tiếp quản thành thị'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_8.pdf'
  },
  {
    volume: 9,
    title: 'Hồ Chí Minh Toàn Tập — Tập 9 (1954 – 1955)',
    period: '1954 – 1955',
    years: [1954, 1955],
    totalPages: 520,
    keyWorks: [
      'Lời kêu gọi nhân ngày giải phóng Thủ đô (10/10/1954)',
      'Thư gửi Hội nghị Cán bộ Y tế toàn quốc (Lương y phải như từ mẫu, 27/02/1955)',
      'Chỉ đạo khôi phục kinh tế, hàn gắn vết thương chiến tranh'
    ],
    description:
      'Xây dựng lại đất nước từ đổ nát chiến tranh, định hình y đức, giáo dục và đại đoàn kết dân tộc.',
    coreTheses: [
      'Thầy thuốc như mẹ hiền — phục vụ sức khỏe nhân dân là nhiệm vụ thiêng liêng',
      'Đoàn kết chặt chẽ mọi tầng lớp nhân dân khôi phục đất nước',
      'Đấu tranh hòa bình thống nhất Tổ quốc theo Hiệp định Genève'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_9.pdf'
  },
  {
    volume: 10,
    title: 'Hồ Chí Minh Toàn Tập — Tập 10 (1955 – 1957)',
    period: '1955 – 1957',
    years: [1955, 1957],
    totalPages: 680,
    keyWorks: [
      'Bài giảng tại Lớp chỉnh huấn trung, cao cấp Bộ Quốc phòng (1956)',
      'Thư gửi đồng bào miền Nam ruột thịt (1956)',
      'Chỉ đạo sửa sai trong cải cách ruộng đất và củng cố Đảng'
    ],
    description:
      'Thẳng thắn nhận khuyết điểm, củng cố niềm tin của nhân dân với Đảng và lãnh đạo hai nhiệm vụ chiến lược hai miền.',
    coreTheses: [
      'Trong bầu trời không gì quý bằng nhân dân; trong thế giới không gì mạnh bằng lực lượng đoàn kết của nhân dân',
      'Một Đảng biết dũng cảm thừa nhận và sửa chữa khuyết điểm là một Đảng tiến bộ, vững mạnh',
      'Miền Nam luôn ở trong trái tim tôi'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_10.pdf'
  },
  {
    volume: 11,
    title: 'Hồ Chí Minh Toàn Tập — Tập 11 (1958 – 1959)',
    period: '1958 – 1959',
    years: [1958, 1959],
    totalPages: 712,
    keyWorks: [
      'Tác phẩm Đạo đức cách mạng (12/1958)',
      'Bài phát biểu tại Lớp học chính trị giáo viên (Vì lợi ích mười năm trồng cây, 1958)',
      'Sống và làm việc tại Nhà sàn gỗ Phủ Chủ tịch (từ tháng 5/1958)',
      'Khởi xướng Tết trồng cây (11/1959)'
    ],
    description:
      'Hệ thống hóa toàn diện chuẩn mực đạo đức cách mạng của người cán bộ, đảng viên trong thời kỳ hòa bình xây dựng CNXH.',
    coreTheses: [
      'Người cách mạng phải có đạo đức cách mạng làm nền tảng, mới hoàn thành được nhiệm vụ vẻ vang',
      'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người',
      'Mùa xuân là Tết trồng cây, làm cho đất nước càng ngày càng xuân'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_11.pdf'
  },
  {
    volume: 12,
    title: 'Hồ Chí Minh Toàn Tập — Tập 12 (1959 – 1960)',
    period: '1959 – 1960',
    years: [1959, 1960],
    totalPages: 748,
    keyWorks: [
      'Diễn văn khai mạc Đại hội đại biểu toàn quốc lần thứ III của Đảng (1960)',
      'Báo cáo về Dự thảo Hiến pháp sửa đổi (Hiến pháp 1959)',
      'Bài nói chuyện tại Lễ kỷ niệm 30 năm Ngày thành lập Đảng'
    ],
    description:
      'Xác định đường lối chiến lược cách mạng hai miền; Hiến pháp XHCN đầu tiên của Việt Nam.',
    coreTheses: [
      'Đảng ta là đạo đức, là văn minh, là thống nhất, độc lập, là hòa bình ấm no',
      'Xây dựng CNXH ở miền Bắc là hậu phương vững chắc giải phóng miền Nam',
      'Củng cố quyền làm chủ tập thể của nhân dân lao động'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_12.pdf'
  },
  {
    volume: 13,
    title: 'Hồ Chí Minh Toàn Tập — Tập 13 (1961 – 1962)',
    period: '1961 – 1962',
    years: [1961, 1962],
    totalPages: 694,
    keyWorks: [
      'Phát biểu tại Hội nghị mở rộng Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam (1962)',
      'Phát động phong trào "Người tốt, việc tốt"',
      'Chỉ thị chăm lo bồi dưỡng thiếu niên, nhi đồng (5 Điều Bác Hồ dạy)'
    ],
    description:
      'Xây dựng khối đại đoàn kết toàn dân, giáo dục đạo đức thế hệ măng non và phát huy phong trào gương mẫu cơ sở.',
    coreTheses: [
      'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công',
      'Yêu Tổ quốc, yêu đồng bào; Học tập tốt, lao động tốt; Đoàn kết tốt, kỷ luật tốt',
      'Lấy gương người tốt việc tốt hằng ngày để giáo dục lẫn nhau'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_13.pdf'
  },
  {
    volume: 14,
    title: 'Hồ Chí Minh Toàn Tập — Tập 14 (1963 – 1965)',
    period: '1963 – 1965',
    years: [1963, 1965],
    totalPages: 736,
    keyWorks: [
      'Báo cáo tại Hội nghị Chính trị đặc biệt (27/03/1964)',
      'Bắt đầu soạn thảo Di chúc lịch sử (tháng 5/1965)',
      'Kêu gọi toàn dân đánh thắng giặc Mỹ xâm lược'
    ],
    description:
      'Thời điểm mở đầu cuộc kháng chiến chống Mỹ trên quy mô cả nước; Bác đặt bút viết những dòng Di chúc thiêng liêng đầu tiên.',
    coreTheses: [
      'Mỗi người chúng ta hãy làm việc bằng hai để đền đáp lại đồng bào miền Nam ruột thịt',
      'Dù khó khăn gian khổ đến mấy, nhân dân ta nhất định sẽ hoàn toàn thắng lợi',
      'Đảng phải luôn luôn chăm lo đời sống của nhân dân'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_14.pdf'
  },
  {
    volume: 15,
    title: 'Hồ Chí Minh Toàn Tập — Tập 15 (1965 – 1969)',
    period: '1965 – 1969',
    years: [1965, 1969],
    totalPages: 724,
    keyWorks: [
      'Lời kêu gọi đồng bào và chiến sĩ cả nước (17/07/1966)',
      'Bài viết "Nâng cao đạo đức cách mạng, quét sạch chủ nghĩa cá nhân" (03/02/1969)',
      'Thư khen quân và dân miền Nam đánh thắng cuộc Tổng tiến công Tết Mậu Thân 1968',
      'Bản Di chúc lịch sử của Chủ tịch Hồ Chí Minh (1965–1969)'
    ],
    description:
      'Đỉnh cao tư tưởng và đạo đức Hồ Chí Minh; kiệt tác Di chúc dặn dò toàn Đảng, toàn quân, toàn dân trước lúc đi xa.',
    coreTheses: [
      'Không có gì quý hơn độc lập, tự do',
      'Quét sạch chủ nghĩa cá nhân — giặc nội xâm nguy hiểm nhất',
      'Trước hết nói về Đảng: phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình',
      'Điều mong muốn cuối cùng của tôi là: Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh'
    ],
    pdfName: 'Ho_Chi_Minh_Toan_Tap_Tap_15.pdf'
  }
];

interface HcmToanTapExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCardGenerator?: (quoteText: string, quoteSource: string) => void;
}

export const HcmToanTapExplorerModal: React.FC<HcmToanTapExplorerModalProps> = ({
  isOpen,
  onClose,
  onOpenCardGenerator,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredVolumes = useMemo(() => {
    if (!searchTerm.trim()) return TOAN_TAP_15_VOLUMES_DETAILS;
    const q = searchTerm.toLowerCase();
    return TOAN_TAP_15_VOLUMES_DETAILS.filter(
      (vol) =>
        vol.title.toLowerCase().includes(q) ||
        vol.period.toLowerCase().includes(q) ||
        vol.description.toLowerCase().includes(q) ||
        vol.keyWorks.some((w) => w.toLowerCase().includes(q)) ||
        vol.coreTheses.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  const activeVol = useMemo(() => {
    if (selectedVolume !== null) {
      return TOAN_TAP_15_VOLUMES_DETAILS.find((v) => v.volume === selectedVolume) || null;
    }
    return filteredVolumes[0] || TOAN_TAP_15_VOLUMES_DETAILS[0];
  }, [selectedVolume, filteredVolumes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyCitation = (vol: ToanTapVolumeDetail) => {
    const text = `Hồ Chí Minh Toàn tập, Tập ${vol.volume} (${vol.period}), Nhà xuất bản Chính trị quốc gia Sự thật, Hà Nội, 2011 (${vol.totalPages} trang).`;
    navigator.clipboard.writeText(text);
    setCopiedText(`vol-${vol.volume}`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-800 via-rose-700 to-red-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-amber-300/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-rose-950 flex items-center justify-center font-black shadow-xs shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-amber-200 bg-black/30 px-2 py-0.5 rounded-md">
                  NXB Chính Trị Quốc Gia Sự Thật (2011)
                </span>
                <span className="bg-amber-400 text-rose-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  15 Tập Chuẩn Mực
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black font-serif text-white tracking-tight mt-0.5">
                Tra Cứu Hồ Chí Minh Toàn Tập &amp; Kho Tư Liệu Số Google Drive
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={HCM_TOAN_TAP_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-rose-950 font-black text-xs transition shadow-xs cursor-pointer"
              title="Mở thư mục Google Drive chứa trọn bộ 15 tập PDF"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Mở Kho Google Drive (15 Tập)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-amber-100 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tác phẩm, chủ đề, mốc năm, luận điểm trong 15 tập..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-600">
            Hiển thị <strong className="text-red-700">{filteredVolumes.length}</strong> / 15 tập
          </span>
        </div>

        {/* 2-Column Explorer Content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Column: Volume Navigation List (4 cols) */}
          <div className="lg:col-span-4 border-r border-slate-200 overflow-y-auto p-3 sm:p-4 space-y-2 bg-slate-50/50">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
              Danh mục 15 Tập Hồ Chí Minh Toàn Tập
            </p>

            <div className="space-y-1.5">
              {filteredVolumes.map((vol) => {
                const isSelected = activeVol?.volume === vol.volume;
                return (
                  <button
                    key={vol.volume}
                    type="button"
                    onClick={() => setSelectedVolume(vol.volume)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-red-700 text-white border-red-800 shadow-md ring-2 ring-red-700/30'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-black px-1.5 py-0.5 rounded-md ${
                            isSelected ? 'bg-red-900 text-yellow-300' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          Tập {vol.volume}
                        </span>
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-amber-200' : 'text-slate-500'}`}>
                          ({vol.period})
                        </span>
                      </div>
                      <p className={`text-xs font-bold truncate mt-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {vol.keyWorks[0]}
                      </p>
                    </div>

                    <span className={`text-[10px] font-mono shrink-0 ${isSelected ? 'text-amber-200' : 'text-slate-400'}`}>
                      {vol.totalPages} tr.
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Volume Deep Details (8 cols) */}
          {activeVol && (
            <div className="lg:col-span-8 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white">
              {/* Header of Active Volume */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-red-700 text-white font-black text-xs px-2.5 py-1 font-mono">
                      TẬP {activeVol.volume}
                    </span>
                    <span className="rounded-md bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 border border-amber-300">
                      Giai đoạn: {activeVol.period}
                    </span>
                    <span className="text-slate-500 text-xs font-semibold">
                      Quy mô: {activeVol.totalPages} trang
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif mt-1.5 leading-snug">
                    {activeVol.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyCitation(activeVol)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    title="Sao chép trích dẫn Cấp A chuẩn mực"
                  >
                    {copiedText === `vol-${activeVol.volume}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Sao chép trích dẫn</span>
                      </>
                    )}
                  </button>

                  <a
                    href={HCM_TOAN_TAP_DRIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Đọc Tập {activeVol.volume} trên Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Mô tả tổng quan */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-1">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Bối cảnh lịch sử &amp; Ý nghĩa lý luận
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {activeVol.description}
                </p>
              </div>

              {/* Tác phẩm then chốt trong tập */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-rose-700" /> Các tác phẩm &amp; văn kiện nổi bật trong tập này:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeVol.keyWorks.map((work, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-400 transition-all flex items-start gap-2 shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs font-bold text-slate-900 leading-snug">{work}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Các luận điểm cốt lõi */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-700" /> Luận điểm tư tưởng cốt lõi:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeVol.coreTheses.map((thesis, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-700 font-bold shrink-0">★</span>
                      <span className="leading-relaxed">{thesis}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Citation Bar */}
              <div className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-[11px] text-slate-600 shrink-0">
                <span className="leading-snug">
                  <strong className="text-slate-800">Nguồn trích dẫn chuẩn:</strong> Hồ Chí Minh Toàn tập, Tập {activeVol.volume}, NXB Chính trị quốc gia Sự thật, Hà Nội, 2011.
                </span>
                <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                  Mã file: {activeVol.pdfName}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
