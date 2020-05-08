<script>
  import { lastPokemon, singlePokemon } from "../store/pokemons.js";
  import firebase from "firebase";
  const COVERWIDTH = 379;

  let containerLeftPosition = -100;
  let isHiden = true;

  let coverLeftPosition = 2;
  let coverWidth = 379;

  let opened = false;
  let busy = false;

  let isBack = true;

  const pokedexInside = new Image();
  pokedexInside.src = "img/pokedex/pokedex_inside.png";
  const pokedexCoverBack = new Image();
  pokedexCoverBack.src = "img/pokedex/pokedex_cover_back.png";
  const pokedexCoverFront = new Image();
  pokedexCoverFront.src = "img/pokedex/pokedex_cover_front.png";

  let pokemonImage = new Image();
  let pokemonData;

  const showPokedex = () => {
      if(!$singlePokemon) return;
    if (busy) return;
    busy = true;

    if (isHiden) slideRight();
    else closeLoop();

    isHiden = !isHiden;
  };

  const slideRight = () => {
    const pokedexContainer = document.getElementById("pokedexContainer");
    const pokedexSlider = document.getElementById("pokedexSlider");

    pokedexContainer.style.display = "flex";

    let rightSlider = setInterval(() => {
      containerLeftPosition += 2;
      pokedexContainer.style.left = containerLeftPosition + "%";
      pokedexSlider.style.left = containerLeftPosition + 100 + "%";

      if (containerLeftPosition >= 0) {
        clearInterval(rightSlider);
        pokedexSlider.style.left = "95%";

        pokedexSlider.innerText = "Zamknij Pokedex";
        pokedexSlider.style.transform = "rotate(-180deg)";
        openLoop();
      }
    }, 15);
  };

  const slideLeft = () => {
    const pokedexContainer = document.getElementById("pokedexContainer");
    const pokedexSlider = document.getElementById("pokedexSlider");

    let leftSlider = setInterval(() => {
      containerLeftPosition -= 2;
      pokedexContainer.style.left = containerLeftPosition + "%";
      pokedexSlider.style.left = containerLeftPosition + 95 + "%";

      if (containerLeftPosition <= -100) {
        clearInterval(leftSlider);
        pokedexSlider.style.left = "0%";
        pokedexContainer.style.display = "none";
        pokedexSlider.innerText = "Otwórz Pokedex";
        pokedexSlider.style.transform = "rotate(0deg)";
        busy = false;
      }
    }, 15);
  };

  const openLoop = () => {
    const canvas = document.getElementById("pokedex");
    const context = canvas.getContext("2d");
    let fracPI = 0;

    const openCover = setInterval(function() {
      fracPI += 0.02;
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(pokedexInside, 0, 0);

      coverWidth = Math.abs(COVERWIDTH * Math.cos(Math.PI * fracPI));

      if (isBack) {
        coverLeftPosition = Math.abs(
          COVERWIDTH * (1 - Math.cos(Math.PI * fracPI))
        );
        context.drawImage(
          pokedexCoverBack,
          coverLeftPosition,
          0,
          coverWidth,
          542
        );

        if (fracPI >= 0.5) {
          isBack = false;
        }
      } else {
        context.drawImage(
          pokedexCoverFront,
          coverLeftPosition,
          0,
          coverWidth,
          542
        );

        if (fracPI >= 1) {
          clearInterval(openCover);

          firebase
            .storage()
            .ref(`images/${$lastPokemon}.png`)
            .getDownloadURL()
            .then(url => {
              pokemonImage.src = url;
              context.drawImage(pokemonImage, 100, 170, 150, 150);
            });

          firebase
            .firestore()
            .collection("pokemon")
            .doc(String($lastPokemon))
            .get()
            .then(resp => {
              fillDescription(resp.data());
            });

          busy = false;
        }
      }
    }, 8);
  };

  const closeLoop = () => {
    const canvas = document.getElementById("pokedex");
    const context = canvas.getContext("2d");

    let fracPI = 1;

    const closeCover = setInterval(() => {
      fracPI -= 0.02;
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(pokedexInside, 0, 0);

      coverWidth = Math.abs(COVERWIDTH * Math.cos(Math.PI * fracPI));

      if (!isBack) {
        context.drawImage(
          pokedexCoverFront,
          coverLeftPosition,
          0,
          coverWidth,
          542
        );

        if (fracPI <= 0.5) {
          isBack = true;
        }
      } else {
        coverLeftPosition = Math.abs(
          COVERWIDTH * (1 - Math.cos(Math.PI * fracPI))
        );
        context.drawImage(
          pokedexCoverBack,
          coverLeftPosition,
          0,
          coverWidth,
          542
        );

        if (fracPI <= 0) {
          clearInterval(closeCover);
          slideLeft();
        }
      }
    }, 8);
  };

  const fillDescription = data => {

      const canvas = document.getElementById("pokedex");
    const context = canvas.getContext("2d");

  let x=460;
  let y=180;
  const maxLineLengthE = 22;
  const maxLineLengthD = 25;

  context.fillStyle = "white";

  context.font = "20pt Courier New";
  context.fillText(data.name, x, y); y+=40;

  context.font = "12pt Courier New";
  context.fillText("Typ:", x, y); y+=20;
  context.fillText(data.type, x, y); y+=40;

  context.fillText("Ewolucja:", x, y); y+=20;
  for(let i=0;i<data.evolution.length;i++) {

    const wordsE = data.evolution[i].split(" ");
    let lineE = (i+1) + ". ";
    for(let j=0;j<wordsE.length;j++) {
      lineE+=wordsE[j]+" ";

      if(j===wordsE.length-1 || lineE.length+wordsE[j+1].length>maxLineLengthE) {
        context.fillText(lineE, x, y); y+=20;
        lineE="   ";
      }
    }
  } y+=20;

  context.font = "10pt Courier New";
  const wordsD = data.description.split(" ");
  let lineD = "";
  for(let i=0;i<wordsD.length;i++) {
    lineD+=wordsD[i]+" ";

    if(i===wordsD.length-1 || lineD.length+wordsD[i+1].length>maxLineLengthD) {
      context.fillText(lineD, x, y); y+=20;
      lineD="";
    }
  }

}
</script>

<style>
  .pokedex-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: -100%;
    top: 0;
    height: 100vh;
    width: 100vw;

    background-color: rgba(0, 0, 0, 0.8);

    z-index: 1;
  }

  .pokedex {
    margin: auto 0;
  }

  .pokedex-slider {
    position: fixed;

    left: 0;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;

    height: 50%;

    font-family: "Russo One", sans-serif;
    font-size: 25px;
    width: 5%;
    box-shadow: 0px 0px 0px rgba(150, 150, 150, 0.8);
    background-color: rgba(0, 0, 0, 0.8);

    color: rgba(100, 100, 100, 0.5);
    text-align: center;
    writing-mode: vertical-lr;
    z-index: 1;
  }

  .pokedex-slider--on {
      box-shadow: 0px 0px 30px rgba(150,150,150,0.8);
      color: white;
      cursor: pointer;
  }
</style>

<div>
  <section id="pokedexContainer" class="pokedex-container">
    <canvas id="pokedex" class="pokedex" width="750" height="550">
      Your browser does not support the HTML5 canvas tag.
    </canvas>

  </section>
  <section id="pokedexSlider" class="pokedex-slider" class:pokedex-slider--on={$singlePokemon} on:click={showPokedex}>
    Otwórz Pokedex
  </section>
</div>
