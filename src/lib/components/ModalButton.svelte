<script lang="ts">
type ButtonType = 'default' | 'action' | 'danger';

export let type: ButtonType = 'default';

function getClasses(type: ButtonType) {
	switch (type) {
		case 'action':
			return 'bg-purple-600 hocus:bg-purple-800';
		case 'danger':
			return 'bg-rose-600 hocus:bg-rose-800';
		case 'default':
		default:
			return 'bg-stone-500 hocus:bg-stone-700';

	}
}
</script>

<a
	href="#"
	on:click|preventDefault
	class="block px-4 py-1 text-white font-medium rounded { getClasses(type) } transition-all">
	<slot />
</a>
