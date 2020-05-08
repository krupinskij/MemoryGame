import { writable, get } from "svelte/store";

import { resetPokemons } from './pokemons';
import { resetImages } from "./images";

export const page = writable("start");
export const level = writable("easy");
export const clickCounter = writable(0);

page.subscribe(p => {
    if (p === "level" || p === "start") {
        level.set("easy")
        setTimeout(() => { clickCounter.set(0); }, 500)

        resetImages();
        resetPokemons();
    }
})


