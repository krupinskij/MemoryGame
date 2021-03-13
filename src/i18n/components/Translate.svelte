<script>
  import { lang } from "../../store/project.js";
  import _ from "../../translator/Translator.js";

	export let token;
  console.log(token);
  $: _translated = _(token, $lang);
</script>

{ _translated }