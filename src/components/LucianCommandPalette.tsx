// <!-- Lucian UX/UI Prompt #046 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#046 -->
import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Compass,
  Radio,
  BookOpen,
  Landmark,
  Sparkles,
  ShieldCheck,
  Search,
  Flag,
  Share2,
  FileText,
  Building2,
  User,
  ExternalLink,
} from 'lucide-react';

export interface CommandItem {
  g: string; // Group name
  n: string; // Command / Item name
  sub?: string; // Subtitle
  ic: string; // Icon identifier
  c?: string; // Gradient or background color
  k?: string; // Shortcut key hint
  action: () => void;
}

export interface LucianCommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigateToTab?: (tab: string) => void;
  onOpenVietnamMap?: () => void;
  onOpenQrShare?: () => void;
  onOpenAuth?: () => void;
  isFloatingModal?: boolean;
}

export const LucianCommandPalette: React.FC<LucianCommandPaletteProps> = ({
  isOpen = false,
  onClose,
  onNavigateToTab,
  onOpenVietnamMap,
  onOpenQrShare,
  onOpenAuth,
  isFloatingModal = false,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hlRef = useRef<HTMLSpanElement>(null);

  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isClosed, setIsClosed] = useState<boolean>(!isOpen);
  const [ranMessage, setRanMessage] = useState<string>('');

  const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');

  // Master commands dataset for Không gian Văn hóa Hồ Chí Minh
  const allCommands: CommandItem[] = useMemo(() => {
    return [
      // 1. Không gian & Chuyên đề cốt lõi
      {
        g: 'Không Gian Chuyên Đề',
        n: 'Sảnh Trung Tâm & Giới Thiệu Chung',
        sub: 'Trang chủ Không gian Văn hóa Hồ Chí Minh',
        ic: 'landmark',
        c: 'linear-gradient(140deg, #DC2626, #B91C1C)',
        k: 'Tab 1',
        action: () => onNavigateToTab?.('FOYER'),
      },
      {
        g: 'Không Gian Chuyên Đề',
        n: 'Hành Trình 30 Năm Cứu Nước (Bản Đồ 10 Chặng)',
        sub: 'Song hành Bản đồ thế giới & Dòng thời gian Lucian #370',
        ic: 'compass',
        c: 'linear-gradient(140deg, #D97706, #B45309)',
        k: 'Tab 9',
        action: () => onNavigateToTab?.('FOOTPRINTS'),
      },
      {
        g: 'Không Gian Chuyên Đề',
        n: 'Bảo Tàng Số Ảo 3D & Hiện Vật Di Sản',
        sub: 'Phòng trưng bày 8 hiện vật & mô hình 3D',
        ic: 'sparkles',
        c: 'linear-gradient(140deg, #7C3AED, #6D28D9)',
        action: () => onNavigateToTab?.('EXHIBIT'),
      },
      {
        g: 'Không Gian Chuyên Đề',
        n: 'Tủ Sách Kinh Điển & Kho Ebook Bác Hồ',
        sub: 'Hồ Chí Minh Toàn tập, 15 tác phẩm bảo vật & Ebook',
        ic: 'book',
        c: 'linear-gradient(140deg, #0284C7, #0369A1)',
        action: () => onNavigateToTab?.('BOOKS'),
      },
      {
        g: 'Không Gian Chuyên Đề',
        n: 'Âm Vang Lời Bác & Đa Phương Tiện (VOV Gốc)',
        sub: '6 bản ghi âm lịch sử giọng nói nguyên bản của Bác',
        ic: 'radio',
        c: 'linear-gradient(140deg, #E11D48, #BE123C)',
        action: () => onNavigateToTab?.('MEDIA'),
      },
      {
        g: 'Không Gian Chuyên Đề',
        n: 'Địa Chỉ Đỏ & Nhà Truyền Thống Đất Thủ',
        sub: 'Di tích lịch sử và hệ thống điểm đỏ tại TP.HCM & Bình Dương',
        ic: 'building',
        c: 'linear-gradient(140deg, #0D9488, #0F766E)',
        action: () => onNavigateToTab?.('TDM_HOUSE'),
      },

      // 2. Tác phẩm kinh điển & Văn kiện
      {
        g: 'Tác Phẩm Kinh Điển',
        n: 'Tuyên Ngôn Độc Lập (1945)',
        sub: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa',
        ic: 'doc',
        c: 'linear-gradient(140deg, #DC2626, #F59E0B)',
        action: () => onNavigateToTab?.('MEDIA'),
      },
      {
        g: 'Tác Phẩm Kinh Điển',
        n: 'Đường Kách Mệnh (1927)',
        sub: 'Cuốn sách giáo khoa chính trị đầu tiên của Cách mạng VN',
        ic: 'doc',
        c: 'linear-gradient(140deg, #D97706, #EA580C)',
        action: () => onNavigateToTab?.('BOOKS'),
      },
      {
        g: 'Tác Phẩm Kinh Điển',
        n: 'Bản Án Chế Độ Thực Dân Pháp (1925)',
        sub: 'Tác phẩm chính luận đanh thép vạch trần tội ác thực dân',
        ic: 'doc',
        c: 'linear-gradient(140deg, #9333EA, #7E22CE)',
        action: () => onNavigateToTab?.('BOOKS'),
      },
      {
        g: 'Tác Phẩm Kinh Điển',
        n: 'Di Chúc Của Chủ Tịch Hồ Chí Minh (1969)',
        sub: 'Lời dặn muôn vàn tình thân yêu cho toàn Đảng, toàn dân',
        ic: 'doc',
        c: 'linear-gradient(140deg, #E11D48, #9F1239)',
        action: () => onNavigateToTab?.('MEDIA'),
      },

      // 3. Lệnh Nhanh & Tiện Ích
      {
        g: 'Lệnh Nhanh Hệ Thống',
        n: 'Mở Bản Đồ Tổ Quốc (Hoàng Sa — Trường Sa)',
        sub: 'Khẳng định chủ quyền biển đảo thiêng liêng',
        ic: 'flag',
        c: 'linear-gradient(140deg, #F59E0B, #D97706)',
        k: 'Bản đồ',
        action: () => onOpenVietnamMap?.(),
      },
      {
        g: 'Lệnh Nhanh Hệ Thống',
        n: 'Chia Sẻ Mã QR Không Gian Di Sản',
        sub: 'Quét mã bằng camera điện thoại để truy cập ngay',
        ic: 'share',
        c: 'linear-gradient(140deg, #10B981, #059669)',
        k: 'Mã QR',
        action: () => onOpenQrShare?.(),
      },
      {
        g: 'Lệnh Nhanh Hệ Thống',
        n: 'Đăng Nhập Cổng Công Dân & Đảng Viên',
        sub: 'Ghi nhận lộ trình học tập và làm theo Bác',
        ic: 'user',
        c: 'linear-gradient(140deg, #2563EB, #1D4ED8)',
        k: 'Đăng nhập',
        action: () => onOpenAuth?.(),
      },
    ];
  }, [onNavigateToTab, onOpenVietnamMap, onOpenQrShare, onOpenAuth]);

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter(
      (c) =>
        c.n.toLowerCase().includes(q) ||
        (c.sub && c.sub.toLowerCase().includes(q)) ||
        c.g.toLowerCase().includes(q)
    );
  }, [allCommands, query]);

  // Sync open/closed state
  useEffect(() => {
    setIsClosed(!isOpen);
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+K or ⌘K listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsClosed((prev) => {
          const next = !prev;
          if (!next) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Update gliding highlight bar position
  useEffect(() => {
    if (!bodyRef.current || !hlRef.current || filteredCommands.length === 0) return;
    const items = bodyRef.current.querySelectorAll<HTMLLIElement>('.u046-op');
    const safeIdx = Math.max(0, Math.min(activeIndex, items.length - 1));
    const targetItem = items[safeIdx];
    if (targetItem) {
      const top = targetItem.offsetTop + 6;
      hlRef.current.style.setProperty('--y', `${top}px`);
      hlRef.current.style.opacity = '1';
    } else {
      hlRef.current.style.opacity = '0';
    }
  }, [activeIndex, filteredCommands]);

  const runCommand = (item: CommandItem) => {
    setRanMessage(`Đã chọn: ${item.n}`);
    setTimeout(() => {
      setRanMessage('');
      setIsClosed(true);
      onClose?.();
      item.action();
    }, 350);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (isClosed) {
        setIsClosed(false);
      } else {
        setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isClosed) {
        setIsClosed(false);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
        );
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        runCommand(filteredCommands[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsClosed(true);
      onClose?.();
    }
  };

  // Helper to render matched query highlight
  const renderHighlightedText = (text: string, q: string) => {
    if (!q.trim()) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q.trim().toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.trim().length);
    const after = text.slice(idx + q.trim().length);
    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  };

  // Group items by category
  let currentGroup = '';

  const paletteContent = (
    <div className={`ux u046 ${isClosed ? 'is-closed' : ''}`}>
      <div className="u046-pal">
        {/* Search Field Header */}
        <label className="u046-field" onClick={() => isClosed && setIsClosed(false)}>
          <Search className="h-5 w-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            className="u046-in"
            type="text"
            role="combobox"
            aria-expanded={!isClosed}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            placeholder="Tra cứu chuyên đề, tác phẩm, giọng đọc của Bác..."
            aria-label="Tra cứu Không gian Văn hóa Hồ Chí Minh"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
              if (isClosed) setIsClosed(false);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <kbd
            className="u046-kbd u046-key cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsClosed(!isClosed);
              if (!isClosed) onClose?.();
            }}
          >
            {isClosed ? (mac ? '⌘K' : 'Ctrl K') : 'esc'}
          </kbd>
        </label>

        {/* Scrollable Palette Body */}
        <div ref={bodyRef} className="u046-body">
          <span ref={hlRef} className="u046-hl" aria-hidden="true" />
          <ul className="u046-list" role="listbox" aria-label="Danh sách kết quả tra cứu">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((item, idx) => {
                const showGroupHeader = item.g !== currentGroup;
                if (showGroupHeader) currentGroup = item.g;
                const isSelected = idx === activeIndex;

                return (
                  <React.Fragment key={`${item.g}-${item.n}-${idx}`}>
                    {showGroupHeader && (
                      <li className="u046-g" role="presentation">
                        {item.g}
                      </li>
                    )}
                    <li
                      className="u046-op"
                      role="option"
                      aria-selected={isSelected}
                      style={{ '--i': idx } as React.CSSProperties}
                      onPointerMove={() => setActiveIndex(idx)}
                      onClick={() => runCommand(item)}
                    >
                      <span
                        className="u046-ic shrink-0"
                        style={{ '--c': item.c } as React.CSSProperties}
                        aria-hidden="true"
                      >
                        {item.ic === 'landmark' && <Landmark className="h-4 w-4" />}
                        {item.ic === 'compass' && <Compass className="h-4 w-4" />}
                        {item.ic === 'sparkles' && <Sparkles className="h-4 w-4" />}
                        {item.ic === 'book' && <BookOpen className="h-4 w-4" />}
                        {item.ic === 'radio' && <Radio className="h-4 w-4" />}
                        {item.ic === 'building' && <Building2 className="h-4 w-4" />}
                        {item.ic === 'doc' && <FileText className="h-4 w-4" />}
                        {item.ic === 'flag' && <Flag className="h-4 w-4" />}
                        {item.ic === 'share' && <Share2 className="h-4 w-4" />}
                        {item.ic === 'user' && <User className="h-4 w-4" />}
                      </span>

                      <div className="flex-1 min-w-0 pr-2">
                        <div className="truncate font-semibold text-sm">
                          {renderHighlightedText(item.n, query)}
                        </div>
                        {item.sub && (
                          <div className="text-[11px] text-slate-400 truncate font-normal">
                            {item.sub}
                          </div>
                        )}
                      </div>

                      {item.k && <kbd className="u046-kbd shrink-0">{item.k}</kbd>}
                    </li>
                  </React.Fragment>
                );
              })
            ) : (
              <li className="u046-empty" role="presentation">
                <b>Không tìm thấy kết quả cho &ldquo;{query}&rdquo;</b>
                <p className="text-xs text-slate-400 mt-1">
                  Thử tra cứu với từ khóa: <em>Tuyên ngôn, Pác Bó, VOV, Bến Nhà Rồng...</em>
                </p>
              </li>
            )}
          </ul>
        </div>

        {/* Footer info bar */}
        <div className="u046-foot" aria-hidden="true">
          <span>
            <kbd className="u046-kbd">↑↓</kbd>Di chuyển
          </span>
          <span>
            <kbd className="u046-kbd">↵</kbd>Chọn
          </span>
          <span className={`u046-done ${ranMessage ? 'show' : ''}`}>{ranMessage}</span>
        </div>
      </div>

      {/* Scoped CSS based on Lucian UX/UI Prompt #046 */}
      <style>{`
        .u046 {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 480px;
          margin: 0 auto;
        }
        .u046-pal {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          background: #11141E;
          box-shadow: 0 0 0 1px rgba(255,255,255,.12), 0 34px 60px -34px rgba(0,0,0,.8);
          clip-path: inset(0 0 0 0 round 24px);
          transition: clip-path .6s cubic-bezier(.2,.8,.2,1), box-shadow .5s;
          color: #F8FAFC;
        }
        .u046.is-closed .u046-pal {
          clip-path: inset(0 0 calc(100% - 56px) 0 round 28px);
          box-shadow: 0 0 0 1px rgba(255,255,255,.16), 0 14px 26px -18px rgba(0,0,0,.6);
          transition: clip-path .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s;
        }
        .u046-field {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          height: 56px;
          flex: none;
          padding: 0 14px 0 18px;
          border-bottom: 1px solid rgba(255,255,255,.1);
          cursor: text;
          transition: border-color .3s;
        }
        .u046.is-closed .u046-field {
          border-color: transparent;
          cursor: pointer;
        }
        .u046-in {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: 0;
          padding: 0;
          background: none;
          font-inherit: inherit;
          font-size: 14px;
          font-weight: 560;
          color: #F8FAFC;
          outline: none;
        }
        .u046-in::placeholder {
          color: #94A3B8;
        }
        .u046-kbd {
          display: inline-flex;
          align-items: center;
          height: 24px;
          padding: 0 8px;
          border-radius: 7px;
          background: #1E293B;
          box-shadow: inset 0 -1px 0 rgba(255,255,255,.12);
          font-size: 11px;
          font-weight: 700;
          color: #CBD5E1;
          font-family: inherit;
          white-space: nowrap;
        }
        .u046-body {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          scrollbar-width: thin;
          padding: 6px 8px;
          transition: opacity .3s;
        }
        .u046.is-closed .u046-body,
        .u046.is-closed .u046-foot {
          opacity: 0;
          pointer-events: none;
        }
        .u046-hl {
          position: absolute;
          left: 8px;
          right: 8px;
          top: 0;
          height: 50px;
          border-radius: 14px;
          background: rgba(220, 38, 38, 0.25);
          box-shadow: inset 3.5px 0 0 #F59E0B;
          transform: translateY(var(--y, 0));
          transition: transform .4s cubic-bezier(.34,1.45,.64,1), opacity .2s;
          pointer-events: none;
        }
        .u046-list {
          position: relative;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .u046-g {
          padding: 10px 10px 4px;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: .08em;
          color: #F59E0B;
          text-transform: uppercase;
        }
        .u046-op {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 50px;
          padding: 6px 10px;
          border-radius: 13px;
          color: #E2E8F0;
          cursor: pointer;
          transition: background .2s;
        }
        .u046-op[aria-selected="true"] {
          color: #FFFFFF;
        }
        .u046-op mark {
          background: none;
          color: #FBBF24;
          font-weight: 800;
        }
        .u046-ic {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: var(--c, #334155);
          color: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .u046-empty {
          padding: 40px 16px;
          text-align: center;
          font-size: 13.5px;
          color: #94A3B8;
        }
        .u046-empty b {
          display: block;
          margin-bottom: 4px;
          font-size: 15px;
          color: #F8FAFC;
        }
        .u046-foot {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 44px;
          flex: none;
          padding: 0 16px;
          border-top: 1px solid rgba(255,255,255,.1);
          font-size: 11.5px;
          font-weight: 600;
          color: #94A3B8;
          transition: opacity .3s;
        }
        .u046-foot .u046-kbd {
          height: 20px;
          padding: 0 5px;
          margin-right: 4px;
          font-size: 10.5px;
        }
        .u046-done {
          margin-left: auto;
          color: #10B981;
          font-weight: 700;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity .3s, transform .4s cubic-bezier(.34,1.45,.64,1);
        }
        .u046-done.show {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );

  if (isFloatingModal) {
    if (isClosed) return null;
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => {
          setIsClosed(true);
          onClose?.();
        }}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
          {paletteContent}
        </div>
      </div>
    );
  }

  return paletteContent;
};
