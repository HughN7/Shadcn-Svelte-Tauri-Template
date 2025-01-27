<script lang="ts">
	import { cn } from '$lib/utils';
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { appMaximized, appWidth, leftSideBarSheet, leftSideBarWidth, leftSideBarWidthBeforeCollapse, MIDBREAKPOINTPX } from '$lib/global-store';
	import { slide } from 'svelte/transition';


    import * as Sheet from "$lib/components/ui/sheet/index.js";
	import TitleBarRoot from '$lib/components/ui/title-bar/title-bar-root.svelte';
  
    import { ModeWatcher } from "mode-watcher";
    




    let { children } = $props();

    let isDragging = $state(false);

    function handleMouseMove(event: MouseEvent) {
        if (isDragging) {
            // Update constraints: collapse if below 90px, else set within range
        if (event.clientX < 90) {
                $leftSideBarWidth = 0; // Collapse
                $leftSideBarWidthBeforeCollapse = 220; //If they're dragging to collapse it, we set it to the minimum.
                //isCollapsed = true; // Set collapsed state
            } else {
                $leftSideBarWidth = Math.max(220, Math.min(event.clientX, 330));
                //isCollapsed = false; // Reset collapsed state
            }
        }
    }

    function handleMouseUp() {
        if (window.innerWidth < 1024) {
            $leftSideBarWidth = 0;
            return;
        }

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        isDragging = false;
    }

    function handleMouseDown() {
        if (window.innerWidth < 1024) {
            $leftSideBarWidth = 0;
            return;
        }

        isDragging = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseEnter() {
        console.log("Mouse Enter");

        // getCurrentWindow().isMaximized().then((result: boolean)=>{
        //     console.log("maximized: ", result)
        // })

        $leftSideBarSheet = true;
    }

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
            $leftSideBarSheet = false;
        }
    });

</script>

<ModeWatcher defaultMode="dark" />

<div class="flex h-screen flex-col overflow-hidden" id="main-area">
    <TitleBarRoot />

    <div class={cn("flex flex-row h-[calc(100vh-48px)] overflow-hidden bg-background")}>
        <!--Side bar that's expanded / fixed-->
        {#if $appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth > 0}
            <div class="flex">
                <aside class={cn("flex size-full flex-col overflow-hidden")} style="width: {$leftSideBarWidth}px;" transition:slide={{ axis: "x" }}>
                    <!-- <LeftSidebarContents /> -->
                </aside>
    
                
                <!-- This is the drag handle -->
                <button aria-label="left-sidebar drag-handle" class={cn("w-1 cursor-col-resize transition-all duration-300 ease-in-out", $leftSideBarWidth !== 0 ? "hover:bg-primary" : "")} onmousedown={handleMouseDown}></button>
            </div>
        {/if}

        {#if $leftSideBarWidth === 0 || $appWidth < MIDBREAKPOINTPX}
            <!--Only render the hover trigger area for slide out sidebar. -->
            <button aria-label="left-sidebar drag-handle" class={cn("my-2 w-1.5 cursor-col-resize rounded-xl transition-all duration-300 ease-in-out", $leftSideBarWidth !== 0 ? "hover:bg-secondary" : "")} onmouseenter={handleMouseEnter}
            ></button>
        {/if}

        <!--Side bar that's collapsed-->
        <Sheet.Root bind:open={$leftSideBarSheet}>
            <Sheet.Content side={"left"} class={cn(" mt-12 w-72 rounded-bl-md border-0 bg-transparent px-0 pb-12 pt-0")}>
                <!-- <LeftSidebarContents /> -->
                 stuff
            </Sheet.Content>
        </Sheet.Root>

        <!--Main Contents-->
        <main class={cn("my-1.5 flex flex-1 rounded-sm border bg-accent/20 md:mr-1.5 overflow-hidden", isDragging ? "select-none" : "")}>
            {@render children()}
        </main>
    </div>
</div>


