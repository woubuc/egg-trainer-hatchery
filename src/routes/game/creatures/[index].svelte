<script lang="ts">
import { page } from '$app/stores';
import { api } from '$lib/api';
import CreaturePage from '$lib/components/CreaturePage.svelte';
import Loader from '$lib/components/Loader.svelte';
import type { Creature } from '$lib/models/creature';
import { derived, Readable } from 'svelte/store';

let creature: Readable<Promise<Creature>> = derived(page, page => {
	let index = parseInt(page.params.index, 10);
	return api.creature(index).inspect();
});
</script>

{#await $creature}
	<Loader message="Loading creature" />
{:then creature}
	<CreaturePage {creature} />
{/await}
