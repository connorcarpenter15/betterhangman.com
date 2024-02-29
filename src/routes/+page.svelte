<script>
  import Header from "../components/Header.svelte";
</script>

<Header />

<div class="flex flex-col items-center justify-center w-full h-screen">
  <button
    class="rounded-2xl bg-black text-white px-5 py-3 font-bold hover:bg-gray-700 m-10 w-48"
    on:click={() => (window.location.href = "/play")}>Play Hangman</button
  >
</div>
