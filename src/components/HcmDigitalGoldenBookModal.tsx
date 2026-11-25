import React, { useState, useEffect } from 'react';
import {
  BookMarked,
  Award,
  Heart,
  Send,
  Sparkles,
  Share2,
  Download,
  CheckCircle2,
  User,
  Building2,
  Calendar,
  X,
  ShieldCheck,
} from 'lucide-react';
import { HoaSenIcon, DongSonDrumIcon } from './TraditionalMotifs';

interface GoldenEntry {
  id: string;
  authorName: string;
  roleOrUnit: string;
  pledgeCategory: 'Cán bộ & Đảng viên' | 'Đoàn viên & Thanh niên' | 'Giáo dục & Thầy cô' | 'Nhân dân cơ sở';
  quotePledge: string;
  date: string;
  likes: number;
  certified: boolean;
}

const INITIAL_ENTRIES: GoldenEntry[] = [
  {
    id: 'gld-1',
    authorName: 'Đ/c Nguyễn Văn An',
    roleOrUnit: 'Đảng ủy Phường Thủ Dầu Một',
    pledgeCategory: 'Cán bộ & Đảng viên',
    quotePledge: 'Tuyệt đối trung thực, gương mẫu, tận tụy phục vụ nhân dân; tiên phong đi đầu trong chuyển đổi số và xây dựng nếp sống văn minh đô thị theo lời Bác dạy.',
    date: '23/11/2026',
    likes: 42,
    certified: true,
  },
  {
    id: 'gld-2',
    authorName: 'Đ/c Lê Thị Thu Trang',
    roleOrUnit: 'Bí thư Đoàn Phường Thủ Dầu Một',
    pledgeCategory: 'Đoàn viên & Thanh niên',
    quotePledge: 'Tuổi trẻ Thủ Dầu Một nguyện là ngọn cờ đầu trong học tập và rèn luyện: "Đâu cần thanh niên có, việc gì khó có thanh niên".',
    date: '21/11/2026',
    likes: 38,
    certified: true,
  },
  {
    id: 'gld-3',
    authorName: 'Cô giáo Phạm Minh Ngọc',
    roleOrUnit: 'Trường Tiểu học Thủ Dầu Một',
    pledgeCategory: 'Giáo dục & Thầy cô',
    quotePledge: 'Khắc ghi lời Bác: "Vì lợi ích mười năm trồng cây, vì lợi ích trăm năm trồng người", nguyện cống hiến hết mình cho sự nghiệp trồng người.',
    date: '20/11/2026',
    likes: 56,
    certified: true,
  },
  {
    id: 'gld-4',
    authorName: 'Bác Trần Văn Phúc (70 tuổi Đảng)',
    roleOrUnit: 'Khu phố 3, Phường Thủ Dầu Một',
    pledgeCategory: 'Nhân dân cơ sở',
    quotePledge: 'Học Bác suốt đời đức tính Cần, Kiệm, Liêm, Chính, giữ trọn lòng son sắt với Đảng, động viên con cháu đoàn kết xây dựng khu phố bình yên, ấm no.',
    date: '19/11/2026',
    likes: 79,
    certified: true,
  },
];

export const HcmDigitalGoldenBookModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<GoldenEntry[]>(INITIAL_ENTRIES);
  const [authorName, setAuthorName] = useState('');
  const [roleOrUnit, setRoleOrUnit] = useState('');
  const [pledgeCategory, setPledgeCategory] = useState<GoldenEntry['pledgeCategory']>('Cán bộ & Đảng viên');
  const [quotePledge, setQuotePledge] = useState('');
  const [submittedCert, setSubmittedCert] = useState<GoldenEntry | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !quotePledge.trim()) return;

    const newEntry: GoldenEntry = {
      id: `gld-${Date.now()}`,
      authorName: authorName.trim(),
      roleOrUnit: roleOrUnit.trim() || 'Người dân Thủ Dầu Một',
      pledgeCategory,
      quotePledge: quotePledge.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      likes: 1,
      certified: true,
    };

    setEntries([newEntry, ...entries]);
    setSubmittedCert(newEntry);
    setAuthorName('');
    setRoleOrUnit('');
    setQuotePledge('');
  };

  const handleLike = (id: string) => {
    setEntries((prev) =>
      prev.map((it) => (it.id === id ? { ...it, likes: it.likes + 1 } : it))
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF7F0] rounded-3xl border-2 border-[#C59A55] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Sổ Vàng Truyền Thống */}
        <div className="bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#54121E] px-6 py-5 text-white flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <DongSonDrumIcon size={200} />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#C59A55]/20 border border-[#C59A55] flex items-center justify-center p-2.5">
              <BookMarked className="w-6 h-6 text-[#C59A55]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#E5D3B2] tracking-[0.2em] uppercase">
                SỔ VÀNG TRUYỀN THỐNG SỐ
              </div>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-wide">
                Lời Hứa Danh Dự Học Tập &amp; Làm Theo Bác
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng sổ vàng"
            title="Đóng sổ vàng"
            className="p-1.5 rounded-full text-[#E5D3B2] hover:bg-white/10 transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung 2 cột: Bên trái là Form ghi sổ, Bên phải là Danh sách dòng lưu niệm */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cột trái: Form ghi sổ vàng */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5D3B2] p-5 shadow-xs flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5D3B2]/50 text-[#751D2C]">
                <HoaSenIcon className="w-5 h-5 text-[#C59A55]" />
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider">
                  Ký Ghi Sổ Vàng Danh Dự
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Họ và tên đồng chí / Nhân dân <span className="text-[#751D2C] ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5D3B2] focus:border-[#751D2C] bg-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Chi bộ / Cơ quan / Khu phố
                </label>
                <input
                  type="text"
                  value={roleOrUnit}
                  onChange={(e) => setRoleOrUnit(e.target.value)}
                  placeholder="VD: Chi bộ Khu phố 1 / Trường THCS..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5D3B2] focus:border-[#751D2C] bg-[#FAF7F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Đối tượng tham gia
                </label>
                <select
                  value={pledgeCategory}
                  onChange={(e) => setPledgeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5D3B2] bg-[#FAF7F0] font-semibold"
                >
                  <option value="Cán bộ & Đảng viên">Cán bộ &amp; Đảng viên (Quy định 144-QĐ/TW)</option>
                  <option value="Đoàn viên & Thanh niên">Đoàn viên &amp; Thanh niên xung kích</option>
                  <option value="Giáo dục & Thầy cô">Thầy cô giáo &amp; Ngành Giáo dục</option>
                  <option value="Nhân dân cơ sở">Nhân dân &amp; Cư dân địa bàn</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Lời cảm tưởng / Lời hứa hành động cụ thể <span className="text-[#751D2C] ml-0.5">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={quotePledge}
                  onChange={(e) => setQuotePledge(e.target.value)}
                  placeholder="Nguyện ghi lòng tạc dạ lời Bác dạy, quyết tâm học tập và rèn luyện..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5D3B2] focus:border-[#751D2C] bg-[#FAF7F0] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Ký tên &amp; Lưu vào Sổ Vàng</span>
              </button>
            </form>

            {/* Thông báo chứng nhận số */}
            {submittedCert && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-[#751D2C]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đã ghi danh Sổ Vàng thành công!</span>
                </div>
                <p className="text-[11px] text-slate-700">
                  Lời hứa của đồng chí <strong>{submittedCert.authorName}</strong> đã được lưu trữ vĩnh viễn trên hệ thống Không Gian Văn Hóa Hồ Chí Minh.
                </p>
              </div>
            )}
          </div>

          {/* Cột phải: Danh sách các dòng lưu niệm thiêng liêng */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#751D2C] uppercase tracking-wider pb-1">
              <span>Các dòng lưu niệm danh dự ({entries.length})</span>
              <span className="text-[11px] text-[#67615B] font-normal lowercase">Cập nhật thời gian thực</span>
            </div>

            <div className="space-y-3">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-[#E5D3B2] bg-white p-4 shadow-xs space-y-2.5 hover:border-[#751D2C]/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#E5D3B2] flex items-center justify-center font-bold text-[#751D2C] text-xs">
                        {entry.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#262321] flex items-center gap-1.5">
                          <span>{entry.authorName}</span>
                          {entry.certified && (
                            <span title="Đã chứng thực">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#C59A55]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10.5px] text-[#67615B]">{entry.roleOrUnit}</div>
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7F0] border border-[#E5D3B2] text-[#751D2C] font-semibold">
                      {entry.pledgeCategory}
                    </span>
                  </div>

                  <blockquote className="font-serif italic text-xs text-[#262321] leading-relaxed bg-[#FAF7F0]/60 p-3 rounded-xl border-l-2 border-[#C59A55]">
                    “ {entry.quotePledge} ”
                  </blockquote>

                  <div className="flex items-center justify-between text-[11px] text-[#67615B] pt-1 border-t border-[#E5D3B2]/30">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{entry.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLike(entry.id)}
                      className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-900 font-semibold cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{entry.likes} Trân trọng</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
