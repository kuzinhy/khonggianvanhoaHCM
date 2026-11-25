import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Box,
  Compass,
  Volume2,
  VolumeX,
  RotateCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Info,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Eye,
  Camera,
  Layers,
  Sparkles,
  Award,
  Film,
  X,
  Search,
  BookOpen,
  MapPin,
  Flame,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { hcmSfx } from '../services/hcmSoundEffects';
import { hcmVoiceService } from '../services/hcmVoiceService';
import { HoaSenIcon, DongSonDrumIcon } from './TraditionalMotifs';

// Danh sách các điểm neo bước chân (Teleport Hotspots) trong không gian 3D
export interface VrWaypoint {
  id: string;
  name: string;
  wing: 'FOYER' | 'WING_1' | 'WING_2' | 'WING_3' | 'WING_4' | 'CENTER';
  xPercent: number; // 0 -> 100%
  yPercent: number; // 0 -> 100%
  camPan: number;   // -30 -> 30 deg
  camTilt: number;  // -10 -> 10 deg
  camZoom: number;  // 1.0 -> 1.8
  description: string;
}

export const VR_WAYPOINTS: VrWaypoint[] = [
  {
    id: 'wp_foyer',
    name: 'Gian Khánh Tiết & Bàn Thờ Tưởng Niệm',
    wing: 'FOYER',
    xPercent: 50,
    yPercent: 74,
    camPan: 0,
    camTilt: 0,
    camZoom: 1.15,
    description: 'Nơi tưởng niệm trang nghiêm với 2 cột khẩu hiệu đỏ, cờ Đảng, cờ Tổ quốc và chân dung Chủ tịch Hồ Chí Minh.'
  },
  {
    id: 'wp_wing1',
    name: 'Cánh 1: 1890 - 1930 (Quê Hương & Tìm Đường Cứu Nước)',
    wing: 'WING_1',
    xPercent: 16,
    yPercent: 64,
    camPan: 18,
    camTilt: 2,
    camZoom: 1.25,
    description: 'Từ quê hương Nghệ An, Huế, Phan Thiết, Bến Nhà Rồng đến hành trình 30 năm bôn ba qua 3 đại dương và 4 châu lục.'
  },
  {
    id: 'wp_center',
    name: 'Bục Trưng Bày Hiện Vật & Sa Bàn Trung Tâm',
    wing: 'CENTER',
    xPercent: 50,
    yPercent: 62,
    camPan: 0,
    camTilt: -4,
    camZoom: 1.22,
    description: 'Bục vát kính trưng bày các bản thảo lịch sử quý báu: Đường Kách Mệnh, Tuyên ngôn Độc lập, Lời kêu gọi toàn quốc kháng chiến.'
  },
  {
    id: 'wp_wing2',
    name: 'Cánh 2: 1930 - 1945 (Thành Lập Đảng & Độc Lập)',
    wing: 'WING_2',
    xPercent: 28,
    yPercent: 50,
    camPan: 10,
    camTilt: 1,
    camZoom: 1.25,
    description: 'Mốc son ngày 3/2/1930, trở về Pác Bó 1941, Tổng khởi nghĩa Tháng Tám và Tuyên ngôn Độc lập 2/9/1945.'
  },
  {
    id: 'wp_wing3',
    name: 'Cánh 3: 1945 - 1954 (Toàn Quốc Kháng Chiến & Điện Biên)',
    wing: 'WING_3',
    xPercent: 72,
    yPercent: 50,
    camPan: -10,
    camTilt: 1,
    camZoom: 1.25,
    description: 'Chín năm trường kỳ kháng chiến chống thực dân Pháp, đỉnh cao là Chiến dịch Điện Biên Phủ lừng lẫy năm châu.'
  },
  {
    id: 'wp_wing4',
    name: 'Cánh 4: 1954 - 1969 (Niềm Tin Tất Thắng & Di Chúc)',
    wing: 'WING_4',
    xPercent: 84,
    yPercent: 64,
    camPan: -18,
    camTilt: 2,
    camZoom: 1.25,
    description: 'Xây dựng CNXH ở miền Bắc, vì miền Nam ruột thịt, và Bản Di chúc lịch sử muôn vàn tình thân yêu.'
  }
];

// Danh mục tài liệu / hiện vật trưng bày trên bục trung tâm và trên vách
export interface VrExhibitItem {
  id: string;
  title: string;
  period: string;
  location: string;
  type: 'DOCUMENT' | 'ARTIFACT' | 'MEDIA';
  summary: string;
  details: string[];
  imageUrl: string;
  audioGuideText: string;
}

