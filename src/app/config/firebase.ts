
import { initializeApp } from "firebase/app";
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revently-myreven.firebaseapp.com",
  projectId: "revently-myreven",
  storageBucket: "revently-myreven.appspot.com",
  messagingSenderId: "448262807039",
  appId: "1:448262807039:web:f05f48ff63eec04a925bca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);