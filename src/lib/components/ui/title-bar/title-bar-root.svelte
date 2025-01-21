<script lang="ts">
    import { twJoin } from "tailwind-merge";
    import { cn } from "$lib/utils";
    import { platform } from "@tauri-apps/plugin-os";
    import { slide } from "svelte/transition"

    import MacCloseButton from "$lib/components/window-controls/macos/mac-close.svelte";
    import MacMinimizeButton from "$lib/components/window-controls/macos/mac-minimize.svelte";
    import MacMaximizeButton from "$lib/components/window-controls/macos/mac-maximize.svelte";

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Popover from "$lib/components/ui/popover";
    import * as Sheet from "$lib/components/ui/sheet";

    import { Search, ChevronDown, Settings, PanelLeft } from "lucide-svelte";
    import WinMinimizeButton from "$lib/components/window-controls/windows/win-minimize.svelte";
    import WinMaximizeButton from "$lib/components/window-controls/windows/win-maximize.svelte";
    import WinCloseButton from "$lib/components/window-controls/windows/win-close.svelte";
    // import AppSettingsContents from "../app-settings/app-settings-contents.svelte";
    import { leftSideBarSheet, leftSideBarWidth, leftSideBarWidthBeforeCollapse, appMaximized } from "$lib/global-store";

    let isHover: boolean = $state(false);

    // let backgroundTitleBar: string = $state($currentThemeTitleMatchBackground ? "bg-background" : "bg-titleBar-background");
    

    // let solidTitleBar: string = $derived($currentThemeTitleBarSolid ? "bg-opacity-100" : "bg-opacity-90");
    

    // let panelBorder: string;
    // $: panelBorder = $currentThemeTitleBarSolid ? "border-0" : "";

    let isSearchOpen: boolean = $state(false);

    /**
     * @type {boolean} whether it's open or not
     */
    let isSettingsOpen = $state(false);
    

    function handleSideBarFullWindow() {
        if ($leftSideBarWidth === 0) {
            $leftSideBarWidth = $leftSideBarWidthBeforeCollapse;
            console.log("Sidebar expanded to:", $leftSideBarWidth);
        } else if ($leftSideBarWidth > 0) {
            $leftSideBarWidthBeforeCollapse = $leftSideBarWidth;
            $leftSideBarWidth = 0;
            console.log("Sidebar collapsed.");
        }
    }

    function handleSideBarFullWindowCollapse(){
        if ($leftSideBarWidth === 0){
            $leftSideBarSheet = true
        }
    }

    function handleSideBarHalfWindow(){
        console.log("entered icon")
        $leftSideBarSheet = true

    }

</script>

<div class={cn("grid h-12 max-h-12 w-full grid-cols-3 grid-rows-1 items-center justify-between px-4")} style="backdrop-filter: blur(20px)" data-tauri-drag-region>
    <!-- Left Section -->
    <div class="flex items-center gap-4" data-tauri-drag-region>
        <div
            class={cn("m-0.5 flex gap-2 transition-all duration-200 -mr-2", platform() === "macos" && !$appMaximized ? 'w-16' : 'w-0 -mr-5 overflow-hidden')}
            onmouseenter={() => {
                isHover = true;
            }}
            onmouseleave={() => {
                isHover = false;
            }}
            aria-hidden="true"
            role="presentation"
            aria-label="Window Controls"
        >
            <MacCloseButton bind:isHover />
            <MacMinimizeButton bind:isHover />
            <MacMaximizeButton bind:isHover />
        </div>
        
        <a class={cn("group flex self-center align-middle font-sans text-xl font-semibold drop-shadow-lg")} href="/">
            <button
                class={cn(
                    " bg-gradient-to-br from-red-500 via-orange-500 to-yellow-800 bg-clip-text text-transparent transition-all duration-100 ease-in-out hover:from-red-300 hover:via-orange-400 hover:to-amber-200"
                )}
            >
                TEMPLATE
            </button>
        </a>

        <!--When it hasn't hit the breakpoint yet (onmouseenter={handleSideBarFullWindowCollapse})-->
        <button class={cn("p-0 text-muted-foreground hover:text-primary", "md:hidden lg:grid")} onclick={handleSideBarFullWindow}>
            <PanelLeft class="transition-all ease-in-out hover:text-primary" />
        </button>

        <!--When the breakpoint is hit-->
        <button onmouseenter={handleSideBarHalfWindow} class={cn("p-0 text-muted-foreground hover:text-primary  hover:bg-transparent", "md:grid lg:hidden")} onclick={handleSideBarFullWindow}>
            <PanelLeft class={cn("transition-all ease-in-out hover:text-primary")}/>
        </button>
        
    </div>
    

    <!--Mid section-->
    <Button
        variant="outline"
        aria-label="command search"
        class="flex-gr flex h-8 w-full  justify-between rounded-lg border text-muted-foreground shadow-md"
        onclick={() => {
            isSearchOpen = true;
        }}
    >
        <span class="flex items-center gap-2">
            <Search size="16" />
            <span> Command Search...</span>
        </span>
        <span>⌘ K</span>
    </Button>

    <!-- Right Section -->
    <div class={cn("flex items-center justify-end gap-4")} data-tauri-drag-region="">
        <!-- <Popover.Root>
            <Popover.Trigger>
                <button
                    class={cn(
                        "flex h-10 items-center justify-between gap-3 overflow-hidden rounded-md border-secondary px-2 text-muted-foreground transition-all duration-100 ease-in-out hover:bg-background hover:text-primary"
                    )}
                >
                    <div class="hidden items-center gap-2 lg:flex">
                        <span class="">C5372419 </span>
                        <Separator orientation="vertical" />
                        <ChevronDown size="16" />
                    </div>
                </button>
            </Popover.Trigger>
            <Popover.Content>
                <ProfileMenu/>
            </Popover.Content>
        </Popover.Root> -->

        <!-- Settings -->
        <Sheet.Root bind:open={isSettingsOpen}>
            <Sheet.Trigger class="flex items-center focus:ring-0 focus:outline-none" disabled={isSettingsOpen}>
                <button class="p-0 text-muted-foreground hover:bg-transparent ">
                    <Settings size={20} class=" transition-all ease-in-out hover:text-primary" />
                </button>
            </Sheet.Trigger>

            <!--mt-12 and pb-12 are necessary to offset it. bg-transparent necessary to preserve rounded screen corners-->
            <Sheet.Content side="right" class={cn("mt-12 overflow-hidden rounded-br-md bg-transparent px-0 pb-12 pt-0 border-0 focus:ring-0 focus:outline-none ")} overlayClass="bg-background/10 duration-200 fixed inset-0 z-50 backdrop-blur-[2px]">
                Stuff
            </Sheet.Content>
        </Sheet.Root>

        {#if platform() === "windows"}
            <div
                class={cn("m-0.5 flex h-12 items-center")}
                onmouseenter={() => {
                    isHover = true;
                }}
                onmouseleave={() => {
                    isHover = false;
                }}
                aria-hidden="true"
                role="presentation"
                aria-label="Window Controls"
            >
                <WinMinimizeButton />
                <WinMaximizeButton />
                <WinCloseButton />
            </div>
        {/if}
    </div>
</div>
