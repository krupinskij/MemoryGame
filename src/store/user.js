import { writable, get } from "svelte/store";

export const userForm = writable({
    visible: false
});