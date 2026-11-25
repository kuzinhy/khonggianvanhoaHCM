// <!-- Lucian UX/UI Prompt #478 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#478 -->
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, Sparkles, Share2 } from 'lucide-react';

export interface LucianQrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  subtitle?: string;
}

// =========================================================================
// SELF-CONTAINED QR CODE REED-SOLOMON GENERATOR (Lucian UX/UI #478 Pure Math)
// =========================================================================
function generateQrSvg(text: string): { svgPath: string; eyesHtml: string; width: number } {
  const EC = [null, [10, 1, 16], [16, 1, 28], [26, 1, 44], [18, 2, 32], [24, 2, 43], [16, 4, 27]];
  const AL = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]];

  function mul(x: number, y: number) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z;
  }

  function rsDiv(n: number) {
    const r: number[] = [];
    for (let i = 0; i < n - 1; i++) r.push(0);
    r.push(1);
    let g = 1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < r.length; j++) {
        r[j] = mul(r[j], g);
        if (j + 1 < r.length) r[j] ^= r[j + 1];
      }
      g = mul(g, 2);
    }
    return r;
  }

  function rsRem(data: number[], div: number[]) {
    const r = div.map(() => 0);
    data.forEach((b) => {
      const f = b ^ (r.shift() ?? 0);
      r.push(0);
      div.forEach((c, i) => {
        r[i] ^= mul(c, f);
      });
    });
    return r;
  }

  function qr(txt: string) {
    const bytes = Array.from(new TextEncoder().encode(txt));
    let v = 1;
    while (v < 6 && 12 + bytes.length * 8 > EC[v]![1] * EC[v]![2] * 8) v++;
    const ecn = EC[v]![0];
    const nb = EC[v]![1];
    const dpb = EC[v]![2];
    const cap = nb * dpb * 8;
    const bits: number[] = [];
    function put(val: number, len: number) {
      for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
    }
    put(4, 4);
    put(bytes.length, 8);
    bytes.forEach((b) => {
      put(b, 8);
    });
    put(0, Math.min(4, cap - bits.length));
    while (bits.length % 8) bits.push(0);
    for (let pad = 0xec; bits.length < cap; pad ^= 0xec ^ 0x11) put(pad, 8);
    const data: number[] = [];
    for (let i = 0; i < bits.length; i += 8) {
      let b = 0;
      for (let k = 0; k < 8; k++) b = (b << 1) | bits[i + k];
      data.push(b);
    }
    const div = rsDiv(ecn);
    const blocks: number[][] = [];
    const ecs: number[][] = [];
    for (let i = 0; i < nb; i++) {
      const blk = data.slice(i * dpb, (i + 1) * dpb);
      blocks.push(blk);
      ecs.push(rsRem(blk, div));
    }
    const all: number[] = [];
    for (let i = 0; i < dpb; i++) blocks.forEach((bk) => all.push(bk[i]));
    for (let i = 0; i < ecn; i++) ecs.forEach((e) => all.push(e[i]));
    const n = 17 + 4 * v;
    const M: boolean[][] = [];
    const F: boolean[][] = [];
    for (let i = 0; i < n; i++) {
      M.push(new Array(n).fill(false));
      F.push(new Array(n).fill(false));
    }
    function set(x: number, y: number, d: boolean) {
      M[y][x] = d;
      F[y][x] = true;
    }
    for (let i = 0; i < n; i++) {
      set(6, i, i % 2 === 0);
      set(i, 6, i % 2 === 0);
    }
    [
      [3, 3],
      [n - 4, 3],
      [3, n - 4],
    ].forEach((c) => {
      for (let dy = -4; dy <= 4; dy++)
        for (let dx = -4; dx <= 4; dx++) {
          const x = c[0] + dx;
          const y = c[1] + dy;
          const d = Math.max(Math.abs(dx), Math.abs(dy));
          if (x >= 0 && x < n && y >= 0 && y < n) set(x, y, d !== 2 && d !== 4);
        }
    });
    const al = AL[v]!;
    const last = al.length - 1;
    al.forEach((ax, ii) => {
      al.forEach((ay, jj) => {
        if ((ii === 0 && jj === 0) || (ii === 0 && jj === last) || (ii === last && jj === 0)) return;
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      });
    });
    function format(mask: number) {
      const d = (0 << 3) | mask;
      let r = d;
      for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      const fb = ((d << 10) | r) ^ 0x5412;
      const bit = (i: number) => ((fb >>> i) & 1) === 1;
      for (let i = 0; i <= 5; i++) set(8, i, bit(i));
      set(8, 7, bit(6));
      set(8, 8, bit(7));
      set(7, 8, bit(8));
      for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
      for (let i = 0; i < 8; i++) set(n - 1 - i, 8, bit(i));
      for (let i = 8; i < 15; i++) set(8, n - 15 + i, bit(i));
      set(8, n - 8, true);
    }
    format(0);
    let bi = 0;
    const total = all.length * 8;
    for (let right = n - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < n; vert++)
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const up = ((right + 1) & 2) === 0;
          const y = up ? n - 1 - vert : vert;
          if (!F[y][x] && bi < total) {
            M[y][x] = ((all[bi >>> 3] >>> (7 - (bi & 7))) & 1) === 1;
            bi++;
          }
        }
    }
    const MASKS = [
      (x: number, y: number) => (x + y) % 2 === 0,
      (_x: number, y: number) => y % 2 === 0,
      (x: number, _y: number) => x % 3 === 0,
      (x: number, y: number) => (x + y) % 3 === 0,
      (x: number, y: number) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x: number, y: number) => ((x * y) % 2) + ((x * y) % 3) === 0,
      (x: number, y: number) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
      (x: number, y: number) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
    ];
    function apply(m: number) {
      for (let y = 0; y < n; y++)
        for (let x = 0; x < n; x++) if (!F[y][x] && MASKS[m](x, y)) M[y][x] = !M[y][x];
    }
    function penalty() {
      let p = 0;
      let dark = 0;
      const lines: string[] = [];
      for (let y = 0; y < n; y++) {
        let row = '';
        let col = '';
        for (let x = 0; x < n; x++) {
          row += M[y][x] ? 1 : 0;
          col += M[x][y] ? 1 : 0;
          if (M[y][x]) dark++;
        }
        lines.push(row, col);
      }
      lines.forEach((s) => {
        (s.match(/0{5,}|1{5,}/g) || []).forEach((r) => {
          p += r.length - 2;
        });
        p += 40 * ((s.match(/(?=10111010000|00001011101)/g) || []).length);
      });
      for (let y = 0; y < n - 1; y++)
        for (let x = 0; x < n - 1; x++) {
          const c = M[y][x];
          if (c === M[y][x + 1] && c === M[y + 1][x] && c === M[y + 1][x + 1]) p += 3;
        }
      return p + 10 * Math.floor(Math.abs((dark * 20) / (n * n) - 10));
    }
    let best = 0;
    let bestP = Infinity;
    for (let m = 0; m < 8; m++) {
      apply(m);
      format(m);
      const sc = penalty();
      if (sc < bestP) {
        bestP = sc;
        best = m;
      }
      apply(m);
    }
    apply(best);
    format(best);
    return { n, M };
  }

  const Q = qr(text);
  const n = Q.n;
  const pad = 3;
  const W = n + pad * 2;
  let d = '';
  function inFinder(x: number, y: number) {
    return (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  }
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
      if (Q.M[y][x] && !inFinder(x, y)) {
        d += 'M' + (x + pad + 0.06) + ' ' + (y + pad + 0.06) + 'h.88v.88h-.88z';
      }

  let eyes = '';
  [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ].forEach((c) => {
    const X = c[0] + pad;
    const Y = c[1] + pad;
    eyes += `<rect class="f" x="${X + 0.5}" y="${Y + 0.5}" width="6" height="6" rx="1.7" stroke-width="1"/>` +
      `<rect class="e" x="${X + 2}" y="${Y + 2}" width="3" height="3" rx=".9"/>`;
  });

  return { svgPath: d, eyesHtml: eyes, width: W };
}

