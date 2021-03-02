<script>
  import { lang } from "../store/project.js";
  import _ from "../translator/Translator.js";

	
  $: _madeBy = _("Made By", $lang);
</script>

<div class="footer">
  <div class="button-group" >
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
  <div class="addon">{_madeBy} <a class="link" href="https://github.com/krupinskij">Jan Krupiński</a> &copy;2021</div>
</div>
