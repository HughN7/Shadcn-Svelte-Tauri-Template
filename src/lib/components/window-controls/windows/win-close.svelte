<script lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window';
    import { Button } from "$lib/components/ui/button";
    import { X } from 'lucide-svelte';
    import { cn } from '$lib/utils';
    const appWindow = getCurrentWindow();
    let isHover: boolean; 
</script>

<!-- <button class="{cn("py-0 px-2 text-muted-foreground ")}" onclick={async () => { await appWindow.close() }} >
    </>
</button> -->

<button class="{cn("hover:text-red-500 text-muted-foreground transition-all duration-200 hover:bg-accent h-full mt-1 pb-1 px-5 rounded-tr-md ")}"  onclick={async () => { await appWindow.close() }}>
	<X size="16"/>
</button>
