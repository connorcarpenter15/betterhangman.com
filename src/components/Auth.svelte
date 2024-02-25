<script>
  import { authHandlers, authStore } from "../stores/authStore";
  import textLogoBlack from "$lib/images/txt_logo_black.png";

  let register = false;
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorText = "";

  async function handleSubmit() {
    if (!email || !password || (register && !confirmPassword)) {
      errorText = "Please fill missing fields";
      return;
    }

    if (register && password.length < 6) {
      errorText = "Password must be at least 6 characters";
      return;
    }

    if (register && password !== confirmPassword) {
      errorText = "Passwords do not match";
      return;
    }

    if (register && password === confirmPassword) {
      try {
        await authHandlers.signup(email, password);
        errorText = "";
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await authHandlers.login(email, password);
        errorText = "";
      } catch (err) {
        console.log(err);
      }
    }

    if ($authStore.currentUser) {
      window.location.href = "/";
    }
  }

  let showConfirmPassword = false;
  let showPassword = false;

  function onInput(event, field) {
    if (field === "password") {
      password = event.target.value;
    } else if (field === "confirmPassword") {
      confirmPassword = event.target.value;
    }
  }

  function switchRegister() {
    register = !register;
    errorText = "";
    email = "";
    password = "";
    confirmPassword = "";
  }
</script>

<div class="align-center m-auto flex h-screen flex-1 flex-col">
  <div
    class="m-auto mb-0 flex w-48 cursor-pointer"
    on:click={() => (window.location.href = "/")}
    on:keydown={() => {}}
    role="button"
    tabindex="0"
  >
    <img src={textLogoBlack} alt="txt-logo-black" />
  </div>

  <form class="flex flex-col">
    <label class="m-auto mb-1 mt-8 w-72 rounded border border-black p-1 px-2">
      <input bind:value={email} type="email" placeholder="Email" />
    </label>

    <label
      class="align-center m-auto mb-1 mt-1 flex w-72 flex-1 justify-between rounded border border-black p-1 px-2"
    >
      <input
        value={password}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        on:input={(e) => onInput(e, "password")}
      />

      <button type="button" on:click={() => (showPassword = !showPassword)}
        >{showPassword ? "Hide" : "Show"}</button
      >
    </label>

    {#if register}
      <label
        class="align-center m-auto mb-2 mt-1 flex w-72 flex-1 justify-between rounded border border-black p-1 px-2"
      >
        <input
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          on:input={(e) => onInput(e, "confirmPassword")}
        />

        <button
          type="button"
          on:click={() => (showConfirmPassword = !showConfirmPassword)}
          >{showConfirmPassword ? "Hide" : "Show"}</button
        >
      </label>
    {/if}

    {#if errorText}
      <p class="align-center flex flex-1 justify-center text-red-500">
        {errorText}
      </p>
    {/if}

    <button
      on:click={handleSubmit}
      class="m-auto mt-8 rounded-xl bg-black p-8 pb-2 pt-2 font-bold text-white hover:bg-gray-700"
      >{register ? "Sign Up" : "Log In"}</button
    >
  </form>
  {#if register}
    <div
      on:click={switchRegister}
      on:keydown={() => {}}
      role="button"
      tabindex="0"
      class="m-auto mt-6"
    >
      Already have an account?
      <p class="inline-block text-blue-400">Log in</p>
    </div>
  {:else}
    <div
      on:click={switchRegister}
      on:keydown={() => {}}
      role="button"
      tabindex="0"
      class="m-auto mb-1 mt-6"
    >
      Don't have an account?
      <p class="inline-block text-blue-400">Sign Up</p>
    </div>
    <div
      on:click={() => {
        authHandlers.resetPassword(email);
      }}
      on:keydown={() => {}}
      role="button"
      tabindex="0"
      class="m-auto mt-1 text-blue-400"
    >
      Forgot Password?
    </div>
  {/if}
</div>
