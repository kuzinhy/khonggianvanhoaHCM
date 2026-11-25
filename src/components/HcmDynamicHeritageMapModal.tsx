import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Navigation,
  Flag,
  BookOpen,
  Route,
  Anchor,
  Search,
  Landmark,
  Award,
  CheckCircle2,
  Clock,
  Globe,
} from 'lucide-react';
import { HcmCorrectionModal } from './HcmCorrectionModal';
import {
  VIETNAM_ISLANDS_SOVEREIGNTY,
  HO_CHI_MINH_VIETNAM_JOURNEY,
  THU_DAU_MOT_ZONES_5,
  THU_DAU_MOT_POINTS_12,
  THU_DAU_MOT_ADMIN_INFO,
  type VietnamJourneyPoint,
  type IslandSovereigntyPoint,
  type ThuDauMotMapPoint,
} from '../data/hcmDynamicMapData';
import {
  JOURNEY_10_STAGES,
  HERITAGE_STOP_POINTS,
  type JourneyStage,
  type HeritageStopPoint,
} from '../data/hcmHeritageMapData';
import VIETNAM_REAL_PROVINCES from '../data/vietnamRealMapPaths.json';
import { HcmRealLeafletMap } from './HcmRealLeafletMap';
import { HcmWorldLeafletMap } from './HcmWorldLeafletMap';

export type MapMode = 'WORLD' | 'VIETNAM' | 'THU_DAU_MOT';

interface HcmDynamicHeritageMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: MapMode;
  onNavigateToTab?: (tab: any) => void;
}

function speakVoice(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'vi-VN';
  utter.rate = 0.95;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
  return true;
}

