import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Compass, Play, Pause, RotateCcw } from 'lucide-react';
import {
  JOURNEY_10_STAGES,
  HERITAGE_STOP_POINTS,
  USSH_61_GPS_POINTS,
  type JourneyStage,
  type HeritageStopPoint,
  type UsshPoint,
} from '../data/hcmHeritageMapData';

// Accurate GPS Coordinates for all 26 stops across the globe
const STOP_GPS_MAP: Record<string, [number, number]> = {
  stop_01: [10.9274, 108.0998], // Phan Thiết
  stop_02: [10.7534, 106.6575], // Châu Văn Liêm, Sài Gòn
  stop_03: [10.7681, 106.7067], // Bến Nhà Rồng, Sài Gòn
  stop_04: [1.2902, 103.8519],   // Singapore
  stop_05: [6.9271, 79.8612],    // Colombo, Sri Lanka
  stop_06: [31.2653, 32.3019],  // Port Said, Kênh Suez, Ai Cập
  stop_07: [43.2965, 5.3698],    // Marseille, Pháp
  stop_08: [14.7167, -17.4677], // Dakar, Senegal, Châu Phi
  stop_09: [42.3601, -71.0589], // Boston, Hoa Kỳ
  stop_10: [40.7128, -74.006],  // New York, Hoa Kỳ
  stop_11: [51.5144, -0.3204],  // Drayton Court, London
  stop_12: [51.5074, -0.1311],  // Carlton Hotel, London
  stop_13: [48.8938, 2.3277],   // Số 9 Ngõ Compoint, Paris
  stop_14: [48.8049, 2.1204],   // Hội nghị Versailles 1919
  stop_15: [47.3941, 0.6848],   // Đại hội Tours 1920
  stop_16: [48.8638, 2.4484],   // Báo Le Paria & Montreuil, Paris
  stop_17: [55.7558, 37.6173],  // Moskva, Liên Xô (KUTV)
  stop_18: [55.7512, 37.6184],  // Moskva, Điện Kremlin (Đại hội V)
  stop_19: [23.1252, 113.2755], // Quảng Châu (Hội VNCM Thanh niên)
  stop_20: [23.1255, 113.276],  // Báo Thanh Niên, Quảng Châu
  stop_21: [17.4087, 104.7785], // Bản Đông, Nakhon Phanom, Thái Lan
  stop_22: [22.3193, 114.1694], // Hương Cảng (Thành lập Đảng 3/2/1930)
  stop_23: [22.2818, 114.1537], // Nhà tù Victoria, Hong Kong (Tống Văn Sơ)
  stop_24: [22.9818, 106.0504], // Pác Bó, Cao Bằng (28/01/1941)
  stop_25: [21.7583, 105.5167], // Tân Trào, Tuyên Quang (1945)
  stop_26: [21.0373, 105.8344], // Quảng trường Ba Đình, Hà Nội (02/09/1945)
};

export interface HcmWorldLeafletMapProps {
  activePointId: string;
  onSelectPoint: (id: string) => void;
  selectedStageNumber?: number;
  pointDataset?: 'CORE_15' | 'USSH_61';
  activeUsshPointId?: number;
  onSelectUsshPoint?: (id: number) => void;
}

