<script lang="ts">
	import DraggableTabs from "$lib/components/tabs/draggable-tabs.svelte";
	let tabs = [
		{ id: 1, title: "Tab 1" },
		{ id: 2, title: "Tab 2" },
		{ id: 3, title: "Tab 3" }
	];
	let activeTab = 1;
</script>

<DraggableTabs
	tabs={tabs}
	activeTab={activeTab}
	onTabSelect={(id: number) => activeTab = id}
/>

<div class="p-2">
	Active Tab: {activeTab}
</div>
