import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { closeSqliteDb, getSqliteDb } from '../server/db/sqliteClient';
import { createHcmSpaceRouter } from '../server/hcmSpaceRouter';
import {
  createOrUpdateDossier,
  ensureHcmV2Initialized,
  listCategories,
  listDossiers,
  listSources,
  listTopics,
  listTours,
  proposeEnrichmentDraftForDossier,
  rollbackHcmV2Migration,
  runInventoryAudit,
  syncOfficialSourceToDrafts,
} from '../server/hcmDossierRepository';
import {
  isValidPortalArticlePath,
  parseOfficialPortalAnchorsHtml,
  parsePortalArticleHtml,
  parsePortalListingHtml,
  parseRssFeedXml,
} from '../server/hcmPortalConnector';
import { applySecurity } from '../server/security';
import {
  AUDIO_ARCHIVE_4,
  BIO_CHAPTERS,
  CLASSIC_WORKS_15,
  EVALUATION_CRITERIA_5,
  FOOTPRINTS_20,
  HCM_INTERACTIVE_QUIZ_8,
  HCM_NEWS_ARTICLES_6,
  HCM_PHOTO_GALLERY,
  HCM_SPATIAL_SHOWCASE_ZONES,
  HISTORICAL_ERAS,
  HISTORICAL_EVENTS_30,
  MUSEUM_EXHIBITS_8,
  QUY_DINH_144_STANDARDS_5,
  TDM_HIGHLIGHTS_NEW_POINTS,
  TOAN_TAP_VOLUMES,
  VERIFIED_QUOTES_12,
  VIDEO_DOCUMENTARIES_11,
} from '../src/features/hcm-cultural-space/hcmCoreDataset';
import { VIRTUAL_MUSEUM_8_ZONES } from '../src/features/hcm-cultural-space/components/HcmVirtualMuseum3DStage';

test('HCM Cultural Space core dataset matches full 10-module inventory without Chánh Hiệp references', () => {
  assert.equal(BIO_CHAPTERS.length, 6);
  assert.equal(HISTORICAL_ERAS.length, 8);
  assert.equal(HISTORICAL_EVENTS_30.length, 30);
  assert.equal(TOAN_TAP_VOLUMES.length, 15);
  assert.equal(CLASSIC_WORKS_15.length, 15);
  assert.equal(VERIFIED_QUOTES_12.length, 12);
  assert.equal(FOOTPRINTS_20.length, 20);
  assert.equal(AUDIO_ARCHIVE_4.length, 4);
  assert.equal(VIDEO_DOCUMENTARIES_11.length, 11);
  assert.equal(MUSEUM_EXHIBITS_8.length, 8);
  assert.equal(HCM_PHOTO_GALLERY.length, 8);
  assert.equal(HCM_NEWS_ARTICLES_6.length, 6);
  assert.equal(QUY_DINH_144_STANDARDS_5.length, 5);
  assert.equal(HCM_INTERACTIVE_QUIZ_8.length, 8);
  assert.equal(TDM_HIGHLIGHTS_NEW_POINTS.length, 4);
  assert.equal(HCM_SPATIAL_SHOWCASE_ZONES.length, 4);
  assert.equal(MUSEUM_EXHIBITS_8.every((ex) => Boolean(ex.imageUrl?.startsWith('/assets/hcm-space/'))), true);
  assert.equal(VIDEO_DOCUMENTARIES_11.filter((v) => Boolean(v.youtubeId)).length >= 5, true);
  assert.equal(VIDEO_DOCUMENTARIES_11.every((v) => Array.isArray(v.scenes) && v.scenes.length >= 1), true);
  assert.equal(EVALUATION_CRITERIA_5.length, 5);
  assert.equal(EVALUATION_CRITERIA_5.reduce((s, c) => s + c.weightPercent, 0), 100);
  assert.equal(EVALUATION_CRITERIA_5.reduce((s, c) => s + c.items.length, 0), 20);
  assert.equal(MUSEUM_EXHIBITS_8[5].location, 'Phường Thủ Dầu Một');
  const serialized = JSON.stringify({
    MUSEUM_EXHIBITS_8,
    EVALUATION_CRITERIA_5,
    HCM_PHOTO_GALLERY,
    HCM_NEWS_ARTICLES_6,
    QUY_DINH_144_STANDARDS_5,
    HCM_INTERACTIVE_QUIZ_8,
    TDM_HIGHLIGHTS_NEW_POINTS,
  }).toLowerCase();
  assert.equal(serialized.includes('chánh hiệp'), false);
});

