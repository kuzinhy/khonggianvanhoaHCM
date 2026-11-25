import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Info,
  Maximize2,
  FileText,
  Search,
  Eye,
  Check,
  Award,
} from 'lucide-react';
import {
  HISTORICAL_HANDWRITING_COLLECTION,
  type HandwritingDocument,
} from '../data/hcmAdvancedFeaturesData';

interface HcmHandwritingDeepZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HcmHandwritingDeepZoomModal: React.FC<HcmHandwritingDeepZoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>('hw_dichuc_1965');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('hs_01');
  const [speaking, setSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const doc: HandwritingDocument =
    HISTORICAL_HANDWRITING_COLLECTION.find((d) => d.id === selectedDocId) ||
    HISTORICAL_HANDWRITING_COLLECTION[0];

  const currentHotspot =
    doc.annotatedHotspots.find((h) => h.id === selectedHotspotId) ||
    doc.annotatedHotspots[0];

  const handleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const text = `Điểm phân tích ${currentHotspot.label}. Từ ban đầu: ${currentHotspot.originalWord}. Từ Bác sửa lại: ${currentHotspot.revisedWord}. Giải thích: ${currentHotspot.explanation}. Bài học: ${currentHotspot.moralLesson}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl border-2 border-amber-300 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div
          className="bg-[#751D2C] bg-gradient-to-r from-[#751D2C] via-[#8E2435] to-[#751D2C] px-5 sm:px-6 py-4 text-white flex items-start justify-between gap-4 shrink-0 shadow-md"
          style={{ backgroundColor: '#751D2C' }}
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-700" />
              <span>Bảo Vật Quốc Gia · Kính Lúp Kỹ Thuật Số Siêu Nét</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug">
              Kính Lúp Soi Bản Thảo Bút Tích Viết Tay Bác Hồ
            </h3>
            <p className="text-xs text-amber-200">
              Khám phá sự tinh tế, cẩn trọng trong từng câu chữ của Bản Di chúc và Tuyên ngôn Độc lập
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white cursor-pointer transition-colors shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Document Switcher & Zoom Toolbar */}
        <div className="bg-amber-50/70 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 text-xs flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
            <span className="font-bold text-slate-700 hidden sm:inline whitespace-nowrap">Chọn bản thảo:</span>
            {HISTORICAL_HANDWRITING_COLLECTION.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDocId(d.id);
                  setSelectedHotspotId(d.annotatedHotspots[0]?.id || '');
                  setZoomLevel(1);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border whitespace-nowrap text-xs ${
                  selectedDocId === d.id
                    ? 'bg-[#751D2C] text-white border-[#751D2C] shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60 border-slate-200'
                }`}
              >
                {d.id === 'hw_dichuc_1965' ? '📜 Di Chúc Viết Tay (1965)' : '📜 Tuyên Ngôn Độc Lập (1945)'}
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
              className="p-1 rounded text-slate-700 hover:bg-slate-100 cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#751D2C] px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
              className="p-1 rounded text-slate-700 hover:bg-slate-100 cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded text-slate-700 hover:bg-slate-100 cursor-pointer"
              title="Đặt lại 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Canvas: Left Deep Zoom Document Canvas, Right Annotated Hotspot Explanation */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 overflow-y-auto flex-1">
          {/* Left Canvas with Zoom & Interactive Hotspots */}
          <div className="md:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-800">{doc.subtitle}</span>
              <span>{doc.totalAnnotations} điểm gạch xóa phân tích</span>
            </div>

            <div className="relative h-96 sm:h-[480px] rounded-2xl border-2 border-amber-300/80 bg-stone-900 overflow-hidden flex items-center justify-center shadow-inner">
              <div
                className="relative transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={doc.rawImageUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = doc.fallbackImageUrl;
                  }}
                  alt={doc.title}
                  className="max-h-[440px] w-auto max-w-full object-contain rounded-lg shadow-2xl select-none"
                />

                {/* Hotspot Pins Overlay */}
                {doc.annotatedHotspots.map((hs, idx) => {
                  const isSelected = selectedHotspotId === hs.id;
                  return (
                    <button
                      key={hs.id}
                      type="button"
                      onClick={() => setSelectedHotspotId(hs.id)}
                      style={{
                        position: 'absolute',
                        top: `${hs.yPercent}%`,
                        left: `${hs.xPercent}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`group z-20 flex items-center justify-center w-7 h-7 rounded-full shadow-lg transition-transform cursor-pointer ${
                        isSelected
                          ? 'bg-red-600 text-white ring-4 ring-yellow-400 scale-125 animate-pulse'
                          : 'bg-amber-400 text-slate-950 hover:scale-110 ring-2 ring-white'
                      }`}
                      title={hs.label}
                    >
                      <span className="text-[11px] font-black">{idx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Watermark plaque */}
              <div className="pointer-events-none absolute bottom-2 left-2 bg-slate-950/80 text-amber-200 px-2.5 py-1 rounded-md text-[10.5px]">
                {doc.dimensions} · Niên đại: {doc.year}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic text-center">
              💡 Bấm vào các nút số màu vàng trên bản thảo để xem chi tiết lý do Bác gạch xóa sửa từ.
            </div>
          </div>

          {/* Right Explanation Panel for Selected Hotspot */}
          <div className="md:col-span-5 rounded-2xl border-2 border-amber-200 bg-white p-5 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-amber-100 text-amber-900 px-2.5 py-0.5 text-xs font-black">
                  Điểm Soi Rọi: {currentHotspot.label}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {doc.year}
                </span>
              </div>

              {/* Before vs After Words Comparison */}
              <div className="space-y-2">
                <div className="rounded-xl bg-red-50/70 border border-red-200 p-2.5 text-xs">
                  <span className="font-bold text-red-800 line-through block text-[11px]">
                    Từ ngữ ban đầu Bác viết:
                  </span>
                  <span className="text-slate-700 italic">"{currentHotspot.originalWord}"</span>
                </div>

                <div className="rounded-xl bg-emerald-50/80 border-2 border-emerald-300 p-2.5 text-xs">
                  <span className="font-black text-emerald-900 block text-[11px]">
                    Từ ngữ Bác cẩn trọng sửa lại:
                  </span>
                  <span className="text-emerald-950 font-bold">"{currentHotspot.revisedWord}"</span>
                </div>
              </div>

              {/* Explanation of Why Uncle Ho Revised */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <span className="text-xs font-bold text-[#751D2C] uppercase tracking-wider block">
                  Phân tích bảo tàng học &amp; Ngữ nghĩa:
                </span>
                <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed">
                  {currentHotspot.explanation}
                </p>
              </div>

              {/* Moral Lesson */}
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-3.5 space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Bài học về sự cẩn trọng &amp; Đạo đức công vụ:
                </span>
                <p className="text-xs sm:text-[13px] text-amber-950 font-medium leading-relaxed">
                  {currentHotspot.moralLesson}
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSpeech}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  speaking ? 'bg-rose-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{speaking ? 'Dừng đọc' : 'Nghe phân tích'}</span>
              </button>

              <span className="text-[11px] text-slate-500 font-mono">
                Bảo vật Quốc gia
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 text-[11px] hidden sm:inline">
            Tư liệu Cục Lưu trữ Văn phòng Trung ương Đảng &amp; Bảo tàng Hồ Chí Minh
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-1.5 font-bold text-white cursor-pointer ml-auto"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
