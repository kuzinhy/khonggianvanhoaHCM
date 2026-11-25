import React, { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Download,
  ExternalLink,
  Sparkles,
  Check,
  Radio,
  Sliders,
  X,
  RefreshCw,
  Cpu,
  Layers,
  FileAudio,
  Landmark,
  Headphones,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  hcmVoiceService,
  BUILTIN_VOICES,
  ACOUSTIC_PROFILES,
  type VoiceState,
  type AcousticProfileType,
} from '../services/hcmVoiceService';
import { DongSonDrumIcon, HoaSenIcon } from './TraditionalMotifs';

interface HcmVoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
}

const SAMPLE_TEXT_TEMPLATES = [
  {
    title: 'Lời kêu gọi Toàn quốc kháng chiến (1946)',
    text: 'Hỡi đồng bào toàn quốc! Chúng ta muốn hòa bình, chúng ta phải nhân nhượng. Nhưng chúng ta càng nhân nhượng, thực dân Pháp càng lấn tới, vì chúng quyết tâm cướp nước ta lần nữa! Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
  },
  {
    title: 'Trích Tuyên ngôn Độc lập (02/9/1945)',
    text: 'Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.',
  },
  {
    title: 'Chuẩn mực Cần Kiệm Liêm Chính (QĐ 144)',
    text: 'Trời có bốn mùa: Xuân, Hạ, Thu, Đông. Đất có bốn phương: Đông, Tây, Nam, Bắc. Người có bốn đức: Cần, Kiệm, Liêm, Chính. Thiếu một mùa, thì không thành trời. Thiếu một phương, thì không thành đất. Thiếu một đức, thì không thành người.',
  },
  {
    title: 'Di chúc về Đoàn kết trong Đảng (1969)',
    text: 'Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.',
  },
];

