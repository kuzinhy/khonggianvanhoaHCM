import React, { useState } from 'react';
import {
  X,
  Compass,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Award,
  BookOpen,
  Volume2,
  VolumeX,
  Flame,
  Star,
  Sparkles,
  Footprints,
} from 'lucide-react';
import {
  HO_CHI_MINH_LIFE_STAGES,
  type LifeStageItem,
  getNextLifeStage,
} from '../data/hcmGuidedJourneyData';
import { useApp } from '../AppContext';
import type { SpaceTab } from './ProfessionalNavbar';

interface HcmGuidedJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: SpaceTab, subId?: string) => void;
}

export const HcmGuidedJourneyModal: React.FC<HcmGuidedJourneyModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const { currentUser, updateCitizenProgress, markStageCompleted } = useApp();
  const [selectedStageId, setSelectedStageId] = useState<string>(() => {
    return currentUser.lastVisitedStageId || 'stage_1_tuoitho';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const completed = currentUser.completedStages || [];
  const currentStage =
    HO_CHI_MINH_LIFE_STAGES.find((s) => s.id === selectedStageId) ||
    HO_CHI_MINH_LIFE_STAGES[0];
  const nextStage = getNextLifeStage(currentStage.id);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'vi-VN';
      utter.rate = 0.92;
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang.includes('vi'));
      if (viVoice) utter.voice = viVoice;
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utter);
      setIsSpeaking(true);
    }
  };

  const handleExploreStage = (stage: LifeStageItem) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    updateCitizenProgress(stage.targetTab, stage.id, `Chặng ${stage.order}: ${stage.title}`);
    onNavigateToTab(stage.targetTab, stage.subContentId);
    onClose();
  };

  const handleCompleteAndNext = (stage: LifeStageItem) => {
    markStageCompleted(stage.id);
    if (nextStage) {
      setSelectedStageId(nextStage.id);
      updateCitizenProgress(nextStage.targetTab, nextStage.id, `Chặng ${nextStage.order}: ${nextStage.title}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col border-2 border-[#C59A55]/50 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#751D2C] via-[#8B2332] to-[#5C1420] text-white flex items-center justify-between border-b border-[#C59A55]/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2B755] to-[#B3802B] p-0.5 shadow-md flex items-center justify-center text-[#751D2C] shrink-0">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#C59A55]/30 text-amber-200 text-xs rounded-full font-bold uppercase tracking-wider border border-[#C59A55]/50">
                  Lộ Trình Học Tập Di Sản
                </span>
                <span className="text-xs text-amber-100/80 hidden sm:inline">
                  Dành cho người dân tìm hiểu sâu sắc theo cuộc đời Bác
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
                Hướng Dẫn Hành Trình Theo Dấu Chân Bác Hồ
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/30 rounded-full text-xs text-amber-200 border border-amber-500/30">
              <Footprints className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Đã hiểu: {completed.length}/{HO_CHI_MINH_LIFE_STAGES.length} chặng
              </span>
            </div>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 hover:bg-white/20 rounded-full text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
          
          {/* Left: 7 Life Stages Stepper List */}
          <div className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col overflow-y-auto p-3 sm:p-4 space-y-2 flex-shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-[#751D2C] uppercase tracking-wider flex items-center gap-1.5">
                <Footprints className="w-4 h-4 text-[#C59A55]" /> 7 Chặng Lịch Sử
              </span>
              <span className="text-[11px] text-slate-500">Bấm chặng để xem</span>
            </div>

            <div className="space-y-2">
              {HO_CHI_MINH_LIFE_STAGES.map((st) => {
                const isSelected = selectedStageId === st.id;
                const isDone = completed.includes(st.id);

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStageId(st.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer relative lucian-spring-btn ${
                      isSelected
                        ? 'bg-amber-50/80 border-[#C59A55] shadow-sm ring-1 ring-[#C59A55]/50'
                        : isDone
                        ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isSelected
                            ? 'bg-[#751D2C] text-amber-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isDone ? '✓' : st.order}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#8B2332] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60">
                            {st.period}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            {st.badgeIcon} {st.badgeName}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-1 line-clamp-1">
                          {st.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {st.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note box for Citizens */}
            <div className="mt-auto p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-[#751D2C]">
                <Sparkles className="w-3.5 h-3.5 text-[#C59A55]" /> Ghi nhớ tự động:
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Hệ thống tự động lưu chặng bạn đang tìm hiểu để bạn dễ dàng tiếp tục theo dõi trong những lần truy cập sau.
              </p>
            </div>
          </div>

          {/* Right: Stage Detail & Learning Meaning */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white to-amber-50/20">
            {/* Stage Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 sm:p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 bg-[#751D2C] text-amber-100 text-xs font-bold rounded-md">
                      Chặng {currentStage.order} / 7
                    </span>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs font-bold rounded-md">
                      {currentStage.period}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-md">
                      {currentStage.badgeIcon} {currentStage.badgeName}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#751D2C] font-serif">
                    {currentStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    {currentStage.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      handleSpeak(
                        `${currentStage.title}. ${currentStage.historicalMilestone}. ${currentStage.significance}. ${currentStage.coreLesson}`
                      )
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#751D2C]" />}
                    <span>{isSpeaking ? 'Dừng đọc' : 'Nghe diễn cảm'}</span>
                  </button>
                </div>
              </div>

              {/* Historical Context */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mốc Sự Kiện Lịch Sử:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {currentStage.historicalMilestone}
                </p>
              </div>

              {/* Educational Meaning: Để người dân thấu hiểu hơn */}
              <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80">
                <div className="text-xs font-bold text-[#751D2C] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Award className="w-4 h-4 text-[#C59A55]" /> Ý Nghĩa Giáo Dục &amp; Tầm Vóc Tư Tưởng:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {currentStage.significance}
                </p>
              </div>

              {/* Core Lesson for citizens today */}
              <div className="mt-4 p-4 bg-rose-50/70 rounded-2xl border border-rose-200/60">
                <div className="text-xs font-bold text-[#8B2332] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Star className="w-4 h-4 text-amber-600 fill-current" /> Bài Học Hành Động Cho Nhân Dân Hôm Nay:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {currentStage.coreLesson}
                </p>
              </div>

              {/* Key Quote */}
              <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 italic text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-[#751D2C]">
                  “ {currentStage.keyQuote} ”
                </div>
                <div className="text-[11px] text-slate-500 font-mono text-right">
                  — {currentStage.quoteSource}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCompleteAndNext(currentStage)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    completed.includes(currentStage.id)
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      completed.includes(currentStage.id) ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                  <span>
                    {completed.includes(currentStage.id)
                      ? 'Đã thấu hiểu chặng này'
                      : 'Đánh dấu đã hiểu chặng này'}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleExploreStage(currentStage)}
                    className="px-5 py-2 bg-[#751D2C] hover:bg-[#8B2332] text-amber-100 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 lucian-spring-btn"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Truy Cập Chuyên Mục Này Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Next stage suggestion box */}
            {nextStage && (
              <div className="bg-gradient-to-r from-amber-900 to-[#751D2C] text-white rounded-3xl p-4 sm:p-5 shadow-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                    Gợi ý chặng tiếp theo cho bạn:
                  </span>
                  <h4 className="font-bold text-amber-100 text-sm sm:text-base mt-0.5">
                    Chặng {nextStage.order}: {nextStage.title} ({nextStage.period})
                  </h4>
                  <p className="text-xs text-amber-200/80 mt-0.5 line-clamp-1">
                    {nextStage.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStageId(nextStage.id)}
                  className="px-4 py-2 bg-[#C59A55] hover:bg-[#D4A96A] text-slate-950 font-bold text-xs rounded-xl transition-all shadow cursor-pointer shrink-0"
                >
                  Xem Chặng Tiếp
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
