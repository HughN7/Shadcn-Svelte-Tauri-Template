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

<Button variant="ghost" class="{cn("py-0 px-2 text-muted-foreground ")}"   onclick={handleClick}>
	<Square size="20"/>
</Button>