import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Users,
  Briefcase,
  Sparkles,
  Heart,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Share2,
  ChevronRight,
  ArrowLeft,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  GENERAL_STORIES,
  STORY_PILLAR_INFO,
  type GeneralStoryItem,
  type StoryPillar,
  type StoryAudience,
} from '../data/hcmGeneralStoriesData';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmGeneralStoriesViewProps {
  onBackToFoyer?: () => void;
  onSelectStoryId?: string;
}

export const HcmGeneralStoriesView: React.FC<HcmGeneralStoriesViewProps> = ({
  onBackToFoyer,
  onSelectStoryId,
}) => {
  const [selectedStory, setSelectedStory] = useState<GeneralStoryItem>(() => {
    if (onSelectStoryId) {
      const found = GENERAL_STORIES.find((s) => s.id === onSelectStoryId);
      if (found) return found;
    }
    return GENERAL_STORIES[0];
  });

  const [pillarFilter, setPillarFilter] = useState<'ALL' | StoryPillar>('ALL');
  const [audienceFilter, setAudienceFilter] = useState<StoryAudience>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isReadingStory, setIsReadingStory] = useState(false);
  const [activeAudienceTab, setActiveAudienceTab] = useState<'CADRE' | 'YOUTH' | 'CITIZEN'>('CADRE');

  // Lọc danh sách mẩu chuyện
  const filteredStories = GENERAL_STORIES.filter((story) => {
    if (pillarFilter !== 'ALL' && story.pillar !== pillarFilter) {
      return false;
    }
    if (audienceFilter !== 'ALL' && !story.targetAudiences.includes(audienceFilter)) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(term);
      const matchContent = story.content.toLowerCase().includes(term);
      const matchLocation = story.location.toLowerCase().includes(term);
      const matchQuote = story.goldenQuote.toLowerCase().includes(term);
      if (!matchTitle && !matchContent && !matchLocation && !matchQuote) {
        return false;
      }
    }
    return true;
  });

  // Trình đọc giọng nói Web Speech TTS
  const handleToggleReadStory = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert('Trình duyệt của bạn chưa hỗ trợ giọng đọc Web Speech API.');
      return;
    }

    if (isReadingStory) {
      window.speechSynthesis.cancel();
      setIsReadingStory(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${selectedStory.title}. ${selectedStory.subtitle}. Chi tiết vàng của Bác: ${selectedStory.goldenQuote}. Nội dung câu chuyện: ${selectedStory.content}. Bài học rút ra: ${selectedStory.mainLesson}. Vận dụng cho cán bộ: ${selectedStory.applicationForCadre}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.includes('vi') || v.lang.includes('VIE'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setIsReadingStory(false);
    utterance.onerror = () => setIsReadingStory(false);

    hcmSfx.playClick(750);
    window.speechSynthesis.speak(utterance);
    setIsReadingStory(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsReadingStory(false);
    }
  }, [selectedStory.id]);

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Nút quay lại trang chủ & Đường dẫn */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            hcmSfx.playClick(600);
            onBackToFoyer?.();
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-rose-200 bg-white text-slate-700 hover:text-[#881337] hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-rose-700" />
          <span>Về Sảnh Trung Tâm</span>
        </button>

        <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
          <span>Không Gian Văn Hóa Hồ Chí Minh</span>
          <span>/</span>
          <span className="text-[#881337] font-bold">120 Mẩu Chuyện Học Bác</span>
        </div>
      </div>

      {/* Banner Giới thiệu Chuyên đề Học Tập Bác */}
      <div className="rounded-3xl bg-gradient-to-r from-[#751D2C] via-[#881337] to-[#9F1239] text-white p-6 sm:p-8 shadow-xl border border-rose-300/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs">
            <span>📖 Chuyên Đề Học Tập &amp; Làm Theo Bác</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white tracking-tight">
            120 Mẩu Chuyện Kể Về Bác Ngắn, Hay &amp; Ý Nghĩa Nhất
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-sans">
            Tư liệu chính thống được tổng hợp từ Trung tâm Công tác Xã hội TP.HCM (congtacxahoihcm.vn), Viện Lịch sử Đảng và Bảo tàng Hồ Chí Minh. Các câu chuyện giản dị nhưng sâu sắc, gắn liền với việc tu dưỡng đạo đức cách mạng, thực hiện Quy định 144-QĐ/TW của Bộ Chính trị.
          </p>
        </div>
      </div>

      {/* Bộ lọc thông minh 2 tầng */}
      <div className="rounded-2xl bg-white border border-rose-200/90 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Tầng 1: Lọc theo 4 Trụ Cột Đạo Đức */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-rose-700" />
            <span>Chủ đề học tập và làm theo Bác:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                hcmSfx.playClick(600);
                setPillarFilter('ALL');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                pillarFilter === 'ALL'
                  ? 'bg-[#881337] text-white border-[#881337] shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50'
              }`}
            >
              Tất cả chủ đề
            </button>
            {(Object.keys(STORY_PILLAR_INFO) as StoryPillar[]).map((pKey) => {
              const info = STORY_PILLAR_INFO[pKey];
              const active = pillarFilter === pKey;
              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(600);
                    setPillarFilter(pKey);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                    active
                      ? 'bg-[#881337] text-white border-[#881337] shadow-xs'
                      : `bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50`
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{info.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tầng 2: Lọc theo Đối tượng người đọc & Ô tìm kiếm */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 mr-1">Đối tượng:</span>
            {[
              { id: 'ALL', label: 'Mọi đối tượng', icon: '👥' },
              { id: 'CADRE', label: 'Cán bộ, Đảng viên (QĐ 144)', icon: '💼' },
              { id: 'YOUTH', label: 'Đoàn viên, Thanh niên', icon: '🌟' },
              { id: 'CITIZEN', label: 'Nhân dân & Người lao động', icon: '🏡' },
            ].map((aud) => {
              const active = audienceFilter === aud.id;
              return (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(500);
                    setAudienceFilter(aud.id as any);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-black shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{aud.icon}</span>
                  <span>{aud.label}</span>
                </button>
              );
            })}
          </div>

          {/* Ô tìm kiếm từ khóa */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tiêu đề, địa danh, lời dặn..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200/50 bg-slate-50/50"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Khối Lưới 2 Cột: Danh Sách Trái & Toàn Văn Chi Tiết Phải */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cột 1: Danh sách các mẩu chuyện (col-span-4) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-rose-700" />
              <span>Danh Mục Chuyện Kể</span>
            </span>
            <span className="text-[11px] text-rose-800 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              {filteredStories.length} câu chuyện
            </span>
          </div>

          <div className="space-y-2 max-h-[760px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredStories.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-2">
                <span className="text-3xl">🔍</span>
                <p className="text-xs text-slate-500 font-medium">
                  Không tìm thấy câu chuyện nào phù hợp với bộ lọc hiện tại.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPillarFilter('ALL');
                    setAudienceFilter('ALL');
                    setSearchTerm('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer hover:bg-amber-500"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              filteredStories.map((story) => {
                const active = selectedStory.id === story.id;
                const pillarInfo = STORY_PILLAR_INFO[story.pillar];
                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      hcmSfx.playPageTurn();
                      setSelectedStory(story);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      active
                        ? 'border-rose-600 bg-rose-50/70 shadow-md ring-2 ring-rose-300/50 -translate-y-0.5'
                        : 'border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1">
                        <span>{pillarInfo.icon}</span>
                        <span className="line-clamp-1">{story.pillarTitle}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {story.readingTime}
                      </span>
                    </div>

                    <h4 className="font-serif font-black text-sm sm:text-[14.5px] text-slate-900 leading-snug pt-1">
                      {story.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-1 pt-1 italic">
                      {story.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2 text-[10px] text-slate-500">
                      <span className="font-semibold text-rose-900">{story.yearPeriod.split('•')[0].trim()}</span>
                      <span className="text-slate-400">{story.location}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Cột 2: Không gian chiêm nghiệm và đọc truyện (col-span-8) */}
        <div className="lg:col-span-8 rounded-3xl border border-rose-200 bg-white p-6 sm:p-8 shadow-lg space-y-6">
          {/* Header Chi tiết câu chuyện */}
          <div className="border-b border-slate-100 pb-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`text-[10.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${STORY_PILLAR_INFO[selectedStory.pillar].badgeCls}`}>
                {STORY_PILLAR_INFO[selectedStory.pillar].icon} {selectedStory.pillarTitle}
              </span>

              {/* Điều khiển: Cỡ chữ & Giọng đọc */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setFontSize('sm')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${fontSize === 'sm' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
                    title="Chữ nhỏ"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('base')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${fontSize === 'base' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
                    title="Chữ vừa"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('lg')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${fontSize === 'lg' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
                    title="Chữ to"
                  >
                    A+
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleToggleReadStory}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer ${
                    isReadingStory
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold'
                  }`}
                >
                  {isReadingStory ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Dừng đọc</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>🔊 Nghe đọc chuyện</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 leading-tight">
                {selectedStory.title}
              </h2>
              <p className="text-sm font-semibold text-rose-800 mt-1">
                {selectedStory.subtitle}
              </p>
            </div>

            {/* Bối cảnh lịch sử & Nguồn trích dẫn chính thống */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#881337]">🏛️ Bối cảnh:</span>
                <span className="text-slate-800 font-semibold">{selectedStory.yearPeriod} • {selectedStory.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-amber-900">📜 Nguồn tư liệu:</span>
                <span className="text-slate-700 font-medium">{selectedStory.witnessOrSource}</span>
              </div>
            </div>
          </div>

          {/* Khung Chi tiết vàng của Bác (The Golden Moment) */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-br from-amber-50 via-rose-50/60 to-amber-100/40 border-2 border-amber-300 shadow-xs">
            <Quote className="w-8 h-8 text-amber-400/30 absolute top-2 left-2 rotate-180" />
            <div className="relative z-10 pl-6 space-y-1.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Chi Tiết Vàng &amp; Lời Bác Dặn</span>
              </div>
              <p className="text-base sm:text-lg font-serif italic font-bold text-slate-900 leading-relaxed">
                "{selectedStory.goldenQuote}"
              </p>
            </div>
          </div>

          {/* Toàn văn câu chuyện */}
          <div
            className={`text-slate-800 leading-relaxed whitespace-pre-line font-serif bg-slate-50/50 p-6 rounded-2xl border border-slate-200/80 transition-all ${
              fontSize === 'sm'
                ? 'text-xs sm:text-[13px] leading-6'
                : fontSize === 'lg'
                ? 'text-base sm:text-lg leading-8'
                : 'text-sm sm:text-[15.5px] leading-7'
            }`}
          >
            {selectedStory.content
              .split(/\r?\n|\\n/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((para, idx) => (
                <p key={idx} className="mb-3.5 text-justify indent-6 last:mb-0">
                  {para}
                </p>
              ))}
          </div>

          {/* Bài học cốt lõi */}
          <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-1.5 shadow-xs">
            <span className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Ý nghĩa cốt lõi &amp; Bài học đạo đức
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
              {selectedStory.mainLesson}
            </p>
          </div>

          {/* Khung Vận dụng thực tế cho từng đối tượng (3 Tabs chuyên biệt) */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/30 p-5 space-y-3.5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-2.5">
              <span className="text-xs font-black uppercase text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-700" />
                <span>Vận dụng thực tiễn vào đời sống &amp; công tác:</span>
              </span>

              {/* 3 Nút chọn đối tượng */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-amber-300 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveAudienceTab('CADRE')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeAudienceTab === 'CADRE'
                      ? 'bg-rose-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  💼 Cán bộ (QĐ 144)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAudienceTab('YOUTH')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeAudienceTab === 'YOUTH'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🌟 Thanh niên
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAudienceTab('CITIZEN')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeAudienceTab === 'CITIZEN'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🏡 Nhân dân
                </button>
              </div>
            </div>

            {/* Nội dung vận dụng theo tab */}
            <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans animate-in fade-in">
              {activeAudienceTab === 'CADRE' && (
                <div className="space-y-1.5">
                  <div className="font-black text-[#881337] flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-rose-700" />
                    <span>Bài học đối với Cán bộ, Đảng viên, Công chức (Theo Quy định 144-QĐ/TW):</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{selectedStory.applicationForCadre}</p>
                </div>
              )}

              {activeAudienceTab === 'YOUTH' && (
                <div className="space-y-1.5">
                  <div className="font-black text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-700" />
                    <span>Bài học đối với Đoàn viên, Thanh niên, Học sinh - Sinh viên:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{selectedStory.applicationForYouth}</p>
                </div>
              )}

              {activeAudienceTab === 'CITIZEN' && (
                <div className="space-y-1.5">
                  <div className="font-black text-amber-950 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-amber-700" />
                    <span>Bài học đối với Nhân dân và Người lao động:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{selectedStory.applicationForCitizen}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
