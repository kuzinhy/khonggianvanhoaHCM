import React, { useEffect, useState } from 'react';
import { DongSonDrumIcon, HoaSenIcon } from './TraditionalMotifs';

interface HcmPageLoaderProps {
  onLoaded?: () => void;
  minDurationMs?: number;
}

export const HcmPageLoader: React.FC<HcmPageLoaderProps> = ({
  onLoaded,
  minDurationMs = 1200,
}) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Tăng tiến độ mượt mà
    const p1 = setTimeout(() => setProgress(65), 180);
    const p2 = setTimeout(() => setProgress(100), 450);

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        if (onLoaded) onLoaded();
      }, 350);
    }, minDurationMs);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(timer);
    };
  }, [minDurationMs, onLoaded]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F0] transition-opacity duration-350 select-none overflow-hidden ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Đang khởi tạo Không gian Văn hóa Hồ Chí Minh"
    >
      {/* Họa tiết Trống Đồng Đông Sơn Ngọc Lũ Chuẩn Quốc Gia quay chậm trang trọng */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src="/assets/hcm-space/trong-dong-chuan-gold.png"
          alt="Trống đồng Đông Sơn Ngọc Lũ chuẩn"
          className="w-[540px] h-[540px] sm:w-[680px] sm:h-[680px] max-w-none opacity-25 animate-spin-slow select-none filter contrast-125"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-2xl space-y-4">
        {/* Biểu trưng chính thức Phường Thủ Dầu Một trang trọng */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1.5 border-2 border-[#C59A55] shadow-xl overflow-hidden flex items-center justify-center relative z-10 ring-4 ring-[#C59A55]/25">
            <img
              src="/assets/hcm-space/logo-phuong-thu-dau-mot.png"
              alt="Biểu trưng chính thức Phường Thủ Dầu Một"
              className="w-full h-full object-contain select-none filter drop-shadow-sm"
            />
          </div>
          {/* Vòng hào quang vàng đồng nhẹ */}
          <div className="absolute inset-0 rounded-full border border-[#C59A55]/60 animate-ping opacity-25"></div>
          <div className="absolute -inset-2 rounded-full border border-[#C59A55]/40 animate-pulse"></div>
        </div>

        {/* Khẩu hiệu & Tên Không gian Văn hóa (Đảm bảo 1 dòng duy nhất, không bao giờ bị ngắt chữ) */}
        <div className="space-y-1.5 w-full max-w-full flex flex-col items-center">
          <div className="text-[11px] sm:text-xs font-bold text-[#C59A55] tracking-[0.2em] uppercase whitespace-nowrap">
            DI SẢN HỒ CHÍ MINH • KẾT NỐI GIÁ TRỊ VIỆT
          </div>
          <h2 className="font-serif text-lg sm:text-2xl md:text-[26px] font-bold text-[#751D2C] tracking-wide whitespace-nowrap overflow-visible leading-normal">
            Không Gian Văn Hóa Hồ Chí Minh
          </h2>
          <p className="text-xs sm:text-[13px] text-[#67615B] font-medium whitespace-nowrap">
            Đảng bộ &amp; Nhân dân Phường Thủ Dầu Một
          </p>
        </div>

        {/* Thanh tiến độ vàng đồng shimmer */}
        <div className="w-56 sm:w-64 h-1.5 rounded-full bg-[#E5D3B2]/50 overflow-hidden relative shadow-inner mt-2">
          <div
            className="h-full bg-gradient-to-r from-[#C59A55] via-[#751D2C] to-[#C59A55] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-[11px] text-[#67615B] italic">
          Đang nạp dữ liệu di sản số hóa &amp; giọng đọc...
        </div>
      </div>
    </div>
  );
};
