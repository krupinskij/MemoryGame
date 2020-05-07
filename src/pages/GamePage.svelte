<script>
  import {
    page,
    level,
    imagesAll,
    loading,
    pokemonDeletedCards
  } from "../store.js";
  import { onMount } from "svelte";
  import Card from "../components/Card.svelte";
  import Pokedex from "../components/Pokedex.svelte";
  import Loading from "../components/Loading.svelte";

  import { fade } from "svelte/transition";

  let verticalLength = 5;
  let horizontalLength = 4;
  let species = 8;
  let width = 35;

  switch ($level) {
    case "easy": {
      verticalLength = 4;
      horizontalLength = 4;
      species = 8;
      width = 35;
      break;
    }
    case "medium": {
      verticalLength = 4;
      horizontalLength = 6;
      species = 12;
      width = 55;
      break;
    }
    case "hard": {
      verticalLength = 4;
      horizontalLength = 8;
      species = 16;
      width = 75;
      break;
    }
    case "legendary": {
      verticalLength = 6;
      horizontalLength = 12;
      species = 36;
      width = 75;
      break;
    }
  }

  const pokemonCards = [];

  onMount(() => {
    const constainer = document.getElementById("container");
    constainer.style.gridTemplate = `repeat(${verticalLength},1fr) / repeat(${horizontalLength},1fr)`;
    constainer.style.maxWidth = `${width}%`;

    imagesAll.set(species * 2);

    const idSet = new Set();
    const positionSet = new Set();

    for (let i = 0; i < species; i++) {
      let id = Math.ceil(Math.random() * 151);
      while (idSet.has(id)) {
        id = ((id + 7) % 151) + 1;
      }
      idSet.add(id);

      let position;
      position = Math.floor(Math.random() * species * 2);
      while (positionSet.has(position)) {
        position = (position + 7) % (species * 2);
      }
      positionSet.add(position);
      pokemonCards[position] = { id: id, type: "images" };
      position = Math.floor(Math.random() * species * 2);
      while (positionSet.has(position)) {
        position = (position + 7) % (species * 2);
      }
      positionSet.add(position);
      pokemonCards[position] = { id: id, type: "names" };
    }

    console.log(pokemonCards);
  });
</script>

<style>
  .game-page {
    display: grid;
    grid-template-rows: 15% 85%;
    place-items: center;
  }

  .game-container {
    position: relative;
    display: grid;
    grid-template: repeat(4, 1fr) / repeat(4, 1fr);
    grid-gap: 10px;

    max-width: 35%;
    max-height: 100%;

    background-color: rgba(0, 0, 0, 0.5);
    padding: 1% 5%;
  }
</style>

<div in:fade="{{ delay: 500, duration: 1000 }}" out:fade="{{ duration: 500 }}" class="page game-page">

  <section class="header--sm">Połącz pokemony z ich imionami</section>

  <section id="container" class="game-container">
    {#each pokemonCards as pokemonCard}
      <Card id={pokemonCard.id} type={pokemonCard.type} />
    {/each}
  </section>

  <Pokedex />

  {#if $loading}
    <Loading />
  {/if}

</div>
