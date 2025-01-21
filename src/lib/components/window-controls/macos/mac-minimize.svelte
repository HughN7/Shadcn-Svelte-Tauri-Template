<script lang="ts">
    import { getCurrentWindow } from '@tauri-apps/api/window';
    const appWindow = getCurrentWindow();
    let { isHover = $bindable() } = $props();
</script>

<div 
    onclick={async () => { await appWindow.minimize() }} 
    class="size-[12px]" 
    aria-label="minimize" 
    aria-hidden=true 
    role="presentation"
>
    
    {#if isHover}
    <svg viewBox="0 0 85.4 85.4" xmlns="http://www.w3.org/2000/svg">
        <g clip-rule="evenodd" fill-rule="evenodd">
            <circle cx="42.7" cy="42.7" r="42.7" fill="#ffbd2e" />
            <rect x="28" y="40" width="30" height="6" fill="#fffff" rx="3" />
        </g>
    </svg>
    {:else}
    <svg viewBox="0 0 85.4 85.4" xmlns="http://www.w3.org/2000/svg">
        <circle cx="42.7" cy="42.7" r="42.7" fill="#ffbd2e" />
    </svg>
    {/if}
</div>
