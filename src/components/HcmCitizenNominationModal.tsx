import React, { useState } from 'react';
import {
  Send,
  X,
  Heart,
  CheckCircle2,
  Sparkles,
  MapPin,
  Camera,
  Users,
} from 'lucide-react';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmCitizenNominationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNotice?: (msg: string) => void;
}

export const HcmCitizenNominationModal: React.FC<HcmCitizenNominationModalProps> = ({
  isOpen,
  onClose,
  onSuccessNotice,
}) => {
  const [candidateName, setCandidateName] = useState('');
  const [khuPho, setKhuPho] = useState('Khu phố 1');
  const [address, setAddress] = useState('');
  const [goodDeed, setGoodDeed] = useState('');
  const [category, setCategory] = useState<'NGUOI_TOT' | 'MO_HINH' | 'HOC_BAC'>('NGUOI_TOT');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    hcmSfx.playClick(800);

    const nominationData = {
      id: `nom_${Date.now()}`,
      candidateName,
      khuPho,
      address,
      goodDeed,
      category,
      senderName: senderName || 'Người dân ẩn danh',
      senderPhone,
      submittedAt: new Date().toISOString(),
      status: 'PENDING_REVIEW',
    };

    try {
      // Lưu vào LocalStorage
      const stored = localStorage.getItem('hcm_citizen_nominations') || '[]';
      const list = JSON.parse(stored);
      list.unshift(nominationData);
      localStorage.setItem('hcm_citizen_nominations', JSON.stringify(list));

      // Thử gửi lên API Backend nếu máy chủ đang chạy
      await fetch('/api/hcm-space/citizen-nominations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nominationData),
      }).catch(() => {});

      hcmSfx.playSuccess();
      setIsSubmitted(true);
      if (onSuccessNotice) {
        onSuccessNotice(`Đã tiếp nhận đề cử gương sáng "${candidateName}" tại ${khuPho}!`);
      }
    } catch {
      hcmSfx.playSuccess();
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCandidateName('');
    setAddress('');
    setGoodDeed('');
    setSenderName('');
    setSenderPhone('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-rose-300 shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] p-4 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/10 text-amber-300">
              <Heart className="w-5 h-5 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200 bg-black/20 px-2 py-0.5 rounded">
                  DÂN VẬN KHÉO • ĐẤT THỦ NGHĨA TÌNH
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5">
                Gửi Đề Cử Gương Người Tốt Việc Tốt
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

        {/* Nội dung form */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Gửi Đề Cử Thành Công!
              </h4>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                Ban Tuyên giáo &amp; Ủy ban MTTQ Việt Nam Phường Thủ Dầu Một xin trân trọng cảm ơn tấm lòng của quý bà con.
                Mỗi nghĩa cử cao đẹp được lan tỏa chính là đóa hoa thơm kính dâng lên Bác Hồ!
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-[#881337] text-white font-bold hover:bg-[#9F1239] transition cursor-pointer shadow-md"
                >
                  Hoàn Tất
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Cùng chung tay lan tỏa việc làm tử tế quanh mình</span>
                </div>
                <p className="text-[11.5px] text-slate-700">
                  Dành cho người dân, đảng viên, đoàn viên tại 5 khu phố Phường Thủ Dầu Một giới thiệu những hành động đẹp, mô hình an sinh xã hội, người thật việc thật từ 01/7/2025 đến nay.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 flex items-center gap-1">
                  <span>Họ và tên cá nhân / Tập thể được đề cử</span>
                  <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Ví dụ: Chú Nguyễn Văn A (Chi hội CCB), Cô giáo Trần Thị B..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>Thuộc Khu phố tại Phường</span>
                    <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={khuPho}
                    onChange={(e) => setKhuPho(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 font-semibold"
                  >
                    <option value="Khu phố 1">Khu phố 1 (Bạch Đằng - Chợ)</option>
                    <option value="Khu phố 2">Khu phố 2 (Khu vực trung tâm)</option>
                    <option value="Khu phố 3">Khu phố 3 (Chùa Hội Khánh)</option>
                    <option value="Khu phố 4">Khu phố 4</option>
                    <option value="Khu phố 5">Khu phố 5</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Hình thức tuyên dương:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 font-medium"
                  >
                    <option value="NGUOI_TOT">Gương Người Tốt Việc Tốt</option>
                    <option value="MO_HINH">Mô Hình An Sinh Xã Hội</option>
                    <option value="HOC_BAC">Điển Hình Học Tập Và Làm Theo Bác</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Địa chỉ / Đơn vị công tác cụ thể:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ví dụ: Đường Bạch Đằng, Trường THCS Chu Văn An, Chi hội Phụ nữ..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 flex items-center gap-1">
                  <span>Hành động tốt / Nghĩa cử cao đẹp cụ thể</span>
                  <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={goodDeed}
                  onChange={(e) => setGoodDeed(e.target.value)}
                  placeholder="Mô tả cụ thể việc làm tốt: Nhặt được của rơi trả người đánh mất; hỗ trợ bữa cơm 0 đồng; hiến máu cứu người; nhận đỡ đầu học sinh nghèo hiếu học..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
                />
              </div>

              {/* Thông tin người đề cử */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Thông tin người gửi đề cử (bảo mật):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Họ tên của bạn (hoặc để trống)..."
                    className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="Số điện thoại liên hệ..."
                    className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hcm-btn-flat px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] text-white font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isSubmitting ? 'Đang gửi...' : 'Gửi Đề Cử Về Phường'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
