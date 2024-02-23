<script>
  import { authHandlers, authStore } from "../stores/authStore";

  let register = false;
  let email = "";
  let password = "";
  let confirmPassword = "";

  async function handleSubmit() {
    if (!email || !password || (register && !confirmPassword)) {
      return;
    }

    if (register && password === confirmPassword) {
      try {
        await authHandlers.signup(email, password);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await authHandlers.login(email, password);
      } catch (err) {
        console.log(err);
      }
    }
    if ($authStore.currentUser) {
      window.location.href = "/dashboard";
    }
  }
</script>

<div class="align-center m-auto flex h-screen w-max flex-1 flex-col">
  <h1 class="m-auto mb-0 text-3xl font-medium">
    {register ? "Register" : "Log In"}
  </h1>
  <form class="flex flex-col">
    <label class="m-auto mb-1 mt-8 rounded border border-black p-1 px-2">
      <input bind:value={email} type="email" placeholder="Email" />
    </label>
    <label class="m-auto mb-1 mt-1 rounded border border-black p-1 px-2">
      <input bind:value={password} type="password" placeholder="Password" />
    </label>
    {#if register}
      <label class="m-auto mb-2 mt-1 rounded border border-black p-1 px-2">
        <input
          bind:value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        />
      </label>
    {/if}
    <button
      on:click={handleSubmit}
      class="m-auto mt-8 rounded-lg bg-black p-8 pb-2 pt-2 text-white"
      >Submit</button
    >
  </form>
  {#if register}
    <div
      on:click={() => {
        register = false;
      }}
      on:keydown={() => {}}
      role="button"
      tabindex="0"
      class="m-auto mt-6"
    >
      Already have an account?
      <p class="inline-block underline">Log in</p>
    </div>
  {:else}
    <div
      on:click={() => {
        register = true;
      }}
      on:keydown={() => {}}
      role="button"
      tabindex="0"
      class="m-auto mb-1 mt-6"
    >
      Don't have an account?
      <p class="inline-block underline">Sign Up</p>
    </div>
    <div
      on:click={() => {
        authHandlers.resetPassword(email);
      }}
      on:keydown={() => {}}
      role="button"
      tabindex="0"
      class="m-auto mt-1 underline"
    >
      Forgot Password?
    </div>
  {/if}
</div>
