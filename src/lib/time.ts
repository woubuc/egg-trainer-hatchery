import { readable } from 'svelte/store';

export const time = readable(Date.now(), (set) => {
	let interval = setInterval(() => set(Date.now()), 100);
	return () => clearInterval(interval);
})
