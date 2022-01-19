<script lang="ts">
import CountdownTimer from '$lib/components/CountdownTimer.svelte';
import { CreatureDetail, Occupation, Stat } from '$lib/models/creature';
import { createEventDispatcher } from 'svelte';

export let creature: CreatureDetail;

export let occupation: Occupation;
export let stat: Stat | undefined = undefined;

export let activeBorder: string = 'border-purple-400';
export let activeColour: string = 'text-stone-600';

$: active = isActive(creature, occupation, stat);

console.log(active);

let dispatch = createEventDispatcher<{ set: { occupation: Occupation, stat?: Stat } }>();

function set() {
	dispatch('set', { occupation, stat });
}

function isActive(creature: CreatureDetail, occupation: Occupation, stat?: Stat): boolean {
	if (creature.occupation !== occupation) {
		return false;
	}

	if (stat == undefined) {
		return true;
	}

	if (!creature.training) {
		return false;
	}

	return creature.training.stat === stat;
}
</script>

<a
	href="#"
	on:click|preventDefault={ set }
	class="flex items-baseline gap-2 -my-[2px] px-2.5 py-2 border-2 rounded-none first:rounded-t-lg last:rounded-b-lg { active ? `relative z-10 text-stone-700 bg-stone-50 ${activeBorder}` : ' border-stone-200 text-stone-500' } font-medium hocus:bg-stone-50 hocus:text-stone-700">
	<slot />

	{#if active && creature.training !== false}
		<span class="flex-grow text-right text-sm font-normal { activeColour }">
			<CountdownTimer target={ new Date(creature.training.finishTime).getTime() } />
		</span>
	{/if}
</a>
