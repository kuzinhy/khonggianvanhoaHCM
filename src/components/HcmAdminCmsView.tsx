import React, { useMemo, useState, useEffect } from 'react';
import {
  AlertTriangle,
  Archive,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CopyCheck,
  Database,
  Edit3,
  ExternalLink,
  FilePlus2,
  GitBranch,
  History,
  Layers,
  RefreshCw,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
  HardDrive,
} from 'lucide-react';
import { HCM_DRIVE_STORAGE_CONFIG } from '../lib/hcmDriveStorage';
import {
  fetchHcmDossierDetail,
  proposeHcmEnrichmentDraft,
  rollbackHcmDossierVersion,
  runHcmDossierWorkflow,
  saveHcmDossierV2,
  syncHcmSourcesV2,
  updateHcmSourceConfigV2,
  fetchCorrectionsList,
  updateCorrectionStatusClient,
  type HcmCorrectionItemDto,
  type HcmDossierDto,
  type HcmDossierType,
  type HcmDossierVersionDto,
  type HcmV2OverviewDto,
} from '../hcmSpaceClient';

type CmsPanelTab = 'DOSSIERS' | 'TAXONOMY' | 'SOURCES' | 'AI_QUEUE' | 'AUDIT' | 'CORRECTIONS';

const DOSSIER_TYPES: Array<{ value: HcmDossierType; label: string }> = [
  { value: 'EVENT', label: 'Sự kiện lịch sử' },
  { value: 'WORK', label: 'Tác phẩm / Bài viết / Lời dạy' },
  { value: 'MEDIA', label: 'Hình ảnh / Video / Âm thanh' },
  { value: 'ARTIFACT', label: 'Hiện vật / Di tích / Địa danh' },
  { value: 'PERSON', label: 'Nhân vật liên quan' },
  { value: 'RESEARCH', label: 'Chuyên đề nghiên cứu' },
  { value: 'LOCAL_ACTIVITY', label: 'Hoạt động Thủ Dầu Một' },
];

