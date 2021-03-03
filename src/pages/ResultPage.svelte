<script>
  import _ from "../translator/Translator.js";
  import { page, lang } from "../store/project.js";
  import { level, clickCounter, startTime, endTime } from "../store/game.js";
  import { logged } from "../store/user.js";

  import { fade } from "svelte/transition";

  import { onMount } from "svelte";

  import firebase from "firebase";
  import "firebase/firestore";
  import "firebase/auth";

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

  $: _congratulations = _("Congratulations", $lang);
  $: _youveMade = _("You've made", $lang);
  $: _clicks = _("clicks", $lang);
  $: _itTooksYou = _("It tooks you", $lang);
  $: _playOnceAgain = _("Play once again", $lang);
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
  class="page">

    <section class="component-wide text-5xl">{ _congratulations }!</section>
    <section class="component-mid flex-col">
      <div class="text-3xl">{ _youveMade }:</div>
      <div class="text-9xl">{$clickCounter}</div>
      <div class="text-3xl">{ _clicks }!</div>
    </section>
    <section class="component-wide text-4xl">
      { _itTooksYou } {getTime($startTime, $endTime)}
    </section>

  <section class="component-narrow cursor-pointer text-4xl underline" on:click={switchPage}>
    { _playOnceAgain }!
  </section>

</div>
