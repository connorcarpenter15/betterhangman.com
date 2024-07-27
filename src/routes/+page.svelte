<script>
  import Header from "../components/Header.svelte";
  import hangmanImagesNeutral from "$lib/images/hangman_neutral/hangmanImagesNeutral.js";
</script>

<Header />

<div class="flex flex-row items-center justify-center h-screen">
  <div>
    <img src={hangmanImagesNeutral.face} alt="Hangman Neutral Face" />
  </div>

  <div>
    <button
      class="rounded-2xl bg-black text-white px-5 py-3 font-bold hover:bg-gray-700 m-10 w-48"
      on:click={() => (window.location.href = "/play")}>Play Hangman</button
    >
  </div>
</div>
