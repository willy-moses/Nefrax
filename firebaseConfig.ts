// firebaseConfig.ts
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCcNB7R1bkYP9y4blnAfCMw_EUoBFtdR4Y",
  authDomain: "nefax-1d19e.firebaseapp.com",
  projectId: "nefax-1d19e",
  storageBucket: "nefax-1d19e.firebasestorage.app",
  messagingSenderId: "839243019281",
  appId: "1:839243019281:web:b123ffad57b73e2153edb0",
  measurementId: "G-JVWW37YGJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };
