<script>
    import Header from './Header.svelte';
    import Main from './Unlocked/Main.svelte';

    export let wallet;
    export let address;

    let showTemplate = false;
    let searchValue = '';

    const updateShowTemplate = event => showTemplate = event.detail;
    const updateSearchValue = event => searchValue = event.detail;
</script>

<Header isUnlocked={true} on:lock on:add={updateShowTemplate} on:search="{updateSearchValue}" />

<Main {wallet} {address} {showTemplate} {searchValue} on:cancel={updateShowTemplate} />
