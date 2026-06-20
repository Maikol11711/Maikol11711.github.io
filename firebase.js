import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBl1e8fZcd4dcndCySAvGSNnexmTeYd_98",
  authDomain: "designportfolio-942c5.firebaseapp.com",
  projectId: "designportfolio-942c5",
  storageBucket: "designportfolio-942c5.firebasestorage.app",
  messagingSenderId: "134604243906",
  appId: "1:134604243906:web:78f0a3ad76767956168c5b",
  measurementId: "G-4MRYBF5YG6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
