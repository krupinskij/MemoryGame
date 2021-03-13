<script>
  import { lang } from "../../store/project.js";
  import _ from "../Translator";

	export let token;
  $: _translated = _(token, $lang);
</script>

{ _translated }