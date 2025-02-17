<script lang="ts">
    import {
        appWidth,
        leftSideBarHandleDrag,
        leftSideBarSheetSmallWindow,
        leftSideBarWidth,
        leftSideBarWidthBeforeCollapse,
        MIDBREAKPOINTPX,
        leftSideBarSheetLargeWindow // Import the new store variable
    } from '$lib/global-store';
    import { cn } from '$lib/utils';
    import { fly, slide } from 'svelte/transition';

    import LeftSidebarContents from './left-sidebar-contents.svelte';

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
        if (window.innerWidth < MIDBREAKPOINTPX) {
            $leftSideBarWidth = 0;
            return;
        }

        $leftSideBarHandleDrag = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    // function handleEnterSideBarSmallWindow() {
    //     $leftSideBarSheetSmallWindow = true;
    // }

	function handleExitSideBarSmallWindow() {
		$leftSideBarSheetSmallWindow = false
	}
	

    // // New handlers for large window hover
    // function handleEnterSideBarLargeWindow() {
    //     if ($appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth === 0) {
    //         $leftSideBarSheetLargeWindow = true
    //     }
    // }

	function handleTriggerleftSideBarSheet(){

		console.log("Attempting to trigger left side bar sheet")
		
		if ($appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth === 0) {
            $leftSideBarSheetLargeWindow = true
			return 
        }
		
		if($appWidth < MIDBREAKPOINTPX){
			$leftSideBarSheetSmallWindow = true
		}
	}

    function handleExitSideBarLargeWindow() {
        $leftSideBarSheetLargeWindow = false
    }


    function handleMouseUp() {
        if (window.innerWidth < MIDBREAKPOINTPX) {
            $leftSideBarWidth = 0;
            return;
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        $leftSideBarHandleDrag = false;
    }

</script>

<!--non collapsed fixed sidebar-->
{#if $appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth > 0}
    <div class="flex">
        <aside
            class={cn('flex size-full flex-col overflow-hidden')}
            style="width: {$leftSideBarWidth}px;"
            transition:slide={{ axis: 'x' }}
        >
            <LeftSidebarContents />
        </aside>

        <button
            aria-label="left-sidebar drag-handle"
            class={cn(
                'w-1 cursor-col-resize transition-all duration-300 ease-in-out',
                $leftSideBarWidth !== 0 ? 'hover:bg-primary' : ''
            )}
            onmousedown={handleMouseDown}
        ></button>
    </div>
{/if}

<!--Large Window-->
<!-- {#if $leftSideBarWidth === 0 && $appWidth >= MIDBREAKPOINTPX}
    <button
        aria-label="left-sidebar hover-trigger-large-window"
        class="my-2 w-[9px] cursor-col-resize rounded-xl transition-all duration-300 ease-in-out hover:bg-secondary"
        onmouseenter={handleEnterSideBarLargeWindow}
    ></button>
{/if} -->

<!--Small Window-->
<!-- {#if $leftSideBarWidth === 0 && $appWidth < MIDBREAKPOINTPX}
    <button
        aria-label="left-sidebar drag-handle"
        class={cn(
            'my-2 w-[9px] cursor-col-resize rounded-xl transition-all duration-300 ease-in-out'
        )}
        onmouseenter={handleEnterSideBarSmallWindow}
    ></button>
{/if} -->

<button
	aria-label="left-sidebar hover-trigger-large-window"
	class={cn($appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth > 0 ? 'w-0' : 'w-[9px]', "my-2 cursor-col-resize rounded-xl transition-all duration-300 ease-in-out")}
	onmouseenter={handleTriggerleftSideBarSheet}
></button>

<!--Small Window-->
{#if $appWidth < MIDBREAKPOINTPX && $leftSideBarSheetSmallWindow}
    <aside class={cn("fixed inset-0 z-50 mt-12 flex")}>

        <div
            in:fly={{ x: -500, duration: 500, opacity: 1 }}
            out:fly={{ x: -300, duration: 500,  opacity: 1 }} class="w-72">
            <LeftSidebarContents />
        </div>
        <button onclick={handleExitSideBarSmallWindow} class="flex flex-grow" aria-label="Close sidebar"></button>
    </aside>
{/if}

<!--Large Window-->
{#if $appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth === 0 && $leftSideBarSheetLargeWindow}
	<aside class={cn("fixed inset-0 z-50 mt-12 flex")}>

		<div
			in:fly={{ x: -500, duration: 500, opacity: 1 }}
			out:fly={{ x: -300, duration: 500,  opacity: 1 }} class="w-72">
			<LeftSidebarContents />
		</div>
		<button onclick={handleExitSideBarLargeWindow} class="flex flex-grow" aria-label="Close sidebar"></button>
	</aside>
{/if}