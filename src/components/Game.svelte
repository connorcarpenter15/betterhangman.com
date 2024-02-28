<script>
  import { gameStore, gameHandlers } from "../stores/gameStore";
  import { getRandomWord } from "$lib/firebase/firebase.client.js";

  let letterToGuess = null;
  let guessStatus = null;

  function startGame() {
    let randomWord;
    let definition;
    let errorText;

    $gameStore.isLoading = true;

    getRandomWord()
      .then((word) => {
        randomWord = word.data.word;
        definition = word.data.definition;
        console.log(randomWord);

        gameHandlers.startGame(randomWord);
        $gameStore.isLoading = false;
      })
      .catch((e) => (errorText = e));
  }

  function handleGuess(event) {
    if ($gameStore.gameOver) {
      return;
    }

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

<div class="flex justify-center items-center h-screen">
  <div class="w-1/2 flex flex-col justify-center items-center flex-1">
    <img src={$gameStore.hangmanImage} alt="Hangman Scaffold" />
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
      <h1>Letters Guessed</h1>

      <div class="flex flex-row items-center">
        {#each $gameStore.lettersGuessed as letter}
          <p class="m-2">{letter}</p>
        {/each}
      </div>

      <div class="flex flex-row items-center">
        {#each $gameStore.guessedWord as letter}
          <p class="m-2">{letter}</p>
        {/each}
      </div>

      <div class="flex flex-row items-center">
        <input
          bind:value={letterToGuess}
          on:keydown={(e) => handleGuess(e)}
          class="border-black px-4 py-2 m-4"
          type="text"
          placeholder="Guess a letter"
        />
      </div>

      {#if guessStatus}
        <p class="m-4 text-red-500">{guessStatus}</p>
      {/if}

      <h1>Game over: {$gameStore.gameOver}</h1>
    {/if}

    {#if $gameStore.isLoading}
      <div
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      >
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"
        ></div>
      </div>
    {/if}

    {#if $gameStore.gameOver}
      <div
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      >
        <div
          class="shadow-2xl bg-white p-4 w-96 h-96 flex flex-col items-center justify-center"
        >
          <h1>{$gameStore.incorrectGuesses === 6 ? "You lose" : "You win"}</h1>

          <button
            on:click={gameHandlers.resetGame}
            class="rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-700"
            >Continue</button
          >
        </div>
      </div>
    {/if}
  </div>
</div>
