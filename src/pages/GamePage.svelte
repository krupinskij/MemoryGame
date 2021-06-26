<script>
  import Page from "../components/Page.svelte";
  import Card from "../components/Card.svelte";

  import { level } from "../store/game.js";
  import { imagesAll } from "../store/images.js";

  import { onMount } from "svelte";
  
  let species = 8;
  let gridTemplate = 'grid-template-4-4'

  switch ($level) {
    case "easy": {
      species = 8;
      gridTemplate = 'grid-template-4-4'
      break;
    }
    case "medium": {
      species = 12;
      gridTemplate = 'grid-template-4-6'
      break;
    }
    case "hard": {
      species = 16;
      gridTemplate = 'grid-template-4-8'
      break;
    }
    case "legendary": {
      species = 36;
      gridTemplate = 'grid-template-6-12'
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

<Page
  fadeIn="{{ delay: 500, duration: 1000 }}"
  fadeOut="{{ duration: 500 }}"
>
  <section class={`component w-11/12 p-6 rounded-lg grid items-center justify-center ${gridTemplate}`}>
    {#each pokemonCards as pokemonCard}
      <Card id={pokemonCard.id} type={pokemonCard.type} />
    {/each}
  </section>
</Page>
