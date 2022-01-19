import { REFRESH_TOKEN_KEY } from '$lib/request';
import { get, writable } from 'svelte/store';

export const isAuthenticated = writable(false);

export function checkLogin(forceReload: boolean = false) {
	if (!forceReload && get(isAuthenticated)) {
		return;
	}

	let token = localStorage.getItem(REFRESH_TOKEN_KEY);
	if (token != null) {
		isAuthenticated.set(true);
	}
}
