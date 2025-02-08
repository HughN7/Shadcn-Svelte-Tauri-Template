<script lang="ts">
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { Square } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { invoke } from '@tauri-apps/api/core';
	import { ResettableTimeout } from '$lib/utils';

	const appWindow = getCurrentWindow();

	const snapLayoutHoverTimeout = new ResettableTimeout(async () => {
		await triggerSnapLayout();
	}, 500);

	async function triggerSnapLayout() {
		try {
			await invoke('show_snap_overlay');
		} catch (error) {
			console.error('Error triggering snap layout:', error);
		}
	}

	function handleHover() {
		snapLayoutHoverTimeout.start();
	}

	function handleHoverExit() {
		snapLayoutHoverTimeout.clear();
	}

	async function handleClick() {
		if (await appWindow.isMaximized()) {
			await appWindow.unmaximize();
			return;
		}
		await appWindow.maximize();
	}
</script>

<button
	class={cn(
		'mt-1 h-full px-5 pb-1 text-muted-foreground transition-all duration-200 hover:bg-accent'
	)}
	onclick={handleClick}
	onmouseover={handleHover}
	onfocus={handleHover}
	onmouseleave={handleHoverExit}
	onblur={handleHoverExit}
>
	<Square size="12" />
</button>
