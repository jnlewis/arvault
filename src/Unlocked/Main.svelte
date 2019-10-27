<script>
    import Item from './Item.svelte';
    import Empty from './Empty.svelte';
    import Topics from './Topics.svelte';

    import {getItems, publishItems} from './../Items';
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    export let wallet;
    export let address;

    export let searchValue;
    export let showTemplate;

    let master = null;
    let items = null;
    let topics = [];
    let topic = 'all';

    $: search(searchValue);

    const remove = async event => {
        const uid = event.detail.uid;
        const index = master.map(e => e.uid).indexOf(uid);

        master.splice(index, 1);

        items = [...master];

        topics = Object.values(master).map(item => item.topic).filter(Boolean);
        topics = [...new Set(topics)];

        topic = 'all';

        await publishItems(master, wallet, address);
    };

    const save = async event => {
        master = [...master, event.detail.data];
        master.sort((a, b) => a.title.localeCompare(b.title));

        items = [...master];

        topics = Object.values(master).map(item => item.topic).filter(Boolean);
        topics = [...new Set(topics)];

        topic = 'all';

        dispatch('cancel', false);

        await publishItems(master, wallet, address);
    };

    const update = async event => {
        const data = event.detail.data;
        const index = master.map(e => e.uid).indexOf(data.uid);

        master[index] = data;
        master.sort((a, b) => a.title.localeCompare(b.title));

        items = [...master];

        topics = Object.values(master).map(item => item.topic).filter(Boolean);
        topics = [...new Set(topics)];

        topic = 'all';

        await publishItems(master, wallet, address);
    };

    const filter = event => {
        const selected = event.detail.topic;

        if (selected === 'all') {
            items = [...master];
        } else {
            items = master.filter(item => item.topic === selected);
        }

        topic = selected;
    };

    const search = value => {
        if (!master) {
            return;
        }

        if (!value) {
            items = [...master];
        } else {
            items = master.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        }

        topic = 'all';
    };

    onMount(async () => {
        master = await getItems(wallet, address);
        items = [...master];

        topics = Object.values(master).map(item => item.topic).filter(Boolean);
        topics = [...new Set(topics)];
    });
</script>

<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -16px;
    }

    @media (min-width: 538px) {
        ul {
            margin: 0 -16px 0 0;
        }
    }
    @media (min-width: 769px) {
        ul {
            margin: 0 -32px 0 -16px;
        }
    }
</style>

{#if items}
    {#if showTemplate || items.length}
        <main class="container">
            {#if topics.length}
                <Topics {topics} {topic} on:filter={filter} />
            {/if}

            <ul>
                {#if showTemplate}
                    <Item mode=new on:cancel on:save={save} />
                {/if}

                {#each items as item (item.uid)}
                    <Item mode=view {item} on:update={update} on:remove={remove} />
                {/each}
            </ul>
        </main>
    {:else}
        <Empty message="{'No content available to display'}" />
    {/if}
{:else}
    <Empty message="{'Querying blockchain data ...'}" />
{/if}
