import React, { useState } from 'react';
import { X, Send, ShieldCheck, AlertCircle, CheckCircle2, Link2, BookOpen, User } from 'lucide-react';
import { submitCitizenCorrection } from '../hcmSpaceClient';

interface HcmCorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId?: string;
  targetTitle?: string;
  targetType?: 'ARTICLE' | 'DOSSIER' | 'QUOTE' | 'MAP_POINT' | 'MEDIA';
}

export const HcmCorrectionModal: React.FC<HcmCorrectionModalProps> = ({
  isOpen,
  onClose,
  targetId = 'hcm_general',
  targetTitle = 'Tư liệu Không gian Văn hóa Hồ Chí Minh',
  targetType = 'DOSSIER',
}) => {
  const [issueType, setIssueType] = useState<'FACT' | 'CITATION' | 'TYPO' | 'CONTEXT' | 'OTHER'>('FACT');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Spam bot detected

    if (description.trim().length < 10) {
      setResultMsg({ type: 'err', text: 'Vui lòng mô tả chi tiết nội dung cần góp ý hoặc đính chính (tối thiểu 10 ký tự).' });
      return;
    }

    setIsSubmitting(true);
    setResultMsg(null);

    try {
      const res = await submitCitizenCorrection({
        targetId,
        targetTitle,
        targetType,
        issueType,
        description: description.trim(),
        evidenceUrl: evidenceUrl.trim(),
        contactInfo: contactInfo.trim(),
        website: honeypot,
      });

      setResultMsg({
        type: 'ok',
        text: res.message || 'Đã gửi đề nghị đính chính thành công. Ban Thẩm định Tuyên giáo sẽ tiến hành kiểm chứng theo quy trình.',
      });
      setDescription('');
      setEvidenceUrl('');
      setContactInfo('');
    } catch (err: any) {
      setResultMsg({
        type: 'err',
        text: err?.message || 'Có lỗi khi gửi góp ý. Vui lòng kiểm tra lại kết nối mạng.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in font-sans">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg border border-[#E5D3B2] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#751D2C] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">Góp Ý &amp; Đề Nghị Đính Chính</h3>
              <p className="text-xs text-amber-200/90 font-medium">Bảo đảm tính chính xác &amp; chuẩn mực lịch sử</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Đối tượng cần góp ý */}
          <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5D3B2]/80 space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#751D2C] tracking-wider">Tư liệu liên quan:</span>
            <p className="font-bold text-slate-800 text-sm line-clamp-2">{targetTitle}</p>
          </div>

          {/* Phân loại vấn đề */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Vấn đề phát hiện:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'FACT', label: 'Sai sự kiện / Niên đại' },
                { id: 'CITATION', label: 'Sai trích dẫn / Lời Bác' },
                { id: 'CONTEXT', label: 'Thiếu bối cảnh lịch sử' },
                { id: 'TYPO', label: 'Lỗi chính tả / Câu chữ' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setIssueType(opt.id as any)}
                  className={`p-2 rounded-xl text-left font-semibold border transition-all cursor-pointer ${
                    issueType === opt.id
                      ? 'bg-rose-50 border-[#751D2C] text-[#751D2C] shadow-2xs ring-1 ring-[#751D2C]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">
              Mô tả cụ thể vấn đề và đề xuất nội dung sửa <span className="text-red-600">*</span>:
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Vui lòng chỉ rõ câu, đoạn, sự kiện chưa chính xác và nội dung đúng theo đối chiếu..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#751D2C] focus:ring-1 focus:ring-[#751D2C] text-slate-800 outline-hidden"
            />
          </div>

          {/* Căn cứ kiểm chứng / Đường dẫn nguồn */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-[#751D2C]" />
              <span>Căn cứ kiểm chứng / Tài liệu đối chiếu (sách, tập, trang, liên kết):</span>
            </label>
            <input
              type="text"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="VD: Hồ Chí Minh Toàn tập, Tập 4, tr. 15 hoặc URL tài liệu lưu trữ..."
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#751D2C] text-slate-800 outline-hidden"
            />
          </div>

          {/* Thông tin liên hệ (Tùy chọn) */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Thông tin liên hệ (Email hoặc SĐT):</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Không bắt buộc</span>
            </label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Để lại liên hệ nếu đồng chí muốn nhận phản hồi kết quả thẩm định"
              className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#751D2C] text-slate-800 outline-hidden"
            />
            <p className="text-[10.5px] text-slate-500">
              Chính sách bảo mật: Hệ thống cam kết không công khai hoặc chia sẻ thông tin liên hệ của bạn đọc.
            </p>
          </div>

          {/* Honeypot field for anti-spam (Hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Result message */}
          {resultMsg && (
            <div
              className={`p-3 rounded-xl border flex items-start gap-2 ${
                resultMsg.type === 'ok'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-rose-50 border-rose-300 text-rose-800'
              }`}
            >
              {resultMsg.type === 'ok' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              )}
              <span className="leading-relaxed">{resultMsg.text}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Đang gửi...' : 'Gửi đề nghị đính chính'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
