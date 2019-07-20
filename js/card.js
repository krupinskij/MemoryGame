function Card(container, button, id, type, image) {

  const instance = this;

  this.container = container;

  this.button = button;
  this.id = id;

  this.type = type;
  this.image = image;

  this.visible = true;
  this.busy = false;

  this.button.addEventListener("click", () => {

    if(instance.busy) return;

    game.clickCounter++;

    if(instance===game.lastCard) {
      instance.container.clickedCards.shift();
      instance.hidePokemonImage();
      game.isPair = true;
      game.lastCard = "";

      pokedexSlider.style.boxShadow = "0px 0px 0px rgba(150,150,150,0.8)";
      pokedexSlider.style.color = "rgba(100,100,100,0.5)";
      pokedexSlider.style.cursor = "not-allowed"

      return;
    }

    instance.container.clickedCards.push(instance);
    instance.showPokemonImage();

    const pokedexSlider = document.getElementById("pokedexSlider");

    if(instance.container.clickedCards.length%2===0) {

      instance.container.compare();
      game.isPair = true;
      game.lastCard = "";

      pokedexSlider.style.boxShadow = "0px 0px 0px rgba(150,150,150,0.8)";
      pokedexSlider.style.color = "rgba(100,100,100,0.5)";
      pokedexSlider.style.cursor = "not-allowed"

    } else {
      game.isPair = false;
      game.lastCard = instance;

      pokedexSlider.style.boxShadow = "0px 0px 30px rgba(150,150,150,0.8)";
      pokedexSlider.style.color = "white";
      pokedexSlider.style.cursor = "pointer"
    }

  });

  this.showPokemonImage = function() {
    const CARD_SIZE=100;
    let width = CARD_SIZE;
    let fracPI = 0;
    let isShown = false;

    instance.button.style.height = instance.button.height + "px";

    const showPokemonItv = setInterval(function() {

      fracPI+=0.05;
      width = Math.abs(CARD_SIZE*Math.cos(Math.PI * fracPI));

      if(!isShown) {
        instance.button.style.width = width + "%";

        if(fracPI>=0.5) {
          instance.button.setAttribute("src",instance.image);
          isShown = true;
        }
      } else {
        instance.button.style.width = width + "%";

        if(fracPI>=1) {
          instance.button.style.width = "100%";
          instance.button.style.height = "auto";

          clearInterval(showPokemonItv);
        }
      }
    },10)
  }

  this.hidePokemonImage = function() {
    const CARD_SIZE=100;
    let width = CARD_SIZE;
    let fracPI = 0;
    let isHiden = false;

    console
    instance.button.style.height = instance.button.height + "px";


    const hidePokemonItv = setInterval(function() {

      fracPI+=0.05;
      width = Math.abs(CARD_SIZE*Math.cos(Math.PI * fracPI));

      if(!isHiden) {
        instance.button.style.width = width + "%";

        if(fracPI>=0.5) {
          instance.button.setAttribute("src","img/pokemons/back.png");
          isHiden = true;
        }
      } else {
        instance.button.style.width = width + "%";

        if(fracPI>=1) {
          instance.button.style.width = "100%";
          instance.button.style.height = "auto";
          instance.busy = false;
          clearInterval(hidePokemonItv);
        }
      }
    },10)
  }

  this.hideCard = function() {
    let opacity = 1;
    instance.visible = false;

    const cardFadeOutItv = setInterval(function() {
      opacity-=0.05;
      instance.button.style.opacity = opacity;

      if(opacity<=0) {
        clearInterval(cardFadeOutItv);

      }
    },10);
  }
}
