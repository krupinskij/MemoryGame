<script>

  import { scale } from 'svelte/transition';
  import { userForm } from '../store/user.js';
  import { page } from '../store/game.js';

  import firebase from "firebase";

  const hideUserForm = () => {
    userForm.set({
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
          userForm.set({
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

<div class="modal" transition:scale="{{ duration: 500 }}" on:click|self ={ hideUserForm }>
  <div class="form">
    <h2 class="form__header darken-bg">Register</h2>
    <div class="form__section darken-bg">
      <label class="form__label" for="username">Username: </label>
      <input class="form__input" type="text" id="username" bind:value={ username } />
    </div>
    <div class="form__section darken-bg">
      <label class="form__label" for="password">Password: </label>
      <input class="form__input" type="password" id="password" bind:value={ password } />
    </div>
    <div class="form__section darken-bg">
      <label class="form__label" for="repeat">Repeat password: </label>
      <input class="form__input" type="password" id="repeat" bind:value={ repeat } />
    </div>
    <button class="button form__submit" on:click={ register }>Sign Up!</button>

    <div class="form__error">{error}</div>
  </div>
</div>
