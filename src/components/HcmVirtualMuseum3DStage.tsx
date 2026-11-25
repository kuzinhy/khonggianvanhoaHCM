import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  ExternalLink,
  Film,
  HelpCircle,
  Info,
  Layers,
  MapPin,
  Maximize2,
  Menu,
  Minimize2,
  Pause,
  Play,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  MUSEUM_EXHIBITS_8,
  VIDEO_DOCUMENTARIES_11,
  type MuseumExhibit,
  type VideoDocumentaryItem,
} from '../hcmCoreDataset';
import { HcmSpatial3DMinimap } from './HcmSpatial3DMinimap';

export interface VirtualMuseumZone {
  id: string;
  order: number;
  themeTitle: string;
  period: string;
  quote: string;
  narrative: string;
  exhibitId: string;
  videoId: string;
  imageUrl: string;
  floorCaption: string;
}

export const VIRTUAL_MUSEUM_8_ZONES: VirtualMuseumZone[] = [
  {
    id: 'zone_1',
    order: 1,
    themeTitle: 'Chủ đề 1: Nuôi ý chí',
    period: '1890 – 1911',
    quote: '"Cảnh nước mất nhà tan, nỗi đau của đồng bào hun đúc ý chí cứu nước từ thuở thiếu niên."',
    narrative:
      'Từ truyền thống yêu nước quê hương Nghệ Tĩnh, kinh đô Huế và mái trường Dục Thanh, người thanh niên Nguyễn Tất Thành nhận thức sâu sắc hạn chế của các phong trào đương thời để nuôi chí hướng tìm con đường mới cho dân tộc.',
    exhibitId: 'ex01',
    videoId: 'v01',
    imageUrl: '/assets/hcm-space/nha-rong.jpg',
    floorCaption: 'Gian 1 · Hoàng Trù – Huế – Dục Thanh – Bến Nhà Rồng',
  },
  {
    id: 'zone_2',
    order: 2,
    themeTitle: 'Chủ đề 2: Vượt trùng dương tìm đường cứu nước',
    period: '1911 – 1920',
    quote: '"Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn."',
    narrative:
      'Ngày 05/6/1911, với tên Văn Ba trên tàu Amiral Latouche-Tréville, Người bôn ba qua nhiều châu lục, lao động hòa mình cùng nhân dân lao động thế giới và gửi Bản Yêu sách của nhân dân An Nam tới Hội nghị Versailles (1919).',
    exhibitId: 'ex03',
    videoId: 'v03',
    imageUrl: '/assets/hcm-space/tieusu1-1911.png',
    floorCaption: 'Gian 2 · Hành trình 5 Châu & Ánh sáng Luận cương Lênin',
  },
  {
    id: 'zone_3',
    order: 3,
    themeTitle: 'Chủ đề 3: Tìm ra ánh sáng',
    period: '1920 – 1930',
    quote: '"Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản."',
    narrative:
      'Tại Đại hội Tours (12/1920), Nguyễn Ái Quốc bỏ phiếu tán thành Quốc tế III, trở thành người cộng sản Việt Nam đầu tiên; sáng lập Hội Việt Nam Cách mạng Thanh niên, xuất bản "Đường Kách mệnh" và chủ trì Hội nghị hợp nhất lập Đảng (03/02/1930).',
    exhibitId: 'ex04',
    videoId: 'v03',
    imageUrl: '/assets/hcm-space/tieusu3-1920.png',
    floorCaption: 'Gian 3 · Đại hội Tours – Đường Kách Mệnh – Thành lập Đảng',
  },
  {
    id: 'zone_4',
    order: 4,
    themeTitle: 'Chủ đề 4: Thổi bùng ngọn lửa cách mạng',
    period: '1930 – 1941',
    quote: '"Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy."',
    narrative:
      'Vượt qua thử thách khắc nghiệt, từ Quốc tế Cộng sản đến ngày trở về Tổ quốc tại Pác Bó (28/01/1941), Người chủ trì Hội nghị Trung ương 8 đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và lập Mặt trận Việt Minh.',
    exhibitId: 'ex04',
    videoId: 'v09',
    imageUrl: '/assets/hcm-space/tieusu4-1928.png',
    floorCaption: 'Gian 4 · Cao trào Cách mạng & Trở về Pác Bó 1941',
  },
  {
    id: 'zone_5',
    order: 5,
    themeTitle: 'Chủ đề 5: Bước ngoặt lịch sử',
    period: '1941 – 1945',
    quote: '"Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!"',
    narrative:
      'Chỉ thị thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (22/12/1944), Tổng khởi nghĩa Tháng Tám thành công vang dội và ngày 02/9/1945 lịch sử tại Quảng trường Ba Đình khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    exhibitId: 'ex07',
    videoId: 'v05',
    imageUrl: '/assets/hcm-space/banner-hoctap.png',
    floorCaption: 'Gian 5 · Cách mạng Tháng Tám & Tuyên ngôn Độc lập 02/9/1945',
  },
  {
    id: 'zone_6',
    order: 6,
    themeTitle: 'Chủ đề 6: Người về mang tới mùa Xuân',
    period: '1945 – 1954',
    quote: '"Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ!"',
    narrative:
      'Chèo lái con thuyền cách mạng qua tình thế "ngàn cân treo sợi tóc" (1945–1946), kêu gọi Toàn quốc kháng chiến và cùng Trung ương Đảng lãnh đạo 9 năm trường kỳ kháng chiến làm nên chiến thắng Điện Biên Phủ "lừng lẫy năm châu".',
    exhibitId: 'ex05',
    videoId: 'v06',
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    floorCaption: 'Gian 6 · Dĩ bất biến ứng vạn biến & Chiến thắng Điện Biên Phủ',
  },
  {
    id: 'zone_7',
    order: 7,
    themeTitle: 'Chủ đề 7: Người là niềm tin tất thắng',
    period: '1954 – 1969',
    quote: '"Không có gì quý hơn độc lập, tự do! Miền Nam luôn ở trong trái tim tôi."',
    narrative:
      'Xây dựng hậu phương miền Bắc, chi viện tiền tuyến miền Nam và để lại bản Di chúc thiêng liêng cùng tình đồng chí keo sơn Bác Hồ – Bác Tôn, kết tinh mẫu mực đạo đức Cần – Kiệm – Liêm – Chính.',
    exhibitId: 'ex02',
    videoId: 'v02',
    imageUrl: '/assets/hcm-space/bao-tang-tdt.jpg',
    floorCaption: 'Gian 7 · Miền Bắc XHCN – Miền Nam Thành Đồng – Di chúc 1969',
  },
  {
    id: 'zone_8',
    order: 8,
    themeTitle: 'Chủ đề 8: Viết tiếp trang sử vàng (Thủ Dầu Một Thực hành)',
    period: '1969 – Nay',
    quote: '"Lấy dân làm gốc — Xây dựng phường Thủ Dầu Một văn minh, nghĩa tình, hiện đại."',
    narrative:
      'Cụ thể hóa Không gian Văn hóa Hồ Chí Minh tại Đảng bộ Phường Thủ Dầu Một qua 26 chi bộ, Di tích Nhà tù Phú Lợi, Hoa viên Bạch Đằng, Tủ sách Toàn tập mã QR và Quy định 144-QĐ/TW.',
    exhibitId: 'ex06',
    videoId: 'v07',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    floorCaption: 'Gian 8 · Lan tỏa tại Phường Thủ Dầu Một & Kỷ nguyên vươn mình',
  },
];

