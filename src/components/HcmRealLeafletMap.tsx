import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Map,
  Satellite,
  Mountain,
  Car,
  Globe,
  Navigation,
  Crosshair,
  Layers,
  ExternalLink,
  Sparkles,
  MapPin,
  Maximize2,
} from 'lucide-react';
import { type ThuDauMotMapPoint } from '../data/hcmDynamicMapData';

export type TdmMapLayerKey =
  | 'carto-voyager'
  | 'carto-light'
  | 'osm'
  | 'esri-imagery'
  | 'esri-topo';

export interface TdmMapLayerConfig {
  key: TdmMapLayerKey;
  label: string;
  shortLabel: string;
  url: string;
  subdomains: string[];
  maxZoom: number;
  attribution: string;
}

export const TDM_MAP_LAYERS: Record<TdmMapLayerKey, TdmMapLayerConfig> = {
  'carto-voyager': {
    key: 'carto-voyager',
    label: 'Bản Đồ Đường Phố (Voyager)',
    shortLabel: 'Đường phố',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
    attribution: '&copy; CartoDB &copy; OpenStreetMap contributors',
  },
  'carto-light': {
    key: 'carto-light',
    label: 'Nền Sáng Tối Giản (Positron)',
    shortLabel: 'Nền sáng',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
    attribution: '&copy; CartoDB &copy; OpenStreetMap contributors',
  },
  'osm': {
    key: 'osm',
    label: 'Bản Đồ Mở (OpenStreetMap)',
    shortLabel: 'OSM',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  },
  'esri-imagery': {
    key: 'esri-imagery',
    label: 'Ảnh Vệ Tinh GIS (Esri)',
    shortLabel: 'Vệ tinh',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    subdomains: [],
    maxZoom: 19,
    attribution: '&copy; Esri World Imagery',
  },
  'esri-topo': {
    key: 'esri-topo',
    label: 'Bản Đồ Địa Hình GIS (Esri)',
    shortLabel: 'Địa hình',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    subdomains: [],
    maxZoom: 19,
    attribution: '&copy; Esri Topo',
  },
};

interface HcmRealLeafletMapProps {
  points: ThuDauMotMapPoint[];
  activePointId: string;
  onSelectPoint: (id: string) => void;
  onOpenDetail?: () => void;
}

