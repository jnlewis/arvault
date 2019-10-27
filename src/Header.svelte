<script>
    import {HOME_URL} from './Constants';
    import {tooltip} from './Helpers';
    import {createEventDispatcher} from 'svelte';

    export let isUnlocked;

    const dispatch = createEventDispatcher();

    const add = () => dispatch('add', true);
    const lock = () => dispatch('lock', {wallet: null, address: null});
    const search = event => dispatch('search', event.target.value.trim());
</script>

<style>
    header {
        height: 64px;
        display: flex;
    }

    a {
        height: 32px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }
    a h1 {
        margin-left: 10px;

        color: var(--color-header-slogan);
        font-size: 20px;
        text-transform: lowercase;
        letter-spacing: 1px;
    }

    input {
        height: 32px;
        padding: 0 8px;
        margin-left: auto;
        background: var(--color-header-search);
        border-radius: 3px;

        font-size: 14px;
        -webkit-appearance: textfield;
    }
    input::placeholder {
        color: var(--color-header-placeholder);
    }

    nav {
        display: flex;
    }

    nav a,
    nav button {
        width: 32px;
        height: 32px;
        margin-left: 8px;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-grey);

        color: var(--color-white);
        font-size: 18px;
    }
    nav button:first-of-type {
        margin-left: 16px;
        background: var(--color-blue);
    }

    nav button span {
        width: 1px;
        height: 14px;
        background: var(--color-white);
    }
    nav button span:last-child {
        margin-left: -1px;
        transform: rotate(90deg);
    }

    svg {
        fill: var(--color-white);
        display: block;
    }

    @media (max-width: 537px) {
        header {
            height: 96px;
            flex-wrap: wrap;
        }

        input {
            width: 100%;
            order: 2;
            margin: 16px 0 -16px;
            flex-basis: 100%;
        }

        nav {
            margin-left: auto;
        }
    }
</style>

<header class="container">
    <a href="{HOME_URL}">
        <svg width="32" height="32">
            <use xlink:href="#icon-vault" />
        </svg>
        <h1>
            Vault
        </h1>
    </a>

    {#if isUnlocked}
        <input type="search" on:keyup={search} on:change={search} on:search={search} placeholder="Instant Search">

        <nav>
            <button on:click={add} use:tooltip="{'New Item'}">
                <span></span>
                <span></span>
            </button>

            <button on:click="{lock}" use:tooltip="{'Lock Vault'}">
                <svg width="16" height="16">
                    <use xlink:href="#icon-lock" />
                </svg>
            </button>

            <a href="https://arweave.net/pvmiu4SZKQGWAYjrLWzE_mI70u1-v8zIzQ8WaxIYURk#/post/z6Kvrd4tXlpWdeiPg5--EiGouvrd5LC1izCKluhO3ME" use:tooltip="{'User Guide'}">?</a>
        </nav>
    {/if}
</header>
