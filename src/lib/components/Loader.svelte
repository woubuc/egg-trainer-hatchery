<script lang="ts">
export let message: string = '';
</script>

<div class="flex-grow flex items-center justify-center p-6">
	<div class="flex items-center gap-2 { message.length > 0 ? 'px-2.5 py-1' : 'p-1.5' } bg-white rounded-full shadow-lg">
		<div class="flex items-center w-4 h-4">
			<div class="w-4 h-1 bg-purple-400 rounded-full animate-spin"></div>
		</div>
		{#if message.length > 0}
			<p class="font-medium text-sm text-stone-600">{ message }</p>
		{/if}
	</div>
</div>
