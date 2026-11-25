import React, { useState } from 'react';
import {
  Award,
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  BookOpen,
  Trophy,
  Share2,
} from 'lucide-react';
import { hcmSfx } from '../services/hcmSoundEffects';
import { CertificateModal } from './CertificateModal';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Cụ thân sinh Chủ tịch Hồ Chí Minh là cụ Phó bảng Nguyễn Sinh Sắc đã từng dừng chân hoạt động yêu nước và dạy học tại ngôi chùa cổ nào ở Thủ Dầu Một?',
    options: [
      'Chùa Hội Khánh',
      'Chùa Tây Tạng',
      'Chùa Bà Thiên Hậu',
      'Chùa Châu Thới',
    ],
    correctIndex: 0,
    explanation: 'Từ năm 1923 đến 1926, cụ Phó bảng Nguyễn Sinh Sắc đã dừng chân tại Chùa Hội Khánh (Thủ Dầu Một), bốc thuốc chữa bệnh và truyền bá tư tưởng yêu nước cho nhân dân.',
  },
  {
    id: 2,
    question: 'Tổ chức yêu nước tiến bộ do cụ Phó bảng Nguyễn Sinh Sắc cùng các sĩ phu thành lập tại Chùa Hội Khánh năm 1923 có tên là gì?',
    options: [
      'Hội Danh dự yêu nước',
      'Hội Phục Việt',
      'Việt Nam Thanh niên Cách mạng Đồng chí Hội',
      'Hội Ái hữu Tương trợ',
    ],
    correctIndex: 0,
    explanation: 'Cụ Phó bảng Nguyễn Sinh Sắc cùng hòa thượng Từ Văn và các cụ Tú Cúc, thầy giáo Chiêu đã sáng lập "Hội Danh dự yêu nước", ươm mầm cho phong trào cách mạng Đất Thủ.',
  },
  {
    id: 3,
    question: 'Nơi diễn ra cuộc biểu tình mít-tinh giành chính quyền Cách mạng Tháng Tám ngày 25/8/1945 tại Thủ Dầu Một là di tích lịch sử nào?',
    options: [
      'Nhà việc Phú Cường (Nhà Làng Phú Cường — nay phục dựng Nhà truyền thống)',
      'Nhà cổ Trần Văn Hổ',
      'Chợ Thủ Dầu Một',
      'Bến xe ngựa Phú Cường',
    ],
    correctIndex: 0,
    explanation: 'Sáng ngày 25/8/1945, hàng vạn đồng bào và thanh niên Tiền phong đã tập hợp tại Nhà việc Phú Cường ven sông Sài Gòn, hạ cờ giặc, lập nên chính quyền cách mạng nhân dân.',
  },
  {
    id: 4,
    question: 'Bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa được Chủ tịch Hồ Chí Minh đọc tại đâu vào ngày nào?',
    options: [
      'Ngày 02/09/1945 tại Quảng trường Ba Đình, Hà Nội',
      'Ngày 19/08/1945 tại Nhà hát Lớn Hà Nội',
      'Ngày 25/08/1945 tại Quảng trường Phú Cường',
      'Ngày 02/09/1945 tại Quảng trường Cách mạng Tháng Tám',
    ],
    correctIndex: 0,
    explanation: 'Chiều ngày 02/9/1945, trước hơn 50 vạn đồng bào tại Ba Đình lịch sử, Bác Hồ đã đọc bản Tuyên ngôn Độc lập, văn kiện lập quốc thiêng liêng của dân tộc.',
  },
  {
    id: 5,
    question: 'Chân lý bất hủ: "Không có gì quý hơn độc lập, tự do!" được Chủ tịch Hồ Chí Minh khẳng định trong văn kiện lịch sử nào?',
    options: [
      'Lời kêu gọi chống Mỹ cứu nước ngày 17/7/1966',
      'Tuyên ngôn Độc lập năm 1945',
      'Lời kêu gọi Toàn quốc kháng chiến năm 1946',
      'Di chúc năm 1969',
    ],
    correctIndex: 0,
    explanation: 'Ngày 17/7/1966, khi đế quốc Mỹ leo thang ném bom phá hoại miền Bắc, Bác Hồ phát sóng Lời kêu gọi nêu cao chân lý thời đại: "Không có gì quý hơn độc lập, tự do!".',
  },
  {
    id: 6,
    question: 'Quy định số 144-QĐ/TW ngày 09/5/2024 của Bộ Chính trị ban hành chuẩn mực đạo đức cách mạng gồm những tiêu chí cốt lõi nào?',
    options: [
      'Yêu nước, tôn trọng Nhân dân; Bản lĩnh, đổi mới; Cần kiệm liêm chính; Đoàn kết, kỷ cương; Gương mẫu, khiêm tốn',
      'Chỉ cần hoàn thành nhiệm vụ chuyên môn và không vi phạm kỷ luật',
      'Thi đua sản xuất và nâng cao thu nhập kinh tế hộ gia đình',
      'Bảo tồn di tích cổ và giữ gìn các nghề thủ công mỹ nghệ',
    ],
    correctIndex: 0,
    explanation: 'Quy định 144-QĐ/TW đề ra 5 điều chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới nhằm xây dựng Đảng ta thật sự trong sạch, vững mạnh.',
  },
  {
    id: 7,
    question: 'Thủ Dầu Một nổi danh khắp phương Nam với danh xưng "Vùng đất thủ công tài hoa" bởi những làng nghề truyền thống tiêu biểu nào?',
    options: [
      'Gốm sứ cổ ven sông, Tranh sơn mài Tương Bình Hiệp và Nghề điêu khắc gỗ',
      'Dệt lụa Vạn Phúc và Đúc đồng Ngũ Xã',
      'Làm nón lá bài thơ và Đan lát mây tre',
      'Chế biến thủy hải sản và Nghề làm muối',
    ],
    correctIndex: 0,
    explanation: 'Nghề gốm cổ (Lò Lu), tranh sơn mài Tương Bình Hiệp và điêu khắc gỗ Đất Thủ có lịch sử hơn 300 năm, là tinh hoa văn hóa di sản được bảo tồn đến ngày nay.',
  },
  {
    id: 8,
    question: 'Trong bản Di chúc thiêng liêng công bố tháng 9/1969, Bác Hồ căn dặn điều gì trước hết?',
    options: [
      'Trước hết nói về Đảng và phải giữ gìn sự đoàn kết nhất trí như giữ gìn con ngươi của mắt mình',
      'Trước hết nói về kế hoạch khôi phục kinh tế sau chiến tranh',
      'Trước hết nói về việc xây dựng các công trình bảo tàng lịch sử',
      'Trước hết nói về việc mở rộng quan hệ ngoại giao quốc tế',
    ],
    correctIndex: 0,
    explanation: 'Trong Di chúc: "Trước hết nói về Đảng... Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình".',
  },
  {
    id: 9,
    question: 'Phường Thủ Dầu Một mới chính thức đi vào vận hành bộ máy hành chính phục vụ nhân dân từ thời điểm lịch sử nào?',
    options: [
      'Từ ngày 01/7/2025',
      'Từ ngày 02/9/2025',
      'Từ ngày 30/4/2025',
      'Từ ngày 01/01/2026',
    ],
    correctIndex: 0,
    explanation: 'Theo Nghị quyết sắp xếp đơn vị hành chính của Ủy ban Thường vụ Quốc hội, Phường Thủ Dầu Một chính thức vận hành từ ngày 01/7/2025, mở ra kỷ nguyên phát triển mới.',
  },
  {
    id: 10,
    question: 'Ý nghĩa trọng tâm của việc xây dựng "Không gian văn hóa Hồ Chí Minh" tại Phường Thủ Dầu Một là gì?',
    options: [
      'Làm cho tư tưởng, đạo đức, phong cách của Bác thấm sâu vào đời sống xã hội, trở thành nét văn hóa đặc trưng, nguồn sức mạnh tinh thần của nhân dân',
      'Chỉ để trang trí pa-nô áp-phích vào các dịp lễ kỷ niệm trong năm',
      'Chỉ để tổ chức các cuộc họp báo cáo hành chính định kỳ',
      'Thay thế hoàn toàn các hoạt động văn hóa dân gian truyền thống',
    ],
    correctIndex: 0,
    explanation: 'Xây dựng Không gian văn hóa Hồ Chí Minh là đưa việc học tập và làm theo Bác trở thành nếp sống văn minh, nghĩa tình, gắn với các mô hình an sinh xã hội thiết thực tại cơ sở.',
  },
];

