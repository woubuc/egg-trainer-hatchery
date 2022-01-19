<script lang="ts">
import IconChecked from '$lib/icons/IconChecked.svelte';
import IconUnchecked from '$lib/icons/IconUnchecked.svelte';
import type { Technique, TechniqueKey } from '$lib/models/creature';
import { Element } from '$lib/models/creature';
import { createEventDispatcher } from 'svelte';

export let technique: Technique;
export let enabledTechniques: string[];

let dispatch = createEventDispatcher<{ toggle: TechniqueKey }>();

$: enabled = enabledTechniques.includes(technique.key);
$: classes = getClasses(technique.element, enabled);

function getClasses(element: Element, enabled: boolean): { border: string, badge: string } {
	switch (element) {
		case Element.Fighting:
			return {
				border: enabled
					? 'bg-stone-50 border-stone-400 text-stone-700 hover:border-stone-500 hover:bg-stone-100'
					: 'border-stone-200 text-stone-600 text-opacity-75 hover:border-stone-400 hover:bg-stone-50',
				badge: 'bg-stone-100 text-stone-600',
			};
		case Element.Psychic:
			return {
				border: enabled
					? 'bg-purple-50 border-purple-400 text-purple-700 hover:border-purple-500 hover:bg-purple-100'
					: 'border-purple-200 text-purple-600 text-opacity-75 hover:border-purple-400 hover:bg-purple-50',
				badge: 'bg-purple-100 text-purple-600',
			};
		case Element.Grass:
			return {
				border: enabled
					? 'bg-green-50 border-green-400 text-green-700 hover:border-green-500 hover:bg-green-100'
					: 'border-green-200 text-green-600 text-opacity-75 hover:border-green-400 hover:bg-green-50',
				badge: 'bg-green-100 text-green-600',
			};
		case Element.Fire:
			return {
				border: enabled
					? 'bg-orange-50 border-orange-400 text-orange-700 hover:border-orange-500 hover:bg-orange-100'
					: 'border-orange-200 text-orange-600 text-opacity-75 hover:border-orange-400 hover:bg-orange-50',
				badge: 'bg-orange-100 text-orange-600',
			};
	}
}
</script>

<a
	href="#"
	on:click|preventDefault={ dispatch('toggle', technique.key) }
	class="block focus-visible:outline-none rounded-lg focus-visible:ring-2 ring-offset-2 ring-offset-white ring-sky-500">
	<span class="relative block px-2.5 py-1.5 border-2 rounded-lg cursor-pointer { classes.border } transition-all">
		<span class="flex">
			<span class="flex-none w-6 mr-1 { enabled ? 'opacity-100' : 'opacity-50' }">
				{#if enabled }
					<IconChecked />
				{:else}
					<IconUnchecked />
				{/if}
			</span>

			<span class="block font-medium">
				{ technique.name }

				<span class="pl-1 text-xs font-normal opacity-50">{ technique.element }</span>
			</span>
		</span>
		<span
			class="absolute top-2 right-3 flex items-center justify-center w-6 h-6 rounded-full { classes.badge }">
			<span class="text-sm font-semibold">{ technique.damage }</span>
		</span>
		<span class="block px-1 pt-0.5 text-sm text-stone-600 font-light">{ technique.description }</span>
	</span>
</a>
