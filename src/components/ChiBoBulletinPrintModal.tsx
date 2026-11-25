import React, { useRef } from 'react';
import {
  Printer,
  X,
  FileText,
  Download,
  Landmark,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export interface BulletinData {
  title: string;
  category: string;
  date: string;
  source: string;
  summary: string;
  content: string;
  unitName?: string;
}

interface ChiBoBulletinPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: BulletinData;
}

const DEFAULT_BULLETIN_DATA: BulletinData = {
  title: 'Chuyên Đề Sinh Hoạt Chi Bộ: Nâng Cao Chuẩn Mực Đạo Đức Cách Mạng Theo Quy Định 144-QĐ/TW & Chỉ Thị 07-CT/TW',
  category: 'Sinh hoạt chuyên đề',
  date: 'Tháng sinh hoạt định kỳ năm 2026',
  source: 'Tài liệu hướng dẫn sinh hoạt Chi bộ Đảng bộ Phường Thủ Dầu Một',
  unitName: 'CHI BỘ KHU PHỐ / CƠ QUAN TRỰC THUỘC',
  summary: 'Tập trung quán triệt và thực hiện nghiêm túc 5 chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới; gắn chặt với việc xây dựng Không gian văn hóa Hồ Chí Minh cơ sở thiết thực, gần gũi.',
  content: 'Việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh theo Chỉ thị 07-CT/TW của Ban Thường vụ Thành ủy và Quy định số 144-QĐ/TW của Bộ Chính trị là nhiệm vụ thường xuyên, nền tảng của mỗi tổ chức Đảng và từng cán bộ, đảng viên.\n\nChi bộ yêu cầu mỗi đảng viên tự giác soi rọi theo 5 chuẩn mực: Yêu nước, tôn trọng Nhân dân, tuyệt đối trung thành với Đảng; Bản lĩnh, đổi mới, sáng tạo, hội nhập; Cần, kiệm, liêm, chính, chí công vô tư; Đoàn kết, kỷ cương, tình thương, trách nhiệm; Gương mẫu, khiêm tốn, tu dưỡng rèn luyện, học tập suốt đời.\n\nThông qua sinh hoạt chuyên đề, Chi bộ thảo luận giải pháp khắc phục các hạn chế, biểu dương các gương điển hình và xây dựng bản cam kết hành động cụ thể phục vụ đời sống nhân dân tại địa bàn.',
};

export const ChiBoBulletinPrintModal: React.FC<ChiBoBulletinPrintModalProps> = ({
  isOpen,
  onClose,
  data = DEFAULT_BULLETIN_DATA,
}) => {
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-5 overflow-y-auto backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-3xl border border-amber-300 bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header Toolbar (Hidden when printing) */}
        <div className="bg-[#85080C] px-5 py-3.5 text-white flex items-center justify-between gap-3 shrink-0 shadow-md print:hidden">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-gold-star p-1.5 text-crimson-950 shadow-xs">
              <Printer className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold">Xem Trước Bản Tin Sinh Hoạt Chi Bộ (Khổ A4)</h3>
              <p className="text-[11px] text-amber-200">
                Mẫu chuẩn hóa phục vụ sinh hoạt chi bộ định kỳ theo Chỉ thị 07-CT/TW &amp; Quy định 144-QĐ/TW
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gold-star hover:bg-gold-400 text-crimson-950 px-3.5 py-1.5 text-xs font-black shadow-gold-glow cursor-pointer transition-all active:scale-95"
            >
              <Printer className="h-4 w-4" />
              <span>In Bản Tin (Ctrl+P)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Bulletin Document (A4 Styling) */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white font-serif text-slate-900 space-y-6 print:p-0 print:m-0">
          <div ref={printAreaRef} className="space-y-6">
            {/* National & Party Header */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-slate-900">
              {/* Left Column: Local Party Committee */}
              <div className="text-center font-sans space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  ĐẢNG BỘ PHƯỜNG THỦ DẦU MỘT
                </p>
                <p className="text-xs font-black uppercase text-crimson-royal">
                  {data.unitName || 'CHI BỘ KHU PHỐ / CƠ QUAN'}
                </p>
                <p className="text-[10px] text-slate-500 italic">Số: ......-BT/CB</p>
              </div>

              {/* Right Column: National Motto */}
              <div className="text-center font-sans space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  ĐẢNG CỘNG SẢN VIỆT NAM
                </p>
                <p className="text-xs font-bold italic text-slate-700">
                  Thủ Dầu Một, ngày ...... tháng ...... năm 2026
                </p>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-1.5 pt-2">
              <span className="inline-block rounded-md bg-rose-100 text-rose-900 font-sans px-3 py-0.5 text-[11px] font-black uppercase tracking-wider print:border print:border-slate-400">
                TÀI LIỆU SINH HOẠT CHI BỘ ĐỊNH KỲ
              </span>
              <h1 className="text-lg sm:text-xl font-black text-crimson-deep leading-snug">
                {data.title}
              </h1>
              <p className="text-xs font-sans text-slate-600 font-medium">
                Nguồn tư liệu: <span className="font-bold">{data.source}</span> · Ban hành ngày {data.date}
              </p>
            </div>

            {/* Core Summary Box */}
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-50/70 p-4 font-sans space-y-2 print:border-slate-800 print:bg-white">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-600" /> Tóm Tắt Tinh Thần &amp; Trọng Tâm Chỉ Đạo
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif italic">
                "{data.summary}"
              </p>
            </div>

            {/* Main Content Body */}
            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-800 text-justify font-serif">
              {data.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Discussion Questions for Party Members */}
            <div className="rounded-2xl border border-rose-300 bg-rose-50/50 p-4 font-sans space-y-2.5 print:border-slate-800 print:bg-white">
              <h4 className="text-xs font-black uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-crimson-royal" /> 03 Câu Hỏi Thảo Luận Tại Buổi Sinh Hoạt Chi Bộ
              </h4>
              <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-800 space-y-1.5 font-medium">
                <li>
                  Chi bộ và từng đảng viên nhận thức như thế nào về điểm mới cốt lõi của nội dung trên theo tinh thần Chỉ thị 07-CT/TW?
                </li>
                <li>
                  Liên hệ thực tiễn khu phố/cơ quan: Đơn vị ta đã có mô hình hoặc hành động cụ thể nào gắn với 5 chuẩn mực Quy định 144-QĐ/TW?
                </li>
                <li>
                  Đề xuất giải pháp, việc làm thiết thực trong tháng tới để lan tỏa tinh thần học Bác vào giải quyết công việc hàng ngày?
                </li>
              </ol>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-4 pt-6 text-center font-sans">
              <div>
                <p className="text-xs font-bold uppercase text-slate-700">NƠI NHẬN:</p>
                <p className="text-[11px] text-slate-600 italic">- Đảng ủy phường (b/c);</p>
                <p className="text-[11px] text-slate-600 italic">- Toàn thể Đảng viên chi bộ;</p>
                <p className="text-[11px] text-slate-600 italic">- Lưu hồ sơ chi bộ.</p>
              </div>

              <div className="space-y-12">
                <p className="text-xs font-black uppercase text-slate-900">
                  T/M CHI BỘ<br />BÍ THƯ
                </p>
                <p className="text-xs text-slate-400 italic">(Ký và ghi rõ họ tên)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