export const HcmVoiceStudioModal: React.FC<HcmVoiceStudioModalProps> = ({
  isOpen,
  onClose,
  initialText,
}) => {
  const [voiceState, setVoiceState] = useState<VoiceState>(hcmVoiceService.getState());
  const [inputText, setInputText] = useState(initialText || SAMPLE_TEXT_TEMPLATES[0].text);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAdvancedCit, setShowAdvancedCit] = useState(false);
  const [isCheckingServer, setIsCheckingServer] = useState(false);

  useEffect(() => {
    const unsubscribe = hcmVoiceService.subscribe((s) => setVoiceState(s));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  if (!isOpen) return null;

  const handlePlayToggle = async () => {
    if (voiceState.isPlaying) {
      hcmVoiceService.stop();
    } else {
      await hcmVoiceService.speak(inputText);
    }
  };

  const handleDownloadAudio = async () => {
    setIsDownloading(true);
    await hcmVoiceService.downloadAudio(inputText);
    setIsDownloading(false);
  };

  const handleCheckCit = async () => {
    setIsCheckingServer(true);
    await hcmVoiceService.checkServerStatus();
    setIsCheckingServer(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-5 overflow-y-auto backdrop-blur-xs select-none">
      <div className="relative w-full max-w-3xl rounded-3xl border border-amber-300 bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header Toolbar */}
        <div className="bg-linear-to-r from-[#85080C] via-[#9B1218] to-[#69060A] px-5 py-4 text-white flex items-center justify-between gap-3 shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-amber-400 p-2 text-rose-950 shadow-md">
              <Mic className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Phòng Thu Giọng Đọc AI &amp; Thuyết Minh Di Sản
                </h3>
                <span className="rounded-full bg-emerald-500/25 border border-emerald-300 px-2.5 py-0.5 text-[10.5px] font-black text-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-300" /> Tích Hợp Sẵn 100%
                </span>
              </div>
              <p className="text-xs text-amber-100/90 mt-0.5">
                Hoạt động trực tiếp trên web, phát thanh tự nhiên, không cần cài đặt thêm phần mềm ngoài.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              hcmVoiceService.stop();
              onClose();
            }}
            className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 text-white cursor-pointer transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800 flex-1">
          {/* Ready Status Card */}
          <div className="rounded-2xl border border-emerald-300 bg-gradient-to-r from-emerald-50/90 via-white to-amber-50/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="flex h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50 animate-pulse shrink-0" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-emerald-950">
                  HỆ THỐNG GIỌNG ĐỌC AI NỘI TẠI: ĐÃ KÍCH HOẠT SẴN SÀNG 100%
                </p>
                <p className="text-[11.5px] text-slate-600 mt-0.5">
                  Động cơ âm thanh tiếng Việt chạy trực tiếp trên website. Bạn chỉ cần chọn giọng đọc, hiệu ứng âm hưởng và bấm nghe ngay lập tức!
                </p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0 self-start sm:self-auto">
              Không cần cài đặt
            </span>
          </div>

          {/* Sacred Heritage Preservation Banner for President Ho Chi Minh's Voice */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/90 p-3.5 space-y-1.5 text-xs text-amber-950 shadow-2xs">
            <div className="flex items-center gap-2 font-black text-rose-900">
              <span className="text-base">🛡️</span>
              <span className="uppercase tracking-wide">Nguyên Tắc Bất Khả Xâm Phạm Về Giọng Nói Bác Hồ:</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-slate-800">
              Toàn bộ các bản ghi âm lời nói và giọng đọc lịch sử của <strong>Chủ tịch Hồ Chí Minh</strong> (Tuyên ngôn Độc lập 1945, Lời kêu gọi toàn quốc kháng chiến 1946, 1966, Thơ chúc Tết...) là <strong>Bảo vật Di sản Quốc gia thiêng liêng</strong>, được <strong>bảo tồn nguyên vẹn 100% âm thanh tư liệu gốc</strong> từ Đài Tiếng nói Việt Nam (VOV).
              <br />
              <strong className="text-rose-900">Hệ thống tuyệt đối không sử dụng công nghệ AI để thay thế, giả lập hay làm sai lệch giọng nói của Bác Hồ.</strong> Các giọng đọc AI dưới đây chỉ phục vụ vai trò Phát thanh viên thuyết minh bài viết, đọc tài liệu hướng dẫn và hỗ trợ bạn đọc.
            </p>
          </div>

          {/* Voice Character & Acoustic Effect Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Voice Character Selector */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Volume2 className="h-4 w-4 text-rose-700" />
                <span>03 Giọng Đọc Phát Thanh Viên Thuyết Minh</span>
              </label>

              <div className="space-y-1.5 pt-1">
                {BUILTIN_VOICES.map((v) => {
                  const isCur = v.id === voiceState.selectedVoiceId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => hcmVoiceService.setVoice(v.id)}
                      className={`w-full rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                        isCur
                          ? 'border-rose-600 bg-rose-50/90 text-rose-950 font-bold ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold">{v.name}</span>
                        <span className="text-[10px] font-bold text-amber-700">{v.accent}</span>
                      </div>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 line-clamp-1">{v.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Acoustic Profiles Selector */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Headphones className="h-4 w-4 text-amber-600" />
                <span>04 Hiệu Ứng Âm Hưởng Phòng Thu</span>
              </label>

              <div className="space-y-1.5 pt-1">
                {ACOUSTIC_PROFILES.map((ap) => {
                  const isCur = ap.id === voiceState.acousticProfile;
                  return (
                    <button
                      key={ap.id}
                      type="button"
                      onClick={() => hcmVoiceService.setAcousticProfile(ap.id)}
                      className={`w-full rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                        isCur
                          ? 'border-amber-500 bg-amber-50/90 text-amber-950 font-bold ring-2 ring-amber-400/30 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3 text-amber-600" />
                          <span>{ap.name}</span>
                        </span>
                        {isCur && <span className="text-[10px] font-black text-amber-800">Đang chọn</span>}
                      </div>
                      <p className="text-[10.5px] text-slate-500 mt-0.5 line-clamp-1">{ap.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Speed & Volume Sliders */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-rose-700" /> Tốc độ đọc: {voiceState.speed}x
              </span>
              <span>Âm lượng: {Math.round(voiceState.volume * 100)}%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="range"
                min="0.7"
                max="1.4"
                step="0.05"
                value={voiceState.speed}
                onChange={(e) => hcmVoiceService.setSpeed(Number(e.target.value))}
                className="w-full accent-rose-700 cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={voiceState.volume}
                onChange={(e) => hcmVoiceService.setVolume(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Sample Text Templates */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>MẪU VĂN KIỆN &amp; LỜI DẠY CỦA BÁC HỒ:</span>
              <span className="text-[11px] text-slate-500">Chạm để nạp văn bản mẫu</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_TEXT_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputText(tmpl.text)}
                  className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 px-3 py-1 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  {tmpl.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Input Text Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              Nội Dung Cần Phát Thanh / Thuyết Minh:
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập hoặc dán nội dung bài phát biểu, nghị quyết, câu chuyện lịch sử tại đây..."
              className="w-full rounded-2xl border border-slate-300 p-3 text-xs sm:text-sm leading-relaxed text-slate-900 shadow-2xs focus:border-rose-500 focus:outline-hidden"
            />
          </div>

          {/* Playback Controls & Waveform */}
          <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/70 via-white to-rose-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePlayToggle}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                  voiceState.isPlaying
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-rose-700 hover:bg-rose-800 text-white'
                }`}
              >
                {voiceState.isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Tạm Dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>Phát Giọng Đọc Trực Tiếp</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => hcmVoiceService.stop()}
                className="rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
              >
                Dừng
              </button>

              {/* Animated waveform bars while playing */}
              {voiceState.isPlaying && (
                <div className="flex items-center gap-1 px-2">
                  <span className="h-3 w-1 rounded-full bg-rose-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-5 w-1 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-6 w-1 rounded-full bg-rose-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="h-4 w-1 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '450ms' }} />
                  <span className="text-[11px] font-bold text-rose-800 ml-1">Đang phát thuyết minh...</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownloadAudio}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-2.5 text-xs font-bold text-blue-900 shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
              title="Xuất file âm thanh MP3 phục vụ loa phát thanh chi bộ / khu phố"
            >
              <Download className="h-4 w-4 text-blue-700" />
              <span>{isDownloading ? 'Đang xuất MP3...' : 'Tải File MP3 Phát Thanh'}</span>
            </button>
          </div>

          {/* Optional CIT Voice Studio Integration Toggle */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2 text-xs">
            <button
              type="button"
              onClick={() => setShowAdvancedCit((prev) => !prev)}
              className="w-full flex items-center justify-between text-slate-700 font-bold hover:text-slate-900 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Radio className="h-4 w-4 text-amber-600" />
                <span>Tùy chọn mở rộng: Kết nối thêm CIT Voice Studio Desktop (VieNeu-TTS Cục bộ)</span>
              </span>
              {showAdvancedCit ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showAdvancedCit && (
              <div className="space-y-2 pt-2 border-t border-slate-200 text-slate-600 leading-relaxed text-[11.5px] animate-in fade-in">
                <p>
                  Website đã có <strong>động cơ giọng đọc tích hợp sẵn 100%</strong>. Nếu bạn muốn sử dụng thêm ứng dụng <strong>CIT Voice Studio</strong> chuyên sâu trên máy tính (chạy trên GPU NVIDIA cục bộ):
                </p>
                <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${voiceState.isCitOnline ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    <span>Cổng 8001: {voiceState.isCitOnline ? 'Đang kết nối VieNeu-TTS' : 'Không có ứng dụng desktop (vẫn chạy In-Web hoàn hảo)'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckCit}
                    disabled={isCheckingServer}
                    className="rounded-lg border px-2 py-0.5 text-[10.5px] font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    {isCheckingServer ? 'Đang quét...' : 'Dò lại cổng 8001'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span>Mã nguồn tham khảo:</span>
                  <a
                    href="https://github.com/Cuongyd196/cit-voice-studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-700 font-bold hover:underline"
                  >
                    <span>Cuongyd196/cit-voice-studio</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Công nghệ: Tích hợp âm thanh tiếng Việt số hóa · VieNeu-TTS &amp; Web Audio</span>
          <button
            type="button"
            onClick={() => {
              hcmVoiceService.stop();
              onClose();
            }}
            className="rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 font-bold cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
