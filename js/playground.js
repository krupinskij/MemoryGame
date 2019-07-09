function Playground(selector) {

  const instance = this;

  this.verticalLength = game.level.verticalLength;
  this.horizontalLength = game.level.horizontalLength;
  this.visibleElements = game.level.species*2;

  this.playGround = document.getElementById(selector);

  const buttons = [];
  const cards = [];
  this.clickedButtons = [];

  this.generateButtons = function() {

    CARD_SIZE = document.body.clientHeight * 0.8 / instance.verticalLength;

    instance.playGround.style.gridTemplate = `repeat(${this.verticalLength},${CARD_SIZE}px) / repeat(${this.horizontalLength},${CARD_SIZE}px)`;

    for(let i=0; i<this.verticalLength; i++) {
      for(let j=0; j<this.horizontalLength; j++) {

        const button = document.createElement("button");
        button.className = "page2__pokemonButton";
        button.style.backgroundImage = "url(img/pokemons/back.png)";
        this.playGround.appendChild(button);

        buttons.push(button);
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

      idSet.add(id);

      ///

      let position = Math.floor(Math.random() * buttons.length);

      while(positionSet.has(position)) {
        position = (position + 7) % buttons.length;
      }

      positionSet.add(position);

      cards[position] = new Card(instance, buttons[position], id+1, "image", `url(img/pokemons/images/${id+1}.png)`)

      ///

      position = Math.floor(Math.random() * buttons.length);

      while(positionSet.has(position)) {
        position = (position + 7) % buttons.length;
      }

      positionSet.add(position);

      cards[position] = new Card(instance, buttons[position], id+1, "name", `url(img/pokemons/names/${id+1}.png)`)

    }
  };

  this.compare = function() {
    instance.clickedButtons[0].busy = true;
    instance.clickedButtons[1].busy = true;

    setTimeout(function() {

      if(instance.clickedButtons[0]!==instance.clickedButtons[1] && instance.clickedButtons[0].id==instance.clickedButtons[1].id) {

        instance.clickedButtons[0].hideCard();
        instance.clickedButtons[1].hideCard();

        instance.visibleElements-=2;

        if(instance.visibleElements==0){

          changePages(page2, page3, "grid")
          document.getElementById("count").innerText = game.clickCounter;
        }
    }

    instance.clickedButtons[0].hidePokemonImage();
    instance.clickedButtons[1].hidePokemonImage();
    instance.clickedButtons.shift();
    instance.clickedButtons.shift();

    },1000);
  }
}
