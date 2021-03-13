<script>
  import { clickCounter } from "../store/game.js";
  import { imagesLoaded } from "../store/images.js";
  import {
    lastPokemon,
    singlePokemon,
    pokemonCheckQueue,
    pokemonDeleteQueue,
    pokemonTurnDownQueue
  } from "../store/pokemons.js";

  import { turn } from '../transitions/turn';

  import firebase from "firebase";
  import "firebase/storage";

  import { onMount } from "svelte";
  export let id, type;

  let pokeImageSrc;
  const backImageSrc = "../img/cardback.png";
  let imageSrc = backImageSrc;
  let state = "active";
  let visible = true;

  const loadImage = src => {
    const image = new Image();
    image.addEventListener("load", () => {
      imagesLoaded.update(n => n + 1);
    });
    image.src = src;
    pokeImageSrc = src;
    return "";
  };

  const turnCard = () => {
    visible = false;
  }

  const addToQueue = () => {
    if(imageSrc !== pokeImageSrc) return;

    pokemonCheckQueue.update(q => [...q, { id, type }]);
    lastPokemon.set(id);
    singlePokemon.update(w => !w);
    clickCounter.update(n => n + 1);
  }

  const changeImage = () => {
    imageSrc = imageSrc === backImageSrc ? pokeImageSrc : backImageSrc;
    visible = state === "active";
  }

  const deleteCard = () => {
    visible = false;
    state = "deleted";
  }

  pokemonDeleteQueue.subscribe(q => {
    if (
      q.length > 1 &&
      ((q[0].id === id && q[0].type === type) ||
        (q[1].id === id && q[1].type === type))
    ) {
      setTimeout(deleteCard, 1000);
    }

    return q;
  });

  pokemonTurnDownQueue.subscribe(q => {
    if (
      q.length !== 0 &&
      ((q[0].id === id && q[0].type === type) ||
        (q[1].id === id && q[1].type === type))
    ) {
      setTimeout(turnCard, 1000);
    }

    return q;
  });

  onMount(() => {
    firebase
      .storage()
      .ref(`${type}/${id}.png`)
      .getDownloadURL()
      .then(url => {
        loadImage(url);
      });
  });
</script>

<div class="card-container">
  {#if visible}
    <div 
      class="card"
      transition:turn="{{ duration: 200 }}"
      on:introend="{addToQueue}"
      on:outroend="{changeImage}"
    >
      <img
        id={`${type}-${id}`}
        src={ imageSrc }
        class="card-image"
        alt="Pokemon"
        on:click={ turnCard } 
      />
    </div>
  {/if}
</div>
