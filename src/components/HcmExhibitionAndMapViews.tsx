import React, { useState, useEffect } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  EyeOff,
  Film,
  Landmark,
  Layers,
  MapPin,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { FOOTPRINTS_20, MUSEUM_EXHIBITS_8, type MuseumExhibit } from '../hcmCoreDataset';
import { HcmVirtualMuseum3DStage } from './HcmVirtualMuseum3DStage';
import { HcmSpatial3DMinimap } from './HcmSpatial3DMinimap';
import { HcmArtifact3DViewer } from './HcmArtifact3DViewer';
import { HcmMuseumExhibitsFullView } from './HcmMuseumExhibitsFullView';
import { HcmHeritageMapMasterView } from './HcmHeritageMapMasterView';

function speakVietnamese(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'vi-VN';
  utter.rate = 0.96;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
  return true;
}

export const HcmExhibitGalleryView: React.FC<{ onOpenMedia?: () => void }> = ({ onOpenMedia }) => {
  const [stageMode, setStageMode] = useState<'BTHCM_CORE' | 'VIRTUAL_3D' | 'MINIMAP_3D' | 'ARTIFACTS_3D' | 'CLASSIC'>('BTHCM_CORE');
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);
  const categories = ['Tất cả (8)', 'Hiện vật & Di tích', 'Tư liệu lịch sử', 'Tủ sách Bác Hồ', 'Ảnh tư liệu', 'Mô hình 3D'] as const;
  const [catFilter, setCatFilter] = useState<string>('Tất cả (8)');
  const [selectedId, setSelectedId] = useState<string>(MUSEUM_EXHIBITS_8[0].id);
  const [activePin, setActivePin] = useState<number>(1);
  const [showPins, setShowPins] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const visibleExhibits =
    catFilter === 'Tất cả (8)'
      ? MUSEUM_EXHIBITS_8
      : MUSEUM_EXHIBITS_8.filter((e) => e.category === catFilter);

  const exhibit: MuseumExhibit =
    visibleExhibits.find((e) => e.id === selectedId) || visibleExhibits[0] || MUSEUM_EXHIBITS_8[0];
  const currentHotspot = exhibit.hotspots.find((h) => h.pin === activePin) || exhibit.hotspots[0];

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = `Hiện vật ${exhibit.code}: ${exhibit.title}. ${exhibit.summary}. ${exhibit.values.join('. ')}`;
    if (speakVietnamese(text, () => setIsSpeaking(false))) {
      setIsSpeaking(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* 5-Mode Exhibition & 3D Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-[#FBF5EA] via-white to-[#EFF6FF] p-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs">
          <Landmark className="h-4 w-4 text-[#751D2C] shrink-0" />
          <span className="font-extrabold text-slate-900">
            Hệ Thống Trưng Bày &amp; Bảo Tàng Số Cấp Quốc Gia (BTHCM &amp; 3D)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStageMode('BTHCM_CORE')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black cursor-pointer transition-all shadow-2xs border ${
              stageMode === 'BTHCM_CORE'
                ? 'bg-[#751D2C] text-amber-300 border-[#751D2C] ring-2 ring-amber-400/50'
                : 'bg-white border-amber-300 text-[#751D2C] hover:bg-amber-50'
            }`}
          >
            <Landmark className="h-3.5 w-3.5 text-amber-500" />
            <span>🏛️ Bảo Tàng BTHCM (Trưng Bày &amp; Hiện Vật)</span>
          </button>

          <button
            type="button"
            onClick={() => setStageMode('VIRTUAL_3D')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              stageMode === 'VIRTUAL_3D'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Phòng 3D (360°)</span>
          </button>

          <button
            type="button"
            onClick={() => setStageMode('MINIMAP_3D')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              stageMode === 'MINIMAP_3D'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Sa Bàn 3D</span>
          </button>

          <button
            type="button"
            onClick={() => setStageMode('ARTIFACTS_3D')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              stageMode === 'ARTIFACTS_3D'
                ? 'bg-purple-700 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-purple-50'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Hiện Vật 3D (360°)</span>
          </button>

          <button
            type="button"
            onClick={() => setStageMode('CLASSIC')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              stageMode === 'CLASSIC'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
            }`}
          >
            <Landmark className="h-3.5 w-3.5" />
            <span>Danh Mục 8 Gian</span>
          </button>
        </div>
      </div>

      {stageMode === 'BTHCM_CORE' ? (
        <HcmMuseumExhibitsFullView />
      ) : stageMode === 'VIRTUAL_3D' ? (
        <HcmVirtualMuseum3DStage
          initialZoneIndex={selectedZoneIndex}
          onOpenClassicGallery={() => setStageMode('CLASSIC')}
          onOpenMinimap={() => setStageMode('MINIMAP_3D')}
          onOpenArtifacts3D={() => setStageMode('ARTIFACTS_3D')}
        />
      ) : stageMode === 'MINIMAP_3D' ? (
        <HcmSpatial3DMinimap
          activeZoneId={`zone_${selectedZoneIndex + 1}`}
          onSelectZone={(idx) => {
            setSelectedZoneIndex(idx);
            setStageMode('VIRTUAL_3D');
          }}
        />
      ) : stageMode === 'ARTIFACTS_3D' ? (
        <HcmArtifact3DViewer />
      ) : (
        <>
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCatFilter(cat);
              setActivePin(1);
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              catFilter === cat
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exhibit Selector + Interactive Hotspot Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left List (8 slots with real visual thumbnails) */}
        <div className="lg:col-span-4 space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {visibleExhibits.map((item) => {
            const active = item.id === exhibit.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedId(item.id);
                  setActivePin(1);
                  setZoom(1);
                }}
                className={`w-full rounded-2xl border p-2.5 text-left transition-all cursor-pointer flex items-start gap-3 ${
                  active
                    ? 'border-blue-600 bg-[#EFF6FF] shadow-xs'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-16 w-20 shrink-0 rounded-xl object-cover border border-slate-200 bg-slate-100"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="rounded-md bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold text-rose-800 truncate">
                      Gian {item.code} · {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 shrink-0">{item.hotspots.length} ghim</span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-slate-900 line-clamp-2">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500 truncate">{item.period} · {item.location}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Interactive Digital Exhibit Stage */}
        <div className="lg:col-span-8 rounded-3xl border border-blue-200 bg-white p-5 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="rounded-md bg-rose-700 px-2 py-0.5 text-[10.5px] font-bold text-white">
                Gian Trưng Bày #{exhibit.code} · {exhibit.location}
              </span>
              <h3 className="mt-1 text-base font-bold text-slate-900">{exhibit.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                title="Đặt lại góc nhìn"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              {exhibit.imageUrl && (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  title="Phóng lớn toàn màn hình"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPins((s) => !s)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {showPins ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span>{showPins ? 'Ẩn ghim' : 'Hiện ghim'}</span>
              </button>
              {onOpenMedia && (
                <button
                  type="button"
                  onClick={onOpenMedia}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-800 hover:bg-rose-100 cursor-pointer"
                >
                  <Film className="h-3.5 w-3.5" />
                  <span>Xem Clip</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                  isSpeaking ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                <span>{isSpeaking ? 'Dừng đọc' : 'Thuyết minh'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Exhibition Stage Canvas with High-Res Archival Artwork */}
          <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl border border-amber-200/80 bg-[#FBF5EA]">
            <div
              className="relative h-full w-full transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              {exhibit.imageUrl ? (
                <img
                  src={exhibit.imageUrl}
                  alt={exhibit.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#FFFBEB] via-[#FFFDF9] to-[#EFF6FF]">
                  <Landmark className="h-12 w-12 text-rose-700" />
                </div>
              )}

              {/* Bottom Exhibition Plaque Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-transparent p-4 pt-12 text-white">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  {exhibit.category} · {exhibit.period}
                </p>
                <p className="mt-0.5 text-sm font-bold">{exhibit.quote}</p>
                {exhibit.imageCaption && (
                  <p className="mt-1 text-[11px] text-slate-200 line-clamp-2">{exhibit.imageCaption}</p>
                )}
              </div>

              {showPins &&
                exhibit.hotspots.map((hp) => {
                  const isActive = hp.pin === activePin;
                  return (
                    <button
                      key={hp.pin}
                      type="button"
                      onClick={() => setActivePin(hp.pin)}
                      style={{ left: `${hp.xPercent}%`, top: `${hp.yPercent}%` }}
                      className={`-translate-x-1/2 -translate-y-1/2 absolute grid h-8 w-8 place-items-center rounded-full text-xs font-bold shadow-md transition-transform cursor-pointer border-2 border-white ${
                        isActive
                          ? 'bg-rose-700 text-white scale-115 ring-4 ring-rose-300/70'
                          : 'bg-blue-600/95 text-white hover:scale-110'
                      }`}
                      title={hp.label}
                    >
                      {hp.pin}
                    </button>
                  );
                })}
            </div>
          </div>

          {lightboxOpen && exhibit.imageUrl && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full rounded-3xl bg-white p-4 shadow-2xl space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-rose-700">Gian trưng bày #{exhibit.code}</span>
                    <h4 className="text-sm font-bold text-slate-900">{exhibit.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    className="rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <img
                  src={exhibit.imageUrl}
                  alt={exhibit.title}
                  className="max-h-[70vh] w-full rounded-2xl object-contain bg-[#FBF5EA]"
                />
                {exhibit.imageCaption && (
                  <p className="text-xs text-slate-600 text-center">{exhibit.imageCaption}</p>
                )}
              </div>
            </div>
          )}

          {/* Active Hotspot Details */}
          {currentHotspot && (
            <div className="rounded-2xl border border-blue-200 bg-[#F8FBFF] p-3.5 space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {exhibit.hotspots.map((hp) => (
                  <button
                    key={hp.pin}
                    type="button"
                    onClick={() => setActivePin(hp.pin)}
                    className={`rounded-lg px-2 py-0.5 text-[11px] font-bold cursor-pointer ${
                      hp.pin === activePin
                        ? 'bg-rose-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {hp.pin}. {hp.label}
                  </button>
                ))}
              </div>
              <p className="pt-1 text-xs font-bold text-slate-900">{currentHotspot.label}</p>
              <p className="text-xs text-slate-700">{currentHotspot.detail}</p>
            </div>
          )}

          {/* Description & 3 Values */}
          <div className="space-y-2 text-xs">
            <p className="text-slate-700 leading-relaxed">{exhibit.summary}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {exhibit.values.map((val, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-[11.5px] font-semibold text-slate-800">
                  {i + 1}. {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export const HcmFootprintsMapView: React.FC<{ onOpenVietnamModal?: () => void }> = ({
  onOpenVietnamModal,
}) => {
  return <HcmHeritageMapMasterView onOpenVietnamModal={onOpenVietnamModal} />;
};

const LegacyFootprintsMapView: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<number>(1);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const current = FOOTPRINTS_20.find((f) => f.order === selectedOrder) || FOOTPRINTS_20[0];

  useEffect(() => {
    if (!isPlayingTour) return;
    const timer = setInterval(() => {
      setSelectedOrder((o) => (o < FOOTPRINTS_20.length ? o + 1 : 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlayingTour]);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToSpeak = `Tọa độ thứ ${current.order}: ${current.title}, tại ${current.country}, giai đoạn ${current.period}. Bí danh: ${current.alias}. Sự kiện: ${current.events}. Địa danh lưu niệm: ${current.memorial}.`;
      speakVietnamese(textToSpeak, () => setIsSpeaking(false));
    }
  };

  const polyPoints = FOOTPRINTS_20.map((f) => `${f.svgX * 10},${f.svgY * 5}`).join(' ');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-7 rounded-3xl border border-blue-200 bg-white p-5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-rose-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Bản đồ Hành trình &ldquo;Dấu Chân Người&rdquo; (20 Tọa độ Lịch sử)
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-all ${
                isPlayingTour
                  ? 'bg-rose-700 text-white shadow-xs animate-pulse'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              {isPlayingTour ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
              <span>{isPlayingTour ? 'Dừng Tour' : 'Tự động chạy Tour'}</span>
            </button>
            <button
              type="button"
              onClick={handleToggleSpeak}
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                isSpeaking
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Nghe thuyết minh tọa độ này"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>{isSpeaking ? 'Đang đọc' : 'Thuyết minh'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedOrder((o) => (o > 1 ? o - 1 : FOOTPRINTS_20.length))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-blue-50 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Trước
            </button>
            <span className="text-[11px] font-bold text-blue-700 px-1">
              {current.order}/{FOOTPRINTS_20.length}
            </span>
            <button
              type="button"
              onClick={() => setSelectedOrder((o) => (o < FOOTPRINTS_20.length ? o + 1 : 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-blue-50 cursor-pointer"
            >
              Tiếp <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive SVG Stylized Map */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-[#EFF6FF] via-[#F8FBFF] to-[#E0F2FE]">
          <svg viewBox="0 0 1000 500" className="w-full h-72 sm:h-80 select-none">
            {/* Subtle Continent Blocks */}
            <rect x="130" y="95" width="210" height="190" rx="28" fill="#DBEAFE" opacity="0.7" />
            <rect x="430" y="70" width="210" height="145" rx="26" fill="#DBEAFE" opacity="0.7" />
            <rect x="455" y="220" width="135" height="185" rx="26" fill="#DBEAFE" opacity="0.65" />
            <rect x="640" y="90" width="245" height="245" rx="32" fill="#BFDBFE" opacity="0.75" />

            {/* Journey Path */}
            <polyline
              fill="none"
              stroke="#B91C1C"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              opacity="0.65"
              points={polyPoints}
            />

            {/* 20 Clickable Markers */}
            {FOOTPRINTS_20.map((pt) => {
              const active = pt.order === current.order;
              const cx = pt.svgX * 10;
              const cy = pt.svgY * 5;
              return (
                <g key={pt.order} onClick={() => setSelectedOrder(pt.order)} className="cursor-pointer">
                  <circle
                    cx={cx}
                    cy={cy}
                    r={active ? 15 : 10}
                    fill={active ? '#B91C1C' : '#2563EB'}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={active ? '11' : '9'}
                    fontWeight="bold"
                  >
                    {pt.order}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Coordinate Details */}
        <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-[#FFFDF9] to-[#F8FBFF] p-4 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-lg bg-rose-700 px-2.5 py-0.5 font-black text-white">
              Điểm #{current.order}: {current.title} ({current.country})
            </span>
            <span className="font-mono text-[11px] font-bold text-blue-700">
              GPS: {current.coords[0]}°B, {current.coords[1]}°Đ
            </span>
          </div>
          <p className="font-bold text-slate-800">
            Thời gian: {current.period} · Bí danh giai đoạn này: <span className="text-rose-700">{current.alias}</span>
          </p>
          <p className="text-slate-700 leading-relaxed">{current.events}</p>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-800">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>Di tích / Địa điểm lưu niệm: {current.memorial}</span>
          </p>
        </div>
      </div>

      {/* Right Numbered Index 1..20 */}
      <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2 max-h-[540px] overflow-y-auto">
        <p className="text-xs font-extrabold text-slate-900 px-1">Danh sách 20 tọa độ lịch sử</p>
        {FOOTPRINTS_20.map((pt) => {
          const active = pt.order === current.order;
          return (
            <button
              key={pt.order}
              type="button"
              onClick={() => setSelectedOrder(pt.order)}
              className={`w-full rounded-xl border p-2.5 text-left transition-colors cursor-pointer flex items-center gap-2.5 ${
                active
                  ? 'border-rose-500 bg-rose-50/70'
                  : 'border-slate-200 bg-[#F8FBFF] hover:border-blue-300'
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-black text-white ${
                  active ? 'bg-rose-700' : 'bg-blue-600'
                }`}
              >
                {pt.order}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-slate-900 truncate">
                  {pt.title} · <span className="font-semibold text-slate-500">{pt.country}</span>
                </p>
                <p className="text-[11px] text-slate-500 truncate">{pt.period} · {pt.alias}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
