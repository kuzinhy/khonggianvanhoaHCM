# HƯỚNG DẪN TRIỂN KHAI TRANG WEB ĐỘC LẬP: KHÔNG GIAN VĂN HÓA HỒ CHÍ MINH

Gói mã nguồn và cơ sở dữ liệu này đã được trích xuất hoàn toàn độc lập từ hệ thống **Tuyên giáo Số**, chuẩn hóa theo **Chỉ thị số 07-CT/TW ngày 13/7/2026 của Bộ Chính trị** và **Quy định số 144-QĐ/TW**.

Đồng chí có thể sao chép toàn bộ thư mục `export-hcm-space` này sang bất kỳ máy tính, máy chủ hoặc repository mới nào để xây dựng một website riêng biệt.

---

## 📁 1. CẤU TRÚC GÓI MÃ NGUỒN & DỮ LIỆU ĐÃ TRÍCH XUẤT

```text
export-hcm-space/
├── data/
│   └── hcm-full-dataset.json          # 🌟 Toàn bộ dữ liệu sạch (JSON thuần, 163 KB)
├── public/
│   └── assets/
│       └── hcm-space/                 # 🖼️ 16 tệp hình ảnh, chân dung, Bến Nhà Rồng, hoa sen...
├── src/
│   ├── components/                    # 🧩 7 phân hệ giao diện chuyên sâu:
│   │   ├── HcmLibraryAndMediaViews.tsx   # Tủ sách kinh điển, Đọc chuyên sâu, Audio, Video
│   │   ├── HcmNewsAndIdeologyViews.tsx   # 6 Phương pháp (CT 07), Cam kết 2026, 12 Trắc nghiệm
│   │   ├── HcmExhibitionAndMapViews.tsx  # Bản đồ 20 dấu chân bôn ba cứu nước & Timeline 30 mốc
│   │   ├── HcmVirtualMuseum3DStage.tsx   # Bảo tàng không gian 3D tương tác 8 chuyên đề
│   │   ├── HcmEvaluationAndModelsView.tsx# Tiêu chí đánh giá cơ sở & Mô hình khu phố
│   │   ├── HcmDossierExplorerView.tsx    # Cây tài nguyên tư liệu số
│   │   ├── HcmAdminCmsView.tsx           # Trình quản trị CMS thêm/sửa/xóa bài
│   │   └── SkillActionWidget.tsx         # Widget trợ lý AI độc lập
│   ├── hcmCoreDataset.ts              # Dataset nguồn dạng TypeScript đầy đủ type definition
│   ├── HcmCulturalSpacePage.tsx       # Trang giao diện chính hoàn chỉnh (Header, Tabs, Stats)
│   ├── hcmSpaceClient.ts              # API client (hỗ trợ lưu LocalStorage hoặc REST API)
│   ├── hcmSpaceRouter.ts              # Express API Router (nếu muốn làm backend Node.js)
│   ├── AppContext.tsx                 # Context phân quyền độc lập (Admin, Editor, Viewer)
│   ├── App.tsx                        # Root component
│   ├── main.tsx                       # Entry point React
│   └── index.css                      # Tailwind styling
├── index.html                         # Trang chủ HTML
├── package.json                       # Cấu hình thư viện gọn nhẹ (React 18 + Lucide + Vite)
├── tailwind.config.js                 # Cấu hình Tailwind CSS
├── vite.config.ts                     # Cấu hình Vite dev server & build
└── HUONG_DAN_TRIEN_KHAI_WEB_MOI.md    # Tài liệu hướng dẫn này
```

---

## 🚀 2. HƯỚNG DẪN CHẠY WEB MỚI TRONG 3 BƯỚC (VITE + REACT)

### Bước 1: Mở thư mục dự án
Mở Terminal hoặc Command Prompt tại thư mục vừa trích xuất:
```bash
cd export-hcm-space
```

### Bước 2: Cài đặt thư viện
```bash
npm install
```

### Bước 3: Khởi chạy website
```bash
npm run dev
```
Trình duyệt sẽ tự động mở trang web mới tại: **`http://localhost:3000`**

Khi cần đóng gói để đưa lên hosting, VPS, Vercel hoặc Netlify:
```bash
npm run build
```
Thư mục `dist/` tạo ra là web tĩnh hoàn chỉnh, có thể tải lên bất kỳ hosting nào (cPanel, Nginx, Apache, GitHub Pages, Vercel...).

---

## 📊 3. DỮ LIỆU ĐÃ ĐƯỢC CHUẨN HÓA TRONG `hcm-full-dataset.json`

Tệp `export-hcm-space/data/hcm-full-dataset.json` chứa toàn bộ tư liệu quý giá đã được xác minh theo tài liệu Viện Hồ Chí Minh và các cơ quan lưu trữ Quốc gia:

1. **`bioChapters` (6 chương):** Toàn văn tiểu sử 6 giai đoạn cuộc đời Bác.
2. **`historicalEras` (8 thời kỳ) & `historicalEvents30` (30 mốc son):** Dòng thời gian lịch sử chuẩn xác.
3. **`footprints20` (20 tọa độ):** Hành trình bôn ba 30 năm cứu nước với kinh độ, vĩ độ GPS và tọa độ SVG.
4. **`classicWorks15` (15 tác phẩm kinh điển):** Từ *Yêu sách của nhân dân An Nam (1919)* đến *Di chúc (1969)*.
5. **`classicWorkDeepReads` (5 tác phẩm đọc chuyên sâu):** Có bối cảnh lịch sử, luận điểm cốt lõi, trích đoạn toàn văn, gợi ý ngữ điệu đọc và bài học vận dụng cơ sở.
6. **`toanTapVolumes` (15 tập):** Hồ Chí Minh Toàn tập (NXB Chính trị quốc gia Sự thật).
7. **`verifiedQuotes12` & `additionalQuotes4`:** 16 câu trích dẫn chuẩn nguồn theo từng chuyên đề.
8. **`methodology6` (6 phương pháp cách mạng Hồ Chí Minh):** Theo tinh thần Chỉ thị số 07-CT/TW ngày 13/7/2026.
9. **`commitmentTemplates` (4 bản mẫu):** Bản cam kết tu dưỡng 2026 cho Lãnh đạo, Đảng viên, Công chức Một cửa và Thanh niên.
10. **`allQuizzes12` (12 câu hỏi trắc nghiệm):** Kèm đáp án, giải thích chi tiết và trích nguồn văn kiện.
11. **`museumExhibits8`:** 8 chuyên đề bảo tàng không gian 3D.
12. **`videoDocumentaries11` & `audioArchive4`:** Danh mục phim tư liệu và bản ghi âm giọng nói của Bác.

---

## 🌐 4. NẾU ĐỒNG CHÍ DÙNG NGÔN NGỮ HOẶC NỀN TẢNG KHÁC

- **Với Next.js:** Sao chép `src/` vào `app/khong-gian-hcm/` hoặc `pages/`. Tệp dữ liệu `hcmCoreDataset.ts` hoạt động trực tiếp 100%.
- **Với Vue.js / Nuxt / Svelte:** Sử dụng trực tiếp tệp `data/hcm-full-dataset.json` bằng lệnh `import dataset from './data/hcm-full-dataset.json'`.
- **Với PHP / Laravel / WordPress:** Dùng hàm `json_decode(file_get_contents('data/hcm-full-dataset.json'), true)` để nạp vào cơ sở dữ liệu MySQL hoặc tạo custom post type.
- **Với Python / Django / FastAPI:** Dùng thư viện `json.load(open('data/hcm-full-dataset.json', encoding='utf-8'))` để làm REST API hoặc nạp vào database.
