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
</style>

<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { tabs, activeTab } from "$lib/global-store";
	import { onMount } from "svelte";

	const flipDurationMs = 200;
	let scrollEl: HTMLDivElement | null = null;
	let showLeft = false;
	let showRight = false;

	function handleDnd(e: { detail: { items: any[]; }; }) {
		tabs.set(e.detail.items);
	}

	function handleTabSelect(id: number) {
		activeTab.set(id);
	}

	function addTab() {
		let nextId = 1;
		const $tabsVal = $tabs;
		if ($tabsVal.length > 0) {
			nextId = Math.max(...$tabsVal.map(t => t.id)) + 1;
		}
		tabs.set([...$tabsVal, { id: nextId, title: `Tab ${nextId}` }]);
		activeTab.set(nextId);
	}

	function removeTab(id: number) {
		const $tabsVal = $tabs;
		if ($tabsVal.length === 1) return; // Prevent removing last tab
		const idx = $tabsVal.findIndex(t => t.id === id);
		const newTabs = $tabsVal.filter(t => t.id !== id);
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

	onMount(() => {
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

	$: $tabs, updateScrollButtons();
</script>

<div class="relative flex items-center w-full">
	{#if showLeft}
		<button
			class="absolute left-0 z-10 h-full px-1 bg-background/80 hover:bg-accent rounded-l-lg transition"
			onclick={scrollLeftBy}
			aria-label="Scroll tabs left"
			style="cursor: pointer"
		>
			&#8592;
		</button>
	{/if}

	<div
		bind:this={scrollEl}
		class="no-scrollbar flex flex-row gap-1 select-none bg-transparent overflow-x-auto whitespace-nowrap w-full"
		style="scroll-behavior: smooth;"
		use:dndzone={{ items: $tabs, flipDurationMs, dragDisabled: false, dropFromOthersDisabled: true, dropTargetStyle: { backgroundColor: 'transparent' } }}
		onconsider={handleDnd}
		onfinalize={handleDnd}
	>
		{#each $tabs as tab (tab.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="px-4 py-2 rounded-t-lg transition-colors flex items-center gap-2 tab-pointer inline-flex"
				class:bg-background={tab.id === $activeTab}
				class:text-primary={tab.id === $activeTab}
				class:bg-transparent={tab.id !== $activeTab}
				class:hover:bg-accent={tab.id !== $activeTab}
				onclick={() => handleTabSelect(tab.id)}
				animate:flip={{ duration: flipDurationMs }}
			>
				<span class="select-none">{tab.title}</span>
				{#if $tabs.length > 1}
					<button
						class="ml-1 text-muted-foreground hover:text-destructive px-1 rounded focus:outline-none tab-pointer"
						onclick={(e) => { e.stopPropagation(); removeTab(tab.id); }}
						title="Close tab"
						tabindex="-1"
					>
						&times;
					</button>
				{/if}
			</div>
		{/each}
		<!-- Add Tab Button -->
		<button
			class="ml-2 px-2 py-1 rounded-t-lg bg-transparent hover:bg-accent text-xl font-bold text-muted-foreground hover:text-primary transition-colors tab-pointer inline-flex"
			onclick={addTab}
			title="Add tab"
		>
			+
		</button>
	</div>

	{#if showRight}
		<button
			class="absolute right-0 z-10 h-full px-1 bg-background/80 hover:bg-accent rounded-r-lg transition"
			onclick={scrollRightBy}
			aria-label="Scroll tabs right"
			style="cursor: pointer"
		>
			&#8594;
		</button>
	{/if}
</div>
