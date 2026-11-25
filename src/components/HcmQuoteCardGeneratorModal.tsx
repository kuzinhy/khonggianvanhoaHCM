import React, { useState, useRef, useEffect } from 'react';
import {
  Quote,
  X,
  Copy,
  Download,
  Share2,
  Sparkles,
  Check,
  Palette,
  Printer,
  Image as ImageIcon,
  Smartphone,
  Square,
  RectangleHorizontal,
} from 'lucide-react';
import {
  VERIFIED_QUOTES_12,
  ADDITIONAL_COMMENDED_QUOTES_4,
  type VerifiedQuote,
} from '../hcmCoreDataset';
import { DongSonDrumIcon, HoaSenIcon } from './TraditionalMotifs';
import { HcmTraditionalQuoteCard } from './HcmTraditionalQuoteCard';

interface HcmQuoteCardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuote?: VerifiedQuote;
  initialQuoteText?: string;
  initialQuoteSource?: string;
}

type CardTheme = 'TRADITIONAL_HERITAGE' | 'CRIMSON' | 'LOTUS' | 'PARCHMENT';
type CardRatio = 'SQUARE' | 'STORY' | 'LANDSCAPE';

const ALL_QUOTES: VerifiedQuote[] = [
  ...VERIFIED_QUOTES_12,
  ...ADDITIONAL_COMMENDED_QUOTES_4,
];

