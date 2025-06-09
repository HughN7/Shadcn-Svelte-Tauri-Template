<script lang="ts">
	import { cn } from '$lib/utils';
	import { platform } from '@tauri-apps/plugin-os';
	import { Settings, PanelLeft, Sun, Moon } from 'lucide-svelte';
	import WinMinimizeButton from '$lib/components/window-controls/windows/win-minimize.svelte';
	import WinMaximizeButton from '$lib/components/window-controls/windows/win-maximize.svelte';
	import WinCloseButton from '$lib/components/window-controls/windows/win-close.svelte';
	import MacCloseButton from '$lib/components/window-controls/macos/mac-close.svelte';
	import MacMinimizeButton from '$lib/components/window-controls/macos/mac-minimize.svelte';
	import MacMaximizeButton from '$lib/components/window-controls/macos/mac-maximize.svelte';
	import {
		leftSideBarSheet,
		leftSideBarWidth,
		leftSideBarWidthBeforeCollapse,
		appMaximized,

		MIDBREAKPOINTPX,

		appWidth


	} from '$lib/global-store';
	import { mode, setMode } from 'mode-watcher';
	import { get } from 'svelte/store';
	import DraggableTabs from "$lib/components/tabs/draggable-tabs.svelte";
	import { goto } from '$app/navigation';

	const TITLEBARICONSIZE: number = 20;

	let isHover = $state(false);

	// is the OS level theme dark? We init it to the system default, but it will update if the user changes it.
	let osThemeDark = $state(window.matchMedia('(prefers-color-scheme: dark)').matches);

	/**
	 * * Title bar item theme
	 */
	let titleBarItemTheme = $derived(cn(
		osThemeDark 
			? ($leftSideBarSheet ? "text-white" : "hover:text-white") 
			: ($leftSideBarSheet ? "text-black/60" : "hover:text-black/60"),
		"text-muted-foreground transition-all duration-200 cursor-pointer"
	));

	function handleLeftSideBar() {
		
		if ($appWidth < MIDBREAKPOINTPX){
			// Toggle the sidebar sheet in small window
			$leftSideBarSheet = !$leftSideBarSheet;
		} else {
			// Toggle sidebar width in large window
			if ($leftSideBarWidth === 0) {
				$leftSideBarWidth = $leftSideBarWidthBeforeCollapse;
			} else {
				$leftSideBarWidthBeforeCollapse = $leftSideBarWidth;
				$leftSideBarWidth = 0;
			}
		}
	}

	$effect(() => {

		// Listen for changes in the user's color scheme preference
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		// Update osThemeDark when the media query matches
		const listener = (event: MediaQueryListEvent) => {
			osThemeDark = event.matches;
		};

		// Initial check
		mediaQuery.addEventListener('change', listener);

		// Cleanup listener on component destroy
		return () => mediaQuery.removeEventListener('change', listener);
	});

	
</script>

<div
	class={cn('flex justify-between h-12 max-h-12 w-full items-center', platform() === 'macos' ? 'px-3' : 'pl-3')}
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

		<!-- <a
			class={cn(
				'group flex self-center align-middle font-sans text-xl font-semibold drop-shadow-lg'
			)}
			href="/"
		>
			<button
				class={cn(
					'bg-linear-to-br from-red-500 via-orange-500 to-yellow-800 bg-clip-text text-transparent transition-all duration-500 ease-in-out hover:from-red-300 hover:via-orange-400 hover:to-amber-200'
				)}
			>
				TEMPLATE
			</button>
		</a> -->

		<button
			class={cn(titleBarItemTheme)}
			onclick={handleLeftSideBar}
		>
			<PanelLeft size={TITLEBARICONSIZE} class={cn(titleBarItemTheme)} />
		</button>
	</div>

	<!-- Mid Section: Tabs are rendered here 
		Replace this with search bar or other components as needed 
	-->
	<div class="size-full overflow-hidden mx-2 my-4 pt-2 flex " data-tauri-drag-region>
		<DraggableTabs />
	</div>

	<!-- Right Section -->
	<div class={cn('flex items-center justify-end gap-4')} data-tauri-drag-region>
		{#if mode.current === 'dark'}
			<button class={cn(titleBarItemTheme)} onclick={() => setMode('light')}>
				<Moon
					size={TITLEBARICONSIZE}
				/>
			</button>	
		{:else}
			<button class={cn(titleBarItemTheme)} onclick={() => setMode('dark')}>
				<Sun
					size={TITLEBARICONSIZE}
				/>
			</button>
		{/if}

		<!-- Settings -->
		<button class="p-0 text-muted-foreground hover:bg-transparent" onclick={() => {goto('/settings');}}>
			<Settings size={TITLEBARICONSIZE} class={cn("transition-all ease-in-out hover:text-primary", titleBarItemTheme)} />
		</button>

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
