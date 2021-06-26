<script>
	import Translate from "../../i18n/components/Translate.svelte";
  import Modal from "../modal/Modal.svelte";
  import ModalHeader from "../modal/ModalHeader.svelte";
  import ModalField from "../modal/ModalField.svelte";
  import ModalButtons from "../modal/ModalButtons.svelte";
  import ModalError from "../modal/ModalError.svelte";
  import Button from "../button/Button.svelte";

  import { page } from "../../store/project.js";
  import { modal } from "../../store/modal.js";

  import firebase from "firebase";
  import "firebase/auth";

  let error = "";
  let username = "";
  let password = "";

  const login = () => {
    error = "";
    firebase
      .auth()
      .signInWithEmailAndPassword(username + "@pmg.com", password)
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
  <form on:submit|preventDefault={login}>
    <ModalHeader>
      <Translate token="LOGIN_MODAL__SIGN_IN"></Translate>
    </ModalHeader>

    <ModalField name="username" bind:value={username}>
      <Translate token="LOGIN_MODAL__USERNAME"></Translate>:
    </ModalField>
    <ModalField name="password" bind:value={password} type="password">
      <Translate token="REGISTER_MODAL__PASSWORD"></Translate>: 
    </ModalField>

    <ModalButtons>
      <Button>
        <Translate token="LOGIN_MODAL__SIGN_IN"></Translate>!
      </Button>
    </ModalButtons>

    <ModalError error={error}></ModalError>
  </form>
</Modal>
