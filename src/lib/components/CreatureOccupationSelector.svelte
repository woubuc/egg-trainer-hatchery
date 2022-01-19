<script lang="ts">
import { api } from '$lib/api';
import CreatureOccupationButton from '$lib/components/CreatureOccupationButton.svelte';
import Loader from '$lib/components/Loader.svelte';
import IconBreeding from '$lib/icons/IconBreeding.svelte';
import IconHealth from '$lib/icons/IconHealth.svelte';
import IconPower from '$lib/icons/IconPower.svelte';
import IconSpeed from '$lib/icons/IconSpeed.svelte';
import IconStrength from '$lib/icons/IconStrength.svelte';
import { modal } from '$lib/modal';
import type { Creature, CreatureDetail, TrainingData } from '$lib/models/creature';
import { Occupation, Stat } from '$lib/models/creature';
import { createEventDispatcher } from 'svelte';

export let creature: CreatureDetail;

let loading = false;

let dispatch = createEventDispatcher<{ occupation: Occupation, training: false | TrainingData }>();

async function setOccupation(evt: CustomEvent<{ occupation: Occupation, stat?: Stat }>) {
	let { occupation, stat } = evt.detail;
	let isCanceling = false;
	if (occupation === Occupation.Breeding) {
		isCanceling = creature.occupation === occupation;
	} else {
		isCanceling = creature.training && creature.training.stat === stat;
	}

	if (creature.training != false) {
		let confirmed = await modal.confirm('Change training', `Are you sure you want to cancel your creature's current ${ creature.training.stat } training?`, { danger: true });

		if (!confirmed) {
			return;
		}
	}

	loading = true;

	if (occupation === Occupation.Breeding) {
		await api.creature(creature.index).setBreeding();
		dispatch('training', false);
	} else {
		let { message, finishTime } = await api.creature(creature.index).setTraining(stat);
		if (!isCanceling && message.toLowerCase().includes('occupation cleared')) {
			let retry = await api.creature(creature.index).setTraining(stat);
			finishTime = retry.finishTime;
		}
		dispatch('training', { stat, finishTime });
	}

	if (isCanceling) {
		dispatch('occupation', Occupation.None);
	} else {
		dispatch('occupation', occupation);
	}

	loading = false;
}
</script>

<h2 class="mb-0.5 text-stone-500 font-semibold">Occupation</h2>
{#if creature.occupation === Occupation.None }
	<p class="mb-4 text-xs font-light text-stone-600 bg-stone-100 -mx-6 px-6 py-2">The creature is not doing anything.</p>
{/if}

<div class="relative my-2">
	<div class="{ loading ? 'pointer-events-none opacity-50' : 'opacity-100' } transition-opacity">
		<CreatureOccupationButton {creature} occupation={ Occupation.Breeding } on:set={ setOccupation } activeBorder="border-pink-400">
			<span class="w-5 self-center text-pink-400"><IconBreeding /></span>
			Breeding
		</CreatureOccupationButton>
		<CreatureOccupationButton {creature} occupation={ Occupation.Training } stat={ Stat.Health } on:set={ setOccupation } activeBorder="border-red-400" activeColour="text-red-500">
			<span class="w-5 self-center text-red-400"><IconHealth /></span>
			Health training
		</CreatureOccupationButton>
		<CreatureOccupationButton {creature} occupation={ Occupation.Training } stat={ Stat.Speed } on:set={ setOccupation } activeBorder="border-yellow-400" activeColour="text-yellow-500">
			<span class="w-5 self-center text-yellow-400"><IconSpeed /></span>
			Speed training
		</CreatureOccupationButton>
		<CreatureOccupationButton {creature} occupation={ Occupation.Training } stat={ Stat.Strength } on:set={ setOccupation } activeBorder="border-indigo-400" activeColour="text-indigo-500">
			<span class="w-5 self-center text-indigo-400"><IconStrength /></span>
			Strength training
		</CreatureOccupationButton>
		<CreatureOccupationButton {creature} occupation={ Occupation.Training } stat={ Stat.Power } on:set={ setOccupation } activeBorder="border-purple-400" activeColour="text-purple-500">
			<span class="w-5 self-center text-purple-400"><IconPower /></span>
			Power training
		</CreatureOccupationButton>
	</div>
	<div class="absolute top-0 left-0 w-full h-full z-10 flex flex-col pointer-events-none { loading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2' } transition-opacity">
		<Loader message="Updating occupation" />
	</div>
</div>
