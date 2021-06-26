<script>
	import Translate from "../../i18n/components/Translate.svelte";
  import Modal from "../modal/Modal.svelte";
  import ModalHeader from "../modal/ModalHeader.svelte";
  import ModalField from "../modal/ModalField.svelte";
  import ModalButtons from "../modal/ModalButtons.svelte";
  import ModalError from "../modal/ModalError.svelte";
  import Button from "../button/Button.svelte";

  import { modal } from '../../store/modal.js';
  import { page } from '../../store/project.js';

  import firebase from "firebase";
  import "firebase/auth";

  let error = "";
  let username = "";
  let password = "";
  let repeat = "";

  const register = () => {
    error = "";

    if(password !== repeat) {
      error = "Repeated password doesn't match";
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(username + "@pmg.com", password)
      .then(
        user => {
          modal.set({
            visible: false
          });
          page.set("start");
        },
        err => {
          error = err.message;
        }
      );
  };

</script>

<Modal background="bg-register">
  <form on:submit|preventDefault={ register }>
    <ModalHeader>
      <Translate token="REGISTER_MODAL__SIGN_UP"></Translate>
    </ModalHeader>

    <ModalField name="username" bind:value={username}>
      <Translate token="REGISTER_MODAL__USERNAME"></Translate>: 
    </ModalField>
    <ModalField name="password" bind:value={password} type="password">
      <Translate token="REGISTER_MODAL__PASSWORD"></Translate>: 
    </ModalField>
    <ModalField name="repeat" bind:value={repeat} type="password">
      <Translate token="REGISTER_MODAL__REPEAT_PASSWORD"></Translate>: 
    </ModalField>

    <ModalButtons>
      <Button>
        <Translate token="REGISTER_MODAL__SIGN_UP"></Translate>!
      </Button>
    </ModalButtons>

    <ModalError error={error}></ModalError>
  </form>
</Modal>
