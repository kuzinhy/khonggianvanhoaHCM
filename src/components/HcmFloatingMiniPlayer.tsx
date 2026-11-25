import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  X,
  Radio,
  ExternalLink,
  Volume2,
  VolumeX,
  Disc,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useApp } from '../AppContext';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmFloatingMiniPlayerProps {
  currentTab: string;
  onOpenMultimedia: () => void;
}

export const HcmFloatingMiniPlayer: React.FC<HcmFloatingMiniPlayerProps> = ({
  currentTab,
  onOpenMultimedia,
}) => {
  const { activeSpeech, setActiveSpeech, isGlobalAudioPlaying, setIsGlobalAudioPlaying } = useApp();
  const [isSfxMuted, setIsSfxMuted] = useState(() => hcmSfx.isMuted());
  const [isExpanded, setIsExpanded] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Kiểm tra nếu đang ở trang Đa phương tiện
  const isAtMultimedia = currentTab === 'MEDIA' || currentTab === 'da-phuong-tien';

  // Đồng bộ âm thanh nền khi người dùng duyệt các trang khác
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAtMultimedia) {
      // Khi đang ở trang Media thì tạm dừng audio của mini player để LucianVinylAudioPlayer phát
      audio.pause();
      return;
    }

    if (activeSpeech?.audioUrl) {
      if (!audio.src || (!audio.src.endsWith(activeSpeech.audioUrl) && !audio.src.includes(activeSpeech.audioUrl))) {
        audio.src = activeSpeech.audioUrl;
        audio.load();
      }
      if (isGlobalAudioPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    } else {
      audio.pause();
    }
  }, [activeSpeech, isGlobalAudioPlaying, isAtMultimedia]);

  if (!activeSpeech) return null;
  // Không hiển thị mini player đè lên khi đang ở đúng trang Đa phương tiện
  if (isAtMultimedia) return null;

  const togglePlay = () => {
    hcmSfx.playClick(600);
    setIsGlobalAudioPlaying(!isGlobalAudioPlaying);
  };

  const toggleSfx = () => {
    const nextMuted = hcmSfx.toggleMute();
    setIsSfxMuted(nextMuted);
    if (!nextMuted) hcmSfx.playClick(900);
  };

  const handleClose = () => {
    hcmSfx.playClick(400);
    setIsGlobalAudioPlaying(false);
    setActiveSpeech(null);
  };

  return (
    <aside
      aria-label="Trình phát âm thanh thu nhỏ"
      className="fixed bottom-5 right-5 z-[999] select-none animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div
        style={{ backgroundColor: '#0f172a' }}
        className="relative group rounded-2xl p-3 bg-slate-900 border-2 border-rose-500/80 text-white shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex items-center gap-3 max-w-[92vw] sm:max-w-md ring-1 ring-white/10"
      >
        {/* Glow viền hồng nhè nhẹ */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-amber-500 rounded-2xl blur-xs opacity-40 group-hover:opacity-60 transition-opacity -z-10" />

        {/* Đĩa than mini xoay tròn sống động */}
        <div
          onClick={togglePlay}
          className="relative cursor-pointer shrink-0"
          title={isGlobalAudioPlaying ? 'Nhấp để tạm dừng' : 'Nhấp để tiếp tục phát'}
        >
          <div
            className={`w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400/80 shadow-lg flex items-center justify-center relative overflow-hidden ${
              isGlobalAudioPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          >
            {/* Rãnh đĩa than vàng đồng */}
            <div className="absolute inset-1 rounded-full border border-amber-500/40" />
            <div className="absolute inset-2.5 rounded-full border border-amber-500/30" />
            {/* Nhãn tâm đĩa đỏ cờ */}
            <div className="w-4 h-4 rounded-full bg-rose-700 border border-amber-300 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
            </div>
          </div>

          {/* Icon trạng thái Play/Pause đè lên giữa */}
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-600 border border-white flex items-center justify-center shadow-md text-white">
            {isGlobalAudioPlaying ? (
              <Pause className="w-2.5 h-2.5 fill-current" />
            ) : (
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            )}
          </span>
        </div>

        {/* Thông tin bài phát biểu */}
        <div className="min-w-0 pr-1 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[9.5px] font-black uppercase tracking-wider text-rose-300 bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-700">
              <Radio className="w-2.5 h-2.5 text-rose-400 animate-pulse" />
              <span>VOV 100% Gốc</span>
            </span>
            <span className="text-[10px] text-amber-300 font-mono font-bold">{activeSpeech.year}</span>
          </div>

          <h5
            onClick={onOpenMultimedia}
            className="text-xs font-bold text-white hover:text-amber-300 transition-colors truncate cursor-pointer leading-tight mt-0.5 drop-shadow-xs"
            title={activeSpeech.title}
          >
            {activeSpeech.title}
          </h5>

          {/* Dải sóng âm equalizer mini khi đang phát */}
          {isGlobalAudioPlaying ? (
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1 bg-amber-400 rounded-full animate-eq-1 h-3" />
              <span className="w-1 bg-amber-400 rounded-full animate-eq-2 h-4" />
              <span className="w-1 bg-amber-400 rounded-full animate-eq-3 h-2" />
              <span className="w-1 bg-amber-400 rounded-full animate-eq-4 h-3.5" />
              <span className="text-[10px] text-emerald-400 font-bold ml-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Đang phát giọng Bác
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-slate-400 italic block mt-0.5 font-medium">Tạm dừng</span>
          )}
        </div>

        {/* Các nút tác vụ nhanh */}
        <div className="flex items-center gap-1 shrink-0 border-l border-white/20 pl-2">
          {/* Mở toàn màn hình / trang Đa phương tiện */}
          <button
            type="button"
            onClick={onOpenMultimedia}
            className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer shadow-2xs"
            title="Mở Máy Hát Đĩa Than Lịch Sử đầy đủ"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Nút bật/tắt âm thanh tương tác */}
          <button
            type="button"
            onClick={toggleSfx}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs ${
              isSfxMuted
                ? 'bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title={isSfxMuted ? 'Bật âm thanh giao diện' : 'Tắt âm thanh giao diện'}
          >
            {isSfxMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Đóng mini player */}
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/15 hover:bg-rose-600 text-white transition-colors cursor-pointer shadow-2xs"
            title="Đóng trình phát thu nhỏ"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Persistent HTML5 Audio for seamless background playback */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => {
          setIsGlobalAudioPlaying(false);
        }}
      />
    </aside>
  );
};
