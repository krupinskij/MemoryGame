import { writable, get } from "svelte/store";

export const modal = writable({
    visible: false
});