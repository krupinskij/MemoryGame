<script>
  import { page } from "../store/project.js"; 
  import { level } from "../store/game.js";
  import { imagesAll } from "../store/images.js";
  import { singlePokemon } from "../store/pokemons.js";

  import { onMount } from "svelte";
  
  import Card from "../components/Card.svelte";

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
  });
</script>

<div
  in:fade={{ delay: 500, duration: 1000 }}
  out:fade={{ duration: 500 }}
  class="page">

  <section id="container" class="component-wide {`grid-template-${verticalLength}-${horizontalLength}`}">
    {#each pokemonCards as pokemonCard}
      <Card id={pokemonCard.id} type={pokemonCard.type} />
    {/each}
  </section>

</div>
