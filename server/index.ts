import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { createHcmSpaceRouter } from './hcmSpaceRouter';
import { createVoiceStudioProxyRouter } from './voiceStudioRouter';

const app = express();
const PORT = Number(process.env.PORT || 3002);

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Không Gian Văn Hóa Hồ Chí Minh API',
    database: 'data/hcm_space.db',
    timestamp: new Date().toISOString(),
  });
});

// Mount HCM Cultural Space API
app.use('/api/hcm-space', createHcmSpaceRouter());

// Mount CIT Voice Studio Proxy (VieNeu-TTS & Kokoro)
app.use('/api/voice-studio', createVoiceStudioProxyRouter());

// Serve public assets
app.use(express.static(path.resolve('public')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏛️ Không Gian Văn Hóa Hồ Chí Minh API Server đang hoạt động tại: http://localhost:${PORT}`);
  console.log(`🔗 REST API HCM: http://localhost:${PORT}/api/hcm-space`);
  console.log(`🎙️ CIT Voice Studio Proxy: http://localhost:${PORT}/api/voice-studio`);
});
