import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDx3t9viF8Ul_QWZYEJV7O0LZEruYi7_r8",
  authDomain: "campusevent-25bb6.firebaseapp.com",
  projectId: "campusevent-25bb6",
  storageBucket: "campusevent-25bb6.firebasestorage.app",
  messagingSenderId: "102080588330",
  appId: "1:102080588330:web:bad3ef450dce54d41f3153",
  measurementId: "G-TN6M3CRFCY"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
});
