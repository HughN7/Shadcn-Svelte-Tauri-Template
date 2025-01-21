<script lang="ts">
    let test = $state(false)


</script>


<div class="p-2">
    <h1>Page</h1>
    <button class="border-white p-2" onclick={() => test = !test}>Toggle</button>
    {#if test}
        <p>Test</p>
    {/if}
</div>

<button id="decorum-tb-close">
    Test Button
</button>



<style>
    button#decorum-tb-close {
        background-color: #000;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        display: fixed; 
        z-index: 0;
    }
</style>