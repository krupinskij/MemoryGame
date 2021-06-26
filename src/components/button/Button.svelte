<script>
  export let disabled = false;
  export let active = false;
  export let onClick;
</script>

<button
  class={`bg-black border-black border-4 rounded h-12 px-4 mx-2 text-lg ${active ? 'underline' : ''} hover:highlight`}
  disabled={disabled}
  on:click={onClick}
>
  <slot></slot>
</button>