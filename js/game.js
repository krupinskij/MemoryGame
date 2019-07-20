const levels = new Map();

levels.set("easy", {
  verticalLength: 4,
  horizontalLength: 4,
  species: 8,

  gameContainerWidth: 35,
  gridRow: "1/2"
});

levels.set("medium", {
  verticalLength: 4,
  horizontalLength: 6,
  species: 12,

  gameContainerWidth: 55,
  gridRow: "2/3"
});

levels.set("hard", {
  verticalLength: 4,
  horizontalLength: 8,
  species: 16,

  gameContainerWidth: 75,
  gridRow: "3/4"
});

levels.set("legendary", {
  verticalLength: 6,
  horizontalLength: 12,
  species: 36,

  gameContainerWidth: 75,
  gridRow: "4/5"
});

const game = {
  speciesCounter: 151,
  clickCounter: 0,

  level: levels.get("easy"),

  lastCard: "",
  isPair: true,

  startGame: function() {
    const levelOptions = document.querySelectorAll(".page1_option");
    const pointer = document.getElementById("pokeball");
    let clicked = levelOptions[0];

    levelOptions.forEach(elem => {
      elem.addEventListener("click", function() {

        game.level = levels.get(elem.getAttribute("id"));
        document.getElementById("levelImage").setAttribute("src", `img/levelImages/${elem.getAttribute("id")}.gif`);
        pointer.style.gridRow = game.level.gridRow;

      });

    })

    document.getElementById("submitLevel").addEventListener('click', function() {
      changePages(page1,page2,"grid");

      const gameContainer = new GameContainer("gameContainer");
      gameContainer.generateImages();
      gameContainer.createCardsAll();
    });
  },

  resetGame: function() {
    game.clickCounter = 0;
    game.level = levels.get("easy");

    document.getElementById("pokeball").style.gridRow = "1/2";
    document.getElementById("levelImage").setAttribute("src", `img/levelImages/easy.gif`);

    changePages(page3, page1, "grid");

  }
}


const page0 = document.getElementById("gameStartScreen");
const page1 = document.getElementById("levelSelectScreen");
const page2 = document.getElementById("gameContainerScreen");
const page3 = document.getElementById("resultScreen");

function changePages(page1, page2, display) {
  let opacity = 1;
  const pageFOutIntv = setInterval(function() {
    opacity*=0.9;
    page1.style.opacity=opacity;

    if(opacity<=0.05) {
      clearInterval(pageFOutIntv);

      page1.style.display="none";
      page2.style.display=display;

      showSecondPage(page2, display);
    }
  }, 10);
}

function showSecondPage(page2, display) {
  let opacity=0.01;
  const pageFInIntv = setInterval(function() {
    opacity*=1.1;
    page2.style.opacity = opacity;

    if(opacity>=1) {
      clearInterval(pageFInIntv);
    }
  }, 10)
}


game.startGame();

page0.addEventListener("click", function() {
  changePages(page0, page1, "grid");
})

document.getElementById("newGameButton").addEventListener("click", function() {
  game.resetGame();
  game.startGame();
})
