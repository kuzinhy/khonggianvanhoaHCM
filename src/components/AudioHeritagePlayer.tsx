import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
  BookOpen,
  Radio,
  FileText,
  RotateCcw,
  Mic,
  Sparkles,
} from 'lucide-react';
import { AUDIO_ARCHIVE_4, type AudioArchiveItem } from '../hcmCoreDataset';

interface AudioHeritagePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayingChange?: (isPlaying: boolean) => void;
  onOpenVoiceStudio?: () => void;
}

export const AudioHeritagePlayer: React.FC<AudioHeritagePlayerProps> = ({
  isOpen,
  onClose,
  onPlayingChange,
  onOpenVoiceStudio,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack: AudioArchiveItem = AUDIO_ARCHIVE_4[currentIndex] || AUDIO_ARCHIVE_4[0];
  const timerRef = useRef<any>(null);
  const onPlayingChangeRef = useRef(onPlayingChange);

  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChange;
  }, [onPlayingChange]);

  useEffect(() => {
    onPlayingChangeRef.current?.(isPlaying);
  }, [isPlaying]);

  // Handle play/pause timer for original historical audio recording
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % AUDIO_ARCHIVE_4.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + AUDIO_ARCHIVE_4.length) % AUDIO_ARCHIVE_4.length);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Floating Bottom Music / Recital Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="rounded-2xl bg-gradient-to-r from-[#6B0408] via-[#85080C] to-[#500305] text-white p-3 sm:p-4 shadow-2xl border-2 border-gold-star/80 backdrop-blur-md">
          {/* Top Row: Track Information & Close */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gold-star/20 border border-gold-star flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5 text-gold-star" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-gold-star text-crimson-950 px-1.5 py-0.2 rounded-sm">
                    Tư liệu {currentIndex + 1}/{AUDIO_ARCHIVE_4.length}
                  </span>
                  <span className="text-[11px] text-amber-200/90 font-medium">
                    {currentTrack.date} · {currentTrack.duration}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate font-serif">
                  {currentTrack.title}
                </h4>
              </div>
            </div>

            {/* Actions: View Transcript & Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              {onOpenVoiceStudio && (
                <button
                  type="button"
                  onClick={onOpenVoiceStudio}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-[11px] font-bold text-amber-200 border border-amber-400/40 cursor-pointer transition-colors"
                  title="Mở phòng thu giọng đọc AI VieNeu-TTS (CIT Voice Studio)"
                >
                  <Mic className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Studio AI</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowTranscript(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-amber-100 border border-amber-300/30 cursor-pointer transition-colors"
                title="Xem toàn văn bản ghi âm"
              >
                <FileText className="w-3.5 h-3.5 text-gold-star" />
                <span className="hidden sm:inline">Toàn văn</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-amber-200 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mb-2.5">
            <div
              className="bg-gradient-to-r from-amber-400 to-gold-star h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Bottom Row: Controls */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] text-amber-200/80 truncate hidden md:inline">
              Nguồn: {currentTrack.source}
            </span>

            {/* Playback Controls */}
            <div className="flex items-center gap-3 mx-auto">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 text-amber-200 hover:text-white transition-colors cursor-pointer"
                title="Bản ghi trước"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold-star hover:bg-amber-300 text-crimson-950 font-black flex items-center justify-center shadow-gold-glow transition-transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Tạm dừng' : 'Phát bản ghi'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 text-amber-200 hover:text-white transition-colors cursor-pointer"
                title="Bản ghi kế tiếp"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Heritage Preservation Badge & Equalizer animation */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-400/20 border border-amber-300/50 text-amber-200 px-2.5 py-0.5 rounded-full font-bold hidden sm:inline-flex items-center gap-1">
                🛡️ Bản Ghi Âm Gốc Bác Hồ (Không Dùng AI)
              </span>

              <div className="flex items-end gap-1 h-4">
                <span className={`w-1 bg-gold-star rounded-full ${isPlaying ? 'h-3 animate-bounce' : 'h-1'}`}></span>
                <span className={`w-1 bg-gold-star rounded-full ${isPlaying ? 'h-4 animate-bounce delay-100' : 'h-1.5'}`}></span>
                <span className={`w-1 bg-gold-star rounded-full ${isPlaying ? 'h-2 animate-bounce delay-200' : 'h-1'}`}></span>
                <span className={`w-1 bg-gold-star rounded-full ${isPlaying ? 'h-3.5 animate-bounce delay-75' : 'h-2'}`}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Toàn văn bản ghi âm */}
      {showTranscript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#FCF8F2] rounded-3xl border-2 border-gold-star p-6 sm:p-8 shadow-2xl text-slate-800 space-y-4 max-h-[85vh] flex flex-col">
            {/* Header Modal */}
            <div className="flex items-start justify-between pb-3 border-b border-amber-900/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-crimson-royal text-gold-star text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    VĂN KIỆN TOÀN VĂN
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{currentTrack.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-crimson-deep font-serif">
                  {currentTrack.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTranscript(false)}
                className="p-1 rounded-full text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sacred Preservation Banner */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-2.5 text-xs text-amber-950 font-semibold flex items-center gap-2">
              <span className="text-base">🛡️</span>
              <span>
                <strong>Bảo tồn nguyên bản:</strong> Bản ghi âm được lưu trữ và giữ nguyên vẹn 100% từ Đài Tiếng nói Việt Nam (VOV) &amp; Trung tâm Lưu trữ Quốc gia III. Tuyệt đối không can thiệp hoặc thay thế bằng công nghệ AI.
              </span>
            </div>

            {/* Content with Parchment Styling */}
            <div className="overflow-y-auto space-y-4 pr-2 font-serif leading-relaxed text-sm sm:text-base text-slate-800 border-l-4 border-crimson-royal pl-4 italic bg-white/50 p-4 rounded-xl">
              {currentTrack.transcript.split('\n\n').map((para, i) => (
                <p key={i} className="text-justify">
                  "{para}"
                </p>
              ))}
            </div>

            {/* Footer Modal */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-amber-900/10">
              <span>Nguồn lưu trữ: {currentTrack.source}</span>
              <button
                type="button"
                onClick={() => {
                  setShowTranscript(false);
                  setIsPlaying(true);
                }}
                className="px-4 py-2 rounded-xl bg-crimson-royal hover:bg-crimson-deep text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nghe bản ghi này</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
