/**
 * Trình kết nối dữ liệu chính thống từ Cổng Thông tin Điện tử TP.HCM
 * Chuyên mục Không gian Văn hóa Hồ Chí Minh (https://hochiminhcity.gov.vn)
 */

export type PortalChannelKey = 'tin-tuc' | 'guong-dien-hinh' | 'tu-tuong' | 'the-gioi';

export interface PortalChannelInfo {
  key: PortalChannelKey;
  label: string;
  url: string;
}

export const PORTAL_CHANNELS: Record<PortalChannelKey, PortalChannelInfo> = {
  'tin-tuc': {
    key: 'tin-tuc',
    label: 'Tin tức - Sự kiện',
    url: 'https://hochiminhcity.gov.vn/tin-tuc-khong-gian-van-hoa',
  },
  'guong-dien-hinh': {
    key: 'guong-dien-hinh',
    label: 'Gương điển hình',
    url: 'https://hochiminhcity.gov.vn/hoc-va-lam-theo-loi-bac',
  },
  'tu-tuong': {
    key: 'tu-tuong',
    label: 'Tư tưởng, đạo đức Hồ Chí Minh',
    url: 'https://hochiminhcity.gov.vn/tu-tuong-dao-duc',
  },
  'the-gioi': {
    key: 'the-gioi',
    label: 'Hồ Chí Minh & thế giới',
    url: 'https://hochiminhcity.gov.vn/hcm-va-the-gioi',
  },
};

export interface PortalFeedArticle {
  id: string;
  channel: PortalChannelKey;
  channelLabel: string;
  date: string;
  title: string;
  snippet: string;
  imageUrl: string;
  articlePath: string;
  articleUrl: string;
}

export interface PortalArticleDetail {
  title: string;
  publishedAt: string;
  summary: string;
  paragraphs: string[];
  images: Array<{ url: string; caption: string }>;
  sourceUrl: string;
}

const PORTAL_ORIGIN = 'https://hochiminhcity.gov.vn';
const CACHE_TTL_MS = 15 * 60 * 1000;
const feedCache = new Map<PortalChannelKey, { fetchedAt: string; timestamp: number; articles: PortalFeedArticle[] }>();