export const HcmDynamicHeritageMapModal: React.FC<HcmDynamicHeritageMapModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'WORLD',
  onNavigateToTab,
}) => {
  const [mapMode, setMapMode] = useState<MapMode>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // States for World Map (Hành trình 30 năm)
  const [activeWorldStopId, setActiveWorldStopId] = useState<string>(HERITAGE_STOP_POINTS[0].id);
  const [selectedWorldStageNumber, setSelectedWorldStageNumber] = useState<number>(0);

  // States for Vietnam Map
  const [activeVnStepOrder, setActiveVnStepOrder] = useState<number>(1);
  const [isPlayingVnTour, setIsPlayingVnTour] = useState(false);
  const [selectedIsland, setSelectedIsland] = useState<IslandSovereigntyPoint | null>(null);

  // States for Thu Dau Mot Map
  const [selectedTdmCategory, setSelectedTdmCategory] = useState<string>('ALL');
  const [activeTdmPointId, setActiveTdmPointId] = useState<string>(THU_DAU_MOT_POINTS_12[0].id);
  const [tdmRightViewMode, setTdmRightViewMode] = useState<'LIST' | 'DETAIL'>('LIST');
  const [correctionTarget, setCorrectionTarget] = useState<{ id: string; title: string; type?: any } | null>(null);
  const [tdmSearchQuery, setTdmSearchQuery] = useState('');
  const [tdmLayerMode, setTdmLayerMode] = useState<'VECTOR' | 'REAL_MAP'>('REAL_MAP');

  // Audio speech
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Synchronize initial mode
  useEffect(() => {
    if (isOpen) {
      setMapMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Clean speech when close
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setIsPlayingVnTour(false);
    }
  }, [isOpen]);

  // Auto-play Vietnam Journey
  useEffect(() => {
    if (!isPlayingVnTour) return;
    const timer = setInterval(() => {
      setActiveVnStepOrder((prev) => {
        if (prev >= HO_CHI_MINH_VIETNAM_JOURNEY.length) {
          return 1;
        }
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlayingVnTour]);

  if (!isOpen) return null;

  const currentVnStep =
    HO_CHI_MINH_VIETNAM_JOURNEY.find((s) => s.order === activeVnStepOrder) ||
    HO_CHI_MINH_VIETNAM_JOURNEY[0];

  const currentWorldStop =
    HERITAGE_STOP_POINTS.find((p) => p.id === activeWorldStopId) ||
    HERITAGE_STOP_POINTS[0];

  const currentWorldStage =
    JOURNEY_10_STAGES.find((s) => s.stageNumber === currentWorldStop.stageNumber) ||
    JOURNEY_10_STAGES[0];

  const filteredTdmPoints = THU_DAU_MOT_POINTS_12.filter((p) => {
    const matchCat =
      selectedTdmCategory === 'ALL' ||
      (selectedTdmCategory === 'DI_TICH' && p.category === 'DI_TICH_LICH_SU') ||
      (selectedTdmCategory === 'KHONG_GIAN_HCM' && p.category === 'KHONG_GIAN_HCM') ||
      (selectedTdmCategory === 'TUYEN_DO' && p.category === 'TUYEN_DO');
    const matchSearch =
      !tdmSearchQuery.trim() ||
      p.name.toLowerCase().includes(tdmSearchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(tdmSearchQuery.toLowerCase()) ||
      p.khuPho.toLowerCase().includes(tdmSearchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const currentTdmPoint =
    THU_DAU_MOT_POINTS_12.find((p) => p.id === activeTdmPointId) ||
    filteredTdmPoints[0] ||
    THU_DAU_MOT_POINTS_12[0];

  const handleToggleWorldSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    const textToRead = currentWorldStop.audioNarrative
      ? `${currentWorldStop.name}, tại ${currentWorldStop.location}, ${currentWorldStop.country}. ${currentWorldStop.audioNarrative}. Bí danh sử dụng: ${currentWorldStop.alias}. Ý nghĩa lịch sử: ${currentWorldStop.historicalSignificance}`
      : `${currentWorldStop.name}, tại ${currentWorldStop.location}, ${currentWorldStop.country}. Năm ${currentWorldStop.year}. Bí danh Người mang: ${currentWorldStop.alias}. Sự kiện: ${currentWorldStop.events}. Ý nghĩa lịch sử: ${currentWorldStop.historicalSignificance}. Điểm tưởng niệm lưu danh: ${currentWorldStop.memorialSite}`;
    if (speakVoice(textToRead, () => setIsSpeaking(false))) {
      setIsSpeaking(true);
    }
  };

  const handleToggleVnSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    const textToRead = currentVnStep.audioNarrative
      ? `${currentVnStep.name}. ${currentVnStep.audioNarrative} Lời Bác dạy: ${currentVnStep.quote || ''}. Bài học hành động: ${currentVnStep.actionLesson}`
      : `${currentVnStep.name}. Giai đoạn: ${currentVnStep.year}. Ý nghĩa: ${currentVnStep.significance}. ${currentVnStep.quote ? 'Lời Bác dạy: ' + currentVnStep.quote : ''}. Bài học hành động: ${currentVnStep.actionLesson}`;
    if (speakVoice(textToRead, () => setIsSpeaking(false))) {
      setIsSpeaking(true);
    }
  };

  const handleToggleTdmSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    const textToRead = `${currentTdmPoint.name}, thuộc ${currentTdmPoint.khuPho}, Phường Thủ Dầu Một. Địa chỉ: ${currentTdmPoint.address}. ${currentTdmPoint.summary}. Ý nghĩa: ${currentTdmPoint.significance}`;
    if (speakVoice(textToRead, () => setIsSpeaking(false))) {
      setIsSpeaking(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/75 backdrop-blur-sm animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-[1380px] h-[92vh] max-h-[92vh] rounded-3xl'
        } bg-[#FFFDFD] border-2 border-rose-300 shadow-2xl ring-1 ring-rose-200/60 flex flex-col overflow-hidden transition-all duration-300 animate-in zoom-in-95`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            1. HEADER BANNER TINH GỌN DUY NHẤT (HỒNG PHA ĐỎ & TRẮNG TƯƠI SÁNG, HIỆN ĐẠI)
            ========================================================================= */}
        <div className="bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] px-3 sm:px-4 py-2 text-white flex flex-wrap items-center justify-between gap-2 shrink-0 border-b border-rose-300/40 shadow-sm">
          {/* Logo & Tiêu đề ngắn gọn */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 p-1 flex items-center justify-center shadow-xs shrink-0 ring-1 ring-white/40">
              <Compass className="w-4 h-4 text-[#881337] animate-spin-slow" />
            </div>
            <h2 className="font-serif text-xs sm:text-sm font-bold text-white tracking-wide">
              Bản Đồ Số Di Sản &amp; Không Gian VH Hồ Chí Minh
            </h2>
          </div>

          {/* 3 Tab Cấp Độ Bản Đồ Tinh Gọn (World / Vietnam / Thu Dau Mot) */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/30 border border-white/10 text-xs">
            {/* TAB 1: WORLD */}
            <button
              type="button"
              onClick={() => {
                setMapMode('WORLD');
                setSelectedIsland(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mapMode === 'WORLD'
                  ? 'bg-amber-400 text-rose-800 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3 text-amber-500" />
              <span>Hành Trình Bác (Thế Giới)</span>
              <span className="text-[9.5px] px-1 py-0.2 rounded bg-black/15 font-black">
                26 mốc
              </span>
            </button>

            {/* TAB 2: VIETNAM */}
            <button
              type="button"
              onClick={() => {
                setMapMode('VIETNAM');
                setSelectedIsland(null);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mapMode === 'VIETNAM'
                  ? 'bg-amber-400 text-rose-800 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Flag className="w-3 h-3 text-red-600" />
              <span>Dấu Chân Việt Nam</span>
              <span className="text-[9.5px] px-1 py-0.2 rounded bg-black/15 font-black">
                12 mốc
              </span>
            </button>

            {/* TAB 3: THU DAU MOT */}
            <button
              type="button"
              onClick={() => setMapMode('THU_DAU_MOT')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                mapMode === 'THU_DAU_MOT'
                  ? 'bg-amber-400 text-rose-800 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>Di Sản Thủ Dầu Một</span>
              <span className="text-[9.5px] px-1 py-0.2 rounded bg-black/15 font-black">
                12 điểm
              </span>
            </button>
          </div>

          {/* Công cụ góc phải: Thuyết minh / Đổi lớp / Toàn màn hình / Đóng */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs">
            {/* Công tắc lớp ở Thủ Dầu Một */}
            {mapMode === 'THU_DAU_MOT' && (
              <button
                type="button"
                onClick={() => setTdmLayerMode((m) => (m === 'REAL_MAP' ? 'VECTOR' : 'REAL_MAP'))}
                className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 text-[10.5px] font-bold flex items-center gap-1 border border-white/20 transition-colors cursor-pointer"
                title="Đổi giữa Bản đồ Vệ tinh & Sơ họa phân khu"
              >
                <Layers className="w-3 h-3" />
                <span>{tdmLayerMode === 'REAL_MAP' ? 'Bản Đồ Thật' : 'Sơ Họa'}</span>
              </button>
            )}

            {/* Nút Thuyết minh */}
            <button
              type="button"
              onClick={() => {
                if (mapMode === 'WORLD') handleToggleWorldSpeak();
                else if (mapMode === 'VIETNAM') handleToggleVnSpeak();
                else handleToggleTdmSpeak();
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                isSpeaking
                  ? 'bg-rose-600 text-white animate-pulse border-rose-300'
                  : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/20'
              }`}
              title="Nghe thuyết minh di sản"
            >
              {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              <span>{isSpeaking ? 'Dừng đọc' : 'Thuyết minh'}</span>
            </button>

            {/* Nút Tự động phát tour ở Việt Nam */}
            {mapMode === 'VIETNAM' && (
              <button
                type="button"
                onClick={() => setIsPlayingVnTour(!isPlayingVnTour)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isPlayingVnTour
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-900'
                }`}
                title="Tự động phát hành trình theo dòng lịch sử"
              >
                {isPlayingVnTour ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                <span className="hidden sm:inline">{isPlayingVnTour ? 'Dừng' : 'Tour'}</span>
              </button>
            )}

            {/* Fullscreen */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 transition-colors cursor-pointer"
              title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
              title="Đóng bản đồ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. KHÔNG GIAN BẢN ĐỒ VÀ BẢNG THÔNG TIN (2 CỘT VỪA KHÍT MÀN HÌNH)
            ========================================================================= */}
        <div className="flex-1 min-h-0 p-2.5 sm:p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden">
          {/* =======================================================================
              CỘT TRÁI (7 CỘT): KHUNG BẢN ĐỒ TƯƠNG TÁC
              ======================================================================= */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-rose-200/80 p-2.5 shadow-xs flex flex-col h-full overflow-hidden justify-between">
            {/* Nhãn trạng thái góc trên */}
            <div className="flex items-center justify-between text-xs border-b border-rose-100 pb-1.5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold text-slate-800 text-[11.5px]">
                  {mapMode === 'WORLD'
                    ? 'Bản Đồ Thế Giới: Hải Trình & 30 Năm Bôn Ba Cứu Nước (1911 – 1941)'
                    : mapMode === 'VIETNAM'
                    ? 'Bản Đồ Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam'
                    : 'Bản Đồ Hành Chính & Di Sản Phường Thủ Dầu Một (5 Khu Phố)'}
                </span>
              </div>
              <span className="text-[10.5px] font-mono text-slate-500">
                {mapMode === 'WORLD'
                  ? `${HERITAGE_STOP_POINTS.length} Điểm Mốc Lịch Sử (10 Chặng)`
                  : mapMode === 'VIETNAM'
                  ? '12 Điểm Mốc Lịch Sử'
                  : `${filteredTdmPoints.length}/12 Điểm Tọa Độ`}
              </span>
            </div>

            {/* CANVAS BẢN ĐỒ (BUNG HẾT CỠ CHIỀU CAO ĐỂ HIỂN THỊ HOÀNH TRÁNG) */}
            <div className="relative w-full flex-1 h-full min-h-[360px] bg-gradient-to-br from-[#FFF5F7] via-white to-rose-50/40 rounded-xl border border-rose-200/70 overflow-hidden shadow-inner flex items-center justify-center my-0.5">
              <div
                className="w-full h-full transition-transform duration-300 ease-out flex items-center justify-center relative"
                style={{ transform: mapMode === 'WORLD' ? 'none' : `scale(${zoomLevel})` }}
              >
                {mapMode === 'WORLD' ? (
                  /* ===============================================================
                     BẢN ĐỒ THẾ GIỚI LEAFLET THẬT (HẢI TRÌNH 30 NĂM CỨU NƯỚC CỦA BÁC)
                     =============================================================== */
                  <div className="w-full h-full relative rounded-2xl overflow-hidden border border-rose-200/70 shadow-inner bg-slate-900 flex flex-col animate-in fade-in">
                    <HcmWorldLeafletMap
                      activePointId={activeWorldStopId}
                      onSelectPoint={setActiveWorldStopId}
                      selectedStageNumber={selectedWorldStageNumber}
                    />
                  </div>
                ) : mapMode === 'VIETNAM' ? (
                  /* ===============================================================
                     BẢN ĐỒ VIỆT NAM SINH ĐỘNG (HOÀNG SA & TRƯỜNG SA)
                     =============================================================== */
                  <svg
                    viewBox="0 0 1000 1000"
                    className="w-full h-full select-none filter drop-shadow-md"
                  >
                    {/* Nền biển và lưới tọa độ hải dương */}
                    <defs>
                      <linearGradient id="seaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.6" />
                      </linearGradient>
                      <pattern id="seaPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 0 20 Q 10 16 20 20 T 40 20" fill="none" stroke="#38BDF8" strokeWidth="0.6" opacity="0.3" />
                      </pattern>
                      <linearGradient id="vnLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEF08A" />
                        <stop offset="50%" stopColor="#FDE047" />
                        <stop offset="100%" stopColor="#FBBF24" />
                      </linearGradient>
                    </defs>

                    <rect width="1000" height="1000" fill="url(#seaGlow)" />
                    <rect width="1000" height="1000" fill="url(#seaPattern)" />

                    {/* Họa tiết Trống Đồng chuẩn Đông Sơn làm Hoa Tiêu Hải Dương (Compass Rose) */}
                    <g opacity="0.32" className="select-none pointer-events-none">
                      <image
                        href="/assets/hcm-space/trong-dong-chuan-gold.png"
                        x="730"
                        y="60"
                        width="160"
                        height="160"
                      />
                    </g>

                    {/* Vùng biển Đông Việt Nam text trang trọng */}
                    <g opacity="0.75" className="select-none pointer-events-none">
                      <text x="640" y="320" fill="#0369A1" fontSize="22" fontWeight="900" letterSpacing="6" opacity="0.7">
                        BIỂN ĐÔNG VIỆT NAM
                      </text>
                      <text x="640" y="345" fill="#0284C7" fontSize="12" fontWeight="bold" letterSpacing="3" opacity="0.8">
                        EAST VIETNAM SEA · UNCLOS 1982
                      </text>
                    </g>

                    {/* Bản đồ 63 tỉnh thành Việt Nam thật từ dữ liệu địa lý */}
                    <g id="vietnam-provinces" className="filter drop-shadow-sm">
                      {VIETNAM_REAL_PROVINCES.map((prov: any, idx: number) => (
                        <path
                          key={idx}
                          d={prov.d}
                          fill="url(#vnLandGrad)"
                          stroke="#B45309"
                          strokeWidth="0.8"
                          className="hover:brightness-105 transition-all"
                        >
                          <title>{prov.name}</title>
                        </path>
                      ))}
                    </g>

                    {/* Quần đảo Hoàng Sa - Các đảo, bãi đá tự nhiên (Đà Nẵng) */}
                    <g
                      id="hoang-sa-islands"
                      className="cursor-pointer group"
                      onClick={() =>
                        setSelectedIsland(
                          VIETNAM_ISLANDS_SOVEREIGNTY.find((i) => i.id === 'hoang-sa') || null
                        )
                      }
                    >
                      <circle cx="631" cy="446" r="4.5" fill="#EAB308" stroke="#B45309" strokeWidth="1" className="group-hover:scale-125 transition-transform" />
                      <circle cx="641" cy="418" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="606" cy="492" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="677" cy="428" r="4" fill="#EAB308" stroke="#B45309" strokeWidth="1" />
                      <circle cx="702" cy="437" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="638" cy="451" r="3" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="650" cy="470" r="3" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="665" cy="455" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                    </g>

                    {/* Quần đảo Trường Sa - Các đảo, đá, bãi tự nhiên (Khánh Hòa) */}
                    <g
                      id="truong-sa-islands"
                      className="cursor-pointer group"
                      onClick={() =>
                        setSelectedIsland(
                          VIETNAM_ISLANDS_SOVEREIGNTY.find((i) => i.id === 'truong-sa') || null
                        )
                      }
                    >
                      <circle cx="802" cy="759" r="4.5" fill="#EAB308" stroke="#B45309" strokeWidth="1" className="group-hover:scale-125 transition-transform" />
                      <circle cx="804" cy="758" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="799" cy="782" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="808" cy="804" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="804" cy="836" r="4.5" fill="#EAB308" stroke="#B45309" strokeWidth="1" />
                      <circle cx="811" cy="823" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="801" cy="854" r="4" fill="#EAB308" stroke="#B45309" strokeWidth="1" />
                      <circle cx="651" cy="917" r="4.5" fill="#EAB308" stroke="#B45309" strokeWidth="1" />
                      <circle cx="723" cy="910" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="713" cy="976" r="3" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="738" cy="959" r="3" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="760" cy="880" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                      <circle cx="775" cy="895" r="3.5" fill="#EAB308" stroke="#B45309" strokeWidth="0.8" />
                    </g>

                    {/* ĐƯỜNG NỐI HÀNH TRÌNH BÁC HỒ (ANIMATED GLOW PATH) */}
                    <polyline
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3"
                      strokeDasharray="7 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.85"
                      points={HO_CHI_MINH_VIETNAM_JOURNEY.map((pt) => `${pt.coords.x},${pt.coords.y}`).join(' ')}
                      className="filter drop-shadow-[0_1px_3px_rgba(220,38,38,0.5)]"
                    />

                    {/* 12 ĐIỂM DẤU CHÂN BÁC HỒ TRÊN BẢN ĐỒ VIỆT NAM */}
                    {HO_CHI_MINH_VIETNAM_JOURNEY.map((pt) => {
                      const isActive = pt.order === currentVnStep.order;
                      const cx = pt.coords.x;
                      const cy = pt.coords.y;

                      return (
                        <g
                          key={pt.id}
                          className="cursor-pointer group"
                          onClick={() => {
                            setActiveVnStepOrder(pt.order);
                            setSelectedIsland(null);
                          }}
                        >
                          {/* Vòng pulse phát sáng khi active */}
                          {isActive && (
                            <circle cx={cx} cy={cy} r="16" fill="#DC2626" opacity="0.35" className="animate-ping" />
                          )}

                          <circle
                            cx={cx}
                            cy={cy}
                            r={isActive ? 12 : 8}
                            fill={isActive ? '#751D2C' : '#DC2626'}
                            stroke="#FFFFFF"
                            strokeWidth={isActive ? '2.5' : '1.8'}
                            className="group-hover:scale-125 transition-transform"
                          />

                          <text
                            x={cx}
                            y={cy + (isActive ? 4 : 3)}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize={isActive ? '10' : '7.5'}
                            fontWeight="bold"
                          >
                            {pt.order}
                          </text>

                          {/* Nhãn nổi khi active hoặc điểm đặc biệt */}
                          {isActive && (
                            <g transform={`translate(${cx > 520 ? cx - 145 : cx + 16}, ${cy - 12})`}>
                              <rect
                                x="-4"
                                y="-12"
                                width="140"
                                height="22"
                                rx="6"
                                fill="#751D2C"
                                stroke="#ECC880"
                                strokeWidth="1.5"
                                className="shadow-lg"
                              />
                              <text x="6" y="3" fontSize="10" fontWeight="bold" fill="#FEF08A">
                                #{pt.order} {pt.location.split(',')[0]}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* La bàn định hướng phía Đông Bắc */}
                    <g transform="translate(85, 110)">
                      <circle cx="0" cy="0" r="32" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" opacity="0.9" />
                      <polygon points="0,-26 6,-6 0,0 -6,-6" fill="#DC2626" />
                      <polygon points="0,26 6,6 0,0 -6,6" fill="#64748B" />
                      <text x="0" y="-30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#DC2626">B</text>
                      <text x="0" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748B">N</text>
                      <text x="36" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748B">Đ</text>
                      <text x="-36" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748B">T</text>
                    </g>
                  </svg>
                ) : tdmLayerMode === 'REAL_MAP' ? (
                  /* ===============================================================
                     BẢN ĐỒ ĐỊA LÝ THỰC TẾ (LEAFLET INTERACTIVE / OSM / VỆ TINH GIS)
                     =============================================================== */
                  <div className="w-full h-full relative rounded-2xl overflow-hidden border border-rose-200/80 shadow-inner bg-slate-100 flex flex-col animate-in fade-in">
                    <HcmRealLeafletMap
                      points={filteredTdmPoints}
                      activePointId={activeTdmPointId}
                      onSelectPoint={(id) => {
                        setActiveTdmPointId(id);
                        setTdmRightViewMode('DETAIL');
                      }}
                      onOpenDetail={() => setTdmRightViewMode('DETAIL')}
                    />
                  </div>
                ) : (
                  /* ===============================================================
                     BẢN ĐỒ HÀNH CHÍNH SỐ (VECTOR CHUẨN ĐỊA LÝ PHƯỜNG THỦ DẦU MỘT)
                     =============================================================== */
                  <svg
                    viewBox="0 0 1000 1000"
                    className="w-full h-full select-none filter drop-shadow-md animate-in fade-in"
                  >
                    <defs>
                      <linearGradient id="riverGradTdm" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0284C7" />
                        <stop offset="50%" stopColor="#0EA5E9" />
                        <stop offset="100%" stopColor="#0369A1" />
                      </linearGradient>
                      <pattern id="riverWavesTdm" width="30" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 0 10 Q 7 5 15 10 T 30 10" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.4" />
                      </pattern>
                      <linearGradient id="mainLandTdm" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFDF7" />
                        <stop offset="100%" stopColor="#F9F5EC" />
                      </linearGradient>
                    </defs>

                    {/* Nền bản đồ toàn khu vực */}
                    <rect width="1000" height="1000" fill="url(#mainLandTdm)" />

                    {/* DÒNG SÔNG SÀI GÒN BỜ TÂY (UỐN LƯỢN CHUẨN THEO ĐỊA LÝ) */}
                    <path
                      d="M 180,0
                         C 130,140 100,280 120,440
                         C 140,580 110,760 160,1000
                         L 0,1000 L 0,0 Z"
                      fill="url(#riverGradTdm)"
                      className="filter drop-shadow-[0_4px_12px_rgba(2,132,199,0.35)]"
                    />
                    <path
                      d="M 180,0 C 130,140 100,280 120,440 C 140,580 110,760 160,1000 L 0,1000 L 0,0 Z"
                      fill="url(#riverWavesTdm)"
                    />
                    <text
                      x="65"
                      y="460"
                      fill="#FFFFFF"
                      fontSize="15"
                      fontWeight="900"
                      transform="rotate(80, 65, 460)"
                      opacity="0.85"
                      letterSpacing="5"
                    >
                      SÔNG SÀI GÒN
                    </text>

                    {/* CẦU PHÚ CƯỜNG (ĐT744) VẮT QUA SÔNG SÀI GÒN SANG CỦ CHI, TP.HCM */}
                    <g className="cursor-pointer group">
                      <line x1="80" y1="180" x2="260" y2="180" stroke="#71717A" strokeWidth="8" strokeLinecap="round" />
                      <line x1="80" y1="180" x2="260" y2="180" stroke="#FEF08A" strokeWidth="3" strokeDasharray="6 4" />
                      <text x="70" y="165" fill="#71717A" fontSize="10.5" fontWeight="bold">
                        CẦU PHÚ CƯỜNG (ĐT744) → TP. HỒ CHÍ MINH
                      </text>
                    </g>

                    {/* 5 PHÂN KHU HÀNH CHÍNH PHƯỜNG THỦ DẦU MỘT MỚI (VẼ THEO RANH GIỚI TỰ NHIÊN) */}
                    {THU_DAU_MOT_ZONES_5.map((zone) => (
                      <g key={zone.id} className="cursor-pointer group">
                        <path
                          d={zone.path}
                          fill={zone.color}
                          stroke={zone.borderColor}
                          strokeWidth="2.8"
                          strokeDasharray="4 2"
                          opacity="0.82"
                          className="hover:opacity-100 hover:brightness-105 transition-all filter drop-shadow-xs"
                        >
                          <title>{zone.name} - {zone.description}</title>
                        </path>
                        {/* Nhãn tên phân khu */}
                        <g transform={`translate(${zone.centerCoords.x * 10}, ${zone.centerCoords.y * 10})`}>
                          <rect
                            x="-65"
                            y="-14"
                            width="130"
                            height="24"
                            rx="12"
                            fill="#FFFFFF"
                            stroke={zone.borderColor}
                            strokeWidth="1.5"
                            opacity="0.95"
                            className="shadow-xs"
                          />
                          <text
                            x="0"
                            y="2.5"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="bold"
                            fill={zone.borderColor}
                          >
                            {zone.khuPho}
                          </text>
                        </g>
                      </g>
                    ))}

                    {/* HỆ THỐNG MẠNG LƯỚI GIAO THÔNG HUYẾT MẠCH */}
                    {/* Tuyến đường ven sông Bạch Đằng (Phố hoa ven sông) */}
                    <path
                      d="M 185,160 C 135,320 125,480 150,720 C 170,860 190,1000 190,1000"
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <text x="110" y="680" fill="#B45309" fontSize="10" fontWeight="bold" transform="rotate(78, 110, 680)">
                      ĐƯỜNG BẠCH ĐẰNG (PHỐ VEN SÔNG)
                    </text>

                    {/* Trục Đại lộ Bình Dương (Quốc lộ 13 - Trục xương sống phía Đông) */}
                    <path d="M 680,60 L 760,1000" fill="none" stroke="#DC2626" strokeWidth="8" opacity="0.75" />
                    <text x="735" y="420" fill="#991B1B" fontSize="11" fontWeight="black" transform="rotate(84, 735, 420)">
                      ĐẠI LỘ BÌNH DƯƠNG (QUỐC LỘ 13)
                    </text>

                    {/* Trục đường Cách Mạng Tháng Tám (CMT8 - ĐT745) */}
                    <path d="M 280,240 L 730,420" fill="none" stroke="#059669" strokeWidth="5.5" opacity="0.7" />
                    <text x="360" y="275" fill="#065F46" fontSize="10.5" fontWeight="bold">
                      ĐƯỜNG CÁCH MẠNG THÁNG TÁM (CMT8)
                    </text>

                    {/* Trục đường Yersin (Nối ven sông qua Chùa Hội Khánh) */}
                    <path d="M 160,480 L 820,540" fill="none" stroke="#4F46E5" strokeWidth="5.5" opacity="0.7" />
                    <text x="460" y="505" fill="#3730A3" fontSize="10.5" fontWeight="bold">
                      ĐƯỜNG YERSIN (CHÙA HỘI KHÁNH)
                    </text>

                    {/* Trục đường Quang Trung (Trung tâm hành chính số 1) */}
                    <path d="M 330,340 L 520,380" fill="none" stroke="#751D2C" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
                    <text x="345" y="330" fill="#751D2C" fontSize="10" fontWeight="bold">
                      ĐƯỜNG QUANG TRUNG (UBND PHƯỜNG)
                    </text>

                    {/* Trục đường 30 Tháng 4 (Đi Cảng Bà Lụa) */}
                    <path d="M 320,680 L 750,740" fill="none" stroke="#2563EB" strokeWidth="5" opacity="0.7" />
                    <text x="480" y="700" fill="#1D4ED8" fontSize="10" fontWeight="bold">
                      ĐƯỜNG 30 THÁNG 4 (CẢNG BÀ LỤA)
                    </text>

                    {/* CẢNG BÀ LỤA & BẾN BẠCH ĐẰNG ICON */}
                    <g transform="translate(190, 880)">
                      <circle cx="0" cy="0" r="16" fill="#0284C7" opacity="0.2" className="animate-ping" />
                      <circle cx="0" cy="0" r="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="14" y="4" fontSize="10" fontWeight="bold" fill="#0369A1">CẢNG BÀ LỤA LỊCH SỬ</text>
                    </g>
                    <g transform="translate(145, 460)">
                      <circle cx="0" cy="0" r="14" fill="#D97706" opacity="0.25" className="animate-ping" />
                      <circle cx="0" cy="0" r="8" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="12" y="3" fontSize="9.5" fontWeight="bold" fill="#92400E">BẾN DU THUYỀN BẠCH ĐẰNG</text>
                    </g>

                    {/* 12 TỌA ĐỘ DI TÍCH & KHÔNG GIAN VH HCM TẠI PHƯỜNG THỦ DẦU MỘT */}
                    {filteredTdmPoints.map((pt) => {
                      const isActive = pt.id === currentTdmPoint.id;
                      const cx = pt.coords.x * 10;
                      const cy = pt.coords.y * 10;

                      return (
                        <g
                          key={pt.id}
                          className="cursor-pointer group"
                          onClick={() => setActiveTdmPointId(pt.id)}
                        >
                          {/* Hiệu ứng radar pulse tỏa sóng khi active */}
                          {isActive && (
                            <circle cx={cx} cy={cy} r="26" fill="#751D2C" opacity="0.3" className="animate-ping" />
                          )}

                          <circle
                            cx={cx}
                            cy={cy}
                            r={isActive ? 16 : 11}
                            fill={
                              pt.category === 'DI_TICH_LICH_SU'
                                ? '#B91C1C'
                                : pt.category === 'KHONG_GIAN_HCM'
                                ? '#D97706'
                                : '#4338CA'
                            }
                            stroke="#FFFFFF"
                            strokeWidth={isActive ? '3.5' : '2'}
                            className="group-hover:scale-125 transition-transform shadow-md"
                          />

                          <text
                            x={cx}
                            y={cy + (isActive ? 4.5 : 3.5)}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize={isActive ? '10.5' : '8'}
                            fontWeight="bold"
                          >
                            {pt.code.replace('DT-', 'D').replace('KG-', 'K').replace('TD-', 'T').replace('HC-', 'H')}
                          </text>

                          {/* Nhãn tooltip nổi bật */}
                          {isActive && (
                            <g transform={`translate(${cx > 550 ? cx - 180 : cx + 20}, ${cy - 12})`}>
                              <rect
                                x="-4"
                                y="-12"
                                width={pt.name.length * 6.5 + 24}
                                height="24"
                                rx="8"
                                fill="#751D2C"
                                stroke="#ECC880"
                                strokeWidth="1.8"
                                className="shadow-xl"
                              />
                              <text x="8" y="4" fontSize="10.5" fontWeight="bold" fill="#FEF08A">
                                [{pt.khuPho}] {pt.name}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* La bàn định hướng phía Đông Bắc */}
                    <g transform="translate(900, 100)">
                      <circle cx="0" cy="0" r="30" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" opacity="0.95" />
                      <polygon points="0,-24 5,-5 0,0 -5,-5" fill="#DC2626" />
                      <polygon points="0,24 5,5 0,0 -5,5" fill="#64748B" />
                      <text x="0" y="-28" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#DC2626">B</text>
                      <text x="0" y="36" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#64748B">N</text>
                      <text x="34" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#64748B">Đ</text>
                      <text x="-34" y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#64748B">T</text>
                    </g>
                  </svg>
                )}
              </div>

              {/* Chú giải góc bản đồ (Chỉ hiển thị cho bản đồ Việt Nam & Thủ Dầu Một) */}
              {mapMode !== 'WORLD' && (
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 text-[11px] space-y-1 shadow-md">
                  {mapMode === 'VIETNAM' ? (
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                      <span>12 Dấu mốc lịch sử cứu nước</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 font-bold text-red-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                        <span>Di tích Lịch sử Đất Thủ</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-amber-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span>Không Gian VH HCM Cơ Sở</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-indigo-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                        <span>Tuyến Du Khảo Về Nguồn</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Thanh trượt timeline 10 Chặng (ở chế độ Bản Đồ Thế Giới) - Siêu mỏng 1 hàng để tối đa hóa không gian bản đồ */}
            {mapMode === 'WORLD' && (
              <div className="pt-1 shrink-0 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                <span className="font-bold text-rose-800 text-[10.5px] whitespace-nowrap flex items-center gap-1 shrink-0">
                  <Compass className="w-3 h-3 text-amber-600" />
                  <span>10 Chặng:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedWorldStageNumber(0)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedWorldStageNumber === 0
                      ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs'
                      : 'bg-white border border-rose-200/80 text-slate-700 hover:border-rose-600'
                  }`}
                >
                  Toàn cảnh (10 chặng)
                </button>
                {JOURNEY_10_STAGES.map((stg) => (
                  <button
                    key={stg.stageNumber}
                    type="button"
                    onClick={() => {
                      setSelectedWorldStageNumber(stg.stageNumber);
                      const firstPt = HERITAGE_STOP_POINTS.find((p) => p.stageNumber === stg.stageNumber);
                      if (firstPt) setActiveWorldStopId(firstPt.id);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                      selectedWorldStageNumber === stg.stageNumber
                        ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs'
                        : 'bg-white border border-rose-200/80 text-slate-700 hover:border-rose-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stg.color }} />
                    <span>Chặng {stg.stageNumber} ({stg.period})</span>
                  </button>
                ))}
              </div>
            )}

            {/* Thanh trượt timeline thời gian (ở chế độ Việt Nam) */}
            {mapMode === 'VIETNAM' && (
              <div className="p-2.5 bg-gradient-to-br from-white to-rose-50/40 rounded-2xl border border-rose-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Dòng thời gian cuộc đời &amp; hành trình của Bác:</span>
                  </span>
                  <span className="font-bold text-[#B45309]">
                    Năm {currentVnStep.year}
                  </span>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {HO_CHI_MINH_VIETNAM_JOURNEY.map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setActiveVnStepOrder(step.order);
                        setSelectedIsland(null);
                      }}
                      className={`px-2 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                        step.order === currentVnStep.order
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs'
                          : 'bg-white border border-rose-200/80 text-slate-700 hover:border-rose-600'
                      }`}
                    >
                      #{step.order} {step.location.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Thanh lướt nhanh 12 Điểm Di sản & Địa chỉ đỏ Đất Thủ (ở chế độ Thủ Dầu Một) */}
            {mapMode === 'THU_DAU_MOT' && (
              <div className="p-2.5 bg-gradient-to-br from-white to-rose-50/40 rounded-2xl border border-rose-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-800 flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-rose-600" />
                    <span>Lướt nhanh 12 Địa danh tiêu biểu &amp; Địa chỉ đỏ:</span>
                  </span>
                  <span className="font-bold text-[#B45309] text-[10.5px]">
                    {filteredTdmPoints.length} địa điểm
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                  {filteredTdmPoints.map((pt) => (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => {
                        setActiveTdmPointId(pt.id);
                        setTdmRightViewMode('DETAIL');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        pt.id === currentTdmPoint.id
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs'
                          : 'bg-white border border-rose-200/80 text-slate-700 hover:border-rose-600'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          pt.category === 'DI_TICH_LICH_SU'
                            ? 'bg-red-500'
                            : pt.category === 'KHONG_GIAN_HCM'
                            ? 'bg-amber-500'
                            : 'bg-indigo-500'
                        }`}
                      />
                      <span>{pt.code}: {pt.name.split('—')[0].split('&')[0].trim()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* =======================================================================
              CỘT PHẢI (5 CỘT): THẺ CHI TIẾT TỌA ĐỘ ĐANG CHỌN (GỌN GÀNG, KHÔNG CẦN CUỘN)
              ======================================================================= */}
          <div className="md:col-span-5 bg-white rounded-2xl border-2 border-rose-300/80 p-3 sm:p-3.5 shadow-sm ring-1 ring-rose-100 flex flex-col justify-between h-full overflow-hidden">
            {mapMode === 'WORLD' ? (
              /* ===============================================================
                 THÔNG TIN CHI TIẾT MỐC HÀNH TRÌNH THẾ GIỚI CỦA BÁC (1911 – 1941)
                 =============================================================== */
              <div className="flex-1 flex flex-col justify-between overflow-hidden pr-0.5 space-y-1.5 animate-in fade-in h-full">
                {/* Header mốc súc tích, chữ to rõ */}
                <div className="border-b border-rose-200/70 pb-1.5 space-y-1 shrink-0">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#9F1239] text-white font-bold text-[10.5px] shadow-2xs">
                      Chặng {currentWorldStop.stageNumber}/10 · Mốc #{currentWorldStop.order} ({currentWorldStop.year})
                    </span>
                    <span className="text-rose-800 font-bold text-[11px] flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      <MapPin className="w-3 h-3 text-red-600" />
                      <span>{currentWorldStop.country}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentWorldStop.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Bí danh: <strong>{currentWorldStop.alias}</strong></span>
                    </span>
                    <span className="text-slate-700 font-medium">
                      📍 {currentWorldStop.location}
                    </span>
                  </div>

                  <div className="text-[11px] text-rose-950 bg-rose-50/60 px-2.5 py-0.5 rounded-lg border border-rose-200/80 font-medium">
                    <strong className="text-rose-800">Chặng {currentWorldStage.stageNumber}:</strong> {currentWorldStage.title}
                  </div>
                </div>

                {/* Nội dung diễn biến & ý nghĩa: Giảm khoảng cách giữa các thẻ, tăng thể hiện phần text to rõ và sâu sắc */}
                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2 py-1 pr-0.5">
                  {/* 1. Diễn biến sự kiện lịch sử */}
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-white to-rose-50/40 rounded-xl border border-rose-200/80 text-slate-800 space-y-1 shadow-2xs">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5 text-xs sm:text-[13px]">
                      <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                      <span>Diễn biến sự kiện lịch sử:</span>
                    </div>
                    <p className="leading-relaxed text-slate-800 text-[12.5px] sm:text-[13px] font-sans">{currentWorldStop.events}</p>
                  </div>

                  {/* 2. Ý nghĩa lịch sử & Tư tưởng cách mạng */}
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-rose-50/80 via-white to-rose-50/40 rounded-xl border border-rose-200 text-slate-800 space-y-1 shadow-2xs">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5 text-xs sm:text-[13px]">
                      <Award className="w-3.5 h-3.5 text-rose-600" />
                      <span>Ý nghĩa lịch sử &amp; Giá trị tư tưởng:</span>
                    </div>
                    <p className="leading-relaxed text-slate-800 text-[12.5px] sm:text-[13px] font-sans">{currentWorldStop.historicalSignificance}</p>
                  </div>

                  {/* 3. Di tích lưu niệm & Lời dạy của Bác */}
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-rose-50/40 via-white to-amber-50/30 rounded-xl border border-rose-200/80 text-slate-800 space-y-1 shadow-2xs text-xs sm:text-[12.5px]">
                    <div className="flex items-center gap-1.5 font-bold text-rose-800 text-xs sm:text-[13px]">
                      <Landmark className="w-3.5 h-3.5 text-rose-600" />
                      <span>Di tích lưu niệm ngày nay:</span>
                      <span className="font-semibold text-slate-800 ml-1">{currentWorldStop.memorialSite}</span>
                    </div>
                    {currentWorldStop.quote && (
                      <blockquote className="italic font-serif leading-snug pl-2 border-l-2 border-rose-600 text-rose-900 text-xs sm:text-[13px] pt-0.5">
                        “{currentWorldStop.quote}”
                      </blockquote>
                    )}
                  </div>
                </div>

                {/* Hàng điều hướng chuyển mốc và góp ý (1 hàng duy nhất tinh gọn, nút to rõ dễ bấm) */}
                <div className="flex items-center justify-between pt-1.5 border-t border-rose-200/70 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const curIdx = HERITAGE_STOP_POINTS.findIndex((p) => p.id === currentWorldStop.id);
                      const prevIdx = (curIdx - 1 + HERITAGE_STOP_POINTS.length) % HERITAGE_STOP_POINTS.length;
                      setActiveWorldStopId(HERITAGE_STOP_POINTS[prevIdx].id);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs text-rose-900"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-rose-600" />
                    <span>Mốc trước</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
                      Mốc {currentWorldStop.order} / {HERITAGE_STOP_POINTS.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionTarget({
                          id: currentWorldStop.id,
                          title: `Mốc #${currentWorldStop.order}: ${currentWorldStop.name}`,
                          type: 'MAP_POINT',
                        })
                      }
                      className="text-xs text-slate-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Góp ý đính chính"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                      <span className="hidden sm:inline">Góp ý mốc này</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const curIdx = HERITAGE_STOP_POINTS.findIndex((p) => p.id === currentWorldStop.id);
                      const nextIdx = (curIdx + 1) % HERITAGE_STOP_POINTS.length;
                      setActiveWorldStopId(HERITAGE_STOP_POINTS[nextIdx].id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                  >
                    <span>Mốc sau</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : mapMode === 'VIETNAM' ? (
              selectedIsland ? (
                /* ===============================================================
                   THÔNG TIN CHỦ QUYỀN BIỂN ĐẢO (HOÀNG SA / TRƯỜNG SA)
                   =============================================================== */
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-rose-200/80 pb-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-700 text-amber-200 text-[10.5px] font-black uppercase tracking-wider">
                        VÙNG BIỂN ĐẢO THIÊNG LIÊNG CỦA TỔ QUỐC
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedIsland(null)}
                        className="text-xs text-slate-500 hover:text-red-700 font-bold"
                      >
                        ← Về hành trình
                      </button>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-rose-800 mt-1">
                      {selectedIsland.name}
                    </h3>
                    <p className="text-xs text-amber-900 font-bold">
                      {selectedIsland.jurisdiction}
                    </p>
                  </div>

                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-slate-800 space-y-2">
                    <p className="leading-relaxed">
                      {selectedIsland.significance}
                    </p>
                    {selectedIsland.islandsCount && (
                      <p className="text-[11px] text-amber-900 font-bold">
                        Quy mô: {selectedIsland.islandsCount}
                      </p>
                    )}
                  </div>

                  <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-950 space-y-1.5">
                    <span className="font-bold flex items-center gap-1.5 text-red-800">
                      <ShieldCheck className="w-4 h-4 text-red-700" />
                      <span>Lời dạy thiêng liêng của Chủ tịch Hồ Chí Minh:</span>
                    </span>
                    <blockquote className="italic leading-relaxed font-serif">
                      “Ngày trước ta chỉ có đêm và rừng. Ngày nay ta có ngày, có trời, có biển. Bờ biển ta dài, tươi đẹp, ta phải biết giữ gìn lấy nó.”
                    </blockquote>
                  </div>
                </div>
              ) : (
                /* ===============================================================
                   THÔNG TIN CHẶNG HÀNH TRÌNH BÁC HỒ ĐANG CHỌN (ĐA DẠNG & SÂU SẮC)
                   =============================================================== */
                <div className="space-y-4 animate-in fade-in">
                  <div className="border-b border-rose-200/80 pb-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-amber-200 font-bold text-[10.5px]">
                        Mốc #{currentVnStep.order} · {currentVnStep.year}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-rose-600 font-bold text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-600" />
                          <span>{currentVnStep.location}</span>
                        </span>

                        <button
                          type="button"
                          onClick={handleToggleVnSpeak}
                          className={`px-2.5 py-0.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isSpeaking
                              ? 'bg-red-600 text-white animate-pulse shadow-xs'
                              : 'bg-amber-100 hover:bg-amber-200 text-rose-800'
                          }`}
                          title="Nghe thuyết minh di sản"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{isSpeaking ? 'Đang đọc' : 'Thuyết minh'}</span>
                        </button>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-800 leading-snug">
                      {currentVnStep.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C2334] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                        <Sparkles className="w-3 h-3 text-rose-600" />
                        <span>Giá trị cốt lõi: {currentVnStep.coreValue}</span>
                      </span>
                    </div>
                  </div>

                  {/* Ảnh tư liệu */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-100 border border-rose-200/80 shadow-inner relative">
                    <img
                      src={currentVnStep.imageUrl}
                      alt={currentVnStep.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/hcm-space/card-dong-thoi-gian.jpg';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/65 text-white text-[10.5px] backdrop-blur-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-300" />
                      <span>{currentVnStep.location}</span>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-700 to-[#881337]/85 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                      {currentVnStep.year}
                    </div>
                  </div>

                  {/* 1. Bối cảnh lịch sử chi tiết */}
                  <div className="p-3 bg-gradient-to-br from-white to-rose-50/40 rounded-2xl border border-rose-200/80 text-xs text-slate-800 space-y-1">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-rose-600" />
                      <span>Bối cảnh lịch sử:</span>
                    </div>
                    <p className="leading-relaxed text-[#4A4540]">{currentVnStep.historicalContext}</p>
                  </div>

                  {/* 2. Dòng mốc sự kiện tiêu biểu tại điểm dừng */}
                  <div className="space-y-1.5 text-xs">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      <span>Dấu ấn lịch sử tiêu biểu:</span>
                    </div>
                    <div className="space-y-1.5 pl-0.5">
                      {currentVnStep.keyMilestones.map((m, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11.5px] leading-relaxed p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="shrink-0 px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-700 to-[#881337] text-amber-200 font-bold text-[10px]">
                            {m.time}
                          </span>
                          <span className="text-slate-700">{m.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Ý nghĩa lịch sử */}
                  <div className="space-y-1 text-xs text-slate-800 leading-relaxed">
                    <span className="font-bold text-rose-800 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-rose-600" />
                      <span>Ý nghĩa lịch sử &amp; tư tưởng:</span>
                    </span>
                    <p className="text-slate-700 pl-0.5">{currentVnStep.significance}</p>
                  </div>

                  {/* 4. Địa chỉ đỏ & Di tích lưu giữ hiện nay */}
                  <div className="space-y-1.5 text-xs">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-rose-600" />
                      <span>Địa chỉ đỏ &amp; Di tích hiện nay:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-0.5">
                      {currentVnStep.heritageSites.map((site, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/90 text-rose-800 text-[11px] font-medium flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3 text-rose-600" />
                          <span>{site}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 5. Lời Bác dạy */}
                  {currentVnStep.quote && (
                    <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                      <span className="font-bold text-amber-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                        <span>Lời Bác dạy:</span>
                      </span>
                      <blockquote className="italic font-serif leading-relaxed pl-1 text-[12.5px] text-[#5B1522]">
                        “{currentVnStep.quote}”
                      </blockquote>
                    </div>
                  )}

                  {/* 6. Bài học hành động cho nhân dân hôm nay */}
                  <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1">
                    <span className="font-bold text-rose-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Bài học hành động cho nhân dân hôm nay:</span>
                    </span>
                    <p className="leading-relaxed text-slate-800 pl-1">{currentVnStep.actionLesson}</p>
                  </div>

                  {/* Điều hướng chuyển chặng */}
                  <div className="flex items-center justify-between pt-3 border-t border-rose-200/80">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveVnStepOrder((o) =>
                          o > 1 ? o - 1 : HO_CHI_MINH_VIETNAM_JOURNEY.length
                        )
                      }
                      className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Chặng trước</span>
                    </button>

                    <span className="text-xs font-bold text-rose-800 bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200">
                      Chặng {currentVnStep.order} / {HO_CHI_MINH_VIETNAM_JOURNEY.length}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveVnStepOrder((o) =>
                          o < HO_CHI_MINH_VIETNAM_JOURNEY.length ? o + 1 : 1
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>Chặng sau</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Nút Góp ý / Đề nghị đính chính chặng này */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setCorrectionTarget({
                          id: currentVnStep.id,
                          title: `Chặng ${currentVnStep.order}: ${currentVnStep.name} (${currentVnStep.location})`,
                          type: 'MAP_POINT',
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-[11px] text-rose-800 hover:text-rose-900 font-bold py-1 px-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer border border-rose-200/60"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Góp ý / Đề nghị đính chính chặng này</span>
                    </button>
                  </div>
                </div>
              )
            ) : (
              /* ===============================================================
                 THÔNG TIN DI TÍCH / KHÔNG GIAN VH HCM TẠI THỦ DẦU MỘT
                 =============================================================== */
              <div className="space-y-3.5 animate-in fade-in">
                {/* Khối Thông tin địa giới hành chính Phường Thủ Dầu Một mới nhất */}
                <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200/90 text-xs text-slate-800 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-rose-600" />
                      <span>Địa giới Hành chính Phường Thủ Dầu Một mới</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-amber-200 font-extrabold">
                      Nghị quyết mới
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-0.5">
                    <div><strong>Trụ sở:</strong> Số 1 Quang Trung</div>
                    <div><strong>Diện tích:</strong> ~12.8 km²</div>
                    <div><strong>Dân số:</strong> Trên 85.000 dân</div>
                    <div><strong>Phân khu:</strong> 05 Phân khu hợp nhất</div>
                  </div>
                  <p className="text-[10.5px] text-amber-900/80 leading-relaxed pt-0.5 border-t border-amber-200/40">
                    Hợp nhất toàn bộ Phú Cường, Chánh Nghĩa, Phú Thọ và một phần Hiệp Thành, Chánh Mỹ. Phía Tây ôm trọn Sông Sài Gòn, phía Đông giáp Đại lộ Bình Dương (QL13).
                  </p>
                </div>

                {/* Tiêu đề & Công cụ chuyển đổi: Danh sách 12 Địa danh ↔ Chi tiết */}
                <div className="flex items-center justify-between gap-2 border-b border-rose-200/80 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <h4 className="text-xs sm:text-sm font-bold font-serif text-rose-800">
                      Địa Danh Tiêu Biểu &amp; Địa Chỉ Đỏ ({filteredTdmPoints.length})
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-100/70 p-0.5 rounded-xl border border-amber-200/80 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setTdmRightViewMode('LIST')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        tdmRightViewMode === 'LIST'
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                          : 'text-rose-800 hover:bg-amber-200/60'
                      }`}
                    >
                      Danh Sách
                    </button>
                    <button
                      type="button"
                      onClick={() => setTdmRightViewMode('DETAIL')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        tdmRightViewMode === 'DETAIL'
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                          : 'text-rose-800 hover:bg-amber-200/60'
                      }`}
                    >
                      Chi Tiết
                    </button>
                  </div>
                </div>

                {/* Thanh tìm kiếm & Bộ lọc loại hình Thủ Dầu Một */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm địa danh, di tích, chùa Hội Khánh, chợ Thủ..."
                      value={tdmSearchQuery}
                      onChange={(e) => setTdmSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-amber-300/80 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-2xs"
                    />
                    <Search className="w-3.5 h-3.5 text-amber-700/60 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    {tdmSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setTdmSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1 text-[10.5px]">
                    {[
                      { id: 'ALL', label: 'Tất cả' },
                      { id: 'DI_TICH', label: '🏛️ Di tích Lịch sử' },
                      { id: 'KHONG_GIAN_HCM', label: '⭐ Không Gian VH HCM' },
                      { id: 'TUYEN_DO', label: '🚩 Tuyến Đỏ' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedTdmCategory(cat.id)}
                        className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                          selectedTdmCategory === cat.id
                            ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CHẾ ĐỘ 1: DANH SÁCH CÁC ĐỊA DANH TIÊU BIỂU & ĐỊA CHỈ ĐỎ */}
                {tdmRightViewMode === 'LIST' ? (
                  <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredTdmPoints.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-500 space-y-1">
                        <p>Không tìm thấy địa danh nào phù hợp với từ khóa.</p>
                        <button
                          type="button"
                          onClick={() => {
                            setTdmSearchQuery('');
                            setSelectedTdmCategory('ALL');
                          }}
                          className="text-rose-800 font-bold underline"
                        >
                          Xóa bộ lọc để xem tất cả 12 địa điểm
                        </button>
                      </div>
                    ) : (
                      filteredTdmPoints.map((pt) => {
                        const isSelected = pt.id === currentTdmPoint.id;
                        return (
                          <div
                            key={pt.id}
                            onClick={() => setActiveTdmPointId(pt.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-start ${
                              isSelected
                                ? 'bg-amber-50/80 border-rose-300 shadow-xs ring-2 ring-amber-300'
                                : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/80'
                            }`}
                          >
                            {/* Ảnh thu nhỏ địa danh */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                              <img
                                src={pt.imageUrl}
                                alt={pt.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/assets/hcm-space/card-dong-thoi-gian.jpg';
                                }}
                              />
                              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                                {pt.code}
                              </span>
                            </div>

                            {/* Thông tin địa danh */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center justify-between gap-1 text-[10px]">
                                <span className={`px-1.5 py-0.2 rounded-md font-bold ${
                                  pt.category === 'DI_TICH_LICH_SU'
                                    ? 'bg-red-100 text-red-800'
                                    : pt.category === 'KHONG_GIAN_HCM'
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-indigo-100 text-indigo-900'
                                }`}>
                                  {pt.khuPho}
                                </span>
                                <span className="text-slate-500 font-medium truncate max-w-[120px]">
                                  {pt.rank ? pt.rank.split('&')[0].trim() : 'Di sản'}
                                </span>
                              </div>

                              <h5 className="font-serif font-bold text-xs sm:text-[13px] text-rose-800 leading-snug">
                                {pt.name}
                              </h5>

                              <p className="text-[11px] text-slate-600 line-clamp-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-rose-600 shrink-0" />
                                <span className="truncate">{pt.address}</span>
                              </p>

                              <p className="text-[10.5px] text-slate-500 line-clamp-2 italic">
                                {pt.summary}
                              </p>

                              {/* Nút hành động nhanh */}
                              <div className="pt-1.5 flex items-center gap-1.5 text-[10.5px]">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTdmPointId(pt.id);
                                    setTdmRightViewMode('DETAIL');
                                  }}
                                  className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-rose-700 to-[#881337] text-white font-bold hover:bg-rose-900 transition-colors"
                                >
                                  Xem chi tiết
                                </button>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    pt.googleMapsQuery
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-2 py-0.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold inline-flex items-center gap-0.5"
                                >
                                  <Navigation className="w-2.5 h-2.5 text-amber-700" />
                                  <span>Chỉ đường</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  /* CHẾ ĐỘ 2: XEM CHI TIẾT ĐỊA DANH ĐANG CHỌN */
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between border-b border-rose-200/80 pb-2">
                      <button
                        type="button"
                        onClick={() => setTdmRightViewMode('LIST')}
                        className="text-xs text-rose-800 hover:text-rose-900 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        ← Xem toàn bộ 12 địa danh
                      </button>
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                        {currentTdmPoint.code}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {currentTdmPoint.khuPho}
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold">
                          {currentTdmPoint.rank || 'Điểm Di sản'}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-rose-800">
                        {currentTdmPoint.name}
                      </h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{currentTdmPoint.address}</span>
                      </p>
                    </div>

                    {/* Ảnh địa danh */}
                    <div className="w-full h-40 rounded-2xl overflow-hidden bg-stone-100 border border-rose-200/80 shadow-inner relative">
                      <img
                        src={currentTdmPoint.imageUrl}
                        alt={currentTdmPoint.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/hcm-space/card-dong-thoi-gian.jpg';
                        }}
                      />
                      {currentTdmPoint.establishedYear && (
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10.5px] px-2 py-0.5 rounded-md backdrop-blur-xs font-mono">
                          Xây dựng: {currentTdmPoint.establishedYear}
                        </span>
                      )}
                      {currentTdmPoint.visitDuration && (
                        <span className="absolute bottom-2 right-2 bg-gradient-to-r from-rose-700 to-[#881337]/80 text-amber-200 text-[10.5px] px-2 py-0.5 rounded-md backdrop-blur-xs font-medium">
                          Tham quan: {currentTdmPoint.visitDuration}
                        </span>
                      )}
                    </div>

                    {/* Tóm tắt & Ý nghĩa */}
                    <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <p>{currentTdmPoint.summary}</p>
                      </div>
                      <p className="text-amber-950 font-medium bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/90">
                        <strong className="text-rose-800">Ý nghĩa lịch sử &amp; tư tưởng: </strong>
                        {currentTdmPoint.significance}
                      </p>
                    </div>

                    {/* Nút chỉ đường Google Maps & Xem thêm */}
                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          currentTdmPoint.googleMapsQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#751D2C] to-[#8C2334] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:from-[#5B1522] hover:to-[#751D2C] transition-all shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-300" />
                        <span>Chỉ Đường Google Maps</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>

                      {onNavigateToTab && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onNavigateToTab('TDM_HOUSE');
                          }}
                          className="px-3 py-2 rounded-xl border border-rose-300 bg-amber-50 hover:bg-amber-100 text-rose-800 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Nhà Truyền Thống
                        </button>
                      )}
                    </div>

                    {/* Chuyển nhanh giữa các địa danh */}
                    <div className="flex items-center justify-between pt-2 border-t border-rose-200/80 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          const currentIdx = filteredTdmPoints.findIndex((p) => p.id === currentTdmPoint.id);
                          const prevIdx = (currentIdx - 1 + filteredTdmPoints.length) % filteredTdmPoints.length;
                          setActiveTdmPointId(filteredTdmPoints[prevIdx].id);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Trước</span>
                      </button>

                      <span className="text-[11px] font-bold text-slate-500">
                        {filteredTdmPoints.findIndex((p) => p.id === currentTdmPoint.id) + 1} / {filteredTdmPoints.length}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          const currentIdx = filteredTdmPoints.findIndex((p) => p.id === currentTdmPoint.id);
                          const nextIdx = (currentIdx + 1) % filteredTdmPoints.length;
                          setActiveTdmPointId(filteredTdmPoints[nextIdx].id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 font-bold text-white flex items-center gap-1"
                      >
                        <span>Kế tiếp</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Nút Góp ý / Đề nghị đính chính địa điểm Đất Thủ */}
                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setCorrectionTarget({
                            id: currentTdmPoint.id,
                            title: currentTdmPoint.name,
                            type: 'MAP_POINT',
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] text-rose-800 hover:text-rose-900 font-bold py-1 px-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer border border-rose-200/60"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Góp ý / Đề nghị đính chính địa điểm này</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            4. FOOTER THÔNG BÁO CHỦ QUYỀN VÀ TRÁCH NHIỆM CÔNG DÂN (TƯƠI SÁNG, HIỆN ĐẠI)
            ========================================================================= */}
        <div className="bg-gradient-to-r from-rose-50/60 via-white to-rose-50/60 border-t border-rose-200/80 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <span className="text-[11.5px] font-medium text-slate-700">
              {mapMode === 'WORLD'
                ? 'Hành trình 30 năm bôn ba tìm đường cứu nước của Bác (1911 – 1941) qua 3 đại dương, 4 châu lục, gần 30 quốc gia.'
                : 'Bản đồ địa lý tự nhiên và dấu ấn hành trình của Chủ tịch Hồ Chí Minh.'}
            </span>
          </div>

          <span className="text-[11.5px] font-bold text-rose-800">
            Đảng bộ Phường Thủ Dầu Một · Không Gian Văn Hóa Hồ Chí Minh
          </span>
        </div>
      </div>

      <HcmCorrectionModal
        isOpen={Boolean(correctionTarget)}
        onClose={() => setCorrectionTarget(null)}
        targetId={correctionTarget?.id}
        targetTitle={correctionTarget?.title}
        targetType={correctionTarget?.type}
      />
    </div>
  );
};
