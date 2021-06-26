<script>
	import Translate from "../i18n/components/Translate.svelte";
	import ButtonGroup from "./button/ButtonGroup.svelte";

  import { languages } from "../i18n/Translator";
  import { lang } from "../store/project.js";
</script>

<div class="component m-2 p-2 flex justify-between items-center">
  <ButtonGroup>
		{#each languages as language }
			<button class="mx-2" on:click={ () => { lang.set(language) }}>
				<img
					class="w-auto h-5"
      		src={ `img/lang/${ language }-lang.svg` }
      		alt={ `${ language } lang` } />
			</button>
		{/each}
	</ButtonGroup>
  <div class="text-base mx-4">
		<Translate token="FOOTER__MADE_BY"/>
		<a class="underline" href="https://github.com/krupinskij">Jan Krupiński</a> &copy;2021
	</div>
</div>
