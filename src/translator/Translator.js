import polish from "./languages/polish";
import english from "./languages/english";

class Translator {
	constructor() {
		this.languages = new Map();
	}

	registerLanguage(language) {
		this.languages.set(language.abbr, language.dictionary);
	}

	translate(word, lang = "en") {
		if(!this.languages.has(lang)) throw new Error("Language '" + lang + "' doesn't exist");
		if(!this.languages.get(lang).has(word)) throw new Error("Word '" + word + "' doesn't exist");
		
		return this.languages.get(lang).get(word);
	}
}

const translator = new Translator();
export default translator.translate.bind(translator);;

translator.registerLanguage(polish);
translator.registerLanguage(english);
