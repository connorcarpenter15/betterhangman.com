<script>
  import Header from "../components/Header.svelte";
  import { getRandomWord } from "$lib/firebase/firebase.client.js";

  let randomWord;
  let definition;
  let errorText;
</script>

<Header />

<div class="flex flex-col items-center justify-center h-screen">
  <button
    class="rounded-xl bg-black text-white px-5 py-2 font-bold hover:bg-gray-700 m-10"
    on:click={getRandomWord()
      .then((word) => {
        randomWord = word.data.word;
        definition = word.data.definition;
      })
      .catch((e) => (errorText = e))}>Get Word</button
  >

  {#if randomWord}
    <h1>{randomWord}</h1>
  {/if}

  {#if definition}
    <h1>{definition}</h1>
  {/if}

  {#if errorText}
    <h1 class="text-red-500">{errorText.code}</h1>
    <h1 class="text-red-500">{errorText.message}</h1>
    <h1 class="text-red-500">{errorText.additionalContext}</h1>
    <h1 class="text-red-500">{errorText}</h1>
  {/if}
</div>
