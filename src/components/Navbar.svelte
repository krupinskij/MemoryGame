<script>
  import { logged } from "../store/user.js";
  import { modal } from "../store/modal.js";
  import { page, lang } from "../store/project.js";
  import { singlePokemon, pokedexVisible } from "../store/pokemons.js";

  import _ from "../translator/Translator.js";

  import firebase from "firebase";

  const showLoginModal = () => {
    modal.set({
      visible: true,
      type: "login"
    });
  };

  const showRegisterModal = () => {
    modal.set({
      visible: true,
      type: "register"
    });
  };

  const showRankingModal = () => {
    modal.set({
      visible: true,
      type: "ranking"
    });
  };

  const showPokedexModal = () => {
    if ($singlePokemon) {
      modal.set({
        visible: true,
        type: "pokedex"
      });
    }
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        user => {
          page.set("start");
        },
        err => {
          console.error("logout error: " + err.message);
        }
      );
  };

  const getUsername = email => {
    return email.substr(0, email.length - 8);
  };

  $: _checkInPokedex = _("Check in pokedex", $lang);
  $: _hi = _("Hi", $lang);
  $: _showRanking = _("Show ranking", $lang);
  $: _logOut = _("Log Out", $lang);
  $: _logIn = _("Log In", $lang);
  $: _signUp = _("Sign Up", $lang);
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
    {#if $page === 'game'}
      <button
        class="button button--small"
        class:button--disabled={!$singlePokemon}
        on:click={showPokedexModal}>
        {_checkInPokedex}
      </button>
    {/if}
  </div>
  <div class="user-panel">
    {#if $logged}
      <label class="username">
        {_hi}, {getUsername(firebase.auth().currentUser.email)}!
      </label>
      <button class="button button--small" on:click={showRankingModal}>
        {_showRanking}
      </button>
      <button class="button button--small" on:click={logout}>
        {_logOut}
      </button>
    {:else}
      <button class="button button--small" on:click={showLoginModal}>
        {_logIn}
      </button>
      <button class="button button--small" on:click={showRegisterModal}>
        {_signUp}
      </button>
    {/if}

  </div>
</div>
