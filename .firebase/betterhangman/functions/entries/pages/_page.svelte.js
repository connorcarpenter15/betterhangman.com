import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { H as Header } from "../../chunks/Header.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="flex flex-col items-center justify-center w-full h-screen"><button class="rounded-2xl bg-black text-white px-5 py-3 font-bold hover:bg-gray-700 m-10 w-48" data-svelte-h="svelte-3aahw2">Play Hangman</button></div>`;
});
export {
  Page as default
};
