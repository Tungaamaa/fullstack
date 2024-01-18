import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoWPswEIaW0jbJNOyhVPR_enfShwMXrwg",
  authDomain: "fullstack-c2a68.firebaseapp.com",
  projectId: "fullstack-c2a68",
  storageBucket: "fullstack-c2a68.appspot.com",
  messagingSenderId: "497140277871",
  appId: "1:497140277871:web:a3369c0a6267495778e39a",
  measurementId: "G-N1JZYSTM7S",
};


const app = initializeApp(firebaseConfig);
const storage = getStorage();

export { storage, app };
