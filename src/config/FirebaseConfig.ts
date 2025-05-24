// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDJdquG8UpWV7J_S2rZzpJbr9faraIYWhc",
  authDomain: "trainingup-866ec.firebaseapp.com",
  projectId: "trainingup-866ec",
  storageBucket: "trainingup-866ec.firebasestorage.app",
  messagingSenderId: "86788944753",
  appId: "1:86788944753:web:9bcca37db4562a7d757cd0"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
