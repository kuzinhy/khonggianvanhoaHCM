import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Compass,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Award,
  Flame,
  BookOpen,
  FileText,
  X,
  Quote,
  Clock,
  Compass as CompassIcon,
} from 'lucide-react';
import {
  CLASSIC_REVOLUTIONARY_WORKS,
  type ClassicRevolutionaryWork,
} from '../data/hcmHeritageMapData';

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  location: string;
  country: string;
  stageNumber: number;
  stageTitle: string;
  alias: string;
  summary: string;
  quote?: string;
  badgeColor: string;
  icon?: string;
  classicWorkId?: string;
}

export const JOURNEY_30_YEARS_MILESTONES: TimelineMilestone[] = [
  {
    id: 'm_1911',
    year: '1911',
    title: 'Khởi hành từ Bến Nhà Rồng — Ra đi tìm đường cứu nước',
    location: 'Cảng Sài Gòn — Le Havre',
    country: 'Việt Nam → Pháp',
    stageNumber: 1,
    stageTitle: 'Chặng 1: Cảng Sài Gòn — Le Havre',
    alias: 'Anh Văn Ba (phụ bếp)',
    summary:
      'Người thanh niên Nguyễn Tất Thành rời bến cảng Sài Gòn trên con tàu Amiral Latouche-Tréville, mở đầu hành trình 30 năm bôn ba tìm con đường giải phóng dân tộc.',
    quote: 'Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn, đấy là tất cả những điều tôi hiểu.',
    badgeColor: '#BE123C',
  },
  {
    id: 'm_1912',
    year: '1911 - 1912',
    title: 'Khảo sát các thuộc địa châu Phi & Vòng quanh Đại Tây Dương',
    location: 'Port Said, Dakar, Djibouti, Mombasa...',
    country: 'Ai Cập, Senegal, Algérie...',
    stageNumber: 2,
    stageTitle: 'Chặng 2: Vòng quanh châu Phi',
    alias: 'Văn Ba',
    summary:
      'Tận mắt chứng kiến nỗi cơ cực của nhân dân lao động các nước thuộc địa. Người nhận rõ bản chất tàn bạo của chủ nghĩa thực dân ở khắp mọi nơi.',
    quote: 'Ở đâu bọn thực dân cũng tàn bạo, vô nhân đạo; ở đâu người lao động cũng bị bóc lột dã man.',
    badgeColor: '#B45309',
  },
  {
    id: 'm_1913',
    year: '1912 - 1913',
    title: 'Đến nước Mỹ — Khảo nghiệm Tuyên ngôn Độc lập 1776',
    location: 'Boston & New York (Khu Harlem)',
    country: 'Hoa Kỳ',
    stageNumber: 3,
    stageTitle: 'Chặng 3: Pháp — Châu Mỹ — Anh',
    alias: 'Nguyễn Tất Thành',
    summary:
      'Làm việc tại khách sạn Parker House ở Boston; khảo sát phong trào đấu tranh bình đẳng sắc tộc của người da màu ở Harlem, thấu hiểu giới hạn của nền dân chủ tư sản.',
    quote: 'Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được...',
    badgeColor: '#1D4ED8',
  },
  {
    id: 'm_1914',
    year: '1913 - 1917',
    title: 'Tôi luyện trong phong trào công nhân Vương quốc Anh',
    location: 'Khách sạn Drayton Court & Carlton, London',
    country: 'Vương quốc Anh',
    stageNumber: 3,
    stageTitle: 'Chặng 3: Pháp — Châu Mỹ — Anh',
    alias: 'Nguyễn Tất Thành',
    summary:
      'Làm nghề cào tuyết, thợ đốt lò, phụ bếp cùng vua bếp Escoffier; tích cực tự học tiếng Anh và gia nhập Hội Lao động Hải ngoại.',
    badgeColor: '#0F766E',
  },
  {
    id: 'm_1919',
    year: '18/6/1919',
    title: 'Bản Yêu sách 8 điểm của nhân dân An Nam tại Versailles',
    location: 'Hội nghị Hòa bình Versailles, Paris',
    country: 'Nước Pháp',
    stageNumber: 4,
    stageTitle: 'Chặng 4: Pháp — Liên Xô',
    alias: 'Nguyễn Ái Quốc',
    summary:
      'Lần đầu tiên danh xưng Nguyễn Ái Quốc xuất hiện công khai trên trường quốc tế, đòi các quyền tự do tối thiểu, làm rung chuyển dư luận Pháp và các thuộc địa.',
    badgeColor: '#6D28D9',
    classicWorkId: 'work_1919_versailles',
  },
  {
    id: 'm_1920_luancuong',
    year: '07/1920',
    title: 'Đón nhận Luận cương Lênin — Ánh sáng chân lý cứu nước',
    location: 'Số 9 ngõ Compoint, Quận 17, Paris',
    country: 'Nước Pháp',
    stageNumber: 4,
    stageTitle: 'Chặng 4: Pháp — Liên Xô',
    alias: 'Nguyễn Ái Quốc',
    summary:
      'Đọc bản Sơ thảo Luận cương về vấn đề dân tộc và thuộc địa của Lênin. Người tìm ra con đường cứu nước đúng đắn: Con đường Cách mạng Vô sản.',
    quote: 'Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Luận cương đã giải đáp cho tôi con đường giải phóng cho đồng bào tôi.',
    badgeColor: '#991B1B',
  },
  {
    id: 'm_1920_tours',
    year: '12/1920',
    title: 'Bỏ phiếu tán thành Quốc tế III & Đồng sáng lập Đảng Cộng sản Pháp',
    location: 'Đại hội Tours, Thành phố Tours',
    country: 'Nước Pháp',
    stageNumber: 4,
    stageTitle: 'Chặng 4: Pháp — Liên Xô',
    alias: 'Nguyễn Ái Quốc',
    summary:
      'Trở thành một trong những người sáng lập Đảng Cộng sản Pháp và là người cộng sản đầu tiên của dân tộc Việt Nam, đánh dấu bước ngoặt tư tưởng vĩ đại.',
    badgeColor: '#BE123C',
  },
  {
    id: 'm_1921',
    year: '1921 - 1923',
    title: 'Sáng lập Hội Liên hiệp Thuộc địa & Báo Le Paria (Người Cùng Khổ)',
    location: 'Paris & Montreuil',
    country: 'Nước Pháp',
    stageNumber: 4,
    stageTitle: 'Chặng 4: Pháp — Liên Xô',
    alias: 'Nguyễn Ái Quốc',
    summary:
      'Tập hợp nhân dân thuộc địa bị áp bức, trực tiếp làm chủ nhiệm kiêm chủ bút Báo Người Cùng Khổ, viết tác phẩm bất hủ Bản án chế độ thực dân Pháp.',
    quote: 'Chủ nghĩa tư bản là một con đỉa có hai cái vòi: một vòi bám vào chính quốc và một vòi bám vào các thuộc địa.',
    badgeColor: '#0369A1',
    classicWorkId: 'work_1925_ban_an',
  },
  {
    id: 'm_1923',
    year: '1923 - 1924',
    title: 'Đến Liên Xô — Hoạt động tại Quốc tế Cộng sản & Đại học Phương Đông',
    location: 'Điện Kremlin & Trường KUTV, Moskva',
    country: 'Liên Xô',
    stageNumber: 4,
    stageTitle: 'Chặng 4: Pháp — Liên Xô',
    alias: 'Nguyễn Ái Quốc',
    summary:
      'Nghiên cứu sâu sắc chủ nghĩa Mác - Lênin tại quê hương Cách mạng Tháng Mười; tham dự Đại hội V Quốc tế Cộng sản, bảo vệ quyền lợi chính đáng của các thuộc địa.',
    badgeColor: '#C2410C',
  },
  {
    id: 'm_1924',
    year: '1924 - 1927',
    title: 'Thành lập Hội Việt Nam Cách mạng Thanh niên & Báo Thanh Niên',
    location: 'Nhà số 13-13B đường Văn Minh, Quảng Châu',
    country: 'Trung Quốc',
    stageNumber: 5,
    stageTitle: 'Chặng 5: Quảng Châu (1924 — 1927)',
    alias: 'Lý Thụy',
    summary:
      'Mở lớp huấn luyện chính trị cho các thanh niên ưu tú từ Việt Nam sang, trực tiếp giảng dạy cuốn sách giáo khoa cách mạng đầu tiên Đường Kách Mệnh.',
    quote: 'Cách mệnh trước hết phải có Đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với vô sản giai cấp mọi nơi.',
    badgeColor: '#B91C1C',
    classicWorkId: 'work_1927_duong_kach_menh',
  },
  {
    id: 'm_1928',
    year: '1928 - 1929',
    title: 'Về Xiêm (Thái Lan) — Xây dựng phong trào Việt kiều yêu nước',
    location: 'Bản Đông, Tỉnh Nakhon Phanom & Udon Thani',
    country: 'Thái Lan',
    stageNumber: 6,
    stageTitle: 'Chặng 6: Xiêm (1928 — 1929)',
    alias: 'Thầu Chín',
    summary:
      'Sống chan hòa giữa kiều bào, hướng dẫn mở trường dạy chữ Quốc ngữ, vỡ đất làm vườn, củng cố tổ chức quần chúng hướng về cội nguồn Tổ quốc.',
    badgeColor: '#15803D',
  },
  {
    id: 'm_1930',
    year: '03/02/1930',
    title: 'Hợp nhất các tổ chức Cộng sản — Thành lập Đảng Cộng sản Việt Nam',
    location: 'Bán đảo Cửu Long, Hương Cảng',
    country: 'Hồng Kông (Anh quản lý)',
    stageNumber: 7,
    stageTitle: 'Chặng 7: Thành lập Đảng (1930)',
    alias: 'Vương Sơn Nhi / Tống Văn Sơ',
    summary:
      'Chủ trì Hội nghị thành lập Đảng Cộng sản Việt Nam, trực tiếp soạn thảo Chính cương vắn tắt, Sách lược vắn tắt — văn kiện mở ra kỷ nguyên mới vẻ vang cho dân tộc.',
    quote: 'Đảng là đội tiên phong của vô sản giai cấp, phải thu phục cho được đại bộ phận giai cấp mình, phải làm cho giai cấp mình lãnh đạo được dân chúng.',
    badgeColor: '#BE123C',
    classicWorkId: 'work_1930_cuong_linh',
  },
  {
    id: 'm_1931',
    year: '1931 - 1933',
    title: 'Vụ án Tống Văn Sơ — Bản lĩnh kiên cường trước nanh vuốt kẻ thù',
    location: 'Nhà tù Victoria, Hồng Kông',
    country: 'Hồng Kông',
    stageNumber: 8,
    stageTitle: 'Chặng 8: Vụ án Hồng Kông (1931 — 1933)',
    alias: 'Tống Văn Sơ',
    summary:
      'Bị mật thám Anh bắt giữ trái phép; nhờ sự trợ giúp của luật sư Loseby và tinh thần bất khuất kiên định, Người được trả tự do thoát khỏi mưu đồ sát hại của thực dân Pháp.',
    badgeColor: '#475569',
  },
  {
    id: 'm_1934',
    year: '1934 - 1938',
    title: 'Nghiên cứu sinh Viện Nghiên cứu các Vấn đề Dân tộc và Thuộc địa',
    location: 'Moskva',
    country: 'Liên Xô',
    stageNumber: 9,
    stageTitle: 'Chặng 9: Trở lại Liên Xô (1934 — 1938)',
    alias: 'Linov',
    summary:
      'Vượt qua giai đoạn thử thách nghiệt ngã, tiếp tục học tập, nghiên cứu lý luận cao cấp, chuẩn bị thế và lực cho thời cơ cách mạng đang đến gần.',
    badgeColor: '#6B7280',
  },
  {
    id: 'm_1941',
    year: '28/01/1941',
    title: 'Về nước tại Cột mốc 108 — Trực tiếp lãnh đạo Cách mạng Việt Nam',
    location: 'Cột mốc 108, Pác Bó, Hà Quảng, Cao Bằng',
    country: 'Việt Nam',
    stageNumber: 10,
    stageTitle: 'Chặng 10: Quế Lâm — Pác Bó',
    alias: 'Già Thu / Bác Ké / Hồ Chí Minh',
    summary:
      'Sau 30 năm bôn ba khắp bốn biển năm châu, Người vượt qua cột mốc 108 trở về Tổ quốc. Trực tiếp chỉ đạo Hội nghị TW 8, thành lập Mặt trận Việt Minh và lãnh đạo Cách mạng Tháng Tám toàn thắng.',
    quote: 'Bác đã về đây, Tổ quốc ơi! / Nhớ thương hòn đất ấm hơi Người / Ba mươi năm ấy, chân không nghỉ / Mà đến bây giờ mới tới nơi!',
    badgeColor: '#991B1B',
    classicWorkId: 'work_1941_lich_su_nuoc_ta',
  },
];

