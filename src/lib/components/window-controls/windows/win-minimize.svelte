<script lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window';
    import { Minus } from 'lucide-svelte';
    const appWindow = getCurrentWindow();
    import { Button } from "$lib/components/ui/button";
    import { cn } from '$lib/utils';
</script>

<Button variant="ghost" class="{cn("py-0 px-2 text-muted-foreground")}" onclick={async () => { await appWindow.minimize() }}  >
    <Minus/>
</Button>
