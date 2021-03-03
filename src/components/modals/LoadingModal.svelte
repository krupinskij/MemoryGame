<script>
  import _ from "../../translator/Translator.js";

  import { lang } from "../../store/project.js" 
  import { imagesLoaded, imagesAll } from "../../store/images.js";

  $: _loading = _("Loading", $lang);
</script>

<div class="modal-container">
  <div class="modal bg-loading">
    <h2 class="modal-header">{ _loading }...</h2>
    <div class="modal-info">{$imagesLoaded} : {$imagesAll}</div>
  </div>
</div>