type MuseumBottomModal = 'NONE' | 'INTRO' | 'SPACES_3D' | 'LOCATION' | 'VIDEOS';

export const HcmVirtualMuseum3DStage: React.FC<{
  onOpenClassicGallery?: () => void;
  onOpenMinimap?: () => void;
  onOpenArtifacts3D?: () => void;
  initialZoneIndex?: number;
}> = ({
  onOpenClassicGallery,
  onOpenMinimap,
  onOpenArtifacts3D,
  initialZoneIndex = 0,
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panoramaWallRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef({ pan: 0, tilt: 0, zoom: 1.18 });
  const [zoneIdx, setZoneIdx] = useState(initialZoneIndex);
  const [zoom, setZoom] = useState(1.18);
  const [autoRotate, setAutoRotate] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [showGuide, setShowGuide] = useState(true);
  const [showThemeCard, setShowThemeCard] = useState(true);
  const [bottomModal, setBottomModal] = useState<MuseumBottomModal>('NONE');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimapHudOpen, setIsMinimapHudOpen] = useState(false);
  const [isAutoTour, setIsAutoTour] = useState(false);

  useEffect(() => {
    if (typeof initialZoneIndex === 'number' && initialZoneIndex >= 0 && initialZoneIndex < VIRTUAL_MUSEUM_8_ZONES.length) {
      setZoneIdx(initialZoneIndex);
    }
  }, [initialZoneIndex]);

  // Auto guided tour progression
  useEffect(() => {
    if (!isAutoTour) return;
    const timer = setTimeout(() => {
      selectZone((zoneIdx + 1) % VIRTUAL_MUSEUM_8_ZONES.length);
    }, 14000);
    return () => clearTimeout(timer);
  }, [isAutoTour, zoneIdx]);

  // Active popups triggered by hotspots
  const [activeArtifactPin, setActiveArtifactPin] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoDocumentaryItem | null>(null);
  const [motionSceneIdx, setMotionSceneIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Pointer drag state for manual 360° look-around
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; basePan: number; baseTilt: number }>({
    active: false,
    startX: 0,
    startY: 0,
    basePan: 0,
    baseTilt: 0,
  });

  const zone = VIRTUAL_MUSEUM_8_ZONES[zoneIdx] || VIRTUAL_MUSEUM_8_ZONES[0];
  const exhibit: MuseumExhibit = useMemo(
    () => MUSEUM_EXHIBITS_8.find((e) => e.id === zone.exhibitId) || MUSEUM_EXHIBITS_8[0],
    [zone.exhibitId]
  );
  const zoneVideo: VideoDocumentaryItem = useMemo(
    () => VIDEO_DOCUMENTARIES_11.find((v) => v.id === zone.videoId) || VIDEO_DOCUMENTARIES_11[0],
    [zone.videoId]
  );

  const applyCameraTransform = (pan: number, tilt: number, nextZoom: number) => {
    cameraRef.current = { pan, tilt, zoom: nextZoom };
    if (panoramaWallRef.current) {
      panoramaWallRef.current.style.transform = `scale(${nextZoom}) translate3d(${pan}%, ${tilt * 0.6}%, 0) rotateY(${-pan * 0.35}deg) rotateX(${tilt * 0.4}deg)`;
    }
  };

  useEffect(() => {
    applyCameraTransform(cameraRef.current.pan, cameraRef.current.tilt, zoom);
  }, [zoom]);

  // Smooth zero-re-render 60fps panorama oscillation when auto-rotate is enabled
  useEffect(() => {
    if (!autoRotate || showGuide || bottomModal !== 'NONE' || activeArtifactPin !== null || activeVideo) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let dir = 1;
    let rafId = 0;
    let lastTs = 0;
    const stepFrame = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(48, ts - lastTs);
      lastTs = ts;
      if (!dragRef.current.active) {
        let nextPan = cameraRef.current.pan + dir * (dt * 0.0028);
        if (nextPan >= 12) {
          nextPan = 12;
          dir = -1;
        } else if (nextPan <= -12) {
          nextPan = -12;
          dir = 1;
        }
        applyCameraTransform(Number(nextPan.toFixed(2)), cameraRef.current.tilt, cameraRef.current.zoom);
      }
      rafId = window.requestAnimationFrame(stepFrame);
    };
    rafId = window.requestAnimationFrame(stepFrame);
    return () => window.cancelAnimationFrame(rafId);
  }, [autoRotate, showGuide, bottomModal, activeArtifactPin, activeVideo]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = (textOverride?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking && !textOverride) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      textOverride || `${zone.themeTitle}, giai đoạn ${zone.period}. ${zone.narrative} ${zone.quote}`
    );
    u.lang = 'vi-VN';
    u.rate = 0.96;
    u.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const toggleFullscreen = async () => {
    if (!stageRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await stageRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore browser fullscreen restriction */
    }
  };

  const selectZone = (nextIndex: number) => {
    const wrapped = (nextIndex + VIRTUAL_MUSEUM_8_ZONES.length) % VIRTUAL_MUSEUM_8_ZONES.length;
    setZoneIdx(wrapped);
    applyCameraTransform(0, 0, cameraRef.current.zoom);
    setActiveArtifactPin(null);
    setShowThemeCard(true);
    setBottomModal('NONE');
    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const openVideoPlayer = (vid: VideoDocumentaryItem) => {
    setMotionSceneIdx(0);
    setActiveVideo(vid);
    setBottomModal('NONE');
  };

  const activeHotspot =
    activeArtifactPin !== null
      ? exhibit.hotspots.find((h) => h.pin === activeArtifactPin) || exhibit.hotspots[0]
      : null;

  return (
    <div className="space-y-4">
      {/* Main 3D Virtual Museum Stage Container (styled after baotanghochiminh.baotangao.com) */}
      <div
        ref={stageRef}
        className={`relative overflow-hidden border border-amber-300/60 bg-[#1A1612] text-white shadow-xl select-none ${
          isFullscreen ? 'h-screen w-screen rounded-none' : 'h-[540px] sm:h-[620px] rounded-3xl'
        }`}
      >
        {/* 3D Perspective Panorama Canvas */}
        <div
          className="relative h-full w-full overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px' }}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest('button')) return;
            dragRef.current = {
              active: true,
              startX: e.clientX,
              startY: e.clientY,
              basePan: cameraRef.current.pan,
              baseTilt: cameraRef.current.tilt,
            };
          }}
          onPointerMove={(e) => {
            if (!dragRef.current.active) return;
            const dx = (e.clientX - dragRef.current.startX) / 14;
            const dy = (e.clientY - dragRef.current.startY) / 28;
            const nextPan = Math.max(-18, Math.min(18, Number((dragRef.current.basePan + dx).toFixed(2))));
            const nextTilt = Math.max(-6, Math.min(6, Number((dragRef.current.baseTilt + dy).toFixed(2))));
            applyCameraTransform(nextPan, nextTilt, cameraRef.current.zoom);
          }}
          onPointerUp={() => {
            dragRef.current.active = false;
          }}
          onPointerLeave={() => {
            dragRef.current.active = false;
          }}
          onWheel={(e) => {
            e.preventDefault();
            setZoom((z) => Math.max(1.05, Math.min(1.85, Number((z - e.deltaY * 0.001).toFixed(2)))));
          }}
        >
          {/* Transformed 3D Curved Exhibition Wall + Floor Horizon */}
          <div
            ref={panoramaWallRef}
            className="relative h-full w-full will-change-transform"
            style={{
              transform: `scale(${zoom}) translate3d(${cameraRef.current.pan}%, ${cameraRef.current.tilt * 0.6}%, 0) rotateY(${-cameraRef.current.pan * 0.35}deg) rotateX(${cameraRef.current.tilt * 0.4}deg)`,
            }}
          >
            <img
              src={zone.imageUrl}
              alt={zone.themeTitle}
              className="h-full w-full object-cover brightness-[0.86] contrast-[1.04]"
              draggable={false}
            />
            {/* Museum Warm Ambient Vignette & Gallery Floor Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75" />
            <div className="pointer-events-none absolute inset-x-0 bottom-10 h-28 bg-gradient-to-t from-[#241E17]/80 to-transparent" />

            {/* 4 ACCESSIBLE HOTSPOT TYPES DIRECTLY IN 3D EXHIBITION SPACE */}

            {/* 1. Red (i) Artifact Hotspots from exhibit.hotspots */}
            {exhibit.hotspots.map((hp) => (
              <button
                key={hp.pin}
                type="button"
                onClick={() => setActiveArtifactPin(hp.pin)}
                style={{ left: `${hp.xPercent}%`, top: `${Math.min(72, Math.max(24, hp.yPercent))}%` }}
                title={`Xem thông tin hiện vật: ${hp.label}`}
                aria-label={`Xem thông tin hiện vật ${hp.label}`}
                className="-translate-x-1/2 -translate-y-1/2 absolute z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-rose-600/95 text-white shadow-lg ring-4 ring-rose-500/35 hover:scale-115 transition-transform cursor-pointer"
              >
                <Info className="h-4 w-4" />
              </button>
            ))}

            {/* 2. Red Camera Video Narration Hotspot */}
            <button
              type="button"
              onClick={() => openVideoPlayer(zoneVideo)}
              style={{ left: '22%', top: '42%' }}
              title={`Xem video thuyết minh: ${zoneVideo.title}`}
              aria-label={`Xem video thuyết minh ${zoneVideo.title}`}
              className="-translate-x-1/2 -translate-y-1/2 absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-amber-600/95 text-white shadow-lg ring-4 ring-amber-400/40 hover:scale-115 transition-transform cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </button>

            {/* 3. Red Speaker Audio Narration Hotspot */}
            <button
              type="button"
              onClick={() => toggleSpeech()}
              style={{ left: '78%', top: '42%' }}
              title="Bật/tắt âm thanh thuyết minh chuyên đề"
              aria-label="Bật âm thanh thuyết minh chuyên đề"
              className={`-translate-x-1/2 -translate-y-1/2 absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white shadow-lg ring-4 hover:scale-115 transition-transform cursor-pointer ${
                isSpeaking ? 'bg-emerald-600 ring-emerald-400/50' : 'bg-rose-700/95 ring-rose-400/35'
              }`}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            {/* 4. White Double-Ring Floor Navigation Chevrons (^) */}
            <button
              type="button"
              onClick={() => selectZone(zoneIdx - 1)}
              style={{ left: '34%', top: '76%' }}
              title="Di chuyển tới gian trưng bày trước"
              className="-translate-x-1/2 -translate-y-1/2 absolute z-10 flex items-center gap-1.5 rounded-full border-2 border-white/90 bg-black/45 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-xs hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Gian trước</span>
            </button>

            <button
              type="button"
              onClick={() => selectZone(zoneIdx + 1)}
              style={{ left: '66%', top: '76%' }}
              title="Di chuyển tiếp trong không gian 3D"
              className="-translate-x-1/2 -translate-y-1/2 absolute z-10 flex items-center gap-1.5 rounded-full border-2 border-white bg-black/50 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-lg ring-4 ring-white/25 backdrop-blur-xs hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronUp className="h-4 w-4" />
              <span>Gian {((zoneIdx + 1) % VIRTUAL_MUSEUM_8_ZONES.length) + 1}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* TOP-LEFT MUSEUM TITLE OVERLAY (inspired by baotangao.com condensed heading) */}
        <div className="pointer-events-none absolute top-4 left-4 right-20 z-20 space-y-1">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-200 drop-shadow">
            TRƯNG BÀY CHUYÊN ĐỀ: NGƯỜI ĐI TÌM HÌNH CỦA NƯỚC · PHƯỜNG THỦ DẦU MỘT
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#B0A485]/95 px-2.5 py-0.5 text-xs font-extrabold text-slate-950 shadow">
              {zone.themeTitle} ({zone.period})
            </span>
            <span className="rounded-md bg-black/45 px-2 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-xs">
              {zone.floorCaption}
            </span>
          </div>
        </div>

        {/* TOP-RIGHT COMPACT CIRCULAR CONTROL DRAWER */}
        <div className="absolute top-4 right-4 z-30 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen((d) => !d)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/45 text-white backdrop-blur-md hover:bg-black/70 cursor-pointer shadow-lg"
            title={drawerOpen ? 'Thu gọn thanh công cụ' : 'Mở công cụ 3D'}
          >
            {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          {drawerOpen && (
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSpeech()}
                className={`grid h-9 w-9 place-items-center rounded-full border border-white/40 backdrop-blur-md cursor-pointer shadow ${
                  isSpeaking ? 'bg-rose-600 text-white' : 'bg-black/45 text-white hover:bg-black/70'
                }`}
                title="Bật/tắt âm thanh thuyết minh"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setAutoRotate((r) => !r)}
                className={`grid h-9 w-9 place-items-center rounded-full border border-white/40 backdrop-blur-md cursor-pointer shadow ${
                  autoRotate ? 'bg-[#B0A485] text-slate-950' : 'bg-black/45 text-white hover:bg-black/70'
                }`}
                title="Bật/tắt tự động xoay không gian 3D"
              >
                <RotateCw className={`h-4 w-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.85, Number((z + 0.15).toFixed(2))))}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md hover:bg-black/70 cursor-pointer shadow"
                title="Phóng to góc nhìn"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1.05, Number((z - 0.15).toFixed(2))))}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md hover:bg-black/70 cursor-pointer shadow"
                title="Thu nhỏ góc nhìn"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md hover:bg-black/70 cursor-pointer shadow"
                title="Chế độ toàn màn hình"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setShowGuide((g) => !g)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md hover:bg-black/70 cursor-pointer shadow"
                title="Hướng dẫn sử dụng Bảo tàng Ảo"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* TRANSLUCENT GOLDEN-OCHRE THEME SUMMARY PANEL (#B0A485 palette from baotangao.com) */}
        {showThemeCard && !showGuide && bottomModal === 'NONE' && (
          <div className="hidden md:block absolute top-20 right-16 z-20 w-80 rounded-2xl border border-[#D4C8A8]/70 bg-[#9E906E]/90 p-4 text-white shadow-xl backdrop-blur-md space-y-2">
            <div className="flex items-start justify-between gap-2 border-b border-white/25 pb-2">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-amber-100">
                  {zone.period}
                </p>
                <h4 className="text-xs font-extrabold">{zone.themeTitle}</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowThemeCard(false)}
                className="rounded-lg p-1 text-white/80 hover:bg-white/20 cursor-pointer"
                title="Thu gọn bảng chủ đề"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11.5px] italic font-semibold text-amber-50">{zone.quote}</p>
            <p className="text-[11px] leading-relaxed text-white/95 max-h-32 overflow-y-auto pr-1">{zone.narrative}</p>
            <div className="flex items-center justify-between pt-1 text-[10.5px] font-bold">
              <button
                type="button"
                onClick={() => toggleSpeech()}
                className="inline-flex items-center gap-1 rounded-lg bg-white/20 hover:bg-white/30 px-2.5 py-1 cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" /> Nghe thuyết minh
              </button>
              <button
                type="button"
                onClick={() => setActiveArtifactPin(1)}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-700 hover:bg-rose-800 px-2.5 py-1 cursor-pointer"
              >
                <Info className="h-3.5 w-3.5" /> Xem hiện vật ({exhibit.hotspots.length})
              </button>
            </div>
          </div>
        )}

        {/* INITIAL LANDING GUIDE OVERLAY ("HƯỚNG DẪN SỬ DỤNG" in #B0A485 theme) */}
        {showGuide && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 p-4"
            onClick={() => setShowGuide(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-[#D4C8A8] bg-[#B0A485]/95 p-5 text-white shadow-2xl backdrop-blur-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/30 pb-2.5">
                <h3 className="text-sm font-black uppercase tracking-wide">HƯỚNG DẪN SỬ DỤNG KHÔNG GIAN 3D</h3>
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  className="rounded-lg p-1 text-white hover:bg-white/20 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs leading-relaxed">
                Kéo chuột (máy tính) hoặc chạm lướt trên màn hình (điện thoại) để xoay góc nhìn toàn cảnh trong Không gian Trưng bày 3D.
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-white bg-black/40">
                    <ChevronUp className="h-4 w-4" />
                  </span>
                  <span>Chạm nút sàn để di chuyển qua lại giữa 08 Chủ đề trưng bày</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-white bg-rose-600">
                    <Info className="h-3.5 w-3.5" />
                  </span>
                  <span>Xem thông tin chi tiết &amp; phóng to ảnh hiện vật lịch sử</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-white bg-amber-600">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                  <span>Xem video thuyết minh tư liệu chuyên đề (VTV24 / Motion Reel)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-white bg-rose-700">
                    <Volume2 className="h-3.5 w-3.5" />
                  </span>
                  <span>Bật / tắt âm thanh thuyết minh tiếng Việt tự động</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-2 text-xs font-extrabold uppercase tracking-wider text-white cursor-pointer"
              >
                Bắt đầu tham quan Bảo tàng Số →
              </button>
            </div>
          </div>
        )}

        {/* ARTIFACT INFO LIGHTBOX (triggered by clicking red (i) hotspot) */}
        {activeHotspot && (
          <div
            className="absolute inset-0 z-35 flex items-center justify-center bg-black/75 p-4"
            onClick={() => setActiveArtifactPin(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border border-amber-300/60 bg-slate-950/95 p-5 text-white shadow-2xl space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-white/15 pb-2.5">
                <div>
                  <span className="rounded bg-rose-700 px-2 py-0.5 text-[10px] font-bold">
                    Hiện vật Gian #{exhibit.code} · {zone.themeTitle}
                  </span>
                  <h4 className="mt-1 text-sm font-extrabold text-amber-100">{activeHotspot.label}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArtifactPin(null)}
                  className="rounded-lg p-1 text-white/80 hover:bg-white/15 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <img
                  src={zone.imageUrl}
                  alt={activeHotspot.label}
                  className="sm:col-span-6 h-52 w-full rounded-xl object-cover border border-white/20"
                />
                <div className="sm:col-span-6 space-y-2.5 text-xs">
                  <p className="font-semibold text-white leading-relaxed">{activeHotspot.detail}</p>
                  <p className="text-[11px] text-slate-300">{exhibit.imageCaption}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exhibit.hotspots.map((hp) => (
                      <button
                        key={hp.pin}
                        type="button"
                        onClick={() => setActiveArtifactPin(hp.pin)}
                        className={`rounded-lg px-2 py-1 text-[10.5px] font-bold cursor-pointer ${
                          hp.pin === activeHotspot.pin ? 'bg-rose-600 text-white' : 'bg-white/15 text-white/85 hover:bg-white/25'
                        }`}
                      >
                        Ghim #{hp.pin}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSpeech(`${activeHotspot.label}. ${activeHotspot.detail}`)}
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-[11px] font-bold text-white cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" /> Đọc chú thích hiện vật
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIDEO NARRATION LIGHTBOX MODAL */}
        {activeVideo && (
          <div
            className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border border-amber-300/60 bg-slate-950 p-4 text-white shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10.5px] font-bold text-amber-300 uppercase">Thuyết minh Chuyên đề · {activeVideo.sourceName}</span>
                  <h4 className="text-sm font-extrabold">{activeVideo.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="rounded-lg p-1 text-white/80 hover:bg-white/15 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {activeVideo.youtubeId ? (
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  className="aspect-video w-full rounded-xl border border-white/15"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="space-y-2">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-black">
                    <img
                      src={activeVideo.scenes?.[motionSceneIdx]?.imageUrl || activeVideo.thumbnailUrl}
                      alt={activeVideo.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 p-3">
                      <p className="text-xs font-bold text-amber-300">{activeVideo.scenes?.[motionSceneIdx]?.caption || activeVideo.topic}</p>
                      <p className="text-xs text-white/95">{activeVideo.scenes?.[motionSceneIdx]?.narration || activeVideo.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => toggleSpeech(activeVideo.scenes?.[motionSceneIdx]?.narration || activeVideo.summary)}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 font-bold cursor-pointer"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Đọc thuyết minh cảnh {motionSceneIdx + 1}
                    </button>
                    <div className="flex gap-1.5">
                      {(activeVideo.scenes || []).map((_, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setMotionSceneIdx(sIdx)}
                          className={`rounded px-2 py-1 font-bold cursor-pointer ${
                            sIdx === motionSceneIdx ? 'bg-rose-600 text-white' : 'bg-white/15 text-white'
                          }`}
                        >
                          Cảnh {sIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION MODALS (GIỚI THIỆU | KHÔNG GIAN 3D | VỊ TRÍ | THƯ VIỆN VIDEO) */}
        {bottomModal !== 'NONE' && (
          <div
            className="absolute inset-0 bottom-11 z-35 flex items-center justify-center bg-black/75 p-4"
            onClick={() => setBottomModal('NONE')}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[85%] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl space-y-4 text-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <h3 className="text-sm font-black uppercase text-slate-900">
                  {bottomModal === 'INTRO' && 'Giới thiệu Trưng bày Chuyên đề 3D: Người đi tìm hình của Nước'}
                  {bottomModal === 'SPACES_3D' && 'Không gian 3D: 08 Chủ đề Trưng bày Xuyên suốt'}
                  {bottomModal === 'LOCATION' && 'Vị trí Địa danh & Kết nối Bảo tàng Hồ Chí Minh Ảo'}
                  {bottomModal === 'VIDEOS' && 'Thư viện Video Thuyết minh Chuyên đề'}
                </h3>
                <button
                  type="button"
                  onClick={() => setBottomModal('NONE')}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {bottomModal === 'INTRO' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <img
                    src="/assets/hcm-space/nha-rong.jpg"
                    alt="Bảo tàng Hồ Chí Minh"
                    className="md:col-span-5 h-56 w-full rounded-xl object-cover border border-amber-200"
                  />
                  <div className="md:col-span-7 space-y-2 leading-relaxed text-slate-700">
                    <p className="font-bold text-rose-800">
                      Mô hình Bảo tàng Số hóa kế thừa kiến trúc Trưng bày Chuyên đề &ldquo;Người đi tìm hình của Nước&rdquo; (Bảo tàng Hồ Chí Minh) &amp; Bản địa hóa tại Đảng bộ Phường Thủ Dầu Một.
                    </p>
                    <p>
                      Kết cấu xuyên suốt gồm <strong>08 gian trưng bày chuyên đề</strong> nối tiếp từ tuổi thiếu niên (1890), hành trình 30 năm vượt trùng dương tìm đường cứu nước (1911–1941), Tuyên ngôn Độc lập (1945), Di chúc 1969 đến thực tiễn học tập và làm theo Bác tại 26 chi bộ Phường Thủ Dầu Một.
                    </p>
                    <p className="rounded-xl bg-[#F8FBFF] border border-blue-200 p-2.5 text-[11px] font-semibold text-blue-900">
                      Điểm nâng cấp tiếp cận: Mọi nút ghim sàn (^), thông tin hiện vật (i), video (▶) và thuyết minh âm thanh tiếng Việt đều hỗ trợ bàn phím, trình đọc màn hình và chạy thuần chuẩn HTTPS.
                    </p>
                  </div>
                </div>
              )}

              {bottomModal === 'SPACES_3D' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {VIRTUAL_MUSEUM_8_ZONES.map((z, idx) => {
                    const isActive = idx === zoneIdx;
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => selectZone(idx)}
                        className={`rounded-xl border overflow-hidden text-left transition-all cursor-pointer ${
                          isActive ? 'border-blue-600 ring-2 ring-blue-500/40 bg-blue-50' : 'border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        <img src={z.imageUrl} alt={z.themeTitle} className="h-24 w-full object-cover" />
                        <div className="p-2 space-y-0.5">
                          <span className="text-[10px] font-bold text-rose-700">{z.period}</span>
                          <p className="text-[11.5px] font-bold text-slate-900 line-clamp-2">{z.themeTitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {bottomModal === 'LOCATION' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-4 space-y-2">
                    <p className="flex items-center gap-1.5 font-extrabold text-slate-900">
                      <MapPin className="h-4 w-4 text-rose-700" /> Bảo tàng Hồ Chí Minh (Trung ương)
                    </p>
                    <p className="text-slate-600">Địa chỉ: 19 Ngọc Hà, Đội Cấn, Ba Đình, Hà Nội · Tọa độ: 21.0353°B, 105.8326°Đ</p>
                    <p className="text-slate-600">
                      Chi nhánh TP.HCM (Bến Nhà Rồng): Số 01 Nguyễn Tất Thành, TP. Hồ Chí Minh.
                    </p>
                    <div className="pt-2">
                      <a
                        href="http://baotanghochiminh.baotangao.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-bold text-white"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Mở Bảo tàng Ảo Chính thống (baotangao.com)
                      </a>
                      <p className="mt-1.5 text-[10.5px] text-amber-800">
                        Lưu ý kỹ thuật: Cổng baotanghochiminh.baotangao.com hiện chạy giao thức HTTP thuần (không có HTTPS), nên trình duyệt sẽ chặn nhúng trực tiếp qua iframe trên môi trường HTTPS — hãy mở bằng nút liên kết ở tab mới.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 space-y-2">
                    <p className="flex items-center gap-1.5 font-extrabold text-rose-900">
                      <Compass className="h-4 w-4 text-rose-700" /> Điểm kết nối tại Phường Thủ Dầu Một
                    </p>
                    <p className="text-slate-700">
                      Liên kết tuyến giáo dục truyền thống thực địa: Di tích Nhà tù Phú Lợi, Hoa viên Bạch Đằng và 26 Không gian Văn hóa HCM tại chi bộ, khu phố.
                    </p>
                    <p className="text-[11px] font-semibold text-slate-600">
                      Không gian số này giữ nguyên tốc độ tải nhanh và tương thích 100% HTTPS trên máy tính, điện thoại và bảng cảm ứng cơ sở.
                    </p>
                  </div>
                </div>
              )}

              {bottomModal === 'VIDEOS' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {VIDEO_DOCUMENTARIES_11.slice(0, 9).map((vid) => (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => openVideoPlayer(vid)}
                      className="rounded-xl border border-slate-200 overflow-hidden text-left hover:border-blue-500 transition-colors cursor-pointer"
                    >
                      <div className="relative h-28 w-full bg-slate-900">
                        <img src={vid.thumbnailUrl} alt={vid.title} className="h-full w-full object-cover opacity-90" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-600/90 text-white shadow">
                            <Film className="h-4 w-4" />
                          </span>
                        </span>
                        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {vid.duration}
                        </span>
                      </div>
                      <div className="p-2.5 space-y-0.5">
                        <p className="text-[10px] font-bold text-blue-700">{vid.sourceName}</p>
                        <p className="text-xs font-bold text-slate-900 line-clamp-2">{vid.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMPACT SA BÀN 3D HUD OVERLAY */}
        {isMinimapHudOpen && (
          <div className="absolute bottom-12 right-3 sm:right-5 z-35 animate-in fade-in slide-in-from-bottom-2">
            <HcmSpatial3DMinimap
              isCompactHud
              activeZoneId={zone.id}
              onSelectZone={(idx) => selectZone(idx)}
              onCloseHud={() => setIsMinimapHudOpen(false)}
            />
          </div>
        )}

        {/* AUTO GUIDED TOUR OVERLAY BANNER */}
        {isAutoTour && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-35 flex items-center gap-3 rounded-full border border-amber-300 bg-rose-950/90 px-4 py-1.5 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">Đang Trong Tour Tự Động: Gian #{zoneIdx + 1}/8</span>
            <button
              type="button"
              onClick={() => {
                setIsAutoTour(false);
                window.speechSynthesis?.cancel();
                setIsSpeaking(false);
              }}
              className="rounded-full bg-white/20 hover:bg-white/30 px-2.5 py-0.5 text-[10.5px] font-bold text-amber-200 cursor-pointer"
            >
              Dừng Tour
            </button>
          </div>
        )}

        {/* BOTTOM HORIZONTAL MUSEUM BAR (matching white hairline + blue active state of baotangao.com) */}
        <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/75 bg-black/65 px-3 py-1.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold tracking-wide">
          <div className="flex flex-wrap items-center gap-1">
            {(
              [
                { id: 'INTRO', label: 'GIỚI THIỆU' },
                { id: 'SPACES_3D', label: 'KHÔNG GIAN 3D' },
                { id: 'LOCATION', label: 'VỊ TRÍ & KẾT NỐI' },
                { id: 'VIDEOS', label: 'THƯ VIỆN VIDEO' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setBottomModal((cur) => (cur === btn.id ? 'NONE' : btn.id))}
                className={`rounded px-2 py-1 uppercase transition-colors cursor-pointer ${
                  bottomModal === btn.id ? 'bg-sky-600 text-white' : 'text-white/95 hover:bg-white/15'
                }`}
              >
                {btn.label}
              </button>
            ))}

            {/* Extra Interactive 3D Features */}
            <button
              type="button"
              onClick={() => setIsMinimapHudOpen((o) => !o)}
              className={`rounded px-2.5 py-1 uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                isMinimapHudOpen ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white/15 text-amber-300 hover:bg-white/25'
              }`}
              title="Mở sa bàn định vị 3D thu nhỏ"
            >
              <Compass className="h-3 w-3" />
              <span>SA BÀN HUD</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const nextTourState = !isAutoTour;
                setIsAutoTour(nextTourState);
                if (nextTourState) {
                  toggleSpeech();
                } else {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`rounded px-2.5 py-1 uppercase transition-colors cursor-pointer flex items-center gap-1 ${
                isAutoTour ? 'bg-emerald-600 text-white' : 'bg-white/15 text-emerald-300 hover:bg-white/25'
              }`}
              title="Bật/tắt tour tham quan tự động có thuyết minh"
            >
              {isAutoTour ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
              <span>{isAutoTour ? 'ĐANG CHẠY TOUR' : 'TOUR TỰ ĐỘNG'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-white/80">
            {onOpenMinimap && (
              <button
                type="button"
                onClick={onOpenMinimap}
                className="rounded bg-white/15 hover:bg-white/25 px-2 py-0.5 font-bold text-amber-200 cursor-pointer flex items-center gap-1"
                title="Mở sa bàn phối cảnh 3D tổng thể toàn màn hình"
              >
                <Layers className="h-3 w-3" />
                <span>Sa Bàn 3D</span>
              </button>
            )}

            {onOpenArtifacts3D && (
              <button
                type="button"
                onClick={onOpenArtifacts3D}
                className="rounded bg-white/15 hover:bg-white/25 px-2 py-0.5 font-bold text-amber-200 cursor-pointer flex items-center gap-1"
                title="Mở bộ sưu tập hiện vật 3D 360 độ"
              >
                <Award className="h-3 w-3" />
                <span>Hiện Vật 360°</span>
              </button>
            )}

            {onOpenClassicGallery && (
              <button
                type="button"
                onClick={onOpenClassicGallery}
                className="rounded bg-white/10 hover:bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white/90 cursor-pointer"
              >
                Danh mục 8 Gian
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
