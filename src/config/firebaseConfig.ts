// config/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJdquG8UpWV7J_S2rZzpJbr9faraIYWhc',
  authDomain: 'trainingup-866ec.firebaseapp.com',
  projectId: 'trainingup-866ec',
  storageBucket: 'trainingup-866ec.firebasestorage.app',
  messagingSenderId: '86788944753',
  appId: '1:86788944753:web:53cd7287e1bd096f757cd0'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
