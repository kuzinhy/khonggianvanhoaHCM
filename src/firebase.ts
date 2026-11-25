import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

/**
 * Cấu hình dự án Firebase: trolythammuu-d2965
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCEAVAtRF6B4oFMWg9WF7aEcPbWR-pt0Iw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "trolythammuu-d2965.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "trolythammuu-d2965",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "trolythammuu-d2965.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "518727655205",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:518727655205:web:637e48a962b8cdcf9904cc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LEE6ZD1254"
};

// Khởi tạo Firebase App (tránh duplicate instance)
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Khởi tạo Firebase Authentication
export const auth: Auth = getAuth(app);

// Khởi tạo Cloud Firestore Database
export const db: Firestore = getFirestore(app);

// Khởi tạo Google Analytics (chỉ chạy trên môi trường browser có hỗ trợ)
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
