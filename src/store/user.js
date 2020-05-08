import { writable, get } from "svelte/store";

export const userForm = writable({
    visible: false
});

export const logged = writable(false);