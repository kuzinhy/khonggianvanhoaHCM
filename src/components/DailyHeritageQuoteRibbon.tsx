import React, { useState, useEffect } from 'react';
import {
  Quote,
  Volume2,
  VolumeX,
  Share2,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Calendar,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { VERIFIED_QUOTES_12, type VerifiedQuote } from '../hcmCoreDataset';
import { HcmQuoteCardGeneratorModal } from './HcmQuoteCardGeneratorModal';

interface DailyHeritageQuoteRibbonProps {
  onJumpToQuotes?: () => void;
}

export const DailyHeritageQuoteRibbon: React.FC<DailyHeritageQuoteRibbonProps> = ({
  onJumpToQuotes,
}) => {
  // Determine quote of the day based on day of month
  const today = new Date();
  const dayOfMonth = today.getDate();
  const initialIndex = (dayOfMonth - 1) % VERIFIED_QUOTES_12.length;

  const [quoteIndex, setQuoteIndex] = useState<number>(initialIndex);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [cardModalOpen, setCardModalOpen] = useState<boolean>(false);

  const currentQuote: VerifiedQuote = VERIFIED_QUOTES_12[quoteIndex] || VERIFIED_QUOTES_12[0];

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn hiện chưa hỗ trợ Web Speech API.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `Lời Bác dạy: ${currentQuote.quote}. Trích nguồn: ${currentQuote.source}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopy = () => {
    const text = `"${currentQuote.quote}"\n— Chủ tịch Hồ Chí Minh (${currentQuote.source})`;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cycleNextQuote = () => {
    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setQuoteIndex((prev) => (prev + 1) % VERIFIED_QUOTES_12.length);
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border-2 border-amber-300/80 bg-gradient-to-r from-[#FAF4E8] via-[#FFFDF9] to-[#FAF4E8] p-5 sm:p-6 shadow-soft-lift animate-in fade-in duration-200">
        {/* Sacred Decorative Watermarks */}
        <div className="pointer-events-none absolute -right-6 -bottom-8 opacity-10 text-amber-900">
          <Quote className="h-44 w-44" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Badge & Quote Content */}
          <div className="space-y-2.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-crimson-royal text-gold-star px-3 py-0.5 text-[10.5px] font-black uppercase tracking-wider shadow-xs">
                <Sparkles className="h-3 w-3 text-gold-star" />
                Mỗi Ngày Học Một Lời Bác Dạy
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/80 border border-amber-300/60 px-2.5 py-0.5 rounded-full">
                <Calendar className="h-3 w-3 text-amber-700" />
                Hôm nay, ngày {today.getDate()}/{today.getMonth() + 1}
              </span>
              <span className="text-[11px] font-semibold text-rose-800">
                Chuyên đề: {currentQuote.theme}
              </span>
            </div>

            {/* Quote Body with Merriweather Serif Typography */}
            <blockquote className="text-sm sm:text-base md:text-lg font-serif italic font-bold text-slate-900 leading-relaxed border-l-4 border-crimson-royal pl-3.5 sm:pl-4 py-0.5">
              "{currentQuote.quote}"
            </blockquote>

            {/* Attribution */}
            <p className="text-xs text-slate-600 font-medium pl-3.5 sm:pl-4">
              — <span className="font-bold text-crimson-royal">Chủ tịch Hồ Chí Minh</span> · {currentQuote.source}
            </p>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 md:flex-col md:items-end">
            <div className="flex items-center gap-1.5">
              {/* Audio Recital */}
              <button
                type="button"
                onClick={toggleSpeech}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                  isSpeaking
                    ? 'bg-crimson-royal text-gold-star border-crimson-900 animate-pulse shadow-xs'
                    : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300/80'
                }`}
                title="Nghe diễn cảm lời Bác dạy"
              >
                {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-crimson-royal" />}
                <span>{isSpeaking ? 'Dừng đọc' : 'Nghe diễn cảm'}</span>
              </button>

              {/* Generate Quote Card */}
              <button
                type="button"
                onClick={() => setCardModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3 py-1.5 text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-95"
                title="Tạo thiệp danh ngôn Bác Hồ để chia sẻ"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Tạo thiệp di sản</span>
              </button>

              {/* Copy Quote Text */}
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Sao chép nội dung lời Bác dạy"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>

              {/* Cycle to another quote */}
              <button
                type="button"
                onClick={cycleNextQuote}
                className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Xem lời dạy tiếp theo"
              >
                <RefreshCw className="h-4 w-4 text-blue-600" />
              </button>
            </div>

            {onJumpToQuotes && (
              <button
                type="button"
                onClick={onJumpToQuotes}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-crimson-royal hover:underline cursor-pointer pt-1"
              >
                <span>Xem tất cả 12 Lời Bác dạy &amp; Trắc nghiệm</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Quote Card Generator Modal */}
      {cardModalOpen && (
        <HcmQuoteCardGeneratorModal
          isOpen={cardModalOpen}
          onClose={() => setCardModalOpen(false)}
          initialQuote={currentQuote}
        />
      )}
    </>
  );
};