interface HcmDatThuMiniQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUserName?: string;
}

export const HcmDatThuMiniQuizModal: React.FC<HcmDatThuMiniQuizModalProps> = ({
  isOpen,
  onClose,
  defaultUserName = 'Em Học Sinh / Đoàn Viên Đất Thủ',
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentIdx] !== undefined;
  const isCorrect = selectedAnswers[currentIdx] === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    const isRight = idx === currentQ.correctIndex;
    if (isRight) {
      hcmSfx.playSuccess();
    } else {
      hcmSfx.playClick(400);
    }
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    hcmSfx.playClick(750);
    setShowExplanation(false);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((p) => p + 1);
    } else {
      setIsFinished(true);
      hcmSfx.playSuccess();
    }
  };

  const handleRestart = () => {
    hcmSfx.playClick(600);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Tính tổng số điểm đúng
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ansIdx
  ).length;

  const scorePercentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-white rounded-3xl border-2 border-rose-300 shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] p-4 text-white flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-white/10 text-amber-300">
                <Trophy className="w-5 h-5 fill-current" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 bg-black/20 px-2 py-0.5 rounded">
                  HỘI THI TRỰC TUYẾN 2026
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5">
                  Em Học Sử Đất Thủ — Dấu Chân Bác
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
            {!isFinished ? (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-600 font-bold text-[11px]">
                    <span className="text-rose-800">
                      Câu hỏi {currentIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-amber-800 font-mono">
                      Đã đúng: {correctCount} câu ({scorePercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300"
                      style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Câu hỏi */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/70 to-amber-50/30 border border-rose-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                    Chủ đề: Lịch sử &amp; Di sản Đất Thủ
                  </span>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Các phương án lựa chọn */}
                <div className="space-y-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIdx] === optIdx;
                    const isRightOption = optIdx === currentQ.correctIndex;

                    let buttonClass =
                      'w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-[13px] font-medium leading-snug ';

                    if (isAnswered) {
                      if (isRightOption) {
                        buttonClass += 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        buttonClass += 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                      } else {
                        buttonClass += 'border-slate-200 bg-white text-slate-400 opacity-60';
                      }
                    } else {
                      buttonClass += 'border-slate-200 bg-white text-slate-800 hover:border-rose-400 hover:bg-rose-50/50 hover:shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={buttonClass}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isAnswered && isRightOption
                              ? 'bg-emerald-600 text-white'
                              : isAnswered && isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isAnswered && isRightOption && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isRightOption && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Giải thích lịch sử sau khi chọn */}
                {showExplanation && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1 animate-in fade-in">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-amber-900">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>{isCorrect ? 'Tuyệt vời! Bạn đã trả lời chính xác.' : 'Chưa chính xác! Tư liệu lịch sử ghi nhận:'}</span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-slate-700 font-sans">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 italic">
                    {isAnswered ? 'Nhấp "Tiếp theo" để tiếp tục' : 'Chọn 1 phương án đúng nhất'}
                  </span>
                  {isAnswered && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="hcm-btn-flat px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] text-white font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Màn hình tổng kết điểm & cấp giấy khen */
              <div className="text-center py-6 space-y-4 animate-in fade-in">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl ring-8 ring-amber-100">
                  <Award className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
                    HOÀN THÀNH XUẤT SẮC BÀI THI
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-black text-slate-900 pt-1">
                    Điểm số: {correctCount} / {QUIZ_QUESTIONS.length} ({scorePercentage}%)
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    {scorePercentage >= 80
                      ? 'Xin chúc mừng bạn đã xuất sắc vượt qua các câu hỏi lịch sử về Chủ tịch Hồ Chí Minh và Di tích Đất Thủ! Bạn xứng đáng nhận Giấy Chứng Nhận Điện Tử.'
                      : 'Bạn đã hoàn thành tốt bài tìm hiểu lịch sử. Hãy tiếp tục khám phá thêm các tư liệu quý trên Không gian Văn hóa Hồ Chí Minh nhé!'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 max-w-md mx-auto text-left space-y-1.5">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Thành tích đạt được:</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div>• Xếp loại: <strong>{scorePercentage >= 90 ? 'Xuất sắc' : scorePercentage >= 70 ? 'Giỏi' : 'Khá'}</strong></div>
                    <div>• Tuyên dương: <strong>Công Dân Trẻ Đất Thủ Gương Mẫu</strong></div>
                    <div>• Đơn vị: <strong>Không gian Văn hóa Hồ Chí Minh — Phường Thủ Dầu Một</strong></div>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm Lại Bài Thi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCertificateOpen(true)}
                    className="hcm-btn-flat px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-700 text-white font-bold shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-200" />
                    <span>Xem &amp; Nhận Giấy Chứng Nhận Điện Tử</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Giấy chứng nhận điện tử */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        score={correctCount}
        totalQuestions={QUIZ_QUESTIONS.length}
        defaultRecipientName={defaultUserName}
      />
    </>
  );
};
