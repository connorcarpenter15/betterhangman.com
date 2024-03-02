import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape } from "./ssr.js";
import { p as page } from "./stores.js";
import { a as authStore } from "./authStore.js";
const textLogoWhite = "/_app/immutable/assets/txt_logo_white.DOHSYo1a.png";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authStore, $$unsubscribe_authStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authStore = subscribe(authStore, (value) => $authStore = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_authStore();
  $$unsubscribe_page();
  return `<header class="align-center flex flex-1 items-center justify-center bg-black absolute w-full"><div class="m-1 ml-10 w-20" role="button" tabindex="0" data-svelte-h="svelte-as9b8u"><img${add_attribute("src", textLogoWhite, 0)} alt="txt-logo-white"></div> ${$authStore.currentUser ? `<a class="ml-10 font-bold text-white hover:text-blue-100"${add_attribute("aria-current", $page.url.pathname === "/account" ? "page" : void 0, 0)} href="/account">${escape($authStore.currentUser?.displayName)}</a>` : ``} <nav class="ml-auto"><ul class="flex flex-1 items-center justify-center text-white"><li${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} class="mr-6 hover:text-blue-100"><a href="/" data-svelte-h="svelte-5a0zws">Home</a></li> <li${add_attribute("aria-current", $page.url.pathname === "/play" ? "page" : void 0, 0)} class="mr-6 hover:text-blue-100"><a href="/play" data-svelte-h="svelte-jt6u6f">Play</a></li> ${!$authStore.currentUser ? `<li${add_attribute("aria-current", $page.url.pathname === "/login" ? "page" : void 0, 0)} class="mr-6"><button class="w-28 rounded-xl bg-white px-5 py-2 font-bold text-black hover:bg-blue-100" data-svelte-h="svelte-e732u3">Log In</button></li>` : `<li class="mr-6"><button class="w-28 rounded-xl bg-white px-5 py-2 font-bold text-black hover:bg-blue-100" data-svelte-h="svelte-bmyz3z">Log Out</button></li>`}</ul></nav></header>`;
});
export {
  Header as H
};
