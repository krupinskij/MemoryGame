<script>
  import StartPage from "./pages/StartPage.svelte";
  import LevelPage from "./pages/LevelPage.svelte";
  import GamePage from "./pages/GamePage.svelte";
  import ResultPage from "./pages/ResultPage.svelte";

  import Navbar from "./components/Navbar.svelte";

  import LoginModal from "./components/modals/LoginModal.svelte";
  import RegisterModal from "./components/modals/RegisterModal.svelte";
  import RankingModal from "./components/modals/RankingModal.svelte";
  import PokedexModal from "./components/modals/PokedexModal.svelte";
  import LoadingModal from "./components/modals/LoadingModal.svelte";

  import { page } from "./store/project.js";
  import { logged } from "./store/user.js";
  import { modal } from "./store/modal.js";

  import { onMount } from 'svelte';

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  var firebaseConfig = {
    apiKey: "AIzaSyDh0iLtYQ8Q_vkRqA_Om0DhwWa28haMSWA",
    authDomain: "pokemon-memory-game-1fa7f.firebaseapp.com",
    databaseURL: "https://pokemon-memory-game-1fa7f.firebaseio.com",
    projectId: "pokemon-memory-game-1fa7f",
    storageBucket: "pokemon-memory-game-1fa7f.appspot.com",
    messagingSenderId: "533361096933",
    appId: "1:533361096933:web:55bb3184a73a32c5dd7c0c"
  };
  firebase.initializeApp(firebaseConfig);

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
  <div class="game-container" class:blurred={ $modal.visible }>
    <Navbar />
    {#if $page === 'start'}
      <StartPage />
    {:else if $page === 'level'}
      <LevelPage />
    {:else if $page === 'game'}
      <GamePage />
    {:else if $page === 'result'}
      <ResultPage />
    {:else}
      <div />
    {/if}
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
