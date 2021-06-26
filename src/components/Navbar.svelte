<script>
	import Translate from "../i18n/components/Translate.svelte";
  import ButtonGroup from "./button/ButtonGroup.svelte";
  import Button from "./button/Button.svelte";

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

<div class="component m-2 p-2 flex justify-between items-center">
  <ButtonGroup>
    {#if $page === 'game'}
      <Button disabled={!$singlePokemon} onClick={showPokedexModal}>
        <Translate token="NAVBAR__CHECK_IN_POKEDEX"></Translate>
      </Button>
    {/if}
  </ButtonGroup>
  <ButtonGroup>
    {#if $logged}
      <label class="text-xl mx-4">
        <Translate token="NAVBAR__HI"></Translate>, { getUsername(firebase.auth().currentUser.email) }!
      </label>
      <Button onClick={showRankingModal}>
        <Translate token="NAVBAR__SHOW_RANKING"></Translate>
      </Button>
      <Button onClick={logout}>
        <Translate token="NAVBAR__LOG_OUT"></Translate>
      </Button>
    {:else}
      <Button onClick={showLoginModal}>
        <Translate token="NAVBAR__SIGN_IN"></Translate>
      </Button>
      <Button onClick={showRegisterModal}>
        <Translate token="NAVBAR__SIGN_UP"></Translate>
      </Button>
    {/if}
  </ButtonGroup>
</div>
