let MAX_HOR = 4;
let MAX_VER = 4;
let CARD_SIZE = 150;
let MAX_ELEMENTS = MAX_HOR*MAX_VER;

let buttons;
let clickedButtons = [];
let pokemonButtons = [];
let images = [];

let visibleElements;
let clickCounter=0;
let opacity;

const page0 = document.getElementById("page_0");
const page1 = document.getElementById("page_1");
const page2 = document.getElementById("page_2");
const page3 = document.getElementById("page_3");

function changePages(page1, page2, display) {
  let opacity = 1;
  const pageFadeOut = setInterval(function() {
    opacity*=0.9;
    page1.style.opacity=opacity;

    if(opacity<=0.05) {
      clearInterval(pageFadeOut);
      page1.style.display="none";
      page2.style.display=display;
      showSecondPage(page2, display);
    }
  }, 10);
}

function showSecondPage(page2, display) {
  let opacity=0.01;
  const pageFadeIn = setInterval(function() {
    opacity*=1.1;
    page2.style.opacity = opacity;

    if(opacity>=1) {
      clearInterval(pageFadeIn);
    }
  }, 10)
}

function hideCards(card1, card2) {
  let opacity = 1;
  const cardFadeOutItv = setInterval(function() {
    opacity-=0.05;
    card1.style.opacity = opacity;
    card2.style.opacity = opacity;

    if(opacity<=0) {
      clearInterval(cardFadeOutItv);

    }
  },10);
}

function showPokemonImage(card) {

  let width = CARD_SIZE;
  let fracPI = 0;
  let isShown = false;

  const showPokemonItv = setInterval(function() {

    fracPI+=0.05;
    width = Math.abs(CARD_SIZE*Math.cos(Math.PI * fracPI));

    if(!isShown) {
      card.style.width = width + "px";

      if(fracPI>=0.5) {
        card.style.backgroundImage = images[card.getAttribute("id")];
        isShown = true;
      }
    } else {
      card.style.width = width + "px";

      if(fracPI>=1) {
        card.style.width = CARD_SIZE;
        clearInterval(showPokemonItv);
      }
    }
  },5)
}

function hidePokemonImage(card) {

  let width = CARD_SIZE;
  let fracPI = 0;
  let isHiden = false;

  const hidePokemonItv = setInterval(function() {

    fracPI+=0.05;
    width = Math.abs(CARD_SIZE*Math.cos(Math.PI * fracPI));

    if(!isHiden) {
      card.style.width = width + "px";

      if(fracPI>=0.5) {
        card.style.backgroundImage = "url(img/pokemons/back.png)";
        isHiden = true;
      }
    } else {
      card.style.width = width + "px";

      if(fracPI>=1) {
        card.style.width = CARD_SIZE;
        clearInterval(hidePokemonItv);
      }
    }
  },5)
}

page0.addEventListener("click", function() {
  changePages(page0, page1, "grid");
})

const levelOptions = document.querySelectorAll(".page1__levelOptions img");
let clicked = levelOptions[0];
levelOptions.forEach(elem => {
  elem.addEventListener("click", function() {
    levelOptions.forEach(elem2 => {
      elem2.classList.remove("clicked");
    })
    elem.classList.add("clicked");
    clicked = elem;
    document.getElementById("level-image").setAttribute("src", `img/homepage/${elem.getAttribute("id")}.gif`);
  });
})

function generatePlayGround(){

    CARD_SIZE = document.body.clientHeight * 0.8 / MAX_VER;

    const playGround = document.getElementById("playGround");
    playGround.style.gridTemplate = `repeat(${MAX_VER},${CARD_SIZE}px) / repeat(${MAX_HOR},${CARD_SIZE}px)`;

    for(let i=0;i<MAX_VER;i++)
    {
        for(let j=0;j<MAX_HOR;j++)
        {
            const button = document.createElement("button");
            button.className = "page2__pokemonButton";
            pokemonButtons.push(button);
            playGround.appendChild(button);
        }
    }
}

function randomImage(){
    const stack = [];
    buttons = document.querySelectorAll("#page_2 button");
    for(let i=0;i<MAX_ELEMENTS;i++)
    {
        let number = Math.floor(Math.random()*MAX_ELEMENTS);

        while(stack.includes(number)){
            number=(number+7)%MAX_ELEMENTS;
        }

        stack.push(number);

        if(number>=MAX_ELEMENTS/2){
            images[number]=`url(img/pokemons/names/${number%(MAX_ELEMENTS/2)+1}.png)`;
        } else {
            images[number]=`url(img/pokemons/images/${number+1}.png)`;
        }
        buttons[i].style.backgroundImage="url(img/pokemons/back.png)";
        buttons[i].id = number;
    }
}

document.getElementById("check").addEventListener('click', function() {

    switch(clicked.getAttribute("id")){
        case "easy": break;
        case "medium":
            MAX_HOR=6;
            break;
        case "hard":
            MAX_HOR=8;
            break;
        case "legendary":
            MAX_HOR=12;
            MAX_VER=6;
            SIZE=100;
    }

    changePages(page1,page2,"grid");

    MAX_ELEMENTS = MAX_HOR*MAX_VER;
    visibleElements=MAX_ELEMENTS;
    generatePlayGround();
    randomImage();


    pokemonButtons.forEach(elem => {
      elem.addEventListener('click', function() {
        clickedButtons.push(elem);
        clickCounter++;
        showPokemonImage(elem);

        if(clickedButtons.length%2==0){

            setTimeout(function() {
                if(clickedButtons[0]!==clickedButtons[1] &&
                    clickedButtons[0].getAttribute("id")%(MAX_ELEMENTS/2)==clickedButtons[1].getAttribute("id")%(MAX_ELEMENTS/2)) {

                hideCards(clickedButtons[0], clickedButtons[1]);

                visibleElements-=2;

                if(visibleElements==0){

                  changePages(page2, page3, "grid")
                  document.getElementById("count").innerText = clickCounter;
                }
            }

            hidePokemonImage(clickedButtons[0]);
            hidePokemonImage(clickedButtons[1]);
            clickedButtons.shift();
            clickedButtons.shift();

            },1000);


        }
      })
    })
})
