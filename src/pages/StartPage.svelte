<script>
  import { page } from "../store.js";

  import { fade } from 'svelte/transition';

  const switchPage = () => {
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
    box-shadow: 3px 5px 7px black;
    max-height: 50%;

    padding: 2% 15%;
  }
</style>

<div out:fade="{{ duration: 500 }}" class="page startpage" on:click={switchPage}>
  <img class="name" src="/img/name.png" alt="Pokemon - Memory Game" />
</div>
