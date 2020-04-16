<script>
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

  const showPokedex = () => {
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

    //const card = game.lastCard;
    //const pokemonNumber = card.id;
    //pokedexPokemon.setAttribute("src", "img/pokemons/images/"+(pokemonNumber)+".png");

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

          // context.drawImage(pokedexPokemon, 100, 170, 150, 150 );

          // fetch("http://" + document.domain + ":" + location.port + "/json/pokemon_data.json")
          // .then(resp => resp.json())
          // .then(pokemons => {
          //   fillDescription(pokemons[pokemonNumber-1]);
          // })

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
</script>

<style>
  .pokedex-container {

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: -100%;
    top:0;
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

    cursor: not-allowed;
  }
</style>

<div>
  <section id="pokedexContainer" class="pokedex-container">
    <canvas id="pokedex" class="pokedex" width="750" height="550">
      Your browser does not support the HTML5 canvas tag.
    </canvas>

  </section>
  <section id="pokedexSlider" class="pokedex-slider" on:click={showPokedex}>
    Otwórz Pokedex
  </section>
</div>
