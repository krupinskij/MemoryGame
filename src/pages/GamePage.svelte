<style>
  .game-page {
    display: grid;
    grid-template-rows: 15% 85%;
    place-items: center;
  }

  .game-container {
    position: relative;
    display: grid;
    grid-template: repeat(4,1fr) / repeat(4,1fr);
    grid-gap: 10px;

    max-width: 35%;
    max-height: 100%;

    background-color: rgba(0, 0, 0, 0.5);
    padding: 1% 5%;
  }
</style>

<div class="page game-page">

  <section class="header--sm">Połącz pokemony z ich imionami</section>

  <section class="game-container">
    {#each Array(16).fill(0).map((_, i) => i + 1) as number}
      <Card {number}/>
    {/each}
  </section>

</div>

<script>
  import Card from '../components/Card.svelte';
</script>