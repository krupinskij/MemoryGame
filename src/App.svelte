<script>
  import StartPage from "./pages/StartPage.svelte";
  import LevelPage from "./pages/LevelPage.svelte";
  import GamePage from "./pages/GamePage.svelte";
  import ResultPage from "./pages/ResultPage.svelte";

  import Navbar from "./components/Navbar.svelte";

  import LoginForm from "./components/LoginForm.svelte";
  import RegisterForm from "./components/RegisterForm.svelte";

  import { page, loading } from "./store.js";
  import { userForm } from "./store/user.js";

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
</script>

<main>
  <div class="game-container" class:blurred={ $userForm.visible }>
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

  {#if $userForm.type === 'register'}
    <RegisterForm />
  {:else if $userForm.type === 'login'}
    <LoginForm/>
  {/if}
  
</main>