test('HCM Cultural Space CRUD persists Thủ Dầu Một settings and entries without external Chánh Hiệp content', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tgs-hcm-'));
  const dbPath = path.join(dir, 'hcm.db');
  const app = express();
  applySecurity(app, async (req) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    return token === 'staff'
      ? { uid: 'u1', email: 'canbo@thudaumot.gov.vn', name: 'Cán bộ', role: 'staff', emailVerified: true, provider: 'firebase' }
      : null;
  });
  app.use(express.json());
  app.use('/api/hcm-space', createHcmSpaceRouter(dbPath));

  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((r) => server.once('listening', r));
  const base = `http://127.0.0.1:${(server.address() as any).port}`;
  const auth = { Authorization: 'Bearer staff', 'Content-Type': 'application/json' };

  try {
    assert.equal((await fetch(`${base}/api/hcm-space`)).status, 401);

    const initRes = await fetch(`${base}/api/hcm-space`, { headers: auth });
    assert.equal(initRes.status, 200);
    const initJson = await initRes.json();
    assert.equal(initJson.data.settings.title.includes('Thủ Dầu Một'), true);
    assert.equal(JSON.stringify(initJson).toLowerCase().includes('chánh hiệp'), false);

    // Update settings
    const putRes = await fetch(`${base}/api/hcm-space/settings`, {
      method: 'PUT',
      headers: auth,
      body: JSON.stringify({ title: 'Không Gian Văn Hóa HCM — Chi bộ Thủ Dầu Một' }),
    });
    assert.equal(putRes.status, 200);
    assert.equal((await putRes.json()).data.title, 'Không Gian Văn Hóa HCM — Chi bộ Thủ Dầu Một');

    // Create, update, delete a Thủ Dầu Một model entry
    const postRes = await fetch(`${base}/api/hcm-space/entries`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({
        section: 'MODEL',
        title: 'Tủ sách Bác Hồ tại Khu phố 1',
        subtitle: 'Chi bộ Khu phố 1 - Thủ Dầu Một',
        location: 'Phường Thủ Dầu Một',
        summary: 'Phục vụ nhân dân đọc sách và sinh hoạt chuyên đề hàng tháng.',
      }),
    });
    assert.equal(postRes.status, 200);
    const created = (await postRes.json()).data;

    const patchRes = await fetch(`${base}/api/hcm-space/entries/${created.id}`, {
      method: 'PATCH',
      headers: auth,
      body: JSON.stringify({ title: 'Tủ sách Bác Hồ mở rộng Khu phố 1' }),
    });
    assert.equal(patchRes.status, 200);
    assert.equal((await patchRes.json()).data.title, 'Tủ sách Bác Hồ mở rộng Khu phố 1');

    const delRes = await fetch(`${base}/api/hcm-space/entries/${created.id}`, { method: 'DELETE', headers: auth });
    assert.equal(delRes.status, 200);

    // Create, update, delete a Thủ Dầu Một news entry (section: 'NEWS')
    const newsPostRes = await fetch(`${base}/api/hcm-space/entries`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({
        section: 'NEWS',
        title: 'Sinh hoạt chuyên đề tháng 11 tại Chi bộ Khu phố 2',
        subtitle: '23/11/2026',
        location: 'Hoạt động Thủ Dầu Một',
        summary: 'Tổng kết các mô hình học tập và làm theo Bác năm 2026.',
      }),
    });
    assert.equal(newsPostRes.status, 200);
    const createdNews = (await newsPostRes.json()).data;
    assert.equal(createdNews.section, 'NEWS');

    // Checklist persistence per ward unit
    const checkRes = await fetch(`${base}/api/hcm-space/checklist`, {
      method: 'PUT',
      headers: auth,
      body: JSON.stringify({ unitName: 'Chi bộ Khu phố 1', checked: { c1_1: true, c2_1: true } }),
    });
    assert.equal(checkRes.status, 200);
    const checkJson = await checkRes.json();
    assert.equal(checkJson.data['Chi bộ Khu phố 1'].c1_1, true);

    // SSRF guard rejects external / traversal portal paths cleanly
    const badPortalRes = await fetch(`${base}/api/hcm-space/portal-article?path=${encodeURIComponent('https://evil.example/steal')}`, {
      headers: auth,
    });
    assert.equal(badPortalRes.status, 400);

    const finalRes = await (await fetch(`${base}/api/hcm-space`, { headers: auth })).json();
    assert.equal(finalRes.data.items.some((i: any) => i.id === created.id), false);
    assert.equal(finalRes.data.checklist['Chi bộ Khu phố 1'].c2_1, true);
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    closeSqliteDb(dbPath);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('HCM Portal connector parses hochiminhcity.gov.vn HTML safely and blocks SSRF paths', () => {
  assert.equal(isValidPortalArticlePath('/web/hcm/-/dan-van-kheo-2026'), true);
  assert.equal(isValidPortalArticlePath('/vi/web/hcm/w/bai-viet-test'), true);
  assert.equal(isValidPortalArticlePath('https://evil.com/web/hcm/-/abc'), false);
  assert.equal(isValidPortalArticlePath('/web/hcm/../../etc/passwd'), false);

  const sampleListHtml = `
    <div class=" news-item-pvm media mb-4" onclick="location.href='/web/hcm/-/dan-van-kheo-nam-2026'">
      <img src="/documents/39403/sample.jpg" alt="thumb" />
      <span class="custom-date-time">12:31 | 23/10/2026</span>
      <p class="content-title content-title-hover">Tuyên dương gương điển hình Dân vận khéo năm 2026</p>
      <div class="content-ds-tintuc"><p>Chương trình tuyên dương các mô hình tiêu biểu.</p></div>
    </div>
  `;
  const parsed = parsePortalListingHtml(sampleListHtml, 'tin-tuc');
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].title, 'Tuyên dương gương điển hình Dân vận khéo năm 2026');
  assert.equal(parsed[0].date, '12:31 | 23/10/2026');
  assert.equal(parsed[0].imageUrl, 'https://hochiminhcity.gov.vn/documents/39403/sample.jpg');
  assert.equal(parsed[0].articleUrl, 'https://hochiminhcity.gov.vn/web/hcm/-/dan-van-kheo-nam-2026');

  const sampleDetailHtml = `
    <div id="main-body">
      <h3 class="title-divvv">Bài viết thử nghiệm</h3>
      <span class="sp-dislaydate">23/10/2026</span>
      <div id="contentText">
        <b class="text-summary"><p>Tóm tắt mở đầu bài viết thử nghiệm.</p></b>
        <p>Đoạn nội dung thứ nhất đủ dài để được bóc tách chính xác từ trang Cổng thông tin.</p>
        <figure><img src="/documents/39403/fig1.jpg" /><figcaption>Ảnh hội nghị</figcaption></figure>
      </div>
    </div>
  `;
  const detail = parsePortalArticleHtml(sampleDetailHtml, 'https://hochiminhcity.gov.vn/web/hcm/-/test');
  assert.equal(detail.title, 'Bài viết thử nghiệm');
  assert.equal(detail.summary, 'Tóm tắt mở đầu bài viết thử nghiệm.');
  assert.equal(detail.paragraphs.length, 1);
  assert.equal(detail.images.length, 1);
  assert.equal(detail.images[0].url, 'https://hochiminhcity.gov.vn/documents/39403/fig1.jpg');
});

