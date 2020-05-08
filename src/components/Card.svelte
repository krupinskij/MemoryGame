<script>
  import { page, clickCounter } from "../store/game.js";
  import { imagesLoaded, imagesAll, loading } from "../store/images.js";
  import {
    lastPokemon,
    singlePokemon,
    pokemonCheckQueue,
    pokemonDeleteQueue,
    pokemonTurnDownQueue,
    pokemonDeletedCards
  } from "../store/pokemons.js";
  import firebase from "firebase";
  import { onMount } from "svelte";
  export let id, type;

  let imageSrc;
  let turnedDown = true;
  let busy = false;
  let visible = true;

  const loadImage = src => {
    const image = new Image();
    image.addEventListener("load", () => {
      imagesLoaded.update(n => n + 1);
    });
    image.src = src;
    imageSrc = src;
    return "";
  };

  const turnCard = () => {
    if (busy) return;
    busy = true;

    lastPokemon.set(id);
    singlePokemon.update(w => !w);
    clickCounter.update(n => n + 1);
    pokemonCheckQueue.update(q => [...q, { id, type }]);
    showPokemonImage(turnedDown ? imageSrc : "../img/cardback.png");
  };

  const showPokemonImage = src => {
    const image = document.getElementById(`${type}-${id}`);
    const CARD_SIZE = 100;
    let width = CARD_SIZE;
    let fracPI = 0;
    let isShown = false;

    image.style.height = image.height + "px";

    const showPokemonItv = setInterval(() => {
      fracPI += 0.05;
      width = Math.abs(CARD_SIZE * Math.cos(Math.PI * fracPI));

      if (!isShown) {
        image.style.width = width + "%";

        if (fracPI >= 0.5) {
          image.setAttribute("src", src);
          isShown = true;
        }
      } else {
        image.style.width = width + "%";

        if (fracPI >= 1) {
          image.style.width = "100%";
          image.style.height = "auto";

          turnedDown = !turnedDown;
          busy = false;
          clearInterval(showPokemonItv);
        }
      }
    }, 10);
  };

  const hideCard = () => {
    const image = document.getElementById(`${type}-${id}`);
    let opacity = 1;
    visible = false;

    const cardFadeOutItv = setInterval(() => {
      opacity -= 0.05;
      image.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(cardFadeOutItv);
        image.style.display = "none";
      }
    }, 10);
  };

  pokemonDeleteQueue.subscribe(q => {
    if (
      q.length > 1 &&
      ((q[0].id === id && q[0].type === type) ||
        (q[1].id === id && q[1].type === type))
    ) {
      busy = true;
      pokemonDeletedCards.update(c => c + 1);

      setTimeout(() => {
        showPokemonImage("../img/cardback.png");
        hideCard();
      }, 1000);
    }

    return q;
  });

  pokemonTurnDownQueue.subscribe(q => {
    if (
      q.length !== 0 &&
      ((q[0].id === id && q[0].type === type) ||
        (q[1].id === id && q[1].type === type))
    ) {
      busy = true;

      setTimeout(() => {
        showPokemonImage("../img/cardback.png");
      }, 1000);
    }

    return q;
  });

  onMount(() => {
    firebase
      .storage()
      .ref(`${type}/${id}.png`)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        loadImage(url);
      });
  });
</script>

<style>
  .image-container {
    display: grid;
    place-items: center;
  }

  .pokemon-image {
    width: 100%;
    height: auto;
    padding: 0;
    justify-self: center;

    font-size: 20px;
    color: white;

    border: 2px solid white;
    border-radius: 10px;

    cursor: pointer;
  }
</style>

<div class="card">
  <div class="image-container">
    <img
      id={`${type}-${id}`}
      src="../img/cardback.png"
      class="pokemon-image"
      alt="Pokemon"
      on:click={turnCard} />
  </div>

</div>
