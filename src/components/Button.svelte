<script>
  export let disabled;
  export let onClick;
</script>

<button
  class="bg-black border-black border-4 rounded h-12 px-4 mx-2 text-lg"
  disabled={disabled}
  on:click={onClick}
>
  <slot></slot>
</button>