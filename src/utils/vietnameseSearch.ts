/**
 * Tiện ích hỗ trợ tìm kiếm tiếng Việt không phân biệt dấu và chữ hoa/thường
 * Giúp người dùng gõ "bac ho", "nghe an", "tuyen ngon" vẫn tìm thấy "Bác Hồ", "Nghệ An", "Tuyên ngôn"
 */

export function removeVietnameseDiacritics(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .trim();
}

/**
 * Từ điển đồng nghĩa ngữ nghĩa lịch sử (Semantic Historical Aliases)
 * Giúp người dân tra cứu "bac ho", "bac", "ho chu tich" đều tìm thấy "Hồ Chí Minh", "Nguyễn Ái Quốc"...
 */
const HISTORICAL_ALIASES: Array<string[]> = [
  ['bac ho', 'ho chi minh', 'chu tich ho chi minh', 'nguyen ai quoc', 'nguyen tat thanh', 'nguyen sinh cung', 'nguoi', 'bac'],
  ['tuyen ngon', 'tuyen ngon doc lap', '2-9-1945', 'ba dinh'],
  ['di chuc', 'di chuc bac ho', '1965', '1969'],
  ['duong kach menh', 'duong cach menh', '1927'],
  ['hoang sa', 'truong sa', 'bien dong', 'hai dao'],
];

export function vietnameseMatch(sourceText: string, searchKeyword: string): boolean {
  if (!searchKeyword) return true;
  if (!sourceText) return false;

  const normalizedSource = removeVietnameseDiacritics(sourceText);
  const normalizedKeyword = removeVietnameseDiacritics(searchKeyword);

  // 1. Tìm trực tiếp theo chuỗi con
  if (normalizedSource.includes(normalizedKeyword)) return true;

  // 2. Tìm theo tập từ khóa
  const words = normalizedKeyword.split(/\s+/).filter(Boolean);
  if (words.length > 0 && words.every((word) => normalizedSource.includes(word))) {
    return true;
  }

  // 3. Đối chiếu đồng nghĩa lịch sử (VD: "bac ho" khớp với bài có chứa "ho chi minh")
  for (const aliasGroup of HISTORICAL_ALIASES) {
    const isKeywordInGroup = aliasGroup.some(
      (alias) => normalizedKeyword === alias || normalizedKeyword.includes(alias)
    );
    if (isKeywordInGroup) {
      const isSourceInGroup = aliasGroup.some((alias) => normalizedSource.includes(alias));
      if (isSourceInGroup) return true;
    }
  }

  return false;
}
