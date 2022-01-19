<script lang="ts">
import { api } from '$lib/api';
import CreatureTechniquesEntry from '$lib/components/CreatureTechniquesEntry.svelte';
import Loader from '$lib/components/Loader.svelte';
import type { CreatureDetail, TechniqueKey } from '$lib/models/creature';
import { createEventDispatcher } from 'svelte';

export let creature: CreatureDetail;

$: enabledTechniques = creature.techniques.map(t => t.key);

let dispatch = createEventDispatcher<{ techniques: TechniqueKey[] }>();

let loading = false;

async function toggle(evt: CustomEvent) {
	loading = true;

	let key = evt.detail as TechniqueKey;
	let index = enabledTechniques.indexOf(key);
	if (index > -1) {
		enabledTechniques.splice(index, 1);
	} else {
		enabledTechniques.push(key);
	}

	await api.creature(creature.index).setTechniques(enabledTechniques);

	dispatch('techniques', enabledTechniques);
	loading = false;
}
</script>

<h2 class="mb-0.5 text-stone-500 font-semibold">Techniques</h2>
{#if enabledTechniques.length === 0}
	<p class="mb-4 text-xs font-light text-stone-600 bg-stone-100 -mx-6 px-6 py-2">You haven't enabled any techniques for this creature. Make sure to enable at least one technique before sending it into battle.</p>
{/if}

<div class="relative my-2">
	<div class="space-y-2 mb-2 { loading ? 'pointer-events-none opacity-50' : 'opacity-100' } transition-opacity">
		{#each creature.techniqueOptions as technique}
			<CreatureTechniquesEntry { technique } { enabledTechniques } on:toggle={ toggle } />
		{/each}

	</div>
	<div
		class="absolute top-0 left-0 w-full h-full z-10 flex flex-col pointer-events-none { loading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2' } transition-opacity">
		<Loader message="Updating techniques" />
	</div>
</div>
