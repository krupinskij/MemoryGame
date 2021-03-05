<script>
  import { page } from "../store/project.js";

  import { fade } from 'svelte/transition';

  const switchPage = () => {
    setTimeout(() => {
      page.set("level");
    }, 500);
  };
</script>


<div out:fade="{{ duration: 500 }}" class="page" on:click={switchPage}>
  <div class="component-mid cursor-pointer">
    <img src="/img/name.png" alt="Pokemon - Memory Game" />
  </div>
</div>
