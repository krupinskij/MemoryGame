<script>
  export let fadeIn;
  export let fadeOut;

  import { fade } from 'svelte/transition';
</script>

<div 
  class="flex flex-col items-center justify-center gap-8"
  in:fade={fadeIn} 
  out:fade={fadeOut}
>
  <slot></slot>
</div>