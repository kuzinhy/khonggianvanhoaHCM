import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  BookOpen,
  Users,
  Sparkles,
  Award,
  Smile,
  Music,
  MapPin,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Share2,
  ExternalLink,
  ChevronRight,
  Play,
  Pause,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  Flag,
  HelpCircle,
  Clock,
  Star,
  Quote,
  Palette,
  Mail,
  Send,
  Download,
  School,
  CheckSquare,
  Square,
  Trophy,
  RotateCcw,
  Search,
  Filter,
  Bookmark,
  Check,
} from 'lucide-react';
import {
  FIVE_TEACHINGS_DATA,
  UNCLE_HO_PHOTOS,
  HISTORICAL_SITES,
  MORAL_STORIES,
  CHILDREN_SONGS,
  KIDS_QUIZ_QUESTIONS,
  COLORING_PAGES,
  SCHOOL_BRIGADES,
  SCHOOL_ARTWORKS,
  type FiveTeachingsItem,
  type UncleHoPhotoItem,
  type HistoricalSiteItem,
  type MoralStoryItem,
  type ChildrenSongItem,
} from '../data/hcmKidsSpaceData';
import { hcmSfx } from '../services/hcmSoundEffects';

interface HcmKidsSpaceViewProps {
  onBackToFoyer?: () => void;
  onOpenMiniQuiz?: () => void;
}

interface GoodDeed {
  id: string;
  title: string;
  teachingNumber: string;
  date: string;
  studentName: string;
  className: string;
  school: string;
}

