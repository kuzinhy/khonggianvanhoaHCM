import React, { useState, useEffect, useMemo } from 'react';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  Copy,
  Check,
  Share2,
  Heart,
  Eye,
  Film,
  Sparkles,
  Clock,
  ExternalLink,
  Layers,
  Search,
  Smartphone,
  Quote,
  Flame,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  HISTORICAL_SPEECHES_AUDIO,
  YOUTH_SHORT_VIDEOS,
  type HistoricalSpeechAudio,
  type YouthShortVideo,
} from '../data/hcmMultimediaData';
import { VIDEO_DOCUMENTARIES_11, type VideoDocumentaryItem } from '../hcmCoreDataset';
import { LucianVinylAudioPlayer } from './LucianVinylAudioPlayer';
import { LucianQrShareModal } from './LucianQrShareModal';
import { useApp } from '../AppContext';
import { hcmSfx } from '../services/hcmSoundEffects';

export const HcmMultimediaMasterView: React.FC = () => {
  const { activeSpeech, setActiveSpeech, isGlobalAudioPlaying, setIsGlobalAudioPlaying } = useApp();

  // Main multimedia tabs: AUDIO (Âm vang lời Bác) | SHORTS (Video ngắn sáng tạo) | CINEMA (Phim tư liệu)
  const [activeMediaTab, setActiveMediaTab] = useState<'AUDIO' | 'SHORTS' | 'CINEMA'>('AUDIO');

  // --- AUDIO PLAYER STATE ---
  const [selectedSpeech, setSelectedSpeech] = useState<HistoricalSpeechAudio>(() => {
    return activeSpeech || HISTORICAL_SPEECHES_AUDIO[0];
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isVinylPlaying, setIsVinylPlaying] = useState<boolean>(() => isGlobalAudioPlaying);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showVideoVisual, setShowVideoVisual] = useState<boolean>(false);

  // Tự động đồng bộ trạng thái khi activeSpeech hoặc isGlobalAudioPlaying thay đổi từ bên ngoài (Floating Mini Player)
  useEffect(() => {
    if (activeSpeech && activeSpeech.id !== selectedSpeech.id) {
      setSelectedSpeech(activeSpeech);
    }
  }, [activeSpeech, selectedSpeech.id]);

  useEffect(() => {
    setIsVinylPlaying(isGlobalAudioPlaying);
  }, [isGlobalAudioPlaying]);

  const safeSpeechIndex = useMemo(() => {
    const idx = HISTORICAL_SPEECHES_AUDIO.findIndex((s) => s.id === selectedSpeech.id);
    return idx >= 0 ? idx : 0;
  }, [selectedSpeech.id]);

  // Đồng bộ với AppContext
  const handleSelectSpeech = (speech: HistoricalSpeechAudio) => {
    hcmSfx.playNeedleDrop();
    setSelectedSpeech(speech);
    setIsVinylPlaying(true);
    setActiveSpeech(speech);
    setIsGlobalAudioPlaying(true);
  };

  const handleToggleVinylPlaying = (playing: boolean) => {
    if (playing) {
      hcmSfx.playNeedleDrop();
    } else {
      hcmSfx.playClick(500);
    }
    setIsVinylPlaying(playing);
    setIsGlobalAudioPlaying(playing);
    if (!activeSpeech) {
      setActiveSpeech(selectedSpeech);
    }
  };

  // --- SHORTS VIDEO STATE ---
  const [selectedShort, setSelectedShort] = useState<YouthShortVideo>(YOUTH_SHORT_VIDEOS[0]);
  const [shortCategory, setShortCategory] = useState<string>('ALL');
  const [shortLikes, setShortLikes] = useState<Record<string, number>>({});

  // --- CINEMA STATE ---
  const [selectedFilm, setSelectedFilm] = useState<VideoDocumentaryItem>(VIDEO_DOCUMENTARIES_11[0]);
  const [filmTopic, setFilmTopic] = useState<string>('Tất cả');

  const handleToggleShortLike = (id: string) => {
    setShortLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Filtered shorts
  const filteredShorts = useMemo(() => {
    if (shortCategory === 'ALL') return YOUTH_SHORT_VIDEOS;
    return YOUTH_SHORT_VIDEOS.filter((s) => s.category === shortCategory);
  }, [shortCategory]);

  // Filtered films
  const filmTopics = ['Tất cả', ...Array.from(new Set(VIDEO_DOCUMENTARIES_11.map((f) => f.topic)))];
  const filteredFilms = useMemo(() => {
    if (filmTopic === 'Tất cả') return VIDEO_DOCUMENTARIES_11;
    return VIDEO_DOCUMENTARIES_11.filter((f) => f.topic === filmTopic);
  }, [filmTopic]);

  return (
    <div className="space-y-4">
      {/* Top Header & Sub-Tab Switcher */}
      <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50/90 via-white to-rose-50/80 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-700 to-rose-900 text-white shadow-xs">
              <Radio className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Trung Tâm Đa Phương Tiện &amp; Truyền Thông Số Hồ Chí Minh
                </h3>
                <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-900 uppercase">
                  Bảo Tồn Âm Bản &amp; Video Trẻ
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Bản ghi âm giọng nói Bác Hồ nguyên bản, Kênh sáng tạo trẻ TikTok/Reels và Kho phim tư liệu lịch sử
              </p>
            </div>
          </div>

          {/* Sub-Tab Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveMediaTab('AUDIO')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                activeMediaTab === 'AUDIO'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Âm Vang Lời Bác (Nguyên Gốc VOV)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMediaTab('SHORTS')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                activeMediaTab === 'SHORTS'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Video Ngắn Gen Z (TikTok)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMediaTab('CINEMA')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                activeMediaTab === 'CINEMA'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>Kho Phim Tư Liệu</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. ÂM VANG LỜI BÁC: BẢN GHI ÂM LỊCH SỬ NGUYÊN BẢN (VOV & LƯU TRỮ QG) */}
      {/* ===================================================================== */}
      {activeMediaTab === 'AUDIO' && (
        <div className="space-y-4">
          {/* Sacred Strict Preservation Notice Banner */}
          <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-white to-red-50 p-4 shadow-sm flex items-start gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-black shrink-0 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-black text-rose-900 uppercase tracking-wide">
                  Cam Kết Bảo Tồn 100% Giọng Nói Nguyên Gốc Của Bác Hồ
                </h4>
                <span className="rounded-full bg-rose-700 text-white px-2 py-0.5 text-[10px] font-black uppercase">
                  Tuyệt đối không dùng AI
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Tất cả các bản phát âm thanh tại đây là <strong>bản ghi âm lịch sử nguyên bản</strong> của Chủ tịch Hồ Chí Minh do <strong>Đài Tiếng nói Việt Nam (VOV)</strong> và <strong>Trung tâm Lưu trữ Quốc gia III</strong> bảo tồn. Hệ thống phát trực tiếp âm bản lịch sử gốc qua trình phát lưu trữ chính thống, <strong>hoàn toàn không sử dụng công nghệ trí tuệ nhân tạo (AI/TTS)</strong> để thay thế, tái tạo hay làm sai lệch giọng nói thiêng liêng của Người.
              </p>
            </div>
          </div>

          {/* Main Showcase: Lucian #055 Vinyl Record Player + Archival VOV Player */}
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] p-5 sm:p-6 text-white shadow-lg space-y-5">
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                    Bản Ghi Âm Gốc · Bảo Vật Quốc Gia
                  </span>
                  <span className="rounded-md bg-rose-900/80 text-rose-200 border border-rose-700 px-2 py-0.5 text-[10px] font-bold">
                    Năm {selectedSpeech.year} · Thời lượng: {selectedSpeech.duration}
                  </span>
                  <span className="text-xs text-slate-400">{selectedSpeech.location}</span>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-serif text-amber-200 leading-snug">
                  {selectedSpeech.title}
                </h3>
                <p className="text-xs text-slate-400">{selectedSpeech.source}</p>
              </div>

              {/* Action Buttons: Direct Link, Copy, QR Share */}
              <div className="shrink-0 flex flex-wrap items-center gap-2">
                {selectedSpeech.youtubeId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedSpeech.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 text-xs shadow-xs transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Mở link gốc (VOV)</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/50 bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-200 hover:bg-amber-500/30 cursor-pointer transition-colors"
                  title="Chia sẻ mã QR bản ghi âm này"
                >
                  <Share2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>Chia sẻ mã QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(selectedSpeech.transcript).catch(() => {});
                    setCopiedId(selectedSpeech.id);
                    setTimeout(() => setCopiedId(null), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 cursor-pointer"
                >
                  {copiedId === selectedSpeech.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedId === selectedSpeech.id ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            {/* Split Grid: Lucian #055 Vinyl Record Player on Left + Embedded Archival Player on Right */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
              {/* Left: Lucian UX/UI Prompt #055 Vinyl Record Player */}
              <div className="xl:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-center space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">
                    Lucian UX/UI #055 Vinyl Player
                  </span>
                  <h4 className="text-xs font-bold text-slate-300">
                    Máy Hát Đĩa Than Lịch Sử
                  </h4>
                </div>
                <LucianVinylAudioPlayer
                  speeches={HISTORICAL_SPEECHES_AUDIO}
                  currentIndex={safeSpeechIndex}
                  onSelectIndex={(idx) => {
                    const next = HISTORICAL_SPEECHES_AUDIO[idx];
                    setSelectedSpeech(next);
                    setActiveSpeech(next);
                  }}
                  isPlaying={isVinylPlaying}
                  onTogglePlay={handleToggleVinylPlaying}
                  onShareQr={() => setIsQrModalOpen(true)}
                  playbackRate={playbackRate}
                  onPlaybackRateChange={setPlaybackRate}
                />
              </div>

              {/* Right: Archival Player + Transcript + Key Quotes */}
              <div className="xl:col-span-7 space-y-4">
                {/* Visual / Video Player Toggle & Container */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                      <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                      Âm Bản Gốc VOV &amp; TT Lưu Trữ Quốc Gia III
                    </span>
                    {selectedSpeech.youtubeId && (
                      <button
                        type="button"
                        onClick={() => setShowVideoVisual(!showVideoVisual)}
                        className="text-[11px] font-bold text-amber-200/80 hover:text-amber-100 underline cursor-pointer"
                      >
                        {showVideoVisual ? '✕ Thu gọn video tư liệu' : '▶ Xem video tư liệu hình ảnh'}
                      </button>
                    )}
                  </div>

                  {showVideoVisual && selectedSpeech.youtubeId ? (
                    <div className="relative aspect-video max-h-[260px] w-full rounded-2xl bg-black overflow-hidden shadow-2xl border border-amber-400/40">
                      <iframe
                        key={selectedSpeech.id}
                        src={`https://www.youtube-nocookie.com/embed/${selectedSpeech.youtubeId}?autoplay=${isVinylPlaying ? '1' : '0'}&rel=0&modestbranding=1`}
                        title={selectedSpeech.title}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-950/60 via-slate-900/80 to-slate-950 p-4 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isVinylPlaying
                            ? 'bg-rose-500/20 border-rose-400/50 text-rose-400 animate-pulse'
                            : 'bg-amber-500/20 border-amber-400/40 text-amber-400'
                        }`}>
                          <Radio className={`h-6 w-6 ${isVinylPlaying ? 'animate-bounce text-rose-400' : ''}`} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-rose-700 text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                              <span>●</span> GHI ÂM GỐC 100%
                            </span>
                            <span className="text-xs text-amber-200 font-bold">
                              Tốc độ: {playbackRate}x
                            </span>
                            {isVinylPlaying && (
                              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                                Đang phát âm thanh gốc VOV
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-200 leading-snug">
                            {isVinylPlaying
                              ? 'Đang phát âm bản gốc nguyên văn giọng đọc của Bác Hồ (VOV & Lưu trữ QG III)'
                              : 'Nhấn nút phát (Play) trên máy hát đĩa than để nghe giọng đọc của Bác'}
                          </p>
                        </div>
                      </div>

                      {/* Equalizer Wave Bars when playing */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {isVinylPlaying ? (
                          <div className="flex items-end gap-1 h-6 px-3 py-1 bg-black/40 rounded-lg border border-amber-400/30">
                            <span className="w-1 bg-amber-400 rounded-full animate-pulse h-3" />
                            <span className="w-1 bg-amber-400 rounded-full animate-pulse h-5" />
                            <span className="w-1 bg-amber-400 rounded-full animate-pulse h-2" />
                            <span className="w-1 bg-amber-400 rounded-full animate-pulse h-6" />
                            <span className="w-1 bg-amber-400 rounded-full animate-pulse h-4" />
                          </div>
                        ) : (
                          <div className="hidden sm:flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[11px] font-bold text-emerald-400 font-mono">Bảo vật quốc gia</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Transcript & Quotes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                  {/* Full Transcript */}
                  <div className="md:col-span-7 rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Quote className="h-4 w-4 text-amber-400" /> Toàn văn phát biểu nguyên bản:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(selectedSpeech.transcript).catch(() => {});
                          setCopiedId(selectedSpeech.id);
                          setTimeout(() => setCopiedId(null), 2000);
                        }}
                        className="text-[10.5px] text-slate-300 hover:text-amber-200 underline cursor-pointer"
                      >
                        {copiedId === selectedSpeech.id ? 'Đã sao chép' : 'Sao chép'}
                      </button>
                    </div>
                    <p className="text-xs font-serif italic text-slate-200 leading-relaxed max-h-44 overflow-y-auto pr-2 scrollbar-thin">
                      &ldquo;{selectedSpeech.transcript}&rdquo;
                    </p>
                  </div>

                  {/* Quotes & Significance */}
                  <div className="md:col-span-5 rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Câu nói bất hủ:
                      </span>
                      <ul className="space-y-1.5">
                        {selectedSpeech.keyQuotes.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-slate-200 text-[11.5px] leading-snug">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>&ldquo;{q}&rdquo;</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedSpeech.significance && (
                      <div className="pt-2.5 border-t border-white/10 text-[11px] text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-300">Ý nghĩa lịch sử:</strong> {selectedSpeech.significance}
                      </div>
                    )}

                    {selectedSpeech.academicCitation && (
                      <div className="pt-2 border-t border-white/10 text-[10.5px] text-amber-100/80 leading-relaxed font-sans">
                        <strong className="text-amber-300">Trích dẫn chuẩn:</strong> {selectedSpeech.academicCitation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* List of 6 Historical Speeches Cards - Flat Modern UI with Equalizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {HISTORICAL_SPEECHES_AUDIO.map((sp) => {
              const active = sp.id === selectedSpeech.id;
              return (
                <div
                  key={sp.id}
                  onClick={() => handleSelectSpeech(sp)}
                  className={`hcm-flat-card p-4 cursor-pointer flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                    active
                      ? 'border-rose-400 bg-gradient-to-br from-rose-50/90 via-white to-amber-50/40 shadow-md ring-2 ring-rose-400/80 -translate-y-1'
                      : 'border-slate-200/90 bg-white hover:border-rose-300 hover:shadow-md'
                  }`}
                >
                  {/* Subtle top indicator on active card */}
                  {active && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-400" />
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="rounded-lg bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 font-bold text-rose-800 flex items-center gap-1 shadow-2xs">
                        <Clock className="w-3 h-3 text-rose-600" />
                        {sp.year} · {sp.duration}
                      </span>
                      <span className="text-slate-500 font-medium text-[10.5px]">{sp.date}</span>
                    </div>

                    <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-rose-900 transition-colors line-clamp-2 leading-snug">
                      {sp.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 italic font-serif leading-relaxed">
                      "{sp.transcript}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                      <Radio className="h-3.5 w-3.5 text-rose-600 animate-pulse" />
                      <span>Giọng gốc VOV</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {active && isVinylPlaying && (
                        <div className="flex items-end gap-0.5 h-3.5" title="Đang phát âm thanh">
                          <span className="w-0.5 bg-rose-600 rounded-full animate-eq-1 h-3" />
                          <span className="w-0.5 bg-rose-600 rounded-full animate-eq-2 h-3.5" />
                          <span className="w-0.5 bg-rose-600 rounded-full animate-eq-3 h-2" />
                          <span className="w-0.5 bg-rose-600 rounded-full animate-eq-4 h-3" />
                        </div>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 font-bold ${
                          active ? 'text-rose-700' : 'text-slate-600 group-hover:text-rose-700'
                        }`}
                      >
                        {active ? (isVinylPlaying ? 'Đang phát...' : 'Đã chọn') : 'Nghe giọng Bác'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. VIDEO NGẮN & SÁNG TẠO TRẺ: MÔ HÌNH TIKTOK / REELS                  */}
      {/* ===================================================================== */}
      {activeMediaTab === 'SHORTS' && (
        <div className="space-y-4">
          {/* Category Filter for Shorts */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'Tất cả video ngắn' },
              { id: 'LICH_SU', label: 'Lịch sử qua góc nhìn trẻ' },
              { id: 'DI_TICH_SO', label: 'Check-in Địa chỉ đỏ' },
              { id: 'BAI_HOC_DAO_DUC', label: 'Lối sống văn minh' },
              { id: 'KE_CHUYEN', label: 'Kể chuyện vĩ nhân' },
              { id: 'GEN_Z_NOI_GUONG', label: 'Hành động đẹp mỗi ngày' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setShortCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  shortCategory === cat.id
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Vertical Shorts Cards (TikTok style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShorts.map((short) => {
              return (
                <article
                  key={short.id}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Vertical Thumbnail Area */}
                  <div className="relative h-64 bg-slate-900 overflow-hidden group">
                    <img
                      src={short.thumbnailUrl}
                      alt={short.title}
                      className="h-full w-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Top badging */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10.5px]">
                      <span className="rounded-md bg-rose-600/90 backdrop-blur-xs text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                        {short.platform}
                      </span>
                      <span className="rounded-md bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 font-bold">
                        {short.duration}
                      </span>
                    </div>

                    {/* Center External Watch Button */}
                    <a
                      href={short.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-white/90 hover:bg-white text-rose-700 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      title="Xem video trên kênh TikTok / Shorts"
                    >
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </a>

                    {/* Bottom overlay: Channel and Title */}
                    <div className="absolute bottom-3 left-3 right-3 space-y-1">
                      <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                        <Flame className="h-3 w-3" /> {short.channel}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                        {short.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="rounded-md bg-blue-50 text-blue-700 font-bold px-2 py-0.5">
                          {short.categoryLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {short.viewsCount}
                          </span>
                        </div>
                      </div>

                      {/* Script Narration preview */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-[#F8FBFF] p-2.5 rounded-xl border border-slate-100">
                        {short.scriptNarration}
                      </p>

                      {/* Takeaway */}
                      <div className="text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-200">
                        <strong>Bài học hành động:</strong> {short.takeaway}
                      </div>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1 text-[10px] text-blue-600">
                        {short.hashtags.map((h, i) => (
                          <span key={i} className="hover:underline cursor-pointer">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interaction Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleToggleShortLike(short.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
                      >
                        <Heart className="h-3.5 w-3.5 fill-rose-600" />
                        <span>Thích ({shortLikes[short.id] ? `${short.likesCount} +${shortLikes[short.id]}` : short.likesCount})</span>
                      </button>

                      <a
                        href={short.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-blue-700 text-[11px]"
                      >
                        <ExternalLink className="h-3 w-3" /> Kênh gốc TikTok
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. KHO PHIM TƯ LIỆU: ĐIỆN ẢNH CÁCH MẠNG & PHÓNG SỰ VTV              */}
      {/* ===================================================================== */}
      {activeMediaTab === 'CINEMA' && (
        <div className="space-y-4">
          {/* Virtual Cinema Player */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="rounded-md bg-rose-50 text-rose-800 font-bold px-2 py-0.5 text-[11px]">
                  {selectedFilm.topic} · {selectedFilm.duration}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {selectedFilm.title}
                </h4>
                <p className="text-xs text-slate-500">Nguồn: {selectedFilm.sourceName}</p>
              </div>

              {selectedFilm.youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${selectedFilm.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 text-xs shadow-2xs"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Mở xem trên YouTube</span>
                </a>
              )}
            </div>

            {/* Embedded Screen / Simulated Cinema */}
            <div className="relative aspect-video rounded-2xl bg-black overflow-hidden shadow-inner">
              {selectedFilm.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedFilm.youtubeId}?autoplay=0&rel=0`}
                  title={selectedFilm.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white text-xs">
                  Không tìm thấy mã phát video
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-blue-100 bg-[#EFF6FF] p-3 text-xs text-blue-950">
              <strong>Tóm tắt nội dung phim:</strong> {selectedFilm.summary}
            </div>
          </div>

          {/* Film Topic Selector & Grid */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {filmTopics.map((tp) => (
                <button
                  key={tp}
                  type="button"
                  onClick={() => setFilmTopic(tp)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold cursor-pointer transition-colors ${
                    filmTopic === tp
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredFilms.map((film) => {
                const active = film.id === selectedFilm.id;
                return (
                  <div
                    key={film.id}
                    onClick={() => setSelectedFilm(film)}
                    className={`rounded-2xl border p-3.5 transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-2 ring-blue-200'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="font-bold text-blue-700">{film.topic}</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {film.duration}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-2">
                        {film.title}
                      </h5>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {film.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-500 font-medium truncate max-w-[140px]">
                        {film.sourceName}
                      </span>
                      <button
                        type="button"
                        className={`font-bold ${active ? 'text-blue-700' : 'text-slate-700'}`}
                      >
                        {active ? 'Đang chiếu' : 'Chọn xem'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Lucian UX/UI Prompt #478 QR Share Modal */}
      <LucianQrShareModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title={selectedSpeech.title}
        subtitle={`Bản ghi âm giọng nói nguyên gốc của Bác Hồ năm ${selectedSpeech.year}`}
      />
    </div>
  );
};
