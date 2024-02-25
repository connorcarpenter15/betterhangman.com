<script>
  import textLogoWhite from "$lib/images/txt_logo_white.png";
  import { page } from "$app/stores";
</script>

<header class="align-center flex flex-1 justify-center bg-black">
  <img
    src={textLogoWhite}
    alt="txt-logo-white"
    class="m-1 ml-10 mr-auto w-20"
  />

  <nav>
    <ul class="flex flex-1 text-white">
      <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
        <a href="/">Home</a>
      </li>
      <li aria-current={$page.url.pathname === "/login" ? "page" : undefined}>
        <a href="/login">Log In</a>
      </li>
    </ul>
  </nav>
</header>
