import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  ExternalLink,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  X,
  Volume2,
  Navigation,
} from 'lucide-react';
import { HoaSenIcon, DongSonDrumIcon } from './TraditionalMotifs';

interface RedHeritageSite {
  id: string;
  name: string;
  location: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Thủ Dầu Một';
  period: string;
  role: string;
  significance: string;
  imageUrl: string;
  officialLink: string;
  coordsText: string;
}

const RED_HERITAGE_SITES: RedHeritageSite[] = [
  {
    id: 'site-1',
    name: 'Khu Di tích Quốc gia Đặc biệt Kim Liên',
    location: 'Nam Đàn, Nghệ An',
    region: 'Miền Trung',
    period: '1890 – 1906',
    role: 'Nơi Bác Hồ cất tiếng khóc chào đời và nuôi dưỡng tâm hồn yêu nước',
    significance: 'Làng Hoàng Trù quê ngoại và Làng Sen quê nội, nơi lưu giữ những kỷ vật thiêng liêng về thời niên thiếu của Bác và gia đình.',
    imageUrl: '/assets/hcm-space/card-cuoc-doi.jpg',
    officialLink: 'https://ditichkimlien.gov.vn',
    coordsText: '18°41\'N 105°33\'E',
  },
  {
    id: 'site-2',
    name: 'Di tích Lịch sử Trường Dục Thanh',
    location: 'Phan Thiết, Bình Thuận',
    region: 'Miền Trung',
    period: '1910 – 1911',
    role: 'Nơi thầy giáo Nguyễn Tất Thành dừng chân dạy học trước khi vào Sài Gòn',
    significance: 'Trường dạy học do các sĩ phu yêu nước lập nên, nơi Người truyền thụ tinh thần yêu nước, thương nòi cho thế hệ trẻ.',
    imageUrl: '/assets/hcm-space/tieusu1-1911.png',
    officialLink: 'https://baotanghochiminh.vn',
    coordsText: '10°55\'N 108°06\'E',
  },
  {
    id: 'site-3',
    name: 'Di tích Lịch sử Bến Nhà Rồng — Bảo tàng Hồ Chí Minh TP.HCM',
    location: 'Quận 4, TP. Hồ Chí Minh',
    region: 'Miền Nam',
    period: '05/06/1911',
    role: 'Nơi Người thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước',
    significance: 'Mốc son vĩ đại mở đầu hành trình 30 năm bôn ba tìm con đường giải phóng cho cả dân tộc Việt Nam.',
    imageUrl: '/assets/hcm-space/ben-nha-rong-06.jpg',
    officialLink: 'https://baotanghochiminh.vn',
    coordsText: '10°46\'N 106°42\'E',
  },
  {
    id: 'site-4',
    name: 'Di tích Nhà số 5 Châu Văn Liêm',
    location: 'Quận 5, TP. Hồ Chí Minh',
    region: 'Miền Nam',
    period: '1910 – 1911',
    role: 'Nơi Bác Hồ tá túc và chuẩn bị trước ngày bước lên tàu cứu nước',
    significance: 'Trụ sở Liên Thành Thương Quán tại Sài Gòn, điểm dừng chân cuối cùng của Người trước khi rời Tổ quốc năm 1911.',
    imageUrl: '/assets/hcm-space/tieusu2-1919.png',
    officialLink: 'https://hochiminhcity.gov.vn',
    coordsText: '10°45\'N 106°39\'E',
  },
  {
    id: 'site-5',
    name: 'Khu Di tích Quốc gia Đặc biệt Pác Bó',
    location: 'Hà Quảng, Cao Bằng',
    region: 'Miền Bắc',
    period: '28/01/1941',
    role: 'Nơi Bác Hồ trở về Tổ quốc sau 30 năm bôn ba',
    significance: 'Hang Cốc Bó, suối Lê-nin, núi Các Mác nơi Người trực tiếp lãnh đạo cách mạng Việt Nam đi đến thắng lợi Cách mạng Tháng Tám.',
    imageUrl: '/assets/hcm-space/tieusu3-1920.png',
    officialLink: 'https://baotanghochiminh.vn',
    coordsText: '22°58\'N 106°03\'E',
  },
  {
    id: 'site-6',
    name: 'Khu Di tích Quốc gia Đặc biệt Tân Trào',
    location: 'Sơn Dương, Tuyên Quang',
    region: 'Miền Bắc',
    period: '1945 – 1954',
    role: 'Thủ đô Khu Giải phóng — Thủ đô Kháng chiến',
    significance: 'Cây đa Tân Trào, Lán Nà Nưa nơi Quốc dân Đại hội Tân Trào quyết định Tổng khởi nghĩa giành chính quyền trong cả nước.',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    officialLink: 'https://tuyenquang.gov.vn',
    coordsText: '21°46\'N 105°18\'E',
  },
  {
    id: 'site-7',
    name: 'Di tích Nhà số 48 Hàng Ngang',
    location: 'Hoàn Kiếm, Hà Nội',
    region: 'Miền Bắc',
    period: '08/1945',
    role: 'Nơi Chủ tịch Hồ Chí Minh khởi thảo bản Tuyên ngôn Độc lập',
    significance: 'Nơi khai sinh bản Tuyên ngôn Độc lập bất hủ, khai sinh ra nước Việt Nam Dân chủ Cộng hòa ngày 02/09/1945.',
    imageUrl: '/assets/hcm-space/card-tac-pham.jpg',
    officialLink: 'https://baotanglichsu.vn',
    coordsText: '21°02\'N 105°51\'E',
  },
  {
    id: 'site-8',
    name: 'Khu Di tích Phủ Chủ tịch & Lăng Bác',
    location: 'Ba Đình, Hà Nội',
    region: 'Miền Bắc',
    period: '1954 – 1969',
    role: 'Nơi Bác sống, làm việc trọn 15 năm cuối đời và an nghỉ vĩnh hằng',
    significance: 'Di tích quốc gia đặc biệt Nhà sàn gỗ, ao cá, vườn cây và Lăng Chủ tịch Hồ Chí Minh thiêng liêng giữa Ba Đình lịch sử.',
    imageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    officialLink: 'https://ditichhochiminhphuchutich.gov.vn',
    coordsText: '21°02\'N 105°49\'E',
  },
  {
    id: 'site-9',
    name: 'Không Gian Văn Hóa Hồ Chí Minh Phường Thủ Dầu Một',
    location: 'Thủ Dầu Một, Bình Dương',
    region: 'Thủ Dầu Một',
    period: 'Hiện đại (Chỉ thị 07-CT/TW)',
    role: 'Không gian văn hóa số và chuỗi mô hình học tập theo Bác tại cơ sở',
    significance: 'Tích hợp 8 gian bảo tàng số, tra cứu 15 tập Toàn tập, chuẩn mực Quy định 144 và kết nối sinh hoạt Đảng bộ cơ sở.',
    imageUrl: '/assets/hcm-space/ueh-3d.jpg',
    officialLink: 'https://hochiminhcity.gov.vn/landing-khong-gian-van-hoa-ho-chi-minh',
    coordsText: '10°59\'N 106°39\'E',
  },
  {
    id: 'site-10',
    name: 'Nhà Truyền Thống Thủ Dầu Một (Di tích Nhà việc Phú Cường)',
    location: 'Đường Ngô Quyền & Bạch Đằng, P. Phú Cường, TP. Thủ Dầu Một',
    region: 'Thủ Dầu Một',
    period: '1945 – 1975 – Nay',
    role: 'Địa chỉ đỏ cướp chính quyền Cách mạng Tháng 8/1945 và giải phóng Đất Thủ 30/4/1975',
    significance: 'Nằm tại công viên Nhà việc Phú Cường sát bờ sông Sài Gòn, nơi ghi dấu chiến công hiển hách của quân dân Thủ Dầu Một và tái hiện các di sản làng nghề thủ công Đất Thủ.',
    imageUrl: '/assets/hcm-space/hero-arch-full.jpg',
    officialLink: 'https://maps.app.goo.gl/T5SZ3hYQgSzWuzmT8',
    coordsText: '10°58\'45.0"N 106°39\'11.8"E',
  },
  {
    id: 'site-11',
    name: 'Chùa Hội Khánh — Nơi Cụ Phó bảng Nguyễn Sinh Sắc hoạt động yêu nước',
    location: 'Đường Yersin, P. Phú Cường, TP. Thủ Dầu Một',
    region: 'Thủ Dầu Một',
    period: '1923 – 1926',
    role: 'Thành lập Hội Danh dự yêu nước, ươm mầm tinh thần cách mạng',
    significance: 'Cụ thân sinh Chủ tịch Hồ Chí Minh cùng các nhân sĩ yêu nước thành lập Hội Danh dự yêu nước, bốc thuốc chữa bệnh cho người nghèo và gieo mầm giải phóng dân tộc.',
    imageUrl: '/assets/hcm-space/card-dong-thoi-gian.jpg',
    officialLink: 'https://chuoitoancanh.vn',
    coordsText: '10°58\'40"N 106°39\'35"E',
  },
];

