<script>
	import Translate from "../i18n/components/Translate.svelte";
  import Page from "../components/Page.svelte";
  import LevelOption from "../components/LevelOption.svelte";
  
  import { page } from "../store/project.js"; 
  import { level } from "../store/game.js";

  let options = [
    {
      name: 'easy',
      selected: true,
      token: 'LEVEL_PAGE__EASY'
    },
    {
      name: 'medium',
      selected: false,
      token: 'LEVEL_PAGE__MEDIUM'
    },
    {
      name: 'hard',
      selected: false,
      token: 'LEVEL_PAGE__HARD'
    },
    {
      name: 'legendary',
      selected: false,
      token: 'LEVEL_PAGE__LEGENDARY'
    },
  ]

  let currentImage = 'img/levelImages/easy.gif';
  const setLevel = newLevel => {
    level.set(newLevel);

    currentImage = `img/levelImages/${newLevel}.gif`
    options = options.map(option => {
      return {
        ...option,
        selected: option.name === newLevel
      }
    })
  };

  const switchPage = () => {
    setTimeout(() => {
      page.set("game");
    }, 500);
  };

</script>

<Page fadeIn="{{ delay: 500, duration: 1000 }}" fadeOut="{{ duration: 500 }}">

  <section class="component lg:w-3/4 p-6 rounded-lg flex flex-col-reverse lg:flex-row items-center justify-evenly">
    <div class="flex flex-col items-center p-2">
      {#each options as option}
        <LevelOption 
          onClick={() => setLevel(option.name)} 
          selected={option.selected}
        >
          <Translate token={option.token}></Translate>
        </LevelOption>
      {/each}
    </div>

    <img
      class="rounded"
      src={currentImage}
      alt="Choosen level" 
    />

  </section>

  <section class="component w-1/2 p-6 rounded-lg flex items-center justify-center cursor-pointer text-6xl underline" on:click={switchPage}>
    <Translate token="LEVEL_PAGE__PLAY"></Translate>!
  </section>

</Page>
