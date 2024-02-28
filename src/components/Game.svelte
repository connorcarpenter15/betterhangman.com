<script>
  import { gameStore, gameHandlers } from "../stores/gameStore";
  import { getRandomWord } from "$lib/firebase/firebase.client.js";

  let letterToGuess = null;
  let guessStatus = null;

  // handle starting of game
  function startGame() {
    let randomWord;
    let definition;
    let errorText;

    $gameStore.isLoading = true;

    // retrieve word using cloud function
    getRandomWord()
      .then((word) => {
        randomWord = word.data.word.toLowerCase();
        definition = word.data.definition;
        console.log(randomWord);

        // start game in gameStore
        gameHandlers.startGame(randomWord, definition);
        $gameStore.isLoading = false;
      })
      .catch((e) => (errorText = e));
  }

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

  // handle game over popup
  let showGameOver = false;

  // Function to set showGameOver to true after 2 seconds
  const delayGameOver = () => {
    setTimeout(() => {
      showGameOver = true;
    }, 700); // 700 milliseconds = 0.7 seconds
  };

  // Delay showing the popup
  $: {
    if ($gameStore.gameOver) {
      delayGameOver();
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
      <div class="flex flex-col items-center">
        <button
          on:click={startGame}
          class="rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-700"
          >New Game</button
        >
      </div>

      <!-- game interface -->
    {:else if !$gameStore.isLoading}
      <h1 class="text-xl mb-4">Letters Guessed</h1>

      <!-- icons of guessed letters -->
      <div class="flex flex-wrap mb-20 w-3/5 items-center">
        {#each $gameStore.lettersGuessed as letter}
          <div
            class="m-2 w-8 h-8 rounded-lg shadow items-center justify-center flex border-black border"
          >
            {letter}
          </div>
        {/each}
      </div>

      <!-- current state of guessed word -->
      <div class="flex flex-wrap mb-20">
        {#each $gameStore.guessedWord as letter}
          <p class="m-2">{letter}</p>
        {/each}
      </div>

      <!-- input for guessing -->
      <div class="flex flex-row items-center">
        <input
          bind:value={letterToGuess}
          on:keydown={(e) => handleGuess(e)}
          class="border-black px-4 py-1 m-4 border rounded"
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

    <!-- dispaly game over popup -->
    {#if showGameOver}
      <div
        class="fixed top-0 left-40 w-full h-full flex items-center justify-center z-50"
      >
        <div
          class="shadow-2xl bg-white p-4 w-1/3 flex flex-col items-center justify-center"
        >
          <h1 class="font-bold text-2xl m-6">
            {$gameStore.incorrectGuesses === 6 ? "You lose..." : "You win!"}
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
              showGameOver = false;
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
