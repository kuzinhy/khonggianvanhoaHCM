// <!-- Lucian UX/UI Prompt #055 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#055 -->
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { type HistoricalSpeechAudio } from '../data/hcmMultimediaData';

export interface LucianVinylAudioPlayerProps {
  speeches: HistoricalSpeechAudio[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  isPlaying?: boolean;
  onTogglePlay?: (playing: boolean) => void;
  onShareQr?: () => void;
  playbackRate?: number;
  onPlaybackRateChange?: (rate: number) => void;
}

// Visual themes for historical records (Sleeve colors and typographic badges)
const VINYL_THEMES: Array<{
  sleeveText: string;
  a1: string;
  a2: string;
  durationSec: number;
}> = [
  { sleeveText: 'TUYÊN NGÔN<br>1945', a1: '#DC2626', a2: '#D97706', durationSec: 275 },
  { sleeveText: 'TOÀN QUỐC<br>1946', a1: '#B91C1C', a2: '#EA580C', durationSec: 192 },
  { sleeveText: 'ĐỘC LẬP<br>TỰ DO', a1: '#C2410C', a2: '#B45309', durationSec: 320 },
  { sleeveText: 'XUÂN KỶ DẬU<br>1969', a1: '#BE123C', a2: '#E11D48', durationSec: 105 },
  { sleeveText: 'THANH NIÊN<br>1956', a1: '#0F766E', a2: '#0284C7', durationSec: 220 },
  { sleeveText: 'DI CHÚC<br>1969', a1: '#7C3AED', a2: '#9333EA', durationSec: 375 },
];

function formatTime(s: number): string {
  const rounded = Math.round(s);
  const m = Math.floor(rounded / 60);
  const sec = rounded % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

export const LucianVinylAudioPlayer: React.FC<LucianVinylAudioPlayerProps> = ({
  speeches,
  currentIndex,
  onSelectIndex,
  isPlaying: externalIsPlaying,
  onTogglePlay,
  onShareQr,
  playbackRate = 1,
  onPlaybackRateChange,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const sleeveRef = useRef<HTMLDivElement>(null);

  const [internalIsPlaying, setInternalIsPlaying] = useState<boolean>(false);
  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;

  const [pos, setPos] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const currentSpeech = speeches[currentIndex] || speeches[0];
  const currentTheme = VINYL_THEMES[currentIndex % VINYL_THEMES.length] || VINYL_THEMES[0];
  const totalDuration = currentTheme.durationSec;

  // Handle play/pause toggle
  const togglePlay = () => {
    const next = !isPlaying;
    if (onTogglePlay) {
      onTogglePlay(next);
    } else {
      setInternalIsPlaying(next);
    }
  };

  // Skip track
  const skip = (dir: number) => {
    const nextIdx = (currentIndex + dir + speeches.length) % speeches.length;
    setPos(0);
    onSelectIndex(nextIdx);

    // Sleeve animation
    if (sleeveRef.current) {
      const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!rm) {
        sleeveRef.current.animate(
          [
            { transform: 'none', opacity: 1 },
            { transform: `translateX(${-dir * 60}px) rotate(${-dir * 8}deg)`, opacity: 0 },
          ],
          { duration: 220, easing: 'ease-in' }
        ).onfinish = () => {
          sleeveRef.current?.animate(
            [
              { transform: `translateX(${dir * 60}px) rotate(${dir * 8}deg)`, opacity: 0 },
              { transform: 'none', opacity: 1 },
            ],
            { duration: 520, easing: 'cubic-bezier(.34,1.4,.64,1)' }
          );
        };
      }
    }
  };

  // Playback timer with playbackRate scaling
  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const intervalTime = Math.max(200, Math.round(1000 / (playbackRate || 1)));
    const interval = setInterval(() => {
      setPos((prev) => {
        if (prev >= totalDuration) {
          skip(1);
          return 0;
        }
        return prev + 1;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, isDragging, totalDuration, currentIndex, playbackRate]);

  // Update progress percentage
  const progressPercent = useMemo(() => {
    return Math.max(0, Math.min(100, (pos / totalDuration) * 100));
  }, [pos, totalDuration]);

  // Pointer drag on progress bar
  const handleSeek = (clientX: number) => {
    if (!progRef.current) return;
    const rect = progRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPos(ratio * totalDuration);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    progRef.current?.setPointerCapture(e.pointerId);
    handleSeek(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleSeek(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setPos((p) => Math.min(totalDuration, p + 5));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(totalDuration);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`ux u055 ${isPlaying ? 'is-on' : ''}`}
      style={
        {
          '--a1': currentTheme.a1,
          '--a2': currentTheme.a2,
          '--p': `${progressPercent.toFixed(2)}%`,
          '--spin-speed': `${(2.2 / (playbackRate || 1)).toFixed(2)}s`,
        } as React.CSSProperties
      }
    >
      {/* Vinyl Stage (Disc, Sleeve & Tone Arm) */}
      <div className="u055-stage" aria-hidden="true">
        {/* Vinyl Disc that slides out when playing */}
        <div className="u055-disc">
          <div className="u055-vinyl" />
        </div>

        {/* Record Sleeve with Historical Title */}
        <div
          ref={sleeveRef}
          className="u055-sleeve cursor-pointer"
          onClick={togglePlay}
          title="Nhấp để phát / tạm dừng đĩa than"
        >
          <b dangerouslySetInnerHTML={{ __html: currentTheme.sleeveText }} />
          <span className="absolute left-3.5 bottom-3 text-[10px] font-black uppercase tracking-wider text-white/80 bg-black/40 px-2 py-0.5 rounded-md">
            VOV Âm Bản Gốc
          </span>
        </div>

        {/* Tone Arm that rotates onto the spinning record */}
        <span className="u055-arm">
          <i />
        </span>
      </div>

      {/* Track Info & Like Action */}
      <div className="u055-row mt-1">
        <div className="u055-t" aria-live="polite">
          <b className="truncate" title={currentSpeech.title}>
            {currentSpeech.title}
          </b>
          <small>
            Chủ tịch Hồ Chí Minh · {currentSpeech.date}
          </small>
        </div>

        <button
          className="u055-like cursor-pointer"
          type="button"
          aria-pressed={isLiked}
          aria-label={isLiked ? 'Bỏ thích bản ghi âm' : 'Yêu thích bản ghi âm'}
          onClick={() => setIsLiked(!isLiked)}
          title={isLiked ? 'Đã yêu thích' : 'Yêu thích'}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          </svg>
        </button>
      </div>

      {/* Progress Timeline Slider with Drag Knob */}
      <div
        ref={progRef}
        className={`u055-prog ${isDragging ? 'drag' : ''}`}
        role="slider"
        tabIndex={0}
        aria-label="Tiến độ phát âm thanh bản ghi âm"
        aria-valuemin={0}
        aria-valuemax={totalDuration}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${formatTime(pos)} / ${formatTime(totalDuration)}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <div className="u055-rail">
          <span className="u055-fill" />
          <span className="u055-knob" />
        </div>
      </div>

      {/* Time Display */}
      <div className="u055-times">
        <span className="u055-cur">{formatTime(pos)}</span>
        <span className="u055-tot">{formatTime(totalDuration)}</span>
      </div>

      {/* Playback Controls (Rewind 10s, Prev, Big Play/Pause, Next) */}
      <div className="u055-ctl">
        <button
          className="u055-c u055-rw cursor-pointer"
          type="button"
          aria-label="Tua lại 10 giây"
          onClick={() => setPos((p) => Math.max(0, p - 10))}
          title="Tua lại 10 giây"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        <button
          className="u055-c u055-prev cursor-pointer"
          type="button"
          aria-label="Bản ghi âm trước"
          onClick={() => (pos > 3 ? setPos(0) : skip(-1))}
          title="Bản ghi âm trước"
        >
          <svg viewBox="0 0 24 24">
            <path d="M7 6h2v12H7zM20 6.5v11a.5.5 0 0 1-.8.4L11 12.4a.5.5 0 0 1 0-.8l8.2-5.5a.5.5 0 0 1 .8.4z" />
          </svg>
        </button>

        <button
          className="u055-c u055-pp cursor-pointer"
          type="button"
          aria-label={isPlaying ? 'Tạm dừng máy hát' : 'Phát đĩa than'}
          onClick={togglePlay}
          title={isPlaying ? 'Tạm dừng máy hát đĩa' : 'Hạ kim phát đĩa than'}
        >
          <svg viewBox="0 0 24 24">
            {isPlaying ? (
              <path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" />
            ) : (
              <path d="M8 5.5l11 6.5-11 6.5z" />
            )}
          </svg>
        </button>

        <button
          className="u055-c u055-next cursor-pointer"
          type="button"
          aria-label="Bản ghi âm kế tiếp"
          onClick={() => skip(1)}
          title="Bản ghi âm kế tiếp"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 6h2v12h-2zM4 6.5v11a.5.5 0 0 0 .8.4L13 12.4a.5.5 0 0 0 0-.8L4.8 6.1a.5.5 0 0 0-.8.4z" />
          </svg>
        </button>
      </div>

      {/* Speed Selector: 0.8x, 1x, 1.25x */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-2 border-t border-white/10 text-[11px]">
        <span className="text-slate-400 text-[10.5px] font-medium">Tốc độ:</span>
        {[0.8, 1, 1.25].map((spd) => (
          <button
            key={spd}
            type="button"
            onClick={() => onPlaybackRateChange?.(spd)}
            className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold transition-all cursor-pointer ${
              playbackRate === spd
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            {spd}x
          </button>
        ))}
      </div>

      {/* Scoped CSS based on Lucian UX/UI Prompt #055 */}
      <style>{`
        .u055 {
          position: relative;
          width: 100%;
          max-width: 330px;
          min-height: 485px;
          display: flex;
          flex-direction: column;
          padding: 0 22px 16px;
          border-radius: 32px;
          background: #11141E;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 30px 60px -36px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          margin: 0 auto;
          color: #F8FAFC;
        }
        .u055::before {
          content: "";
          position: absolute;
          left: -40px;
          right: -40px;
          top: -80px;
          height: 300px;
          background: radial-gradient(closest-side, color-mix(in srgb, var(--a1) 32%, transparent), transparent);
          transition: background .8s;
          pointer-events: none;
        }
        .u055-stage {
          position: relative;
          height: 250px;
          flex: none;
          margin: 0 -22px;
        }
        .u055-disc {
          position: absolute;
          left: 30px;
          top: 34px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          transition: transform .9s cubic-bezier(.34, 1.45, .64, 1);
        }
        .u055.is-on .u055-disc {
          transform: translateX(86px);
        }
        .u055-vinyl {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            radial-gradient(circle, transparent 20%, rgba(255,255,255,.08) 20.5%, transparent 21%),
            repeating-radial-gradient(circle, #0F1117 0 2px, #1F2430 2px 3.2px);
          box-shadow: 0 18px 30px -16px rgba(0,0,0,.7);
          animation: u055-spin var(--spin-speed, 2.2s) linear infinite paused;
        }
        .u055-vinyl::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(from 30deg, transparent, rgba(255,255,255,.16) 10%, transparent 22%, transparent 50%, rgba(255,255,255,.12) 60%, transparent 72%);
        }
        .u055-vinyl::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 64px;
          height: 64px;
          margin: -32px 0 0 -32px;
          border-radius: 50%;
          background: radial-gradient(circle, #0B0D13 0 3px, transparent 3.5px), linear-gradient(140deg, var(--a1), var(--a2));
          transition: background .6s;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.15);
        }
        .u055.is-on .u055-vinyl {
          animation-play-state: running;
        }
        .u055-sleeve {
          position: absolute;
          left: 20px;
          top: 24px;
          width: 210px;
          height: 210px;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(150deg, var(--a1), var(--a2));
          box-shadow: 0 24px 36px -20px rgba(10, 5, 20, .8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .u055-sleeve::before {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          left: -30px;
          bottom: -40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.45), transparent 65%);
        }
        .u055-sleeve::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, rgba(255,255,255,.18), transparent 40%);
        }
        .u055-sleeve b {
          position: absolute;
          right: 14px;
          top: 14px;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -.05em;
          color: rgba(255,255,255,.95);
          line-height: .95;
          text-align: right;
          font-family: ui-sans-serif, system-ui, sans-serif;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .u055-arm {
          position: absolute;
          right: 20px;
          top: 20px;
          width: 20px;
          height: 116px;
          transform-origin: 10px 10px;
          transform: rotate(-8deg);
          transition: transform .8s cubic-bezier(.34, 1.45, .64, 1);
          z-index: 2;
        }
        .u055.is-on .u055-arm {
          transform: rotate(28deg);
          transition-delay: .35s;
        }
        .u055-arm::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #334155;
          box-shadow: inset 0 0 0 5px #1E293B, 0 2px 6px rgba(0,0,0,.4);
        }
        .u055-arm::after {
          content: "";
          position: absolute;
          left: 8px;
          top: 16px;
          width: 4px;
          height: 84px;
          border-radius: 2px;
          background: #94A3B8;
        }
        .u055-arm i {
          position: absolute;
          left: 5px;
          top: 96px;
          width: 10px;
          height: 18px;
          border-radius: 3px;
          background: #CBD5E1;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .u055-row {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .u055-t {
          flex: 1;
          min-width: 0;
        }
        .u055-t b {
          display: block;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #F8FAFC;
        }
        .u055-t small {
          display: block;
          margin-top: 2px;
          font-size: 12px;
          font-weight: 600;
          color: #94A3B8;
        }
        .u055-like {
          width: 38px;
          height: 38px;
          border: 0;
          padding: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.08);
          color: #94A3B8;
          transition: transform .35s cubic-bezier(.34, 1.45, .64, 1), color .3s;
        }
        .u055-like svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linejoin: round;
        }
        .u055-like[aria-pressed="true"] {
          color: #EF4444;
          background: rgba(239, 68, 68, 0.15);
        }
        .u055-like[aria-pressed="true"] svg {
          fill: currentColor;
          animation: u055-pop .45s cubic-bezier(.34, 1.45, .64, 1);
        }
        @keyframes u055-pop {
          40% { transform: scale(1.35); }
        }
        .u055-prog {
          position: relative;
          height: 28px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          touch-action: none;
        }
        .u055-rail {
          position: relative;
          width: 100%;
          height: 5px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.15);
          transition: height .25s;
        }
        .u055-prog:hover .u055-rail,
        .u055-prog.drag .u055-rail {
          height: 8px;
        }
        .u055-fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: var(--p);
          border-radius: inherit;
          background: linear-gradient(90deg, var(--a1), var(--a2));
          transition: background .6s;
        }
        .u055-knob {
          position: absolute;
          top: 50%;
          left: var(--p);
          width: 16px;
          height: 16px;
          margin: -8px 0 0 -8px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,.4);
          transform: scale(.7);
          transition: transform .3s cubic-bezier(.34, 1.45, .64, 1);
        }
        .u055-prog:hover .u055-knob,
        .u055-prog.drag .u055-knob,
        .u055-prog:focus-visible .u055-knob {
          transform: none;
        }
        .u055-prog:focus-visible {
          outline: none;
        }
        .u055-prog:focus-visible .u055-rail {
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.4);
        }
        .u055-times {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 650;
          color: #94A3B8;
          font-variant-numeric: tabular-nums;
        }
        .u055-ctl {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: auto;
        }
        .u055-c {
          width: 44px;
          height: 44px;
          border: 0;
          padding: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: none;
          color: #F8FAFC;
          transition: transform .3s cubic-bezier(.34, 1.45, .64, 1), background-color .3s;
        }
        .u055-c:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .u055-c:active {
          transform: scale(.88);
        }
        .u055-c svg {
          width: 22px;
          height: 22px;
          fill: currentColor;
        }
        .u055-pp {
          width: 64px;
          height: 64px;
          background: #F8FAFC;
          color: #0F172A;
          box-shadow: 0 14px 24px -12px rgba(0, 0, 0, 0.6);
        }
        .u055-pp:hover {
          background: #FFFFFF;
          transform: scale(1.06);
        }
        .u055-pp svg {
          width: 26px;
          height: 26px;
        }
        .u055-c:focus-visible,
        .u055-like:focus-visible {
          outline: 2px solid #F59E0B;
          outline-offset: 3px;
        }
        @keyframes u055-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .u055-vinyl {
            animation: none !important;
          }
          .u055-disc, .u055-arm {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};
