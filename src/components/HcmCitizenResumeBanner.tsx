import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  RotateCcw,
  Sparkles,
  X,
  BookmarkCheck,
  ChevronRight,
  User,
} from 'lucide-react';
import { useApp } from '../AppContext';
import { HO_CHI_MINH_LIFE_STAGES, getNextLifeStage } from '../data/hcmGuidedJourneyData';
import type { SpaceTab } from './ProfessionalNavbar';

interface HcmCitizenResumeBannerProps {
  onNavigateToSection: (tab: SpaceTab) => void;
  onOpenGuidedJourney: () => void;
}

export const HcmCitizenResumeBanner: React.FC<HcmCitizenResumeBannerProps> = ({
  onNavigateToSection,
  onOpenGuidedJourney,
}) => {
  const { currentUser } = useApp();
  const [isDismissed, setIsDismissed] = useState(false);

  // Chỉ hiển thị khi đã đăng nhập (CITIZEN) và có thông tin ghi nhớ lần trước
  if (isDismissed) return null;
  if (!currentUser || currentUser.role !== 'CITIZEN' || !currentUser.lastVisitedSection) {
    return null;
  }

  const currentStage = HO_CHI_MINH_LIFE_STAGES.find(
    (s) => s.id === currentUser.lastVisitedStageId
  ) || HO_CHI_MINH_LIFE_STAGES[0];

  const nextStage = getNextLifeStage(currentStage.id);

  const formatVisitTime = (iso?: string) => {
    if (!iso) return 'Gần đây';
    try {
      const d = new Date(iso);
      return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')} ngày ${d.getDate()}/${d.getMonth() + 1}`;
    } catch {
      return 'Gần đây';
    }
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-3 pb-1 select-none animate-in fade-in slide-in-from-top-2">
      <div className="bg-gradient-to-r from-amber-50 via-white to-rose-50/70 border border-[#C59A55]/60 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3.5 relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/15 rounded-full blur-2xl pointer-events-none" />

        {/* Left Information */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#751D2C] to-[#8E2435] text-amber-200 flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
          </div>

          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#751D2C]">
                Xin chào {currentUser.name}!
              </span>
              <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80 font-semibold">
                {currentUser.unit}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                • Lưu lúc {formatVisitTime(currentUser.lastVisitedAt)}
              </span>
            </div>

            <p className="text-xs text-slate-700">
              Lần trước bạn đang tìm hiểu:{' '}
              <span className="font-bold text-[#8B2332]">
                {currentUser.lastVisitedTitle || currentStage.title}
              </span>
              {nextStage && (
                <span className="hidden lg:inline text-slate-500">
                  {' '}— Chặng tiếp theo:{' '}
                  <span className="font-semibold text-slate-800">
                    Chặng {nextStage.order}: {nextStage.title}
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          {/* Nút 1: Tiếp tục xem chuyên mục đang xem dở */}
          <button
            type="button"
            onClick={() => onNavigateToSection(currentUser.lastVisitedSection as SpaceTab)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-[#751D2C] shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer lucian-spring-btn"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C59A55]" />
            <span>Tiếp Tục Nội Dung Dở</span>
          </button>

          {/* Nút 2: Mở Hướng dẫn hành trình hoặc chặng tiếp theo */}
          <button
            type="button"
            onClick={onOpenGuidedJourney}
            className="px-3.5 py-1.5 rounded-xl bg-[#751D2C] hover:bg-[#8B2332] text-amber-100 text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer lucian-spring-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {nextStage ? `Xem Chặng ${nextStage.order} Tiếp Theo` : 'Xem Toàn Bộ Lộ Trình'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Nút đóng banner */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
