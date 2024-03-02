import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// for Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DATABASEURL,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

// initialize Firebase
let app;

// get auth
if (!getApps().length) {
  app = initializeApp(config);
} else {
  app = getApp();
  deleteApp(app);
  app = initializeApp(config);
}

export const auth = getAuth(app);

// get functions
const functions = getFunctions(app, "us-east1");

export const getRandomWord = httpsCallable(functions, "get_random_word");
export const getWordOfTheDay = httpsCallable(functions, "get_word_of_the_day");
export const createUser = httpsCallable(functions, "create_user");
