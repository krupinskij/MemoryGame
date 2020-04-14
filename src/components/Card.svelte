<script>
  import { page, clickCounter } from "../store.js";
  import { StorageRef } from "sveltefire";
  import "firebase/storage";
  export let number;

  let imageSrc;
  let turnedDown = true;

  const setImageSrc = src => {
    imageSrc = src;
    return "";
  };

  const turnCard = () => {
    clickCounter.update(n => n + 1);
    if($clickCounter === 10) page.set("result");
    else showPokemonImage(turnedDown ? imageSrc : "../img/cardback.png");
  };

  const showPokemonImage = (src) => {
    const image = document.getElementById(`image-${number}`);
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

  .hidden-image {
    position: absolute;
    top: -500px;
  }
</style>

<div class="card">
  <div class="image-container">
    <StorageRef
    path={`images/${number}.png`}
    let:downloadURL
    let:ref
    let:metadata>
    {setImageSrc(downloadURL)}
    <img
      id={`image-${number}`}
      src="../img/cardback.png"
      class="pokemon-image"
      alt="Pokemon"
      on:click={turnCard} />
    <img src={downloadURL} class="hidden-image" alt="hidden image"/>

    </StorageRef>
  </div>
  

</div>
