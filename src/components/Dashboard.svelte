<script>
  import { authHandlers } from "../stores/authStore";

  let action = "";
  let newEmail = "";
  let newPass = "";

  async function handleSubmit() {
    if (!action) {
      return;
    }

    if (action === "updatePass") {
      return await authHandlers.updatePassword(newPass);
    }

    if (action === "updateEmail") {
      console.log(newEmail);
      return await authHandlers.updateEmail(newEmail);
    }
  }
</script>

<div class="align-center flex h-screen flex-1 flex-col justify-center">
  <div>
    <button
      on:click={() => {
        action = "updateEmail";
      }}>Update Email</button
    >
    <button
      on:click={() => {
        action = "updatePass";
      }}>Update Password</button
    >
  </div>
  {#if action === "updatePass"}
    <form>
      <label>
        <input
          bind:value={newPass}
          type="password"
          placeholder="New Password"
        />
      </label>

      <button on:click={handleSubmit}>Submit</button>
    </form>
  {/if}
  {#if action === "updateEmail"}
    <form>
      <label>
        <input bind:value={newEmail} type="email" placeholder="New Email" />
      </label>
      <button on:click={handleSubmit}>Submit</button>
    </form>
  {/if}
</div>
