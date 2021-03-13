<script>
	import Translate from "../i18n/components/Translate.svelte";

  import { page } from "../store/project.js";
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

    const ms = Math.floor(time % 1000);
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

<div
  in:fade={{ delay: 500, duration: 1000 }}
  out:fade={{ duration: 500 }}
  class="page">

    <section class="component-wide text-5xl"><Translate token="RESULT_PAGE__CONGRATULATIONS"></Translate>!</section>
    <section class="component-mid flex-col">
      <div class="text-3xl"><Translate token="RESULT_PAGE__YOUVE_MADE"></Translate>:</div>
      <div class="text-9xl">{$clickCounter}</div>
      <div class="text-3xl"><Translate token="RESULT_PAGE__CLICKS"></Translate>!</div>
    </section>
    <section class="component-wide text-4xl">
      <Translate token="RESULT_PAGE__IT_TOOKS_YOU"></Translate> { getTime($startTime, $endTime) }
    </section>

  <section class="component-narrow cursor-pointer text-4xl underline" on:click={switchPage}>
    <Translate token="RESULT_PAGE__PLAY_AGAIN"></Translate>!
  </section>

</div>
