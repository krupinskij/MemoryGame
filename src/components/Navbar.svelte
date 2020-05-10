<script>

  import { logged } from "../store/user.js";
  import { modal } from '../store/modal.js';
  import { page } from "../store/project.js";
  import { singlePokemon, pokedexVisible } from "../store/pokemons.js";

  import _ from "../translator/Translator.js";


  import firebase from "firebase";

  const showLoginModal = () => {
    modal.set({
      visible: true,
      type: "login"
    })
  }

  const showRegisterModal = () => {
    modal.set({
      visible: true,
      type: "register"
    })
  }

  const showRankingModal = () => {
    modal.set({
      visible: true,
      type: "ranking"
    })
  }

  const showPokedexModal = () => {
    if($singlePokemon) {
      modal.set({
        visible: true,
        type: "pokedex"
      })
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

<div class="navbar darken-bg shadow">
  <div>
    {#if $page === "game"}
      <button class="button button--small" class:button--disabled={ !$singlePokemon } on:click={ showPokedexModal }>{ _("Check in pokedex") }</button>
    {/if}
  </div>
  <div class="user-panel">
    {#if $logged}
      <label class="username">{ _("Hi") }, { getUsername(firebase.auth().currentUser.email) }!</label>
      <button class="button button--small" on:click={ showRankingModal }>{ _("Show ranking") }</button>
      <button class="button button--small" on:click={ logout }>{ _("Log Out") }</button>
    {:else}
      <button class="button button--small" on:click={ showLoginModal }>{ _("Log In")}</button>
      <button class="button button--small" on:click={ showRegisterModal }>{ _("Sign Up") }</button>
    {/if}
    
  </div>
</div>
