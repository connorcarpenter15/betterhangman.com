import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth, createUser, db } from "$lib/firebase/firebase.client.js";
import { collection, getDocs } from "firebase/firestore";

export const authStore = writable({
  isLoading: true,
  currentUser: null,
});

export const authHandlers = {
  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  signup: async (email, password, username) => {
    await createUser({
      email: email,
      password: password,
      username: username,
    });

    await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    await signOut(auth);
  },

  resetPassword: async (email) => {
    if (!email) {
      return;
    }
    await sendPasswordResetEmail(auth, email);
  },

  updateEmail: async (email) => {
    authStore.update((curr) => {
      return {
        ...curr,
        currentUser: {
          ...curr.currentUser,
          email: email,
        },
      };
    });
    await updateEmail(auth.currentUser, email);
  },

  updatePassword: async (password) => {
    await updatePassword(auth.currentUser, password);
  },

  checkUsernameAvailability: async (username) => {
    const querySnapshot = await getDocs(collection(db, "users"));

    console.log("testing");

    querySnapshot.forEach((doc) => {
      console.log(doc);
    });
  },
};
