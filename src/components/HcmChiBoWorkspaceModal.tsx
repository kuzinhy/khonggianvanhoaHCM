import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Award,
  BookOpen,
  FileText,
  Printer,
  X,
  Sparkles,
  ShieldCheck,
  Download,
  Users,
  ChevronRight,
  ClipboardCheck,
} from 'lucide-react';

interface HcmChiBoWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCardGenerator?: (quoteText: string, quoteSource: string) => void;
  onOpenBulletinModal?: () => void;
}

export interface MonthlyThemeGuide {
  month: number;
  themeTitle: string;
  focusCore: string;
  keyQuote: string;
  quoteSource: string;
  studyDocuments: string[];
  discussionQuestions: string[];
  actionModel: string;
}

export const CHI_BO_12_MONTHLY_THEMES: MonthlyThemeGuide[] = [
  {
    month: 1,
    themeTitle: 'Đảng ta là đạo đức, là văn minh — Tự soi, tự sửa đầu năm',
    focusCore: 'Quy định 144-QĐ/TW (Điều 1) & Nêu cao tính tiên phong của Đảng viên',
    keyQuote: 'Đảng ta là một Đảng cầm quyền. Mỗi đảng viên và cán bộ phải thật sự thấm nhuần đạo đức cách mạng, thật sự cần kiệm liêm chính, chí công vô tư.',
    quoteSource: 'Di chúc của Chủ tịch Hồ Chí Minh (1969) · Toàn tập, Tập 15, tr. 622',
    studyDocuments: ['Di chúc Bác Hồ', 'Quy định số 144-QĐ/TW', 'Chỉ thị số 07-CT/TW'],
    discussionQuestions: [
      'Đảng viên trong chi bộ đã thực hiện trách nhiệm nêu gương trước quần chúng nhân dân ra sao?',
      'Những biểu hiện nể nang, ngại va chạm trong sinh hoạt chi bộ cần khắc phục thế nào?'
    ],
    actionModel: 'Chi bộ xây dựng danh sách các việc làm cụ thể học Bác trong năm của từng đảng viên.'
  },
  {
    month: 2,
    themeTitle: 'Mừng Đảng quang vinh, mừng Xuân đổi mới — Tự hào lịch sử 96 năm vẻ vang',
    focusCore: 'Lý tưởng độc lập dân tộc gắn liền với CNXH & Trách nhiệm với cơ sở',
    keyQuote: 'Đảng không phải là một tổ chức để làm quan phát tài. Đảng phải làm tròn nhiệm vụ giải phóng dân tộc, làm cho Tổ quốc giàu mạnh, đồng bào sung sướng.',
    quoteSource: 'Hồ Chí Minh Toàn tập, Tập 5, tr. 289',
    studyDocuments: ['Chánh cương vắn tắt (1930)', 'Bài báo Nâng cao đạo đức cách mạng (03/02/1969)'],
    discussionQuestions: [
      'Ý thức giữ gìn danh dự người cộng sản trong công tác và đời sống gia đình.',
      'Chi bộ tổ chức chăm lo Tết cho các hộ gia đình chính sách, khó khăn như thế nào?'
    ],
    actionModel: 'Tổ chức lễ trao Huy hiệu Đảng và tuyên dương các đảng viên hoàn thành xuất sắc nhiệm vụ.'
  },
  {
    month: 3,
    themeTitle: 'Thanh niên là rường cột nước nhà — Bồi dưỡng thế hệ cách mạng cho đời sau',
    focusCore: 'Chỉ thị 07-CT/TW về lan tỏa không gian văn hóa Hồ Chí Minh trong giới trẻ',
    keyQuote: 'Thanh niên là người chủ tương lai của nước nhà. Nước nhà thịnh hay suy, yếu hay mạnh một phần lớn là do các thanh niên.',
    quoteSource: 'Thư gửi các bạn thanh niên (1947) · Toàn tập, Tập 5, tr. 216',
    studyDocuments: ['Thư gửi thanh niên', 'Nghị quyết của Đảng bộ về công tác thanh niên'],
    discussionQuestions: [
      'Làm thế nào để thu hút đoàn viên, thanh niên khu phố tham gia sinh hoạt không gian văn hóa số?',
      'Công tác phát triển đảng viên mới từ lực lượng thanh niên, sinh viên và công nhân lao động.'
    ],
    actionModel: 'Phối hợp Đoàn Thanh niên phường tổ chức cuộc thi trực tuyến tìm hiểu lịch sử Bác Hồ.'
  },
  {
    month: 4,
    themeTitle: 'Đại thắng mùa Xuân 1975 — Sức mạnh của khối đại đoàn kết toàn dân tộc',
    focusCore: 'Tư tưởng đại đoàn kết & Thực hiện công tác dân vận trong tình hình mới',
    keyQuote: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.',
    quoteSource: 'Nói chuyện tại Đại hội Mặt trận Tổ quốc Việt Nam (1962) · Toàn tập, Tập 13, tr. 119',
    studyDocuments: ['Báo cáo chính trị Đại hội II', 'Hồ Chí Minh về Đại đoàn kết dân tộc'],
    discussionQuestions: [
      'Phát huy dân chủ cơ sở trong việc bàn bạc các công trình nâng cấp hẻm, chỉnh trang đô thị.',
      'Tập hợp và lắng nghe ý kiến đóng góp của nhân dân đối với cán bộ, công chức.'
    ],
    actionModel: 'Tổ chức ngày hội "Phố văn minh - Nghĩa tình Bác Hồ", vận động 100% hộ dân treo cờ Tổ quốc.'
  },
  {
    month: 5,
    themeTitle: 'Kỷ niệm 136 năm Ngày sinh Chủ tịch Hồ Chí Minh (19/05/1890 – 19/05/2026)',
    focusCore: 'Sơ kết 6 tháng học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh',
    keyQuote: 'Học Bác không phải là học những điều cao xa, mà là học từ những việc làm giản dị hằng ngày: cần, kiệm, liêm, chính, nói đi đôi với làm.',
    quoteSource: 'Nói chuyện với cán bộ đảng viên (1960) · Toàn tập, Tập 12, tr. 517',
    studyDocuments: ['Hồ Chí Minh Biên niên tiểu sử', 'Bản cam kết tu dưỡng rèn luyện của đảng viên'],
    discussionQuestions: [
      'Đánh giá tiến độ thực hiện bản cam kết tu dưỡng của từng đồng chí cấp ủy và đảng viên.',
      'Nhân rộng các mô hình, điển hình tiên tiến trong học tập lời Bác dạy.'
    ],
    actionModel: 'Tổ chức sinh hoạt chuyên đề tại Không Gian Văn Hóa Hồ Chí Minh và dâng hoa tưởng niệm.'
  },
  {
    month: 6,
    themeTitle: 'Thi đua ái quốc — Thực hành Cần, Kiệm, Liêm, Chính theo Quy định 144',
    focusCore: 'Quy định 144-QĐ/TW (Điều 3): Cần, kiệm, liêm, chính, chí công vô tư',
    keyQuote: 'Trời có bốn mùa: Xuân, Hạ, Thu, Đông. Đất có bốn phương: Đông, Tây, Nam, Bắc. Người có bốn đức: Cần, Kiệm, Liêm, Chính. Thiếu một đức, thì không thành người.',
    quoteSource: 'Tác phẩm Thế nào là Cần, Kiệm, Liêm, Chính (1949) · Toàn tập, Tập 6, tr. 117',
    studyDocuments: ['Thế nào là Cần, Kiệm, Liêm, Chính', 'Quy định 144-QĐ/TW'],
    discussionQuestions: [
      'Thực hành tiết kiệm, chống lãng phí thời gian, kinh phí và tài sản công trong chi bộ.',
      'Tiêu chí liêm chính của đảng viên khi giải quyết các thủ tục hành chính cho dân.'
    ],
    actionModel: 'Mỗi đảng viên tự rà soát việc sử dụng điện, nước, văn phòng phẩm và lối sống tiết kiệm.'
  },
  {
    month: 7,
    themeTitle: 'Uống nước nhớ nguồn — Đền ơn đáp nghĩa với thương binh, liệt sĩ',
    focusCore: 'Đạo lý nhân nghĩa Hồ Chí Minh & Công tác an sinh xã hội cơ sở',
    keyQuote: 'Thương binh, gia đình liệt sĩ là những người có công với Tổ quốc, với nhân dân. Cho nên bổn phận chúng ta là phải biết ơn, phải yêu thương và giúp đỡ họ.',
    quoteSource: 'Thư gửi Ban vận động Ngày Thương binh liệt sĩ (1947) · Toàn tập, Tập 5, tr. 204',
    studyDocuments: ['Thư Bác Hồ gửi các thương binh', 'Kế hoạch an sinh xã hội phường'],
    discussionQuestions: [
      'Chi bộ đã nắm chắc danh sách các gia đình chính sách, Mẹ Việt Nam Anh hùng trên địa bàn chưa?',
      'Giải pháp giúp đỡ con em thương binh, gia đình khó khăn vượt khó vươn lên.'
    ],
    actionModel: 'Tổ chức thăm hỏi, tặng quà các gia đình thương binh liệt sĩ tại khu phố.'
  },
  {
    month: 8,
    themeTitle: 'Cách mạng Tháng Tám và bài học Dân là gốc — Dân vận khéo thì việc gì cũng thành',
    focusCore: 'Tác phẩm "Dân vận" (1949) & Phát huy quyền làm chủ của nhân dân',
    keyQuote: 'Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân. Công cuộc đổi mới, xây dựng là trách nhiệm của dân. Sự nghiệp kháng chiến, kiến quốc là công việc của dân.',
    quoteSource: 'Bài báo Dân vận (15/10/1949) · Toàn tập, Tập 6, tr. 232',
    studyDocuments: ['Bài báo Dân vận', 'Luật Thực hiện dân chủ ở cơ sở'],
    discussionQuestions: [
      'Đảng viên phụ trách hộ gia đình đã thực hiện phương châm "nghe dân nói, nói dân hiểu, làm dân tin" như thế nào?',
      'Cách thức vận động nhân dân đồng thuận trong các chủ trương mới của địa phương.'
    ],
    actionModel: 'Xây dựng 01 mô hình "Tổ dân vận khéo" giải quyết dứt điểm 01 vấn đề bức xúc ở khu phố.'
  },
  {
    month: 9,
    themeTitle: 'Khắc ghi Di chúc của Chủ tịch Hồ Chí Minh — Đoàn kết, kỷ cương, tình thương',
    focusCore: 'Quy định 144-QĐ/TW (Điều 4) & Giữ gìn sự đoàn kết thống nhất trong Đảng',
    keyQuote: 'Đoàn kết là một truyền thống cực kỳ báu của Đảng và của dân ta, các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.',
    quoteSource: 'Di chúc của Chủ tịch Hồ Chí Minh (1969) · Toàn tập, Tập 15, tr. 622',
    studyDocuments: ['Bảo vật quốc gia: Di chúc Chủ tịch Hồ Chí Minh (1965–1969)'],
    discussionQuestions: [
      'Tinh thần tự phê bình và phê bình trong chi bộ: Đã thực sự thẳng thắn, chân thành, có tình đồng chí chưa?',
      'Khắc phục biểu hiện bằng mặt nhưng không bằng lòng, chia rẽ nội bộ.'
    ],
    actionModel: 'Chi bộ tổ chức đọc lại toàn văn Di chúc và thảo luận sâu về công tác xây dựng Đảng.'
  },
  {
    month: 10,
    themeTitle: 'Dân vận khéo và nếp sống văn minh đô thị — Xây dựng khu phố văn hóa',
    focusCore: 'Xây dựng đô thị văn minh, bảo vệ môi trường và trật tự an toàn',
    keyQuote: 'Muốn người ta theo mình, thì mình phải làm gương mẫu. Miệng nói tay làm, tai nghe mắt thấy.',
    quoteSource: 'Hồ Chí Minh Toàn tập, Tập 5, tr. 320',
    studyDocuments: ['Chỉ thị 07-CT/TW', 'Quy ước khu phố văn hóa'],
    discussionQuestions: [
      'Đảng viên gương mẫu đi đầu trong việc giữ gìn vệ sinh môi trường, không lấn chiếm lòng lề đường.',
      'Phát hiện và nhân rộng các gương "Người tốt, việc tốt" ở từng hẻm phố.'
    ],
    actionModel: 'Phát động ngày Chủ nhật xanh, tổng vệ sinh các tuyến hẻm và lắp camera an ninh.'
  },
  {
    month: 11,
    themeTitle: 'Văn hóa soi đường cho quốc dân đi — Phát triển không gian văn hóa Hồ Chí Minh',
    focusCore: 'Chỉ thị số 07-CT/TW ngày 13/7/2026 của Bộ Chính trị',
    keyQuote: 'Văn hóa phải soi đường cho quốc dân đi. Văn hóa lãnh đạo quốc dân để thực hiện độc lập, tự cường và tự do.',
    quoteSource: 'Diễn văn tại Hội nghị Văn hóa toàn quốc (24/11/1946) · Toàn tập, Tập 4, tr. 516',
    studyDocuments: ['Chỉ thị số 07-CT/TW', 'Nghị quyết Đại hội Đảng bộ Phường Thủ Dầu Một'],
    discussionQuestions: [
      'Đánh giá hiệu quả hoạt động của Không Gian Văn Hóa Hồ Chí Minh tại cơ sở trong năm qua.',
      'Làm thế nào để tư tưởng, đạo đức của Bác thấm sâu vào nếp nghĩ, cách làm của từng người dân?'
    ],
    actionModel: 'Bình chọn và biểu dương "Gia đình văn hóa tiêu biểu học tập và làm theo Bác".'
  },
  {
    month: 12,
    themeTitle: 'Tổng kết công tác Đảng năm 2026 — Đánh giá, xếp loại đảng viên công tâm, thực chất',
    focusCore: 'Bộ 5 chuẩn mực Quy định 144-QĐ/TW & Tự soi, tự sửa cuối năm',
    keyQuote: 'Cán bộ tốt thì việc gì cũng thành công. Phải có thái độ khách quan, công tâm khi đánh giá cán bộ, đảng viên, chống chủ nghĩa cá nhân.',
    quoteSource: 'Tác phẩm Sửa đổi lối làm việc (1947) · Toàn tập, Tập 5, tr. 312',
    studyDocuments: ['Hướng dẫn đánh giá xếp loại đảng viên của Ban Tổ chức Trung ương', 'Quy định 144-QĐ/TW'],
    discussionQuestions: [
      'Đánh giá đúng mức ưu điểm, chỉ rõ khuyết điểm của từng đồng chí trong năm 2026.',
      'Đề ra phương hướng, giải pháp khắc phục khuyết điểm trong năm 2027.'
    ],
    actionModel: 'Hoàn thành hồ sơ chấm điểm Quy định 144 và tổng kết biểu dương chi bộ xuất sắc.'
  }
];

