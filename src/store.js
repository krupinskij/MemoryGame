import { writable, get } from "svelte/store";

export const page = writable("start");

page.subscribe(p => {
    if(p === "level") {
        level.set("easy")
        clickCounter.set(0);
        
        loading.set(false)
        imagesLoaded.set(0);
        imagesAll.set(0);

        lastPokemon.set(-1);
        singlePokemon.set(false)
        pokemonCheckQueue.set([]);
        pokemonDeleteQueue.set([]);
        pokemonTurnDownQueue.set([]);
        pokemonDeletedCards.set(0);
    }
})
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
export const pokemonCheckQueue = writable([]);
export const pokemonDeleteQueue = writable([]);
export const pokemonTurnDownQueue = writable([]);
export const pokemonDeletedCards = writable(0);

pokemonCheckQueue.subscribe(q => {
    if(q.length === 0 || q.length%2!==0) return;

    const p1 = q.shift();
    const p2 = q.shift();

    if(p1.id !== p2.id) {
        pokemonTurnDownQueue.update(q => [p1, p2, ...q]);
    }
    else if(p1.id === p2.id && p1.type !== p2.type) {
        pokemonDeleteQueue.update(q => [p1, p2, ...q]);
    }
})

pokemonDeletedCards.subscribe(c => {
    if(c !== 0 && c === get(imagesAll)) {
        setTimeout(() => { 
            page.set("result"); 
        }, 1000);
    }
})