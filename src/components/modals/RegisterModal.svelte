<script>
  import _ from "../../translator/Translator.js";

  import { scale } from 'svelte/transition';
  import { modal } from '../../store/modal.js';
  import { page, lang } from '../../store/project.js';

  import firebase from "firebase";
  import "firebase/auth";

  const hideModal = () => {
    modal.set({
      visible: false
    })
  }

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

  $: _register = _("Register", $lang);
  $: _username = _("Username", $lang);
  $: _password = _("Password", $lang);
  $: _repeatPassword = _("Repeat password", $lang);
  $: _signUp = _("Sign Up", $lang);

</script>

<div class="modal-container" transition:scale="{{ duration: 500 }}" on:click|self ={ hideModal }>
  <form class="modal bg-register" on:click|preventDefault={ register }>
    <h2 class="modal-header">{ _register }</h2>
    <div class="modal-field">
      <label class="modal-field-label" for="username">{ _username }: </label>
      <input class="modal-field-input" type="text" id="username" bind:value={ username } />
    </div>
    <div class="modal-field">
      <label class="modal-field-label" for="password">{ _password }: </label>
      <input class="modal-field-input" type="password" id="password" bind:value={ password } />
    </div>
    <div class="modal-field">
      <label class="modal-field-label" for="repeat">{ _repeatPassword }: </label>
      <input class="modal-field-input" type="password" id="repeat" bind:value={ repeat } />
    </div>
    <div class="modal-buttons">
      <input type="submit" class="button" value={ _signUp + "!"}/>
    </div>

    <div class="modal-error">{error}</div>
  </form>
</div>
