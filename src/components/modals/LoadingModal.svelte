<script>
  import _ from "../../translator/Translator.js";

  import { lang } from "../../store/project.js" 
  import { imagesLoaded, imagesAll } from "../../store/images.js";

  import { fade } from "svelte/transition";

  $: _loading = _("Loading", $lang);
</script>

<div class="modal">
  <div class="modal__content modal__content--loading shadow">
    <h2 class="modal__header darken-bg">{ _loading }...</h2>
    <div class="modal__info darken-bg">{$imagesLoaded} : {$imagesAll}</div>
  </div>
</div>
