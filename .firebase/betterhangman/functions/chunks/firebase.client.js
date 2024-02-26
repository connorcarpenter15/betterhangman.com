import { getApps, initializeApp, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAonMzUll2H5IZQ-HzoOiNO-NwcEr001Pw",
  authDomain: "betterhangman.firebaseapp.com",
  databaseURL: "https://betterhangman-default-rtdb.firebaseio.com",
  projectId: "betterhangman",
  storageBucket: "betterhangman.appspot.com",
  messagingSenderId: "999267313797",
  appId: "1:999267313797:web:9b6b2ecb73305848a561ec",
  measurementId: "G-J774GFZNCV"
};
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}
getAuth(firebaseApp);
