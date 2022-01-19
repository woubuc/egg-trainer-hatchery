<script lang="ts">
import { api } from '$lib/api';
import { isAuthenticated } from '$lib/auth';
import Loader from '$lib/components/Loader.svelte';

let loading = false;
let email: string = '';
let password: string = '';

async function login() {
	loading = true;
	await api.login(email, password);
	password = '';
	loading = false;
}
</script>

<div class="flex-grow flex flex-col items-center justify-center">
	<div class="px-8 py-6 bg-white rounded shadow">
		<h1 class="font-bold text-xl text-stone-700 text-center">Hatchery</h1>
		<p class="mb-4 text-stone-600 text-center font-light">Custom Egg Trainer client</p>
		<span class="block w-6 h-1 mx-auto my-6 bg-stone-200 rounded-full" role="presentation" aria-hidden="true"></span>

		{#if $isAuthenticated}
			<p class="my-2 text-center">
				<a href="/game" class="inline-block px-3 py-1 bg-purple-500 hocus:bg-purple-600 rounded text-white font-medium">To game</a>
			</p>
		{:else if loading}
			<Loader message="Logging in" />
		{:else}
			<form on:submit|preventDefault={ login }>
				<label class="block my-6">
					<span class="block text-sm text-stone-500 font-medium">Email</span>
					<input type="email" bind:value={ email } class="px-3 py-1.5 border-2 border-stone-200 focus:border-purple-500 focus-visible:outline-none rounded" />
				</label>
				<label class="block my-6">
					<span class="block text-sm text-stone-500 font-medium">Password</span>
					<input type="password" bind:value={ password } class="px-3 py-1.5 border-2 border-stone-200 focus:border-purple-500 focus-visible:outline-none rounded" />
				</label>
				<input type="submit" value="Log in" class="inline-block px-3 py-1 bg-purple-500 hocus:bg-purple-600 rounded text-white font-medium" />
			</form>
		{/if}

	</div>
</div>
