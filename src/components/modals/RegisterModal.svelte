<script>

  import { scale } from 'svelte/transition';
  import { modal } from '../../store/modal.js';
  import { page } from '../../store/project.js';

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

</script>

<style>
  
</style>

<div class="modal" transition:scale="{{ duration: 500 }}" on:click|self ={ hideModal }>
  <form class="modal__content modal__content--register shadow" on:click|preventDefault={ register }>
    <h2 class="modal__header darken-bg">Register</h2>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="username">Username: </label>
      <input class="modal__input" type="text" id="username" bind:value={ username } />
    </div>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="password">Password: </label>
      <input class="modal__input" type="password" id="password" bind:value={ password } />
    </div>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="repeat">Repeat password: </label>
      <input class="modal__input" type="password" id="repeat" bind:value={ repeat } />
    </div>
    <input type="submir" class="button modal__submit" value="Sign Up!"/>

    <div class="modal__error">{error}</div>
  </form>
</div>
