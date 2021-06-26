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
  let state = "unclicked";
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

  const handleClick = () => {
    state = "clicked";
    turnCard();
  }

  const turnCard = () => {
    visible = false;
  }

  const addToQueue = () => {
    if(state !== "clicked") return;
    state = "unclicked";

    pokemonCheckQueue.update(q => [...q, { id, type }]);
    lastPokemon.set(id);
    singlePokemon.update(w => !w);
    clickCounter.update(n => n + 1);
  }

  const changeImage = () => {
    imageSrc = imageSrc === backImageSrc ? pokeImageSrc : backImageSrc;
    visible = state !== "deleted";
  }

  const deleteCard = () => {
    visible = false;
    state = "deleted";
  }

  const checkCard = (card) => {
    return card.id === id && card.type === type;
  }

  pokemonDeleteQueue.subscribe(q => {
    if (q.length > 1 && ( checkCard(q[0]) || checkCard(q[1]) )) {
      setTimeout(deleteCard, 1000);
    }

    return q;
  });

  pokemonTurnDownQueue.subscribe(q => {
    if (q.length !== 0 && ( checkCard(q[0]) || checkCard(q[1]) )) {
      setTimeout(turnCard, 1000);
    }

    return q;
  });

  onMount(() => {
    firebase.storage().ref(`${type}/${id}.png`)
      .getDownloadURL()
      .then(url => {
        loadImage(url);
      });
  });
</script>

<div class="aspect-w-1 aspect-h-1">
  {#if visible}
    <div 
      class="grid place-items-center p-1"
      transition:turn="{{ duration: 200 }}"
      on:introend="{addToQueue}"
      on:outroend="{changeImage}"
    >
      <img
        id={`${type}-${id}`}
        src={ imageSrc }
        class="w-full h-auto border-white border-2 rounded-lg cursor-pointer"
        alt="Pokemon"
        on:click={ handleClick } 
      />
    </div>
  {/if}
</div>
