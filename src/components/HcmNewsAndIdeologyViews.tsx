import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Film,
  Flame,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  Wifi,
  WifiOff,
  X,
  XCircle,
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';
import { ChiBoBulletinPrintModal, type BulletinData } from './ChiBoBulletinPrintModal';
import {
  HCM_ADVANCED_QUIZ_4,
  HCM_COMMITMENT_TEMPLATES,
  HCM_INTERACTIVE_QUIZ_8,
  HCM_METHODOLOGY_6,
  HCM_NEWS_ARTICLES_6,
  HCM_PHOTO_GALLERY,
  QUY_DINH_144_STANDARDS_5,
  VERIFIED_QUOTES_12,
  VIDEO_DOCUMENTARIES_11,
} from '../hcmCoreDataset';
import {
  fetchHcmPortalArticle,
  fetchHcmPortalFeed,
  type HcmCulturalEntryDto,
  type PortalArticleDetailDto,
  type PortalChannelKey,
  type PortalFeedResponseDto,
} from '../hcmSpaceClient';
import { HcmQuotes12View } from './HcmLibraryAndMediaViews';

interface CombinedNewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  snippet: string;
  content: string;
  source: string;
  imageUrl: string;
  views: number;
  isLivePortal?: boolean;
  articlePath?: string;
  articleUrl?: string;
  customEntry?: HcmCulturalEntryDto;
  sourceOrigin?: 'CT07_TPHCM' | 'THU_VIEN_KHTH' | 'CONG_NHAN_CEP' | 'DOAN_UBND' | 'LOCAL';
  externalUrl?: string;
}

type NewsSourceScope = 'ALL' | 'CT07_TPHCM' | 'THU_VIEN_KHTH' | 'CONG_NHAN_CEP' | 'DOAN_UBND' | 'PORTAL' | 'WARD';

const SOURCE_SCOPE_BUTTONS: Array<{ id: NewsSourceScope; label: string; badge?: string; desc: string }> = [
  { id: 'ALL', label: 'Tất cả nguồn (15+)', desc: 'Tổng hợp đa chiều từ các cơ quan' },
  { id: 'CT07_TPHCM', label: 'Chỉ thị 07 (TP.HCM)', badge: 'Mới 2026', desc: 'hochiminhcity.gov.vn' },
  { id: 'THU_VIEN_KHTH', label: 'Thư viện KHTH', badge: 'Ebook & Di sản', desc: 'khonggianvanhoahochiminh.thuvientphcm.gov.vn' },
  { id: 'CONG_NHAN_CEP', label: 'Tổ chức CEP', badge: 'Người lao động', desc: 'khonggianvanhoahochiminh.cep.org.vn' },
  { id: 'DOAN_UBND', label: 'Tuổi trẻ UBND TP', badge: 'QĐ 144', desc: 'Đoàn Cơ quan UBND TP.HCM' },
  { id: 'PORTAL', label: 'Cổng TTĐT trực tiếp', badge: 'Live API', desc: 'Đồng bộ API trực tiếp' },
  { id: 'WARD', label: 'Phường Thủ Dầu Một', badge: 'Cơ sở', desc: 'Mô hình chi bộ & khu phố' },
];

const PORTAL_CHANNEL_BUTTONS: Array<{ key: PortalChannelKey; label: string }> = [
  { key: 'tin-tuc', label: 'Tin tức - Sự kiện' },
  { key: 'guong-dien-hinh', label: 'Gương điển hình' },
  { key: 'tu-tuong', label: 'Tư tưởng, đạo đức' },
  { key: 'the-gioi', label: 'HCM & Thế giới' },
];

