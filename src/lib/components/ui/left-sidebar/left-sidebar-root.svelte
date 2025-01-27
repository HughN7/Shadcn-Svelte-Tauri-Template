<script lang="ts">

	import { appWidth, leftSideBarHandleDrag, leftSideBarSheet, leftSideBarWidth, leftSideBarWidthBeforeCollapse, MIDBREAKPOINTPX } from "$lib/global-store";
	import { cn } from "$lib/utils";
    import { slide } from 'svelte/transition';


    import * as Sheet from "$lib/components/ui/sheet/index.js";
	import LeftSidebarContents from "./left-sidebar-contents.svelte";

    function handleMouseMove(event: MouseEvent) {
        if ($leftSideBarHandleDrag) {
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

    function handleMouseDown() {
        if (window.innerWidth < 1024) {
            $leftSideBarWidth = 0;
            return;
        }

        $leftSideBarHandleDrag = true;
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

    function handleMouseUp() {
        if (window.innerWidth < 1024) {
            $leftSideBarWidth = 0;
            return;
        }

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        $leftSideBarHandleDrag = false;
    }

</script>
 <!--Side bar that's expanded / fixed-->
 {#if $appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth > 0}
 <div class="flex">
     <aside class={cn("flex size-full flex-col overflow-hidden")} style="width: {$leftSideBarWidth}px;" transition:slide={{ axis: "x" }}>
         <LeftSidebarContents />
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
     <LeftSidebarContents />
 </Sheet.Content>
</Sheet.Root>