import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  CheckCircle2,
  ClipboardCheck,
  Edit3,
  Plus,
  Printer,
  QrCode,
  Save,
  Trash2,
  Users,
} from 'lucide-react';
import { EVALUATION_CRITERIA_5 } from '../hcmCoreDataset';
import type { HcmChecklistMap, HcmCulturalEntryDto } from '../hcmSpaceClient';

const DEFAULT_WARD_UNITS = [
  'Đảng ủy phường Thủ Dầu Một (Chung)',
  'Chi bộ Khu phố 1',
  'Chi bộ Khu phố 2',
  'Chi bộ Khu phố 3',
  'Chi bộ Khu phố 4',
  'Chi bộ Cơ quan Đảng ủy phường',
];

export const HcmEvaluationAndModelsView: React.FC<{
  mode: 'EVALUATION' | 'MODELS';
  models: HcmCulturalEntryDto[];
  checklist: HcmChecklistMap;
  canEdit: boolean;
  onSaveChecklist: (unitName: string, checked: Record<string, boolean>) => Promise<void>;
  onAddModel: () => void;
  onEditEntry: (entry: HcmCulturalEntryDto) => void;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => void;
}> = ({
  mode,
  models,
  checklist,
  canEdit,
  onSaveChecklist,
  onAddModel,
  onEditEntry,
  onDeleteEntry,
}) => {
  const [selectedUnit, setSelectedUnit] = useState(DEFAULT_WARD_UNITS[0]);
  const [localChecked, setLocalChecked] = useState<Record<string, boolean>>({});
  const [savingCheck, setSavingCheck] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    setLocalChecked(checklist[selectedUnit] || {});
  }, [selectedUnit, checklist]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const targetUrl = `${window.location.origin}/khong-gian-van-hoa-ho-chi-minh`;
    QRCode.toDataURL(targetUrl, { width: 220, margin: 1 })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, []);

  const totalScore = useMemo(() => {
    let score = 0;
    for (const crit of EVALUATION_CRITERIA_5) {
      const done = crit.items.filter((it) => Boolean(localChecked[it.id])).length;
      score += (done / crit.items.length) * crit.weightPercent;
    }
    return Math.round(score);
  }, [localChecked]);

  const totalCheckedCount = Object.values(localChecked).filter(Boolean).length;

  const handleSave = async () => {
    setSavingCheck(true);
    try {
      await onSaveChecklist(selectedUnit, localChecked);
    } finally {
      setSavingCheck(false);
    }
  };

  if (mode === 'MODELS') {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Bài viết &amp; Mô hình Học tập và Làm theo Bác — Phường Thủ Dầu Một ({models.length})
            </h3>
          </div>
          {canEdit && (
            <button
              type="button"
              onClick={onAddModel}
              className="inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Thêm mô hình / Bài viết Thủ Dầu Một
            </button>
          )}
        </div>

        {models.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-[#F8FBFF] p-8 text-center space-y-2">
            <p className="text-xs font-bold text-slate-800">
              Chưa có bài viết mô hình nào của phường Thủ Dầu Một được đăng tải.
            </p>
            <p className="text-[11.5px] text-slate-600 max-w-xl mx-auto">
              Bấm <strong>&ldquo;+ Thêm mô hình / Bài viết Thủ Dầu Một&rdquo;</strong> hoặc sang tab{' '}
              <strong>AI Tham mưu</strong> để soạn và lưu mô hình riêng của phường Thủ Dầu Một.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-4 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      {item.subtitle || 'Phường Thủ Dầu Một'}
                    </span>
                    {item.location && <span className="text-[10.5px] font-semibold text-slate-500">{item.location}</span>}
                  </div>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="h-40 w-full rounded-xl object-cover border border-slate-200" />
                  )}
                  <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
                  {item.summary && <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{item.summary}</p>}
                  {item.quote && (
                    <blockquote className="rounded-xl border-l-2 border-rose-500 bg-white px-3 py-2 text-[11.5px] italic text-slate-700">
                      {item.quote}
                    </blockquote>
                  )}
                </div>

                {canEdit && (
                  <div className="flex items-center justify-end gap-1.5 border-t border-slate-200/70 pt-2">
                    <button
                      type="button"
                      onClick={() => onEditEntry(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Edit3 className="h-3 w-3" /> Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteEntry(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1 text-[11px] font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" /> Xóa
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left 8 cols: 5 Criteria + 20-Item Interactive Checklist */}
      <div className="lg:col-span-8 space-y-4">
        <div className="rounded-2xl border border-blue-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase text-slate-500">Đơn vị / Chi bộ đánh giá tại Phường Thủ Dầu Một</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="rounded-xl border border-slate-200 bg-[#F8FBFF] px-3 py-1.5 text-xs font-bold text-slate-800"
            >
              {DEFAULT_WARD_UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xl font-black text-blue-700">{totalScore}%</p>
              <p className="text-[10.5px] font-bold text-slate-500">{totalCheckedCount}/20 tiêu chí đạt</p>
            </div>
            {canEdit && (
              <button
                type="button"
                disabled={savingCheck}
                onClick={() => void handleSave()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white cursor-pointer disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{savingCheck ? 'Đang lưu...' : 'Lưu kết quả đánh giá'}</span>
              </button>
            )}
          </div>
        </div>

        {EVALUATION_CRITERIA_5.map((crit) => {
          const doneCount = crit.items.filter((it) => Boolean(localChecked[it.id])).length;
          return (
            <section key={crit.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10.5px] font-black text-rose-800">
                    Trọng số {crit.weightPercent}%
                  </span>
                  <h4 className="mt-1 text-sm font-extrabold text-slate-900">{crit.title}</h4>
                  <p className="text-xs text-slate-600">{crit.description}</p>
                </div>
                <span className="rounded-xl bg-[#EFF6FF] px-2.5 py-1 text-xs font-black text-blue-700">
                  {doneCount}/{crit.items.length} mục
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {crit.items.map((item) => {
                  const checked = Boolean(localChecked[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-xs cursor-pointer transition-colors ${
                        checked ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-100 bg-[#F8FBFF] hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={!canEdit}
                        onChange={(e) =>
                          setLocalChecked((prev) => ({ ...prev, [item.id]: e.target.checked }))
                        }
                        className="mt-0.5 h-4 w-4 rounded accent-blue-600"
                      />
                      <span className={checked ? 'font-semibold text-slate-900' : 'text-slate-700'}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Right 4 cols: Printable A4 QR Poster & Media Kit */}
      <div className="lg:col-span-4 space-y-4">
        <section className="rounded-3xl border border-rose-200 bg-gradient-to-b from-[#FFFDF9] to-white p-5 shadow-2xs text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-0.5 text-[10.5px] font-black text-rose-800">
            <QrCode className="h-3.5 w-3.5" /> Ấn phẩm QR Niêm Yết Khu Phố / Chi Bộ
          </div>
          <h4 className="text-sm font-black text-slate-900">
            Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một
          </h4>
          {qrDataUrl && (
            <div className="mx-auto inline-block rounded-2xl border-2 border-amber-300 bg-white p-3 shadow-xs">
              <img src={qrDataUrl} alt="QR Không gian Văn hóa HCM Phường Thủ Dầu Một" className="h-44 w-44" />
            </div>
          )}
          <p className="text-[11px] text-slate-600">
            Quét mã để truy cập Tủ sách Bác Hồ, Phòng Trưng bày số và Tư liệu học tập, thực hành Kết luận số 01-KL/TW (tiếp tục thực hiện Chỉ thị 05-CT/TW) &amp; Quy định 144-QĐ/TW tại địa bàn phường Thủ Dầu Một.
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 px-4 py-2 text-xs font-bold text-white cursor-pointer w-full"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>In Poster QR / Phiếu thẩm định A4</span>
          </button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 text-xs">
          <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
            <ClipboardCheck className="h-4 w-4 text-blue-600" /> Thang xếp loại gợi ý (Đảng ủy phường)
          </p>
          <p className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" /> Từ 85% trở lên: Đạt chuẩn Tiêu biểu
          </p>
          <p className="text-slate-600">Từ 70% – 84%: Đạt chuẩn Không gian Văn hóa HCM</p>
          <p className="text-slate-600">Dưới 70%: Cần bổ sung thiết chế &amp; mô hình thực tế</p>
        </section>
      </div>
    </div>
  );
};
