import React, { useState, useEffect } from 'react';
import {
  BookMarked,
  Calendar,
  Check,
  Copy,
  Download,
  FileText,
  Printer,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Share2,
  FolderOpen,
  Edit3,
  Save,
  CheckCircle2,
} from 'lucide-react';
import {
  CHI_BO_ANNUAL_PLANS,
  type ChiBoMonthlyPlan,
} from '../data/hcmAdvancedFeaturesData';

interface HcmChiBoDigitalPocketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrintBulletin?: () => void;
  onOpenBulletinModal?: () => void;
}

const NOTES_PREFIX = 'hcm_chibo_notes_month_';

export const HcmChiBoDigitalPocketModal: React.FC<HcmChiBoDigitalPocketModalProps> = ({
  isOpen,
  onClose,
  onOpenPrintBulletin,
  onOpenBulletinModal,
}) => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth || 1);
  const [copied, setCopied] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [partyMemberNotes, setPartyMemberNotes] = useState<string>('');
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);

  // Load saved notes for selected month
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${NOTES_PREFIX}${selectedMonth}`);
      setPartyMemberNotes(saved || '');
    } catch {
      setPartyMemberNotes('');
    }
  }, [selectedMonth]);

  if (!isOpen) return null;

  const plan: ChiBoMonthlyPlan =
    CHI_BO_ANNUAL_PLANS.find((p) => p.month === selectedMonth) || CHI_BO_ANNUAL_PLANS[0];

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(`${NOTES_PREFIX}${selectedMonth}`, partyMemberNotes);
      setSaveFeedback(true);
      setTimeout(() => setSaveFeedback(false), 2000);
    } catch {}
  };

  const handleCopyDraftResolution = () => {
    const text = `DỰ THẢO NGHỊ QUYẾT SINH HOẠT CHI BỘ ${plan.themeTitle.toUpperCase()}
