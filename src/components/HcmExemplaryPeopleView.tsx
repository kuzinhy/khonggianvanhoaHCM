import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
import {
  EXEMPLARY_PEOPLE_LIST,
  EXEMPLARY_CATEGORIES_CONFIG,
  type ExemplaryPerson,
  type ExemplaryCategory,
} from '../data/hcmExemplaryPeopleData';
import { hcmVoiceService } from '../services/hcmVoiceService';

interface HcmExemplaryPeopleViewProps {
  onBackToFoyer?: () => void;
}

export const HcmExemplaryPeopleView: React.FC<HcmExemplaryPeopleViewProps> = ({
  onBackToFoyer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExemplaryCategory | 'ALL'>('ALL');
  const [selectedKhuPho, setSelectedKhuPho] = useState<string>('ALL');
  const [activeStory, setActiveStory] = useState<ExemplaryPerson | null>(null);
  const [isNominationModalOpen, setIsNominationModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Lưu trạng thái bày tỏ tri ân (Likes) vào LocalStorage
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('hcm_exemplary_likes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (likedIds.includes(id)) {
      updated = likedIds.filter((item) => item !== id);
    } else {
      updated = [...likedIds, id];
    }
    setLikedIds(updated);
    try {
      localStorage.setItem('hcm_exemplary_likes', JSON.stringify(updated));
    } catch {}
  };

  // Xử lý phát giọng đọc câu chuyện
  const handleToggleVoice = (person: ExemplaryPerson) => {
    if (isSpeaking) {
      hcmVoiceService.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const speechText = `Gương sáng tiêu biểu Phường Thủ Dầu Một: ${person.fullName}, sinh năm ${person.birthYear}, ${person.role}, thuộc ${person.khuPho}. Danh hiệu: ${person.honorTitle}. Việc tốt tiêu biểu: ${person.goodDeedSummary}. Lời tâm niệm: ${person.quoteOrMotto}. Bài học học tập lời Bác dạy: ${person.hcmLessonApplied}.`;
    hcmVoiceService.speak(
      speechText,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  // Bộ lọc dữ liệu
  const filteredList = useMemo(() => {
    return EXEMPLARY_PEOPLE_LIST.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchKp = selectedKhuPho === 'ALL' || item.khuPho === selectedKhuPho;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.fullName.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.goodDeedSummary.toLowerCase().includes(q) ||
        item.honorTitle.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchKp && matchQuery;
    });
  }, [selectedCategory, selectedKhuPho, searchQuery]);

  // Form đề cử người tốt việc tốt
  const [nominationForm, setNominationForm] = useState({
    nomineeName: '',
    nomineeKhuPho: 'Khu phố 1',
    nomineeAddress: '',
    goodDeedAction: '',
    nominatorName: '',
    nominatorPhone: '',
  });
  const [nominationSubmitted, setNominationSubmitted] = useState(false);

  const handleNominationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominationForm.nomineeName.trim() || !nominationForm.goodDeedAction.trim()) return;
    setNominationSubmitted(true);
    setTimeout(() => {
      setNominationSubmitted(false);
      setIsNominationModalOpen(false);
      setNominationForm({
        nomineeName: '',
        nomineeKhuPho: 'Khu phố 1',
        nomineeAddress: '',
        goodDeedAction: '',
        nominatorName: '',
        nominatorPhone: '',
      });
    }, 2500);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in select-none">
      {/* =========================================================================
          1. HEADER BANNER CHUYÊN ĐỀ TRANG TRỌNG (HỒNG PHA ĐỎ & TRẮNG TƯƠI SÁNG)
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white p-6 sm:p-8 border-2 border-rose-300 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {onBackToFoyer && (
                <button
                  type="button"
                  onClick={onBackToFoyer}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Về Trang chủ</span>
                </button>
              )}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-200 text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span>CHUYÊN MỤC GƯƠNG SÁNG TIÊU BIỂU</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/50 text-emerald-200 text-[11px] font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Từ khi thành lập phường 01/7/2025 đến nay</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide leading-tight">
              Gương Sáng Tiêu Biểu &amp; Người Tốt Việc Tốt
            </h1>

            <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-sans">
              Tôn vinh những tấm gương bình dị mà cao quý, những nghĩa cử đẹp của cán bộ, đảng viên, chiến sĩ lực lượng vũ trang và nhân dân Phường Thủ Dầu Một trong học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-rose-100/90 font-medium">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <span>{EXEMPLARY_PEOPLE_LIST.length} Tấm gương được ghi danh</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Lan tỏa khắp 5 Khu phố</span>
              </span>
            </div>
          </div>

          {/* Nút tác vụ đề cử gương sáng */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsNominationModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4 text-[#881337]" />
              <span>Gửi Đề Cử Gương Sáng</span>
            </button>
            <div className="text-center text-[11px] text-rose-200/80 italic">
              Ban Tuyên giáo &amp; MTTQ Phường tiếp nhận
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THANH CÔNG CỤ TÌM KIẾM & BỘ LỌC CHUYÊN ĐỀ
          ========================================================================= */}
      <section className="rounded-2xl border border-rose-200/80 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo họ tên gương sáng, hành động tốt, chức vụ, khu phố..."
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

          {/* Lọc theo Khu phố */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap flex items-center gap-1">
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
                    : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
                }`}
              >
                {kp === 'ALL' ? 'Toàn phường' : kp}
              </button>
            ))}
          </div>
        </div>

        {/* Lọc theo Danh mục chuyên đề (Horizontal Tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar pt-1 border-t border-rose-100">
          {EXEMPLARY_CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-rose-700 to-[#881337] text-white shadow-xs ring-2 ring-rose-200'
                  : 'bg-white border border-rose-200/80 text-slate-700 hover:bg-rose-50/70 hover:border-rose-400'
              }`}
            >
              <span>{cat.label}</span>
              {cat.key === 'ALL' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                  {EXEMPLARY_PEOPLE_LIST.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. LƯỚI DANH SÁCH CÁC GƯƠNG SÁNG TIÊU BIỂU (EXEMPLARY CARDS GRID)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span>
            Hiển thị <strong>{filteredList.length}</strong> gương người tốt việc tốt
          </span>
          <span className="italic text-rose-800">
            Biểu dương thường xuyên · Định kỳ bình xét hàng tháng
          </span>
        </div>

        {filteredList.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-rose-200 space-y-3">
            <Users className="w-12 h-12 text-rose-300 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-slate-800">
              Không tìm thấy gương sáng phù hợp
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Vui lòng thử tìm kiếm với từ khóa khác hoặc bấm chọn xem &ldquo;Tất cả gương sáng&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredList.map((person) => {
              const isLiked = likedIds.includes(person.id);
              return (
                <div
                  key={person.id}
                  onClick={() => setActiveStory(person)}
                  className="group relative bg-white rounded-2xl border border-rose-200/80 hover:border-rose-400 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1"
                >
                  {/* Top Corner Ribbon / Badge */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Avatar / Placeholder Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 border-2 border-rose-300 flex items-center justify-center font-serif font-black text-rose-800 text-base shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                          {person.fullName.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-rose-700 transition-colors">
                            {person.fullName}
                          </h3>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span>Sinh năm {person.birthYear}</span>
                            <span>•</span>
                            <span className="font-semibold text-rose-800">{person.khuPho}</span>
                          </div>
                        </div>
                      </div>

                      {/* Nút Tri ân (Like) */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(person.id, e)}
                        className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                          isLiked
                            ? 'bg-rose-50 border-rose-300 text-rose-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                        title={isLiked ? 'Đã bày tỏ tri ân' : 'Bày tỏ tri ân'}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Danh hiệu biểu dương */}
                    <div className="p-2 rounded-xl bg-rose-50/80 border border-rose-200/80 text-[11.5px] font-bold text-rose-900 flex items-start gap-1.5 leading-snug">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{person.honorTitle}</span>
                    </div>

                    {/* Vai trò / Đơn vị */}
                    <div className="text-xs text-slate-600 font-medium flex items-center gap-1">
                      <span>{person.role}</span>
                    </div>

                    {/* Việc tốt tóm tắt */}
                    <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                      {person.goodDeedSummary}
                    </p>

                    {/* Câu nói / Tâm niệm */}
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border-l-3 border-amber-500 text-[11.5px] italic font-serif text-slate-800 leading-normal line-clamp-2">
                      “{person.quoteOrMotto}”
                    </div>
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="pt-3 mt-3 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
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
          4. MODAL CHI TIẾT CÂU CHUYỆN GƯƠNG SÁNG TIÊU BIỂU
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
                    GƯƠNG NGƯỜI TỐT VIỆC TỐT PHƯỜNG THỦ DẦU MỘT
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
                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-400 text-slate-900 animate-pulse'
                      : 'bg-white/15 hover:bg-white/25 text-white'
                  }`}
                  title="Nghe thuyết minh câu chuyện"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isSpeaking ? 'Dừng đọc' : 'Nghe đọc'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStory(null);
                    hcmVoiceService.stop();
                    setIsSpeaking(false);
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Đóng cửa sổ"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 custom-scrollbar">
              {/* Thông tin nhân vật */}
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800">Chức vụ / Công tác: </span>
                  <span className="text-slate-600">{activeStory.role} — {activeStory.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-700 text-white font-bold text-[11px]">
                    {activeStory.khuPho}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px]">
                    {activeStory.periodLabel}
                  </span>
                </div>
              </div>

              {/* Danh hiệu biểu dương */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200 text-xs sm:text-sm font-bold text-rose-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{activeStory.honorTitle}</span>
              </div>

              {/* Toàn văn câu chuyện */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-rose-700" />
                  <span>Câu chuyện việc tốt &amp; Hành động cụ thể:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans text-justify">
                  {activeStory.storyContent}
                </p>
              </div>

              {/* Sức lan tỏa cộng đồng */}
              <div className="p-3.5 rounded-2xl bg-white border border-rose-200 space-y-1.5">
                <div className="font-bold text-xs text-rose-800 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sức lan tỏa trong nhân dân khu phố:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeStory.communityImpact}
                </p>
              </div>

              {/* Lời Bác dạy & Tâm niệm */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                <div className="font-serif italic text-xs sm:text-sm text-slate-900 border-l-2 border-amber-500 pl-3">
                  “{activeStory.quoteOrMotto}”
                </div>
                <div className="text-[11px] text-rose-900 font-semibold pt-1 border-t border-amber-200/60">
                  📌 <strong>Bài học noi gương Bác:</strong> {activeStory.hcmLessonApplied}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-rose-100 bg-rose-50/30 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-500 text-[11px]">
                Ban Tuyên giáo Đảng ủy Phường Thủ Dầu Một tuyên dương
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveStory(null);
                  hcmVoiceService.stop();
                  setIsSpeaking(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. MODAL ĐỀ CỬ GƯƠNG SÁNG TIÊU BIỂU CỦA NHÂN DÂN
          ========================================================================= */}
      {isNominationModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsNominationModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-rose-300 shadow-2xl p-5 sm:p-7 space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-rose-700" />
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  Gửi Đề Cử Gương Người Tốt Việc Tốt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNominationModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {nominationSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  Gửi Đề Cử Thành Công!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Cảm ơn sự đóng góp quý báu của bạn. Ban Tuyên giáo &amp; Ủy ban MTTQ Phường Thủ Dầu Một sẽ tiến hành xác minh và bình xét tuyên dương.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNominationSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Họ và tên người được đề cử (*):</label>
                  <input
                    type="text"
                    required
                    value={nominationForm.nomineeName}
                    onChange={(e) =>
                      setNominationForm({ ...nominationForm, nomineeName: e.target.value })
                    }
                    placeholder="Ví dụ: Ông Nguyễn Văn A"
                    className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Thuộc địa bàn (*):</label>
                    <select
                      value={nominationForm.nomineeKhuPho}
                      onChange={(e) =>
                        setNominationForm({ ...nominationForm, nomineeKhuPho: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500 bg-white"
                    >
                      <option value="Khu phố 1">Khu phố 1</option>
                      <option value="Khu phố 2">Khu phố 2</option>
                      <option value="Khu phố 3">Khu phố 3</option>
                      <option value="Khu phố 4">Khu phố 4</option>
                      <option value="Khu phố 5">Khu phố 5</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Địa chỉ cụ thể:</label>
                    <input
                      type="text"
                      value={nominationForm.nomineeAddress}
                      onChange={(e) =>
                        setNominationForm({ ...nominationForm, nomineeAddress: e.target.value })
                      }
                      placeholder="Số nhà, tuyến đường..."
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mô tả hành động, việc tốt tiêu biểu (*):</label>
                  <textarea
                    required
                    rows={3}
                    value={nominationForm.goodDeedAction}
                    onChange={(e) =>
                      setNominationForm({ ...nominationForm, goodDeedAction: e.target.value })
                    }
                    placeholder="Mô tả cụ thể việc làm tốt, thành tích, đóng góp cho cộng đồng từ tháng 7/2025 đến nay..."
                    className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-rose-100">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Người giới thiệu:</label>
                    <input
                      type="text"
                      value={nominationForm.nominatorName}
                      onChange={(e) =>
                        setNominationForm({ ...nominationForm, nominatorName: e.target.value })
                      }
                      placeholder="Họ tên của bạn"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Số điện thoại liên hệ:</label>
                    <input
                      type="text"
                      value={nominationForm.nominatorPhone}
                      onChange={(e) =>
                        setNominationForm({ ...nominationForm, nominatorPhone: e.target.value })
                      }
                      placeholder="Số điện thoại"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNominationModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-[#881337] text-white font-bold hover:brightness-110 shadow-md cursor-pointer"
                  >
                    Gửi đề cử
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
