import React, { useState, useEffect } from 'react';
import {
  Heart,
  BookOpen,
  Users,
  Sparkles,
  Award,
  Smile,
  Music,
  MapPin,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  Share2,
  ExternalLink,
  ChevronRight,
  Play,
  Pause,
  Plus,
  Trash2,
  Volume2,
  Flag,
  HelpCircle,
  Clock,
  Star,
  Quote,
} from 'lucide-react';
import {
  FIVE_TEACHINGS_DATA,
  UNCLE_HO_PHOTOS,
  HISTORICAL_SITES,
  MORAL_STORIES,
  CHILDREN_SONGS,
  SCHOOL_ARTWORKS,
  type FiveTeachingsItem,
  type UncleHoPhotoItem,
  type HistoricalSiteItem,
  type MoralStoryItem,
  type ChildrenSongItem,
} from '../data/hcmKidsSpaceData';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmKidsSpaceViewProps {
  onBackToFoyer?: () => void;
  onOpenMiniQuiz?: () => void;
}

interface GoodDeed {
  id: string;
  title: string;
  teachingNumber: string;
  date: string;
  studentName: string;
  className: string;
  school: string;
}

export const HcmKidsSpaceView: React.FC<HcmKidsSpaceViewProps> = ({
  onBackToFoyer,
  onOpenMiniQuiz,
}) => {
  // Navigation sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'WALL' | 'TEACHINGS' | 'STORIES' | 'SONGS' | 'DIARY' | 'ART'
  >('WALL');

  // Selected item states for inspection modals / view details
  const [selectedTeaching, setSelectedTeaching] = useState<FiveTeachingsItem>(
    FIVE_TEACHINGS_DATA[0]
  );
  const [selectedPhoto, setSelectedPhoto] = useState<UncleHoPhotoItem | null>(null);
  const [selectedSite, setSelectedSite] = useState<HistoricalSiteItem | null>(null);
  const [selectedStory, setSelectedStory] = useState<MoralStoryItem>(MORAL_STORIES[0]);
  const [selectedSong, setSelectedSong] = useState<ChildrenSongItem>(CHILDREN_SONGS[0]);

  // Good Deeds Diary State
  const [goodDeeds, setGoodDeeds] = useState<GoodDeed[]>(() => {
    try {
      const saved = localStorage.getItem('hcm_kids_good_deeds');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        title: 'Nhặt được 20.000 đồng rơi ở sân trường gửi trả thầy Tổng phụ trách',
        teachingNumber: '05',
        date: 'Hôm nay',
        studentName: 'Trần Bảo An',
        className: '4A2',
        school: 'TH Nguyễn Du',
      },
      {
        id: '2',
        title: 'Giúp mẹ quét nhà, rửa chén và gấp quần áo sau khi tan học',
        teachingNumber: '02',
        date: 'Hôm qua',
        studentName: 'Lê Minh Khang',
        className: '3C',
        school: 'TH Phú Cường',
      },
      {
        id: '3',
        title: 'Kèm bạn Nam học yếu môn Toán tiến bộ đạt điểm 9',
        teachingNumber: '03',
        date: '2 ngày trước',
        studentName: 'Nguyễn Hoàng Yến',
        className: '5B',
        school: 'TH Lê Hồng Phong',
      },
    ];
  });

  const [newDeedTitle, setNewDeedTitle] = useState('');
  const [newDeedTeaching, setNewDeedTeaching] = useState('01');
  const [newDeedStudent, setNewDeedStudent] = useState('');
  const [newDeedClass, setNewDeedClass] = useState('');
  const [newDeedSchool, setNewDeedSchool] = useState('TH Nguyễn Du');
  const [showDeedSuccess, setShowDeedSuccess] = useState(false);

  const handleSaveGoodDeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeedTitle.trim()) return;

    hcmSfx.playSuccess();
    const deed: GoodDeed = {
      id: Date.now().toString(),
      title: newDeedTitle.trim(),
      teachingNumber: newDeedTeaching,
      date: new Date().toLocaleDateString('vi-VN'),
      studentName: newDeedStudent.trim() || 'Học sinh Thủ Dầu Một',
      className: newDeedClass.trim() || 'Đội viên',
      school: newDeedSchool,
    };

    const updated = [deed, ...goodDeeds];
    setGoodDeeds(updated);
    try {
      localStorage.setItem('hcm_kids_good_deeds', JSON.stringify(updated));
    } catch {}

    setNewDeedTitle('');
    setShowDeedSuccess(true);
    setTimeout(() => setShowDeedSuccess(false), 3000);
  };

  const handleDeleteDeed = (id: string) => {
    hcmSfx.playClick(400);
    const updated = goodDeeds.filter((d) => d.id !== id);
    setGoodDeeds(updated);
    try {
      localStorage.setItem('hcm_kids_good_deeds', JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-500 via-rose-600 to-rose-700 p-6 text-white shadow-lg relative overflow-hidden">
        {/* Background decorative patterns */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-300/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-300 text-slate-950 px-3 py-0.5 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Smile className="w-3.5 h-3.5" />
                Dành Riêng Cho Thiếu Nhi &amp; Học Sinh
              </span>
              <span className="rounded-full bg-black/30 border border-white/20 text-white px-2.5 py-0.5 text-xs font-semibold">
                Mô hình trường học Thủ Dầu Một
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight drop-shadow-xs">
              Không Gian Văn Hóa Hồ Chí Minh — Thiếu Nhi Vâng Lời Bác
            </h1>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-sans">
              "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người." Nơi các em thiếu nhi, học sinh tìm hiểu 5 Điều Bác Hồ dạy, lắng nghe truyện kể đạo đức, ghi nhận nghìn việc tốt và bồi đắp lòng yêu nước nồng nàn.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            {onOpenMiniQuiz && (
              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(750);
                  onOpenMiniQuiz();
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <Award className="w-4 h-4 text-rose-700" />
                <span>Thi Đố Vui Nhận Giấy Khen</span>
              </button>
            )}

            {onBackToFoyer && (
              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(500);
                  onBackToFoyer();
                }}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold px-3.5 py-2.5 text-xs border border-white/30 backdrop-blur-xs transition-colors cursor-pointer"
              >
                <span>Về sảnh chính</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tabs Nav Pill Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-white/20 mt-5 relative z-10">
          {[
            { id: 'WALL', label: 'Bức Tường Văn Hóa Bác Hồ (Mô hình)', icon: Flag },
            { id: 'TEACHINGS', label: '5 Điều Bác Dạy', icon: Heart },
            { id: 'STORIES', label: 'Truyện Kể Đạo Đức (10 Bài Học)', icon: BookOpen },
            { id: 'SONGS', label: 'Âm Nhạc Tuổi Thơ', icon: Music },
            { id: 'DIARY', label: 'Sổ Tay Hoa Việc Tốt', icon: Sparkles },
            { id: 'ART', label: 'Triển Lãm Tranh Đất Thủ', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  hcmSfx.playClick(600);
                  setActiveSubTab(tab.id as any);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  active
                    ? 'bg-white text-rose-800 shadow-md font-black scale-105'
                    : 'bg-black/20 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHÂN HỆ 1: BỨC TƯỜNG GỖ KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH TRƯỜNG HỌC (ẢNH)    */}
      {/* ========================================================================= */}
      {activeSubTab === 'WALL' && (
        <div className="space-y-6">
          {/* Main Visual Wall Showcase */}
          <div className="rounded-3xl border-4 border-amber-300 bg-gradient-to-b from-[#FDFBF7] via-[#FBF5E8] to-[#F7EED8] p-5 sm:p-8 shadow-2xl relative">
            {/* Top Wooden Plaque Header */}
            <div className="text-center space-y-2 relative pb-6 border-b-2 border-amber-300/80">
              <div className="flex items-center justify-center gap-4 sm:gap-8">
                {/* National Flag */}
                <div className="w-10 sm:w-16 h-7 sm:h-11 rounded-lg bg-red-600 shadow-md border-2 border-amber-400 flex items-center justify-center relative overflow-hidden -rotate-6">
                  <Star className="w-4 sm:w-6 h-4 sm:h-6 text-yellow-300 fill-current" />
                </div>

                <div className="text-center">
                  <span className="text-xs sm:text-sm font-serif italic text-amber-900 font-bold tracking-wide">
                    🌿 Trường học thân thiện · Cháu ngoan Bác Hồ 🌿
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-[#781B26] tracking-tight drop-shadow-xs uppercase">
                    Không Gian Văn Hóa HỒ CHÍ MINH
                  </h2>
                </div>

                {/* Party Flag */}
                <div className="w-10 sm:w-16 h-7 sm:h-11 rounded-lg bg-red-700 shadow-md border-2 border-amber-400 flex items-center justify-center relative overflow-hidden rotate-6">
                  <span className="text-yellow-300 font-bold text-xs sm:text-base">☭</span>
                </div>
              </div>
            </div>

            {/* Split Grid: Left 5 Điều | Center Portrait | Right 4 Ảnh */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
              {/* CỘT TRÁI: 5 ĐIỀU BÁC HỒ DẠY (Bảng gỗ viền nâu) */}
              <div className="lg:col-span-3 rounded-2xl border-2 border-amber-600/40 bg-gradient-to-b from-[#FFFDF9] to-[#F5ECE1] p-4 shadow-md flex flex-col justify-between space-y-3">
                <div className="text-center pb-2 border-b border-amber-300/80">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-700 text-amber-50 font-black text-xs uppercase tracking-wider shadow-xs">
                    5 ĐIỀU BÁC HỒ DẠY
                  </span>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  {FIVE_TEACHINGS_DATA.map((t, idx) => (
                    <div
                      key={t.number}
                      onClick={() => {
                        hcmSfx.playClick(650);
                        setSelectedTeaching(t);
                        setActiveSubTab('TEACHINGS');
                      }}
                      className="group p-2.5 rounded-xl border border-amber-300/70 bg-white hover:bg-amber-50 hover:border-amber-600 transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center gap-2.5"
                    >
                      <span className="w-7 h-7 rounded-lg bg-amber-700 text-white font-black text-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-2xs">
                        {t.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-900 truncate">
                          {t.title}
                        </h4>
                        <p className="text-[10.5px] text-slate-500 line-clamp-1">
                          {t.shortText}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('TEACHINGS')}
                    className="w-full text-center text-xs font-bold text-amber-900 hover:text-rose-800 underline cursor-pointer"
                  >
                    Xem giải nghĩa chi tiết 5 Điều →
                  </button>
                </div>
              </div>

              {/* KHỐI GIỮA: BỨC TRANH TRUNG TÂM BÁC HỒ QUÀNG KHĂN ĐỎ */}
              <div className="lg:col-span-6 rounded-3xl border-4 border-amber-500/60 bg-gradient-to-b from-[#FFFDF8] via-white to-[#FDF5E6] p-5 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 font-serif">
                    VÌ LỢI ÍCH TRĂM NĂM TRỒNG NGƯỜI
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-[#781B26]">
                    "Vì lợi ích mười năm trồng cây,<br />Vì lợi ích trăm năm trồng người."
                  </h3>
                  <span className="text-xs font-serif italic text-slate-500">— Hồ Chí Minh</span>
                </div>

                {/* Main Art Illustration */}
                <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border-2 border-amber-300 group">
                  <img
                    src="/assets/hcm-space/khong-gian-thieu-nhi-wall.jpg"
                    alt="Không gian văn hóa Bác Hồ với thiếu nhi trường học"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-medium text-left leading-snug drop-shadow-md">
                      Mô hình Không gian Văn hóa Bác Hồ thực tế tại các trường học TP. Thủ Dầu Một — Khắc sâu 5 Điều Bác dạy trong lòng mỗi đội viên.
                    </p>
                  </div>
                </div>

                {/* Ribbon Slogan */}
                <div className="w-full rounded-2xl bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 text-amber-100 p-2.5 shadow-md flex items-center justify-center gap-2 border border-amber-300">
                  <span className="text-sm">🌸</span>
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                    Đời đời nhớ ơn Chủ tịch Hồ Chí Minh vĩ đại!
                  </span>
                  <span className="text-sm">🌸</span>
                </div>
              </div>

              {/* CỘT PHẢI: 4 KHUNG ẢNH CỦA BÁC */}
              <div className="lg:col-span-3 rounded-2xl border-2 border-amber-600/40 bg-gradient-to-b from-[#FFFDF9] to-[#F5ECE1] p-4 shadow-md flex flex-col justify-between space-y-3">
                <div className="text-center pb-2 border-b border-amber-300/80">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-700 text-amber-50 font-black text-xs uppercase tracking-wider shadow-xs">
                    HÌNH ẢNH CỦA BÁC
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 flex-1">
                  {UNCLE_HO_PHOTOS.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => {
                        hcmSfx.playClick(600);
                        setSelectedPhoto(photo);
                      }}
                      className="group rounded-xl border border-amber-300/80 bg-white hover:bg-amber-50 p-2 text-center cursor-pointer shadow-2xs hover:shadow-xs transition-all flex flex-col items-center justify-between space-y-1.5"
                    >
                      <div className="w-full aspect-[4/3] rounded-lg bg-amber-100 overflow-hidden relative border border-amber-200">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 group-hover:text-rose-800 leading-tight">
                        {photo.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-amber-900 font-medium">
                    Nhấp vào từng ảnh để đọc câu chuyện ý nghĩa
                  </span>
                </div>
              </div>
            </div>

            {/* ĐÁY: 5 ĐỊA DANH LỊCH SỬ DẤU CHÂN BÁC (Thẻ gỗ hàng ngang) */}
            <div className="pt-6 mt-6 border-t-2 border-amber-300/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-700" />
                  <h4 className="text-sm font-extrabold font-serif text-[#781B26] uppercase">
                    Địa Danh Lịch Sử Gắn Liền Với Bác &amp; Đất Thủ
                  </h4>
                </div>
                <span className="text-xs text-amber-900 font-medium hidden sm:inline">
                  Học sinh cùng hành trình về nguồn
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {HISTORICAL_SITES.map((site) => (
                  <div
                    key={site.id}
                    onClick={() => {
                      hcmSfx.playClick(650);
                      setSelectedSite(site);
                    }}
                    className="p-3 rounded-2xl border-2 border-amber-300/80 bg-white hover:bg-amber-50 hover:border-rose-400 transition-all cursor-pointer shadow-xs hover:-translate-y-1 flex flex-col justify-between text-center space-y-2 group"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-amber-100 border border-amber-200">
                      <img
                        src={site.imageUrl}
                        alt={site.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-rose-800">
                        {site.name}
                      </h5>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {site.province}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 2: 5 ĐIỀU BÁC HỒ DẠY (GIẢI NGHĨA & HÀNH ĐỘNG HỌC ĐƯỜNG)            */}
      {/* ========================================================================= */}
      {activeSubTab === 'TEACHINGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* List 5 Điều bên trái */}
            <div className="md:col-span-5 space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-current" />
                <span>5 Lời Căn Dặn Thiêng Liêng</span>
              </h3>

              {FIVE_TEACHINGS_DATA.map((item) => {
                const active = selectedTeaching.number === item.number;
                return (
                  <div
                    key={item.number}
                    onClick={() => {
                      hcmSfx.playClick(600);
                      setSelectedTeaching(item);
                    }}
                    className={`hcm-flat-card p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                      active
                        ? 'border-rose-500 bg-gradient-to-r from-rose-50 to-amber-50/50 shadow-md ring-2 ring-rose-400/50'
                        : 'border-slate-200 bg-white hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 shadow-xs ${
                          active
                            ? 'bg-rose-700 text-white'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {item.number}
                      </span>
                      <div className="space-y-1 flex-1">
                        <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.shortText}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chi tiết 1 Điều đã chọn bên phải */}
            <div className="md:col-span-7 rounded-3xl border-2 border-rose-200 bg-white p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 text-white font-black text-lg flex items-center justify-center shadow-sm">
                    {selectedTeaching.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                      Điều {selectedTeaching.number} Bác Hồ Dạy
                    </span>
                    <h3 className="text-xl font-black font-serif text-slate-900">
                      {selectedTeaching.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  Thực hành mỗi ngày
                </span>
              </div>

              {/* Ý nghĩa */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Ý nghĩa lời dạy
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
                  {selectedTeaching.meaning}
                </p>
              </div>

              {/* Xuất xứ lịch sử */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Xuất xứ lịch sử
                </h4>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  {selectedTeaching.historicalContext}
                </p>
              </div>

              {/* Hai cột hành động: Tại trường học & Tại gia đình */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <span className="text-xs font-black text-rose-900 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                    Việc làm tại trường học
                  </span>
                  <ul className="space-y-2">
                    {selectedTeaching.schoolActions.map((act, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-emerald-700" />
                    Việc làm tại gia đình
                  </span>
                  <ul className="space-y-2">
                    {selectedTeaching.homeActions.map((act, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Câu chuyện Bác Hồ minh họa */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 space-y-1.5">
                <span className="text-[11px] font-black uppercase text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Câu chuyện minh họa: {selectedTeaching.storyTitle}
                </span>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{selectedTeaching.storyExcerpt}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 3: TRUYỆN KỂ ĐẠO ĐỨC VỀ BÁC HỒ                                    */}
      {/* ========================================================================= */}
      {activeSubTab === 'STORIES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* List truyện bên trái */}
            <div className="md:col-span-4 space-y-2.5">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>Kho Truyện Kể Bác Hồ</span>
              </h3>

              {MORAL_STORIES.map((story) => {
                const active = selectedStory.id === story.id;
                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      hcmSfx.playClick(600);
                      setSelectedStory(story);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      active
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{story.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{story.lesson}</p>
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                      <span>{story.suitableAge}</span>
                      <span>•</span>
                      <span>{story.readingTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chi tiết nội dung truyện bên phải */}
            <div className="md:col-span-8 rounded-3xl border-2 border-amber-300 bg-white p-6 shadow-md space-y-5">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  Truyện kể đạo đức thiếu nhi
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
                  {selectedStory.title}
                </h3>
                <p className="text-xs text-rose-700 font-bold">
                  Bài học: {selectedStory.lesson}
                </p>
              </div>

              {/* Toàn văn truyện */}
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-serif bg-amber-50/30 p-5 rounded-2xl border border-amber-100">
                {selectedStory.content}
              </div>

              {/* Bài học rút ra */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Bài học rút ra cho chúng em
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedStory.moralLesson}
                </p>
              </div>

              {/* Câu hỏi tương tác */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Câu hỏi thảo luận cùng thầy cô và bạn bè:
                </span>
                <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-700">
                  {selectedStory.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 4: ÂM NHẠC TUỔI THƠ                                                */}
      {/* ========================================================================= */}
      {activeSubTab === 'SONGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Danh sách bài hát */}
            <div className="md:col-span-5 space-y-2.5">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Music className="w-5 h-5 text-rose-600" />
                <span>Những Giai Điệu Khắc Sâu Trong Tim</span>
              </h3>

              {CHILDREN_SONGS.map((song) => {
                const active = selectedSong.id === song.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => {
                      hcmSfx.playClick(600);
                      setSelectedSong(song);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      active
                        ? 'border-rose-500 bg-rose-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-rose-300'
                    }`}
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{song.title}</h4>
                    <p className="text-[11px] text-slate-500">{song.composer} · {song.year}</p>
                    <p className="text-[10.5px] text-rose-700 italic truncate pt-1">
                      "{song.famousLyrics}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Lời bài hát & hoàn cảnh sáng tác */}
            <div className="md:col-span-7 rounded-3xl border-2 border-rose-200 bg-white p-6 shadow-md space-y-5">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full">
                  Bài ca đi cùng năm tháng
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
                  {selectedSong.title}
                </h3>
                <p className="text-xs text-slate-600">
                  Sáng tác: <strong>{selectedSong.composer}</strong> ({selectedSong.year})
                </p>
              </div>

              {/* Lời bài hát */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-amber-700" />
                  Lời bài hát:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-serif whitespace-pre-line leading-relaxed italic">
                  {selectedSong.fullLyrics}
                </p>
              </div>

              {/* Hoàn cảnh sáng tác */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 uppercase">
                  Hoàn cảnh ra đời của tác phẩm:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedSong.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 5: SỔ TAY "BÔNG HOA NGHÌN VIỆC TỐT"                               */}
      {/* ========================================================================= */}
      {activeSubTab === 'DIARY' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center">
                    🌸
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Sổ Tay "Bông Hoa Nghìn Việc Tốt" Thiếu Nhi Đất Thủ
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  Mỗi ngày một việc tốt dâng lên Bác Hồ kính yêu. Các em tự giác ghi nhận những việc tử tế đã làm tại trường và tại nhà.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 bg-emerald-100/80 px-4 py-2 rounded-2xl border border-emerald-300">
                <Award className="w-5 h-5 text-emerald-700" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Tổng hoa việc tốt
                  </span>
                  <span className="text-lg font-black text-emerald-950">
                    {goodDeeds.length} việc tốt
                  </span>
                </div>
              </div>
            </div>

            {/* Form ghi nhận việc tốt mới */}
            <form onSubmit={handleSaveGoodDeed} className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-3">
              <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                Ghi nhận việc tốt của em hôm nay:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Họ và tên học sinh (vd: Nguyễn Mai Anh)..."
                  value={newDeedStudent}
                  onChange={(e) => setNewDeedStudent(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                />

                <input
                  type="text"
                  placeholder="Lớp (vd: 4A1, 6/2)..."
                  value={newDeedClass}
                  onChange={(e) => setNewDeedClass(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                />

                <select
                  value={newDeedSchool}
                  onChange={(e) => setNewDeedSchool(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                >
                  <option value="TH Nguyễn Du">Trường TH Nguyễn Du</option>
                  <option value="TH Phú Cường">Trường TH Phú Cường</option>
                  <option value="TH Lê Hồng Phong">Trường TH Lê Hồng Phong</option>
                  <option value="THCS Chu Văn An">Trường THCS Chu Văn An</option>
                  <option value="THCS Phú Cường">Trường THCS Phú Cường</option>
                  <option value="Khác">Trường khác tại Thủ Dầu Một</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    required
                    placeholder="Em đã làm được việc tốt gì hôm nay? (vd: Giúp bạn qua đường, nhặt rác sân trường, quét nhà giúp mẹ)..."
                    value={newDeedTitle}
                    onChange={(e) => setNewDeedTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <select
                  value={newDeedTeaching}
                  onChange={(e) => setNewDeedTeaching(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                >
                  <option value="01">Theo Điều 1: Yêu Tổ quốc, đồng bào</option>
                  <option value="02">Theo Điều 2: Học tốt, lao động tốt</option>
                  <option value="03">Theo Điều 3: Đoàn kết, kỷ luật tốt</option>
                  <option value="04">Theo Điều 4: Giữ vệ sinh thật tốt</option>
                  <option value="05">Theo Điều 5: Khiêm tốn, thật thà</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-1">
                {showDeedSuccess ? (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã lưu vào Sổ tay nghìn việc tốt! Bác Hồ khen em ngoan!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Mỗi việc tốt là một bông hoa đẹp dâng lên Bác
                  </span>
                )}

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Ghi Vào Sổ Vàng
                </button>
              </div>
            </form>

            {/* Danh sách việc tốt đã ghi nhận */}
            <div className="space-y-2 pt-3">
              <h4 className="text-xs font-black uppercase text-slate-500">
                Nhật ký việc tốt gần đây của thiếu nhi:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goodDeeds.map((deed) => (
                  <div
                    key={deed.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="rounded-md bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5">
                          Điều {deed.teachingNumber}
                        </span>
                        <span className="text-slate-400">{deed.date}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        {deed.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-rose-700">
                        {deed.studentName} ({deed.className} · {deed.school})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteDeed(deed.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Xóa việc tốt này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 6: TRIỂN LÃM TRANH VẼ BÁC HỒ CỦA THIẾU NHI THỦ DẦU MỘT            */}
      {/* ========================================================================= */}
      {activeSubTab === 'ART' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-r from-rose-50 via-white to-amber-50 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase text-rose-700">
                  Phòng Tranh Thiếu Nhi Đất Thủ
                </span>
                <h3 className="text-xl font-black font-serif text-slate-900">
                  Bác Hồ Trong Trái Tim Tuổi Thơ
                </h3>
              </div>
              <span className="text-xs text-slate-600 font-medium hidden sm:inline">
                Tuyển chọn tranh vẽ học sinh Tiểu học &amp; THCS Thủ Dầu Một
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SCHOOL_ARTWORKS.map((art) => (
                <div
                  key={art.id}
                  className="rounded-2xl border-2 border-amber-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-amber-100 relative overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 right-2 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 shadow-xs">
                      {art.award}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 pt-0.5">
                        {art.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[10.5px]">
                      <span className="font-bold text-rose-800 block">{art.studentName} ({art.gradeClass})</span>
                      <span className="text-slate-500">{art.schoolName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT ẢNH BÁC HỒ                                                  */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 relative border-2 border-amber-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10.5px] font-black uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  Ảnh Tư Liệu Lịch Sử · Năm {selectedPhoto.year}
                </span>
                <h3 className="text-lg font-bold font-serif text-slate-900 pt-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedPhoto.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
              {selectedPhoto.description}
            </p>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-xs font-serif italic font-bold text-rose-900">
                "{selectedPhoto.quote}"
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT ĐỊA DANH LỊCH SỬ                                            */}
      {/* ========================================================================= */}
      {selectedSite && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedSite(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 relative border-2 border-amber-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10.5px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                  {selectedSite.province} · {selectedSite.yearPeriod}
                </span>
                <h3 className="text-lg font-bold font-serif text-slate-900 pt-1">
                  {selectedSite.name}
                </h3>
                <p className="text-xs text-rose-700 font-bold">{selectedSite.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSite(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedSite.imageUrl}
                alt={selectedSite.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedSite.summary}
            </p>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[11px] font-bold text-amber-900 uppercase block">
                Ý nghĩa đối với thế hệ măng non:
              </span>
              <p className="text-xs text-slate-700 italic">
                {selectedSite.childhoodConnection}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>{selectedSite.address}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
