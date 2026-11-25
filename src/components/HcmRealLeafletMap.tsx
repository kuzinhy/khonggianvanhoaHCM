import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Navigation, Compass, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { type ThuDauMotMapPoint } from '../data/hcmDynamicMapData';

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

  const [mapType, setMapType] = useState<'STREET' | 'SATELLITE'>('STREET');

  // Center of Thu Dau Mot Ward
  const CENTER_TDM: [number, number] = [10.9805, 106.6540];

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: CENTER_TDM,
      zoom: 15,
      minZoom: 13,
      maxZoom: 19,
      zoomControl: false,
    });

    // Add initial Street tile
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    activeTileLayerRef.current = streetLayer;

    // Custom Zoom Control at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Switch Map Type (Street vs Satellite)
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
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }
      ).addTo(map);
    } else {
      activeTileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      ).addTo(map);
    }
  }, [mapType]);

  // 3. Render / Update 12 Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    points.forEach((pt) => {
      if (!pt.lat || !pt.lng) return;

      const isActive = pt.id === activePointId;

      const bgColor =
        pt.category === 'DI_TICH_LICH_SU'
          ? '#DC2626'
          : pt.category === 'KHONG_GIAN_HCM'
          ? '#D97706'
          : '#4F46E5';

      const iconHtml = `
        <div class="hcm-real-marker-wrapper ${isActive ? 'is-active' : ''}" style="position: relative; display: flex; align-items: center; justify-content: center;">
          ${
            isActive
              ? `<div style="position: absolute; width: 42px; height: 42px; border-radius: 50%; background: ${bgColor}; opacity: 0.35; animation: hcmPulse 1.4s infinite ease-out;"></div>`
              : ''
          }
          <div style="
            width: ${isActive ? '34px' : '28px'};
            height: ${isActive ? '34px' : '28px'};
            background: ${bgColor};
            border: 2.5px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: ${isActive ? '11px' : '9.5px'};
            font-weight: 900;
            cursor: pointer;
            transition: transform 0.25s ease;
          ">
            ${pt.code.replace('HC-', 'H').replace('KG-', 'K').replace('DT-', 'D').replace('TD-', 'T')}
          </div>
          <div style="
            position: absolute;
            bottom: -5px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid ${bgColor};
          "></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'hcm-custom-div-icon',
        html: iconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 32],
        popupAnchor: [0, -30],
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon }).addTo(map);

      // Popup content
      const popupHtml = `
        <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 2px; width: 220px; line-height: 1.4;">
          <div style="font-size: 10px; font-weight: 800; color: ${bgColor}; text-transform: uppercase; margin-bottom: 2px;">
            ${pt.khuPho} · ${pt.code}
          </div>
          <h4 style="font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 4px 0; line-height: 1.3;">
            ${pt.name}
          </h4>
          <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">
            📍 ${pt.address}
          </p>
          <div style="font-size: 10.5px; color: #334155; margin-bottom: 8px; font-style: italic;">
            ${pt.summary.slice(0, 95)}...
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              pt.googleMapsQuery
            )}" target="_blank" style="
              flex: 1;
              background: #751D2C;
              color: #ffffff;
              padding: 4px 8px;
              border-radius: 8px;
              font-size: 10.5px;
              font-weight: 700;
              text-align: center;
              text-decoration: none;
            ">
              Google Maps
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectPoint(pt.id);
      });

      markersRef.current[pt.id] = marker;
    });
  }, [points, activePointId, onSelectPoint]);

  // 4. Fly to Active Point when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activePointId) return;

    const currentPt = points.find((p) => p.id === activePointId);
    if (currentPt && currentPt.lat && currentPt.lng) {
      map.flyTo([currentPt.lat, currentPt.lng], 16.5, {
        duration: 0.9,
        easeLinearity: 0.25,
      });

      // Open popup for active point
      setTimeout(() => {
        const activeMarker = markersRef.current[activePointId];
        if (activeMarker) {
          activeMarker.openPopup();
        }
      }, 500);
    }
  }, [activePointId, points]);

  // Reset to full ward view
  const handleResetCenter = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(CENTER_TDM, 15, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#E5D3B2] shadow-inner bg-slate-100 flex flex-col">
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Control Overlay - Layer Switcher & Reset Center */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-lg">
        <button
          type="button"
          onClick={() => setMapType('STREET')}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
            mapType === 'STREET'
              ? 'bg-[#751D2C] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Chế độ bản đồ đường phố OpenStreetMap"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Đường phố (OSM)</span>
        </button>

        <button
          type="button"
          onClick={() => setMapType('SATELLITE')}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
            mapType === 'SATELLITE'
              ? 'bg-[#751D2C] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Chế độ ảnh vệ tinh thực tế Esri World Imagery"
        >
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span>Ảnh Vệ Tinh</span>
        </button>

        <button
          type="button"
          onClick={handleResetCenter}
          className="px-2 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border-l border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
          title="Về trung tâm Phường Thủ Dầu Một"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-700" />
          <span className="hidden sm:inline">Về trung tâm</span>
        </button>
      </div>

      {/* Floating Badge: Real Map Status & Slogan */}
      <div className="absolute bottom-3 right-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 text-xs font-medium text-slate-700">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-[#751D2C] text-[11px]">Bản đồ Địa lý Thật · Thủ Dầu Một</span>
      </div>

      {/* Keyframe style for pulse */}
      <style>{`
        @keyframes hcmPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25) !important;
          border: 1px solid rgba(197, 154, 85, 0.4) !important;
        }
        .leaflet-popup-tip {
          background: #ffffff !important;
        }
      `}</style>
    </div>
  );
};
