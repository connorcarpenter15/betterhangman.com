import { c as create_ssr_component, v as validate_component, b as add_attribute } from "../../chunks/ssr.js";
import { H as Header } from "../../chunks/Header.js";
import { h as hangmanImagesNeutral } from "../../chunks/hangmanImagesNeutral.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <div class="flex flex-row items-center justify-center h-screen"><div data-svelte-h="svelte-3xljpp"><img${add_attribute("src", hangmanImagesNeutral.face, 0)} alt="Hangman Neutral Face"></div> <div><button class="rounded-2xl bg-black text-white px-5 py-3 font-bold hover:bg-gray-700 m-10 w-48" data-svelte-h="svelte-lhbok2">Play Hangman</button></div></div>`;
});
export {
  Page as default
};
