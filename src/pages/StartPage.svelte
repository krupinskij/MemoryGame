<script>
  import { page } from "../store.js";
  let hide = false;

  const switchPage = () => {
    hide = true;
    setTimeout(() => {
      page.set("level");
    }, 500);
  };
</script>

<style>
  .startpage {
    display: grid;
    place-items: center;

    cursor: pointer;
  }

  .name {
    background-color: rgba(0, 0, 0, 0.5);
    max-height: 50%;

    padding: 2% 15%;
  }
</style>

<div class="page startpage" class:page--hide={hide} on:click={switchPage}>
  <img class="name" src="/img/name.png" alt="Pokemon - Memory Game" />
</div>
