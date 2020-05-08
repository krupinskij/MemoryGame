<script>
  import { page, clickCounter } from "../store.js";

  import { fade } from 'svelte/transition';

  const switchPage = () => {
    setTimeout(() => {
      page.set("level");
    }, 500);
  };
</script>

<style>
  .result-page {
    display: grid;
    grid-template-rows: 85% 15%;
    place-items: center;
  }

  .details {
    display: grid;
    grid-template-rows: 20% 15% 50% 15%;
    place-items: center;

    width: 80%;
  }

  .details--normal {
    font-size: 30px;
  }

  .details--big {
    font-size: 50px;
  }

  .details--huge {
    font-size: 200px;
  }

  .newGame {
    font-size: 25px;

    padding: 1% 5%;

    cursor: pointer;
    text-decoration: underline;
  }
</style>

<div in:fade="{{ delay: 500, duration: 1000 }}" out:fade="{{ duration: 500 }}" class="page result-page">

  <section class="details darken-bg shadow">

    <span class="details--big">Przeszedłeś grę!</span>
    <span class="details--normal">Potrzebowałeś do tego:</span>
    <span class="details--huge">{$clickCounter}</span>
    <span class="details--normal">kliknięć</span>

  </section>

  <section class="newGame darken-bg shadow" on:click={switchPage}>Zagraj jeszcze raz</section>

</div>
