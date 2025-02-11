// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "yum-book-4f900.firebaseapp.com",
  projectId: "yum-book-4f900",
  storageBucket: "yum-book-4f900.firebasestorage.app",
  messagingSenderId: "1016667658133",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-9TC0PNS698",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const usersRef = collection(db, "users");
