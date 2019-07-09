const levels = new Map();

levels.set("easy", {
  verticalLength: 4,
  horizontalLength: 4,
  species: 8
});

levels.set("medium", {
  verticalLength: 4,
  horizontalLength: 6,
  species: 12
});

levels.set("hard", {
  verticalLength: 4,
  horizontalLength: 8,
  species: 16
});

levels.set("legendary", {
  verticalLength: 6,
  horizontalLength: 12,
  species: 36
});

const game = {
  speciesCounter: 151,
  clickCounter: 0,

  level: levels.get("easy"),

  lastCard: "",
  isPair: true,

  startGame: function() {
    const levelOptions = document.querySelectorAll(".page1__levelOptions img");
    let clicked = levelOptions[0];

    levelOptions.forEach(elem => {
      elem.addEventListener("click", function() {
        clicked.classList.remove("clicked");
        elem.classList.add("clicked");

        clicked = elem;

        game.level = levels.get(elem.getAttribute("id"));
        document.getElementById("level-image").setAttribute("src", `img/homepage/${elem.getAttribute("id")}.gif`);
      });

    })

    document.getElementById("check").addEventListener('click', function() {
      changePages(page1,page2,"grid");

      const playground = new Playground("playGround");
      playground.generateButtons();
      playground.createCardsAll();
    });
  },
}


const page0 = document.getElementById("page_0");
const page1 = document.getElementById("page_1");
const page2 = document.getElementById("page_2");
const page3 = document.getElementById("page_3");

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
