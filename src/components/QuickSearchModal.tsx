import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  History,
  BookMarked,
  Quote,
  Compass,
  Landmark,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  HISTORICAL_EVENTS_30,
  CLASSIC_WORKS_15,
  VERIFIED_QUOTES_12,
  FOOTPRINTS_20,
  HCM_SPATIAL_SHOWCASE_ZONES,
  TDM_HIGHLIGHTS_NEW_POINTS,
} from '../hcmCoreDataset';
import { vietnameseMatch } from '../utils/vietnameseSearch';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  // Handle ESC and Ctrl+K keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle search modal
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return [];

    const results: Array<{
      type: string;
      title: string;
      subtitle: string;
      targetTab: string;
      icon: any;
      color: string;
    }> = [];

    // 1. Tìm trong 30 sự kiện lịch sử (hỗ trợ tiếng Việt không dấu)
    for (const ev of HISTORICAL_EVENTS_30) {
      if (
        vietnameseMatch(ev.title, q) ||
        vietnameseMatch(ev.date, q) ||
        vietnameseMatch(ev.location, q) ||
        vietnameseMatch(ev.summary, q)
      ) {
        results.push({
          type: 'Mốc lịch sử',
          title: ev.title,
          subtitle: `${ev.date} · ${ev.location}`,
          targetTab: 'TIMELINE',
          icon: History,
          color: 'text-rose-600 bg-rose-50',
        });
      }
    }

    // 2. Tìm trong 15 tác phẩm kinh điển
    for (const w of CLASSIC_WORKS_15) {
      if (
        vietnameseMatch(w.title, q) ||
        vietnameseMatch(w.year, q) ||
        vietnameseMatch(w.summary, q) ||
        vietnameseMatch(w.citation, q)
      ) {
        results.push({
          type: 'Tác phẩm kinh điển',
          title: w.title,
          subtitle: `Năm ${w.year} · ${w.volumeRef} (${w.place})`,
          targetTab: 'BOOKS',
          icon: BookMarked,
          color: 'text-blue-600 bg-blue-50',
        });
      }
    }

    // 3. Tìm trong Lời Bác dạy & Chuẩn mực đạo đức
    for (const quote of VERIFIED_QUOTES_12) {
      if (
        vietnameseMatch(quote.quote, q) ||
        vietnameseMatch(quote.theme, q) ||
        vietnameseMatch(quote.source, q)
      ) {
        results.push({
          type: 'Lời dạy của Bác',
          title: `"${quote.quote}"`,
          subtitle: `${quote.theme} · Nguồn: ${quote.source}`,
          targetTab: 'QUOTES',
          icon: Quote,
          color: 'text-amber-600 bg-amber-50',
        });
      }
    }

    // 4. Tìm trong 20 tọa độ dấu chân bôn ba
    for (const fp of FOOTPRINTS_20) {
      if (
        vietnameseMatch(fp.title, q) ||
        vietnameseMatch(fp.country, q) ||
        vietnameseMatch(fp.period, q) ||
        vietnameseMatch(fp.events, q)
      ) {
        results.push({
          type: 'Dấu chân bôn ba',
          title: `${fp.title} (${fp.period})`,
          subtitle: `${fp.country} — ${fp.events}`,
          targetTab: 'FOOTPRINTS',
          icon: Compass,
          color: 'text-emerald-600 bg-emerald-50',
        });
      }
    }

    // 5. Tìm trong Điểm mới & Mô hình
    for (const pt of TDM_HIGHLIGHTS_NEW_POINTS) {
      if (
        vietnameseMatch(pt.title, q) ||
        vietnameseMatch(pt.description, q) ||
        vietnameseMatch(pt.badge, q)
      ) {
        results.push({
          type: 'Mô hình cơ sở',
          title: pt.title,
          subtitle: pt.badge,
          targetTab: pt.targetTab,
          icon: Award,
          color: 'text-purple-600 bg-purple-50',
        });
      }
    }

    return results.slice(0, 15);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-gold-star/80 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-amber-50/50 via-white to-rose-50/40">
          <Search className="w-5 h-5 text-crimson-royal shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm mốc lịch sử, tác phẩm, trích dẫn, địa danh cứu nước, mô hình..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded">
              ESC
            </kbd>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {!query && (
          <div className="p-5 space-y-3 overflow-y-auto">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-sacred" />
              Gợi ý tra cứu nhanh
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Bến Nhà Rồng 1911',
                'Tuyên ngôn Độc lập',
                'Đường Kách mệnh',
                'Cần kiệm liêm chính',
                'Bản Di chúc',
                'Chỉ thị 07-CT/TW',
                'Quy định 144-QĐ/TW',
                'Nhà tù Phú Lợi',
                'Dân vận khéo',
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-crimson-royal text-xs font-semibold text-slate-700 transition-colors border border-slate-200/70 cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div
                onClick={() => {
                  onSelectTab('TIMELINE');
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-200"
              >
                <p className="text-base font-black text-crimson-royal">30</p>
                <p className="font-semibold text-slate-700">Mốc lịch sử</p>
              </div>
              <div
                onClick={() => {
                  onSelectTab('BOOKS');
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-200"
              >
                <p className="text-base font-black text-blue-700">15</p>
                <p className="font-semibold text-slate-700">Tác phẩm</p>
              </div>
              <div
                onClick={() => {
                  onSelectTab('QUOTES');
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-200"
              >
                <p className="text-base font-black text-amber-700">16</p>
                <p className="font-semibold text-slate-700">Lời Bác dạy</p>
              </div>
              <div
                onClick={() => {
                  onSelectTab('FOOTPRINTS');
                  onClose();
                }}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-200"
              >
                <p className="text-base font-black text-emerald-700">20</p>
                <p className="font-semibold text-slate-700">Tọa độ bôn ba</p>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="p-3 sm:p-4 overflow-y-auto space-y-1.5 divide-y divide-slate-100">
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">Không tìm thấy kết quả phù hợp với "{query}"</p>
                <p className="text-xs text-slate-400">Vui lòng thử lại với từ khóa khác (ví dụ: Di chúc, 1945, Bến Nhà Rồng...)</p>
              </div>
            ) : (
              searchResults.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.targetTab);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-amber-50/60 transition-colors flex items-start justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`p-2 rounded-xl shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {item.type}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-crimson-royal transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-crimson-royal shrink-0 mt-2 transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tìm kiếm dữ liệu chính thống Cấp A</span>
          <div className="flex items-center gap-2">
            <span>Nhấn chọn để điều hướng đến phân hệ tương ứng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
