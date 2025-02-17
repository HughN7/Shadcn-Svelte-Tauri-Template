<script lang="ts">
	import { cn } from '$lib/utils';
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { appMaximized, appWidth, leftSideBarHandleDrag, leftSideBarSheetSmallWindow, leftSideBarWidth, leftSideBarWidthBeforeCollapse, MIDBREAKPOINTPX } from '$lib/global-store';
	
	import TitleBarRoot from '$lib/components/ui/title-bar/title-bar-root.svelte';
  
    import { ModeWatcher } from "mode-watcher";
	import LeftSidebarRoot from '$lib/components/ui/left-sidebar/left-sidebar-root.svelte';
    

    let { children } = $props();
    

    // Function to check window width and collapse sidebar if below md breakpoint
    async function updateWindowStatus() {
        console.log("Window resizing");
        $appWidth = window.innerWidth;
        await setTimeout(async () => {
            console.log("Checking maximized");
            $appMaximized = await getCurrentWindow().isFullscreen();
        }, 600);
    }

    onMount(() => {
        updateWindowStatus(); // Initial check
        window.addEventListener("resize", updateWindowStatus); // Add resize listener
        document.addEventListener('contextmenu', event => event.preventDefault()); //Prevent global right click
    });

    onDestroy(() => {
        window.removeEventListener("resize", updateWindowStatus); // Clean up listener
    });

    /**
     * if sidebar width is greater than 0 and app width is before the breakpoint, make sure that the sheet is shut off.
     *
     */

    $effect(() => {
        if ($leftSideBarWidth > 0 && $appWidth >= MIDBREAKPOINTPX) {
            $leftSideBarSheetSmallWindow = false;
        }
    });

</script>

<ModeWatcher defaultMode="dark" />

<div class="flex h-screen flex-col overflow-hidden" id="main-area">
    <TitleBarRoot />

    <!--Everything under the title bar-->
    <div class={cn("flex flex-row h-[calc(100vh-48px)] overflow-hidden bg-background")} style="-webkit-app-region: no-drag;">
       
        <!--Left Sidebar, needs to be kept here-->
        <LeftSidebarRoot/>

        <!--Main Contents-->
        <main class={cn("mt-2 mb-[8px] flex flex-1 rounded-sm border bg-accent/20 md:mr-[9px] overflow-hidden", $leftSideBarHandleDrag ? "select-none" : "")}>
            {@render children()}
        </main>
    </div>
</div>