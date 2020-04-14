import { writable } from "svelte/store";

export const page = writable("start");
export const level = writable("easy");
export const clickCounter = writable(0);