<script>
  import _ from "../../translator/Translator.js";

  import { scale } from "svelte/transition";
  import { page, lang } from "../../store/project.js";
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

  $: _logIn = _("Log In", $lang);
  $: _username = _("Username", $lang);
  $: _password = _("Password", $lang);
</script>

<div class="modal-container" transition:scale={{ duration: 500 }} on:click|self={hideModal}>
  <form class="modal bg-login" on:submit|preventDefault={login}>
    <h2 class="modal-header">{_logIn}</h2>
    <div class="modal-field">
      <label class="modal-field-label" for="username">{_username}:</label>
      <input class="modal-field-input" type="text" id="username" bind:value={username} />
    </div>
    <div class="modal-field">
      <label class="modal-field-label" for="password">{_password}:</label>
      <input class="modal-field-input" type="password" id="password" bind:value={password} />
    </div>
    <div class="modal-buttons">
      <input type="submit" class="button" value={_logIn + '!'} />
    </div>

    <div class="modal-error">{error}</div>
  </form>
</div>
