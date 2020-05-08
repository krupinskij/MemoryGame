import { writable, get } from "svelte/store";

import { resetGame } from './game';
import { resetPokemons } from './pokemons';
import { resetImages } from "./images";

export const page = writable("start");

page.subscribe(p => {
    if (p === "level" || p === "start") {
        
        resetGame();
        resetImages();
        resetPokemons();
    }
})