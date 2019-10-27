<script>
    import Header from './Header.svelte';
    import Main from './Locked/Main.svelte';
</script>

<Header isUnlocked={false} />

<Main on:unlock />
