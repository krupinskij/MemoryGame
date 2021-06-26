<script>
  import { scale } from 'svelte/transition';
  import { modal } from '../../store/modal.js';

  export let hiddable = true;
  export let background = '';

  const hideModal = () => {
    if(!hiddable) return;

    modal.set({
      visible: false
    })
  }
</script>

<div 
  class="absolute w-screen h-screen top-0 bg-black bg-opacity-50 grid place-items-center" 
  transition:scale={{ duration: 500 }} 
  on:click|self ={ hideModal }
>
  <div class={`bg-no-repeat bg-cover bg-center shadow-component w-1/2 min-h-1/2 p-12 grid items-center ${background}`}>
    <slot></slot>
  </div>
</div>