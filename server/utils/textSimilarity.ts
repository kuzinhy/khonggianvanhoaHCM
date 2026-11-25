/**
 * Các hàm chuẩn hóa văn bản tiếng Việt, tính tương đồng 3-gram và giải mã JSON an toàn dùng chung ở backend.
 */
export function normalizeVietnameseText(input: string): string {
  return String(input || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function computeTrigramSimilarity(a: string, b: string): number {
  const na = normalizeVietnameseText(a).replace(/\s+/g, '_');
  const nb = normalizeVietnameseText(b).replace(/\s+/g, '_');
  if (!na || !nb) return 0;
  if (na === nb) return 1;

  const toTrigrams = (s: string): Set<string> => {
    const out = new Set<string>();
    if (s.length < 3) {
      out.add(s);
      return out;
    }
    for (let i = 0; i <= s.length - 3; i += 1) {
      out.add(s.slice(i, i + 3));
    }
    return out;
  };

  const ga = toTrigrams(na);
  const gb = toTrigrams(nb);
  let inter = 0;
  for (const g of ga) {
    if (gb.has(g)) inter += 1;
  }
  const union = ga.size + gb.size - inter;
  return union === 0 ? 0 : inter / union;
}

export function safeJsonParse<T>(raw: unknown, fallback: T): T {
  try {
    return JSON.parse(String(raw || '')) as T;
  } catch {
    return fallback;
  }
}
