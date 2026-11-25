import React, { useEffect, useMemo, useState, useRef } from 'react';
import QRCode from 'qrcode';
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Box,
  Building2,
  Calendar,
  Compass,
  Copy,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Film,
  History,
  ImagePlus,
  Landmark,
  Mic,
  Plus,
  QrCode,
  Quote,
  Radio,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import { DongSonDrumIcon, ChimHacIcon, HoaSenIcon, TraditionalBorderPattern } from './components/TraditionalMotifs';
import { SkillActionWidget } from './components/SkillActionWidget';
import { NationalHeader } from './components/NationalHeader';
import { AudioHeritagePlayer } from './components/AudioHeritagePlayer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { LucianCommandPalette } from './components/LucianCommandPalette';
import { LucianQrShareModal } from './components/LucianQrShareModal';
import { LucianSignInModal } from './components/LucianSignInModal';
import { InstitutionalFooter } from './components/InstitutionalFooter';
import { ProfessionalNavbar, type SpaceTab } from './components/ProfessionalNavbar';
import { HcmHomeExhibitionView } from './components/HcmHomeExhibitionView';
import { HcmSpatial3DMinimap } from './components/HcmSpatial3DMinimap';
import { HcmPageLoader } from './components/HcmPageLoader';
import { HcmAdminLoginModal } from './components/HcmAdminLoginModal';
import { HcmArticleManagerModal } from './components/HcmArticleManagerModal';
import { HcmDigitalGoldenBookModal } from './components/HcmDigitalGoldenBookModal';
import { HcmRedHeritageMapModal } from './components/HcmRedHeritageMapModal';
import { DailyHeritageQuoteRibbon } from './components/DailyHeritageQuoteRibbon';
import { parseDomainFromUrl, updateBrowserUrl, type HcmDomainKey } from './utils/hcmNavigation';
import { HcmOnThisDayWidget } from './components/HcmOnThisDayWidget';
import { useScrollReveal } from './hooks/useScrollReveal';
import { HcmQuoteCardGeneratorModal } from './components/HcmQuoteCardGeneratorModal';
import { HcmToanTapExplorerModal, HCM_TOAN_TAP_DRIVE_URL } from './components/HcmToanTapExplorerModal';
import { HcmChiBoWorkspaceModal } from './components/HcmChiBoWorkspaceModal';
import { ChiBoBulletinPrintModal } from './components/ChiBoBulletinPrintModal';
import { HcmVoiceStudioModal } from './components/HcmVoiceStudioModal';
import { HcmGoogleDriveStorageModal } from './components/HcmGoogleDriveStorageModal';
import { HCM_DRIVE_STORAGE_CONFIG, convertDriveToDirectImageUrl } from './lib/hcmDriveStorage';
import { hcmCloudSync } from './lib/hcmCloudSync';
import { useApp } from './AppContext';
import {
  createHcmEntry,
  DEFAULT_LOCAL_ITEMS,
  DEFAULT_LOCAL_SETTINGS,
  deleteHcmEntry,
  fetchHcmSpaceState,
  fetchHcmV2Overview,
  saveHcmChecklist,
  saveHcmSpaceSettings,
  updateHcmEntry,
  type HcmChecklistMap,
  type HcmCulturalEntryDto,
  type HcmSection,
  type HcmSpaceSettingsDto,
  type HcmV2OverviewDto,
} from './hcmSpaceClient';
import {
  AUDIO_ARCHIVE_4,
  CLASSIC_WORKS_15,
  FOOTPRINTS_20,
  HCM_NEWS_ARTICLES_6,
  HCM_PHOTO_GALLERY,
  HCM_SPATIAL_SHOWCASE_ZONES,
  HISTORICAL_ERAS,
  HISTORICAL_EVENTS_30,
  OFFICIAL_ATTRIBUTION_SOURCES,
  TDM_HIGHLIGHTS_NEW_POINTS,
  VERIFIED_QUOTES_12,
  VIDEO_DOCUMENTARIES_11,
} from './hcmCoreDataset';
import { HcmExhibitGalleryView, HcmFootprintsMapView } from './components/HcmExhibitionAndMapViews';
import {
  HcmBiographyChaptersView,
  HcmBookshelfView,
  HcmMediaLibraryView,
  HcmTimeline30View,
} from './components/HcmLibraryAndMediaViews';
import { HcmIdeologyAndQuizView, HcmNewsEventsView } from './components/HcmNewsAndIdeologyViews';
import { HcmEvaluationAndModelsView } from './components/HcmEvaluationAndModelsView';
import { HcmDossierExplorerView } from './components/HcmDossierExplorerView';
import { HcmAdminCmsView } from './components/HcmAdminCmsView';
import { HcmThuDauMotHeritageHouseView } from './components/HcmThuDauMotHeritageHouseView';
import { HcmTwentyOneDayChallengeModal } from './components/HcmTwentyOneDayChallengeModal';
import { HcmChiBoDigitalPocketModal } from './components/HcmChiBoDigitalPocketModal';
import { HcmHandwritingDeepZoomModal } from './components/HcmHandwritingDeepZoomModal';
import { HcmRedTourNavigatorModal } from './components/HcmRedTourNavigatorModal';
import { HcmHeritageAnalyticsModal } from './components/HcmHeritageAnalyticsModal';
import { HcmCitizenAuthModal } from './components/HcmCitizenAuthModal';
import { HcmGuidedJourneyModal } from './components/HcmGuidedJourneyModal';
import { HcmDynamicHeritageMapModal } from './components/HcmDynamicHeritageMapModal';
import { HcmPartyHistoryFullView } from './components/HcmPartyHistoryFullView';
import { HcmThuDauMotChronologyView } from './components/HcmThuDauMotChronologyView';
import { HcmExemplaryPeopleView } from './components/HcmExemplaryPeopleView';

interface EntryFormState {
  editingId: string | null;
  section: HcmSection;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  quote: string;
  imageUrl: string;
  status: 'PUBLISHED' | 'DRAFT';
  sortOrder: number;
}

const SECTION_LABELS: Record<HcmSection, { heading: string; titleLabel: string; subtitleLabel: string; locationLabel: string }> = {
  MILESTONE: {
    heading: 'Mốc Lịch sử & Di sản Hồ Chí Minh',
    titleLabel: 'Tiêu đề mốc sự kiện *',
    subtitleLabel: 'Mốc thời gian (VD: 19/05/1941)',
    locationLabel: 'Địa danh',
  },
  MODEL: {
    heading: 'Mô hình & Bài viết tại Phường Thủ Dầu Một',
    titleLabel: 'Tên mô hình / Tiêu đề bài viết *',
    subtitleLabel: 'Đơn vị / Chi bộ / Khu phố thực hiện',
    locationLabel: 'Địa bàn / Thời gian triển khai',
  },
  WORK: {
    heading: 'Tác phẩm Kinh điển & Tư liệu Học tập',
    titleLabel: 'Tên tác phẩm / Tài liệu *',
    subtitleLabel: 'Năm xuất bản / Giai đoạn',
    locationLabel: 'Nơi sáng tác / Phát hành',
  },
  QUOTE: {
    heading: 'Lời Bác dạy & Chuẩn mực Đạo đức',
    titleLabel: 'Nội dung lời dạy / Chuẩn mực *',
    subtitleLabel: 'Chủ đề áp dụng',
    locationLabel: 'Xuất xứ / Văn kiện trích dẫn',
  },
  NEWS: {
    heading: 'Tin tức & Sự kiện Không gian Văn hóa HCM — Phường Thủ Dầu Một',
    titleLabel: 'Tiêu đề bản tin / Sự kiện *',
    subtitleLabel: 'Ngày / Thời gian đăng (VD: 23/11/2026)',
    locationLabel: 'Chuyên mục (Hoạt động Thủ Dầu Một / Dân vận khéo)',
  },
};

