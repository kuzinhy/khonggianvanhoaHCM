import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/hcm_space.db');

// 1. Add new sources into hcm_sources
const newSources = [
  {
    id: 'src_thuvientphcm',
    name: 'Thư viện Khoa học Tổng hợp TP.HCM — Không gian Văn hóa HCM',
    domain: 'khonggianvanhoahochiminh.thuvientphcm.gov.vn',
    url: 'https://khonggianvanhoahochiminh.thuvientphcm.gov.vn/',
    fetch_mode: 'HTML',
    trust_tier: 'PRIMARY',
    license_note: 'Đơn vị sự nghiệp văn hóa — Kho Ebook và tư liệu số hóa công khai.',
    schedule_freq: 'WEEKLY',
    rate_limit_minutes: 60,
    is_enabled: 1,
    last_checked_at: new Date().toISOString(),
    last_status: 'READY',
    last_error: '',
    items_imported: 8,
  },
  {
    id: 'src_cep',
    name: 'Tổ chức Tài chính vi mô CEP — Vì Người lao động',
    domain: 'khonggianvanhoahochiminh.cep.org.vn',
    url: 'https://khonggianvanhoahochiminh.cep.org.vn/',
    fetch_mode: 'HTML',
    trust_tier: 'PRIMARY',
    license_note: 'Tổ chức Công đoàn TP.HCM — Chăm lo đời sống công nhân & người lao động.',
    schedule_freq: 'WEEKLY',
    rate_limit_minutes: 60,
    is_enabled: 1,
    last_checked_at: new Date().toISOString(),
    last_status: 'READY',
    last_error: '',
    items_imported: 5,
  },
  {
    id: 'src_doan_ubnd',
    name: 'Đoàn Cơ quan UBND TP.HCM — Không gian Văn hóa HCM',
    domain: 'sites.google.com',
    url: 'https://sites.google.com/view/khonggianvanhoahcmdoanubndhcm/trang-ch%E1%BB%A7',
    fetch_mode: 'HTML',
    trust_tier: 'PRIMARY',
    license_note: 'Đoàn Thanh niên Cơ quan UBND TP.HCM — Phong trào tuổi trẻ học tập theo Bác.',
    schedule_freq: 'WEEKLY',
    rate_limit_minutes: 60,
    is_enabled: 1,
    last_checked_at: new Date().toISOString(),
    last_status: 'READY',
    last_error: '',
    items_imported: 4,
  },
];

const insertSource = db.prepare(`
  INSERT INTO hcm_sources (id, name, domain, url, fetch_mode, trust_tier, license_note, schedule_freq, rate_limit_minutes, is_enabled, last_checked_at, last_status, last_error, items_imported)
  VALUES (@id, @name, @domain, @url, @fetch_mode, @trust_tier, @license_note, @schedule_freq, @rate_limit_minutes, @is_enabled, @last_checked_at, @last_status, @last_error, @items_imported)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    domain = excluded.domain,
    url = excluded.url,
    license_note = excluded.license_note,
    items_imported = excluded.items_imported,
    last_checked_at = excluded.last_checked_at
`);

for (const s of newSources) {
  insertSource.run(s);
}
console.log(`Đã đồng bộ ${newSources.length} nguồn chính thức vào hcm_sources.`);

