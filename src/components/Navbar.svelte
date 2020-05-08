<script>

  import { userForm } from "../store/user.js";

  const showLoginForm = () => {
    userForm.set({
      visible: true,
      type: "login"
    })
  }

  const showRegisterForm = () => {
    userForm.set({
      visible: true,
      type: "register"
    })
  }

</script>

<style>
  .navbar {
    top: 0;
    width: 100%;

    background-color: rgb(0,0,0,0.7);
    box-shadow: 3px 5px 7px black;

    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    place-items: center;
  }
</style>

<div class="navbar">
  <div></div>
  <div class="header">
    ...
  </div>
  <div>
    <button class="button button--small" on:click={ showLoginForm }>Log In</button>
    <button class="button button--small" on:click={ showRegisterForm }>Sign Up</button>
  </div>
</div>
