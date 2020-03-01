const COVERWIDTH = 379;

const canvas = document.getElementById("pokedex");
const context = canvas.getContext("2d");


const pokedexInside = document.getElementById("pokedexInside");
const pokedexCoverBack = document.getElementById("pokedexCoverBack");
const pokedexCoverFront = document.getElementById("pokedexCoverFront");
const pokedexPokemon = document.getElementById("pokedexPokemon");


const pokedexSlider = document.getElementById("pokedexSlider");
const pokedexContainer= document.getElementById("pokedexContainer");

let containerLeftPosition = -100;
let isHiden = true;

let coverLeftPosition = 2;
let coverWidth = 379;

let opened = false;
let busy = false;

let isBack = true;

context.drawImage(pokedexInside, 0,0);
context.drawImage(pokedexCoverBack, 0,0);

function fillDescription(data){

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



function openLoop() {

  let fracPI = 0;

  const card = game.lastCard;
  const pokemonNumber = card.id;
  pokedexPokemon.setAttribute("src", "img/pokemons/images/"+(pokemonNumber)+".png");

  const openCover = setInterval(function() {

    fracPI+=0.02;
    context.clearRect(0,0,canvas.width,canvas.height);

    context.drawImage(pokedexInside, 0,0);

    coverWidth = Math.abs(COVERWIDTH*Math.cos(Math.PI * fracPI));

    if(isBack) {

      coverLeftPosition = Math.abs(COVERWIDTH*(1-Math.cos(Math.PI * fracPI)));
      context.drawImage(pokedexCoverBack, coverLeftPosition, 0, coverWidth, 542 );

      if(fracPI>=0.5) {
        isBack=false;
      }

    } else {
      context.drawImage(pokedexCoverFront, coverLeftPosition, 0, coverWidth, 542 );

      if(fracPI>=1) {
        clearInterval(openCover);

        context.drawImage(pokedexPokemon, 100, 170, 150, 150 );

        fetch("http://" + document.domain + ":" + location.port + "/json/pokemon_data.json")
        .then(resp => resp.json())
        .then(pokemons => {
          fillDescription(pokemons[pokemonNumber-1]);
        })

        busy=false;
      }
  }
}, 8);

}

function closeLoop() {

  let fracPI = 1;

  const closeCover = setInterval(function() {
    fracPI-=0.02;
    context.clearRect(0,0,canvas.width,canvas.height);

    context.drawImage(pokedexInside, 0,0);

    coverWidth = Math.abs(COVERWIDTH*Math.cos(Math.PI * fracPI));

    if(!isBack) {

      context.drawImage(pokedexCoverFront, coverLeftPosition, 0, coverWidth, 542 );

      if(fracPI<=0.5) {
        isBack=true;
      }

    } else {
      coverLeftPosition = Math.abs(COVERWIDTH*(1-Math.cos(Math.PI * fracPI)));
      context.drawImage(pokedexCoverBack, coverLeftPosition, 0, coverWidth, 542 );

      if(fracPI<=0) {
        clearInterval(closeCover);
        slideLeft();

      }
    }
  }, 8);

}


function slideRight() {

  pokedexContainer.style.display="flex";

  let rightSlider = setInterval(function() {

    containerLeftPosition+=2;
    pokedexContainer.style.left = containerLeftPosition+"%";
    pokedexSlider.style.left = (containerLeftPosition+100)+"%";

    if(containerLeftPosition>=0) {
      clearInterval(rightSlider);
      pokedexSlider.style.left = "95%";

      pokedexSlider.innerText = "Zamknij Pokedex";
      pokedexSlider.style.transform = "rotate(-180deg)";
      openLoop();
    }
  }, 15)
}

function slideLeft() {
  let leftSlider = setInterval(function() {

    containerLeftPosition-=2;
    pokedexContainer.style.left = containerLeftPosition+"%";
    pokedexSlider.style.left = (containerLeftPosition+95)+"%";

    if(containerLeftPosition<=-100) {
      clearInterval(leftSlider);
      pokedexSlider.style.left = "0%";
      pokedexContainer.style.display="none";
      pokedexSlider.innerText = "Otwórz Pokedex"
      pokedexSlider.style.transform = "rotate(0deg)";
      busy = false;
    }
  }, 15)
}

pokedexSlider.addEventListener("click", function() {

  if(game.isPair) return;
  if(busy) return;
  busy = true;

  if(isHiden) slideRight();
  else closeLoop();

  isHiden = !isHiden;
});
