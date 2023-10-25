// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Khởi tạo và cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBt-JyCQR4k2GzCkO-x75VUBIQJhBmnlzI",
  authDomain: "queing-system-edff0.firebaseapp.com",
  projectId: "queing-system-edff0",
  storageBucket: "queing-system-edff0.appspot.com",
  messagingSenderId: "214841956141",
  appId: "1:214841956141:web:783ee78ef16f39600c25a4",
  measurementId: "G-H6KLRK6XZ2",
};

firebase.initializeApp(firebaseConfig);

// Export các đối tượng cần thiết từ Firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();