export const VR_EXHIBITS: VrExhibitItem[] = [
  {
    id: 'ex_tuyen_ngon',
    title: 'Bản Thảo Tuyên Ngôn Độc Lập (02/9/1945)',
    period: 'Năm 1945',
    location: 'Bục Vát Trưng Bày Trung Tâm',
    type: 'DOCUMENT',
    summary: 'Văn kiện lịch sử bất hủ do Chủ tịch Hồ Chí Minh soạn thảo tại căn gác số 48 Hàng Ngang, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    details: [
      'Trưng bày bản in nguyên gốc khổ lớn kèm ghi chú bút tích của Bác Hồ.',
      'Khẳng định quyền con người, quyền tự do thiêng liêng gắn liền với quyền dân tộc.',
      'Tài liệu số hóa 3D siêu phân giải, cho phép soi từng nét chữ và con dấu.'
    ],
    imageUrl: '/assets/hcm-space/tuyen-ngon-1945-manuscript.jpg',
    audioGuideText: 'Bản Tuyên ngôn Độc lập do Chủ tịch Hồ Chí Minh soạn thảo tại số 48 phố Hàng Ngang, Hà Nội. Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình, Người đã đọc bản tuyên ngôn lịch sử, trịnh trọng tuyên bố trước quốc dân đồng bào và toàn thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa.'
  },
  {
    id: 'ex_di_chuc',
    title: 'Bản Di Chúc Lịch Sử Của Bác Hồ (1965 - 1969)',
    period: '1965 – 1969',
    location: 'Bục Trưng Bày Cánh 4',
    type: 'DOCUMENT',
    summary: 'Bảo vật quốc gia thiêng liêng kết tinh tư tưởng, đạo đức, tâm hồn trong sáng và niềm tin tất thắng của Người.',
    details: [
      'Gồm các bản viết tay các năm 1965, 1968 và bản sửa chữa năm 1969.',
      'Dặn dò tỉ mỉ về Đảng, về đoàn viên thanh niên, nhân dân lao động và phong trào cộng sản quốc tế.',
      'Lời dặn cuối cùng: "Toàn Đảng, toàn dân ta đoàn kết phấn đấu, xây dựng một nước Việt Nam hòa bình, thống nhất, độc lập, dân chủ và giàu mạnh".'
    ],
    imageUrl: '/assets/hcm-space/di-chuc-1965-handwriting.png',
    audioGuideText: 'Di chúc của Chủ tịch Hồ Chí Minh là văn kiện lịch sử vô giá, kết tinh lý tưởng cách mạng cao đẹp, đạo đức cộng sản trong sáng và tình yêu thương bao la của Người dành cho toàn Đảng, toàn quân và toàn dân ta.'
  },
  {
    id: 'ex_tau_latouche',
    title: 'Mô Hình Tàu Amiral Latouche-Tréville & Bến Nhà Rồng',
    period: 'Ngày 05/6/1911',
    location: 'Bục Trưng Bày Cánh 1',
    type: 'ARTIFACT',
    summary: 'Nơi người thanh niên yêu nước Nguyễn Tất Thành bước lên tàu ra đi tìm đường cứu nước với tên gọi Văn Ba.',
    details: [
      'Mô hình 3D phục dựng chi tiết con tàu buôn của Pháp.',
      'Sa bàn phối cảnh thương cảng Sài Gòn đầu thế kỷ XX ven sông Sài Gòn.',
      'Tập hợp bản đồ hải trình 30 năm Người đi qua Pháp, Anh, Mỹ, Liên Xô, Trung Quốc.'
    ],
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    audioGuideText: 'Ngày 5 tháng 6 năm 1911, từ Bến cảng Nhà Rồng sông Sài Gòn, người thanh niên Nguyễn Tất Thành với bàn tay lao động và trái tim yêu nước nồng nàn đã ra đi tìm đường cứu nước, mở ra bước ngoặt vĩ đại cho dân tộc Việt Nam.'
  },
  {
    id: 'ex_hang_pacbo',
    title: 'Hòn Đá Bàn Làm Việc & Lán Khuổi Nặm (Pác Bó 1941)',
    period: 'Năm 1941',
    location: 'Bục Trưng Bày Cánh 2',
    type: 'ARTIFACT',
    summary: 'Nơi Bác Hồ trở về Tổ quốc sau 30 năm bôn ba, trực tiếp lãnh đạo phong trào cách mạng Việt Nam.',
    details: [
      '"Bàn đá chông chênh dịch sử Đảng / Cuộc đời cách mạng thật là sang".',
      'Thành lập Mặt trận Việt Minh và xuất bản báo "Việt Nam Độc Lập".',
      'Tái hiện sa bàn hang Cốc Bó, suối Lê-nin, núi Các Mác.'
    ],
    imageUrl: '/assets/hcm-space/relic_hang_pac_bo.jpg',
    audioGuideText: 'Mùa xuân năm 1941, sau 30 năm bôn ba, Bác Hồ kính yêu trở về Tổ quốc tại Pác Bó, Cao Bằng. Bàn đá chông chênh dịch sử Đảng, hang đá đơn sơ trở thành đầu não lãnh đạo toàn thể dân tộc đứng lên giành độc lập.'
  }
];

