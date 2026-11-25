import React, { useRef, useState } from 'react';
import { Download, Copy, Check, Volume2, VolumeX, Sparkles, Share2 } from 'lucide-react';
import { hcmVoiceService } from '../services/hcmVoiceService';

export interface HcmTraditionalQuoteCardProps {
  quote?: string;
  author?: string;
  context?: string;
  source?: string;
  unitSignature?: string;
  ratio?: 'SQUARE' | 'STORY' | 'LANDSCAPE';
  showActions?: boolean;
  className?: string;
  onCustomize?: () => void;
}

export const HcmTraditionalQuoteCard: React.FC<HcmTraditionalQuoteCardProps> = ({
  quote = 'Văn hoá phải soi đường cho quốc dân đi',
  author = 'Chủ tịch Hồ Chí Minh',
  context = 'Hội nghị Văn hóa toàn quốc lần thứ nhất (24-11-1946)',
  source = 'Hồ Chí Minh Toàn tập, Tập 4, tr. 478',
  unitSignature = 'Không Gian Văn Hóa Hồ Chí Minh · Phường Thủ Dầu Một',
  ratio = 'SQUARE',
  showActions = true,
  className = '',
  onCustomize,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Xử lý phát giọng đọc câu trích dẫn
  const handleToggleVoice = () => {
    if (isSpeaking) {
      hcmVoiceService.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const speechText = `${quote}. Lời ${author}, tại ${context}. Nguồn tài liệu: ${source}.`;
    hcmVoiceService.speak(
      speechText,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  // Sao chép trích dẫn vào clipboard
  const handleCopy = () => {
    const fullText = `“${quote}”\n— ${author}\n🏛️ ${context}\n📚 Nguồn: ${source}\n📌 ${unitSignature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Xuất ảnh PNG độ nét cao (HTML5 Canvas 1200x1200px)
  const handleDownloadPng = () => {
    setIsExporting(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = 1200;
      let height = 1200;

      if (ratio === 'STORY') {
        width = 1080;
        height = 1920;
      } else if (ratio === 'LANDSCAPE') {
        width = 1200;
        height = 675;
      }

      canvas.width = width;
      canvas.height = height;

      // 1. Nền giấy điệp / giấy lụa vàng kem cổ điển
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

      // Thêm viền mờ ấm (soft edge vignette)
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.4,
        width / 2, height / 2, width * 0.72
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(180, 140, 80, 0.12)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      const strokeColor = '#84181D'; // Đỏ son thẫm truyền thống
      const margin = 50;

      // 2. Viền ngoài & Khung góc hồi văn cổ điển (Classical Meander Fretwork)
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;

      // Khung viền ngoài chữ nhật
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      // Khung viền chỉ mảnh phía trong
      ctx.lineWidth = 1.5;
      const innerMargin = margin + 14;
      ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

      // Vẽ 4 góc hồi văn kỷ hà đối xứng
      const drawFretCorner = (cx: number, cy: number, flipX: number, flipY: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(flipX, flipY);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        // Họa tiết gãy góc chữ Vạn
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

      drawFretCorner(margin, margin, 1, 1);
      drawFretCorner(width - margin, margin, -1, 1);
      drawFretCorner(margin, height - margin, 1, -1);
      drawFretCorner(width - margin, height - margin, -1, -1);

      // 3. Vẽ hoa sen góc dưới bên trái & góc dưới bên phải (Watercolor wash)
      const drawLotusCorner = (x: number, y: number, scale: number, flipX: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale * flipX, scale);

        // Cánh hoa sen hồng
        const petals = [
          { d: 'M 0 -70 C 20 -40 30 -10 0 15 C -30 -10 -20 -40 0 -70 Z', color: 'rgba(235, 100, 130, 0.65)' },
          { d: 'M 0 -55 C 35 -35 45 -5 15 15 C 0 5 0 -20 0 -55 Z', color: 'rgba(244, 140, 165, 0.55)' },
          { d: 'M 0 -55 C -35 -35 -45 -5 -15 15 C 0 5 0 -20 0 -55 Z', color: 'rgba(244, 140, 165, 0.55)' },
          { d: 'M 5 -40 C 45 -20 50 15 20 20 C 5 15 0 0 5 -40 Z', color: 'rgba(251, 180, 195, 0.45)' },
          { d: 'M -5 -40 C -45 -20 -50 15 -20 20 C -5 15 0 0 -5 -40 Z', color: 'rgba(251, 180, 195, 0.45)' },
        ];

        petals.forEach((p) => {
          ctx.fillStyle = p.color;
          const path = new Path2D(p.d);
          ctx.fill(path);
        });

        // Nhụy sen vàng
        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        // Lá sen xanh trầm
        ctx.fillStyle = 'rgba(34, 130, 100, 0.35)';
        ctx.beginPath();
        ctx.ellipse(-15, 30, 45, 20, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      // Hoa sen góc trái và góc phải dưới
      drawLotusCorner(margin + 90, height - margin - 80, 1.4, 1);
      drawLotusCorner(width - margin - 100, height - margin - 85, 1.35, -1);

      // 4. Nội dung câu trích dẫn trung tâm
      ctx.fillStyle = strokeColor;
      ctx.textAlign = 'center';

      // Vẽ dấu ngoặc kép mở
      ctx.font = 'italic bold 70px "Playfair Display", "Merriweather", "Noto Serif", serif';
      ctx.fillText('“', width / 2 - 280, height * 0.33);

      // Tự động ngắt dòng câu nói
      const maxTextWidth = width - 260;
      const quoteWords = quote.split(' ');
      const quoteLines: string[] = [];
      let curLine = '';

      const quoteFontSize = ratio === 'STORY' ? 56 : width < 1200 ? 50 : 54;
      ctx.font = `italic bold ${quoteFontSize}px "Playfair Display", "Merriweather", "Noto Serif", serif`;

      for (let i = 0; i < quoteWords.length; i++) {
        const testLine = curLine + quoteWords[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextWidth && i > 0) {
          quoteLines.push(curLine.trim());
          curLine = quoteWords[i] + ' ';
        } else {
          curLine = testLine;
        }
      }
      quoteLines.push(curLine.trim());

      const lineHeight = quoteFontSize * 1.5;
      const totalQuoteHeight = quoteLines.length * lineHeight;
      const startQuoteY = height * 0.38 - totalQuoteHeight / 3;

      for (let j = 0; j < quoteLines.length; j++) {
        const lineText = j === quoteLines.length - 1 ? `${quoteLines[j]} ”` : quoteLines[j];
        ctx.fillText(lineText, width / 2, startQuoteY + j * lineHeight);
      }

      // 5. Đường kẻ phân cách & Biểu tượng Hoa Sen Đỏ ở giữa
      const dividerY = startQuoteY + totalQuoteHeight + 40;

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;

      // Nửa trái
      ctx.beginPath();
      ctx.moveTo(width / 2 - 160, dividerY);
      ctx.lineTo(width / 2 - 24, dividerY);
      ctx.stroke();

      // Nửa phải
      ctx.beginPath();
      ctx.moveTo(width / 2 + 24, dividerY);
      ctx.lineTo(width / 2 + 160, dividerY);
      ctx.stroke();

      // Vẽ hoa sen đỏ nét đồ họa chính giữa
      ctx.save();
      ctx.translate(width / 2, dividerY);
      ctx.fillStyle = strokeColor;
      const lotusSvgPath = new Path2D(
        'M 0 -16 C 5 -7 7 3 0 10 C -7 3 -5 -7 0 -16 Z ' +
        'M 0 -10 C 9 -4 14 5 7 10 C 1 9 0 4 0 -10 Z ' +
        'M 0 -10 C -9 -4 -14 5 -7 10 C -1 9 0 4 0 -10 Z ' +
        'M -12 7 Q 0 15 12 7 Q 0 10 -12 7 Z'
      );
      ctx.fill(lotusSvgPath);
      ctx.restore();

      // 6. Tác giả "Chủ tịch Hồ Chí Minh"
      const authorY = dividerY + 60;
      ctx.font = 'italic bold 36px "Playfair Display", "Merriweather", "Noto Serif", serif';
      ctx.fillStyle = strokeColor;
      ctx.fillText(author, width / 2, authorY);

      // 7. Khung nguồn gốc lịch sử ở dưới cùng (Hội nghị Văn hóa toàn quốc...)
      const contextY = height - margin - 55;
      const boxWidth = Math.min(width - 160, 680);
      const boxHeight = 44;

      ctx.strokeStyle = 'rgba(132, 24, 29, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(width / 2 - boxWidth / 2, contextY - 30, boxWidth, boxHeight);

      // Chấm hoa thị 2 bên hộp
      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(width / 2 - boxWidth / 2, contextY - 8, 3, 0, Math.PI * 2);
      ctx.arc(width / 2 + boxWidth / 2, contextY - 8, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'italic 21px "Playfair Display", "Merriweather", "Noto Serif", serif';
      ctx.fillStyle = strokeColor;
      ctx.fillText(context, width / 2, contextY - 2);

      // Tạo file tải về
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Thiep-Trich-Dan-Bac-Ho-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Lỗi tạo ảnh thiệp di sản:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3.5 ${className}`}>
      {/* KHUNG THẺ DI SẢN CHÍNH THỨC */}
      <div
        ref={cardContainerRef}
        className={`relative w-full ${
          ratio === 'STORY'
            ? 'max-w-[340px] aspect-[9/16]'
            : ratio === 'LANDSCAPE'
            ? 'max-w-[580px] aspect-[16/9]'
            : 'max-w-[440px] aspect-square'
        } p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden select-none border border-amber-900/20`}
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, #FFFDF8 0%, #FAF3DF 50%, #F5E7CA 90%, #EFE0BF 100%)',
        }}
      >
        {/* SVG Khung viền kép & 4 góc hồi văn kỷ hà đối xứng chuẩn mẫu */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 500"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Mẫu hoa văn góc hồi văn truyền thống (Traditional Greek Key / Fret Corner) */}
            <g id="cornerFret">
              <path
                d="M 12 36 L 12 12 L 36 12 L 36 24 L 22 24 L 22 17 L 30 17 L 30 21"
                fill="none"
                stroke="#84181D"
                strokeWidth="1.8"
                strokeLinecap="square"
              />
              <circle cx="26" cy="19" r="1.5" fill="#84181D" />
            </g>

            {/* Cánh sen thủy mặc mềm mại góc dưới */}
            <linearGradient id="lotusPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#FB7185" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.15" />
            </linearGradient>

            <radialGradient id="lotusGoldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* Viền ngoài nét đậm */}
          <rect
            x="18"
            y="18"
            width="464"
            height="464"
            fill="none"
            stroke="#84181D"
            strokeWidth="3.2"
          />

          {/* Viền trong nét mảnh */}
          <rect
            x="24"
            y="24"
            width="452"
            height="452"
            fill="none"
            stroke="#84181D"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* 4 Góc hồi văn chữ Vạn */}
          <use href="#cornerFret" x="18" y="18" />
          <use href="#cornerFret" x="-482" y="18" transform="scale(-1, 1)" />
          <use href="#cornerFret" x="18" y="-482" transform="scale(1, -1)" />
          <use href="#cornerFret" x="-482" y="-482" transform="scale(-1, -1)" />

          {/* Họa tiết hoa sen thủy mặc góc dưới bên trái */}
          <g transform="translate(62, 420) scale(0.68)" opacity="0.88">
            {/* Lá sen */}
            <ellipse cx="-20" cy="25" rx="42" ry="18" fill="#047857" opacity="0.25" transform="rotate(-12)" />
            {/* Cánh sen xòe */}
            <path d="M 0 -60 C 18 -35 25 -8 0 14 C -25 -8 -18 -35 0 -60 Z" fill="url(#lotusPinkGrad)" />
            <path d="M 0 -48 C 28 -30 36 -4 12 14 C 0 6 0 -15 0 -48 Z" fill="url(#lotusPinkGrad)" opacity="0.8" />
            <path d="M 0 -48 C -28 -30 -36 -4 -12 14 C 0 6 0 -15 0 -48 Z" fill="url(#lotusPinkGrad)" opacity="0.8" />
            <path d="M 4 -35 C 38 -18 42 12 16 16 C 4 12 0 0 4 -35 Z" fill="url(#lotusPinkGrad)" opacity="0.6" />
            <path d="M -4 -35 C -38 -18 -42 12 -16 16 C -4 12 0 0 -4 -35 Z" fill="url(#lotusPinkGrad)" opacity="0.6" />
            {/* Nhụy sen */}
            <circle cx="0" cy="2" r="5" fill="url(#lotusGoldGrad)" />
          </g>

          {/* Họa tiết hoa sen & búp sen thủy mặc góc dưới bên phải */}
          <g transform="translate(436, 422) scale(-0.62, 0.62)" opacity="0.88">
            {/* Lá sen */}
            <ellipse cx="-20" cy="25" rx="38" ry="16" fill="#047857" opacity="0.22" transform="rotate(-10)" />
            {/* Búp & cánh hoa */}
            <path d="M 0 -60 C 18 -35 25 -8 0 14 C -25 -8 -18 -35 0 -60 Z" fill="url(#lotusPinkGrad)" />
            <path d="M 0 -48 C 28 -30 36 -4 12 14 C 0 6 0 -15 0 -48 Z" fill="url(#lotusPinkGrad)" opacity="0.8" />
            <path d="M 0 -48 C -28 -30 -36 -4 -12 14 C 0 6 0 -15 0 -48 Z" fill="url(#lotusPinkGrad)" opacity="0.8" />
            <circle cx="0" cy="2" r="4.5" fill="url(#lotusGoldGrad)" />
          </g>
        </svg>

        {/* NỘI DUNG TRUNG TÂM (CÂU TRÍCH DẪN ĐỎ TRUYỀN THỐNG) */}
        <div className="relative z-10 my-auto text-center px-4 sm:px-6 pt-4 pb-2 space-y-3">
          {/* Lời trích dẫn */}
          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-serif font-black text-[#84181D] leading-none select-none inline-block align-top mr-1">
              “
            </span>
            <p className="font-serif italic font-extrabold text-[#84181D] text-lg sm:text-2xl leading-[1.4] tracking-tight inline drop-shadow-[0_1px_1px_rgba(132,24,29,0.15)]">
              {quote}
            </p>
            <span className="text-4xl sm:text-5xl font-serif font-black text-[#84181D] leading-none select-none inline-block align-bottom ml-1">
              ”
            </span>
          </div>

          {/* Họa tiết phân cách: Đường kẻ đôi kẹp Hoa Sen đỏ */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#84181D]/40" />
            <svg viewBox="0 0 40 24" className="w-5 h-3 text-[#84181D] fill-current">
              <path d="M 20 2 C 23 8 25 15 20 22 C 15 15 17 8 20 2 Z" opacity="0.95" />
              <path d="M 20 7 C 27 10 32 17 25 21 C 21 20 20 16 20 7 Z" opacity="0.85" />
              <path d="M 20 7 C 13 10 8 17 15 21 C 19 20 20 16 20 7 Z" opacity="0.85" />
              <path d="M 9 19 Q 20 25 31 19 Q 20 21 9 19 Z" opacity="0.9" />
            </svg>
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#84181D]/40" />
          </div>

          {/* Tác giả: Chủ tịch Hồ Chí Minh */}
          <h4 className="font-serif italic font-extrabold text-sm sm:text-base text-[#84181D] tracking-wide pt-0.5">
            {author}
          </h4>
        </div>

        {/* NGUỒN GỐC & BỐI CẢNH LỊCH SỬ DƯỚI CÙNG */}
        <div className="relative z-10 text-center pb-1">
          <div className="inline-block px-3 py-1 rounded-sm border border-[#84181D]/40 bg-[#FAF3DF]/80 text-[#84181D] text-[10.5px] sm:text-xs font-serif italic">
            {context}
          </div>
        </div>
      </div>

      {/* THANH CÔNG CỤ TƯƠNG TÁC: TẢI ẢNH PNG, NGHE GIỌNG ĐỌC, SAO CHÉP, TÙY CHỈNH */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {/* Nút Tải ảnh thiệp PNG */}
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#751D2C] to-[#8C2334] hover:from-[#5B1522] hover:to-[#751D2C] text-white font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98"
            title="Tải ảnh thiệp PNG chất lượng cao để chia sẻ lên Facebook, Zalo..."
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>{isExporting ? 'Đang tạo ảnh...' : 'Tải Ảnh Thiệp PNG'}</span>
          </button>

          {/* Nút Nghe giọng đọc Lời Bác */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-700 text-white border-rose-800 animate-pulse'
                : 'bg-white border-amber-300 text-[#751D2C] hover:bg-amber-50'
            }`}
            title="Nghe giọng đọc lời trích dẫn của Bác"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#751D2C]" />}
            <span>{isSpeaking ? 'Dừng đọc' : 'Nghe Giọng Đọc'}</span>
          </button>

          {/* Nút Sao chép văn bản */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Sao chép nội dung & nguồn dẫn chứng"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã chép!' : 'Sao chép'}</span>
          </button>

          {/* Nút mở bộ tạo thiệp nâng cao (nếu có callback) */}
          {onCustomize && (
            <button
              type="button"
              onClick={onCustomize}
              className="px-3 py-1.5 rounded-xl border border-amber-400 bg-amber-50 hover:bg-amber-100 text-[#751D2C] font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Tùy biến các câu trích dẫn khác của Bác"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C59A55]" />
              <span>Đổi câu khác</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
