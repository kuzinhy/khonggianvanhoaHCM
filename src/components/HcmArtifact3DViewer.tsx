import React, { useState, useRef, useEffect } from 'react';
import {
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Info,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Share2,
  Copy,
  Check,
  Award,
  BookOpen,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';
import {
  ARTIFACTS_3D_COLLECTION,
  type Artifact3DItem,
} from '../data/hcm3DModelData';
import { DongSonDrumIcon, HoaSenIcon } from './TraditionalMotifs';

export const HcmArtifact3DViewer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360 deg
  const [zoom, setZoom] = useState(1);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ isDragging: boolean; startX: number; baseAngle: number }>({
    isDragging: false,
    startX: 0,
    baseAngle: 0,
  });

  const artifact: Artifact3DItem =
    ARTIFACTS_3D_COLLECTION[selectedIdx] || ARTIFACTS_3D_COLLECTION[0];

  // Auto rotation loop
  useEffect(() => {
    if (!isAutoRotate || dragRef.current.isDragging) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoRotate]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const text = `${artifact.name}. Niên đại: ${artifact.year}. Lưu giữ tại: ${artifact.origin}. ${artifact.significance}. ${artifact.story}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'vi-VN';
    u.rate = 0.95;
    u.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const handleCopyCitation = () => {
    const text = `${artifact.name} (${artifact.year}) - Nơi lưu giữ: ${artifact.origin}. Nguồn tư liệu: ${artifact.citation}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const selectArtifact = (idx: number) => {
    const nextIdx = (idx + ARTIFACTS_3D_COLLECTION.length) % ARTIFACTS_3D_COLLECTION.length;
    setSelectedIdx(nextIdx);
    setRotationAngle(0);
    setActiveHotspotId(null);
    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-200 bg-linear-to-r from-amber-50/90 via-white to-rose-50/80 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-linear-to-br from-amber-600 to-rose-700 p-2.5 text-white shadow-md shrink-0">
            <Award className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Bảo Vật &amp; Hiện Vật Di Sản 3D Tương Tác 360°
              </h3>
              <span className="rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10.5px] font-black text-amber-900">
                08 Hiện Vật Tiêu Biểu
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Xoay 360 độ, quan sát đa góc nhìn, khám phá câu chuyện cảm động và bài học đạo đức cách mạng theo Quy định 144-QĐ/TW.
            </p>
          </div>
        </div>

        {/* Quick Nav Prev/Next Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => selectArtifact(selectedIdx - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Trước</span>
          </button>
          <span className="text-xs font-black text-slate-700 px-2">
            {selectedIdx + 1} / {ARTIFACTS_3D_COLLECTION.length}
          </span>
          <button
            type="button"
            onClick={() => selectArtifact(selectedIdx + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">Tiếp</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Display Stage & Spec Details */}
      <div
        ref={containerRef}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-4 ${
          isFullscreen ? 'bg-slate-950 p-6 fixed inset-0 z-50 overflow-y-auto' : ''
        }`}
      >
        {/* Left Column: 3D Pedestal Stage */}
        <div className="lg:col-span-7 xl:col-span-7 rounded-3xl border border-amber-400/50 bg-gradient-to-b from-[#181410] via-[#221C16] to-[#0E0C09] p-5 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between select-none min-h-[480px]">
          {/* Top Bar inside 3D Studio */}
          <div className="relative z-20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-[11px] font-black text-amber-300">
                GÓC XOAY: {rotationAngle}°
              </span>
              <span className="text-[11px] font-medium text-white/70 hidden sm:inline">
                Kéo chuột / vuốt tay để xoay 360°
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsAutoRotate((r) => !r)}
                className={`rounded-lg p-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  isAutoRotate
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Bật/tắt tự động xoay 360 độ"
              >
                <RotateCw className={`h-4 w-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
                className="rounded-lg bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer"
                title="Phóng to hiện vật"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.8, z - 0.15))}
                className="rounded-lg bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer"
                title="Thu nhỏ hiện vật"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="rounded-lg bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer"
                title="Toàn màn hình"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Museum Stage Spotlight and Rotating 3D Pedestal */}
          <div
            className="relative my-auto h-[320px] sm:h-[360px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
            onPointerDown={(e) => {
              dragRef.current = {
                isDragging: true,
                startX: e.clientX,
                baseAngle: rotationAngle,
              };
            }}
            onPointerMove={(e) => {
              if (!dragRef.current.isDragging) return;
              const deltaX = e.clientX - dragRef.current.startX;
              const nextAngle = (dragRef.current.baseAngle + Math.round(deltaX * 0.8) + 360) % 360;
              setRotationAngle(nextAngle);
            }}
            onPointerUp={() => {
              dragRef.current.isDragging = false;
            }}
            onPointerLeave={() => {
              dragRef.current.isDragging = false;
            }}
          >
            {/* Museum Overhead Spotlight Cone */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-full opacity-35"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.15) 45%, transparent 75%)',
              }}
            />

            {/* 3D Pedestal Platform (Bục Trưng Bày) */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-28 rounded-full border-2 border-amber-400/40 bg-gradient-to-b from-[#3B3024] to-[#14110E] shadow-2xl flex items-center justify-center"
              style={{
                transform: 'rotateX(62deg)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), inset 0 2px 12px rgba(251, 191, 36, 0.4)',
              }}
            >
              <div className="w-48 sm:w-60 h-20 rounded-full border border-amber-300/30 bg-amber-950/40" />
            </div>

            {/* Simulated 3D Rotating Artifact Object */}
            <div
              className="relative z-10 transition-transform duration-75 flex flex-col items-center justify-center"
              style={{
                transform: `scale(${zoom}) rotateY(${rotationAngle * 0.35}deg)`,
                perspective: '800px',
              }}
            >
              <div className="relative group">
                {/* Glow ring under artifact */}
                <div className="absolute -inset-4 rounded-3xl bg-amber-500/20 blur-xl opacity-60" />

                <img
                  src={artifact.imageUrl}
                  alt={artifact.name}
                  draggable={false}
                  className="relative h-56 sm:h-64 w-64 sm:w-80 object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] filter contrast-105"
                  style={{
                    transform: `rotateY(${Math.sin((rotationAngle * Math.PI) / 180) * 15}deg)`,
                  }}
                />

                {/* Interactive Hotspot Indicators on Artifact */}
                {(artifact.hotspots || []).map((hp) => {
                  const angleDiff = Math.abs((rotationAngle - hp.angle + 360) % 360);
                  const isVisible = angleDiff < 85 || angleDiff > 275;

                  return isVisible ? (
                    <button
                      key={hp.id}
                      type="button"
                      onClick={() => setActiveHotspotId(hp.id)}
                      className="-translate-x-1/2 -translate-y-1/2 absolute z-30 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-rose-600 text-white shadow-lg ring-4 ring-rose-500/40 hover:scale-125 transition-transform cursor-pointer animate-pulse"
                      style={{
                        left: `${50 + Math.cos((hp.angle * Math.PI) / 180) * 35}%`,
                        top: `${48 + Math.sin((hp.angle * Math.PI) / 180) * 25}%`,
                      }}
                      title={hp.title}
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                  ) : null;
                })}
              </div>

              {/* Pedestal Nameplate */}
              <div className="mt-3 rounded-full border border-amber-400/50 bg-black/60 px-4 py-1 backdrop-blur-md text-center shadow-lg">
                <span className="text-xs font-black uppercase tracking-wider text-amber-200">
                  {artifact.name}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Rotation Slider */}
          <div className="relative z-20 space-y-1 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
              <span>0° (Chính diện)</span>
              <span>180° (Mặt sau)</span>
              <span>360° (Góc tròn)</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={rotationAngle}
              onChange={(e) => {
                setRotationAngle(Number(e.target.value));
                setIsAutoRotate(false);
              }}
              className="w-full h-2 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Historical Narrative & Revolutionary Ethics Guide */}
        <div className="lg:col-span-5 xl:col-span-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Header: Name, Year, Badges */}
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-md bg-rose-700 px-2.5 py-0.5 text-xs font-black text-white">
                  HIỆN VẬT #{selectedIdx + 1}
                </span>
                <span className="rounded-md bg-amber-100 border border-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                  {artifact.year}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                  {artifact.era}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {artifact.name}
              </h4>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {artifact.badges.map((b, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10.5px] font-bold text-blue-800"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Spec Box */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                <span>Nơi lưu giữ: <strong className="text-slate-900">{artifact.origin}</strong></span>
              </div>
              {artifact.dimensions && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Layers className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <span>Quy cách: <strong className="text-slate-900">{artifact.dimensions}</strong></span>
                </div>
              )}
            </div>

            {/* Quy Dinh 144 Ethics Box */}
            <div className="rounded-2xl border-2 border-amber-300 bg-linear-to-r from-amber-50/80 via-white to-amber-50/60 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 text-xs font-black uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Giá Trị Học Tập Theo Quy Định 144-QĐ/TW:</span>
              </div>
              <p className="text-xs font-semibold text-amber-950 leading-relaxed">
                {artifact.significance}
              </p>
            </div>

            {/* Touching Historical Story */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-600">
                Câu Chuyện Di Sản Lịch Sử:
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed text-justify max-h-40 overflow-y-auto pr-1">
                {artifact.story}
              </p>
            </div>

            {/* Hotspot details if clicked */}
            {activeHotspotId && (
              <div className="rounded-xl border border-rose-300 bg-rose-50/90 p-3 space-y-1 text-xs animate-in fade-in">
                {(() => {
                  const hp = artifact.hotspots?.find((h) => h.id === activeHotspotId);
                  if (!hp) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between font-bold text-rose-900">
                        <span>Chi tiết: {hp.title}</span>
                        <button
                          type="button"
                          onClick={() => setActiveHotspotId(null)}
                          className="text-rose-600 hover:text-rose-800 text-[11px]"
                        >
                          Đóng
                        </button>
                      </div>
                      <p className="text-slate-700">{hp.description}</p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-700 hover:bg-rose-800 text-white shadow-xs'
                }`}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isSpeaking ? 'Dừng thuyết minh' : 'Nghe thuyết minh hiện vật'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer shrink-0"
                title="Sao chép thông tin trích dẫn Cấp A"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Đã sao chép' : 'Trích dẫn'}</span>
              </button>
            </div>

            <p className="text-[10.5px] text-slate-500 truncate text-center">
              Nguồn tư liệu: {artifact.citation}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Artifact Carousel Selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 px-1">
          <span>DANH SÁCH 08 BẢO VẬT &amp; HIỆN VẬT 3D TIÊU BIỂU:</span>
          <span className="text-[11px] text-slate-500">Bấm hiện vật để chuyển chế độ xem 360°</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {ARTIFACTS_3D_COLLECTION.map((art, idx) => {
            const isCur = idx === selectedIdx;
            return (
              <button
                key={art.id}
                type="button"
                onClick={() => selectArtifact(idx)}
                className={`rounded-xl border p-2 text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  isCur
                    ? 'border-rose-600 bg-rose-50/80 ring-2 ring-rose-500/30 shadow-xs'
                    : 'border-slate-200 hover:border-amber-400 bg-slate-50/50'
                }`}
              >
                <div className="h-12 w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.name}
                    className="h-full object-contain filter contrast-105"
                  />
                </div>
                <div className="space-y-0.5 pt-1 border-t border-slate-200/60">
                  <span className="text-[9.5px] font-black text-rose-800">#{idx + 1} · {art.year}</span>
                  <p className="text-[10.5px] font-bold text-slate-900 line-clamp-2 leading-tight">
                    {art.name.split(' (')[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
