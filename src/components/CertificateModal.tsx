import React, { useState } from 'react';
import {
  Award,
  X,
  Printer,
  Share2,
  CheckCircle2,
  Download,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  defaultRecipientName?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  defaultRecipientName = 'Đồng chí Cán bộ, Đảng viên',
}) => {
  const [name, setName] = useState(defaultRecipientName);
  const [unit, setUnit] = useState('Đảng bộ Phường Thủ Dầu Một');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const percentage = Math.round((score / totalQuestions) * 100);
  const grade =
    percentage >= 90
      ? 'Xuất sắc'
      : percentage >= 75
      ? 'Giỏi'
      : percentage >= 50
      ? 'Khá'
      : 'Hoàn thành';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl border-4 border-gold-star overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="p-3 bg-[#85080C] text-white flex items-center justify-between px-5 border-b-2 border-gold-star">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-star" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100">
              Giấy Chứng Nhận Điện Tử · Không Gian Văn Hóa Hồ Chí Minh
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-amber-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body (Styled as a prestigious National Certificate of Honor) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-center relative select-none">
          {/* Subtle Watermark Trống Đồng Chuẩn Đông Sơn */}
          <img
            src="/assets/hcm-space/trong-dong-chuan-gold.png"
            alt="Mặt Trống đồng Đông Sơn - Ngọc Lũ chuẩn"
            className="absolute inset-0 m-auto w-96 h-96 object-contain opacity-15 pointer-events-none"
          />

          {/* National Header */}
          <div className="space-y-1 relative z-10">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-crimson-royal">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h4>
            <p className="text-[11px] sm:text-xs font-bold text-slate-700 tracking-wider">
              Độc lập – Tự do – Hạnh phúc
            </p>
            <div className="w-24 h-0.5 bg-crimson-royal mx-auto my-1"></div>
            <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide text-gold-700 mt-2">
              BAN CHỈ ĐẠO XÂY DỰNG KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH
            </p>
          </div>

          {/* Certificate Main Title */}
          <div className="space-y-2 relative z-10 pt-2">
            <div className="inline-block px-4 py-1 rounded-full bg-crimson-50 border border-crimson-200 text-crimson-royal text-xs font-bold mb-1">
              KẾT LUẬN 01-KL/TW &amp; QUY ĐỊNH 144-QĐ/TW BỘ CHÍNH TRỊ
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-crimson-deep font-serif tracking-tight">
              GIẤY CHỨNG NHẬN
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              HOÀN THÀNH BÀI KIỂM TRA TRẮC NGHIỆM TÌM HIỂU
              <br />
              <span className="font-bold text-slate-800">
                CUỘC ĐỜI, SỰ NGHIỆP &amp; TƯ TƯỞNG CHỦ TỊCH HỒ CHÍ MINH
              </span>
            </p>
          </div>

          {/* Recipient Information */}
          <div className="space-y-3 relative z-10 py-2">
            <p className="text-xs text-slate-500 italic">Chứng nhận đồng chí:</p>
            {isEditing ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên đồng chí"
                  className="px-3 py-1.5 border border-amber-400 rounded-xl text-center font-bold text-slate-900 text-base w-full"
                />
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 bg-crimson-royal text-white rounded-xl text-xs font-bold shrink-0"
                >
                  Xong
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-xl sm:text-3xl font-black text-crimson-royal font-serif underline decoration-amber-400 decoration-2 underline-offset-8">
                  {name}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-[11px] text-blue-600 hover:underline font-medium cursor-pointer"
                >
                  (Sửa tên)
                </button>
              </div>
            )}
            <p className="text-xs font-medium text-slate-600 pt-1">
              Đơn vị / Chi bộ: <span className="font-bold text-slate-800">{unit}</span>
            </p>
          </div>

          {/* Score & Evaluation */}
          <div className="relative z-10 max-w-md mx-auto bg-white/80 border-2 border-gold-300 rounded-2xl p-4 shadow-xs space-y-1.5">
            <div className="flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Kết quả đạt:</span>
                <span className="text-xl font-black text-crimson-royal">
                  {score}/{totalQuestions}
                </span>
                <span className="text-slate-500 text-[11px]"> câu đúng</span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <span className="text-slate-500 block text-[11px]">Tỷ lệ chính xác:</span>
                <span className="text-xl font-black text-emerald-600">{percentage}%</span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <span className="text-slate-500 block text-[11px]">Xếp loại:</span>
                <span className="text-base font-black text-blue-800">{grade}</span>
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="relative z-10 pt-6 grid grid-cols-2 gap-4 text-xs text-slate-700">
            <div>
              <p className="font-semibold italic text-slate-500">Mã chứng nhận số:</p>
              <p className="font-mono font-bold text-slate-700">HCM-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
              <p className="text-[10px] text-slate-400 mt-1">Đã lưu trữ hệ thống Tuyên giáo Số</p>
            </div>
            <div>
              <p className="italic">Thành phố Hồ Chí Minh, ngày {todayStr}</p>
              <p className="font-black uppercase text-crimson-royal mt-1">
                TM. BAN CHỈ ĐẠO CƠ SỞ
              </p>
              <div className="my-2 flex justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-crimson-600/70 flex items-center justify-center text-crimson-700 text-[9px] font-black uppercase text-center p-1 transform -rotate-12">
                  ĐÃ XÁC THỰC SỐ HÓA
                </div>
              </div>
              <p className="font-bold text-slate-900">Ban Tuyên giáo &amp; Dân vận</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Chứng nhận hợp lệ theo chuẩn văn kiện Kết luận 01-KL/TW &amp; Quy định 144-QĐ/TW
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-crimson-royal hover:bg-crimson-deep text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>In giấy chứng nhận</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
