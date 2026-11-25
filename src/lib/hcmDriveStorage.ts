/**
 * Module quản lý và tích hợp Lưu trữ Đám mây Google Drive cho
 * Không Gian Văn Hóa Hồ Chí Minh - Phường Thủ Dầu Một.
 * Thư mục gốc lưu trữ: https://drive.google.com/drive/folders/1XtTGPw6cPi02XDFUFKYG8x9MS3h1WLyV?hl=vi
 */

export const HCM_DRIVE_STORAGE_CONFIG = {
  rootFolderId: '1XtTGPw6cPi02XDFUFKYG8x9MS3h1WLyV',
  rootFolderUrl: 'https://drive.google.com/drive/folders/1XtTGPw6cPi02XDFUFKYG8x9MS3h1WLyV?hl=vi',
  name: 'Không Gian Văn Hóa Hồ Chí Minh — Phường Thủ Dầu Một (Kho Dữ Liệu Số)',
  sharingRequired: 'Bất kỳ ai có đường liên kết đều có thể xem (Viewer)',
};

export interface DriveFolderStructureNode {
  code: string;
  name: string;
  slug: string;
  description: string;
  targetMimeTypes: string[];
  keyUseCases: string;
  exampleFiles: string[];
}

/**
 * Cấu trúc thư mục chuẩn hóa được thiết kế khoa học cho toàn bộ không gian
 */
export const RECOMMENDED_DRIVE_FOLDER_STRUCTURE: DriveFolderStructureNode[] = [
  {
    code: '01',
    name: '01_Hinh_Anh_Tu_Lieu_Bac_Ho',
    slug: 'hinh-anh-bac-ho',
    description: 'Ảnh chân dung Chủ tịch Hồ Chí Minh qua các thời kỳ lịch sử, ảnh sinh hoạt, tiếp khách quốc tế, thăm đồng bào và chiến sĩ miền Nam.',
    targetMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    keyUseCases: 'Hiển thị trên Hero trang chủ, Tiểu sử 6 chương, Triển lãm ảnh tư liệu, Thẻ di sản.',
    exampleFiles: ['bac-ho-ngoi-ghe-may.jpg', 'bac-ho-tai-chien-khu-viet-bac.png', 'bac-ho-voi-thieu-nhi.jpg'],
  },
  {
    code: '02',
    name: '02_Tac_Pham_Kinh_Dien_Va_Sach',
    slug: 'tac-pham-va-sach',
    description: 'Các tác phẩm kinh điển của Bác (Đường Kách Mệnh, Bản án chế độ thực dân Pháp, Nhật ký trong tù, Di chúc 1969) và 15 tập Hồ Chí Minh Toàn tập bản số hóa PDF.',
    targetMimeTypes: ['application/pdf', 'application/epub+zip', 'image/jpeg'],
    keyUseCases: 'Tủ sách số 15 tác phẩm, Tra cứu Hồ Chí Minh Toàn tập (15 Tập), Trích dẫn văn kiện.',
    exampleFiles: ['duong-kach-menh-1927.pdf', 'di-chuc-1969-toan-van.pdf', 'nhat-ky-trong-tu-chu-han-dich.pdf'],
  },
  {
    code: '03',
    name: '03_Am_Thanh_Video_Goc_Cua_Bac',
    slug: 'am-thanh-video-goc',
    description: 'Bản ghi âm giọng đọc lịch sử nguyên bản của Bác (Tuyên ngôn Độc lập 1945, Lời kêu gọi toàn quốc kháng chiến 1946...) và các thước phim tư liệu quý.',
    targetMimeTypes: ['audio/mpeg', 'audio/wav', 'video/mp4'],
    keyUseCases: 'Kho âm thanh & phim tư liệu, Trình phát Audio di sản, Nghe giọng Bác gốc (giữ nguyên không thay thế).',
    exampleFiles: ['tuyen-ngon-doc-lap-1945-giong-bac-goc.mp3', 'loi-keu-goi-toan-quoc-khang-chien-1946.mp3'],
  },
  {
    code: '04',
    name: '04_Nha_Truyen_Thong_Thu_Dau_Mot_3D',
    slug: 'nha-truyen-thong-3d',
    description: 'Dữ liệu số hóa thực tế ảo Nhà truyền thống Thủ Dầu Một (Di tích Nhà việc Phú Cường ven sông Bạch Đằng): Ảnh Panorama 360 độ 8K, mô hình 3D hiện vật, video flycam toàn cảnh.',
    targetMimeTypes: ['image/jpeg', 'model/gltf-binary', 'video/mp4'],
    keyUseCases: 'Mô hình tham quan thực tế ảo 3D VR Nhà truyền thống Thủ Dầu Một, điểm di tích đỏ địa phương.',
    exampleFiles: ['khuon-vien-cong-vien-360.jpg', 'gian-tien-dien-khang-phap-360.jpg', 'xe-ngua-co-nam-bo-3d.glb'],
  },
  {
    code: '05',
    name: '05_Chi_Bo_Va_Khu_Pho_Hoc_Tap',
    slug: 'chi-bo-khu-pho',
    description: 'Tài liệu nghiệp vụ sinh hoạt chi bộ, 12 chuyên đề học tập và làm theo Bác hàng tháng, phiếu tự chấm điểm Quy định 144-QĐ/TW, hình ảnh mô hình thực tiễn tại các khu phố phường Thủ Dầu Một.',
    targetMimeTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg'],
    keyUseCases: 'Không gian Chi bộ số, In bản tin sinh hoạt chuyên đề, Báo cáo gương điển hình học Bác.',
    exampleFiles: ['chuyen-de-sinh-hoat-chi-bo-thang.pdf', 'phieu-tu-danh-gia-quy-dinh-144.docx', 'mo-hinh-khu-pho-van-minh.jpg'],
  },
  {
    code: '06',
    name: '06_Uploads_Ban_Bien_Tap_Website',
    slug: 'uploads-ban-bien-tap',
    description: 'Thư mục tiếp nhận hình ảnh bài viết, tin tức sự kiện, phóng sự do cán bộ quản trị viên phường Thủ Dầu Một tải lên để nhúng vào cổng thông tin.',
    targetMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    keyUseCases: 'Bài viết tin tức sự kiện, hình ảnh hoạt động văn hóa, bài đăng mới trên cổng.',
    exampleFiles: ['le-ky-niem-ngay-sinh-bac-2026.jpg', 'hoi-thi-ke-chuyen-bac-ho.png'],
  },
  {
    code: '07',
    name: '07_Sao_Luu_Du_Lieu_He_Thong',
    slug: 'sao-luu-he-thong',
    description: 'Các bản sao lưu định kỳ dạng file JSON chứa toàn bộ dữ liệu bài viết, mốc lịch sử, nội dung số hóa, danh sách lưu bút Sổ vàng số để phục vụ lưu trữ vĩnh viễn trên Drive.',
    targetMimeTypes: ['application/json'],
    keyUseCases: 'Phục hồi dữ liệu, lưu trữ dự phòng đám mây dài hạn, kiểm toán dữ liệu cấp A.',
    exampleFiles: ['hcm-space-backup-2026-11-24.json', 'so-vang-truyen-thong-backup.json'],
  },
];

