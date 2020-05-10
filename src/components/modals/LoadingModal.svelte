<script>
  import _ from "../../translator/Translator.js";
  import { imagesLoaded, imagesAll } from "../../store/images.js";

  import { fade } from "svelte/transition";
</script>

<style>

</style>

<div class="modal">
  <div class="modal__content modal__content--loading shadow">
    <h2 class="modal__header darken-bg">{ _("Loading") }...</h2>
    <div class="modal__info darken-bg">{$imagesLoaded} : {$imagesAll}</div>
  </div>
</div>
