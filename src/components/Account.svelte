<script>
  import { authStore } from "../stores/authStore.js";

  // fetch user data from Firestore
  let userData;
</script>

{#if userData}
  <div class="flex flex-col items-center justify-center h-screen">
    <div>{userData}</div>
  </div>
{/if}
