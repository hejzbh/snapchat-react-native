import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA9pSp75kl-FmPFdgR7C_hPxVLNHdWFQpU",
  authDomain: "snapchat-2cdee.firebaseapp.com",
  projectId: "snapchat-2cdee",
  storageBucket: "snapchat-2cdee.appspot.com",
  messagingSenderId: "1026778870091",
  appId: "1:1026778870091:web:0568ab3efaa429859278ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
