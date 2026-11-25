import React, { useState } from 'react';
import {
  Landmark,
  Award,
  MapPin,
  BookOpen,
  Volume2,
  VolumeX,
  ExternalLink,
  Copy,
  Check,
  X,
  Maximize2,
  Share2,
  Compass,
  Layers,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import {
  BTHCM_OVERVIEW_INFO,
  BTHCM_PERMANENT_EXHIBITIONS,
  BTHCM_ARTIFACT_STORIES,
  BTHCM_HERITAGE_SYSTEM_SITES,
  BTHCM_RESEARCH_STORIES,
  type MuseumZoneToHop,
  type BthcmArtifactStory,
  type BthcmHeritageBranch,
  type BthcmStoryArticle,
} from '../data/hcmMuseumExhibitsData';

export const HcmMuseumExhibitsFullView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TO_HOP' | 'ARTIFACTS' | 'HERITAGE_SYSTEM' | 'STORIES'>('TO_HOP');

  // Modal Lightbox States
  const [activeZone, setActiveZone] = useState<MuseumZoneToHop | null>(null);
  const [activeArtifact, setActiveArtifact] = useState<BthcmArtifactStory | null>(null);
  const [activeSite, setActiveSite] = useState<BthcmHeritageBranch | null>(null);
  const [activeStory, setActiveStory] = useState<BthcmStoryArticle | null>(null);

  // Filters
  const [artifactCategory, setArtifactCategory] = useState<string>('ALL');
  const [regionFilter, setRegionFilter] = useState<string>('ALL');

  // TTS Voiceover state
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleVoiceover = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = 0.95;
    utter.onend = () => setSpeakingId(null);
    utter.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utter);
    setSpeakingId(id);
  };

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
  };

  // Filtered lists
  const filteredArtifacts =
    artifactCategory === 'ALL'
      ? BTHCM_ARTIFACT_STORIES
      : BTHCM_ARTIFACT_STORIES.filter((a) => a.category === artifactCategory);

  const filteredSites =
    regionFilter === 'ALL'
      ? BTHCM_HERITAGE_SYSTEM_SITES
      : BTHCM_HERITAGE_SYSTEM_SITES.filter((s) => s.region === regionFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner Tôn vinh Bảo tàng Hồ Chí Minh */}
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] text-white p-5 sm:p-7 shadow-xl relative overflow-hidden">
        {/* Glow & Decorative overlay */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="space-y-2.5 w-full">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-300/40 px-3 py-1 text-xs font-black text-amber-200 uppercase tracking-widest">
              <Landmark className="w-3.5 h-3.5 text-amber-300" />
              <span>Dữ Liệu Chính Thống Cấp Quốc Gia · baotanghochiminh.vn</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-serif leading-snug max-w-5xl">
              Hệ Thống Trưng Bày &amp; Hiện Vật — Bảo Tàng Hồ Chí Minh
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans max-w-5xl">
              Khám phá biểu tượng Bông Sen Trắng (19 Ngọc Hà, Ba Đình, Hà Nội), 06 tổ hợp không gian trưng bày nghệ thuật, 12 kỷ vật lịch sử vô giá và mạng lưới 14 di tích lưu niệm Bác Hồ toàn quốc gắn liền với công tác giáo dục truyền thống tại Đảng bộ &amp; Phường Thủ Dầu Một.
            </p>
          </div>

          <div className="pt-3 border-t border-amber-300/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://baotanghochiminh.vn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Cổng thông tin baotanghochiminh.vn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-amber-200/90 font-medium">
              <span className="italic">Khánh thành: 19/5/1990 (Kỷ niệm 100 năm ngày sinh Bác)</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>06 Tổ Hợp Nghệ Thuật</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>12 Kỷ Vật Vô Giá</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab('TO_HOP')}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
            activeTab === 'TO_HOP'
              ? 'bg-[#751D2C] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
          }`}
        >
          <Landmark className="w-4 h-4 text-amber-400" />
          <span>06 Tổ Hợp Không Gian (Trưng Bày Thường Xuyên)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ARTIFACTS')}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
            activeTab === 'ARTIFACTS'
              ? 'bg-[#751D2C] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Hiện Vật Kể Chuyện (12 Kỷ Vật Tiêu Biểu)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('HERITAGE_SYSTEM')}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
            activeTab === 'HERITAGE_SYSTEM'
              ? 'bg-[#751D2C] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Hệ Thống 14 Di Tích Toàn Quốc (BTHCM)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('STORIES')}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
            activeTab === 'STORIES'
              ? 'bg-[#751D2C] text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Chuyện Kể &amp; Nghiên Cứu Tư Tưởng</span>
        </button>
      </div>

      {/* 3. TAB 1: 06 TỔ HỢP KHÔNG GIAN BIỂU TƯỢNG */}
      {activeTab === 'TO_HOP' && (
        <div className="space-y-6">
          {/* Giới thiệu Gian Khánh Tiết */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#751D2C] text-amber-300 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                {BTHCM_OVERVIEW_INFO.ceremonialHall.title}
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                {BTHCM_OVERVIEW_INFO.ceremonialHall.description}
              </p>
            </div>
            <a
              href={BTHCM_OVERVIEW_INFO.ceremonialHall.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-400 bg-white hover:bg-amber-100 text-slate-900 font-bold text-xs shrink-0 transition-colors"
            >
              <span>Xem chi tiết gian</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Lưới 06 Tổ Hợp */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BTHCM_PERMANENT_EXHIBITIONS.map((th) => (
              <article
                key={th.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group border-t-4 border-t-[#751D2C]"
              >
                {/* Image header */}
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img
                    src={th.imageUrl}
                    onError={(e) => {
                      if (th.fallbackImageUrl) {
                        (e.target as HTMLImageElement).src = th.fallbackImageUrl;
                      }
                    }}
                    alt={th.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

                  <span className="absolute top-2.5 left-2.5 rounded-md bg-[#751D2C] text-amber-300 border border-amber-400/40 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider shadow-sm">
                    {th.period}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveZone(th)}
                    className="absolute top-2.5 right-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white p-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                    title="Phóng to thông tin"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[11px] text-amber-300 font-medium truncate">{th.location}</p>
                    <h3 className="text-sm sm:text-base font-bold font-serif leading-snug line-clamp-1">
                      {th.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {th.contentSummary}
                    </p>

                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-[#751D2C] uppercase tracking-wider block">
                        Hiện vật tiêu biểu:
                      </span>
                      <ul className="text-[11.5px] text-slate-700 space-y-0.5 list-disc list-inside">
                        {th.keyArtifacts.slice(0, 3).map((art, idx) => (
                          <li key={idx} className="truncate">{art}</li>
                        ))}
                      </ul>
                    </div>

                    {th.localConnectionToTDM && (
                      <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-2 text-[11px] text-emerald-950 leading-relaxed font-medium">
                        <strong className="text-emerald-900 block text-[10px] uppercase">Gắn kết Thủ Dầu Một:</strong>
                        <span className="line-clamp-2">{th.localConnectionToTDM}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleVoiceover(th.id, `${th.title}. ${th.contentSummary}. Biểu tượng kiến trúc: ${th.architecturalSymbolism}`)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        speakingId === th.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {speakingId === th.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{speakingId === th.id ? 'Dừng đọc' : 'Thuyết minh'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveZone(th)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#751D2C] hover:bg-[#8E2435] text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      <span>Khám phá</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 2: HIỆN VẬT KỂ CHUYỆN */}
      {activeTab === 'ARTIFACTS' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200">
            <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              Lọc hiện vật:
            </span>
            {['ALL', 'Kỷ vật đời thường', 'Kỷ vật kháng chiến', 'Văn kiện - Ấn phẩm', 'Tặng phẩm ngoại giao', 'Tác phẩm nghệ thuật'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setArtifactCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  artifactCategory === cat
                    ? 'bg-[#751D2C] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Tất cả (12 Hiện vật)' : cat}
              </button>
            ))}
          </div>

          {/* Grid 12 Hiện Vật Kể Chuyện */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArtifacts.map((art) => (
              <article
                key={art.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={art.imageUrl}
                    onError={(e) => {
                      if (art.fallbackImageUrl) {
                        (e.target as HTMLImageElement).src = art.fallbackImageUrl;
                      }
                    }}
                    alt={art.title}
                    className="max-h-48 w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-amber-400 text-slate-950 font-black px-2 py-0.5 text-[10px] uppercase tracking-wider shadow-sm">
                    {art.category}
                  </span>
                  <span className="absolute top-2.5 right-2.5 rounded-md bg-slate-900/80 text-amber-200 border border-amber-300/30 px-2 py-0.5 text-[10.5px] font-mono">
                    {art.yearOrPeriod}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {art.story}
                    </p>

                    <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-2.5 text-[11px] text-amber-950 leading-relaxed">
                      <strong className="text-amber-900 block text-[10px] uppercase font-bold">Bài học đạo đức:</strong>
                      <span className="line-clamp-2">{art.moralLesson}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleVoiceover(art.id, `${art.title}. Niên đại: ${art.yearOrPeriod}. ${art.story}. ${art.moralLesson}`)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        speakingId === art.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {speakingId === art.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{speakingId === art.id ? 'Dừng đọc' : 'Nghe kể'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveArtifact(art)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#751D2C] hover:bg-[#8E2435] text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      <span>Chi tiết kỷ vật</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: HỆ THỐNG 14 DI TÍCH TOÀN QUỐC */}
      {activeTab === 'HERITAGE_SYSTEM' && (
        <div className="space-y-6">
          {/* Region Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200">
            <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Vùng miền:
            </span>
            {['ALL', 'Miền Bắc', 'Miền Trung', 'Tây Nguyên', 'Miền Nam', 'Đất Thủ - Bình Dương'].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setRegionFilter(reg)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  regionFilter === reg
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {reg === 'ALL' ? 'Toàn quốc (15 Điểm)' : reg}
              </button>
            ))}
          </div>

          {/* Grid Sites */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSites.map((site) => (
              <article
                key={site.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group"
              >
                <div className="relative h-44 bg-slate-950 overflow-hidden">
                  <img
                    src={site.imageUrl}
                    onError={(e) => {
                      if (site.fallbackImageUrl) {
                        (e.target as HTMLImageElement).src = site.fallbackImageUrl;
                      }
                    }}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-blue-700 text-white font-bold px-2 py-0.5 text-[10px]">
                    {site.branchType}
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[240px]">{site.location}</span>
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-snug">
                      {site.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {site.significance}
                    </p>
                    {site.connectionToTDM && (
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2 text-[11px] text-emerald-950">
                        <strong className="text-emerald-900 block text-[10px] uppercase font-bold">Kết nối Thủ Dầu Một:</strong>
                        <span>{site.connectionToTDM}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={site.officialBthcmUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                    >
                      <span>Cổng BTHCM</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveSite(site)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      <span>Xem di tích</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB 4: CHUYỆN KỂ & NGHIÊN CỨU TƯ TƯỞNG */}
      {activeTab === 'STORIES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BTHCM_RESEARCH_STORIES.map((st) => (
            <article
              key={st.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-rose-100 text-[#751D2C] px-2 py-0.5 text-[10.5px] font-bold">
                    {st.category}
                  </span>
                  <span className="text-[11px] text-slate-500 italic truncate max-w-[200px]">
                    {st.authorOrSource}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  {st.summary}
                </p>

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950">
                  <strong className="text-amber-900 block uppercase font-bold text-[10.5px] mb-0.5">
                    Bài học giáo dục đạo đức cốt lõi:
                  </strong>
                  <span>{st.coreMoralLesson}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toggleVoiceover(st.id, `${st.title}. ${st.summary}. Bài học: ${st.coreMoralLesson}`)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    speakingId === st.id
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {speakingId === st.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{speakingId === st.id ? 'Dừng đọc' : 'Nghe diễn cảm'}</span>
                </button>

                <a
                  href={st.officialBthcmUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors"
                >
                  <span>Toàn văn bài viết BTHCM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* MODAL 1: CHI TIẾT TỔ HỢP TRƯNG BÀY */}
      {activeZone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
          onClick={() => setActiveZone(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
          >
            <div
              className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
              style={{ backgroundColor: '#751D2C' }}
            >
              <div className="space-y-1">
                <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
                  Tổ Hợp Trưng Bày Thường Xuyên #{activeZone.order} · {activeZone.period}
                </span>
                <h3 className="text-base sm:text-xl font-bold font-serif leading-snug">{activeZone.title}</h3>
                <p className="text-xs text-amber-200">{activeZone.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveZone(null)}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 max-h-72 flex items-center justify-center">
                <img
                  src={activeZone.imageUrl}
                  onError={(e) => {
                    if (activeZone.fallbackImageUrl) {
                      (e.target as HTMLImageElement).src = activeZone.fallbackImageUrl;
                    }
                  }}
                  alt={activeZone.title}
                  className="max-h-72 w-full object-cover"
                />
                <span className="absolute bottom-2.5 left-2.5 rounded-md bg-slate-950/80 text-amber-200 px-2 py-1 text-xs">
                  {activeZone.location}
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                <div>
                  <h5 className="font-bold text-[#751D2C] uppercase tracking-wider mb-1 text-xs">
                    Nội dung khái quát:
                  </h5>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                    {activeZone.contentSummary}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#751D2C] uppercase tracking-wider mb-1 text-xs">
                    Ngôn ngữ kiến trúc &amp; Biểu tượng bảo tàng học:
                  </h5>
                  <p className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-slate-800 leading-relaxed">
                    {activeZone.architecturalSymbolism}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#751D2C] uppercase tracking-wider mb-1 text-xs">
                    Hiện vật tiêu biểu tại tổ hợp:
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeZone.keyArtifacts.map((art, idx) => (
                      <li key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#751D2C]"></span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeZone.localConnectionToTDM && (
                  <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-3.5 space-y-1">
                    <span className="font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Mối liên hệ &amp; Giáo dục truyền thống tại Phường Thủ Dầu Một:
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {activeZone.localConnectionToTDM}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleVoiceover(activeZone.id, `${activeZone.title}. ${activeZone.contentSummary}. Ngôn ngữ biểu tượng: ${activeZone.architecturalSymbolism}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{speakingId === activeZone.id ? 'Dừng đọc' : 'Nghe thuyết minh'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeZone.officialBthcmUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
                >
                  <span>Cổng BTHCM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveZone(null)}
                  className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHI TIẾT HIỆN VẬT KỂ CHUYỆN */}
      {activeArtifact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
          onClick={() => setActiveArtifact(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
          >
            <div
              className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
              style={{ backgroundColor: '#751D2C' }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
                    {activeArtifact.category} · {activeArtifact.yearOrPeriod}
                  </span>
                  <span className="text-xs text-amber-200">{activeArtifact.origin}</span>
                </div>
                <h3 className="text-base sm:text-xl font-bold font-serif leading-snug">{activeArtifact.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArtifact(null)}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 max-h-72 flex items-center justify-center border border-slate-200">
                <img
                  src={activeArtifact.imageUrl}
                  onError={(e) => {
                    if (activeArtifact.fallbackImageUrl) {
                      (e.target as HTMLImageElement).src = activeArtifact.fallbackImageUrl;
                    }
                  }}
                  alt={activeArtifact.title}
                  className="max-h-72 w-auto object-contain p-2"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                <div>
                  <h5 className="font-bold text-[#751D2C] uppercase tracking-wider mb-1 text-xs">
                    Câu chuyện hiện vật xúc động:
                  </h5>
                  <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                    {activeArtifact.story}
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-3.5 space-y-1">
                  <h5 className="font-bold text-amber-900 uppercase tracking-wider text-xs">
                    Ý nghĩa tư tưởng &amp; Bài học đạo đức (QĐ 144 / Chỉ thị 07):
                  </h5>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {activeArtifact.moralLesson}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <strong className="text-slate-700">Nguồn trích dẫn:</strong> {activeArtifact.citation}
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleVoiceover(activeArtifact.id, `${activeArtifact.title}. ${activeArtifact.story}. Bài học: ${activeArtifact.moralLesson}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{speakingId === activeArtifact.id ? 'Dừng đọc' : 'Nghe diễn cảm'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCitation(activeArtifact.id, `${activeArtifact.title} (${activeArtifact.yearOrPeriod}, ${activeArtifact.origin}) — ${activeArtifact.story} [Nguồn: Bảo tàng Hồ Chí Minh]`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  {copiedId === activeArtifact.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                  <span>{copiedId === activeArtifact.id ? 'Đã sao chép' : 'Sao chép trích dẫn'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeArtifact.officialBthcmUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
                >
                  <span>Cổng BTHCM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveArtifact(null)}
                  className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CHI TIẾT DI TÍCH LƯU NIỆM */}
      {activeSite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
          onClick={() => setActiveSite(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
          >
            <div
              className="bg-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
              style={{ backgroundColor: '#751D2C' }}
            >
              <div className="space-y-1">
                <span className="rounded-md bg-amber-400 text-slate-950 px-2 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
                  {siteRegionLabel(activeSite.region)} · {activeSite.branchType}
                </span>
                <h3 className="text-base sm:text-xl font-bold font-serif leading-snug">{activeSite.title}</h3>
                <p className="text-xs text-amber-200">{activeSite.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSite(null)}
                className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 max-h-72">
                <img
                  src={activeSite.imageUrl}
                  onError={(e) => {
                    if (activeSite.fallbackImageUrl) {
                      (e.target as HTMLImageElement).src = activeSite.fallbackImageUrl;
                    }
                  }}
                  alt={activeSite.title}
                  className="max-h-72 w-full object-cover"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                <div>
                  <h5 className="font-bold text-[#751D2C] uppercase tracking-wider mb-1 text-xs">
                    Ý nghĩa lịch sử &amp; Giá trị di sản:
                  </h5>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                    {activeSite.significance}
                  </p>
                </div>

                {activeSite.connectionToTDM && (
                  <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-3.5 space-y-1">
                    <span className="font-bold text-emerald-900 text-xs uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Mối liên hệ đặc biệt với Thủ Dầu Một:
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {activeSite.connectionToTDM}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
              <a
                href={activeSite.officialBthcmUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition-colors"
              >
                <span>Hồ sơ di tích tại BTHCM</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                type="button"
                onClick={() => setActiveSite(null)}
                className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function siteRegionLabel(reg: string) {
  return reg;
}
