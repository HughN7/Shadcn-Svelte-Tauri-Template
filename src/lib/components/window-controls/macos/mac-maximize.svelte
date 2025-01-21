<script lang="ts">
    import { getCurrentWindow } from "@tauri-apps/api/window";

    const appWindow = getCurrentWindow();

    let { isHover = $bindable() } = $props();

    async function handleMaximize() {
        if (await appWindow.isFullscreen()) {
            await appWindow.setFullscreen(false);
            return;
        }
        await appWindow.setFullscreen(true);
    }
</script>

<div onclick={handleMaximize} class="size-[12px]" aria-label="maximize" aria-hidden="true" role="presentation">
    {#if isHover}
        <svg enable-background="new 0 0 85.4 85.4" viewBox="0 0 85.4 85.4" xmlns="http://www.w3.org/2000/svg">
            <g clip-rule="evenodd" fill-rule="evenodd">
                <path d="m42.7 85.4c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7-42.7 19.1-42.7 42.7 19.1 42.7 42.7 42.7z" fill="#00ca4e" />
                <path d="m42.7 81.8c21.6 0 39.1-17.5 39.1-39.1s-17.5-39.1-39.1-39.1-39.1 17.5-39.1 39.1c0 21.5 17.5 39.1 39.1 39.1z" fill="#00d752" />
                <path d="m54.2 20.8h-26.7c-3.6 0-6.5 2.9-6.5 6.5v26.7zm-23.2 43.7h26.8c3.6 0 6.5-2.9 6.5-6.5v-26.8z" fill="#006519" />
            </g>
        </svg>
    {:else}
        <svg enable-background="new 0 0 85.4 85.4" viewBox="0 0 85.4 85.4" xmlns="http://www.w3.org/2000/svg">
            <g clip-rule="evenodd" fill-rule="evenodd">
                <path d="m42.7 85.4c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7-42.7 19.1-42.7 42.7 19.1 42.7 42.7 42.7z" fill="#00ca4e" />
                <path d="m42.7 81.8c21.6 0 39.1-17.5 39.1-39.1s-17.5-39.1-39.1-39.1-39.1 17.5-39.1 39.1c0 21.5 17.5 39.1 39.1 39.1z" fill="#00d752" />
            </g>
        </svg>
    {/if}
</div>
