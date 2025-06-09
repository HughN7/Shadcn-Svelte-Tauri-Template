<style>
	.tab-pointer {
		cursor: default !important;
	}
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scroll-btn-inline[disabled] {
		opacity: 0.5;
		color: var(--muted-foreground, #888);
		cursor: not-allowed !important;
		pointer-events: none;
	}
	.tabs-parent {
		position: relative;
	}
</style>

<script lang="ts">
	import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { tabs, activeTab, appWidth } from "$lib/global-store";
	import { cn } from "$lib/utils";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { ChevronsLeftIcon, ChevronsRightIcon, CirclePlusIcon, PlusIcon } from "lucide-svelte";

	const flipDurationMs = 200;
	let scrollEl = $state<HTMLDivElement | null>(null);
	let showLeft = $state(false);
	let showRight = $state(false);

	function handleDnd(e: { detail: { items: any[]; }; }) {
		tabs.set(e.detail.items);
	}

	function handleTabSelect(id: number) {
		activeTab.set(id);
	}

	function addTab() {
		let nextId = 1;
		const tabsVal = $tabs;
		if (tabsVal.length > 0) {
			nextId = Math.max(...tabsVal.map(t => t.id)) + 1;
		}
		tabs.set([...tabsVal, { id: nextId, title: `Tab ${nextId}` }]);
		activeTab.set(nextId);
	}

	function removeTab(id: number) {
		const tabsVal = $tabs;
		if (tabsVal.length === 1) return; // Prevent removing last tab
		const idx = tabsVal.findIndex(t => t.id === id);
		const newTabs = tabsVal.filter(t => t.id !== id);
		tabs.set(newTabs);
		if ($activeTab === id) {
			const nextTab = newTabs[idx] || newTabs[idx - 1] || newTabs[0];
			activeTab.set(nextTab.id);
		}
	}

	function updateScrollButtons() {
		if (!scrollEl) return;
		showLeft = scrollEl.scrollLeft > 0;
		showRight = scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 1;
	}

	function scrollLeftBy() {
		if (scrollEl) {
			scrollEl.scrollBy({ left: -120, behavior: "smooth" });
		}
	}

	function scrollRightBy() {
		if (scrollEl) {
			scrollEl.scrollBy({ left: 120, behavior: "smooth" });
		}
	}

	function goHomeIfNotHome() {
		if (page.url.pathname !== "/") {
			goto("/");
		}
	}

	$effect(() => {
		updateScrollButtons();
		if (scrollEl) {
			scrollEl.addEventListener("scroll", updateScrollButtons);
			window.addEventListener("resize", updateScrollButtons);
		}
		return () => {
			if (scrollEl) scrollEl.removeEventListener("scroll", updateScrollButtons);
			window.removeEventListener("resize", updateScrollButtons);
		};
	});

	$effect(() => {
		$tabs;
		updateScrollButtons();
	});

	$effect(() => {
		$appWidth;
		updateScrollButtons();
	});
</script>

<div class={cn("tabs-parent flex items-center w-fit overflow-hidden")}>
	{#if showLeft || showRight}
		<!-- Always show both buttons if overflow, but disable if not scrollable -->
		<button
			class={cn(
				"scroll-btn-inline",
				"w-7 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 bg-[--background] bg-opacity-80 mx-1",
				"hover:bg-accent"
			)}
			onclick={scrollLeftBy}
			aria-label="Scroll tabs left"
			style="cursor: pointer"
			disabled={!showLeft}
		>
			<ChevronsLeftIcon/>
		</button>
	{/if}

	<!-- Tabs scroll area: no extra padding needed -->
	<div
		class={cn(
			"no-scrollbar flex flex-row gap-1 select-none bg-transparent overflow-x-auto whitespace-nowrap flex-grow min-w-0 relative"
		)}
		style="scroll-behavior: smooth;"
		use:dndzone={{ items: $tabs, flipDurationMs, dragDisabled: false, dropFromOthersDisabled: true, dropTargetStyle: { backgroundColor: 'transparent' } }}
		onconsider={handleDnd}
		onfinalize={handleDnd}
		data-tauri-drag-region
		bind:this={scrollEl}
	>
		{#each $tabs as tab (tab.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class={cn(
					"px-4 py-2 rounded-t-lg transition-colors items-center gap-2 tab-pointer inline-flex",
					tab.id === $activeTab && "bg-background text-primary",
					tab.id !== $activeTab && "bg-transparent hover:bg-accent"
				)}
				onclick={() => { handleTabSelect(tab.id); goHomeIfNotHome();}}
				animate:flip={{ duration: flipDurationMs }}
			>
				<span class="select-none">{tab.title}</span>
				{#if $tabs.length > 1}
					<button
						class={cn("ml-1 text-muted-foreground hover:text-destructive px-1 rounded focus:outline-none tab-pointer")}
						onclick={(e) => { e.stopPropagation(); removeTab(tab.id); }}
						title="Close tab"
						tabindex="-1"
					>
						&times;
					</button>
				{/if}
			</div>
		{/each}
	</div>

	{#if showLeft || showRight}
		<!-- Always show both buttons if overflow, but disable if not scrollable -->
		<button
			class={cn(
				"scroll-btn-inline",
				"w-7 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 bg-[--background] bg-opacity-80 mx-1",
				"hover:bg-accent"
			)}
			onclick={scrollRightBy}
			aria-label="Scroll tabs right"
			style="cursor: pointer"
			disabled={!showRight}
		>
			<ChevronsRightIcon/>
		</button>
	{/if}

	<!-- Add Tab Button (always visible at end) -->
	<button
		class={cn("flex ml-2 cursor-pointer self-center rounded-full bg-transparent hover:bg-accent text-xl font-bold text-muted-foreground hover:text-primary transition-colors tab-pointer flex-shrink-0")}
		onclick={addTab}
		title="Add tab"
	>
		<PlusIcon class="hover:bg-accent rounded-full"/>
	</button>
</div>
