<script>
  import { StorageRef } from "sveltefire";
  import "firebase/storage";
  export let number;
</script>

<style>
  .image {
    width: 100%;
    height: auto;
    padding: 0;
    justify-self: center;

    font-size: 20px;
    color: white;

    border: 2px solid white;
    border-radius: 10px;

    cursor: pointer;
  }
</style>

<div class="card">
  <StorageRef
    path={`images/${number}.png`}
    let:downloadURL
    let:ref
    let:metadata>

    <img class="image" src={downloadURL} alt="Pokemon" />

  </StorageRef>

</div>
