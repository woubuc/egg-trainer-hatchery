<script lang="ts">
import { api } from '$lib/api';
import Loader from '$lib/components/Loader.svelte';
import PageContainer from '$lib/components/PageContainer.svelte';

let eggs = api.eggs();
</script>

{#await eggs}
	<Loader message="Loading eggs" />
{:then eggs}
	<Loader />
	<Loader message="foo" />
	<PageContainer>
		<pre>{ JSON.stringify(eggs, null, 2) }</pre>
	</PageContainer>
{/await}
