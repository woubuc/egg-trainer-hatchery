<script lang="ts">
import { goto } from '$app/navigation';
import { checkLogin, isAuthenticated } from '$lib/auth';
import HeaderNavLink from '$lib/components/HeaderNavLink.svelte';
import Loader from '$lib/components/Loader.svelte';
import { onDestroy, onMount } from 'svelte';
import { get, Unsubscriber } from 'svelte/store';

let loading: boolean = true;
let loadingMessage: string = '';

let unsubscribe: Unsubscriber | null = null;

onMount(async () => {
	loadingMessage = 'Checking login';
	await checkLogin();

	if (!get(isAuthenticated)) {
		await goto('/');
		return;
	}

	unsubscribe = isAuthenticated.subscribe(authenticated => {
		if (!authenticated) {
			goto('/');
		}
	});

	loading = false;
});

onDestroy(() => {
	if (unsubscribe != null) {
		unsubscribe();
	}
});
</script>

{#if loading}
	<Loader message={ loadingMessage } />
{:else}
	<header class="relative z-40 flex-none m-2 sm:m-6 lg:mx-12">
		<div class="flex gap-2 xl:max-w-screen-xl xl:mx-auto">
			<a href="/" class="flex items-center px-4 font-semibold bg-white rounded shadow-sm text-stone-500">
				<span>Hatchery</span>
			</a>

			<nav class="flex-grow flex px-2 bg-white shadow-sm rounded">
				<HeaderNavLink to="/game/creatures">My Creatures</HeaderNavLink>
				<HeaderNavLink to="/game/eggs">My Eggs</HeaderNavLink>
			</nav>
		</div>
	</header>

	<slot />
{/if}