export const HcmChiBoWorkspaceModal: React.FC<HcmChiBoWorkspaceModalProps> = ({
  isOpen,
  onClose,
  onOpenCardGenerator,
  onOpenBulletinModal,
}) => {
  const [activeTab, setActiveTab] = useState<'THEMES' | 'SELF_EVAL' | 'COMMITMENT'>('THEMES');
  const [selectedMonth, setSelectedMonth] = useState<number>(11);

  // Phiếu tự đánh giá Quy định 144
  const [partyMemberName, setPartyMemberName] = useState('');
  const [partyCellName, setPartyCellName] = useState('Chi bộ Khu phố 1');
  const [scores, setScores] = useState({
    std1: 9, // Yêu nước, trung thành
    std2: 9, // Bản lĩnh, đổi mới sáng tạo
    std3: 9, // Cần kiệm liêm chính
    std4: 9, // Đoàn kết kỷ cương
    std5: 9, // Gương mẫu khiêm tốn
  });

  if (!isOpen) return null;

  const totalScore = scores.std1 + scores.std2 + scores.std3 + scores.std4 + scores.std5;
  const evaluationRank =
    totalScore >= 45
      ? 'Hoàn thành xuất sắc nhiệm vụ'
      : totalScore >= 40
      ? 'Hoàn thành tốt nhiệm vụ'
      : totalScore >= 30
      ? 'Hoàn thành nhiệm vụ'
      : 'Cần tu dưỡng rèn luyện thêm';

  const currentTheme =
    CHI_BO_12_MONTHLY_THEMES.find((t) => t.month === selectedMonth) ||
    CHI_BO_12_MONTHLY_THEMES[10];

  const handlePrintEvaluation = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-800 via-rose-700 to-red-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-amber-300/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-rose-950 flex items-center justify-center font-black shadow-xs shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-amber-200 bg-black/30 px-2 py-0.5 rounded-md">
                  Nghiệp Vụ Đảng Cơ Sở · Năm 2026
                </span>
                <span className="bg-amber-400 text-rose-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  Chỉ Thị 07 &amp; QĐ 144
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black font-serif text-white tracking-tight mt-0.5">
                Bộ Tiện Ích &amp; Nghiệp Vụ Sinh Hoạt Chi Bộ Điện Tử
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenBulletinModal && (
              <button
                type="button"
                onClick={onOpenBulletinModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-rose-950 font-black text-xs transition shadow-xs cursor-pointer"
                title="Mở bản tin sinh hoạt chi bộ để in phát tại cuộc họp"
              >
                <FileText className="w-4 h-4" />
                <span>In Bản Tin Chi Bộ</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-black/30 hover:bg-black/50 text-amber-100 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('THEMES')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'THEMES'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>12 Chuyên Đề Sinh Hoạt (Theo Tháng)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SELF_EVAL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'SELF_EVAL'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Phiếu Chấm Điểm QĐ 144 (50 Điểm)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('COMMITMENT')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'COMMITMENT'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Bản Cam Kết Tu Dưỡng Đảng Viên 2026</span>
          </button>
        </div>

        {/* Tab 1: 12 Chuyên đề sinh hoạt chi bộ */}
        {activeTab === 'THEMES' && (
          <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
            {/* Month selector list */}
            <div className="lg:col-span-4 border-r border-slate-200 overflow-y-auto p-3 sm:p-4 space-y-1.5 bg-slate-50/50">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-2">
                Chọn tháng sinh hoạt chuyên đề
              </p>
              {CHI_BO_12_MONTHLY_THEMES.map((theme) => {
                const isSelected = selectedMonth === theme.month;
                return (
                  <button
                    key={theme.month}
                    type="button"
                    onClick={() => setSelectedMonth(theme.month)}
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
                          Tháng {theme.month}
                        </span>
                      </div>
                      <p className={`text-xs font-bold truncate mt-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {theme.themeTitle}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-200' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Month Guide Details */}
            <div className="lg:col-span-8 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white">
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-red-700 text-white font-black text-xs px-2.5 py-1">
                    CHUYÊN ĐỀ THÁNG {currentTheme.month} / 2026
                  </span>
                  <span className="rounded-md bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 border border-amber-300">
                    {currentTheme.focusCore}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black font-serif text-slate-900 mt-2 leading-snug">
                  {currentTheme.themeTitle}
                </h4>
              </div>

              {/* Lời Bác Dạy Trọng Tâm */}
              <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Lời Bác Dạy Trọng Tâm Của Tháng
                  </span>
                  {onOpenCardGenerator && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenCardGenerator(currentTheme.keyQuote, currentTheme.quoteSource)
                      }
                      className="text-[11px] font-bold text-red-700 hover:text-red-800 underline cursor-pointer"
                    >
                      Tạo thiệp chia sẻ →
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-bold font-serif text-amber-950 italic leading-relaxed">
                  “{currentTheme.keyQuote}”
                </p>
                <p className="text-[11px] text-amber-800 italic">
                  Nguồn: {currentTheme.quoteSource}
                </p>
              </div>

              {/* Tài liệu học tập & chuẩn bị */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" /> Tài liệu học tập &amp; tham chiếu:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentTheme.studyDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold"
                    >
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Câu hỏi gợi mở thảo luận tại cuộc họp chi bộ */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-700" /> Câu hỏi gợi ý thảo luận tại buổi sinh hoạt:
                </h5>
                <div className="space-y-2">
                  {currentTheme.discussionQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-semibold leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mô hình hành động thực tiễn */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" /> Mô hình hành động cụ thể tại khu phố:
                </span>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {currentTheme.actionModel}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Phiếu tự đánh giá Quy định 144 */}
        {activeTab === 'SELF_EVAL' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h4 className="text-base sm:text-lg font-black font-serif text-slate-900">
                  Phiếu Tự Đánh Giá Tu Dưỡng Đạo Đức Đảng Viên Theo Quy Định 144-QĐ/TW
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  5 Chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới (Thang điểm 50)
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrintEvaluation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In Phiếu Đánh Giá A4</span>
              </button>
            </div>

            {/* Thông tin đảng viên */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Họ và tên đảng viên:
                </label>
                <input
                  type="text"
                  value={partyMemberName}
                  onChange={(e) => setPartyMemberName(e.target.value)}
                  placeholder="Nhập họ và tên..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Chi bộ trực thuộc:
                </label>
                <input
                  type="text"
                  value={partyCellName}
                  onChange={(e) => setPartyCellName(e.target.value)}
                  placeholder="Ví dụ: Chi bộ Khu phố 1..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                />
              </div>
            </div>

            {/* 5 Tiêu chuẩn chấm điểm */}
            <div className="space-y-3">
              {[
                {
                  key: 'std1',
                  label: 'Điều 1. Yêu nước, tôn trọng Nhân dân, tuyệt đối trung thành với Đảng, với Tổ quốc',
                  desc: 'Kiên định chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh. Luôn đặt lợi ích quốc gia - dân tộc lên trên hết. Tôn trọng và phục vụ Nhân dân.',
                },
                {
                  key: 'std2',
                  label: 'Điều 2. Bản lĩnh, đổi mới, sáng tạo, hội nhập',
                  desc: 'Dám nghĩ, dám nói, dám làm, dám chịu trách nhiệm, dám đổi mới sáng tạo, đương đầu khó khăn vì lợi ích chung.',
                },
                {
                  key: 'std3',
                  label: 'Điều 3. Cần, kiệm, liêm, chính, chí công vô tư',
                  desc: 'Trung thực, liêm khiết, không tham nhũng, lãng phí, tiêu cực. Không lợi dụng chức vụ, quyền hạn vụ lợi cá nhân hay gia đình.',
                },
                {
                  key: 'std4',
                  label: 'Điều 4. Đoàn kết, kỷ cương, tình thương, trách nhiệm',
                  desc: 'Giữ gìn đoàn kết thống nhất trong Đảng. Nêu cao tinh thần kỷ luật, kỷ cương. Yêu thương đồng chí, tôn trọng nhân dân.',
                },
                {
                  key: 'std5',
                  label: 'Điều 5. Gương mẫu, khiêm tốn, tu dưỡng rèn luyện, học tập suốt đời',
                  desc: 'Thực hiện nói đi đôi với làm. Giữ nếp sống giản dị, khiêm tốn. Tích cực học tập nâng cao trình độ, năng lực chuyên môn.',
                },
              ].map((item, idx) => {
                const currentScore = scores[item.key as keyof typeof scores];
                return (
                  <div
                    key={item.key}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 transition shadow-2xs space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.label}
                      </h5>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-600">Điểm tự chấm:</span>
                        <select
                          value={currentScore}
                          onChange={(e) =>
                            setScores({ ...scores, [item.key]: Number(e.target.value) })
                          }
                          className="font-black text-xs text-red-700 bg-slate-100 border border-slate-300 rounded-lg py-1 px-2 cursor-pointer"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((s) => (
                            <option key={s} value={s}>
                              {s} / 10 điểm
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Tổng điểm & Xếp loại */}
            <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-600">Tổng điểm tự đánh giá:</p>
                <div className="text-2xl sm:text-3xl font-black text-red-700 font-serif">
                  {totalScore} <span className="text-sm font-normal text-slate-500">/ 50 điểm</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-600">Kết quả dự kiến xếp loại:</p>
                <div className="text-base sm:text-lg font-black text-emerald-800">
                  {evaluationRank}
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Đã ghi nhận kết quả tự chấm điểm: ${totalScore}/50 điểm (${evaluationRank}). Vui lòng bấm In Phiếu để nộp Chi bộ!`)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Lưu Kết Quả Đánh Giá
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Bản cam kết tu dưỡng rèn luyện */}
        {activeTab === 'COMMITMENT' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h4 className="text-base sm:text-lg font-black font-serif text-slate-900">
                  Bản Cam Kết Tu Dưỡng, Rèn Luyện, Phấn Đấu Năm 2026
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Thực hiện Nghị quyết Trung ương 4 khóa XII, Kết luận số 21-KL/TW và Quy định số 144-QĐ/TW
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrintEvaluation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In Bản Cam Kết A4</span>
              </button>
            </div>

            <div className="max-w-2xl mx-auto space-y-4 text-xs text-slate-800 leading-relaxed border border-slate-200 p-6 rounded-2xl bg-slate-50/50 shadow-xs">
              <div className="text-center space-y-1 pb-3 border-b border-slate-300">
                <p className="font-black text-xs uppercase tracking-wider">ĐẢNG CỘNG SẢN VIỆT NAM</p>
                <p className="font-bold text-sm text-red-700 uppercase">
                  BẢN CAM KẾT TU DƯỠNG, RÈN LUYỆN, PHẤN ĐẤU NĂM 2026
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <strong>Kính gửi:</strong> Chi ủy Chi bộ {partyCellName || 'Khu phố 1'} — Đảng ủy Phường Thủ Dầu Một
                </p>
                <p>
                  Tôi tên là: <strong>{partyMemberName || '...................................................'}</strong>. Sinh hoạt tại Chi bộ: <strong>{partyCellName}</strong>.
                </p>
              </div>

              <p className="font-bold">Tôi xin cam kết thực hiện nghiêm túc các nội dung sau:</p>

              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Về tư tưởng chính trị:</strong> Tuyệt đối trung thành với chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh; kiên định mục tiêu độc lập dân tộc gắn liền với CNXH; chấp hành nghiêm Điều lệ Đảng và đường lối, chính sách của Đảng, pháp luật của Nhà nước.
                </li>
                <li>
                  <strong>Về phẩm chất đạo đức, lối sống:</strong> Luôn rèn luyện đạo đức cách mạng theo 5 chuẩn mực của Quy định số 144-QĐ/TW; thực hành cần, kiệm, liêm, chính; không vi phạm 19 điều đảng viên không được làm; kiên quyết đấu tranh chống chủ nghĩa cá nhân, quan liêu, tham nhũng, lãng phí.
                </li>
                <li>
                  <strong>Về trách nhiệm nêu gương:</strong> Gương mẫu trong công tác và đời sống khu dân cư; tích cực tham gia các phong trào thi đua yêu nước, xây dựng đô thị văn minh, xây dựng Không Gian Văn Hóa Hồ Chí Minh tại khu phố.
                </li>
                <li>
                  <strong>Về mối quan hệ với Nhân dân:</strong> Giữ mối liên hệ mật thiết với nhân dân nơi cư trú; thực hiện tốt công tác dân vận khéo; lắng nghe và phản ánh trung thực tâm tư, nguyện vọng chính đáng của nhân dân đến cấp ủy.
                </li>
              </ol>

              <div className="grid grid-cols-2 gap-4 pt-6 text-center">
                <div>
                  <p className="font-bold">XÁC NHẬN CỦA CHI BỘ</p>
                  <p className="text-[10px] text-slate-500 italic">(Ký, ghi rõ họ tên)</p>
                  <div className="h-16"></div>
                </div>
                <div>
                  <p className="font-bold">NGƯỜI CAM KẾT</p>
                  <p className="text-[10px] text-slate-500 italic">(Ký, ghi rõ họ tên)</p>
                  <div className="h-16"></div>
                  <p className="font-semibold">{partyMemberName || '(Họ tên đảng viên)'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
