import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Key,
  Layers,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Wifi,
  X,
} from 'lucide-react';
import {
  fetchFanpageStatus,
  saveFanpageCredentials,
  syncFanpageFeed,
  type FanpageConnectionStatusDto,
} from '../hcmSpaceClient';

interface HcmFanpageConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const HcmFanpageConfigModal: React.FC<HcmFanpageConfigModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pageId, setPageId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [pageName, setPageName] = useState('Đất Thủ Quê Hương Tôi');
  const [pageUrl, setPageUrl] = useState('https://www.facebook.com/datthuquehuongtoi');
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<FanpageConnectionStatusDto | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      void loadStatus();
    }
  }, [isOpen]);

  const loadStatus = async () => {
    try {
      const data = await fetchFanpageStatus();
      if (data) {
        setCurrentStatus(data);
        if (data.pageConfig.pageId) {
          setPageId(data.pageConfig.pageId);
        }
        if (data.pageConfig.name) {
          setPageName(data.pageConfig.name);
        }
        if (data.pageConfig.url) {
          setPageUrl(data.pageConfig.url);
        }
      }
    } catch {}
  };

  const handleSaveAndVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanId = pageId.trim();
    const cleanToken = accessToken.trim();

    if (!cleanId) {
      setErrorMsg('Vui lòng nhập Facebook Page ID của trang Đất Thủ Quê Hương Tôi.');
      return;
    }
    if (!cleanToken) {
      setErrorMsg('Vui lòng nhập Facebook Page Access Token từ Meta for Developers.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await saveFanpageCredentials({
        pageId: cleanId,
        accessToken: cleanToken,
        pageName: pageName.trim(),
        pageUrl: pageUrl.trim(),
      });

      if (!res.success) {
        setErrorMsg(res.error || res.message || 'Không thể xác thực thông tin với Facebook Graph API.');
        return;
      }

      setSuccessMsg(res.message || 'Đã kết nối thành công với Facebook Fanpage!');
      setAccessToken(''); // Xóa token hiển thị trên form để an toàn
      await loadStatus();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Có lỗi xảy ra khi kết nối máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await syncFanpageFeed();
      setSuccessMsg(res.message || `Đồng bộ thành công ${res.syncedCount} bài viết.`);
      await loadStatus();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Không thể đồng bộ bài viết.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  const isConnected = currentStatus?.pageConfig?.status === 'CONNECTED' && currentStatus?.isConfigured;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-blue-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 font-black text-xl shadow-xs">
              f
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                Kết Nối Fanpage Facebook "Đất Thủ Quê Hương Tôi"
                <span className="rounded-full bg-blue-500/40 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-blue-100">
                  Graph API v21.0
                </span>
              </h2>
              <p className="text-xs text-blue-100">
                Tự động đồng bộ các bài viết gương người tốt việc tốt, an sinh xã hội & hoạt động cộng đồng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-blue-200 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Trạng thái kết nối hiện tại */}
          <div
            className={`rounded-xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isConnected
                ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
                : 'border-amber-200 bg-amber-50/60 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isConnected ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                }`}
              >
                {isConnected ? <CheckCircle2 className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                  <span>Trạng thái:</span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-extrabold ${
                      isConnected
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    {isConnected ? 'ĐÃ KẾT NỐI LIVE GRAPH API' : 'CHỜ CẤP ID & ACCESS TOKEN'}
                  </span>
                </div>
                <div className="text-xs text-slate-700 mt-0.5 font-medium">
                  {isConnected ? (
                    <>
                      Trang: <strong>{currentStatus?.pageConfig?.name}</strong> • ID: <code>{currentStatus?.pageConfig?.pageId}</code> • Token: <code>{currentStatus?.pageConfig?.tokenPreview}</code>
                    </>
                  ) : (
                    <>
                      Hệ thống đang phục vụ bằng <strong>kho bài viết đã lưu cục bộ</strong>. Vui lòng nhập ID & Token bên dưới để kích hoạt kết nối thời gian thực.
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isSyncing}
              onClick={handleManualSync}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 shrink-0 cursor-pointer shadow-2xs disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isSyncing ? 'Đang kéo tin...' : 'Đồng bộ bài viết ngay'}</span>
            </button>
          </div>

          {/* Hướng dẫn ngắn */}
          <div className="rounded-xl border border-blue-100 bg-[#F8FAFF] p-3.5 text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Cách lấy Facebook Page ID & Access Token:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>
                Truy cập <strong>Meta for Developers</strong> (developers.facebook.com) hoặc <strong>Graph API Explorer</strong>.
              </li>
              <li>
                Chọn ứng dụng và trang <strong>"Đất Thủ Quê Hương Tôi"</strong>, yêu cầu quyền: <code className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded">pages_read_engagement</code> và <code className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded">pages_read_user_content</code>.
              </li>
              <li>
                Sao chép <strong>Page ID</strong> và <strong>Page Access Token</strong> (vĩnh viễn hoặc dài hạn) rồi dán vào bên dưới.
              </li>
            </ol>
          </div>

          {/* Thông báo lỗi / thành công */}
          {errorMsg && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Lỗi kết nối:</strong> {errorMsg}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex items-start gap-2.5 text-xs text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Thành công:</strong> {successMsg}
              </div>
            </div>
          )}

          {/* Form nhập thông tin */}
          <form onSubmit={handleSaveAndVerify} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Facebook Page ID <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={pageId}
                  onChange={(e) => setPageId(e.target.value)}
                  placeholder="Ví dụ: 100083219876543 hoặc datthuquehuongtoi"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Mã định danh duy nhất của Trang Fanpage "Đất Thủ Quê Hương Tôi" trên Facebook.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Facebook Page Access Token <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Dán chuỗi Access Token (bắt đầu bằng EAA...)"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white pl-3.5 pr-10 py-2 text-xs font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                  title={showToken ? 'Ẩn token' : 'Hiện token'}
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Mã truy cập Page Access Token được Meta cấp để đọc dữ liệu bài viết công khai. Token được lưu trữ an toàn trong máy chủ nội bộ.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên Trang hiển thị</label>
                <input
                  type="text"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường dẫn Fanpage</label>
                <input
                  type="url"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200">
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Mở trang Facebook gốc
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 px-5 py-2 text-xs font-bold text-white shadow-sm cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Đang kiểm tra với Meta...</span>
                    </>
                  ) : (
                    <>
                      <Key className="h-3.5 w-3.5" />
                      <span>Xác thực & Kết nối Fanpage</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
