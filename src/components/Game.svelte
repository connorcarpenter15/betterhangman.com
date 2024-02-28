<script>
  import { gameStore, gameHandlers } from "../stores/gameStore";
  import { getRandomWord } from "$lib/firebase/firebase.client.js";

  function startGame() {
    let randomWord;
    let definition;
    let errorText;

    getRandomWord()
      .then((word) => {
        console.log(word.data.word);
        randomWord = word.data.word;
        console.log(randomWord);
        definition = word.data.definition;
      })
      .catch((e) => (errorText = e));

    gameHandlers.startGame(randomWord);
  }
</script>

<div class="flex justify-center items-center h-screen">
  <div class="w-1/2 flex flex-col justify-center items-center flex-1">
    <img src={$gameStore.hangmanImage} alt="Hangman Scaffold" />
    <!-- Example button to simulate incorrect guess -->
  </div>

  <div class="w-1/2 flex flex-col">
    {#if !$gameStore.currentGame}
      <div class="flex flex-col items-center">
        <button
          on:click={startGame}
          class="rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-700"
          >New Game</button
        >
      </div>
    {:else}
      <div class="flex flex-col items-center">
        <h1>Start</h1>
        {#each $gameStore.wordToGuess as letter}
          <p>{letter}</p>
        {/each}
        <h1>End</h1>
      </div>
    {/if}
  </div>
</div>
