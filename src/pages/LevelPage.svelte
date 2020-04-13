<style>
  .level-page {
    display: grid;
    grid-template-rows: 20% 60% 20%;
    place-items: center;
  }

  .options-container {
    display: grid;

    grid-template: 1fr 1fr 1fr 1fr / 1fr 4fr 6fr;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);
    padding: 2%;
    width: 65%;
  }

  .pointer {
    grid-column: 1/2;
    grid-row: 1/2;

    height: 50px;
    justify-self: end;

    animation: jump 0.5s linear alternate infinite;
  }

  .option {
    font-family: "Righteous", cursive;
    color: white;
    font-size: 35px;

    margin: 0 10%;
    justify-self: start;

    cursor: pointer;
  }

  .option--easy {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  .option--medium {
    grid-column: 2/3;
    grid-row: 2/3;
  }

  .option--hard {
    grid-column: 2/3;
    grid-row: 3/4;
  }

  .option--legendary {
    grid-column: 2/3;
    grid-row: 4/5;
  }

  .levelImage {
    grid-row: 1/5;
    grid-column: 3/4;

    border-radius: 15px;
    height: 20rem;
  }

  .submitLevel {
    font-size: 60px;

    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 15%;

    cursor: pointer;
    text-decoration: underline;
  }

  @keyframes jump {
    100% {
      transform: translate3d(0, -30%, 0);
    }
  }
</style>

<div class="page level-page">

  <section class="header">Wybierz poziom:</section>

  <section class="options-container">

    <img
      id="pokeball"
      class="pointer"
      src="img/pokeball.png"
      alt="Pokeball pointing choosen level" />

    <span id="easy" class="option option--easy">Łatwy</span>
    <span id="medium" class="option option--medium">Średni</span>
    <span id="hard" class="option option--hard">Trudny</span>
    <span id="legendary" class="option option--legendary">Legendarny</span>

    <img
      id="levelImage"
      class="levelImage"
      src="img/levelImages/easy.gif"
      alt="Image representing choosen level" />

  </section>

  <section id="submitLevel" class="submitLevel">Graj!</section>

</div>
