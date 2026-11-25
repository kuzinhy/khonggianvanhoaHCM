import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Landmark,
  Layers,
  Sparkles,
  Info,
  Calendar,
  User,
  Search,
  ExternalLink,
  Clock,
  Flag,
  RotateCcw,
  Navigation,
  Globe2,
  BookOpen,
  BookMarked,
  X,
  Radio,
  SplitSquareVertical,
} from 'lucide-react';
import {
  JOURNEY_10_STAGES,
  HERITAGE_STOP_POINTS,
  HCM_REGIONAL_HERITAGE_SITES,
  CLASSIC_REVOLUTIONARY_WORKS,
  USSH_61_GPS_POINTS,
  type JourneyStage,
  type HeritageStopPoint,
  type HcmRegionalHeritageSite,
  type ClassicRevolutionaryWork,
  type UsshPoint,
} from '../data/hcmHeritageMapData';
import { HcmJourneyInteractiveTimeline } from './HcmJourneyInteractiveTimeline';
import { HcmWorldLeafletMap } from './HcmWorldJourneyMap';

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

export const HcmHeritageMapMasterView: React.FC<{ onOpenVietnamModal?: () => void }> = ({
  onOpenVietnamModal,
}) => {
  // Main modes: SONG_HANH (Dual Sync) vs 10_STAGES (Global) vs TIMELINE (Lucian #370) vs HCM_REGIONAL (HCMC Heritage)
  const [mapMode, setMapMode] = useState<'SONG_HANH' | '10_STAGES' | 'TIMELINE' | 'HCM_REGIONAL'>('SONG_HANH');

  // Dataset switch: CORE_15 (15 Key stops) vs USSH_61 (61 GPS Points from USSH)
  const [pointDataset, setPointDataset] = useState<'CORE_15' | 'USSH_61'>('CORE_15');

  // --- 10 STAGES STATE ---
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(0); // 0 = Tất cả
  const [selectedPointId, setSelectedPointId] = useState<string>(HERITAGE_STOP_POINTS[0].id);
  const [selectedUsshPointId, setSelectedUsshPointId] = useState<number>(1);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClassicWork, setSelectedClassicWork] = useState<ClassicRevolutionaryWork | null>(null);

  // --- REGIONAL SITES STATE ---
  const [regionalCategory, setRegionalCategory] = useState<string>('ALL');
  const [selectedRegionalId, setSelectedRegionalId] = useState<string>(
    HCM_REGIONAL_HERITAGE_SITES[0].id
  );
  const [regionalSpeaking, setRegionalSpeaking] = useState<boolean>(false);

  // Filtered points in 10-Stage Core mode
  const filteredPoints = useMemo(() => {
    let list = HERITAGE_STOP_POINTS;
    if (selectedStageNumber > 0) {
      list = list.filter((p) => p.stageNumber === selectedStageNumber);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.alias.toLowerCase().includes(q) ||
          p.events.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedStageNumber, searchQuery]);

  const activePoint =
    filteredPoints.find((p) => p.id === selectedPointId) ||
    filteredPoints[0] ||
    HERITAGE_STOP_POINTS[0];

  const activeStage =
    JOURNEY_10_STAGES.find((s) => s.stageNumber === activePoint.stageNumber) ||
    JOURNEY_10_STAGES[0];

  // Filtered USSH 61 points
  const filteredUsshPoints = useMemo(() => {
    let list = USSH_61_GPS_POINTS;
    if (selectedStageNumber > 0) {
      list = list.filter((p) => p.stageNumber === selectedStageNumber);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.place.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.stage.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedStageNumber, searchQuery]);

  const activeUsshPoint = useMemo(() => {
    return (
      filteredUsshPoints.find((p) => p.id === selectedUsshPointId) ||
      filteredUsshPoints[0] ||
      USSH_61_GPS_POINTS[0]
    );
  }, [filteredUsshPoints, selectedUsshPointId]);

  // Classic work associated with active state
  const activeClassicWork = useMemo(() => {
    if (pointDataset === 'CORE_15' && activePoint.classicWorkId) {
      return CLASSIC_REVOLUTIONARY_WORKS.find((w) => w.id === activePoint.classicWorkId) || null;
    }
    const stageNum = pointDataset === 'USSH_61' ? activeUsshPoint.stageNumber : activePoint.stageNumber;
    return CLASSIC_REVOLUTIONARY_WORKS.find((w) => w.stageNumber === stageNum) || null;
  }, [activePoint, activeUsshPoint, pointDataset]);

  // Auto-play tour timer
  useEffect(() => {
    if (!isPlayingTour) return;
    const timer = setInterval(() => {
      if (pointDataset === 'USSH_61') {
        const curIdx = filteredUsshPoints.findIndex((p) => p.id === activeUsshPoint.id);
        const nextIdx = (curIdx + 1) % filteredUsshPoints.length;
        setSelectedUsshPointId(filteredUsshPoints[nextIdx].id);
      } else {
        const curIdx = filteredPoints.findIndex((p) => p.id === activePoint.id);
        const nextIdx = (curIdx + 1) % filteredPoints.length;
        setSelectedPointId(filteredPoints[nextIdx].id);
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlayingTour, filteredPoints, filteredUsshPoints, activePoint.id, activeUsshPoint.id, pointDataset]);

  // Handle Speech narration for active point
  const handleToggleSpeakPoint = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      let text = '';
      if (pointDataset === 'USSH_61') {
        text = `${activeUsshPoint.stage}, tại ${activeUsshPoint.place}. Tọa độ kinh độ ${activeUsshPoint.coords.lng.toFixed(2)}, vĩ độ ${activeUsshPoint.coords.lat.toFixed(2)}. Nhật ký hành trình: ${activeUsshPoint.content}`;
      } else {
        text = `Chặng ${activePoint.stageNumber}: ${activePoint.name}, tại ${activePoint.location}, giai đoạn ${activePoint.year}. Người sử dụng bí danh ${activePoint.alias}. Sự kiện lịch sử: ${activePoint.events}. Ý nghĩa: ${activePoint.historicalSignificance}. Điểm lưu niệm hôm nay: ${activePoint.memorialSite}.`;
      }
      speakVietnamese(text, () => setIsSpeaking(false));
    }
  };

  // Regional Filtered Sites
  const filteredRegionalSites = useMemo(() => {
    if (regionalCategory === 'ALL') return HCM_REGIONAL_HERITAGE_SITES;
    return HCM_REGIONAL_HERITAGE_SITES.filter((s) => s.category === regionalCategory);
  }, [regionalCategory]);

  const activeRegionalSite =
    filteredRegionalSites.find((s) => s.id === selectedRegionalId) ||
    filteredRegionalSites[0] ||
    HCM_REGIONAL_HERITAGE_SITES[0];

  const handleToggleSpeakRegional = () => {
    if (regionalSpeaking) {
      window.speechSynthesis?.cancel();
      setRegionalSpeaking(false);
    } else {
      setRegionalSpeaking(true);
      const text = `${activeRegionalSite.name}. Địa chỉ: ${activeRegionalSite.address}. ${activeRegionalSite.summary}. Sự kiện lịch sử: ${activeRegionalSite.historicalEvent}.`;
      speakVietnamese(text, () => setRegionalSpeaking(false));
    }
  };

  // RENDER HELPER: WORLD MAP CANVAS & POINT DETAILS
  const renderWorldMapSection = (isCompact: boolean = false) => {
    const currentPointsCount = pointDataset === 'USSH_61' ? filteredUsshPoints.length : filteredPoints.length;
    const currentPointIndex =
      pointDataset === 'USSH_61'
        ? filteredUsshPoints.findIndex((p) => p.id === activeUsshPoint.id)
        : filteredPoints.findIndex((p) => p.id === activePoint.id);

    return (
      <div className={`grid grid-cols-1 ${isCompact ? 'gap-4' : 'lg:grid-cols-12 gap-4'}`}>
        {/* Map Canvas (isCompact ? full : 7 cols) */}
        <div className={`${isCompact ? '' : 'lg:col-span-7'} rounded-3xl border border-blue-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3 flex flex-col justify-between`}>
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-black text-rose-800">
                Chặng {activeStage.stageNumber}: {activeStage.title}
              </span>
            </div>

            {/* Switch Dataset: Core 15 vs USSH 61 GPS */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setPointDataset('CORE_15')}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  pointDataset === 'CORE_15'
                    ? 'bg-rose-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                15 Mốc Cốt Lõi
              </button>
              <button
                type="button"
                onClick={() => setPointDataset('USSH_61')}
                className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  pointDataset === 'USSH_61'
                    ? 'bg-rose-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                61 Tọa Độ USSH
              </button>
            </div>

            {/* Play Tour, Speech, Prev/Next */}
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
                <span>{isPlayingTour ? 'Dừng' : 'Tour'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleSpeakPoint}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                  isSpeaking
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
                title="Nghe thuyết minh tư liệu tọa độ này"
              >
                {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                <span>{isSpeaking ? 'Đang đọc' : 'Thuyết minh'}</span>
              </button>

              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => {
                    if (pointDataset === 'USSH_61') {
                      const prevIdx = (currentPointIndex - 1 + filteredUsshPoints.length) % filteredUsshPoints.length;
                      setSelectedUsshPointId(filteredUsshPoints[prevIdx].id);
                    } else {
                      const prevIdx = (currentPointIndex - 1 + filteredPoints.length) % filteredPoints.length;
                      setSelectedPointId(filteredPoints[prevIdx].id);
                    }
                  }}
                  className="px-2 py-1 text-slate-700 hover:bg-slate-100 text-[11px] font-bold cursor-pointer"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <span className="px-2 text-[11px] font-black text-rose-800">
                  {currentPointIndex + 1}/{currentPointsCount}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (pointDataset === 'USSH_61') {
                      const nextIdx = (currentPointIndex + 1) % filteredUsshPoints.length;
                      setSelectedUsshPointId(filteredUsshPoints[nextIdx].id);
                    } else {
                      const nextIdx = (currentPointIndex + 1) % filteredPoints.length;
                      setSelectedPointId(filteredPoints[nextIdx].id);
                    }
                  }}
                  className="px-2 py-1 text-slate-700 hover:bg-slate-100 text-[11px] font-bold cursor-pointer"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bản Đồ Thế Giới Thực Tế (Leaflet Map GIS OpenStreetMap / ArcGIS Vệ Tinh) */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#E5D3B2] shadow-inner bg-slate-950 h-[380px] sm:h-[480px]">
            <HcmWorldLeafletMap
              activePointId={activePoint.id}
              onSelectPoint={(id) => setSelectedPointId(id)}
              selectedStageNumber={selectedStageNumber}
              pointDataset={pointDataset}
              activeUsshPointId={activeUsshPoint.id}
              onSelectUsshPoint={(id) => setSelectedUsshPointId(id)}
            />
          </div>

          {/* Stage Summary Banner */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 text-xs text-amber-950 flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Bối cảnh Chặng {activeStage.stageNumber}:</strong> {activeStage.description}
            </div>
          </div>
        </div>

        {/* Point Detail Panel (isCompact ? full : 5 cols) */}
        <div className={`${isCompact ? '' : 'lg:col-span-5'} rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4 flex flex-col justify-between`}>
          <div className="space-y-3">
            {/* Header Badge */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-lg bg-rose-700 px-2.5 py-0.5 text-xs font-black text-white shadow-2xs">
                  {pointDataset === 'USSH_61' ? `USSH Tọa độ #${activeUsshPoint.id}` : `Điểm mốc #${activePoint.order}`}
                </span>
                <span className="rounded-lg bg-amber-100 border border-amber-300 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                  {pointDataset === 'USSH_61' ? activeUsshPoint.stage : activePoint.year}
                </span>
                <span className="rounded-lg bg-blue-50 border border-blue-200 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                  {pointDataset === 'USSH_61' ? 'Tọa độ GPS thực tế' : activePoint.country}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {pointDataset === 'USSH_61' ? activeUsshPoint.place : activePoint.name}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                <span>
                  {pointDataset === 'USSH_61'
                    ? `Kinh độ: ${activeUsshPoint.coords.lng.toFixed(4)}, Vĩ độ: ${activeUsshPoint.coords.lat.toFixed(4)}`
                    : activePoint.location}
                </span>
              </div>
            </div>

            {/* USSH Specific Historical Record */}
            {pointDataset === 'USSH_61' ? (
              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    <span>Nhật ký hành trình Bác Hồ:</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-serif text-sm">
                    {activeUsshPoint.content}
                  </p>
                </div>

                {activeUsshPoint.extraVisits && activeUsshPoint.extraVisits.length > 0 && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 space-y-2">
                    <div className="text-amber-950 font-bold flex items-center gap-1 text-[11px]">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span>Các chặng ghé thăm lại sau này:</span>
                    </div>
                    {activeUsshPoint.extraVisits.map((v, i) => (
                      <div key={i} className="text-slate-700 leading-relaxed text-[11px] border-t border-amber-200/50 pt-1.5">
                        <strong className="text-amber-900">{v.stage} ({v.place}):</strong> {v.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Core 15 Points Details */
              <div className="space-y-3 text-xs">
                {/* Alias & Duty */}
                <div className="rounded-xl border border-slate-100 bg-[#F8FBFF] p-3 space-y-1 text-xs">
                  <div className="flex items-center gap-1 text-slate-500 font-semibold">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                    <span>Bí danh &amp; Công việc đảm nhiệm:</span>
                  </div>
                  <div className="text-slate-900 font-bold text-sm">
                    {activePoint.alias}
                  </div>
                </div>

                {/* Historical Events */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-extrabold text-slate-800 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Sự kiện lịch sử nổi bật:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {activePoint.events}
                  </p>
                </div>

                {/* Significance */}
                <div className="space-y-1 text-xs">
                  <span className="font-extrabold text-slate-800">Ý nghĩa cách mạng:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {activePoint.historicalSignificance}
                  </p>
                </div>

                {/* Memorial Site Today */}
                <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-3 space-y-1 text-xs">
                  <div className="flex items-center gap-1 text-rose-800 font-bold">
                    <Landmark className="h-3.5 w-3.5" />
                    <span>Di tích &amp; Điểm lưu niệm hôm nay:</span>
                  </div>
                  <div className="text-slate-800 font-medium">
                    {activePoint.memorialSite}
                  </div>
                </div>

                {activePoint.quote && (
                  <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/70 p-3 text-xs italic text-amber-950 font-serif">
                    &ldquo;{activePoint.quote}&rdquo;
                  </div>
                )}
              </div>
            )}

            {/* Linked Classic Revolutionary Work Banner */}
            {activeClassicWork && (
              <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50/80 p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wide">
                    <BookOpen className="h-4 w-4 text-amber-600" />
                    Tác Phẩm Kinh Điển Liên Kết
                  </span>
                  <span className="rounded-md bg-amber-200/70 px-2 py-0.5 text-[10px] font-bold text-amber-900 font-mono">
                    {activeClassicWork.year}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 font-serif">
                  {activeClassicWork.title}
                </h5>
                <p className="text-xs italic text-amber-900 font-serif line-clamp-2">
                  &ldquo;{activeClassicWork.quoteKey}&rdquo;
                </p>
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedClassicWork(activeClassicWork)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-xs transition-colors cursor-pointer"
                  >
                    <BookMarked className="h-3.5 w-3.5" />
                    <span>Đọc toàn văn tác phẩm</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  pointDataset === 'USSH_61'
                    ? 'Tìm địa danh, sự kiện trong 61 tọa độ USSH...'
                    : 'Tra cứu tên điểm dừng, thành phố, bí danh...'
                }
                className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] pl-8 pr-3 py-1.5 text-xs outline-none focus:border-rose-400"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Mode Switcher */}
      <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-[#FBF5EA] via-white to-[#EFF6FF] p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-700 to-rose-900 text-white shadow-xs">
              <Compass className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Bản Đồ Di Sản &amp; Không Gian Văn Hóa Hồ Chí Minh
                </h3>
                <span className="rounded-full bg-rose-100 border border-rose-300 px-2 py-0.5 text-[10px] font-black text-rose-800 uppercase tracking-wide">
                  Song Hành Map &amp; Timeline
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Tái hiện hành trình 30 năm bôn ba cứu nước qua 10 chặng lịch sử và hệ thống Địa chỉ đỏ tại TP.HCM
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {/* Mode 1: Song Hành (Flagship) */}
            <button
              type="button"
              onClick={() => setMapMode('SONG_HANH')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                mapMode === 'SONG_HANH'
                  ? 'bg-gradient-to-r from-rose-700 to-amber-700 text-white shadow-xs ring-2 ring-amber-300'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <SplitSquareVertical className="h-3.5 w-3.5 text-amber-300" />
              <span>Song Hành (Map + Timeline)</span>
            </button>

            {/* Mode 2: Bản Đồ 10 Chặng */}
            <button
              type="button"
              onClick={() => setMapMode('10_STAGES')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                mapMode === '10_STAGES'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span>Bản Đồ 10 Chặng</span>
            </button>

            {/* Mode 3: Timeline Lucian #370 */}
            <button
              type="button"
              onClick={() => setMapMode('TIMELINE')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                mapMode === 'TIMELINE'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Dòng Thời Gian Tương Tác</span>
            </button>

            {/* Mode 4: Địa Chỉ Đỏ TP.HCM */}
            <button
              type="button"
              onClick={() => setMapMode('HCM_REGIONAL')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                mapMode === 'HCM_REGIONAL'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
              }`}
            >
              <Landmark className="h-3.5 w-3.5" />
              <span>Địa Chỉ Đỏ &amp; Di Tích TP.HCM</span>
            </button>

            {onOpenVietnamModal && (
              <button
                type="button"
                onClick={onOpenVietnamModal}
                className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 text-xs shadow-xs transition-colors cursor-pointer"
                title="Mở Bản đồ Việt Nam với Quần đảo Hoàng Sa & Trường Sa"
              >
                <Flag className="h-3.5 w-3.5" />
                <span>Bản Đồ Tổ Quốc (Hoàng Sa - Trường Sa)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: CHẾ ĐỘ SONG HÀNH (DUAL SYNC: TIMELINE + INTERACTIVE MAP)       */}
      {/* ===================================================================== */}
      {mapMode === 'SONG_HANH' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* Left Column: Timeline Lucian UX/UI #370 (5 cols) */}
          <div className="xl:col-span-5 space-y-4">
            <HcmJourneyInteractiveTimeline
              onSelectMilestone={(m) => {
                setSelectedStageNumber(m.stageNumber);
                const matchedPoint = HERITAGE_STOP_POINTS.find((p) => p.stageNumber === m.stageNumber);
                if (matchedPoint) setSelectedPointId(matchedPoint.id);
                const matchedUssh = USSH_61_GPS_POINTS.find((p) => p.stageNumber === m.stageNumber);
                if (matchedUssh) setSelectedUsshPointId(matchedUssh.id);
                if (m.classicWorkId) {
                  const work = CLASSIC_REVOLUTIONARY_WORKS.find((w) => w.id === m.classicWorkId);
                  if (work) setSelectedClassicWork(work);
                }
              }}
            />
          </div>

          {/* Right Column: World Map + Active Point Details (7 cols) */}
          <div className="xl:col-span-7 space-y-4">
            {/* Stage Selector Bar */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-rose-800">
                  <Layers className="h-3.5 w-3.5" /> Đồng Bộ Bản Đồ Theo Chặng:
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Chặng {selectedStageNumber > 0 ? selectedStageNumber : 'Toàn cảnh 10 Chặng'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  type="button"
                  onClick={() => setSelectedStageNumber(0)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-bold cursor-pointer transition-colors ${
                    selectedStageNumber === 0
                      ? 'bg-[#751D2C] text-amber-300 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Toàn Cảnh (10 Chặng)
                </button>
                {JOURNEY_10_STAGES.map((st) => {
                  const active = selectedStageNumber === st.stageNumber;
                  return (
                    <button
                      key={st.stageNumber}
                      type="button"
                      onClick={() => {
                        setSelectedStageNumber(st.stageNumber);
                        const firstPt = HERITAGE_STOP_POINTS.find((p) => p.stageNumber === st.stageNumber);
                        if (firstPt) setSelectedPointId(firstPt.id);
                        const firstUssh = USSH_61_GPS_POINTS.find((p) => p.stageNumber === st.stageNumber);
                        if (firstUssh) setSelectedUsshPointId(firstUssh.id);
                      }}
                      className={`shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                        active
                          ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-200'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: st.color }} />
                      <span>Chặng {st.stageNumber} ({st.period})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map Canvas and Info */}
            {renderWorldMapSection(true)}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: BẢN ĐỒ 10 CHẶNG BÔN BA CỨU NƯỚC (TOÀN CẢNH)                    */}
      {/* ===================================================================== */}
      {mapMode === '10_STAGES' && (
        <div className="space-y-4">
          {/* Stage Selector Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-rose-800">
                <Layers className="h-3.5 w-3.5" /> Chọn Chặng Lịch Sử (1911 — 1945):
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                {pointDataset === 'USSH_61'
                  ? `Hiển thị ${filteredUsshPoints.length} tọa độ GPS USSH`
                  : `Hiển thị ${filteredPoints.length} điểm mốc tiêu biểu`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <button
                type="button"
                onClick={() => setSelectedStageNumber(0)}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedStageNumber === 0
                    ? 'bg-[#751D2C] text-amber-300 shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Toàn Cảnh (10 Chặng)
              </button>
              {JOURNEY_10_STAGES.map((st) => {
                const active = selectedStageNumber === st.stageNumber;
                return (
                  <button
                    key={st.stageNumber}
                    type="button"
                    onClick={() => {
                      setSelectedStageNumber(st.stageNumber);
                      const firstPt = HERITAGE_STOP_POINTS.find((p) => p.stageNumber === st.stageNumber);
                      if (firstPt) setSelectedPointId(firstPt.id);
                      const firstUssh = USSH_61_GPS_POINTS.find((p) => p.stageNumber === st.stageNumber);
                      if (firstUssh) setSelectedUsshPointId(firstUssh.id);
                    }}
                    className={`shrink-0 rounded-xl px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                      active
                        ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-200'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: st.color }} />
                    <span>Chặng {st.stageNumber} ({st.period})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Width World Map Section */}
          {renderWorldMapSection(false)}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 3: DÒNG THỜI GIAN TƯƠNG TÁC (LUCIAN UX/UI #370 PROMPT EFFECT)    */}
      {/* ===================================================================== */}
      {mapMode === 'TIMELINE' && (
        <HcmJourneyInteractiveTimeline
          onSelectMilestone={(m) => {
            setSelectedStageNumber(m.stageNumber);
            const matchedPoint = HERITAGE_STOP_POINTS.find((p) => p.stageNumber === m.stageNumber);
            if (matchedPoint) setSelectedPointId(matchedPoint.id);
            const matchedUssh = USSH_61_GPS_POINTS.find((p) => p.stageNumber === m.stageNumber);
            if (matchedUssh) setSelectedUsshPointId(matchedUssh.id);
            setMapMode('SONG_HANH');
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* MODE 4: ĐỊA CHỈ ĐỎ & DI TÍCH HỒ CHÍ MINH TẠI TP.HCM & NAM BỘ          */}
      {/* ===================================================================== */}
      {mapMode === 'HCM_REGIONAL' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'ALL', label: 'Tất cả Địa chỉ đỏ (10)' },
              { id: 'DI_TICH_BAC_HO', label: 'Di tích gắn liền với Bác' },
              { id: 'CAN_CU_LICH_SU', label: 'Căn cứ kháng chiến anh hùng' },
              { id: 'KHONG_GIAN_SO', label: 'Không gian Văn hóa Số' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setRegionalCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  regionalCategory === cat.id
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Visual HCMC Schematic Map (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
                <span className="flex items-center gap-1 text-rose-800">
                  <Landmark className="h-4 w-4" /> Sơ đồ Tọa độ Di sản Không gian Văn hóa TP.HCM
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Nhấp vào từng điểm để tra cứu thông tin
                </span>
              </div>

              {/* Graphic Canvas for HCMC Area */}
              <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-[#FFFBEB] via-[#FEF2F2] to-[#EFF6FF] p-2">
                <svg viewBox="0 0 800 500" className="w-full h-72 sm:h-96 select-none">
                  {/* Subtle Sài Gòn River Path */}
                  <path
                    d="M 150,0 Q 250,120 400,180 T 550,300 T 650,500"
                    fill="none"
                    stroke="#93C5FD"
                    strokeWidth="28"
                    opacity="0.45"
                  />
                  <text x="470" y="280" fill="#60A5FA" fontSize="13" fontWeight="bold" transform="rotate(35 470,280)">
                    SÔNG SÀI GÒN
                  </text>

                  {/* Regional Zones */}
                  <rect x="30" y="20" width="220" height="150" rx="20" fill="#E2E8F0" opacity="0.4" />
                  <text x="50" y="60" fill="#64748B" fontSize="11" fontWeight="bold">KHU VỰC CỦ CHI</text>

                  <rect x="260" y="160" width="280" height="180" rx="24" fill="#FEE2E2" opacity="0.5" />
                  <text x="320" y="210" fill="#991B1B" fontSize="12" fontWeight="extrabold">TRUNG TÂM TP.HCM (Q1, Q4, Q5)</text>

                  <rect x="520" y="320" width="250" height="160" rx="24" fill="#DCFCE7" opacity="0.45" />
                  <text x="590" y="420" fill="#166534" fontSize="11" fontWeight="bold">RỪNG SÁC - CẦN GIỜ</text>

                  <rect x="360" y="10" width="260" height="110" rx="20" fill="#FEF3C7" opacity="0.5" />
                  <text x="400" y="45" fill="#92400E" fontSize="11" fontWeight="bold">KHU VỰC THỦ DẦU MỘT (BÌNH DƯƠNG)</text>

                  {/* Render Regional Markers */}
                  {HCM_REGIONAL_HERITAGE_SITES.map((site) => {
                    const isSelected = site.id === activeRegionalSite.id;
                    const catMatch = regionalCategory === 'ALL' || site.category === regionalCategory;
                    const cx = site.coords.x * 8;
                    const cy = site.coords.y * 5;

                    return (
                      <g
                        key={site.id}
                        onClick={() => setSelectedRegionalId(site.id)}
                        className="cursor-pointer transition-transform duration-200"
                        opacity={catMatch ? 1 : 0.25}
                      >
                        {isSelected && (
                          <circle cx={cx} cy={cy} r="20" fill="#DC2626" opacity="0.3" className="animate-ping" />
                        )}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 13 : 9}
                          fill={isSelected ? '#DC2626' : site.category === 'DI_TICH_BAC_HO' ? '#B91C1C' : '#2563EB'}
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                        />
                        <text x={cx} y={cy + 18} textAnchor="middle" fill="#0F172A" fontSize="9" fontWeight="bold">
                          {site.code}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Grid of site chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredRegionalSites.map((st) => {
                  const active = st.id === activeRegionalSite.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedRegionalId(st.id)}
                      className={`rounded-xl p-2.5 text-left transition-all border cursor-pointer ${
                        active
                          ? 'border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-200'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-rose-700">{st.code}</span>
                        <span className="text-slate-500">{st.district}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                        {st.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regional Site Detail Card (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Image and Header */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={activeRegionalSite.imageUrl}
                    alt={activeRegionalSite.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-[#751D2C] px-2 py-0.5 text-[10.5px] font-bold text-amber-300">
                    {activeRegionalSite.categoryLabel}
                  </span>
                  <span className="absolute right-2.5 bottom-2.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10.5px] font-bold text-white">
                    {activeRegionalSite.city}
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {activeRegionalSite.name}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span>{activeRegionalSite.address}</span>
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-700 leading-relaxed bg-[#F8FBFF] p-3 rounded-xl border border-slate-100">
                  {activeRegionalSite.summary}
                </p>

                {/* Visiting info */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-amber-900 font-bold">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Giờ đón khách:
                    </span>
                    <span>{activeRegionalSite.visitingInfo.hours}</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-900 font-bold">
                    <span>Vé tham quan:</span>
                    <span className="text-emerald-700">{activeRegionalSite.visitingInfo.ticket}</span>
                  </div>
                  <div className="pt-1.5 border-t border-amber-200/70 text-[11px] text-amber-950">
                    <strong>Điểm nhấn nổi bật:</strong> {activeRegionalSite.visitingInfo.highlights.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleToggleSpeakRegional}
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                    regionalSpeaking
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{regionalSpeaking ? 'Đang đọc' : 'Nghe thuyết minh'}</span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${activeRegionalSite.name} ${activeRegionalSite.address}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 text-xs shadow-2xs transition-colors"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Chỉ đường Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Classic Work Modal */}
      {selectedClassicWork && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedClassicWork(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-amber-400/60 p-6 shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-700/80 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-amber-500/20 border border-amber-400/50 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-300">
                    {selectedClassicWork.year}
                  </span>
                  <span className="rounded-lg bg-rose-900/60 border border-rose-700 px-2 py-0.5 text-[11px] font-bold text-rose-200">
                    {selectedClassicWork.category === 'YEU_SACH' && 'Văn kiện Ngoại giao & Yêu sách'}
                    {selectedClassicWork.category === 'LUAN_THUYET' && 'Kiệt tác Lý luận Cách mạng'}
                    {selectedClassicWork.category === 'VAN_KIEN_DANG' && 'Cương lĩnh & Văn kiện Đảng'}
                    {selectedClassicWork.category === 'THO_VAN' && 'Di sản Văn thơ Cách mạng'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                  {selectedClassicWork.title}
                </h3>
                {selectedClassicWork.originalTitle && (
                  <p className="text-xs italic text-slate-400">
                    Tiêu đề gốc: {selectedClassicWork.originalTitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedClassicWork(null)}
                className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Location & Context */}
            <div className="flex items-center gap-2 text-xs text-amber-300/90">
              <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Nơi ra đời: <strong>{selectedClassicWork.location}</strong></span>
            </div>

            {/* Key Quote */}
            <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-500/10 p-4 font-serif text-sm italic text-amber-200 leading-relaxed">
              &ldquo;{selectedClassicWork.quoteKey}&rdquo;
            </div>

            {/* Summary */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Bối cảnh &amp; Nội dung khái quát:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedClassicWork.summary}
              </p>
            </div>

            {/* Significance */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                Giá trị lịch sử &amp; Ý nghĩa thời đại:
              </span>
              <p className="text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                {selectedClassicWork.significance}
              </p>
            </div>

            {/* Snippet */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Trích lục nội dung tiêu biểu:
              </span>
              <p className="text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px]">
                {selectedClassicWork.readMoreSnippet}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClassicWork(null)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 text-xs transition-colors cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
