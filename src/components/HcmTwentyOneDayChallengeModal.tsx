import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  Share2,
  X,
  Flame,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Star,
} from 'lucide-react';
import {
  TWENTY_ONE_DAY_CHALLENGE,
  type DailyChallengeItem,
} from '../data/hcmAdvancedFeaturesData';

interface HcmTwentyOneDayChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertificate?: (userName: string, chiBoName: string) => void;
}

const STORAGE_KEY = 'hcm_21_days_completed_days';
const USERNAME_KEY = 'hcm_21_days_username';
const CHIBO_KEY = 'hcm_21_days_chibo';

export const HcmTwentyOneDayChallengeModal: React.FC<HcmTwentyOneDayChallengeModalProps> = ({
  isOpen,
  onClose,
  onOpenCertificate,
}) => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [userName, setUserName] = useState<string>('Đồng chí');
  const [chiBoName, setChiBoName] = useState<string>('Chi bộ Khu phố 1');
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [reflectionNote, setReflectionNote] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompletedDays(JSON.parse(saved));
      }
      const savedUser = localStorage.getItem(USERNAME_KEY);
      if (savedUser) setUserName(savedUser);
      const savedChiBo = localStorage.getItem(CHIBO_KEY);
      if (savedChiBo) setChiBoName(savedChiBo);
    } catch {}
  }, []);

  if (!isOpen) return null;

  const currentItem: DailyChallengeItem =
    TWENTY_ONE_DAY_CHALLENGE.find((c) => c.day === selectedDay) || TWENTY_ONE_DAY_CHALLENGE[0];

  const isCompleted = completedDays.includes(selectedDay);
  const progressPercent = Math.round((completedDays.length / 21) * 100);
  const totalPoints = completedDays.reduce((acc, d) => {
    const item = TWENTY_ONE_DAY_CHALLENGE.find((c) => c.day === d);
    return acc + (item ? item.points : 10);
  }, 0);

  const toggleCompleteDay = (day: number) => {
    let next: number[];
    if (completedDays.includes(day)) {
      next = completedDays.filter((d) => d !== day);
      showToast(`Đã hủy hoàn thành Ngày ${day}`);
    } else {
      next = [...completedDays, day].sort((a, b) => a - b);
      showToast(`Chúc mừng! Đã hoàn thành Ngày ${day} (+${currentItem.points} điểm rèn luyện)`);
    }
    setCompletedDays(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ tiến độ 21 ngày thử thách?')) {
      setCompletedDays([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      showToast('Đã đặt lại tiến độ.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const text = `Ngày ${currentItem.day}: ${currentItem.title}. Chuẩn mực: ${currentItem.pillar}. Lời Bác dạy: ${currentItem.quote}. Nhiệm vụ hôm nay: ${currentItem.actionTask}. Tự soi rọi: ${currentItem.reflectionQuestion}`;
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
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header Banner */}
        <div
          className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
          style={{ backgroundColor: '#751D2C' }}
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
              <span>Chương Trình Rèn Luyện Thực Hành 2026</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug">
              Thử Thách 21 Ngày "Học Và Làm Theo Bác"
            </h3>
            <p className="text-xs text-amber-200">
              Chuyển hóa 5 Chuẩn Mực Đạo Đức (Quy định 144-QĐ/TW) thành thói quen phụng sự hàng ngày
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

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-slate-900 text-amber-300 px-4 py-1.5 text-xs font-bold shadow-xl border border-amber-400 animate-in fade-in slide-in-from-top-2">
            {toastMessage}
          </div>
        )}

        {/* Progress Tracker Bar */}
        <div className="bg-amber-50/80 border-b border-amber-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#751D2C] flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-600" />
              Tiến độ: {completedDays.length}/21 ngày ({progressPercent}%)
            </span>
            <span className="rounded-md bg-amber-200/80 px-2 py-0.5 font-bold text-amber-900">
              Tổng điểm: {totalPoints} điểm
            </span>
          </div>

          <div className="flex items-center gap-2">
            {completedDays.length === 21 && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenCertificate) onOpenCertificate(userName, chiBoName);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all cursor-pointer animate-pulse"
              >
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span>Nhận Giấy Chứng Nhận Tiên Phong</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="text-slate-500 hover:text-red-700 p-1 cursor-pointer"
              title="Đặt lại tiến độ"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Body 2 columns: Day Selector + Daily Card Detail */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 overflow-y-auto flex-1">
          {/* Left: 21 Days Timeline Grid */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Hành trình 21 ngày:
              </span>
              <span className="text-[11px] text-slate-500 italic">Nhấp để xem ngày</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {TWENTY_ONE_DAY_CHALLENGE.map((item) => {
                const done = completedDays.includes(item.day);
                const isSelected = selectedDay === item.day;
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setSelectedDay(item.day)}
                    className={`rounded-2xl border p-2.5 text-center flex flex-col items-center justify-center gap-1 cursor-pointer relative lucian-spring-btn hover:scale-105 active:scale-95 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#751D2C] bg-red-50 text-[#751D2C] ring-2 ring-red-300 shadow-sm'
                        : done
                        ? 'border-emerald-300 bg-emerald-50/60 text-emerald-900 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-amber-300 text-slate-700 shadow-2xs'
                    }`}
                  >
                    <span className="text-lg">{item.badgeIcon}</span>
                    <span className="text-[11px] font-black">Ngày {item.day}</span>
                    {done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 absolute top-1.5 right-1.5" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-300 absolute top-1.5 right-1.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Profile for Certificate */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">Thông tin đảng viên nhận chứng nhận:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    try { localStorage.setItem(USERNAME_KEY, e.target.value); } catch {}
                  }}
                  placeholder="Họ và tên..."
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs"
                />
                <input
                  type="text"
                  value={chiBoName}
                  onChange={(e) => {
                    setChiBoName(e.target.value);
                    try { localStorage.setItem(CHIBO_KEY, e.target.value); } catch {}
                  }}
                  placeholder="Chi bộ..."
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Right: Selected Day Challenge Detail */}
          <div className="md:col-span-7 rounded-2xl border-2 border-amber-200 bg-white p-5 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              {/* Pillar Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-lg bg-red-100 text-[#751D2C] px-2.5 py-0.5 text-xs font-black">
                  Ngày {currentItem.day} · {currentItem.pillar}
                </span>
                <span className="rounded-lg bg-amber-100 text-amber-900 px-2 py-0.5 text-[11px] font-bold">
                  +{currentItem.points} Điểm
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                {currentItem.title}
              </h4>

              {/* Quote from Uncle Ho */}
              <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 space-y-1.5 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#751D2C]">
                  <Star className="w-3.5 h-3.5 text-amber-600 fill-current" />
                  <span>Lời Bác dạy:</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-800 italic leading-relaxed">
                  "{currentItem.quote}"
                </p>
                <div className="text-[11px] text-slate-500 font-mono text-right">
                  — {currentItem.quoteSource}
                </div>
              </div>

              {/* Action Task */}
              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/60 p-4 space-y-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Nhiệm vụ hành động hôm nay:
                </span>
                <p className="text-xs sm:text-[13px] text-blue-950 font-medium leading-relaxed">
                  {currentItem.actionTask}
                </p>
              </div>

              {/* Reflection question */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-1">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Câu hỏi tự soi rọi:
                </span>
                <p className="text-xs text-emerald-950 italic leading-relaxed">
                  "{currentItem.reflectionQuestion}"
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSpeech}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  speaking ? 'bg-rose-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{speaking ? 'Dừng đọc' : 'Nghe diễn cảm'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompleteDay(currentItem.day)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#751D2C] hover:bg-[#8E2435] text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Đã hoàn thành (Bấm để hủy)' : 'Tôi đã hoàn thành nhiệm vụ này'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 text-[11px] hidden sm:inline">
            Thực hiện Chỉ thị 07-CT/TW &amp; Quy định 144-QĐ/TW tại Đảng bộ Phường Thủ Dầu Một
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
