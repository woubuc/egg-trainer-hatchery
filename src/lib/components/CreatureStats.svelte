<script>
import CreatureStat from '$lib/components/CreatureStat.svelte';
</script>

<div class="bg-white px-6 py-4 rounded shadow-lg">
	<h2 class="mb-1 text-stone-500 font-semibold">Stats</h2>

	<div class="mb-6 space-y-3">
		<CreatureStat label="Health" value="15" max="100" colours="bg-rose-400" />
		<CreatureStat label="Speed" value="4" max="100" colours="bg-yellow-400" />
	</div>
	<div class="mb-6 space-y-3">
		<CreatureStat label="Physical Attack" value="6" max="100" colours="bg-blue-400" />
		<CreatureStat label="Physical Defense" value="8" max="100" colours="bg-teal-400" />
	</div>
	<div class="mb-2 space-y-3">
		<CreatureStat label="Magical Attack" value="1" max="100" colours="bg-fuchsia-400" />
		<CreatureStat label="Magical Defense" value="2" max="100" colours="bg-violet-400" />
	</div>
</div>

<div class="bg-white px-6 py-4 rounded shadow-lg">
	<h2 class="mb-1 text-stone-500 font-semibold">Genetics</h2>

	<div class="mb-2 space-y-3">
		<CreatureStat label="Genetic Health" value="15" max="30" colours="bg-red-400" />
		<CreatureStat label="Genetic Speed" value="14" max="20" colours="bg-yellow-400" />
		<CreatureStat label="Genetic Strength" value="21" max="36" colours="bg-indigo-400" />
		<CreatureStat label="Genetic Power" value="36" max="40" colours="bg-purple-400" />
	</div>
</div>

<div class="bg-white px-6 py-4 rounded shadow-lg">
	<h2 class="mb-1 text-stone-500 font-semibold">Training</h2>

	<div class="mb-2 space-y-3">
		<CreatureStat label="Trained Health" value="1" max="30" colours="bg-red-400" />
		<CreatureStat label="Trained Speed" value="4" max="20" colours="bg-yellow-400" />
		<CreatureStat label="Trained Strength" value="2" max="36" colours="bg-indigo-400" />
		<CreatureStat label="Trained Power" value="7" max="40" colours="bg-purple-400" />
	</div>
</div>
