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
		case Element.Fire:
			return {
				border: enabled
					? 'bg-orange-50 border-orange-400 text-orange-700 hover:border-orange-500 hover:bg-orange-100'
					: 'border-orange-200 text-orange-600 text-opacity-75 hover:border-orange-400 hover:bg-orange-50',
				badge: 'bg-orange-100 text-orange-600',
			};
		case Element.Water:
			return {
				border: enabled
					? 'bg-cyan-50 border-cyan-400 text-cyan-700 hover:border-cyan-500 hover:bg-cyan-100'
					: 'border-cyan-200 text-cyan-600 text-opacity-75 hover:border-cyan-400 hover:bg-cyan-50',
				badge: 'bg-cyan-100 text-cyan-600',
			};
		case Element.Grass:
			return {
				border: enabled
					? 'bg-green-50 border-green-400 text-green-700 hover:border-green-500 hover:bg-green-100'
					: 'border-green-200 text-green-600 text-opacity-75 hover:border-green-400 hover:bg-green-50',
				badge: 'bg-green-100 text-green-600',
			};
		case Element.Metal:
			return {
				border: enabled
					? 'bg-slate-50 border-slate-400 text-slate-700 hover:border-slate-500 hover:bg-slate-100'
					: 'border-slate-200 text-slate-600 text-opacity-75 hover:border-slate-400 hover:bg-slate-50',
				badge: 'bg-slate-100 text-slate-600',
			};
		case Element.Fae:
			return {
				border: enabled
					? 'bg-pink-50 border-pink-400 text-pink-700 hover:border-pink-500 hover:bg-pink-100'
					: 'border-pink-200 text-pink-600 text-opacity-75 hover:border-pink-400 hover:bg-pink-50',
				badge: 'bg-pink-100 text-pink-600',
			};
		case Element.Light:
			return {
				border: enabled
					? 'bg-yellow-50 border-yellow-400 text-yellow-700 hover:border-yellow-500 hover:bg-yellow-100'
					: 'border-yellow-200 text-yellow-600 text-opacity-75 hover:border-yellow-400 hover:bg-yellow-50',
				badge: 'bg-yellow-100 text-yellow-600',
			};
		case Element.Dark:
			return {
				border: enabled
					? 'bg-violet-50 border-violet-400 text-violet-700 hover:border-violet-500 hover:bg-violet-100'
					: 'border-violet-200 text-violet-600 text-opacity-75 hover:border-violet-400 hover:bg-violet-50',
				badge: 'bg-violet-100 text-violet-600',
			};
		case Element.Dragon:
			return {
				border: enabled
					? 'bg-rose-50 border-rose-400 text-rose-700 hover:border-rose-500 hover:bg-rose-100'
					: 'border-rose-200 text-rose-600 text-opacity-75 hover:border-rose-400 hover:bg-rose-50',
				badge: 'bg-rose-100 text-rose-600',
			};
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
		default:
			return {
				border: enabled
					? 'bg-stone-50 border-stone-400 text-stone-700 hover:border-stone-500 hover:bg-stone-100'
					: 'border-stone-200 text-stone-600 text-opacity-75 hover:border-stone-400 hover:bg-stone-50',
				badge: 'bg-stone-100 text-stone-600',
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
