import React, { useState } from 'react';
import {
  Building2,
  Compass,
  MapPin,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  RotateCw,
  Maximize2,
  Eye,
  Camera,
  Layers,
  Sparkles,
  Award,
  Info,
  Calendar,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Film,
  Box,
  Cpu,
  Navigation,
  ArrowLeft,
  Clock,
  Ticket,
  Footprints,
  BookOpen,
  Route,
  Share2,
  Search,
  Flag,
  FileText,
  Bookmark,
  TrendingUp,
  Landmark,
  X,
} from 'lucide-react';
import { DongSonDrumIcon, HoaSenIcon } from './TraditionalMotifs';
import { hcmVoiceService } from '../services/hcmVoiceService';
import { hcmSfx } from '../services/hcmSoundEffects';
import { HcmDynamicHeritageMapModal } from './HcmDynamicHeritageMapModal';
import { HcmMetastepsVirtualSpace } from './HcmMetastepsVirtualSpace';
import {
  THU_DAU_MOT_HERITAGE_SITES,
  THU_DAU_MOT_TOUR_ROUTES,
  TDM_CITY_PARTY_HISTORY_PHASES,
  TDM_WARD_PARTY_CHRONOLOGY,
  THU_DAU_MOT_HISTORICAL_ARTICLES,
  type ThuDauMotHeritageSite,
  type HeritageTourRoute,
  type HistoricalArticleItem,
} from '../data/hcmThuDauMotData';

interface HeritageZone {
  id: string;
  name: string;
  shortDesc: string;
  historicalPeriod: string;
  keyArtifacts: string[];
  fullStory: string;
  imageUrl: string;
  hotspots: Array<{
    title: string;
    desc: string;
    coords: { x: number; y: number };
  }>;
}

const HERITAGE_ZONES: HeritageZone[] = [
  {
    id: 'zone-1',
    name: 'Khuôn viên Công viên & Bia Di tích Nhà việc Phú Cường',
    shortDesc: 'Khuôn viên xanh gần 1.000m² ven sông Sài Gòn, nơi ghi dấu nền móng Nhà việc Phú Cường xưa.',
    historicalPeriod: 'Thế kỷ 19 – 1975',
    keyArtifacts: ['Bia chứng tích Nhà việc Phú Cường', 'Xe ngựa cổ Nam Bộ', 'Xe kéo tay truyền thống', 'Cây cổ thụ di sản'],
    fullStory:
      'Nhà truyền thống Thủ Dầu Một được phục dựng trang trọng trên nền móng cũ của di tích Nhà việc Phú Cường (Nhà Làng Phú Cường) xưa. Nơi đây từng là trung tâm hành chính kiêm tụ điểm lịch sử của vùng Đất Thủ, chứng kiến bao thăng trầm và khởi nghĩa kiên cường của các thế hệ người dân bên bờ sông Sài Gòn êm đềm.',
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    hotspots: [
      { title: 'Bia Di tích Lịch sử', desc: 'Bia đá khắc ghi truyền thống đấu tranh kiên cường của quân và dân Thủ Dầu Một.', coords: { x: 30, y: 65 } },
      { title: 'Xe Ngựa Cổ Đất Thủ', desc: 'Phương tiện vận chuyển độc đáo của người dân Nam Bộ từ đầu thế kỷ 20.', coords: { x: 72, y: 70 } },
      { title: 'Bến Sông Sài Gòn', desc: 'Vị trí đắc địa nhìn ra bờ sông Bạch Đằng lịch sử.', coords: { x: 50, y: 25 } },
    ],
  },
  {
    id: 'zone-2',
    name: 'Gian Tiền điện: Đất Thủ Kháng Chiến Chống Pháp & Cách Mạng Tháng Tám',
    shortDesc: 'Tái hiện thời kỳ hình thành các phong trào yêu nước, thành lập Chi bộ Đảng đầu tiên và giành chính quyền 1945.',
    historicalPeriod: '1930 – 1954',
    keyArtifacts: ['Truyền đơn cách mạng', 'Vũ khí thô sơ tự tạo', 'Hình ảnh mít-tinh giành chính quyền tại Phú Cường 1945'],
    fullStory:
      'Tại chính Nhà việc Phú Cường, ngày 25/8/1945, dưới sự lãnh đạo của Tỉnh ủy lâm thời, hàng vạn đồng bào, công nhân và thanh niên Tiền phong Đất Thủ đã rầm rộ biểu tình, bao vây tước vũ khí của địch, đập tan ách thống trị thực dân phong kiến, lập nên chính quyền cách mạng của nhân dân.',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    hotspots: [
      { title: 'Lệnh Tổng Khởi Nghĩa', desc: 'Lời kêu gọi khởi nghĩa giành chính quyền Tháng Tám 1945 tại Thủ Dầu Một.', coords: { x: 25, y: 40 } },
      { title: 'Cờ Đỏ Sao Vàng 1945', desc: 'Lá cờ tung bay trên nóc Nhà việc Phú Cường sáng ngày khởi nghĩa thắng lợi.', coords: { x: 60, y: 30 } },
    ],
  },
  {
    id: 'zone-3',
    name: 'Gian Chính diện: Đại Thắng Mùa Xuân 1975 Giải Phóng Thủ Dầu Một',
    shortDesc: 'Sa bàn trận đánh lịch sử và ngày giải phóng hoàn toàn thị xã Thủ Dầu Một ngày 30/04/1975.',
    historicalPeriod: '1954 – 1975',
    keyArtifacts: ['Sa bàn cánh quân giải phóng', 'Cờ Mặt trận Dân tộc Giải phóng', 'Súng đạn chiến lợi phẩm', 'Nhật ký chiến trường'],
    fullStory:
      'Trong Chiến dịch Hồ Chí Minh lịch sử mùa xuân năm 1975, Thủ Dầu Một là địa bàn cửa ngõ chiến lược phía Bắc Sài Gòn. Các cánh quân chủ lực phối hợp cùng lực lượng vũ trang và nhân dân địa phương đã tiến công dũng mãnh, giải phóng hoàn toàn thị xã vào sáng ngày 30/4/1975, góp phần vào thắng lợi trọn vẹn của non sông.',
    imageUrl: '/assets/hcm-space/khu-pho.jpg',
    hotspots: [
      { title: 'Sa Bàn Tác Chiến 1975', desc: 'Bản đồ chỉ huy hướng tiến công của các mũi quân vào trung tâm thị xã.', coords: { x: 45, y: 55 } },
      { title: 'Kỷ Vật Chiến Sĩ Giải Phóng', desc: 'Chiếc bi đông, nón tai bèo và ba lô của chiến sĩ tiến vào Nhà Làng Phú Cường.', coords: { x: 75, y: 45 } },
    ],
  },
  {
    id: 'zone-4',
    name: 'Gian Chuyên đề: Bác Hồ & Cụ Phó Bảng Nguyễn Sinh Sắc Tại Đất Thủ',
    shortDesc: 'Dấu ấn cụ thân sinh Chủ tịch Hồ Chí Minh tại Chùa Hội Khánh và tấm lòng người dân Thủ Dầu Một với Bác.',
    historicalPeriod: '1923 – Hiện nay',
    keyArtifacts: ['Tư liệu Hội Danh dự yêu nước Chùa Hội Khánh', 'Tủ sách Bác Hồ với miền Nam', 'Chỉ thị 07-CT/TW cơ sở'],
    fullStory:
      'Từ năm 1923 đến 1926, cụ Phó bảng Nguyễn Sinh Sắc (thân sinh Bác Hồ) đã đến Chùa Hội Khánh (Thủ Dầu Một) dạy học, bốc thuốc chữa bệnh cho người nghèo và cùng các sĩ phu yêu nước sáng lập Hội Danh dự yêu nước, gieo mầm cách mạng sâu rộng vào lòng nhân dân Đất Thủ.',
    imageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    hotspots: [
      { title: 'Chùa Hội Khánh Lịch Sử', desc: 'Ngôi chùa cổ nơi cụ Phó bảng Nguyễn Sinh Sắc từng truyền bá tư tưởng yêu nước.', coords: { x: 35, y: 35 } },
      { title: 'Chân Dung Chủ Tịch Hồ Chí Minh', desc: 'Tượng đồng và ảnh Bác đặt trang trọng giữa gian thờ tưởng niệm.', coords: { x: 65, y: 35 } },
    ],
  },
  {
    id: 'zone-5',
    name: 'Gian Di sản Làng Nghề Truyền Thống: Gốm Sứ, Sơn Mài & Điêu Khắc Mộc',
    shortDesc: 'Tinh hoa thủ công mỹ nghệ hơn 300 năm hình thành và phát triển của vùng đất Thủ Dầu Một.',
    historicalPeriod: 'Thế kỷ 18 – Nay',
    keyArtifacts: ['Gốm sứ cổ Lò Lu', 'Bức tranh sơn mài Tương Bình Hiệp', 'Tượng chạm trổ gỗ mít Đất Thủ', 'Bàn xoay gốm thủ công'],
    fullStory:
      'Thủ Dầu Một nổi danh khắp phương Nam với danh xưng "vùng đất thủ công tài hoa". Nghề gốm cổ ven sông, tranh sơn mài Tương Bình Hiệp nức tiếng trong nước và quốc tế, cùng nghệ thuật điêu khắc gỗ tinh xảo đã kết tinh nên hồn cốt văn hóa trường tồn của người dân nơi đây.',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    hotspots: [
      { title: 'Bình Gốm Cổ Thủ Dầu Một', desc: 'Men gốm xanh lam và hoa văn đắp nổi tinh tế thế kỷ 19.', coords: { x: 30, y: 50 } },
      { title: 'Bức Hoành Phi Sơn Mài', desc: 'Sơn ta thếp vàng thủ công truyền thống qua hàng chục công đoạn mài bóng.', coords: { x: 70, y: 30 } },
    ],
  },
];

