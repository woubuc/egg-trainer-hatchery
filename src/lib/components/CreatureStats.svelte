<script lang="ts">
import CreatureStat from '$lib/components/CreatureStat.svelte';
import { Occupation, Stat } from '$lib/models/creature';
import type { CreatureDetail } from '$lib/models/creature';

export let creature: CreatureDetail;
</script>

<div class="bg-white px-6 py-4 rounded shadow-lg">
	<h2 class="mb-1 text-stone-500 font-semibold">Stats</h2>

	<div class="mb-6 space-y-3">
		<CreatureStat label="Health" value={ creature.inspect.species.health } max="32" colours="bg-rose-400" />
		<CreatureStat label="Speed" value={ creature.inspect.species.speed } max="32" colours="bg-yellow-400" />
	</div>
	<div class="mb-6 space-y-3">
		<CreatureStat label="Physical Attack" value={ creature.inspect.species.physicalAttack } max="32" colours="bg-blue-400" />
		<CreatureStat label="Physical Defense" value={ creature.inspect.species.physicalDefence } max="32" colours="bg-teal-400" />
	</div>
	<div class="mb-2 space-y-3">
		<CreatureStat label="Magical Attack" value={ creature.inspect.species.magicalAttack } max="32" colours="bg-fuchsia-400" />
		<CreatureStat label="Magical Defense" value={ creature.inspect.species.magicalDefence } max="32" colours="bg-violet-400" />
	</div>
</div>

<div class="bg-white px-6 py-4 rounded shadow-lg">
	<h2 class="mb-1 text-stone-500 font-semibold">Genetics</h2>

	<div class="mb-2 space-y-3">
		<CreatureStat label="Genetic Health" value={ creature.inspect.genetics.health } max="32" colours="bg-red-400" />
		<CreatureStat label="Genetic Speed" value={ creature.inspect.genetics.speed } max="32" colours="bg-yellow-400" />
		<CreatureStat label="Genetic Strength" value={ creature.inspect.genetics.strength } max="32" colours="bg-indigo-400" />
		<CreatureStat label="Genetic Power" value={ creature.inspect.genetics.power } max="32" colours="bg-purple-400" />
	</div>
</div>

<div class="bg-white px-6 py-4 rounded shadow-lg">
	<div class="flex items-center justify-between mb-1">
		<h2 class="text-stone-500 font-semibold">Training</h2>
		<p class="px-2 bg-stone-200 bg-opacity-75 rounded-full text-sm text-stone-500 leading-5">
			<strong class="font-medium">{ 32 - creature.inspect.training.health - creature.inspect.training.strength - creature.inspect.training.power - creature.inspect.training.speed}</strong>
			<span class="font-light">remaining</span>
		</p>
	</div>

	<div class="mb-2 space-y-3">
		<CreatureStat
			label="Trained Health"
			value={ creature.inspect.training.health }
			max="32"
			pending={ creature.occupation === Occupation.Training && creature.training.stat === Stat.Health ? 1 : 0 }
			locked={ creature.inspect.training.speed + creature.inspect.training.strength + creature.inspect.training.power }
			colours="bg-red-400" />
		<CreatureStat
			label="Trained Speed"
			value={ creature.inspect.training.speed }
			max="32"
			pending={ creature.occupation === Occupation.Training && creature.training.stat === Stat.Speed ? 1 : 0 }
			locked={ creature.inspect.training.health + creature.inspect.training.strength + creature.inspect.training.power }
			colours="bg-yellow-400" />
		<CreatureStat
			label="Trained Strength"
			value={ creature.inspect.training.strength }
			max="32"
			pending={ creature.occupation === Occupation.Training && creature.training.stat === Stat.Strength ? 1 : 0 }
			locked={ creature.inspect.training.health + creature.inspect.training.speed + creature.inspect.training.power }
			colours="bg-indigo-400" />
		<CreatureStat
			label="Trained Power"
			value={ creature.inspect.training.power }
			max="32"
			pending={ creature.occupation === Occupation.Training && creature.training.stat === Stat.Power ? 1 : 0 }
			locked={ creature.inspect.training.health + creature.inspect.training.speed + creature.inspect.training.strength }
			colours="bg-purple-400" />
	</div>
</div>
