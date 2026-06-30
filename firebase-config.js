// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzoWesPIidoDx5l1bSwjSSmhxjBYMk2EQ",
  authDomain: "ticket-35567.firebaseapp.com",
  projectId: "ticket-35567",
  storageBucket: "ticket-35567.firebasestorage.app",
  messagingSenderId: "827888794838",
  appId: "1:827888794838:web:d2f47cd8e242e04d741d77",
  measurementId: "G-FF1FE11P12"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