export const HcmQuoteCardGeneratorModal: React.FC<HcmQuoteCardGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialQuote,
  initialQuoteText,
  initialQuoteSource,
}) => {
  const [selectedQuote, setSelectedQuote] = useState<VerifiedQuote>(initialQuote || ALL_QUOTES[0]);
  const [customText, setCustomText] = useState(initialQuote?.quote || initialQuoteText || '');
  const [customSource, setCustomSource] = useState(initialQuote?.source || initialQuoteSource || '');
  const [theme, setTheme] = useState<CardTheme>('TRADITIONAL_HERITAGE');
  const [ratio, setRatio] = useState<CardRatio>('SQUARE');
  const [unitSignature, setUnitSignature] = useState('Đảng bộ Phường Thủ Dầu Một');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (initialQuote) {
      setSelectedQuote(initialQuote);
      setCustomText(initialQuote.quote);
      setCustomSource(initialQuote.source);
    } else {
      if (initialQuoteText) {
        setCustomText(initialQuoteText);
      }
      if (initialQuoteSource) {
        setCustomSource(initialQuoteSource);
      }
    }
  }, [initialQuote, initialQuoteText, initialQuoteSource]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quoteText = customText.trim() || selectedQuote.quote;
  const quoteSource = customSource.trim() || selectedQuote.source;
  const quoteContext = selectedQuote.context;

  const handleCopyText = () => {
    const fullText = `“${quoteText}”\n— Chủ tịch Hồ Chí Minh\n🏛️ Nguồn: ${quoteSource}\n📌 ${unitSignature} — Không Gian Văn Hóa Hồ Chí Minh`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Tạo và tải ảnh PNG độ phân giải cao sử dụng HTML5 Canvas
   */
  const handleDownloadImage = () => {
    setIsExporting(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Kích thước chuẩn
      let width = 1080;
      let height = 1080;

      if (ratio === 'STORY') {
        width = 1080;
        height = 1920;
      } else if (ratio === 'LANDSCAPE') {
        width = 1200;
        height = 675;
      }

      canvas.width = width;
      canvas.height = height;

      // 1. Vẽ nền gradient & họa tiết
      if (theme === 'TRADITIONAL_HERITAGE') {
        // Nền giấy điệp / giấy lụa vàng kem cổ điển
        const bgGrad = ctx.createRadialGradient(
          width / 2, height / 2, width * 0.1,
          width / 2, height / 2, width * 0.75
        );
        bgGrad.addColorStop(0, '#FFFDF8');
        bgGrad.addColorStop(0.45, '#FAF3DF');
        bgGrad.addColorStop(0.85, '#F5E7CA');
        bgGrad.addColorStop(1, '#EFE0BF');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Soft vignette
        const vignette = ctx.createRadialGradient(
          width / 2, height / 2, width * 0.4,
          width / 2, height / 2, width * 0.72
        );
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(180, 140, 80, 0.12)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        const strokeColor = '#84181D';
        const margin = 50;

        // Khung viền ngoài chữ nhật
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

        // Khung viền chỉ mảnh phía trong
        ctx.lineWidth = 1.5;
        const innerMargin = margin + 14;
        ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

        // 4 góc hồi văn kỷ hà đối xứng
        const drawFret = (cx: number, cy: number, flipX: number, flipY: number) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(flipX, flipY);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(14, 45);
          ctx.lineTo(14, 14);
          ctx.lineTo(45, 14);
          ctx.lineTo(45, 30);
          ctx.lineTo(28, 30);
          ctx.lineTo(28, 20);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(28, 20, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = strokeColor;
          ctx.fill();
          ctx.restore();
        };

        drawFret(margin, margin, 1, 1);
        drawFret(width - margin, margin, -1, 1);
        drawFret(margin, height - margin, 1, -1);
        drawFret(width - margin, height - margin, -1, -1);

        // Hoa sen thủy mặc góc dưới
        const drawLotus = (x: number, y: number, scale: number, flipX: number) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(scale * flipX, scale);
          const petals = [
            { d: 'M 0 -70 C 20 -40 30 -10 0 15 C -30 -10 -20 -40 0 -70 Z', color: 'rgba(235, 100, 130, 0.65)' },
            { d: 'M 0 -55 C 35 -35 45 -5 15 15 C 0 5 0 -20 0 -55 Z', color: 'rgba(244, 140, 165, 0.55)' },
            { d: 'M 0 -55 C -35 -35 -45 -5 -15 15 C 0 5 0 -20 0 -55 Z', color: 'rgba(244, 140, 165, 0.55)' },
            { d: 'M 5 -40 C 45 -20 50 15 20 20 C 5 15 0 0 5 -40 Z', color: 'rgba(251, 180, 195, 0.45)' },
            { d: 'M -5 -40 C -45 -20 -50 15 -20 20 C -5 15 0 0 -5 -40 Z', color: 'rgba(251, 180, 195, 0.45)' },
          ];
          petals.forEach((p) => {
            ctx.fillStyle = p.color;
            ctx.fill(new Path2D(p.d));
          });
          ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.beginPath();
          ctx.arc(0, 0, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(34, 130, 100, 0.35)';
          ctx.beginPath();
          ctx.ellipse(-15, 30, 45, 20, -0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        };

        drawLotus(margin + 90, height - margin - 80, 1.4, 1);
        drawLotus(width - margin - 100, height - margin - 85, 1.35, -1);

        // Nội dung trích dẫn
        ctx.fillStyle = strokeColor;
        ctx.textAlign = 'center';
        ctx.font = 'italic bold 70px "Playfair Display", "Merriweather", "Noto Serif", serif';
        ctx.fillText('“', width / 2 - 280, height * 0.33);

        const maxTextWidth = width - 260;
        const words = quoteText.split(' ');
        const lines: string[] = [];
        let curLine = '';
        const quoteFontSize = ratio === 'STORY' ? 56 : width < 1200 ? 50 : 54;
        ctx.font = `italic bold ${quoteFontSize}px "Playfair Display", "Merriweather", "Noto Serif", serif`;

        for (let i = 0; i < words.length; i++) {
          const testLine = curLine + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextWidth && i > 0) {
            lines.push(curLine.trim());
            curLine = words[i] + ' ';
          } else {
            curLine = testLine;
          }
        }
        lines.push(curLine.trim());

        const lineHeight = quoteFontSize * 1.5;
        const totalQuoteHeight = lines.length * lineHeight;
        const startQuoteY = height * 0.38 - totalQuoteHeight / 3;

        for (let j = 0; j < lines.length; j++) {
          const lineText = j === lines.length - 1 ? `${lines[j]} ”` : lines[j];
          ctx.fillText(lineText, width / 2, startQuoteY + j * lineHeight);
        }

        // Đường kẻ phân cách & Sen đỏ
        const dividerY = startQuoteY + totalQuoteHeight + 40;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 160, dividerY);
        ctx.lineTo(width / 2 - 24, dividerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width / 2 + 24, dividerY);
        ctx.lineTo(width / 2 + 160, dividerY);
        ctx.stroke();

        ctx.save();
        ctx.translate(width / 2, dividerY);
        ctx.fillStyle = strokeColor;
        ctx.fill(new Path2D('M 0 -16 C 5 -7 7 3 0 10 C -7 3 -5 -7 0 -16 Z M 0 -10 C 9 -4 14 5 7 10 C 1 9 0 4 0 -10 Z M 0 -10 C -9 -4 -14 5 -7 10 C -1 9 0 4 0 -10 Z M -12 7 Q 0 15 12 7 Q 0 10 -12 7 Z'));
        ctx.restore();

        // Tác giả
        const authorY = dividerY + 60;
        ctx.font = 'italic bold 36px "Playfair Display", "Merriweather", "Noto Serif", serif';
        ctx.fillStyle = strokeColor;
        ctx.fillText('— Chủ tịch Hồ Chí Minh —', width / 2, authorY);

        // Hộp sự kiện lịch sử dưới cùng
        const contextY = height - margin - 55;
        const boxWidth = Math.min(width - 160, 720);
        const boxHeight = 44;
        ctx.strokeStyle = 'rgba(132, 24, 29, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(width / 2 - boxWidth / 2, contextY - 30, boxWidth, boxHeight);

        ctx.fillStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(width / 2 - boxWidth / 2, contextY - 8, 3, 0, Math.PI * 2);
        ctx.arc(width / 2 + boxWidth / 2, contextY - 8, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'italic 21px "Playfair Display", "Merriweather", "Noto Serif", serif';
        ctx.fillStyle = strokeColor;
        ctx.fillText(quoteContext || quoteSource, width / 2, contextY - 2);

        // Xuất ảnh và hoàn tất
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `Thiep-Di-San-Truyen-Thong-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        return;
      }

      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (theme === 'CRIMSON') {
        bgGrad.addColorStop(0, '#881337'); // Rose 900
        bgGrad.addColorStop(0.5, '#9f1239'); // Rose 800
        bgGrad.addColorStop(1, '#4c0519'); // Rose 950
      } else if (theme === 'LOTUS') {
        bgGrad.addColorStop(0, '#be123c'); // Rose 700
        bgGrad.addColorStop(0.5, '#e11d48'); // Rose 600
        bgGrad.addColorStop(1, '#881337'); // Rose 900
      } else {
        // PARCHMENT
        bgGrad.addColorStop(0, '#fef3c7'); // Amber 100
        bgGrad.addColorStop(0.5, '#fde68a'); // Amber 200
        bgGrad.addColorStop(1, '#f59e0b'); // Amber 500
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Viền khung vàng kim sắc nét
      ctx.strokeStyle = theme === 'PARCHMENT' ? '#92400e' : '#fbbf24';
      ctx.lineWidth = 14;
      ctx.strokeRect(32, 32, width - 64, height - 64);

      ctx.lineWidth = 3;
      ctx.strokeRect(46, 46, width - 92, height - 92);

      // 3. Header thiệp
      ctx.fillStyle = theme === 'PARCHMENT' ? '#78350f' : '#fef08a';
      ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★ KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH ★', width / 2, 95);

      ctx.fillStyle = theme === 'PARCHMENT' ? '#92400e' : '#fde68a';
      ctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
      ctx.fillText(unitSignature.toUpperCase(), width / 2, 130);

      // 4. Đường kẻ phân cách
      ctx.strokeStyle = theme === 'PARCHMENT' ? 'rgba(146, 64, 14, 0.4)' : 'rgba(251, 191, 36, 0.5)';
      ctx.beginPath();
      ctx.moveTo(width / 2 - 180, 155);
      ctx.lineTo(width / 2 + 180, 155);
      ctx.stroke();

      // 5. Biểu tượng dấu ngoặc kép
      ctx.font = 'italic bold 75px "Merriweather", serif';
      ctx.fillStyle = theme === 'PARCHMENT' ? 'rgba(180, 83, 9, 0.45)' : 'rgba(254, 240, 138, 0.4)';
      ctx.fillText('“', width / 2, height * 0.3);

      // 6. Vẽ nội dung câu trích dẫn (Tự động ngắt dòng văn bản)
      ctx.fillStyle = theme === 'PARCHMENT' ? '#451a03' : '#ffffff';
      const quoteFontSize = ratio === 'STORY' ? 44 : width < 1200 ? 38 : 34;
      ctx.font = `bold italic ${quoteFontSize}px "Merriweather", serif`;

      const maxTextWidth = width - 180;
      const words = quoteText.split(' ');
      let currentLine = '';
      const lines: string[] = [];

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextWidth && i > 0) {
          lines.push(currentLine.trim());
          currentLine = words[i] + ' ';
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine.trim());

      const lineHeight = quoteFontSize * 1.55;
      const startY = height * 0.38 - (lines.length * lineHeight) / 3;

      for (let j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], width / 2, startY + j * lineHeight);
      }

      // 7. Tác giả & Chân dung danh xưng
      const authorY = startY + lines.length * lineHeight + 55;
      ctx.fillStyle = theme === 'PARCHMENT' ? '#9a3412' : '#fef08a';
      ctx.font = 'bold 30px "Merriweather", serif';
      ctx.fillText('— CHỦ TỊCH HỒ CHÍ MINH —', width / 2, authorY);

      ctx.fillStyle = theme === 'PARCHMENT' ? '#78350f' : '#fde68a';
      ctx.font = '500 21px "Be Vietnam Pro", sans-serif';
      ctx.fillText('(1890 — 1969)', width / 2, authorY + 34);

      // 8. Nguồn văn kiện Cấp A
      const sourceY = authorY + 80;
      ctx.fillStyle = theme === 'PARCHMENT' ? '#451a03' : '#fed7aa';
      ctx.font = 'italic 20px "Be Vietnam Pro", sans-serif';
      ctx.fillText(`Nguồn tham chiếu: ${quoteSource}`, width / 2, sourceY);

      // 9. Footer: Tem nhận diện & Chỉ thị 07
      const footerY = height - 70;
      ctx.fillStyle = theme === 'PARCHMENT' ? '#78350f' : '#fef08a';
      ctx.font = 'bold 18px "Be Vietnam Pro", sans-serif';
      ctx.fillText('Thực hiện Chỉ thị 07-CT/TW & Quy định 144-QĐ/TW của Bộ Chính trị', width / 2, footerY);

      // Tạo link download ảnh
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Thiep-Di-San-Bac-Ho-${theme.toLowerCase()}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Lỗi xuất thiệp:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Left: Interactive Controls */}
        <div className="w-full md:w-5/12 p-5 sm:p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-red-700" />
              <h3 className="text-base font-black text-slate-900 font-serif">
                Tạo Thiệp Di Sản Lời Bác Dạy
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-1 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chọn phong cách thiệp */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              1. Phong cách mỹ thuật thiệp
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => setTheme('TRADITIONAL_HERITAGE')}
                className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  theme === 'TRADITIONAL_HERITAGE'
                    ? 'border-[#84181D] bg-[#FAF3DF] text-[#84181D] ring-2 ring-[#84181D]/40 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📜 Giấy Điệp Cổ Điển</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('CRIMSON')}
                className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  theme === 'CRIMSON'
                    ? 'border-red-700 bg-red-50 text-red-900 ring-2 ring-red-500/50'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🏮 Đỏ Lễ Hội</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('LOTUS')}
                className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  theme === 'LOTUS'
                    ? 'border-rose-700 bg-rose-50 text-rose-900 ring-2 ring-rose-500/50'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🌸 Hồng Sen Vàng</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('PARCHMENT')}
                className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  theme === 'PARCHMENT'
                    ? 'border-amber-700 bg-amber-50 text-amber-950 ring-2 ring-amber-600/50'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📜 Giấy Sắc Phong</span>
              </button>
            </div>
          </div>

          {/* Chọn tỷ lệ khung ảnh mạng xã hội */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              2. Kích thước đăng Mạng Xã Hội
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRatio('SQUARE')}
                className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  ratio === 'SQUARE'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/40'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Square className="w-4 h-4" />
                <span>Vuông 1:1 (Feed)</span>
              </button>
              <button
                type="button"
                onClick={() => setRatio('STORY')}
                className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  ratio === 'STORY'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/40'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Dọc 9:16 (Story)</span>
              </button>
              <button
                type="button"
                onClick={() => setRatio('LANDSCAPE')}
                className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  ratio === 'LANDSCAPE'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/40'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <RectangleHorizontal className="w-4 h-4" />
                <span>Ngang 16:9</span>
              </button>
            </div>
          </div>

          {/* Chọn câu trích dẫn mẫu */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              3. Chọn câu nói của Bác (16 trích dẫn Cấp A)
            </label>
            <select
              value={selectedQuote.id}
              onChange={(e) => {
                const found = ALL_QUOTES.find((q) => q.id === e.target.value);
                if (found) {
                  setSelectedQuote(found);
                  setCustomText('');
                  setCustomSource('');
                }
              }}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-red-600"
            >
              {ALL_QUOTES.map((q) => (
                <option key={q.id} value={q.id}>
                  [{q.theme}] {q.quote.slice(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          {/* Tùy chỉnh câu trích dẫn */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              4. Hoặc nhập trích dẫn tùy chọn
            </label>
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Nhập câu nói hoặc thông điệp của Bác..."
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Ký danh Chi bộ / Đơn vị */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              5. Đơn vị phát hành / Chi bộ ký danh
            </label>
            <input
              type="text"
              value={unitSignature}
              onChange={(e) => setUnitSignature(e.target.value)}
              placeholder="Ví dụ: Chi bộ Khu phố 1..."
              className="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800"
            />
          </div>

          {/* Các nút hành động chính */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-700 via-rose-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4 text-yellow-300" />
              <span>{isExporting ? 'Đang tạo ảnh...' : 'Tải Ảnh Thiệp PNG (Đăng Mạng Xã Hội)'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="w-full py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép văn bản & nguồn!' : 'Sao chép nội dung & trích dẫn'}</span>
            </button>
          </div>
        </div>

        {/* Right: Live Visual Preview Card */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between items-center bg-[#151515] relative overflow-y-auto">
          <button
            type="button"
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-bold text-yellow-300/90 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            BẢN XEM TRƯỚC THIỆP DI SẢN (SẴN SÀNG CHIA SẺ)
          </span>

          {/* THE PREVIEW CARD */}
          {theme === 'TRADITIONAL_HERITAGE' ? (
            <div className="w-full flex justify-center py-1">
              <HcmTraditionalQuoteCard
                quote={quoteText}
                author="Chủ tịch Hồ Chí Minh"
                context={quoteContext || quoteSource}
                source={quoteSource}
                unitSignature={unitSignature}
                ratio={ratio}
                showActions={false}
                className="w-full"
              />
            </div>
          ) : (
            <div
              ref={cardRef}
              className={`w-full ${
                ratio === 'STORY' ? 'max-w-xs aspect-[9/16]' : ratio === 'LANDSCAPE' ? 'max-w-md aspect-[16/9]' : 'max-w-sm aspect-square'
              } rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300 border-2 flex flex-col justify-between ${
                theme === 'CRIMSON'
                  ? 'bg-gradient-to-br from-[#80070B] via-[#991B1E] to-[#4c0519] text-white border-amber-300'
                  : theme === 'LOTUS'
                  ? 'bg-gradient-to-br from-[#be123c] via-[#e11d48] to-[#881337] text-white border-rose-300'
                  : 'bg-gradient-to-br from-[#FAF3E0] via-[#F4E8CB] to-[#E9D6AF] text-amber-950 border-amber-700'
              }`}
            >
              {/* Watermark Trong Dong chìm */}
              <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none text-amber-200">
                <DongSonDrumIcon size={260} />
              </div>

              {/* Top Ribbon */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-current/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-red-950 font-black text-xs flex items-center justify-center">
                    ★
                  </div>
                  <div className="text-left">
                    <p className="text-[9.5px] uppercase font-bold tracking-wider opacity-90">
                      Không Gian Văn Hóa Hồ Chí Minh
                    </p>
                    <p className="text-[11px] font-black">{unitSignature}</p>
                  </div>
                </div>

                <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-black/25 text-yellow-300 font-bold border border-yellow-400/30">
                  {selectedQuote.theme}
                </span>
              </div>

              {/* Central Quote Text */}
              <div className="relative z-10 my-auto text-center space-y-3 py-2">
                <span className="text-3xl font-serif opacity-40 font-black">“</span>
                <p
                  className={`font-serif font-bold italic leading-relaxed text-balance ${
                    ratio === 'STORY' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                  } ${theme === 'PARCHMENT' ? 'text-amber-950' : 'text-white'}`}
                >
                  {quoteText}
                </p>
                <span className="text-3xl font-serif opacity-40 font-black">”</span>
              </div>

              {/* Author & Citation Footer */}
              <div className="relative z-10 pt-3 border-t border-current/20 text-center space-y-1">
                <p className="text-xs font-black tracking-wide font-serif text-yellow-300">
                  — CHỦ TỊCH HỒ CHÍ MINH —
                </p>
                <p className="text-[10px] opacity-80 italic truncate">
                  Nguồn: {quoteSource}
                </p>
                <p className="text-[9px] opacity-60">
                  Chỉ thị 07-CT/TW &amp; Quy định 144-QĐ/TW
                </p>
              </div>
            </div>
          )}

          <p className="text-[11px] text-slate-400 text-center mt-3">
            Bấm nút <strong>"Tải Ảnh Thiệp PNG"</strong> để tải ảnh chất lượng cao về máy đăng lên Zalo/Facebook.
          </p>
        </div>
      </div>
    </div>
  );
};
