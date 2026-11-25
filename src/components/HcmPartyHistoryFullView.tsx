import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Bookmark,
  Search,
  Calendar,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  Flag,
  ArrowRight,
  RotateCcw,
  Maximize2,
  Minimize2,
  Filter,
  Users,
  FileText,
  Clock,
  Landmark,
  ShieldAlert,
  Heart,
  Medal,
} from 'lucide-react';
import {
  TDM_PARTY_VOLUMES,
  TDM_PARTY_SECTIONS,
  TDM_HEROIC_MOTHERS_106,
  TDM_PARTY_COMMITTEES,
  TDM_HEROES_AND_UNITS,
  TDM_WAR_STATISTICS,
  type TdmPartyVolume,
  type TdmPartySectionSummary,
} from '../data/tdmPartyHistorySummary';

interface PageData {
  id: string;
  volumeId: string;
  sectionId: string;
  sourcePdfPage: number;
  mergedPdfPage: number;
  text: string;
  searchText?: string;
  sourceUrl?: string;
}

interface HcmPartyHistoryFullViewProps {
  onBackToFoyer?: () => void;
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

export const HcmPartyHistoryFullView: React.FC<HcmPartyHistoryFullViewProps> = ({
  onBackToFoyer,
}) => {
  // Navigation Sub-tabs: 'READER' | 'SECTIONS' | 'SEARCH' | 'APPENDICES' | 'TIMELINE'
  const [activeTab, setActiveTab] = useState<'READER' | 'SECTIONS' | 'SEARCH' | 'APPENDICES' | 'TIMELINE'>('READER');
  const [selectedVolumeId, setSelectedVolumeId] = useState<string>('volume-1');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('v1-french-2');
  const [currentPageNum, setCurrentPageNum] = useState<number>(36); // Trang mở đầu Chi bộ đầu tiên

  // Full dataset state loaded dynamically
  const [allPages, setAllPages] = useState<PageData[]>([]);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Search Engine states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PageData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Reader utilities
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Appendices tab filter: 'MOTHERS' | 'HEROES' | 'COMMITTEE'
  const [appendixType, setAppendixType] = useState<'MOTHERS' | 'HEROES' | 'COMMITTEE'>('MOTHERS');
  const [mothersSearch, setMothersSearch] = useState('');
  const [mothersWardFilter, setMothersWardFilter] = useState('ALL');

  // Filtered mothers list (106 Bà Mẹ VNAH)
  const filteredMothers = useMemo(() => {
    return TDM_HEROIC_MOTHERS_106.filter((m) => {
      const matchWard = mothersWardFilter === 'ALL' || m.ward === mothersWardFilter;
      const q = mothersSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.ward.toLowerCase().includes(q) ||
        m.martyrs.toLowerCase().includes(q);
      return matchWard && matchSearch;
    });
  }, [mothersSearch, mothersWardFilter]);

  const mothersWardList = useMemo(() => {
    const set = new Set(TDM_HEROIC_MOTHERS_106.map((m) => m.ward));
    return Array.from(set);
  }, []);

  // Load 600 pages dataset dynamically
  useEffect(() => {
    let cancelled = false;
    setIsLoadingPages(true);
    fetch('/data/tdm-party-history/lich-su-dang-bo-thu-dau-mot.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data.pages) {
          setAllPages(data.pages);
          setIsLoadingPages(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('Could not load full json, falling back to summary:', err);
          setLoadError(err.message);
          setIsLoadingPages(false);
        }
      });

    return () => {
      cancelled = true;
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Filter sections by selected volume
  const currentVolumeSections = useMemo(() => {
    return TDM_PARTY_SECTIONS.filter((s) => s.volumeId === selectedVolumeId);
  }, [selectedVolumeId]);

  // Current volume meta
  const currentVolume = useMemo(() => {
    return TDM_PARTY_VOLUMES.find((v) => v.id === selectedVolumeId) || TDM_PARTY_VOLUMES[0];
  }, [selectedVolumeId]);

  // Current section meta
  const currentSection = useMemo(() => {
    return (
      TDM_PARTY_SECTIONS.find((s) => s.id === selectedSectionId) ||
      currentVolumeSections[0] ||
      TDM_PARTY_SECTIONS[0]
    );
  }, [selectedSectionId, currentVolumeSections]);

  // Pages in current volume
  const currentVolumePages = useMemo(() => {
    return allPages.filter((p) => p.volumeId === selectedVolumeId);
  }, [allPages, selectedVolumeId]);

  // Current active page
  const activePage = useMemo(() => {
    if (!currentVolumePages.length) return null;
    return (
      currentVolumePages.find((p) => p.sourcePdfPage === currentPageNum) ||
      currentVolumePages[0]
    );
  }, [currentVolumePages, currentPageNum]);

  // Handle jump to section
  const handleSelectSection = (sectionId: string) => {
    const sec = TDM_PARTY_SECTIONS.find((s) => s.id === sectionId);
    if (!sec) return;
    setSelectedVolumeId(sec.volumeId);
    setSelectedSectionId(sec.id);
    setCurrentPageNum(sec.startPage);
    setActiveTab('READER');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Search Execution
  const handlePerformSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim() || !allPages.length) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const normalized = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    const results = allPages
      .filter((p) => {
        if (!p.text) return false;
        const normText = p.text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return normText.includes(normalized);
      })
      .slice(0, 30);

    setSearchResults(results);
    setIsSearching(false);
  };

  // Toggle Voice
  const handleToggleVoice = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }
    if (!activePage?.text) return;
    const cleanText = activePage.text.replace(/\s+/g, ' ').slice(0, 800);
    if (speakVoice(cleanText, () => setIsSpeaking(false))) {
      setIsSpeaking(true);
    }
  };

