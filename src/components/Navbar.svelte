<script>

  import { userForm, logged } from "../store/user.js";
  import { page } from "../store/project.js";
  import { singlePokemon, pokedexVisible } from "../store/pokemons.js";

  import firebase from "firebase";

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

  const showPokedex = () => {
    if($singlePokemon) {
      pokedexVisible.set(true);
    }
  }

  const logout = () => {
      firebase.auth().signOut()
      .then(
        user => {
          page.set("start");
        },
        err => {
          console.error("logout error: " + err.message);
        }
      )
    }

  const getUsername = email => {
    return email.substr(0, email.length - 8);
  }

</script>

<style>
  .navbar {
    top: 0;
    width: calc(100% - 20px);
    padding: 10px;

    background-color: rgb(0,0,0,0.7);
    box-shadow: 3px 5px 7px black;

    display: flex;
    justify-content: space-between;
  }

  .user-panel {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .username {
    font-size: 28px;
  }
</style>

<div class="navbar">
  <div>
    {#if $page === "game"}
      <button class="button button--small" class:button--disabled={ !$singlePokemon } on:click={ showPokedex }>Check in pokedex</button>
    {/if}
  </div>
  <div class="user-panel">
    {#if $logged}
      <label class="username">Hi, { getUsername(firebase.auth().currentUser.email) }!</label>
      <button class="button button--small" on:click={ logout }>Log Out</button>
    {:else}
      <button class="button button--small" on:click={ showLoginForm }>Log In</button>
      <button class="button button--small" on:click={ showRegisterForm }>Sign Up</button>
    {/if}
    
  </div>
</div>