export const HcmWorldLeafletMap: React.FC<HcmWorldLeafletMapProps> = ({
  activePointId,
  onSelectPoint,
  selectedStageNumber = 0,
  pointDataset = 'CORE_15',
  activeUsshPointId = 1,
  onSelectUsshPoint,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  const [mapType, setMapType] = useState<'STREET' | 'SATELLITE'>('STREET');
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState(false);

  // Global Center for the World Map
  const CENTER_WORLD: [number, number] = [24, 38];

  // 1. Initialize World Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: CENTER_WORLD,
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
      worldCopyJump: true,
    });

    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    activeTileLayerRef.current = streetLayer;

    // Custom Zoom control at bottom-left to avoid occluding top toolbar
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Switch Street / Satellite
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeTileLayerRef.current) {
      map.removeLayer(activeTileLayerRef.current);
    }

    if (mapType === 'STREET') {
      activeTileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; OpenStreetMap contributors',
        }
      ).addTo(map);
    } else {
      activeTileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Tiles &copy; Esri &mdash; World Imagery',
        }
      ).addTo(map);
    }
  }, [mapType]);

  // 3. Render World Voyage Polyline and Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing polyline
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    // Remove old markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    if (pointDataset === 'USSH_61') {
      // Filter points based on selected stage
      const pointsToRender =
        selectedStageNumber > 0
          ? USSH_61_GPS_POINTS.filter((p) => p.stageNumber === selectedStageNumber)
          : USSH_61_GPS_POINTS;

      // Build polyline coordinates
      const latLngs: [number, number][] = pointsToRender.map((pt) => [pt.coords.lat, pt.coords.lng]);

      if (latLngs.length > 1) {
        polylineRef.current = L.polyline(latLngs, {
          color: '#F59E0B',
          weight: 3,
          opacity: 0.85,
          dashArray: '6, 5',
          lineCap: 'round',
        }).addTo(map);
      }

      // Render USSH 61 Markers
      pointsToRender.forEach((pt) => {
        const isSelected = pt.id === activeUsshPointId;
        const coords: [number, number] = [pt.coords.lat, pt.coords.lng];

        const iconHtml = `
          <div class="hcm-world-marker ${isSelected ? 'is-active' : ''}" style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            ${
              isSelected
                ? `<div style="position: absolute; width: 42px; height: 42px; border-radius: 50%; background: #EF4444; opacity: 0.45; animation: hcmWorldPulse 1.4s infinite ease-out;"></div>`
                : ''
            }
            <div style="
              width: ${isSelected ? '28px' : '22px'};
              height: ${isSelected ? '28px' : '22px'};
              background: ${isSelected ? '#DC2626' : '#D97706'};
              border: 2px solid #FFFFFF;
              border-radius: 50%;
              box-shadow: 0 3px 8px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #FFFFFF;
              font-size: ${isSelected ? '10px' : '8.5px'};
              font-weight: 900;
              cursor: pointer;
              transition: all 0.25s ease;
            ">
              #${pt.id}
            </div>
            <div style="
              position: absolute;
              bottom: -4px;
              width: 0;
              height: 0;
              border-left: 3px solid transparent;
              border-right: 3px solid transparent;
              border-top: 4px solid ${isSelected ? '#DC2626' : '#D97706'};
            "></div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'hcm-world-div-icon',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 26],
          popupAnchor: [0, -24],
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(map);

        const popupHtml = `
          <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 2px; width: 220px; line-height: 1.4;">
            <div style="font-size: 10px; font-weight: 800; color: #D97706; text-transform: uppercase; margin-bottom: 2px;">
              ${pt.stage} · Mốc #${pt.id}
            </div>
            <h4 style="font-size: 12.5px; font-weight: 800; color: #1E293B; margin: 0 0 3px 0;">
              ${pt.place}
            </h4>
            <div style="font-size: 10.5px; color: #475569; margin-bottom: 6px;">
              📍 Kinh độ: ${pt.coords.lng.toFixed(3)}, Vĩ độ: ${pt.coords.lat.toFixed(3)}
            </div>
            <div style="font-size: 10.5px; color: #334155; line-height: 1.35;">
              ${pt.content.slice(0, 110)}...
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml);

        marker.on('click', () => {
          if (onSelectUsshPoint) onSelectUsshPoint(pt.id);
        });

        markersRef.current[String(pt.id)] = marker;
      });
    } else {
      // CORE_15 mode (26 Core Stops)
      const pointsToRender =
        selectedStageNumber > 0
          ? HERITAGE_STOP_POINTS.filter((p) => p.stageNumber === selectedStageNumber)
          : HERITAGE_STOP_POINTS;

      // Build polyline coordinates
      const latLngs: [number, number][] = [];
      pointsToRender.forEach((pt) => {
        const coords = STOP_GPS_MAP[pt.id];
        if (coords) latLngs.push(coords);
      });

      if (latLngs.length > 1) {
        polylineRef.current = L.polyline(latLngs, {
          color: '#D97706',
          weight: 3.5,
          opacity: 0.85,
          dashArray: '8, 6',
          lineCap: 'round',
        }).addTo(map);
      }

      // Render Markers
      HERITAGE_STOP_POINTS.forEach((pt) => {
        const coords = STOP_GPS_MAP[pt.id];
        if (!coords) return;

        const isSelected = pt.id === activePointId;
        const stageMatch = selectedStageNumber === 0 || pt.stageNumber === selectedStageNumber;

        const stageInfo = JOURNEY_10_STAGES.find((s) => s.stageNumber === pt.stageNumber);
        const markerColor = stageInfo ? stageInfo.color : '#DC2626';

        const iconHtml = `
          <div class="hcm-world-marker ${isSelected ? 'is-active' : ''}" style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: ${stageMatch ? 1 : 0.35};
          ">
            ${
              isSelected
                ? `<div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: ${markerColor}; opacity: 0.4; animation: hcmWorldPulse 1.4s infinite ease-out;"></div>`
                : ''
            }
            <div style="
              width: ${isSelected ? '32px' : '24px'};
              height: ${isSelected ? '32px' : '24px'};
              background: ${isSelected ? '#DC2626' : markerColor};
              border: 2px solid #FFFFFF;
              border-radius: 50%;
              box-shadow: 0 4px 10px rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #FFFFFF;
              font-size: ${isSelected ? '11px' : '9.5px'};
              font-weight: 900;
              cursor: pointer;
              transition: all 0.25s ease;
            ">
              #${pt.order}
            </div>
            <div style="
              position: absolute;
              bottom: -5px;
              width: 0;
              height: 0;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              border-top: 5px solid ${isSelected ? '#DC2626' : markerColor};
            "></div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'hcm-world-div-icon',
          html: iconHtml,
          iconSize: [36, 36],
          iconAnchor: [18, 30],
          popupAnchor: [0, -28],
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(map);

        const popupHtml = `
          <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 2px; width: 230px; line-height: 1.4;">
            <div style="font-size: 10px; font-weight: 800; color: ${markerColor}; text-transform: uppercase; margin-bottom: 2px;">
              Chặng ${pt.stageNumber} · Mốc #${pt.order} (${pt.year})
            </div>
            <h4 style="font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 3px 0; line-height: 1.3;">
              ${pt.name}
            </h4>
            <p style="font-size: 11px; color: #475569; margin: 0 0 5px 0;">
              📍 ${pt.location} (${pt.country})
            </p>
            <div style="font-size: 10.5px; color: #751D2C; font-weight: 700; margin-bottom: 4px;">
              Bí danh: ${pt.alias}
            </div>
            <div style="font-size: 11px; color: #334155; margin-bottom: 8px; font-style: italic;">
              ${pt.events.slice(0, 95)}...
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml);

        marker.on('click', () => {
          onSelectPoint(pt.id);
        });

        markersRef.current[pt.id] = marker;
      });
    }
  }, [selectedStageNumber, activePointId, activeUsshPointId, pointDataset, onSelectPoint, onSelectUsshPoint]);

  // 4. Smooth FlyTo Active Point
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (pointDataset === 'USSH_61') {
      const pt = USSH_61_GPS_POINTS.find((p) => p.id === activeUsshPointId);
      if (pt) {
        map.flyTo([pt.coords.lat, pt.coords.lng], 5.5, {
          duration: 1.1,
          easeLinearity: 0.25,
        });

        setTimeout(() => {
          const marker = markersRef.current[String(activeUsshPointId)];
          if (marker) marker.openPopup();
        }, 600);
      }
    } else {
      if (!activePointId) return;
      const coords = STOP_GPS_MAP[activePointId];
      if (coords) {
        map.flyTo(coords, 5.5, {
          duration: 1.1,
          easeLinearity: 0.25,
        });

        setTimeout(() => {
          const marker = markersRef.current[activePointId];
          if (marker) marker.openPopup();
        }, 600);
      }
    }
  }, [activePointId, activeUsshPointId, pointDataset]);

  // 5. Auto Tour
  useEffect(() => {
    if (!isPlayingAutoTour) return;

    const interval = setInterval(() => {
      if (pointDataset === 'USSH_61') {
        const currentIdx = USSH_61_GPS_POINTS.findIndex((p) => p.id === activeUsshPointId);
        const nextIdx = (currentIdx + 1) % USSH_61_GPS_POINTS.length;
        if (onSelectUsshPoint) {
          onSelectUsshPoint(USSH_61_GPS_POINTS[nextIdx].id);
        }
      } else {
        const currentIdx = HERITAGE_STOP_POINTS.findIndex((p) => p.id === activePointId);
        const nextIdx = (currentIdx + 1) % HERITAGE_STOP_POINTS.length;
        onSelectPoint(HERITAGE_STOP_POINTS[nextIdx].id);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlayingAutoTour, activePointId, activeUsshPointId, pointDataset, onSelectPoint, onSelectUsshPoint]);

  // Reset to full world view
  const handleResetWorld = () => {
    const map = mapInstanceRef.current;
    if (map) {
      if (pointDataset === 'USSH_61') {
        const allCoords: [number, number][] = USSH_61_GPS_POINTS.map((p) => [p.coords.lat, p.coords.lng]);
        map.fitBounds(L.latLngBounds(allCoords), { padding: [35, 35], maxZoom: 3 });
      } else {
        const allCoords: [number, number][] = Object.values(STOP_GPS_MAP);
        map.fitBounds(L.latLngBounds(allCoords), { padding: [35, 35], maxZoom: 3 });
      }
    }
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#E5D3B2] shadow-inner bg-slate-900 flex flex-col">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Toolbar Top-Left: Tinh gọn, mỏng nhẹ, không che khuất popup */}
      <div className="absolute top-2.5 left-2.5 z-[400] flex flex-wrap items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-lg text-[10.5px]">
        <button
          type="button"
          onClick={() => setMapType('STREET')}
          className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
            mapType === 'STREET'
              ? 'bg-[#751D2C] text-white shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Bản đồ đường phố toàn cầu OpenStreetMap"
        >
          <Layers className="w-3 h-3" />
          <span>Bản Đồ Thế Giới (OSM)</span>
        </button>

        <button
          type="button"
          onClick={() => setMapType('SATELLITE')}
          className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
            mapType === 'SATELLITE'
              ? 'bg-[#751D2C] text-white shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Ảnh vệ tinh Trái Đất Esri World Imagery"
        >
          <Compass className="w-3 h-3 text-blue-500" />
          <span>Ảnh Vệ Tinh</span>
        </button>

        <button
          type="button"
          onClick={handleResetWorld}
          className="px-2 py-0.5 rounded-lg font-bold text-slate-700 hover:bg-slate-100 border-l border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
          title="Toàn cảnh thế giới"
        >
          <RotateCcw className="w-3 h-3 text-amber-700" />
          <span className="hidden sm:inline">Toàn Cảnh</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPlayingAutoTour(!isPlayingAutoTour)}
          className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 border-l border-slate-200 ${
            isPlayingAutoTour
              ? 'bg-rose-700 text-white animate-pulse shadow-2xs'
              : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
          }`}
          title="Tự động du khảo qua các tọa độ toàn cầu"
        >
          {isPlayingAutoTour ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
          <span>{isPlayingAutoTour ? 'Dừng' : 'Tự động chạy'}</span>
        </button>
      </div>

      {/* Floating Badge Bottom-Right */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 text-xs text-slate-700">
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="font-bold text-[#751D2C] text-[11px]">
          1911 – 1941 · 3 Đại dương, 4 Châu lục, Gần 30 Quốc gia
        </span>
      </div>

      <style>{`
        @keyframes hcmWorldPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
