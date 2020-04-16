<script>
  import {
    page,
    clickCounter,
    imagesLoaded,
    imagesAll,
    loading,
    lastPokemon,
    singlePokemon
  } from "../store.js";
  import { StorageRef } from "sveltefire";
  import "firebase/storage";
  export let id, type;

  let imageSrc;
  let turnedDown = true;
  let busy = false;

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
    if(busy) return;
    busy = true;

    lastPokemon.set(id);
    singlePokemon.update(w => !w);
    clickCounter.update(n => n + 1);
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
    <StorageRef
      path={`${type}/${id}.png`}
      let:downloadURL
      let:ref
      let:metadata>
      {loadImage(downloadURL)}
      <img
        id={`${type}-${id}`}
        src="../img/cardback.png"
        class="pokemon-image"
        alt="Pokemon"
        on:click={turnCard} />

    </StorageRef>
  </div>

</div>
