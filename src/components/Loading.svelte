<script>
  import { imagesLoaded, imagesAll } from "../store.js";

  import { fade } from 'svelte/transition';
</script>

<div class="loading">
  <div class="modal">Loading... {$imagesLoaded} : {$imagesAll}</div>
</div>

<style>
  .loading {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;

    background-color: rgba(0,0,0,0.5);

    display: grid;
    place-items: center;
  }
</style>
