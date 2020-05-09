<script>
  import { scale } from "svelte/transition";
  import { page } from "../../store/project.js";
  import { modal } from "../../store/modal.js";

  import firebase from "firebase";

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

<div class="modal" transition:scale="{{ duration: 500 }}" on:click|self ={ hideModal }>
  <form class="modal__content modal__content--login shadow" on:submit|preventDefault={login}>
    <h2 class="modal__header darken-bg">Log in</h2>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="username">Username:</label>
      <input
        class="modal__input"
        type="text"
        id="username"
        bind:value={username} />
    </div>
    <div class="modal__section darken-bg">
      <label class="modal__label" for="password">Password:</label>
      <input
        class="modal__input"
        type="password"
        id="password"
        bind:value={password} />
    </div>
    <input type="submit" class="button modal__submit" value="Log In!">

    <div class="modal__error">{error}</div>
  </form>
</div>