export const HcmRealLeafletMap: React.FC<HcmRealLeafletMapProps> = ({
  points,
  activePointId,
  onSelectPoint,
  onOpenDetail,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [activeLayerKey, setActiveLayerKey] = useState<TdmMapLayerKey>('carto-voyager');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Tọa độ trung tâm Phường Thủ Dầu Một
  const CENTER_TDM: [number, number] = [10.9805, 106.6540];

  // =========================================================================
  // 1. Cấu hình màu sắc, icon SVG và phân loại cho ghim giọt nước (Teardrop)
  // =========================================================================
  const getPointCategoryConfig = (pt: ThuDauMotMapPoint) => {
    if (pt.code === 'HC-01') {
      return {
        bg: '#881337', // Hồng cánh sen đậm pha đỏ
        tip: '#881337',
        border: '#F43F5E',
        tag: 'Trụ sở Hành chính',
        iconSvg: `
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9z"/>
          </svg>
        `,
      };
    }
    if (pt.category === 'DI_TICH_LICH_SU') {
      return {
        bg: '#B91C1C', // Đỏ cờ / đỏ gạch truyền thống
        tip: '#B91C1C',
        border: '#EF4444',
        tag: 'Di tích Lịch sử',
        iconSvg: `
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        `,
      };
    }
    if (pt.category === 'KHONG_GIAN_HCM') {
      return {
        bg: '#D97706', // Vàng hổ phách rạng rỡ
        tip: '#D97706',
        border: '#F59E0B',
        tag: 'Không gian Văn hóa HCM',
        iconSvg: `
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        `,
      };
    }
    return {
      bg: '#2563EB', // Xanh lam ngọc tuyến đỏ
      tip: '#2563EB',
      border: '#3B82F6',
      tag: 'Tuyến Về Nguồn',
      iconSvg: `
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      `,
    };
  };

  // Trích xuất tên ngắn gọn, cô đọng cho nhãn hiển thị dưới chân ghim
  const getShortLabel = (name: string): string => {
    return name
      .replace('Không Gian Văn Hóa Hồ Chí Minh — ', 'KGVH HCM ')
      .replace('Không Gian Văn Hóa Hồ Chí Minh & ', 'KGVH HCM & ')
      .replace('Trụ Sở Đảng Ủy – HĐND – UBND Phường Thủ Dầu Một', 'Trụ sở UBND Phường')
      .replace('Hoa Viên Bạch Đằng & Tượng Đài Chủ Tịch Hồ Chí Minh', 'Hoa viên Bạch Đằng')
      .replace('Chợ Thủ Dầu Một & Nhà Truyền Thống Đất Thủ (Nhà Việc Phú Cường)', 'Chợ Thủ Dầu Một')
      .replace('Đình Phú Cường & Nhà Cổ Đốc Phủ Sử', 'Đình Phú Cường')
      .replace('Chùa Hội Khánh — Dấu Ấn Cụ Phó Bảng Nguyễn Sinh Sắc', 'Chùa Hội Khánh')
      .replace('Cầu Phú Cường & Cửa Ngõ Giao Thương Sông Sài Gòn', 'Cầu Phú Cường')
      .replace('Trạm Trung Tâm: Tuyến Du Khảo Đỏ Về Nguồn Thủ Dầu Một', 'Tuyến Về Nguồn')
      .replace(/— Phân Khu\s+.*/i, '')
      .trim();
  };

  // =========================================================================
  // 2. Khởi tạo bản đồ Leaflet
  // =========================================================================
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: CENTER_TDM,
      zoom: 15,
      minZoom: 12,
      maxZoom: 20,
      zoomControl: false,
    });

    const initialCfg = TDM_MAP_LAYERS[activeLayerKey];
    const initialTile = L.tileLayer(initialCfg.url, {
      maxZoom: initialCfg.maxZoom,
      subdomains: initialCfg.subdomains,
      attribution: initialCfg.attribution,
    }).addTo(map);

    activeTileLayerRef.current = initialTile;

    // Zoom control ở góc trên bên phải
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Lắng nghe sự kiện mở popup để gắn click handler cho nút Xem chi tiết
    map.on('popupopen', (e) => {
      const container = e.popup.getElement();
      if (!container) return;
      const detailBtn = container.querySelector(`[id^="tdm-popup-detail-"]`);
      if (detailBtn) {
        detailBtn.addEventListener('click', () => {
          if (onOpenDetail) onOpenDetail();
        });
      }
    });

    mapInstanceRef.current = map;

    // ResizeObserver giúp cập nhật bản đồ chính xác khi container co giãn
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // =========================================================================
  // 3. Chuyển đổi lớp bản đồ (Google Maps, Vệ tinh, Địa hình, Giao thông, OSM)
  // =========================================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeTileLayerRef.current) {
      map.removeLayer(activeTileLayerRef.current);
    }

    const cfg = TDM_MAP_LAYERS[activeLayerKey];
    const newLayer = L.tileLayer(cfg.url, {
      maxZoom: cfg.maxZoom,
      subdomains: cfg.subdomains,
      attribution: cfg.attribution,
    }).addTo(map);

    activeTileLayerRef.current = newLayer;
  }, [activeLayerKey]);

  // =========================================================================
  // 4. Render 12 điểm di tích với thiết kế ghim giọt nước (Teardrop Marker)
  // =========================================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Xóa marker cũ
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    points.forEach((pt) => {
      if (!pt.lat || !pt.lng) return;

      const isActive = pt.id === activePointId;
      const cfg = getPointCategoryConfig(pt);
      const shortLabel = getShortLabel(pt.name);

      // HTML thiết kế ghim giọt nước chuẩn GIS cao cấp
      const markerHtml = `
        <div class="group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-115 z-50' : 'hover:scale-110 z-20'
        }">
          <!-- Vòng sáng phát xạ khi active -->
          ${
            isActive
              ? `<div style="position: absolute; top: -6px; width: 50px; height: 50px; border-radius: 50%; background: ${cfg.bg}; opacity: 0.35; animation: tdmPulse 1.4s infinite ease-out; pointer-events: none;"></div>`
              : ''
          }

          <!-- Cấu trúc ghim giọt nước (Teardrop Pin) -->
          <div class="relative flex flex-col items-center filter drop-shadow-md">
            <!-- Vòm tròn trên chứa biểu tượng -->
            <div
              style="background-color: ${cfg.bg};"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg border-2 text-white relative transition-all duration-300 ${
                isActive
                  ? 'border-amber-300 ring-4 ring-amber-300/80 scale-105'
                  : 'border-white/95 shadow-md'
              }"
            >
              ${cfg.iconSvg}
              ${
                pt.code.startsWith('DT')
                  ? `<span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-slate-950 font-black rounded-full border border-white flex items-center justify-center text-[8px] shadow-xs">★</span>`
                  : ''
              }
            </div>

            <!-- Đỉnh nhọn tam giác dưới (góc xoay 45 độ) trỏ chuẩn xác tọa độ -->
            <div
              style="background-color: ${cfg.tip};"
              class="w-2.5 h-2.5 rotate-45 -mt-1.5 border-r border-b border-white/60 shadow-xs"
            ></div>
          </div>

          <!-- Nhãn địa danh dạng viên thuốc (Pill Label) nổi bật dưới chân ghim -->
          <div class="mt-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-bold max-w-[130px] truncate shadow-sm text-center border transition-all ${
            isActive
              ? 'bg-rose-950 text-amber-300 border-amber-300 ring-1 ring-amber-400 font-extrabold shadow-md scale-105'
              : 'bg-white/95 text-slate-800 border-slate-300 backdrop-blur-sm group-hover:bg-rose-900 group-hover:text-white'
          }">
            ${shortLabel}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-tdm-teardrop-pin',
        html: markerHtml,
        iconSize: [44, 60],
        iconAnchor: [22, 54],
        popupAnchor: [0, -50],
      });

      const marker = L.marker([pt.lat, pt.lng], {
        icon: customIcon,
        zIndexOffset: isActive ? 1000 : 0,
      }).addTo(map);

      // Khung Popup thông tin chi tiết
      const popupHtml = `
        <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 2px; width: 250px; line-height: 1.4;">
          ${
            pt.imageUrl
              ? `
              <div style="width: 100%; height: 96px; border-radius: 12px; overflow: hidden; margin-bottom: 8px; position: relative; background: #f1f5f9;">
                <img src="${pt.imageUrl}" alt="${pt.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
                <span style="position: absolute; top: 6px; left: 6px; background: ${cfg.bg}; color: #ffffff; font-size: 8.5px; font-weight: 800; padding: 2px 6px; border-radius: 6px; text-transform: uppercase; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  ${cfg.tag}
                </span>
              </div>
            `
              : ''
          }
          <div style="font-size: 10px; font-weight: 800; color: ${cfg.bg}; text-transform: uppercase; margin-bottom: 2px;">
            ${pt.khuPho} · ${pt.code}
          </div>
          <h4 style="font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 4px 0; line-height: 1.3;">
            ${pt.name}
          </h4>
          <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">
            📍 ${pt.address}
          </p>
          <div style="font-size: 10.5px; color: #334155; margin-bottom: 10px; line-height: 1.4; max-height: 58px; overflow: hidden; text-overflow: ellipsis;">
            ${pt.summary.slice(0, 115)}...
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              pt.googleMapsQuery || pt.address
            )}" target="_blank" rel="noopener noreferrer" style="
              flex: 1;
              background: #751D2C;
              color: #ffffff;
              padding: 6px 8px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 700;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              box-shadow: 0 2px 4px rgba(117, 29, 44, 0.25);
            ">
              Chỉ đường
            </a>
            <button type="button" id="tdm-popup-detail-${pt.id}" style="
              flex: 1;
              background: #FFF1F2;
              color: #9F1239;
              border: 1px solid #FECDD3;
              padding: 6px 8px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s;
            ">
              Xem chi tiết
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        autoPanPaddingTopLeft: L.point(15, 65),
        autoPanPaddingBottomRight: L.point(15, 45),
      });

      marker.on('click', () => {
        onSelectPoint(pt.id);
      });

      markersRef.current[pt.id] = marker;
    });
  }, [points, activePointId, onSelectPoint, onOpenDetail]);

  // =========================================================================
  // 5. Đồng bộ di chuyển (flyTo) khi activePointId thay đổi
  // =========================================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activePointId) return;

    const currentPt = points.find((p) => p.id === activePointId);
    if (currentPt && currentPt.lat && currentPt.lng) {
      map.flyTo([currentPt.lat, currentPt.lng], 16.5, {
        duration: 0.9,
        easeLinearity: 0.25,
      });

      // Tự động mở popup sau khi lướt tới điểm
      setTimeout(() => {
        const activeMarker = markersRef.current[activePointId];
        if (activeMarker) {
          activeMarker.openPopup();
        }
      }, 450);
    }
  }, [activePointId, points]);

  // Về trung tâm phường Thủ Dầu Một
  const handleResetCenter = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(CENTER_TDM, 15, { duration: 0.8 });
    }
  };

  // Định vị GPS vị trí hiện tại của người dùng
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt không hỗ trợ định vị GPS.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const map = mapInstanceRef.current;
        if (map) {
          map.flyTo([latitude, longitude], 16, { duration: 0.8 });
          if (userMarkerRef.current) {
            map.removeLayer(userMarkerRef.current);
          }
          const userIcon = L.divIcon({
            className: 'google-user-pulse-marker',
            html: `
              <div class="relative flex items-center justify-center">
                <div class="w-8 h-8 rounded-full bg-blue-500/30 animate-ping absolute"></div>
                <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md relative z-10 flex items-center justify-center">
                  <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <div class="absolute -bottom-5 bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-md whitespace-nowrap">
                  Vị trí của bạn
                </div>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });
          userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(map);
        }
      },
      (err) => {
        setIsLocating(false);
        alert('Không thể xác định vị trí hiện tại: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-rose-200/90 shadow-inner bg-slate-100 flex flex-col">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* =========================================================================
          THANH ĐIỀU KHIỂN LỚP BẢN ĐỒ (MAP LAYER SWITCHER & GIS CONTROLS)
          ========================================================================= */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-rose-200/90 shadow-lg max-w-[calc(100%-24px)]">
        {/* Nhóm nút 5 lớp bản đồ */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
          {Object.values(TDM_MAP_LAYERS).map((layer) => {
            const isCurrent = activeLayerKey === layer.key;
            return (
              <button
                key={layer.key}
                type="button"
                onClick={() => setActiveLayerKey(layer.key)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#881337] to-[#BE123C] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-rose-50'
                }`}
                title={`Chuyển lớp: ${layer.label}`}
              >
                {layer.key === 'carto-voyager' && <Map className="w-3.5 h-3.5 text-rose-600" />}
                {layer.key === 'carto-light' && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                {layer.key === 'osm' && <Globe className="w-3.5 h-3.5 text-indigo-500" />}
                {layer.key === 'esri-imagery' && <Satellite className="w-3.5 h-3.5 text-blue-500" />}
                {layer.key === 'esri-topo' && <Mountain className="w-3.5 h-3.5 text-emerald-500" />}
                <span>{layer.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Đường phân cách */}
        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* Nút tác vụ phụ trợ: Về trung tâm & Định vị GPS */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetCenter}
            className="px-2 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-rose-50 flex items-center gap-1 cursor-pointer transition-colors"
            title="Về trung tâm Phường Thủ Dầu Một"
          >
            <Navigation className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Trung tâm</span>
          </button>

          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocating}
            className={`px-2 py-1 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              isLocating
                ? 'bg-blue-100 text-blue-700 animate-pulse'
                : 'text-blue-700 hover:bg-blue-50'
            }`}
            title="Định vị vị trí hiện tại của bạn"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isLocating ? 'Đang dò GPS...' : 'Vị trí tôi'}</span>
          </button>
        </div>
      </div>

      {/* Huy hiệu trạng thái & nguồn dữ liệu góc dưới */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-200/90 shadow-md flex items-center gap-2 text-xs font-medium text-slate-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-[#881337] text-[11px]">Bản đồ Di tích Số · Thủ Dầu Một</span>
      </div>

      {/* Hiệu ứng hoạt họa cho điểm phát sáng & tùy biến giao diện popup Leaflet */}
      <style>{`
        @keyframes tdmPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .custom-tdm-teardrop-pin {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 18px !important;
          box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.25) !important;
          border: 1px solid rgba(244, 63, 94, 0.25) !important;
          padding: 6px !important;
        }
        .leaflet-popup-content {
          margin: 6px 8px !important;
        }
        .leaflet-popup-tip {
          background: #ffffff !important;
        }
      `}</style>
    </div>
  );
};
