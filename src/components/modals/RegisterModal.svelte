<script>
  import _ from "../../translator/Translator.js";

  import { scale } from 'svelte/transition';
  import { modal } from '../../store/modal.js';
  import { page, lang } from '../../store/project.js';

  import firebase from "firebase";

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

<div class="modal" transition:scale="{{ duration: 500 }}" on:click|self ={ hideModal }>
  <form class="modal__content modal__content--register shadow" on:click|preventDefault={ register }>
    <h2 class="modal__header darken-bg">{ _register }</h2>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="username">{ _username }: </label>
      <input class="modal__input" type="text" id="username" bind:value={ username } />
    </div>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="password">{ _password }: </label>
      <input class="modal__input" type="password" id="password" bind:value={ password } />
    </div>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="repeat">{ _repeatPassword }: </label>
      <input class="modal__input" type="password" id="repeat" bind:value={ repeat } />
    </div>
    <input type="submit" class="button modal__submit" value={ _signUp + "!"}/>

    <div class="modal__error">{error}</div>
  </form>
</div>
