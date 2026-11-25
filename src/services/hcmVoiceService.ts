// Dịch vụ Quản lý Giọng đọc & Phòng Thu Thuyết Minh Tích Hợp Sẵn 100% vào Web
// Hoạt động ngay lập tức, không yêu cầu người dùng phải cài đặt bất kỳ phần mềm ngoài nào.
// Đồng thời vẫn giữ tương thích mở rộng với CIT Voice Studio (VieNeu-TTS) nếu người dùng có bật cổng 8001.

export type VoiceEngineType = 'BUILTIN_WEB_AI' | 'CIT_VOICE_STUDIO' | 'BROWSER_SPEECH';
export type AcousticProfileType = 'STUDIO_CLEAR' | 'BROADCAST_WARM' | 'HISTORIC_RADIO' | 'CEREMONIAL_HALL';

export interface VoiceOption {
  id: string;
  name: string;
  engine: VoiceEngineType;
  lang: string;
  gender: 'male' | 'female';
  accent: string;
  description: string;
}

export interface AcousticProfile {
  id: AcousticProfileType;
  name: string;
  description: string;
  iconName: string;
}

export interface VoiceState {
  engine: VoiceEngineType;
  isBuiltinReady: boolean;
  isCitOnline: boolean;
  selectedVoiceId: string;
  acousticProfile: AcousticProfileType;
  speed: number;
  pitch: number;
  volume: number;
  isPlaying: boolean;
  currentText: string;
  error: string | null;
}

export const BUILTIN_VOICES: VoiceOption[] = [
  {
    id: 'builtin_nam_chinhluan',
    name: 'Phát Thanh Viên Nam (Chính Luận & Lịch Sử)',
    engine: 'BUILTIN_WEB_AI',
    lang: 'vi-VN',
    gender: 'male',
    accent: 'Bắc Bộ chuẩn',
    description: 'Âm sắc chuẩn chính luận, trầm hùng, khúc chiết, tối ưu cho lời dạy của Bác và sinh hoạt chuyên đề Chi bộ.',
  },
  {
    id: 'builtin_nu_truyencam',
    name: 'Phát Thanh Viên Nữ (Truyền Cảm & Dịu Dàng)',
    engine: 'BUILTIN_WEB_AI',
    lang: 'vi-VN',
    gender: 'female',
    accent: 'Hà Nội',
    description: 'Giọng đọc trong trẻo, mượt mà, sâu lắng, thích hợp cho thuyết minh bảo tàng ảo và câu chuyện di sản.',
  },
  {
    id: 'builtin_nam_nambo',
    name: 'Phát Thanh Viên Nam Bộ (Ấm Áp & Nghĩa Tình)',
    engine: 'BUILTIN_WEB_AI',
    lang: 'vi-VN',
    gender: 'male',
    accent: 'Nam Bộ',
    description: 'Âm điệu thân thương, nghĩa tình, gắn bó với nhân dân và các mô hình cơ sở tại địa phương.',
  },
];

// NGUYÊN TẮC BẢO TỒN BẢN QUYỀN DI SẢN LỊCH SỬ QUỐC GIA:
// Riêng các bản ghi âm lời nói và giọng đọc của Chủ tịch Hồ Chí Minh (Tuyên ngôn Độc lập 1945, Lời kêu gọi 1946,
// Lời kêu gọi 1966, Thơ chúc Tết 1969...) TUYỆT ĐỐI GIỮ NGUYÊN BẢN TƯ LIỆU GỐC từ Đài Tiếng nói Việt Nam (VOV).
// HỆ THỐNG CẤM HOÀN TOÀN VIỆC SỬ DỤNG AI ĐỂ TÁI TẠO, GIẢ LẬP HOẶC THAY THẾ GIỌNG ĐỌC CỦA BÁC HỒ.
// Động cơ AI chỉ phục vụ thuyết minh viên bài viết nghiên cứu và hỗ trợ bạn đọc.

