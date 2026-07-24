import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 帶入你的專屬 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC_nlf0Wa2YDhbQAh_Sg2uhlv5UDyWsmvc",
  authDomain: "roadtrip-ai-f5147.firebaseapp.com",
  projectId: "roadtrip-ai-f5147",
  storageBucket: "roadtrip-ai-f5147.firebasestorage.app",
  messagingSenderId: "2359126507",
  appId: "1:2359126507:web:7fba2d8660f377bb49d1ae",
  measurementId: "G-5Z1TEDD2SB"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