export const HcmRedHeritageMapModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpenTdmHouse?: () => void;
}> = ({ isOpen, onClose, onOpenTdmHouse }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [activeSite, setActiveSite] = useState<RedHeritageSite>(RED_HERITAGE_SITES[0]);

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

  const handleSelectRegion = (reg: string) => {
    setSelectedRegion(reg);
    if (reg !== 'ALL') {
      const firstSiteInRegion = RED_HERITAGE_SITES.find((s) => s.region === reg);
      if (firstSiteInRegion) {
        setActiveSite(firstSiteInRegion);
      }
    }
  };

  const filteredSites = RED_HERITAGE_SITES.filter(
    (s) => selectedRegion === 'ALL' || s.region === selectedRegion
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-gradient-to-br from-white to-rose-50/30 rounded-3xl border-2 border-rose-300 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#54121E] px-6 py-4.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-300/50 flex items-center justify-center p-2">
              <Compass className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <div className="text-[10.5px] font-bold text-rose-100 tracking-[0.16em] uppercase">
                BẢN ĐỒ SỐ DI TÍCH LỊCH SỬ QUỐC GIA
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                Hệ Thống Địa Chỉ Đỏ Di Sản Hồ Chí Minh
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-rose-100 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thanh lọc vùng miền */}
        <div className="p-3.5 border-b border-rose-200/80/50 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-rose-800 uppercase text-[11px]">Khu vực:</span>
            {['ALL', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Thủ Dầu Một'].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => handleSelectRegion(reg)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs'
                    : 'bg-gradient-to-br from-white to-rose-50/30 border border-rose-200/80 text-slate-900 hover:border-rose-500'
                }`}
              >
                {reg === 'ALL' ? `Toàn quốc (${RED_HERITAGE_SITES.length} Địa chỉ đỏ)` : reg}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-600 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Đang chọn: <strong>{activeSite.name}</strong></span>
          </div>
        </div>

        {/* Khối gợi ý chuyên đề Thủ Dầu Một mới */}
        {selectedRegion === 'Thủ Dầu Một' && onOpenTdmHouse && (
          <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border-b border-rose-300/40 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-rose-800 shrink-0">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                Bạn đang tìm hiểu di tích tại địa phương? Khám phá <strong>Bản đồ số 12 Di tích &amp; Biên niên sử Đảng bộ Phường Thủ Dầu Một mới (từ 01/07/2025)</strong>:
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenTdmHouse}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <span>Mở Bản đồ Di tích Thủ Dầu Một</span>
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bố cục 2 cột: Danh sách bên trái, Chi tiết di tích bên phải */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Cột trái: Danh sách các địa chỉ đỏ */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                onClick={() => setActiveSite(site)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  activeSite.id === site.id
                    ? 'border-rose-500 bg-white shadow-md ring-2 ring-[#751D2C]/20'
                    : 'border-rose-200/80/60 bg-white/70 hover:bg-white hover:border-rose-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10.5px]">
                    <span className="px-1.5 py-0.2 rounded-md bg-gradient-to-r from-rose-700 to-[#881337] text-white font-bold">
                      {site.region}
                    </span>
                    <span className="text-rose-600 font-bold">{site.period}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-slate-900 leading-snug">
                    {site.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-800" />
                    <span>{site.location}</span>
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-rose-200/80/60 bg-stone-100">
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/hcm-space/anh-bac.png';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Cột phải: Bản đồ và chi tiết di tích */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-rose-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-rose-200/80 shadow-inner bg-stone-900">
                <img
                  src={activeSite.imageUrl}
                  alt={activeSite.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/hcm-space/hero-arch-full.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
                  <div className="text-[10px] uppercase font-bold text-rose-100 tracking-wider">
                    {activeSite.location} • Tọa độ: {activeSite.coordsText}
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg">
                    {activeSite.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-white to-rose-50/30 border-l-4 border-rose-500 text-xs font-semibold text-rose-800">
                  {activeSite.role}
                </div>

                <p className="text-xs text-slate-900 leading-relaxed">
                  {activeSite.significance}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200/80/50 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-600 italic font-medium">
                Tư liệu chuẩn hóa theo Ban Quản lý Di tích &amp; NXB CTQG Sự thật
              </span>

              <a
                href={activeSite.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-700 to-[#881337] hover:bg-rose-900 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <span>Xem trang tư liệu chính thức</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
