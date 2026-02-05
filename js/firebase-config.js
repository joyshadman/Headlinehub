// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNh_IwUTgcOFplUZaS6iF7eZ639YKuJxY",
  authDomain: "news-add-fe372.firebaseapp.com",
  databaseURL: "https://news-add-fe372-default-rtdb.firebaseio.com",
  projectId: "news-add-fe372",
  storageBucket: "news-add-fe372.firebasestorage.app",
  messagingSenderId: "70995329790",
  appId: "1:70995329790:web:82f961a42c231470359baf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the database and necessary functions
export { database, ref, push, onValue };