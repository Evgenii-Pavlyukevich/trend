import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqGBSNp-ZUvFpINf_tkgINnJ4o4cxlDr8",
  authDomain: "trend-dfc98.firebaseapp.com",
  projectId: "trend-dfc98",
  storageBucket: "trend-dfc98.firebasestorage.app",
  messagingSenderId: "170249865041",
  appId: "1:170249865041:web:93c14309bd7c54edb43570",
  measurementId: "G-M5CFBD7L1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const performance = getPerformance(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper function for logging events
export const logAnalyticsEvent = (eventName: string, params?: Record<string, any>) => {
  logEvent(analytics, eventName, params);
}; 