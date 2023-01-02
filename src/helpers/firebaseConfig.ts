import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDm0Vbbg9DWEruZv6AYrvkSx84bm7HNk8g",
    authDomain: "sda-news-6a860.firebaseapp.com",
    projectId: "sda-news-6a860",
    storageBucket: "sda-news-6a860.appspot.com",
    messagingSenderId: "247322975106",
    appId: "1:247322975106:web:8b7d185c257428c3f30d9b",
    measurementId: "G-EJEMWHQQK1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);