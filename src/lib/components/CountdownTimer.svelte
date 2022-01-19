<script lang="ts">
import { time } from '$lib/time';
import prettyMilliseconds from 'pretty-ms';
import { derived } from 'svelte/store';

export let target: string;

let label = derived(time, t => {
	let targetT = new Date(target).getTime();
	let msBetween = targetT - t;
	if (msBetween <= 1000) {
		return '0s';
	}
	return prettyMilliseconds(msBetween, { secondsDecimalDigits: 0 });
});
</script>

<span>{ $label }</span>
