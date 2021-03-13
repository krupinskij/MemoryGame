<script>
	import Translate from "../../i18n/components/Translate.svelte";

  import { scale } from "svelte/transition";
  import { page } from "../../store/project.js";
  import { modal } from "../../store/modal.js";

  import firebase from "firebase";
  import "firebase/auth";

  const hideModal = () => {
    modal.set({
      visible: false
    });
  };

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

<div class="modal-container" transition:scale={{ duration: 500 }} on:click|self={hideModal}>
  <form class="modal bg-login" on:submit|preventDefault={login}>
    <h2 class="modal-header"><Translate token="LOGIN_MODAL__SIGN_IN"></Translate></h2>
    <div class="modal-field">
      <label class="modal-field-label" for="username"><Translate token="LOGIN_MODAL__USERNAME"></Translate>:</label>
      <input class="modal-field-input" type="text" id="username" bind:value={username} />
    </div>
    <div class="modal-field">
      <label class="modal-field-label" for="password"><Translate token="LOGIN_MODAL__PASSWORD"></Translate>:</label>
      <input class="modal-field-input" type="password" id="password" bind:value={password} />
    </div>
    <div class="modal-buttons">
      <button class="button">
        <Translate token="LOGIN_MODAL__SIGN_IN"></Translate>!
      </button>
    </div>

    <div class="modal-error">{error}</div>
  </form>
</div>