export const HcmKidsSpaceView: React.FC<HcmKidsSpaceViewProps> = ({
  onBackToFoyer,
}) => {
  // Navigation Sub-Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'WALL' | 'TEACHINGS' | 'STORIES' | 'SONGS' | 'QUIZ' | 'DIARY' | 'LETTER' | 'COLORING' | 'BRIGADES'
  >('WALL');

  // Wall presentation mode: 3D wooden twin or real authentic photo with hotspots
  const [wallMode, setWallMode] = useState<'3D_WALL' | 'REAL_PHOTO'>('3D_WALL');
  const [showCenterArtModal, setShowCenterArtModal] = useState(false);

  // Selected item states
  const [selectedTeaching, setSelectedTeaching] = useState<FiveTeachingsItem>(
    FIVE_TEACHINGS_DATA[0]
  );
  const [selectedPhoto, setSelectedPhoto] = useState<UncleHoPhotoItem | null>(null);
  const [selectedSite, setSelectedSite] = useState<HistoricalSiteItem | null>(null);
  const [selectedStory, setSelectedStory] = useState<MoralStoryItem>(MORAL_STORIES[0]);
  const [selectedSong, setSelectedSong] = useState<ChildrenSongItem>(CHILDREN_SONGS[0]);

  // Bộ lọc thông minh cho Tuyển tập 15 truyện kể chính thống
  const [storyTeachingFilter, setStoryTeachingFilter] = useState<'ALL' | 'DIEU_1' | 'DIEU_2' | 'DIEU_3' | 'DIEU_4' | 'DIEU_5'>('ALL');
  const [storyGradeFilter, setStoryGradeFilter] = useState<'ALL' | 'Lớp 1 – 3' | 'Lớp 4 – 5' | 'THCS'>('ALL');
  const [storySearchTerm, setStorySearchTerm] = useState('');
  const [storyFontSize, setStoryFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Trắc nghiệm tương tác đọc hiểu sau mỗi câu chuyện (Gamification Búp Sen Vàng)
  const [storyQuizSelection, setStoryQuizSelection] = useState<number | null>(null);
  const [storyQuizSubmitted, setStoryQuizSubmitted] = useState<boolean>(false);
  const [storyQuizFeedback, setStoryQuizFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);
  const [storyQuizCompletedMap, setStoryQuizCompletedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('hcm_kids_story_quiz_completed');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });
  const [lotusPoints, setLotusPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('hcm_kids_lotus_points');
      if (saved) return parseInt(saved, 10);
    } catch {}
    return 5; // Tặng ngay 5 Búp Sen Vàng khởi điểm cho bé
  });

  // Reset quiz selection khi chọn truyện khác
  useEffect(() => {
    setStoryQuizSelection(null);
    setStoryQuizSubmitted(false);
    setStoryQuizFeedback(null);
  }, [selectedStory.id]);

  const handleAnswerStoryQuiz = (optionIndex: number) => {
    if (storyQuizSubmitted || !selectedStory.interactiveQuiz) return;
    setStoryQuizSelection(optionIndex);
    setStoryQuizSubmitted(true);
    if (optionIndex === selectedStory.interactiveQuiz.correctAnswer) {
      hcmSfx.playSuccess();
      setStoryQuizFeedback('CORRECT');
      if (!storyQuizCompletedMap[selectedStory.id]) {
        const updatedMap = { ...storyQuizCompletedMap, [selectedStory.id]: true };
        setStoryQuizCompletedMap(updatedMap);
        const updatedPoints = lotusPoints + 1;
        setLotusPoints(updatedPoints);
        try {
          localStorage.setItem('hcm_kids_story_quiz_completed', JSON.stringify(updatedMap));
          localStorage.setItem('hcm_kids_lotus_points', updatedPoints.toString());
        } catch {}
      }
    } else {
      hcmSfx.playClick(400);
      setStoryQuizFeedback('WRONG');
    }
  };

  // Lọc 15 mẩu chuyện thông minh theo 5 Điều Bác dạy, cấp học và từ khóa tìm kiếm
  const filteredStories = MORAL_STORIES.filter((story) => {
    if (storyTeachingFilter !== 'ALL' && story.teachingGroup !== storyTeachingFilter) {
      return false;
    }
    if (storyGradeFilter !== 'ALL' && story.gradeCategory !== storyGradeFilter && story.gradeCategory !== 'Tất cả') {
      return false;
    }
    if (storySearchTerm.trim()) {
      const term = storySearchTerm.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(term);
      const matchContent = story.content.toLowerCase().includes(term);
      const matchLesson = story.lesson.toLowerCase().includes(term);
      const matchPeriod = story.historicalPeriod.toLowerCase().includes(term);
      if (!matchTitle && !matchContent && !matchLesson && !matchPeriod) {
        return false;
      }
    }
    return true;
  });

  // Audio / Story narration TTS state
  const [isReadingStory, setIsReadingStory] = useState(false);

  // Self-Evaluation Checklist for 5 Teachings (Persistent in localStorage)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('hcm_kids_checklist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      '01-0': true,
      '01-1': true,
      '02-0': true,
      '03-0': true,
      '04-0': true,
      '05-0': true,
    };
  });

  const toggleCheckItem = (key: string) => {
    hcmSfx.playClick(900);
    setCheckedItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('hcm_kids_checklist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Good Deeds Diary State
  const [goodDeeds, setGoodDeeds] = useState<GoodDeed[]>(() => {
    try {
      const saved = localStorage.getItem('hcm_kids_good_deeds');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: '1',
        title: 'Nhặt được 20.000 đồng rơi ở sân trường gửi trả thầy Tổng phụ trách',
        teachingNumber: '05',
        date: 'Hôm nay',
        studentName: 'Trần Bảo An',
        className: '4A2',
        school: 'TH Nguyễn Du',
      },
      {
        id: '2',
        title: 'Giúp mẹ quét nhà, rửa chén và gấp quần áo sau khi tan học',
        teachingNumber: '02',
        date: 'Hôm qua',
        studentName: 'Lê Minh Khang',
        className: '3C',
        school: 'TH Phú Cường',
      },
      {
        id: '3',
        title: 'Kèm bạn Nam học yếu môn Toán tiến bộ đạt điểm 9',
        teachingNumber: '03',
        date: '2 ngày trước',
        studentName: 'Nguyễn Hoàng Yến',
        className: '5B',
        school: 'TH Lê Hồng Phong',
      },
    ];
  });

  const [newDeedTitle, setNewDeedTitle] = useState('');
  const [newDeedTeaching, setNewDeedTeaching] = useState('01');
  const [newDeedStudent, setNewDeedStudent] = useState('');
  const [newDeedClass, setNewDeedClass] = useState('');
  const [newDeedSchool, setNewDeedSchool] = useState('TH Nguyễn Du');
  const [showDeedSuccess, setShowDeedSuccess] = useState(false);

  const handleSaveGoodDeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeedTitle.trim()) return;

    hcmSfx.playSuccess();
    const deed: GoodDeed = {
      id: Date.now().toString(),
      title: newDeedTitle.trim(),
      teachingNumber: newDeedTeaching,
      date: new Date().toLocaleDateString('vi-VN'),
      studentName: newDeedStudent.trim() || 'Học sinh Thủ Dầu Một',
      className: newDeedClass.trim() || 'Đội viên',
      school: newDeedSchool,
    };

    const updated = [deed, ...goodDeeds];
    setGoodDeeds(updated);
    try {
      localStorage.setItem('hcm_kids_good_deeds', JSON.stringify(updated));
    } catch {}

    setNewDeedTitle('');
    setShowDeedSuccess(true);
    setTimeout(() => setShowDeedSuccess(false), 3000);
  };

  const handleDeleteDeed = (id: string) => {
    hcmSfx.playClick(400);
    const updated = goodDeeds.filter((d) => d.id !== id);
    setGoodDeeds(updated);
    try {
      localStorage.setItem('hcm_kids_good_deeds', JSON.stringify(updated));
    } catch {}
  };

  // Web Speech API Narrator for Stories
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
    const textToRead = `${selectedStory.title}. ${selectedStory.lesson}. Chi tiết vàng của Bác: ${selectedStory.goldenQuote}. Nội dung câu chuyện: ${selectedStory.content}. Bài học rút ra cho chúng em: ${selectedStory.moralLesson}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9;
    utterance.pitch = 1.05;

    // Pick a Vietnamese voice if available
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
    // Cancel reading when switching stories or tabs
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsReadingStory(false);
    }
  }, [selectedStory.id, activeSubTab]);

  // Kids Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCertificateName, setQuizCertificateName] = useState('');
  const [quizCertificateClass, setQuizCertificateClass] = useState('');
  const [quizCertificateSchool, setQuizCertificateSchool] = useState('TH Nguyễn Du');
  const [quizScore, setQuizScore] = useState(0);

  const handleSelectQuizAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === KIDS_QUIZ_QUESTIONS[quizIndex].correctAnswer;
    if (isCorrect) {
      hcmSfx.playSuccess();
    } else {
      hcmSfx.playClick(400);
    }
    setSelectedAnswers((prev) => ({
      ...prev,
      [quizIndex]: optionIdx,
    }));
  };

  const handleNextQuiz = () => {
    hcmSfx.playClick(650);
    if (quizIndex < KIDS_QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      // Calculate score
      let correct = 0;
      KIDS_QUIZ_QUESTIONS.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) correct++;
      });
      setQuizScore(correct);
      setShowQuizResult(true);
      if (correct >= 7) {
        hcmSfx.playSuccess();
      } else {
        hcmSfx.playClick(500);
      }
    }
  };

  const handleRestartQuiz = () => {
    hcmSfx.playClick(500);
    setQuizIndex(0);
    setSelectedAnswers({});
    setShowQuizResult(false);
  };

  // Letter to Uncle Ho State
  const [letterSender, setLetterSender] = useState('');
  const [letterClass, setLetterClass] = useState('');
  const [letterSchool, setLetterSchool] = useState('Trường Tiểu học Nguyễn Du');
  const [letterContent, setLetterContent] = useState('');
  const [sentLetter, setSentLetter] = useState<{
    sender: string;
    classSchool: string;
    content: string;
    date: string;
  } | null>(null);

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterContent.trim()) return;
    hcmSfx.playSuccess();
    setSentLetter({
      sender: letterSender.trim() || 'Học sinh Thủ Dầu Một',
      classSchool: `${letterClass.trim() || 'Đội viên'} - ${letterSchool}`,
      content: letterContent.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
    });
    setLetterContent('');
  };

  // Gamification: Calculate progress towards "Cháu Ngoan Bác Hồ Xuất Sắc"
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.min(
    100,
    Math.round((totalChecked / 20) * 40 + (goodDeeds.length >= 3 ? 30 : goodDeeds.length * 10) + (showQuizResult && quizScore >= 7 ? 30 : 10))
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-500 via-rose-600 to-rose-700 p-6 text-white shadow-lg relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-300/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-300 text-slate-950 px-3 py-0.5 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Smile className="w-3.5 h-3.5 text-rose-700" />
                Dành Riêng Cho Thiếu Nhi &amp; Học Sinh
              </span>
              <span className="rounded-full bg-black/30 border border-white/20 text-white px-2.5 py-0.5 text-xs font-semibold">
                Mô hình Liên đội trường học TP. Thủ Dầu Một
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight drop-shadow-xs">
              Không Gian Văn Hóa Hồ Chí Minh — Thiếu Nhi Vâng Lời Bác
            </h1>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-sans">
              "Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người." Không gian học tập, rèn luyện 5 Điều Bác dạy, lắng nghe truyện kể đạo đức, ghi nhận nghìn việc tốt và sinh hoạt Đội của học sinh Tiểu học &amp; THCS Đất Thủ.
            </p>
          </div>

          {/* Gamified Lotus Progress Card */}
          <div className="shrink-0 rounded-2xl bg-black/30 border border-amber-300/40 p-3.5 text-center min-w-[200px] backdrop-blur-xs space-y-1.5 shadow-md">
            <div className="flex items-center justify-between text-[11px] text-amber-200 font-bold">
              <span>Hành trình Búp Sen Vàng</span>
              <span>{progressPercent}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10.5px] font-black uppercase tracking-wider text-amber-300 block">
              {progressPercent >= 80
                ? '🏆 Cháu Ngoan Bác Hồ Xuất Sắc'
                : progressPercent >= 50
                ? '⭐ Dũng Sĩ Nghìn Việc Tốt'
                : '🌱 Búp Sen Chăm Ngoan'}
            </span>
          </div>
        </div>

        {/* 9 Sub-Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-white/20 mt-5 relative z-10">
          {[
            { id: 'WALL', label: 'Bức Tường Bác Hồ (Mô hình)', icon: Flag },
            { id: 'TEACHINGS', label: '5 Điều Bác Dạy (Tự rèn luyện)', icon: Heart },
            { id: 'STORIES', label: '15 Truyện Kể Về Bác', icon: BookOpen },
            { id: 'SONGS', label: '8 Bài Hát Tuổi Thơ', icon: Music },
            { id: 'QUIZ', label: 'Đố Vui Nhận Giấy Khen', icon: Trophy },
            { id: 'DIARY', label: 'Sổ Tay Hoa Việc Tốt', icon: Sparkles },
            { id: 'LETTER', label: 'Thư Gửi Bác Hồ', icon: Mail },
            { id: 'COLORING', label: 'Góc Tô Màu', icon: Palette },
            { id: 'BRIGADES', label: 'Liên Đội Đất Thủ', icon: School },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  hcmSfx.playClick(600);
                  setActiveSubTab(tab.id as any);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  active
                    ? 'bg-white text-rose-800 shadow-md font-black scale-105'
                    : 'bg-black/20 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHÂN HỆ 1: BỨC TƯỜNG GỖ KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH TRƯỜNG HỌC          */}
      {/* ========================================================================= */}
      {activeSubTab === 'WALL' && (
        <div className="space-y-6">
          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-900/10 rounded-2xl border border-amber-300/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-amber-950">
                Mô hình Không Gian Văn Hóa Hồ Chí Minh tại trường học (TP. Thủ Dầu Một)
              </span>
            </div>
            <div className="inline-flex rounded-xl bg-white/80 p-1 border border-amber-300 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(600);
                  setWallMode('3D_WALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  wallMode === '3D_WALL'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/60'
                }`}
              >
                <span>🪵 Vách Gỗ Tương Tác 3D</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  hcmSfx.playClick(600);
                  setWallMode('REAL_PHOTO');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  wallMode === 'REAL_PHOTO'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-100/60'
                }`}
              >
                <span>📸 Ảnh Chụp Mô Hình Thực Tế (Hotspots)</span>
              </button>
            </div>
          </div>

          {/* CHẾ ĐỘ 1: VÁCH GỖ TƯƠNG TÁC 3D (DIGITAL TWIN) */}
          {wallMode === '3D_WALL' && (
            <div className="rounded-3xl border-4 border-[#C99850] bg-gradient-to-b from-[#F9F6F0] via-[#F5EEDC] to-[#EFE2C6] p-4 sm:p-7 shadow-2xl relative overflow-hidden">
              {/* White window grid background & curtains */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.75)_3px,transparent_3px),linear-gradient(to_bottom,rgba(255,255,255,0.75)_3px,transparent_3px)] bg-[size:44px_44px] pointer-events-none opacity-85" />
              <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-sky-800/70 via-sky-700/40 to-transparent pointer-events-none rounded-l-3xl" />
              <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-sky-800/70 via-sky-700/40 to-transparent pointer-events-none rounded-r-3xl" />

              {/* Header Vách Gỗ Lớp Học */}
              <div className="text-center space-y-2 relative pb-5 border-b-2 border-amber-300/80 z-10">
                <div className="flex items-center justify-center gap-3 sm:gap-8">
                  {/* National Flag with bamboo leaf */}
                  <div className="flex items-center gap-1">
                    <div className="w-11 sm:w-16 h-8 sm:h-11 rounded-lg bg-gradient-to-br from-red-600 to-red-700 shadow-md border-2 border-amber-300 flex items-center justify-center relative -rotate-6">
                      <Star className="w-5 sm:w-7 h-5 sm:h-7 text-yellow-300 fill-current" />
                    </div>
                    <span className="text-base sm:text-2xl -rotate-12 hidden sm:inline select-none">🌿</span>
                  </div>

                  {/* Title */}
                  <div className="text-center px-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm select-none">☁️</span>
                      <h3 className="text-base sm:text-2xl font-serif font-black italic text-[#2C241E] tracking-wide">
                        Không gian văn hóa
                      </h3>
                      <span className="text-sm select-none">☁️</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black font-serif text-[#A31621] tracking-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
                      HỒ CHÍ MINH
                    </h2>
                  </div>

                  {/* Party Flag with bamboo leaf */}
                  <div className="flex items-center gap-1">
                    <span className="text-base sm:text-2xl rotate-12 hidden sm:inline select-none">🌿</span>
                    <div className="w-11 sm:w-16 h-8 sm:h-11 rounded-lg bg-gradient-to-br from-red-700 to-red-800 shadow-md border-2 border-amber-300 flex items-center justify-center relative rotate-6">
                      <span className="text-yellow-300 font-bold text-sm sm:text-lg">☭</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Cột: 5 Điều (Trái) | Tranh Bác (Giữa) | 4 Ảnh (Phải) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-6 items-stretch relative z-10">
                {/* CỘT TRÁI: 5 ĐIỀU BÁC HỒ DẠY (BẢNG GỖ) */}
                <div className="lg:col-span-3 rounded-2xl border-2 border-[#B98335] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E5] to-[#F3E5CA] p-3.5 shadow-md flex flex-col justify-between space-y-3">
                  <div className="text-center pb-2 border-b border-[#D7B074] flex items-center justify-center gap-1.5">
                    <span className="text-xs select-none">🌿</span>
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#8B5A2B] to-[#A36D33] text-amber-50 font-black text-xs uppercase tracking-wider shadow-2xs">
                      5 ĐIỀU BÁC HỒ DẠY
                    </span>
                    <span className="text-xs select-none">🌿</span>
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    {FIVE_TEACHINGS_DATA.map((t) => (
                      <div
                        key={t.number}
                        onClick={() => {
                          hcmSfx.playClick(650);
                          setSelectedTeaching(t);
                          setActiveSubTab('TEACHINGS');
                        }}
                        className="group p-2.5 rounded-xl border border-[#D7B074] bg-gradient-to-r from-white to-[#FDF8EE] hover:bg-[#FFF3DC] hover:border-[#8B5A2B] transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center gap-2.5"
                      >
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A31621] to-[#7D1119] text-white font-black text-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-2xs border border-amber-300">
                          {t.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-900 group-hover:text-[#A31621] leading-snug break-words">
                            {t.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {t.shortText}
                          </p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('TEACHINGS')}
                      className="w-full text-center text-xs font-bold text-amber-950 hover:text-rose-800 underline cursor-pointer"
                    >
                      Vào Góc Tự Rèn Luyện 5 Điều →
                    </button>
                  </div>
                </div>

                {/* KHỐI GIỮA: BỨC TRANH NGHỆ THUẬT BÁC HỒ QUÀNG KHĂN ĐỎ */}
                <div className="lg:col-span-6 rounded-3xl border-4 border-[#C99850] bg-gradient-to-b from-[#FFFDF9] via-white to-[#FAF1DD] p-4 shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10.5px] font-black uppercase tracking-widest text-amber-800 font-serif">
                      🌿 BIỂU TƯỢNG THIÊNG LIÊNG TRƯỜNG HỌC 🌿
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-[#A31621]">
                      "Vì lợi ích mười năm trồng cây,<br />Vì lợi ích trăm năm trồng người."
                    </h3>
                    <span className="text-xs font-serif italic text-slate-500">— Hồ Chí Minh —</span>
                  </div>

                  {/* Main Art Illustration (Pristine Inpainted Artwork) */}
                  <div
                    onClick={() => {
                      hcmSfx.playClick(600);
                      setShowCenterArtModal(true);
                    }}
                    className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[314/320] rounded-2xl overflow-hidden shadow-lg border-3 border-[#D7B074] group cursor-pointer bg-amber-50 mx-auto"
                  >
                    <img
                      src="/assets/hcm-space/bac-ho-thieu-nhi-khan-quang.jpg"
                      alt="Bác Hồ quàng khăn đỏ cho thiếu nhi"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-amber-950 font-bold text-xs shadow-md">
                        🔍 Nhấp để phóng to & ngắm tranh
                      </span>
                    </div>
                  </div>

                  {/* Ribbon Slogan */}
                  <div className="w-full rounded-2xl bg-gradient-to-r from-[#981B26] via-[#BA2432] to-[#981B26] text-amber-100 p-2.5 shadow-md flex items-center justify-center gap-2 border-2 border-amber-300">
                    <span className="text-sm select-none">🌸</span>
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                      Đời đời nhớ ơn Chủ tịch Hồ Chí Minh vĩ đại!
                    </span>
                    <span className="text-sm select-none">🌸</span>
                  </div>
                </div>

                {/* CỘT PHẢI: 4 KHUNG ẢNH CỦA BÁC */}
                <div className="lg:col-span-3 rounded-2xl border-2 border-[#B98335] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E5] to-[#F3E5CA] p-3.5 shadow-md flex flex-col justify-between space-y-3">
                  <div className="text-center pb-2 border-b border-[#D7B074] flex items-center justify-center gap-1.5">
                    <span className="text-xs select-none">🌿</span>
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#8B5A2B] to-[#A36D33] text-amber-50 font-black text-xs uppercase tracking-wider shadow-2xs">
                      HÌNH ẢNH CỦA BÁC
                    </span>
                    <span className="text-xs select-none">🌿</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 flex-1">
                    {UNCLE_HO_PHOTOS.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => {
                          hcmSfx.playClick(600);
                          setSelectedPhoto(photo);
                        }}
                        className="group rounded-xl border border-[#D7B074] bg-white hover:bg-amber-50 p-2 text-center cursor-pointer shadow-2xs hover:shadow-xs transition-all flex flex-col items-center justify-center gap-2"
                      >
                        <div className="w-full flex-1 min-h-[110px] rounded-lg bg-amber-100 overflow-hidden relative border border-amber-200">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-900 group-hover:text-rose-800 leading-tight">
                          {photo.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-[10.5px] text-amber-950 font-medium">
                      Nhấp vào từng ảnh để đọc câu chuyện ý nghĩa
                    </span>
                  </div>
                </div>
              </div>

              {/* ĐÁY: 6 ĐỊA DANH LỊCH SỬ DẤU CHÂN BÁC & ĐẤT THỦ */}
              <div className="pt-6 mt-6 border-t-2 border-amber-300/80 space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-700" />
                    <h4 className="text-sm font-extrabold font-serif text-[#781B26] uppercase">
                      Địa Danh Lịch Sử Gắn Liền Với Bác &amp; Đất Thủ
                    </h4>
                  </div>
                  <span className="text-xs text-amber-950 font-medium hidden sm:inline">
                    Học sinh cùng hành trình về nguồn
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {HISTORICAL_SITES.map((site) => (
                    <div
                      key={site.id}
                      onClick={() => {
                        hcmSfx.playClick(650);
                        setSelectedSite(site);
                      }}
                      className="p-3 rounded-2xl border-2 border-[#D7B074] bg-white hover:bg-amber-50 hover:border-rose-400 transition-all cursor-pointer shadow-xs hover:-translate-y-1 flex flex-col justify-between text-center space-y-2 group"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-amber-100 border border-amber-200">
                        <img
                          src={site.imageUrl}
                          alt={site.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900 group-hover:text-rose-800">
                          {site.name}
                        </h5>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {site.province}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BẬU CỬA SỔ & KỆ TRƯNG BÀY PHÍA DƯỚI: HÀNG RÀO HOA & TỦ SÁCH BÁC HỒ */}
              <div className="mt-6 pt-4 border-t-4 border-[#8B5A2B] bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E5] to-[#FFFDF9] rounded-2xl p-4 shadow-inner flex flex-wrap items-center justify-between gap-4 relative z-10">
                {/* Hàng rào hoa trắng */}
                <div className="flex items-center gap-3">
                  <span className="text-xl select-none">🪴</span>
                  <div>
                    <span className="text-xs font-bold text-amber-950 block">
                      Công Trình Măng Non · Bồn Hoa Thiếu Nhi
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Góc xanh lớp học thân thiện, rèn luyện giữ gìn vệ sinh trường lớp
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm select-none ml-2">
                    <span>🌸</span>
                    <span>🌼</span>
                    <span>🌺</span>
                    <span>🌷</span>
                  </div>
                </div>

                {/* Tủ sách Bác Hồ */}
                <div
                  onClick={() => {
                    hcmSfx.playClick(600);
                    setActiveSubTab('STORIES');
                  }}
                  className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-100 to-amber-200/80 border border-amber-400 hover:border-amber-600 transition-all cursor-pointer shadow-xs hover:shadow-md"
                >
                  <span className="text-2xl select-none group-hover:scale-110 transition-transform">📚</span>
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-amber-950 block group-hover:text-rose-900">
                      Tủ Sách Bác Hồ &amp; Bài Học Đạo Đức
                    </span>
                    <span className="text-[10px] text-amber-800">
                      Nhấp để đọc 10 câu chuyện đạo đức thiếu nhi →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHẾ ĐỘ 2: ẢNH CHỤP MÔ HÌNH THỰC TẾ & ĐIỂM CHẠM TƯƠNG TÁC (HOTSPOTS) */}
          {wallMode === 'REAL_PHOTO' && (
            <div className="rounded-3xl border-4 border-amber-400 bg-black/90 p-3 sm:p-5 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between text-white text-xs px-2">
                <span className="font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  Mô hình thực tế tại lớp học — Nhấp vào các điểm chạm (Hotspots) để tương tác:
                </span>
                <span className="text-amber-300 font-medium hidden sm:inline">
                  Tư liệu tham khảo chuẩn mực Không gian Văn hóa Bác Hồ trong trường học
                </span>
              </div>

              {/* Main Photo with Responsive Hotspots */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/60 bg-black">
                <img
                  src="/assets/hcm-space/khong-gian-thieu-nhi-wall-clean.jpg"
                  alt="Ảnh chụp thực tế Không gian văn hóa Bác Hồ tại trường học"
                  className="w-full h-auto object-contain block"
                />

                {/* Hotspot 1: 5 Điều Bác Hồ Dạy */}
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(650);
                    setActiveSubTab('TEACHINGS');
                  }}
                  className="absolute left-[13%] top-[38%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  title="5 Điều Bác Hồ Dạy"
                >
                  <span className="w-8 h-8 rounded-full bg-rose-600/90 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-lg animate-bounce group-hover:scale-125 transition-transform">
                    1
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-9 px-2 py-1 rounded bg-black/80 text-amber-200 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    5 Điều Bác Dạy
                  </span>
                </button>

                {/* Hotspot 2: Tranh Bác Hồ Quàng Khăn Đỏ */}
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(600);
                    setShowCenterArtModal(true);
                  }}
                  className="absolute left-[51%] top-[42%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  title="Tranh Bác Hồ Quàng Khăn Đỏ"
                >
                  <span className="w-9 h-9 rounded-full bg-amber-500/90 text-slate-950 font-black text-sm flex items-center justify-center border-2 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform">
                    2
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 rounded bg-black/80 text-amber-200 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Tranh Bác Quàng Khăn Đỏ
                  </span>
                </button>

                {/* Hotspot 3: 4 Hình Ảnh Của Bác */}
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(600);
                    setSelectedPhoto(UNCLE_HO_PHOTOS[0]);
                  }}
                  className="absolute left-[78%] top-[38%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  title="Hình ảnh của Bác"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-600/90 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-lg animate-bounce group-hover:scale-125 transition-transform">
                    3
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-9 px-2 py-1 rounded bg-black/80 text-amber-200 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    4 Hình Ảnh Của Bác
                  </span>
                </button>

                {/* Hotspot 4: Dãy Di Tích Lịch Sử */}
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(650);
                    setSelectedSite(HISTORICAL_SITES[0]);
                  }}
                  className="absolute left-[50%] top-[78%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  title="Địa Danh Lịch Sử Về Nguồn"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-600/90 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-lg animate-pulse group-hover:scale-125 transition-transform">
                    4
                  </span>
                  <span className="absolute left-1/2 -translate-x-1/2 top-9 px-2 py-1 rounded bg-black/80 text-amber-200 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    5 Di Tích Lịch Sử
                  </span>
                </button>

                {/* Hotspot 5: Tủ Sách Bác Hồ & Bồn Hoa */}
                <button
                  type="button"
                  onClick={() => {
                    hcmSfx.playClick(600);
                    setActiveSubTab('STORIES');
                  }}
                  className="absolute left-[88%] top-[88%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  title="Tủ Sách Bác Hồ"
                >
                  <span className="w-8 h-8 rounded-full bg-purple-600/90 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-lg animate-bounce group-hover:scale-125 transition-transform">
                    5
                  </span>
                  <span className="absolute right-0 top-9 px-2 py-1 rounded bg-black/80 text-amber-200 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Tủ Sách &amp; Truyện Đạo Đức
                  </span>
                </button>
              </div>

              {/* Legend bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('TEACHINGS')}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-[10px] flex items-center justify-center">1</span>
                  <span>5 Điều Bác Dạy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCenterArtModal(true)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] flex items-center justify-center">2</span>
                  <span>Tranh Bác Quàng Khăn Đỏ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(UNCLE_HO_PHOTOS[0])}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-[10px] flex items-center justify-center">3</span>
                  <span>4 Ảnh Của Bác</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSite(HISTORICAL_SITES[0])}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-[10px] flex items-center justify-center">4</span>
                  <span>5 Di Tích Về Nguồn</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('STORIES')}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-[10px] flex items-center justify-center">5</span>
                  <span>Tủ Sách Bác Hồ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 2: 5 ĐIỀU BÁC HỒ DẠY (KÈM GÓC TỰ RÈN LUYỆN CHECKLIST HÀNG NGÀY)     */}
      {/* ========================================================================= */}
      {activeSubTab === 'TEACHINGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* List 5 Điều bên trái */}
            <div className="md:col-span-5 space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-current" />
                <span>5 Lời Căn Dặn Thiêng Liêng</span>
              </h3>

              {FIVE_TEACHINGS_DATA.map((item) => {
                const active = selectedTeaching.number === item.number;
                return (
                  <div
                    key={item.number}
                    onClick={() => {
                      hcmSfx.playClick(600);
                      setSelectedTeaching(item);
                    }}
                    className={`hcm-flat-card p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                      active
                        ? 'border-rose-500 bg-gradient-to-r from-rose-50 to-amber-50/50 shadow-md ring-2 ring-rose-400/50'
                        : 'border-slate-200 bg-white hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 shadow-xs ${item.badgeColor}`}
                      >
                        {item.number}
                      </span>
                      <div className="space-y-1 flex-1">
                        <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.shortText}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chi tiết 1 Điều đã chọn bên phải */}
            <div className="md:col-span-7 rounded-3xl border-2 border-rose-200 bg-white p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-2xl text-white font-black text-lg flex items-center justify-center shadow-sm ${selectedTeaching.badgeColor}`}>
                    {selectedTeaching.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                      Điều {selectedTeaching.number} Bác Hồ Dạy
                    </span>
                    <h3 className="text-xl font-black font-serif text-slate-900">
                      {selectedTeaching.title}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  Thực hành mỗi ngày
                </span>
              </div>

              {/* Góc Tự Rèn Luyện Hàng Ngày (Interactive Checklist) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-amber-700" />
                    Góc Tự Rèn Luyện Của Em (Đánh dấu việc đã làm):
                  </span>
                  <span className="text-[11px] font-bold text-amber-800">
                    {selectedTeaching.checklistItems.filter((_, i) => checkedItems[`${selectedTeaching.number}-${i}`]).length} / {selectedTeaching.checklistItems.length} việc
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedTeaching.checklistItems.map((chk, i) => {
                    const key = `${selectedTeaching.number}-${i}`;
                    const isDone = !!checkedItems[key];
                    return (
                      <div
                        key={i}
                        onClick={() => toggleCheckItem(key)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 text-xs ${
                          isDone
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-100/40'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className={isDone ? 'line-through opacity-80' : ''}>{chk}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ý nghĩa lời dạy */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Ý nghĩa lời dạy
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {selectedTeaching.meaning}
                </p>
              </div>

              {/* Hai cột hành động: Tại trường học & Tại gia đình */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <span className="text-xs font-black text-rose-900 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-rose-700" />
                    Việc làm tại trường học
                  </span>
                  <ul className="space-y-2">
                    {selectedTeaching.schoolActions.map((act, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-emerald-700" />
                    Việc làm tại gia đình
                  </span>
                  <ul className="space-y-2">
                    {selectedTeaching.homeActions.map((act, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 3: 15 TRUYỆN KỂ CHÍNH THỐNG VỀ BÁC HỒ (CHUẨN 5 ĐIỀU BÁC DẠY & AUDIO) */}
      {/* ========================================================================= */}
      {activeSubTab === 'STORIES' && (
        <div className="space-y-6">
          {/* Banner giới thiệu phân hệ truyện & Búp Sen Vàng */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-700 via-rose-800 to-amber-900 text-white p-5 sm:p-6 shadow-xl border-2 border-amber-400/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs">
                <span>📚 Tủ Sách Đạo Đức Thiếu Nhi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-amber-200">
                15 Mẩu Chuyện Kể Về Bác Hồ Cho Thiếu Nhi
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
                Tư liệu chính thống từ Nhà xuất bản Kim Đồng, Bảo tàng Hồ Chí Minh và Bộ GD&ĐT. Phân loại theo 5 Điều Bác dạy, tích hợp giọng đọc truyền cảm và câu đố đọc hiểu rinh Búp Sen Vàng.
              </p>
            </div>

            {/* Khung thành tích Búp Sen Vàng */}
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-xs p-3 sm:p-4 rounded-2xl border border-amber-300/40 shrink-0">
              <span className="text-3xl animate-bounce">🪷</span>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-amber-200 font-bold">
                  Búp Sen Vàng Của Bé
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-1.5">
                  <span>{lotusPoints}</span>
                  <span className="text-xs font-normal text-white">bông sen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bộ lọc thông minh 2 tầng */}
          <div className="rounded-2xl bg-white border border-rose-200/80 p-4 shadow-sm space-y-3.5">
            {/* Tầng 1: Lọc theo 5 Điều Bác Hồ dạy */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-rose-600" />
                <span>Phân loại theo 5 Điều Bác Hồ Dạy:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'ALL', label: 'Tất cả (15)', icon: '⭐', color: 'border-slate-300 hover:border-amber-500' },
                  { id: 'DIEU_1', label: 'Điều 1: Yêu Tổ quốc, đồng bào (3)', icon: '❤️', color: 'border-rose-300 hover:border-rose-500' },
                  { id: 'DIEU_2', label: 'Điều 2: Học tốt, lao động tốt (3)', icon: '📚', color: 'border-blue-300 hover:border-blue-500' },
                  { id: 'DIEU_3', label: 'Điều 3: Đoàn kết, kỷ luật (4)', icon: '🤝', color: 'border-amber-300 hover:border-amber-500' },
                  { id: 'DIEU_4', label: 'Điều 4: Giữ gìn vệ sinh (2)', icon: '🌿', color: 'border-emerald-300 hover:border-emerald-500' },
                  { id: 'DIEU_5', label: 'Điều 5: Khiêm tốn, thật thà, dũng cảm (3)', icon: '🎖️', color: 'border-purple-300 hover:border-purple-500' },
                ].map((item) => {
                  const active = storyTeachingFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        hcmSfx.playClick(600);
                        setStoryTeachingFilter(item.id as any);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                        active
                          ? 'bg-rose-700 text-white border-rose-800 shadow-xs scale-102'
                          : `bg-slate-50 text-slate-700 ${item.color} hover:bg-rose-50/50`
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tầng 2: Lọc theo Cấp học & Tìm kiếm từ khóa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500">Lứa tuổi:</span>
                {[
                  { id: 'ALL', label: 'Tất cả cấp học' },
                  { id: 'Lớp 1 – 3', label: 'Khối Lớp 1 – 3' },
                  { id: 'Lớp 4 – 5', label: 'Khối Lớp 4 – 5' },
                  { id: 'THCS', label: 'Khối THCS' },
                ].map((grade) => {
                  const active = storyGradeFilter === grade.id;
                  return (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => {
                        hcmSfx.playClick(500);
                        setStoryGradeFilter(grade.id as any);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {grade.label}
                    </button>
                  );
                })}
              </div>

              {/* Ô tìm kiếm từ khóa */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={storySearchTerm}
                  onChange={(e) => setStorySearchTerm(e.target.value)}
                  placeholder="Tìm mẩu chuyện, địa danh..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200/50 bg-slate-50/50"
                />
                {storySearchTerm && (
                  <button
                    type="button"
                    onClick={() => setStorySearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Lưới 2 Cột: Danh sách bên trái & Nội dung chi tiết bên phải */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Cột 1: Danh sách câu chuyện (col-span-4) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-rose-700" />
                  <span>Danh Sách Truyện</span>
                </span>
                <span className="text-[11px] text-rose-800 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                  {filteredStories.length} câu chuyện
                </span>
              </div>

              <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredStories.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <span className="text-3xl">🔍</span>
                    <p className="text-xs text-slate-500 font-medium">
                      Không tìm thấy câu chuyện nào khớp với bộ lọc hiện tại.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStoryTeachingFilter('ALL');
                        setStoryGradeFilter('ALL');
                        setStorySearchTerm('');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer hover:bg-amber-500"
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                ) : (
                  filteredStories.map((story) => {
                    const active = selectedStory.id === story.id;
                    const isCompleted = storyQuizCompletedMap[story.id];
                    return (
                      <div
                        key={story.id}
                        onClick={() => {
                          hcmSfx.playPageTurn();
                          setSelectedStory(story);
                        }}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          active
                            ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-300/60 -translate-y-0.5'
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl shrink-0">{story.icon}</span>
                            <div>
                              <h4 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-snug line-clamp-1">
                                {story.title}
                              </h4>
                              {story.subtitle && (
                                <p className="text-[10.5px] text-rose-700 font-medium line-clamp-1">
                                  {story.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                          {isCompleted && (
                            <span className="shrink-0 text-amber-500 text-sm" title="Bé đã trả lời đúng câu đố nhận Búp Sen Vàng">
                              🪷
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 line-clamp-1 pt-1.5 italic">
                          {story.lesson}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-slate-100 mt-2 text-[10px] text-slate-500 font-medium">
                          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 font-bold">
                            {story.historicalPeriod.split('•')[0].trim()}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span>{story.gradeCategory}</span>
                          <span className="text-slate-400">•</span>
                          <span className="flex items-center gap-0.5 text-amber-800 font-bold">
                            <Clock className="w-3 h-3" />
                            {story.readingTime}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Cột 2: Không gian đọc & Nhà hát kể chuyện (col-span-8) */}
            <div className="lg:col-span-8 rounded-3xl border-2 border-amber-300 bg-white p-5 sm:p-7 shadow-lg space-y-6">
              {/* Header chi tiết câu chuyện */}
              <div className="border-b border-slate-100 pb-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-2xs">
                      {selectedStory.teachingGroupTitle}
                    </span>
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                      Phù hợp: {selectedStory.suitableAge}
                    </span>
                  </div>

                  {/* Thanh điều khiển: Cỡ chữ & Giọng đọc */}
                  <div className="flex items-center gap-2">
                    {/* Nút cỡ chữ */}
                    <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs">
                      <button
                        type="button"
                        onClick={() => setStoryFontSize('sm')}
                        className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${storyFontSize === 'sm' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
                        title="Chữ nhỏ"
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={() => setStoryFontSize('base')}
                        className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${storyFontSize === 'base' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
                        title="Chữ vừa"
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => setStoryFontSize('lg')}
                        className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${storyFontSize === 'lg' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'}`}
                        title="Chữ to dễ đọc"
                      >
                        A+
                      </button>
                    </div>

                    {/* Nút nghe kể chuyện TTS */}
                    <button
                      type="button"
                      onClick={handleToggleReadStory}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer ${
                        isReadingStory
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-2xs'
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
                          <span>🔊 Nghe cô kể</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 flex items-center gap-2.5">
                    <span className="text-3xl">{selectedStory.icon}</span>
                    <span>{selectedStory.title}</span>
                  </h3>
                  {selectedStory.subtitle && (
                    <p className="text-sm font-semibold text-rose-800 mt-1">
                      {selectedStory.subtitle}
                    </p>
                  )}
                </div>

                {/* Căn cước lịch sử & Nguồn trích dẫn chính thống */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#881337]">🏛️ Bối cảnh lịch sử:</span>
                    <span className="text-slate-800 font-semibold">{selectedStory.historicalPeriod}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-amber-900">📜 Nguồn tư liệu:</span>
                    <span className="text-slate-700">{selectedStory.historicalSource}</span>
                  </div>
                </div>
              </div>

              {/* Khung Chi tiết vàng của Bác (The Golden Moment) */}
              <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-amber-50 via-rose-50/50 to-amber-100/40 border-2 border-amber-300/80 shadow-xs">
                <Quote className="w-8 h-8 text-amber-400/40 absolute top-2 left-2 rotate-180" />
                <div className="relative z-10 pl-6 space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chi Tiết Vàng &amp; Lời Bác Dặn</span>
                  </div>
                  <p className="text-sm sm:text-base font-serif italic font-bold text-slate-900 leading-relaxed">
                    "{selectedStory.goldenQuote}"
                  </p>
                </div>
              </div>

              {/* Toàn văn câu chuyện */}
              <div
                className={`text-slate-800 leading-relaxed whitespace-pre-line font-serif bg-amber-50/20 p-5 sm:p-6 rounded-2xl border border-amber-200/60 transition-all ${
                  storyFontSize === 'sm'
                    ? 'text-xs sm:text-[13px] leading-6'
                    : storyFontSize === 'lg'
                    ? 'text-base sm:text-lg leading-8'
                    : 'text-sm sm:text-[15px] leading-7'
                }`}
              >
                {selectedStory.content}
              </div>

              {/* Hộp 1: Bài học rút ra cho chúng em */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-1.5 shadow-xs">
                <span className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Bài học rút ra cho chúng em
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  {selectedStory.moralLesson}
                </p>
              </div>

              {/* Hộp 2: Hành động của em hôm nay */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-1.5 shadow-xs">
                <span className="text-xs font-black text-amber-950 uppercase flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-600 fill-current" />
                  Hành động của em hôm nay (Thực hành 5 Điều Bác dạy)
                </span>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed font-sans">
                  👉 {selectedStory.dailyActionPledge}
                </p>
              </div>

              {/* Hộp 3: Thử thách đọc hiểu 60 giây — Rinh Búp Sen Vàng */}
              {selectedStory.interactiveQuiz && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-amber-50 border-2 border-indigo-200 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-indigo-950 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>Thử Thách Đọc Hiểu 60 Giây — Rinh Búp Sen Vàng</span>
                    </span>
                    <span className="text-[11px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                      +1 Búp Sen Vàng 🪷
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    ❓ {selectedStory.interactiveQuiz.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedStory.interactiveQuiz.options.map((opt, idx) => {
                      const isSelected = storyQuizSelection === idx;
                      const isCorrect = idx === selectedStory.interactiveQuiz!.correctAnswer;
                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/40';

                      if (storyQuizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-xs';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                        } else {
                          btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAnswerStoryQuiz(idx)}
                          disabled={storyQuizSubmitted}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[11px] shrink-0">
                            {['A', 'B', 'C', 'D'][idx]}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Phản hồi sau khi trả lời */}
                  {storyQuizFeedback === 'CORRECT' && (
                    <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs space-y-1 animate-in fade-in">
                      <div className="font-black flex items-center gap-1.5 text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Xuất sắc! Bé đã trả lời chính xác và được tặng +1 Búp Sen Vàng! 🪷</span>
                      </div>
                      <p className="text-[11.5px] text-emerald-800 leading-relaxed font-sans">
                        💡 {selectedStory.interactiveQuiz.explanation}
                      </p>
                    </div>
                  )}

                  {storyQuizFeedback === 'WRONG' && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center justify-between animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Chưa đúng rồi! Bé hãy đọc kỹ lại câu chuyện và thử lại nhé.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setStoryQuizSubmitted(false);
                          setStoryQuizSelection(null);
                          setStoryQuizFeedback(null);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] cursor-pointer"
                      >
                        Thử lại
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hộp 4: Câu hỏi thảo luận trong giờ sinh hoạt Đội */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Câu hỏi thảo luận trong giờ sinh hoạt Đội / Sao Nhi đồng:
                </span>
                <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-700 leading-relaxed">
                  {selectedStory.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 4: 8 BÀI HÁT THIẾU NHI BẤT HỦ VỀ BÁC HỒ                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'SONGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Danh sách 8 bài hát */}
            <div className="md:col-span-5 space-y-2.5">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Music className="w-5 h-5 text-rose-600" />
                <span>8 Bài Hát Thiếu Nhi Đi Cùng Năm Tháng</span>
              </h3>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {CHILDREN_SONGS.map((song) => {
                  const active = selectedSong.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => {
                        hcmSfx.playClick(600);
                        setSelectedSong(song);
                      }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        active
                          ? 'border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-300/50'
                          : 'border-slate-200 bg-white hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{song.title}</h4>
                        <span className="text-[10px] font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                          {song.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{song.composer} · {song.year}</p>
                      <p className="text-[10.5px] text-rose-700 italic truncate pt-1">
                        "{song.famousLyrics}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lời bài hát & hoàn cảnh sáng tác */}
            <div className="md:col-span-7 rounded-3xl border-2 border-rose-200 bg-white p-6 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-900 px-2.5 py-0.5 rounded-full">
                    {selectedSong.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
                    {selectedSong.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Sáng tác: <strong>{selectedSong.composer}</strong> ({selectedSong.year})
                  </p>
                </div>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedSong.youtubeQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Nghe trên YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Lời bài hát */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-amber-700" />
                  Lời bài hát (Hát cùng Bác):
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-serif whitespace-pre-line leading-relaxed italic">
                  {selectedSong.fullLyrics}
                </p>
              </div>

              {/* Hoàn cảnh sáng tác */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-black text-slate-900 uppercase">
                  Hoàn cảnh ra đời của tác phẩm:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedSong.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 5: HỘI THI ĐỐ VUI THIẾU NHI VÂNG LỜI BÁC (CẤP GIẤY KHEN QR)        */}
      {/* ========================================================================= */}
      {activeSubTab === 'QUIZ' && (
        <div className="space-y-6">
          <div className="max-w-3xl mx-auto rounded-3xl border-2 border-amber-300 bg-white p-6 sm:p-8 shadow-xl space-y-6">
            {!showQuizResult ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                      Hội Thi Đố Vui Thiếu Nhi Đất Thủ
                    </span>
                    <h3 className="text-xl font-black font-serif text-slate-900">
                      Câu hỏi {quizIndex + 1} / {KIDS_QUIZ_QUESTIONS.length}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                    {KIDS_QUIZ_QUESTIONS[quizIndex].topic}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-rose-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${((quizIndex + 1) / KIDS_QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>

                <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {KIDS_QUIZ_QUESTIONS[quizIndex].question}
                </p>

                {/* Options A, B, C, D */}
                <div className="space-y-2.5">
                  {KIDS_QUIZ_QUESTIONS[quizIndex].options.map((opt, oIdx) => {
                    const isAnswered = selectedAnswers[quizIndex] !== undefined;
                    const isSelected = selectedAnswers[quizIndex] === oIdx;
                    const isCorrectAnswer = oIdx === KIDS_QUIZ_QUESTIONS[quizIndex].correctAnswer;
                    
                    let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold shadow-xs';
                      } else {
                        btnStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectQuizAnswer(oIdx)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrectAnswer && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Explanation Box */}
                {selectedAnswers[quizIndex] !== undefined && (
                  <div
                    className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 ${
                      selectedAnswers[quizIndex] === KIDS_QUIZ_QUESTIONS[quizIndex].correctAnswer
                        ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                        : 'bg-amber-50/90 border-amber-300 text-amber-950'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-1.5 mb-1 text-sm">
                      {selectedAnswers[quizIndex] === KIDS_QUIZ_QUESTIONS[quizIndex].correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-800">Chính xác rồi! Hoan hô bạn nhỏ! 🎉</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-800">Chưa chính xác rồi em ơi! Ghi nhớ nhé:</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {KIDS_QUIZ_QUESTIONS[quizIndex].explanation}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Hãy suy nghĩ thật kỹ để chọn đáp án đúng nhất nhé!
                  </span>

                  <button
                    type="button"
                    disabled={selectedAnswers[quizIndex] === undefined}
                    onClick={handleNextQuiz}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold px-5 py-2.5 text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{quizIndex < KIDS_QUIZ_QUESTIONS.length - 1 ? 'Câu tiếp theo →' : 'Xem Kết Quả & Nhận Giấy Khen'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Result & Certificate */
              <div className="text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-3xl shadow-sm">
                  {quizScore >= 7 ? '🏆' : '⭐'}
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black font-serif text-slate-900">
                    {quizScore >= 7 ? 'Chúc Mừng Em Đã Đạt Chuẩn Cháu Ngoan Bác Hồ!' : 'Em Đã Hoàn Thành Bài Thi!'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Em đã trả lời đúng <strong>{quizScore} / {KIDS_QUIZ_QUESTIONS.length} câu hỏi</strong> ({quizScore * 10}%).
                  </p>
                </div>

                {/* Giấy Khen Điện Tử "Cháu Ngoan Bác Hồ" */}
                <div className="max-w-lg mx-auto p-6 rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-amber-50 via-white to-rose-50 shadow-xl space-y-4 text-center relative overflow-hidden">
                  <div className="space-y-1">
                    <span className="text-xs font-serif uppercase tracking-widest text-rose-800 font-black block">
                      ĐỘI THIẾU NIÊN TIỀN PHONG HỒ CHÍ MINH
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black font-serif text-amber-800 uppercase tracking-wide">
                      GIẤY CHỨNG NHẬN
                    </h4>
                    <span className="text-sm font-extrabold text-rose-700 uppercase block">
                      CHÁU NGOAN BÁC HỒ — EM YÊU LỊCH SỬ ĐẤT THỦ
                    </span>
                  </div>

                  <div className="py-2 border-y border-amber-300/80 space-y-2">
                    <input
                      type="text"
                      placeholder="Nhập tên em để in lên giấy khen..."
                      value={quizCertificateName}
                      onChange={(e) => setQuizCertificateName(e.target.value)}
                      className="w-full text-center text-sm sm:text-base font-black text-rose-900 border-b-2 border-rose-400 pb-1 bg-transparent outline-hidden"
                    />

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <input
                        type="text"
                        placeholder="Lớp (vd: 4A1)"
                        value={quizCertificateClass}
                        onChange={(e) => setQuizCertificateClass(e.target.value)}
                        className="w-20 text-center border-b border-slate-300 pb-0.5 bg-transparent outline-hidden"
                      />
                      <span>·</span>
                      <input
                        type="text"
                        placeholder="Trường (vd: TH Nguyễn Du)"
                        value={quizCertificateSchool}
                        onChange={(e) => setQuizCertificateSchool(e.target.value)}
                        className="w-44 text-center border-b border-slate-300 pb-0.5 bg-transparent outline-hidden"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic font-serif">
                    Đã hoàn thành xuất sắc Hội thi trực tuyến tìm hiểu về Bác Hồ và lịch sử truyền thống Đất Thủ Dầu Một năm 2026.
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2">
                    <span>Mã xác thực: HCM-KIDS-{Date.now().toString().slice(-6)}</span>
                    <span className="font-bold text-rose-800">Liên đội TP. Thủ Dầu Một</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      hcmSfx.playClick(600);
                      alert('Em có thể chụp màn hình Giấy khen này để gửi tặng cha mẹ và thầy cô Tổng phụ trách Đội nhé!');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold px-4 py-2 text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Lưu Giấy Khen Kỷ Niệm</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 text-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại bài thi</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 6: SỔ TAY "BÔNG HOA NGHÌN VIỆC TỐT"                               */}
      {/* ========================================================================= */}
      {activeSubTab === 'DIARY' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center">
                    🌸
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Sổ Tay "Bông Hoa Nghìn Việc Tốt" Thiếu Nhi Đất Thủ
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  Mỗi ngày một việc tốt dâng lên Bác Hồ kính yêu. Các em tự giác ghi nhận những việc tử tế đã làm tại trường và tại nhà.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 bg-emerald-100/80 px-4 py-2 rounded-2xl border border-emerald-300">
                <Award className="w-5 h-5 text-emerald-700" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Tổng hoa việc tốt
                  </span>
                  <span className="text-lg font-black text-emerald-950">
                    {goodDeeds.length} việc tốt
                  </span>
                </div>
              </div>
            </div>

            {/* Form ghi nhận việc tốt mới */}
            <form onSubmit={handleSaveGoodDeed} className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs space-y-3">
              <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                Ghi nhận việc tốt của em hôm nay:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Họ và tên học sinh (vd: Nguyễn Mai Anh)..."
                  value={newDeedStudent}
                  onChange={(e) => setNewDeedStudent(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                />

                <input
                  type="text"
                  placeholder="Lớp (vd: 4A1, 6/2)..."
                  value={newDeedClass}
                  onChange={(e) => setNewDeedClass(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                />

                <select
                  value={newDeedSchool}
                  onChange={(e) => setNewDeedSchool(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                >
                  <option value="TH Nguyễn Du">Trường TH Nguyễn Du</option>
                  <option value="TH Phú Cường">Trường TH Phú Cường</option>
                  <option value="TH Lê Hồng Phong">Trường TH Lê Hồng Phong</option>
                  <option value="THCS Chu Văn An">Trường THCS Chu Văn An</option>
                  <option value="THCS Phú Cường">Trường THCS Phú Cường</option>
                  <option value="TH Tương Bình Hiệp">Trường TH Tương Bình Hiệp</option>
                  <option value="Khác">Trường khác tại Thủ Dầu Một</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    required
                    placeholder="Em đã làm được việc tốt gì hôm nay? (vd: Giúp bạn qua đường, nhặt rác sân trường, quét nhà giúp mẹ)..."
                    value={newDeedTitle}
                    onChange={(e) => setNewDeedTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                  />
                </div>

                <select
                  value={newDeedTeaching}
                  onChange={(e) => setNewDeedTeaching(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-400 outline-hidden"
                >
                  <option value="01">Theo Điều 1: Yêu Tổ quốc, đồng bào</option>
                  <option value="02">Theo Điều 2: Học tốt, lao động tốt</option>
                  <option value="03">Theo Điều 3: Đoàn kết, kỷ luật tốt</option>
                  <option value="04">Theo Điều 4: Giữ vệ sinh thật tốt</option>
                  <option value="05">Theo Điều 5: Khiêm tốn, thật thà</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-1">
                {showDeedSuccess ? (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã lưu vào Sổ tay nghìn việc tốt! Bác Hồ khen em ngoan!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Mỗi việc tốt là một bông hoa đẹp dâng lên Bác
                  </span>
                )}

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Ghi Vào Sổ Vàng
                </button>
              </div>
            </form>

            {/* Danh sách việc tốt */}
            <div className="space-y-2 pt-3">
              <h4 className="text-xs font-black uppercase text-slate-500">
                Nhật ký việc tốt gần đây của thiếu nhi:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goodDeeds.map((deed) => (
                  <div
                    key={deed.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="rounded-md bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5">
                          Điều {deed.teachingNumber}
                        </span>
                        <span className="text-slate-400">{deed.date}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">
                        {deed.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span className="font-semibold text-rose-700">
                        {deed.studentName} ({deed.className} · {deed.school})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteDeed(deed.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Xóa việc tốt này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 7: HÒM THƯ "BỨC THƯ GỬI BÁC HỒ KÍNH YÊU"                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'LETTER' && (
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto rounded-3xl border-2 border-rose-300 bg-white p-6 sm:p-8 shadow-xl space-y-5">
            <div className="text-center space-y-1.5 border-b border-slate-100 pb-4">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
                Hòm Thư Tuổi Thơ
              </span>
              <h3 className="text-2xl font-black font-serif text-slate-900">
                Bức Thư Gửi Bác Hồ Kính Yêu
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Em hãy viết một bức thư ngắn dâng lên Bác Hồ: kể cho Bác nghe về những thành tích học tập, việc tốt đã làm và lời hứa phấn đấu của em!
              </p>
            </div>

            {!sentLetter ? (
              <form onSubmit={handleSendLetter} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tên của em (vd: Nguyễn Mai Anh)..."
                    value={letterSender}
                    onChange={(e) => setLetterSender(e.target.value)}
                    className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:ring-2 focus:ring-rose-400 outline-hidden"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Lớp (vd: 4A1)..."
                    value={letterClass}
                    onChange={(e) => setLetterClass(e.target.value)}
                    className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:ring-2 focus:ring-rose-400 outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="Trường (vd: TH Nguyễn Du)..."
                    value={letterSchool}
                    onChange={(e) => setLetterSchool(e.target.value)}
                    className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:ring-2 focus:ring-rose-400 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Nội dung thư gửi Bác Hồ kính yêu:
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Kính thưa Bác Hồ kính yêu! Hôm nay cháu viết thư này dâng lên Bác để báo công... Cháu hứa với Bác sẽ luôn chăm ngoan, học giỏi, thực hiện thật tốt 5 Điều Bác dạy..."
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 p-4 text-xs sm:text-sm font-serif leading-relaxed focus:ring-2 focus:ring-rose-400 outline-hidden bg-amber-50/20"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Mỗi bức thư là tấm lòng tri ân sâu sắc dâng lên Người
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold px-5 py-2.5 text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Thư Lên Bác Hồ</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Bức thư đã gửi với con dấu son đỏ */
              <div className="p-6 rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-amber-50/70 to-rose-50/50 space-y-4 relative overflow-hidden animate-in fade-in">
                {/* Con dấu son đỏ */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center text-center rotate-12 opacity-80 pointer-events-none p-1">
                  <span className="text-[9px] font-black uppercase">
                    ★ ĐÃ TIẾP NHẬN BÁO CÔNG ★
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500">{sentLetter.date}</span>
                  <h4 className="text-base font-bold font-serif text-slate-900">
                    Thư Báo Công Dâng Lên Bác Hồ Kính Yêu
                  </h4>
                  <p className="text-xs font-semibold text-rose-700">
                    Người gửi: {sentLetter.sender} ({sentLetter.classSchool})
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200 text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-line text-slate-800">
                  {sentLetter.content}
                </div>

                {/* Lời hồi âm của Bác Hồ */}
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1">
                  <span className="text-xs font-black uppercase text-rose-900">
                    Lời dặn dò thiêng liêng gửi các cháu:
                  </span>
                  <p className="text-xs sm:text-sm font-serif italic text-rose-800 leading-relaxed font-bold">
                    "Bác rất vui khi nhận được lời hứa chăm ngoan của cháu. Bác mong cháu luôn học tập tốt, lao động tốt, rèn luyện đạo đức để mai sau xây dựng Tổ quốc ta ngày càng to đẹp hơn, đàng hoàng hơn!"
                  </p>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setSentLetter(null)}
                    className="text-xs font-bold text-slate-600 hover:text-rose-700 underline cursor-pointer"
                  >
                    Viết một bức thư khác →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 8: GÓC TÔ MÀU TUỔI THƠ                                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'COLORING' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-amber-300 bg-white p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase text-amber-700">
                  Sáng Tạo Măng Non
                </span>
                <h3 className="text-xl font-black font-serif text-slate-900">
                  Góc Tô Màu Tranh Bác Hồ
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Thầy cô và các em có thể tải các bức tranh mẫu về in ra để tô màu trong các tiết sinh hoạt Sao, sinh hoạt Đội.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {COLORING_PAGES.map((page) => (
                <div
                  key={page.id}
                  className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-amber-100 relative overflow-hidden border-b border-amber-200">
                    <img
                      src={page.imageUrl}
                      alt={page.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 shadow-xs">
                      {page.difficulty}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {page.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                        {page.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-amber-200/60 space-y-2">
                      <p className="text-[10.5px] text-amber-900 italic">
                        💡 <strong>Gợi ý màu sắc:</strong> {page.guidance}
                      </p>

                      <a
                        href={page.imageUrl}
                        download
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2 text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải Tranh Về Tô Màu</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PHÂN HỆ 9: LIÊN ĐỘI MĂNG NON TP. THỦ DẦU MỘT                               */}
      {/* ========================================================================= */}
      {activeSubTab === 'BRIGADES' && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-rose-300 bg-white p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase text-rose-700">
                  Địa Phương &amp; Học Đường Đất Thủ
                </span>
                <h3 className="text-xl font-black font-serif text-slate-900">
                  Liên Đội Tiêu Biểu TP. Thủ Dầu Một Noi Gương Bác
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Mô hình Không gian văn hóa Bác Hồ tại các trường học
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCHOOL_BRIGADES.map((sch) => (
                <div
                  key={sch.id}
                  className="p-4 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50/50 shadow-xs hover:border-rose-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                        {sch.ward}
                      </span>
                      <span className="text-slate-400 font-medium">{sch.brigadeName}</span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900">
                      {sch.schoolName}
                    </h4>

                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-amber-900 block text-[11px] uppercase">
                        Mô hình tiêu biểu:
                      </span>
                      <p className="leading-relaxed">{sch.highlightModel}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-600 font-medium">
                      Đội viên: <strong>{sch.studentCount.toLocaleString()}</strong>
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {sch.goodDeedsCount.toLocaleString()} việc tốt
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Triển lãm tranh vẽ học sinh */}
          <div className="rounded-3xl border-2 border-amber-300 bg-amber-50/30 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h4 className="font-black font-serif text-slate-900 text-base uppercase">
                Tranh Vẽ Thiếu Nhi Đất Thủ Về Bác Hồ Kính Yêu
              </h4>
              <span className="text-xs text-slate-500">Hội thi Nét vẽ tuổi thơ 2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SCHOOL_ARTWORKS.map((art) => (
                <div
                  key={art.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-amber-100 relative overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 shadow-xs">
                      {art.award}
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">{art.title}</h5>
                    <p className="text-[10.5px] text-rose-800 font-bold">{art.studentName} ({art.gradeClass})</p>
                    <p className="text-[10px] text-slate-400">{art.schoolName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT ẢNH BÁC HỒ                                                  */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 relative border-2 border-amber-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10.5px] font-black uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  Ảnh Tư Liệu Lịch Sử · Năm {selectedPhoto.year}
                </span>
                <h3 className="text-lg font-bold font-serif text-slate-900 pt-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedPhoto.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
              {selectedPhoto.description}
            </p>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-xs font-serif italic font-bold text-rose-900">
                "{selectedPhoto.quote}"
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT ĐỊA DANH LỊCH SỬ                                            */}
      {/* ========================================================================= */}
      {selectedSite && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedSite(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 relative border-2 border-amber-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10.5px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                  {selectedSite.province} · {selectedSite.yearPeriod}
                </span>
                <h3 className="text-lg font-bold font-serif text-slate-900 pt-1">
                  {selectedSite.name}
                </h3>
                <p className="text-xs text-rose-700 font-bold">{selectedSite.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSite(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={selectedSite.imageUrl}
                alt={selectedSite.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedSite.summary}
            </p>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[11px] font-bold text-amber-900 uppercase block">
                Ý nghĩa đối với thế hệ măng non:
              </span>
              <p className="text-xs text-slate-700 italic">
                {selectedSite.childhoodConnection}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>{selectedSite.address}</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT TRANH TRUNG TÂM BÁC HỒ QUÀNG KHĂN ĐỎ                       */}
      {/* ========================================================================= */}
      {showCenterArtModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowCenterArtModal(false)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-6 shadow-2xl space-y-4 relative border-2 border-amber-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-xs pb-2 z-10 border-b border-amber-100">
              <div>
                <span className="text-[10.5px] font-black uppercase text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                  Biểu Tượng Thiêng Liêng · Trường Học Thân Thiện
                </span>
                <h3 className="text-xl font-bold font-serif text-[#781B26] pt-1">
                  Bác Hồ Đeo Khăn Quàng Đỏ Cho Thiếu Nhi
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Tác phẩm hội họa trung tâm Không gian Văn hóa Hồ Chí Minh trong trường học
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCenterArtModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold shrink-0 ml-2"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[314/320] max-h-[340px] mx-auto rounded-2xl overflow-hidden bg-amber-50 border-2 border-amber-300 relative shadow-inner flex items-center justify-center">
              <img
                src="/assets/hcm-space/bac-ho-thieu-nhi-khan-quang.jpg"
                alt="Bác Hồ đeo khăn quàng đỏ cho thiếu nhi"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#FFFDF9] p-4 rounded-2xl border border-amber-200">
              <p>
                Bức tranh khắc họa khoảnh khắc thiêng liêng và trìu mến: Bác Hồ kính yêu với nụ cười hiền hậu, đôi mắt chan chứa yêu thương, tự tay thắt chiếc khăn quàng đỏ thắm lên vai người đội viên thiếu niên tiền phong.
              </p>
              <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-center font-serif">
                <span className="text-sm font-bold text-amber-950 block">
                  "Vì lợi ích mười năm trồng cây,<br />Vì lợi ích trăm năm trồng người."
                </span>
                <span className="text-xs text-amber-800 italic mt-0.5 block">— Chủ tịch Hồ Chí Minh —</span>
              </div>
              <p className="text-xs text-slate-600">
                Khăn quàng đỏ là một phần của lá cờ Tổ quốc, màu đỏ tượng trưng cho lý tưởng cách mạng. Được Bác Hồ quàng khăn đỏ là niềm vinh dự, tự hào lớn lao và là lời nhắc nhở mỗi học sinh không ngừng phấn đấu trở thành con ngoan, trò giỏi, cháu ngoan Bác Hồ.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowCenterArtModal(false);
                  setActiveSubTab('SONGS');
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-sm transition-all"
              >
                🎵 Nghe Bài Hát "Ai Yêu Bác Hồ Chí Minh..."
              </button>
              <button
                type="button"
                onClick={() => setShowCenterArtModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