  // Copy citation
  const handleCopyCitation = () => {
    if (!activePage) return;
    const citation = `[Trích nguồn: ${currentVolume.title}, Trang ${activePage.sourcePdfPage}]\n\n"${activePage.text.slice(0, 600)}..."\n\n— Không Gian Văn Hóa Hồ Chí Minh · Đảng bộ Phường Thủ Dầu Một`;
    navigator.clipboard?.writeText(citation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-6 space-y-6 select-none font-sans">
      {/* =========================================================================
          1. BANNER TIÊU ĐỀ TRANG TRỌNG CỦA CHUYÊN MỤC
          ========================================================================= */}
      <section className="rounded-3xl border-2 border-rose-300 bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#4F101A] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Glow & Họa tiết Trống đồng Đông Sơn chuẩn nền */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 opacity-20 pointer-events-none">
          <img
            src="/assets/hcm-space/trong-dong-chuan-gold.png"
            alt="Trống đồng chuẩn Đông Sơn"
            className="w-96 h-96 object-contain animate-spin-slow select-none"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-red-700" />
                <span>CHUYÊN ĐỀ LỊCH SỬ ĐẢNG BỘ ĐỊA PHƯƠNG</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-bold border border-amber-300/40">
                Toàn Tập 02 Tập Sách · 600 Trang
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
                Chính thống xuất bản
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide leading-tight">
              Lịch Sử Đảng Bộ Thành Phố Thủ Dầu Một
            </h1>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed max-w-2xl">
              Công trình lịch sử đồ sộ tái hiện chặng đường hơn 90 năm đấu tranh kiên cường, bất khuất của Đảng bộ và quân dân Thủ Dầu Một (1930 – 2020), từ chi bộ cộng sản đầu tiên, qua hai cuộc kháng chiến chống Pháp và chống Mỹ, đến thời kỳ Đổi mới và vươn mình trở thành đô thị loại I văn minh, giàu đẹp.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-amber-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>600 Trang Số Hóa</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>36 Đề Mục Lịch Sử</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Biên niên sự kiện &amp; Mẹ VNAH</span>
              </span>
            </div>
          </div>

          {/* Cụm điều khiển chuyển nhanh Tập 1 / Tập 2 */}
          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-[#ECC880]/40 flex flex-col gap-2.5 shrink-0 min-w-[280px]">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              Chọn Tập Sách Cần Nghiên Cứu:
            </span>

            {TDM_PARTY_VOLUMES.map((vol) => {
              const isSelected = selectedVolumeId === vol.id;
              return (
                <button
                  key={vol.id}
                  type="button"
                  onClick={() => {
                    setSelectedVolumeId(vol.id);
                    const firstSec = TDM_PARTY_SECTIONS.find((s) => s.volumeId === vol.id);
                    if (firstSec) {
                      setSelectedSectionId(firstSec.id);
                      setCurrentPageNum(firstSec.startPage);
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-bold'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider opacity-80">
                      {vol.id === 'volume-1' ? 'TẬP 1 (354 TRANG)' : 'TẬP 2 (246 TRANG)'}
                    </div>
                    <div className="text-xs font-bold truncate">
                      {vol.id === 'volume-1' ? 'Lịch sử ĐB Thị Xã TDM' : 'Lịch sử ĐB Thành Phố (1996–2020)'}
                    </div>
                    <div className="text-[10.5px] opacity-75">{vol.period}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-amber-300'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THANH ĐIỀU HƯỚNG 05 PHÂN HỆ CHUYÊN ĐỀ
          ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-rose-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'READER', label: 'Đọc Toàn Văn 2 Tập', icon: BookOpen },
            { id: 'SECTIONS', label: '36 Đề Mục & Mục Lục', icon: Layers },
            { id: 'SEARCH', label: 'Tra Cứu 600 Trang', icon: Search },
            { id: 'APPENDICES', label: 'Phụ Lục & Mẹ VNAH', icon: Award },
            { id: 'TIMELINE', label: 'Biên Niên Mốc Lịch Sử', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-sm ring-2 ring-[#751D2C]/20'
                    : 'text-slate-900 hover:text-rose-800 hover:bg-gradient-to-br from-white to-rose-50/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-rose-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-600 font-medium flex items-center gap-2 px-2">
          <span>Đang xem: <strong>{currentVolume.title.split('(')[0]}</strong></span>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: TRÌNH ĐỌC TOÀN VĂN SÁCH SỐ HÓA (READER)
          ========================================================================= */}
      {activeTab === 'READER' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cột trái: Cây danh mục 36 đề mục nhảy nhanh */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-rose-200/80 p-4 shadow-sm space-y-3 max-h-[720px] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-rose-200/80 pb-2 text-xs">
              <span className="font-bold text-rose-800 uppercase flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-rose-600" />
                <span>Đề Mục {currentVolume.id === 'volume-1' ? 'Tập 1' : 'Tập 2'}</span>
              </span>
              <span className="font-mono text-slate-500 font-bold">
                {currentVolumeSections.length} mục
              </span>
            </div>

            <div className="space-y-1.5">
              {currentVolumeSections.map((sec) => {
                const isSelected = selectedSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      setSelectedSectionId(sec.id);
                      setCurrentPageNum(sec.startPage);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-br from-white to-rose-50/30 border-rose-500 text-rose-800 font-bold shadow-xs ring-1 ring-[#751D2C]/30'
                        : 'bg-white border-rose-200/80/60 text-slate-900 hover:border-rose-300 hover:bg-gradient-to-br from-white to-rose-50/30/40'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="leading-snug line-clamp-2">{sec.title}</div>
                      <div className="text-[10.5px] text-slate-600 font-mono">
                        Trang {sec.startPage} – {sec.endPage} ({sec.pageCount} trang)
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? 'text-rose-800' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cột phải: Khung hiển thị nội dung trang sách */}
          <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-rose-300 p-5 sm:p-7 shadow-lg space-y-5">
            {/* Thanh điều khiển trang & tiện ích đọc */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/80 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPageNum <= 1}
                  onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-bold flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trang trước</span>
                </button>

                <div className="flex items-center gap-1 font-mono font-bold text-slate-800 bg-gradient-to-br from-white to-rose-50/30 px-3 py-1.5 rounded-xl border border-rose-200/80">
                  <span>Trang</span>
                  <input
                    type="number"
                    min={1}
                    max={currentVolume.pageCount}
                    value={currentPageNum}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= currentVolume.pageCount) {
                        setCurrentPageNum(val);
                      }
                    }}
                    className="w-12 text-center bg-white border border-slate-300 rounded px-1 text-rose-800 font-bold"
                  />
                  <span>/ {currentVolume.pageCount}</span>
                </div>

                <button
                  type="button"
                  disabled={currentPageNum >= currentVolume.pageCount}
                  onClick={() => setCurrentPageNum((p) => Math.min(currentVolume.pageCount, p + 1))}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-bold flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                >
                  <span>Trang sau</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tiện ích: Đọc giọng nói & Sao chép trích dẫn & Cỡ chữ */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'bg-emerald-600 text-white border-emerald-700 animate-pulse'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Nghe đọc trang này"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                  <span>{isSpeaking ? 'Dừng đọc' : 'Nghe đọc'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                  title="Sao chép trích dẫn đoạn văn này"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  <span>{isCopied ? 'Đã sao chép' : 'Trích dẫn'}</span>
                </button>

                {/* Chỉnh cỡ chữ */}
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white text-[11px] font-bold">
                  {(['sm', 'base', 'lg'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setReaderFontSize(sz)}
                      className={`px-2 py-1 transition-colors ${
                        readerFontSize === sz ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {sz === 'sm' ? 'A-' : sz === 'base' ? 'A' : 'A+'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tiêu đề chương / đề mục của trang */}
            <div className="border-b border-rose-200/80/50 pb-2 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-rose-800 text-sm">
                {currentSection.title}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Tài liệu gốc: {currentVolume.sourceFilename}
              </span>
            </div>

            {/* Khung nội dung toàn văn trang sách */}
            <div
              className={`p-6 bg-gradient-to-br from-white to-rose-50/30 rounded-2xl border border-rose-200/80 min-h-[420px] font-serif leading-relaxed text-slate-900 whitespace-pre-line ${
                readerFontSize === 'sm'
                  ? 'text-xs sm:text-sm'
                  : readerFontSize === 'base'
                  ? 'text-sm sm:text-base'
                  : 'text-base sm:text-lg'
              }`}
            >
              {isLoadingPages ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-2">
                  <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-sans">Đang tải toàn văn 600 trang lịch sử...</span>
                </div>
              ) : activePage?.text ? (
                activePage.text
              ) : (
                <div className="py-12 text-center text-slate-600 font-sans space-y-2">
                  <p className="font-bold text-sm">Trang {currentPageNum} — {currentSection.title}</p>
                  <p className="text-xs italic text-slate-500">
                    {currentSection.firstExcerpt || 'Nội dung trang tài liệu lưu trữ chính thức của Đảng bộ Thành phố Thủ Dầu Một.'}
                  </p>
                </div>
              )}
            </div>

            {/* Chân trang đọc: trích dẫn nguồn lưu trữ */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 border-t border-rose-200/80">
              <span>
                Nguồn: Ban Chấp hành Đảng bộ Thành phố Thủ Dầu Một · Ấn phẩm lưu trữ số hóa 2026
              </span>
              <span className="font-mono font-bold text-rose-800">
                Trang {currentPageNum} / {currentVolume.pageCount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: MỤC LỤC & 36 ĐỀ MỤC LỊCH SỬ (SECTIONS)
          ========================================================================= */}
      {activeTab === 'SECTIONS' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs border-b border-rose-200/80 pb-3">
            <span className="font-serif font-bold text-base text-rose-800">
              Toàn Bộ 36 Chương Mục &amp; Đề Mục Lịch Sử Đảng Bộ Thủ Dầu Một
            </span>
            <span className="text-slate-600">
              Bấm vào chuyên mục để mở đọc trọn vẹn văn bản gốc
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TDM_PARTY_SECTIONS.map((sec, idx) => (
              <div
                key={sec.id}
                onClick={() => handleSelectSection(sec.id)}
                className="bg-white rounded-2xl border border-rose-200/80 p-4.5 shadow-xs hover:border-rose-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className={`px-2 py-0.5 rounded-full ${
                      sec.volumeId === 'volume-1'
                        ? 'bg-rose-100 text-rose-900 border border-rose-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {sec.volumeId === 'volume-1' ? 'Tập 1: Thị Xã' : 'Tập 2: Thành Phố'}
                    </span>
                    <span className="font-mono text-slate-500">
                      Trang {sec.startPage} – {sec.endPage}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-rose-800 transition-colors leading-snug">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed italic">
                    “{sec.firstExcerpt || 'Tư liệu lịch sử Đảng bộ...'}”
                  </p>
                </div>

                <div className="pt-2 border-t border-rose-200/80/50 flex items-center justify-between text-xs font-bold text-rose-800">
                  <span>{sec.pageCount} trang tài liệu</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Đọc ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CÔNG CỤ TRA CỨU TOÀN VĂN 600 TRANG (SEARCH ENGINE)
          ========================================================================= */}
      {activeTab === 'SEARCH' && (
        <div className="bg-white rounded-3xl border-2 border-rose-300 p-6 space-y-6 shadow-md">
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-xl text-rose-800">
              Công Cụ Tra Cứu Toàn Văn 600 Trang Lịch Sử Đảng Bộ
            </h2>
            <p className="text-xs text-slate-600">
              Tra cứu nhanh chóng mọi sự kiện, địa danh, tên đồng chí, cơ sở cách mạng, văn kiện hoặc nghị quyết trên toàn bộ 2 tập sách lịch sử.
            </p>
          </div>

          {/* Ô nhập tìm kiếm */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handlePerformSearch(e.target.value)}
              placeholder="Nhập từ khóa cần tìm: Chi bộ, Phú Lợi, Kháng chiến, Đại hội, Bí thư, Đổi mới, Bà mẹ VNAH..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-rose-200/80 focus:border-rose-500 focus:outline-none text-sm font-medium bg-gradient-to-br from-white to-rose-50/30"
            />
          </div>

          {/* Gợi ý từ khóa phổ biến */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-rose-800">Từ khóa gợi ý:</span>
            {[
              'Chi bộ cộng sản đầu tiên',
              'Nhà tù Phú Lợi',
              'Chùa Hội Khánh',
              'Cách mạng Tháng Tám 1945',
              'Đồng khởi',
              'Đại hội Đảng bộ',
              'Đô thị loại I',
              'Bà mẹ Việt Nam Anh hùng',
            ].map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handlePerformSearch(kw)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-gradient-to-br from-white to-rose-50/30 hover:text-rose-800 border border-slate-200 font-semibold cursor-pointer transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Danh sách kết quả tìm kiếm */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-600 border-b border-rose-200/80 pb-2">
              <span>
                {searchQuery
                  ? `Tìm thấy ${searchResults.length} trang phù hợp với từ khóa "${searchQuery}"`
                  : 'Nhập từ khóa để hiển thị kết quả trích đoạn toàn văn'}
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {searchResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      setSelectedVolumeId(res.volumeId);
                      setSelectedSectionId(res.sectionId);
                      setCurrentPageNum(res.sourcePdfPage);
                      setActiveTab('READER');
                    }}
                    className="p-4 rounded-2xl border border-rose-200/80 hover:border-rose-500 bg-gradient-to-br from-white to-rose-50/30/40 hover:bg-gradient-to-br from-white to-rose-50/30 transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-white">
                        {res.volumeId === 'volume-1' ? 'Tập 1' : 'Tập 2'} · Trang {res.sourcePdfPage}
                      </span>
                      <span className="text-rose-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Đọc trang này</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 leading-relaxed font-serif line-clamp-3">
                      “{res.text.slice(0, 300)}...”
                    </p>
                  </div>
                ))}
              </div>
            ) : searchQuery && !isSearching ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                Không tìm thấy trang nào chứa chính xác từ khóa này. Vui lòng thử từ khóa ngắn hơn.
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: PHỤ LỤC LỊCH SỬ & VINH DANH (APPENDICES)
          ========================================================================= */}
      {activeTab === 'APPENDICES' && (
        <div className="bg-white rounded-3xl border-2 border-rose-300 p-6 space-y-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/80 pb-4">
            <div>
              <h2 className="font-serif font-bold text-xl text-rose-800">
                Phụ Lục Lịch Sử &amp; Bảng Vàng Vinh Danh
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Lưu danh muôn đời các Mẹ Việt Nam Anh Hùng, Đơn vị Anh hùng và Lãnh đạo Đảng bộ qua các thời kỳ.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-gradient-to-br from-white to-rose-50/30 rounded-xl border border-rose-200/80">
              {[
                { id: 'MOTHERS', label: 'Bà Mẹ VNAH' },
                { id: 'HEROES', label: 'Anh Hùng LLVTND' },
                { id: 'COMMITTEE', label: 'BCH Qua Các Nhiệm Kỳ' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setAppendixType(btn.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    appendixType === btn.id
                      ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                      : 'text-slate-900 hover:text-rose-800'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nội dung theo từng loại phụ lục */}
          {appendixType === 'MOTHERS' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h3 className="font-bold text-sm text-rose-800 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    <span>Bảng Vàng Danh Dự 106 Bà Mẹ Việt Nam Anh Hùng Thị Xã Thủ Dầu Một</span>
                  </h3>
                  <p className="text-[11.5px] text-slate-700 mt-0.5">
                    Trích lục nguyên văn từ Phụ lục II — Lịch sử Đảng bộ thị xã Thủ Dầu Một (NXB Tổng hợp Bình Dương 2000).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-amber-300 font-bold text-xs">
                    Tổng số: 106 Mẹ VNAH
                  </span>
                </div>
              </div>

              {/* Bộ lọc & Tìm kiếm Mẹ VNAH */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gradient-to-br from-white to-rose-50/30 p-3 rounded-2xl border border-rose-200/80">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={mothersSearch}
                    onChange={(e) => setMothersSearch(e.target.value)}
                    placeholder="Tìm theo tên Mẹ, phường/xã, họ tên liệt sĩ..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#751D2C]"
                  />
                  {mothersSearch && (
                    <button
                      type="button"
                      onClick={() => setMothersSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter theo phường/xã */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setMothersWardFilter('ALL')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      mothersWardFilter === 'ALL'
                        ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                  >
                    Tất cả (106)
                  </button>
                  {mothersWardList.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setMothersWardFilter(w)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        mothersWardFilter === w
                          ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh sách 106 Mẹ VNAH */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredMothers.map((mom) => (
                  <div
                    key={mom.stt}
                    className="p-3.5 rounded-2xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50/90 transition-all space-y-1.5 relative group shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-amber-200 font-bold shrink-0">
                        Số {mom.stt}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        {mom.ward}
                      </span>
                    </div>

                    <h4 className="font-serif font-black text-sm text-rose-800 group-hover:text-red-900 transition-colors">
                      Mẹ VNAH {mom.name}
                    </h4>

                    <div className="text-[11px] text-slate-600">
                      <span>Năm sinh: </span>
                      <strong className="text-slate-800">{mom.birth}</strong>
                    </div>

                    <div className="p-2 rounded-xl bg-white/80 border border-rose-200/60 text-[11px] text-amber-950 leading-relaxed">
                      <span className="font-semibold text-red-800">Liệt sĩ: </span>
                      <span>{mom.martyrs}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMothers.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Không tìm thấy Mẹ VNAH phù hợp với từ khóa "{mothersSearch}".
                </div>
              )}

              <div className="text-center pt-1 border-t border-rose-200/80">
                <button
                  type="button"
                  onClick={() => handleSelectSection('v1-appendix-2')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Mở Trang Phụ Lục II Trong Sách Gốc (Trang 338)</span>
                </button>
              </div>
            </div>
          )}

          {appendixType === 'HEROES' && (
            <div className="space-y-5">
              {/* Thống kê đóng góp to lớn */}
              <div className="p-4 bg-gradient-to-r from-red-900 via-[#751D2C] to-red-950 rounded-2xl text-white shadow-md space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950 inline-block">
                  PHỤ LỤC IV · SỐ LIỆU TỔNG KẾT KHÁNG CHIẾN
                </span>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-serif">
                  {TDM_WAR_STATISTICS.summary}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl font-black text-amber-300 font-mono">5.157</div>
                    <div className="text-[10.5px] text-white/80">Con Em Thoát Ly</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl font-black text-amber-300 font-mono">2.395</div>
                    <div className="text-[10.5px] text-white/80">Liệt Sĩ Anh Dũng</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl font-black text-amber-300 font-mono">604</div>
                    <div className="text-[10.5px] text-white/80">Thương Bệnh Binh</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-center">
                    <div className="text-xl font-black text-amber-300 font-mono">106</div>
                    <div className="text-[10.5px] text-white/80">Bà Mẹ VNAH</div>
                  </div>
                </div>
              </div>

              {/* Danh mục Đơn vị và Cá nhân Anh Hùng */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-base text-rose-800 flex items-center gap-1.5 border-b border-rose-200/80 pb-2">
                  <Medal className="w-4 h-4 text-amber-600" />
                  <span>Đơn Vị &amp; Cá Nhân Được Tuyên Dương Anh Hùng Lực Lượng Vũ Trang Nhân Dân</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {TDM_HEROES_AND_UNITS.map((hero) => (
                    <div
                      key={hero.id}
                      className="p-4 rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/80 to-white space-y-2 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-amber-300 uppercase">
                          {hero.type === 'UNIT' ? 'ĐƠN VỊ ANH HÙNG' : 'ANH HÙNG LLVTND'}
                        </span>
                        <span className="text-[10.5px] font-semibold text-slate-500">
                          {hero.awardDate}
                        </span>
                      </div>

                      <h4 className="font-serif font-black text-base text-rose-800">
                        {hero.name}
                      </h4>

                      <div className="text-xs text-amber-900 font-semibold">
                        {hero.period}
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-sans pt-1 border-t border-amber-200/50">
                        {hero.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {appendixType === 'COMMITTEE' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                Danh sách Ban Chấp hành, Ban Thường vụ Thị ủy / Thành ủy Thủ Dầu Một qua các thời kỳ lịch sử từ năm 1976 đến nay (Trích Phụ lục I Sách 2000 &amp; Phụ lục Tập 2).
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TDM_PARTY_COMMITTEES.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-rose-200/80 bg-white hover:border-rose-500 hover:shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-700 to-[#881337] text-white">
                        {item.period}
                      </span>
                      <span className="text-[10.5px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {item.membersCount} Ủy viên
                      </span>
                    </div>

                    <h4 className="font-serif font-black text-sm text-rose-800">
                      {item.term}
                    </h4>

                    <div className="text-xs text-slate-800 space-y-1 pt-1 border-t border-slate-100">
                      <div>
                        <span className="font-bold text-slate-900">Bí thư: </span>
                        <span className="text-red-900 font-semibold">{item.secretary}</span>
                      </div>
                      {item.deputySecretary && (
                        <div>
                          <span className="font-bold text-slate-900">Phó Bí thư: </span>
                          <span className="text-slate-700">{item.deputySecretary}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 5: BIÊN NIÊN DÒNG LỊCH SỬ (TIMELINE 1930 – 2020)
          ========================================================================= */}
      {activeTab === 'TIMELINE' && (
        <div className="bg-white rounded-3xl border-2 border-rose-300 p-6 space-y-6 shadow-md">
          <div className="border-b border-rose-200/80 pb-3 space-y-1">
            <h2 className="font-serif font-bold text-xl text-rose-800">
              Biên Niên Sử Mốc Son Chói Lọi Của Đảng Bộ Thủ Dầu Một (1930 – 2020)
            </h2>
            <p className="text-xs text-slate-600">
              Trích xuất từ biên niên sử chính thức trong 2 tập tài liệu lịch sử của Đảng bộ thành phố.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                year: '1930',
                title: 'Chi bộ cộng sản đầu tiên ra đời',
                desc: 'Tháng 2/1930, sau khi Đảng Cộng sản Việt Nam thành lập, các chi bộ cộng sản đầu tiên tại Thủ Dầu Một ra đời, lãnh đạo phong trào công nhân đồn điền cao su và thợ thủ công.',
                secId: 'v1-french-2',
              },
              {
                year: '1945',
                title: 'Khởi nghĩa Cách mạng Tháng Tám thành công',
                desc: 'Ngày 25/8/1945, nhân dân Thủ Dầu Một đồng loạt nổi dậy giành chính quyền về tay nhân dân tại trung tâm thị xã (Chợ Thủ Dầu Một).',
                secId: 'v1-french-2',
              },
              {
                year: '1948',
                title: 'Thành lập Thị xã Thủ Dầu Một',
                desc: 'Ủy ban Kháng chiến Hành chính Nam Bộ quyết định thành lập thị xã Thủ Dầu Một, củng cố lực lượng kháng chiến chống thực dân Pháp.',
                secId: 'v1-french-4',
              },
              {
                year: '1958',
                title: 'Vụ đầu độc tù nhân chính trị tại Nhà tù Phú Lợi',
                desc: 'Ngày 30/11/1958, tội ác đầu độc tù nhân Phú Lợi làm bùng lên phong trào đấu tranh sôi sục của nhân dân cả nước và quốc tế.',
                secId: 'v1-american-1',
              },
              {
                year: '1975',
                title: 'Đại thắng Mùa Xuân — Giải phóng hoàn toàn Thủ Dầu Một',
                desc: 'Ngày 30/4/1975, quân dân Thủ Dầu Một tiến công và nổi dậy, giải phóng hoàn toàn thị xã, góp phần vào thắng lợi vĩ đại của Chiến dịch Hồ Chí Minh lịch sử.',
                secId: 'v1-american-4',
              },
              {
                year: '1997',
                title: 'Tái lập tỉnh Bình Dương — Thị xã Thủ Dầu Một là tỉnh lỵ',
                desc: 'Ngày 01/01/1997, tỉnh Bình Dương được tái lập. Thị xã Thủ Dầu Một bước vào thời kỳ bứt phá công nghiệp hóa, hiện đại hóa.',
                secId: 'v2-chapter-1',
              },
              {
                year: '2012',
                title: 'Thành lập Thành phố Thủ Dầu Một trực thuộc tỉnh',
                desc: 'Nghị quyết số 11/NQ-CP của Chính phủ nâng cấp thị xã Thủ Dầu Một lên thành phố, đánh dấu bước chuyển mình thành đô thị văn minh, hiện đại.',
                secId: 'v2-chapter-4',
              },
              {
                year: '2017',
                title: 'Thủ tướng Chính phủ công nhận Đô thị loại I',
                desc: 'Quyết định số 1959/QĐ-TTg của Thủ tướng Chính phủ công nhận TP Thủ Dầu Một là đô thị loại I trực thuộc tỉnh Bình Dương.',
                secId: 'v2-chapter-5',
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSection(milestone.secId)}
                className="p-4 rounded-2xl border border-rose-200/80 hover:border-rose-500 bg-gradient-to-br from-white to-rose-50/30/50 hover:bg-gradient-to-br from-white to-rose-50/30 transition-all cursor-pointer flex items-start gap-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#751D2C] to-[#8C2334] text-amber-300 font-black text-sm flex items-center justify-center shrink-0 shadow-xs ring-2 ring-[#ECC880]/50">
                  {milestone.year}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-rose-800 group-hover:underline">
                      {milestone.title}
                    </h3>
                    <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                      <span>Đọc tài liệu</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
