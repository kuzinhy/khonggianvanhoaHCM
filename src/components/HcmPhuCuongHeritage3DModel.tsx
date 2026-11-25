import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Maximize2,
  Minimize2,
  Sparkles,
  Sun,
  Moon,
  Compass,
  Eye,
  Info,
  Layers,
  Volume2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmPhuCuongHeritage3DModelProps {
  onOpenHeritage3D?: () => void;
  className?: string;
  isCompact?: boolean;
}

interface HotspotInfo {
  id: string;
  title: string;
  subtitle: string;
  position: [number, number, number]; // 3D coordinates in world space
}

const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'arch_veranda',
    title: 'Hành Lang Vòm Cuốn & Gốm Sứ',
    subtitle: 'Kiến trúc vòm cuốn Đông Dương thế kỷ XX, lan can ốp gạch gốm xanh Đất Thủ đặc trưng.',
    position: [0, 1.2, 3.7],
  },
  {
    id: 'tiled_roof',
    title: 'Mái Ngói Âm Dương 2 Tầng',
    subtitle: 'Hệ mái ngói đỏ 2 cấp dốc thoải, đầu đao uốn cong thanh thoát thích ứng khí hậu nhiệt đới.',
    position: [0, 5.0, 0],
  },
  {
    id: 'upper_windows',
    title: 'Cửa Sổ Vòm & Nan Chớp Gỗ',
    subtitle: 'Tầng 2 bố trí 3 vòm cửa lớn với nan hoa gỗ đón gió sông Bạch Đằng và ánh sáng tự nhiên.',
    position: [0, 3.4, 2.7],
  },
  {
    id: 'stone_base',
    title: 'Bậc Tam Cấp & Chân Móng Đá',
    subtitle: 'Nơi tập hợp nhân dân và thanh niên Tiền phong sáng 25/8/1945 giành chính quyền cách mạng.',
    position: [0, 0.4, 4.3],
  },
];