export const HcmJourneyInteractiveTimeline: React.FC<{
  onSelectMilestone?: (milestone: TimelineMilestone) => void;
}> = ({ onSelectMilestone }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [activeId, setActiveId] = useState<string>(JOURNEY_30_YEARS_MILESTONES[0].id);
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const [activeStageFilter, setActiveStageFilter] = useState<number>(0);
  const [selectedClassicWork, setSelectedClassicWork] = useState<ClassicRevolutionaryWork | null>(null);

  // Filtered milestones
  const filteredMilestones = useMemo(() => {
    if (activeStageFilter === 0) return JOURNEY_30_YEARS_MILESTONES;
    return JOURNEY_30_YEARS_MILESTONES.filter((m) => m.stageNumber === activeStageFilter);
  }, [activeStageFilter]);

  // Handle scroll progress using requestAnimationFrame (Exact Lucian UX/UI physics)
  useEffect(() => {
    const sc = scrollContainerRef.current;
    const tl = timelineRef.current;
    const ln = lineRef.current;
    if (!sc || !tl || !ln) return;

    let rafId: number = 0;

    const handleDraw = () => {
      rafId = 0;
      const tip = sc.scrollTop + sc.clientHeight * 0.55 - tl.offsetTop - ln.offsetTop;
      const h = ln.offsetHeight || 1;
      const p = Math.max(0, Math.min(1, tip / h));
      ln.style.setProperty('--p', p.toFixed(4));

      // Toggle active states for each milestone
      const items = tl.querySelectorAll<HTMLDivElement>('.journey-ev');
      let currentActiveId = activeId;
      items.forEach((el, index) => {
        const isPast = el.offsetTop + 20 <= tip;
        el.classList.toggle('on', isPast);
        if (isPast && filteredMilestones[index]) {
          currentActiveId = filteredMilestones[index].id;
        }
      });
      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(handleDraw);
    };

    sc.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(handleDraw);

    return () => {
      sc.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [filteredMilestones, activeId]);

  // Auto-scroll simulation
  useEffect(() => {
    if (!autoScroll) return;
    const sc = scrollContainerRef.current;
    if (!sc) return;

    const interval = setInterval(() => {
      if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 20) {
        sc.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        sc.scrollBy({ top: 140, behavior: 'smooth' });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <div className="space-y-4">
      {/* Top Banner Control: Sáng, Tinh tế, Hiện đại với pha chút sắc hồng cánh sen & vàng hoàng gia */}
      <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#FFFDFD] via-white to-rose-50/60 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#751D2C] via-[#991B1B] to-[#BE123C] text-amber-300 shadow-md ring-2 ring-amber-300/40">
              <Compass className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-rose-800">
                  Dòng Thời Gian Tương Tác 30 Năm Bôn Ba Cứu Nước (1911 — 1941)
                </h3>
                <span className="rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  Hiệu ứng Trục Quay 3D
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Trục quay trung tâm dẫn đường bằng ánh sáng quang sai, thẻ mốc sự kiện hiển thị so le sáng đẹp
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setAutoScroll(!autoScroll)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                autoScroll
                  ? 'bg-gradient-to-r from-rose-700 to-rose-800 text-white shadow-xs animate-pulse ring-2 ring-rose-300'
                  : 'bg-white border border-rose-200/70 text-rose-800 hover:bg-rose-50/80 shadow-2xs'
              }`}
            >
              {autoScroll ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              <span>{autoScroll ? 'Dừng Tự Cuộn' : 'Tự Động Cuộn Lịch Sử'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200/70 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-amber-50/60 shadow-2xs cursor-pointer transition-colors"
              title="Cuộn về đầu mốc 1911"
            >
              <RotateCcw className="h-3.5 w-3.5 text-amber-700" />
              <span>Về đầu (1911)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Selector Filter (Tông kem sáng & viền vàng hồng) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-300">
        <button
          type="button"
          onClick={() => setActiveStageFilter(0)}
          className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
            activeStageFilter === 0
              ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-amber-300 shadow-xs ring-2 ring-amber-300/50'
              : 'bg-white border border-rose-200/70 text-slate-700 hover:bg-rose-50/60'
          }`}
        >
          Toàn Bộ Hành Trình (15 Mốc Son)
        </button>
        {Array.from({ length: 10 }).map((_, i) => {
          const stageNum = i + 1;
          const active = activeStageFilter === stageNum;
          return (
            <button
              key={stageNum}
              type="button"
              onClick={() => setActiveStageFilter(stageNum)}
              className={`shrink-0 rounded-xl px-2.5 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                active
                  ? 'bg-rose-700 text-white shadow-xs ring-2 ring-rose-200'
                  : 'bg-white border border-rose-200/70 text-slate-700 hover:bg-rose-50/60'
              }`}
            >
              Chặng {stageNum}
            </button>
          );
        })}
      </div>

      {/* Main Timeline Card Container: Thiết kế SÁNG - ĐẸP - HIỆN ĐẠI */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#FFFDFD] via-white to-rose-50/40 p-4 sm:p-7 shadow-lg border-2 border-rose-200/80 overflow-hidden">
        {/* Soft Ambient Rose & Golden Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-32 bg-gradient-to-b from-rose-200/50 via-amber-200/40 to-transparent blur-2xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-64 h-32 bg-amber-200/30 blur-3xl rounded-full pointer-events-none" />

        {/* Header Tiêu Đề Sang Trọng, Sáng Rõ */}
        <div className="relative text-center max-w-xl mx-auto space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-300 text-rose-800 font-mono text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-spin" />
            <span>Biên Niên Sử Hành Trình 1911 — 1941</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-black font-serif text-rose-800 tracking-tight">
            Ba Mươi Năm Ấy Chân Không Nghỉ
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Kéo cuộn để theo dõi từng bước chân của Người trên con đường vĩ đại tìm chân lý giải phóng dân tộc
          </p>
        </div>

        {/* Scrollable Viewport (Height 600px) */}
        <div
          ref={scrollContainerRef}
          className="relative h-[620px] overflow-y-auto px-1 sm:px-4 timeline-custom-scrollbar outline-none"
          tabIndex={0}
          aria-label="Dòng thời gian hành trình 30 năm cứu nước của Bác"
        >
          <div ref={timelineRef} className="relative pt-6 pb-28 min-h-[1400px]">
            {/* Central Track Line with Dynamic --p Variable and Glowing Beacon */}
            <span
              ref={lineRef}
              className="absolute left-1/2 top-4 bottom-24 w-1 -ml-0.5 rounded-full bg-rose-200"
              aria-hidden="true"
            >
              {/* Active Scaling Inner Line */}
              <i
                className="absolute left-0 top-0 w-full h-full rounded-full transition-transform duration-75 ease-out"
                style={{
                  background: 'linear-gradient(180deg, #DC2626 0%, #E11D48 40%, #D97706 80%, #F59E0B 100%)',
                  transformOrigin: '50% 0',
                  transform: 'scaleY(var(--p, 0))',
                }}
              >
                {/* Glowing Leading Beacon (Hào quang dẫn đường) */}
                <span
                  className="absolute left-1/2 -bottom-2.5 h-5 w-5 -ml-2.5 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-rose-500 border-2 border-white transition-transform duration-75 shadow-lg"
                  style={{
                    boxShadow: '0 0 16px 4px #F59E0B, 0 0 28px 8px rgba(225, 29, 72, 0.45)',
                    transform: 'scaleY(calc(1 / max(var(--p, 0), .02)))',
                  }}
                />
              </i>
            </span>

            {/* Event Items (Alternating Odd / Even) */}
            {filteredMilestones.map((m, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={m.id}
                  className="journey-ev relative my-10 min-h-[140px] flex items-center justify-between"
                >
                  {/* Central Timeline Dot Node */}
                  <span
                    className="journey-dot absolute left-1/2 top-5 h-5 w-5 -ml-2.5 rounded-full bg-white border-2 border-[#D4C3A3] shadow-md transition-all duration-300 z-10"
                    aria-hidden="true"
                  />

                  {/* Alternating Event Card */}
                  <div
                    className={`journey-card w-[calc(50%-24px)] rounded-2xl p-4 sm:p-5 transition-all duration-500 cursor-pointer ${
                      isEven
                        ? 'ml-auto text-left'
                        : 'mr-auto text-left'
                    }`}
                    onClick={() => onSelectMilestone?.(m)}
                  >
                    {/* Year & Badge */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <b
                        className="font-mono text-base sm:text-lg font-black tracking-tight"
                        style={{ color: m.badgeColor }}
                      >
                        {m.year}
                      </b>
                      <span className="rounded-md bg-amber-100 border border-amber-300/80 px-2 py-0.5 text-[10px] font-bold text-amber-900 shadow-2xs">
                        Chặng {m.stageNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-md">
                        {m.country}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-rose-800 transition-colors">
                      {m.title}
                    </h5>

                    {/* Location & Alias */}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                      <span className="inline-flex items-center gap-1 text-rose-800 font-semibold">
                        <MapPin className="h-3 w-3 text-rose-600 shrink-0" />
                        <span className="truncate max-w-[140px] sm:max-w-none">{m.location}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200/70 px-2 py-0.5 rounded-md font-semibold text-[10.5px]">
                        Bí danh: {m.alias}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="mt-2 text-xs text-slate-700 leading-relaxed font-sans line-clamp-3">
                      {m.summary}
                    </p>

                    {/* Quote if exists */}
                    {m.quote && (
                      <div className="mt-2.5 rounded-xl border-l-3 border-[#751D2C] bg-gradient-to-r from-amber-50/90 to-rose-50/60 p-2.5 text-xs italic text-rose-800 font-serif shadow-2xs">
                        &ldquo;{m.quote}&rdquo;
                      </div>
                    )}

                    {/* Classic Work Link Pill */}
                    {m.classicWorkId && (() => {
                      const work = CLASSIC_REVOLUTIONARY_WORKS.find((w) => w.id === m.classicWorkId);
                      if (!work) return null;
                      return (
                        <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-rose-800 font-bold truncate">
                            <BookOpen className="h-3.5 w-3.5 text-rose-700 shrink-0" />
                            <span className="truncate">{work.title}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedClassicWork(work);
                            }}
                            className="shrink-0 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#751D2C] to-[#BE123C] hover:brightness-110 text-white font-bold text-[10px] transition-all shadow-xs cursor-pointer"
                          >
                            Đọc văn kiện
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Classic Work Modal (Sáng, Tinh tế, Sang trọng) */}
      {selectedClassicWork && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedClassicWork(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] border-2 border-rose-200/80 p-6 shadow-2xl text-slate-900 space-y-4 max-h-[90vh] overflow-y-auto timeline-custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-amber-200/80 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-mono font-bold text-amber-900">
                    {selectedClassicWork.year}
                  </span>
                  <span className="rounded-lg bg-rose-100 border border-rose-300 px-2 py-0.5 text-[11px] font-bold text-rose-800">
                    {selectedClassicWork.category === 'YEU_SACH' && 'Văn kiện Ngoại giao & Yêu sách'}
                    {selectedClassicWork.category === 'LUAN_THUYET' && 'Kiệt tác Lý luận Cách mạng'}
                    {selectedClassicWork.category === 'VAN_KIEN_DANG' && 'Cương lĩnh & Văn kiện Đảng'}
                    {selectedClassicWork.category === 'THO_VAN' && 'Di sản Văn thơ Cách mạng'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-rose-800">
                  {selectedClassicWork.title}
                </h3>
                {selectedClassicWork.originalTitle && (
                  <p className="text-xs italic text-slate-500">
                    Tiêu đề gốc: {selectedClassicWork.originalTitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedClassicWork(null)}
                className="rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Location & Context */}
            <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
              <MapPin className="h-4 w-4 shrink-0 text-rose-600" />
              <span>Nơi ra đời: <strong>{selectedClassicWork.location}</strong></span>
            </div>

            {/* Key Quote */}
            <div className="rounded-2xl border-l-4 border-[#751D2C] bg-gradient-to-r from-amber-50 to-rose-50/80 p-4 font-serif text-sm italic text-rose-800 leading-relaxed shadow-xs">
              &ldquo;{selectedClassicWork.quoteKey}&rdquo;
            </div>

            {/* Summary */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Bối cảnh &amp; Nội dung khái quát:
              </span>
              <p className="text-slate-700 leading-relaxed font-sans">
                {selectedClassicWork.summary}
              </p>
            </div>

            {/* Significance */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-rose-800 uppercase tracking-wider">
                Giá trị lịch sử &amp; Ý nghĩa thời đại:
              </span>
              <p className="text-slate-800 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                {selectedClassicWork.significance}
              </p>
            </div>

            {/* Snippet */}
            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Trích lục nội dung tiêu biểu:
              </span>
              <p className="text-slate-800 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60 font-mono text-[11px]">
                {selectedClassicWork.readMoreSnippet}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClassicWork(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#751D2C] to-[#BE123C] hover:brightness-110 font-bold text-white text-xs transition-all shadow-xs cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Modern Light Theme & Smooth Spring Physics */}
      <style>{`
        .timeline-custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .timeline-custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 213, 192, 0.2);
          border-radius: 9999px;
        }
        .timeline-custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5D5C0;
          border-radius: 9999px;
        }
        .timeline-custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D97706;
        }

        .journey-ev {
          position: relative;
        }
        .journey-dot {
          background-color: #FFFFFF;
          border-color: #D4C3A3;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .journey-ev.on .journey-dot {
          background-color: #BE123C;
          border-color: #FFFFFF;
          transform: scale(1.35);
          box-shadow: 0 0 12px 3px rgba(190, 18, 60, 0.45);
        }
        .journey-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1.5px solid #EAE0D0;
          opacity: 0.35;
          transform: translateY(20px);
          transition: opacity 0.4s ease-out, transform 0.6s cubic-bezier(0.34, 1.45, 0.64, 1), box-shadow 0.3s, border-color 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }
        .journey-ev:nth-child(odd) .journey-card {
          transform: translateX(-24px);
        }
        .journey-ev:nth-child(even) .journey-card {
          transform: translateX(24px);
        }
        .journey-ev.on .journey-card {
          opacity: 1;
          transform: none;
          background: #FFFFFF;
          border-color: #E2B883;
          box-shadow: 0 10px 24px -4px rgba(180, 83, 9, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.05);
        }
        .journey-ev.on .journey-card:hover {
          border-color: #BE123C;
          box-shadow: 0 14px 30px -4px rgba(190, 18, 60, 0.18), 0 4px 10px -2px rgba(0, 0, 0, 0.06);
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};
