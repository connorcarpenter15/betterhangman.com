import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { a as authStore } from "../../../chunks/authStore.js";
const textLogoBlack = "/_app/immutable/assets/txt_logo_black.Dss1TEmA.png";
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authStore;
  $$unsubscribe_authStore = subscribe(authStore, (value) => value);
  let email = "";
  let password = "";
  $$unsubscribe_authStore();
  return `<div class="align-center m-auto flex h-screen flex-1 flex-col"><div class="m-auto mb-0 flex w-48 cursor-pointer" role="button" tabindex="0" data-svelte-h="svelte-1fd7iwe"><img${add_attribute("src", textLogoBlack, 0)} alt="txt-logo-black"></div> <form class="flex flex-col"><label class="m-auto mb-1 mt-8 w-72 rounded border border-black py-1 px-2"><input type="email" placeholder="Email"${add_attribute("value", email, 0)}></label> ${``} <label class="align-center m-auto my-1 flex w-72 flex-1 justify-between rounded border border-black py-1 px-2"><input${add_attribute("value", password, 0)}${add_attribute("type", "password", 0)} placeholder="Password"> <button type="button">${escape("Show")}</button></label> ${``} ${``} <button class="m-auto mt-8 rounded-xl bg-black p-8 pb-2 pt-2 font-bold text-white hover:bg-gray-700">${escape("Log In")}</button></form> ${`<div role="button" tabindex="0" class="m-auto mb-1 mt-6" data-svelte-h="svelte-1w66e2l">Don&#39;t have an account?
      <p class="inline-block text-blue-400">Sign Up</p></div> <div role="button" tabindex="0" class="m-auto mt-1 text-blue-400" data-svelte-h="svelte-ya1pwq">Forgot Password?</div>`}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Auth, "Auth").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
