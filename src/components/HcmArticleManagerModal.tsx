import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  X,
  Save,
  Image,
  Tag,
  MapPin,
  ExternalLink,
  Sparkles,
  BookOpen,
  Award,
  HardDrive,
} from 'lucide-react';
import type { HcmCulturalEntryDto, HcmSection } from '../hcmSpaceClient';
import { useApp } from '../AppContext';
import {
  convertDriveToDirectImageUrl,
  HCM_DRIVE_STORAGE_CONFIG,
} from '../lib/hcmDriveStorage';
import { HcmGoogleDriveStorageModal } from './HcmGoogleDriveStorageModal';

interface HcmArticleManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: HcmCulturalEntryDto[];
  onSaveEntry: (entry: Partial<HcmCulturalEntryDto> & { editingId?: string | null }) => Promise<void>;
  onDeleteEntry: (entry: HcmCulturalEntryDto) => Promise<void>;
}

export const HcmArticleManagerModal: React.FC<HcmArticleManagerModalProps> = ({
  isOpen,
  onClose,
  items,
  onSaveEntry,
  onDeleteEntry,
}) => {
  const { currentUser } = useApp();
  const [selectedSection, setSelectedSection] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingEntry, setEditingEntry] = useState<Partial<HcmCulturalEntryDto> & { editingId?: string | null } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    const matchSec = selectedSection === 'ALL' || item.section === selectedSection;
    const matchKey =
      !searchKeyword.trim() ||
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchSec && matchKey;
  });

  const handleOpenCreate = (section: HcmSection = 'NEWS') => {
    setEditingEntry({
      editingId: null,
      section,
      title: '',
      subtitle: section === 'MODEL' ? 'Chi bộ / Khu phố thực hiện' : 'Ban Tuyên giáo Phường Thủ Dầu Một',
      location: 'Phường Thủ Dầu Một',
      summary: '',
      quote: '',
      imageUrl: '/assets/hcm-space/khu-pho.jpg',
      status: 'PUBLISHED',
      sortOrder: items.length + 1,
    });
  };

  const handleOpenEdit = (item: HcmCulturalEntryDto) => {
    setEditingEntry({
      editingId: item.id,
      section: item.section,
      title: item.title,
      subtitle: item.subtitle,
      location: item.location,
      summary: item.summary,
      quote: item.quote,
      imageUrl: item.imageUrl,
      status: item.status,
      sortOrder: item.sortOrder,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry || !editingEntry.title?.trim()) return;

    setIsSaving(true);
    try {
      await onSaveEntry(editingEntry);
      setEditingEntry(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: HcmCulturalEntryDto) => {
    await onDeleteEntry(item);
    setDeleteConfirmId(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl border-2 border-[#C59A55] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#751D2C] via-[#651724] to-[#54121E] px-6 py-4.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C59A55]/20 border border-[#C59A55]/50 flex items-center justify-center p-2">
              <Edit3 className="w-5 h-5 text-[#C59A55]" />
            </div>
            <div>
              <div className="text-[10.5px] font-bold text-[#E5D3B2] tracking-[0.16em] uppercase">
                TRUNG TÂM BIÊN TẬP &amp; QUẢN TRỊ NỘI DUNG
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                Quản Trị Bài Viết &amp; Tư Liệu Cơ Sở
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenCreate('NEWS')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C59A55] hover:bg-[#b08745] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm bài viết mới</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#E5D3B2] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thanh công cụ tìm kiếm và lọc */}
        <div className="p-4 border-b border-[#E5D3B2]/50 bg-[#FAF7F0] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="font-bold text-[#751D2C] uppercase text-[11px] mr-1">Chuyên mục:</span>
            {[
              { id: 'ALL', label: 'Tất cả' },
              { id: 'NEWS', label: 'Bản tin cơ sở' },
              { id: 'MODEL', label: 'Mô hình học theo Bác' },
              { id: 'WORK', label: 'Tác phẩm' },
              { id: 'QUOTE', label: 'Lời Bác dạy' },
              { id: 'MILESTONE', label: 'Mốc lịch sử' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSection(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSection === tab.id
                    ? 'bg-[#751D2C] text-white shadow-xs'
                    : 'bg-white border border-[#E5D3B2] text-[#262321] hover:border-[#751D2C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#67615B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm theo tiêu đề, nội dung..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#E5D3B2] bg-white focus:outline-hidden focus:border-[#751D2C]"
            />
          </div>
        </div>

        {/* Danh sách bài viết */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-[#67615B] space-y-2">
              <FileText className="w-12 h-12 mx-auto text-[#C59A55]/40" />
              <p className="text-sm font-medium">Chưa có bài viết hoặc không tìm thấy kết quả phù hợp.</p>
              <button
                type="button"
                onClick={() => handleOpenCreate('NEWS')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#751D2C] text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo bài viết đầu tiên</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E5D3B2] bg-white p-4 shadow-xs hover:border-[#751D2C]/60 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF7F0] border border-[#E5D3B2] text-[10.5px] font-bold text-[#751D2C]">
                        {item.section === 'NEWS'
                          ? 'Bản tin'
                          : item.section === 'MODEL'
                          ? 'Mô hình'
                          : item.section === 'WORK'
                          ? 'Tác phẩm'
                          : item.section === 'QUOTE'
                          ? 'Lời Bác'
                          : 'Mốc son'}
                      </span>

                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'PUBLISHED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[#262321] line-clamp-2">
                      {item.title}
                    </h4>

                    {item.subtitle && (
                      <p className="text-[11.5px] text-[#751D2C] font-medium line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-[#67615B] line-clamp-2 leading-relaxed">
                      {item.summary || item.quote}
                    </p>
                  </div>

                  {/* Thanh nút thao tác Sửa / Xóa */}
                  <div className="pt-3 mt-3 border-t border-[#E5D3B2]/40 flex items-center justify-between text-xs">
                    <span className="text-[10.5px] text-[#67615B] italic">
                      {item.location || 'Phường Thủ Dầu Một'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#E5D3B2] hover:border-[#751D2C] hover:bg-rose-50 text-[#751D2C] font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>

                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="px-2 py-1 rounded-lg bg-rose-600 text-white font-bold text-[10.5px] cursor-pointer"
                          >
                            Xác nhận
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 rounded-lg border border-slate-300 text-slate-700 text-[10.5px] cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa bài viết này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal / Form Biên Tập Bài Viết Con */}
        {editingEntry && (
          <div className="absolute inset-0 z-30 bg-white flex flex-col animate-in slide-in-from-bottom-4">
            <div className="bg-[#751D2C] px-6 py-3.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#C59A55]" />
                <h3 className="font-serif font-bold text-base">
                  {editingEntry.editingId ? 'Chỉnh Sửa Bài Viết / Tư Liệu' : 'Soạn Thảo Bài Viết Mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="p-1 text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                    Chuyên mục nội dung *
                  </label>
                  <select
                    value={editingEntry.section}
                    onChange={(e) => setEditingEntry((p) => p && { ...p, section: e.target.value as HcmSection })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] bg-[#FAF7F0] text-xs font-semibold"
                  >
                    <option value="NEWS">Tin tức &amp; Hoạt động Không gian VH HCM</option>
                    <option value="MODEL">Mô hình học tập &amp; làm theo Bác (Chi bộ/Khu phố)</option>
                    <option value="WORK">Tác phẩm kinh điển &amp; Tư liệu học tập</option>
                    <option value="QUOTE">Lời Bác dạy &amp; Chuẩn mực QĐ 144</option>
                    <option value="MILESTONE">Mốc lịch sử &amp; Biên niên tiểu sử</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                    Trạng thái xuất bản
                  </label>
                  <select
                    value={editingEntry.status}
                    onChange={(e) => setEditingEntry((p) => p && { ...p, status: e.target.value as 'PUBLISHED' | 'DRAFT' })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] bg-[#FAF7F0] text-xs font-semibold"
                  >
                    <option value="PUBLISHED">Đã xuất bản (Công khai)</option>
                    <option value="DRAFT">Bản nháp (Lưu nội bộ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Tiêu đề bài viết / Tên tác phẩm / Mốc sự kiện *
                </label>
                <input
                  type="text"
                  required
                  value={editingEntry.title || ''}
                  onChange={(e) => setEditingEntry((p) => p && { ...p, title: e.target.value })}
                  placeholder="Nhập tiêu đề trang trọng..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5D3B2] focus:border-[#751D2C] text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                    Cơ quan / Đơn vị thực hiện / Mốc thời gian
                  </label>
                  <input
                    type="text"
                    value={editingEntry.subtitle || ''}
                    onChange={(e) => setEditingEntry((p) => p && { ...p, subtitle: e.target.value })}
                    placeholder="VD: Chi bộ Khu phố 1 / Đảng ủy Phường..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                    Địa bàn / Nơi sáng tác / Xuất bản
                  </label>
                  <input
                    type="text"
                    value={editingEntry.location || ''}
                    onChange={(e) => setEditingEntry((p) => p && { ...p, location: e.target.value })}
                    placeholder="VD: Phường Thủ Dầu Một"
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Tóm tắt nội dung chính
                </label>
                <textarea
                  rows={3}
                  value={editingEntry.summary || ''}
                  onChange={(e) => setEditingEntry((p) => p && { ...p, summary: e.target.value })}
                  placeholder="Tóm tắt ngắn gọn mục tiêu, nội dung cốt lõi và ý nghĩa..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#262321] uppercase mb-1">
                  Lời trích dẫn / Lời Bác dạy / Nội dung chi tiết
                </label>
                <textarea
                  rows={4}
                  value={editingEntry.quote || ''}
                  onChange={(e) => setEditingEntry((p) => p && { ...p, quote: e.target.value })}
                  placeholder="Trích dẫn văn kiện, lời nói hoặc nội dung sinh hoạt chi bộ..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#262321] uppercase">
                    Đường dẫn hình ảnh tư liệu (URL hoặc Google Drive)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDriveModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#751D2C] hover:text-[#5B1522] hover:underline cursor-pointer"
                    >
                      <HardDrive className="w-3.5 h-3.5 text-[#C59A55]" />
                      <span>Lấy ảnh từ Google Drive</span>
                    </button>
                    <a
                      href={HCM_DRIVE_STORAGE_CONFIG.rootFolderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-0.5"
                    >
                      <span>Mở Drive</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <input
                  type="text"
                  value={editingEntry.imageUrl || ''}
                  onChange={(e) => {
                    const directUrl = convertDriveToDirectImageUrl(e.target.value);
                    setEditingEntry((p) => p && { ...p, imageUrl: directUrl });
                  }}
                  placeholder="Dán URL ảnh hoặc link chia sẻ từ Google Drive..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E5D3B2] text-xs font-mono"
                />
                {editingEntry.imageUrl && (
                  <div className="mt-2 p-2 rounded-xl border border-[#E5D3B2]/60 bg-stone-50 flex items-center gap-3">
                    <img
                      src={editingEntry.imageUrl}
                      alt="Xem trước ảnh"
                      className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/hcm-space/khu-pho.jpg';
                      }}
                    />
                    <div className="text-[11px] text-[#67615B] space-y-0.5">
                      <span className="font-semibold text-slate-800 block">Xem trước ảnh bài viết</span>
                      <span className="text-[10px] text-slate-500 font-mono truncate max-w-xs block">
                        {editingEntry.imageUrl}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5D3B2]/50">
                <button
                  type="button"
                  onClick={() => setEditingEntry(null)}
                  className="px-4 py-2 rounded-xl border border-[#E5D3B2] text-[#262321] text-xs font-semibold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Đang lưu...' : 'Lưu bài viết vào hệ thống'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modal Quản trị & Chuyển đổi Link Google Drive */}
      <HcmGoogleDriveStorageModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        onApplyImageUrl={(url) => {
          setEditingEntry((p) => (p ? { ...p, imageUrl: url } : p));
        }}
      />
    </div>
  );
};
