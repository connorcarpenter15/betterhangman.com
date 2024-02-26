import "firebase/auth";
import { w as writable } from "./index.js";
import "./firebase.client.js";
const authStore = writable({
  isLoading: true,
  currentUser: null
});
export {
  authStore as a
};
