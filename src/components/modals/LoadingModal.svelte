<script>
	import Translate from "../../i18n/components/Translate.svelte";
  import { imagesLoaded, imagesAll } from "../../store/images.js";
</script>

<div class="modal-container">
  <div class="modal bg-loading">
    <h2 class="modal-header"><Translate token="LOADING_MODAL__LOADING"></Translate>...</h2>
    <div class="modal-info">{$imagesLoaded} : {$imagesAll}</div>
  </div>
</div>
