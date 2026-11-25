import React, { useState } from 'react';
import {
  Compass,
  Eye,
  Layers,
  MapPin,
  Maximize2,
  Navigation,
  Play,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  BookOpen,
} from 'lucide-react';
import { SPATIAL_3D_ZONES, type SpatialZone3D } from '../data/hcm3DModelData';
import { DongSonDrumIcon, HoaSenIcon } from './TraditionalMotifs';

interface HcmSpatial3DMinimapProps {
  activeZoneId?: string;
  onSelectZone: (zoneIndex: number) => void;
  isCompactHud?: boolean; // Nếu là HUD thu nhỏ ở góc màn hình 3D
  onCloseHud?: () => void;
}

export const HcmSpatial3DMinimap: React.FC<HcmSpatial3DMinimapProps> = ({
  activeZoneId = 'zone_1',
  onSelectZone,
  isCompactHud = false,
  onCloseHud,
}) => {
  const [hoveredZone, setHoveredZone] = useState<SpatialZone3D | null>(null);
  const [selectedZone, setSelectedZone] = useState<SpatialZone3D>(
    SPATIAL_3D_ZONES.find((z) => z.id === activeZoneId) || SPATIAL_3D_ZONES[0]
  );
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(25); // Góc nghiêng phối cảnh 3D
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeIndex = SPATIAL_3D_ZONES.findIndex(
    (z) => z.id === (hoveredZone?.id || selectedZone.id || activeZoneId)
  );

  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'vi-VN';
    u.rate = 0.96;
    u.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  // Nếu là HUD thu nhỏ hiển thị ở góc màn hình 3D stage
  if (isCompactHud) {
    return (
      <div className="rounded-2xl border border-amber-300/80 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur-md w-72 space-y-2 select-none">
        <div className="flex items-center justify-between border-b border-white/20 pb-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Sa Bàn Định Vị 3D</span>
          </div>
          {onCloseHud && (
            <button
              type="button"
              onClick={onCloseHud}
              className="rounded p-0.5 text-white/70 hover:bg-white/20"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Mini Isometric Grid */}
        <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 flex items-center justify-center p-2">
          {/* Central Memorial Monument */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full border border-amber-400 bg-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <DongSonDrumIcon className="h-4 w-4 text-amber-300" />
            </div>
            <span className="text-[8px] font-black uppercase text-amber-200 mt-0.5">Sảnh Trung Tâm</span>
          </div>

          {/* 8 Zone Nodes */}
          {SPATIAL_3D_ZONES.map((zone, idx) => {
            const angleRad = (idx / 8) * 2 * Math.PI - Math.PI / 2;
            const radiusX = 100;
            const radiusY = 55;
            const leftPos = 50 + (radiusX / 280) * 100 * Math.cos(angleRad);
            const topPos = 50 + (radiusY / 160) * 100 * Math.sin(angleRad);
            const isCurrent = zone.id === activeZoneId;

            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  onSelectZone(idx);
                  setSelectedZone(zone);
                }}
                style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                className={`-translate-x-1/2 -translate-y-1/2 absolute z-20 flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black transition-transform cursor-pointer ${
                  isCurrent
                    ? 'border-2 border-white bg-rose-600 text-white scale-125 shadow-lg shadow-rose-600/50 ring-2 ring-rose-400/50'
                    : 'border border-amber-300/60 bg-slate-800 text-amber-200 hover:scale-110 hover:bg-slate-700'
                }`}
                title={`${zone.shortTitle} (${zone.period})`}
              >
                {zone.order}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className="text-amber-200 font-bold truncate">
            {SPATIAL_3D_ZONES.find((z) => z.id === activeZoneId)?.shortTitle}
          </span>
          <span className="text-[10px] text-slate-400">Chạm số để chuyển phòng</span>
        </div>
      </div>
    );
  }

  // Giao diện Sa bàn 3D Phối cảnh Tổng thể (Full View)
  return (
    <div className="space-y-4">
      {/* Top Banner & Control Toolbar */}
      <div className="rounded-2xl border border-amber-200 bg-linear-to-r from-amber-50/90 via-white to-blue-50/90 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-linear-to-br from-rose-700 to-amber-600 p-2.5 text-white shadow-md shrink-0">
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Sa Bàn 3D Tổng Thể: Không Gian Văn Hóa Hồ Chí Minh
                </h3>
                <span className="rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-[10.5px] font-black text-rose-800">
                  Bản Đồ 08 Gian
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Bố cục phối cảnh không gian 3D trực quan gồm 08 gian trưng bày theo tiến trình lịch sử và tư tưởng, bao quanh Sảnh Tưởng niệm Trung tâm.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setOrbitAngle((a) => (a === 25 ? 45 : a === 45 ? 10 : 25))}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5 text-amber-600" />
              <span>Góc nhìn: {orbitAngle}°</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectZone(activeIndex >= 0 ? activeIndex : 0)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Bước vào 3D Gian {selectedZone.order}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Spatial Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Interactive 3D Isometric Map Stage */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-3xl border border-amber-300/70 bg-gradient-to-b from-[#1C1712] via-[#241F1A] to-[#120F0D] p-4 sm:p-6 text-white shadow-xl relative overflow-hidden min-h-[460px] flex flex-col justify-between select-none">
          {/* Ambient Lighting & Traditional Motif Watermark */}
          <div className="pointer-events-none absolute inset-0 opacity-10 flex items-center justify-center">
            <DongSonDrumIcon className="h-96 w-96 text-amber-400" />
          </div>
          <div className="pointer-events-none absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-bold text-amber-200 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>MẶT BẰNG SA BÀN 3D · BẤM PHÒNG ĐỂ ĐIỀU HƯỚNG</span>
          </div>

          {/* 3D Perspective Floorboard */}
          <div
            className="relative my-auto h-[350px] sm:h-[400px] w-full flex items-center justify-center"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="relative w-[360px] sm:w-[480px] h-[300px] sm:h-[350px] transition-transform duration-500"
              style={{
                transform: `rotateX(${orbitAngle}deg) rotateZ(-12deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Floor Surface Pattern */}
              <div className="absolute inset-0 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-tr from-rose-950/70 via-slate-900/80 to-amber-950/60 shadow-2xl backdrop-blur-xs">
                {/* Architectural Grid Lines */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(251, 191, 36, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(251, 191, 36, 0.4) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
              </div>

              {/* Central Memorial Plaza (Sảnh Trung Tâm) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border-2 border-amber-300 bg-linear-to-b from-amber-600/95 to-rose-900/95 text-white shadow-lg shadow-amber-500/30 w-28 sm:w-32"
                style={{
                  transform: 'translateZ(25px)',
                }}
              >
                <div className="h-8 w-8 rounded-full border-2 border-amber-200 bg-amber-400/30 flex items-center justify-center shadow-inner">
                  <span className="animate-spin inline-flex" style={{ animationDuration: '24s' }}>
                    <DongSonDrumIcon className="h-5 w-5 text-amber-200" />
                  </span>
                </div>
                <p className="text-[9.5px] font-black uppercase tracking-wider text-amber-100 mt-1">
                  Sảnh Tưởng Niệm
                </p>
                <span className="text-[8px] text-amber-200/90 font-medium">Tượng Bác &amp; Cờ Đảng</span>
              </div>

              {/* 8 Spatial Zones Positioned Around Central Plaza */}
              {SPATIAL_3D_ZONES.map((zone, idx) => {
                const angleRad = (idx / 8) * 2 * Math.PI - Math.PI / 2;
                const radiusX = 175;
                const radiusY = 125;
                const leftPos = 50 + (radiusX / 480) * 100 * Math.cos(angleRad);
                const topPos = 50 + (radiusY / 350) * 100 * Math.sin(angleRad);
                const isSelected = selectedZone.id === zone.id;
                const isHovered = hoveredZone?.id === zone.id;

                return (
                  <div
                    key={zone.id}
                    style={{
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      transform: `translate(-50%, -50%) translateZ(${isSelected ? 35 : 15}px)`,
                    }}
                    className="absolute z-25 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedZone(zone);
                        onSelectZone(idx);
                      }}
                      onMouseEnter={() => setHoveredZone(zone)}
                      onMouseLeave={() => setHoveredZone(null)}
                      className={`group relative flex flex-col items-center justify-center rounded-2xl p-2 transition-all cursor-pointer shadow-lg ${
                        isSelected
                          ? 'border-2 border-amber-300 bg-rose-700 text-white scale-110 shadow-rose-600/50 ring-4 ring-amber-400/40'
                          : isHovered
                          ? 'border border-amber-300 bg-slate-800 text-amber-200 scale-105'
                          : 'border border-amber-500/30 bg-slate-900/90 text-slate-200 hover:border-amber-300'
                      }`}
                      style={{
                        width: '92px',
                        height: '62px',
                      }}
                    >
                      {/* Room Order Badge */}
                      <span
                        className={`absolute -top-2 -right-1.5 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black border ${
                          isSelected
                            ? 'bg-amber-400 text-rose-950 border-white'
                            : 'bg-slate-800 text-amber-300 border-amber-400/50'
                        }`}
                      >
                        {zone.order}
                      </span>

                      <span className="text-[9.5px] font-black text-center line-clamp-2 leading-tight px-1">
                        {zone.shortTitle}
                      </span>
                      <span className="text-[8px] font-bold text-amber-300 mt-0.5 line-clamp-1">
                        {zone.period.split(' ')[0]}
                      </span>

                      {/* Beacon Pulse for Currently Active Room */}
                      {isSelected && (
                        <span className="absolute -inset-1 rounded-2xl border-2 border-amber-300/60 animate-ping pointer-events-none" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Quick Zone Strip */}
          <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/10 pb-1 text-xs">
            {SPATIAL_3D_ZONES.map((z, idx) => (
              <button
                key={z.id}
                type="button"
                onClick={() => {
                  setSelectedZone(z);
                  onSelectZone(idx);
                }}
                className={`rounded-xl px-2.5 py-1 font-bold whitespace-nowrap transition-colors cursor-pointer text-[11px] ${
                  selectedZone.id === z.id
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                G{z.order}: {z.shortTitle.split(': ')[1] || z.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Room Information Card */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Room Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-rose-700 px-2.5 py-0.5 text-xs font-black text-white">
                    GIAN #{selectedZone.order}
                  </span>
                  <span className="text-xs font-bold text-amber-700">
                    {selectedZone.period}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900 mt-1.5 leading-snug">
                  {selectedZone.themeTitle}
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleSpeak(
                    `${selectedZone.themeTitle}. Giai đoạn ${selectedZone.period}. ${selectedZone.summary}. Lời dạy của Bác: ${selectedZone.quote}`
                  )
                }
                className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                  isSpeaking
                    ? 'bg-emerald-600 border-emerald-700 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
                title="Nghe thuyết minh phòng trưng bày"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Room Image Preview */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group">
              <img
                src={selectedZone.imageUrl}
                alt={selectedZone.themeTitle}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-amber-200">
                  {selectedZone.shortTitle} · Không gian số 3D
                </span>
              </div>
            </div>

            {/* Quote of the Era */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 space-y-1">
              <p className="text-xs font-semibold italic text-amber-950 leading-relaxed">
                "{selectedZone.quote}"
              </p>
              <p className="text-[10.5px] font-bold text-amber-800 text-right">
                — {selectedZone.quoteSource}
              </p>
            </div>

            {/* Summary Narrative */}
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {selectedZone.summary}
            </p>

            {/* Key Artifacts in this Zone */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                Hiện vật &amp; Tư liệu tiêu biểu ({selectedZone.keyArtifacts.length}):
              </span>
              <ul className="grid grid-cols-1 gap-1">
                {selectedZone.keyArtifacts.map((art, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800 border border-slate-100"
                  >
                    <Sparkles className="h-3 w-3 text-amber-600 shrink-0" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button: Jump into 360° Room */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => onSelectZone(activeIndex >= 0 ? activeIndex : 0)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Navigation className="h-4 w-4" />
              <span>Bước Vào Trải Nghiệm 3D Phòng #{selectedZone.order}</span>
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Trọng tâm tư tưởng: <span className="font-bold text-slate-700">{selectedZone.ideologicalFocus}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
