function GameContainer(selector) {

  const instance = this;

  this.verticalLength = game.level.verticalLength;
  this.horizontalLength = game.level.horizontalLength;
  this.visibleElements = game.level.species*2;

  this.container = document.getElementById(selector);

  const pokemonImages = [];
  const cards = [];
  this.clickedCards = [];

  this.generateImages = function() {

    instance.container.innerHTML = "";

    instance.container.style.gridTemplate = `repeat(${this.verticalLength},1fr) / repeat(${this.horizontalLength},1fr)`;
    instance.container.style.maxWidth = game.level.gameContainerWidth + "%";

    for(let i=0; i<this.verticalLength; i++) {
      for(let j=0; j<this.horizontalLength; j++) {

        const image = document.createElement("img");
        image.className = "page2_pokemonImage";
        image.setAttribute("src","img/pokemons/back.png");
        instance.container.appendChild(image);

        pokemonImages.push(image);
      }
    }
  }

  this.createCardsAll = function() {

    const idSet = new Set();
    const positionSet = new Set();

    for(let i=0; i<game.level.species; i++) {

      let id = Math.floor(Math.random() * game.speciesCounter);

      while(idSet.has(id)) {
        id = (id + 7) % game.speciesCounter;
      }

      ///

      idSet.add(id);

      let position = Math.floor(Math.random() * pokemonImages.length);

      while(positionSet.has(position)) {
        position = (position + 7) % pokemonImages.length;
      }

      positionSet.add(position);

      cards[position] = new Card(instance, pokemonImages[position], id+1, "image", `img/pokemons/images/${id+1}.png`)

      ///

      position = Math.floor(Math.random() * pokemonImages.length);

      while(positionSet.has(position)) {
        position = (position + 7) % pokemonImages.length;
      }

      positionSet.add(position);

      cards[position] = new Card(instance, pokemonImages[position], id+1, "name", `img/pokemons/names/${id+1}.png`)

    }
  };

  this.compare = function() {
    instance.clickedCards[0].busy = true;
    instance.clickedCards[1].busy = true;

    setTimeout(function() {

      if(instance.clickedCards[0]!==instance.clickedCards[1] && instance.clickedCards[0].id==instance.clickedCards[1].id) {

        instance.clickedCards[0].hideCard();
        instance.clickedCards[1].hideCard();

        instance.visibleElements-=2;

        if(instance.visibleElements==0){

          changePages(page2, page3, "grid")
          document.getElementById("count").innerText = game.clickCounter;
        }
      }

      instance.clickedCards[0].hidePokemonImage();
      instance.clickedCards[1].hidePokemonImage();
      instance.clickedCards.shift();
      instance.clickedCards.shift();

    },1000);
  }
}
