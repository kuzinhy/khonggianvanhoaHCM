import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Check,
  Clock,
  Copy,
  Edit3,
  ExternalLink,
  Film,
  Headphones,
  History,
  Image as ImageIcon,
  Landmark,
  MapPin,
  Pause,
  Play,
  Plus,
  Radio,
  ScrollText,
  Search,
  SkipBack,
  SkipForward,
  Sparkles,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { HcmQuoteCardGeneratorModal } from './HcmQuoteCardGeneratorModal';
import { HcmMultimediaMasterView } from './HcmMultimediaMasterView';
import { vietnameseMatch } from '../utils/vietnameseSearch';
import {
  AUDIO_ARCHIVE_4,
  BIO_CHAPTERS,
  CLASSIC_WORK_DEEP_READS,
  CLASSIC_WORKS_15,
  HCM_EBOOKS_SELECT_8,
  HCM_PHOTO_GALLERY,
  HCM_STORIES_5,
  HISTORICAL_ERAS,
  HISTORICAL_EVENTS_30,
  TOAN_TAP_VOLUMES,
  VERIFIED_QUOTES_12,
  VIDEO_DOCUMENTARIES_11,
  type ClassicWorkDeepRead,
  type HcmEbookItem,
  type HcmPhotoGalleryItem,
  type HcmStoryItem,
  type VideoDocumentaryItem,
} from '../hcmCoreDataset';
import {
  NATIONAL_TREASURES_COLLECTION,
  EXPANDED_HCM_STORIES_10,
  type NationalTreasureItem,
  type ExpandedStoryItem,
} from '../data/hcmTreasuresAndStoriesData';
import {
  HCM_MUSEUM_PUBLICATIONS,
  MUSEUM_CATEGORIES_CONFIG,
  HCM_TOAN_TAP_PDF_LINKS,
  type MuseumPublicationItem,
  type MuseumPubCategory,
} from '../data/hcmMuseumLibraryData';
import {
  HCM_MUSEUM_PHOTO_ALBUMS,
  type HistoricalPhotoDetailItem,
  type MuseumPhotoAlbumItem,
} from '../data/hcmMuseumPhotosData';
import type { HcmCulturalEntryDto } from '../hcmSpaceClient';

