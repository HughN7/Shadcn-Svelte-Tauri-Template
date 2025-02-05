<script lang="ts">
    let test = $state(false)

    import { invoke } from '@tauri-apps/api/core';

    async function triggerSnapLayout() {
        try {
            await invoke('show_snap_overlay');
        } catch (error) {
            console.error('Error triggering snap layout:', error);
        }
    }


</script>


<div class="p-2">
    Test Content

    <button class="border border-red-500 bg-accent rounded-lg p-2 hover:bg-accent/80 duration-200" onclick={triggerSnapLayout}>Trigger Snap Layout</button>



</div>
