<script lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window';
    import { Button } from "$lib/components/ui/button";
    import { X } from 'lucide-svelte';
    import { cn } from '$lib/utils';
    const appWindow = getCurrentWindow();
    let isHover: boolean; 
</script>

<Button variant="ghost" class="{cn("py-0 px-2 text-muted-foreground hover:text-red-500")}" onclick={async () => { await appWindow.close() }} >
    <X/>
</Button>
