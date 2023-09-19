import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjOFLI2UQ7uB4AVtEcnHchNwK-SskH8tQ",
  authDomain: "fir-40c48.firebaseapp.com",
  projectId: "fir-40c48",
  storageBucket: "fir-40c48.appspot.com",
  messagingSenderId: "965781172988",
  appId: "1:965781172988:web:0a615bed1fbc07e1a41d79",
  measurementId: "G-V15VTJTGNF"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, storage, provider, db };