<script lang="ts">
	import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button/index.js";
	import { ChevronLeft } from "lucide-svelte";

</script>



<section>
    <Button variant="ghost" onclick={() => goto('/')}>
        <ChevronLeft/>
    </Button>
</section>