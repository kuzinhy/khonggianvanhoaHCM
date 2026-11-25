import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Quote,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Building2,
} from 'lucide-react';
import {
  getEventsForDate,
  ON_THIS_DAY_DATABASE,
  type OnThisDayEvent,
} from '../data/hcmOnThisDayData';

interface HcmOnThisDayWidgetProps {
  onOpenCardGenerator?: (quoteText: string, quoteSource: string) => void;
  onSelectTab?: (tab: any) => void;
}

export const HcmOnThisDayWidget: React.FC<HcmOnThisDayWidgetProps> = ({
  onOpenCardGenerator,
  onSelectTab,
}) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const events = getEventsForDate(selectedDay, selectedMonth);

  const handlePrevDay = () => {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else {
      setSelectedDay(31);
      setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1);
    }
  };

  const handleNextDay = () => {
    if (selectedDay < 31) {
      setSelectedDay(selectedDay + 1);
    } else {
      setSelectedDay(1);
      setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1);
    }
  };

  const handleSetToday = () => {
    setSelectedDay(today.getDate());
    setSelectedMonth(today.getMonth() + 1);
  };

  const handleCopyEvent = (ev: OnThisDayEvent) => {
    const text = `【BÁC HỒ VỚI NGÀY NÀY NĂM XƯA — ${ev.day}/${ev.month}/${ev.year}】\n` +
      `★ ${ev.title}\n` +
      `📍 Địa điểm: ${ev.location || 'Việt Nam'}\n` +
      `📖 Nội dung: ${ev.summary}\n` +
      (ev.quote ? `💬 Lời Bác dạy: "${ev.quote}"\n` : '') +
      `🏛️ Nguồn tham chiếu: ${ev.citation} (NXB Chính trị quốc gia Sự thật)\n` +
      `📌 Ứng dụng Chi bộ: ${ev.chiBoApplication || 'Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh'}\n` +
      `🔗 Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một`;

    navigator.clipboard.writeText(text);
    setCopiedId(ev.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const isToday = selectedDay === today.getDate() && selectedMonth === today.getMonth() + 1;

  return (
    <section className="rounded-3xl border-2 border-amber-300/80 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FDF8EE] p-5 sm:p-7 shadow-soft-lift space-y-5 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-700 text-white flex items-center justify-center shadow-xs shrink-0">
            <Calendar className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                Chuyên Mục Lịch Sử &amp; Văn Kiện
              </span>
              {isToday && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Hôm nay
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif mt-0.5">
              Bác Hồ Với Ngày Này Năm Xưa — Ngày {selectedDay} Tháng {selectedMonth}
            </h3>
          </div>
        </div>

        {/* Date Selector Controls */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-2xl shadow-2xs">
          <button
            type="button"
            onClick={handlePrevDay}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition cursor-pointer"
            title="Ngày trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Selector Ngày */}
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            className="text-xs font-bold text-slate-800 bg-transparent border-0 py-1 px-1 focus:ring-0 cursor-pointer"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Ngày {d}
              </option>
            ))}
          </select>

          <span className="text-slate-400 text-xs">/</span>

          {/* Selector Tháng */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="text-xs font-bold text-slate-800 bg-transparent border-0 py-1 px-1 focus:ring-0 cursor-pointer"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                Tháng {m}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleNextDay}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition cursor-pointer"
            title="Ngày tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {!isToday && (
            <button
              type="button"
              onClick={handleSetToday}
              className="ml-1 px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-200 transition cursor-pointer"
            >
              Về Hôm Nay
            </button>
          )}
        </div>
      </div>

      {/* Danh sách các sự kiện trong ngày */}
      <div className="grid grid-cols-1 gap-4">
        {events.map((ev) => (
          <article
            key={ev.id}
            className="rounded-2xl border border-amber-200/90 bg-white hover:border-amber-400 p-4 sm:p-5 space-y-3 transition-all shadow-xs hover:shadow-md relative group"
          >
            {/* Top Tag & Category */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-red-700 text-white font-black text-xs px-2.5 py-1 font-mono shadow-2xs">
                  Năm {ev.year}
                </span>
                <span className="rounded-md bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-[10.5px] font-bold">
                  {ev.category}
                </span>
                {ev.location && (
                  <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                    📍 {ev.location}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopyEvent(ev)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
                  title="Sao chép nội dung & trích dẫn văn kiện"
                >
                  {copiedId === ev.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>

                {onOpenCardGenerator && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenCardGenerator(
                        ev.quote || ev.summary,
                        `${ev.title} (${ev.year}) · ${ev.citation}`
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition cursor-pointer shadow-2xs"
                    title="Tạo ảnh thiệp chia sẻ lên mạng xã hội"
                  >
                    <Share2 className="w-3.5 h-3.5 text-rose-700" />
                    <span>Tạo thiệp MXH</span>
                  </button>
                )}
              </div>
            </div>

            {/* Title & Summary */}
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                {ev.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {ev.summary}
              </p>
            </div>

            {/* Lời Bác Dạy (nếu có) */}
            {ev.quote && (
              <div className="rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-white p-3.5 flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-amber-950 italic font-serif leading-relaxed">
                    “{ev.quote}”
                  </p>
                </div>
              </div>
            )}

            {/* Bối cảnh lịch sử & Nguồn Cấp A & Ứng dụng Chi bộ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-[11px]">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 flex items-start gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">Nguồn văn kiện Cấp A: </span>
                  <span className="text-slate-600">{ev.citation}</span>
                </div>
              </div>

              {ev.chiBoApplication && (
                <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-2.5 flex items-start gap-2">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-900">Vận dụng Chi bộ cơ sở: </span>
                    <span className="text-emerald-800">{ev.chiBoApplication}</span>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
