<script>
  import _ from "../../translator/Translator.js";

  import { lang } from "../../store/project.js";
  import { lastPokemon } from "../../store/pokemons.js";
  import { modal } from "../../store/modal.js";
  import { scale } from "svelte/transition";

  import { onMount } from "svelte";

  import firebase from "firebase";
  const COVERWIDTH = 379;

  let coverLeftPosition = 2;
  let coverWidth = 379;

  let isBack = true;

  const pokedexInside = new Image();
  pokedexInside.src = "img/pokedex/pokedex_inside.png";
  const pokedexCoverBack = new Image();
  pokedexCoverBack.src = "img/pokedex/pokedex_cover_back.png";
  const pokedexCoverFront = new Image();
  pokedexCoverFront.src = "img/pokedex/pokedex_cover_front.png";

  let pokemonImage = new Image();
  let pokemonData;

  const hidePokedex = () => {
    closeLoop();
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
            .collection(`pokemon-${$lang}`)
            .doc(String($lastPokemon))
            .get()
            .then(resp => {
              fillDescription(resp.data());
            });
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
          modal.set({
            visible: false
          });
        }
      }
    }, 8);
  };

  const fillDescription = data => {
    const canvas = document.getElementById("pokedex");
    const context = canvas.getContext("2d");

    let x = 460;
    let y = 180;
    const maxLineLengthE = 22;
    const maxLineLengthD = 25;

    context.fillStyle = "white";

    context.font = "20pt Courier New";
    context.fillText(data.name, x, y);
    y += 40;

    context.font = "12pt Courier New";
    context.fillText(_type + ":", x, y);
    y += 20;
    context.fillText(data.type, x, y);
    y += 40;

    context.fillText(_evolution + ":", x, y);
    y += 20;
    for (let i = 0; i < data.evolution.length; i++) {
      const wordsE = data.evolution[i].split(" ");
      let lineE = i + 1 + ". ";
      for (let j = 0; j < wordsE.length; j++) {
        lineE += wordsE[j] + " ";

        if (
          j === wordsE.length - 1 ||
          lineE.length + wordsE[j + 1].length > maxLineLengthE
        ) {
          context.fillText(lineE, x, y);
          y += 20;
          lineE = "   ";
        }
      }
    }
    y += 20;

    context.font = "10pt Courier New";
    const wordsD = data.description.split(" ");
    let lineD = "";
    for (let i = 0; i < wordsD.length; i++) {
      lineD += wordsD[i] + " ";

      if (
        i === wordsD.length - 1 ||
        lineD.length + wordsD[i + 1].length > maxLineLengthD
      ) {
        context.fillText(lineD, x, y);
        y += 20;
        lineD = "";
      }
    }
  };

  onMount(() => {
    setTimeout(openLoop, 500);
  });

  $: _type = _("Type", $lang);
  $: _evolution = _("Evolution", $lang);
</script>

<style>
  .pokedex {
    margin: auto 0;
  }
</style>

<div
  class="modal"
  transition:scale={{ duration: 500 }}
  on:click|self={hidePokedex}>
  <canvas id="pokedex" class="pokedex" width="750" height="550">
    Your browser does not support the HTML5 canvas tag.
  </canvas>
</div>
