import { writable, get } from "svelte/store";

import { page } from "./project.js";
import { endTime } from "./game.js";
import { imagesAll } from "./images.js";

export const lastPokemon = writable(-1);
export const singlePokemon = writable(false);
export const pokemonCheckQueue = writable([]);
export const pokemonDeleteQueue = writable([]);
export const pokemonTurnDownQueue = writable([]);
export const pokemonDeletedCards = writable(0);

export const pokedexVisible = writable(false);

pokemonCheckQueue.subscribe(q => {
  if (q.length === 0 || q.length % 2 !== 0) return;

  const p1 = q.shift();
  const p2 = q.shift();

  if (p1.id !== p2.id) {
    pokemonTurnDownQueue.update(q => [p1, p2, ...q]);
  }
  else if (p1.id === p2.id && p1.type !== p2.type) {
    pokemonDeleteQueue.update(q => [p1, p2, ...q]);
  }
})

pokemonDeletedCards.subscribe(c => {
  if (c !== 0 && c === get(imagesAll)) {
    setTimeout(() => {
      page.set("result");
      endTime.set(performance.now());
    }, 500);
  }
});

export const resetPokemons = () => {
  lastPokemon.set(-1);
  singlePokemon.set(false)
  pokemonCheckQueue.set([]);
  pokemonDeleteQueue.set([]);
  pokemonTurnDownQueue.set([]);
  pokemonDeletedCards.set(0);
}