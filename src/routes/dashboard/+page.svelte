<script>
  import Dashboard from "../../components/Dashboard.svelte";
  import { authHandlers, authStore } from "../../stores/authStore";

  let email;
  authStore.subscribe((curr) => {
    console.log("CURR", curr);
    email = curr?.currentUser?.email;
  });
</script>

{#if $authStore.currentUser}
  <div class="flex flex-1 flex-col">
    <h1 class="">CURRENT USER: {email}</h1>
    <Dashboard />
    <button on:click={authHandlers.logout}>Logout</button>
  </div>
{:else}
  <div>Loading....</div>
{/if}
