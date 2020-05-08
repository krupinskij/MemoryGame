<script>

  import { scale } from 'svelte/transition';
  import { userForm } from '../store/user.js';

  let hideUserForm = () => {
    userForm.set({
      visible: false
    })
  }

</script>

<style>
  
</style>

<div class="modal" transition:scale="{{ duration: 500 }}" on:click|self ={ hideUserForm }>
  <div class="form">
    <h2 class="form__header darken-bg">Register</h2>
    <div class="form__section darken-bg">
      <label class="form__label" for="username">Username: </label>
      <input class="form__input" type="text" id="username" />
    </div>
    <div class="form__section darken-bg">
      <label class="form__label" for="password">Password: </label>
      <input class="form__input" type="password" id="password" />
    </div>
    <div class="form__section darken-bg">
      <label class="form__label" for="repeat">Repeat password: </label>
      <input class="form__input" type="password" id="repeat" />
    </div>
    <button class="button form__submit">Sign Up!</button>

    <div class="form__error"></div>
  </div>
</div>
