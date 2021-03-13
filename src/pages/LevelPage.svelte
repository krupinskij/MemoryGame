<script>
	import Translate from "../i18n/components/Translate.svelte";
  
  import { page } from "../store/project.js"; 
  import { level } from "../store/game.js";

  import { fade } from 'svelte/transition';

  const setLevel = newLevel => {
    const pointer = document.getElementById("pokeball");
    const image = document.getElementById("levelImage");
    level.set(newLevel);

    switch (newLevel) {
      case "easy": {
        pointer.style.gridRow = "1/2";
        image.src = "img/levelImages/easy.gif";
        break;
      }
      case "medium": {
        pointer.style.gridRow = "2/3";
        image.src = "img/levelImages/medium.gif";
        break;
      }
      case "hard": {
        pointer.style.gridRow = "3/4";
        image.src = "img/levelImages/hard.gif";
        break;
      }
      case "legendary": {
        pointer.style.gridRow = "4/5";
        image.src = "img/levelImages/legendary.gif";
        break;
      }
    }
  };

  const switchPage = () => {
    setTimeout(() => {
      page.set("game");
    }, 500);
  };
</script>

<style>
  .options-container {
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr / 1fr 4fr 6fr;
    align-items: center;
  }

  .pointer {
    grid-column: 1/2;
    grid-row: 1/2;

    height: 50px;
    justify-self: end;

    animation: jump 0.5s linear alternate infinite;
  }

  .option {
    font-family: "Righteous", cursive;
    color: white;
    font-size: 35px;

    margin: 0 10%;
    justify-self: start;

    cursor: pointer;
  }

  .option--easy {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  .option--medium {
    grid-column: 2/3;
    grid-row: 2/3;
  }

  .option--hard {
    grid-column: 2/3;
    grid-row: 3/4;
  }

  .option--legendary {
    grid-column: 2/3;
    grid-row: 4/5;
  }

  .levelImage {
    grid-row: 1/5;
    grid-column: 3/4;

    border-radius: 15px;
    height: 20rem;
  }

  @keyframes jump {
    100% {
      transform: translate3d(0, -30%, 0);
    }
  }
</style>

<div in:fade="{{ delay: 500, duration: 1000 }}" out:fade="{{ duration: 500 }}" class="page">

  <section class="component-mid options-container">

    <img
      id="pokeball"
      class="pointer"
      src="img/pokeball.png"
      alt="Pokeball pointing choosen level" />

    <span
      id="easy"
      class="option option--easy"
      on:click={() => setLevel('easy')}>
      <Translate token="LEVEL_PAGE__EASY"></Translate>
    </span>
    <span
      id="medium"
      class="option option--medium"
      on:click={() => setLevel('medium')}>
      <Translate token="LEVEL_PAGE__MEDIUM"></Translate>
    </span>
    <span
      id="hard"
      class="option option--hard"
      on:click={() => setLevel('hard')}>
      <Translate token="LEVEL_PAGE__HARD"></Translate>
    </span>
    <span
      id="legendary"
      class="option option--legendary"
      on:click={() => setLevel('legendary')}>
      <Translate token="LEVEL_PAGE__LEGENDARY"></Translate>
    </span>

    <img
      id="levelImage"
      class="levelImage"
      src="img/levelImages/easy.gif"
      alt="Image representing choosen level" />

  </section>

  <section id="submitLevel" class="component-narrow cursor-pointer text-4xl underline" on:click={switchPage}>
    <Translate token="LEVEL_PAGE__PLAY"></Translate>!
  </section>

</div>
