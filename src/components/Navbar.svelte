<script>
	import Translate from "../i18n/components/Translate.svelte";
  import { logged } from "../store/user.js";
  import { modal } from "../store/modal.js";
  import { page } from "../store/project.js";
  import { singlePokemon } from "../store/pokemons.js";

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
</script>

<div class="navbar">
  <div class="buttons-group">
    {#if $page === 'game'}
      <button
        class="button"
        disabled={!$singlePokemon}
        on:click={showPokedexModal}>
        <Translate token="NAVBAR__CHECK_IN_POKEDEX"></Translate>
      </button>
    {/if}
  </div>
  <div class="buttons-group">
    {#if $logged}
      <label class="greet">
        <Translate token="NAVBAR__HI"></Translate>, { getUsername(firebase.auth().currentUser.email) }!
      </label>
      <button class="button" on:click={showRankingModal}>
        <Translate token="NAVBAR__SHOW_RANKING"></Translate>
      </button>
      <button class="button" on:click={logout}>
        <Translate token="NAVBAR__LOG_OUT"></Translate>
      </button>
    {:else}
      <button class="button" on:click={showLoginModal}>
        <Translate token="NAVBAR__SIGN_IN"></Translate>
      </button>
      <button class="button" on:click={showRegisterModal}>
        <Translate token="NAVBAR__SIGN_UP"></Translate>
      </button>
    {/if}

  </div>
</div>
