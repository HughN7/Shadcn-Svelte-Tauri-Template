<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { tabs, activeTab } from "$lib/global-store";

	const flipDurationMs = 200;

	function handleDnd(e: { detail: { items: any[]; }; }) {
		tabs.set(e.detail.items);
	}

	function handleTabSelect(id: number) {
		activeTab.set(id);
	}
</script>

<div
	use:dndzone={{ items: $tabs, flipDurationMs, dragDisabled: false, dropFromOthersDisabled: true }}
	onconsider={handleDnd}
	onfinalize={handleDnd}
	class="flex flex-row gap-1 select-none"
>
	{#each $tabs as tab (tab.id)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="px-4 py-2 rounded-t cursor-pointer transition-colors"
			class:bg-primary={tab.id === $activeTab}
			class:text-primary-foreground={tab.id === $activeTab}
			class:bg-muted={tab.id !== $activeTab}
			onclick={() => handleTabSelect(tab.id)}
			animate:flip={{ duration: flipDurationMs }}
		>
			{tab.title}
		</div>
	{/each}
</div>
