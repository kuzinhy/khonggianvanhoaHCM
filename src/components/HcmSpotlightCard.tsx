import React, { useRef, useState } from 'react';

interface HcmSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. '#C59A55' or '#751D2C' or 'rgba(197,154,85,0.4)'
  enableTilt?: boolean;
  spotlightRadius?: number;
}

export const HcmSpotlightCard: React.FC<HcmSpotlightCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(197, 154, 85, 0.35)',
  enableTilt = true,
  spotlightRadius = 260,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [styleVars, setStyleVars] = useState<React.CSSProperties>({
    '--mx': '50%',
    '--my': '50%',
    '--rx': '0deg',
    '--ry': '0deg',
    '--glow-opacity': '0',
  } as React.CSSProperties);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Không áp dụng tilt 3D trên màn hình cảm ứng để tránh giật lag
    if (e.pointerType === 'touch' || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    // Giới hạn góc nghiêng nhẹ nhàng 4 - 6 độ chuẩn Apple / Linear
    const rx = enableTilt ? `${(0.5 - yPercent) * 6}deg` : '0deg';
    const ry = enableTilt ? `${(xPercent - 0.5) * 6}deg` : '0deg';

    setStyleVars({
      '--mx': `${x}px`,
      '--my': `${y}px`,
      '--rx': rx,
      '--ry': ry,
      '--glow-opacity': '1',
    } as React.CSSProperties);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setStyleVars({
      '--mx': '50%',
      '--my': '50%',
      '--rx': '0deg',
      '--ry': '0deg',
      '--glow-opacity': '0',
    } as React.CSSProperties);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        ...styleVars,
        perspective: '1000px',
      }}
      className={`relative isolate rounded-2xl transition-[transform,box-shadow] duration-500 will-change-transform ${
        isHovered ? 'z-10' : 'z-0'
      } ${className}`}
      {...props}
    >
      {/* 3D Transform Container */}
      <div
        className="w-full h-full rounded-[inherit] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(${isHovered ? '-4px' : '0px'})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Lớp viền phát sáng tương tác (Cursor-following Spotlight Border Mask) */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-400 -z-10"
          style={{
            padding: '1.5px',
            background: `radial-gradient(${spotlightRadius}px circle at var(--mx) var(--my), ${glowColor}, transparent 70%)`,
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Lớp ánh loá bề mặt (Surface Glare) */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-20 overflow-hidden"
          style={{
            background: `radial-gradient(${spotlightRadius * 1.2}px circle at var(--mx) var(--my), rgba(255, 255, 255, 0.16), transparent 60%)`,
            mixBlendMode: 'soft-light',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Nội dung bên trong thẻ */}
        <div className="relative z-10 w-full h-full rounded-[inherit]">
          {children}
        </div>
      </div>
    </div>
  );
};
