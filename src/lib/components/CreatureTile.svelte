<script lang="ts">
import IconBreeding from '$lib/icons/IconBreeding.svelte';
import IconTraining from '$lib/icons/IconTraining.svelte';
import { Occupation } from '$lib/models/creature';
import type { Creature } from '$lib/models/creature';

export let creature: Creature;

let name = creature.name;
if (creature.nickname) {
	name = creature.nickname;
}
</script>

<a
	href="/game/creatures/{ creature.index }"
	class="px-4 py-3 bg-white rounded shadow-sm overflow-hidden hocus:shadow-lg hocus:scale-[101%] transition-all">
	<div class="flex items-center">
		<h2 class="flex-grow font-bold text-lg text-stone-800">{ name }</h2>
		<span class="px-2.5 py-0.5 bg-orange-500 rounded-full font-medium uppercase text-white text-sm leading-2">{ creature.element }</span>
	</div>
	<p class="text-sm text-stone-600 leading-3">{ creature.rarity } { creature.species }</p>
	<div class="relative mb-6 -mx-6 mt-12 px-6 py-2 bg-gradient-to-b from-orange-200 to-orange-50 -skew-y-6">
		<img src="https://eggtrainer.com/img/creatures/{ creature.sprite }" alt="image of { name }" class="-mt-12 skew-y-6 aspect-square" />
		{#if creature.occupation !== Occupation.None}
			<div class="absolute bottom-0 left-0 flex justify-center w-full px-6 skew-y-6 translate-y-5">
				{#if creature.occupation === Occupation.Breeding }
					<div class="w-9 p-2 bg-rose-200 rounded-full text-rose-600">
						<IconBreeding />
					</div>
				{:else}
					<div class="w-9 p-2 bg-teal-200 rounded-full text-teal-600">
						<IconTraining />
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<p class="py-1 text-xs text-stone-500 font-light">{ creature.description }</p>
</a>
