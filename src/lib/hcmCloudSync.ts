import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { HcmSpaceSettingsDto, HcmCulturalEntryDto, HcmChecklistMap } from '../hcmSpaceClient';
import {
  DEFAULT_LOCAL_SETTINGS,
  DEFAULT_LOCAL_ITEMS,
} from '../hcmSpaceClient';

export const HCM_CLOUD_COLLECTIONS = {
  SETTINGS: 'hcm_space_settings',
  ENTRIES: 'hcm_cultural_entries',
  CHECKLIST: 'hcm_checklists',
} as const;

export interface CloudSyncState {
  isInitialized: boolean;
  isConnected: boolean;
  lastSyncedAt: Date | null;
  error: string | null;
}

interface HcmCloudSyncListeners {
  onSettingsUpdate?: (settings: HcmSpaceSettingsDto) => void;
  onEntriesUpdate?: (entries: HcmCulturalEntryDto[]) => void;
  onChecklistUpdate?: (checklist: HcmChecklistMap) => void;
  onStatusChange?: (state: CloudSyncState) => void;
}

class HcmCloudSyncService {
  private state: CloudSyncState = {
    isInitialized: false,
    isConnected: false,
    lastSyncedAt: null,
    error: null,
  };

  private unsubscribers: Array<() => void> = [];
  private listeners: HcmCloudSyncListeners = {};

  public getStatus(): CloudSyncState {
    return { ...this.state };
  }

  /**
   * Khởi động đồng bộ Firestore thời gian thực
   */
  public async initSync(callbacks?: HcmCloudSyncListeners) {
    if (callbacks) {
      this.listeners = { ...this.listeners, ...callbacks };
    }

    if (this.state.isInitialized) {
      return this.state;
    }
    this.state.isInitialized = true;

    try {
      this.setupRealtimeListeners();
      this.state.isConnected = true;
      this.state.error = null;
      this.notifyStatus();

      // Kiểm tra và gieo mầm dữ liệu nếu Firestore chưa có
      this.seedDefaultDataIfNeeded().catch((err) => {
        console.warn('[HcmCloudSync] Seeding warning:', err);
      });
    } catch (err: any) {
      this.state.isConnected = false;
      this.state.error = err.message || 'Không thể kết nối Firestore';
      this.notifyStatus();
    }

    return this.state;
  }

  /**
   * Thiết lập listener thời gian thực cho Settings, Entries và Checklist
   */
  private setupRealtimeListeners() {
    try {
      // 1. Lắng nghe settings
      const settingsDocRef = doc(db, HCM_CLOUD_COLLECTIONS.SETTINGS, 'primary_config');
      const unsubSettings = onSnapshot(
        settingsDocRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as HcmSpaceSettingsDto;
            this.state.lastSyncedAt = new Date();
            this.state.isConnected = true;
            this.notifyStatus();
            this.listeners.onSettingsUpdate?.(data);
          }
        },
        (error) => {
          console.warn('[HcmCloudSync] Settings listener error:', error);
          this.state.error = error.message;
          this.notifyStatus();
        }
      );
      this.unsubscribers.push(unsubSettings);

      // 2. Lắng nghe entries
      const entriesColRef = collection(db, HCM_CLOUD_COLLECTIONS.ENTRIES);
      const unsubEntries = onSnapshot(
        entriesColRef,
        (snap) => {
          const items: HcmCulturalEntryDto[] = [];
          snap.forEach((docSnap) => {
            items.push(docSnap.data() as HcmCulturalEntryDto);
          });
          if (items.length > 0) {
            this.state.lastSyncedAt = new Date();
            this.state.isConnected = true;
            this.notifyStatus();
            this.listeners.onEntriesUpdate?.(items);
          }
        },
        (error) => {
          console.warn('[HcmCloudSync] Entries listener error:', error);
          this.state.error = error.message;
          this.notifyStatus();
        }
      );
      this.unsubscribers.push(unsubEntries);

      // 3. Lắng nghe checklist
      const checklistDocRef = doc(db, HCM_CLOUD_COLLECTIONS.CHECKLIST, 'ward_checklist');
      const unsubChecklist = onSnapshot(
        checklistDocRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data() as HcmChecklistMap;
            this.state.lastSyncedAt = new Date();
            this.notifyStatus();
            this.listeners.onChecklistUpdate?.(data);
          }
        },
        (error) => {
          console.warn('[HcmCloudSync] Checklist listener error:', error);
        }
      );
      this.unsubscribers.push(unsubChecklist);
    } catch (err: any) {
      console.warn('[HcmCloudSync] Setup listeners error:', err);
    }
  }

  /**
   * Tự động khởi tạo dữ liệu chuẩn lên Cloud Firestore nếu chưa có
   */
  public async seedDefaultDataIfNeeded() {
    const settingsDocRef = doc(db, HCM_CLOUD_COLLECTIONS.SETTINGS, 'primary_config');
    const snap = await getDoc(settingsDocRef);

    if (!snap.exists()) {
      console.log('[HcmCloudSync] Firestore còn trống, tiến hành gieo mầm dữ liệu chuẩn...');
      await this.forcePushAllLocalToCloud(DEFAULT_LOCAL_SETTINGS, DEFAULT_LOCAL_ITEMS, {});
    }
  }

  /**
   * Đẩy toàn bộ dữ liệu cục bộ lên Cloud Firestore
   */
  public async forcePushAllLocalToCloud(
    settings?: HcmSpaceSettingsDto,
    items?: HcmCulturalEntryDto[],
    checklist?: HcmChecklistMap
  ): Promise<{ success: boolean; message: string }> {
    try {
      const batch = writeBatch(db);

      // 1. Lưu Cấu hình
      if (settings) {
        const settingsRef = doc(db, HCM_CLOUD_COLLECTIONS.SETTINGS, 'primary_config');
        batch.set(settingsRef, {
          ...settings,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }

      // 2. Lưu Entries
      if (items && items.length > 0) {
        for (const item of items) {
          const itemRef = doc(db, HCM_CLOUD_COLLECTIONS.ENTRIES, item.id);
          batch.set(itemRef, {
            ...item,
            updatedAt: serverTimestamp(),
          }, { merge: true });
        }
      }

      // 3. Lưu Checklist
      if (checklist) {
        const checklistRef = doc(db, HCM_CLOUD_COLLECTIONS.CHECKLIST, 'ward_checklist');
        batch.set(checklistRef, {
          ...checklist,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }

      await batch.commit();

      this.state.isConnected = true;
      this.state.lastSyncedAt = new Date();
      this.state.error = null;
      this.notifyStatus();

      return {
        success: true,
        message: 'Đã kết nối và đồng bộ toàn bộ dữ liệu Không Gian Văn Hóa lên Cloud Firestore (trolythammuu-d2965) thành công!',
      };
    } catch (err: any) {
      console.error('[HcmCloudSync] Push error:', err);
      this.state.error = err.message || 'Lỗi đẩy dữ liệu lên Firestore';
      this.notifyStatus();
      throw err;
    }
  }

  private notifyStatus() {
    this.listeners.onStatusChange?.({ ...this.state });
  }

  public destroy() {
    this.unsubscribers.forEach((unsub) => unsub());
    this.unsubscribers = [];
    this.state.isInitialized = false;
  }
}

export const hcmCloudSync = new HcmCloudSyncService();
