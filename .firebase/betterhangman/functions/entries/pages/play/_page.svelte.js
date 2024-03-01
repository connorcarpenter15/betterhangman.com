import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header } from "../../../chunks/Header.js";
import { w as writable } from "../../../chunks/index.js";
import "../../../chunks/firebase.client.js";
const hangmanScaffold = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPHRFWHRDb21tZW50AHhyOmQ6REFGLUNJVTN1ckk6MTEsajo3NDI2ODU1ODQwODM0OTc3ODM5LHQ6MjQwMjI4MDHVVB5OAAAE7WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CiAgICAgICAgPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiAgICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICAgICAgICB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogICAgICAgIDxkYzp0aXRsZT4KICAgICAgICA8cmRmOkFsdD4KICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkhhbmdtYW4gaW1hZ2UgLSAxPC9yZGY6bGk+CiAgICAgICAgPC9yZGY6QWx0PgogICAgICAgIDwvZGM6dGl0bGU+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICAgICAgICA8QXR0cmliOkFkcz4KICAgICAgICA8cmRmOlNlcT4KICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyNC0wMi0yODwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgICAgPEF0dHJpYjpFeHRJZD41NTkxOTM0MC1lZmMxLTQ0NTMtYWRhYy1jYWJhMzJjZTBjNGI8L0F0dHJpYjpFeHRJZD4KICAgICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgICAgIDwvcmRmOmxpPgogICAgICAgIDwvcmRmOlNlcT4KICAgICAgICA8L0F0dHJpYjpBZHM+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICAgICAgICA8cGRmOkF1dGhvcj5DYXJwZW50ZXIsIENvbm5vcjwvcGRmOkF1dGhvcj4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KCiAgICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICAgICAgICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgICAKICAgICAgICA8L3JkZjpSREY+CiAgICAgICAgPC94OnhtcG1ldGE+k/RbrQAACIhJREFUeJzs3KtNRFEUhtEN4dED7aDphQKoARSOEgg1IDBI6sFgRo7icQ/zzVrJljf53ZcccU/muN3PzO3MnKweAszn7va5m5mHDbfAwTlbPWCxyxFz+C/Od7fPxZZD4BCdrh4AAPycoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAwLH/y31rzzPztnoELHQzM9erR0CRoG/rdWYeV4+Aha5G0OFPeHIHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAAEEHgABBB4AAQQeAgLPVA4Cj8j4zT9/47uO3h0CNoANbetkd8Ms8uQNAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQICgA0CAoANAgKADQMAXAAAA///s1YEMAAAAwCB/63t8JZHQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAgQAAAP//7dexDcNAEANBulFlbkqpG1UVDwuLmQKIyxYn6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABAg6AAQIOgAECDoABDwObB5b/se2AXYtt+2699HwNv40AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEgQNABIEDQASBA0AEg4AFf2hFN6ijPWAAAAABJRU5ErkJggg==";
const hangmanHead = "/_app/immutable/assets/hangman_head_neutral.4aLx9pWe.png";
const hangmanBody = "/_app/immutable/assets/hangman_body_neutral.od90h9l4.png";
const hangmanFirstLeg = "/_app/immutable/assets/hangman_first_leg_neutral.AzGBVrTd.png";
const hangmanSecondLeg = "/_app/immutable/assets/hangman_second_leg_neutral.jg4-QQto.png";
const hangmanFirstArm = "/_app/immutable/assets/hangman_first_arm_neutral.BrlJK4Q9.png";
const hangmanSecondArm = "/_app/immutable/assets/hangman_second_arm_neutral.CM4TNkXe.png";
const hangmanFace = "/_app/immutable/assets/hangman_face_neutral.B6TkzGK3.png";
const hangmanImagesNeutral = {
  scaffold: hangmanScaffold,
  head: hangmanHead,
  body: hangmanBody,
  firstLeg: hangmanFirstLeg,
  secondLeg: hangmanSecondLeg,
  firstArm: hangmanFirstArm,
  secondArm: hangmanSecondArm,
  face: hangmanFace
};
const gameStore = writable({
  currentGame: false,
  gameOver: false,
  isLoading: false,
  wordToGuess: [],
  wordDefinition: "",
  guessedWord: [],
  lettersGuessed: [],
  incorrectGuesses: 0,
  hangmanImage: hangmanImagesNeutral.scaffold
});
const Game = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $gameStore, $$unsubscribe_gameStore;
  $$unsubscribe_gameStore = subscribe(gameStore, (value) => $gameStore = value);
  let letterToGuess = null;
  $$unsubscribe_gameStore();
  return ` <div class="flex justify-center items-center h-screen"><div class="w-1/2 flex flex-col justify-center items-center flex-1"><img${add_attribute("src", $gameStore.hangmanImage, 0)} alt="Hangman Scaffold"></div>  <div class="w-1/2 flex flex-col">${!$gameStore.currentGame && !$gameStore.isLoading ? `<div class="flex flex-col justify-start"><button class="rounded-2xl bg-black px-6 py-3 w-36 font-bold text-white hover:bg-gray-700 m-4" data-svelte-h="svelte-w1ifm1">New Game</button></div> <div class="flex flex-col justify-start"><button class="rounded-2xl bg-black px-6 py-3 w-36 font-bold text-white hover:bg-gray-700 m-4" data-svelte-h="svelte-12rbjsw">Play Word of the Day</button></div> ` : `${!$gameStore.isLoading ? `<h1 class="text-xl mb-4" data-svelte-h="svelte-64a7qe">Letters Guessed:</h1>  <div class="flex flex-wrap w-3/5 items-center min-h-32 mb-10">${each($gameStore.lettersGuessed, (letter) => {
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
