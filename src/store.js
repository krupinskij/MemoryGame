import { writable, get } from "svelte/store";

export const page = writable("game");
export const level = writable("easy");
export const clickCounter = writable(0);

export const loading = writable(false);
export const imagesLoaded = writable(0);
export const imagesAll = writable(0);

imagesLoaded.subscribe(n => {
    if(n === get(imagesAll)){
        loading.set(false);
    };
})

imagesAll.subscribe(n => {
    if(n > 0 && n !== get(imagesLoaded)) {
        loading.set(true);
    }
})

export const lastPokemon = writable(-1);
export const singlePokemon = writable(false);