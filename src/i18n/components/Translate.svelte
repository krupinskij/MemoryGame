<script>
  import { lang } from "../../store/project.js";
  import { translate } from "../Translator";

	export let token;
  $: translated = translate(token, $lang);
</script>

{ translated }