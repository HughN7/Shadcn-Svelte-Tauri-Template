<script lang="ts">
	import DraggableTabs from "$lib/components/tabs/draggable-tabs.svelte";
	import { tabs, activeTab } from "$lib/global-store";
</script>

<DraggableTabs />

<div class="p-2">
	Active Tab: {$activeTab}
</div>
