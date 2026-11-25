import React, { useState, useMemo } from 'react';
import {
  Calendar,
  History,
  Sparkles,
  Search,
  Filter,
  Volume2,
  VolumeX,
  BookOpen,
  ChevronRight,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Building2,
  Flag,
  ArrowLeft,
  FileText,
  Award,
  Layers,
  Clock,
  Compass,
  X,
} from 'lucide-react';
import {
  TDM_WARD_PARTY_CHRONOLOGY,
  type WardChronologyEntry,
} from '../data/hcmThuDauMotData';

function speakVietnamese(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'vi-VN';
  utter.rate = 0.95;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
  return true;
}

interface HcmThuDauMotChronologyViewProps {
  onBackToFoyer?: () => void;
  onNavigateToTab?: (tab: any) => void;
}

export const HcmThuDauMotChronologyView: React.FC<HcmThuDauMotChronologyViewProps> = ({
  onBackToFoyer,
  onNavigateToTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<WardChronologyEntry | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Filter chronology entries
  const filteredChronology = useMemo(() => {
    return TDM_WARD_PARTY_CHRONOLOGY.filter((item) => {
      const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.dateStr.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleToggleSpeak = (entry: WardChronologyEntry) => {
    if (speakingId === entry.id) {
      window.speechSynthesis?.cancel();
      setSpeakingId(null);
    } else {
      setSpeakingId(entry.id);
      const textToSpeak = `Ngày ${entry.dateStr}. ${entry.title}. ${entry.summary}. ${entry.details}. Đơn vị chủ trì: ${entry.leadingUnit}.`;
      speakVietnamese(textToSpeak, () => setSpeakingId(null));
    }
  };

  const categories = [
    { id: 'ALL', label: 'Tất cả mốc son', icon: '🏛️' },
    { id: 'XÂY DỰNG ĐẢNG', label: 'Xây dựng Đảng', icon: '🚩' },
    { id: 'CHÍNH QUYỀN ĐÔ THỊ', label: 'Chính quyền đô thị', icon: '🏢' },
    { id: 'CHUYỂN ĐỔI SỐ', label: 'Chuyển đổi số', icon: '💻' },
    { id: 'KHÔNG GIAN VĂN HÓA HCM', label: 'Không gian VH HCM', icon: '⭐' },
    { id: 'AN SINH XÃ HỘI', label: 'An sinh xã hội', icon: '❤️' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in select-none">
      {/* =========================================================================
          1. BANNER HOÀNG GIA: BIÊN NIÊN SỬ PHƯỜNG THỦ DẦU MỘT (MỐC 01/07/2025)
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-rose-200/80 bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#4F101A] p-6 sm:p-8 text-white shadow-xl">
        {/* Glow ambient background & hoa văn trống đồng */}
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none select-none flex items-center justify-end pr-6">
          <History className="w-64 h-64 text-amber-200" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          {/* Nút quay lại & Huy hiệu */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {onBackToFoyer && (
              <button
                type="button"
                onClick={onBackToFoyer}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-amber-200 hover:bg-white/20 transition-all cursor-pointer backdrop-blur-xs border border-white/10"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Về trang chủ</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400/20 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-amber-300 border border-amber-300/40">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Chuyên Mục Lịch Sử Đương Đại</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-200 border border-emerald-400/30">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Đơn vị hành chính mới có hiệu lực từ 01/07/2025</span>
            </span>
          </div>

          {/* Tiêu đề chính */}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Biên Niên Sử Phường Thủ Dầu Một
            </h1>
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-3xl font-sans">
              Ghi dấu toàn diện quá trình thành lập, xây dựng và phát triển của Đảng bộ và chính quyền Phường Thủ Dầu Một mới theo Nghị quyết của Ủy ban Thường vụ Quốc hội — Từ mốc son ngày <strong>01/07/2025</strong> đến nay.
            </p>
          </div>

          {/* 4 Thẻ thống kê mốc son */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-slate-900">
            <div className="rounded-2xl bg-white/95 p-3 backdrop-blur-md border border-amber-200 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Ngày Thành Lập</span>
              <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">01/07/2025</span>
              <span className="text-[10.5px] text-slate-500">Nghị quyết UBTVQH</span>
            </div>

            <div className="rounded-2xl bg-white/95 p-3 backdrop-blur-md border border-amber-200 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Phân Khu Hợp Nhất</span>
              <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">05 Phân Khu</span>
              <span className="text-[10.5px] text-slate-500">Phú Cường, Chánh Nghĩa...</span>
            </div>

            <div className="rounded-2xl bg-white/95 p-3 backdrop-blur-md border border-amber-200 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Quy Mô Dân Số</span>
              <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">&gt; 85.000</span>
              <span className="text-[10.5px] text-slate-500">Công dân cư trú</span>
            </div>

            <div className="rounded-2xl bg-white/95 p-3 backdrop-blur-md border border-amber-200 shadow-sm flex flex-col justify-between">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Mốc Son Biên Niên</span>
              <span className="text-lg sm:text-xl font-black text-rose-700 font-mono">
                {TDM_WARD_PARTY_CHRONOLOGY.length} Sự Kiện
              </span>
              <span className="text-[10.5px] text-slate-500">Liên tục cập nhật</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THANH CÔNG CỤ TÌM KIẾM & BỘ LỌC CHUYÊN ĐỀ
          ========================================================================= */}
      <section className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#FFFDF9] via-white to-rose-50/50 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo ngày tháng, tiêu đề, nghị quyết, sự kiện..."
              className="w-full rounded-xl border border-amber-300/80 bg-white pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#751D2C]/40 shadow-2xs font-sans"
            />
            <Search className="w-4 h-4 text-rose-800 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 shrink-0">
            <span>Hiển thị:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-amber-200 font-bold text-xs">
              {filteredChronology.length} / {TDM_WARD_PARTY_CHRONOLOGY.length} mốc son
            </span>
          </div>
        </div>

        {/* Dải nút bộ lọc danh mục */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-300">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs ring-2 ring-[#751D2C]/30'
                    : 'bg-white border border-rose-200/80 text-slate-700 hover:bg-rose-50/80'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. DÒNG THỜI GIAN BIÊN NIÊN SỬ (CHRONOLOGY TIMELINE STREAM)
          ========================================================================= */}
      <section className="relative rounded-3xl border-2 border-[#E7D6BE] bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE0] p-4 sm:p-8 shadow-md">
        {filteredChronology.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <History className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-600 font-medium">Không tìm thấy mốc son biên niên sử phù hợp với từ khóa.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] text-white text-xs font-bold hover:bg-rose-900 transition-colors cursor-pointer"
            >
              Xem tất cả sự kiện
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* Đường trục thời gian dọc */}
            <div className="absolute left-4 sm:left-32 top-4 bottom-8 w-1 bg-gradient-to-b from-rose-600 via-amber-500 to-[#751D2C] rounded-full opacity-60" />

            <div className="space-y-8 sm:space-y-10 pl-10 sm:pl-0">
              {filteredChronology.map((entry, index) => {
                const isSpeaking = speakingId === entry.id;
                return (
                  <div
                    key={entry.id}
                    className={`relative sm:flex sm:items-start gap-8 group transition-all duration-300 ${
                      entry.isHighlight ? 'scale-[1.01]' : ''
                    }`}
                  >
                    {/* Cột thời gian bên trái (trên desktop) */}
                    <div className="hidden sm:flex sm:w-28 shrink-0 flex-col items-end pr-6 pt-1 text-right">
                      <span className="font-mono text-base font-black text-rose-800 tracking-tight">
                        {entry.dateStr}
                      </span>
                      <span className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">
                        {entry.timestamp.split('-')[0]}
                      </span>
                    </div>

                    {/* Node chấm tròn trung tâm */}
                    <div
                      className={`absolute -left-10 sm:left-[122px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                        entry.isHighlight
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] border-white ring-4 ring-rose-200 text-amber-300 shadow-md scale-110'
                          : 'bg-white border-[#D4C3A3] text-slate-600 shadow-xs group-hover:border-rose-500'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Thẻ nội dung sự kiện biên niên sử */}
                    <div
                      className={`flex-1 rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                        entry.isHighlight
                          ? 'bg-white/95 border-amber-300/80 shadow-md ring-1 ring-amber-300/40'
                          : 'bg-white border-[#E7D6BE] shadow-2xs hover:shadow-md hover:border-amber-400'
                      }`}
                    >
                      {/* Huy hiệu & Ngày tháng (trên mobile) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="sm:hidden font-mono text-xs font-black text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                            📅 {entry.dateStr}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-extrabold uppercase tracking-wider ${
                              entry.category === 'XÂY DỰNG ĐẢNG'
                                ? 'bg-red-50 text-red-800 border border-red-200'
                                : entry.category === 'CHÍNH QUYỀN ĐÔ THỊ'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : entry.category === 'CHUYỂN ĐỔI SỐ'
                                ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                                : entry.category === 'KHÔNG GIAN VĂN HÓA HCM'
                                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {entry.category}
                          </span>
                          {entry.isHighlight && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Mốc Son Lịch Sử</span>
                            </span>
                          )}
                        </div>

                        {/* Nút nghe thuyết minh mốc son */}
                        <button
                          type="button"
                          onClick={() => handleToggleSpeak(entry)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSpeaking
                              ? 'bg-rose-600 text-white animate-pulse shadow-xs'
                              : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
                          }`}
                          title="Nghe thuyết minh mốc sự kiện này"
                        >
                          {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isSpeaking ? 'Dừng đọc' : 'Thuyết minh'}</span>
                        </button>
                      </div>

                      {/* Tiêu đề mốc son */}
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug pt-2 group-hover:text-rose-800 transition-colors">
                        {entry.title}
                      </h3>

                      {/* Tóm tắt ngắn gọn */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                        {entry.summary}
                      </p>

                      {/* Chi tiết sự kiện */}
                      <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-xs text-slate-800 leading-relaxed">
                        <strong className="text-rose-800 block mb-1">Nội dung chi tiết &amp; Ý nghĩa:</strong>
                        <p>{entry.details}</p>
                      </div>

                      {/* Chân thẻ: Đơn vị chủ trì & Văn kiện tham chiếu */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-rose-800 shrink-0" />
                          <span>Chủ trì: <strong>{entry.leadingUnit}</strong></span>
                        </div>

                        {entry.documentRef && (
                          <div className="flex items-center gap-1.5 text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                            <FileText className="w-3 h-3 text-amber-700 shrink-0" />
                            <span>Văn bản: <strong>{entry.documentRef}</strong></span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedEntry(entry)}
                          className="inline-flex items-center gap-1 text-rose-800 font-bold hover:underline cursor-pointer ml-auto"
                        >
                          <span>Xem văn kiện</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          4. MODAL XEM CHI TIẾT VĂN KIỆN / MỐC SON BIÊN NIÊN SỬ
          ========================================================================= */}
      {selectedEntry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] border-2 border-[#E7D6BE] p-6 shadow-2xl text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto timeline-custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-4 border-b border-amber-200 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-black text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    📅 {selectedEntry.dateStr}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    {selectedEntry.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-rose-800 leading-snug">
                  {selectedEntry.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nội dung chi tiết */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
                <strong className="text-amber-950 block mb-1">Khái quát bối cảnh:</strong>
                <p>{selectedEntry.summary}</p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <strong className="text-rose-800 block">Diễn biến lịch sử &amp; Tổ chức thực hiện:</strong>
                <p className="text-slate-800 leading-relaxed font-sans">{selectedEntry.details}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Đơn vị chủ trì:</span>
                  <strong className="text-slate-900">{selectedEntry.leadingUnit}</strong>
                </div>

                {selectedEntry.documentRef && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Căn cứ văn bản / Nghị quyết:</span>
                    <strong className="text-rose-800">{selectedEntry.documentRef}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Chân Modal */}
            <div className="pt-3 border-t border-amber-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleSpeak(selectedEntry)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 text-xs font-bold border border-rose-200 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe thuyết minh</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#751D2C] to-[#BE123C] hover:brightness-110 font-bold text-white text-xs transition-all shadow-xs cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
