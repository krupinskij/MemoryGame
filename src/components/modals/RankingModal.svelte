<script>
  import _ from "../../translator/Translator.js";

  import { scale } from "svelte/transition";
  import { lang } from "../../store/project.js"
  import { modal } from "../../store/modal.js";

  import firebase from "firebase";

  import { onMount } from "svelte";

  const hideModal = () => {
    modal.set({
      visible: false
    });
  };

  let who = "all";
  let order = "time";
  let then = "clicks";
  let level = "easy";

  let results = [];

  const setWho = w => {
    who = w;
    getData();
  };

  const setOrder = (o, t) => {
    order = o;
    then = t;
    getData();
  };

  const setLevel = l => {
    level = l;
    getData();
  };

  const getData = () => {
    results = [];

    if (who === "me") {
      firebase
        .firestore()
        .collection(level)
        .where("user", "==", firebase.auth().currentUser.uid)
        .orderBy(order)
        .orderBy(then)
        .limit(5)
        .get()
        .then(snapshots => {
          results = snapshots.docs.map(doc => {
            const data = doc.data();
            return {
              username: data.username,
              time: getTime(data.time),
              clicks: data.clicks
            };
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    } else {
      firebase
        .firestore()
        .collection(level)
        .orderBy(order)
        .orderBy(then)
        .limit(5)
        .get()
        .then(snapshots => {
          results = snapshots.docs.map(doc => {
            const data = doc.data();
            return {
              username: data.username,
              time: getTime(data.time),
              clicks: data.clicks
            };
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const getTime = time => {
    const ms = time % 1000;
    time = Math.floor(time / 1000);

    const s = time % 60;
    time = Math.floor(time / 60);

    return `${time}m ${s}s ${ms}ms`;
  };

  onMount(getData);

  $: _bestResults = _("Best results", $lang);

  $: _user = _("User", $lang);
  $: _time = _("Time", $lang);
  $: _clicks = _("Clicks", $lang);

  $: _me = _("Me", $lang);
  $: _all = _("All", $lang);

  $: _easy = _("Easy", $lang);
  $: _medium = _("Medium", $lang);
  $: _hard = _("Hard", $lang);
  $: _legendary = _("Legendary", $lang);

</script>

<div class="modal-container" transition:scale={{ duration: 500 }} on:click|self={hideModal}>
  <div class="modal bg-ranking">
    <h2 class="modal-header">{ _bestResults }</h2>
    <table class="component">
      <thead>
        <tr>
          <th class="table-header">{ _user }</th>
          <th class="table-header">{ _time }</th>
          <th class="table-header">{ _clicks }</th>
        </tr>
      </thead>
      <tbody>
        {#each results as result}
          <tr>
            <td class="table-data">{result.username}</td>
            <td class="table-data">{result.time}</td>
            <td class="table-data">{result.clicks}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="modal-buttons">
      <div class="buttons-group-merged">
        <button class="button" class:button--active={who === 'me'} on:click={() => { setWho('me'); }}>
          { _me }
        </button>
        <button class="button" class:button--active={who === 'all'} on:click={() => { setWho('all'); }}>
          { _all }
        </button>
      </div>
      <div class="buttons-group-merged">
        <button class="button" class:button--active={order === 'time'} on:click={() => { setOrder('time', 'clicks'); }}>
          { _time }
        </button>
        <button class="button" class:button--active={order === 'clicks'} on:click={() => { setOrder('clicks', 'time'); }}>
          { _clicks }
        </button>
      </div>
      <div class="buttons-group-merged">
        <button class="button" class:button--active={level === 'easy'} on:click={() => { setLevel('easy'); }}>
          { _easy }
        </button>
        <button class="button" class:button--active={level === 'medium'} on:click={() => { setLevel('medium'); }}>
          { _medium }
        </button>
        <button class="button" class:button--active={level === 'hard'} on:click={() => { setLevel('hard'); }}>
          { _hard }
        </button>
        <button class="button" class:button--active={level === 'legendary'} on:click={() => { setLevel('legendary'); }}>
          { _legendary }
        </button>
      </div>
    </div>

  </div>
</div>