export const HcmAdminCmsView: React.FC<{
  overview: HcmV2OverviewDto | null;
  onRefreshOverview: () => Promise<void>;
}> = ({ overview, onRefreshOverview }) => {
  const [cmsTab, setCmsTab] = useState<CmsPanelTab>('DOSSIERS');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bannerMsg, setBannerMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Dossier Editor Modal
  const [editing, setEditing] = useState<Partial<HcmDossierDto> & { changeNote?: string } | null>(null);

  // Version History & Rollback Modal
  const [historyData, setHistoryData] = useState<{
    dossier: HcmDossierDto;
    versions: HcmDossierVersionDto[];
  } | null>(null);

  // Tiếp nhận & Xử lý Góp ý / Đề nghị đính chính
  const [corrections, setCorrections] = useState<HcmCorrectionItemDto[]>([]);
  const [correctionStatusFilter, setCorrectionStatusFilter] = useState<string>('ALL');
  const [loadingCorrections, setLoadingCorrections] = useState(false);

  const loadCorrections = async () => {
    setLoadingCorrections(true);
    try {
      const list = await fetchCorrectionsList(correctionStatusFilter === 'ALL' ? undefined : correctionStatusFilter);
      setCorrections(list);
    } catch (err: any) {
      console.warn('Cannot fetch corrections:', err);
    } finally {
      setLoadingCorrections(false);
    }
  };

  useEffect(() => {
    if (cmsTab === 'CORRECTIONS') {
      void loadCorrections();
    }
  }, [cmsTab, correctionStatusFilter]);

  const handleUpdateCorrection = async (id: string, status: any, adminNotes?: string) => {
    try {
      await updateCorrectionStatusClient(id, status, adminNotes);
      notify('ok', 'Đã cập nhật trạng thái xử lý đính chính.');
      await loadCorrections();
    } catch (err: any) {
      notify('err', err?.message || 'Cập nhật thất bại.');
    }
  };

  const notify = (type: 'ok' | 'err', text: string) => {
    setBannerMsg({ type, text });
    setTimeout(() => setBannerMsg((p) => (p?.text === text ? null : p)), 4500);
  };

  const dossiers = overview?.dossiers || [];
  const canContribute = Boolean(overview?.canContribute);
  const canApprove = Boolean(overview?.canApprove);

  const filteredDossiers = useMemo(() => {
    if (statusFilter === 'ALL') return dossiers;
    return dossiers.filter((d) => d.publishStatus === statusFilter);
  }, [dossiers, statusFilter]);

  const aiDrafts = useMemo(() => dossiers.filter((d) => d.isAiDraft), [dossiers]);

  const handleSaveDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title?.trim()) return;
    setBusyId(editing.id || 'new');
    try {
      await saveHcmDossierV2(editing);
      await onRefreshOverview();
      setEditing(null);
      notify('ok', editing.id ? 'Đã lưu phiên bản chỉnh sửa mới.' : 'Đã tạo hồ sơ nháp (trạng thái Cần xác minh).');
    } catch (err: any) {
      notify('err', err?.message || 'Lỗi lưu hồ sơ.');
    } finally {
      setBusyId(null);
    }
  };

  const handleWorkflow = async (
    dossierId: string,
    action: 'SUBMIT_REVIEW' | 'VERIFY' | 'FLAG_NEEDS_VERIFICATION' | 'REJECT' | 'PUBLISH' | 'ARCHIVE'
  ) => {
    setBusyId(dossierId);
    try {
      await runHcmDossierWorkflow(dossierId, action);
      await onRefreshOverview();
      notify('ok', `Đã thực hiện thao tác: ${action}.`);
    } catch (err: any) {
      notify('err', err?.message || 'Thao tác bị từ chối hoặc không đủ điều kiện kiểm chứng.');
    } finally {
      setBusyId(null);
    }
  };

  const handleOpenHistory = async (id: string) => {
    setBusyId(id);
    try {
      const det = await fetchHcmDossierDetail(id);
      if (det) setHistoryData(det);
    } finally {
      setBusyId(null);
    }
  };

  const handleRollback = async (dossierId: string, versionNum: number) => {
    setBusyId(dossierId);
    try {
      await rollbackHcmDossierVersion(dossierId, versionNum);
      await onRefreshOverview();
      const det = await fetchHcmDossierDetail(dossierId);
      if (det) setHistoryData(det);
      notify('ok', `Đã khôi phục hồ sơ về phiên bản v${versionNum}.`);
    } catch (err: any) {
      notify('err', err?.message || 'Không thể khôi phục phiên bản.');
    } finally {
      setBusyId(null);
    }
  };

  const handleSyncSource = async (sourceId?: string, force = false) => {
    setBusyId(sourceId || 'all-sources');
    try {
      const res = await syncHcmSourcesV2(sourceId, force);
      await onRefreshOverview();
      const totalNew = res.logs.reduce((s, l) => s + l.draftsCreated, 0);
      const totalSkip = res.logs.reduce((s, l) => s + l.duplicatesSkipped, 0);
      notify('ok', `Đồng bộ xong: tạo ${totalNew} hồ sơ nháp chờ duyệt, bỏ qua ${totalSkip} bản trùng.`);
    } catch (err: any) {
      notify('err', err?.message || 'Lỗi đồng bộ nguồn.');
    } finally {
      setBusyId(null);
    }
  };

  const handleEnrichProposal = async (dossierId: string) => {
    setBusyId(dossierId);
    try {
      await proposeHcmEnrichmentDraft(dossierId);
      await onRefreshOverview();
      notify('ok', 'Đã tạo bản nháp AI đề xuất bổ sung trường thiếu trong Hàng chờ duyệt.');
    } catch (err: any) {
      notify('err', err?.message || 'Không tạo được đề xuất.');
    } finally {
      setBusyId(null);
    }
  };

  if (!overview) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-xs text-slate-600">
        Đang tải phân hệ Quản trị Di sản CMS...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* RBAC & Stats Header */}
      <section className="rounded-3xl border border-blue-200 bg-white p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                <ShieldCheck className="h-3 w-3 inline mr-1" />
                Quyền thực thi backend: {overview.actor.name} ({overview.actor.role.toUpperCase()})
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {canApprove
                  ? 'Có quyền Kiểm chứng, Phê duyệt, Xuất bản & Khôi phục phiên bản'
                  : canContribute
                    ? 'Biên tập viên (Chỉ tạo nháp & gửi duyệt; không tự xuất bản)'
                    : 'Chỉ xem'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Trung tâm Quản trị 10 Phân hệ — Không gian Văn hóa Hồ Chí Minh 3 Cấp
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={HCM_DRIVE_STORAGE_CONFIG.rootFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 px-3.5 py-2 text-xs font-bold text-amber-900 transition-colors cursor-pointer"
              title="Mở thư mục Google Drive gốc của dự án (1XtTGPw6cPi02XDFUFKYG8x9MS3h1WLyV)"
            >
              <HardDrive className="h-4 w-4 text-amber-700" />
              <span>Kho Google Drive Dự Án</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            {canContribute && (
              <button
                type="button"
                onClick={() =>
                  setEditing({
                    title: '',
                    dossierType: 'LOCAL_ACTIVITY',
                    categoryIds: ['cat_local'],
                    topicId: overview.topics[0]?.id || 'top_tdm_news',
                    tags: ['Thủ Dầu Một'],
                    audiences: ['Cán bộ & Đảng viên', 'Tham quan phổ thông'],
                    summary: '',
                    content: '',
                    timelineDate: new Date().toLocaleDateString('vi-VN'),
                    location: 'Phường Thủ Dầu Một',
                    imageUrl: '',
                    imageCaption: '',
                    sourceName: '',
                    sourceUrl: '',
                    author: '',
                    publisher: 'Đảng ủy Phường Thủ Dầu Một',
                    publishYear: String(new Date().getFullYear()),
                    licenseInfo: 'CẦN XÁC MINH',
                    changeNote: 'Tạo hồ sơ mới từ CMS',
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white cursor-pointer"
              >
                <FilePlus2 className="h-4 w-4" /> Thêm hồ sơ tư liệu mới
              </button>
            )}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-xs">
          {[
            { label: 'Tổng hồ sơ Cấp 3', val: overview.audit.totalDossiers, cls: 'text-blue-700' },
            { label: 'Đã xuất bản', val: overview.audit.byPublishStatus.PUBLISHED || 0, cls: 'text-emerald-700' },
            { label: 'Chờ duyệt / Nháp', val: (overview.audit.byPublishStatus.DRAFT || 0) + (overview.audit.byPublishStatus.PENDING_REVIEW || 0), cls: 'text-amber-700' },
            { label: 'Hồ sơ AI đề xuất', val: overview.audit.aiDraftCount, cls: 'text-rose-700' },
            { label: 'Thiếu nguồn URL', val: overview.audit.missingSourceCount, cls: 'text-rose-700' },
            { label: 'Cảnh báo gần trùng', val: overview.audit.duplicateCount, cls: 'text-slate-700' },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-3">
              <p className={`text-lg font-bold tabular-nums ${m.cls}`}>{m.val}</p>
              <p className="text-[11px] font-semibold text-slate-600">{m.label}</p>
            </div>
          ))}
        </div>

        {/* 6 CMS Submodule Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
          {[
            { id: 'DOSSIERS' as const, label: '1. Hồ sơ & Quy trình Xuất bản', icon: ClipboardCheck },
            { id: 'TAXONOMY' as const, label: '2. Chuyên mục 3 Cấp & Hành trình', icon: Layers },
            { id: 'SOURCES' as const, label: '3. Nguồn Chính thống & Lịch Đồng bộ', icon: Database },
            { id: 'AI_QUEUE' as const, label: '4. Hàng chờ AI · Thiếu nguồn · Trùng lặp', icon: Sparkles },
            { id: 'AUDIT' as const, label: '5. Thống kê & Nhật ký Phân quyền', icon: History },
            { id: 'CORRECTIONS' as const, label: '6. Tiếp nhận Góp ý & Đính chính', icon: ShieldCheck },
          ].map((tb) => {
            const Icon = tb.icon;
            return (
              <button
                key={tb.id}
                type="button"
                onClick={() => setCmsTab(tb.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  cmsTab === tb.id ? 'bg-blue-600 text-white shadow-2xs' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tb.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {bannerMsg && (
        <div
          className={`rounded-2xl border px-4 py-2.5 text-xs font-bold flex items-center justify-between ${
            bannerMsg.type === 'ok'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-rose-200 bg-rose-50 text-rose-900'
          }`}
        >
          <span>{bannerMsg.text}</span>
          <button type="button" onClick={() => setBannerMsg(null)} className="cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 1. DOSSIERS & WORKFLOW */}
      {cmsTab === 'DOSSIERS' && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-xl px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                  statusFilter === st ? 'bg-rose-700 text-white' : 'bg-[#F5F9FF] text-slate-700 hover:bg-blue-50'
                }`}
              >
                {st === 'ALL' ? `Tất cả (${dossiers.length})` : st}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {filteredDossiers.map((d) => (
              <article
                key={d.id}
                className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 font-bold text-blue-800">{d.dossierType}</span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-bold ${
                        d.verificationStatus === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.verificationStatus === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {d.verificationStatus}
                    </span>
                    <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 font-bold text-slate-700">
                      {d.publishStatus} · v{d.version}
                    </span>
                    {d.isAiDraft && (
                      <span className="rounded-md bg-rose-700 px-2 py-0.5 font-bold text-white">AI Đề xuất</span>
                    )}
                    {d.duplicateOfId && (
                      <span className="rounded-md bg-amber-600 px-2 py-0.5 font-bold text-white">
                        Gần trùng: {d.duplicateOfId}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{d.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{d.summary}</p>
                  <p className="text-[11px] text-slate-500">
                    Nguồn: <strong>{d.sourceName || 'Chưa có'}</strong>
                    {d.missingFields.length > 0 && (
                      <span className="text-rose-700 font-semibold ml-2">
                        · Thiếu {d.missingFields.length} tiêu chí ({d.missingFields.slice(0, 2).join(', ')})
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0 text-[11px]">
                  {canContribute && (
                    <button
                      type="button"
                      onClick={() => setEditing({ ...d, changeNote: '' })}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Edit3 className="h-3 w-3" /> Sửa
                    </button>
                  )}
                  {canContribute && d.publishStatus === 'DRAFT' && (
                    <button
                      type="button"
                      disabled={busyId === d.id}
                      onClick={() => void handleWorkflow(d.id, 'SUBMIT_REVIEW')}
                      className="inline-flex items-center gap-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 font-bold cursor-pointer"
                    >
                      <Send className="h-3 w-3" /> Gửi duyệt
                    </button>
                  )}
                  {canApprove && d.verificationStatus !== 'VERIFIED' && (
                    <button
                      type="button"
                      disabled={busyId === d.id}
                      onClick={() => void handleWorkflow(d.id, 'VERIFY')}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 font-bold cursor-pointer"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Kiểm chứng
                    </button>
                  )}
                  {canApprove && d.verificationStatus === 'VERIFIED' && d.publishStatus !== 'PUBLISHED' && (
                    <button
                      type="button"
                      disabled={busyId === d.id}
                      onClick={() => void handleWorkflow(d.id, 'PUBLISH')}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 font-bold cursor-pointer"
                    >
                      Xuất bản
                    </button>
                  )}
                  {canApprove && d.publishStatus !== 'ARCHIVED' && (
                    <button
                      type="button"
                      disabled={busyId === d.id}
                      onClick={() => void handleWorkflow(d.id, 'ARCHIVE')}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <Archive className="h-3 w-3" /> Lưu trữ
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void handleOpenHistory(d.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-[#EFF6FF] px-2.5 py-1.5 font-bold text-blue-700 cursor-pointer"
                  >
                    <GitBranch className="h-3 w-3" /> Lịch sử v{d.version}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 2. TAXONOMY & TOURS */}
      {cmsTab === 'TAXONOMY' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900">Cấp 1: Chuyên mục chính ({overview.categories.length}) &amp; Cấp 2: Nhóm chủ đề ({overview.topics.length})</h4>
            <div className="space-y-2.5">
              {overview.categories.map((cat) => {
                const subTopics = overview.topics.filter((t) => t.categoryId === cat.id);
                return (
                  <div key={cat.id} className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-800">{cat.title}</span>
                      <span className="text-[10.5px] font-mono text-slate-500">/{cat.slug}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{cat.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {subTopics.map((tp) => (
                        <span key={tp.id} className="rounded-lg border border-blue-200 bg-white px-2 py-0.5 text-[10.5px] font-semibold text-slate-700">
                          {tp.title} ({tp.audienceTag})
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900">Quản lý Triển lãm &amp; Hành trình Tham quan ({overview.tours.length})</h4>
            <div className="space-y-2.5">
              {overview.tours.map((tr) => (
                <div key={tr.id} className="rounded-2xl border border-rose-200/80 bg-[#FFFDF9] p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="rounded-md bg-rose-700 px-2 py-0.5 font-bold text-white">{tr.audience}</span>
                    <span className="font-bold text-slate-500">{tr.durationLabel}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900">{tr.title}</p>
                  <p className="text-[11px] text-slate-600">{tr.description}</p>
                  <p className="text-[10.5px] font-mono text-blue-700">Điểm dừng: {tr.dossierIds.join(' → ')}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 3. OFFICIAL SOURCES & SYNC LOGS */}
      {cmsTab === 'SOURCES' && (
        <div className="space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">06 Nguồn Chính thống Đã Kiểm định (RSS / HTML An toàn)</h4>
                <p className="text-xs text-slate-600">Nội dung thu thập mới luôn vào hàng chờ NHÁP (`NEEDS_VERIFICATION`), không bao giờ tự ghi đè hồ sơ đã kiểm chứng.</p>
              </div>
              {canContribute && (
                <button
                  type="button"
                  disabled={busyId === 'all-sources'}
                  onClick={() => void handleSyncSource(undefined, canApprove)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${busyId === 'all-sources' ? 'animate-spin' : ''}`} />
                  <span>Chạy thu thập toàn bộ nguồn</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {overview.sources.map((src) => (
                <article key={src.id} className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-4 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                        {src.fetchMode} · {src.trustTier}
                      </span>
                      <h5 className="mt-1 font-bold text-slate-900">{src.name}</h5>
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-700 hover:underline inline-flex items-center gap-1">
                        {src.url} <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    {canContribute && (
                      <button
                        type="button"
                        disabled={busyId === src.id || !src.isEnabled}
                        onClick={() => void handleSyncSource(src.id, canApprove)}
                        className="rounded-lg bg-rose-700 hover:bg-rose-800 disabled:opacity-40 text-white px-2.5 py-1 text-[11px] font-bold cursor-pointer shrink-0"
                      >
                        Thu thập
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600">{src.licenseNote}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/80 text-[11px]">
                    <span className="text-slate-600">
                      Trạng thái: <strong>{src.lastStatus}</strong> · Đã nhập: <strong>{src.itemsImported}</strong> nháp
                    </span>
                    {canApprove && (
                      <div className="flex items-center gap-1.5">
                        <select
                          value={src.scheduleFreq}
                          onChange={(e) => {
                            void updateHcmSourceConfigV2(src.id, { scheduleFreq: e.target.value as any }).then(onRefreshOverview);
                          }}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 font-bold"
                        >
                          <option value="DAILY">Hằng ngày</option>
                          <option value="WEEKLY">Hằng tuần</option>
                          <option value="MANUAL">Thủ công</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            void updateHcmSourceConfigV2(src.id, { isEnabled: !src.isEnabled }).then(onRefreshOverview);
                          }}
                          className={`rounded-lg px-2 py-0.5 font-bold cursor-pointer ${
                            src.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {src.isEnabled ? 'Đang bật' : 'Tạm tắt'}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Sync Logs */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-2.5 shadow-2xs text-xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" /> Nhật ký Đồng bộ Nguồn ({overview.syncLogs.length})
            </h4>
            {overview.syncLogs.length === 0 ? (
              <p className="text-slate-500">Chưa có lần đồng bộ nào. Bấm &ldquo;Thu thập&rdquo; ở trên để lấy bài mới từ nguồn chính thống.</p>
            ) : (
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {overview.syncLogs.map((lg) => (
                  <div key={lg.id} className="rounded-xl border border-slate-100 bg-[#F8FBFF] px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{lg.sourceName}</span>
                      <span className="text-slate-600 ml-2">{lg.message}</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-slate-500">
                      {lg.status} · {new Date(lg.startedAt).toLocaleString('vi-VN')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* 4. AI QUEUE, MISSING SOURCE & DUPLICATES */}
      {cmsTab === 'AI_QUEUE' && (
        <div className="space-y-4">
          {/* AI Draft Queue */}
          <section className="rounded-3xl border border-rose-200 bg-white p-5 space-y-3 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-rose-700" /> Hàng chờ Kiểm duyệt Hồ sơ AI Đề xuất ({aiDrafts.length})
            </h4>
            {aiDrafts.length === 0 ? (
              <p className="text-xs text-slate-500">Không có hồ sơ AI nào đang chờ duyệt.</p>
            ) : (
              <div className="space-y-2">
                {aiDrafts.map((d) => (
                  <div key={d.id} className="rounded-2xl border border-rose-200/80 bg-[#FFFDF9] p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">{d.title}</p>
                      <p className="text-[11px] text-slate-600">Nguồn: {d.sourceName} · {d.sourceUrl}</p>
                    </div>
                    {canApprove && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => void handleWorkflow(d.id, 'VERIFY')}
                          className="rounded-lg bg-emerald-600 text-white px-2.5 py-1 font-bold cursor-pointer"
                        >
                          Xác minh nguồn
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleWorkflow(d.id, 'REJECT')}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white text-rose-700 px-2.5 py-1 font-bold cursor-pointer"
                        >
                          <XCircle className="h-3 w-3" /> Từ chối
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Incomplete Metadata / Missing Source */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" /> Hồ sơ Thiếu nguồn / Cần hoàn thiện Thông tin ({overview.audit.incompleteDossiers.length})
            </h4>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {overview.audit.incompleteDossiers.map((inc) => (
                <div key={inc.id} className="rounded-2xl border border-amber-200/70 bg-amber-50/40 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{inc.title}</p>
                    <p className="text-[11px] text-rose-800">{inc.missingFields.join(' · ')}</p>
                  </div>
                  {canContribute && (
                    <button
                      type="button"
                      disabled={busyId === inc.id}
                      onClick={() => void handleEnrichProposal(inc.id)}
                      className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-[11px] font-bold cursor-pointer"
                    >
                      AI Đề xuất Bổ sung Nháp
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Near-Duplicates */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CopyCheck className="h-4 w-4 text-blue-600" /> Phát hiện &amp; Xử lý Bản ghi Trùng / Gần trùng ({overview.audit.duplicatePairs.length})
            </h4>
            {overview.audit.duplicatePairs.length === 0 ? (
              <p className="text-xs text-slate-500">Không phát hiện hồ sơ trùng lặp.</p>
            ) : (
              <div className="space-y-2">
                {overview.audit.duplicatePairs.map((dp) => (
                  <div key={dp.dossierId} className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-bold text-slate-900">Bản ghi: {dp.title} ({dp.dossierId})</p>
                      <p className="text-[11px] text-slate-600">Gần trùng ({Math.round(dp.similarity * 100)}%) với: {dp.targetTitle} ({dp.duplicateOfId})</p>
                    </div>
                    {canApprove && (
                      <button
                        type="button"
                        onClick={() => void handleWorkflow(dp.dossierId, 'ARCHIVE')}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Lưu trữ bản trùng
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* 5. AUDIT LOGS */}
      {cmsTab === 'AUDIT' && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs text-xs">
          <h4 className="text-sm font-bold text-slate-900">Nhật ký Thao tác, Kiểm chứng &amp; Phân quyền ({overview.editorialLogs.length})</h4>
          <div className="space-y-1.5 max-h-96 overflow-y-auto">
            {overview.editorialLogs.map((log) => (
              <div key={log.id} className="rounded-xl border border-slate-100 bg-[#F8FBFF] px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800 mr-2">{log.action}</span>
                  <strong className="text-slate-900">{log.actorName}</strong> ({log.actorRole}) ·{' '}
                  <span className="text-slate-700">{log.note}</span>
                </div>
                <span className="font-mono text-[10.5px] text-slate-500">
                  {log.dossierId} · {new Date(log.createdAt).toLocaleString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {cmsTab === 'CORRECTIONS' && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#751D2C]" />
                <span>Tiếp nhận Ý kiến Góp ý &amp; Đề nghị Đính chính từ Nhân dân ({corrections.length})</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kênh phản hồi công khai phục vụ kiểm chứng đa chiều; mọi đề nghị đều được lưu trữ và thẩm định theo quy trình chính thức.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void loadCorrections()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingCorrections ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
          </div>

          {/* Bộ lọc trạng thái xử lý */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: 'ALL', label: 'Tất cả' },
              { key: 'RECEIVED', label: 'Chờ tiếp nhận' },
              { key: 'VERIFYING', label: 'Đang thẩm định đối chiếu' },
              { key: 'RESOLVED', label: 'Đã tiếp thu / Đính chính' },
              { key: 'NEED_MORE_INFO', label: 'Cần thêm căn cứ' },
              { key: 'REJECTED', label: 'Từ chối' },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setCorrectionStatusFilter(f.key)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  correctionStatusFilter === f.key
                    ? 'bg-[#751D2C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Danh sách các đề nghị đính chính */}
          {loadingCorrections ? (
            <div className="py-8 text-center text-slate-400">Đang tải dữ liệu góp ý...</div>
          ) : corrections.length === 0 ? (
            <div className="py-8 text-center text-slate-400 rounded-2xl border border-dashed border-slate-200">
              Không có ý kiến góp ý nào trong mục này.
            </div>
          ) : (
            <div className="space-y-3">
              {corrections.map((cor) => {
                const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
                  RECEIVED: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Chờ tiếp nhận' },
                  VERIFYING: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Đang thẩm định' },
                  RESOLVED: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Đã tiếp thu' },
                  NEED_MORE_INFO: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Cần thêm căn cứ' },
                  REJECTED: { bg: 'bg-rose-100', text: 'text-rose-800', label: 'Từ chối' },
                };
                const st = statusStyles[cor.status] || { bg: 'bg-slate-100', text: 'text-slate-700', label: cor.status };

                return (
                  <div key={cor.id} className="rounded-2xl border border-slate-200 p-4 space-y-2.5 hover:border-slate-300 transition-colors bg-[#FAFAFA]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${st.bg} ${st.text}`}>
                          {st.label}
                        </span>
                        <span className="font-bold text-slate-900 text-xs">
                          {cor.targetTitle}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          [{cor.targetType} / {cor.issueType}]
                        </span>
                      </div>
                      <span className="text-[10.5px] text-slate-400">
                        {new Date(cor.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-100 text-slate-800 leading-relaxed text-xs">
                      <strong className="text-slate-900">Nội dung phản ánh: </strong>
                      {cor.description}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                      {cor.evidenceUrl && (
                        <div>
                          <span>Căn cứ/Nguồn: </span>
                          <a
                            href={cor.evidenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline font-medium hover:text-blue-800"
                          >
                            {cor.evidenceUrl}
                          </a>
                        </div>
                      )}
                      {cor.contactInfo && (
                        <div>
                          <span>Liên hệ người gửi: </span>
                          <strong className="text-slate-700">{cor.contactInfo}</strong>
                        </div>
                      )}
                    </div>

                    {cor.adminNotes && (
                      <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                        <strong>Ghi chú xử lý nội bộ: </strong> {cor.adminNotes}
                      </div>
                    )}

                    {/* Các hành động thẩm định */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Chuyển trạng thái:</span>
                      {cor.status !== 'VERIFYING' && (
                        <button
                          type="button"
                          onClick={() => void handleUpdateCorrection(cor.id, 'VERIFYING', 'Chuyển cán bộ chuyên trách đối chiếu tài liệu gốc.')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 cursor-pointer text-[11px]"
                        >
                          → Đang thẩm định
                        </button>
                      )}
                      {cor.status !== 'RESOLVED' && (
                        <button
                          type="button"
                          onClick={() => {
                            const note = window.prompt('Nhập ghi chú tiếp thu/đính chính (hoặc để trống):', 'Đã đối chiếu nguồn và cập nhật vào hồ sơ tư liệu.');
                            if (note !== null) void handleUpdateCorrection(cor.id, 'RESOLVED', note);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 cursor-pointer text-[11px]"
                        >
                          ✓ Tiếp thu &amp; Đính chính
                        </button>
                      )}
                      {cor.status !== 'NEED_MORE_INFO' && (
                        <button
                          type="button"
                          onClick={() => {
                            const note = window.prompt('Nhập lý do cần thêm thông tin:', 'Chưa cung cấp đường dẫn hoặc tập/trang của tài liệu xuất bản.');
                            if (note !== null) void handleUpdateCorrection(cor.id, 'NEED_MORE_INFO', note);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 cursor-pointer text-[11px]"
                        >
                          ? Cần thêm căn cứ
                        </button>
                      )}
                      {cor.status !== 'REJECTED' && (
                        <button
                          type="button"
                          onClick={() => {
                            const note = window.prompt('Nhập lý do từ chối:', 'Nội dung không phù hợp hoặc không có căn cứ xác thực.');
                            if (note !== null) void handleUpdateCorrection(cor.id, 'REJECTED', note);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 cursor-pointer text-[11px]"
                        >
                          ✕ Từ chối
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Dossier Create/Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={() => setEditing(null)}>
          <form
            onSubmit={handleSaveDossier}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-blue-200 bg-white p-6 shadow-2xl space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editing.id ? `Chỉnh sửa Hồ sơ (${editing.id})` : 'Thêm Hồ sơ Tư liệu Mới (Tự động lưu Nháp)'}
              </h3>
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl p-1 text-slate-500 hover:bg-slate-100 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiêu đề hồ sơ *</label>
                <input
                  type="text"
                  required
                  value={editing.title || ''}
                  onChange={(e) => setEditing((p) => (p ? { ...p, title: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Loại hồ sơ</label>
                <select
                  value={editing.dossierType || 'LOCAL_ACTIVITY'}
                  onChange={(e) => setEditing((p) => (p ? { ...p, dossierType: e.target.value as HcmDossierType } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                >
                  {DOSSIER_TYPES.map((dt) => (
                    <option key={dt.value} value={dt.value}>{dt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên nguồn tham khảo *</label>
                <input
                  type="text"
                  value={editing.sourceName || ''}
                  onChange={(e) => setEditing((p) => (p ? { ...p, sourceName: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Đường dẫn gốc (Source URL)</label>
                <input
                  type="url"
                  value={editing.sourceUrl || ''}
                  onChange={(e) => setEditing((p) => (p ? { ...p, sourceUrl: e.target.value } : p))}
                  placeholder="https://hochiminh.vn/..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mốc thời gian</label>
                <input
                  type="text"
                  value={editing.timelineDate || ''}
                  onChange={(e) => setEditing((p) => (p ? { ...p, timelineDate: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa điểm</label>
                <input
                  type="text"
                  value={editing.location || ''}
                  onChange={(e) => setEditing((p) => (p ? { ...p, location: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Quyền sử dụng</label>
                <input
                  type="text"
                  value={editing.licenseInfo || ''}
                  onChange={(e) => setEditing((p) => (p ? { ...p, licenseInfo: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nội dung tóm tắt *</label>
              <textarea
                rows={2}
                value={editing.summary || ''}
                onChange={(e) => setEditing((p) => (p ? { ...p, summary: e.target.value } : p))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nội dung chi tiết</label>
              <textarea
                rows={4}
                value={editing.content || ''}
                onChange={(e) => setEditing((p) => (p ? { ...p, content: e.target.value } : p))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2 font-bold cursor-pointer">
                Hủy
              </button>
              <button type="submit" disabled={Boolean(busyId)} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-bold cursor-pointer">
                {busyId ? 'Đang lưu...' : 'Lưu phiên bản hồ sơ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Version History & Rollback Modal */}
      {historyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={() => setHistoryData(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-blue-200 bg-white p-6 shadow-2xl space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Lịch sử Phiên bản: {historyData.dossier.title}
              </h3>
              <button type="button" onClick={() => setHistoryData(null)} className="rounded-xl p-1 text-slate-500 hover:bg-slate-100 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              {historyData.versions.map((ver) => (
                <div key={ver.id} className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="rounded bg-blue-600 text-white px-2 py-0.5 font-bold mr-2">v{ver.versionNum}</span>
                    <strong>{ver.actorName}</strong> · <span>{ver.changeNote}</span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Trạng thái: {ver.snapshot.publishStatus} / {ver.snapshot.verificationStatus} ·{' '}
                      {new Date(ver.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  {canApprove && ver.versionNum !== historyData.dossier.version && (
                    <button
                      type="button"
                      onClick={() => void handleRollback(historyData.dossier.id, ver.versionNum)}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" /> Khôi phục v{ver.versionNum}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
