import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8CHrI1EZT131-t6TjG0CDr92Ev75MnUE",
  authDomain: "airbnb-clone-2e23c.firebaseapp.com",
  projectId: "airbnb-clone-2e23c",
  storageBucket: "airbnb-clone-2e23c.firebasestorage.app",
  messagingSenderId: "53923767744",
  appId: "1:53923767744:web:16be883c16c10992e75425"
};

const app = initializeApp(firebaseConfig);

console.log("Firebase project ID:", app.options.projectId);
console.log("Firebase app ID:", app.options.appId);

export const auth = getAuth(app);
export const db = getFirestore(app, "default");