<script lang="ts">
    import {
        appWidth,
        leftSideBarDragHandle,
        leftSideBarSheet,
        leftSideBarWidth,
        leftSideBarWidthBeforeCollapse,
        MIDBREAKPOINTPX,
    } from '$lib/global-store';
    import { cn } from '$lib/utils';
    import { fly, slide } from 'svelte/transition';

    import LeftSidebarContents from './left-sidebar-contents.svelte';

    function handleMouseMove(event: MouseEvent) {
        if ($leftSideBarDragHandle) {
            if (event.clientX < 90) {
                $leftSideBarWidth = 0;
                $leftSideBarWidthBeforeCollapse = 220;
            } else {
                $leftSideBarWidth = Math.max(220, Math.min(event.clientX, 330));
            }
        }
    }

    function handleMouseDown() {
        if (window.innerWidth < MIDBREAKPOINTPX) {
            $leftSideBarWidth = 0;
            return;
        }

        $leftSideBarDragHandle = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }


    function handleTriggerleftSideBarSheet(){
		if (($appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth === 0) || ($appWidth < MIDBREAKPOINTPX)) {
			$leftSideBarSheet = true
		}
	}

    function handleExitSideBarSheet() {
        $leftSideBarSheet = false // Single handler for both window sizes
    }


    function handleMouseUp() {
        if (window.innerWidth < MIDBREAKPOINTPX) {
            $leftSideBarWidth = 0;
            return;
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        $leftSideBarDragHandle = false;
    }

</script>

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
                'w-1 transition-all duration-300 ease-in-out',
                $leftSideBarWidth !== 0 ? 'hover:bg-primary' : ''
            )}
            onmousedown={handleMouseDown}
        ></button>
    </div>
{/if}

<button
    aria-label="left-sidebar hover-trigger-large-window"
    class={cn($appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth > 0 ? 'w-0' : 'w-[9px]', "my-2 rounded-xl transition-all duration-300 ease-in-out")}
    onmouseenter={handleTriggerleftSideBarSheet}
></button>

<!-- 
Only let the side bar slide out when the window is small OR (when the window is Big AND the fixed side bar is collapsed):
- $leftSideBarSheet is the trigger that toggles the sheet
-->
{#if ($appWidth < MIDBREAKPOINTPX || ($appWidth >= MIDBREAKPOINTPX && $leftSideBarWidth === 0)) && $leftSideBarSheet}
    <aside class={cn("fixed inset-0 z-50 mt-12 flex")}>
        <div
            in:fly={{ x: -500, duration: 500, opacity: 1 }}
            out:fly={{ x: -300, duration: 500,  opacity: 1 }} class="w-72">
            <LeftSidebarContents />
        </div>
        <button onclick={handleExitSideBarSheet} class="flex flex-grow" aria-label="Close sidebar"></button>
    </aside>
{/if}