<script>
    import {arweave} from '../Arweave';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    const unlock = event => {
        const input = event.target;
        const file = input.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const data = reader.result;
                const wallet = JSON.parse(data);

                arweave.wallets.jwkToAddress(wallet).then(address => {
                    dispatch('unlock', {wallet, address});
                });
            } catch(error) {
                alert(error.toString());
            }
        };

        reader.readAsText(file);
    }
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

    svg {
        fill: #696b6c;
    }

    input[type=file] {
        top: 0;
        left: 0;
        width: 100%;
        height: 54px;
        opacity: 0;
        border: none;
        cursor: pointer;
        background: none;
        position: absolute;
    }
</style>

<main class="container">
    <svg width="128" height="128">
        <use xlink:href="#icon-lock" />
    </svg>

    <h3>
        Highly encrypted Password Manager<br>on the Arweave Blockchain
    </h3>

    <br>

    <button class="button position-relative">
        Unlock with Arweave Wallet
        <input type="file" id="file" accept="application/json" on:change="{unlock}">
    </button>
</main>
