<script>
  import { lang } from "../store/project.js";
</script>

<style>
	.footer {
		position: absolute;
		bottom: 0;
		width: calc(100% - 20px);
    padding: 0 10px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.flags {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flag {
		width: min-content;
		height: 20px;
		padding: 0;
		border: 0;
		margin: 5px;
	}

	.img-flag {
		width: auto;
		height: 20px;
		margin: 0;
		cursor: pointer;
	}

	.link {
		color: white;
	}
</style>

<div class="footer darken-bg shadow">
  <div class="flags" >
		<button class="flag" on:click={ () => { lang.set("en") }}>
			<img
				class="img-flag"
      	src="img/lang/english-lang.svg"
      	alt="English lang" />
		</button>
		<button class="flag" on:click={ () => { lang.set("pl") }}>
			<img
				class="img-flag"
      	src="img/lang/polish-lang.svg"
      	alt="Polish lang" />
		</button>
	</div>
  <div><a class="link" href="https://github.com/krupinskij">Jan Krupiński</a> &copy;2020</div>
</div>