type SubTabKey = 'HERITAGE_MAP' | 'PARTY_HISTORY' | '3D_TOUR' | 'TECH_GUIDE' | 'ARTICLES';

interface HcmThuDauMotHeritageHouseViewProps {
  onBackToFoyer?: () => void;
  initialSubTab?: SubTabKey;
}

export const HcmThuDauMotHeritageHouseView: React.FC<HcmThuDauMotHeritageHouseViewProps> = ({
  onBackToFoyer,
  initialSubTab = 'HERITAGE_MAP',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>(initialSubTab);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState<'ALL' | 'BÁC HỒ VỚI ĐẤT THỦ' | 'LỊCH SỬ CÁCH MẠNG' | 'XÂY DỰNG ĐẢNG' | 'DI SẢN VĂN HÓA'>('ALL');
  const [readingArticle, setReadingArticle] = useState<HistoricalArticleItem | null>(null);
  const [isPlayingArticleAudio, setIsPlayingArticleAudio] = useState(false);

  // Đồng bộ khi prop initialSubTab thay đổi từ bên ngoài (ví dụ nhấp nút Tham quan 3D từ trang chủ)
  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const handleSwitchSubTab = (subTab: SubTabKey) => {
    hcmSfx.playClick(subTab === '3D_TOUR' ? 900 : 600);
    setActiveSubTab(subTab);
  };

  // States for 3D Tour
  const [activeZone, setActiveZone] = useState<HeritageZone>(HERITAGE_ZONES[0]);
  const [activeHotspot, setActiveHotspot] = useState<HeritageZone['hotspots'][0] | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [vrTourMode, setVrTourMode] = useState<'METASTEPS_VR' | 'HERITAGE_PANORAMA'>('METASTEPS_VR');

  // States for Heritage Map
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSite, setActiveSite] = useState<ThuDauMotHeritageSite>(THU_DAU_MOT_HERITAGE_SITES[0]);
  const [selectedTour, setSelectedTour] = useState<HeritageTourRoute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingSiteAudio, setIsPlayingSiteAudio] = useState(false);
  const [isDynamicMapModalOpen, setIsDynamicMapModalOpen] = useState(false);

  // States for Party History
  const [partyHistoryTab, setPartyHistoryTab] = useState<'CITY_HISTORY' | 'WARD_CHRONOLOGY'>('WARD_CHRONOLOGY');
  const [activePhaseId, setActivePhaseId] = useState<string>(TDM_CITY_PARTY_HISTORY_PHASES[3].id);
  const [chronologyFilter, setChronologyFilter] = useState<string>('ALL');

  const mapsUrl = 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8';
  const coordsDisplay = '10°58\'45.0"N 106°39\'11.8"E (10.9791654, 106.653276)';

  // Audio for 3D Zone
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      hcmVoiceService.stop();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    hcmVoiceService.speak(
      `${activeZone.name}. ${activeZone.shortDesc}. ${activeZone.fullStory}`,
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  // Audio for Heritage Site
  const handleToggleSiteAudio = (site: ThuDauMotHeritageSite) => {
    if (isPlayingSiteAudio) {
      hcmVoiceService.stop();
      setIsPlayingSiteAudio(false);
      return;
    }
    setIsPlayingSiteAudio(true);
    hcmVoiceService.speak(
      site.audioGuideText,
      () => setIsPlayingSiteAudio(false),
      () => setIsPlayingSiteAudio(false)
    );
  };

  // Audio for Historical Article
  const handleToggleArticleAudio = (article: HistoricalArticleItem) => {
    if (isPlayingArticleAudio) {
      hcmVoiceService.stop();
      setIsPlayingArticleAudio(false);
      return;
    }
    setIsPlayingArticleAudio(true);
    const textToRead = `${article.title}. Tóm tắt: ${article.summary}. ${article.contentSections.map((s) => `${s.heading}. ${s.paragraphs.join(' ')}`).join(' ')}`;
    hcmVoiceService.speak(
      textToRead,
      () => setIsPlayingArticleAudio(false),
      () => setIsPlayingArticleAudio(false)
    );
  };

  // Filtered Heritage Sites
  const filteredSites = THU_DAU_MOT_HERITAGE_SITES.filter((site) => {
    const matchCategory = selectedCategory === 'ALL' || site.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTour = !selectedTour || selectedTour.siteIds.includes(site.id);
    return matchCategory && matchSearch && matchTour;
  });

  // Filtered Chronology Entries
  const filteredChronology = TDM_WARD_PARTY_CHRONOLOGY.filter((entry) => {
    return chronologyFilter === 'ALL' || entry.category === chronologyFilter;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in select-none">
      {/* =========================================================================
          1. HEADER BANNER TRANG TRỌNG
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white p-6 sm:p-8 border-2 border-rose-300 shadow-2xl">
        <div className="absolute -top-12 -right-12 opacity-20 pointer-events-none">
          <DongSonDrumIcon size={360} className="animate-spin-slow" />
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          {/* Cụm văn bản dàn đều sang bên phải */}
          <div className="space-y-3 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              {onBackToFoyer && (
                <button
                  type="button"
                  onClick={onBackToFoyer}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về Trang chủ</span>
                </button>
              )}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/20 border border-rose-300/50 text-rose-100 text-xs font-bold tracking-wider uppercase">
                <Compass className="w-3.5 h-3.5 text-rose-600" />
                <span>BẢN ĐỒ DI TÍCH • LỊCH SỬ ĐẢNG BỘ ĐẤT THỦ</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/50 text-emerald-200 text-[11px] font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Đơn vị hành chính mới từ 01/07/2025</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-wide leading-tight max-w-5xl">
              Không Gian Di Tích &amp; Nhà Truyền Thống Thủ Dầu Một
            </h1>

            <p className="font-serif text-sm sm:text-base text-rose-100 leading-relaxed max-w-5xl">
              Bản đồ số hóa di tích lịch sử — văn hóa Phường Thủ Dầu Một (mới) • Tham quan thực tế ảo 3D VR • Lịch sử Đảng bộ TP (đến 1/7/2025) &amp; Biên niên sử Đảng bộ Phường (từ 1/7/2025 đến nay)
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-rose-100/90">
              <span className="flex items-center gap-1 font-mono bg-black/25 px-2.5 py-0.5 rounded-lg border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{coordsDisplay}</span>
              </span>
              <span className="font-medium bg-black/15 px-2.5 py-0.5 rounded-lg border border-white/10">
                Khu vực ven sông Sài Gòn, Đường Ngô Quyền &amp; Bạch Đằng, P. Thủ Dầu Một
              </span>
            </div>
          </div>

          {/* Hàng nút tác vụ di chuyển xuống dưới, dàn đều cân đối trên 1 hàng */}
          <div className="pt-3.5 border-t border-rose-300/30 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDynamicMapModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-rose-800 hover:brightness-110 text-white border border-rose-300/50 font-bold text-xs shadow-md transition-all cursor-pointer"
                title="Mở Bản đồ số sinh động: Dấu chân Bác trên bản đồ Việt Nam (Hoàng Sa - Trường Sa) và Bản đồ Phường Thủ Dầu Một"
              >
                <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span>Bản Đồ Số Sinh Động</span>
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Chỉ đường Google Maps</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>

              <button
                type="button"
                onClick={() => handleToggleSiteAudio(activeSite)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isPlayingSiteAudio
                    ? 'bg-rose-700 text-white border-rose-400 animate-pulse shadow-md'
                    : 'bg-white/15 hover:bg-white/25 text-white border-white/30 shadow-sm'
                }`}
              >
                {isPlayingSiteAudio ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                <span>{isPlayingSiteAudio ? 'Dừng đọc' : 'Nghe thuyết minh di tích'}</span>
              </button>
            </div>

            {/* Các huy hiệu bổ trợ phía bên phải giúp bố cục đầy đặn, trang trọng */}
            <div className="hidden md:flex items-center gap-2 text-xs text-amber-200/90 font-medium">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>12 Điểm Di Tích &amp; Địa Chỉ Đỏ</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-amber-400" />
                <span>Không Gian 3D VR 360°</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THANH ĐIỀU HƯỚNG 04 PHÂN HỆ CHUYÊN ĐỀ
          ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between border-b border-rose-200/80 pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-tab 1: Bản đồ di tích */}
          <button
            type="button"
            onClick={() => handleSwitchSubTab('HERITAGE_MAP')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'HERITAGE_MAP'
                ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm ring-2 ring-[#751D2C]/20'
                : 'bg-white border border-rose-200/80 text-slate-900 hover:border-rose-500'
            }`}
          >
            <Compass className="w-4 h-4 text-rose-600" />
            <span>Bản Đồ Di Tích Phường Thủ Dầu Một (Mới)</span>
            <span
              className={`px-2 py-0.5 text-[10px] font-black rounded-md ${
                activeSubTab === 'HERITAGE_MAP'
                  ? 'bg-white/20 text-white'
                  : 'bg-rose-600/20 text-rose-800'
              }`}
            >
              12 Di tích
            </span>
          </button>

          {/* Sub-tab 2: Lịch sử Đảng bộ & Biên niên sử */}
          <button
            type="button"
            onClick={() => handleSwitchSubTab('PARTY_HISTORY')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'PARTY_HISTORY'
                ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm ring-2 ring-[#751D2C]/20'
                : 'bg-white border border-rose-200/80 text-slate-900 hover:border-rose-500'
            }`}
          >
            <Flag className="w-4 h-4 text-rose-600" />
            <span>Lịch Sử &amp; Biên Niên Sử Đảng Bộ (Mốc 1/7/2025)</span>
            <span
              className={`px-2 py-0.5 text-[10px] font-black rounded-md ${
                activeSubTab === 'PARTY_HISTORY'
                  ? 'bg-white/20 text-white'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              Mốc 1/7/2025
            </span>
          </button>

          {/* Sub-tab 3: Thực tế ảo 3D - Công trình trọng điểm */}
          <button
            type="button"
            onClick={() => handleSwitchSubTab('3D_TOUR')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 relative ${
              activeSubTab === '3D_TOUR'
                ? 'bg-gradient-to-r from-rose-700 via-rose-800 to-[#881337] text-white shadow-md ring-2 ring-amber-400/80 scale-102'
                : 'bg-gradient-to-r from-amber-50 to-rose-50/60 border border-amber-300 text-[#881337] hover:border-rose-500 shadow-2xs'
            }`}
          >
            <Box className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>Nhà Truyền Thống Số 3D VR</span>
            <span
              className={`px-2 py-0.5 text-[9.5px] font-black rounded-md ${
                activeSubTab === '3D_TOUR'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-rose-700 text-white animate-pulse'
              }`}
            >
              Sắp Triển Khai
            </span>
          </button>

          {/* Sub-tab 4: Hướng dẫn kỹ thuật */}
          <button
            type="button"
            onClick={() => handleSwitchSubTab('TECH_GUIDE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'TECH_GUIDE'
                ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm'
                : 'bg-white border border-rose-200/80 text-slate-900 hover:border-rose-500'
            }`}
          >
            <Cpu className="w-4 h-4 text-rose-600" />
            <span>Tư Vấn Số Hóa 3D Thực Địa</span>
          </button>

          {/* Sub-tab 5: Bài Viết & Chuyên Đề Lịch Sử */}
          <button
            type="button"
            onClick={() => handleSwitchSubTab('ARTICLES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'ARTICLES'
                ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm ring-2 ring-[#751D2C]/20'
                : 'bg-white border border-rose-200/80 text-slate-900 hover:border-rose-500'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Chuyên Đề &amp; Bài Viết Lịch Sử</span>
            <span
              className={`px-2 py-0.5 text-[10px] font-black rounded-md ${
                activeSubTab === 'ARTICLES'
                  ? 'bg-white/20 text-white'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              05 Chuyên đề
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-800" />
          <span>Địa bàn hành chính: <strong>Phường Thủ Dầu Một (Mới)</strong></span>
        </div>
      </div>

      {/* =========================================================================
          PHÂN HỆ 1: BẢN ĐỒ DI TÍCH PHƯỜNG THỦ DẦU MỘT (MỚI)
          ========================================================================= */}
      {activeSubTab === 'HERITAGE_MAP' && (
        <div className="space-y-6">
          {/* A. 03 TOUR DU KHẢO GỢI Ý ĐẶC SẮC */}
          <div className="bg-white rounded-3xl border border-rose-200/80 p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200/80/50 pb-2.5">
              <div className="flex items-center gap-2 text-rose-800">
                <Route className="w-5 h-5 text-rose-600" />
                <h3 className="font-serif font-bold text-base uppercase tracking-wider">
                  04 Tuyến Tour Du Khảo Di Sản Gợi Ý Cho Khách Tham Quan
                </h3>
              </div>
              <span className="text-xs text-slate-600 italic">
                Thiết kế lộ trình khoa học, đi bộ hoặc xe điện thuận tiện ven sông Sài Gòn
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {THU_DAU_MOT_TOUR_ROUTES.map((tour) => {
                const isSelected = selectedTour?.id === tour.id;
                return (
                  <div
                    key={tour.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTour(null);
                      } else {
                        setSelectedTour(tour);
                        const firstSite = THU_DAU_MOT_HERITAGE_SITES.find((s) => s.id === tour.siteIds[0]);
                        if (firstSite) setActiveSite(firstSite);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-rose-500 bg-gradient-to-br from-white to-rose-50/30 shadow-md ring-2 ring-[#751D2C]/20'
                        : 'border-rose-200/80 bg-white hover:border-rose-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-rose-800">{tour.theme}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {tour.duration}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-slate-900 leading-snug">
                        {tour.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {tour.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-rose-200/80/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-600 font-medium text-[11px]">
                        <span>Cự ly: <strong>{tour.distance}</strong></span>
                        <span>•</span>
                        <span>{tour.recommendedTransport}</span>
                      </div>
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-rose-800' : 'text-rose-600'}`}>
                        {isSelected ? 'Đang lọc tour' : 'Xem tour →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedTour && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                <span>
                  Đang lọc hiển thị các điểm di tích thuộc: <strong>{selectedTour.title}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTour(null)}
                  className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 font-bold text-[11px] cursor-pointer"
                >
                  Xóa lọc tour
                </button>
              </div>
            )}
          </div>

          {/* B. BỘ LỌC DANH MỤC & TÌM KIẾM */}
          <div className="bg-white rounded-2xl border border-rose-200/80 p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-rose-800 uppercase text-[11px] mr-1">Phân loại:</span>
              {[
                { id: 'ALL', label: 'Tất cả (12 di tích)' },
                { id: 'LỊCH SỬ CÁCH MẠNG', label: 'Lịch sử Cách mạng' },
                { id: 'KIẾN TRÚC CỔ', label: 'Kiến trúc Cổ' },
                { id: 'VĂN HÓA TÂM LINH', label: 'Văn hóa Tâm linh' },
                { id: 'DI SẢN ĐÔ THỊ', label: 'Di sản Đô thị' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs'
                      : 'bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-slate-900 hover:border-rose-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm di tích, tên đường..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-rose-200/80 bg-gradient-to-br from-white to-rose-50/30 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* C. BỐ CỤC 2 CỘT: DANH SÁCH DI TÍCH (TRÁI) VÀ CHI TIẾT ĐỊA DANH (PHẢI) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Cột trái: Lưới thẻ di tích */}
            <div className="lg:col-span-5 space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {filteredSites.map((site, idx) => {
                const isSelected = activeSite.id === site.id;
                return (
                  <div
                    key={site.id}
                    onClick={() => setActiveSite(site)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3.5 ${
                      isSelected
                        ? 'border-rose-500 bg-white shadow-md ring-2 ring-[#751D2C]/20'
                        : 'border-rose-200/80 bg-white hover:border-rose-300 hover:bg-gradient-to-br from-white to-rose-50/30/60'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 border border-rose-200/80 shrink-0">
                      <img
                        src={site.thumbnail}
                        alt={site.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/hcm-space/card-dong-thoi-gian.jpg';
                        }}
                      />
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-rose-800">
                          {site.rank}
                        </span>
                        <span className="text-rose-600 font-mono">{site.establishedYear.split('(')[0]}</span>
                      </div>

                      <h4 className="font-serif font-bold text-xs sm:text-[13px] text-slate-900 leading-snug line-clamp-2">
                        {site.name}
                      </h4>

                      <p className="text-[11px] text-slate-600 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-600 shrink-0" />
                        <span>{site.address}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cột phải: Khung chi tiết di tích được chọn */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-rose-300 p-5 sm:p-7 shadow-xl space-y-5">
              {/* Header di tích */}
              <div className="space-y-2 border-b border-rose-200/80 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-700 to-[#881337] text-white text-[11px] font-bold">
                      {activeSite.rank}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-slate-900 text-[11px] font-semibold">
                      {activeSite.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>{activeSite.coordsText}</span>
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-rose-800 tracking-wide">
                  {activeSite.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed italic">
                  “{activeSite.summary}”
                </p>
              </div>

              {/* Thông tin thực địa phục vụ tham quan */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-gradient-to-br from-white to-rose-50/30 p-3.5 rounded-2xl border border-rose-200/80">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-rose-800 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Thời lượng:</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{activeSite.visitDuration}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-rose-800 uppercase flex items-center gap-1">
                    <Ticket className="w-3 h-3" />
                    <span>Vé tham quan:</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-700">{activeSite.ticketPrice}</div>
                </div>

                <div className="col-span-2 space-y-0.5">
                  <div className="text-[10px] font-bold text-rose-800 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Giờ mở cửa:</span>
                  </div>
                  <div className="text-xs font-medium text-slate-900 leading-snug">{activeSite.openingHours}</div>
                </div>
              </div>

              {/* Ý nghĩa lịch sử & Văn hóa */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-xs uppercase text-rose-800 flex items-center gap-1.5 tracking-wider">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span>Ý Nghĩa Lịch Sử &amp; Cách Mạng:</span>
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-900 leading-relaxed">
                  {activeSite.historicalSignificance}
                </p>
              </div>

              {/* Điểm nhấn kiến trúc */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-xs uppercase text-rose-800 flex items-center gap-1.5 tracking-wider">
                  <Building2 className="w-4 h-4 text-rose-600" />
                  <span>Đặc Điểm Kiến Trúc &amp; Hiện Vật Tiêu Biểu:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSite.architecturalHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-rose-200/80 text-xs text-slate-900 flex items-start gap-2 shadow-2xs"
                    >
                      <span className="text-rose-600 font-bold">✓</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lời khuyên cho khách tham quan */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-rose-800 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-rose-600" />
                  <span>Lưu ý thuận tiện khi đến tham quan:</span>
                </div>
                <ul className="space-y-1 text-slate-600">
                  {activeSite.visitorTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Các nút hành động tương tác */}
              <div className="pt-2 border-t border-rose-200/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleSiteAudio(activeSite)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4 text-rose-600" />
                  <span>Nghe thuyết minh di tích này</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={activeSite.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-rose-500 text-rose-800 hover:bg-gradient-to-r from-rose-700 to-[#881337]/10 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Mở chỉ đường Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {activeSite.id === 'site-nhotruyenthong' && (
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('3D_TOUR')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C59A55] to-[#B28236] hover:brightness-110 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Box className="w-4 h-4" />
                      <span>Vào tham quan 3D VR</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHÂN HỆ 2: LỊCH SỬ ĐẢNG BỘ THÀNH PHỐ & BIÊN NIÊN SỬ ĐẢNG PHƯỜNG (MỐC 1/7/2025)
          ========================================================================= */}
      {activeSubTab === 'PARTY_HISTORY' && (
        <div className="space-y-6">
          {/* Thanh chuyển đổi giữa Lịch sử Đảng bộ TP vs Biên niên sử Đảng phường */}
          <div className="bg-white rounded-3xl border border-rose-200/80 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#751D2C] to-[#5B1522] text-white flex items-center justify-center shadow-md">
                <Flag className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-rose-800">
                  Lịch Sử &amp; Biên Niên Sử Đảng Bộ Thủ Dầu Một
                </h3>
                <p className="text-xs text-slate-600">
                  Từ Chi bộ Lò Chén Phú Cường 1936, các thời kỳ Đảng bộ TP đến dấu mốc lịch sử thành lập Đảng bộ Phường Thủ Dầu Một mới (01/07/2025).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-br from-white to-rose-50/30 p-1.5 rounded-2xl border border-rose-200/80">
              <button
                type="button"
                onClick={() => setPartyHistoryTab('WARD_CHRONOLOGY')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  partyHistoryTab === 'WARD_CHRONOLOGY'
                    ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm'
                    : 'text-slate-900 hover:text-rose-800'
                }`}
              >
                <Bookmark className="w-4 h-4 text-rose-600" />
                <span>Biên niên sử Đảng Phường (Từ 1/7/2025 — Nay)</span>
              </button>

              <button
                type="button"
                onClick={() => setPartyHistoryTab('CITY_HISTORY')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  partyHistoryTab === 'CITY_HISTORY'
                    ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm'
                    : 'text-slate-900 hover:text-rose-800'
                }`}
              >
                <BookOpen className="w-4 h-4 text-rose-600" />
                <span>Lịch sử Đảng bộ TP (1930 — 1/7/2025)</span>
              </button>
            </div>
          </div>

          {/* CHẾ ĐỘ 1: BIÊN NIÊN SỬ ĐẢNG BỘ PHƯỜNG THỦ DẦU MỘT (TỪ 01/07/2025 ĐẾN NAY) */}
          {partyHistoryTab === 'WARD_CHRONOLOGY' && (
            <div className="space-y-5">
              {/* Thanh lọc loại sự kiện biên niên sử */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-rose-200/80">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="font-bold text-rose-800 text-[11px] uppercase mr-1">Lĩnh vực:</span>
                  {[
                    { id: 'ALL', label: 'Tất cả sự kiện' },
                    { id: 'XÂY DỰNG ĐẢNG', label: 'Xây dựng Đảng' },
                    { id: 'CHUYỂN ĐỔI SỐ', label: 'Chuyển đổi số & Chi bộ số' },
                    { id: 'KHÔNG GIAN VĂN HÓA HCM', label: 'Không gian Văn hóa HCM' },
                    { id: 'CHÍNH QUYỀN ĐÔ THỊ', label: 'Chính quyền Đô thị' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setChronologyFilter(cat.id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        chronologyFilter === cat.id
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white'
                          : 'bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-slate-900 hover:border-rose-500'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  Tổng số: <strong>{filteredChronology.length} mốc sự kiện</strong>
                </div>
              </div>

              {/* Dòng thời gian biên niên sử (Timeline Stream) */}
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-rose-600">
                {filteredChronology.map((entry) => (
                  <div
                    key={entry.id}
                    className={`relative bg-white rounded-2xl border p-5 transition-all shadow-xs ${
                      entry.isHighlight
                        ? 'border-rose-500 ring-2 ring-[#751D2C]/10 bg-gradient-to-r from-white via-white to-amber-50/40'
                        : 'border-rose-200/80'
                    }`}
                  >
                    {/* Node Dot trên trục thời gian */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                        entry.isHighlight ? 'bg-gradient-to-r from-rose-700 to-[#881337] ring-4 ring-rose-200' : 'bg-rose-600'
                      }`}
                    />

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-white font-mono font-bold text-xs">
                            {entry.dateStr}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-rose-800 text-[10.5px] font-bold">
                            {entry.category}
                          </span>
                        </div>

                        {entry.documentRef && (
                          <span className="text-[11px] text-slate-600 font-mono italic">
                            Văn bản: {entry.documentRef}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                        {entry.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-rose-800 font-semibold leading-relaxed">
                        {entry.summary}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {entry.details}
                      </p>

                      <div className="pt-2 border-t border-rose-200/80/40 text-[11px] text-slate-600 flex items-center justify-between">
                        <span>Đơn vị chủ trì: <strong>{entry.leadingUnit}</strong></span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã xác thực hồ sơ lưu trữ</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHẾ ĐỘ 2: LỊCH SỬ ĐẢNG BỘ THÀNH PHỐ THỦ DẦU MỘT (1930 — 01/07/2025) */}
          {partyHistoryTab === 'CITY_HISTORY' && (
            <div className="space-y-6">
              {/* 4 Thẻ giai đoạn lịch sử */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TDM_CITY_PARTY_HISTORY_PHASES.map((phase) => {
                  const isSelected = activePhaseId === phase.id;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setActivePhaseId(phase.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-rose-500 bg-white shadow-md ring-2 ring-[#751D2C]/20'
                          : 'border-rose-200/80 bg-white/70 hover:bg-white hover:border-rose-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono font-bold text-rose-600">
                          {phase.period}
                        </span>
                        <div className="text-[10px] font-bold text-rose-800 uppercase">
                          {phase.badge}
                        </div>
                        <h4 className="font-serif font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                          {phase.title}
                        </h4>
                      </div>

                      <div className="pt-2 mt-2 border-t border-rose-200/80/40 text-[11px] font-bold flex items-center justify-between text-rose-800">
                        <span>Xem chi tiết</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chi tiết giai đoạn được chọn */}
              {(() => {
                const currentPhase =
                  TDM_CITY_PARTY_HISTORY_PHASES.find((p) => p.id === activePhaseId) ||
                  TDM_CITY_PARTY_HISTORY_PHASES[0];

                return (
                  <div className="bg-white rounded-3xl border-2 border-rose-300 p-6 sm:p-8 shadow-xl space-y-6">
                    <div className="space-y-2 border-b border-rose-200/80 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-white font-mono font-bold text-xs">
                          Giai đoạn {currentPhase.period}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-rose-800 font-bold text-xs">
                          {currentPhase.badge}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-rose-800">
                        {currentPhase.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-900 leading-relaxed italic">
                        {currentPhase.summary}
                      </p>
                    </div>

                    {/* Các mốc son tiêu biểu */}
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-sm uppercase text-rose-800 flex items-center gap-2 tracking-wider">
                        <Calendar className="w-4 h-4 text-rose-600" />
                        <span>Các Sự Kiện &amp; Mốc Son Lịch Sử Trọng Đại:</span>
                      </h4>

                      <div className="space-y-3">
                        {currentPhase.milestones.map((ms, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 space-y-1.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-bold text-xs text-rose-800">{ms.dateOrYear}</span>
                              {ms.significanceBadge && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                                  {ms.significanceBadge}
                                </span>
                              )}
                            </div>

                            <h5 className="font-serif font-bold text-sm text-slate-900">
                              {ms.eventTitle}
                            </h5>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {ms.content}
                            </p>

                            {ms.keyFigureOrDocument && (
                              <div className="pt-1 text-[11px] text-rose-800 font-medium">
                                Nhân vật / Tư liệu lịch sử: <strong>{ms.keyFigureOrDocument}</strong>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Thành tựu to lớn của Đảng bộ */}
                    <div className="space-y-2.5">
                      <h4 className="font-serif font-bold text-sm uppercase text-rose-800 flex items-center gap-2 tracking-wider">
                        <Award className="w-4 h-4 text-rose-600" />
                        <span>Thành Tựu Cốt Lõi Của Đảng Bộ Trong Giai Đoạn Này:</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {currentPhase.achievements.map((ach, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white border border-rose-200/80 text-xs text-slate-900 flex items-start gap-2 shadow-2xs"
                          >
                            <span className="text-red-700 font-bold shrink-0">★</span>
                            <span className="leading-snug">{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          PHÂN HỆ 3: NHÀ TRUYỀN THỐNG THỰC TẾ ẢO 360° (3D VR TOUR)
          ========================================================================= */}
      {activeSubTab === '3D_TOUR' && (
        <div className="space-y-6">
          {/* Banner Nổi Bật Công Trình Trọng Điểm & Bộ Chuyển Đổi Không Gian 3D */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50/80 border-2 border-amber-300 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-700 to-rose-900 text-white flex items-center justify-center shadow-md">
                <Box className="w-5 h-5 text-amber-200 animate-spin-slow" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                    CÔNG TRÌNH SỐ HÓA TRỌNG ĐIỂM
                  </span>
                  <span className="text-xs font-bold text-amber-900">
                    Sắp Triển Khai · Bản Thử Nghiệm 3D VR 360°
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                  Nhà Truyền Thống Phường Thủ Dầu Một — Trực Quan 360 Độ
                </h3>
              </div>
            </div>

            {/* Nút chuyển đổi chế độ xem 3D */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-rose-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(850);
                  setVrTourMode('METASTEPS_VR');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  vrTourMode === 'METASTEPS_VR'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Không Gian Văn Hóa HCM (3D VR)</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-rose-700 text-white font-black">Mới</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(650);
                  setVrTourMode('HERITAGE_PANORAMA');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  vrTourMode === 'HERITAGE_PANORAMA'
                    ? 'bg-rose-700 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Nhà Việc Phú Cường (5 Gian)</span>
              </button>
            </div>
          </div>

          {vrTourMode === 'METASTEPS_VR' ? (
            <HcmMetastepsVirtualSpace />
          ) : (
            <div className="space-y-6">

          {/* Lưới chọn 5 phân khu tham quan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {HERITAGE_ZONES.map((zone, idx) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  hcmSfx.playClick(800);
                  setActiveZone(zone);
                  setActiveHotspot(null);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  activeZone.id === zone.id
                    ? 'border-rose-500 bg-white shadow-md ring-2 ring-[#751D2C]/20 -translate-y-0.5'
                    : 'border-rose-200/80/70 bg-white/60 hover:bg-white hover:border-rose-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10.5px] font-bold">
                    <span className="text-rose-600 font-bold">Gian 0{idx + 1}</span>
                    <span className="text-slate-600">{zone.historicalPeriod}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {zone.name}
                  </h4>
                </div>

                <div className="pt-2 mt-2 border-t border-rose-200/80/40 text-[10.5px] text-rose-800 font-semibold flex items-center justify-between">
                  <span>Khám phá 360°</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          {/* Sân khấu 360° Panorama Stage */}
          <div className="rounded-3xl border-2 border-rose-300 bg-stone-900 overflow-hidden shadow-2xl relative">
            {/* Thanh công cụ đỉnh sân khấu */}
            <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-white text-xs border-b border-white/10 relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-rose-100">{activeZone.name}</span>
                <span className="text-white/60 hidden sm:inline">| {activeZone.historicalPeriod}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(650);
                    setIsAutoTour(!isAutoTour);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isAutoTour ? 'bg-rose-700 text-white' : 'bg-white/10 hover:bg-white/20 text-rose-100'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoTour ? 'animate-spin' : ''}`} />
                  <span>{isAutoTour ? 'Dừng tự xoay' : 'Tự xoay 360°'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(500);
                    handleToggleAudio();
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-rose-100 transition-colors cursor-pointer"
                  title="Thuyết minh âm thanh"
                >
                  {isPlayingAudio ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Khung tương tác 360 độ */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden flex items-center justify-center bg-radial from-stone-800 to-black select-none">
              <img
                src={activeZone.imageUrl}
                alt={activeZone.name}
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isAutoTour ? 'scale-110 translate-x-4' : 'scale-100'
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

              {/* Hotspots tương tác */}
              {activeZone.hotspots.map((hotspot, idx) => (
                <div
                  key={idx}
                  style={{ left: `${hotspot.coords.x}%`, top: `${hotspot.coords.y}%` }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      hcmSfx.playClick(1000);
                      setActiveHotspot(activeHotspot?.title === hotspot.title ? null : hotspot);
                    }}
                    className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-rose-700 to-[#881337]/90 border-2 border-rose-300 text-white hover:scale-125 transition-all shadow-lg cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-rose-100" />
                    <span className="absolute -inset-1 rounded-full border border-rose-300/80 animate-ping pointer-events-none" />
                  </button>

                  {/* Tooltip hotspot */}
                  {activeHotspot?.title === hotspot.title && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 sm:w-64 p-3 rounded-xl bg-black/90 text-white text-xs border border-rose-300 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 z-40">
                      <div className="font-bold text-rose-600 pb-1 border-b border-white/20 flex items-center justify-between">
                        <span>{hotspot.title}</span>
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                      <p className="mt-1 text-white/90 text-[11px] leading-relaxed">
                        {hotspot.desc}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Thông báo định vị góc nhìn */}
              <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-600" />
                <span>Chế độ: <strong>Thực tế ảo 360°</strong> (Bấm các điểm nhấp nháy để xem hiện vật)</span>
              </div>
            </div>

            {/* Bảng thông tin chi tiết gian phòng */}
            <div className="bg-gradient-to-br from-white to-rose-50/30 p-6 text-slate-900 border-t-2 border-rose-300 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-rose-200/80">
                <div>
                  <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    LỊCH SỬ VĂN HÓA ĐẤT THỦ • GIAN TRƯNG BÀY
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-800">
                    {activeZone.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
                    <span>{isPlayingAudio ? 'Dừng thuyết minh' : 'Phát giọng thuyết minh'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-3">
                  <h4 className="font-serif font-bold text-sm text-rose-800 uppercase tracking-wide">
                    Tư liệu &amp; Bối cảnh lịch sử:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed">
                    {activeZone.fullStory}
                  </p>
                </div>

                <div className="lg:col-span-4 space-y-3 bg-white p-4 rounded-2xl border border-rose-200/80">
                  <h4 className="font-serif font-bold text-xs text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Hiện vật tiêu biểu trong gian:</span>
                  </h4>
                  <ul className="text-xs space-y-1.5 text-slate-600">
                    {activeZone.keyArtifacts.map((art, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-rose-600 font-bold">★</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
          )}
        </div>
      )}

      {/* =========================================================================
          PHÂN HỆ 4: TƯ VẤN KỸ THUẬT LÀM THỰC TẾ ẢO 3D THỰC ĐỊA
          ========================================================================= */}
      {activeSubTab === 'TECH_GUIDE' && (
        <section className="bg-white rounded-3xl border-2 border-rose-300 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="space-y-2 border-b border-rose-200/80 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-700 to-[#881337]/10 text-rose-800 text-xs font-bold uppercase">
              <Cpu className="w-4 h-4 text-rose-600" />
              <span>TƯ VẤN CÔNG NGHỆ CHUYÊN SÂU • GIẢI ĐÁP YÊU CẦU ĐỊA PHƯƠNG</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-rose-800">
              Để triển khai mô hình Thực tế ảo (VR 360°) cho Nhà truyền thống Thủ Dầu Một thì cần gì?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dựa trên tọa độ thực tế tại <strong>Công viên Nhà việc Phú Cường (Bến Bạch Đằng)</strong>, hệ thống khuyến nghị quy trình chuẩn 4 bước để số hóa di sản đạt chất lượng cao:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-serif font-bold text-base text-rose-800">
                1. Thiết bị quay quét thực địa (Hardware)
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>• <strong>Máy ảnh 360° chuyên dụng:</strong> Insta360 Pro 2, Ricoh Theta Z1 hoặc Matterport Pro3 (chụp ảnh 8K HDR).</li>
                <li>• <strong>Flycam (Drone):</strong> DJI Mini 4 Pro / Mavic 3 bay quét toàn cảnh công viên 1.000m² và mái ngói cổ.</li>
                <li>• <strong>Chân máy (Tripod) &amp; Đèn:</strong> Đảm bảo máy thăng bằng, chụp phơi sáng đẹp trong nhà gỗ.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-serif font-bold text-base text-rose-800">
                2. Phần mềm ghép &amp; Dựng mô hình 3D
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>• <strong>Ghép ảnh Panorama:</strong> PTGui Pro hoặc Photoshop để ghép ảnh 360 cầu (Equirectangular).</li>
                <li>• <strong>Dựng 3D Photogrammetry:</strong> RealityCapture hoặc Blender để tái hiện sa bàn không gian 3 gian nhà.</li>
                <li>• <strong>Không gian Gaussian Splatting:</strong> Công nghệ AI 2026 cho phép tái tạo ánh sáng chân thực như thật.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B1522] text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-serif font-bold text-base text-rose-800">
                3. Biên tập nội dung &amp; Thuyết minh số
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>• <strong>Hồ sơ lý lịch di tích:</strong> Bản thảo lịch sử Nhà việc Phú Cường, tài liệu mùa xuân 1975 đã thẩm định.</li>
                <li>• <strong>Chụp cận cảnh hiện vật:</strong> Chụp từng góc xe ngựa cổ, sa bàn, súng đạn, bình gốm sứ Lò Lu.</li>
                <li>• <strong>Giọng đọc thuyết minh:</strong> Tận dụng ngay bộ Voice Studio in-web VieNeu-TTS để lồng tiếng tự động.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="font-serif font-bold text-base text-rose-800">
                4. Nhúng lên Web không cần cài App
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li>• <strong>Công nghệ WebGL / Three.js:</strong> Nhúng trực tiếp vào website hiện tại của Phường Thủ Dầu Một.</li>
                <li>• <strong>Tương thích 100%:</strong> Người dân mở bằng điện thoại Zalo, máy tính hay máy tính bảng đều mượt.</li>
                <li>• <strong>Hỗ trợ Kính VR:</strong> Cho phép học sinh, thanh niên đeo kính thực tế ảo tham quan như đang đứng tại chỗ.</li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-xs text-amber-950">
            <div className="font-bold text-sm text-rose-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Lộ Trình Đề Xuất Thực Hiện Cho Đảng Ủy / UBND Phường Thủ Dầu Một:</span>
            </div>
            <p className="leading-relaxed">
              1. <strong>Giai đoạn 1 (1–2 ngày):</strong> Phối hợp Ban Quản lý Nhà truyền thống tại đường Ngô Quyền/Bạch Đằng tiến hành chụp ảnh 360 độ tại 12 vị trí dừng (4 góc công viên ngoài trời và 8 góc trong 3 gian nhà).<br />
              2. <strong>Giai đoạn 2 (2–3 ngày):</strong> Ghép ảnh Panorama 8K, số hóa ảnh chụp macro hiện vật và thu âm thuyết minh theo đề cương.<br />
              3. <strong>Giai đoạn 3 (1 ngày):</strong> Nạp dữ liệu ảnh 360 thực tế vào component <code>HcmThuDauMotHeritageHouseView</code> sẵn có trên web — người dân toàn quốc có thể vào tham quan ngay lập tức!
            </p>
          </div>
        </section>
      )}


      {/* =========================================================================
          PHÂN HỆ 5: CÁC BÀI VIẾT & CHUYÊN ĐỀ LỊCH SỬ CHÍNH THỐNG
          ========================================================================= */}
      {activeSubTab === 'ARTICLES' && (
        <section className="space-y-6">
          {/* Header & Filter Controls */}
          <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#881337] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>KHO TƯ LIỆU NGHIÊN CỨU &amp; BIÊN KHẢO LỊCH SỬ CHÍNH THỐNG</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Chuyên Đề Lịch Sử Đất Thủ &amp; Tư Tưởng Hồ Chí Minh
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
                  Tuyển tập các bài nghiên cứu sâu sắc về dấu ấn cụ Phó bảng Nguyễn Sinh Sắc, cội nguồn Chi bộ Lò Chén 1936, ngày toàn thắng tại Nhà việc Phú Cường và công tác xây dựng Không gian Văn hóa Hồ Chí Minh gắn với Quy định 144-QĐ/TW.
                </p>
              </div>

              {/* Ô tìm kiếm bài viết */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder="Tìm chuyên đề, nhân vật..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-[#881337] bg-rose-50/30"
                />
              </div>
            </div>

            {/* Bộ lọc chuyên mục */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-100">
              {[
                { id: 'ALL', label: 'Tất Cả Chuyên Đề (05)' },
                { id: 'BÁC HỒ VỚI ĐẤT THỦ', label: 'Bác Hồ Với Đất Thủ' },
                { id: 'LỊCH SỬ CÁCH MẠNG', label: 'Lịch Sử Cách Mạng' },
                { id: 'XÂY DỰNG ĐẢNG', label: 'Xây Dựng Đảng & QĐ 144' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(600);
                    setArticleCategoryFilter(cat.id as any);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    articleCategoryFilter === cat.id
                      ? 'bg-[#881337] text-white shadow-xs'
                      : 'bg-rose-50/70 hover:bg-rose-100/70 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Danh sách 5 bài viết chuyên đề */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THU_DAU_MOT_HISTORICAL_ARTICLES.filter((art) => {
              const matchCat = articleCategoryFilter === 'ALL' || art.category === articleCategoryFilter;
              const matchQ =
                !articleSearchQuery ||
                art.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
                art.summary.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
                art.tags.some((t) => t.toLowerCase().includes(articleSearchQuery.toLowerCase()));
              return matchCat && matchQ;
            }).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl border border-rose-200/90 hover:border-rose-400 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rose-100 text-[#881337]">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => {
                      hcmSfx.playClick(750);
                      setReadingArticle(article);
                    }}
                    className="font-serif text-lg font-black text-slate-900 group-hover:text-[#881337] transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Trích dẫn kinh điển nếu có */}
                  {article.keyQuotes && article.keyQuotes.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-950 italic line-clamp-2">
                      &ldquo;{article.keyQuotes[0]}&rdquo;
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    <div>{article.author}</div>
                    <div className="text-[10px] text-slate-400">{article.publishedDate}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleToggleArticleAudio(article)}
                      title="Nghe giọng đọc chuyên đề"
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#881337] transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        hcmSfx.playClick(750);
                        setReadingArticle(article);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#881337] hover:bg-[#751D2C] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <span>Đọc bài</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Modal / Drawer Đọc Toàn Văn Chuyên Đề */}
          {readingArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border-2 border-rose-300">
                {/* Header Modal */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white flex items-center justify-between shrink-0">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white uppercase tracking-wider">
                      {readingArticle.category}
                    </span>
                    <h2 className="font-serif text-lg sm:text-2xl font-black text-white leading-tight">
                      {readingArticle.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (isPlayingArticleAudio) {
                        hcmVoiceService.stop();
                        setIsPlayingArticleAudio(false);
                      }
                      setReadingArticle(null);
                    }}
                    className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 ml-3"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Body Article Reader */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 leading-relaxed font-sans">
                  {/* Metadata bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rose-100 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>Tác giả: <strong>{readingArticle.author}</strong></span>
                      <span>•</span>
                      <span>Ngày công bố: <strong>{readingArticle.publishedDate}</strong></span>
                      <span>•</span>
                      <span>Thời lượng: <strong>{readingArticle.readTime}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleArticleAudio(readingArticle)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPlayingArticleAudio
                          ? 'bg-rose-700 text-white animate-pulse'
                          : 'bg-rose-100 hover:bg-rose-200 text-[#881337]'
                      }`}
                    >
                      {isPlayingArticleAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isPlayingArticleAudio ? 'Dừng đọc' : 'Nghe giọng đọc toàn bài'}</span>
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-rose-50/80 border-l-4 border-[#881337] text-sm text-slate-700 font-medium leading-relaxed">
                    <strong>Tóm tắt nội dung:</strong> {readingArticle.summary}
                  </div>

                  {/* Trích dẫn nổi bật */}
                  {readingArticle.keyQuotes && readingArticle.keyQuotes.map((q, idx) => (
                    <blockquote key={idx} className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 italic text-sm font-serif shadow-2xs">
                      &ldquo;{q}&rdquo;
                    </blockquote>
                  ))}

                  {/* Các phân mục chi tiết */}
                  <div className="space-y-6">
                    {readingArticle.contentSections.map((sec, idx) => (
                      <div key={idx} className="space-y-3">
                        <h3 className="font-serif text-lg font-bold text-[#881337] border-b border-rose-100 pb-1.5">
                          {sec.heading}
                        </h3>
                        {sec.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="text-sm sm:text-[15px] text-slate-700 leading-relaxed text-justify">
                            {p}
                          </p>
                        ))}
                        {sec.calloutText && (
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50/60 border border-rose-200 text-xs sm:text-sm text-rose-950 font-semibold">
                            💡 {sec.calloutText}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Di tích liên quan */}
                  {readingArticle.relatedSiteIds && readingArticle.relatedSiteIds.length > 0 && (
                    <div className="pt-4 border-t border-rose-100 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#881337] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Di Tích &amp; Địa Chỉ Đỏ Liên Quan Trực Tiếp</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {readingArticle.relatedSiteIds.map((sId) => {
                          const site = THU_DAU_MOT_HERITAGE_SITES.find((s) => s.id === sId);
                          if (!site) return null;
                          return (
                            <button
                              key={sId}
                              type="button"
                              onClick={() => {
                                setReadingArticle(null);
                                setActiveSite(site);
                                setActiveSubTab('HERITAGE_MAP');
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#881337] text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
                            >
                              <Compass className="w-3 h-3" />
                              <span>{site.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Nguồn tài liệu đối chiếu */}
                  <div className="pt-4 border-t border-rose-100 text-xs text-slate-500 space-y-1 bg-slate-50 p-4 rounded-2xl">
                    <div className="font-bold text-slate-700">Tài liệu tham khảo &amp; kiểm chứng:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {readingArticle.referenceSources.map((src, sIdx) => (
                        <li key={sIdx}>{src}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Modal */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                  <span className="text-xs text-slate-500">
                    Ban Tuyên giáo Đảng ủy Phường Thủ Dầu Một • Không gian Văn hóa Hồ Chí Minh
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (isPlayingArticleAudio) {
                        hcmVoiceService.stop();
                        setIsPlayingArticleAudio(false);
                      }
                      setReadingArticle(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Đóng bài đọc
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Modal Bản Đồ Số Sinh Động */}
      <HcmDynamicHeritageMapModal
        isOpen={isDynamicMapModalOpen}
        onClose={() => setIsDynamicMapModalOpen(false)}
        initialMode="THU_DAU_MOT"
      />
    </div>
  );
};