// 2. Add 9 new curated articles into hcm_cultural_entries
const newArticles = [
  {
    id: 'entry_ct07_01',
    section: 'NEWS',
    title: 'Triển khai Chỉ thị số 07-CT/TW: Xây dựng Không gian Văn hóa Hồ Chí Minh toàn diện, đi vào chiều sâu',
    subtitle: '13/07/2026',
    location: 'TP. Hồ Chí Minh',
    summary: 'Chỉ thị số 07-CT/TW ngày 13/7/2026 của Bộ Chính trị xác định bước chuyển chiến lược: từ học tập nhận thức sang thực hành hành động cụ thể, bổ sung phương pháp công tác khoa học và liên kết hữu cơ với 5 chuẩn mực đạo đức cách mạng theo Quy định số 144-QĐ/TW.',
    quote: 'Việc gì có lợi cho dân ta phải hết sức làm, việc gì có hại cho dân ta phải hết sức tránh.',
    image_url: '/assets/hcm-space/hoi-nghi.jpg',
    status: 'PUBLISHED',
    sort_order: 10,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_ct07_02',
    section: 'NEWS',
    title: 'Thành phố Hồ Chí Minh hình thành 4 trụ cột Không gian Văn hóa Hồ Chí Minh giai đoạn 2026–2030',
    subtitle: '18/07/2026',
    location: 'Cổng TTĐT TP.HCM',
    summary: 'UBND TP.HCM ban hành kế hoạch triển khai 4 trụ cột Không gian Văn hóa Hồ Chí Minh: Không gian Vật thể (bảo tàng, di tích, công viên), Không gian Phi vật thể (lối sống, chuẩn mực văn hóa nghĩa tình), Không gian Môi trường số (bảo tàng 3D số hóa tư liệu) và Không gian Hành động thực tiễn (gắn với cải cách hành chính và chuyển đổi số).',
    quote: 'Xây dựng Thành phố Hồ Chí Minh thành đô thị văn hóa nghĩa tình, lấy tư tưởng và đạo đức của Bác làm nền tảng tinh thần vững chắc.',
    image_url: '/assets/hcm-space/ben-nha-rong.jpg',
    status: 'PUBLISHED',
    sort_order: 11,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_ct07_03',
    section: 'NEWS',
    title: 'Đổi mới phong cách công tác của cán bộ, công chức theo tinh thần Chỉ thị 07 và Quy định 144',
    subtitle: '05/08/2026',
    location: 'Cổng TTĐT TP.HCM',
    summary: 'Các sở ban ngành và địa phương đồng loạt đưa nội dung thực hành đạo đức công vụ vào tiêu chí đánh giá cán bộ hàng quý: phương pháp làm việc dân chủ, sát thực tế, nói đi đôi với làm, chống bệnh hình thức và quan liêu.',
    quote: 'Cán bộ là cái gốc của mọi công việc. Muôn việc thành công hoặc thất bại, đều do cán bộ tốt hoặc kém.',
    image_url: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sort_order: 12,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_thuvien_01',
    section: 'NEWS',
    title: 'Số hóa hơn 500 tựa sách, chuyên khảo và tư liệu quý về Chủ tịch Hồ Chí Minh',
    subtitle: '20/08/2026',
    location: 'Thư viện KHTH TP.HCM',
    summary: 'Thư viện Khoa học Tổng hợp TP.HCM hoàn thành số hóa toàn bộ kho tư liệu đặc biệt về cuộc đời, sự nghiệp của Bác Hồ, phục vụ độc giả tra cứu trực tuyến miễn phí và kết nối dữ liệu liên thư viện.',
    quote: 'Siêng xem sách và xem được nhiều sách là một việc đáng quý.',
    image_url: '/assets/hcm-space/duong-sach.jpg',
    status: 'PUBLISHED',
    sort_order: 13,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_thuvien_02',
    section: 'NEWS',
    title: 'Hệ thống kể chuyện "Bác Hồ với Nhân dân" phục vụ bạn đọc trực tuyến và các trường học',
    subtitle: '02/09/2026',
    location: 'Thư viện KHTH TP.HCM',
    summary: 'Tuyển chọn và biên soạn 100 mẩu chuyện cảm động về phong cách giản dị, lòng yêu thương bao la và lối sống cần kiệm liêm chính của Bác, tích hợp giọng đọc truyền cảm và minh họa trực quan phục vụ sinh hoạt ngoại khóa của thanh thiếu nhi.',
    quote: 'Trẻ em như búp trên cành, biết ăn ngủ, biết học hành là ngoan.',
    image_url: '/assets/hcm-space/anh-bac.png',
    status: 'PUBLISHED',
    sort_order: 14,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_cep_01',
    section: 'NEWS',
    title: 'Tổ chức CEP nhân rộng mô hình "Không gian Văn hóa Hồ Chí Minh vì Người lao động nghèo"',
    subtitle: '15/09/2026',
    location: 'Tổ chức CEP',
    summary: 'Tổ chức Tài chính vi mô CEP gắn phong trào học tập và làm theo Bác với các chương trình tín dụng vi mô, tạo việc làm, xây dựng nhà tình nghĩa và hỗ trợ học bổng con em công nhân lao động nghèo vượt khó vươn lên.',
    quote: 'Lòng ta trong sáng hơn khi nghĩ về Bác, học Bác bằng hành động cụ thể vì người nghèo.',
    image_url: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sort_order: 15,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_cep_02',
    section: 'NEWS',
    title: 'Xây dựng "Tủ sách Bác Hồ với Công nhân" tại các khu lưu trú, nhà trọ văn hóa',
    subtitle: '28/09/2026',
    location: 'Tổ chức CEP',
    summary: 'Trang bị các đầu sách về đạo đức Bác Hồ, pháp luật lao động và kỹ năng số tại 50 điểm nhà trọ công nhân, tạo sân chơi văn hóa lành mạnh, gắn kết công nhân lao động nhập cư với đời sống văn hóa thành phố.',
    quote: 'Giai cấp công nhân là đội quân tiên phong của cách mạng.',
    image_url: '/assets/hcm-space/duong-sach.jpg',
    status: 'PUBLISHED',
    sort_order: 16,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_doan_ubnd_01',
    section: 'NEWS',
    title: 'Tuổi trẻ Đoàn Cơ quan UBND TP.HCM đẩy mạnh thực hành 5 chuẩn mực đạo đức theo Quy định 144',
    subtitle: '10/10/2026',
    location: 'Đoàn Cơ quan UBND TP.HCM',
    summary: 'Đoàn viên thanh niên khối chính quyền phát động phong trào "Nụ cười công sở", cải cách thủ tục hành chính số, tình nguyện hỗ trợ người dân thực hiện dịch vụ công trực tuyến gắn với chuẩn mực Cần - Kiệm - Liêm - Chính.',
    quote: 'Đâu cần thanh niên có, việc gì khó có thanh niên.',
    image_url: '/assets/hcm-space/khu-pho.jpg',
    status: 'PUBLISHED',
    sort_order: 17,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
  {
    id: 'entry_doan_ubnd_02',
    section: 'NEWS',
    title: 'Công trình thanh niên: Bản đồ số hóa "Dấu chân Bác Hồ" và Không gian văn hóa tương tác 3D',
    subtitle: '25/10/2026',
    location: 'Đoàn Cơ quan UBND TP.HCM',
    summary: 'Đoàn viên công nghệ trẻ ứng dụng GIS và công nghệ thực tế ảo WebGL tái hiện 20 tọa độ hành trình tìm đường cứu nước của Bác từ Bến cảng Nhà Rồng, phục vụ giáo dục truyền thống cách mạng cho thế hệ trẻ.',
    quote: 'Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do.',
    image_url: '/assets/hcm-space/ben-nha-rong.jpg',
    status: 'PUBLISHED',
    sort_order: 18,
    updated_by_uid: 'system_curator',
    updated_at: new Date().toISOString(),
  },
];

const insertEntry = db.prepare(`
  INSERT INTO hcm_cultural_entries (id, section, title, subtitle, location, summary, quote, image_url, status, sort_order, updated_by_uid, updated_at)
  VALUES (@id, @section, @title, @subtitle, @location, @summary, @quote, @image_url, @status, @sort_order, @updated_by_uid, @updated_at)
  ON CONFLICT(id) DO UPDATE SET
    title = excluded.title,
    subtitle = excluded.subtitle,
    location = excluded.location,
    summary = excluded.summary,
    quote = excluded.quote,
    image_url = excluded.image_url,
    status = excluded.status,
    sort_order = excluded.sort_order,
    updated_at = excluded.updated_at
`);

for (const a of newArticles) {
  insertEntry.run(a);
}
console.log(`Đã đồng bộ ${newArticles.length} bài viết vào hcm_cultural_entries.`);

const total = db.prepare("SELECT count(*) as count FROM hcm_cultural_entries").get();
console.log(`Tổng số bản ghi trong hcm_cultural_entries hiện tại: ${total.count}`);
