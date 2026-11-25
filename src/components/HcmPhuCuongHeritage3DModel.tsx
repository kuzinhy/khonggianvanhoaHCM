import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Maximize2,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
} from 'lucide-react';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmPhuCuongHeritage3DModelProps {
  onOpenHeritage3D?: () => void;
  className?: string;
  isCompact?: boolean;
}

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

  // Controls state
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const [cameraView, setCameraView] = useState<'ISOMETRIC' | 'FRONT' | 'TOP'>('ISOMETRIC');
  const [isLoaded, setIsLoaded] = useState(false);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 13.6,
    theta: Math.PI / 4.2, // Horizontal angle (around Y)
    phi: Math.PI / 3.1, // Vertical angle (from zenith)
  });
  
  // Tốc độ tự xoay: Giảm 50% theo yêu cầu (từ 0.0075 xuống 0.00375) để chuyển động cực kỳ êm dịu, trang nghiêm
  const autoRotateSpeedRef = useRef(0.00375);

  const applyCameraView = useCallback((view: 'ISOMETRIC' | 'FRONT' | 'TOP') => {
    setCameraView(view);
    if (view === 'ISOMETRIC') {
      sphericalRef.current.phi = Math.PI / 3.1;
      sphericalRef.current.theta = Math.PI / 4.2;
      sphericalRef.current.radius = 13.6;
    } else if (view === 'FRONT') {
      sphericalRef.current.phi = Math.PI / 2.25;
      sphericalRef.current.theta = 0;
      sphericalRef.current.radius = 12.2;
      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.y = 0;
      }
    } else if (view === 'TOP') {
      sphericalRef.current.phi = Math.PI / 5.5;
      sphericalRef.current.radius = 14.8;
    }
    updateCameraPosition();
  }, []);

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = sphericalRef.current;

    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y + 1.45, z);
    cameraRef.current.lookAt(0, 2.1, 0);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. CAMERA SETUP
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 360;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
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
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. PROCEDURAL TEXTURES (VẬT LIỆU CHUẨN THỰC ĐỊA NHÀ TRUYỀN THỐNG ĐẤT THỦ)
    // 4.1 Bảng hiệu "NHÀ TRUYỀN THỐNG THÀNH PHỐ THỦ DẦU MỘT"
    const createSignboardTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 128;
      const ctx = c.getContext('2d')!;
      // Nền trắng ngà
      ctx.fillStyle = '#FFFDF7';
      ctx.fillRect(0, 0, 512, 128);
      // Viền kép chỉ vàng đồng
      ctx.strokeStyle = '#B45309';
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, 500, 116);
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, 488, 104);
      // Chữ "NHÀ TRUYỀN THỐNG" màu vàng đồng đậm có bóng đổ
      ctx.fillStyle = '#92400E';
      ctx.font = 'bold 42px "Times New Roman", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NHÀ TRUYỀN THỐNG', 256, 48);
      // Dòng phụ "THÀNH PHỐ THỦ DẦU MỘT"
      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 22px "Segoe UI", sans-serif';
      ctx.fillText('THÀNH PHỐ THỦ DẦU MỘT', 256, 92);
      return new THREE.CanvasTexture(c);
    };
    const signboardTexture = createSignboardTexture();

    // 4.2 Mái ngói đỏ nung âm dương (Terracotta Roof Tile)
    const createRoofTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#B43E23'; // Đỏ cam đất nung cổ kính
      ctx.fillRect(0, 0, 256, 256);
      // Gân ngói máng âm dương
      for (let y = 0; y < 256; y += 16) {
        ctx.fillStyle = '#8C2B14';
        ctx.fillRect(0, y, 256, 4);
        ctx.fillStyle = '#CD5536';
        ctx.fillRect(0, y + 4, 256, 3);
      }
      for (let x = 0; x < 256; x += 16) {
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(x, 0, 2, 256);
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(x + 2, 0, 1.5, 256);
      }
      return new THREE.CanvasTexture(c);
    };
    const roofTexture = createRoofTexture();
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(6, 6);

    // 4.3 Nan chớp gỗ nâu sẫm (Wooden Louvers for Side Windows)
    const createLouverTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 128;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#451A03';
      ctx.fillRect(0, 0, 64, 128);
      for (let y = 0; y < 128; y += 8) {
        ctx.fillStyle = '#290D01';
        ctx.fillRect(0, y, 64, 2);
        ctx.fillStyle = '#5A2609';
        ctx.fillRect(0, y + 2, 64, 4);
      }
      return new THREE.CanvasTexture(c);
    };
    const louverTexture = createLouverTexture();

    // 4.4 Hoa văn gốm xanh men ngọc Đất Thủ (Ceramic Balustrades)
    const createCeramicTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#065F46'; // Xanh ngọc lục
      ctx.fillRect(0, 0, 64, 64);
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 4, 56, 56);
      ctx.fillStyle = '#34D399';
      ctx.beginPath();
      ctx.arc(32, 32, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#064E3B';
      ctx.lineWidth = 2;
      ctx.stroke();
      return new THREE.CanvasTexture(c);
    };
    const ceramicTexture = createCeramicTexture();
    ceramicTexture.wrapS = THREE.RepeatWrapping;
    ceramicTexture.wrapT = THREE.RepeatWrapping;
    ceramicTexture.repeat.set(8, 2);

    // 4.5 Đá Granite chân móng chẻ xám
    const createStoneTexture = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#374151';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#4B5563';
      for (let i = 0; i < 500; i++) {
        ctx.fillRect(Math.random() * 128, Math.random() * 128, Math.random() * 3 + 1, Math.random() * 3 + 1);
      }
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 2;
      for (let y = 0; y < 128; y += 32) {
        ctx.strokeRect(0, y, 128, 32);
      }
      return new THREE.CanvasTexture(c);
    };
    const stoneTexture = createStoneTexture();
    stoneTexture.wrapS = THREE.RepeatWrapping;
    stoneTexture.wrapT = THREE.RepeatWrapping;
    stoneTexture.repeat.set(4, 2);

    // 5. MATERIALS
    // Màu vàng hoàng yến / kem di sản Pháp - Đông Dương tươi sáng
    const wallOchreMat = new THREE.MeshStandardMaterial({
      color: 0xFDE68A, // Vàng kem tươi sáng, rực rỡ dưới nắng
      roughness: 0.65,
      metalness: 0.04,
    });

    const wallTrimMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B, // Phào chỉ đắp nổi vàng đồng ấm
      roughness: 0.62,
      metalness: 0.08,
    });

    const roofMat = new THREE.MeshStandardMaterial({
      map: roofTexture,
      color: 0xC94024, // Ngói đỏ tươi sáng ấm áp
      roughness: 0.42,
      metalness: 0.06,
    });

    const corbelWoodMat = new THREE.MeshStandardMaterial({
      color: 0x3E1805, // Gỗ gụ sẫm cho con sơn đỡ mái
      roughness: 0.55,
      metalness: 0.1,
    });

    const ceramicBalustradeMat = new THREE.MeshStandardMaterial({
      map: ceramicTexture,
      roughness: 0.35,
      metalness: 0.25,
    });

    const stoneMat = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.9,
    });

    const doorDarkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x2A1205, // Cửa gỗ 4 cánh màu nâu đen
      roughness: 0.5,
      metalness: 0.1,
    });

    const louverWindowMat = new THREE.MeshStandardMaterial({
      map: louverTexture,
      roughness: 0.55,
      metalness: 0.1,
    });

    const glassWindowMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.15,
      metalness: 0.85,
    });

    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      roughness: 0.35,
      metalness: 0.65,
    });

    // 6. BUILD 3D ARCHITECTURAL MODEL (NHÀ TRUYỀN THỐNG THÀNH PHỐ THỦ DẦU MỘT)
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;

    // Helper tạo khối cửa sổ vòm cuốn hình bán nguyệt chuẩn (Extruded Arch Window)
    const createArchedShapeGeo = (w: number, h: number, depth: number) => {
      const shape = new THREE.Shape();
      const r = w / 2;
      const rectH = Math.max(0.05, h - r);
      shape.moveTo(-r, 0);
      shape.lineTo(-r, rectH);
      shape.absarc(0, rectH, r, Math.PI, 0, true);
      shape.lineTo(r, 0);
      shape.lineTo(-r, 0);

      const geo = new THREE.ExtrudeGeometry(shape, {
        steps: 1,
        depth,
        bevelEnabled: false,
      });
      geo.center();
      return geo;
    };

    // --- A. CHÂN MÓNG ĐÁ & SÂN QUẢNG TRƯỜNG ---
    const groundGeo = new THREE.CylinderGeometry(7.0, 7.2, 0.3, 40);
    const ground = new THREE.Mesh(
      groundGeo,
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
    );
    ground.position.y = -0.15;
    ground.receiveShadow = true;
    modelGroup.add(ground);

    // Bồn cây & hàng rào hoa quanh chân móng (Xanh lá tươi sáng)
    const lawnGeo = new THREE.RingGeometry(5.4, 6.9, 36);
    const lawn = new THREE.Mesh(
      lawnGeo,
      new THREE.MeshStandardMaterial({ color: 0x16A34A, roughness: 0.85, side: THREE.DoubleSide })
    );
    lawn.rotation.x = -Math.PI / 2;
    lawn.position.y = 0.01;
    lawn.receiveShadow = true;
    modelGroup.add(lawn);

    // Chân bệ móng đá khối chính của Nhà Việc Phú Cường
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(6.9, 0.45, 5.7), stoneMat);
    plinth.position.y = 0.225;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    modelGroup.add(plinth);

    // Bậc tam cấp bằng đá xám rộng phía trước (Front Steps)
    for (let s = 0; s < 4; s++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(2.6 - s * 0.15, 0.12, 0.45),
        stoneMat
      );
      step.position.set(0, 0.06 + s * 0.12, 2.85 + (3 - s) * 0.28);
      step.castShadow = true;
      step.receiveShadow = true;
      modelGroup.add(step);
    }

    // --- B. TẦNG TRỆT: HÀNH LANG VÒM CUỐN & 5 NHỊP VÒM MẶT TIỀN ---
    // Khối tường bên trong tầng 1
    const core1 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.85, 3.6), wallOchreMat);
    core1.position.set(0, 1.38, 0);
    core1.castShadow = true;
    core1.receiveShadow = true;
    modelGroup.add(core1);

    // Cửa chính 4 cánh gỗ nâu sậm ở giữa (Double Folding Doors)
    const mainDoor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.5, 0.08), doorDarkWoodMat);
    mainDoor.position.set(0, 1.2, 1.82);
    modelGroup.add(mainDoor);

    // 2 Cửa sổ tầng trệt hai bên
    [-1.6, 1.6].forEach((xPos) => {
      const gWindow = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.15, 0.06), louverWindowMat);
      gWindow.position.set(xPos, 1.35, 1.82);
      modelGroup.add(gWindow);
    });

    // 16 Cột vuông hành lang vòm cuốn (Arcade Pillars)
    const pillarPositions: [number, number, number][] = [
      // Mặt trước (Front 6 cột tạo 5 nhịp vòm)
      [-2.85, 1.38, 2.35],
      [-1.9, 1.38, 2.35],
      [-0.95, 1.38, 2.35],
      [0.95, 1.38, 2.35],
      [1.9, 1.38, 2.35],
      [2.85, 1.38, 2.35],
      // Mặt sau (Back)
      [-2.85, 1.38, -2.35],
      [-1.9, 1.38, -2.35],
      [-0.95, 1.38, -2.35],
      [0.95, 1.38, -2.35],
      [1.9, 1.38, -2.35],
      [2.85, 1.38, -2.35],
      // Hai bên sườn (Sides)
      [-2.85, 1.38, 0.78],
      [-2.85, 1.38, -0.78],
      [2.85, 1.38, 0.78],
      [2.85, 1.38, -0.78],
    ];

    pillarPositions.forEach(([x, y, z]) => {
      // Thân cột
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.34, 1.85, 0.34), wallOchreMat);
      pillar.position.set(x, y, z);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      modelGroup.add(pillar);

      // Đôn chân cột và đầu cột đắp chỉ nổi
      const capTop = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.42), wallTrimMat);
      capTop.position.set(x, y + 0.9, z);
      modelGroup.add(capTop);

      const capBottom = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 0.42), wallTrimMat);
      capBottom.position.set(x, y - 0.9, z);
      modelGroup.add(capBottom);
    });

    // 5 Nhịp vòm cuốn bán nguyệt mặt trước (Ground Floor Front Arches)
    const archFrontSpans = [-2.375, -1.425, 0, 1.425, 2.375];
    archFrontSpans.forEach((xPos) => {
      // Vòm cong đắp nổi
      const archTop = new THREE.Mesh(
        new THREE.BoxGeometry(xPos === 0 ? 1.6 : 0.85, 0.24, 0.35),
        wallTrimMat
      );
      archTop.position.set(xPos, 2.25, 2.35);
      archTop.castShadow = true;
      modelGroup.add(archTop);

      // Khối đá khóa vòm ở đỉnh (Keystone)
      const keystone = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.38), goldTrimMat);
      keystone.position.set(xPos, 2.26, 2.35);
      modelGroup.add(keystone);
    });

    // Lan can con tiện gốm xanh Đất Thủ (Ground Balustrade)
    [-2.375, -1.425, 1.425, 2.375].forEach((xPos) => {
      const bal = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.1), ceramicBalustradeMat);
      bal.position.set(xPos, 0.68, 2.35);
      bal.castShadow = true;
      modelGroup.add(bal);
    });
    // Lan can 2 bên sườn
    [-2.85, 2.85].forEach((xPos) => {
      [1.56, 0, -1.56].forEach((zPos) => {
        const sideBal = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 1.25), ceramicBalustradeMat);
        sideBal.position.set(xPos, 0.68, zPos);
        sideBal.castShadow = true;
        modelGroup.add(sideBal);
      });
    });

    // --- C. HỆ MÁI HIÊN TẦNG 1 & CON SƠN GỖ (CORBELS) ---
    // Mái ngói đỏ hiên tầng 1
    const lowerRoof = new THREE.Mesh(new THREE.BoxGeometry(6.7, 0.18, 5.5), roofMat);
    lowerRoof.position.set(0, 2.42, 0);
    lowerRoof.castShadow = true;
    lowerRoof.receiveShadow = true;
    modelGroup.add(lowerRoof);

    // Diềm mái vàng
    const lowerEave = new THREE.Mesh(new THREE.BoxGeometry(6.9, 0.08, 5.7), goldTrimMat);
    lowerEave.position.set(0, 2.33, 0);
    modelGroup.add(lowerEave);

    // Hàng Con Sơn Gỗ Đỡ Mái Hiên (Wooden Corbels under lower roof)
    for (let c = -3.2; c <= 3.2; c += 0.45) {
      const corbelFront = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.3), corbelWoodMat);
      corbelFront.position.set(c, 2.26, 2.65);
      corbelFront.castShadow = true;
      modelGroup.add(corbelFront);

      const corbelBack = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.3), corbelWoodMat);
      corbelBack.position.set(c, 2.26, -2.65);
      corbelBack.castShadow = true;
      modelGroup.add(corbelBack);
    }

    // --- D. BẢNG HIỆU DI TÍCH: "NHÀ TRUYỀN THỐNG THÀNH PHỐ THỦ DẦU MỘT" ---
    // Nằm ngay chính diện, phía trên mái hiên tầng 1, dưới chân cửa sổ vòm lớn
    const signboardPlate = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.52, 0.06),
      new THREE.MeshStandardMaterial({
        map: signboardTexture,
        roughness: 0.3,
        metalness: 0.1,
      })
    );
    signboardPlate.position.set(0, 2.76, 2.05);
    signboardPlate.castShadow = true;
    modelGroup.add(signboardPlate);

    // Khung gỗ viền đồng quanh biển hiệu
    const signFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.18, 0.6, 0.04),
      goldTrimMat
    );
    signFrame.position.set(0, 2.76, 2.03);
    modelGroup.add(signFrame);

    // --- E. TẦNG 2: 3 VÒM CỬA SỔ LỚN & PHÀO CHỈ ĐÔNG DƯƠNG ---
    const floor2 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.5, 3.4), wallOchreMat);
    floor2.position.set(0, 3.28, 0);
    floor2.castShadow = true;
    floor2.receiveShadow = true;
    modelGroup.add(floor2);

    // 1. Cửa sổ vòm lớn trung tâm (French Grand Arched Multi-pane Window)
    const centerWinGeo = createArchedShapeGeo(1.05, 1.25, 0.06);
    const centerWin = new THREE.Mesh(centerWinGeo, glassWindowMat);
    centerWin.position.set(0, 3.52, 1.72);
    modelGroup.add(centerWin);

    // Khung phào chỉ vòm đắp nổi quanh cửa sổ giữa
    const centerArchMoulding = new THREE.Mesh(
      createArchedShapeGeo(1.22, 1.35, 0.04),
      wallTrimMat
    );
    centerArchMoulding.position.set(0, 3.52, 1.71);
    modelGroup.add(centerArchMoulding);

    // Nan hoa sắt / ô kính chia nhỏ (Mullions & Sunburst Arch)
    const centerGridMat = new THREE.MeshStandardMaterial({ color: 0xFDE68A, roughness: 0.3 });
    // Thanh nan dọc giữa
    const vertMullion = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.15, 0.07), centerGridMat);
    vertMullion.position.set(0, 3.52, 1.73);
    modelGroup.add(vertMullion);
    // Thanh nan ngang
    [-0.2, 0.15].forEach((yOff) => {
      const horizMullion = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.035, 0.07), centerGridMat);
      horizMullion.position.set(0, 3.35 + yOff, 1.73);
      modelGroup.add(horizMullion);
    });

    // 2. Cửa sổ vòm hai bên (Side Arched Louver Windows)
    [-1.45, 1.45].forEach((xPos) => {
      const sideWinGeo = createArchedShapeGeo(0.76, 1.05, 0.06);
      const sideWin = new THREE.Mesh(sideWinGeo, louverWindowMat);
      sideWin.position.set(xPos, 3.45, 1.72);
      modelGroup.add(sideWin);

      const sideMoulding = new THREE.Mesh(createArchedShapeGeo(0.9, 1.15, 0.04), wallTrimMat);
      sideMoulding.position.set(xPos, 3.45, 1.71);
      modelGroup.add(sideMoulding);
    });

    // 3. Ô gió gốm hoa sen / ô thông gió dưới mỗi cửa sổ tầng 2
    [-1.45, 0, 1.45].forEach((xPos) => {
      const ventBox = new THREE.Mesh(
        new THREE.BoxGeometry(xPos === 0 ? 0.75 : 0.55, 0.16, 0.08),
        ceramicBalustradeMat
      );
      ventBox.position.set(xPos, 2.76, 1.72);
      modelGroup.add(ventBox);
    });

    // Cửa sổ 2 mặt bên tầng 2
    [-2.32, 2.32].forEach((xPos) => {
      [-0.72, 0.72].forEach((zPos) => {
        const sideWindow = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.85, 0.65),
          louverWindowMat
        );
        sideWindow.position.set(xPos, 3.35, zPos);
        modelGroup.add(sideWindow);
      });
    });

    // --- F. HỆ MÁI CHÍNH TẦNG 2 & CON SƠN ĐỠ MÁI (MAIN ROOF SYSTEM) ---
    // Hàng con sơn gỗ đỡ mái chính
    for (let c = -2.2; c <= 2.2; c += 0.4) {
      const corbelUpperFront = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.14, 0.28), corbelWoodMat);
      corbelUpperFront.position.set(c, 4.02, 1.82);
      corbelUpperFront.castShadow = true;
      modelGroup.add(corbelUpperFront);

      const corbelUpperBack = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.14, 0.28), corbelWoodMat);
      corbelUpperBack.position.set(c, 4.02, -1.82);
      corbelUpperBack.castShadow = true;
      modelGroup.add(corbelUpperBack);
    }

    // Diềm mái ngói chính
    const upperEave = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.08, 3.9), goldTrimMat);
    upperEave.position.set(0, 4.08, 0);
    modelGroup.add(upperEave);

    // Khối Mái dốc tứ diện (4-Hipped Terracotta Roof)
    const roofMainGeo = new THREE.ConeGeometry(3.6, 1.35, 4);
    const roofMain = new THREE.Mesh(roofMainGeo, roofMat);
    roofMain.position.set(0, 4.75, 0);
    roofMain.rotation.y = Math.PI / 4;
    roofMain.scale.set(1.15, 1, 0.95);
    roofMain.castShadow = true;
    roofMain.receiveShadow = true;
    modelGroup.add(roofMain);

    // 4 Đường bờ nóc đắp chỉ uốn cong (Hip Ridges)
    for (let r = 0; r < 4; r++) {
      const angle = (r * Math.PI) / 2 + Math.PI / 4;
      const ridgeBeam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.055, 2.4, 8),
        goldTrimMat
      );
      ridgeBeam.position.set(Math.cos(angle) * 1.32, 4.78, Math.sin(angle) * 1.32);
      ridgeBeam.rotation.y = -angle;
      ridgeBeam.rotation.z = 0.62;
      ridgeBeam.castShadow = true;
      modelGroup.add(ridgeBeam);
    }

    // ĐỈNH NÓC ĐẶC TRƯNG: 3 GỜ TƯỜNG BỜ NÓC TRANG TRÍ (DECORATIVE PARAPET MERLONS)
    // Như trong ảnh thực tế người dùng cung cấp: Đỉnh nóc có 3 gờ tường hoa đắp chỉ vàng
    [-0.8, 0, 0.8].forEach((xPos, idx) => {
      const h = idx === 1 ? 0.38 : 0.28;
      const merlon = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, h, 0.12),
        wallTrimMat
      );
      merlon.position.set(xPos, 5.48, 0);
      merlon.castShadow = true;
      modelGroup.add(merlon);

      // Chóp tháp nhọn trên mỗi gờ
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 6), goldTrimMat);
      cap.position.set(xPos, 5.48 + h / 2 + 0.1, 0);
      modelGroup.add(cap);
    });

    // Tháp nhọn đỉnh trung tâm cao nhất
    const apexFinial = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.45, 8), goldTrimMat);
    apexFinial.position.set(0, 5.82, 0);
    apexFinial.castShadow = true;
    modelGroup.add(apexFinial);

    // --- G. CẢNH QUAN & CÂY CỐI THỰC ĐỊA ---
    // Cây hoa sứ cổ thụ bên hông (như trong ảnh thực tế áo dài)
    const treeGroup = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4B382A, roughness: 0.9 });
    const trunk1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 1.8, 8), trunkMat);
    trunk1.position.set(-4.5, 0.9, 2.3);
    trunk1.rotation.z = -0.28;
    trunk1.castShadow = true;
    treeGroup.add(trunk1);

    const trunk2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 1.3, 8), trunkMat);
    trunk2.position.set(-4.1, 2.0, 2.2);
    trunk2.rotation.z = 0.38;
    trunk2.castShadow = true;
    treeGroup.add(trunk2);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8 });
    const foliage1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9, 1), foliageMat);
    foliage1.position.set(-4.2, 2.7, 2.1);
    foliage1.castShadow = true;
    treeGroup.add(foliage1);

    const foliage2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7, 1), foliageMat);
    foliage2.position.set(-3.5, 2.4, 1.7);
    foliage2.castShadow = true;
    treeGroup.add(foliage2);

    // Điểm xuyết hoa sứ trắng nhụy vàng
    const blossomMat = new THREE.MeshBasicMaterial({ color: 0xFFFBEB });
    for (let b = 0; b < 10; b++) {
      const blossom = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), blossomMat);
      blossom.position.set(
        -4.2 + (Math.random() - 0.5) * 1.4,
        2.5 + Math.random() * 0.7,
        2.0 + (Math.random() - 0.5) * 1.4
      );
      treeGroup.add(blossom);
    }
    modelGroup.add(treeGroup);

    // Cột cờ Tổ quốc trang trọng bên sảnh
    const flagpoleGroup = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 3.8, 8), goldTrimMat);
    pole.position.set(4.3, 1.9, 2.4);
    pole.castShadow = true;
    flagpoleGroup.add(pole);

    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.85, 0.55),
      new THREE.MeshStandardMaterial({ color: 0xDC2626, side: THREE.DoubleSide })
    );
    flag.position.set(4.75, 3.48, 2.4);
    flagpoleGroup.add(flag);

    const star = new THREE.Mesh(new THREE.CircleGeometry(0.13, 5), new THREE.MeshBasicMaterial({ color: 0xFBBF24 }));
    star.position.set(4.75, 3.48, 2.405);
    flagpoleGroup.add(star);
    modelGroup.add(flagpoleGroup);

    scene.add(modelGroup);

    // 7. LIGHTING SETUP (CHIẾU SÁNG NGOẠI CẢNH NẮNG ẤM & ĐÈN KIẾN TRÚC BAN ĐÊM)
    const ambientLight = new THREE.AmbientLight(0xFFFBF2, 1.35);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFEF5, 2.2);
    dirLight.position.set(9, 15, 11);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xBAE6FD, 0.95);
    fillLight.position.set(-8, 7, -8);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xE0F2FE, 0xFEF3C7, 0.95);
    scene.add(hemiLight);

    // Dàn đèn chiếu hắt kiến trúc ban đêm (Architectural Uplights)
    const nightSpotGroup = new THREE.Group();
    const spotColors = [0xF59E0B, 0xFEF08A, 0xF59E0B];
    [-2.2, 0, 2.2].forEach((xPos, idx) => {
      const spot = new THREE.SpotLight(spotColors[idx], 0, 9, Math.PI / 4, 0.5, 1);
      spot.position.set(xPos, 0.3, 3.3);
      spot.target.position.set(xPos, 2.2, 2.1);
      scene.add(spot.target);
      nightSpotGroup.add(spot);
    });
    scene.add(nightSpotGroup);

    setIsLoaded(true);

    // 8. RENDER LOOP VỚI TỐC ĐỘ XOAY GIẢM 50%
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Tự xoay tròn 360 độ (tốc độ chậm êm ái: 0.00375)
      if (isAutoRotating && !isDraggingRef.current && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += autoRotateSpeedRef.current;
      }

      updateCameraPosition();

      // Cập nhật chế độ ánh sáng Ngày / Đêm
      if (isNightMode) {
        ambientLight.intensity = 0.25;
        dirLight.intensity = 0.3;
        nightSpotGroup.children.forEach((c) => {
          if (c instanceof THREE.SpotLight) c.intensity = 2.8;
        });
      } else {
        ambientLight.intensity = 0.85;
        dirLight.intensity = 1.75;
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

  // 10. DRAG & TOUCH HANDLERS
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;

    const deltaX = clientX - previousMousePositionRef.current.x;
    const deltaY = clientY - previousMousePositionRef.current.y;

    sphericalRef.current.theta -= deltaX * 0.006;
    sphericalRef.current.phi = Math.max(
      0.25,
      Math.min(Math.PI / 2.05, sphericalRef.current.phi - deltaY * 0.005)
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
      7.0,
      Math.min(17.0, sphericalRef.current.radius + e.deltaY * 0.01)
    );
    updateCameraPosition();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden select-none bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#FEF3C7] border-2 border-[#E5C992] shadow-xl group ${className}`}
    >
      {/* 3D Canvas */}
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

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-amber-300/80 text-[#881337] text-xs font-bold shadow-md">
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
          <span>Mô Hình 3D Nhà Truyền Thống Đất Thủ</span>
        </div>
        <span className="text-[10px] text-slate-700 font-semibold px-2 py-0.5 rounded-md bg-white/90 border border-amber-200/60 backdrop-blur-sm self-start shadow-2xs">
          Tốc độ xoay chậm êm · Kéo chuột để xoay 360°
        </span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        <button
          type="button"
          onClick={() => {
            hcmSfx.playClick(600);
            setIsAutoRotating((prev) => !prev);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all cursor-pointer shadow-md ${
            isAutoRotating
              ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
              : 'bg-white/90 text-slate-700 border-amber-200 hover:bg-white'
          }`}
          title={isAutoRotating ? 'Tạm dừng xoay tròn' : 'Bật tự xoay tròn 360°'}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => {
            hcmSfx.playClick(700);
            setIsNightMode((prev) => !prev);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all cursor-pointer shadow-md ${
            isNightMode
              ? 'bg-indigo-600 text-amber-200 border-indigo-400'
              : 'bg-white/90 text-amber-700 border-amber-200 hover:bg-white'
          }`}
          title={isNightMode ? 'Chuyển sang ánh sáng ban ngày' : 'Bật đèn kiến trúc ban đêm'}
        >
          {isNightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </button>

        {onOpenHeritage3D && (
          <button
            type="button"
            onClick={() => {
              hcmSfx.playClick(900);
              onOpenHeritage3D();
            }}
            className="p-2 rounded-xl bg-gradient-to-r from-[#881337] to-[#C59A55] text-white border border-amber-300/60 text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center gap-1"
            title="Mở toàn màn hình tham quan 3D VR"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Preset Camera Views */}
      <div className="absolute left-3 bottom-14 flex items-center gap-1.5 z-10">
        {[
          { key: 'ISOMETRIC' as const, label: '3/4 Phối Cảnh' },
          { key: 'FRONT' as const, label: 'Chính Diện' },
          { key: 'TOP' as const, label: 'Mái & Bờ Nóc' },
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
                ? 'bg-[#881337] text-white border-[#881337] shadow-sm'
                : 'bg-white/90 text-slate-700 border-amber-200/80 hover:bg-white shadow-2xs'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Bottom Bar: Chi tiết kiến trúc & Nút Khám Phá */}
      <div className="absolute bottom-2.5 left-3 right-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-amber-200 text-slate-800 flex items-center justify-between gap-2 z-10 shadow-md">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div className="min-w-0">
            <span className="text-xs font-extrabold text-[#881337] block truncate">
              Nhà Truyền Thống Thành Phố Thủ Dầu Một
            </span>
            <span className="text-[10px] text-slate-600 block truncate font-medium">
              Biển hiệu chuẩn · Con sơn gỗ đỡ mái · Vòm cuốn Đông Dương &amp; Gốm xanh Đất Thủ
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
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#C59A55] hover:brightness-110 text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-all shadow-md"
          >
            <span>Vào 3D VR</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-3 text-slate-800 z-20">
          <RotateCw className="w-6 h-6 text-amber-600 animate-spin" />
          <span className="text-xs font-bold text-amber-900">Đang khởi tạo không gian 3D chi tiết...</span>
        </div>
      )}
    </div>
  );
};
