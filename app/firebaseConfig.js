import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCb-M81wg-GhDxq0JHwizTuU-1-x7a4VKU",
  authDomain: "dulcemap-e61a1.firebaseapp.com",
  projectId: "dulcemap-e61a1",
  storageBucket: "dulcemap-e61a1.firebasestorage.app",
  messagingSenderId: "216557392834",
  appId: "1:216557392834:web:7888579b45c293978f7c5b",
  measurementId: "G-WSVF1BK42G",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
