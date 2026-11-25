export interface SovereigntyIsland {
  id: string;
  officialName: string;
  shortName: string;
  adminUnit: string;
  coords: [number, number]; // [lat, lng]
  summary: string;
  legalBasis: string;
  historyAndEvidence: string;
  quoteHcm?: string;
  officialSources: {
    title: string;
    url: string;
    authority: string;
  }[];
}

export const OFFICIAL_VIETNAM_ISLANDS: SovereigntyIsland[] = [
  {
    id: 'hoang-sa',
    officialName: 'Quần đảo Hoàng Sa (Việt Nam)',
    shortName: 'Quần đảo Hoàng Sa',
    adminUnit: 'Huyện đảo Hoàng Sa, Thành phố Đà Nẵng',
    coords: [16.5, 112.0],
    summary:
      'Quần đảo san hô gồm hơn 30 đảo, bãi đá, bãi ngầm và cồn cát nằm ở phía bắc Biển Đông, cách thành phố Đà Nẵng khoảng 170 hải lý.',
    legalBasis:
      'Việt Nam có đầy đủ căn cứ pháp lý và bằng chứng lịch sử khẳng định chủ quyền đối với quần đảo Hoàng Sa và quần đảo Trường Sa, phù hợp với luật pháp quốc tế, trong đó có Công ước Liên Hợp Quốc về Luật Biển (UNCLOS) năm 1982.',
    historyAndEvidence:
      'Nhà nước phong kiến Việt Nam đã xác lập và thực thi chủ quyền hòa bình, liên tục từ thế kỷ XVII đối với hai quần đảo này thông qua hoạt động thường niên của Đội Hoàng Sa và Đội Bắc Hải được ghi chép tường minh trong châu bản, chính sử triều Nguyễn.',
    quoteHcm:
      'Đồng bào ta phải kiên quyết giữ gìn từng tấc đất, khúc sông của tổ tiên để lại.',
    officialSources: [
      {
        title: 'Cổng Thông tin điện tử Chính phủ nước CHXHCN Việt Nam',
        url: 'https://chinhphu.vn',
        authority: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      },
      {
        title: 'Bộ Ngoại giao Việt Nam — Tuyên bố chủ quyền biển đảo',
        url: 'https://www.mofa.gov.vn',
        authority: 'Bộ Ngoại giao Việt Nam (Ủy ban Biên giới Quốc gia)',
      },
      {
        title: 'UBND Huyện Hoàng Sa — Thành phố Đà Nẵng',
        url: 'https://hoangsa.danang.gov.vn',
        authority: 'Ủy ban Nhân dân Huyện Hoàng Sa',
      },
    ],
  },
  {
    id: 'truong-sa',
    officialName: 'Quần đảo Trường Sa (Việt Nam)',
    shortName: 'Quần đảo Trường Sa',
    adminUnit: 'Huyện đảo Trường Sa, Tỉnh Khánh Hòa',
    coords: [9.8, 114.5],
    summary:
      'Quần đảo gồm hơn 100 đảo, bãi đá, rạn san hô và bãi ngầm trải dài trên vùng biển chiến lược phía nam Biển Đông, là phên dậu tiền tiêu vững chắc của Tổ quốc.',
    legalBasis:
      'Chủ quyền của Việt Nam đối với quần đảo Trường Sa là thiêng liêng, bất khả xâm phạm theo Luật Biển Việt Nam năm 2012 và UNCLOS 1982. Mọi hoạt động của các bên tại khu vực này mà không có sự chấp thuận của Việt Nam đều hoàn toàn bất hợp pháp và vô giá trị.',
    historyAndEvidence:
      'Các thế hệ cán bộ, chiến sĩ và nhân dân Việt Nam đã đổ mồ hôi, xương máu kiên cường bảo vệ, xây dựng và quản lý liên tục các đảo, điểm đảo thuộc huyện đảo Trường Sa, tỉnh Khánh Hòa.',
    quoteHcm:
      'Ngày trước ta chỉ có đêm và rừng. Ngày nay ta có ngày, có trời, có biển. Bờ biển ta dài, tươi đẹp, ta phải biết giữ gìn lấy nó.',
    officialSources: [
      {
        title: 'Cổng Thông tin điện tử Chính phủ nước CHXHCN Việt Nam',
        url: 'https://chinhphu.vn',
        authority: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      },
      {
        title: 'Bộ Ngoại giao Việt Nam — Lập trường Biển Đông',
        url: 'https://www.mofa.gov.vn',
        authority: 'Bộ Ngoại giao Việt Nam',
      },
      {
        title: 'UBND Tỉnh Khánh Hòa — Cổng thông tin đối ngoại',
        url: 'https://khanhhoa.gov.vn',
        authority: 'Ủy ban Nhân dân Tỉnh Khánh Hòa',
      },
    ],
  },
];