/**
 * Trích xuất Google Drive File ID từ bất kỳ định dạng link hoặc chuỗi ID
 */
export function extractDriveFileId(input: string): string | null {
  if (!input) return null;
  const str = input.trim();

  // Nếu chuỗi nhập vào chính là ID (chữ, số, gạch nối, gạch dưới, độ dài từ 25-45 ký tự)
  if (/^[a-zA-Z0-9_-]{25,45}$/.test(str)) {
    return str;
  }

  // Khớp định dạng: drive.google.com/file/d/FILE_ID/view...
  const matchFileD = str.match(/\/file\/d\/([a-zA-Z0-9_-]{25,45})/i);
  if (matchFileD && matchFileD[1]) return matchFileD[1];

  // Khớp định dạng: drive.google.com/open?id=FILE_ID hoặc uc?id=FILE_ID
  const matchIdParam = str.match(/[?&]id=([a-zA-Z0-9_-]{25,45})/i);
  if (matchIdParam && matchIdParam[1]) return matchIdParam[1];

  // Khớp định dạng: drive.google.com/thumbnail?id=FILE_ID
  const matchThumbnail = str.match(/\/thumbnail\?id=([a-zA-Z0-9_-]{25,45})/i);
  if (matchThumbnail && matchThumbnail[1]) return matchThumbnail[1];

  // Khớp định dạng: googleusercontent.com/d/FILE_ID
  const matchUserContent = str.match(/\/d\/([a-zA-Z0-9_-]{25,45})/i);
  if (matchUserContent && matchUserContent[1]) return matchUserContent[1];

  return null;
}

/**
 * Chuyển đổi link Google Drive hoặc ID thành URL ảnh trực tiếp hiển thị được trên web
 * Sử dụng Google CDN tốc độ cao (lh3.googleusercontent.com/d/ID)
 */
export function convertDriveToDirectImageUrl(input: string, maxWidth: number = 1600): string {
  if (!input) return '';
  const fileId = extractDriveFileId(input);

  if (!fileId) {
    // Nếu không phải link Drive, giữ nguyên (ví dụ: URL nội bộ /assets/... hoặc URL ngoài)
    return input;
  }

  // CDN chất lượng cao của Google Drive
  return `https://lh3.googleusercontent.com/d/${fileId}=w${maxWidth}`;
}

/**
 * Tạo link tải về trực tiếp từ Google Drive
 */
export function getDriveDirectDownloadUrl(input: string): string {
  const fileId = extractDriveFileId(input);
  if (!fileId) return input;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Tạo link xem trước file trên Google Drive
 */
export function getDrivePreviewUrl(input: string): string {
  const fileId = extractDriveFileId(input);
  if (!fileId) return input;
  return `https://drive.google.com/file/d/${fileId}/view`;
}
