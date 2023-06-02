import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));
export const auth = getAuth(app);
export const db = getFirestore(app);
export const fileStorage = getStorage(app);