function decodeHtmlEntities(input: string): string {
  return String(input || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, num) => {
      const code = Number(num);
      return Number.isFinite(code) ? String.fromCharCode(code) : '';
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(html: string): string {
  return decodeHtmlEntities(String(html || '').replace(/<[^>]+>/g, ' '));
}

function toAbsolutePortalUrl(rawPath: string): string {
  const trimmed = decodeHtmlEntities(rawPath).trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('https://hochiminhcity.gov.vn/')) return trimmed;
  if (trimmed.startsWith('/')) return `${PORTAL_ORIGIN}${trimmed}`;
  return '';
}

export function isValidPortalArticlePath(rawPath: string): boolean {
  const clean = String(rawPath || '').trim();
  if (!clean || clean.includes('..') || clean.includes('\\') || /[\r\n\0]/.test(clean)) {
    return false;
  }
  return /^\/(?:vi\/)?web\/hcm\/(?:-\/|w\/)[a-zA-Z0-9%._-]+$/.test(clean);
}

/** Bóc tách danh sách bài viết từ HTML của các trang chuyên mục Không gian văn hóa HCM */
export function parsePortalListingHtml(html: string, channel: PortalChannelKey): PortalFeedArticle[] {
  const channelInfo = PORTAL_CHANNELS[channel] || PORTAL_CHANNELS['tin-tuc'];
  const chunks = String(html || '').split(/<div\s+class="\s*news-item-pvm\b/);
  const seen = new Set<string>();
  const items: PortalFeedArticle[] = [];

  for (let i = 1; i < chunks.length; i += 1) {
    const block = chunks[i].slice(0, 4500);
    const pathMatch = block.match(/location\.href=['"]([^'"]+)['"]/i);
    const articlePath = pathMatch?.[1]?.trim() || '';
    if (!articlePath || seen.has(articlePath)) continue;

    const imgMatch =
      block.match(/<img[^>]*\ssrc=["']([^"']+)["']/i) ||
      block.match(/onerror="[^"]*this\.src=['"]([^'"]+)['"]/i);
    const dateMatch = block.match(/class="custom-date-time"[^>]*>([\s\S]*?)<\/span>/i);
    const titleMatch = block.match(/class="content-title[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const snippetMatch = block.match(/class="content-ds-tintuc"[^>]*>([\s\S]*?)<\/div>/i);

    const title = stripTags(titleMatch?.[1] || '');
    if (!title) continue;
    seen.add(articlePath);

    items.push({
      id: `portal_${channel}_${items.length + 1}`,
      channel,
      channelLabel: channelInfo.label,
      date: stripTags(dateMatch?.[1] || '') || 'Mới cập nhật',
      title,
      snippet: stripTags(snippetMatch?.[1] || ''),
      imageUrl: toAbsolutePortalUrl(imgMatch?.[1] || '') || '/assets/hcm-space/khu-pho.jpg',
      articlePath,
      articleUrl: `${PORTAL_ORIGIN}${articlePath}`,
    });
  }

  return items;
}

/** Bóc tách toàn văn và ảnh minh họa từ một trang bài viết chi tiết trên hochiminhcity.gov.vn */
export function parsePortalArticleHtml(html: string, sourceUrl: string): PortalArticleDetail {
  const text = String(html || '');
  const titleMatch =
    text.match(/<h3[^>]*class="title-divvv"[^>]*>([\s\S]*?)<\/h3>/i) ||
    text.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
  const dateMatch = text.match(/<span[^>]*class="sp-dislaydate"[^>]*>([\s\S]*?)<\/span>/i);

  const bodyStart = text.indexOf('id="contentText"');
  const bodySlice =
    bodyStart !== -1
      ? text.slice(bodyStart, Math.min(text.length, bodyStart + 45000))
      : text.slice(0, 25000);

  const summaryMatch = bodySlice.match(/class="text-summary"[^>]*>([\s\S]*?)<\/b>/i);
  const summary = stripTags(summaryMatch?.[1] || '');

  const paragraphs: string[] = [];
  for (const m of bodySlice.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const clean = stripTags(m[1]);
    if (clean && clean !== summary && clean.length >= 20 && !paragraphs.includes(clean)) {
      paragraphs.push(clean);
    }
    if (paragraphs.length >= 25) break;
  }

  const images: Array<{ url: string; caption: string }> = [];
  const seenImg = new Set<string>();
  for (const figMatch of bodySlice.matchAll(/<figure[\s\S]*?<\/figure>/gi)) {
    const fig = figMatch[0];
    const srcM = fig.match(/<img[^>]*src=["']([^"']+)["']/i);
    const capM = fig.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
    const absUrl = toAbsolutePortalUrl(srcM?.[1] || '');
    if (absUrl && !seenImg.has(absUrl)) {
      seenImg.add(absUrl);
      images.push({ url: absUrl, caption: stripTags(capM?.[1] || '') });
    }
  }

  return {
    title: stripTags(titleMatch?.[1] || '') || 'Bài viết Tư liệu Hồ Chí Minh',
    publishedAt: stripTags(dateMatch?.[1] || ''),
    summary,
    paragraphs,
    images,
    sourceUrl,
  };
}

async function fetchTextWithTimeout(url: string, timeoutMs = 10000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TuyenGiaoSo-ThuDauMot/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchPortalFeed(
  channel: PortalChannelKey = 'tin-tuc',
  forceRefresh = false
): Promise<{
  connected: boolean;
  channel: PortalChannelInfo;
  fetchedAt: string;
  fromCache: boolean;
  articles: PortalFeedArticle[];
  error?: string;
}> {
  const channelInfo = PORTAL_CHANNELS[channel] || PORTAL_CHANNELS['tin-tuc'];
  const cached = feedCache.get(channelInfo.key);
  if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      connected: true,
      channel: channelInfo,
      fetchedAt: cached.fetchedAt,
      fromCache: true,
      articles: cached.articles,
    };
  }

  try {
    const html = await fetchTextWithTimeout(channelInfo.url, 10000);
    const articles = parsePortalListingHtml(html, channelInfo.key);
    const fetchedAt = new Date().toISOString();
    feedCache.set(channelInfo.key, { fetchedAt, timestamp: Date.now(), articles });
    return {
      connected: true,
      channel: channelInfo,
      fetchedAt,
      fromCache: false,
      articles,
    };
  } catch (err: any) {
    if (cached) {
      return {
        connected: false,
        channel: channelInfo,
        fetchedAt: cached.fetchedAt,
        fromCache: true,
        articles: cached.articles,
        error: err?.message || 'Không thể làm mới kết nối tới hochiminhcity.gov.vn',
      };
    }
    return {
      connected: false,
      channel: channelInfo,
      fetchedAt: new Date().toISOString(),
      fromCache: false,
      articles: [],
      error: err?.message || 'Không thể kết nối tới hochiminhcity.gov.vn',
    };
  }
}

export async function fetchPortalArticleDetail(articlePath: string): Promise<PortalArticleDetail> {
  if (!isValidPortalArticlePath(articlePath)) {
    throw new Error('Đường dẫn bài viết không thuộc chuyên mục hợp lệ trên hochiminhcity.gov.vn.');
  }
  const sourceUrl = `${PORTAL_ORIGIN}${articlePath.trim()}`;
  const html = await fetchTextWithTimeout(sourceUrl, 10000);
  return parsePortalArticleHtml(html, sourceUrl);
}

export interface OfficialHarvestItem {
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  imageUrl: string;
  dossierType: 'EVENT' | 'WORK' | 'MEDIA' | 'ARTIFACT' | 'PERSON' | 'RESEARCH' | 'LOCAL_ACTIVITY';
  publisher: string;
  licenseInfo: string;
}

export const APPROVED_OFFICIAL_DOMAINS = new Set([
  'hochiminhcity.gov.vn',
  'hochiminh.vn',
  'baotanghochiminh.vn',
  'dangcongsan.vn',
  'baochinhphu.vn',
  'nxbctqg.org.vn',
]);

function unwrapCdata(raw: string): string {
  return decodeHtmlEntities(String(raw || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/<[^>]+>/g, ' '));
}

export function parseRssFeedXml(xml: string, sourceName: string, publisher: string): OfficialHarvestItem[] {
  const items: OfficialHarvestItem[] = [];
  const seen = new Set<string>();
  for (const m of String(xml || '').matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const block = m[1];
    const title = unwrapCdata(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
    const link = unwrapCdata(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || '');
    const descRaw = block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || '';
    const pubDate = unwrapCdata(block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || '');
    const imgMatch = descRaw.match(/<img[^>]*src=["']([^"']+)["']/i);
    const summary = unwrapCdata(descRaw);
    if (!title || !link || seen.has(link)) continue;
    seen.add(link);
    items.push({
      title,
      summary: summary || title,
      sourceUrl: link,
      sourceName,
      publishedAt: pubDate || new Date().toISOString().slice(0, 10),
      imageUrl: imgMatch?.[1]?.trim() || '',
      dossierType: 'LOCAL_ACTIVITY',
      publisher,
      licenseInfo: 'Nguồn báo chí/cổng thông tin chính thống Việt Nam (trích dẫn ghi rõ nguồn)',
    });
    if (items.length >= 12) break;
  }
  return items;
}

export function parseOfficialPortalAnchorsHtml(
  html: string,
  baseOrigin: string,
  sourceName: string,
  publisher: string,
  defaultType: OfficialHarvestItem['dossierType'] = 'RESEARCH'
): OfficialHarvestItem[] {
  const items: OfficialHarvestItem[] = [];
  const seen = new Set<string>();
  const re = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(String(html || ''))) !== null) {
    const rawHref = m[1].trim();
    const text = stripTags(m[2]);
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript:') || text.length < 28) continue;
    let absUrl = '';
    try {
      const resolved = new URL(rawHref, baseOrigin);
      if (resolved.hostname.replace(/^www\./, '') !== new URL(baseOrigin).hostname.replace(/^www\./, '')) {
        continue;
      }
      absUrl = resolved.href;
    } catch {
      continue;
    }
    const lowerUrl = absUrl.toLowerCase();
    const looksLikeContent =
      lowerUrl.includes('.htm') ||
      lowerUrl.includes('/tin-') ||
      lowerUrl.includes('/hoat-dong') ||
      lowerUrl.includes('/tu-tuong') ||
      lowerUrl.includes('/tac-pham') ||
      lowerUrl.includes('/bien-nien') ||
      lowerUrl.includes('/tu-sach') ||
      lowerUrl.includes('/web/hcm/');
    if (!looksLikeContent || seen.has(absUrl)) continue;
    seen.add(absUrl);
    items.push({
      title: text.slice(0, 260),
      summary: `Tư liệu/bài viết chính thống thu thập từ ${sourceName}: ${text}. Cần biên tập viên kiểm chứng nội dung chi tiết trước khi xuất bản.`,
      sourceUrl: absUrl,
      sourceName,
      publishedAt: new Date().toISOString().slice(0, 10),
      imageUrl: '',
      dossierType: defaultType,
      publisher,
      licenseInfo: 'Tham chiếu chính thống (Cần xác minh quyền sử dụng & trích dẫn)',
    });
    if (items.length >= 10) break;
  }
  return items;
}

