<script lang="ts">
import ModalButton from '$lib/components/ModalButton.svelte';
import IconWarning from '$lib/icons/IconWarning.svelte';
import { modal, ModalOptions } from '$lib/modal';
import { onDestroy, onMount } from 'svelte';

let open = false;
let isConfirm = false;
let title = '';
let message = '';
let resolveFn: Function | null = null;

let options: ModalOptions = {
	danger: false,
	yesButton: 'Yes',
	noButton: 'No',
	okButton: 'Ok',
};

onMount(() => {
	modal.confirm = showConfirmModal;
	modal.alert = showAlertModal;
});

onDestroy(() => {
	modal.confirm = async (_, message) => confirm(message);
	modal.alert = async (_, message) => alert(message);
});

async function showConfirmModal(newTitle: string, newMessage: string, newOptions?: Partial<ModalOptions>): Promise<boolean> {
	isConfirm = true;
	title = newTitle;
	message = newMessage;
	options = Object.assign(options, newOptions);
	open = true;

	console.log(arguments);
	console.log('opt', options);

	return new Promise<boolean>(r => {
		resolveFn = r;
	});
}

async function showAlertModal(newTitle: string, newMessage: string, newOptions?: Partial<ModalOptions>): Promise<void> {
	isConfirm = false;
	title = newTitle;
	message = newMessage;
	options = Object.assign(options, newOptions);
	open = true;

	return new Promise<void>(r => {
		resolveFn = r;
	});
}

function resolve(value?: any) {
	if (resolveFn != null) {
		resolveFn(value);
		resolveFn = null;
	}

	open = false;
}
</script>

<div
	class="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black bg-opacity-20
		{ open ? 'opacity-100' : 'opacity-0 pointer-events-none' } transition-opacity">
	<div class="max-w-screen-sm rounded-lg overflow-hidden shadow-xl
		{ options.danger ? 'border-2 border-rose-600' : '' }
		{ open ? 'translate-y-0' : 'translate-y-6' } transition-transform">
		<div class="flex items-start p-6 bg-white">
			{#if options.danger}
				<div class="flex-none w-10 mr-2 py-1 text-rose-600">
					<IconWarning />
				</div>
			{/if}
			<div>
				<h2 class="mb-0.5 text-stone-500 font-semibold">{ title }</h2>
				<p class="text-stone-700 font-light">{ message }</p>
			</div>
		</div>
		<div class="flex justify-end gap-2 px-6 py-3 bg-stone-100 border-t-2 border-stone-200">
			{#if isConfirm}
				<ModalButton on:click={ resolve.bind(null, false) }>
					{ options.noButton }
				</ModalButton>
				<ModalButton type={ options.danger ? 'danger' : 'action' } on:click={ resolve.bind(null, true) }>
					{ options.yesButton }
				</ModalButton>
			{:else}
				<ModalButton type={ options.danger ? 'danger' : 'action' } on:click={ resolve }>
					{ options.okButton }
				</ModalButton>
			{/if}
		</div>
	</div>
</div>