export const HcmBiographyChaptersView: React.FC = () => {
  const [selectedId, setSelectedId] = useState(BIO_CHAPTERS[0].id);
  const [query, setQuery] = useState('');
  const [showFullProse, setShowFullProse] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return BIO_CHAPTERS;
    return BIO_CHAPTERS.filter((c) =>
      vietnameseMatch(`${c.code} ${c.title} ${c.summary} ${c.fullProse}`, q)
    );
  }, [query]);

  const active = filtered.find((c) => c.id === selectedId) || filtered[0] || BIO_CHAPTERS[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3.5">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tra cứu từ khóa trong 06 chương Cuộc đời – Sự nghiệp..."
            className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] pl-9 pr-3 py-1.5 text-xs"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFullProse((v) => !v)}
          className="rounded-xl border border-blue-200 bg-[#EFF6FF] px-3 py-1.5 text-xs font-bold text-blue-700 cursor-pointer"
        >
          {showFullProse ? 'Thu gọn tóm tắt' : 'Xem toàn văn diễn giải chương'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {filtered.map((ch) => {
          const isSelected = ch.id === active.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setSelectedId(ch.id)}
              className={`rounded-2xl border p-3 text-left transition-colors cursor-pointer ${
                isSelected ? 'border-rose-600 bg-rose-50/70 shadow-xs' : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <span className={`text-[10.5px] font-black ${isSelected ? 'text-rose-700' : 'text-blue-700'}`}>
                {ch.code} ({ch.period})
              </span>
              <p className="mt-1 text-xs font-extrabold text-slate-900 line-clamp-2">{ch.title}</p>
            </button>
          );
        })}
      </div>

      <article className="rounded-3xl border border-blue-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-5">
          {active.imageUrl && (
            <div className="md:w-64 shrink-0 space-y-1.5">
              <img
                src={active.imageUrl}
                alt={active.title}
                className="w-full h-48 md:h-52 rounded-2xl object-cover border border-amber-200 bg-[#FBF5EA] shadow-2xs"
              />
              {active.imageCaption && (
                <p className="text-[11px] text-slate-500 leading-snug">{active.imageCaption}</p>
              )}
            </div>
          )}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-rose-700 px-2.5 py-1 text-xs font-bold text-white">
                {active.code} · {active.period}
              </span>
              <span className="text-xs font-bold text-blue-700">Nguồn: Biên niên tiểu sử Chủ tịch Hồ Chí Minh</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{active.title}</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{active.summary}</p>
            {showFullProse && (
              <div className="rounded-2xl border border-amber-200 bg-[#FFFDF9] p-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                {active.fullProse}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <p className="text-xs font-bold text-slate-900">Các mốc lịch sử then chốt trong chương:</p>
          <ul className="space-y-1.5">
            {active.keyPoints.map((kp, i) => (
              <li key={i} className="rounded-xl border border-slate-100 bg-[#F8FBFF] px-3 py-2 text-xs text-slate-800">
                {i + 1}. {kp}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};

export const HcmTimeline30View: React.FC<{
  customMilestones: HcmCulturalEntryDto[];
  canEdit: boolean;
  onAddMilestone: () => void;
  onEditEntry: (entry: HcmCulturalEntryDto) => void;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => void;
}> = ({ customMilestones, canEdit, onAddMilestone, onEditEntry, onDeleteEntry }) => {
  const [eraFilter, setEraFilter] = useState<number | 'ALL'>('ALL');
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string>('ev01');

  const filteredEvents = useMemo(() => {
    const q = query.trim();
    return HISTORICAL_EVENTS_30.filter((ev) => {
      if (eraFilter !== 'ALL' && ev.eraId !== eraFilter) return false;
      if (!q) return true;
      return vietnameseMatch(`${ev.date} ${ev.title} ${ev.location} ${ev.summary}`, q);
    });
  }, [eraFilter, query]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm sự kiện, địa danh, năm trong 30 sự kiện chuẩn..."
              className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] pl-9 pr-3 py-1.5 text-xs"
            />
          </div>
          {canEdit && (
            <button
              type="button"
              onClick={onAddMilestone}
              className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Thêm mốc sự kiện địa phương
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setEraFilter('ALL')}
            className={`rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
              eraFilter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
            }`}
          >
            Tất cả 08 thời kỳ (30)
          </button>
          {HISTORICAL_ERAS.map((era) => (
            <button
              key={era.id}
              type="button"
              onClick={() => setEraFilter(era.id)}
              className={`rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                eraFilter === era.id ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
              }`}
            >
              {era.code}: {era.label}
            </button>
          ))}
        </div>
      </div>

      {eraFilter === 8 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-rose-950 space-y-1">
          <p className="font-extrabold">Thời kỳ 8 — Di sản Bất hủ (1969 – Nay)</p>
          <p>
            Năm 1987, UNESCO ban hành Nghị quyết <strong>24C/18.65</strong> tôn vinh Chủ tịch Hồ Chí Minh là
            <em> &ldquo;Anh hùng giải phóng dân tộc và Nhà văn hóa kiệt xuất của Việt Nam&rdquo;</em>. Tư tưởng, đạo đức, phong cách của Người tiếp tục soi đường cho sự nghiệp xây dựng phường Thủ Dầu Một văn minh, hiện đại.
          </p>
        </div>
      )}

      <div className="space-y-2.5">
        {filteredEvents.map((ev) => {
          const open = expandedId === ev.id;
          return (
            <article key={ev.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-3.5">
                {ev.imageUrl && (
                  <img
                    src={ev.imageUrl}
                    alt={ev.title}
                    className="h-24 w-28 shrink-0 rounded-xl object-cover border border-amber-200 bg-[#FBF5EA]"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-rose-700 px-2 py-0.5 text-[11px] font-bold text-white">
                        {ev.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                        <MapPin className="h-3 w-3" /> {ev.location}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpandedId(open ? '' : ev.id)}
                      className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                    >
                      {open ? 'Thu gọn chi tiết' : 'Xem bối cảnh & ý nghĩa'}
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                  <p className="text-xs text-slate-700">{ev.summary}</p>
                </div>
              </div>
              {open && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="rounded-xl bg-[#F8FBFF] p-3">
                    <p className="font-bold text-slate-900">Bối cảnh lịch sử:</p>
                    <p className="text-slate-700 mt-0.5">{ev.context}</p>
                  </div>
                  <div className="rounded-xl bg-[#FFFDF9] p-3 border border-amber-100">
                    <p className="font-bold text-rose-800">Ý nghĩa lịch sử:</p>
                    <p className="text-slate-700 mt-0.5">{ev.significance}</p>
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {customMilestones.length > 0 && (
          <div className="pt-2 space-y-2">
            <p className="text-xs font-extrabold text-blue-800 flex items-center gap-1.5">
              <History className="h-4 w-4" /> Mốc bổ sung của đơn vị ({customMilestones.length})
            </p>
            {customMilestones.map((m) => (
              <article key={m.id} className="rounded-2xl border border-blue-200 bg-[#F8FBFF] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-black text-rose-700">{m.subtitle} · {m.location}</span>
                  <h4 className="text-sm font-extrabold text-slate-900">{m.title}</h4>
                  <p className="text-xs text-slate-700">{m.summary}</p>
                </div>
                {canEdit && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button type="button" onClick={() => onEditEntry(m)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 cursor-pointer">
                      <Edit3 className="h-3 w-3 inline mr-1" />Sửa
                    </button>
                    <button type="button" onClick={() => onDeleteEntry(m)} className="rounded-lg border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-bold text-rose-700 cursor-pointer">
                      <Trash2 className="h-3 w-3 inline mr-1" />Xóa
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const HcmBookshelfView: React.FC<{
  customWorks: HcmCulturalEntryDto[];
  canEdit: boolean;
  onAddWork: () => void;
  onEditEntry: (entry: HcmCulturalEntryDto) => void;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => void;
}> = ({ customWorks, canEdit, onAddWork, onEditEntry, onDeleteEntry }) => {
  const [subTab, setSubTab] = useState<'CLASSICS' | 'TREASURES' | 'MUSEUM_LIB' | 'VOLUMES' | 'EBOOKS' | 'STORIES'>('CLASSICS');
  const [activeMuseumPub, setActiveMuseumPub] = useState<MuseumPublicationItem | null>(null);
  const [museumCat, setMuseumCat] = useState<'ALL' | MuseumPubCategory>('ALL');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeDeepRead, setActiveDeepRead] = useState<ClassicWorkDeepRead | null>(null);
  const [activeStory, setActiveStory] = useState<ExpandedStoryItem | HcmStoryItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedExcerpt, setCopiedExcerpt] = useState(false);
  const [treasureFilter, setTreasureFilter] = useState<string>('ALL');

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const deepReadMap: Record<string, ClassicWorkDeepRead> = useMemo(
    () => ({
      w06: CLASSIC_WORK_DEEP_READS[0], // Tuyên ngôn Độc lập
      w15: CLASSIC_WORK_DEEP_READS[1], // Di chúc
      w11: CLASSIC_WORK_DEEP_READS[2], // Dân vận
      w09: CLASSIC_WORK_DEEP_READS[3], // Sửa đổi lối làm việc
      w07: CLASSIC_WORK_DEEP_READS[4], // Lời kêu gọi toàn quốc kháng chiến
    }),
    []
  );

  const toggleSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn hiện chưa hỗ trợ Web Speech API.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const closeModal = () => {
    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setActiveDeepRead(null);
  };

  const handleOpenDeepReadForWork = (w: (typeof CLASSIC_WORKS_15)[0]) => {
    const match = deepReadMap[w.id];
    if (match) {
      setActiveDeepRead(match);
    } else {
      setActiveDeepRead({
        id: `custom_${w.id}`,
        title: `${w.title} (${w.year})`,
        timeAndPlace: `${w.year} tại ${w.place} (Bút danh: ${w.penName})`,
        historicalContext: `Tác phẩm kinh điển xuất bản năm ${w.year}. Trích ${w.volumeRef}.`,
        keyThemes: w.theses,
        fullTextOrCoreExcerpt: `Tóm tắt nội dung cốt lõi:\n\n${w.summary}\n\nTrích nguồn tham khảo:\n${w.citation}`,
        audioVoiceHint: 'Giọng đọc trang nghiêm chuẩn tiếng Việt',
        tdmTakeaway: `Vận dụng tinh thần tác phẩm "${w.title}" vào thực tiễn rèn luyện đạo đức công vụ và phong cách công tác tại cơ sở Phường Thủ Dầu Một.`,
      });
    }
  };

  const copyCitation = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((p) => (p === id ? null : p)), 1800);
  };

  const q = query.trim().toLowerCase();

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Header Banner Thư Viện Số & Tác Phẩm Kinh Điển */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#4A0E17] text-white p-6 sm:p-7 border-2 border-[#C59A55] shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="space-y-2.5 w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59A55]/20 border border-[#C59A55]/50 text-[#E5D3B2] text-xs font-bold tracking-wider uppercase">
                <BookOpen className="w-3.5 h-3.5 text-[#C59A55]" />
                <span>TỦ SÁCH KINH ĐIỂN &amp; TÀI LIỆU DI SẢN HỒ CHÍ MINH</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[11px] font-semibold">
                <Award className="w-3 h-3 text-amber-400" />
                <span>Trọn Bộ 15 Tập Toàn Tập · 08 Bảo Vật Quốc Gia</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide leading-tight max-w-5xl">
              Thư Viện Số &amp; Tác Phẩm Kinh Điển Hồ Chí Minh
            </h1>

            <p className="font-serif text-sm sm:text-base text-[#E5D3B2] leading-relaxed max-w-5xl">
              Kho tàng trước tác bất hủ của Chủ tịch Hồ Chí Minh: 15 tác phẩm kinh điển định hướng cách mạng, 08 bảo vật quốc gia thiêng liêng, kho tài liệu số hóa Bảo tàng Hồ Chí Minh và 10 chuyện kể rèn luyện đạo đức cách mạng theo Quy định 144-QĐ/TW.
            </p>
          </div>

          <div className="pt-3 border-t border-[#ECC880]/25 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://drive.google.com/drive/folders/1bEa-4p18kE0y9m6WvB7Fv-x9z0A"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C59A55] to-[#b08745] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                <span>Tra Cứu 15 Tập Hồ Chí Minh Toàn Tập (Drive)</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>

              <button
                type="button"
                onClick={() => setSubTab('TREASURES')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-300/30 font-bold text-xs transition-all cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Xem 08 Bảo Vật Quốc Gia &amp; Bút Tích</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-amber-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>15 Tác Phẩm Nền Tảng</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>08 Bảo Vật Quốc Gia</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>10 Bài Học Đạo Đức</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Filter & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSubTab('CLASSICS')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'CLASSICS' ? 'bg-[#751D2C] text-white' : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100'
            }`}
          >
            15 Tác phẩm Kinh điển
          </button>
          <button
            type="button"
            onClick={() => setSubTab('TREASURES')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'TREASURES' ? 'bg-[#751D2C] text-white shadow-xs' : 'bg-[#FAF7F0] text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>Bảo Vật Quốc Gia &amp; Bút Tích (08 Tư liệu)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('MUSEUM_LIB')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'MUSEUM_LIB' ? 'bg-[#751D2C] text-white shadow-xs ring-1 ring-amber-400' : 'bg-[#FAF7F0] text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <Landmark className="h-3.5 w-3.5 text-amber-500" />
            <span>Thư Viện Bảo Tàng HCM (16 Tư liệu)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('VOLUMES')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'VOLUMES' ? 'bg-[#751D2C] text-white' : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100'
            }`}
          >
            Trọn Bộ 15 Tập Toàn tập
          </button>
          <button
            type="button"
            onClick={() => setSubTab('EBOOKS')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'EBOOKS' ? 'bg-[#751D2C] text-white' : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-500" />
            <span>Kho Ebook Số Hóa (08 Tựa)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('STORIES')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'STORIES' ? 'bg-[#751D2C] text-white' : 'bg-[#FAF7F0] text-slate-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-rose-500" />
            <span>10 Chuyện Kể Bác Hồ &amp; Bài Học Đạo Đức</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tập, năm, tác phẩm..."
            className="rounded-xl border border-slate-200 bg-[#F8FBFF] px-3 py-1.5 text-xs w-52"
          />
          {canEdit && (
            <button
              type="button"
              onClick={onAddWork}
              className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Thêm tư liệu sách
            </button>
          )}
        </div>
      </div>

      {subTab === 'CLASSICS' ? (
        <div className="space-y-4">
          {/* Quick Access to 5 Deep-Read Masterpieces */}
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-white to-blue-50/80 p-4 shadow-2xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-rose-700 p-1.5 text-white shadow-xs">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Tủ Sách Chuyên Sâu: 05 Tác Phẩm Kinh Điển Cốt Lõi (Có Luận Điểm Thực Hành 2026)
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Khám phá bối cảnh lịch sử, trích đoạn toàn văn, nghe đọc diễn cảm và bài học hành động tại địa phương.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-[10.5px] font-bold text-rose-800">
                Thực hiện Chỉ thị 07-CT/TW
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {CLASSIC_WORK_DEEP_READS.map((dr) => (
                <button
                  key={dr.id}
                  type="button"
                  onClick={() => setActiveDeepRead(dr)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900 shadow-2xs cursor-pointer transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>{dr.title.split(' (')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid of 15 Classic Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CLASSIC_WORKS_15.filter((w) => !q || `${w.year} ${w.title} ${w.summary}`.toLowerCase().includes(q)).map((w) => {
              const hasFlagshipDeepRead = Boolean(deepReadMap[w.id]);
              return (
                <article key={w.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[11px] font-black text-rose-800">
                        {w.year} · {w.volumeRef}
                      </span>
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{w.title}</h4>
                    <p className="text-[11px] font-semibold text-slate-500">Bút danh: {w.penName} · {w.place}</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{w.summary}</p>
                    <ul className="space-y-1 pt-1">
                      {w.theses.map((t, i) => (
                        <li key={i} className="text-[11px] text-slate-600">• {t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenDeepReadForWork(w)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs cursor-pointer transition-all ${
                        hasFlagshipDeepRead
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'border border-blue-200 bg-[#EFF6FF] text-blue-800 hover:bg-blue-100'
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{hasFlagshipDeepRead ? 'Đọc chuyên sâu & Luận điểm' : 'Xem chi tiết & Luận điểm'}</span>
                    </button>

                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-500 truncate">{w.citation}</span>
                      <button
                        type="button"
                        onClick={() => copyCitation(w.id, w.citation)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shrink-0"
                      >
                        {copiedId === w.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === w.id ? 'Đã chép' : 'Trích dẫn'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {customWorks.map((cw) => (
              <article key={cw.id} className="rounded-2xl border border-blue-200 bg-[#F8FBFF] p-5 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">{cw.subtitle || 'Tư liệu bổ sung'}</span>
                  <h4 className="text-sm font-extrabold text-slate-900">{cw.title}</h4>
                  <p className="text-xs text-slate-700">{cw.summary}</p>
                </div>
                {canEdit && (
                  <div className="flex justify-end gap-1.5 border-t border-slate-200/70 pt-2">
                    <button type="button" onClick={() => onEditEntry(cw)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 cursor-pointer">Sửa</button>
                    <button type="button" onClick={() => onDeleteEntry(cw)} className="rounded-lg border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-bold text-rose-700 cursor-pointer">Xóa</button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      ) : subTab === 'TREASURES' ? (
        <div className="space-y-4">
          {/* Header Banner Bảo Vật Quốc Gia */}
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="rounded-2xl bg-gradient-to-br from-[#751D2C] to-[#5B1522] p-3 text-white shadow-md shrink-0">
                <Award className="h-7 w-7 text-[#C59A55]" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-[#751D2C] font-serif">
                    Bảo Vật Quốc Gia &amp; Bút Tích Lịch Sử Chủ Tịch Hồ Chí Minh
                  </h4>
                  <span className="rounded-full bg-[#751D2C] text-white px-2.5 py-0.5 text-[10px] font-black uppercase shrink-0">
                    Di sản Quốc gia
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Các văn kiện, bút tích và kỷ vật thiêng liêng được Thủ tướng Chính phủ công nhận Bảo vật Quốc gia; bản thảo gốc bảo quản nghiêm ngặt tại Cục Lưu trữ Văn phòng TW Đảng và Bảo tàng Hồ Chí Minh.
                </p>
              </div>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-[#751D2C] text-[11px] uppercase mr-1">Phân loại:</span>
              {[
                { id: 'ALL', label: 'Tất cả (08 tư liệu)' },
                { id: 'BẢO VẬT QUỐC GIA', label: 'Bảo vật Quốc gia' },
                { id: 'BÚT TÍCH VIẾT TAY', label: 'Bút tích Viết tay' },
                { id: 'KỶ VẬT LỊCH SỬ', label: 'Kỷ vật Lịch sử' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  type="button"
                  onClick={() => setTreasureFilter(tf.id)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    treasureFilter === tf.id
                      ? 'bg-[#751D2C] text-white shadow-xs'
                      : 'bg-white border border-[#E5D3B2] text-slate-700 hover:border-[#751D2C]'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of National Treasures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NATIONAL_TREASURES_COLLECTION.filter((tr) => {
              const matchFilter = treasureFilter === 'ALL' || tr.category === treasureFilter;
              const matchQuery =
                !q ||
                `${tr.name} ${tr.category} ${tr.significance} ${tr.historicalContext} ${tr.currentLocation}`
                  .toLowerCase()
                  .includes(q);
              return matchFilter && matchQuery;
            }).map((tr) => (
              <article
                key={tr.id}
                className="rounded-3xl border-2 border-amber-200/80 bg-white p-5 sm:p-6 shadow-xs hover:border-[#751D2C] hover:shadow-lg transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-lg bg-[#751D2C] text-white text-[10.5px] font-bold px-2.5 py-0.5">
                      {tr.category}
                    </span>
                    <span className="text-[11px] font-mono text-amber-900 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                      {tr.decisionNumber}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#262321] leading-snug">
                    {tr.name}
                  </h4>

                  <div className="text-[11.5px] text-slate-600 space-y-1 bg-[#FAF7F0] p-3 rounded-2xl border border-[#E5D3B2]/60">
                    <p>• <strong>Niên đại khởi tạo:</strong> {tr.creationPeriod}</p>
                    <p>• <strong>Nơi lưu giữ hiện vật gốc:</strong> {tr.currentLocation}</p>
                    <p>• <strong>Chất liệu &amp; Quy cách:</strong> {tr.material} ({tr.dimensions})</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#751D2C] uppercase tracking-wider">Ý nghĩa lịch sử cốt lõi:</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{tr.significance}</p>
                  </div>

                  {tr.originalQuote && (
                    <blockquote className="rounded-xl border-l-4 border-[#C59A55] bg-amber-50/70 p-3 text-xs italic text-[#262321] leading-relaxed">
                      “{tr.originalQuote}”
                    </blockquote>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleSpeech(`${tr.name}. ${tr.significance}. ${tr.historicalContext}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold transition-colors cursor-pointer border border-blue-200"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-blue-700" />
                    <span>Nghe thuyết minh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copyCitation(tr.id, `${tr.name} — ${tr.citation}`)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
                  >
                    {copiedId === tr.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                    <span>{copiedId === tr.id ? 'Đã sao chép' : 'Sao chép nguồn'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : subTab === 'MUSEUM_LIB' ? (
        <div className="space-y-4">
          {/* Header Banner Thư viện Bảo tàng Hồ Chí Minh */}
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 p-5 sm:p-6 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="rounded-2xl bg-linear-to-br from-[#751D2C] to-[#5B1522] p-3 text-white shadow-md shrink-0">
                <Landmark className="h-7 w-7 text-[#C59A55]" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-[#751D2C] font-serif">
                    Thư Viện Ấn Phẩm &amp; Công Trình Nghiên Cứu — Bảo Tàng Hồ Chí Minh
                  </h4>
                  <span className="rounded-full bg-[#751D2C] text-white px-2.5 py-0.5 text-[10px] font-black uppercase shrink-0">
                    Nguồn baotanghochiminh.vn
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Hệ thống các công trình nghiên cứu khoa học cơ bản, 15 tập Toàn tập số hóa, bộ Biên niên tiểu sử 10 tập, 4 tập chuyên khảo Phong cách Bác, kỷ yếu gần 1.000 trang và hồ sơ kỷ vật do Bảo tàng Hồ Chí Minh (19 Ngọc Hà, Ba Đình, Hà Nội) ấn hành.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://baotanghochiminh.vn/thu-vien-tai-lieu.htm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold text-xs shadow-xs transition-colors"
              >
                <span>Cổng Thư Viện Bảo Tàng</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://baotanghochiminh.vn/an-pham.htm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs shadow-2xs transition-colors"
              >
                <span>Kho Nghiên Cứu &amp; Ấn Phẩm</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Hộp truy cập nhanh 15 Tập Toàn tập PDF trực tiếp từ máy chủ BTHCM */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-blue-700 text-white p-1.5">
                  <BookOpen className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold text-blue-950">
                  Tải trực tiếp 15 Tập Hồ Chí Minh Toàn Tập (Định dạng PDF gốc từ máy chủ baotanghochiminh.vn):
                </span>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full border border-blue-200">
                15 Tệp PDF đầy đủ
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {HCM_TOAN_TAP_PDF_LINKS.map((t) => (
                <a
                  key={t.vol}
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-100/80 border border-blue-200 text-blue-900 text-[11px] font-bold shadow-2xs transition-colors"
                  title={`Tải Tập ${t.vol} (${t.period}) — Dung lượng ${t.size}`}
                >
                  <span>Tập {t.vol}</span>
                  <span className="text-[10px] text-blue-600 font-normal">({t.period.split(' – ')[0]})</span>
                  <ExternalLink className="h-2.5 w-2.5 text-blue-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-white p-2.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-[#751D2C] text-[11px] uppercase mr-1">Chuyên mục:</span>
            {MUSEUM_CATEGORIES_CONFIG.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setMuseumCat(c.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer text-xs ${
                  museumCat === c.id
                    ? 'bg-[#751D2C] text-white shadow-xs'
                    : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.label} ({c.id === 'ALL' ? HCM_MUSEUM_PUBLICATIONS.length : HCM_MUSEUM_PUBLICATIONS.filter((x) => x.category === c.id).length})
              </button>
            ))}
          </div>

          {/* Grid Cards of 16 Publications */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {HCM_MUSEUM_PUBLICATIONS
              .filter((p) => museumCat === 'ALL' || p.category === museumCat)
              .filter((p) => !q || `${p.title} ${p.code} ${p.subtitle} ${p.authorOrEditor} ${p.summary}`.toLowerCase().includes(q))
              .map((pub) => (
                <article
                  key={pub.id}
                  className="rounded-3xl border border-amber-200/80 bg-white p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-lg bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-black text-amber-900 uppercase">
                        {pub.code} · {pub.categoryLabel}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {pub.publishYear}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#751D2C] font-serif group-hover:text-amber-800 transition-colors leading-snug">
                        {pub.title}
                      </h4>
                      {pub.subtitle && (
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          {pub.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#C59A55]/30 space-y-1 text-[11px] text-slate-600">
                      <div>
                        <strong className="text-slate-800">Cơ quan biên soạn:</strong> {pub.authorOrEditor}
                      </div>
                      <div>
                        <strong className="text-slate-800">Nhà xuất bản:</strong> {pub.publisher}
                        {pub.totalPages && <span> ({pub.totalPages} trang)</span>}
                      </div>
                      {pub.fileSize && (
                        <div>
                          <strong className="text-slate-800">Dung lượng tệp:</strong> {pub.fileSize}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                      {pub.summary}
                    </p>

                    {pub.featuredQuote && (
                      <blockquote className="rounded-xl border-l-4 border-[#C59A55] bg-amber-50/70 p-2.5 text-[11px] italic text-[#262321] leading-relaxed">
                        “{pub.featuredQuote}”
                      </blockquote>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveMuseumPub(pub)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-amber-300" />
                      <span>Xem Mục Lục &amp; Luận Điểm Nghiên Cứu</span>
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleSpeech(`${pub.title}. Cơ quan biên soạn: ${pub.authorOrEditor}. ${pub.summary}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold transition-colors cursor-pointer border border-blue-200 text-[11px]"
                        >
                          <Volume2 className="h-3 w-3 text-blue-700" />
                          <span>Nghe tóm tắt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => copyCitation(pub.id, pub.citationStandard)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer text-[11px]"
                        >
                          {copiedId === pub.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-slate-500" />}
                          <span>{copiedId === pub.id ? 'Đã sao chép' : 'Trích dẫn'}</span>
                        </button>
                      </div>

                      {pub.pdfDownloadUrl && (
                        <a
                          href={pub.pdfDownloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition-colors border border-emerald-200 text-[11px]"
                          title="Tải văn bản số hóa chính thức từ máy chủ Bảo tàng HCM"
                        >
                          <span>Tải PDF/DOC</span>
                          <ExternalLink className="h-2.5 w-2.5 text-emerald-700" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ) : subTab === 'VOLUMES' ? (
        <div className="space-y-4">
          {/* Google Drive 15 Volumes Banner */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-white to-amber-50/80 p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-blue-700 p-2.5 text-white shadow-xs shrink-0">
                  <BookOpen className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Kho Văn Kiện Hồ Chí Minh Toàn Tập (15 Tập - NXB Chính Trị Quốc Gia Sự Thật)
                    </h4>
                    <span className="rounded-full bg-blue-100 border border-blue-300 px-2.5 py-0.5 text-[10.5px] font-bold text-blue-900 shrink-0">
                      Nguồn Cấp A
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Tủ sách điện tử đầy đủ 15 tập (1890–1969) được số hóa nguyên bản trên Google Drive, phục vụ nghiên cứu lý luận, tra cứu tài liệu và sinh hoạt chuyên đề Chi bộ.
                  </p>
                </div>
              </div>
              <a
                href="https://drive.google.com/drive/folders/1KrvSjp_Y1RIFsZC56wWqQG1wvx_S9uOs?hl=vi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Mở Toàn Bộ 15 Tập Trên Google Drive</span>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-blue-100/80 text-[11px] text-slate-600 font-medium">
              <div>✓ 15 Tập toàn văn đầy đủ</div>
              <div>✓ Định dạng PDF số hóa rõ nét</div>
              <div>✓ Trích dẫn chuẩn Cấp A</div>
              <div>✓ Tải về hoặc đọc trực tiếp</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOAN_TAP_VOLUMES.filter((v) => !q || `${v.volume} ${v.period} ${v.highlights}`.toLowerCase().includes(q)).map((v) => (
              <article key={v.volume} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2 hover:border-blue-300 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-blue-600 px-2.5 py-0.5 text-xs font-black text-white">
                      TẬP {String(v.volume).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold text-rose-700">{v.period}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{v.highlights}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <a
                    href="https://drive.google.com/drive/folders/1KrvSjp_Y1RIFsZC56wWqQG1wvx_S9uOs?hl=vi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
                    <span>Đọc Tập {v.volume} trên Google Drive</span>
                  </a>

                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-500 truncate">{v.citation}</span>
                    <button
                      type="button"
                      onClick={() => copyCitation(`vol_${v.volume}`, v.citation)}
                      className="rounded-lg border border-slate-200 px-2 py-1 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shrink-0"
                    >
                      {copiedId === `vol_${v.volume}` ? 'Đã chép' : 'Trích dẫn'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : subTab === 'EBOOKS' ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-blue-50 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-amber-600 p-2 text-white shadow-xs">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Tủ Sách Ebook Số Hóa & Thư Viện Chuyên Khảo Hồ Chí Minh
                </h4>
                <p className="text-xs text-slate-600">
                  Nguồn tích hợp từ Thư viện Khoa học Tổng hợp TP.HCM (500+ đầu sách số) & Tủ sách CEP tại khu nhà trọ công nhân.
                </p>
              </div>
            </div>
            <a
              href="https://khonggianvanhoahochiminh.thuvientphcm.gov.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white hover:bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-2xs"
            >
              <ExternalLink className="h-3.5 w-3.5 text-amber-700" />
              <span>Cổng Thư viện KHTH</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HCM_EBOOKS_SELECT_8.filter(
              (b) => !q || vietnameseMatch(`${b.title} ${b.author} ${b.category} ${b.description}`, q)
            ).map((eb) => (
              <article
                key={eb.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-amber-100 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      {eb.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{eb.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                    {eb.title}
                  </h4>
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p className="font-semibold text-slate-700 truncate">Tác giả: {eb.author}</p>
                    <p className="truncate text-slate-500">NXB: {eb.publisher}</p>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{eb.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <a
                    href={eb.readOnlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 px-3 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Đọc Ebook Trực Tuyến</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-[10px] text-center text-slate-400 truncate">Nguồn: {eb.source}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-amber-50 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-rose-700 p-2 text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  10 Mẩu Chuyện Cảm Động Về Bác Hồ &amp; Bài Học Đạo Đức Cách Mạng
                </h4>
                <p className="text-xs text-slate-600">
                  Tài liệu tuyên truyền sinh hoạt chi bộ, đoàn thể cơ sở gắn chặt với 5 chuẩn mực Quy định 144-QĐ/TW và Chỉ thị 07-CT/TW.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-rose-100 border border-rose-300 px-3 py-1 text-xs font-bold text-rose-800">
              Chỉ thị 07-CT/TW &amp; QĐ 144
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPANDED_HCM_STORIES_10.filter(
              (st) => !q || vietnameseMatch(`${st.title} ${st.topic} ${st.summary} ${st.moralLesson}`, q)
            ).map((st) => (
              <article
                key={st.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-rose-100 border border-rose-200 px-2 py-0.5 text-[10.5px] font-bold text-rose-800">
                      {st.topic}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{st.period}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{st.summary}</p>

                  <div className="rounded-xl border border-amber-200 bg-[#FFFDF9] p-2.5 space-y-1">
                    <p className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-600" /> Bài học rèn luyện (QĐ 144):
                    </p>
                    <p className="text-[11px] text-slate-700 italic line-clamp-2">"{st.moralLesson}"</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveStory(st)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 px-3 py-1.5 text-xs font-bold text-white shadow-2xs cursor-pointer transition-colors"
                  >
                    <ScrollText className="h-3.5 w-3.5" />
                    <span>Đọc Toàn Văn Câu Chuyện</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 truncate">Nguồn: {st.source}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Deep-Read Modal Viewer */}
      {activeDeepRead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-amber-300 bg-white shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-400 text-rose-950 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
                    Văn kiện Kinh điển
                  </span>
                  <span className="text-xs text-amber-200">Không gian Văn hóa Hồ Chí Minh</span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-snug">{activeDeepRead.title}</h3>
                <p className="text-xs text-rose-100 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-300 shrink-0" /> {activeDeepRead.timeAndPlace}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer transition-colors"
                title="Đóng cửa sổ"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {/* Bối cảnh lịch sử */}
              <section className="space-y-1.5 rounded-2xl border border-blue-200 bg-[#F8FBFF] p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <History className="h-4 w-4 text-blue-700" /> Bối cảnh Lịch sử Ra đời
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{activeDeepRead.historicalContext}</p>
              </section>

              {/* Luận điểm cốt lõi */}
              <section className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Các Luận điểm Cốt lõi &amp; Giá trị Định hướng
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeDeepRead.keyThemes.map((theme, idx) => (
                    <div key={idx} className="rounded-xl border border-rose-100 bg-rose-50/50 p-3 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
                      <span className="rounded-full bg-rose-700 text-white font-bold h-5 w-5 shrink-0 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{theme}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Trích đoạn toàn văn */}
              <section className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <ScrollText className="h-4 w-4 text-amber-700" /> Toàn văn / Trích đoạn Tiêu biểu
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSpeech(activeDeepRead.fullTextOrCoreExcerpt)}
                      className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold border transition-colors cursor-pointer ${
                        isSpeaking
                          ? 'border-rose-400 bg-rose-100 text-rose-900 animate-pulse'
                          : 'border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      <span>{isSpeaking ? 'Dừng đọc' : 'Nghe diễn cảm'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(activeDeepRead.fullTextOrCoreExcerpt).catch(() => {});
                        setCopiedExcerpt(true);
                        setTimeout(() => setCopiedExcerpt(false), 1800);
                      }}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      {copiedExcerpt ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedExcerpt ? 'Đã sao chép' : 'Chép trích đoạn'}</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-amber-200/90 bg-[#FFFDF9] p-5 font-serif text-xs sm:text-sm text-slate-800 leading-loose shadow-inner whitespace-pre-line border-l-4 border-l-rose-700">
                  {activeDeepRead.fullTextOrCoreExcerpt}
                </div>
                {activeDeepRead.audioVoiceHint && (
                  <p className="text-[11px] text-slate-500 italic flex items-center gap-1">
                    <Headphones className="h-3 w-3 text-slate-400" /> Gợi ý ngữ điệu: {activeDeepRead.audioVoiceHint}
                  </p>
                )}
              </section>

              {/* Ý nghĩa vận dụng địa phương */}
              <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-700" /> Ý nghĩa Vận dụng tại Phường Thủ Dầu Một
                </h4>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  {activeDeepRead.tdmTakeaway}
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                Tuyên giáo Số · Chỉ thị số 07-CT/TW ngày 13/7/2026
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-2 text-xs font-bold text-white cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-rose-300 bg-white shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-400 text-rose-950 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
                    {activeStory.topic}
                  </span>
                  <span className="text-xs text-amber-200">{activeStory.period}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-snug">{activeStory.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                  setActiveStory(null);
                }}
                className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer transition-colors"
                title="Đóng cửa sổ"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Story Content */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <span className="text-xs text-slate-500 font-semibold italic">Tư liệu: {activeStory.source}</span>
                <button
                  type="button"
                  onClick={() => toggleSpeech(activeStory.fullStory)}
                  className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold border transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'border-rose-400 bg-rose-100 text-rose-900 animate-pulse'
                      : 'border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  <span>{isSpeaking ? 'Dừng đọc' : 'Nghe giọng đọc'}</span>
                </button>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-[#FFFDF9] p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-serif">
                {activeStory.fullStory}
              </div>

              {/* Moral Lesson */}
              <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" /> Bài học rèn luyện cho Cán bộ, Đảng viên (Chỉ thị 07-CT/TW &amp; Quy định 144-QĐ/TW)
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {activeStory.moralLesson}
                </p>
                {(activeStory as any).applicationForOfficials && (
                  <div className="pt-2 border-t border-amber-200/80 text-xs text-amber-950 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-amber-200">
                    <strong className="text-[#751D2C]">Vận dụng thực tiễn tại cơ sở:</strong> {(activeStory as any).applicationForOfficials}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Không gian Văn hóa Hồ Chí Minh · Tuyên giáo Số</span>
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                  setActiveStory(null);
                }}
                className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Chi Tiết Ấn Phẩm Nghiên Cứu Bảo Tàng Hồ Chí Minh */}
      {activeMuseumPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div
              className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] p-5 text-white flex items-start justify-between gap-4 shadow-md"
              style={{ backgroundColor: '#751D2C' }}
            >
              <div className="space-y-1">
                <span className="rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  {activeMuseumPub.code} · {activeMuseumPub.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">
                  {activeMuseumPub.title}
                </h3>
                {activeMuseumPub.subtitle && (
                  <p className="text-xs text-amber-200 font-medium">
                    {activeMuseumPub.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                  setActiveMuseumPub(null);
                }}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-[13px] text-slate-700 leading-relaxed">
              {/* Thông tin xuất bản */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200 text-xs">
                <div>
                  <span className="font-bold text-[#751D2C]">Cơ quan biên soạn:</span>
                  <div className="text-slate-800 font-medium">{activeMuseumPub.authorOrEditor}</div>
                </div>
                <div>
                  <span className="font-bold text-[#751D2C]">Nhà xuất bản &amp; Năm:</span>
                  <div className="text-slate-800 font-medium">{activeMuseumPub.publisher} ({activeMuseumPub.publishYear})</div>
                </div>
                {activeMuseumPub.totalPages && (
                  <div>
                    <span className="font-bold text-[#751D2C]">Quy mô công trình:</span>
                    <div className="text-slate-800 font-medium">{activeMuseumPub.totalPages} trang nghiên cứu</div>
                  </div>
                )}
                <div>
                  <span className="font-bold text-[#751D2C]">Nguồn gốc dữ liệu:</span>
                  <div className="text-slate-800 font-medium">Bảo tàng Hồ Chí Minh (baotanghochiminh.vn)</div>
                </div>
              </div>

              {/* Tóm tắt */}
              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 text-[#751D2C]">
                  Tóm Tắt Giá Trị Lịch Sử &amp; Học Thuật:
                </h5>
                <p className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed">
                  {activeMuseumPub.summary}
                </p>
              </div>

              {/* Mục lục các chương / các tập */}
              {activeMuseumPub.tableOfContentsOrChapters && activeMuseumPub.tableOfContentsOrChapters.length > 0 && (
                <div>
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 text-[#751D2C]">
                    Mục Lục Các Tập / Các Chương Chính:
                  </h5>
                  <div className="space-y-1.5 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#C59A55]/30">
                    {activeMuseumPub.tableOfContentsOrChapters.map((ch, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="text-[#C59A55] font-bold shrink-0">•</span>
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Luận điểm khoa học */}
              {activeMuseumPub.keyHistoricalInsights && (
                <div>
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 text-[#751D2C]">
                    Điểm Mới &amp; Đóng Góp Khoa Học Nổi Bật:
                  </h5>
                  <div className="space-y-1.5 bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200">
                    {activeMuseumPub.keyHistoricalInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-blue-950 font-medium">
                        <span className="text-blue-600 font-bold shrink-0">✓</span>
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vận dụng cơ sở Thủ Dầu Một */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-3.5 space-y-1">
                <span className="font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Vận Dụng Tại Đảng Bộ &amp; Phường Thủ Dầu Một (Thực hiện Chỉ thị 07 &amp; QĐ 144):
                </span>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {activeMuseumPub.localApplicationForTDM}
                </p>
              </div>

              {/* Trích dẫn chuẩn */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                <span className="font-bold text-slate-700 text-xs uppercase">Trích dẫn khoa học chuẩn (MLA / APA):</span>
                <div className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200 select-all">
                  {activeMuseumPub.citationStandard}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSpeech(`${activeMuseumPub.title}. ${activeMuseumPub.summary}. Vận dụng tại địa phương: ${activeMuseumPub.localApplicationForTDM}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{isSpeaking ? 'Dừng đọc' : 'Nghe thuyết minh'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyCitation(activeMuseumPub.id, activeMuseumPub.citationStandard)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  {copiedId === activeMuseumPub.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedId === activeMuseumPub.id ? 'Đã sao chép' : 'Sao chép trích dẫn'}</span>
                </button>

                {activeMuseumPub.pdfDownloadUrl && (
                  <a
                    href={activeMuseumPub.pdfDownloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                  >
                    <span>Tải tệp số hóa ({activeMuseumPub.fileSize || 'PDF'})</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeMuseumPub.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
                >
                  <span>Cổng BTHCM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                    setActiveMuseumPub(null);
                  }}
                  className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const HcmQuotes12View: React.FC<{
  customQuotes: HcmCulturalEntryDto[];
  canEdit: boolean;
  onAddQuote: () => void;
  onEditEntry: (entry: HcmCulturalEntryDto) => void;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => void;
}> = ({ customQuotes, canEdit, onAddQuote, onEditEntry, onDeleteEntry }) => {
  const themes = ['Tất cả chuyên đề', 'Đại đoàn kết', 'Dân vận', 'Cán bộ & Đạo đức', 'Độc lập tự do', 'Thi đua ái quốc', 'Thanh niên & Giáo dục'] as const;
  const [themeFilter, setThemeFilter] = useState<string>('Tất cả chuyên đề');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedQuoteForModal, setSelectedQuoteForModal] = useState<any | null>(null);

  const visibleQuotes =
    themeFilter === 'Tất cả chuyên đề'
      ? VERIFIED_QUOTES_12
      : VERIFIED_QUOTES_12.filter((q) => q.theme === themeFilter);

  const copyQuote = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((p) => (p === id ? null : p)), 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {themes.map((th) => (
            <button
              key={th}
              type="button"
              onClick={() => setThemeFilter(th)}
              className={`rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                themeFilter === th ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
              }`}
            >
              {th}
            </button>
          ))}
        </div>
        {canEdit && (
          <button
            type="button"
            onClick={onAddQuote}
            className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Thêm lời dạy / chuyên đề
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleQuotes.map((q) => (
          <article key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-md bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
                {q.theme}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedQuoteForModal(q)}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 px-2 py-1 text-[11px] font-bold cursor-pointer transition-colors"
                  title="Tạo thiệp di sản Lời Bác dạy để chia sẻ"
                >
                  <Sparkles className="h-3 w-3 text-gold-sacred" />
                  <span>Tạo thiệp</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyQuote(q.id, `"${q.quote}" — ${q.source}`)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {copiedId === q.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedId === q.id ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
            <p className="text-xs text-slate-600">Bối cảnh: {q.context}</p>
            <p className="text-[11px] font-semibold text-blue-700 flex items-center gap-1.5">
              <ScrollText className="h-3.5 w-3.5 shrink-0" />
              <span>{q.source}</span>
            </p>
          </article>
        ))}

        {customQuotes.map((cq) => (
          <article key={cq.id} className="rounded-2xl border border-blue-200 bg-[#F8FBFF] p-5 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">{cq.subtitle || 'Lời dạy bổ sung'}</span>
              {canEdit && (
                <div className="flex gap-1">
                  <button type="button" onClick={() => onEditEntry(cq)} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-700 cursor-pointer">Sửa</button>
                  <button type="button" onClick={() => onDeleteEntry(cq)} className="rounded-lg border border-rose-200 bg-white px-2 py-1 text-[11px] font-bold text-rose-700 cursor-pointer">Xóa</button>
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-900">&ldquo;{cq.title}&rdquo;</p>
            {cq.location && <p className="text-[11px] text-slate-600">{cq.location}</p>}
          </article>
        ))}
      </div>

      {/* Shareable Heritage Quote Card Modal */}
      <HcmQuoteCardGeneratorModal
        isOpen={!!selectedQuoteForModal}
        onClose={() => setSelectedQuoteForModal(null)}
        initialQuote={selectedQuoteForModal || undefined}
      />
    </div>
  );
};

export const HcmMediaLibraryView: React.FC = () => {
  const [subTab, setSubTab] = useState<'MULTIMEDIA' | 'MUSEUM_PHOTOS' | 'PHOTOS' | 'VIDEO' | 'AUDIO'>('MULTIMEDIA');
  const [selectedMuseumAlbumId, setSelectedMuseumAlbumId] = useState<string>('ALL');
  const [lightboxHistoricalPhoto, setLightboxHistoricalPhoto] = useState<HistoricalPhotoDetailItem | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [rate, setRate] = useState<number>(1);
  const [videoTopic, setVideoTopic] = useState<string>('Tất cả chủ đề');
  const [selectedVideo, setSelectedVideo] = useState<VideoDocumentaryItem>(VIDEO_DOCUMENTARIES_11[0]);
  const [clipMode, setClipMode] = useState<'REEL' | 'YOUTUBE'>('REEL');
  const [sceneIdx, setSceneIdx] = useState<number>(0);
  const [reelPlaying, setReelPlaying] = useState<boolean>(false);
  const [voiceWithReel, setVoiceWithReel] = useState<boolean>(true);
  const [photoCat, setPhotoCat] = useState<string>('Tất cả ảnh');
  const [lightboxPhoto, setLightboxPhoto] = useState<HcmPhotoGalleryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allHistoricalPhotos = useMemo(() => {
    return HCM_MUSEUM_PHOTO_ALBUMS.flatMap((a) => a.photos);
  }, []);

  const visibleHistoricalPhotos = useMemo(() => {
    if (selectedMuseumAlbumId === 'ALL') return allHistoricalPhotos;
    const album = HCM_MUSEUM_PHOTO_ALBUMS.find((a) => a.id === selectedMuseumAlbumId);
    return album ? album.photos : allHistoricalPhotos;
  }, [selectedMuseumAlbumId, allHistoricalPhotos]);

  const activeAlbum = useMemo(() => {
    return HCM_MUSEUM_PHOTO_ALBUMS.find((a) => a.id === selectedMuseumAlbumId) || null;
  }, [selectedMuseumAlbumId]);

  const topics = ['Tất cả chủ đề', ...Array.from(new Set(VIDEO_DOCUMENTARIES_11.map((v) => v.topic)))];
  const filteredVideos =
    videoTopic === 'Tất cả chủ đề'
      ? VIDEO_DOCUMENTARIES_11
      : VIDEO_DOCUMENTARIES_11.filter((v) => v.topic === videoTopic);

  const photoCategories = ['Tất cả ảnh', 'Di tích & Bảo tàng', 'Không gian trưng bày', 'Chuyển đổi số & QR', 'Tư liệu Quốc tế'];
  const visiblePhotos =
    photoCat === 'Tất cả ảnh'
      ? HCM_PHOTO_GALLERY
      : HCM_PHOTO_GALLERY.filter((p) => p.category === photoCat);

  const scenes = selectedVideo.scenes && selectedVideo.scenes.length > 0
    ? selectedVideo.scenes
    : [{ imageUrl: selectedVideo.thumbnailUrl || '/assets/hcm-space/nha-rong.jpg', caption: selectedVideo.title, narration: selectedVideo.summary }];
  const currentScene = scenes[sceneIdx] || scenes[0];

  useEffect(() => {
    setSceneIdx(0);
    setReelPlaying(false);
    if (selectedVideo.youtubeId) {
      setClipMode('YOUTUBE');
    } else {
      setClipMode('REEL');
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (!reelPlaying || clipMode !== 'REEL') return;
    if (voiceWithReel && typeof window !== 'undefined' && 'speechSynthesis' in window && currentScene) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(`${currentScene.caption}. ${currentScene.narration}`);
      u.lang = 'vi-VN';
      u.rate = rate;
      window.speechSynthesis.speak(u);
    }
    const timer = setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % scenes.length);
    }, 6000);
    return () => {
      clearInterval(timer);
    };
  }, [reelPlaying, clipMode, sceneIdx, scenes.length, voiceWithReel, rate, currentScene]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudioRead = (id: string, transcript: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(transcript);
    u.lang = 'vi-VN';
    u.rate = rate;
    u.onend = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-4">
      {/* Sub-navigation bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSubTab('MULTIMEDIA')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'MULTIMEDIA'
                ? 'bg-gradient-to-r from-rose-700 to-rose-900 text-white shadow-xs ring-2 ring-amber-300'
                : 'bg-[#F5F9FF] text-slate-700 hover:bg-rose-50 border border-slate-200'
            }`}
          >
            <Radio className="h-4 w-4 text-amber-300" />
            <span>🌟 00. Đa Phương Tiện &amp; Video Trẻ (TikTok / VOV)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('MUSEUM_PHOTOS')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'MUSEUM_PHOTOS'
                ? 'bg-[#751D2C] text-white shadow-xs ring-1 ring-amber-400'
                : 'bg-[#F5F9FF] text-slate-700 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            <Landmark className="h-4 w-4 text-amber-500" />
            <span>01. Thư Viện Ảnh BTHCM (05 Album Lịch Sử)</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('PHOTOS')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'PHOTOS' ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
            }`}
          >
            <ImageIcon className="h-4 w-4" /> 02. Triển lãm Ảnh Không gian HCM ({HCM_PHOTO_GALLERY.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('VIDEO')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'VIDEO' ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
            }`}
          >
            <Film className="h-4 w-4" /> 03. Kho Clip &amp; Phim Tư liệu (11)
          </button>
          <button
            type="button"
            onClick={() => setSubTab('AUDIO')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer transition-colors ${
              subTab === 'AUDIO' ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
            }`}
          >
            <Headphones className="h-4 w-4" /> 04. Tư liệu Âm thanh &amp; Bản ghi (4)
          </button>
        </div>

        {(subTab === 'AUDIO' || (subTab === 'VIDEO' && clipMode === 'REEL')) && (
          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-slate-600">Tốc độ đọc:</span>
            {[0.85, 1, 1.2].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={`rounded-lg px-2 py-1 font-bold cursor-pointer ${
                  rate === r ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {r}x
              </button>
            ))}
          </div>
        )}
      </div>

      {subTab === 'MULTIMEDIA' && <HcmMultimediaMasterView />}

      {subTab === 'MUSEUM_PHOTOS' && (
        <div className="space-y-4">
          {/* Header Banner Thư viện Ảnh Bảo tàng Hồ Chí Minh */}
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 p-5 sm:p-6 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="rounded-2xl bg-gradient-to-br from-[#751D2C] to-[#5B1522] p-3 text-white shadow-md shrink-0">
                <Landmark className="h-7 w-7 text-[#C59A55]" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-[#751D2C] font-serif">
                    Thư Viện Ảnh Lịch Sử Chủ Tịch Hồ Chí Minh — Bảo Tàng Hồ Chí Minh
                  </h4>
                  <span className="rounded-full bg-[#751D2C] text-white px-2.5 py-0.5 text-[10px] font-black uppercase shrink-0">
                    Nguồn baotanghochiminh.vn
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Kho tư liệu hình ảnh lịch sử chính thống do Bảo tàng Hồ Chí Minh lưu giữ và công bố, phân chia khoa học theo 05 giai đoạn cách mạng từ thuở thiếu thời tại Nam Đàn đến những năm tháng cuối đời tại Nhà sàn Phủ Chủ tịch.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://baotanghochiminh.vn/hinh-anh.htm"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold text-xs shadow-xs transition-colors"
              >
                <span>Cổng Ảnh Bảo Tàng Hồ Chí Minh</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Bộ lọc chọn Giai đoạn / Album ảnh */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-white p-2.5 rounded-2xl border border-slate-200">
            <span className="font-bold text-[#751D2C] text-[11px] uppercase mr-1">Bộ Album:</span>
            <button
              type="button"
              onClick={() => setSelectedMuseumAlbumId('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer text-xs ${
                selectedMuseumAlbumId === 'ALL'
                  ? 'bg-[#751D2C] text-white shadow-xs'
                  : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tất cả 05 Album ({allHistoricalPhotos.length} ảnh)
            </button>
            {HCM_MUSEUM_PHOTO_ALBUMS.map((alb, idx) => (
              <button
                key={alb.id}
                type="button"
                onClick={() => setSelectedMuseumAlbumId(alb.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer text-xs ${
                  selectedMuseumAlbumId === alb.id
                    ? 'bg-[#751D2C] text-white shadow-xs'
                    : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                GĐ {idx + 1} ({alb.period})
              </button>
            ))}
          </div>

          {/* Khối Album Showcase nếu đang chọn Album cụ thể */}
          {activeAlbum && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-[#751D2C] text-xs uppercase">
                  {activeAlbum.code} · Thời kỳ {activeAlbum.period}
                </span>
                <span className="text-[11px] text-amber-800 font-semibold bg-white px-2 py-0.5 rounded-md border border-amber-200">
                  {activeAlbum.photos.length} hình ảnh tư liệu
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-serif">{activeAlbum.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{activeAlbum.summary}</p>
              <div className="pt-1.5 flex flex-wrap gap-2 text-[11px] text-slate-600">
                {activeAlbum.keyEventsInPeriod.map((evt, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-amber-200/70">
                    <span className="text-[#C59A55] font-bold">•</span>
                    <span>{evt}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Grid Lưới hình ảnh lịch sử */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleHistoricalPhotos.map((photo) => (
              <article
                key={photo.id}
                onClick={() => setLightboxHistoricalPhoto(photo)}
                className="group rounded-3xl border border-slate-200 hover:border-amber-400 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={photo.imageUrl}
                      onError={(e) => {
                        if (photo.fallbackImageUrl) {
                          (e.target as HTMLImageElement).src = photo.fallbackImageUrl;
                        }
                      }}
                      alt={photo.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                      <span className="rounded-md bg-[#751D2C]/90 text-white px-2 py-0.5 text-[10.5px] font-bold shadow-xs">
                        {photo.yearOrPeriod}
                      </span>
                      <span className="rounded-md bg-black/70 text-amber-300 px-2 py-0.5 text-[10.5px] font-medium backdrop-blur-xs">
                        {photo.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#751D2C] transition-colors leading-snug">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                    {photo.localConnectionToTDM && (
                      <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/70 text-[11px] text-emerald-950">
                        <strong className="text-emerald-800">Thủ Dầu Một:</strong> {photo.localConnectionToTDM}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px] font-semibold text-amber-800">Nguồn: Bảo tàng HCM</span>
                  <span className="text-blue-700 font-bold group-hover:underline text-[11px]">Xem chi tiết &amp; Phóng to →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {subTab === 'VIDEO' && (
        <div className="space-y-4">
          {/* Interactive Clip Theatre */}
          <section className="rounded-3xl border border-blue-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-700 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  Đang trình chiếu · {selectedVideo.topic}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{selectedVideo.title}</h3>
                <p className="text-[11px] text-slate-500">{selectedVideo.sourceName} · Thời lượng tham chiếu: {selectedVideo.duration}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedVideo.youtubeId && (
                  <button
                    type="button"
                    onClick={() => {
                      setReelPlaying(false);
                      setClipMode('YOUTUBE');
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer ${
                      clipMode === 'YOUTUBE'
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'border border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                    Phim Tài liệu VTV / YouTube
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setClipMode('REEL')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer ${
                    clipMode === 'REEL'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'border border-blue-200 bg-[#EFF6FF] text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Clip Trình chiếu AI (Offline)
                </button>
              </div>
            </div>

            {clipMode === 'YOUTUBE' && selectedVideo.youtubeId ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 aspect-video max-h-[430px] w-full">
                <iframe
                  title={selectedVideo.title}
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative h-72 sm:h-96 overflow-hidden rounded-2xl border border-amber-200 bg-[#FBF5EA]">
                  <img
                    src={currentScene.imageUrl}
                    alt={currentScene.caption}
                    className={`h-full w-full object-cover transition-transform duration-[5500ms] ease-out ${
                      reelPlaying ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/65 to-transparent p-4 sm:p-5 text-white space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                      <span>Cảnh {sceneIdx + 1}/{scenes.length} · {currentScene.caption}</span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed text-white">{currentScene.narration}</p>
                  </div>
                </div>

                {/* Motion Reel Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-[#F8FBFF] px-3.5 py-2.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSceneIdx((p) => (p - 1 + scenes.length) % scenes.length)}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-700 hover:bg-blue-50 cursor-pointer"
                      title="Cảnh trước"
                    >
                      <SkipBack className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (reelPlaying) {
                          window.speechSynthesis?.cancel();
                          setReelPlaying(false);
                        } else {
                          setReelPlaying(true);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-bold text-white cursor-pointer ${
                        reelPlaying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {reelPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      <span>{reelPlaying ? 'Tạm dừng Clip' : 'Phát Clip Trình chiếu'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSceneIdx((p) => (p + 1) % scenes.length)}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-700 hover:bg-blue-50 cursor-pointer"
                      title="Cảnh tiếp"
                    >
                      <SkipForward className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={voiceWithReel}
                        onChange={(e) => {
                          setVoiceWithReel(e.target.checked);
                          if (!e.target.checked) window.speechSynthesis?.cancel();
                        }}
                        className="accent-blue-600"
                      />
                      <span>Đọc lời bình AI kèm phụ đề</span>
                    </label>
                    <div className="flex items-center gap-1">
                      {scenes.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSceneIdx(i)}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            i === sceneIdx ? 'w-6 bg-rose-700' : 'w-2.5 bg-slate-300 hover:bg-blue-400'
                          }`}
                          aria-label={`Chọn cảnh ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Filter & Playlist of 11 Documentaries */}
          <div className="flex flex-wrap items-center gap-1.5">
            {topics.map((tp) => (
              <button
                key={tp}
                type="button"
                onClick={() => setVideoTopic(tp)}
                className={`rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                  videoTopic === tp ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredVideos.map((vid) => {
              const active = vid.id === selectedVideo.id;
              return (
                <article
                  key={vid.id}
                  className={`rounded-2xl border bg-white overflow-hidden shadow-2xs flex flex-col justify-between transition-all ${
                    active ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    {vid.thumbnailUrl && (
                      <div className="relative h-36 w-full bg-[#FBF5EA] overflow-hidden">
                        <img src={vid.thumbnailUrl} alt={vid.title} className="h-full w-full object-cover" loading="lazy" />
                        <span className="absolute left-2.5 top-2.5 rounded-md bg-slate-900/75 px-2 py-0.5 text-[10px] font-bold text-white">
                          {vid.youtubeId ? 'Video YouTube VTV + Clip' : 'Clip Trình chiếu AI'}
                        </span>
                        <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-md bg-slate-950/75 px-2 py-0.5 text-[10px] font-bold text-white">
                          <Clock className="h-3 w-3" /> {vid.duration}
                        </span>
                      </div>
                    )}
                    <div className="p-4 space-y-1.5">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold text-blue-700">{vid.topic}</span>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{vid.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{vid.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-2.5 text-[11px] bg-[#F8FBFF]">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(vid)}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold cursor-pointer ${
                        active ? 'bg-rose-700 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Play className="h-3 w-3" />
                      <span>{active ? 'Đang phát' : 'Phát tại đây'}</span>
                    </button>
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Nguồn gốc
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}


      {subTab === 'PHOTOS' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {photoCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPhotoCat(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  photoCat === cat ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePhotos.map((ph) => (
              <article
                key={ph.id}
                onClick={() => setLightboxPhoto(ph)}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-blue-400 transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-[#FBF5EA]">
                  <img
                    src={ph.imageUrl}
                    alt={ph.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-rose-700/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    {ph.category}
                  </span>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{ph.title}</h4>
                    <p className="text-xs text-slate-600">{ph.caption}</p>
                  </div>
                  <div className="rounded-xl border border-blue-100 bg-[#EFF6FF] p-2.5 text-[11px] text-blue-900">
                    <strong>Ứng dụng Thủ Dầu Một:</strong> {ph.tdmTakeaway}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {lightboxPhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
              onClick={() => setLightboxPhoto(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl rounded-3xl bg-white p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-rose-700">{lightboxPhoto.category} · {lightboxPhoto.sourceRef}</span>
                    <h4 className="text-base font-bold text-slate-900">{lightboxPhoto.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxPhoto(null)}
                    className="rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <img
                  src={lightboxPhoto.imageUrl}
                  alt={lightboxPhoto.title}
                  className="max-h-[65vh] w-full rounded-2xl object-contain bg-[#FBF5EA]"
                />
                <p className="text-xs text-slate-700">{lightboxPhoto.caption}</p>
                <div className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-3 text-xs text-blue-900">
                  <strong>Định hướng áp dụng cho Phường Thủ Dầu Một:</strong> {lightboxPhoto.tdmTakeaway}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {subTab === 'AUDIO' && (
        <div className="space-y-4">
          {/* Sacred Heritage Preservation Header */}
          <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50/90 via-white to-rose-50/80 p-4 shadow-2xs space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-rose-700 p-1.5 text-white shadow-xs">
                <Radio className="h-4 w-4" />
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">
                Kho Bản Ghi Âm Lịch Sử Nguyên Bản Của Chủ Tịch Hồ Chí Minh
              </h4>
              <span className="rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10.5px] font-black text-amber-900">
                Bảo Vật Âm Thanh Quốc Gia
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Nguồn tư liệu gốc: <strong>Đài Tiếng nói Việt Nam (VOV) &amp; Trung tâm Lưu trữ Quốc gia III</strong>. Toàn bộ các bản ghi âm giọng nói của Bác Hồ được <strong>bảo tồn nguyên vẹn 100%</strong> theo đúng âm bản lịch sử, tuyệt đối không sử dụng công nghệ AI để thay thế, tái tạo hay làm sai lệch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIO_ARCHIVE_4.map((au) => {
              return (
                <article key={au.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10.5px] font-bold text-rose-800">
                          {au.date} · {au.duration}
                        </span>
                        <span className="rounded-md bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                          Âm thanh gốc VOV
                        </span>
                      </div>
                      <h4 className="mt-1.5 text-sm font-bold text-slate-900">{au.title}</h4>
                      <p className="text-[11px] text-slate-500">{au.source}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-[#F8FBFF] p-3 text-xs text-slate-700 leading-relaxed font-serif italic">
                    "{au.transcript}"
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-amber-800 font-semibold">
                      🛡️ Bảo tồn nguyên bản 100%
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(au.transcript).catch(() => {});
                        setCopiedId(au.id);
                        setTimeout(() => setCopiedId((p) => (p === au.id ? null : p)), 1800);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      {copiedId === au.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === au.id ? 'Đã chép toàn văn' : 'Sao chép toàn văn'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

  {/* Modal Lightbox Phóng to Ảnh Lịch Sử Bảo Tàng Hồ Chí Minh */}
      {lightboxHistoricalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
          onClick={() => setLightboxHistoricalPhoto(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div
              className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
              style={{ backgroundColor: '#751D2C' }}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
                    Ảnh Lịch Sử · {lightboxHistoricalPhoto.yearOrPeriod}
                  </span>
                  <span className="text-xs text-amber-200 font-medium">{lightboxHistoricalPhoto.location}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">{lightboxHistoricalPhoto.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxHistoricalPhoto(null)}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-200 max-h-[50vh]">
                <img
                  src={lightboxHistoricalPhoto.imageUrl}
                  onError={(e) => {
                    if (lightboxHistoricalPhoto.fallbackImageUrl) {
                      (e.target as HTMLImageElement).src = lightboxHistoricalPhoto.fallbackImageUrl;
                    }
                  }}
                  alt={lightboxHistoricalPhoto.title}
                  className="max-h-[50vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 text-[#751D2C]">
                    Chú Thích &amp; Bối Cảnh Lịch Sử:
                  </h5>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                    {lightboxHistoricalPhoto.caption}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 text-[#751D2C]">
                    Ý Nghĩa Lịch Sử &amp; Giá Trị Thời Đại:
                  </h5>
                  <p className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-slate-800 leading-relaxed">
                    {lightboxHistoricalPhoto.historicalSignificance}
                  </p>
                </div>

                {lightboxHistoricalPhoto.localConnectionToTDM && (
                  <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-3.5 space-y-1">
                    <span className="font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Mối Liên Hệ &amp; Giáo Dục Truyền Thống Tại Phường Thủ Dầu Một:
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {lightboxHistoricalPhoto.localConnectionToTDM}
                    </p>
                  </div>
                )}

                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <strong className="text-slate-700">Nguồn tư liệu:</strong> {lightboxHistoricalPhoto.citation}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleAudioRead(lightboxHistoricalPhoto.id, `${lightboxHistoricalPhoto.title}. ${lightboxHistoricalPhoto.caption}. ${lightboxHistoricalPhoto.historicalSignificance}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{speakingId === lightboxHistoricalPhoto.id ? 'Dừng đọc' : 'Nghe thuyết minh'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(`${lightboxHistoricalPhoto.title} (${lightboxHistoricalPhoto.yearOrPeriod}, ${lightboxHistoricalPhoto.location}) — ${lightboxHistoricalPhoto.caption} [Nguồn: Bảo tàng Hồ Chí Minh]`).catch(() => {});
                    setCopiedId(lightboxHistoricalPhoto.id);
                    setTimeout(() => setCopiedId((p) => (p === lightboxHistoricalPhoto.id ? null : p)), 1800);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  {copiedId === lightboxHistoricalPhoto.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                  <span>{copiedId === lightboxHistoricalPhoto.id ? 'Đã sao chép' : 'Sao chép chú thích'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://baotanghochiminh.vn/hinh-anh.htm"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
                >
                  <span>Cổng Ảnh BTHCM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setLightboxHistoricalPhoto(null)}
                  className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
