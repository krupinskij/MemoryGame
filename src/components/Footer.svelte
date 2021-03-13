<script>
  import { lang } from "../store/project.js";
	import Translate from "../i18n/components/Translate.svelte";

</script>

<div class="footer">
  <div class="buttons-group" >
		<button class="mx-2" on:click={ () => { lang.set("en") }}>
			<img
				class="w-auto h-5"
      	src="img/lang/english-lang.svg"
      	alt="English lang" />
		</button>
		<button class="mx-2" on:click={ () => { lang.set("pl") }}>
			<img
				class="w-auto h-5"
      	src="img/lang/polish-lang.svg"
      	alt="Polish lang" />
		</button>
	</div>
  <div class="addon"><Translate token="Made By"/> <a class="link" href="https://github.com/krupinskij">Jan Krupiński</a> &copy;2021</div>
</div>