1. Tư tưởng chỉ đạo: ${plan.centralDirective}
2. Lời Bác dạy cốt lõi: "${plan.coreQuote}" (${plan.quoteSource})
3. Chương trình hành động trọng tâm:
${plan.suggestedAgenda.map((a) => `   - ${a}`).join('\n')}
4. Chỉ tiêu phấn đấu: ${plan.actionTarget}
[Nguồn: Không Gian Văn Hóa Hồ Chí Minh — Đảng bộ Phường Thủ Dầu Một]`;

    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const text = `${plan.themeTitle}. Chỉ đạo: ${plan.centralDirective}. Lời Bác dạy: ${plan.coreQuote}. Chỉ tiêu: ${plan.actionTarget}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div
          className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
          style={{ backgroundColor: '#751D2C' }}
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
              <BookMarked className="w-3.5 h-3.5 text-red-700" />
              <span>Tiện Ích Sinh Hoạt Đảng Cơ Sở 2026</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug">
              Sổ Tay Sinh Hoạt Chi Bộ Thông Minh (ChiBo Digital Pocket)
            </h3>
            <p className="text-xs text-amber-200">
              Khung định hướng nội dung sinh hoạt định kỳ 12 tháng &amp; chuyên đề tư tưởng theo Chỉ thị 07-CT/TW
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer transition-colors shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 12-Month Horizontal Picker */}
        <div className="bg-amber-50/70 border-b border-amber-200 px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-700 shrink-0 mr-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#751D2C]" />
            Tháng:
          </span>
          {CHI_BO_ANNUAL_PLANS.map((item) => {
            const isSelected = selectedMonth === item.month;
            const isCurrent = item.month === currentMonth;
            return (
              <button
                key={item.month}
                type="button"
                onClick={() => setSelectedMonth(item.month)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer border lucian-spring-btn hover:scale-105 active:scale-95 ${
                  isSelected
                    ? 'bg-[#751D2C] text-white border-[#751D2C] shadow-sm ring-1 ring-amber-400'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60 border-slate-200 shadow-2xs'
                }`}
              >
                <span>Tháng {item.month}</span>
                {isCurrent && (
                  <span className="ml-1 text-[9px] bg-amber-400 text-slate-950 font-black px-1 rounded-sm">
                    Hiện tại
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 overflow-y-auto flex-1">
          {/* Left: Agenda & Directive Details */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="rounded-md bg-rose-100 text-[#751D2C] px-2 py-0.5 text-xs font-black">
                Chủ đề Kỳ Sinh Hoạt Tháng {plan.month}/2026
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                {plan.themeTitle}
              </h4>
            </div>

            {/* Central Directive */}
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4 space-y-1.5">
              <span className="text-xs font-bold text-[#751D2C] uppercase tracking-wider block">
                Tư tưởng chỉ đạo trọng tâm:
              </span>
              <p className="text-xs sm:text-[13px] text-slate-900 font-medium leading-relaxed">
                {plan.centralDirective}
              </p>
            </div>

            {/* Uncle Ho Core Quote */}
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 space-y-1.5">
              <span className="text-xs font-bold text-red-900 uppercase tracking-wider block">
                Lời Bác dạy soi đường cho Chi bộ:
              </span>
              <p className="text-xs sm:text-[13px] text-slate-800 italic leading-relaxed">
                "{plan.coreQuote}"
              </p>
              <div className="text-[11px] text-slate-500 font-mono text-right">
                — {plan.quoteSource}
              </div>
            </div>

            {/* Suggested Agenda */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Gợi ý 4 bước chương trình sinh hoạt chi bộ:
              </span>
              <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700">
                {plan.suggestedAgenda.map((step, idx) => (
                  <li key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100 leading-relaxed font-medium">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Target */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-3.5 space-y-1">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                Chỉ tiêu hành động cụ thể của Chi bộ:
              </span>
              <p className="text-xs sm:text-[13px] text-emerald-950 font-bold leading-relaxed">
                {plan.actionTarget}
              </p>
            </div>
          </div>

          {/* Right: Personal Note & Action Tools */}
          <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Personal Notes Section */}
              <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                    Ghi chú cá nhân của Đảng viên:
                  </span>
                  {saveFeedback && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 animate-in fade-in">
                      <CheckCircle2 className="w-3 h-3" />
                      Đã lưu!
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Ghi lại ý kiến phát biểu, nhiệm vụ được phân công trong kỳ sinh hoạt Tháng {plan.month}:
                </p>
                <textarea
                  value={partyMemberNotes}
                  onChange={(e) => setPartyMemberNotes(e.target.value)}
                  placeholder="Ghi chú ý kiến cá nhân, công việc phụ trách khu phố..."
                  rows={6}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs leading-relaxed focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu sổ tay cá nhân</span>
                </button>
              </div>

              {/* Highlights & Bulletin Tips */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-2 text-xs">
                <span className="font-bold text-amber-900 uppercase tracking-wider block">
                  Điểm nhấn công tác tư tưởng:
                </span>
                <ul className="space-y-1.5 text-[11.5px] text-slate-700 list-disc list-inside">
                  {plan.bulletinHighlights.map((hl, idx) => (
                    <li key={idx} className="leading-relaxed">{hl}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCopyDraftResolution}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs cursor-pointer transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700" />}
                <span>{copied ? 'Đã sao chép nghị quyết mẫu!' : 'Sao chép dự thảo nghị quyết tháng'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSpeech}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    speaking ? 'bg-rose-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{speaking ? 'Dừng đọc' : 'Nghe diễn giải'}</span>
                </button>

                {(onOpenBulletinModal || onOpenPrintBulletin) && (
                  <button
                    type="button"
                    onClick={onOpenBulletinModal || onOpenPrintBulletin}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#751D2C] hover:bg-[#8E2435] text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In bản tin PDF</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 text-[11px] hidden sm:inline">
            Ứng dụng Chuyển đổi số công tác Đảng tại Đảng bộ &amp; Chi bộ cơ sở Phường Thủ Dầu Một
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer ml-auto"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
