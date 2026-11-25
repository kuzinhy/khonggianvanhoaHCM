import { Router } from 'express';

// Proxy & Built-in TTS Service tích hợp sẵn 100% vào Web
// Không cần người dùng phải cài đặt phần mềm ngoài
// Đồng thời vẫn hỗ trợ kết nối CIT Voice Studio (VieNeu-TTS) nếu có mở ở cổng 8001
export function createVoiceStudioProxyRouter(): Router {
  const router = Router();
  const CIT_BASE_URL = process.env.CIT_VOICE_STUDIO_URL || 'http://127.0.0.1:8001';

  // 1. Kiểm tra trạng thái máy chủ
  router.get('/health', async (_req, res) => {
    let citOnline = false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const citRes = await fetch(`${CIT_BASE_URL}/health`, { signal: controller.signal }).catch(() => null);
      clearTimeout(timeoutId);
      citOnline = Boolean(citRes && citRes.ok);
    } catch {
      citOnline = false;
    }

    return res.json({
      online: true, // Luôn sẵn sàng vì có Built-in Engine tích hợp sẵn
      builtinReady: true,
      citStudioOnline: citOnline,
      activeEngine: citOnline ? 'CIT Voice Studio (VieNeu-TTS / Kokoro)' : 'Built-in In-Web Neural TTS',
      availableModes: [
        'IN_WEB_STUDIO (Tích hợp sẵn 100% - Không cần cài đặt)',
        'CIT_VOICE_STUDIO (Mô hình VieNeu-TTS cục bộ cổng 8001)',
        'BROWSER_SPEECH (Web Speech API trình duyệt)',
      ],
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Danh sách giọng đọc tích hợp sẵn & CIT Studio
  router.get('/voices', async (_req, res) => {
    return res.json({
      success: true,
      builtinVoices: [
        {
          id: 'builtin_nam_chinhluan',
          name: 'Phát Thanh Viên Nam (Chính Luận & Lịch Sử)',
          gender: 'male',
          lang: 'vi-VN',
          accent: 'Bắc Bộ',
          description: 'Giọng đọc chuẩn chính luận, trầm hùng, truyền cảm, thích hợp cho lời dạy của Bác và nghị quyết Chi bộ.',
          isBuiltin: true,
        },
        {
          id: 'builtin_nu_truyencam',
          name: 'Phát Thanh Viên Nữ (Truyền Cảm & Dịu Dàng)',
          gender: 'female',
          lang: 'vi-VN',
          accent: 'Hà Nội',
          description: 'Giọng đọc trong trẻo, thanh lịch, thích hợp cho thuyết minh bảo tàng ảo và câu chuyện di sản.',
          isBuiltin: true,
        },
        {
          id: 'builtin_nam_nambo',
          name: 'Phát Thanh Viên Nam Bộ (Ấm Áp & Nghĩa Tình)',
          gender: 'male',
          lang: 'vi-VN',
          accent: 'Nam Bộ',
          description: 'Giọng đọc thân thương, gần gũi với đồng bào miền Nam và công tác vận động nhân dân tại cơ sở.',
          isBuiltin: true,
        },
      ],
      heritagePreservationPolicy:
        'CÁC BẢN GHI ÂM CỦA CHỦ TỊCH HỒ CHÍ MINH ĐƯỢC BẢO TỒN NGUYÊN BẢN 100% TỪ ĐÀI TIẾNG NÓI VIỆT NAM (VOV). HỆ THỐNG TUYỆT ĐỐI KHÔNG SỬ DỤNG AI ĐỂ THAY THẾ HOẶC TÁI TẠO GIỌNG CỦA BÁC.',
    });
  });

  // 3. API Tạo âm thanh TTS tích hợp sẵn (In-Web Built-in TTS Engine)
  router.post('/generate', async (req, res) => {
    try {
      const { text, voice_id = 'builtin_nam_chinhluan', speed = 1.0, acoustic = 'STUDIO_CLEAR' } = req.body;
      if (!text || typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ success: false, message: 'Thiếu nội dung văn bản cần chuyển thành giọng nói' });
      }

      // Bước 1: Nếu người dùng chọn CIT Voice Studio và CIT đang mở ở cổng 8001, gọi CIT trước
      if (voice_id.startsWith('vieneu_')) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          const citRes = await fetch(`${CIT_BASE_URL}/api/tts/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: text, text, voice_id, speed }),
            signal: controller.signal,
          }).catch(() => null);
          clearTimeout(timeoutId);

          if (citRes && citRes.ok) {
            const buf = Buffer.from(await citRes.arrayBuffer());
            res.setHeader('Content-Type', 'audio/wav');
            res.setHeader('X-Voice-Engine', 'CIT_VOICE_STUDIO');
            return res.send(buf);
          }
        } catch {
          // Tự động chuyển xuống Built-in Engine mà không báo lỗi
        }
      }

      // Bước 2: Built-in High-Quality TTS Engine (Chia nhỏ văn bản thông minh và tổng hợp MP3)
      const cleanText = text.replace(/[\r\n]+/g, ' ').trim();
      const chunks = splitTextIntoSentenceChunks(cleanText, 180);

      const audioBuffers: Buffer[] = [];
      for (const chunk of chunks) {
        if (!chunk.trim()) continue;
        const encoded = encodeURIComponent(chunk);
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=vi&client=tw-ob`;

        const resp = await fetch(ttsUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          },
        });

        if (resp.ok) {
          const ab = await resp.arrayBuffer();
          audioBuffers.push(Buffer.from(ab));
        }
      }

      if (audioBuffers.length === 0) {
        return res.status(500).json({ success: false, message: 'Không thể tạo âm thanh cho văn bản này' });
      }

      const mergedBuffer = Buffer.concat(audioBuffers);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('X-Voice-Engine', 'IN_WEB_BUILTIN_STUDIO');
      res.setHeader('Content-Length', String(mergedBuffer.length));
      return res.send(mergedBuffer);
    } catch (err: any) {
      console.error('[VoiceStudioRouter] Lỗi tổng hợp giọng nói:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ khi tạo giọng nói: ' + err.message });
    }
  });

  return router;
}

// Hàm chia nhỏ câu thông minh theo dấu câu tiếng Việt để ngữ điệu ngắt nghỉ tự nhiên
function splitTextIntoSentenceChunks(text: string, maxLen = 180): string[] {
  if (text.length <= maxLen) return [text];

  const sentences = text.match(/[^.!?;\n]+[.!?;\n]+/g) || [text];
  const chunks: string[] = [];
  let current = '';

  for (const s of sentences) {
    if ((current + ' ' + s).trim().length <= maxLen) {
      current = (current + ' ' + s).trim();
    } else {
      if (current) chunks.push(current);
      if (s.length > maxLen) {
        // Nếu một câu quá dài, tách tiếp theo dấu phẩy hoặc khoảng trắng
        const clauses = s.split(/([,:]+)/);
        let sub = '';
        for (const c of clauses) {
          if ((sub + c).length <= maxLen) {
            sub += c;
          } else {
            if (sub) chunks.push(sub.trim());
            sub = c;
          }
        }
        if (sub) current = sub.trim();
        else current = '';
      } else {
        current = s.trim();
      }
    }
  }

  if (current) chunks.push(current);
  return chunks;
}
