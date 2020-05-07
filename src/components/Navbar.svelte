<script>

</script>

<style>
  .navbar {
    top: 0;
    width: 100%;

    background-color: rgb(0,0,0,0.7);
    box-shadow: 3px 5px 7px black;

    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    place-items: center;
  }

  .navbar__button {
    color: white;
    padding: 10px 15px;
    margin: 20px 5px;
    font-size: 18px;
    border: 3px solid rgb(30, 30, 30);
    border-radius: 5px;
    background-color: transparent
  }
</style>

<div class="navbar">
  <div></div>
  <div class="header">
    ...
  </div>
  <div>
    <button class="navbar__button">Log In</button>
    <button class="navbar__button">Sign Up</button>
  </div>
</div>
