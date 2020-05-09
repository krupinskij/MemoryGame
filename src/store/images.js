import { writable, get } from "svelte/store";
import { startTime } from "./game.js";
import { modal } from "./modal.js";

export const imagesLoaded = writable(0);
export const imagesAll = writable(0);

imagesLoaded.subscribe(n => {
  if (n === get(imagesAll)) {
    modal.set({
      visible: false
    });
    startTime.set(performance.now());
  };
})

imagesAll.subscribe(n => {
  if (n > 0 && n !== get(imagesLoaded)) {
    modal.set({
      visible: true,
      type: "loading"
    });
  }
})

export const resetImages = () => {
  imagesLoaded.set(0);
  imagesAll.set(0);
}