<script lang="ts">
	import { getCurrentWindow } from '@tauri-apps/api/window';
	import { Square } from 'lucide-svelte';
	import { Button } from "$lib/components/ui/button";
    import { cn } from '$lib/utils';

	const appWindow = getCurrentWindow();


	async function handleClick(){
		
		if (await appWindow.isMaximized()) {
			await appWindow.unmaximize();
			return;
		}
		await appWindow.maximize();
	}

</script>

<button class="{cn("text-muted-foreground hover:bg-accent h-full px-5 ")}"   onclick={handleClick}>
	<Square size="12"/>
</button>