/** Thu thập tài liệu an toàn từ các nguồn chính thống đã phê duyệt */
export async function harvestOfficialSource(source: {
  id: string;
  name: string;
  domain: string;
  url: string;
  fetchMode: string;
}): Promise<OfficialHarvestItem[]> {
  let host = '';
  try {
    host = new URL(source.url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    throw new Error('URL nguồn không hợp lệ.');
  }
  if (!APPROVED_OFFICIAL_DOMAINS.has(host)) {
    throw new Error(`Tên miền "${host}" chưa nằm trong danh sách nguồn chính thống được phê duyệt.`);
  }

  const rawText = await fetchTextWithTimeout(source.url, 10000);

  if (host === 'hochiminhcity.gov.vn') {
    const cards = parsePortalListingHtml(rawText, 'tin-tuc');
    return cards.slice(0, 10).map((c) => ({
      title: c.title,
      summary: c.snippet || c.title,
      sourceUrl: c.articleUrl,
      sourceName: source.name,
      publishedAt: c.date,
      imageUrl: c.imageUrl,
      dossierType: 'LOCAL_ACTIVITY',
      publisher: 'Cổng Thông tin Điện tử TP. Hồ Chí Minh',
      licenseInfo: 'Cổng TTĐT TP.HCM — Trích dẫn ghi rõ nguồn',
    }));
  }

  if (source.fetchMode === 'RSS' || rawText.trimStart().startsWith('<?xml') || rawText.includes('<rss')) {
    const allRss = parseRssFeedXml(rawText, source.name, 'Báo Điện tử Chính phủ');
    // Ưu tiên tin liên quan Hồ Chí Minh, Đảng, Tuyên giáo, Văn hóa, Dân vận; nếu không lọc vẫn giữ tối đa 5 bài mới dạng nháp chờ duyệt
    const focused = allRss.filter((it) =>
      /hồ chí minh|bác hồ|tuyên giáo|đảng|văn hóa|dân vận|nghị quyết|thi đua/i.test(`${it.title} ${it.summary}`)
    );
    return (focused.length > 0 ? focused : allRss).slice(0, 8);
  }

  const defaultType: OfficialHarvestItem['dossierType'] =
    host === 'baotanghochiminh.vn' ? 'ARTIFACT' : host === 'nxbctqg.org.vn' ? 'WORK' : 'RESEARCH';
  return parseOfficialPortalAnchorsHtml(rawText, `https://${host}`, source.name, source.name, defaultType);
}
