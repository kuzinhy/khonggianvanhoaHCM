import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  ExternalLink,
  Layers,
  MapPin,
  Maximize2,
  Route,
  Search,
  ShieldCheck,
  Tag,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type {
  HcmDossierDto,
  HcmDossierType,
  HcmTourDto,
  HcmV2OverviewDto,
} from '../hcmSpaceClient';

const DOSSIER_TYPE_LABELS: Record<HcmDossierType, string> = {
  EVENT: 'Sự kiện lịch sử',
  WORK: 'Tác phẩm / Bài viết',
  MEDIA: 'Ảnh / Video / Âm thanh',
  ARTIFACT: 'Hiện vật / Di tích',
  PERSON: 'Nhân vật liên quan',
  RESEARCH: 'Chuyên đề nghiên cứu',
  LOCAL_ACTIVITY: 'Hoạt động Thủ Dầu Một',
};

export const HcmDossierExplorerView: React.FC<{
  overview: HcmV2OverviewDto | null;
  onOpenAdminCms?: () => void;
}> = ({ overview, onOpenAdminCms }) => {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('ALL');
  const [topicId, setTopicId] = useState('ALL');
  const [dossierType, setDossierType] = useState('ALL');
  const [audience, setAudience] = useState('ALL');
  const [verificationFilter, setVerificationFilter] = useState<'ALL' | 'VERIFIED' | 'NEEDS_VERIFICATION'>('ALL');
  const [activeTour, setActiveTour] = useState<HcmTourDto | null>(null);
  const [tourStepIdx, setTourStepIdx] = useState(0);
  const [fullscreenTour, setFullscreenTour] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<HcmDossierDto | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const categories = overview?.categories || [];
  const topics = overview?.topics || [];
  const tours = overview?.tours || [];
  const dossiers = overview?.dossiers || [];

  const visibleTopics = useMemo(
    () => (categoryId === 'ALL' ? topics : topics.filter((t) => t.categoryId === categoryId)),
    [topics, categoryId]
  );

  const filteredDossiers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return dossiers.filter((d) => {
      if (d.publishStatus === 'ARCHIVED') return false;
      if (categoryId !== 'ALL' && !d.categoryIds.includes(categoryId)) return false;
      if (topicId !== 'ALL' && d.topicId !== topicId) return false;
      if (dossierType !== 'ALL' && d.dossierType !== dossierType) return false;
      if (audience !== 'ALL' && !d.audiences.includes(audience)) return false;
      if (verificationFilter !== 'ALL' && d.verificationStatus !== verificationFilter) return false;
      if (!q) return true;
      return `${d.title} ${d.summary} ${d.content} ${d.location} ${d.sourceName} ${d.tags.join(' ')}`.toLowerCase().includes(q);
    });
  }, [dossiers, search, categoryId, topicId, dossierType, audience, verificationFilter]);

  const tourDossiers = useMemo(() => {
    if (!activeTour) return [];
    return activeTour.dossierIds
      .map((id) => dossiers.find((d) => d.id === id))
      .filter((d): d is HcmDossierDto => Boolean(d));
  }, [activeTour, dossiers]);

  const currentTourDossier = tourDossiers[tourStepIdx] || null;

  const toggleSpeak = (d: HcmDossierDto) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingId === d.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${d.title}. ${d.summary}. ${d.content.slice(0, 600)}`);
    u.lang = 'vi-VN';
    u.rate = 0.96;
    u.onend = () => setSpeakingId(null);
    setSpeakingId(d.id);
    window.speechSynthesis.speak(u);
  };

  if (!overview) {
    return (
      <div className="rounded-3xl border border-blue-200 bg-white p-6 text-center text-xs text-slate-600">
        Đang kết nối Kho Hồ sơ 3 Cấp (Cấp 1 Chuyên mục · Cấp 2 Chủ đề · Cấp 3 Hồ sơ Tư liệu)...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Guided Thematic Tours Bar */}
      <section className="rounded-3xl border border-blue-200 bg-gradient-to-r from-[#EFF6FF] via-white to-[#FFFDF9] p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10.5px] font-bold text-rose-800 uppercase">
              <Route className="h-3 w-3" /> Hành trình Tham quan Theo Chủ đề (3 Lộ trình Chuẩn)
            </span>
            <h3 className="mt-1 text-base font-bold text-slate-900">
              Tra cứu Kho Tư liệu 3 Cấp &amp; Tham quan Bảo tàng Số Có Kiểm chứng
            </h3>
          </div>
          {overview.canContribute && onOpenAdminCms && (
            <button
              type="button"
              onClick={onOpenAdminCms}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white cursor-pointer"
            >
              Mở Trang Quản trị CMS (10 phân hệ)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tours.map((tr) => {
            const isSel = activeTour?.id === tr.id;
            return (
              <button
                key={tr.id}
                type="button"
                onClick={() => {
                  setActiveTour(isSel ? null : tr);
                  setTourStepIdx(0);
                }}
                className={`rounded-2xl border p-3.5 text-left transition-all cursor-pointer space-y-1.5 ${
                  isSel
                    ? 'border-rose-600 bg-rose-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[10.5px]">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-blue-800">{tr.audience}</span>
                  <span className="font-bold text-slate-500">{tr.durationLabel}</span>
                </div>
                <p className="text-xs font-bold text-slate-900">{tr.title}</p>
                <p className="text-[11px] text-slate-600 line-clamp-2">{tr.description}</p>
              </button>
            );
          })}
        </div>

        {/* Active Guided Tour Player */}
        {activeTour && currentTourDossier && (
          <div className="rounded-2xl border border-rose-200 bg-white p-4 space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-rose-800">
                Điểm dừng {tourStepIdx + 1}/{tourDossiers.length}: {currentTourDossier.title}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {currentTourDossier.verificationStatus === 'VERIFIED' && (
                  <button
                    type="button"
                    onClick={() => toggleSpeak(currentTourDossier)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                      speakingId === currentTourDossier.id ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {speakingId === currentTourDossier.id ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    <span>{speakingId === currentTourDossier.id ? 'Dừng thuyết minh' : 'Thuyết minh audio'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setFullscreenTour(true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5" /> Toàn màn hình
                </button>
                <button
                  type="button"
                  onClick={() => setTourStepIdx((i) => Math.max(0, i - 1))}
                  disabled={tourStepIdx === 0}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold disabled:opacity-40 cursor-pointer"
                >
                  ← Điểm trước
                </button>
                <button
                  type="button"
                  onClick={() => setTourStepIdx((i) => Math.min(tourDossiers.length - 1, i + 1))}
                  disabled={tourStepIdx >= tourDossiers.length - 1}
                  className="rounded-lg bg-rose-700 text-white px-2.5 py-1 text-[11px] font-bold disabled:opacity-40 cursor-pointer"
                >
                  Điểm tiếp theo →
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {currentTourDossier.imageUrl && (
                <img
                  src={currentTourDossier.imageUrl}
                  alt={currentTourDossier.title}
                  className="sm:w-56 h-36 rounded-xl object-cover border border-amber-200 bg-[#FBF5EA] shrink-0"
                />
              )}
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-slate-800">{currentTourDossier.summary}</p>
                <p className="text-slate-600 leading-relaxed">{currentTourDossier.content}</p>
                <p className="text-[11px] font-semibold text-blue-700">
                  Nguồn: {currentTourDossier.sourceName} {currentTourDossier.sourceUrl && `· ${currentTourDossier.sourceUrl}`}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Search & Multi-Facet Filter Bar */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
          <div className="md:col-span-5 relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm toàn bộ kho hồ sơ (sự kiện, tác phẩm, hiện vật, di tích)..."
              className="w-full rounded-xl border border-slate-200 bg-[#F8FBFF] pl-9 pr-3 py-2 text-xs"
            />
          </div>
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setTopicId('ALL');
            }}
            className="md:col-span-2 rounded-xl border border-slate-200 bg-[#F8FBFF] px-2.5 py-2 text-xs font-semibold"
            aria-label="Lọc chuyên mục Cấp 1"
          >
            <option value="ALL">Cấp 1: Tất cả chuyên mục</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="md:col-span-2 rounded-xl border border-slate-200 bg-[#F8FBFF] px-2.5 py-2 text-xs font-semibold"
            aria-label="Lọc nhóm chủ đề Cấp 2"
          >
            <option value="ALL">Cấp 2: Tất cả chủ đề</option>
            {visibleTopics.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
          <select
            value={dossierType}
            onChange={(e) => setDossierType(e.target.value)}
            className="md:col-span-3 rounded-xl border border-slate-200 bg-[#F8FBFF] px-2.5 py-2 text-xs font-semibold"
            aria-label="Lọc loại hồ sơ"
          >
            <option value="ALL">Loại: Tất cả 07 loại hồ sơ</option>
            {(Object.keys(DOSSIER_TYPE_LABELS) as HcmDossierType[]).map((k) => (
              <option key={k} value={k}>{DOSSIER_TYPE_LABELS[k]}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'Tham quan phổ thông', 'Cán bộ & Đảng viên', 'Đoàn viên & Học sinh', 'Nghiên cứu'].map((aud) => (
              <button
                key={aud}
                type="button"
                onClick={() => setAudience(aud)}
                className={`rounded-xl px-2.5 py-1 font-bold cursor-pointer ${
                  audience === aud ? 'bg-blue-600 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
                }`}
              >
                {aud === 'ALL' ? 'Mọi đối tượng' : aud}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {([
              { id: 'ALL', label: 'Tất cả trạng thái' },
              { id: 'VERIFIED', label: 'Đã kiểm chứng' },
              { id: 'NEEDS_VERIFICATION', label: 'Cần xác minh' },
            ] as const).map((vf) => (
              <button
                key={vf.id}
                type="button"
                onClick={() => setVerificationFilter(vf.id)}
                className={`rounded-xl px-2.5 py-1 font-bold cursor-pointer ${
                  verificationFilter === vf.id ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {vf.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dossier Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDossiers.map((d) => {
          const verified = d.verificationStatus === 'VERIFIED';
          return (
            <article
              key={d.id}
              onClick={() => setSelectedDossier(d)}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {d.imageUrl && (
                  <div className="h-40 overflow-hidden bg-[#FBF5EA] relative">
                    <img
                      src={d.imageUrl}
                      alt={d.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/hcm-space/khu-pho.jpg';
                      }}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        verified ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                      }`}
                    >
                      {verified ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {verified ? 'Đã kiểm chứng' : 'Cần xác minh'}
                    </span>
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-blue-700">
                      {DOSSIER_TYPE_LABELS[d.dossierType]}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-bold text-slate-600">
                      v{d.version} · {d.publishStatus}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{d.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-3">{d.summary}</p>
                </div>
              </div>
              <div className="border-t border-slate-100 bg-[#F8FBFF] px-4 py-2.5 text-[11px] flex items-center justify-between gap-2">
                <span className="truncate font-semibold text-blue-800">{d.sourceName || 'Chưa gắn nguồn'}</span>
                <span className="font-bold text-rose-700 shrink-0">Xem hồ sơ →</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Fullscreen Slideshow Modal */}
      {fullscreenTour && activeTour && currentTourDossier && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 p-6 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-300">{activeTour.title}</span>
              <h3 className="text-lg font-bold">{currentTourDossier.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => setFullscreenTour(false)}
              className="rounded-xl bg-white/10 hover:bg-white/20 p-2 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 py-4 overflow-y-auto">
            {currentTourDossier.imageUrl && (
              <img
                src={currentTourDossier.imageUrl}
                alt={currentTourDossier.title}
                className="max-h-[60vh] rounded-2xl object-contain border border-white/20"
              />
            )}
            <div className="max-w-xl space-y-3 text-sm leading-relaxed">
              <p className="font-bold text-amber-200">{currentTourDossier.summary}</p>
              <p className="text-slate-200">{currentTourDossier.content}</p>
              <p className="text-xs text-blue-300">Nguồn: {currentTourDossier.sourceName}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/15 pt-3 text-xs">
            <span>Điểm dừng {tourStepIdx + 1}/{tourDossiers.length}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTourStepIdx((i) => Math.max(0, i - 1))}
                disabled={tourStepIdx === 0}
                className="rounded-xl bg-white/15 px-4 py-2 font-bold disabled:opacity-40 cursor-pointer"
              >
                ← Điểm trước
              </button>
              <button
                type="button"
                onClick={() => setTourStepIdx((i) => Math.min(tourDossiers.length - 1, i + 1))}
                disabled={tourStepIdx >= tourDossiers.length - 1}
                className="rounded-xl bg-rose-700 px-4 py-2 font-bold disabled:opacity-40 cursor-pointer"
              >
                Điểm tiếp theo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Dossier Provenance Modal (16 Metadata Fields) */}
      {selectedDossier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
          onClick={() => setSelectedDossier(null)}
        >
          <article
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-blue-200 bg-white p-6 shadow-2xl space-y-4 text-xs"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-md bg-rose-700 px-2 py-0.5 font-bold text-white">
                    {DOSSIER_TYPE_LABELS[selectedDossier.dossierType]}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-bold ${
                      selectedDossier.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {selectedDossier.verificationStatus === 'VERIFIED' ? 'ĐÃ KIỂM CHỨNG' : 'CẦN XÁC MINH'}
                  </span>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-blue-800">
                    {selectedDossier.publishStatus} · v{selectedDossier.version}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{selectedDossier.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDossier(null)}
                className="rounded-xl p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedDossier.imageUrl && (
              <figure className="space-y-1">
                <img
                  src={selectedDossier.imageUrl}
                  alt={selectedDossier.title}
                  className="max-h-72 w-full rounded-2xl object-cover border border-slate-200 bg-[#FBF5EA]"
                />
                {selectedDossier.imageCaption && (
                  <figcaption className="text-[11px] text-slate-500 text-center">{selectedDossier.imageCaption}</figcaption>
                )}
              </figure>
            )}

            <p className="text-sm font-semibold text-slate-800">{selectedDossier.summary}</p>
            <div className="rounded-2xl border border-slate-100 bg-[#F8FBFF] p-4 text-slate-700 leading-relaxed whitespace-pre-line">
              {selectedDossier.content}
            </div>

            {/* 16 Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-2xl border border-slate-200 bg-[#FFFDF9] p-4">
              <p><strong className="text-slate-900"><Layers className="h-3 w-3 inline mr-1" />Mã hồ sơ:</strong> {selectedDossier.id}</p>
              <p><strong className="text-slate-900"><Calendar className="h-3 w-3 inline mr-1" />Mốc thời gian:</strong> {selectedDossier.timelineDate || 'Chưa cập nhật'}</p>
              <p><strong className="text-slate-900"><MapPin className="h-3 w-3 inline mr-1" />Địa điểm:</strong> {selectedDossier.location || 'Chưa cập nhật'}</p>
              <p><strong className="text-slate-900"><BookOpen className="h-3 w-3 inline mr-1" />Tác giả / NXB:</strong> {[selectedDossier.author, selectedDossier.publisher, selectedDossier.publishYear].filter(Boolean).join(' · ') || 'Cần xác minh'}</p>
              <p><strong className="text-slate-900"><ShieldCheck className="h-3 w-3 inline mr-1" />Quyền sử dụng:</strong> {selectedDossier.licenseInfo || 'Cần xác minh'}</p>
              <p><strong className="text-slate-900"><Compass className="h-3 w-3 inline mr-1" />Kiểm chứng / Duyệt:</strong> {selectedDossier.verifiedBy || 'Chờ kiểm chứng'} / {selectedDossier.approvedBy || 'Chờ duyệt'}</p>
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-200/70">
                <span><strong>Nguồn tham khảo:</strong> {selectedDossier.sourceName || 'Cần bổ sung nguồn'}</span>
                {selectedDossier.sourceUrl && (
                  <a
                    href={selectedDossier.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Mở tài liệu gốc
                  </a>
                )}
              </div>
              {selectedDossier.tags.length > 0 && (
                <div className="sm:col-span-2 flex flex-wrap items-center gap-1 pt-1">
                  <Tag className="h-3 w-3 text-slate-400" />
                  {selectedDossier.tags.map((tg) => (
                    <span key={tg} className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10.5px] font-semibold">
                      #{tg}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {selectedDossier.verificationStatus === 'VERIFIED' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => toggleSpeak(selectedDossier)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 font-bold text-white cursor-pointer"
                >
                  {speakingId === selectedDossier.id ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span>{speakingId === selectedDossier.id ? 'Dừng thuyết minh' : 'Nghe thuyết minh hồ sơ'}</span>
                </button>
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  );
};