export const HcmCulturalSpacePage: React.FC = () => {
  const { currentUser, updateCitizenProgress } = useApp();
  const canEdit = currentUser.role === 'ADMIN' || currentUser.role === 'EDITOR';

  const initialDomain = parseDomainFromUrl();
  const [activeTab, setActiveTab] = useState<SpaceTab>(() => {
    if (initialDomain === 'GOLDEN_BOOK' || initialDomain === 'RED_MAP') {
      return 'FOYER';
    }
    return initialDomain as SpaceTab;
  });
  const [settings, setSettings] = useState<HcmSpaceSettingsDto>(DEFAULT_LOCAL_SETTINGS);
  const [items, setItems] = useState<HcmCulturalEntryDto[]>(DEFAULT_LOCAL_ITEMS);
  const [checklist, setChecklist] = useState<HcmChecklistMap>({});
  const [v2Overview, setV2Overview] = useState<HcmV2OverviewDto | null>(null);
  const [syncedFromServer, setSyncedFromServer] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Modals & Utility States
  const [editingSettings, setEditingSettings] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState<HcmSpaceSettingsDto>(DEFAULT_LOCAL_SETTINGS);
  const [entryForm, setEntryForm] = useState<EntryFormState | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareQrUrl, setShareQrUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Advanced UI Controls
  const [searchOpen, setSearchOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(0);
  const [isResearchMode, setIsResearchMode] = useState(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // New Heritage Modals (Hồ Chí Minh Toàn tập, Thiệp Di Sản, Chi Bộ Workspace, Bản Tin)
  const [isQuoteCardOpen, setIsQuoteCardOpen] = useState(false);
  const [quoteCardText, setQuoteCardText] = useState('');
  const [quoteCardSource, setQuoteCardSource] = useState('');
  const [isToanTapOpen, setIsToanTapOpen] = useState(false);
  const [isChiBoWorkspaceOpen, setIsChiBoWorkspaceOpen] = useState(false);
  const [isChiBoBulletinOpen, setIsChiBoBulletinOpen] = useState(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);

  // Quản trị & Ý tưởng mới (Admin Login, Article Manager CRUD, Sổ vàng số, Địa chỉ đỏ, Google Drive Cloud Storage)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isArticleManagerOpen, setIsArticleManagerOpen] = useState(false);
  const [isGoldenBookOpen, setIsGoldenBookOpen] = useState(() => initialDomain === 'GOLDEN_BOOK');
  const [isRedMapOpen, setIsRedMapOpen] = useState(() => initialDomain === 'RED_MAP');
  const [isDriveStorageOpen, setIsDriveStorageOpen] = useState(false);

  // Phân hệ Đăng ký, Đăng nhập Người Dân & Lộ trình Cuộc đời Bác
  const [citizenAuthOpen, setCitizenAuthOpen] = useState(false);
  const [citizenAuthMode, setCitizenAuthMode] = useState<'login' | 'register'>('register');
  const [guidedJourneyOpen, setGuidedJourneyOpen] = useState(false);

  // 5 Tính Năng Nâng Cấp Đột Phá 2026
  const [isTwentyOneDayOpen, setIsTwentyOneDayOpen] = useState(false);
  const [isChiBoPocketOpen, setIsChiBoPocketOpen] = useState(false);
  const [isHandwritingZoomOpen, setIsHandwritingZoomOpen] = useState(false);
  const [isRedTourOpen, setIsRedTourOpen] = useState(false);
  const [isHeritageAnalyticsOpen, setIsHeritageAnalyticsOpen] = useState(false);

  const isFirstMountRef = useRef(true);

  // 1. Phân tích URL khi khởi động và lắng nghe nút Back / Forward (HTML5 History API)
  useEffect(() => {
    const handleUrlSync = () => {
      const targetDomain = parseDomainFromUrl();
      if (targetDomain === 'GOLDEN_BOOK') {
        setIsGoldenBookOpen(true);
        setIsRedMapOpen(false);
      } else if (targetDomain === 'RED_MAP') {
        setIsRedMapOpen(true);
        setIsGoldenBookOpen(false);
      } else {
        setActiveTab(targetDomain as SpaceTab);
        setIsGoldenBookOpen(false);
        setIsRedMapOpen(false);
      }
    };

    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // 2. Cập nhật URL trình duyệt mỗi khi đổi tab hoặc mở modal Sổ vàng / Địa chỉ đỏ
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      // Khi vừa tải trang, chỉ cập nhật document.title và giữ nguyên URL hiện tại (replace: true)
      if (isGoldenBookOpen) {
        updateBrowserUrl('GOLDEN_BOOK', true);
      } else if (isRedMapOpen) {
        updateBrowserUrl('RED_MAP', true);
      } else if (activeTab) {
        updateBrowserUrl(activeTab, true);
      }
      return;
    }

    if (isGoldenBookOpen) {
      updateBrowserUrl('GOLDEN_BOOK');
    } else if (isRedMapOpen) {
      updateBrowserUrl('RED_MAP');
    } else if (activeTab) {
      updateBrowserUrl(activeTab);
    }
  }, [activeTab, isGoldenBookOpen, isRedMapOpen]);

  // Tự động lưu tiến trình học tập của Người Dân khi chuyển đổi chuyên mục
  useEffect(() => {
    if (activeTab && activeTab !== 'FOYER') {
      const tabTitleMap: Record<string, string> = {
        PARTY_HISTORY: 'Lịch Sử Đảng Bộ TP Thủ Dầu Một (Toàn tập 600 Trang)',
        BIO: 'Tiểu sử & Cuộc đời Bác',
        BOOKS: 'Tủ sách & Tác phẩm Kinh điển',
        TIMELINE: 'Dòng thời gian Lịch sử 1890–1969',
        EXHIBIT: 'Bảo tàng & Hiện vật 3D',
        TDM_HOUSE: 'Nhà truyền thống & Di tích Đất Thủ',
        TDM_CHRONOLOGY: 'Biên Niên Sử Phường Thủ Dầu Một (Từ 01/7/2025 Đến Nay)',
        EXEMPLARY_PEOPLE: 'Gương Sáng Tiêu Biểu & Người Tốt Việc Tốt (Từ 01/7/2025)',
        FOOTPRINTS: 'Bản Đồ Di Sản (10 Chặng Bôn Ba & Địa Chỉ Đỏ TP.HCM)',
        MEDIA: 'Đa Phương Tiện: Giọng Nói VOV, Video Trẻ TikTok & Phim Tư Liệu',
        IDEOLOGY: 'Tư tưởng & Trắc nghiệm Di sản',
        EVALUATION: 'Bộ tiêu chí QĐ 144 & Mô hình',
      };
      updateCitizenProgress(activeTab, undefined, tabTitleMap[activeTab] || activeTab);
    }
  }, [activeTab]);

  // Kích hoạt hiệu ứng xuất hiện các thành phần của trang khi kéo chuột xuống
  useScrollReveal([activeTab]);

  const handleOpenQuoteCard = (text?: string, source?: string) => {
    if (text) setQuoteCardText(text);
    if (source) setQuoteCardSource(source);
    setIsQuoteCardOpen(true);
  };

  const handleManualCloudSync = async () => {
    setIsCloudSyncing(true);
    try {
      // Đồng bộ SQLite local API server
      const res = await fetchHcmSpaceState();
      setSettings(res.settings);
      setItems(res.items);
      setChecklist(res.checklist || {});
      setSyncedFromServer(res.syncedFromServer);

      // Đẩy dữ liệu lên Cloud Firestore (trolythammuu-d2965)
      const cloudRes = await hcmCloudSync.forcePushAllLocalToCloud(
        res.settings,
        res.items,
        res.checklist || {}
      );

      setNotice(cloudRes.message || 'Đã kết nối và đồng bộ Cloud Firestore thành công!');
      setTimeout(() => setNotice(null), 4500);
    } catch (err: any) {
      setNotice('Thông báo đồng bộ: ' + (err.message || 'Đã lưu cục bộ'));
      setTimeout(() => setNotice(null), 4000);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const refreshV2Overview = async () => {
    const ov = await fetchHcmV2Overview();
    if (ov) setV2Overview(ov);
  };

  useEffect(() => {
    let cancelled = false;

    // 1. Tải trạng thái từ API server local
    fetchHcmSpaceState().then((res) => {
      if (cancelled) return;
      setSettings(res.settings);
      setItems(res.items);
      setChecklist(res.checklist || {});
      setSyncedFromServer(res.syncedFromServer);
    });

    fetchHcmV2Overview().then((ov) => {
      if (!cancelled && ov) setV2Overview(ov);
    });

    // 2. Khởi tạo kết nối lắng nghe thời gian thực Cloud Firestore
    hcmCloudSync.initSync({
      onSettingsUpdate: (cloudSettings) => {
        if (!cancelled && cloudSettings) setSettings(cloudSettings);
      },
      onEntriesUpdate: (cloudEntries) => {
        if (!cancelled && cloudEntries && cloudEntries.length > 0) setItems(cloudEntries);
      },
      onChecklistUpdate: (cloudChecklist) => {
        if (!cancelled && cloudChecklist) setChecklist(cloudChecklist);
      },
    }).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!shareOpen || typeof window === 'undefined') return;
    QRCode.toDataURL(`${window.location.origin}/khong-gian-van-hoa-ho-chi-minh`, { width: 200, margin: 1 })
      .then((u) => setShareQrUrl(u))
      .catch(() => {});
  }, [shareOpen]);

  // Custom unit items added beyond baseline seeded IDs
  const seededIds = useMemo(() => new Set(DEFAULT_LOCAL_ITEMS.map((d) => d.id)), []);
  const customMilestones = useMemo(
    () => items.filter((i) => i.section === 'MILESTONE' && !seededIds.has(i.id)),
    [items, seededIds]
  );
  const customWorks = useMemo(
    () => items.filter((i) => i.section === 'WORK' && !seededIds.has(i.id)),
    [items, seededIds]
  );
  const customQuotes = useMemo(
    () => items.filter((i) => i.section === 'QUOTE' && !seededIds.has(i.id)),
    [items, seededIds]
  );
  const wardModels = useMemo(
    () => items.filter((i) => i.section === 'MODEL').sort((a, b) => a.sortOrder - b.sortOrder),
    [items]
  );
  const customNews = useMemo(
    () => items.filter((i) => i.section === 'NEWS').sort((a, b) => a.sortOrder - b.sortOrder),
    [items]
  );

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice((prev) => (prev === msg ? null : prev)), 3500);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await saveHcmSpaceSettings(settingsDraft);
      setSettings(res.data);
      setSyncedFromServer(res.syncedFromServer);
      setEditingSettings(false);
      showNotice(res.syncedFromServer ? 'Đã lưu cấu hình lên máy chủ.' : 'Đã lưu cấu hình vào máy này.');
    } finally {
      setSaving(false);
    }
  };

  const openCreateForm = (section: HcmSection, prefill?: Partial<EntryFormState>) => {
    setEntryForm({
      editingId: null,
      section,
      title: prefill?.title || '',
      subtitle: prefill?.subtitle || (section === 'MODEL' ? 'Ban Xây dựng Đảng – Phường Thủ Dầu Một' : ''),
      location: prefill?.location || (section === 'MODEL' ? 'Phường Thủ Dầu Một' : ''),
      summary: prefill?.summary || '',
      quote: prefill?.quote || '',
      imageUrl: prefill?.imageUrl || '',
      status: 'PUBLISHED',
      sortOrder: items.filter((i) => i.section === section).length + 1,
    });
  };

  const openEditForm = (entry: HcmCulturalEntryDto) => {
    setEntryForm({
      editingId: entry.id,
      section: entry.section,
      title: entry.title,
      subtitle: entry.subtitle,
      location: entry.location,
      summary: entry.summary,
      quote: entry.quote,
      imageUrl: entry.imageUrl,
      status: entry.status,
      sortOrder: entry.sortOrder,
    });
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEntryForm((prev) => (prev ? { ...prev, imageUrl: reader.result as string } : prev));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryForm || !entryForm.title.trim()) return;
    setSaving(true);
    try {
      if (entryForm.editingId) {
        const res = await updateHcmEntry(entryForm.editingId, {
          title: entryForm.title,
          subtitle: entryForm.subtitle,
          location: entryForm.location,
          summary: entryForm.summary,
          quote: entryForm.quote,
          imageUrl: entryForm.imageUrl,
          status: entryForm.status,
          sortOrder: entryForm.sortOrder,
        });
        setItems((prev) => prev.map((it) => (it.id === res.data.id ? res.data : it)));
        setSyncedFromServer(res.syncedFromServer);
        showNotice('Đã cập nhật nội dung thành công.');
      } else {
        const res = await createHcmEntry({
          section: entryForm.section,
          title: entryForm.title,
          subtitle: entryForm.subtitle,
          location: entryForm.location,
          summary: entryForm.summary,
          quote: entryForm.quote,
          imageUrl: entryForm.imageUrl,
          status: entryForm.status,
          sortOrder: entryForm.sortOrder,
        });
        setItems((prev) => [...prev, res.data]);
        setSyncedFromServer(res.syncedFromServer);
        showNotice('Đã thêm nội dung mới vào Không gian Văn hóa HCM phường Thủ Dầu Một.');
      }
      setEntryForm(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async (entry: HcmCulturalEntryDto) => {
    const res = await deleteHcmEntry(entry.id);
    setItems((prev) => prev.filter((it) => it.id !== entry.id));
    setSyncedFromServer(res.syncedFromServer);
    showNotice(`Đã xóa "${entry.title.slice(0, 50)}".`);
  };

  const handleSaveChecklist = async (unitName: string, checked: Record<string, boolean>) => {
    const res = await saveHcmChecklist(unitName, checked);
    setChecklist(res.data);
    setSyncedFromServer(res.syncedFromServer);
    showNotice(`Đã lưu kết quả tự đánh giá Không gian Văn hóa HCM cho "${unitName}".`);
  };

  const gatewayCards: Array<{
    id: SpaceTab;
    title: string;
    subtitle: string;
    badge: string;
    icon: any;
    accentCls: string;
  }> = [
    {
      id: 'NEWS',
      title: 'Bản Tin & Mô Hình Cơ Sở',
      subtitle: 'Chỉ thị 07-CT/TW, 4 nguồn chính thống & Cổng TTĐT TP.HCM',
      badge: `${HCM_NEWS_ARTICLES_6.length + customNews.length} bài viết`,
      icon: FileText,
      accentCls: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'QUOTES',
      title: 'Tư Tưởng & Đạo Đức Bác Hồ',
      subtitle: '12 Lời Bác dạy, chuẩn mực QĐ 144, thiệp di sản & trắc nghiệm',
      badge: '12 chuẩn mực',
      icon: ShieldCheck,
      accentCls: 'from-rose-700 to-crimson-deep',
    },
    {
      id: 'BOOKS',
      title: 'Tủ Sách Kinh Điển & Ebook',
      subtitle: '15 Tác phẩm bảo vật, 15 tập Toàn tập, 8 Ebook & 5 Chuyện kể',
      badge: '38 tác phẩm',
      icon: BookMarked,
      accentCls: 'from-amber-600 to-amber-700',
    },
    {
      id: 'FOOTPRINTS',
      title: 'Bản Đồ Di Sản & Địa Chỉ Đỏ',
      subtitle: '10 chặng bôn ba cứu nước toàn cầu & hệ thống Địa chỉ đỏ Hồ Chí Minh tại TP.HCM',
      badge: '10 chặng',
      icon: Compass,
      accentCls: 'from-teal-700 to-cyan-800',
    },
    {
      id: 'EXHIBIT',
      title: 'Bảo Tàng Số Ảo 3D',
      subtitle: 'Tham quan 8 không gian di sản số hóa, 16 ảnh & 11 phim tài liệu',
      badge: '3D WebGL',
      icon: Film,
      accentCls: 'from-purple-700 to-violet-800',
    },
    {
      id: 'AI_STUDIO',
      title: 'Trợ Lý AI Tham Mưu Tuyên Giáo',
      subtitle: 'Soạn thảo kế hoạch Chỉ thị 07, chuẩn hóa bài viết & tham mưu',
      badge: 'AI Tuyên giáo',
      icon: Sparkles,
      accentCls: 'from-emerald-700 to-teal-800',
    },
  ];

  const fontSizeClass =
    fontSizeLevel === 1 ? 'text-[1.05rem]' : fontSizeLevel === 2 ? 'text-[1.125rem]' : '';

  const handleArticleSave = async (entry: Partial<HcmCulturalEntryDto> & { editingId?: string | null }) => {
    if (!entry.title?.trim() || !entry.section) return;
    setSaving(true);
    try {
      if (entry.editingId) {
        const res = await updateHcmEntry(entry.editingId, {
          title: entry.title,
          subtitle: entry.subtitle || '',
          location: entry.location || '',
          summary: entry.summary || '',
          quote: entry.quote || '',
          imageUrl: entry.imageUrl || '',
          status: entry.status || 'PUBLISHED',
          sortOrder: entry.sortOrder || 1,
        });
        setItems((prev) => prev.map((it) => (it.id === res.data.id ? res.data : it)));
        setSyncedFromServer(res.syncedFromServer);
        showNotice('Đã cập nhật bài viết thành công.');
      } else {
        const res = await createHcmEntry({
          section: entry.section,
          title: entry.title,
          subtitle: entry.subtitle || '',
          location: entry.location || '',
          summary: entry.summary || '',
          quote: entry.quote || '',
          imageUrl: entry.imageUrl || '',
          status: entry.status || 'PUBLISHED',
          sortOrder: entry.sortOrder || items.length + 1,
        });
        setItems((prev) => [...prev, res.data]);
        setSyncedFromServer(res.syncedFromServer);
        showNotice('Đã xuất bản bài viết mới vào Không gian Văn hóa HCM.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#FDF7F8] via-[#FAF5F2] to-[#FCF6F7] flex flex-col font-sans selection:bg-[#751D2C] selection:text-white ${fontSizeClass}`}>
      {/* Hiệu ứng Load trang trang trọng & mượt mà */}
      <HcmPageLoader minDurationMs={600} />

      {/* Khi ở trang chủ (FOYER): Hiển thị đầy đủ 6 tầng bố cục chuẩn theo thiết kế yêu cầu */}
      {activeTab === 'FOYER' ? (
        <HcmHomeExhibitionView
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenShare={() => setShareOpen(true)}
          onOpenToanTap={() => setIsToanTapOpen(true)}
          onOpenQuoteCard={(text, source) => handleOpenQuoteCard(text, source)}
          onOpenChiBoWorkspace={() => setIsChiBoWorkspaceOpen(true)}
          onOpenChiBoBulletin={() => setIsChiBoBulletinOpen(true)}
          onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
          onOpenArticleManager={() => setIsArticleManagerOpen(true)}
          onOpenGoldenBook={() => setIsGoldenBookOpen(true)}
          onOpenRedMap={() => setIsRedMapOpen(true)}
          onOpenTwentyOneDayChallenge={() => setIsTwentyOneDayOpen(true)}
          onOpenChiBoPocket={() => setIsChiBoPocketOpen(true)}
          onOpenHandwritingZoom={() => setIsHandwritingZoomOpen(true)}
          onOpenRedTour={() => setIsRedTourOpen(true)}
          onOpenHeritageAnalytics={() => setIsHeritageAnalyticsOpen(true)}
          onOpenCitizenAuth={(mode) => {
            setCitizenAuthMode(mode);
            setCitizenAuthOpen(true);
          }}
          onOpenGuidedJourney={() => setGuidedJourneyOpen(true)}
        />
      ) : (
        <>
          {/* 1. National Ceremonial Header */}
          <NationalHeader
            onOpenSearch={() => setSearchOpen(true)}
            onOpenShare={() => setShareOpen(true)}
            onToggleAudio={() => {
              setAudioOpen(true);
              setIsAudioPlaying((prev) => !prev);
            }}
            isAudioPlaying={isAudioPlaying}
            fontSizeLevel={fontSizeLevel}
            onCycleFontSize={() => setFontSizeLevel((prev) => (prev + 1) % 3)}
            isBackendConnected={syncedFromServer}
            onSelectTab={setActiveTab}
            activeTab={activeTab}
            isResearchMode={isResearchMode}
            onToggleResearchMode={() => setIsResearchMode((prev) => !prev)}
            isCloudSyncing={isCloudSyncing}
            onManualCloudSync={handleManualCloudSync}
            onOpenToanTap={() => setIsToanTapOpen(true)}
            onOpenChiBoWorkspace={() => setIsChiBoWorkspaceOpen(true)}
            onOpenQuoteCard={() => handleOpenQuoteCard()}
            onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onOpenArticleManager={() => setIsArticleManagerOpen(true)}
            onOpenGoldenBook={() => setIsGoldenBookOpen(true)}
            onOpenRedMap={() => setIsRedMapOpen(true)}
            onOpenTwentyOneDayChallenge={() => setIsTwentyOneDayOpen(true)}
            onOpenChiBoPocket={() => setIsChiBoPocketOpen(true)}
            onOpenHandwritingZoom={() => setIsHandwritingZoomOpen(true)}
            onOpenRedTour={() => setIsRedTourOpen(true)}
            onOpenHeritageAnalytics={() => setIsHeritageAnalyticsOpen(true)}
            onOpenCitizenAuth={(mode) => {
              setCitizenAuthMode(mode);
              setCitizenAuthOpen(true);
            }}
            onOpenGuidedJourney={() => setGuidedJourneyOpen(true)}
          />

          {/* 2. Professional Always-Visible Horizontal Pill Navbar */}
          <ProfessionalNavbar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            canEdit={canEdit}
            totalNewsCount={HCM_NEWS_ARTICLES_6.length + customNews.length}
            wardModelsCount={wardModels.length}
            dossierCount={v2Overview?.dossiers.length || 3}
            cmsPendingCount={
              v2Overview
                ? (v2Overview.audit.byPublishStatus.PENDING_REVIEW || 0) + v2Overview.audit.aiDraftCount
                : undefined
            }
          />
        </>
      )}

      <main className="flex-1 mx-auto max-w-7xl w-full px-3 sm:px-6 space-y-6 pt-2 pb-12">
        {notice && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-800 flex items-center justify-between gap-2 shadow-xs">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice(null)} className="cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 1. Sảnh Trung Tâm (FOYER) */}
        {activeTab === 'FOYER' && (
          <div className="space-y-6">
            {/* Thanh điều hướng nhanh phân hệ khi cuộn xuống trang chủ */}
            <div className="rounded-2xl border border-[#E5D3B2] bg-white p-3.5 shadow-xs scroll-reveal">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#751D2C]"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#751D2C]">
                    Khám phá chuyên sâu các phân hệ số
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('NEWS')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5D3B2] hover:border-[#751D2C] hover:bg-rose-50 text-[#262321] hover:text-[#751D2C] font-semibold transition-all cursor-pointer"
                  >
                    Bản tin &amp; Mô hình
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('BIO')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5D3B2] hover:border-[#751D2C] hover:bg-rose-50 text-[#262321] hover:text-[#751D2C] font-semibold transition-all cursor-pointer"
                  >
                    Tiểu sử 6 chương
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('TIMELINE')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5D3B2] hover:border-[#751D2C] hover:bg-rose-50 text-[#262321] hover:text-[#751D2C] font-semibold transition-all cursor-pointer"
                  >
                    8 Thời kỳ &amp; 30 Mốc son
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('BOOKS')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5D3B2] hover:border-[#751D2C] hover:bg-rose-50 text-[#262321] hover:text-[#751D2C] font-semibold transition-all cursor-pointer"
                  >
                    Tủ sách 15 tác phẩm
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('QUOTES')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5D3B2] hover:border-[#751D2C] hover:bg-rose-50 text-[#262321] hover:text-[#751D2C] font-semibold transition-all cursor-pointer"
                  >
                    Tư tưởng &amp; Lời dạy
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('EXHIBIT')}
                    className="px-3 py-1.5 rounded-lg bg-[#751D2C] text-white font-semibold transition-all cursor-pointer hover:bg-[#5B1522]"
                  >
                    Bảo tàng 3D
                  </button>
                </div>
              </div>
            </div>

            {/* Sa Bàn 3D Isometric Không Gian Văn Hóa HCM */}
            <div className="scroll-reveal">
              <HcmSpatial3DMinimap onSelectZone={(_idx) => setActiveTab('EXHIBIT')} />
            </div>

            {/* SECTION VII.B: THỐNG KÊ TƯ LIỆU ĐÃ THẨM ĐỊNH - 6 CỘT CÂN ĐỐI */}
            <section
              aria-label="Thống kê dữ liệu đã thẩm định"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 scroll-reveal"
            >
              {[
                { label: 'Thời kỳ cách mạng', count: HISTORICAL_ERAS.length, sub: 'Từ 1890 đến Di sản', icon: Calendar, tab: 'TIMELINE' as SpaceTab },
                { label: 'Sự kiện lịch sử', count: HISTORICAL_EVENTS_30.length + customMilestones.length, sub: 'Biên niên chuẩn Cấp A', icon: Sparkles, tab: 'TIMELINE' as SpaceTab },
                { label: 'Tác phẩm kinh điển', count: CLASSIC_WORKS_15.length + customWorks.length, sub: 'Bảo vật Quốc gia', icon: BookMarked, tab: 'BOOKS' as SpaceTab },
                { label: 'Lời Bác dặn', count: VERIFIED_QUOTES_12.length + customQuotes.length, sub: 'Nguồn chuẩn Cấp A', icon: Quote, tab: 'QUOTES' as SpaceTab },
                { label: 'Dấu chân Bác Hồ', count: FOOTPRINTS_20.length, sub: '20 tọa độ cứu nước', icon: Compass, tab: 'FOOTPRINTS' as SpaceTab },
                { label: 'Tư liệu Media số', count: AUDIO_ARCHIVE_4.length + VIDEO_DOCUMENTARIES_11.length + HCM_PHOTO_GALLERY.length, sub: 'Ảnh, Giọng Bác & Phim', icon: Film, tab: 'MEDIA' as SpaceTab },
              ].map((st) => {
                const Icon = st.icon;
                return (
                  <div
                    key={st.label}
                    onClick={() => {
                      setActiveTab(st.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-white via-rose-50/60 to-amber-50/40 border-2 border-rose-200 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-rose-800 mb-1">
                      <span className="text-xs font-bold">{st.label}</span>
                      <Icon className="w-4 h-4 text-rose-700 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-2xl font-extrabold text-rose-950 font-serif">
                      {String(st.count).padStart(2, '0')}
                    </div>
                    <p className="text-[11px] text-rose-700 mt-1">{st.sub}</p>
                  </div>
                );
              })}
            </section>

            {/* BÁC HỒ VỚI NGÀY NÀY NĂM XƯA — TƯ LIỆU BẢO TÀNG HỒ CHÍ MINH */}
            <div className="scroll-reveal">
              <HcmOnThisDayWidget
                onOpenCardGenerator={handleOpenQuoteCard}
                onSelectTab={setActiveTab}
              />
            </div>

            {/* MÔ HÌNH 3D & SA BÀN TƯƠNG TÁC CHUYÊN ĐỀ */}
            <div className="rounded-3xl border-2 border-[#C59A55] bg-gradient-to-r from-[#2A050A] via-[#4A0E17] to-[#2A050A] p-5 sm:p-6 text-white shadow-xl relative overflow-hidden scroll-reveal-scale">
              <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-20">
                <DongSonDrumIcon className="h-72 w-72 animate-spin-slow" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-500/20 border border-amber-400/60 px-3 py-0.5 text-xs font-black text-amber-300">
                      MÔ HÌNH 3D TƯƠNG TÁC
                    </span>
                    <span className="text-xs text-amber-200 font-bold">
                      08 Gian Chủ Đề &amp; Bảo Vật 360°
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-extrabold text-white">
                    Tham Quan Không Gian Văn Hóa Hồ Chí Minh 3D &amp; Sa Bàn Phối Cảnh
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                    Khám phá toàn cảnh 08 gian trưng bày theo dòng lịch sử, xoay 360 độ các hiện vật di sản quý giá và trải nghiệm tour tự động có thuyết minh tiếng Việt chuẩn Cấp A.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('EXHIBIT')}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C59A55] to-[#B28236] hover:brightness-110 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <Box className="h-4 w-4" />
                    <span>Vào Phòng 3D (360°)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('EXHIBIT')}
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-400/60 bg-white/10 hover:bg-white/20 px-3.5 py-2.5 text-xs font-bold text-amber-200 transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>Hiện Vật 3D 360°</span>
                  </button>
                </div>
              </div>
            </div>

          {/* Highlight New Points ("Điểm mới" tại Phường Thủ Dầu Một) & Spatial Exhibition Showcase */}
          <section className="rounded-3xl border border-blue-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4 scroll-reveal">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-800">
                  <Sparkles className="h-3 w-3" /> ĐIỂM MỚI ĐỘT PHÁ TẠI PHƯỜNG THỦ DẦU MỘT
                </span>
                <h3 className="mt-1 text-base sm:text-lg font-bold text-slate-900">
                  04 Điểm Mới Nổi Bật &amp; Quy Hoạch 04 Phân Khu Trưng Bày
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('MEDIA')}
                className="rounded-xl bg-[#EFF6FF] border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 cursor-pointer"
              >
                Mở Kho Ảnh &amp; Clip Minh họa →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {TDM_HIGHLIGHTS_NEW_POINTS.map((np) => (
                <article
                  key={np.id}
                  onClick={() => setActiveTab(np.targetTab)}
                  className="rounded-2xl border border-slate-200 bg-[#F8FBFF] hover:border-blue-400 p-4 space-y-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-rose-700 px-2 py-0.5 text-[10px] font-bold text-white">{np.code}</span>
                    <span className="text-[11px] font-bold text-blue-700">{np.badge}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{np.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{np.description}</p>
                  <p className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-1.5 text-[11px] font-semibold text-emerald-900">
                    Hiệu quả thực tiễn: {np.tdmImpact}
                  </p>
                </article>
              ))}
            </div>

            {/* 4 Spatial Showcase Zones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {HCM_SPATIAL_SHOWCASE_ZONES.map((z) => (
                <div key={z.zone} className="rounded-2xl border border-amber-200/80 bg-[#FFFDF9] p-3.5 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10.5px] font-bold text-rose-700 uppercase">{z.zone}</span>
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">{z.metric}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900">{z.title}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{z.detail}</p>
                </div>
              ))}
            </div>

            {/* Visual Exhibition Preview Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {HCM_PHOTO_GALLERY.slice(0, 4).map((ph) => (
                <button
                  key={ph.id}
                  type="button"
                  onClick={() => setActiveTab('MEDIA')}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left cursor-pointer"
                >
                  <div className="h-24 overflow-hidden bg-[#FBF5EA]">
                    <img
                      src={ph.imageUrl}
                      alt={ph.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="p-2 text-[11px] font-bold text-slate-800 line-clamp-2">{ph.title}</p>
                </button>
              ))}
            </div>
          </section>

          {/* 4 Main Section Directory Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 scroll-reveal">
            {[
              {
                num: '1',
                title: 'Cuộc đời & Sự nghiệp (6 Chương)',
                desc: 'Tóm tắt luận điểm và diễn giải toàn văn hành trình từ 1890 đến Di chúc 1969.',
                icon: History,
                tab: 'BIO' as SpaceTab,
                accent: 'text-rose-700 bg-rose-50',
              },
              {
                num: '2',
                title: 'Tủ sách 15 Tập & Tác phẩm',
                desc: '15 tập Hồ Chí Minh Toàn tập cùng 15 tác phẩm kinh điển có sao chép trích dẫn.',
                icon: BookMarked,
                tab: 'BOOKS' as SpaceTab,
                accent: 'text-blue-700 bg-blue-50',
              },
              {
                num: '3',
                title: 'Kho Âm thanh & Video Di sản',
                desc: '4 bản ghi lịch sử kèm toàn văn + đọc số hóa & 11 thước phim tài liệu chọn lọc.',
                icon: Film,
                tab: 'MEDIA' as SpaceTab,
                accent: 'text-amber-700 bg-amber-50',
              },
              {
                num: '4',
                title: 'Thủ Dầu Một Học & Làm theo Bác',
                desc: 'Quản lý mô hình chi bộ/khu phố phường Thủ Dầu Một, Checklist 5 tiêu chí & Poster QR.',
                icon: Award,
                tab: 'MODELS' as SpaceTab,
                accent: 'text-emerald-700 bg-emerald-50',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.num}
                  type="button"
                  onClick={() => setActiveTab(card.tab)}
                  className="rounded-2xl border border-slate-200 bg-white hover:border-blue-400 p-4 text-left shadow-2xs space-y-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-grid h-9 w-9 place-items-center rounded-xl ${card.accent}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-black text-slate-400">PHÂN KHU 0{card.num}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">{card.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </button>
              );
            })}
          </section>

          {/* CỔNG LIÊN KẾT 08 CHUYÊN TRANG TƯ LIỆU CHÍNH THỐNG VỀ CHỦ TỊCH HỒ CHÍ MINH */}
          <section className="rounded-3xl border border-[#E5D3B2] bg-white p-6 shadow-xs space-y-5 scroll-reveal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#751D2C] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#C59A55]" />
                  <span>Dữ Liệu Được Ban Tuyên Giáo &amp; Các Cơ Quan Trung Ương Thẩm Định</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#751D2C]">
                  Hệ Thống Chuyên Trang Tư Liệu Chính Thống Về Bác Hồ
                </h3>
                <p className="text-xs text-[#67615B]">
                  Kết nối trực tiếp đến 08 cổng thông tin di sản, bảo tàng và nhà xuất bản quốc gia phục vụ học tập, tra cứu và nghiên cứu.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsGoldenBookOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C59A55] to-[#b08745] text-white font-bold text-xs shadow-xs hover:brightness-105 transition-all cursor-pointer"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>Sổ vàng truyền thống</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRedMapOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#751D2C] hover:bg-[#5B1522] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Bản đồ địa chỉ đỏ</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFICIAL_ATTRIBUTION_SOURCES.map((src) => (
                <a
                  key={src.label}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-[#E5D3B2] bg-[#FAF7F0]/60 hover:bg-white hover:border-[#751D2C] hover:shadow-md transition-all flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#751D2C]/10 text-[#751D2C] font-bold text-[10.5px]">
                      {src.badge}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#262321] group-hover:text-[#751D2C] transition-colors leading-snug">
                      {src.label}
                    </h4>
                    <p className="text-[11.5px] text-[#751D2C] font-semibold">
                      {src.agency}
                    </p>
                    <p className="text-xs text-[#67615B] leading-relaxed line-clamp-3">
                      {src.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E5D3B2]/40 flex items-center justify-between text-xs text-[#751D2C] font-bold">
                    <span>Truy cập chuyên trang</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'NEWS' && (
        <HcmNewsEventsView
          customNews={customNews}
          canEdit={canEdit}
          onAddNews={() =>
            openCreateForm('NEWS', {
              subtitle: new Date().toLocaleDateString('vi-VN'),
              location: 'Hoạt động Thủ Dầu Một',
            })
          }
          onEditEntry={openEditForm}
          onDeleteEntry={handleDeleteEntry}
          onImportToWard={(prefill) => openCreateForm('NEWS', prefill)}
          onJumpToTab={(t) => setActiveTab(t)}
        />
      )}
      {activeTab === 'EXHIBIT' && <HcmExhibitGalleryView onOpenMedia={() => setActiveTab('MEDIA')} />}
      {activeTab === 'BIO' && <HcmBiographyChaptersView />}
      {activeTab === 'TIMELINE' && (
        <HcmTimeline30View
          customMilestones={customMilestones}
          canEdit={canEdit}
          onAddMilestone={() => openCreateForm('MILESTONE')}
          onEditEntry={openEditForm}
          onDeleteEntry={handleDeleteEntry}
        />
      )}
      {activeTab === 'BOOKS' && (
        <HcmBookshelfView
          customWorks={customWorks}
          canEdit={canEdit}
          onAddWork={() => openCreateForm('WORK')}
          onEditEntry={openEditForm}
          onDeleteEntry={handleDeleteEntry}
        />
      )}
      {activeTab === 'QUOTES' && (
        <HcmIdeologyAndQuizView
          customQuotes={customQuotes}
          canEdit={canEdit}
          onAddQuote={() => openCreateForm('QUOTE')}
          onEditEntry={openEditForm}
          onDeleteEntry={handleDeleteEntry}
        />
      )}
      {activeTab === 'FOOTPRINTS' && (
        <HcmFootprintsMapView onOpenVietnamModal={() => setIsRedMapOpen(true)} />
      )}
      {activeTab === 'MEDIA' && <HcmMediaLibraryView />}
      {activeTab === 'MODELS' && (
        <HcmEvaluationAndModelsView
          mode="MODELS"
          models={wardModels}
          checklist={checklist}
          canEdit={canEdit}
          onSaveChecklist={handleSaveChecklist}
          onAddModel={() => openCreateForm('MODEL')}
          onEditEntry={openEditForm}
          onDeleteEntry={handleDeleteEntry}
        />
      )}
      {activeTab === 'EVALUATION' && (
        <HcmEvaluationAndModelsView
          mode="EVALUATION"
          models={wardModels}
          checklist={checklist}
          canEdit={canEdit}
          onSaveChecklist={handleSaveChecklist}
          onAddModel={() => openCreateForm('MODEL')}
          onEditEntry={openEditForm}
          onDeleteEntry={handleDeleteEntry}
        />
      )}

      {activeTab === 'AI_STUDIO' && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SkillActionWidget
            skillId="political-communication-planner"
            title="Skill #20 · Tham mưu Kế hoạch Không gian Văn hóa HCM (Thủ Dầu Một)"
            actionLabel="Dự thảo kế hoạch tuyên truyền"
            sourceModule="Không gian Văn hóa HCM — Thủ Dầu Một"
            dataClassification="INTERNAL"
            placeholder="Nhập chuyên đề / kế hoạch tại phường Thủ Dầu Một..."
            getParameters={() => ({
              unitName: 'Ban Xây dựng Đảng – Đảng ủy phường Thủ Dầu Một',
              eventTitle: 'Xây dựng và lan tỏa Không gian Văn hóa Hồ Chí Minh tại phường Thủ Dầu Một',
            })}
            onResult={(run) => {
              if (run.output.draftText) {
                openCreateForm('MODEL', {
                  title: `Dự thảo: ${run.inputSummary.slice(0, 70)}`,
                  summary: run.output.draftText.slice(0, 2000),
                });
              }
            }}
          />
          <SkillActionWidget
            skillId="grassroots-model-tracker"
            title="Skill #32 · Chuẩn hóa Bài viết Mô hình Học tập & Làm theo Bác"
            actionLabel="Chuẩn hóa bài viết mô hình"
            sourceModule="Không gian Văn hóa HCM — Thủ Dầu Một"
            dataClassification="INTERNAL"
            placeholder="Nhập thông tin mô hình tiêu biểu tại khu phố/chi bộ phường Thủ Dầu Một..."
            getParameters={() => ({
              unitName: 'Đảng ủy phường Thủ Dầu Một',
            })}
            onResult={(run) => {
              if (run.output.draftText) {
                openCreateForm('MODEL', {
                  title: `Mô hình Thủ Dầu Một: ${run.inputSummary.slice(0, 60)}`,
                  summary: run.output.draftText.slice(0, 2000),
                });
              }
            }}
          />
        </section>
      )}

      {activeTab === 'EXPLORER' && (
        <HcmDossierExplorerView
          overview={v2Overview}
          onOpenAdminCms={canEdit ? () => setActiveTab('CMS') : undefined}
        />
      )}

      {activeTab === 'TDM_HOUSE' && (
        <HcmThuDauMotHeritageHouseView onBackToFoyer={() => setActiveTab('FOYER')} />
      )}

      {activeTab === 'TDM_CHRONOLOGY' && (
        <HcmThuDauMotChronologyView onBackToFoyer={() => setActiveTab('FOYER')} />
      )}

      {activeTab === 'EXEMPLARY_PEOPLE' && (
        <HcmExemplaryPeopleView onBackToFoyer={() => setActiveTab('FOYER')} />
      )}

      {activeTab === 'PARTY_HISTORY' && (
        <HcmPartyHistoryFullView onBackToFoyer={() => setActiveTab('FOYER')} />
      )}

      {activeTab === 'CMS' && canEdit && (
        <HcmAdminCmsView overview={v2Overview} onRefreshOverview={refreshV2Overview} />
      )}

      {/* Lucian UX/UI Prompt #478 QR Code Share with Laser Beam & Animated Copy Button */}
      <LucianQrShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Không Gian Văn Hóa Hồ Chí Minh"
        subtitle="Quét mã QR bằng Camera điện thoại để truy cập ngay"
      />

      {/* Modal Tùy chỉnh Header Chuyên mục */}
      {editingSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4" onClick={() => setEditingSettings(false)}>
          <form
            onSubmit={handleSaveSettings}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-blue-200 bg-white p-6 shadow-2xl space-y-4 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Tùy chỉnh Không gian Văn hóa HCM — Thủ Dầu Một</h3>
              <button type="button" onClick={() => setEditingSettings(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tiêu đề chính chuyên mục</label>
              <input
                type="text"
                required
                value={settingsDraft.title}
                onChange={(e) => setSettingsDraft((p) => ({ ...p, title: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nhãn chuyên đề</label>
              <input
                type="text"
                value={settingsDraft.badgeText}
                onChange={(e) => setSettingsDraft((p) => ({ ...p, badgeText: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Đơn vị quản trị hiển thị</label>
              <input
                type="text"
                value={settingsDraft.unitText}
                onChange={(e) => setSettingsDraft((p) => ({ ...p, unitText: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Giới thiệu chuyên mục</label>
              <textarea
                rows={3}
                value={settingsDraft.description}
                onChange={(e) => setSettingsDraft((p) => ({ ...p, description: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditingSettings(false)} className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 cursor-pointer">
                Hủy
              </button>
              <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 font-bold text-white cursor-pointer disabled:opacity-50">
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Thêm / Chỉnh sửa Mục */}
      {entryForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4" onClick={() => setEntryForm(null)}>
          <form
            onSubmit={handleSaveEntry}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-blue-200 bg-white p-6 shadow-2xl space-y-3.5 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                {entryForm.editingId ? 'Chỉnh sửa: ' : 'Thêm mới: '}
                {SECTION_LABELS[entryForm.section].heading}
              </h3>
              <button type="button" onClick={() => setEntryForm(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{SECTION_LABELS[entryForm.section].titleLabel}</label>
              <input
                type="text"
                required
                value={entryForm.title}
                onChange={(e) => setEntryForm((p) => (p ? { ...p, title: e.target.value } : p))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{SECTION_LABELS[entryForm.section].subtitleLabel}</label>
                <input
                  type="text"
                  value={entryForm.subtitle}
                  onChange={(e) => setEntryForm((p) => (p ? { ...p, subtitle: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">{SECTION_LABELS[entryForm.section].locationLabel}</label>
                <input
                  type="text"
                  value={entryForm.location}
                  onChange={(e) => setEntryForm((p) => (p ? { ...p, location: e.target.value } : p))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>
            </div>

            {entryForm.section !== 'QUOTE' && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nội dung chi tiết / Mô tả</label>
                  <textarea
                    rows={4}
                    value={entryForm.summary}
                    onChange={(e) => setEntryForm((p) => (p ? { ...p, summary: e.target.value } : p))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trích dẫn / Thông điệp nổi bật</label>
                  <input
                    type="text"
                    value={entryForm.quote}
                    onChange={(e) => setEntryForm((p) => (p ? { ...p, quote: e.target.value } : p))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
              </>
            )}

            {(entryForm.section === 'MODEL' || entryForm.section === 'MILESTONE' || entryForm.section === 'NEWS') && (
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Hình ảnh minh họa (tùy chọn)</label>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-[#F5F9FF] hover:bg-blue-50 px-3 py-1.5 font-bold text-blue-700 cursor-pointer">
                    <ImagePlus className="h-3.5 w-3.5" />
                    <span>Chọn ảnh từ máy</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(f);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDriveStorageOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 font-bold text-amber-900 cursor-pointer"
                  >
                    <span>📁 Lấy từ Google Drive</span>
                  </button>
                  {entryForm.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setEntryForm((p) => (p ? { ...p, imageUrl: '' } : p))}
                      className="text-rose-700 font-bold hover:underline cursor-pointer"
                    >
                      Xóa ảnh
                    </button>
                  )}
                </div>

                <div className="space-y-1 pt-1">
                  <input
                    type="text"
                    value={entryForm.imageUrl}
                    onChange={(e) => {
                      const direct = convertDriveToDirectImageUrl(e.target.value);
                      setEntryForm((p) => p ? { ...p, imageUrl: direct } : p);
                    }}
                    placeholder="Hoặc dán URL ảnh / link chia sẻ từ Google Drive..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono"
                  />
                </div>
                {entryForm.imageUrl && (
                  <img src={entryForm.imageUrl} alt="Xem trước" className="max-h-36 rounded-xl border border-slate-200 object-cover" />
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEntryForm(null)} className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 cursor-pointer">
                Hủy
              </button>
              <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 font-bold text-white cursor-pointer disabled:opacity-50">
                {saving ? 'Đang lưu...' : entryForm.editingId ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>
      )}
      </main>

      {/* Institutional Footer */}
      <InstitutionalFooter
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenShare={() => setShareOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Audio Heritage Recital Player */}
      <AudioHeritagePlayer
        isOpen={audioOpen}
        onClose={() => setAudioOpen(false)}
        onPlayingChange={(playing) => setIsAudioPlaying(playing)}
        onOpenVoiceStudio={() => setIsVoiceStudioOpen(true)}
      />

      {/* Lucian UX/UI Prompt #046 Command Palette & Quick Search */}
      <LucianCommandPalette
        isFloatingModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVietnamMap={() => setIsRedMapOpen(true)}
        onOpenQrShare={() => setShareOpen(true)}
        onOpenAuth={() => setCitizenAuthOpen(true)}
      />

      {/* Social Heritage Quote Card Generator Modal */}
      <HcmQuoteCardGeneratorModal
        isOpen={isQuoteCardOpen}
        onClose={() => setIsQuoteCardOpen(false)}
        initialQuoteText={quoteCardText}
        initialQuoteSource={quoteCardSource}
      />

      {/* 15 Volumes Ho Chi Minh Toan Tap & Google Drive Explorer Modal */}
      <HcmToanTapExplorerModal
        isOpen={isToanTapOpen}
        onClose={() => setIsToanTapOpen(false)}
        onOpenCardGenerator={handleOpenQuoteCard}
      />

      {/* Chi Bo Workspace & Quy Dinh 144 Toolkit Modal */}
      <HcmChiBoWorkspaceModal
        isOpen={isChiBoWorkspaceOpen}
        onClose={() => setIsChiBoWorkspaceOpen(false)}
        onOpenCardGenerator={handleOpenQuoteCard}
        onOpenBulletinModal={() => setIsChiBoBulletinOpen(true)}
      />

      {/* Chi Bo Monthly Printable Bulletin Modal */}
      <ChiBoBulletinPrintModal
        isOpen={isChiBoBulletinOpen}
        onClose={() => setIsChiBoBulletinOpen(false)}
      />

      {/* CIT Voice Studio AI Narration Modal */}
      <HcmVoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
      />

      {/* Cổng đăng nhập Quản trị viên */}
      <HcmAdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(u) => showNotice(`Đồng chí ${u.name} (${u.unit}) đã đăng nhập hệ thống quản trị thành công.`)}
      />

      {/* Quản trị bài viết & nội dung (Thêm, Sửa, Xóa CRUD) */}
      <HcmArticleManagerModal
        isOpen={isArticleManagerOpen}
        onClose={() => setIsArticleManagerOpen(false)}
        items={items}
        onSaveEntry={handleArticleSave}
        onDeleteEntry={handleDeleteEntry}
      />

      {/* Sổ vàng truyền thống số & Lời hứa danh dự */}
      <HcmDigitalGoldenBookModal
        isOpen={isGoldenBookOpen}
        onClose={() => setIsGoldenBookOpen(false)}
      />

      {/* Hệ thống Bản Đồ Số Sinh Động: Bản đồ Thế Giới (Hành trình 30 năm), Bản đồ Việt Nam (Hoàng Sa - Trường Sa) & Bản đồ Phường Thủ Dầu Một (5 Khu phố) */}
      <HcmDynamicHeritageMapModal
        isOpen={isRedMapOpen}
        onClose={() => setIsRedMapOpen(false)}
        initialMode="WORLD"
        onNavigateToTab={(tab) => {
          setIsRedMapOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Kho Lưu trữ Đám mây Google Drive của Toàn Bộ Không Gian */}
      <HcmGoogleDriveStorageModal
        isOpen={isDriveStorageOpen}
        onClose={() => setIsDriveStorageOpen(false)}
        onApplyImageUrl={(url) => {
          setEntryForm((prev) => (prev ? { ...prev, imageUrl: url } : prev));
        }}
        fullStateJson={{ settings, items, checklist }}
      />

      {/* 5 Modal Nâng Cấp Đột Phá 2026 */}
      {/* 1. Thử Thách 21 Ngày "Học Và Làm Theo Bác" (Quy định 144-QĐ/TW) */}
      <HcmTwentyOneDayChallengeModal
        isOpen={isTwentyOneDayOpen}
        onClose={() => setIsTwentyOneDayOpen(false)}
      />

      {/* 2. Sổ Tay Sinh Hoạt Chi Bộ Thông Minh 2026 (Chỉ thị 07-CT/TW) */}
      <HcmChiBoDigitalPocketModal
        isOpen={isChiBoPocketOpen}
        onClose={() => setIsChiBoPocketOpen(false)}
        onOpenBulletinModal={() => setIsChiBoBulletinOpen(true)}
      />

      {/* 3. Kính Lúp Soi Bản Thảo Bút Tích Bác Hồ */}
      <HcmHandwritingDeepZoomModal
        isOpen={isHandwritingZoomOpen}
        onClose={() => setIsHandwritingZoomOpen(false)}
      />

      {/* 4. Tuyến Du Lịch Đỏ Về Nguồn Thủ Dầu Một (5 trạm liên hoàn) */}
      <HcmRedTourNavigatorModal
        isOpen={isRedTourOpen}
        onClose={() => setIsRedTourOpen(false)}
        onOpenHeritageSite={(siteId) => {
          setIsRedTourOpen(false);
          setActiveTab('TDM_HOUSE');
        }}
      />

      {/* 5. Trung Tâm Thống Kê Học Tập Di Sản (Báo cáo Đảng ủy & Cấp ủy) */}
      <HcmHeritageAnalyticsModal
        isOpen={isHeritageAnalyticsOpen}
        onClose={() => setIsHeritageAnalyticsOpen(false)}
      />

      {/* Lucian UX/UI Prompt #403 & #401 Cổng Đăng Nhập Email & Google */}
      <LucianSignInModal
        isOpen={citizenAuthOpen}
        onClose={() => setCitizenAuthOpen(false)}
        onAuthSuccess={(u) => {
          setNotice(`Chào mừng ${u.name} tham gia Không gian Văn hóa Hồ Chí Minh! Hệ thống tự động ghi nhớ lộ trình học tập.`);
          setTimeout(() => setNotice(null), 5000);
        }}
      />

      {/* Modal Hướng Dẫn Lộ Trình Cuộc Đời & Dấu Chân Bác */}
      <HcmGuidedJourneyModal
        isOpen={guidedJourneyOpen}
        onClose={() => setGuidedJourneyOpen(false)}
        onNavigateToTab={(tab) => {
          setGuidedJourneyOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
