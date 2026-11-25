import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass,
  Play,
  Pause,
  RotateCcw,
  Globe,
  MapPin,
  Flag,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  JOURNEY_10_STAGES,
  HERITAGE_STOP_POINTS,
  USSH_61_GPS_POINTS,
  type JourneyStage,
  type HeritageStopPoint,
  type UsshPoint,
} from '../data/hcmHeritageMapData';
import {
  OFFICIAL_VIETNAM_ISLANDS,
  type SovereigntyIsland,
} from '../data/geo/vietnamIslandsSovereignty';
import {
  CONTROLLED_MAP_LABELS,
  type MapLabelItem,
} from '../data/geo/worldHeritageLabels';
import ne110mLand from '../data/geo/ne_110m_land.json';
import vietnamProvinces from '../data/geo/vietnamProvinces.json';

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
  const geojsonLandLayerRef = useRef<L.GeoJSON | null>(null);
  const geojsonVnLayerRef = useRef<L.GeoJSON | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const polylineRef = useRef<L.Polyline | null>(null);
  const labelsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const islandsLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [mapTheme, setMapTheme] = useState<'HERITAGE' | 'FOCUS'>('HERITAGE');
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState(false);
  const [activeIslandModal, setActiveIslandModal] = useState<SovereigntyIsland | null>(null);

  // Global Center for the World Map (optimally balanced across Europe, Africa, Asia & Vietnam islands)
  const CENTER_WORLD: [number, number] = [20, 56];

  // 1. Initialize Thematic Heritage Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: CENTER_WORLD,
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: false,
      worldCopyJump: false,
      maxBounds: [
        [-70, -180],
        [88, 195],
      ],
      maxBoundsViscosity: 0.8,
    });

    // Custom Zoom control at bottom-left to avoid occluding top toolbars
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    // Render Natural Earth Physical Land Polygons (Public Domain, offline, zero external API)
    const landLayer = L.geoJSON(ne110mLand as any, {
      style: () => ({
        fillColor: mapTheme === 'FOCUS' ? '#FFFFFF' : '#FAF6F0',
        fillOpacity: 1,
        color: '#D1D5DB',
        weight: 1,
      }),
    }).addTo(map);
    geojsonLandLayerRef.current = landLayer;

    // Render Vietnam Territory with highlighted sacred warm gold tone
    const vnLayer = L.geoJSON(vietnamProvinces as any, {
      style: () => ({
        fillColor: '#FEF08A',
        fillOpacity: 0.95,
        color: '#D97706',
        weight: 1.1,
      }),
    }).addTo(map);
    geojsonVnLayerRef.current = vnLayer;

    // Layer groups for controlled labels & sovereignty islands
    const labelsGroup = L.layerGroup().addTo(map);
    labelsLayerGroupRef.current = labelsGroup;

    const islandsGroup = L.layerGroup().addTo(map);
    islandsLayerGroupRef.current = islandsGroup;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Update Theme Styling (Heritage vs Focus)
  useEffect(() => {
    if (geojsonLandLayerRef.current) {
      geojsonLandLayerRef.current.setStyle({
        fillColor: mapTheme === 'FOCUS' ? '#FFFFFF' : '#FAF6F0',
        color: mapTheme === 'FOCUS' ? '#94A3B8' : '#D1D5DB',
      });
    }
  }, [mapTheme]);

  // 3. Render Independent Hoàng Sa & Trường Sa Sovereignty Layer (PERMANENT, NEVER DISAPPEARS)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const islandsGroup = islandsLayerGroupRef.current;
    if (!map || !islandsGroup) return;

    islandsGroup.clearLayers();

    OFFICIAL_VIETNAM_ISLANDS.forEach((island) => {
      const isHoangSa = island.id === 'hoang-sa';
      const badgeBg = isHoangSa ? '#BE123C' : '#9F1239';

      const iconHtml = `
        <div class="hcm-island-sovereignty-node" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
          pointer-events: auto;
        ">
          <!-- Pulse wave for sovereignty affirmation -->
          <div style="
            position: absolute;
            top: 2px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #E11D48;
            opacity: 0.35;
            animation: hcmSovereigntyPulse 2s infinite ease-out;
            pointer-events: none;
          "></div>

          <!-- Prominent White Pill with Crimson Red Vietnamese Label -->
          <div style="
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 4px;
            background: #FFFFFF;
            padding: 2.5px 8px;
            border-radius: 9999px;
            border: 2px solid ${badgeBg};
            box-shadow: 0 4px 14px rgba(190, 18, 60, 0.35), 0 1px 3px rgba(0,0,0,0.15);
            white-space: nowrap;
            transition: transform 0.2s ease;
          ">
            <span style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background: #DC2626;
              color: #FDE047;
              font-size: 8.5px;
              font-weight: 900;
              box-shadow: 0 0 6px #E11D48;
            ">★</span>
            <span style="
              font-family: 'Be Vietnam Pro', system-ui, sans-serif;
              font-size: 11.5px;
              font-weight: 800;
              color: #751D2C;
              letter-spacing: -0.01em;
            ">${island.officialName}</span>
          </div>

          <!-- Sub-badge: Unit name -->
          <div style="
            margin-top: 2px;
            font-family: 'Be Vietnam Pro', system-ui, sans-serif;
            font-size: 9.5px;
            font-weight: 700;
            color: #881337;
            background: rgba(255, 241, 242, 0.95);
            padding: 1px 6px;
            border-radius: 6px;
            border: 1px solid rgba(244, 63, 94, 0.35);
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
            white-space: nowrap;
          ">
            ${isHoangSa ? 'UBND TP. Đà Nẵng' : 'UBND Tỉnh Khánh Hòa'}
          </div>
        </div>
      `;

      const islandIcon = L.divIcon({
        className: 'hcm-sovereignty-island-div-icon',
        html: iconHtml,
        iconSize: [200, 44],
        iconAnchor: [isHoangSa ? 100 : 110, 20],
        popupAnchor: [0, -20],
      });

      const marker = L.marker(island.coords, {
        icon: islandIcon,
        zIndexOffset: 3000, // Highest priority, never occluded
      });

      // Sovereignty Popup compliant with Official Legal Standpoint of Vietnam
      const popupHtml = `
        <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 4px; width: 285px; line-height: 1.45; color: #0F172A;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; padding-bottom: 5px; border-bottom: 1.5px solid #FECDD3;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #BE123C; color: #FEF08A; font-size: 11px; font-weight: 900;">★</span>
            <div>
              <h4 style="font-size: 13.5px; font-weight: 900; color: #881337; margin: 0; line-height: 1.2;">
                ${island.officialName}
              </h4>
              <div style="font-size: 10.5px; color: #64748B; font-weight: 600;">
                ${island.adminUnit}
              </div>
            </div>
          </div>

          <p style="font-size: 11.5px; color: #334155; margin: 0 0 6px 0; line-height: 1.4;">
            ${island.summary}
          </p>

          <div style="background: #FFF1F2; padding: 6px 8px; border-radius: 8px; border-left: 3px solid #BE123C; margin-bottom: 6px;">
            <div style="font-size: 10.5px; font-weight: 800; color: #9F1239; margin-bottom: 2px;">
              LẬP TRƯỜNG CHÍNH THỨC CỦA VIỆT NAM
            </div>
            <div style="font-size: 11px; color: #4C0519; line-height: 1.38;">
              ${island.legalBasis}
            </div>
          </div>

          <div style="font-size: 10.5px; color: #475569; margin-bottom: 6px; line-height: 1.35;">
            <strong>Lịch sử &amp; Chứng cứ:</strong> ${island.historyAndEvidence}
          </div>

          ${
            island.quoteHcm
              ? `<blockquote style="font-style: italic; font-size: 11px; color: #881337; border-left: 2px solid #F59E0B; padding-left: 6px; margin: 6px 0;">
                  “${island.quoteHcm}”
                </blockquote>`
              : ''
          }

          <div style="padding-top: 5px; border-top: 1px dashed #E2E8F0; font-size: 10px; color: #64748B;">
            <strong style="color: #0F172A;">Nguồn chính thức:</strong> Cổng TTĐT Chính phủ (chinhphu.vn) · Bộ Ngoại giao (mofa.gov.vn) · Luật Biển Việt Nam 2012 · UNCLOS 1982.
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 300,
        autoPanPaddingTopLeft: L.point(20, 65),
      });

      marker.on('click', () => {
        setActiveIslandModal(island);
      });

      islandsGroup.addLayer(marker);
    });
  }, []);

  // 4. Render Controlled Latin/Vietnamese Map Labels (Zero Chinese Characters)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const labelsGroup = labelsLayerGroupRef.current;
    if (!map || !labelsGroup) return;

    labelsGroup.clearLayers();

    CONTROLLED_MAP_LABELS.forEach((lbl) => {
      let labelHtml = '';

      if (lbl.type === 'OCEAN') {
        labelHtml = `
          <div style="
            font-family: 'Be Vietnam Pro', system-ui, sans-serif;
            font-size: ${lbl.isImportant ? '13px' : '11px'};
            font-weight: 900;
            color: #0284C7;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            text-shadow: 0 1px 3px rgba(255,255,255,0.9), 0 0 2px #FFFFFF;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
            opacity: 0.85;
          ">
            ${lbl.nameVi}
          </div>
        `;
      } else if (lbl.type === 'COUNTRY') {
        labelHtml = `
          <div style="
            font-family: 'Be Vietnam Pro', system-ui, sans-serif;
            font-size: ${lbl.isImportant ? '12.5px' : '11px'};
            font-weight: 800;
            color: ${lbl.isImportant ? '#881337' : '#334155'};
            letter-spacing: 0.05em;
            text-shadow: 0 1px 2px #FFFFFF, 0 0 4px #FFFFFF;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
          ">
            ${lbl.nameVi}
          </div>
        `;
      } else {
        // CITY
        labelHtml = `
          <div style="
            display: flex;
            align-items: center;
            gap: 3.5px;
            font-family: 'Be Vietnam Pro', system-ui, sans-serif;
            font-size: ${lbl.isImportant ? '11.5px' : '10.5px'};
            font-weight: ${lbl.isImportant ? '800' : '600'};
            color: #0F172A;
            text-shadow: 0 1px 2px #FFFFFF, 0 0 3px #FFFFFF;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
          ">
            <span style="width: 5px; height: 5px; border-radius: 50%; background: ${
              lbl.isImportant ? '#DC2626' : '#475569'
            }; display: inline-block;"></span>
            <span>${lbl.nameVi}</span>
          </div>
        `;
      }

      const icon = L.divIcon({
        className: 'hcm-controlled-label-div-icon',
        html: labelHtml,
        iconSize: [120, 20],
        iconAnchor: [60, 10],
      });

      const marker = L.marker(lbl.coords, {
        icon,
        interactive: false,
        zIndexOffset: lbl.isImportant ? 800 : 500,
      });

      labelsGroup.addLayer(marker);
    });
  }, []);

  // 5. Render Heritage Milestones & Connecting Voyage Polylines
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
      const pointsToRender =
        selectedStageNumber > 0
          ? USSH_61_GPS_POINTS.filter((p) => p.stageNumber === selectedStageNumber)
          : USSH_61_GPS_POINTS;

      const latLngs: [number, number][] = pointsToRender.map((pt) => [
        pt.coords.lat,
        pt.coords.lng,
      ]);

      if (latLngs.length > 1) {
        polylineRef.current = L.polyline(latLngs, {
          color: '#E11D48',
          weight: 3,
          opacity: 0.85,
          dashArray: '6, 5',
          lineCap: 'round',
        }).addTo(map);
      }

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
                ? `<div style="position: absolute; width: 40px; height: 40px; border-radius: 50%; background: #EF4444; opacity: 0.45; animation: hcmWorldPulse 1.4s infinite ease-out;"></div>`
                : ''
            }
            <div style="
              width: ${isSelected ? '27px' : '20px'};
              height: ${isSelected ? '27px' : '20px'};
              background: ${isSelected ? '#BE123C' : '#D97706'};
              border: 2px solid #FFFFFF;
              border-radius: 50%;
              box-shadow: 0 3px 8px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #FFFFFF;
              font-size: ${isSelected ? '10px' : '8.5px'};
              font-weight: 900;
              cursor: pointer;
              transition: all 0.2s ease;
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
              border-top: 4px solid ${isSelected ? '#BE123C' : '#D97706'};
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

        const marker = L.marker(coords, {
          icon: customIcon,
          zIndexOffset: isSelected ? 1500 : 700,
        }).addTo(map);

        const popupHtml = `
          <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 2px; width: 240px; line-height: 1.4;">
            <div style="font-size: 9.5px; font-weight: 800; color: #BE123C; text-transform: uppercase; margin-bottom: 2px;">
              ${pt.stage} · Mốc #${pt.id}
            </div>
            <h4 style="font-size: 12.5px; font-weight: 800; color: #1E293B; margin: 0 0 3px 0;">
              ${pt.place}
            </h4>
            <div style="font-size: 10.5px; color: #475569; margin-bottom: 6px;">
              📍 Kinh độ: ${pt.coords.lng.toFixed(3)}, Vĩ độ: ${pt.coords.lat.toFixed(3)}
            </div>
            <div style="font-size: 11px; color: #334155; line-height: 1.4;">
              ${pt.content.slice(0, 120)}...
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml, {
          maxWidth: 260,
          autoPanPaddingTopLeft: L.point(20, 75),
          autoPanPaddingBottomRight: L.point(20, 50),
        });
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

      const latLngs: [number, number][] = [];
      pointsToRender.forEach((pt) => {
        const coords = STOP_GPS_MAP[pt.id];
        if (coords) latLngs.push(coords);
      });

      if (latLngs.length > 1) {
        polylineRef.current = L.polyline(latLngs, {
          color: '#DC2626',
          weight: 3.5,
          opacity: 0.9,
          dashArray: '8, 6',
          lineCap: 'round',
        }).addTo(map);
      }

      HERITAGE_STOP_POINTS.forEach((pt) => {
        const coords = STOP_GPS_MAP[pt.id];
        if (!coords) return;

        const isSelected = pt.id === activePointId;
        const stageMatch = selectedStageNumber === 0 || pt.stageNumber === selectedStageNumber;
        const stageInfo = JOURNEY_10_STAGES.find((s) => s.stageNumber === pt.stageNumber);
        const markerColor = stageInfo ? stageInfo.color : '#BE123C';

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
              background: ${isSelected ? '#BE123C' : markerColor};
              border: 2px solid #FFFFFF;
              border-radius: 50%;
              box-shadow: 0 4px 10px rgba(0,0,0,0.35);
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
              border-top: 5px solid ${isSelected ? '#BE123C' : markerColor};
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

        const marker = L.marker(coords, {
          icon: customIcon,
          zIndexOffset: isSelected ? 1500 : 700,
        }).addTo(map);

        const popupHtml = `
          <div style="font-family: 'Be Vietnam Pro', system-ui, sans-serif; padding: 3px; width: 235px; line-height: 1.4;">
            <div style="font-size: 10px; font-weight: 800; color: ${markerColor}; text-transform: uppercase; margin-bottom: 2px;">
              Chặng ${pt.stageNumber} · Mốc #${pt.order} (${pt.year})
            </div>
            <h4 style="font-size: 13px; font-weight: 800; color: #1E293B; margin: 0 0 3px 0; line-height: 1.3;">
              ${pt.name}
            </h4>
            <p style="font-size: 11px; color: #475569; margin: 0 0 5px 0;">
              📍 ${pt.location} (${pt.country})
            </p>
            <div style="font-size: 10.5px; color: #881337; font-weight: 700; margin-bottom: 4px;">
              Bí danh: ${pt.alias}
            </div>
            <div style="font-size: 11px; color: #334155; line-height: 1.35;">
              ${pt.events.slice(0, 110)}...
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml, {
          maxWidth: 260,
          autoPanPaddingTopLeft: L.point(20, 75),
          autoPanPaddingBottomRight: L.point(20, 50),
        });
        marker.on('click', () => {
          onSelectPoint(pt.id);
        });

        markersRef.current[pt.id] = marker;
      });
    }
  }, [selectedStageNumber, pointDataset, activePointId, activeUsshPointId]);

  // 6. Fly to active milestone when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (pointDataset === 'USSH_61') {
      const activePt = USSH_61_GPS_POINTS.find((p) => p.id === activeUsshPointId);
      if (activePt) {
        map.flyTo([activePt.coords.lat, activePt.coords.lng], Math.max(map.getZoom(), 4.5), {
          duration: 1.2,
        });
        const marker = markersRef.current[String(activePt.id)];
        if (marker) marker.openPopup();
      }
    } else {
      const coords = STOP_GPS_MAP[activePointId];
      if (coords) {
        map.flyTo(coords, Math.max(map.getZoom(), 4.5), {
          duration: 1.2,
        });
        const marker = markersRef.current[activePointId];
        if (marker) marker.openPopup();
      }
    }
  }, [activePointId, activeUsshPointId, pointDataset]);

  // 7. Auto-play Tour Simulation
  useEffect(() => {
    if (!isPlayingAutoTour) return;

    const timer = setInterval(() => {
      if (pointDataset === 'USSH_61') {
        const curIdx = USSH_61_GPS_POINTS.findIndex((p) => p.id === activeUsshPointId);
        const nextIdx = (curIdx + 1) % USSH_61_GPS_POINTS.length;
        if (onSelectUsshPoint) onSelectUsshPoint(USSH_61_GPS_POINTS[nextIdx].id);
      } else {
        const curIdx = HERITAGE_STOP_POINTS.findIndex((p) => p.id === activePointId);
        const nextIdx = (curIdx + 1) % HERITAGE_STOP_POINTS.length;
        onSelectPoint(HERITAGE_STOP_POINTS[nextIdx].id);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlayingAutoTour, activePointId, activeUsshPointId, pointDataset]);

  // --- 8. VIEWPORT NAVIGATION PRESETS ---
  const handleViewWorld = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(CENTER_WORLD, 2.5, { duration: 1.2 });
    }
  };

  const handleViewVietnamAndIslands = () => {
    const map = mapInstanceRef.current;
    if (map) {
      // Bounds covering S-shaped mainland, Gulf of Tonkin, Gulf of Thailand, Hoang Sa and Truong Sa
      const bounds = L.latLngBounds([
        [6.0, 101.5], // Southernmost point covering Truong Sa and sea border
        [24.5, 119.5], // Northernmost / Easternmost covering Hoang Sa & coastal zone
      ]);
      map.fitBounds(bounds, { padding: [15, 35] });
    }
  };

  const handleViewHoangSa = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([16.5, 112.0], 6.5, { duration: 1.2 });
    }
  };

  const handleViewTruongSa = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([9.8, 114.5], 6.5, { duration: 1.2 });
    }
  };

  const handleViewHeritageJourney = () => {
    const map = mapInstanceRef.current;
    if (map) {
      if (pointDataset === 'USSH_61') {
        const allCoords: [number, number][] = USSH_61_GPS_POINTS.map((p) => [
          p.coords.lat,
          p.coords.lng,
        ]);
        map.fitBounds(L.latLngBounds(allCoords), { padding: [35, 35], maxZoom: 3.5 });
      } else {
        const allCoords: [number, number][] = Object.values(STOP_GPS_MAP);
        map.fitBounds(L.latLngBounds(allCoords), { padding: [35, 35], maxZoom: 3.5 });
      }
    }
  };

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden border border-rose-200/80 shadow-inner flex flex-col"
      style={{ background: '#DCEEFB' }} // Ocean water color: Natural Soft Heritage Sea
    >
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" style={{ background: '#DCEEFB' }} />

      {/* Responsive Unified Top Bar: Auto wrap, zero overlap on any screen width */}
      <div className="absolute top-2 left-2 right-2 z-[400] flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
        {/* Left: Viewport Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-rose-200/80 shadow-md text-[10.5px] pointer-events-auto">
          {/* Nút 1: Toàn thế giới */}
          <button
            type="button"
            onClick={handleViewWorld}
            className="px-2 py-1 rounded-lg font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-800 transition-colors cursor-pointer flex items-center gap-1"
            title="Xem toàn cảnh thế giới"
          >
            <Globe className="w-3 h-3 text-sky-600" />
            <span>Toàn thế giới</span>
          </button>

          {/* Nút 2: Việt Nam & biển đảo */}
          <button
            type="button"
            onClick={handleViewVietnamAndIslands}
            className="px-2.5 py-1 rounded-lg font-black bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-2xs hover:brightness-110 transition-all cursor-pointer flex items-center gap-1"
            title="Bao quát toàn vẹn lãnh thổ Việt Nam và 2 quần đảo Hoàng Sa - Trường Sa"
          >
            <Flag className="w-3 h-3 text-amber-300" />
            <span>Việt Nam &amp; Biển Đảo</span>
          </button>

          {/* Nút 3: Hoàng Sa */}
          <button
            type="button"
            onClick={handleViewHoangSa}
            className="px-2 py-1 rounded-lg font-bold text-rose-800 bg-rose-50/80 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
            title="Phóng đến Quần đảo Hoàng Sa (Đà Nẵng)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            <span>Hoàng Sa</span>
          </button>

          {/* Nút 4: Trường Sa */}
          <button
            type="button"
            onClick={handleViewTruongSa}
            className="px-2 py-1 rounded-lg font-bold text-rose-800 bg-rose-50/80 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
            title="Phóng đến Quần đảo Trường Sa (Khánh Hòa)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            <span>Trường Sa</span>
          </button>

          {/* Nút 5: Hành trình di sản */}
          <button
            type="button"
            onClick={handleViewHeritageJourney}
            className="px-2 py-1 rounded-lg font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-800 transition-colors cursor-pointer flex items-center gap-1 border-l border-slate-200"
            title="Xem trọn vẹn tuyến hải trình bôn ba cứu nước 1911 - 1941"
          >
            <Compass className="w-3 h-3 text-amber-600" />
            <span>Hành trình di sản</span>
          </button>

          {/* Nút 6: Tự động chạy */}
          <button
            type="button"
            onClick={() => setIsPlayingAutoTour(!isPlayingAutoTour)}
            className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 border-l border-slate-200 ${
              isPlayingAutoTour
                ? 'bg-rose-700 text-white animate-pulse shadow-2xs'
                : 'bg-white text-rose-800 hover:bg-rose-50'
            }`}
            title="Tự động du khảo qua các tọa độ toàn cầu"
          >
            {isPlayingAutoTour ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current" />
            )}
            <span>{isPlayingAutoTour ? 'Dừng' : 'Tự động chạy'}</span>
          </button>
        </div>

        {/* Right: Theme Switcher */}
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-rose-200/80 shadow-md text-[10.5px] pointer-events-auto">
          <button
            type="button"
            onClick={() => setMapTheme('HERITAGE')}
            className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
              mapTheme === 'HERITAGE'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-rose-50'
            }`}
            title="Bản đồ chuyên đề di sản tự nhiên (Natural Earth GeoJSON)"
          >
            <Layers className="w-3 h-3" />
            <span>Bản Đồ Di Sản</span>
          </button>
          <button
            type="button"
            onClick={() => setMapTheme('FOCUS')}
            className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
              mapTheme === 'FOCUS'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-rose-50'
            }`}
            title="Tập trung đường hải trình và điểm di sản với độ tương phản cao"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Tập Trung Hành Trình</span>
          </button>
        </div>
      </div>

      {/* Floating Badge Bottom-Right: Chủ quyền & Di sản */}
      <div className="absolute bottom-2.5 right-2.5 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-200/80 shadow-md flex items-center gap-2 text-xs text-slate-700">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
        <span className="font-bold text-rose-900 text-[11px] whitespace-nowrap">
          Biển Đông, Hoàng Sa &amp; Trường Sa là của Việt Nam
        </span>
      </div>

      {/* Floating Source Tag Bottom-Left (hidden on smaller widths to prevent overlap) */}
      <div className="hidden lg:flex absolute bottom-2.5 left-14 z-[400] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200/80 text-[10px] text-slate-600 items-center gap-1.5 select-none">
        <ShieldCheck className="w-3 h-3 text-rose-600 shrink-0" />
        <span className="truncate max-w-[280px]">Bản đồ Di sản · Dữ liệu tự nhiên Natural Earth · UNCLOS 1982</span>
      </div>

      <style>{`
        @keyframes hcmWorldPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes hcmSovereigntyPulse {
          0% { transform: scale(0.7); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
