import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase.client";

export const authStore = writable({
  isLoading: true,
  currentUser: null,
});

export const authHandlers = {
  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    authStore.update((state) => ({
      ...state,
      currentUser: auth.currentUser,
    }));
  },
  signup: async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    authStore.update((state) => ({
      ...state,
      currentUser: auth.currentUser,
    }));
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
};
