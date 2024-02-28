<script>
  import { gameStore, gameHandlers } from "../stores/gameStore";
  import { getRandomWord } from "$lib/firebase/firebase.client.js";

  let letterToGuess = null;

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
          on:keydown={(e) => {
            if (e.key === "Enter" && letterToGuess) {
              gameHandlers.guessLetter(letterToGuess);
            }
            letterToGuess = null;
          }}
          class="border-black px-4 py-2 m-4"
          type="text"
          placeholder="Guess a letter"
        />
      </div>
    {/if}

    {#if $gameStore.isLoading}
      <h1>Loading...</h1>
    {/if}
  </div>
</div>
