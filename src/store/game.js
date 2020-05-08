import { writable } from "svelte/store";

export const page = writable("start");
export const level = writable("easy");
export const clickCounter = writable(0);
export const startTime = writable(0);
export const endTime = writable(0);


export const resetGame = () => {
  level.set("easy")
  setTimeout(() => { clickCounter.set(0); }, 500)
}
