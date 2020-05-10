<script>
  import _ from "../../translator/Translator.js";
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

<div
  class="modal"
  transition:scale={{ duration: 500 }}
  on:click|self={hideModal}>
  <div class="modal__content modal__content--ranking">
    <h2 class="modal__header darken-bg">{ _("Best results") }</h2>
    <table class="table">
      <thead class="darken-bg">
        <tr>
          <th class="table__header">{ _("User") }</th>
          <th class="table__header">{ _("Time") }</th>
          <th class="table__header">{ _("Clicks") }</th>
        </tr>
      </thead>
      <tbody>
        {#each results as result}
          <tr class="darken-bg">
            <td class="table__data">{result.username}</td>
            <td class="table__data">{result.time}</td>
            <td class="table__data">{result.clicks}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="modal__buttons">
      <div class="button-group">
        <button
          class="button button--small button--first"
          class:button--active={who === 'me'}
          on:click={() => {
            setWho('me');
          }}>
          { _("Me") }
        </button>
        <button
          class="button button--small button--last"
          class:button--active={who === 'all'}
          on:click={() => {
            setWho('all');
          }}>
          { _("All") }
        </button>
      </div>
      <div class="button-group">
        <button
          class="button button--small button--first"
          class:button--active={order === 'time'}
          on:click={() => {
            setOrder('time', 'clicks');
          }}>
          { _("Time") }
        </button>
        <button
          class="button button--small button--last"
          class:button--active={order === 'clicks'}
          on:click={() => {
            setOrder('clicks', 'time');
          }}>
          { _("Clicks") }
        </button>
      </div>
      <div class="button-group">
        <button
          class="button button--small button--first"
          class:button--active={level === 'easy'}
          on:click={() => {
            setLevel('easy');
          }}>
          { _("Easy") }
        </button>
        <button
          class="button button--small button--center"
          class:button--active={level === 'medium'}
          on:click={() => {
            setLevel('medium');
          }}>
          { _("Medium") }
        </button>
        <button
          class="button button--small button--center"
          class:button--active={level === 'hard'}
          on:click={() => {
            setLevel('hard');
          }}>
          { _("Hard") }
        </button>
        <button
          class="button button--small button--last"
          class:button--active={level === 'legendary'}
          on:click={() => {
            setLevel('legendary');
          }}>
          { _("Legendary") }
        </button>
      </div>
    </div>

  </div>
</div>
