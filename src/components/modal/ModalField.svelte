<script>
  export let name;
  export let type = 'text';
  export let value;
</script>

<div class="component grid lg:grid-cols-modal items-center my-2 p-3 text-center">
  <label class="text-3xl" for={name}>
    <slot></slot>
  </label>
  {#if type === 'text'}
    <input 
      class="text-3xl text-black border-2 border-black rounded px-4 py-2" 
      type="text" id={name} bind:value={ value } 
    />
  {:else if type === 'password'}
    <input 
      class="text-3xl text-black border-2 border-black rounded px-4 py-2" 
      type="password" id={name} bind:value={ value } 
    />
  {/if}
</div>