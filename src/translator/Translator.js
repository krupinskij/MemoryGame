import polish from "./languages/polish";
import english from "./languages/english";

class Translator {
	constructor() {
		this.languages = new Map();
	}

	registerLanguage(language) {
		this.languages.set(language.abbr, language.dictionary);
	}

	translate(word) {
		if(!this.languages.has("pl")) throw new Error("Language doesn't exist");
		if(!this.languages.get("pl").has(word)) throw new Error("Word '" + word + "' doesn't exist");
		
		return this.languages.get("pl").get(word);
	}
}

const translator = new Translator();

export default translator.translate.bind(translator);

translator.registerLanguage(polish);
translator.registerLanguage(english);