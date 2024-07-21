import { getApps, initializeApp, getApp, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
const config = {
  apiKey: "AIzaSyAonMzUll2H5IZQ-HzoOiNO-NwcEr001Pw",
  authDomain: "betterhangman.firebaseapp.com",
  databaseURL: "https://betterhangman-default-rtdb.firebaseio.com",
  projectId: "betterhangman",
  storageBucket: "betterhangman.appspot.com",
  messagingSenderId: "999267313797",
  appId: "1:999267313797:web:9b6b2ecb73305848a561ec",
  measurementId: "G-J774GFZNCV"
};
let app;
if (!getApps().length) {
  app = initializeApp(config);
} else {
  app = getApp();
  deleteApp(app);
  app = initializeApp(config);
}
getAuth(app);
const functions = getFunctions(app, "us-east1");
httpsCallable(functions, "get_random_word");
httpsCallable(functions, "get_word_of_the_day");
httpsCallable(functions, "create_user");
httpsCallable(
  functions,
  "check_username_availability"
);
httpsCallable(functions, "update_user_data");
