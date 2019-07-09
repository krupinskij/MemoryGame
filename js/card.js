function Card(playground, button, id, type, image) {

  const instance = this;

  this.playground = playground;

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
      instance.playground.clickedButtons.shift();
      instance.hidePokemonImage();
      game.lastCard = "";
      return;
    }

    instance.playground.clickedButtons.push(instance);
    instance.showPokemonImage();

    if(instance.playground.clickedButtons.length%2===0) {

      instance.playground.compare();
      game.isPair = true;
      game.lastCard = "";

    } else {
      game.isPair = false;
      game.lastCard = instance;
    }

  });

  this.showPokemonImage = function() {
    let width = CARD_SIZE;
    let fracPI = 0;
    let isShown = false;

    const showPokemonItv = setInterval(function() {

      fracPI+=0.05;
      width = Math.abs(CARD_SIZE*Math.cos(Math.PI * fracPI));

      if(!isShown) {
        instance.button.style.width = width + "px";

        if(fracPI>=0.5) {
          instance.button.style.backgroundImage = instance.image;
          isShown = true;
        }
      } else {
        instance.button.style.width = width + "px";

        if(fracPI>=1) {
          instance.button.style.width = CARD_SIZE;
          clearInterval(showPokemonItv);
        }
      }
    },5)
  }

  this.hidePokemonImage = function() {

    let width = CARD_SIZE;
    let fracPI = 0;
    let isHiden = false;

    const hidePokemonItv = setInterval(function() {

      fracPI+=0.05;
      width = Math.abs(CARD_SIZE*Math.cos(Math.PI * fracPI));

      if(!isHiden) {
        instance.button.style.width = width + "px";

        if(fracPI>=0.5) {
          instance.button.style.backgroundImage = "url(img/pokemons/back.png)";
          isHiden = true;
        }
      } else {
        instance.button.style.width = width + "px";

        if(fracPI>=1) {
          instance.button.style.width = CARD_SIZE;
          instance.busy = false;
          clearInterval(hidePokemonItv);
        }
      }
    },5)
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
