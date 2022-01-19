<script lang="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

onMount(() => {
	goto('/game/creatures');
})
</script>
