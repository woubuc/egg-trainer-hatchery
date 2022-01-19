<script lang="ts">
import { api } from '$lib/api';
import CreatureTile from '$lib/components/CreatureTile.svelte';
import Loader from '$lib/components/Loader.svelte';
import PageContainer from '$lib/components/PageContainer.svelte';

let creatures = api.creatures();
</script>

{#await creatures}
	<Loader message="Loading creatures" />
{:then creatures}
	<PageContainer>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-2 sm:gap-6">
			{#each creatures as creature}
				<CreatureTile {creature} />
			{/each}
		</div>
	</PageContainer>
{/await}
