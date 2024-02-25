<script>
  import textLogoWhite from "$lib/images/txt_logo_white.png";
  import { page } from "$app/stores";
  import { authHandlers, authStore } from "../stores/authStore";
</script>

<header class="align-center flex flex-1 items-center justify-center bg-black">
  <img src={textLogoWhite} alt="txt-logo-white" class="m-1 ml-10 w-20" />

  <p class="ml-6 font-bold text-white">{$authStore.currentUser?.email}</p>

  <nav class="ml-auto">
    <ul class="flex flex-1 items-center justify-center text-white">
      <li
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
        class="mr-6 hover:text-blue-100"
      >
        <a href="/">Home</a>
      </li>
      <li
        aria-current={$page.url.pathname === "/play" ? "page" : undefined}
        class="mr-6 hover:text-blue-100"
      >
        <a href="/play">Play</a>
      </li>
      {#if !$authStore.currentUser}
        <li
          aria-current={$page.url.pathname === "/login" ? "page" : undefined}
          class="mr-6"
        >
          <a
            href="/login"
            class="rounded-xl bg-white px-5 py-2 font-bold text-black hover:bg-blue-100"
            >Log In</a
          >
        </li>
      {:else}
        <li class="mr-6">
          <button
            on:click={authHandlers.logout}
            class="rounded-xl bg-white px-5 py-2 font-bold text-black hover:bg-blue-100"
            >Log Out</button
          >
        </li>
      {/if}
    </ul>
  </nav>
</header>
