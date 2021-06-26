<script>
	import Translate from "../i18n/components/Translate.svelte";
  import Page from "../components/Page.svelte";

  import { page } from "../store/project.js";
  import { level, clickCounter, startTime, endTime } from "../store/game.js";
  import { logged } from "../store/user.js";

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

<Page
  fadeIn={{ delay: 500, duration: 1000 }}
  fadeOut={{ duration: 500 }}
>

  <section class="component w-11/12 p-6 rounded-lg grid items-center justify-center text-5xl">
    <Translate token="RESULT_PAGE__CONGRATULATIONS"></Translate>!
  </section>

  <section class="component w-2/3 p-6 rounded-lg flex items-center justify-center flex-col">
    <div class="text-3xl"><Translate token="RESULT_PAGE__YOUVE_MADE"></Translate>:</div>
    <div class="text-9xl">{$clickCounter}</div>
    <div class="text-3xl"><Translate token="RESULT_PAGE__CLICKS"></Translate>!</div>
  </section>
  <section class="component w-11/12 p-6 rounded-lg grid items-center justify-center text-4xl">
    <Translate token="RESULT_PAGE__IT_TOOKS_YOU"></Translate> { getTime($startTime, $endTime) }
  </section>

  <section class="component w-1/2 p-6 rounded-lg flex items-center justify-center cursor-pointer text-4xl underline" on:click={switchPage}>
    <Translate token="RESULT_PAGE__PLAY_AGAIN"></Translate>!
  </section>

</Page>
