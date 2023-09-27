import { initializeApp } from 'firebase/app'; // @9.10.0 버전
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { Provider } from 'react-redux';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjOFLI2UQ7uB4AVtEcnHchNwK-SskH8tQ",
  authDomain: "fir-40c48.firebaseapp.com",
  projectId: "fir-40c48",
  storageBucket: "fir-40c48.appspot.com",
  messagingSenderId: "965781172988",
  appId: "1:965781172988:web:0a615bed1fbc07e1a41d79",
  measurementId: "G-V15VTJTGNF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db, storage };