import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { hcmVisitorService, type VisitorStats } from './services/hcmVisitorService';
import { formatFirebaseUser, logoutUser } from './services/hcmAuthService';

export interface CurrentUser {
  id: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER' | 'CITIZEN';
  unit: string;
  phone?: string;
  email?: string;
  photoURL?: string;
  khuPho?: string;
  affiliation?: 'Đảng viên' | 'Đoàn viên' | 'Hội viên' | 'Nhân dân' | 'Thanh niên';
  registeredAt?: string;
  lastVisitedSection?: string;
  lastVisitedStageId?: string;
  lastVisitedTitle?: string;
  lastVisitedAt?: string;
  completedStages?: string[];
  studyTimeMinutes?: number;
  quizScores?: number[];
  memorizedQuotes?: string[];
  savedExhibits?: string[];
  completedTours?: string[];
  lastActiveAt?: string;
}

interface AppContextType {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  updateCitizenProgress: (section: string, stageId?: string, title?: string) => void;
  markStageCompleted: (stageId: string) => void;
  logout: () => void;
  visitorStats: VisitorStats;
}

const defaultUser: CurrentUser = {
  id: 'usr-viewer',
  name: 'Độc giả',
  role: 'VIEWER',
  unit: 'Cộng đồng',
  completedStages: [],
};

const defaultStats: VisitorStats = {
  onlineCount: 1,
  todayVisits: 8,
  thisMonthVisits: 8,
  totalVisits: 8,
};

const AppContext = createContext<AppContextType>({
  currentUser: defaultUser,
  setCurrentUser: () => {},
  updateCitizenProgress: () => {},
  markStageCompleted: () => {},
  logout: () => {},
  visitorStats: defaultStats,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    try {
      const saved = localStorage.getItem('hcm_logged_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role && parsed.role !== 'VIEWER') {
          return parsed;
        }
      }
    } catch {}
    return defaultUser;
  });

  // Tự động ghi nhớ chuyên mục và chặng người dân đang theo dõi
  const updateCitizenProgress = useCallback((section: string, stageId?: string, title?: string) => {
    setCurrentUser((prev) => {
      if (
        prev.lastVisitedSection === section &&
        (!stageId || prev.lastVisitedStageId === stageId) &&
        (!title || prev.lastVisitedTitle === title)
      ) {
        return prev;
      }

      const updated: CurrentUser = {
        ...prev,
        lastVisitedSection: section,
        lastVisitedStageId: stageId || prev.lastVisitedStageId,
        lastVisitedTitle: title || prev.lastVisitedTitle,
        lastVisitedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem('hcm_logged_user', JSON.stringify(updated));
        // Ghi thêm vào profile riêng của người dân
        if (updated.id && updated.id !== 'usr-viewer') {
          localStorage.setItem(`hcm_citizen_resume_${updated.id}`, JSON.stringify({
            lastVisitedSection: section,
            lastVisitedStageId: stageId || prev.lastVisitedStageId,
            lastVisitedTitle: title || prev.lastVisitedTitle,
            lastVisitedAt: updated.lastVisitedAt,
            completedStages: updated.completedStages || [],
          }));
        }
      } catch {}
      return updated;
    });
  }, []);

  // Đánh dấu người dân đã hoàn thành một chặng cuộc đời Bác
  const markStageCompleted = useCallback((stageId: string) => {
    setCurrentUser((prev) => {
      const currentCompleted = prev.completedStages || [];
      if (currentCompleted.includes(stageId)) return prev;
      const updatedStages = [...currentCompleted, stageId];
      const updated: CurrentUser = {
        ...prev,
        completedStages: updatedStages,
      };
      try {
        localStorage.setItem('hcm_logged_user', JSON.stringify(updated));
        if (updated.id && updated.id !== 'usr-viewer') {
          localStorage.setItem(`hcm_citizen_resume_${updated.id}`, JSON.stringify({
            lastVisitedSection: updated.lastVisitedSection,
            lastVisitedStageId: updated.lastVisitedStageId,
            lastVisitedTitle: updated.lastVisitedTitle,
            lastVisitedAt: updated.lastVisitedAt,
            completedStages: updatedStages,
          }));
        }
      } catch {}
      return updated;
    });
  }, []);

  const [visitorStats, setVisitorStats] = useState<VisitorStats>(() => hcmVisitorService.getStats());

  useEffect(() => {
    hcmVisitorService.initSession();
    const unsubscribeStats = hcmVisitorService.subscribe((stats) => {
      setVisitorStats(stats);
    });

    // Lắng nghe trạng thái đăng nhập Firebase Auth tự động
    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        // Chỉ cập nhật nếu người dùng chưa đăng nhập hoặc đang là tài khoản Google này
        setCurrentUser((prev) => {
          if (prev.role === 'ADMIN' || prev.role === 'EDITOR') {
            return prev; // Giữ nguyên quyền quản trị nếu đang đăng nhập quản trị
          }
          const formatted = formatFirebaseUser(fbUser);
          try {
            localStorage.setItem('hcm_logged_user', JSON.stringify(formatted));
          } catch {}
          return formatted;
        });
      }
    });

    return () => {
      unsubscribeStats();
      unsubscribeAuth();
    };
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setCurrentUser(defaultUser);
  }, []);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, updateCitizenProgress, markStageCompleted, logout, visitorStats }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
