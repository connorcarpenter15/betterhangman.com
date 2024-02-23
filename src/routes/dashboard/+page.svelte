<script>
  import AuthReset from "../../components/AuthReset.svelte";
  import { authHandlers, authStore } from "../../stores/authStore";

  let email;
  authStore.subscribe((curr) => {
    console.log("CURR", curr);
    email = curr?.currentUser?.email;
  });
</script>

{#if $authStore.currentUser}
  <div class="align-center flex flex-1 flex-col justify-center">
    <h1 class="align-center">CURRENT USER: {email}</h1>
    <AuthReset />
    <button on:click={authHandlers.logout}>Logout</button>
  </div>
{:else}
  <div>Loading....</div>
{/if}
