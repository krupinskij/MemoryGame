<script>
  import { logged } from "../store/user.js";
  import { modal } from "../store/modal.js";
  import { page, lang } from "../store/project.js";
  import { singlePokemon } from "../store/pokemons.js";

  import _ from "../translator/Translator.js";

  import firebase from "firebase";
  import "firebase/auth";

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

<div class="navbar">
  <div class="buttons-group">
    {#if $page === 'game'}
      <button
        class="button"
        disabled={!$singlePokemon}
        on:click={showPokedexModal}>
        {_checkInPokedex}
      </button>
    {/if}
  </div>
  <div class="buttons-group">
    {#if $logged}
      <label class="greet">
        {_hi}, {getUsername(firebase.auth().currentUser.email)}!
      </label>
      <button class="button" on:click={showRankingModal}>
        {_showRanking}
      </button>
      <button class="button" on:click={logout}>
        {_logOut}
      </button>
    {:else}
      <button class="button" on:click={showLoginModal}>
        {_logIn}
      </button>
      <button class="button" on:click={showRegisterModal}>
        {_signUp}
      </button>
    {/if}

  </div>
</div>
