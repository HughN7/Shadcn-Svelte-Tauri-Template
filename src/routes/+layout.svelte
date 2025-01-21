<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-black h-screen text-white">
	{@render children()}
</div>

