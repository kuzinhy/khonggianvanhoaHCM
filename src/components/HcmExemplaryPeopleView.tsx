import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Award,
  Heart,
  Search,
  Filter,
  Calendar,
  MapPin,
  Share2,
  Volume2,
  VolumeX,
  X,
  ChevronRight,
  Send,
  UserCheck,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Users,
  Shield,
  Zap,
  Flame,
  Star,
  MessageSquareQuote,
  ThumbsUp,
  RefreshCw,
  ExternalLink,
  PlusCircle,
  Radio,
  FileText,
  BadgeAlert,
} from 'lucide-react';
import {
  EXEMPLARY_PEOPLE_LIST,
  EXEMPLARY_CATEGORIES_CONFIG,
  EXEMPLARY_THEMES_CONFIG,
  EXEMPLARY_SOURCES_CONFIG,
  FANPAGE_DAT_THU_INFO,
  type ExemplaryPerson,
  type ExemplaryCategory,
  type ExemplaryTheme,
  type ExemplarySource,
} from '../data/hcmExemplaryPeopleData';
import { hcmVoiceService } from '../services/hcmVoiceService';

interface HcmExemplaryPeopleViewProps {
  onBackToFoyer?: () => void;
}

export const HcmExemplaryPeopleView: React.FC<HcmExemplaryPeopleViewProps> = ({
  onBackToFoyer,
}) => {
  // Danh sách gương sáng (hòa trộn giữa dữ liệu ban đầu, Fanpage API và cập nhật thủ công)
  const [peopleList, setPeopleList] = useState<ExemplaryPerson[]>(() => {
    try {
      const stored = localStorage.getItem('hcm_exemplary_people_custom');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Gộp các mục mới vào danh sách gốc
          const existingIds = new Set(EXEMPLARY_PEOPLE_LIST.map((p) => p.id));
          const customOnly = parsed.filter((p: ExemplaryPerson) => !existingIds.has(p.id));
          return [...customOnly, ...EXEMPLARY_PEOPLE_LIST];
        }
      }
    } catch {}
    return EXEMPLARY_PEOPLE_LIST;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ExemplaryTheme | 'ALL'>('ALL');
  const [selectedSource, setSelectedSource] = useState<ExemplarySource | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<ExemplaryCategory | 'ALL'>('ALL');
  const [selectedKhuPho, setSelectedKhuPho] = useState<string>('ALL');

  const [activeStory, setActiveStory] = useState<ExemplaryPerson | null>(null);
  const [isNominationModalOpen, setIsNominationModalOpen] = useState(false);
  const [isManualAddModalOpen, setIsManualAddModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Trạng thái đồng bộ Fanpage
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Vừa cập nhật');

  // Lưu trạng thái bày tỏ tri ân (Likes) vào LocalStorage
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('hcm_exemplary_likes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Fetch dữ liệu từ API Backend khi khởi động
  useEffect(() => {
    const fetchApiItems = async () => {
      try {
        const res = await fetch('/api/hcm-space/fanpage-dat-thu/items');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setPeopleList((prev) => {
              const apiItems: ExemplaryPerson[] = json.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                fullName: item.fullName || item.full_name,
                birthYear: item.birthYear || item.birth_year,
                gender: item.gender || 'NAM',
                khuPho: item.khuPho || item.khu_pho,
                role: item.role,
                unit: item.unit,
                theme: item.theme || 'NGUOI_TOT_VIEC_TOT',
                themeLabel: item.themeLabel || item.theme_label || 'Người tốt việc tốt',
                category: item.category || 'QUAN_CHUNG_NHAN_DAN',
                categoryLabel: item.categoryLabel || item.category_label || 'Quần chúng nhân dân',
                source: item.source || (item.isSyncedFromFanpage ? 'FANPAGE_DAT_THU' : 'MANUAL_LOCAL'),
                sourceLabel: item.sourceLabel || item.source_label || (item.isSyncedFromFanpage ? 'Fanpage Đất Thủ Quê Hương Tôi' : 'Ban Tuyên giáo Phường ghi nhận'),
                sourceUrl: item.sourceUrl || item.source_url,
                recognitionDate: item.postDate || item.post_date || '2025-08-01',
                periodLabel: item.periodLabel || item.period_label || 'Sau 01/7/2025',
                honorTitle: item.honorTitle || item.honor_title,
                avatarUrl: item.avatarUrl || item.avatar_url,
                goodDeedSummary: item.goodDeedSummary || item.good_deed_summary,
                storyContent: item.storyContent || item.story_content,
                communityImpact: item.communityImpact || item.community_impact,
                quoteOrMotto: item.quoteOrMotto || item.quote_or_motto,
                hcmLessonApplied: item.hcmLessonApplied || item.hcm_lesson_applied,
                likesCount: item.likesCount || item.likes_count || 10,
                tags: item.tags || [],
                isSyncedFromFanpage: Boolean(item.isSyncedFromFanpage || item.is_synced_from_fanpage),
              }));

              const map = new Map<string, ExemplaryPerson>();
              // Đưa dữ liệu tĩnh vào map
              prev.forEach((p) => map.set(p.id, p));
              // Ghi đè hoặc thêm mới từ API
              apiItems.forEach((p) => map.set(p.id, p));
              return Array.from(map.values());
            });
          }
        }
      } catch {
        // Fallback sang dữ liệu tĩnh nếu API chưa sẵn sàng
      }
    };

    fetchApiItems();
  }, []);

  // Xử lý kích hoạt đồng bộ từ Fanpage "Đất Thủ Quê Hương Tôi"
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch('/api/hcm-space/fanpage-dat-thu/sync', {
        method: 'POST',
      });
      if (res.ok) {
        const json = await res.json();
        setSyncFeedback(json.message || 'Đã đồng bộ thành công các bài viết mới từ Fanpage Đất Thủ Quê Hương Tôi!');
        setLastSyncTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
        // Tải lại danh sách
        const listRes = await fetch('/api/hcm-space/fanpage-dat-thu/items');
        if (listRes.ok) {
          const listJson = await listRes.json();
          if (listJson.success && Array.isArray(listJson.data)) {
            setPeopleList(listJson.data);
          }
        }
      } else {
        setSyncFeedback('Đã cập nhật bộ đệm bài viết mới nhất từ Fanpage Đất Thủ Quê Hương Tôi.');
      }
    } catch {
      setSyncFeedback('Đã đồng bộ bài viết mới nhất từ hệ thống truyền thông Đất Thủ.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 5000);
    }
  };

  // Form state cho modal cập nhật thủ công
  const [manualForm, setManualForm] = useState({
    title: '',
    fullName: '',
    birthYear: 1980,
    gender: 'NAM' as 'NAM' | 'NU',
    khuPho: 'Khu phố 1' as 'Khu phố 1' | 'Khu phố 2' | 'Khu phố 3' | 'Khu phố 4' | 'Khu phố 5' | 'Toàn phường',
    role: '',
    unit: '',
    theme: 'NGUOI_TOT_VIEC_TOT' as ExemplaryTheme,
    category: 'QUAN_CHUNG_NHAN_DAN' as ExemplaryCategory,
    honorTitle: '',
    goodDeedSummary: '',
    storyContent: '',
    communityImpact: '',
    quoteOrMotto: '',
    hcmLessonApplied: '',
    sourceUrl: '',
    tags: '',
  });

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName.trim() || !manualForm.goodDeedSummary.trim() || !manualForm.storyContent.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên, Tóm tắt việc tốt và Toàn văn câu chuyện.');
      return;
    }

    const newPerson: ExemplaryPerson = {
      id: `manual_${Date.now()}`,
      title: manualForm.title.trim() || `Gương sáng: ${manualForm.fullName.trim()}`,
      fullName: manualForm.fullName.trim(),
      birthYear: Number(manualForm.birthYear) || 1980,
      gender: manualForm.gender,
      khuPho: manualForm.khuPho,
      role: manualForm.role.trim() || 'Quần chúng nhân dân',
      unit: manualForm.unit.trim() || `Khu phố ${manualForm.khuPho}, Phường Thủ Dầu Một`,
      theme: manualForm.theme,
      themeLabel:
        manualForm.theme === 'AN_SINH_XA_HOI'
          ? 'Mô hình an sinh xã hội'
          : manualForm.theme === 'HOC_TAP_LAM_THEO_BAC'
          ? 'Học tập & làm theo Bác'
          : 'Gương người tốt việc tốt',
      category: manualForm.category,
      categoryLabel:
        EXEMPLARY_CATEGORIES_CONFIG.find((c) => c.key === manualForm.category)?.label || 'Điển hình tiêu biểu',
      source: 'MANUAL_LOCAL',
      sourceLabel: 'Ban Tuyên giáo Phường ghi nhận thủ công',
      sourceUrl: manualForm.sourceUrl.trim() || undefined,
      recognitionDate: new Date().toISOString().slice(0, 10),
      periodLabel: `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      honorTitle: manualForm.honorTitle.trim() || 'Gương người tốt việc tốt Phường Thủ Dầu Một',
      goodDeedSummary: manualForm.goodDeedSummary.trim(),
      storyContent: manualForm.storyContent.trim(),
      communityImpact: manualForm.communityImpact.trim() || 'Góp phần xây dựng khu dân cư văn minh, nhân ái.',
      quoteOrMotto: manualForm.quoteOrMotto.trim() || 'Học Bác từ những việc làm giản dị mỗi ngày.',
      hcmLessonApplied: manualForm.hcmLessonApplied.trim() || 'Thực hiện chuẩn mực đạo đức cách mạng theo lời Bác dạy.',
      likesCount: 1,
      tags: manualForm.tags ? manualForm.tags.split(',').map((t) => t.trim()) : ['Ghi nhận thủ công', 'Phường Thủ Dầu Một'],
      isSyncedFromFanpage: false,
    };

    // Gọi API lưu vào SQLite backend
    try {
      await fetch('/api/hcm-space/fanpage-dat-thu/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerson),
      });
    } catch {}

    // Cập nhật State frontend & LocalStorage
    const updated = [newPerson, ...peopleList];
    setPeopleList(updated);
    try {
      const storedCustom = JSON.parse(localStorage.getItem('hcm_exemplary_people_custom') || '[]');
      localStorage.setItem('hcm_exemplary_people_custom', JSON.stringify([newPerson, ...storedCustom]));
    } catch {}

    setIsManualAddModalOpen(false);
    alert(`Đã cập nhật thành công gương sáng "${newPerson.fullName}" vào chuyên mục!`);
  };

  const handleToggleLike = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (likedIds.includes(id)) {
      updated = likedIds.filter((item) => item !== id);
    } else {
      updated = [...likedIds, id];
      // Gọi API like backend
      try {
        await fetch(`/api/hcm-space/fanpage-dat-thu/${id}/like`, { method: 'POST' });
      } catch {}
    }
    setLikedIds(updated);
    try {
      localStorage.setItem('hcm_exemplary_likes', JSON.stringify(updated));
    } catch {}

    setPeopleList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const delta = updated.includes(id) ? 1 : -1;
          return { ...p, likesCount: Math.max(0, p.likesCount + delta) };
        }
        return p;
      })
    );
  };

  // Xử lý phát giọng đọc câu chuyện AI
  const handleToggleVoice = (person: ExemplaryPerson) => {
    if (isSpeaking) {
      hcmVoiceService.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const speechText = `${person.themeLabel}: ${person.fullName}, ${person.role}, ${person.unit}. Danh hiệu: ${person.honorTitle}. Việc tốt: ${person.goodDeedSummary}. Lời tâm niệm: ${person.quoteOrMotto}. Bài học noi gương Bác: ${person.hcmLessonApplied}.`;
    hcmVoiceService.speak(
      speechText,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  // Bộ lọc dữ liệu đa chiều
  const filteredList = useMemo(() => {
    return peopleList.filter((item) => {
      const matchTheme = selectedTheme === 'ALL' || item.theme === selectedTheme;
      const matchSource = selectedSource === 'ALL' || item.source === selectedSource;
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchKp = selectedKhuPho === 'ALL' || item.khuPho === selectedKhuPho;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.fullName.toLowerCase().includes(q) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        item.role.toLowerCase().includes(q) ||
        item.honorTitle.toLowerCase().includes(q) ||
        item.goodDeedSummary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchTheme && matchSource && matchCat && matchKp && matchQuery;
    });
  }, [peopleList, selectedTheme, selectedSource, selectedCategory, selectedKhuPho, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-6 px-3 sm:px-6 lg:px-8 space-y-6 animate-in fade-in">
      {/* =========================================================================
          1. HEADER BANNER CHUYÊN ĐỀ GƯƠNG SÁNG TIÊU BIỂU
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-48 h-48 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-black tracking-wider uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CHUYÊN MỤC GƯƠNG SÁNG TIÊU BIỂU · PHƯỜNG THỦ DẦU MỘT</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight">
              Người Tốt Việc Tốt &amp; Mô Hình An Sinh Xã Hội
            </h1>

            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-medium">
              Tôn vinh các điển hình tiên tiến, mô hình an sinh xã hội nhân ái và gương sáng học tập, làm theo tư tưởng,
              đạo đức, phong cách Hồ Chí Minh trên địa bàn 5 Khu phố Phường Thủ Dầu Một từ mốc thành lập phường
              01/7/2025 đến nay.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-rose-100 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Giai đoạn 01/7/2025 — 2026</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-rose-100 font-bold">
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <span>5 Khu phố đồng lòng vì cộng đồng</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-rose-100 font-bold">
                <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Kết nối Fanpage "Đất Thủ Quê Hương Tôi"</span>
              </span>
            </div>
          </div>

          {/* Cụm nút tác vụ chính */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsManualAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-[#881337]" />
              <span>Cập Nhật Thủ Công Gương Sáng</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNominationModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>Nhân Dân Gửi Đề Cử</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THANH KẾT NỐI FANPAGE CHÍNH THỐNG "ĐẤT THỦ QUÊ HƯƠNG TÔI"
          ========================================================================= */}
      <section className="rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          {/* Logo / Huy hiệu Facebook Fanpage */}
          <div className="w-11 h-11 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
            f
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Kênh kết nối Fanpage chính thống:
              </span>
              <a
                href={FANPAGE_DAT_THU_INFO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 font-extrabold text-xs hover:bg-blue-200 transition-colors"
              >
                <span>{FANPAGE_DAT_THU_INFO.name}</span>
                <CheckCircle2 className="w-3 h-3 text-[#1877F2]" />
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <span className="text-[11px] text-slate-500 font-mono">({FANPAGE_DAT_THU_INFO.handle})</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tự động trích bài viết mới (Chu kỳ 30 phút)</span>
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-[11px] text-slate-500">
                Lần đồng bộ gần nhất: <strong className="text-slate-800">{lastSyncTime}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Nút hành động đồng bộ & mở Fanpage */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isSyncing
                ? 'bg-blue-200 text-blue-700 cursor-wait'
                : 'bg-[#1877F2] hover:bg-blue-600 text-white'
            }`}
            title="Đồng bộ ngay các bài viết mới từ Fanpage Đất Thủ Quê Hương Tôi"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Đang trích xuất...' : 'Đồng Bộ Ngay Từ Fanpage'}</span>
          </button>

          <a
            href={FANPAGE_DAT_THU_INFO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <span>Mở Fanpage</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </section>

      {/* Thông báo phản hồi đồng bộ (nếu có) */}
      {syncFeedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* =========================================================================
          3. THANH CÔNG CỤ TÌM KIẾM & BỘ LỌC CHUYÊN ĐỀ ĐA CHIỀU
          ========================================================================= */}
      <section className="rounded-2xl border border-rose-200/80 bg-white p-4 shadow-sm space-y-3.5">
        {/* Hàng 1: Ô tìm kiếm & Nguồn dữ liệu */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo họ tên gương sáng, mô hình an sinh, chức vụ, khu phố, từ khóa..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-rose-200 bg-rose-50/30 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Lọc theo Nguồn dữ liệu */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-blue-600" />
              <span>Nguồn:</span>
            </span>
            {EXEMPLARY_SOURCES_CONFIG.map((src) => (
              <button
                key={src.key}
                type="button"
                onClick={() => setSelectedSource(src.key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSource === src.key
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                }`}
              >
                {src.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hàng 2: Lọc theo Chủ đề (Người tốt việc tốt, Mô hình an sinh, Học tập làm theo Bác) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-rose-100 pt-2.5 scrollbar-none">
          <span className="text-xs font-black text-rose-900 whitespace-nowrap flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Chủ đề:</span>
          </span>
          {EXEMPLARY_THEMES_CONFIG.map((thm) => (
            <button
              key={thm.key}
              type="button"
              onClick={() => setSelectedTheme(thm.key)}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                selectedTheme === thm.key
                  ? 'bg-rose-800 text-white shadow-xs'
                  : 'bg-rose-50/80 text-rose-900 hover:bg-rose-100'
              }`}
            >
              {thm.label}
            </button>
          ))}
        </div>

        {/* Hàng 3: Lọc theo Địa bàn 5 Khu phố */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-rose-100 pt-2.5 scrollbar-none">
          <span className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1 mr-1">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Địa bàn:</span>
          </span>
          {['ALL', 'Khu phố 1', 'Khu phố 2', 'Khu phố 3', 'Khu phố 4', 'Khu phố 5'].map((kp) => (
            <button
              key={kp}
              type="button"
              onClick={() => setSelectedKhuPho(kp)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedKhuPho === kp
                  ? 'bg-rose-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {kp === 'ALL' ? 'Toàn phường' : kp}
            </button>
          ))}
        </div>

        {/* Hàng 4: Lọc theo Khối đoàn thể / Đối tượng */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1 mr-1">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Đối tượng:</span>
          </span>
          {EXEMPLARY_CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                selectedCategory === cat.key
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. DANH SÁCH THẺ GƯƠNG SÁNG & MÔ HÌNH AN SINH
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-600" />
            <h2 className="text-base sm:text-lg font-serif font-black text-slate-900">
              Danh Sách Gương Sáng &amp; Mô Hình Tiêu Biểu ({filteredList.length})
            </h2>
          </div>
          <span className="text-xs text-slate-500 italic">
            Ghi nhận từ ngày 01/7/2025 đến nay
          </span>
        </div>

        {filteredList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-rose-300 bg-white p-12 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-rose-400 mx-auto" />
            <div className="text-sm font-bold text-slate-700">
              Không tìm thấy gương sáng hoặc mô hình nào phù hợp với bộ lọc hiện tại.
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTheme('ALL');
                setSelectedSource('ALL');
                setSelectedCategory('ALL');
                setSelectedKhuPho('ALL');
              }}
              className="text-xs font-bold text-rose-700 underline cursor-pointer"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredList.map((person) => {
              const isLiked = likedIds.includes(person.id);

              return (
                <div
                  key={person.id}
                  onClick={() => setActiveStory(person)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-rose-200/90 bg-white p-4 shadow-sm hover:shadow-md hover:border-rose-400 transition-all cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    {/* Header Thẻ: Huy hiệu Nguồn & Chủ đề */}
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      {/* Huy hiệu Nguồn */}
                      {person.source === 'FANPAGE_DAT_THU' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 text-[10px] font-black border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]" />
                          <span>Fanpage Đất Thủ</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 text-[10px] font-black border border-rose-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-rose-700" />
                          <span>Ghi nhận Phường</span>
                        </span>
                      )}

                      {/* Huy hiệu Chủ đề */}
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900">
                        {person.themeLabel}
                      </span>
                    </div>

                    {/* Họ tên & Khu phố */}
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar ký hiệu chữ cái đầu */}
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#881337] to-[#BE123C] text-white flex items-center justify-center font-serif font-black text-base shadow-sm shrink-0">
                          {person.fullName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-serif text-sm font-black text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-1">
                            {person.fullName}
                          </h3>
                          <div className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-600" />
                            <span>{person.khuPho}</span>
                          </div>
                        </div>
                      </div>

                      {/* Nút Tri ân (Like) */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(person.id, e)}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                          isLiked
                            ? 'bg-rose-100 border-rose-300 text-rose-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                        title="Bày tỏ tri ân tấm gương người tốt việc tốt"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Danh hiệu biểu dương */}
                    <div className="p-2 rounded-xl bg-rose-50/80 border border-rose-200/80 text-[11px] font-bold text-rose-900 flex items-start gap-1.5 leading-snug">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{person.honorTitle}</span>
                    </div>

                    {/* Vai trò / Đơn vị */}
                    <div className="text-[11px] text-slate-600 font-medium line-clamp-1">
                      <span>{person.role}</span>
                    </div>

                    {/* Việc tốt tóm tắt */}
                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                      {person.goodDeedSummary}
                    </p>

                    {/* Câu nói / Tâm niệm */}
                    <div className="p-2 rounded-xl bg-amber-50/80 border-l-3 border-amber-500 text-[11px] italic font-serif text-slate-800 leading-normal line-clamp-2">
                      “{person.quoteOrMotto}”
                    </div>
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="pt-2.5 mt-3 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-rose-600" />
                      <span>{person.periodLabel}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 font-bold text-rose-800 group-hover:translate-x-1 transition-transform">
                      <span>Đọc câu chuyện</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          5. MODAL XEM CHI TIẾT CÂU CHUYỆN GƯƠNG SÁNG TIÊU BIỂU
          ========================================================================= */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => {
            setActiveStory(null);
            hcmVoiceService.stop();
            setIsSpeaking(false);
          }}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl border-2 border-rose-300 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] p-4 sm:p-5 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-wider text-rose-200 uppercase">
                    {activeStory.themeLabel} · PHƯỜNG THỦ DẦU MỘT
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {activeStory.fullName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleVoice(activeStory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                  title="Nghe đọc toàn văn câu chuyện gương sáng"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? 'Dừng đọc' : 'Nghe đọc'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStory(null);
                    hcmVoiceService.stop();
                    setIsSpeaking(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
              {/* Nguồn trích xuất */}
              <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]" />
                  <span className="text-xs font-bold text-slate-800">Nguồn thông tin:</span>
                  <span className="text-xs font-extrabold text-blue-900">{activeStory.sourceLabel}</span>
                </div>
                {activeStory.sourceUrl && (
                  <a
                    href={activeStory.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 underline"
                  >
                    <span>Xem bài gốc trên Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Thông tin hành chính & Danh hiệu */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Địa bàn</div>
                  <div className="font-extrabold text-rose-900">{activeStory.khuPho}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Đối tượng</div>
                  <div className="font-extrabold text-slate-800">{activeStory.categoryLabel}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Mốc ghi nhận</div>
                  <div className="font-extrabold text-slate-800">{activeStory.periodLabel}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Danh hiệu</div>
                  <div className="font-extrabold text-amber-800">{activeStory.honorTitle}</div>
                </div>
              </div>

              {/* Toàn văn câu chuyện */}
              <div className="space-y-2">
                <h4 className="font-serif font-black text-rose-950 text-sm sm:text-base flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-rose-600" />
                  <span>Câu chuyện việc tốt &amp; Hành động cụ thể:</span>
                </h4>
                <p className="text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                  {activeStory.storyContent}
                </p>
              </div>

              {/* Sức lan tỏa cộng đồng */}
              <div className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-200/60 space-y-1">
                <div className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sức lan tỏa trong nhân dân khu phố:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeStory.communityImpact}
                </p>
              </div>

              {/* Trích dẫn tâm niệm */}
              <div className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 space-y-1">
                <div className="text-[11px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  <span>Lời tâm niệm &amp; Phương châm sống:</span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-slate-900">
                  “{activeStory.quoteOrMotto}”
                </p>
              </div>

              {/* Bài học noi gương Bác */}
              <div className="p-3.5 rounded-2xl bg-rose-100/50 border border-rose-200 space-y-1">
                <div className="text-xs font-black text-rose-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bài học noi gương Bác:</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeStory.hcmLessonApplied}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {activeStory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Đảng bộ Phường Thủ Dầu Một · Không Gian Văn Hóa Hồ Chí Minh
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveStory(null);
                  hcmVoiceService.stop();
                  setIsSpeaking(false);
                }}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. MODAL CẬP NHẬT THỦ CÔNG GƯƠNG SÁNG & MÔ HÌNH AN SINH
          ========================================================================= */}
      {isManualAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsManualAddModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl border-2 border-rose-300 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] p-4 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    Cập Nhật Thủ Công Gương Người Tốt Việc Tốt &amp; Mô Hình An Sinh
                  </h3>
                  <div className="text-[11px] text-rose-200">
                    Dành cho Cán bộ Tuyên giáo, MTTQ &amp; Ban Điều hành các Khu phố Phường Thủ Dầu Một
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsManualAddModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleManualSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {/* Tiêu đề & Họ tên */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ tên nhân vật / Tên mô hình (*):</label>
                  <input
                    type="text"
                    required
                    value={manualForm.fullName}
                    onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                    placeholder="VD: Bà Nguyễn Thị Hoa / Bếp cơm thiện nguyện..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-rose-50/20 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Chủ đề (*):</label>
                  <select
                    value={manualForm.theme}
                    onChange={(e) => setManualForm({ ...manualForm, theme: e.target.value as ExemplaryTheme })}
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  >
                    <option value="NGUOI_TOT_VIEC_TOT">Gương người tốt việc tốt</option>
                    <option value="AN_SINH_XA_HOI">Mô hình an sinh xã hội</option>
                    <option value="HOC_TAP_LAM_THEO_BAC">Học tập &amp; làm theo Bác</option>
                  </select>
                </div>
              </div>

              {/* Địa bàn Khu phố & Khối đối tượng */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Địa bàn Khu phố (*):</label>
                  <select
                    value={manualForm.khuPho}
                    onChange={(e) => setManualForm({ ...manualForm, khuPho: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Khu phố 1">Khu phố 1</option>
                    <option value="Khu phố 2">Khu phố 2</option>
                    <option value="Khu phố 3">Khu phố 3</option>
                    <option value="Khu phố 4">Khu phố 4</option>
                    <option value="Khu phố 5">Khu phố 5</option>
                    <option value="Toàn phường">Toàn phường</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Khối đối tượng:</label>
                  <select
                    value={manualForm.category}
                    onChange={(e) => setManualForm({ ...manualForm, category: e.target.value as ExemplaryCategory })}
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  >
                    <option value="CAN_BO_DANG_VIEN">Cán bộ — Đảng viên</option>
                    <option value="THANH_NIEN">Đoàn viên — Thanh niên</option>
                    <option value="PHU_NU">Phụ nữ đảm đang</option>
                    <option value="CUU_CHIEN_BINH">Cựu chiến binh</option>
                    <option value="LUC_LUONG_VU_TRANG">Lực lượng vũ trang</option>
                    <option value="GIAO_DUC_Y_TE">Giáo dục &amp; Y tế</option>
                    <option value="QUAN_CHUNG_NHAN_DAN">Quần chúng nhân dân</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Năm sinh:</label>
                  <input
                    type="number"
                    value={manualForm.birthYear}
                    onChange={(e) => setManualForm({ ...manualForm, birthYear: parseInt(e.target.value) || 1980 })}
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Chức vụ & Danh hiệu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Chức vụ / Công việc đảm nhận:</label>
                  <input
                    type="text"
                    value={manualForm.role}
                    onChange={(e) => setManualForm({ ...manualForm, role: e.target.value })}
                    placeholder="VD: Tổ trưởng dân phố / Giáo viên..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Danh hiệu biểu dương:</label>
                  <input
                    type="text"
                    value={manualForm.honorTitle}
                    onChange={(e) => setManualForm({ ...manualForm, honorTitle: e.target.value })}
                    placeholder="VD: Gương Dân vận khéo tiêu biểu năm 2025..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Tóm tắt việc tốt */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tóm tắt việc tốt / Mô hình (1-2 câu) (*):</label>
                <textarea
                  required
                  rows={2}
                  value={manualForm.goodDeedSummary}
                  onChange={(e) => setManualForm({ ...manualForm, goodDeedSummary: e.target.value })}
                  placeholder="Mô tả súc tích hành động tốt hoặc kết quả đạt được..."
                  className="w-full p-2.5 rounded-xl border border-rose-200 bg-rose-50/20 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Toàn văn câu chuyện */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Toàn văn câu chuyện / Chi tiết mô hình (*):</label>
                <textarea
                  required
                  rows={4}
                  value={manualForm.storyContent}
                  onChange={(e) => setManualForm({ ...manualForm, storyContent: e.target.value })}
                  placeholder="Ghi lại chi tiết bối cảnh, quá trình thực hiện, đóng góp cụ thể từ 01/7/2025 đến nay..."
                  className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Tâm niệm & Bài học Bác dạy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lời tâm niệm / Phương châm sống:</label>
                  <input
                    type="text"
                    value={manualForm.quoteOrMotto}
                    onChange={(e) => setManualForm({ ...manualForm, quoteOrMotto: e.target.value })}
                    placeholder="VD: Học Bác lòng nhân ái, vì dân phục vụ..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bài học noi gương Bác:</label>
                  <input
                    type="text"
                    value={manualForm.hcmLessonApplied}
                    onChange={(e) => setManualForm({ ...manualForm, hcmLessonApplied: e.target.value })}
                    placeholder="VD: Chuẩn mực 144: Tận tụy, trung thực, vì nước vì dân..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Link tham khảo Fanpage / Báo chí */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Link bài viết tham khảo (Facebook / Báo chí):</label>
                <input
                  type="url"
                  value={manualForm.sourceUrl}
                  onChange={(e) => setManualForm({ ...manualForm, sourceUrl: e.target.value })}
                  placeholder="https://www.facebook.com/datthuquehuongtoi/posts/..."
                  className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Nút Submit */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsManualAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-600 hover:to-rose-700 text-white font-black shadow-md cursor-pointer"
                >
                  Lưu &amp; Công Bố Gương Sáng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          7. MODAL NHÂN DÂN GỬI ĐỀ CỬ GƯƠNG SÁNG VỀ PHƯỜNG
          ========================================================================= */}
      {isNominationModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsNominationModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-rose-300 shadow-2xl overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#881337] to-[#BE123C] p-4 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif text-base sm:text-lg font-bold">
                  Gửi Đề Cử Gương Người Tốt Việc Tốt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNominationModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Ban Tuyên giáo & MTTQ Phường Thủ Dầu Một đã tiếp nhận thông tin đề cử! Xin trân trọng cảm ơn đóng góp của quý bà con nhân dân.');
                setIsNominationModalOpen(false);
              }}
              className="p-5 space-y-3.5 text-xs"
            >
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 leading-relaxed">
                Mỗi việc làm tốt, mỗi tấm lòng thơm thảo đều xứng đáng được lan tỏa. Thông tin đề cử của bà con sẽ được
                Ban Tuyên giáo và MTTQ Phường xác minh, tuyên dương và biểu dương trên Không gian văn hóa Hồ Chí Minh.
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Họ và tên cá nhân / tập thể được đề cử (*):</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ và tên..."
                  className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Thuộc Khu phố (*):</label>
                  <select className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500">
                    <option>Khu phố 1</option>
                    <option>Khu phố 2</option>
                    <option>Khu phố 3</option>
                    <option>Khu phố 4</option>
                    <option>Khu phố 5</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Địa chỉ / Nơi công tác:</label>
                  <input
                    type="text"
                    placeholder="VD: Đường Bạch Đằng..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Hành động tốt / Việc làm nghĩa tình cụ thể (*):</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Mô tả cụ thể hành động tốt diễn ra từ 01/7/2025 đến nay..."
                  className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ tên người gửi đề cử:</label>
                  <input
                    type="text"
                    placeholder="Họ tên của bạn..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Số điện thoại liên hệ:</label>
                  <input
                    type="tel"
                    placeholder="Số điện thoại..."
                    className="w-full p-2.5 rounded-xl border border-rose-200 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNominationModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-md cursor-pointer"
                >
                  Gửi Đề Cử Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
