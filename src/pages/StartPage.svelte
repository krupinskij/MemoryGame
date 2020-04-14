<script>
  import { page } from "../store.js";
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

<div class="page startpage" on:click={ () => { page.set("level") } }>
  <img class="name" src="/img/name.png" alt="Pokemon - Memory Game" />
</div>
