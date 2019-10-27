<script>
    import Locked from './Locked.svelte';
    import Unlocked from './Unlocked.svelte';

    import {AUTO_LOCK_TIME} from './Constants';

    let wallet = null;
    let address = null;
    let timeout = null;

    const updateLock = event => {
        wallet = event.detail.wallet;
        address = event.detail.address;
    };

    const resetTimer = () => {
        if (!timeout && !wallet && !address) {
            return;
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            wallet = null;
            address = null;
        }, AUTO_LOCK_TIME);
    };
</script>

<svelte:window on:mousemove={resetTimer} on:mousedown={resetTimer} on:click={resetTimer} on:scroll={resetTimer} on:keyup={resetTimer} />

{#if wallet}
    <Unlocked {wallet} {address} on:lock={updateLock} />
{:else}
    <Locked on:unlock={updateLock} />
{/if}