export interface HcmMetastepsVirtualSpaceProps {
  onClose?: () => void;
  onOpenHeritageMap?: () => void;
}

export const HcmMetastepsVirtualSpace: React.FC<HcmMetastepsVirtualSpaceProps> = ({
  onClose,
  onOpenHeritageMap
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wallRef = useRef<HTMLDivElement | null>(null);

  // Vị trí hiện tại của Avatar và Camera
  const [currentWaypoint, setCurrentWaypoint] = useState<VrWaypoint>(VR_WAYPOINTS[0]);
  const [isThirdPerson, setIsThirdPerson] = useState(true); // true: có avatar người đi bộ, false: góc nhìn thứ nhất
  const [camera, setCamera] = useState({ pan: 0, tilt: 0, zoom: 1.15 });
  const [autoRotate, setAutoRotate] = useState(false);
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [showUnitSelector, setShowUnitSelector] = useState(false);
  const [unitTitle, setUnitTitle] = useState<'METASTEPS_DEFAULT' | 'THU_DAU_MOT'>('THU_DAU_MOT');
  const [flowerOfferCount, setFlowerOfferCount] = useState(1945);
  const [hasOfferedFlower, setHasOfferedFlower] = useState(false);

  // Modals
  const [selectedExhibit, setSelectedExhibit] = useState<VrExhibitItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string; desc: string } | null>(null);
  const [showHelpGuide, setShowHelpGuide] = useState(false);

  // Drag interaction
  const dragRef = useRef<{ isDragging: boolean; startX: number; startY: number; startPan: number; startTilt: number }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startPan: 0,
    startTilt: 0
  });

  // Chuyển tới Waypoint mới
  const handleTeleportTo = (wp: VrWaypoint) => {
    hcmSfx.playClick(850);
    setCurrentWaypoint(wp);
    setCamera({
      pan: wp.camPan,
      tilt: wp.camTilt,
      zoom: wp.camZoom
    });
  };

  // Dâng hoa tưởng niệm
  const handleOfferFlower = () => {
    hcmSfx.playSuccess();
    setFlowerOfferCount(prev => prev + 1);
    setHasOfferedFlower(true);
    setTimeout(() => setHasOfferedFlower(false), 3000);
  };

  // Thuyết minh âm thanh
  const handleVoiceNarration = (text: string) => {
    if (isSpeaking) {
      hcmVoiceService.stop();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    hcmVoiceService.speak(text, () => setIsSpeaking(false));
  };

  // Auto rotate loop
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setCamera(prev => ({
        ...prev,
        pan: prev.pan >= 25 ? -25 : prev.pan + 0.35
      }));
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Fullscreen listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      hcmVoiceService.stop();
    };
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] rounded-3xl overflow-hidden bg-gradient-to-b from-stone-950 via-[#180509] to-stone-950 border-2 border-amber-500/40 shadow-2xl select-none font-sans"
    >
      {/* =========================================================================
          1. HEADER THANH ĐIỀU KHIỂN ĐỈNH KHÔNG GIAN 3D
          ========================================================================= */}
      <div className="absolute top-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-b from-black/85 via-black/50 to-transparent flex flex-wrap items-center justify-between gap-3 text-white">
        {/* Tên không gian & Cơ quan chủ quản */}
        <div className="flex items-center gap-2.5 min-w-0 max-w-[65%] sm:max-w-[70%]">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-2xl bg-gradient-to-br from-rose-700 via-rose-600 to-amber-600 text-white flex items-center justify-center shadow-lg ring-2 ring-amber-400/50 shrink-0">
            <Box className="w-4 sm:w-5 h-4 sm:h-5 text-amber-200 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-700/80 border border-rose-400/50 text-amber-200 shadow-xs whitespace-nowrap">
                MÔ HÌNH THỰC TẾ ẢO 3D (VR 360°)
              </span>
              <button
                type="button"
                onClick={() => setShowUnitSelector(!showUnitSelector)}
                className="text-[10px] font-bold text-amber-300 hover:text-amber-200 underline decoration-dotted cursor-pointer whitespace-nowrap"
                title="Bấm để đổi tên cơ quan/đơn vị"
              >
                [Đổi Đơn Vị]
              </button>
            </div>
            <h2 className="font-serif text-xs sm:text-base lg:text-lg font-black text-amber-100 drop-shadow-md truncate">
              {unitTitle === 'THU_DAU_MOT'
                ? 'Không Gian Văn Hóa Hồ Chí Minh · Phường Thủ Dầu Một'
                : 'UBND Xã Bà Điểm — TH Bùi Văn Ngữ — Không Gian Văn Hóa HCM'}
            </h2>
          </div>
        </div>

        {/* Cụm công cụ nhanh bên phải */}
        <div className="flex items-center gap-2">
          {/* Nút chuyển đổi Góc nhìn Thứ 3 / Thứ 1 */}
          <button
            type="button"
            onClick={() => {
              hcmSfx.playClick(650);
              setIsThirdPerson(!isThirdPerson);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-md ${
              isThirdPerson
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-white/10 border-white/20 text-slate-300 hover:text-white'
            }`}
            title="Chuyển đổi góc nhìn Avatar người đi bộ hoặc góc nhìn trực tiếp"
          >
            <Footprints className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">{isThirdPerson ? 'Avatar 3D' : 'Góc nhìn thứ nhất'}</span>
          </button>

          {/* Nút thuyết minh âm thanh */}
          <button
            type="button"
            onClick={() => handleVoiceNarration(`${currentWaypoint.name}. ${currentWaypoint.description}`)}
            className={`p-2 rounded-xl border transition-all cursor-pointer shadow-md ${
              isSpeaking
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                : 'bg-white/10 border-white/20 text-slate-200 hover:text-white hover:bg-white/20'
            }`}
            title="Nghe thuyết minh âm thanh điểm tham quan này"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-200" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Tự động xoay 360 */}
          <button
            type="button"
            onClick={() => {
              hcmSfx.playClick(600);
              setAutoRotate(!autoRotate);
            }}
            className={`p-2 rounded-xl border transition-all cursor-pointer shadow-md ${
              autoRotate
                ? 'bg-amber-600 border-amber-400 text-white'
                : 'bg-white/10 border-white/20 text-slate-200 hover:text-white hover:bg-white/20'
            }`}
            title="Bật/Tắt tự động xoay 360 độ"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Toàn màn hình */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white cursor-pointer transition-all shadow-md"
            title="Chế độ toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Đóng nếu có prop onClose */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-700 border border-rose-400 text-white cursor-pointer transition-all shadow-md"
              title="Đóng chế độ thực tế ảo"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Menu thả xuống chọn đơn vị */}
      {showUnitSelector && (
        <div className="absolute top-16 left-6 z-40 p-3 rounded-2xl bg-slate-900/95 border border-amber-400/60 shadow-2xl space-y-2 text-xs text-white max-w-sm animate-in fade-in zoom-in-95">
          <p className="font-bold text-amber-300">Chọn cấu hình bảng đơn vị không gian 3D:</p>
          <button
            type="button"
            onClick={() => {
              setUnitTitle('THU_DAU_MOT');
              setShowUnitSelector(false);
            }}
            className={`w-full p-2 rounded-xl text-left font-medium border transition-all cursor-pointer ${
              unitTitle === 'THU_DAU_MOT' ? 'bg-rose-900/60 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 hover:bg-white/15'
            }`}
          >
            🏛️ <strong>Phường Thủ Dầu Một</strong> (Địa phương triển khai thực tế)
          </button>
          <button
            type="button"
            onClick={() => {
              setUnitTitle('METASTEPS_DEFAULT');
              setShowUnitSelector(false);
            }}
            className={`w-full p-2 rounded-xl text-left font-medium border transition-all cursor-pointer ${
              unitTitle === 'METASTEPS_DEFAULT' ? 'bg-rose-900/60 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 hover:bg-white/15'
            }`}
          >
            🏫 <strong>Xã Bà Điểm - TH Bùi Văn Ngữ</strong> (Mô hình trường học mẫu từ video)
          </button>
        </div>
      )}

      {/* =========================================================================
          2. SÂN KHẤU 3D PHỐI CẢNH (3D VIRTUAL REALITY PERSPECTIVE STAGE)
          ========================================================================= */}
      <div
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          dragRef.current = {
            isDragging: true,
            startX: e.clientX,
            startY: e.clientY,
            startPan: camera.pan,
            startTilt: camera.tilt
          };
        }}
        onPointerMove={(e) => {
          if (!dragRef.current.isDragging) return;
          const dx = (e.clientX - dragRef.current.startX) * 0.08;
          const dy = (e.clientY - dragRef.current.startY) * 0.04;
          setCamera(prev => ({
            ...prev,
            pan: Math.max(-28, Math.min(28, dragRef.current.startPan + dx)),
            tilt: Math.max(-8, Math.min(8, dragRef.current.startTilt + dy))
          }));
        }}
        onPointerUp={() => {
          dragRef.current.isDragging = false;
        }}
        onPointerLeave={() => {
          dragRef.current.isDragging = false;
        }}
        onWheel={(e) => {
          setCamera(prev => ({
            ...prev,
            zoom: Math.max(1.0, Math.min(1.7, Number((prev.zoom - e.deltaY * 0.001).toFixed(2))))
          }));
        }}
      >
        {/* Vách 3D biến đổi theo camera */}
        <div
          ref={wallRef}
          className="relative w-full h-full transition-transform duration-300 ease-out will-change-transform flex items-center justify-center"
          style={{
            transform: `scale(${camera.zoom}) translate3d(${camera.pan}%, ${camera.tilt * 0.8}%, 0) rotateY(${-camera.pan * 0.4}deg) rotateX(${camera.tilt * 0.5}deg)`
          }}
        >
          {/* Lớp nền sảnh vòm 3D sang trọng với sàn đá hoa cương phản chiếu */}
          <div className="absolute inset-0 bg-radial from-[#2B0B13] via-[#150408] to-[#080204]">
            {/* Họa tiết trần thạch cao hoa sen và đèn hắt trần */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-amber-500/15 via-rose-500/5 to-transparent pointer-events-none" />
            
            {/* Lưới sàn đá bóng lộng lẫy phản chiếu ánh đèn */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-[#1E090F]/80 to-transparent perspective-1000">
              <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(65deg)] opacity-40 origin-bottom" />
            </div>
          </div>

          {/* =========================================================================
              3. KHU VỰC TRUNG TÂM: GIAN KHÁNH TIẾT & BÀN THỜ TƯỞNG NIỆM TRANG NGHIÊM
              (Tái hiện 100% chuẩn xác theo video Metasteps 3D)
              ========================================================================= */}
          <div className="relative z-10 w-[94%] max-w-3xl lg:max-w-4xl flex flex-col justify-between items-center text-center pt-24 sm:pt-28 pb-32 sm:pb-36 pointer-events-none min-h-[600px] sm:min-h-[680px]">
            {/* A. Bảng Tên Cơ Quan Mạ Vàng Treo Đỉnh Vách */}
            <div className="space-y-1 drop-shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-slate-950 font-black text-[10px] sm:text-[11px] uppercase tracking-widest shadow-xl border border-amber-200">
                <DongSonDrumIcon className="w-3 h-3 text-slate-950 fill-current" />
                <span>{unitTitle === 'THU_DAU_MOT' ? 'ỦY BAN NHÂN DÂN PHƯỜNG THỦ DẦU MỘT' : 'UBND XÃ BÀ ĐIỂM · TRƯỜNG TH BÙI VĂN NGỮ'}</span>
                <HoaSenIcon className="w-3 h-3 text-rose-950 fill-current" />
              </div>
              <h1 className="font-serif text-lg sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-wider filter drop-shadow-[0_4px_12px_rgba(234,179,8,0.4)]">
                KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH
              </h1>
            </div>

            {/* B. Vách Trung Tâm: 2 Cột Khẩu Hiệu Đỏ Chữ Vàng + Phông Bác Hồ */}
            <div className="w-full grid grid-cols-12 gap-2 sm:gap-4 items-center my-auto">
              {/* CỘT KHẨU HIỆU BÊN TRÁI: ĐOÀN KẾT ĐOÀN KẾT ĐẠI ĐOÀN KẾT */}
              <div className="col-span-3 sm:col-span-2 flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl bg-gradient-to-b from-rose-800 via-rose-900 to-rose-950 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(190,18,60,0.5)]">
                <div className="w-5 h-5 mb-1 text-amber-300">
                  <HoaSenIcon className="w-full h-full fill-current" />
                </div>
                <div className="font-serif font-black text-[10px] sm:text-xs lg:text-sm text-yellow-300 tracking-widest leading-relaxed [writing-mode:vertical-rl] py-2 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  ĐOÀN KẾT · ĐOÀN KẾT · ĐẠI ĐOÀN KẾT
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
              </div>

              {/* PHÔNG NỀN CHÍNH: QUỐC KỲ, ĐẢNG KỲ, CHÂN DUNG BÁC HỒ & LƯ HƯƠNG */}
              <div className="col-span-6 sm:col-span-8 flex flex-col items-center justify-center relative">
                {/* Ánh hào quang tỏa sáng từ phía sau Bác */}
                <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-gradient-to-tr from-amber-500/25 via-rose-500/20 to-transparent blur-3xl pointer-events-none -z-1" />

                {/* Khung chân dung Chủ tịch Hồ Chí Minh mạ vàng */}
                <div className="relative p-1.5 sm:p-2 rounded-3xl bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-700 shadow-2xl border-2 border-amber-200">
                  <div className="relative w-28 sm:w-36 lg:w-44 aspect-[3/4] rounded-2xl overflow-hidden bg-rose-950 border border-amber-200/50">
                    <img
                      src="/assets/hcm-space/anh-bac.png"
                      alt="Chủ tịch Hồ Chí Minh"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/hcm-space/bac-ho-arch-portal.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 inset-x-0 text-center">
                      <span className="text-[9px] sm:text-[10px] font-serif font-black text-amber-200 uppercase tracking-widest drop-shadow-md">
                        Hồ Chí Minh (1890 - 1969)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bàn thờ dâng hoa sen & Bát nhang tưởng niệm */}
                <div className="mt-2.5 flex items-center gap-2.5 pointer-events-auto">
                  <button
                    type="button"
                    onClick={handleOfferFlower}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-200"
                    title="Bấm để dâng hoa sen tưởng niệm Bác Hồ"
                  >
                    <HoaSenIcon className="w-3.5 h-3.5 text-rose-900 fill-current animate-bounce" />
                    <span>Dâng Hoa Tưởng Niệm ({flowerOfferCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVoiceNarration("Chủ tịch Hồ Chí Minh - Lãnh tụ thiên tài của Đảng và nhân dân ta, Người thầy vĩ đại của cách mạng Việt Nam, Anh hùng giải phóng dân tộc, Danh nhân văn hóa kiệt xuất.")}
                    className="p-1.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 border border-amber-400/50 text-amber-200 cursor-pointer shadow-md"
                    title="Nghe lời tưởng niệm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {hasOfferedFlower && (
                  <div className="absolute -top-8 text-xs font-black text-yellow-300 bg-black/80 px-3.5 py-1 rounded-full border border-amber-400 shadow-2xl animate-in zoom-in-75 fade-in">
                    💐 Kính dâng lên Bác đóa sen thơm ngát lòng thành!
                  </div>
                )}
              </div>

              {/* CỘT KHẨU HIỆU BÊN PHẢI: THÀNH CÔNG THÀNH CÔNG ĐẠI THÀNH CÔNG */}
              <div className="col-span-3 sm:col-span-2 flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl bg-gradient-to-b from-rose-800 via-rose-900 to-rose-950 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(190,18,60,0.5)]">
                <div className="w-5 h-5 mb-1 text-amber-300">
                  <HoaSenIcon className="w-full h-full fill-current" />
                </div>
                <div className="font-serif font-black text-[10px] sm:text-xs lg:text-sm text-yellow-300 tracking-widest leading-relaxed [writing-mode:vertical-rl] py-2 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  THÀNH CÔNG · THÀNH CÔNG · ĐẠI THÀNH CÔNG
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
              </div>
            </div>

            {/* C. Bục vát trưng bày hiện vật trung tâm với kính lúp soi chi tiết */}
            <div className="w-full max-w-xl bg-gradient-to-r from-slate-950/90 via-rose-950/80 to-slate-950/90 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-amber-400/60 shadow-2xl pointer-events-auto flex items-center justify-between gap-3 text-left mt-2.5 relative z-30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-amber-300 font-bold uppercase block tracking-wider">
                    BỤC TRƯNG BÀY HIỆN VẬT SỐ HÓA
                  </span>
                  <h4 className="text-xs sm:text-[13px] font-bold text-white line-clamp-1">
                    Tuyên Ngôn Độc Lập &amp; Bản Di Chúc Thiêng Liêng
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedExhibit(VR_EXHIBITS[0])}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer border border-amber-300/60 ring-2 ring-amber-400/20 active:scale-95 transition-all"
                  title="Soi kính lúp bản thảo gốc"
                >
                  <Search className="w-3.5 h-3.5 text-amber-300" />
                  <span>Soi Hiện Vật</span>
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              4. MÀN HÌNH TV PHẲNG TƯƠNG TÁC TRÊN VÁCH (Wall TV Video Station)
              ========================================================================= */}
          <div
            onClick={() => {
              hcmSfx.playClick(900);
              setSelectedVideo({
                title: 'Ca khúc bất hủ: Hồ Chí Minh đẹp nhất tên Người',
                url: 'https://www.youtube-nocookie.com/embed/8vR447-P4Zc?autoplay=1',
                desc: 'Tác phẩm âm nhạc xúc động của nhạc sĩ Trần Kiết Tường ca ngợi công đức trời biển của Chủ tịch Hồ Chí Minh.'
              });
            }}
            className="absolute right-3 xl:right-6 top-28 xl:top-24 z-15 w-36 sm:w-40 xl:w-48 aspect-video rounded-2xl bg-black border-2 border-amber-400/80 shadow-[0_0_25px_rgba(234,179,8,0.3)] overflow-hidden cursor-pointer group hover:scale-105 transition-all hidden md:block"
            title="Nhấp vào màn hình TV để xem video tư liệu"
          >
            <img
              src="/assets/hcm-space/ueh-3d.jpg"
              alt="Màn hình TV tư liệu"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/hcm-space/ben-nha-rong-06.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex flex-col items-center justify-center p-1.5 text-center">
              <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform mb-0.5">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              <span className="text-[9.5px] font-black text-amber-300 uppercase tracking-tight drop-shadow">
                Màn Hình TV Tư Liệu
              </span>
              <span className="text-[8.5px] text-white/90 line-clamp-1">Hồ Chí Minh đẹp nhất tên Người</span>
            </div>
          </div>

          {/* =========================================================================
              5. AVATAR 3D NGƯỜI ĐI BỘ (Hologram Walking Avatar)
              (Hiển thị khi ở chế độ Third-Person, di chuyển theo Waypoint)
              ========================================================================= */}
          {isThirdPerson && (
            <div
              className="absolute z-20 pointer-events-none transition-all duration-700 ease-out flex flex-col items-center"
              style={{
                left: `${currentWaypoint.xPercent}%`,
                top: `${currentWaypoint.yPercent}%`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              {/* Nhãn tên avatar */}
              <div className="px-2.5 py-0.5 rounded-full bg-black/80 border border-cyan-400 text-[10px] font-mono text-cyan-300 font-bold shadow-lg mb-1 whitespace-nowrap animate-pulse">
                👤 Khách Tham Quan 3D
              </div>

              {/* Hình nhân Avatar Hologram ánh sáng cyan neon */}
              <div className="relative w-12 h-24 flex flex-col items-center">
                {/* Đầu phát sáng */}
                <div className="w-5 h-5 rounded-full bg-cyan-300 border-2 border-white shadow-[0_0_15px_#22d3ee] animate-pulse" />
                {/* Thân */}
                <div className="w-7 h-10 mt-0.5 rounded-lg bg-gradient-to-b from-cyan-400 to-blue-600 border border-white/60 shadow-[0_0_12px_#06b6d4]" />
                {/* Đôi chân */}
                <div className="flex gap-1.5 mt-0.5">
                  <div className="w-2 h-8 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-bounce" />
                  <div className="w-2 h-8 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>

              {/* Vòng hào quang chân trên mặt sàn */}
              <div className="w-16 h-6 rounded-full border-2 border-cyan-400/80 bg-cyan-400/20 shadow-[0_0_20px_#22d3ee] -mt-2 animate-ping" />
            </div>
          )}

          {/* =========================================================================
              6. CÁC ĐIỂM NEO BƯỚC CHÂN TRÊN SÀN (Footprint Teleport Rings)
              ========================================================================= */}
          {VR_WAYPOINTS.map((wp) => {
            const isSelected = currentWaypoint.id === wp.id;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => handleTeleportTo(wp)}
                style={{
                  left: `${wp.xPercent}%`,
                  top: `${wp.yPercent}%`
                }}
                className={`-translate-x-1/2 -translate-y-1/2 absolute z-25 group flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-115' : 'hover:scale-110 opacity-80 hover:opacity-100'
                }`}
                title={`Bước tới: ${wp.name}`}
              >
                {/* Vòng tròn bước chân nhấp nháy trên sàn */}
                <div
                  className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/30 shadow-[0_0_25px_#f59e0b] ring-4 ring-amber-400/40'
                      : 'border-white/80 bg-black/40 hover:border-amber-300 hover:bg-amber-400/20 shadow-lg'
                  }`}
                >
                  <Footprints className={`w-5 sm:w-6 h-5 sm:h-6 ${isSelected ? 'text-amber-300 animate-pulse' : 'text-white'}`} />
                </div>

                {/* Tên điểm neo hiển thị khi hover hoặc khi được chọn */}
                <div
                  className={`mt-1.5 px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-bold whitespace-nowrap shadow-xl border backdrop-blur-md transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-200 font-black'
                      : 'bg-black/80 text-white border-white/20 group-hover:border-amber-300 group-hover:text-amber-200'
                  }`}
                >
                  {wp.name.split(':')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          7. THANH ĐIỀU KHIỂN ĐÁY (Bottom Metasteps Navigation Bar)
          ========================================================================= */}
      <div className="absolute bottom-0 inset-x-0 z-30 p-2 sm:p-3 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-white">
        {/* Nút các phân khu chính */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold overflow-x-auto py-1 max-w-full">
          {VR_WAYPOINTS.map((wp) => {
            const isSelected = currentWaypoint.id === wp.id;
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => handleTeleportTo(wp)}
                className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black border-amber-300 shadow-md'
                    : 'bg-white/10 border-white/15 text-slate-200 hover:text-white hover:bg-white/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{wp.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Cụm công cụ phụ trợ bên phải */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowMinimap(!showMinimap)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              showMinimap
                ? 'bg-rose-700 border-amber-400 text-amber-200'
                : 'bg-white/10 border-white/20 text-slate-200 hover:text-white hover:bg-white/20'
            }`}
            title="Mở sơ đồ mặt bằng thu nhỏ"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Sơ Đồ Mặt Bằng</span>
          </button>

          {onOpenHeritageMap && (
            <button
              type="button"
              onClick={onOpenHeritageMap}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bản Đồ Đất Thủ</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          8. SƠ ĐỒ MẶT BẰNG THU NHỎ (Interactive Minimap HUD)
          ========================================================================= */}
      {showMinimap && (
        <div className="absolute bottom-16 right-4 sm:right-6 z-40 w-72 sm:w-80 p-4 rounded-3xl bg-slate-950/95 border-2 border-amber-400/80 shadow-2xl text-white space-y-3 animate-in fade-in zoom-in-95 backdrop-blur-lg">
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <div className="flex items-center gap-2 font-bold text-xs text-amber-300">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>SƠ ĐỒ KHÔNG GIAN TRIỂN LÃM 3D</span>
            </div>
            <button
              type="button"
              onClick={() => setShowMinimap(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl bg-stone-900 border border-white/20 overflow-hidden p-3 flex flex-col justify-between">
            {/* Vị trí gian khánh tiết trên mặt bằng */}
            <div className="text-center font-bold text-[10px] text-amber-300 uppercase tracking-widest bg-rose-950/80 py-1 rounded-lg border border-rose-500/40">
              Gian Khánh Tiết &amp; Đền Tưởng Niệm
            </div>

            {/* Các điểm neo trên mặt bằng 2D */}
            <div className="relative w-full h-32 my-auto">
              {VR_WAYPOINTS.map((wp) => {
                const isCur = currentWaypoint.id === wp.id;
                return (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => handleTeleportTo(wp)}
                    style={{
                      left: `${wp.xPercent}%`,
                      top: `${wp.yPercent}%`
                    }}
                    className={`-translate-x-1/2 -translate-y-1/2 absolute w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
                      isCur ? 'bg-amber-400 ring-4 ring-amber-300/50 scale-125' : 'bg-rose-600 hover:scale-120'
                    }`}
                    title={wp.name}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-950" />
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-center text-slate-400 italic">
              Bấm vào các chấm tròn để dịch chuyển tức thời
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          9. MODAL SOI HIỆN VẬT SIÊU PHÂN GIẢI (Deep Zoom Lightbox)
          ========================================================================= */}
      {selectedExhibit && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedExhibit(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90%] overflow-y-auto rounded-3xl bg-slate-950 border-2 border-amber-400 shadow-2xl p-5 sm:p-6 text-white space-y-4 animate-in fade-in zoom-in-95"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/15 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-700 text-amber-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {selectedExhibit.period} · {selectedExhibit.location}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-black text-amber-100 mt-1">
                  {selectedExhibit.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExhibit(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-6 rounded-2xl overflow-hidden border border-amber-400/40 bg-black aspect-[4/3]">
                <img
                  src={selectedExhibit.imageUrl}
                  alt={selectedExhibit.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-zoom-in"
                />
              </div>

              <div className="md:col-span-6 space-y-3 text-xs sm:text-sm">
                <p className="text-amber-100 font-medium leading-relaxed">
                  {selectedExhibit.summary}
                </p>

                <div className="space-y-1.5 text-slate-300 text-xs">
                  {selectedExhibit.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleVoiceNarration(selectedExhibit.audioGuideText)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-white font-bold text-xs shadow-lg cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-amber-200" />
                    <span>Nghe Thuyết Minh Hiện Vật</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          10. MODAL XEM PHIM TƯ LIỆU TỪ MÀN HÌNH TV (Interactive TV Video Lightbox)
          ========================================================================= */}
      {selectedVideo && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-3xl bg-slate-950 border-2 border-amber-400 shadow-2xl p-4 sm:p-5 text-white space-y-3 animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-2">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-amber-100">{selectedVideo.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/20 bg-black">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-xs text-slate-300 italic">{selectedVideo.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};
