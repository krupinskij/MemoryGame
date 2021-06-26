<script>
	import Translate from "../../i18n/components/Translate.svelte";
  import Modal from "../modal/Modal.svelte";
  import ModalHeader from "../modal/ModalHeader.svelte";
  import ModalButtons from "../modal/ModalButtons.svelte";

  import Table from "../table/Table.svelte";
  import TableHead from "../table/TableHead.svelte";
  import TableHeader from "../table/TableHeader.svelte";
  import TableBody from "../table/TableBody.svelte";
  import TableRow from "../table/TableRow.svelte";
  import TableData from "../table/TableData.svelte";
  
  import Button from "../button/Button.svelte";
  import ButtonMergedGroup from "../button/ButtonMergedGroup.svelte";

  import { modal } from "../../store/modal.js";

  import firebase from "firebase";

  import { onMount } from "svelte";

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
    const ms = Math.floor(time % 1000);
    time = Math.floor(time / 1000);

    const s = time % 60;
    time = Math.floor(time / 60);

    return `${time}m ${s}s ${ms}ms`;
  };

  onMount(getData);
</script>

<Modal background="bg-ranking">
  <ModalHeader>
    <Translate token="RANKING_MODAL__BEST_RESULTS"></Translate>
  </ModalHeader>

  <Table>
    <TableHead>
      <TableHeader><Translate token="RANKING_MODAL__USER"></Translate></TableHeader>
      <TableHeader><Translate token="RANKING_MODAL__TIME"></Translate></TableHeader>
      <TableHeader><Translate token="RANKING_MODAL__CLICKS"></Translate></TableHeader>
    </TableHead>
    <TableBody>
      {#each results as result}
        <TableRow>
          <TableData>{result.username}</TableData>
          <TableData>{result.time}</TableData>
          <TableData>{result.clicks}</TableData>
        </TableRow>
      {/each}
    </TableBody>
  </Table>

  <ModalButtons>
    <ButtonMergedGroup>
      <Button active={who === 'me'} onClick={() => { setWho('me'); }}>
        <Translate token="RANKING_MODAL__ME"></Translate>
      </Button>
      <Button active={who === 'all'} onClick={() => { setWho('all'); }}>
        <Translate token="RANKING_MODAL__ALL"></Translate>
      </Button>
    </ButtonMergedGroup>

    <ButtonMergedGroup>
      <Button active={order === 'time'} onClick={() => { setOrder('time', 'clicks'); }}>
        <Translate token="RANKING_MODAL__TIME"></Translate>
      </Button>
      <Button active={order === 'clicks'} onClick={() => { setOrder('clicks', 'time'); }}>
        <Translate token="RANKING_MODAL__CLICKS"></Translate>
      </Button>
    </ButtonMergedGroup>

    <ButtonMergedGroup>
      <Button active={level === 'easy'} onClick={() => { setLevel('easy'); }}>
        <Translate token="RANKING_MODAL__EASY"></Translate>
      </Button>
      <Button active={level === 'medium'} onClick={() => { setLevel('medium'); }}>
        <Translate token="RANKING_MODAL__MEDIUM"></Translate>
      </Button>
      <Button active={level === 'hard'} onClick={() => { setLevel('hard'); }}>
        <Translate token="RANKING_MODAL__HARD"></Translate>
      </Button>
      <Button active={level === 'legendary'} onClick={() => { setLevel('legendary'); }}>
        <Translate token="RANKING_MODAL__LEGENDARY"></Translate>
      </Button>
    </ButtonMergedGroup>
  </ModalButtons>
</Modal>
