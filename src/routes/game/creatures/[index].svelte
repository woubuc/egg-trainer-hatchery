<script context="module" lang="ts">
import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => ({
	props: { index: parseInt(params.index, 10) },
});
</script>

<script lang="ts">
import { api } from '$lib/api';
import CreaturePage from '$lib/components/CreaturePage.svelte';
import Loader from '$lib/components/Loader.svelte';

export let index: number;

let creature = api.creature(index).inspect();
</script>

{#await creature}
	<Loader message="Loading creature" />
{:then creature}
	<CreaturePage {creature} />
{/await}
