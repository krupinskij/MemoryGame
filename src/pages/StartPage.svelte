<script>
  import Page from "./../components/Page.svelte";
  import { page } from "../store/project.js";

  const switchPage = () => {
    setTimeout(() => {
      page.set("level");
    }, 500);
  };
</script>


<Page fadeOut={{ duration: 500 }} onClick={ switchPage }>
  <div class="component w-2/3 p-6 rounded-lg flex items-center justify-center cursor-pointer">
    <img src="/img/name.png" alt="Pokemon - Memory Game" />
  </div>
</Page>
