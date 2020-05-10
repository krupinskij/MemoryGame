import { writable, get } from "svelte/store";

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
		if(!this.languages.has(get(lang))) throw new Error("Language '" + get(lang) + "' doesn't exist");
		if(!this.languages.get(get(lang)).has(word)) throw new Error("Word '" + word + "' doesn't exist");
		
		return this.languages.get(get(lang)).get(word);
	}
}

const translator = new Translator();

export default translator.translate.bind(translator);

translator.registerLanguage(polish);
translator.registerLanguage(english);

export const lang = writable("pl"); 