export const HcmNewsEventsView: React.FC<{
  customNews: HcmCulturalEntryDto[];
  canEdit: boolean;
  onAddNews: () => void;
  onEditEntry: (entry: HcmCulturalEntryDto) => void;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => void;
  onImportToWard?: (prefill: { title: string; subtitle: string; location: string; summary: string; imageUrl: string }) => void;
  onJumpToTab: (tab: 'MODELS' | 'MEDIA' | 'EXHIBIT') => void;
}> = ({ customNews, canEdit, onAddNews, onEditEntry, onDeleteEntry, onImportToWard, onJumpToTab }) => {
  const [catFilter, setCatFilter] = useState<string>('Tất cả');
  const [sourceScope, setSourceScope] = useState<NewsSourceScope>('ALL');
  const [portalChannel, setPortalChannel] = useState<PortalChannelKey>('tin-tuc');
  const [portalState, setPortalState] = useState<PortalFeedResponseDto | null>(null);
  const [loadingPortal, setLoadingPortal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [readingItem, setReadingItem] = useState<CombinedNewsItem | null>(null);
  const [portalDetail, setPortalDetail] = useState<PortalArticleDetailDto | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [carouselIdx, setCarouselIdx] = useState<number>(0);
  const [printBulletinData, setPrintBulletinData] = useState<BulletinData | null>(null);

  const carouselSlides = useMemo(() => HCM_PHOTO_GALLERY.slice(0, 3), []);

  const syncPortalFeed = useCallback(async (ch: PortalChannelKey, refresh = false) => {
    setLoadingPortal(true);
    try {
      const data = await fetchHcmPortalFeed(ch, refresh);
      setPortalState(data);
    } finally {
      setLoadingPortal(false);
    }
  }, []);

  useEffect(() => {
    void syncPortalFeed(portalChannel, false);
  }, [portalChannel, syncPortalFeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const openArticleReader = async (item: CombinedNewsItem) => {
    setReadingItem(item);
    setPortalDetail(null);
    if (item.isLivePortal && item.articlePath) {
      setLoadingDetail(true);
      try {
        const det = await fetchHcmPortalArticle(item.articlePath);
        setPortalDetail(det);
      } finally {
        setLoadingDetail(false);
      }
    }
  };

  const combinedNews: CombinedNewsItem[] = useMemo(() => {
    const customMapped: CombinedNewsItem[] = customNews.map((item) => ({
      id: item.id,
      category: item.location || 'Hoạt động Thủ Dầu Một',
      date: item.subtitle || item.updatedAt?.slice(0, 10) || 'Mới cập nhật',
      title: item.title,
      snippet: item.summary.slice(0, 220),
      content: item.summary + (item.quote ? `\n\n"${item.quote}"` : ''),
      source: 'Ban Tuyên giáo & Dân vận Phường Thủ Dầu Một',
      imageUrl: item.imageUrl || '/assets/hcm-space/khu-pho.jpg',
      views: 120 + item.sortOrder * 11,
      customEntry: item,
      sourceOrigin: 'LOCAL',
    }));
    const livePortalMapped: CombinedNewsItem[] = (portalState?.articles || []).map((p, idx) => ({
      id: p.id,
      category: p.channelLabel,
      date: p.date,
      title: p.title,
      snippet: p.snippet || 'Tin đồng bộ trực tiếp từ Cổng Thông tin Điện tử TP.HCM.',
      content: p.snippet || '',
      source: 'Cổng TTĐT hochiminhcity.gov.vn (Trực tiếp)',
      imageUrl: p.imageUrl || '/assets/hcm-space/khu-pho.jpg',
      views: 420 - idx * 17,
      isLivePortal: true,
      articlePath: p.articlePath,
      articleUrl: p.articleUrl,
      sourceOrigin: 'CT07_TPHCM',
    }));
    const baseMapped: CombinedNewsItem[] = HCM_NEWS_ARTICLES_6.map((n) => ({
      ...n,
      views: n.views ?? 180,
    }));
    const all = [...customMapped, ...livePortalMapped, ...baseMapped];

    if (sourceScope === 'WARD') {
      return all.filter((item) => item.sourceOrigin === 'LOCAL' || item.customEntry);
    }
    if (sourceScope === 'PORTAL') {
      return all.filter((item) => item.isLivePortal);
    }
    if (sourceScope === 'CT07_TPHCM') {
      return all.filter((item) => item.sourceOrigin === 'CT07_TPHCM');
    }
    if (sourceScope === 'THU_VIEN_KHTH') {
      return all.filter((item) => item.sourceOrigin === 'THU_VIEN_KHTH');
    }
    if (sourceScope === 'CONG_NHAN_CEP') {
      return all.filter((item) => item.sourceOrigin === 'CONG_NHAN_CEP');
    }
    if (sourceScope === 'DOAN_UBND') {
      return all.filter((item) => item.sourceOrigin === 'DOAN_UBND');
    }
    return all;
  }, [customNews, portalState, sourceScope]);

  const categories = useMemo(() => {
    const set = new Set<string>([
      'Tất cả',
      'Hoạt động Thủ Dầu Một',
      'Dân vận khéo',
      'Tư tưởng & Chuyên đề',
      'Nghị quyết & Chỉ thị',
    ]);
    combinedNews.forEach((n) => set.add(n.category));
    return Array.from(set);
  }, [combinedNews]);

  const filteredNews = useMemo(() => {
    const q = query.trim().toLowerCase();
    return combinedNews.filter((item) => {
      if (catFilter !== 'Tất cả' && item.category !== catFilter) return false;
      if (!q) return true;
      return `${item.title} ${item.snippet} ${item.category} ${item.source}`.toLowerCase().includes(q);
    });
  }, [combinedNews, catFilter, query]);

  const leadArticle = filteredNews[0] || null;
  const listArticles = filteredNews.slice(1);
  const activeSlide = carouselSlides[carouselIdx] || carouselSlides[0];
  const featuredClip = VIDEO_DOCUMENTARIES_11[0];

  return (
    <div className="space-y-4">
      {/* Live Portal Connection Bar (hochiminhcity.gov.vn) */}
      <section className="rounded-2xl border border-blue-200 bg-gradient-to-r from-[#EFF6FF] via-white to-[#FFFDF9] p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                portalState?.connected
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-amber-200 bg-amber-50 text-amber-800'
              }`}
            >
              {portalState?.connected ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
              <span>
                {portalState?.connected
                  ? `Đã kết nối trực tiếp hochiminhcity.gov.vn (${portalState.articles.length} bài)`
                  : 'Đang dùng kho bài biên tập cục bộ'}
              </span>
            </span>
            {portalState?.fetchedAt && (
              <span className="text-[11px] font-medium text-slate-500">
                Cập nhật: {new Date(portalState.fetchedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                {portalState.fromCache ? ' (cache)' : ''}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={portalState?.channel?.url || 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-700"
            >
              <Globe className="h-3.5 w-3.5 text-blue-600" /> Mở trang gốc
            </a>
            <button
              type="button"
              disabled={loadingPortal}
              onClick={() => void syncPortalFeed(portalChannel, true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingPortal ? 'animate-spin' : ''}`} />
              <span>{loadingPortal ? 'Đang đồng bộ...' : 'Đồng bộ tin mới'}</span>
            </button>
          </div>
        </div>

        {/* 4 Live Portal Channels & Multi-Source Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-blue-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-600 mr-1">Chuyên mục Cổng TTĐT:</span>
            {PORTAL_CHANNEL_BUTTONS.map((ch) => (
              <button
                key={ch.key}
                type="button"
                onClick={() => {
                  setPortalChannel(ch.key);
                  setCatFilter('Tất cả');
                }}
                className={`rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                  portalChannel === ch.key
                    ? 'bg-rose-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-rose-300'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Official Sources + Ward Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-blue-100">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 shrink-0">
            <Globe className="h-3.5 w-3.5 text-blue-700" />
            <span>Nguồn thông tin & tư liệu:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {SOURCE_SCOPE_BUTTONS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setSourceScope(sc.id);
                  setCatFilter('Tất cả');
                }}
                title={sc.desc}
                className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-all border ${
                  sourceScope === sc.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                <span>{sc.label}</span>
                {sc.badge && (
                  <span
                    className={`text-[9.5px] px-1 py-0.2 rounded font-extrabold ${
                      sourceScope === sc.id
                        ? 'bg-white/20 text-white'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {sc.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top Search & Ward Action Toolbar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tin tức, sự kiện, gương Dân vận khéo..."
              className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] pl-9 pr-3 py-1.5 text-xs"
            />
          </div>
          {canEdit && (
            <button
              type="button"
              onClick={onAddNews}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 px-3.5 py-2 text-xs font-bold text-white shadow-2xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Đăng tin / Sự kiện Thủ Dầu Một
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCatFilter(cat)}
              className={`rounded-xl px-3 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                catFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50 border border-blue-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Editorial Layout matching Portal Structure (8 / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8 Cols: Lead Story + Horizontal Media Rows */}
        <div className="lg:col-span-8 space-y-4">
          {leadArticle ? (
            <article className="overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-2xs">
              <div className="relative h-60 sm:h-72 overflow-hidden bg-[#FBF5EA]">
                <img
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/hcm-space/khu-pho.jpg';
                  }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-md bg-rose-700 px-2.5 py-0.5 text-[10.5px] font-bold text-white uppercase">
                    {leadArticle.isLivePortal ? 'Tin trực tuyến Cổng TTĐT' : 'Tiêu điểm Thủ Dầu Một'}
                  </span>
                  <span className="rounded-md bg-white/95 px-2.5 py-0.5 text-[10.5px] font-bold text-blue-800">
                    {leadArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2.5">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-rose-700" /> {leadArticle.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-blue-600" /> {leadArticle.views} lượt xem
                  </span>
                  <span>{leadArticle.source}</span>
                </div>
                <h3
                  onClick={() => void openArticleReader(leadArticle)}
                  className="text-lg sm:text-xl font-bold text-slate-900 hover:text-rose-800 transition-colors cursor-pointer leading-snug"
                >
                  {leadArticle.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{leadArticle.snippet}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void openArticleReader(leadArticle)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 px-4 py-2 text-xs font-bold text-white cursor-pointer"
                    >
                      <span>Đọc toàn văn bài viết</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    {canEdit && leadArticle.isLivePortal && onImportToWard && (
                      <button
                        type="button"
                        onClick={() =>
                          onImportToWard({
                            title: leadArticle.title,
                            subtitle: leadArticle.date,
                            location: 'Hoạt động Thủ Dầu Một',
                            summary: `${leadArticle.snippet}\n\nNguồn tham chiếu: ${leadArticle.articleUrl || leadArticle.source}`,
                            imageUrl: leadArticle.imageUrl,
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-[#EFF6FF] hover:bg-blue-100 px-3 py-2 text-xs font-bold text-blue-800 cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" /> Lưu về Tin Thủ Dầu Một
                      </button>
                    )}
                  </div>
                  {canEdit && leadArticle.customEntry && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEditEntry(leadArticle.customEntry!)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" /> Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteEntry(leadArticle.customEntry!)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-[11px] font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" /> Xóa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-600">
              Không tìm thấy tin tức phù hợp với bộ lọc hiện tại.
            </div>
          )}

          {/* Horizontal Media List Cards */}
          <div className="space-y-3">
            {listArticles.map((art) => (
              <article
                key={art.id}
                className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-blue-300 transition-colors flex flex-col sm:flex-row gap-4"
              >
                <div
                  onClick={() => void openArticleReader(art)}
                  className="sm:w-48 h-32 shrink-0 overflow-hidden rounded-xl bg-[#FBF5EA] border border-slate-200 cursor-pointer"
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/hcm-space/khu-pho.jpg';
                    }}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-blue-700">{art.category}</span>
                      {art.isLivePortal && (
                        <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          Cổng TTĐT Trực tiếp
                        </span>
                      )}
                      {!art.isLivePortal && art.sourceOrigin === 'CT07_TPHCM' && (
                        <span className="rounded-md bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
                          Chỉ thị 07 TP.HCM
                        </span>
                      )}
                      {art.sourceOrigin === 'THU_VIEN_KHTH' && (
                        <span className="rounded-md bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                          Thư viện KHTH
                        </span>
                      )}
                      {art.sourceOrigin === 'CONG_NHAN_CEP' && (
                        <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          CEP - Lao động
                        </span>
                      )}
                      {art.sourceOrigin === 'DOAN_UBND' && (
                        <span className="rounded-md bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 text-[10px] font-bold text-cyan-800">
                          Tuổi trẻ UBND
                        </span>
                      )}
                      <span className="text-slate-500 font-semibold">{art.date}</span>
                    </div>
                    <h4
                      onClick={() => void openArticleReader(art)}
                      className="text-sm font-bold text-slate-900 hover:text-blue-700 cursor-pointer line-clamp-2"
                    >
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{art.snippet}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => void openArticleReader(art)}
                        className="inline-flex items-center gap-1 font-bold text-rose-700 hover:underline cursor-pointer"
                      >
                        <span>Xem chi tiết</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                      {art.externalUrl && (
                        <a
                          href={art.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-slate-500 hover:text-blue-700 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> Nguồn gốc
                        </a>
                      )}
                      {canEdit && art.isLivePortal && onImportToWard && (
                        <button
                          type="button"
                          onClick={() =>
                            onImportToWard({
                              title: art.title,
                              subtitle: art.date,
                              location: 'Hoạt động Thủ Dầu Một',
                              summary: `${art.snippet}\n\nNguồn tham chiếu: ${art.articleUrl || art.source}`,
                              imageUrl: art.imageUrl,
                            })
                          }
                          className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline cursor-pointer"
                        >
                          <Download className="h-3 w-3" /> Lưu về phường
                        </button>
                      )}
                    </div>
                    {canEdit && art.customEntry && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEditEntry(art.customEntry!)}
                          className="rounded-md border border-slate-200 px-2 py-0.5 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteEntry(art.customEntry!)}
                          className="rounded-md border border-rose-200 px-2 py-0.5 font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Campaign Banner + VIDEO Widget + 3-Slide Photo Carousel + Top Ranked List */}
        <aside className="lg:col-span-4 space-y-4">
          {/* 1. Campaign Banner */}
          <button
            type="button"
            onClick={() => onJumpToTab('MODELS')}
            className="w-full overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-2xs hover:border-rose-400 transition-all cursor-pointer text-left"
          >
            <img
              src="/assets/hcm-space/banner-hoctap.png"
              alt="Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh"
              className="w-full h-auto object-cover"
            />
            <div className="p-3 bg-gradient-to-r from-rose-50 to-amber-50/70 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-800">
              <span>Xem Gương điển hình Phường Thủ Dầu Một</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </button>

          {/* 2. VIDEO Widget (Populated with real documentary shortcut!) */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between border-b-2 border-rose-700 pb-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Film className="h-3.5 w-3.5" /> VIDEO TƯ LIỆU
              </h4>
              <button
                type="button"
                onClick={() => onJumpToTab('MEDIA')}
                className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Tất cả (11)
              </button>
            </div>
            {featuredClip && (
              <div
                onClick={() => onJumpToTab('MEDIA')}
                className="group cursor-pointer space-y-2"
              >
                <div className="relative h-36 overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={featuredClip.thumbnailUrl || '/assets/hcm-space/nha-rong.jpg'}
                    alt={featuredClip.title}
                    className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-700/90 text-white shadow-md">
                      ▶
                    </span>
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">{featuredClip.title}</p>
                <p className="text-[11px] text-slate-500">{featuredClip.sourceName} · {featuredClip.duration}</p>
              </div>
            )}
          </section>

          {/* 3. ẢNH Auto-Rotating 3-Slide Carousel */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between border-b-2 border-rose-700 pb-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" /> ẢNH KHÔNG GIAN HCM
              </h4>
              <button
                type="button"
                onClick={() => onJumpToTab('EXHIBIT')}
                className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Tham quan →
              </button>
            </div>
            {activeSlide && (
              <div className="space-y-2">
                <div
                  onClick={() => onJumpToTab('EXHIBIT')}
                  className="h-40 overflow-hidden rounded-xl bg-[#FBF5EA] border border-slate-200 cursor-pointer"
                >
                  <img
                    src={activeSlide.imageUrl}
                    alt={activeSlide.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-bold text-slate-900">{activeSlide.title}</p>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {carouselSlides.map((sl, i) => (
                    <button
                      key={sl.id}
                      type="button"
                      onClick={() => setCarouselIdx(i)}
                      aria-label={`Ảnh ${i + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === carouselIdx ? 'w-5 bg-rose-700' : 'w-2 bg-slate-300 hover:bg-blue-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 4. Ranked Most Viewed List */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5">
            <div className="border-b-2 border-rose-700 pb-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" /> BÀI ĐĂNG XEM NHIỀU NHẤT
              </h4>
            </div>
            <div className="divide-y divide-slate-100">
              {combinedNews.slice(0, 6).map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => void openArticleReader(item)}
                  className="w-full py-2 text-left flex items-start gap-2.5 hover:bg-[#F8FBFF] rounded-lg px-1 transition-colors cursor-pointer"
                >
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10.5px] font-bold ${
                      idx === 0 ? 'bg-rose-700 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 hover:text-blue-700 line-clamp-2">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Article Reader Modal (Hỗ trợ cả toàn văn trực tiếp từ hochiminhcity.gov.vn) */}
      {readingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
          onClick={() => setReadingItem(null)}
        >
          <article
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-blue-200 bg-white p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="rounded-md bg-rose-700 px-2 py-0.5 font-bold text-white">{readingItem.category}</span>
                  <span className="font-semibold text-slate-500">{portalDetail?.publishedAt || readingItem.date}</span>
                  <span className="text-blue-700 font-semibold">{readingItem.source}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{portalDetail?.title || readingItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setReadingItem(null)}
                className="rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src={readingItem.imageUrl}
              alt={readingItem.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/hcm-space/khu-pho.jpg';
              }}
              className="max-h-72 w-full rounded-2xl object-cover border border-slate-200 bg-[#FBF5EA]"
            />
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {portalDetail?.summary || readingItem.snippet}
            </p>
            {loadingDetail ? (
              <div className="rounded-2xl border border-blue-100 bg-[#F8FBFF] p-4 text-xs font-semibold text-blue-700">
                Đang tải toàn văn bài viết từ Cổng TTĐT hochiminhcity.gov.vn...
              </div>
            ) : portalDetail && portalDetail.paragraphs.length > 0 ? (
              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-100 bg-[#F8FBFF] p-4 space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {portalDetail.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                {portalDetail.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {portalDetail.images.slice(0, 4).map((img, i) => (
                      <figure key={i} className="rounded-2xl border border-slate-200 bg-[#FFFDF9] p-2 space-y-1">
                        <img
                          src={img.url}
                          alt={img.caption || readingItem.title}
                          referrerPolicy="no-referrer"
                          className="h-40 w-full rounded-xl object-cover"
                        />
                        {img.caption && <figcaption className="text-[11px] text-slate-600 px-1">{img.caption}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-[#F8FBFF] p-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {readingItem.content}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {readingItem.articleUrl ? (
                  <a
                    href={readingItem.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Mở bài gốc trên hochiminhcity.gov.vn
                  </a>
                ) : readingItem.externalUrl ? (
                  <a
                    href={readingItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-rose-700 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Mở bài viết gốc tại cơ quan ban hành
                  </a>
                ) : (
                  <span className="text-slate-500 font-semibold">{readingItem.source}</span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPrintBulletinData({
                      title: portalDetail?.title || readingItem.title,
                      category: readingItem.category,
                      date: portalDetail?.publishedAt || readingItem.date,
                      source: readingItem.source,
                      summary: portalDetail?.summary || readingItem.snippet,
                      content: portalDetail?.paragraphs?.length
                        ? portalDetail.paragraphs.join('\n\n')
                        : readingItem.content,
                      unitName: 'CHI BỘ PHƯỜNG THỦ DẦU MỘT',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 cursor-pointer shadow-xs transition-colors"
                >
                  <Printer className="h-3.5 w-3.5 text-amber-700" />
                  <span>In Bản Tin Chi Bộ (A4)</span>
                </button>
              </div>

              {canEdit && readingItem.isLivePortal && onImportToWard && (
                <button
                  type="button"
                  onClick={() => {
                    const fullSummary = portalDetail?.paragraphs?.length
                      ? `${portalDetail.summary ? portalDetail.summary + '\n\n' : ''}${portalDetail.paragraphs.slice(0, 6).join('\n\n')}\n\nNguồn: ${readingItem.articleUrl}`
                      : `${readingItem.snippet}\n\nNguồn: ${readingItem.articleUrl || readingItem.source}`;
                    onImportToWard({
                      title: portalDetail?.title || readingItem.title,
                      subtitle: portalDetail?.publishedAt || readingItem.date,
                      location: 'Hoạt động Thủ Dầu Một',
                      summary: fullSummary,
                      imageUrl: readingItem.imageUrl,
                    });
                    setReadingItem(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 font-bold text-white cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Biên tập lưu về Tin Phường Thủ Dầu Một
                </button>
              )}
            </div>
          </article>
        </div>
      )}

      {/* Chi Bo Bulletin A4 Print Modal */}
      {printBulletinData && (
        <ChiBoBulletinPrintModal
          isOpen={Boolean(printBulletinData)}
          onClose={() => setPrintBulletinData(null)}
          data={printBulletinData}
        />
      )}
    </div>
  );
};

export const HcmIdeologyAndQuizView: React.FC<{
  customQuotes: HcmCulturalEntryDto[];
  canEdit: boolean;
  onAddQuote: () => void;
  onEditEntry: (entry: HcmCulturalEntryDto) => void;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => void;
}> = ({ customQuotes, canEdit, onAddQuote, onEditEntry, onDeleteEntry }) => {
  const [subTab, setSubTab] = useState<'STANDARDS' | 'METHODOLOGY' | 'COMMITMENT' | 'QUIZ' | 'QUOTES'>('STANDARDS');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Commitment Generator State
  const [selectedRoleId, setSelectedRoleId] = useState<'LANH_DAO' | 'DANG_VIEN' | 'CONG_CHUC' | 'DOAN_VIEN'>('DANG_VIEN');
  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [partyBranch, setPartyBranch] = useState('Chi bộ Khu phố 1');
  const [position, setPosition] = useState('Đảng viên');
  const [copiedCommitment, setCopiedCommitment] = useState(false);

  const allQuizzes = useMemo(() => [...HCM_INTERACTIVE_QUIZ_8, ...HCM_ADVANCED_QUIZ_4], []);

  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () =>
      allQuizzes.filter((q) => answers[q.id] === q.correctIndex).length,
    [answers, allQuizzes]
  );

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const currentTemplate = useMemo(
    () => HCM_COMMITMENT_TEMPLATES.find((t) => t.roleId === selectedRoleId) || HCM_COMMITMENT_TEMPLATES[0],
    [selectedRoleId]
  );

  const handleCopyCommitmentText = () => {
    const text = `ĐẢNG CỘNG SẢN VIỆT NAM\nĐẢNG BỘ PHƯỜNG THỦ DẦU MỘT\n${partyBranch.toUpperCase()}\n\nBẢN CAM KẾT TU DƯỠNG, RÈN LUYỆN, PHẤN ĐẤU NĂM 2026\n(Thực hiện Chỉ thị số 07-CT/TW và Quy định số 144-QĐ/TW của Bộ Chính trị)\n\nKính gửi: Chi ủy, Chi bộ ${partyBranch}\n\nTôi tên là: ${fullName}\nSinh hoạt tại chi bộ: ${partyBranch}\nChức vụ công tác/đảng vụ: ${position}\n\nSau khi nghiên cứu Chỉ thị số 07-CT/TW ngày 13/7/2026 của Bộ Chính trị về đẩy mạnh học tập, thực hành tư tưởng, đạo đức, phương pháp, phong cách Hồ Chí Minh và Quy định số 144-QĐ/TW, tôi xin cam kết thực hiện nghiêm túc các nội dung sau:\n\n${currentTemplate.commitments
      .map(
        (c) =>
          `${c.standardTitle}\n${c.actionItems.map((it) => `- ${it}`).join('\n')}`
      )
      .join('\n\n')}\n\nThủ Dầu Một, ngày .... tháng .... năm 2026\nNGƯỜI CAM KẾT\n\n${fullName}`;

    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedCommitment(true);
    setTimeout(() => setCopiedCommitment(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3.5">
        <button
          type="button"
          onClick={() => setSubTab('STANDARDS')}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
            subTab === 'STANDARDS' ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> 01. 5 Chuẩn mực Đạo đức (QĐ 144)
        </button>
        <button
          type="button"
          onClick={() => setSubTab('METHODOLOGY')}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
            subTab === 'METHODOLOGY' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
          }`}
        >
          <Compass className="h-4 w-4" /> 02. 6 Phương pháp Bác Hồ (Chỉ thị 07)
        </button>
        <button
          type="button"
          onClick={() => setSubTab('COMMITMENT')}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
            subTab === 'COMMITMENT' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
          }`}
        >
          <ClipboardCheck className="h-4 w-4" /> 03. Sổ tay Cam kết Tu dưỡng 2026
        </button>
        <button
          type="button"
          onClick={() => setSubTab('QUIZ')}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
            subTab === 'QUIZ' ? 'bg-rose-700 text-white shadow-xs' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
          }`}
        >
          <HelpCircle className="h-4 w-4" /> 04. Trắc nghiệm Di sản ({allQuizzes.length} câu)
        </button>
        <button
          type="button"
          onClick={() => setSubTab('QUOTES')}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
            subTab === 'QUOTES' ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
          }`}
        >
          <ScrollText className="h-4 w-4" /> 05. Lời Bác Dặn &amp; Trích Dẫn ({VERIFIED_QUOTES_12.length + customQuotes.length})
        </button>
      </div>

      {subTab === 'STANDARDS' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-r from-[#FFFDF9] via-white to-[#EFF6FF] p-5 space-y-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
              <Sparkles className="h-3 w-3" /> QUY ĐỊNH 144-QĐ/TW NGÀY 09/5/2024 CỦA BỘ CHÍNH TRỊ
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Chuẩn mực Đạo đức Cách mạng của Cán bộ, Đảng viên Phường Thủ Dầu Một trong Giai đoạn Mới
            </h3>
            <p className="text-xs text-slate-600">
              Gắn 5 chuẩn mực Quy định 144-QĐ/TW với tư tưởng Hồ Chí Minh và thực hành công vụ hằng ngày tại cơ sở.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUY_DINH_144_STANDARDS_5.map((st) => (
              <article key={st.code} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-rose-700 px-2.5 py-1 text-xs font-bold text-white">{st.code}</span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{st.title}</h4>
                </div>
                <blockquote className="rounded-xl border-l-4 border-rose-600 bg-[#FFFDF9] px-3 py-2 text-xs italic text-slate-700">
                  {st.hcmQuote}
                </blockquote>
                <ul className="space-y-1.5">
                  {st.coreValues.map((val, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl border border-blue-100 bg-[#EFF6FF] p-3 text-[11.5px] text-blue-900">
                  <strong>Thực hành tại Thủ Dầu Một:</strong> {st.tdmPractice}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {subTab === 'METHODOLOGY' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-r from-[#FFFDF5] via-[#FFFBEB] to-[#FEF3C7] p-5 space-y-1.5 shadow-2xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
              <Compass className="h-3 w-3" /> ĐIỂM CỐT LÕI MỚI CỦA CHỈ THỊ 07-CT/TW NGÀY 13/7/2026 CỦA BỘ CHÍNH TRỊ
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              6 Phương Pháp Cách Mạng Hồ Chí Minh — Học Tập &amp; Thực Hành Trong Giai Đoạn Mới
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
              Chỉ thị 07-CT/TW yêu cầu chuyển mạnh sang <strong>&ldquo;học tập và thực hành&rdquo;</strong>, đặc biệt bổ sung việc học tập, thực hành <strong>phương pháp</strong> của Bác để nâng cao năng lực lãnh đạo, đổi mới lề lối làm việc và lấy sự hài lòng của Nhân dân làm thước đo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HCM_METHODOLOGY_6.map((m) => (
              <article key={m.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between gap-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
                      Phương pháp 0{m.order}
                    </span>
                    <span className="text-[10.5px] font-semibold text-slate-500">Chỉ thị 07-CT/TW</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{m.title}</h4>
                  <p className="text-[11px] font-semibold text-amber-800">{m.subtitle}</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{m.coreProse}</p>
                  <blockquote className="rounded-xl border-l-3 border-amber-500 bg-amber-50/60 px-3 py-2 text-xs italic text-amber-950">
                    {m.hcmQuote}
                    <div className="text-[10.5px] text-slate-500 not-italic pt-1 text-right">— {m.quoteSource}</div>
                  </blockquote>
                </div>

                <div className="rounded-xl bg-[#F0FDF4] border border-emerald-200 p-3 text-[11px] text-emerald-950 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Thực hành tại Phường Thủ Dầu Một:
                  </div>
                  <p>{m.tdmApplication}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {subTab === 'COMMITMENT' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-r from-[#F0FDF4] via-white to-[#ECFDF5] p-5 space-y-1.5 shadow-2xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
              <ClipboardCheck className="h-3 w-3" /> CÔNG CỤ SỐ HÓA CÔNG TÁC ĐẢNG CƠ SỞ
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Sổ Tay Đăng Ký &amp; Tạo Bản Cam Kết Tu Dưỡng, Rèn Luyện, Phấn Đấu Năm 2026
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Tạo lập bản cam kết cá nhân chuẩn thể thức văn bản Đảng theo tinh thần <strong>Chỉ thị số 07-CT/TW</strong> và <strong>Quy định số 144-QĐ/TW</strong>. Phù hợp cho cán bộ, đảng viên, công chức và đoàn viên thanh niên in nộp chi bộ hoặc lưu trữ số.
            </p>
          </div>

          {/* Form Role Selector & User Inputs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">1. Chọn đối tượng cam kết:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {HCM_COMMITMENT_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.roleId}
                    type="button"
                    onClick={() => setSelectedRoleId(tmpl.roleId)}
                    className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                      selectedRoleId === tmpl.roleId
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-emerald-800">{tmpl.badge}</div>
                    <div className="text-xs font-extrabold mt-0.5">{tmpl.roleName}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Họ và tên cán bộ / đảng viên:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] px-3 py-2 text-xs font-semibold text-slate-900"
                  placeholder="Nhập họ và tên..."
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Chi bộ trực thuộc:</label>
                <input
                  type="text"
                  value={partyBranch}
                  onChange={(e) => setPartyBranch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] px-3 py-2 text-xs font-semibold text-slate-900"
                  placeholder="Chi bộ Khu phố 1, Chi bộ Quân sự..."
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Chức vụ đảng vụ / chính quyền:</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] px-3 py-2 text-xs font-semibold text-slate-900"
                  placeholder="Đảng viên, Bí thư chi bộ, Công chức..."
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
              <span className="text-[11.5px] text-slate-500">
                Mẫu cam kết được cấu hình tự động bám sát 5 nhóm chuẩn mực đạo đức cách mạng &amp; phương pháp Bác Hồ.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCommitmentText}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  {copiedCommitment ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCommitment ? 'Đã sao chép nội dung' : 'Sao chép văn bản'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>In Bản Cam Kết (A4)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Paper-like Preview of the Commitment Document */}
          <div className="rounded-3xl border border-slate-300 bg-white p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-6 text-slate-900 font-serif">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-center gap-4 text-xs font-sans border-b border-slate-200 pb-4">
              <div className="text-left space-y-0.5">
                <div className="font-extrabold uppercase tracking-wide">ĐẢNG BỘ PHƯỜNG THỦ DẦU MỘT</div>
                <div className="font-bold underline uppercase">{partyBranch}</div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="font-extrabold uppercase">ĐẢNG CỘNG SẢN VIỆT NAM</div>
                <div className="italic text-slate-600">Thủ Dầu Một, ngày .... tháng .... năm 2026</div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-1 pt-2 font-sans">
              <h2 className="text-base sm:text-lg font-extrabold uppercase text-slate-950">
                BẢN CAM KẾT TU DƯỠNG, RÈN LUYỆN, PHẤN ĐẤU NĂM 2026
              </h2>
              <p className="text-xs italic text-slate-600">
                (Thực hiện Chỉ thị số 07-CT/TW ngày 13/7/2026 và Quy định số 144-QĐ/TW của Bộ Chính trị)
              </p>
            </div>

            {/* Bio info */}
            <div className="space-y-1.5 text-xs sm:text-sm font-sans pt-2">
              <p><strong>Kính gửi:</strong> Chi ủy, Chi bộ {partyBranch}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <p>Tôi tên là: <strong>{fullName || '................................................'}</strong></p>
                <p>Sinh ngày: ...... / ...... / ..........</p>
                <p>Sinh hoạt tại Chi bộ: <strong>{partyBranch}</strong></p>
                <p>Chức vụ: <strong>{position}</strong></p>
              </div>
              <p className="pt-2 leading-relaxed text-justify">
                Sau khi nghiên cứu, quán triệt <strong>Chỉ thị số 07-CT/TW ngày 13/7/2026 của Bộ Chính trị</strong> về đẩy mạnh học tập, thực hành tư tưởng, đạo đức, phương pháp, phong cách Hồ Chí Minh trong giai đoạn phát triển mới và <strong>Quy định số 144-QĐ/TW</strong> về chuẩn mực đạo đức cách mạng, tôi xin cam kết thực hiện nghiêm túc các nội dung tu dưỡng, rèn luyện cụ thể sau:
              </p>
            </div>

            {/* Commitments list */}
            <div className="space-y-4 pt-2 text-xs sm:text-sm font-sans">
              {currentTemplate.commitments.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1.5">
                  <h4 className="font-bold text-slate-950 uppercase text-[12.5px] border-l-3 border-emerald-600 pl-2.5">
                    {group.standardTitle}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-800 pl-2 leading-relaxed">
                    {group.actionItems.map((item, iIdx) => (
                      <li key={iIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Closing statement & Signatures */}
            <div className="pt-4 space-y-6 text-xs sm:text-sm font-sans">
              <p className="italic text-justify">
                Bản cam kết này được báo cáo trước Chi bộ làm căn cứ để chi ủy, chi bộ theo dõi, kiểm tra, giám sát và đánh giá, xếp loại chất lượng đảng viên cuối năm 2026.
              </p>

              <div className="grid grid-cols-2 text-center pt-4">
                <div className="space-y-16">
                  <p className="font-bold uppercase text-xs">XÁC NHẬN CỦA CHI BỘ<br /><span className="font-normal italic">(Ký, ghi rõ họ tên)</span></p>
                  <p className="font-bold text-slate-400">................................................</p>
                </div>
                <div className="space-y-16">
                  <p className="font-bold uppercase text-xs">NGƯỜI CAM KẾT<br /><span className="font-normal italic">(Ký và ghi rõ họ tên)</span></p>
                  <p className="font-bold text-slate-900">{fullName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'QUIZ' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-blue-200 bg-white p-5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-rose-700" /> Trắc nghiệm Tìm hiểu Cuộc đời &amp; Tư tưởng Hồ Chí Minh
              </h3>
              <p className="text-xs text-slate-600">
                Phục vụ sinh hoạt chuyên đề tại 26 Chi bộ và Hội thi trực tuyến cho Nhân dân phường Thủ Dầu Một.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-[#EFF6FF] border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-800 tabular-nums">
                Đã chọn: {answeredCount}/{allQuizzes.length} câu
              </span>
              {submitted && (
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Làm lại
                </button>
              )}
            </div>
          </div>

          {submitted && (
            <div
              className={`rounded-2xl border p-4 flex flex-wrap items-center justify-between gap-3 ${
                correctCount >= Math.ceil(allQuizzes.length * 0.75)
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-amber-300 bg-amber-50 text-amber-950'
              }`}
            >
              <div className="space-y-0.5">
                <p className="text-sm font-bold">
                  Kết quả hoàn thành: {correctCount}/{allQuizzes.length} câu đúng (
                  {Math.round((correctCount / allQuizzes.length) * 100)}%)
                </p>
                <p className="text-xs">
                  {correctCount >= Math.ceil(allQuizzes.length * 0.75)
                    ? 'Xuất sắc! Đạt chuẩn hoàn thành xuất sắc chuyên đề Không gian Văn hóa Hồ Chí Minh Phường Thủ Dầu Một.'
                    : `Hãy xem phần giải thích trích nguồn bên dưới và thử lại để đạt từ ${Math.ceil(allQuizzes.length * 0.75)}/${allQuizzes.length} câu trở lên.`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCertificate(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gold-star hover:bg-gold-400 text-crimson-950 px-3.5 py-1.5 text-xs font-black shadow-gold-glow cursor-pointer transition-all active:scale-95"
                >
                  <Award className="h-4 w-4" />
                  <span>Cấp Giấy Chứng Nhận Điện Tử</span>
                </button>
                <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold border border-current/20">
                  Đảng ủy Phường Thủ Dầu Một
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {allQuizzes.map((q, qIdx) => {
              const selectedOpt = answers[q.id];
              return (
                <article key={q.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    Câu {qIdx + 1}: {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isPicked = selectedOpt === oIdx;
                      const isRight = submitted && oIdx === q.correctIndex;
                      const isWrong = submitted && isPicked && oIdx !== q.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={submitted}
                          onClick={() => setAnswers((p) => ({ ...p, [q.id]: oIdx }))}
                          className={`rounded-xl border p-3 text-left text-xs font-semibold transition-colors flex items-start gap-2 cursor-pointer ${
                            isRight
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                              : isWrong
                                ? 'border-rose-500 bg-rose-50 text-rose-900'
                                : isPicked
                                  ? 'border-blue-600 bg-[#EFF6FF] text-blue-900'
                                  : 'border-slate-200 bg-[#F8FBFF] text-slate-800 hover:border-blue-300'
                          }`}
                        >
                          <span className="font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                          <span className="flex-1">{opt}</span>
                          {isRight && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                          {isWrong && <XCircle className="h-4 w-4 text-rose-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div className="rounded-xl border border-amber-200 bg-[#FFFDF9] p-3 text-xs text-slate-700 space-y-0.5">
                      <p>
                        <strong className="text-rose-800">Giải thích:</strong> {q.explanation}
                      </p>
                      <p className="text-[11px] font-semibold text-blue-700">Nguồn: {q.citation}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {!submitted && (
            <div className="flex justify-end">
              <button
                type="button"
                disabled={answeredCount === 0}
                onClick={() => setSubmitted(true)}
                className="rounded-xl bg-rose-700 hover:bg-rose-800 disabled:opacity-50 px-5 py-2.5 text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                Nộp bài &amp; Xem đáp án trích nguồn ({answeredCount}/{allQuizzes.length})
              </button>
            </div>
          )}
        </div>
      )}

      {subTab === 'QUOTES' && (
        <HcmQuotes12View
          customQuotes={customQuotes}
          canEdit={canEdit}
          onAddQuote={onAddQuote}
          onEditEntry={onEditEntry}
          onDeleteEntry={onDeleteEntry}
        />
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        score={correctCount}
        totalQuestions={allQuizzes.length}
        defaultRecipientName={fullName}
      />
    </div>
  );
};
