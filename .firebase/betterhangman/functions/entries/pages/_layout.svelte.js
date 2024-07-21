import { c as create_ssr_component } from "../../chunks/ssr.js";
/* empty css               */
import "../../chunks/firebase.client.js";
import "firebase/auth";
import "firebase/firestore";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
