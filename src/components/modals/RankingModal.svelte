<script>
	import Translate from "../../i18n/components/Translate.svelte";

  import { scale } from "svelte/transition";
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
</script>

<div class="modal-container" transition:scale={{ duration: 500 }} on:click|self={hideModal}>
  <div class="modal bg-ranking">
    <h2 class="modal-header"><Translate token="RANKING_MODAL__BEST_RESULTS"></Translate></h2>
    <table class="component">
      <thead>
        <tr>
          <th class="table-header"><Translate token="RANKING_MODAL__USER"></Translate></th>
          <th class="table-header"><Translate token="RANKING_MODAL__TIME"></Translate></th>
          <th class="table-header"><Translate token="RANKING_MODAL__CLICKS"></Translate></th>
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
          <Translate token="RANKING_MODAL__ME"></Translate>
        </button>
        <button class="button" class:button--active={who === 'all'} on:click={() => { setWho('all'); }}>
          <Translate token="RANKING_MODAL__ALL"></Translate>
        </button>
      </div>
      <div class="buttons-group-merged">
        <button class="button" class:button--active={order === 'time'} on:click={() => { setOrder('time', 'clicks'); }}>
          <Translate token="RANKING_MODAL__TIME"></Translate>
        </button>
        <button class="button" class:button--active={order === 'clicks'} on:click={() => { setOrder('clicks', 'time'); }}>
          <Translate token="RANKING_MODAL__CLICKS"></Translate>
        </button>
      </div>
      <div class="buttons-group-merged">
        <button class="button" class:button--active={level === 'easy'} on:click={() => { setLevel('easy'); }}>
          <Translate token="RANKING_MODAL__EASY"></Translate>
        </button>
        <button class="button" class:button--active={level === 'medium'} on:click={() => { setLevel('medium'); }}>
          <Translate token="RANKING_MODAL__MEDIUM"></Translate>
        </button>
        <button class="button" class:button--active={level === 'hard'} on:click={() => { setLevel('hard'); }}>
          <Translate token="RANKING_MODAL__HARD"></Translate>
        </button>
        <button class="button" class:button--active={level === 'legendary'} on:click={() => { setLevel('legendary'); }}>
          <Translate token="RANKING_MODAL__LEGENDARY"></Translate>
        </button>
      </div>
    </div>

  </div>
</div>
