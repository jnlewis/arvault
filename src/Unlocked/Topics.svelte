<script>
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    export let topics;
    export let topic;

    $: expand(topics);

    const expand = topics => topics.length && topics.unshift('all');

    const select = event => dispatch('filter', {topic: event.target.textContent});
</script>

<style>
    ul {
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 16px;
        overflow-x: scroll;
        overscroll-behavior-x: contain;
        -webkit-overflow-scrolling: touch;
    }
    ul::-webkit-scrollbar {
        display: none;
    }

    li:not(:last-child) {
        margin-right: 8px;
    }
</style>

{#if topics.length}
    <ul class="topics">
        {#each topics as name}
            <li>
                <button class="badge" on:click={select} class:active="{topic == name}">{name}</button>
            </li>
        {/each}
    </ul>
{/if}