export const HcmPhuCuongHeritage3DModel: React.FC<HcmPhuCuongHeritage3DModelProps> = ({
  onOpenHeritage3D,
  className = '',
  isCompact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation & Rendering state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const requestRef = useRef<number | null>(null);

  // Interaction controls state
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [cameraView, setCameraView] = useState<'ISOMETRIC' | 'FRONT' | 'TOP'>('ISOMETRIC');
  const [isLoaded, setIsLoaded] = useState(false);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 12.5,
    theta: Math.PI / 4, // Horizontal angle (around Y)
    phi: Math.PI / 3.2, // Vertical angle (from zenith)
  });
  const targetRotationYRef = useRef(0);
  const autoRotateSpeedRef = useRef(0.0075);

  // Camera view angle targets
  const applyCameraView = useCallback((view: 'ISOMETRIC' | 'FRONT' | 'TOP') => {
    setCameraView(view);
    if (view === 'ISOMETRIC') {
      sphericalRef.current.phi = Math.PI / 3.4;
      sphericalRef.current.radius = 12.5;
    } else if (view === 'FRONT') {
      sphericalRef.current.phi = Math.PI / 2.3;
      sphericalRef.current.theta = 0;
      sphericalRef.current.radius = 11.0;
    } else if (view === 'TOP') {
      sphericalRef.current.phi = Math.PI / 6.0;
      sphericalRef.current.radius = 14.0;
    }
    updateCameraPosition();
  }, []);

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = sphericalRef.current;
    
    // Convert spherical coordinates to Cartesian
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y + 1.2, z);
    cameraRef.current.lookAt(0, 1.8, 0);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA SETUP
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. PROCEDURAL TEXTURES GENERATION
    // 4.1 Ngói đỏ đất nung texture
    const createRoofCanvas = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#A3331C';
      ctx.fillRect(0, 0, 128, 128);
      // Gân ngói
      ctx.strokeStyle = '#7A2210';
      ctx.lineWidth = 4;
      for (let y = 0; y < 128; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(128, y);
        ctx.stroke();
      }
      ctx.strokeStyle = '#C94B2E';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < 128; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 128);
        ctx.stroke();
      }
      return new THREE.CanvasTexture(c);
    };
    const roofTexture = createRoofCanvas();
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(4, 4);

    // 4.2 Gạch gốm xanh Đất Thủ (lan can)
    const createCeramicCanvas = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#065F46'; // Xanh men ngọc Đất Thủ
      ctx.fillRect(0, 0, 64, 64);
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, 56, 56);
      ctx.fillStyle = '#34D399';
      ctx.beginPath();
      ctx.arc(32, 32, 10, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };
    const ceramicTexture = createCeramicCanvas();
    ceramicTexture.wrapS = THREE.RepeatWrapping;
    ceramicTexture.wrapT = THREE.RepeatWrapping;
    ceramicTexture.repeat.set(8, 2);

    // 4.3 Đá granite chân móng
    const createStoneCanvas = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#374151';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#4B5563';
      for (let i = 0; i < 400; i++) {
        const rx = Math.random() * 128;
        const ry = Math.random() * 128;
        ctx.fillRect(rx, ry, Math.random() * 4, Math.random() * 4);
      }
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 2;
      for (let y = 0; y < 128; y += 32) {
        ctx.strokeRect(0, y, 128, 32);
      }
      return new THREE.CanvasTexture(c);
    };
    const stoneTexture = createStoneCanvas();
    stoneTexture.wrapS = THREE.RepeatWrapping;
    stoneTexture.wrapT = THREE.RepeatWrapping;
    stoneTexture.repeat.set(4, 2);

    // 5. MATERIALS
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xF7E3AF, // Màu vàng kem di sản Nhà Việc Phú Cường
      roughness: 0.75,
      metalness: 0.05,
    });

    const darkWallMaterial = new THREE.MeshStandardMaterial({
      color: 0xE8CA8C,
      roughness: 0.8,
    });

    const roofMaterial = new THREE.MeshStandardMaterial({
      map: roofTexture,
      color: 0xB9381E, // Đỏ ngói nung
      roughness: 0.5,
      metalness: 0.1,
    });

    const stoneMaterial = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.9,
    });

    const ceramicBalustradeMat = new THREE.MeshStandardMaterial({
      map: ceramicTexture,
      roughness: 0.35,
      metalness: 0.25,
    });

    const woodDoorMat = new THREE.MeshStandardMaterial({
      color: 0x451A03, // Gỗ gõ đỏ sậm
      roughness: 0.6,
      metalness: 0.1,
    });

    const windowGlassMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.2,
      metalness: 0.8,
    });

    const goldOrnamentMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      roughness: 0.3,
      metalness: 0.7,
    });

    // 6. BUILD 3D ARCHITECTURAL MODEL (NHÀ VIỆC PHÚ CƯỜNG)
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;

    // --- A. PLINTH & COURTYARD (CHÂN ĐẾ & SÂN LÁT ĐÁ) ---
    const groundGeo = new THREE.CylinderGeometry(6.6, 6.8, 0.3, 36);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1E242B,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.15;
    ground.receiveShadow = true;
    modelGroup.add(ground);

    // Vành cỏ & chậu cây xanh xung quanh
    const lawnGeo = new THREE.RingGeometry(5.2, 6.5, 32);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x14532D,
      roughness: 0.95,
      side: THREE.DoubleSide,
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.rotation.x = -Math.PI / 2;
    lawn.position.y = 0.01;
    lawn.receiveShadow = true;
    modelGroup.add(lawn);

    // Bệ móng đá chính của Nhà Việc Phú Cường (hình khối 2 tầng vuông chữ nhật)
    const plinthGeo = new THREE.BoxGeometry(6.8, 0.45, 5.6);
    const plinth = new THREE.Mesh(plinthGeo, stoneMaterial);
    plinth.position.y = 0.225;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    modelGroup.add(plinth);

    // Bậc tam cấp phía trước
    const stepsGroup = new THREE.Group();
    for (let s = 0; s < 3; s++) {
      const stepGeo = new THREE.BoxGeometry(2.4 - s * 0.2, 0.15, 0.4);
      const step = new THREE.Mesh(stepGeo, stoneMaterial);
      step.position.set(0, 0.075 + s * 0.15, 2.8 + (2 - s) * 0.3);
      step.castShadow = true;
      step.receiveShadow = true;
      stepsGroup.add(step);
    }
    modelGroup.add(stepsGroup);

    // --- B. TẦNG TRỆT (GROUND FLOOR VERANDA ARCADE) ---
    // Khối tường trung tâm phía trong tầng 1
    const core1Geo = new THREE.BoxGeometry(4.8, 1.8, 3.6);
    const core1 = new THREE.Mesh(core1Geo, wallMaterial);
    core1.position.set(0, 1.35, 0);
    core1.castShadow = true;
    core1.receiveShadow = true;
    modelGroup.add(core1);

    // Cửa chính ra vào bằng gỗ ở mặt trước
    const mainDoorGeo = new THREE.BoxGeometry(1.2, 1.4, 0.08);
    const mainDoor = new THREE.Mesh(mainDoorGeo, woodDoorMat);
    mainDoor.position.set(0, 1.15, 1.82);
    modelGroup.add(mainDoor);

    // 2 Cửa sổ tầng trệt hai bên cửa chính
    [-1.6, 1.6].forEach((xPos) => {
      const gWindow = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 1.1, 0.06),
        windowGlassMat
      );
      gWindow.position.set(xPos, 1.3, 1.82);
      modelGroup.add(gWindow);
    });

    // Hệ thống Cột vuông hành lang vòm cuốn (Arcade Pillars)
    const pillarPositions: [number, number, number][] = [
      // Mặt trước (Front)
      [-2.8, 1.35, 2.3],
      [-1.85, 1.35, 2.3],
      [-0.9, 1.35, 2.3],
      [0.9, 1.35, 2.3],
      [1.85, 1.35, 2.3],
      [2.8, 1.35, 2.3],
      // Mặt sau (Back)
      [-2.8, 1.35, -2.3],
      [-1.85, 1.35, -2.3],
      [-0.9, 1.35, -2.3],
      [0.9, 1.35, -2.3],
      [1.85, 1.35, -2.3],
      [2.8, 1.35, -2.3],
      // Hai cạnh bên (Sides)
      [-2.8, 1.35, 0.76],
      [-2.8, 1.35, -0.76],
      [2.8, 1.35, 0.76],
      [2.8, 1.35, -0.76],
    ];

    pillarPositions.forEach(([x, y, z]) => {
      const pillarGeo = new THREE.BoxGeometry(0.32, 1.8, 0.32);
      const pillar = new THREE.Mesh(pillarGeo, wallMaterial);
      pillar.position.set(x, y, z);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      modelGroup.add(pillar);

      // Đầu cột / đôn cột trang trí
      const capGeo = new THREE.BoxGeometry(0.4, 0.08, 0.4);
      const capTop = new THREE.Mesh(capGeo, darkWallMaterial);
      capTop.position.set(x, y + 0.88, z);
      modelGroup.add(capTop);

      const capBottom = new THREE.Mesh(capGeo, darkWallMaterial);
      capBottom.position.set(x, y - 0.88, z);
      modelGroup.add(capBottom);
    });

    // Các nhịp vòm cuốn (Arches) kết nối các đầu cột
    const archGroup = new THREE.Group();
    // Vòm mặt trước
    const frontArchSpans = [
      [-2.32, 2.3],
      [-1.37, 2.3],
      [0, 2.3], // Vòm sảnh chính
      [1.37, 2.3],
      [2.32, 2.3],
    ];
    frontArchSpans.forEach(([xPos, zPos]) => {
      const archBeam = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.22, 0.3),
        wallMaterial
      );
      archBeam.position.set(xPos, 2.22, zPos);
      archBeam.castShadow = true;
      archGroup.add(archBeam);
    });
    modelGroup.add(archGroup);

    // Lan can gốm xanh Đất Thủ dọc hành lang tầng 1
    const balustradeGroup = new THREE.Group();
    const frontBalustrades = [-2.32, -1.37, 1.37, 2.32]; // Chừa lối vào chính giữa
    frontBalustrades.forEach((xPos) => {
      const balustrade = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.45, 0.1),
        ceramicBalustradeMat
      );
      balustrade.position.set(xPos, 0.68, 2.3);
      balustrade.castShadow = true;
      balustradeGroup.add(balustrade);
    });
    // Lan can 2 bên sườn
    [-2.8, 2.8].forEach((xPos) => {
      [1.53, 0, -1.53].forEach((zPos) => {
        const sideBal = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.45, 1.2),
          ceramicBalustradeMat
        );
        sideBal.position.set(xPos, 0.68, zPos);
        balustradeGroup.add(sideBal);
      });
    });
    modelGroup.add(balustradeGroup);

    // --- C. MÁI HIÊN TẦNG 1 (LOWER HI-ROOF / PENT ROOF) ---
    // Khối mái ngói đỏ bao quanh tầng 1
    const lowerRoofGroup = new THREE.Group();
    const lowerRoofSlopeGeo = new THREE.BoxGeometry(6.6, 0.2, 5.4);
    const lowerRoof = new THREE.Mesh(lowerRoofSlopeGeo, roofMaterial);
    lowerRoof.position.set(0, 2.36, 0);
    lowerRoof.castShadow = true;
    lowerRoof.receiveShadow = true;
    lowerRoofGroup.add(lowerRoof);

    // Diềm mái ngói uốn nhẹ
    const eaveGeo = new THREE.BoxGeometry(6.8, 0.08, 5.6);
    const eave = new THREE.Mesh(eaveGeo, goldOrnamentMat);
    eave.position.set(0, 2.27, 0);
    lowerRoofGroup.add(eave);
    modelGroup.add(lowerRoofGroup);

    // --- D. TẦNG 2 (UPPER STOREY & GRAND ARCHED WINDOWS) ---
    // Khối phòng tầng 2
    const floor2Geo = new THREE.BoxGeometry(4.6, 1.5, 3.4);
    const floor2 = new THREE.Mesh(floor2Geo, wallMaterial);
    floor2.position.set(0, 3.2, 0);
    floor2.castShadow = true;
    floor2.receiveShadow = true;
    modelGroup.add(floor2);

    // Helper tạo cửa sổ vòm cuốn bán nguyệt chuẩn xác (Indochina Arched Window)
    const createArchedWindowGeo = (w: number, h: number, d: number) => {
      const shape = new THREE.Shape();
      const r = w / 2;
      const rectH = Math.max(0.1, h - r);
      shape.moveTo(-r, 0);
      shape.lineTo(-r, rectH);
      shape.absarc(0, rectH, r, Math.PI, 0, true);
      shape.lineTo(r, 0);
      shape.lineTo(-r, 0);

      const geo = new THREE.ExtrudeGeometry(shape, {
        steps: 1,
        depth: d,
        bevelEnabled: false,
      });
      geo.center();
      return geo;
    };

    // 03 Cửa sổ vòm lớn mặt trước tầng 2 (Nhà Việc Phú Cường)
    // Cửa vòm trung tâm (Center Grand Arched Window)
    const centerWinGeo = createArchedWindowGeo(1.0, 1.25, 0.08);
    const centerWin = new THREE.Mesh(centerWinGeo, windowGlassMat);
    centerWin.position.set(0, 3.25, 1.72);
    modelGroup.add(centerWin);

    // Phào chỉ vòm đắp nổi quanh cửa sổ giữa (Molded Architrave)
    const centerMouldingGeo = createArchedWindowGeo(1.14, 1.34, 0.05);
    const centerMoulding = new THREE.Mesh(centerMouldingGeo, darkWallMaterial);
    centerMoulding.position.set(0, 3.25, 1.71);
    modelGroup.add(centerMoulding);

    // 2 Cửa sổ vòm hai bên (Side Arched Windows)
    [-1.4, 1.4].forEach((xPos) => {
      const sideWinGeo = createArchedWindowGeo(0.72, 1.05, 0.08);
      const sideWin = new THREE.Mesh(sideWinGeo, windowGlassMat);
      sideWin.position.set(xPos, 3.25, 1.72);
      modelGroup.add(sideWin);

      const sideMouldingGeo = createArchedWindowGeo(0.84, 1.13, 0.05);
      const sideMoulding = new THREE.Mesh(sideMouldingGeo, darkWallMaterial);
      sideMoulding.position.set(xPos, 3.25, 1.71);
      modelGroup.add(sideMoulding);
    });

    // Cửa sổ các mặt bên tầng 2
    [-2.32, 2.32].forEach((xPos) => {
      [-0.7, 0.7].forEach((zPos) => {
        const sideWindow = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.75, 0.65),
          windowGlassMat
        );
        sideWindow.position.set(xPos, 3.2, zPos);
        modelGroup.add(sideWindow);
      });
    });

    // --- E. MÁI CHÍNH TẦNG 2 (MAIN INDOCHINA ROOF PYRAMID/HIPPED) ---
    // Khối mái dốc 4 phía
    const roofMainGeo = new THREE.ConeGeometry(3.6, 1.25, 4);
    const roofMain = new THREE.Mesh(roofMainGeo, roofMaterial);
    roofMain.position.set(0, 4.58, 0);
    roofMain.rotation.y = Math.PI / 4;
    roofMain.scale.set(1.15, 1, 0.95);
    roofMain.castShadow = true;
    roofMain.receiveShadow = true;
    modelGroup.add(roofMain);

    // Đỉnh nóc tháp nhọn (ornamental apex pinnacle)
    const pinnacleGeo = new THREE.ConeGeometry(0.2, 0.6, 8);
    const pinnacle = new THREE.Mesh(pinnacleGeo, goldOrnamentMat);
    pinnacle.position.set(0, 5.45, 0);
    pinnacle.castShadow = true;
    modelGroup.add(pinnacle);

    // Quả cầu vàng dưới tháp đỉnh
    const spherePinnacle = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 16, 16),
      goldOrnamentMat
    );
    spherePinnacle.position.set(0, 5.18, 0);
    modelGroup.add(spherePinnacle);

    // Bờ nóc & sống mái ngói nổi bật
    const ridgeGroup = new THREE.Group();
    const ridgeMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      roughness: 0.4,
    });
    for (let r = 0; r < 4; r++) {
      const angle = (r * Math.PI) / 2 + Math.PI / 4;
      const ridgeBeam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.05, 2.3, 6),
        ridgeMat
      );
      ridgeBeam.position.set(
        Math.cos(angle) * 1.3,
        4.6,
        Math.sin(angle) * 1.3
      );
      ridgeBeam.rotation.y = -angle;
      ridgeBeam.rotation.z = 0.62;
      ridgeGroup.add(ridgeBeam);
    }
    modelGroup.add(ridgeGroup);

    // --- F. CẢNH QUAN XUNG QUANH (CÂY HOA SỨ & BIA CHỨNG TÍCH) ---
    // Cây hoa sứ cổ thụ bên hông (như trong ảnh thực tế người dùng gửi)
    const treeGroup = new THREE.Group();
    // Thân cây cong uốn lượn
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x4B382A,
      roughness: 0.9,
    });
    const trunk1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.6, 8), trunkMat);
    trunk1.position.set(-4.4, 0.8, 2.2);
    trunk1.rotation.z = -0.25;
    trunk1.castShadow = true;
    treeGroup.add(trunk1);

    const trunk2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 1.2, 8), trunkMat);
    trunk2.position.set(-4.1, 1.8, 2.1);
    trunk2.rotation.z = 0.35;
    trunk2.castShadow = true;
    treeGroup.add(trunk2);

    // Tán lá xanh hoa sứ
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.8,
    });
    const foliage1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 1), foliageMat);
    foliage1.position.set(-4.2, 2.5, 2.0);
    foliage1.castShadow = true;
    treeGroup.add(foliage1);

    const foliage2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.65, 1), foliageMat);
    foliage2.position.set(-3.6, 2.2, 1.6);
    foliage2.castShadow = true;
    treeGroup.add(foliage2);

    modelGroup.add(treeGroup);

    // Cột cờ Tổ quốc trang trọng bên sảnh
    const flagpoleGroup = new THREE.Group();
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.04, 3.8, 8),
      goldOrnamentMat
    );
    pole.position.set(4.2, 1.9, 2.4);
    pole.castShadow = true;
    flagpoleGroup.add(pole);

    // Lá cờ đỏ sao vàng
    const flagGeo = new THREE.PlaneGeometry(0.8, 0.52);
    const flagMat = new THREE.MeshStandardMaterial({
      color: 0xDC2626, // Đỏ cờ
      side: THREE.DoubleSide,
    });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(4.65, 3.5, 2.4);
    flagpoleGroup.add(flag);

    // Ngôi sao vàng trên cờ
    const starGeo = new THREE.CircleGeometry(0.12, 5);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xFBBF24 });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(4.65, 3.5, 2.405);
    flagpoleGroup.add(star);
    modelGroup.add(flagpoleGroup);

    scene.add(modelGroup);

    // 7. LIGHTING SETUP
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xFFF7ED, 0.85);
    scene.add(ambientLight);

    // Main sunlight (Directional)
    const dirLight = new THREE.DirectionalLight(0xFFFBEB, 1.7);
    dirLight.position.set(8, 14, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.camera.left = -7;
    dirLight.shadow.camera.right = 7;
    dirLight.shadow.camera.top = 7;
    dirLight.shadow.camera.bottom = -7;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Fill light từ phía đối diện
    const fillLight = new THREE.DirectionalLight(0x93C5FD, 0.5);
    fillLight.position.set(-8, 6, -8);
    scene.add(fillLight);

    // Ground bounce light
    const hemiLight = new THREE.HemisphereLight(0xFEF3C7, 0x1E293B, 0.6);
    scene.add(hemiLight);

    // Architectural Night Uplights (điểm sáng hắt ban đêm)
    const nightSpotGroup = new THREE.Group();
    const spotColors = [0xF59E0B, 0xFEF08A, 0xF59E0B];
    [-2.2, 0, 2.2].forEach((xPos, idx) => {
      const spot = new THREE.SpotLight(spotColors[idx], 0, 8, Math.PI / 4, 0.5, 1);
      spot.position.set(xPos, 0.3, 3.2);
      spot.target.position.set(xPos, 2.0, 2.0);
      scene.add(spot.target);
      nightSpotGroup.add(spot);
    });
    scene.add(nightSpotGroup);

    setIsLoaded(true);

    // 8. RENDER & AUTO-ROTATION LOOP
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Auto-rotation around Y axis
      if (isAutoRotating && !isDraggingRef.current && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += autoRotateSpeedRef.current;
        targetRotationYRef.current = modelGroupRef.current.rotation.y;
      }

      // Smooth camera position
      updateCameraPosition();

      // Adjust night mode lights
      if (isNightMode) {
        ambientLight.intensity = 0.25;
        dirLight.intensity = 0.35;
        nightSpotGroup.children.forEach((c) => {
          if (c instanceof THREE.SpotLight) c.intensity = 2.8;
        });
      } else {
        ambientLight.intensity = 0.85;
        dirLight.intensity = 1.7;
        nightSpotGroup.children.forEach((c) => {
          if (c instanceof THREE.SpotLight) c.intensity = 0;
        });
      }

      renderer.render(scene, camera);
    };

    requestRef.current = requestAnimationFrame(animate);

    // 9. RESIZE HANDLER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      renderer.dispose();
    };
  }, [isAutoRotating, isNightMode]);

  // 10. MOUSE & TOUCH ORBIT INTERACTION HANDLERS
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;

    const deltaX = clientX - previousMousePositionRef.current.x;
    const deltaY = clientY - previousMousePositionRef.current.y;

    // Rotate horizontal (theta)
    sphericalRef.current.theta -= deltaX * 0.007;

    // Pitch vertical (phi, clamped between 15° and 85° to prevent flipping)
    sphericalRef.current.phi = Math.max(
      0.25,
      Math.min(Math.PI / 2.05, sphericalRef.current.phi - deltaY * 0.006)
    );

    previousMousePositionRef.current = { x: clientX, y: clientY };
    updateCameraPosition();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    sphericalRef.current.radius = Math.max(
      7.5,
      Math.min(18.0, sphericalRef.current.radius + e.deltaY * 0.01)
    );
    updateCameraPosition();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden select-none bg-gradient-to-b from-[#0F172A] via-[#1E1119] to-[#090D16] border border-amber-400/40 shadow-2xl group ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
      />

      {/* Top Floating Badge: Thông tin công trình 3D Realtime */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-bold shadow-lg">
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>Mô Hình 3D Nhà Việc Phú Cường</span>
        </div>
        <span className="text-[10px] text-slate-300 font-medium px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm self-start">
          Kéo chuột để xoay 360° · Cuộn để phóng to/thu nhỏ
        </span>
      </div>

      {/* Top Right Controls: Tự xoay, Chế độ Ngày/Đêm, Góc nhìn */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        {/* Toggle Auto-Rotate */}
        <button
          type="button"
          onClick={() => {
            hcmSfx.playClick(600);
            setIsAutoRotating((prev) => !prev);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all cursor-pointer shadow-md ${
            isAutoRotating
              ? 'bg-amber-400 text-slate-950 border-amber-300'
              : 'bg-slate-900/80 text-slate-200 border-white/20 hover:bg-slate-800'
          }`}
          title={isAutoRotating ? 'Tạm dừng xoay tròn' : 'Bật tự xoay tròn 360°'}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* Toggle Night / Day Lighting */}
        <button
          type="button"
          onClick={() => {
            hcmSfx.playClick(700);
            setIsNightMode((prev) => !prev);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all cursor-pointer shadow-md ${
            isNightMode
              ? 'bg-indigo-600 text-amber-200 border-indigo-400'
              : 'bg-slate-900/80 text-amber-300 border-white/20 hover:bg-slate-800'
          }`}
          title={isNightMode ? 'Chuyển sang ánh sáng ban ngày' : 'Bật đèn kiến trúc ban đêm'}
        >
          {isNightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>

        {/* Fullscreen / Open detailed VR tour */}
        {onOpenHeritage3D && (
          <button
            type="button"
            onClick={() => {
              hcmSfx.playClick(900);
              onOpenHeritage3D();
            }}
            className="p-2 rounded-xl bg-gradient-to-r from-rose-700 to-amber-600 text-white border border-rose-400/60 text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center gap-1"
            title="Mở toàn màn hình tham quan 3D VR"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Preset Camera Views: Phối Cảnh, Chính Diện, Từ Trên Xuống */}
      <div className="absolute left-3 bottom-14 flex items-center gap-1.5 z-10">
        {[
          { key: 'ISOMETRIC' as const, label: '3/4 Phối Cảnh' },
          { key: 'FRONT' as const, label: 'Chính Diện' },
          { key: 'TOP' as const, label: 'Mái & Đỉnh' },
        ].map((view) => (
          <button
            key={view.key}
            type="button"
            onClick={() => {
              hcmSfx.playClick(550);
              applyCameraView(view.key);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md border transition-all cursor-pointer ${
              cameraView === view.key
                ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                : 'bg-slate-950/70 text-slate-300 border-white/15 hover:bg-slate-800'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Bottom Bar: Điểm nhấn di tích & Nút Khám Phá */}
      <div className="absolute bottom-2.5 left-3 right-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-bold text-amber-300 block truncate">
              Di Tích Lịch Sử Nhà Việc Phú Cường
            </span>
            <span className="text-[10px] text-slate-300 block truncate">
              Phục dựng 3D chuẩn xác kiến trúc Đông Dương 1945 ven sông Sài Gòn
            </span>
          </div>
        </div>

        {onOpenHeritage3D && (
          <button
            type="button"
            onClick={() => {
              hcmSfx.playClick(900);
              onOpenHeritage3D();
            }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-600 hover:brightness-110 text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-all shadow-md"
          >
            <span>Vào 3D VR</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Loading state indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 text-white z-20">
          <RotateCw className="w-6 h-6 text-amber-400 animate-spin" />
          <span className="text-xs font-bold text-amber-200">Đang khởi tạo không gian 3D WebGL...</span>
        </div>
      )}
    </div>
  );
};
