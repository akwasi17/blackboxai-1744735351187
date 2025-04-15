import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtTQQJozk8Um8ArXiK6rJ-bUyVzJmuFJE",
  authDomain: "cbot4-75e59.firebaseapp.com",
  projectId: "cbot4-75e59",
  storageBucket: "cbot4-75e59.firebasestorage.app",
  messagingSenderId: "1082558906594",
  appId: "1:1082558906594:web:d30bd4ea55683f4c7cdebb",
  measurementId: "G-H9PZSZT5VH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
