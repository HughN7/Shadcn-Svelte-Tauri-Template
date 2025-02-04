<script lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window';
    import { Minus } from 'lucide-svelte';
    const appWindow = getCurrentWindow();
    import { Button } from "$lib/components/ui/button";
    import { cn } from '$lib/utils';
</script>

<button class="{cn("text-muted-foreground transition-all duration-200 hover:bg-accent h-full mt-1 pb-1 px-5")}" onclick={async () => { await appWindow.minimize() }}  >
    <Minus size="15"/>
</button>
