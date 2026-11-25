export async function loadHistory(baseUrl = "./") {
  const base = new URL(baseUrl, globalThis.location?.href ?? "http://localhost/");
  const response = await fetch(new URL("data/lich-su-dang-bo-thu-dau-mot.json", base));
  if (!response.ok) throw new Error(`Không tải được dữ liệu: ${response.status}`);
  return response.json();
}
export function normalizeVietnamese(value) {
  return String(value).toLowerCase().replace(/đ/g, "d").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
}
export function searchHistory(data, query, limit = 20) {
  const terms = normalizeVietnamese(query).split(" ").filter(Boolean);
  if (!terms.length) return [];
  return data.pages.filter(page => terms.every(term => page.searchText.includes(term)))
    .slice(0, limit).map(page => ({id: page.id, volumeId: page.volumeId,
      sectionId: page.sectionId, page: page.sourcePdfPage,
      text: page.text, imageUrl: page.image.src, sourceUrl: page.sourceUrl,
      needsReview: page.extraction.needsReview}));
}
export function getSectionPages(data, sectionId) {
  return data.pages.filter(page => page.sectionId === sectionId);
}
