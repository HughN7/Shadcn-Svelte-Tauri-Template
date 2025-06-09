<script lang="ts">
	import { tabs, activeTab } from "$lib/global-store";
	import { Input } from "$lib/components/ui/input/index.js";

	let trackingNumbers = [""];
	
	function handleInputChange(idx: number, value: string) {
		trackingNumbers[idx] = value;
		// Remove empty trailing fields except the last one
		while (trackingNumbers.length > 1 && trackingNumbers[trackingNumbers.length - 2] === "" && trackingNumbers[trackingNumbers.length - 1] === "") {
			trackingNumbers.pop();
		}
		// Always keep an empty field at the end
		if (trackingNumbers[trackingNumbers.length - 1] !== "") {
			trackingNumbers = [...trackingNumbers, ""];
		}
	}

	function handlePaste(idx: number, event: ClipboardEvent) {
		const text = event.clipboardData?.getData("text");
		if (!text) return;
		const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
		if (lines.length > 1) {
			event.preventDefault();
			trackingNumbers.splice(idx, 1, ...lines);
			// Always keep an empty field at the end
			if (trackingNumbers[trackingNumbers.length - 1] !== "") {
				trackingNumbers.push("");
			}
			trackingNumbers = [...trackingNumbers];
		}
	}
</script>

<!-- Tabs are now in the title bar -->

<div class="p-2">
	Active Tab: {$activeTab}

	<!-- Multi input example -->
	<div class="flex flex-col gap-2 max-w-xs mt-4">
		{#each trackingNumbers as num, idx (idx)}
			<Input
				type="text"
				placeholder="Enter tracking number"
				class="max-w-xs"
				bind:value={trackingNumbers[idx]}
				oninput={e => e.target && handleInputChange(idx, (e.target as HTMLInputElement).value)}
				onpaste={e => handlePaste(idx, e)}
			/>
		{/each}
	</div>
</div>