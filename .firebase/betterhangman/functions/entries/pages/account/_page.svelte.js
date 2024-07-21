import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header } from "../../../chunks/Header.js";
import "firebase/auth";
import "../../../chunks/firebase.client.js";
import "firebase/firestore";
const Account = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Account, "Account").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
