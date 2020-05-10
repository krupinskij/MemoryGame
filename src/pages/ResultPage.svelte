<script>
  import _ from "../translator/Translator.js";
  import { page } from "../store/project.js";
  import { level, clickCounter, startTime, endTime } from "../store/game.js";
  import { logged } from "../store/user.js";

  import { fade } from "svelte/transition";

  import { onMount } from "svelte";

  import firebase from "firebase";

  const switchPage = () => {
    setTimeout(() => {
      page.set("level");
    }, 500);
  };

  const getTime = (startTime, endTime) => {
    let time = endTime - startTime;

    const ms = time % 1000;
    time = Math.floor(time / 1000);

    const s = time % 60;
    time = Math.floor(time / 60);

    return `${time}m ${s}s ${ms}ms`;
  };

  const getUsername = email => {
    return email.substr(0, email.length - 8);
  }

  onMount(() => {
    if (!$logged) return;

    firebase
      .firestore()
      .collection($level)
      .add({
        user: firebase.auth().currentUser.uid,
        username: getUsername(firebase.auth().currentUser.email),
        time: $endTime - $startTime,
        clicks: $clickCounter
      });
  });
</script>

<style>
  .result-page {
    display: grid;
    grid-template-rows: 85% 15%;
    place-items: center;
  }

  .details {
    display: grid;
    grid-template-rows: 20% 15% 30% 15% 20%;
    place-items: center;

    width: 80%;
  }

  .details--normal {
    font-size: 30px;
  }

  .details--big {
    font-size: 50px;
  }

  .details--huge {
    font-size: 200px;
  }

  .newGame {
    font-size: 25px;

    padding: 1% 5%;

    cursor: pointer;
    text-decoration: underline;
  }
</style>

<div
  in:fade={{ delay: 500, duration: 1000 }}
  out:fade={{ duration: 500 }}
  class="page result-page">

  <section class="details darken-bg shadow">

    <span class="details--big">{ _("Congratulations") }!</span>
    <span class="details--normal">{ _("You've made") }:</span>
    <span class="details--huge">{$clickCounter}</span>
    <span class="details--normal">{ _("clicks") }!</span>
    <span class="details--big">
      { _("It tooks you") } {getTime($startTime, $endTime)}
    </span>
  </section>

  <section class="newGame darken-bg shadow" on:click={switchPage}>
    { _("Play once again") }!
  </section>

</div>
