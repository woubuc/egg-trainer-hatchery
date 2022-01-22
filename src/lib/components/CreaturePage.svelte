<script lang="ts">
import CreatureOccupationSelector from '$lib/components/CreatureOccupationSelector.svelte';
import CreatureStats from '$lib/components/CreatureStats.svelte';
import CreatureTechniquesList from '$lib/components/CreatureTechniquesList.svelte';
import type { CreatureDetail, TechniqueKey } from '$lib/models/creature';
import { creatureColours, Element, Occupation, TrainingData } from '$lib/models/creature';
import { time } from '$lib/time';
import { createEventDispatcher, onDestroy, onMount } from 'svelte';
import type { Unsubscriber } from 'svelte/store';

export let creature: CreatureDetail;

let name = creature.name;
if (creature.nickname) {
	name = creature.nickname;
}

$: colours = creatureColours(creature.element);

let unsubscribe: Unsubscriber | null = null;

onMount(() => {
	unsubscribe = time.subscribe(t => {
		if (!creature.training) {
			return;
		}

		let finishTime = new Date(creature.training.finishTime).getTime();
		if (finishTime < t) {
			if (creature.inspect != false) {
				creature.inspect.training[creature.training.stat]++;
			}
			creature.occupation = Occupation.None;
			creature.training = false;
		}
	});
});

onDestroy(() => {
	if (unsubscribe != null) {
		unsubscribe();
	}
});

function setEnabledTechniques(evt: CustomEvent<TechniqueKey[]>) {
	creature.techniques = creature.techniqueOptions.filter(t => evt.detail.includes(t.key));
}

function setOccupation(evt: CustomEvent<Occupation>) {
	creature.occupation = evt.detail;
}

function setTraining(evt: CustomEvent<TrainingData>) {
	creature.training = evt.detail;
}
</script>

<div class="lg:relative flex-grow">

	<!-- Background stripe -->
	<div class="lg:fixed top-0 left-0 w-full lg:h-full lg:flex items-center py-12 lg:py-0 overflow-hidden">
		<div class="flex-grow py-2.5 bg-white shadow-sm -skew-y-6">
			<div
				class="flex justify-center lg:h-[500px] -mx-6 px-12 py-2 bg-gradient-to-b { colours.bg }">

				<!-- On small screens, the creature is shown above the info -->
				<img
					src="https://eggtrainer.com/img/creatures/{ creature.sprite }"
					alt="Your creature"
					class="-mt-12 w-[500px] aspect-square lg:hidden" />
			</div>
		</div>
	</div>

	<!-- On large screens, the creature is shown besides the info -->
	<div
		class="fixed z-10 top-0 left-0 w-full lg:h-full px-2 sm:px-6 lg:px-12">
		<div class="max-w-screen-xl lg:h-full mx-auto">
			<div class="lg:h-full lg:flex items-center gap-2 sm:gap-6 lg:gap-12 -mt-24 lg:mt-0">
				<div class="flex-none hidden lg:block w-[500px]">
					<img
						src="https://eggtrainer.com/img/creatures/{ creature.sprite }"
						alt="Your creature"
						class="-mt-16 flex-1 aspect-square" />
				</div>
			</div>
		</div>
	</div>

	<!-- Details -->
	<div
		class="relative z-10 top-0 left-0 w-full lg:h-full px-2 sm:px-6 lg:px-12">
		<div class="max-w-screen-xl lg:h-full mx-auto">
			<div class="lg:h-full lg:flex items-center gap-2 sm:gap-6 lg:gap-12 -mt-24 lg:mt-0">
				<!-- On large screens, the creature is shown besides the info -->
				<div class="flex-none hidden lg:block w-[500px]"></div>

				<div
					class="flex-grow self-start grid grid-cols-1 auto-rows-auto sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-4">

					<!-- Left column -->
					<div class="flex flex-col gap-2 sm:gap-4">
						<div class="bg-white px-6 py-4 rounded shadow-lg">
							<div class="flex items-center">
								<h2 class="flex-grow font-bold text-2xl text-stone-800">{ name }</h2>
								<span
									class="px-2.5 py-0.5 { colours.main } rounded-full font-medium uppercase text-white text-sm leading-2">{ creature.element }</span>
							</div>
							<p class="mb-2.5 text-stone-600 leading-3">{ creature.rarity } { creature.species }</p>
							<!--					<img src="https://eggtrainer.com/img/occupations/breeding.png" alt="icon" class="inline-block w-10 bg-rose-200 px-2.5 py-1 rounded-full" />-->
							<p class="py-1 text-xs text-stone-500 font-light">{ creature.description }</p>
						</div>

						<div class="bg-white px-6 py-4 rounded shadow-lg">
							<CreatureOccupationSelector {creature} on:occupation={ setOccupation }
														on:training={ setTraining } />
						</div>

						<div class="bg-white px-6 py-4 rounded shadow-lg">
							<CreatureTechniquesList {creature} on:techniques={ setEnabledTechniques } />
						</div>
					</div>

					<div class="flex flex-col gap-2 sm:gap-4">
						{#if creature.inspect}
							<CreatureStats {creature} />
						{:else}
							<div class="flex-1 bg-white px-6 py-4 rounded shadow-lg">
								<div class="flex items-center h-full">
									<div class="mb-4 py-6 text-sm font-light text-stone-600 text-center space-y-2">
										<p>You need a magnifying glass to inspect creatures properly.</p>
										<p>Go <a href="/game/shop"
												 class="underline text-stone-700 hocus:text-violet-600">buy one now</a>.
										</p>
										<!--								<pre class="text-xs w-1/2">{ JSON.stringify(creature, null, 2) }</pre>-->
									</div>
								</div>
							</div>

						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
