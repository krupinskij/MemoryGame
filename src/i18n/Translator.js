import polish from "./languages/polish";
import english from "./languages/english";

class Translator {
	constructor() {
		this.languages = new Map();
	}

	registerLanguage(language) {
		this.languages.set(language.abbr, language.dictionary);
	}

	translate(token, lang = "en") {
		if(!this.languages.has(lang)) {
			console.error(`Language ${ lang } doesn't exist`);
			return token;
		}

		const dictionary = this.languages.get(lang);
		return dictionary[token] || token;
	}
}

const translator = new Translator();

translator.registerLanguage(polish);
translator.registerLanguage(english);

export const translate = translator.translate.bind(translator);
export const languages = [...translator.languages.keys()];

