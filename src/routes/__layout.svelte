<script lang="ts">
import { checkLogin } from '$lib/auth';
import Loader from '$lib/components/Loader.svelte';
import Modal from '$lib/components/Modal.svelte';
import { onMount } from 'svelte';
import '../index.css';

let loading = true;
onMount(async () => {
	await checkLogin();
	loading = false;
});
</script>

<div class="flex flex-col w-screen h-screen">
	{#if loading}
		<Loader />
	{:else}
		<slot />
	{/if}

	<footer class="relative z-40 sm:flex justify-center gap-8 p-6 text-xs font-light text-stone-400 text-center">
		<p>Game &copy; <a href="https://krgamestudios.com" target="_blank" rel="external" class="underline hocus:text-violet-600">KR Game Studios</a></p>
		<p>Client by <a href="https://www.woubuc.be" target="_blank" rel="external" class="underline hocus:text-violet-600">@woubuc</a></p>
		<p>Icons by <a href="https://icons8.com" target="_blank" rel="external" class="underline hocus:text-violet-600">Icons8</a></p>
	</footer>
</div>

<Modal />
