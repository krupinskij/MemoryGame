<script>
  import StartPage from "./pages/StartPage.svelte";
  import LevelPage from "./pages/LevelPage.svelte";
  import GamePage from "./pages/GamePage.svelte";
  import ResultPage from "./pages/ResultPage.svelte";

  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";

  import LoginModal from "./components/modals/LoginModal.svelte";
  import RegisterModal from "./components/modals/RegisterModal.svelte";
  import RankingModal from "./components/modals/RankingModal.svelte";
  import PokedexModal from "./components/modals/PokedexModal.svelte";
  import LoadingModal from "./components/modals/LoadingModal.svelte";

  import { page } from "./store/project.js";
  import { logged } from "./store/user.js";
  import { modal } from "./store/modal.js";

  import { onMount } from 'svelte';

  import "./firebase.config.js";

  import firebase from "firebase"
  import "firebase/auth";

  onMount(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        logged.set(true);
      } else {
        logged.set(false);
      }
    })
  });
</script>

<main>
  <div class="bg-game bg-no-repeat bg-cover bg-center h-screen grid grid-rows-game" class:blurred={ $modal.visible }>
    <Navbar />
    <!-- {#if $page === 'start'}
      <StartPage />
    {:else if $page === 'level'} -->
      <LevelPage />
    <!-- {:else if $page === 'game'}
      <GamePage />
    {:else if $page === 'result'}
      <ResultPage />
    {:else}
      <div />
    {/if} -->
    <Footer />
  </div>

  {#if $modal.type === 'register'}
    <RegisterModal />
  {:else if $modal.type === 'login'}
    <LoginModal/>
  {:else if $modal.type === 'pokedex'}
    <PokedexModal/>
  {:else if $modal.type === 'ranking'}
    <RankingModal/>
  {:else if $modal.type === 'loading'}
    <LoadingModal/>
  {/if}
  
</main>
