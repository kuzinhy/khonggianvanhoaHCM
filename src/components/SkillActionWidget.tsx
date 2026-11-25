import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  FileText,
  RotateCcw,
  PlusCircle,
  HelpCircle,
  BookOpen,
  Landmark,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export interface SkillActionWidgetProps {
  skillId: string;
  title: string;
  description?: string;
  actionLabel?: string;
  defaultPrompt?: string;
  sourceModule?: string;
  dataClassification?: string;
  placeholder?: string;
  getParameters?: () => Record<string, any>;
  onResult?: (run: {
    inputSummary: string;
    output: { draftText: string; [key: string]: any };
  }) => void;
  [key: string]: any;
}

export const SkillActionWidget: React.FC<SkillActionWidgetProps> = ({
  skillId,
  title,
  description,
  actionLabel = 'Tạo bản nháp theo mẫu',
  placeholder = 'Nhập thông tin yêu cầu cần tham mưu...',
  getParameters,
  onResult,
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW');

  // Handle template draft generation
  const handleGenerate = () => {
    setLoading(true);
    const extraParams = getParameters ? getParameters() : {};
    const unitName = extraParams.unitName || 'Đảng ủy phường Thủ Dầu Một';

    setTimeout(() => {
      let draftBody = '';

      if (skillId.includes('planner')) {
        draftBody = `KẾ HOẠCH TRIỂN KHAI XÂY DỰNG KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH NĂM 2026
Đơn vị chủ trì: ${unitName}
Chuyên đề: ${selectedTopic}

I. MỤC ĐÍCH, YÊU CẦU
1. Tuyên truyền sâu rộng tư tưởng, đạo đức, phong cách Hồ Chí Minh gắn với thực hiện Chỉ thị số 07-CT/TW ngày 13/7/2026 của Bộ Chính trị và Quy định số 144-QĐ/TW về chuẩn mực đạo đức cách mạng của cán bộ, đảng viên trong giai đoạn mới.
2. Xây dựng Không gian Văn hóa Hồ Chí Minh vừa có tính vật thể (tủ sách, pano, phòng truyền thống), vừa có tính phi vật thể (lối sống, văn hóa công vụ, gần dân, lắng nghe nhân dân).
3. 100% cán bộ, đảng viên hoàn thành bản cam kết tu dưỡng, rèn luyện; nhân rộng tối thiểu 02 mô hình "Dân vận khéo" tại địa bàn.

II. NỘI DUNG VÀ NHIỆM VỤ TRỌNG TÂM
1. Công tác tuyên truyền, giáo dục chính trị:
- Tổ chức sinh hoạt chuyên đề định kỳ quý gắn với nghiên cứu 15 tác phẩm kinh điển của Bác.
- Đẩy mạnh tra cứu số hóa qua mã QR Không gian Văn hóa Hồ Chí Minh tại 100% điểm sinh hoạt khu phố.
2. Xây dựng chuẩn mực đạo đức công vụ:
- Quán triệt 5 điều chuẩn mực theo Quy định 144: Yêu nước, tôn trọng Nhân dân; Bản lĩnh, đổi mới, sáng tạo; Cần, kiệm, liêm, chính, chí công vô tư; Đoàn kết, kỷ cương, tình thương, trách nhiệm; Gương mẫu, khiêm tốn, tu dưỡng suốt đời.
- Triển khai mô hình "Nụ cười công sở - Lắng nghe tiếng nói Nhân dân".

III. TỔ CHỨC THỰC HIỆN
1. Ban Tuyên giáo & Dân vận: Thường trực theo dõi, biên tập nội dung số hóa, kiểm tra đánh giá theo Bộ 5 Tiêu chuẩn.
2. Các Chi bộ cơ sở: Đưa nội dung học tập và làm theo Bác vào Nghị quyết sinh hoạt chi bộ hàng tháng; tổ chức tự đánh giá định kỳ 6 tháng.`;
      } else if (skillId.includes('model')) {
        draftBody = `BÀI VIẾT TUYÊN TRUYỀN MÔ HÌNH TIÊU BIỂU HỌC TẬP & LÀM THEO LỜI BÁC
Đơn vị: ${unitName}
Chủ đề: Gương sáng cơ sở trong học tập và làm theo Bác

1. Bối cảnh và ý nghĩa mô hình:
Thực hiện lời dạy của Bác: "Dân vận kém thì việc gì cũng kém, Dân vận khéo thì việc gì cũng thành công", cấp ủy và nhân dân đã chủ động ứng dụng công nghệ số và phương pháp làm việc khoa học để giải quyết những vấn đề bức xúc từ cơ sở.

2. Những việc làm cụ thể, thiết thực:
- Ứng dụng bản tin sinh hoạt số hóa qua mã QR giúp đảng viên, đoàn viên thanh niên và nhân dân dễ dàng tra cứu tài liệu học tập Chỉ thị 07-CT/TW mọi lúc mọi nơi.
- Duy trì hòm thư điện tử và các buổi tiếp xúc, đối thoại trực tiếp theo tinh thần "Óc nghĩ, mắt trông, tai nghe, chân đi, miệng nói, tay làm".

3. Bài học kinh nghiệm và sức lan tỏa:
Mô hình chứng minh bài học sâu sắc: Muốn việc thành công thì người cán bộ, đảng viên phải nêu gương trước; nói đi đôi với làm, lấy sự hài lòng và ấm no của nhân dân làm thước đo kết quả rèn luyện.`;
      } else {
        draftBody = `TỔNG HỢP Ý KIẾN THAM MƯU CÔNG TÁC TUYÊN GIÁO SỐ:
Yêu cầu: ${prompt || 'Tham mưu nâng cao hiệu quả Không gian Văn hóa Hồ Chí Minh'}
- Căn cứ văn kiện Chỉ thị 07-CT/TW và tài liệu Viện Hồ Chí Minh.
- Đề xuất tăng cường ứng dụng bảo tàng 3D, kiểm tra trắc nghiệm định kỳ và lan tỏa các câu trích dẫn chuẩn nguồn trên nền tảng số.`;
      }

      const finalDraft = `[BẢN NHÁP MẪU THAM KHẢO — CHƯA QUA THẨM ĐỊNH]\n# Cần cán bộ phụ trách rà soát, đối chiếu nguồn chính thống trước khi ban hành; không tự động xuất bản.\n\n${draftBody}`;

      setOutput(finalDraft);
      setLoading(false);

      onResult?.({
        inputSummary: prompt || selectedTopic,
        output: { draftText: finalDraft },
      });
    }, 800);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-blue-200 bg-white p-5 shadow-soft-lift space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-50 text-blue-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
              TẠO BẢN NHÁP THEO MẪU
            </span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              (Chưa qua thẩm định; không tự động xuất bản)
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">{title}</h4>
          {description && <p className="text-xs text-slate-600 leading-relaxed">{description}</p>}
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Chuyên đề trọng tâm:</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500"
          >
            <option value="Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW">Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW (Chuẩn mực đạo đức)</option>
            <option value="Dân vận khéo theo tư tưởng Hồ Chí Minh">Dân vận khéo theo tư tưởng Hồ Chí Minh</option>
            <option value="Xây dựng Đảng trong sạch, vững mạnh">Xây dựng Đảng trong sạch, vững mạnh (Di chúc 1969)</option>
            <option value="Giáo dục lý tưởng cách mạng cho thế hệ trẻ">Giáo dục lý tưởng cách mạng cho thế hệ trẻ</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Yêu cầu bổ sung hoặc đặc thù đơn vị:</label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>AI đang phân tích văn kiện &amp; soạn thảo...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{actionLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Output Preview */}
      {output && (
        <div className="pt-3 border-t border-slate-100 space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Bản dự thảo tham mưu chính thức
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
            {output}
          </div>

          <p className="text-[10.5px] text-slate-500 italic">
            💡 Bản dự thảo đã được sẵn sàng đưa vào quản trị cơ sở dữ liệu CMS hoặc lưu trữ báo cáo chi bộ.
          </p>
        </div>
      )}
    </div>
  );
};
