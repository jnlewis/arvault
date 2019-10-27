<script>
    export let message;
</script>

<style>
    main {
        height: calc(100% - 64px - 64px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        text-align: center;
    }
</style>

<main class="container">
    <h3>{message}</h3>
</main>
