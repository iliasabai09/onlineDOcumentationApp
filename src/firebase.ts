import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Конфиг из Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDPejrrUhfePCCrcF3TKCd2y8Tjg4T_RLI",
    authDomain: "onlinedocumentation-60d63.firebaseapp.com",
    databaseURL: "https://onlinedocumentation-60d63-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "onlinedocumentation-60d63",
    storageBucket: "onlinedocumentation-60d63.firebasestorage.app",
    messagingSenderId: "143390531168",
    appId: "1:143390531168:web:873770f193ed2367ba6d05"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
