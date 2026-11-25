import React, { useState } from 'react';
import {
  Folder,
  FolderPlus,
  ExternalLink,
  Copy,
  Check,
  Download,
  Upload,
  HardDrive,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  X,
  Image as ImageIcon,
  FileText,
  Music,
  Box,
  Building2,
  Database,
  ArrowRight,
} from 'lucide-react';
import {
  HCM_DRIVE_STORAGE_CONFIG,
  RECOMMENDED_DRIVE_FOLDER_STRUCTURE,
  extractDriveFileId,
  convertDriveToDirectImageUrl,
  getDrivePreviewUrl,
  type DriveFolderStructureNode,
} from '../lib/hcmDriveStorage';

interface HcmGoogleDriveStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyImageUrl?: (url: string) => void;
  fullStateJson?: any;
}

export const HcmGoogleDriveStorageModal: React.FC<HcmGoogleDriveStorageModalProps> = ({
  isOpen,
  onClose,
  onApplyImageUrl,
  fullStateJson,
}) => {
  const [activeTab, setActiveTab] = useState<'STRUCTURE' | 'CONVERTER' | 'BACKUP'>('STRUCTURE');
  const [inputDriveUrl, setInputDriveUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const detectedFileId = extractDriveFileId(inputDriveUrl);
  const generatedDirectUrl = detectedFileId ? convertDriveToDirectImageUrl(detectedFileId) : '';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDownloadBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      workspace: 'Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một',
      driveRootFolderId: HCM_DRIVE_STORAGE_CONFIG.rootFolderId,
      state: fullStateJson || { note: 'Dữ liệu đồng bộ hệ thống cấp A' },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hcm-space-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const getFolderIcon = (code: string) => {
    switch (code) {
      case '01':
        return <ImageIcon className="w-4 h-4 text-rose-600" />;
      case '02':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case '03':
        return <Music className="w-4 h-4 text-amber-600" />;
      case '04':
        return <Box className="w-4 h-4 text-purple-600" />;
      case '05':
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case '06':
        return <Upload className="w-4 h-4 text-cyan-600" />;
      case '07':
        return <Database className="w-4 h-4 text-slate-600" />;
      default:
        return <Folder className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF7F0] rounded-3xl border-2 border-[#C59A55] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#4A0E17] text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b-2 border-[#C59A55]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C59A55]/20 border border-[#C59A55]/50 text-[#E5D3B2] text-[11px] font-bold tracking-wider uppercase">
              <HardDrive className="w-3.5 h-3.5 text-[#C59A55]" />
              <span>HỆ THỐNG LƯU TRỮ ĐÁM MÂY GOOGLE DRIVE</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              Quản Trị Lưu Trữ Google Drive Không Gian Văn Hóa
            </h2>
            <p className="text-xs sm:text-[13px] text-[#E5D3B2]/90">
              Thư mục nguồn:&nbsp;
              <span className="font-mono font-semibold text-amber-300">
                {HCM_DRIVE_STORAGE_CONFIG.rootFolderId}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={HCM_DRIVE_STORAGE_CONFIG.rootFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C59A55] to-[#B28236] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Mở Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E5D3B2] bg-white px-5 sm:px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('STRUCTURE')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'STRUCTURE'
                ? 'border-[#751D2C] text-[#751D2C]'
                : 'border-transparent text-[#67615B] hover:text-[#262321]'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>Cấu Trúc Thư Mục Chuẩn Hóa (07 Phân Hệ)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CONVERTER')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'CONVERTER'
                ? 'border-[#751D2C] text-[#751D2C]'
                : 'border-transparent text-[#67615B] hover:text-[#262321]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C59A55]" />
            <span>Công Cụ Chuyển Link Drive → Link Ảnh Web</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('BACKUP')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'BACKUP'
                ? 'border-[#751D2C] text-[#751D2C]'
                : 'border-transparent text-[#67615B] hover:text-[#262321]'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Sao Lưu Dữ Liệu (Backup JSON)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Thông báo quan trọng về quyền chia sẻ trên Google Drive */}
          <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 flex items-start gap-3 text-xs text-amber-950">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <span className="font-bold text-amber-900 block text-[13px]">
                Yêu cầu thiết lập quyền trên Google Drive để hiển thị ảnh trên Website:
              </span>
              <p>
                Để các hình ảnh, file tài liệu lưu trên Google Drive có thể hiển thị trực tiếp cho mọi người xem trên cổng thông tin, trong thư mục Drive&nbsp;
                <a
                  href={HCM_DRIVE_STORAGE_CONFIG.rootFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-amber-900 hover:text-amber-700"
                >
                  {HCM_DRIVE_STORAGE_CONFIG.rootFolderId}
                </a>
                , đồng chí vui lòng chọn <strong>Chia sẻ (Share)</strong> → Chọn quyền truy cập chung là&nbsp;
                <strong className="text-[#751D2C]">"Bất kỳ ai có đường liên kết (Anyone with the link)"</strong> với quyền <strong>Người xem (Viewer)</strong>.
              </p>
            </div>
          </div>

          {/* TAB 1: CẤU TRÚC THƯ MỤC CHUẨN HÓA */}
          {activeTab === 'STRUCTURE' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#751D2C]">
                    Cây Thư Mục Lưu Trữ Đề Xuất Cho Toàn Bộ Không Gian
                  </h3>
                  <p className="text-xs text-[#67615B]">
                    Tạo các thư mục con tương ứng bên trong Google Drive để quản lý tài nguyên khoa học, chuẩn bảo tàng và tuyên giáo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(RECOMMENDED_DRIVE_FOLDER_STRUCTURE.map((f) => f.name).join('\n'))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5D3B2] bg-white hover:bg-slate-50 text-xs font-semibold text-[#751D2C] cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Đã sao chép danh sách' : 'Sao chép tên 7 thư mục'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {RECOMMENDED_DRIVE_FOLDER_STRUCTURE.map((node) => (
                  <div
                    key={node.code}
                    className="p-4 rounded-2xl border border-[#E5D3B2] bg-white hover:border-[#751D2C] transition-all space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[#FAF7F0] border border-[#E5D3B2]">
                          {getFolderIcon(node.code)}
                        </span>
                        <h4 className="font-mono font-bold text-xs sm:text-sm text-[#751D2C]">
                          {node.name}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-bold text-slate-600 uppercase">
                        {node.code}
                      </span>
                    </div>

                    <p className="text-xs text-[#67615B] leading-relaxed">
                      {node.description}
                    </p>

                    <div className="pt-2 border-t border-[#E5D3B2]/40 text-[11px] space-y-1">
                      <div className="text-[#262321]">
                        <strong>Áp dụng:</strong> {node.keyUseCases}
                      </div>
                      <div className="text-slate-500 font-mono text-[10px] truncate">
                        Ví dụ: {node.exampleFiles.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CÔNG CỤ CHUYỂN LINK DRIVE -> LINK ẢNH WEB */}
          {activeTab === 'CONVERTER' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif font-bold text-base text-[#751D2C]">
                  Chuyển Đổi Đường Link Google Drive Sang Link Nhúng Ảnh Trực Tiếp
                </h3>
                <p className="text-xs text-[#67615B]">
                  Dán bất kỳ đường liên kết chia sẻ nào từ Google Drive (hoặc File ID). Hệ thống sẽ tự động bóc tách và chuyển thành link CDN Google tốc độ cao (lh3.googleusercontent.com) để chèn vào bài viết mà không bị lỗi.
                </p>
              </div>

              {/* Input Link Drive */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#262321] uppercase">
                  Dán đường liên kết chia sẻ từ Google Drive (hoặc File ID):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputDriveUrl}
                    onChange={(e) => setInputDriveUrl(e.target.value)}
                    placeholder="VD: https://drive.google.com/file/d/1XtTGPw6cPi02XDFUFKYG8x9MS3h1WLyV/view?usp=sharing"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E5D3B2] bg-white text-xs sm:text-sm focus:outline-hidden focus:border-[#751D2C] font-mono"
                  />
                  {inputDriveUrl && (
                    <button
                      type="button"
                      onClick={() => setInputDriveUrl('')}
                      className="px-3 py-2 rounded-xl border border-[#E5D3B2] text-xs hover:bg-rose-50 text-rose-700 cursor-pointer"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>

              {/* Kết quả chuyển đổi */}
              {detectedFileId ? (
                <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Đã nhận diện thành công Google Drive File ID:</span>
                    </span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {detectedFileId}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700">
                      Link ảnh trực tiếp (Dùng để dán vào trường Ảnh bài viết):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedDirectUrl}
                        className="flex-1 px-3 py-2 rounded-xl border border-emerald-300 bg-white text-xs font-mono select-all text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(generatedDirectUrl)}
                        className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        {copiedUrl === generatedDirectUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedUrl === generatedDirectUrl ? 'Đã sao chép' : 'Sao chép link'}</span>
                      </button>
                      {onApplyImageUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            onApplyImageUrl(generatedDirectUrl);
                            onClose();
                          }}
                          className="px-3 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold text-xs flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>Chèn vào bài viết</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Khung xem trước (Image Preview) */}
                  <div className="pt-2">
                    <span className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Xem trước hình ảnh từ Google Drive CDN:
                    </span>
                    <div className="max-h-60 rounded-xl overflow-hidden border border-emerald-200 bg-stone-100 flex items-center justify-center">
                      <img
                        src={generatedDirectUrl}
                        alt="Xem trước ảnh từ Google Drive"
                        className="max-h-60 w-auto object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <p className="text-[10.5px] text-slate-500 mt-1 italic">
                      Lưu ý: Nếu ảnh không hiển thị khung xem trước, hãy kiểm tra lại file trên Google Drive đã được bật quyền "Bất kỳ ai có đường liên kết đều có thể xem".
                    </p>
                  </div>
                </div>
              ) : inputDriveUrl ? (
                <div className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Không tìm thấy Google Drive File ID hợp lệ trong chuỗi vừa nhập. Vui lòng kiểm tra lại định dạng link.</span>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: SAO LƯU DỮ LIỆU ĐỂ LƯU VÀO GOOGLE DRIVE */}
          {activeTab === 'BACKUP' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif font-bold text-base text-[#751D2C]">
                  Xuất Bản Sao Lưu Hệ Thống Để Lưu Trữ Lên Google Drive
                </h3>
                <p className="text-xs text-[#67615B]">
                  Tải về bản sao lưu toàn bộ dữ liệu hiện thời của Không gian văn hóa (các bài viết, mốc lịch sử, tác phẩm, lưu bút Sổ vàng số) dưới định dạng JSON tiêu chuẩn.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[#E5D3B2] bg-white space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[#751D2C]">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#262321]">
                      Gói Dữ Liệu Toàn Diện (Không Gian Văn Hóa HCM — Thủ Dầu Một)
                    </h4>
                    <p className="text-xs text-[#67615B]">
                      Bao gồm: Cài đặt không gian, danh sách bài viết & mô hình chi bộ, mốc lịch sử, checklist chuẩn mực Quy định 144.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div>• Thư mục lưu trữ đích trên Drive:&nbsp;
                    <span className="font-mono font-bold text-[#751D2C]">07_Sao_Luu_Du_Lieu_He_Thong</span>
                  </div>
                  <div>• Định dạng xuất:&nbsp;
                    <span className="font-mono font-bold text-blue-700">hcm-space-backup-YYYY-MM-DD.json</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadSuccess ? '✓ Đã tải file sao lưu về máy' : 'Tải File Sao Lưu JSON Về Máy'}</span>
                  </button>

                  <a
                    href={HCM_DRIVE_STORAGE_CONFIG.rootFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5D3B2] hover:bg-slate-50 text-[#751D2C] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <span>Mở thư mục Drive để tải file lên</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="bg-[#FAF7F0] p-4 border-t border-[#E5D3B2] flex items-center justify-between text-xs text-[#67615B]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Đã kết nối định danh Thư mục Drive: <code className="font-mono text-[#751D2C] font-bold">{HCM_DRIVE_STORAGE_CONFIG.rootFolderId}</code></span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-[#E5D3B2] hover:bg-white text-[#262321] font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
