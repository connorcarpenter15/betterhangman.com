<script>
  import "../../app.css";

  import { onMount } from "svelte";
  import { auth } from "../../lib/firebase/firebase.client";
  // import { browser } from "$app/environment";
  import { authStore } from "../../stores/authStore";

  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      authStore.update((curr) => {
        return { ...curr, isLoading: false, currentUser: user };
      });

      // if (
      //   browser &&
      //   !$authStore?.currentUser &&
      //   !$authStore.isLoading &&
      //   window.location.pathname !== "/"
      // ) {
      //   window.location.href = "/";
      //   console.log(authStore.currentUser, authStore.isLoading);
      // }
    });
    return unsubscribe;
  });
</script>

<slot />
