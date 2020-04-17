<script>
  import { page, clickCounter } from "../store.js";
</script>

<style>
  .result-page {
    display: grid;
    grid-template-rows: 15% 75% 10%;
    place-items: center;
  }

  .details {
    display: grid;
    grid-template-rows: 20% 15% 50% 15%;
    place-items: center;

    width: 80%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .details--normal {
    font-size: 40px;
  }

  .details--big {
    font-size: 70px;
  }

  .details--huge {
    font-size: 250px;
  }

  .newGame {
    font-size: 25px;

    padding: 1% 5%;
    background-color: rgba(0, 0, 0, 0.5);

    cursor: pointer;
    text-decoration: underline;
  }
</style>

<div class="page result-page">

  <section class="header">Gratulacje!</section>

  <section class="details">

    <span class="details--big">Przeszedłeś grę!</span>
    <span class="details--normal">Potrzebowałeś do tego:</span>
    <span class="details--huge">{$clickCounter}</span>
    <span class="details--normal">kliknięć</span>

  </section>

  <section class="newGame" on:click={() => { page.set("level"); }}>Zagraj jeszcze raz</section>

</div>
