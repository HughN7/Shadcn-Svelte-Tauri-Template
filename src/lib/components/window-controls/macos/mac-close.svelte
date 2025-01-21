<script lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window';
    const appWindow = getCurrentWindow();
    interface Props {
        isHover: boolean;
    }

    let { isHover = $bindable() }: Props = $props();
</script>

<div 
    onclick={async () => { await appWindow.close() }} 
    class="size-[12px]" 
    aria-label="close" 
    aria-hidden=true 
    role="presentation">
    
    {#if isHover}
    <svg viewBox="0 0 85.4 85.4" xmlns="http://www.w3.org/2000/svg">
        <g clip-rule="evenodd" fill-rule="evenodd">
            <circle cx="42.7" cy="42.7" r="42.7" fill="#ff5f57" />
            <line x1="28" y1="28" x2="57" y2="57" stroke="#4c0002" stroke-width="6" stroke-linecap="round" />
            <line x1="57" y1="28" x2="28" y2="57" stroke="#4c0002" stroke-width="6" stroke-linecap="round" />
        </g>
    </svg>
    {:else}
    <svg viewBox="0 0 85.4 85.4" xmlns="http://www.w3.org/2000/svg">
        <circle cx="42.7" cy="42.7" r="42.7" fill="#ff5f57" />
    </svg>
    {/if}
</div>
