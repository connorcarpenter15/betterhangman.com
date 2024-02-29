<script>
  import { gameStore, gameHandlers } from "../stores/gameStore";
  import { getRandomWord } from "$lib/firebase/firebase.client.js";

  let letterToGuess = null;
  let guessStatus = null;

  // handle a guess submit
  function handleGuess(event) {
    // do nothing if game is over
    if ($gameStore.gameOver) {
      return;
    }

    // evaluate gameHanders if enter key
    if (event.key === "Enter" && letterToGuess) {
      if (letterToGuess.length > 1) {
        for (let i = 0; i < letterToGuess.length; i++) {
          gameHandlers.guessLetter(letterToGuess[i]);
        }
      } else {
        gameHandlers.guessLetter(letterToGuess);
      }

      letterToGuess = null;
    }
  }
</script>

<!-- body wrapper -->
<div class="flex justify-center items-center h-screen">
  <div class="w-1/2 flex flex-col justify-center items-center flex-1">
    <img src={$gameStore.hangmanImage} alt="Hangman Scaffold" />
  </div>

  <!-- hangman image -->
  <div class="w-1/2 flex flex-col">
    {#if !$gameStore.currentGame && !$gameStore.isLoading}
      <div class="flex flex-col justify-start">
        <button
          on:click={() => gameHandlers.startGame(false)}
          class="rounded-2xl bg-black px-6 py-3 w-36 font-bold text-white hover:bg-gray-700 m-4"
          >New Game</button
        >
      </div>

      <div class="flex flex-col justify-start">
        <button
          on:click={() => gameHandlers.startGame(true)}
          class="rounded-2xl bg-black px-6 py-3 w-36 font-bold text-white hover:bg-gray-700 m-4"
          >Play Word of the Day</button
        >
      </div>

      <!-- game interface -->
    {:else if !$gameStore.isLoading}
      <h1 class="text-xl mb-4">Letters Guessed:</h1>

      <!-- icons of guessed letters -->
      <div class="flex flex-wrap w-3/5 items-center min-h-32 mb-10">
        {#each $gameStore.lettersGuessed as letter}
          <div
            class="my-2 mr-4 w-8 h-8 rounded-lg shadow items-center justify-center flex border-black border mb-auto"
          >
            {letter}
          </div>
        {/each}
      </div>

      <!-- current state of guessed word -->
      <div class="flex">
        {#each $gameStore.guessedWord as letter}
          <div class="w-7 flex justify-center text-xl">
            {letter !== "" ? letter : " "}
          </div>
        {/each}
      </div>

      <div class="flex mb-16">
        {#each $gameStore.guessedWord.map( (l) => (/[a-zA-Z]/.test(l) || l === "" ? "" : l), ) as letter}
          {#if letter === ""}
            <div class="w-5 h-0.5 bg-black m-1"></div>
          {:else}
            <div class="w-5 h-0.5 bg-transparent m-1"></div>
          {/if}
        {/each}
      </div>

      <!-- input for guessing -->
      <div class="flex flex-row items-center">
        <input
          bind:value={letterToGuess}
          on:keydown={(e) => handleGuess(e)}
          class="border-black px-4 py-1 my-4 border rounded"
          type="text"
          placeholder="Guess a letter"
        />
      </div>

      <!-- for repeated guess -->
      {#if guessStatus}
        <p class="m-4 text-red-500">{guessStatus}</p>
      {/if}
    {:else}
      <!-- display loading circle -->
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"
      ></div>
    {/if}

    <!-- display game over popup -->
    {#if $gameStore.gameOver}
      <div
        class="fixed top-0 left-40 w-full h-full flex items-center justify-center"
      >
        <div
          class="shadow-2xl bg-white p-4 w-1/3 flex flex-col items-center justify-center border-gray-200 border min-h-96"
        >
          <h1 class="font-bold text-2xl m-6">
            {$gameStore.guessedWord.every((l) => l !== "")
              ? "You win!"
              : "You lose..."}
          </h1>

          <table class="m-6">
            <tr>
              <td class="pr-10">Word:</td>
              <td class="py-2">{$gameStore.wordToGuess.join("")}</td>
            </tr>
            <tr>
              <td class="pr-10">Definition:</td>
              <td class="py-2">{@html $gameStore.wordDefinition}</td>
            </tr>
          </table>

          <button
            on:click={() => {
              gameHandlers.resetGame();
            }}
            class="rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-700 m-6"
            >Continue</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>
