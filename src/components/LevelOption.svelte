<script>
  export let selected;
  export let onClick;

</script>

<div
  class={`${selected ? 'text-6xl underline' : 'text-4xl'} cursor-pointer hover:font-black m-2`}
  on:click={onClick}
>
  <slot></slot>
</div>