export const ACOUSTIC_PROFILES: AcousticProfile[] = [
  {
    id: 'STUDIO_CLEAR',
    name: 'Phòng Thu Tiêu Chuẩn',
    description: 'Âm thanh trong trẻo, sắc nét, tối ưu cho nghe qua tai nghe và điện thoại.',
    iconName: 'Sparkles',
  },
  {
    id: 'BROADCAST_WARM',
    name: 'Đài Tiếng Nói Việt Nam',
    description: 'Âm sắc trầm ấm, dải trung dồi dào, âm hưởng phát thanh viên quốc gia.',
    iconName: 'Radio',
  },
  {
    id: 'HISTORIC_RADIO',
    name: 'Loa Truyền Thanh Kháng Chiến',
    description: 'Tái hiện âm hưởng hào hùng của loa phóng thanh thời kỳ kháng chiến cứu nước.',
    iconName: 'Volume2',
  },
  {
    id: 'CEREMONIAL_HALL',
    name: 'Hội Trường Ba Đình Thiêng Liêng',
    description: 'Độ vang không gian trang trọng, như đang lắng nghe tại quảng trường lịch sử.',
    iconName: 'Landmark',
  },
];

class HcmVoiceService {
  private state: VoiceState = {
    engine: 'BUILTIN_WEB_AI',
    isBuiltinReady: true,
    isCitOnline: false,
    selectedVoiceId: 'builtin_nam_chinhluan',
    acousticProfile: 'STUDIO_CLEAR',
    speed: 1.0,
    pitch: 1.0,
    volume: 1.0,
    isPlaying: false,
    currentText: '',
    error: null,
  };

  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private listeners: Set<(state: VoiceState) => void> = new Set();
  private checkPromise: Promise<boolean> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.checkServerStatus();
    }
  }

  public subscribe(listener: (state: VoiceState) => void): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const s = { ...this.state };
    this.listeners.forEach((fn) => fn(s));
  }

  public getState(): VoiceState {
    return { ...this.state };
  }

  public setSpeed(speed: number) {
    this.state.speed = Math.max(0.6, Math.min(1.6, Number(speed.toFixed(2))));
    if (this.audioElement) {
      this.audioElement.playbackRate = this.state.speed;
    }
    this.notify();
  }

  public setVolume(volume: number) {
    this.state.volume = Math.max(0, Math.min(1, Number(volume.toFixed(2))));
    if (this.audioElement) {
      this.audioElement.volume = this.state.volume;
    }
    this.notify();
  }

  public setVoice(voiceId: string) {
    this.state.selectedVoiceId = voiceId;
    this.notify();
  }

  public setEngine(engine: VoiceEngineType) {
    this.state.engine = engine;
    this.notify();
  }

  public setAcousticProfile(profile: AcousticProfileType) {
    this.state.acousticProfile = profile;
    this.notify();
  }

  // Kiểm tra trạng thái máy chủ (tự động phát hiện CIT Studio nếu có)
  public async checkServerStatus(): Promise<boolean> {
    if (this.checkPromise) return this.checkPromise;

    this.checkPromise = (async () => {
      try {
        const res = await fetch('http://localhost:3002/api/voice-studio/health').catch(() => null);
        if (res && res.ok) {
          const json = await res.json();
          this.state.isBuiltinReady = true;
          this.state.isCitOnline = Boolean(json.citStudioOnline);
        } else {
          this.state.isBuiltinReady = true;
          this.state.isCitOnline = false;
        }
      } catch {
        this.state.isBuiltinReady = true;
        this.state.isCitOnline = false;
      } finally {
        this.checkPromise = null;
        this.notify();
      }
      return this.state.isBuiltinReady;
    })();

    return this.checkPromise;
  }

  // Phát giọng đọc thuyết minh (Tích hợp sẵn 100%)
  public async speak(
    text: string,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): Promise<boolean> {
    this.stop();

    if (!text || !text.trim()) return false;
    this.state.currentText = text;
    this.state.isPlaying = true;
    this.state.error = null;
    this.notify();

    // 1. Nếu dùng Built-in In-Web AI Engine (Khuyến nghị mặc định - không cần cài app)
    if (this.state.engine === 'BUILTIN_WEB_AI' || this.state.engine === 'CIT_VOICE_STUDIO') {
      try {
        const audioBlob = await this.fetchAudioFromBackend(
          text,
          this.state.selectedVoiceId,
          this.state.speed,
          this.state.acousticProfile
        );

        if (audioBlob) {
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.volume = this.state.volume;
          audio.playbackRate = this.state.speed;
          this.audioElement = audio;

          // Áp dụng bộ lọc âm hưởng Web Audio API nếu được hỗ trợ
          this.applyWebAudioEffects(audio, this.state.acousticProfile);

          audio.onended = () => {
            this.state.isPlaying = false;
            this.notify();
            URL.revokeObjectURL(audioUrl);
            onEnd?.();
          };

          audio.onerror = (e) => {
            console.warn('[HcmVoiceService] Lỗi phát Audio Stream, tự động chuyển Browser Fallback:', e);
            this.fallbackToBrowserSpeech(text, onEnd, onError);
          };

          await audio.play();
          return true;
        }
      } catch (err) {
        console.warn('[HcmVoiceService] Built-in Stream gặp sự cố, tự động fallback:', err);
      }
    }

    // 2. Chế độ Dự phòng: Web Speech API của trình duyệt
    return this.fallbackToBrowserSpeech(text, onEnd, onError);
  }

  // Gọi API Backend lấy file âm thanh MP3
  private async fetchAudioFromBackend(
    text: string,
    voiceId: string,
    speed: number,
    acoustic: string
  ): Promise<Blob | null> {
    const payload = {
      text,
      voice_id: voiceId,
      speed,
      acoustic,
    };

    const res = await fetch('http://localhost:3002/api/voice-studio/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (res && res.ok) {
      return await res.blob();
    }
    return null;
  }

  // Áp dụng bộ lọc âm hưởng Web Audio API (EQ, Reverb, Radio Bandpass)
  private applyWebAudioEffects(audio: HTMLAudioElement, profile: AcousticProfileType) {
    if (typeof window === 'undefined' || !window.AudioContext) return;
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const ctx = this.audioContext;
      const source = ctx.createMediaElementSource(audio);

      if (profile === 'BROADCAST_WARM') {
        // Tăng cường dải trầm và dải trung (phát thanh viên)
        const bass = ctx.createBiquadFilter();
        bass.type = 'lowshelf';
        bass.frequency.value = 250;
        bass.gain.value = 4.5;

        const mid = ctx.createBiquadFilter();
        mid.type = 'peaking';
        mid.frequency.value = 1800;
        mid.gain.value = 2.0;

        source.connect(bass);
        bass.connect(mid);
        mid.connect(ctx.destination);
      } else if (profile === 'HISTORIC_RADIO') {
        // Cắt bớt dải siêu trầm và siêu cao, tạo chất âm loa phóng thanh truyền thống
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 1400;
        bandpass.Q.value = 1.2;

        source.connect(bandpass);
        bandpass.connect(ctx.destination);
      } else if (profile === 'CEREMONIAL_HALL') {
        // Tạo không gian vang nhẹ như hội trường
        const delay = ctx.createDelay();
        delay.delayTime.value = 0.08;

        const feedback = ctx.createGain();
        feedback.gain.value = 0.25;

        const merger = ctx.createGain();
        source.connect(merger);
        source.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        feedback.connect(merger);
        merger.connect(ctx.destination);
      } else {
        // Tiêu chuẩn trực tiếp
        source.connect(ctx.destination);
      }
    } catch {
      // Bỏ qua nếu trình duyệt chặn CORS audio context
    }
  }

  // Fallback trình duyệt
  private fallbackToBrowserSpeech(
    text: string,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.state.isPlaying = false;
      this.state.error = 'Trình duyệt không hỗ trợ phát âm thanh';
      this.notify();
      onError?.(this.state.error);
      return false;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = this.state.speed * 0.95;
    utter.pitch = this.state.pitch;
    utter.volume = this.state.volume;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.name.includes('Vietnamese'));
    if (viVoice) utter.voice = viVoice;

    utter.onend = () => {
      this.state.isPlaying = false;
      this.notify();
      onEnd?.();
    };

    utter.onerror = (e) => {
      this.state.isPlaying = false;
      this.state.error = 'Lỗi phát giọng đọc trình duyệt: ' + e.error;
      this.notify();
      onError?.(e);
    };

    window.speechSynthesis.speak(utter);
    return true;
  }

  public stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.state.isPlaying = false;
    this.notify();
  }

  // Tải file MP3 về máy phục vụ phát thanh Chi bộ / cơ sở
  public async downloadAudio(text: string, filename?: string): Promise<boolean> {
    if (!text || !text.trim()) return false;
    try {
      const blob = await this.fetchAudioFromBackend(
        text,
        this.state.selectedVoiceId,
        this.state.speed,
        this.state.acousticProfile
      );

      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `phat-thanh-chi-bo-${Date.now()}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
      }
    } catch (err) {
      console.error('[HcmVoiceService] Không thể tải file âm thanh:', err);
    }
    return false;
  }
}

export const hcmVoiceService = new HcmVoiceService();
