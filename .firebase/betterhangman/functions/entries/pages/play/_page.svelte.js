import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header } from "../../../chunks/Header.js";
import { h as hangmanImagesNeutral } from "../../../chunks/hangmanImagesNeutral.js";
import { w as writable } from "../../../chunks/index.js";
import "../../../chunks/firebase.client.js";
import "firebase/firestore";
const gameStore = writable({
  currentGame: false,
  gameOver: false,
  isLoading: false,
  wordToGuess: [],
  wordDefinition: "",
  guessedWord: [],
  lettersGuessed: [],
  incorrectGuesses: 0,
  hangmanImage: hangmanImagesNeutral.scaffold,
  dailyWord: false
});
const Game = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $gameStore, $$unsubscribe_gameStore;
  $$unsubscribe_gameStore = subscribe(gameStore, (value) => $gameStore = value);
  let letterToGuess = null;
  $$unsubscribe_gameStore();
  return ` <div class="flex justify-center items-center h-screen"><div class="w-1/2 flex flex-col justify-center items-center flex-1"><img${add_attribute("src", $gameStore.hangmanImage, 0)} alt="Hangman Scaffold"></div>  <div class="w-1/2 flex flex-col">${!$gameStore.currentGame && !$gameStore.isLoading ? `<div class="flex flex-col justify-start"><button class="rounded-2xl bg-black px-6 py-3 w-36 font-bold text-white hover:bg-gray-700 m-4" data-svelte-h="svelte-w1ifm1">New Game</button></div> <div class="flex flex-col justify-start"><button class="rounded-2xl bg-black px-6 py-3 w-36 font-bold text-white hover:bg-gray-700 m-4" data-svelte-h="svelte-awrke1">Play Daily Word</button></div> ` : `${!$gameStore.isLoading ? `<h1 class="text-xl mb-4" data-svelte-h="svelte-64a7qe">Letters Guessed:</h1>  <div class="flex flex-wrap w-3/5 items-center min-h-32 mb-10">${each($gameStore.lettersGuessed, (letter) => {
    return `<div class="my-2 mr-4 w-8 h-8 rounded-lg shadow items-center justify-center flex border-black border mb-auto">${escape(letter)} </div>`;
  })}</div>  <div class="flex">${each($gameStore.guessedWord, (letter) => {
    return `<div class="w-7 flex justify-center text-xl">${escape(letter !== "" ? letter : " ")} </div>`;
  })}</div> <div class="flex mb-16">${each($gameStore.guessedWord.map((l) => /[a-zA-Z]/.test(l) || l === "" ? "" : l), (letter) => {
    return `${letter === "" ? `<div class="w-5 h-0.5 bg-black m-1"></div>` : `<div class="w-5 h-0.5 bg-transparent m-1"></div>`}`;
  })}</div>  <div class="flex flex-row items-center"><input class="border-black px-4 py-1 my-4 border rounded" type="text" placeholder="Guess a letter"${add_attribute("value", letterToGuess, 0)}></div>  ${``}` : ` <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>`}`}  ${$gameStore.gameOver ? `<div class="fixed top-0 left-40 w-full h-full flex items-center justify-center"><div class="shadow-2xl bg-white p-4 w-1/3 flex flex-col items-center justify-center border-gray-200 border min-h-96"><h1 class="font-bold text-2xl m-6">${escape($gameStore.guessedWord.every((l) => l !== "") ? "You win!" : "You lose...")}</h1> <table class="m-6"><tr><td class="pr-10" data-svelte-h="svelte-99mqtz">Word:</td> <td class="py-2">${escape($gameStore.wordToGuess.join(""))}</td></tr> <tr><td class="pr-10" data-svelte-h="svelte-98iwke">Definition:</td> <td class="py-2"><!-- HTML_TAG_START -->${$gameStore.wordDefinition}<!-- HTML_TAG_END --></td></tr></table> <button class="rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-700 m-6" data-svelte-h="svelte-1dz7v3o">Continue</button></div></div>` : ``}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Game, "Game").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