export const LucianQrShareModal: React.FC<LucianQrShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title = 'Không Gian Văn Hóa Hồ Chí Minh',
  subtitle = 'Quét mã QR để mở trang hoặc nghe trực tiếp trên điện thoại',
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isIn, setIsIn] = useState<boolean>(false);

  const effectiveUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://kgvhhcm.hcmussh.edu.vn';
  }, [url]);

  const cleanDisplayUrl = useMemo(() => {
    return effectiveUrl.replace(/^https?:\/\//, '');
  }, [effectiveUrl]);

  // Generate SVG QR Code mathematically
  const qrData = useMemo(() => {
    return generateQrSvg(effectiveUrl);
  }, [effectiveUrl]);

  useEffect(() => {
    if (!isOpen) {
      setIsIn(false);
      setCopied(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(effectiveUrl).catch(() => {});
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = effectiveUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch {}

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2400);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-amber-400/70 p-6 shadow-2xl text-white space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-700/80 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Share2 className="h-3.5 w-3.5" />
              <span>Chia Sẻ Mã QR Di Sản</span>
            </div>
            <h3 className="text-base font-bold text-white font-serif">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lucian UX/UI Prompt #478 Animated QR Card */}
        <div className={`ux u478 ${isIn ? 'is-in' : ''} mx-auto`}>
          <section className="u478-c">
            <div className="u478-q">
              {/* Dynamic QR SVG */}
              <svg
                viewBox={`0 0 ${qrData.width} ${qrData.width}`}
                role="img"
                aria-label={`QR code: ${effectiveUrl}`}
                shapeRendering="geometricPrecision"
              >
                <path className="m" d={qrData.svgPath} />
                <g dangerouslySetInnerHTML={{ __html: qrData.eyesHtml }} />
              </svg>

              {/* Four Corner Brackets */}
              <span className="u478-br" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>

              {/* Laser Scanning Beam */}
              <span className="u478-sc" aria-hidden="true">
                <i />
              </span>
            </div>

            {/* URL String */}
            <p className="u478-u" title={effectiveUrl}>
              {cleanDisplayUrl}
            </p>

            {/* Copy Button with Morphing State */}
            <button
              type="button"
              className={`u478-cp ${copied ? 'is-ok' : ''} cursor-pointer`}
              onClick={handleCopyLink}
              title="Nhấp để sao chép liên kết"
            >
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.2 4.2 0 0 0-6-6l-1 1" />
                  <path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.2 4.2 0 0 0 6 6l1-1" />
                </svg>
                Sao chép liên kết
              </span>
              <span aria-hidden="true">
                <svg className="ck" viewBox="0 0 24 24">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
                Đã sao chép!
              </span>
            </button>
          </section>
        </div>

        {/* Footer instruction */}
        <div className="text-center pt-1">
          <p className="text-[11px] text-slate-400">
            Dùng ứng dụng Camera điện thoại để quét mã QR và tương tác ngay.
          </p>
        </div>
      </div>

      {/* Scoped CSS based on Lucian UX/UI Prompt #478 */}
      <style>{`
        .u478 {
          position: relative;
          width: 100%;
          display: grid;
          place-items: center;
        }
        .u478-c {
          position: relative;
          width: 240px;
          padding: 16px;
          border-radius: 22px;
          background: #1E293B;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 22px 44px -26px rgba(0,0,0,0.8);
        }
        .u478-q {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 6px auto 0;
          border-radius: 16px;
          background: #FFFFFF;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 8px 18px -12px rgba(0,0,0,0.5);
        }
        .u478-q svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
        }
        .u478-q .m {
          fill: #0F172A;
        }
        .u478-q .f {
          fill: none;
          stroke: #0F172A;
        }
        .u478-q .e {
          fill: #DC2626;
        }
        .u478-br {
          position: absolute;
          inset: -7px;
          pointer-events: none;
          opacity: 0;
          transform: scale(1.14);
          transition: opacity .3s cubic-bezier(.2,.8,.2,1), transform .6s cubic-bezier(.34,1.6,.5,1);
        }
        .u478-br i {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 2.5px solid #F59E0B;
          border-radius: 7px;
        }
        .u478-br i:nth-child(1) { left: 0; top: 0; border-right: 0; border-bottom: 0; border-radius: 9px 0 0 0; }
        .u478-br i:nth-child(2) { right: 0; top: 0; border-left: 0; border-bottom: 0; border-radius: 0 9px 0 0; }
        .u478-br i:nth-child(3) { left: 0; bottom: 0; border-right: 0; border-top: 0; border-radius: 0 0 0 9px; }
        .u478-br i:nth-child(4) { right: 0; bottom: 0; border-left: 0; border-top: 0; border-radius: 0 0 9px 0; }
        .u478.is-in .u478-br {
          opacity: 1;
          transform: none;
        }
        .u478-sc {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          pointer-events: none;
        }
        .u478-sc i {
          position: absolute;
          left: -10%;
          right: -10%;
          top: 0;
          height: 46px;
          margin-top: -46px;
          background: linear-gradient(180deg, transparent, rgba(245, 158, 11, 0.2) 70%, rgba(245, 158, 11, 0.6) 96%, transparent);
          opacity: 0;
        }
        .u478-sc i::after {
          content: "";
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 1px;
          height: 2.5px;
          border-radius: 2px;
          background: #F59E0B;
          box-shadow: 0 0 12px 3px rgba(245, 158, 11, 0.8);
        }
        .u478.is-in .u478-sc i {
          animation: u478-scan 3.6s cubic-bezier(.45,.05,.35,1) .45s infinite;
        }
        @keyframes u478-scan {
          0% { opacity: 0; transform: translateY(0); }
          6% { opacity: 1; }
          38% { opacity: 1; transform: translateY(195px); }
          44%, 100% { opacity: 0; transform: translateY(195px); }
        }
        .u478-u {
          margin: 12px 0 10px;
          font-size: 11.5px;
          font-weight: 600;
          color: #94A3B8;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: ui-monospace, monospace;
        }
        .u478-cp {
          position: relative;
          display: grid;
          width: 100%;
          height: 40px;
          padding: 0;
          border: 0;
          border-radius: 12px;
          background: #DC2626;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          overflow: hidden;
          transition: transform .45s cubic-bezier(.34,1.7,.5,1), background-color .35s ease;
        }
        .u478-cp:hover {
          transform: translateY(-1px);
          background: #B91C1C;
        }
        .u478-cp:active {
          transform: scale(.96);
          transition-duration: .1s;
        }
        .u478-cp > span {
          grid-area: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: opacity .2s, transform .45s cubic-bezier(.34,1.6,.5,1), filter .2s;
        }
        .u478-cp > span + span {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(3px);
        }
        .u478-cp svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .u478-cp .ck path {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          transition: stroke-dashoffset .35s ease .18s;
        }
        .u478-cp.is-ok {
          background: #10B981 !important;
          animation: u478-ok .5s cubic-bezier(.34,1.7,.5,1);
        }
        @keyframes u478-ok {
          35% { transform: scale(1.05); }
        }
        .u478-cp.is-ok > span:first-child {
          opacity: 0;
          transform: translateY(-12px);
          filter: blur(3px);
        }
        .u478-cp.is-ok > span + span {
          opacity: 1;
          transform: none;
          filter: none;
        }
        .u478-cp.is-ok .ck path {
          stroke-dashoffset: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .u478-br, .u478-sc i, .u478-cp {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};
