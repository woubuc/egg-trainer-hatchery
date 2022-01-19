<script lang="ts">
import { page } from '$app/stores';
import { derived } from 'svelte/store';

export let to: string = '#';

let active = derived(page, p => p.url.pathname === to);
</script>

<a href={ to } class="relative block px-4 py-2.5 font-semibold { $active ? 'text-violet-600 pointer-events-none' : 'text-stone-600' } hover:text-violet-600 overflow-hidden">
	<slot />

	<span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1 rounded-t-full bg-violet-500 { $active ? 'translate-y-0' : 'translate-y-full' } transition-transform"></span>
</a>
