import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // Ensure this import is correct
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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

// Initialize Firestore
const db = getFirestore(app);  // Initialize Firestore

// Initialize Authentication and Storage
const auth = getAuth(app);
const storage = getStorage(app);

// Export Firestore, Authentication, and Storage for use in other files
export { db, auth, storage };
