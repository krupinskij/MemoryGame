<script>
	import Translate from "../../i18n/components/Translate.svelte";
  import Modal from "../modal/Modal.svelte";
  import ModalHeader from "../modal/ModalHeader.svelte";
  import ModalInfo from "../modal/ModalInfo.svelte";
  
  import { imagesLoaded, imagesAll } from "../../store/images.js";
</script>

<Modal background="bg-loading">
  <ModalHeader>
    <Translate token="LOADING_MODAL__LOADING"></Translate>...
  </ModalHeader>

  <ModalInfo>{$imagesLoaded} : {$imagesAll}</ModalInfo>
</Modal>