test('HCM V2 3-tier migration preserves legacy entries and supports full DB migration rollback', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tgs-hcm-v2-mig-'));
  const dbPath = path.join(dir, 'hcm-v2.db');
  try {
    const db = getSqliteDb(dbPath);
    db.prepare(
      `INSERT INTO hcm_cultural_entries (
        id, section, title, subtitle, location, summary, quote, image_url, status, sort_order, updated_by_uid, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      'legacy_tdm_1',
      'MODEL',
      'Góc đọc sách Bác Hồ tại Khu phố 2 phường Thủ Dầu Một',
      '2026',
      'Khu phố 2',
      'Mô hình tủ sách học tập tư tưởng Hồ Chí Minh.',
      '',
      '',
      'PUBLISHED',
      1,
      'legacy_admin',
      new Date().toISOString()
    );

    ensureHcmV2Initialized(dbPath);
    assert.equal(listCategories(dbPath).length, 7);
    assert.equal(listTopics(dbPath).length, 10);
    assert.equal(listSources(dbPath).length, 6);
    assert.equal(listTours(dbPath).length, 3);
    assert.equal(listDossiers({}, dbPath).length >= 9, true);

    const legacyMigrated = db.prepare('SELECT * FROM hcm_dossiers WHERE id = ?').get('legacy_legacy_tdm_1') as any;
    assert.ok(legacyMigrated);
    assert.equal(legacyMigrated.verification_status, 'NEEDS_VERIFICATION');

    // Rollback drops V2 tables safely while preserving legacy hcm_cultural_entries intact
    const rb = rollbackHcmV2Migration(dbPath);
    assert.equal(rb.rolledBack, true);
    const legacyStillThere = db.prepare('SELECT * FROM hcm_cultural_entries WHERE id = ?').get('legacy_tdm_1') as any;
    assert.equal(legacyStillThere?.title, 'Góc đọc sách Bác Hồ tại Khu phố 2 phường Thủ Dầu Một');
  } finally {
    closeSqliteDb(dbPath);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('HCM V2 REST enforces Maker-Checker RBAC, verification gate, versioning and rollback', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tgs-hcm-v2-rbac-'));
  const dbPath = path.join(dir, 'hcm-rbac.db');
  const app = express();
  applySecurity(app, async (req) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token === 'staff') {
      return { uid: 'u_staff', email: 'nhaplieu@thudaumot.gov.vn', name: 'Biên tập viên', role: 'staff', emailVerified: true, provider: 'firebase' };
    }
    if (token === 'admin') {
      return { uid: 'u_admin', email: 'truongban@thudaumot.gov.vn', name: 'Trưởng Ban Tuyên giáo', role: 'admin', emailVerified: true, provider: 'firebase' };
    }
    return null;
  });
  app.use(express.json());
  app.use('/api/hcm-space', createHcmSpaceRouter(dbPath));

  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((r) => server.once('listening', r));
  const base = `http://127.0.0.1:${(server.address() as any).port}`;
  const staffHeaders = { Authorization: 'Bearer staff', 'Content-Type': 'application/json' };
  const adminHeaders = { Authorization: 'Bearer admin', 'Content-Type': 'application/json' };

  try {
    const ovRes = await fetch(`${base}/api/hcm-space/v2/overview`, { headers: staffHeaders });
    assert.equal(ovRes.status, 200);
    const ovJson = await ovRes.json();
    assert.equal(ovJson.data.categories.length, 7);
    assert.equal(ovJson.data.sources.length, 6);
    assert.equal(ovJson.data.canApprove, false);

    // Staff creates draft dossier (starts NEEDS_VERIFICATION + DRAFT)
    const createRes = await fetch(`${base}/api/hcm-space/v2/dossiers`, {
      method: 'POST',
      headers: staffHeaders,
      body: JSON.stringify({
        title: 'Chi bộ Khu phố 5 triển khai Tủ sách Hồ Chí Minh',
        dossierType: 'LOCAL_ACTIVITY',
        categoryIds: ['cat_local'],
        topicId: 'top_tdm_models',
        summary: 'Tóm tắt hoạt động xây dựng tủ sách cộng đồng phục vụ nhân dân.',
        content: 'Nội dung chi tiết mô hình tủ sách phục vụ sinh hoạt chi bộ và người dân.',
        sourceName: 'Đảng ủy phường Thủ Dầu Một',
        sourceUrl: 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa',
        licenseInfo: 'Tài liệu nội bộ phường Thủ Dầu Một',
      }),
    });
    assert.equal(createRes.status, 200);
    const created = (await createRes.json()).data;
    assert.equal(created.verificationStatus, 'NEEDS_VERIFICATION');
    assert.equal(created.publishStatus, 'DRAFT');

    // Staff can submit review
    const submitRes = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/workflow`, {
      method: 'POST',
      headers: staffHeaders,
      body: JSON.stringify({ action: 'SUBMIT_REVIEW' }),
    });
    assert.equal(submitRes.status, 200);
    assert.equal((await submitRes.json()).data.publishStatus, 'PENDING_REVIEW');

    // Staff is strictly blocked (403) from VERIFY / PUBLISH / rollback / source config
    const forbiddenVerify = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/workflow`, {
      method: 'POST',
      headers: staffHeaders,
      body: JSON.stringify({ action: 'VERIFY' }),
    });
    assert.equal(forbiddenVerify.status, 403);

    const forbiddenRollback = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/rollback`, {
      method: 'POST',
      headers: staffHeaders,
      body: JSON.stringify({ versionNum: 1 }),
    });
    assert.equal(forbiddenRollback.status, 403);

    // Even admin cannot PUBLISH before VERIFY (gate returns 400)
    const unverifiedPublish = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/workflow`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({ action: 'PUBLISH' }),
    });
    assert.equal(unverifiedPublish.status, 400);

    // Admin VERIFY -> PUBLISH succeeds
    const verifyRes = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/workflow`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({ action: 'VERIFY', note: 'Đã đối chiếu nguồn chính thống' }),
    });
    assert.equal(verifyRes.status, 200);
    assert.equal((await verifyRes.json()).data.verificationStatus, 'VERIFIED');

    const pubRes = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/workflow`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({ action: 'PUBLISH' }),
    });
    assert.equal(pubRes.status, 200);
    assert.equal((await pubRes.json()).data.publishStatus, 'PUBLISHED');

    // Edit title then rollback to v1
    await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}`, {
      method: 'PATCH',
      headers: adminHeaders,
      body: JSON.stringify({ title: 'Tiêu đề chỉnh sửa tạm thời' }),
    });
    const rbRes = await fetch(`${base}/api/hcm-space/v2/dossiers/${created.id}/rollback`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({ versionNum: 1 }),
    });
    assert.equal(rbRes.status, 200);
    const restored = (await rbRes.json()).data;
    assert.equal(restored.title, 'Chi bộ Khu phố 5 triển khai Tủ sách Hồ Chí Minh');
    assert.equal(restored.version > 1, true);
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    closeSqliteDb(dbPath);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('HCM V2 collector parses RSS/HTML cleanly, enforces AI draft quarantine, deduplicates and respects rate limit', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tgs-hcm-v2-sync-'));
  const dbPath = path.join(dir, 'hcm-sync.db');
  try {
    const rssItems = parseRssFeedXml(
      `<rss><channel><item><title><![CDATA[Lan tỏa Không gian văn hóa Hồ Chí Minh tại cơ sở]]></title><link>https://baochinhphu.vn/khong-gian-van-hoa-hcm.htm</link><description><![CDATA[<img src="https://baochinhphu.vn/a.jpg" />Bài viết chuyên đề học tập và làm theo Bác.]]></description><pubDate>Mon, 23 Nov 2026 08:00:00 +0700</pubDate></item></channel></rss>`,
      'Báo Điện tử Chính phủ',
      'Báo Điện tử Chính phủ'
    );
    assert.equal(rssItems.length, 1);
    assert.equal(rssItems[0].imageUrl, 'https://baochinhphu.vn/a.jpg');

    const anchorItems = parseOfficialPortalAnchorsHtml(
      `<div><a href="/tu-tuong-hcm/chuyen-de-dan-chu-2026.htm">Chuyên đề Tư tưởng Hồ Chí Minh về dân chủ và xây dựng Đảng trong sạch</a><a href="https://external-bad.com/x.htm">Liên kết ngoài bị loại</a></div>`,
      'https://hochiminh.vn',
      'Cổng Tư liệu Hồ Chí Minh (hochiminh.vn)',
      'Đảng Cộng sản Việt Nam'
    );
    assert.equal(anchorItems.length, 1);
    assert.equal(anchorItems[0].sourceUrl, 'https://hochiminh.vn/tu-tuong-hcm/chuyen-de-dan-chu-2026.htm');

    const actor = { uid: 'u1', name: 'Biên tập viên', role: 'staff' };
    const firstLog = await syncOfficialSourceToDrafts(
      'src_baochinhphu_rss',
      actor,
      true,
      dbPath,
      async () => [
        ...rssItems,
        rssItems[0], // duplicate in same batch must be skipped
      ]
    );
    assert.equal(firstLog.status, 'SUCCESS');
    assert.equal(firstLog.draftsCreated, 1);
    assert.equal(firstLog.duplicatesSkipped, 1);

    // Rate-limit without force skips immediately
    const throttledLog = await syncOfficialSourceToDrafts('src_baochinhphu_rss', actor, false, dbPath, async () => rssItems);
    assert.equal(throttledLog.status, 'SKIPPED');

    // Verify AI draft & propose enrichment draft do not auto-publish
    const audit = runInventoryAudit(dbPath);
    assert.equal(audit.aiDraftCount >= 1, true);

    const incomplete = createOrUpdateDossier(
      {
        title: 'Hồ sơ thiếu nguồn cần bổ sung tự động',
        dossierType: 'RESEARCH',
        summary: 'Tóm tắt sơ bộ',
      },
      actor,
      dbPath
    );
    assert.equal(incomplete.missingFields.length > 0, true);
    const enrichDraft = proposeEnrichmentDraftForDossier(incomplete.id, actor, dbPath);
    assert.equal(enrichDraft.isAiDraft, true);
    assert.equal(enrichDraft.publishStatus, 'DRAFT');
    assert.equal(enrichDraft.verificationStatus, 'NEEDS_VERIFICATION');
    assert.equal(enrichDraft.duplicateOfId, incomplete.id);
  } finally {
    closeSqliteDb(dbPath);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('Virtual Museum 3D stage maps all 8 Bảo tàng HCM themes cleanly to verified exhibits, videos & local assets', () => {
  assert.equal(VIRTUAL_MUSEUM_8_ZONES.length, 8);
  assert.equal(VIRTUAL_MUSEUM_8_ZONES[0].themeTitle.includes('Nuôi ý chí'), true);
  assert.equal(VIRTUAL_MUSEUM_8_ZONES[7].themeTitle.includes('Viết tiếp trang sử vàng'), true);
  const exhibitIds = new Set(MUSEUM_EXHIBITS_8.map((e) => e.id));
  const videoIds = new Set(VIDEO_DOCUMENTARIES_11.map((v) => v.id));
  for (const z of VIRTUAL_MUSEUM_8_ZONES) {
    assert.equal(exhibitIds.has(z.exhibitId), true);
    assert.equal(videoIds.has(z.videoId), true);
    assert.equal(z.imageUrl.startsWith('/assets/hcm-space/'), true);
  }
});
