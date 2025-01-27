<script lang="ts">
	import { twJoin } from 'tailwind-merge';
	import { cn } from '$lib/utils';
	import { platform } from '@tauri-apps/plugin-os';
	import { slide } from 'svelte/transition';

	import MacCloseButton from '$lib/components/window-controls/macos/mac-close.svelte';
	import MacMinimizeButton from '$lib/components/window-controls/macos/mac-minimize.svelte';
	import MacMaximizeButton from '$lib/components/window-controls/macos/mac-maximize.svelte';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Popover from '$lib/components/ui/popover';
	import * as Sheet from '$lib/components/ui/sheet';

	import { Settings, PanelLeft, Sun, Moon } from 'lucide-svelte';
	import WinMinimizeButton from '$lib/components/window-controls/windows/win-minimize.svelte';
	import WinMaximizeButton from '$lib/components/window-controls/windows/win-maximize.svelte';
	import WinCloseButton from '$lib/components/window-controls/windows/win-close.svelte';

	import {
		leftSideBarSheet,
		leftSideBarWidth,
		leftSideBarWidthBeforeCollapse,
		appMaximized
	} from '$lib/global-store';

	import { toggleMode } from 'mode-watcher';


    const TITLEBARICONSIZE: number = 20; 

	let isHover: boolean = $state(false);

	// let backgroundTitleBar: string = $state($currentThemeTitleMatchBackground ? "bg-background" : "bg-titleBar-background");

	// let solidTitleBar: string = $derived($currentThemeTitleBarSolid ? "bg-opacity-100" : "bg-opacity-90");

	/**
	 * @type {boolean} whether it's open or not
	 */
	let isSettingsOpen = $state(false);

	function handleSideBarFullWindow() {
		if ($leftSideBarWidth === 0) {
			$leftSideBarWidth = $leftSideBarWidthBeforeCollapse;
			console.log('Sidebar expanded to:', $leftSideBarWidth);
		} else if ($leftSideBarWidth > 0) {
			$leftSideBarWidthBeforeCollapse = $leftSideBarWidth;
			$leftSideBarWidth = 0;
			console.log('Sidebar collapsed.');
		}
	}

	function handleSideBarFullWindowCollapse() {
		if ($leftSideBarWidth === 0) {
			$leftSideBarSheet = true;
		}
	}

	function handleSideBarHalfWindow() {
		console.log('entered icon');
		$leftSideBarSheet = true;
	}
</script>

<div
	class={cn('grid h-12 max-h-12 w-full grid-cols-3 grid-rows-1 items-center justify-between px-4 bg-accent/20')}
	style="backdrop-filter: blur(20px)"
	data-tauri-drag-region
>
	<!-- Left Section -->
	<div class="flex items-center gap-4" data-tauri-drag-region>
		<!--MacOS Control Buttons on MacOS-->
		<div
			class={cn(
				'm-0.5 -mr-2 flex gap-2 transition-all duration-200',
				platform() === 'macos' && !$appMaximized ? 'w-16' : '-mr-5 w-0 overflow-hidden'
			)}
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

		<a
			class={cn(
				'group flex self-center align-middle font-sans text-xl font-semibold drop-shadow-lg'
			)}
			href="/"
		>
			<button
				class={cn(
					' bg-gradient-to-br from-red-500 via-orange-500 to-yellow-800 bg-clip-text text-transparent transition-all duration-100 ease-in-out hover:from-red-300 hover:via-orange-400 hover:to-amber-200'
				)}
			>
				TEMPLATE
			</button>
		</a>

		<!--before reaching breakpoint-->
		<button
			class={cn('p-0 text-muted-foreground hover:text-primary', 'md:hidden lg:grid')}
			onclick={handleSideBarFullWindow}
		>
			<PanelLeft class="transition-all ease-in-out hover:text-primary" />
		</button>

		<!--When the breakpoint is hit-->
		<button
			onmouseenter={handleSideBarHalfWindow}
			class={cn(
				'p-0 text-muted-foreground hover:bg-transparent hover:text-primary',
				'md:grid lg:hidden'
			)}
			onclick={handleSideBarFullWindow}
		>
			<PanelLeft class={cn('transition-all ease-in-out hover:text-primary')} />
		</button>
	</div>

	<!--Mid section-->
	<div>
		<!--Search Bar, Tabs, etc. here-->
	</div>

	<!-- Right Section -->
	<div class={cn('flex items-center justify-end gap-4')} data-tauri-drag-region>
		<!--Dark and Light-->
        <button onclick={toggleMode} class={cn("relative flex items-center justify-center rounded-full p-0 text-muted-foreground hover:bg-transparent hover:text-primary")}>
            <Sun
              size={TITLEBARICONSIZE}
              class={cn("transition-all duration-300 dark:rotate-90 opacity-100 dark:opacity-0 ")}
            />
            <Moon
              size={TITLEBARICONSIZE}
              class={cn("absolute transition-all duration-300 rotate-90 dark:rotate-0 opacity-0 dark:opacity-100")}
            />
          </button>

		<!-- Settings -->
		<Sheet.Root bind:open={isSettingsOpen}>
			<Sheet.Trigger
				class="flex items-center focus:outline-none focus:ring-0"
				disabled={isSettingsOpen}
			>
				<button class="p-0 text-muted-foreground hover:bg-transparent">
					<Settings size={TITLEBARICONSIZE} class=" transition-all ease-in-out hover:text-primary" />
				</button>
			</Sheet.Trigger>

			<!--mt-12 and pb-12 are necessary to offset it. bg-transparent necessary to preserve rounded screen corners-->
			<Sheet.Content
				side="right"
				class={cn(
					'mt-12 overflow-hidden rounded-br-md border-0 bg-transparent px-0 pb-12 pt-0 focus:outline-none focus:ring-0 '
				)}
				overlayClass="bg-background/10 duration-200 fixed inset-0 z-50 backdrop-blur-[2px]"
			>
				Stuff
			</Sheet.Content>
		</Sheet.Root>

		<!--Window Control Buttons on Windows OS-->
		{#if platform() === 'windows'}
			<div
				class={cn('m-0.5 flex h-12 items-center')}
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
