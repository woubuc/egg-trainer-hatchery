<script lang="ts">
export let label: string;
export let value: number;
export let max: number = 100;
export let colours: string = 'bg-stone-500';
</script>

<div>
	<div class="flex items-end">
		<p class="flex-grow w-12 text-sm text-stone-600">{ label }</p>
		<p class="w-10 text-sm text-right text-stone-600 font-semibold">
			{ value }<span class="text-stone-400 font-light">/{ max }</span>
		</p>
	</div>
	<div class="flex-grow h-1 bg-stone-200 rounded-full overflow-hidden">
		<div class="h-1 bg-gradient-to-b { colours }" style="width: { value / max * 100 }%"></div>
	</div>
</div>
