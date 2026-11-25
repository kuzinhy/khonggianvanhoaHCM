import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Award,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Heart,
  QrCode,
  Lock,
  Activity,
  Users,
  Eye,
  BarChart3,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { OFFICIAL_ATTRIBUTION_SOURCES } from '../hcmCoreDataset';
import { useApp } from '../AppContext';
import { hcmVisitorService } from '../services/hcmVisitorService';

interface InstitutionalFooterProps {
  onSelectTab: (tab: any) => void;
  onOpenShare: () => void;
  onOpenAdminLogin?: () => void;
}

export const InstitutionalFooter: React.FC<InstitutionalFooterProps> = ({
  onSelectTab,
  onOpenShare,
  onOpenAdminLogin,
}) => {
  const { visitorStats } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await hcmVisitorService.refreshStats();
    setTimeout(() => setIsRefreshing(false), 600);
  };
  return (
    <footer className="w-full bg-[#1A0305] text-slate-300 border-t-2 border-gold-star/60 pt-8 pb-6 mt-10 select-none scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Top Section: Organization Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-5 border-b border-white/10 items-center">
          <div className="md:col-span-8 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-crimson-flag to-crimson-deep p-1 flex items-center justify-center border border-gold-star shadow-gold-glow shrink-0">
              <img
                src="/assets/hcm-space/hoasen.png"
                alt="Hoa sen"
                className="w-full h-full object-contain filter brightness-200"
              />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-gold-star block">
                HỆ THỐNG TUYÊN GIÁO SỐ VIỆT NAM · BAN CHỈ ĐẠO CƠ SỞ
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white font-serif tracking-tight">
                Không Gian Văn Hóa Hồ Chí Minh Trực Tuyến
              </h2>
              <p className="text-[11px] text-amber-100/70">
                Xây dựng và phát triển chuẩn hóa theo Kết luận số 01-KL/TW, Chỉ thị số 05-CT/TW &amp; Quy định số 144-QĐ/TW
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-wrap md:justify-end gap-2">
            <button
              type="button"
              onClick={onOpenShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-star hover:bg-gold-400 text-crimson-950 text-xs font-black transition-all shadow-gold-glow cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Mã QR Chi Bộ &amp; Khu Phố</span>
            </button>
          </div>
        </div>

        {/* Middle Section: 4 Compact Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* Column 1: Giới thiệu & Định hướng */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gold-star uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-gold-star" />
              Tôn chỉ &amp; Mục đích
            </h3>
            <p className="text-slate-400 leading-relaxed text-justify text-[11.5px]">
              Không gian số lưu giữ, trưng bày và lan tỏa giá trị bất diệt của tư tưởng, đạo đức, phong cách Hồ Chí Minh; phục vụ sinh hoạt chi bộ và giáo dục truyền thống.
            </p>
            <div className="pt-1 text-[11px] space-y-0.5 text-amber-200/80">
              <p className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-star shrink-0" />
                Địa bàn: Đảng bộ TP. Thủ Dầu Một
              </p>
              <p className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                Quy trình biên tập &amp; đối chiếu 4 bước
              </p>
            </div>
          </div>

          {/* Column 2: Liên kết phân hệ chuyên sâu */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gold-star uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-gold-star" />
              Phân Hệ Di Sản
            </h3>
            <ul className="space-y-1">
              {[
                { label: 'Sảnh Trung tâm Tư liệu', tab: 'FOYER' },
                { label: '30 Mốc Lịch sử Biên niên', tab: 'TIMELINE' },
                { label: 'Tủ sách 15 Tập Toàn tập', tab: 'BOOKS' },
                { label: '20 Tọa độ Bôn ba Cứu nước', tab: 'FOOTPRINTS' },
                { label: 'Bảo tàng Không gian 3D', tab: 'EXHIBIT' },
                { label: 'Âm thanh & Phim Tài liệu', tab: 'MEDIA' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab(item.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1 text-slate-300 hover:text-gold-star transition-colors cursor-pointer text-[11.5px]"
                  >
                    <ChevronRight className="w-3 h-3 text-crimson-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Học tập & Mô hình cơ sở */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gold-star uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-gold-star" />
              Thực Tiễn Cơ Sở
            </h3>
            <ul className="space-y-1">
              {[
                { label: '6 Phương pháp (Chỉ thị 07-CT/TW)', tab: 'NEWS' },
                { label: 'Bộ Tiêu chí Đánh giá 5 Tiêu chuẩn', tab: 'EVALUATION' },
                { label: 'Bản cam kết Tu dưỡng 2026', tab: 'NEWS' },
                { label: 'Mô hình Dân vận khéo Khu phố', tab: 'MODELS' },
                { label: '12 Bộ Trắc nghiệm Kiến thức', tab: 'NEWS' },
                { label: 'Quản trị Hồ sơ Tư liệu V2', tab: 'EXPLORER' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab(item.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1 text-slate-300 hover:text-gold-star transition-colors cursor-pointer text-[11.5px]"
                  >
                    <ChevronRight className="w-3 h-3 text-crimson-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Nguồn tư liệu Cấp A & Cổng thông tin (Gọn gàng 1 dòng) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gold-star uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-star" />
              Nguồn Trích Dẫn Chính Thống
            </h3>
            <div className="space-y-1">
              {OFFICIAL_ATTRIBUTION_SOURCES.map((src) => (
                <a
                  key={src.label}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-star/30 transition-all group"
                  title={src.label}
                >
                  <span className="font-medium text-slate-300 group-hover:text-gold-star text-[11px] truncate">
                    {src.label}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-gold-star shrink-0 ml-1.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Visitor Statistics Panel: Bộ đếm lượt truy cập tinh gọn, thanh thoát */}
        <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-gold-star/20 backdrop-blur-sm shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Tiêu đề & Trạng thái hoạt động */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto">
              <div className="w-8 h-8 rounded-lg bg-[#2E070B] border border-gold-star/40 flex items-center justify-center text-gold-star shrink-0 shadow-inner">
                <BarChart3 className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-300">
                    THỐNG KÊ TRUY CẬP CỔNG THÔNG TIN
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9.5px] font-bold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                    </span>
                    Trực tiếp
                  </span>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    title="Cập nhật số liệu tức thì"
                    className="p-0.5 rounded-full text-slate-400 hover:text-amber-300 hover:bg-white/10 transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-300' : ''}`} />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Không Gian Văn Hóa Hồ Chí Minh · Đảng bộ TP. Thủ Dầu Một
                </p>
              </div>
            </div>

            {/* 4 Chỉ số truy cập thanh gọn */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto justify-between sm:justify-end">
              {/* 1. Đang trực tuyến */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-emerald-500/30">
                <div className="w-6 h-6 rounded bg-emerald-950/60 flex items-center justify-center shrink-0">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs sm:text-sm font-black text-emerald-300 font-mono">
                    {visitorStats.onlineCount}
                  </span>
                  <span className="text-[10px] text-slate-400">online</span>
                </div>
              </div>

              {/* 2. Hôm nay */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs sm:text-sm font-black text-amber-200 font-mono">
                    {visitorStats.todayVisits.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[10px] text-slate-400">hôm nay</span>
                </div>
              </div>

              {/* 3. Tháng này */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs sm:text-sm font-black text-amber-200 font-mono">
                    {visitorStats.thisMonthVisits.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[10px] text-slate-400">tháng này</span>
                </div>
              </div>

              {/* 4. Tổng lượt truy cập */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#2B080B] to-[#3D0A0F] border border-gold-star/40">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-gold-star shrink-0" />
                  <span className="text-[10px] text-amber-200/80 font-bold uppercase">Tổng:</span>
                </div>
                <div className="flex items-center gap-0.5 font-mono">
                  {String(visitorStats.totalVisits)
                    .padStart(7, '0')
                    .split('')
                    .map((d, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-5 bg-[#1A0305] text-gold-star border border-gold-star/30 rounded flex items-center justify-center text-[10.5px] font-black"
                      >
                        {d}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p className="text-center sm:text-left">
            © 2026 Đảng bộ TP. Thủ Dầu Một · Không Gian Văn Hóa Hồ Chí Minh Trực Tuyến.
            <br className="sm:hidden" /> Bản quyền nội dung và dữ liệu số hóa thuộc Ban Tuyên giáo &amp; Dân vận.
          </p>
          <div className="flex items-center gap-3 text-[10.5px]">
            <span className="text-amber-200/70">Phiên bản 2.5 (Chuẩn hóa Chỉ thị 07 &amp; QĐ 144)</span>
            {onOpenAdminLogin && (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="opacity-20 hover:opacity-90 text-slate-400 hover:text-amber-300 transition-opacity p-0.5 cursor-pointer"
                title="Cổng nội bộ"
                aria-label="Cổng quản trị nội bộ"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
