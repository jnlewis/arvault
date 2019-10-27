<script>
    import {tooltip, nanoUid, nanoPwd, pwdStrength, copyToClipboard} from './../Helpers';
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    export let mode = '';
    export let item = {};

    let uid = item.uid || nanoUid();
    let title = item.title || '';
    let link = item.link || '';
    let user = item.user || '';
    let pwd = item.pwd || '';
    let secret = item.secret || '';
    let topic = item.topic || '';

    let strength = 0;

    let fieldUid = null;
    let fieldTitle = null;
    let fieldUser = null;
    let fieldPwd = null;
    let fieldSecret = null;

    $: hideInput = mode === 'view';
    $: hideLabel = mode !== 'view';
    $: switchMode(mode);

    const switchMode = mode => {
        if (mode === 'edit') {
            fieldPwd.dispatchEvent(new Event('keyup'));
        }
    };

    const cancel = () => {
        if (mode === 'new') {
            dispatch('cancel', false);
        } else {
            mode = 'view';
        }
    };

    const save = event => {
        const data = getFormData(event);

        dispatch('save', {data});
    };

    const update = event => {
        const data = getFormData(event);

        dispatch('update', {data});

        mode = 'view';
    };

    const getFormData = event => {
        return {
            uid: event.target.uid.value,
            title: event.target.title.value,
            link: event.target.link.value,
            user: event.target.user.value,
            pwd: event.target.pwd.value,
            secret: event.target.secret.value,
            topic: event.target.topic.value
        }
    };

    const edit = () => mode = 'edit';

    const keyup = event => strength = pwdStrength(event.target.value);

    const remove = () => confirm('Are you sure?') && dispatch('remove', {uid: fieldUid.value});

    const copy = field => copyToClipboard(field.value);

    const random = () => (fieldPwd.value = nanoPwd()) && fieldPwd.dispatchEvent(new Event('keyup'));

    onMount(() => mode === 'new' && fieldTitle.focus());
</script>

<style>
    form {
        display: flex;
        padding: 10px 15px;
        background: var(--color-form-background);
        border-top: 1px solid;
        border-bottom: 1px solid;
        border-color: var(--color-form-border);
        flex-wrap: wrap;
    }
    [mode=new] form,
    [mode=edit] form {
        box-shadow: 0 0 6px var(--color-form-shadow);
    }

    li {
        width: 100%;
        position: relative;
    }
    li + li form {
        border-top: none;
    }

    [strength="20"],
    [strength="40"] {
        color: var(--color-red);
    }
    [strength="60"],
    [strength="80"] {
        color: var(--color-orange);
    }
    [strength="100"] {
        color: var(--color-green);
    }

    blockquote {
        top: 15px;
        right: 15px;
        position: absolute;

        color: var(--color-page-background);
        font-size: 50px;
        line-height: 40px;
        font-weight: bold;
        text-transform: uppercase;

        pointer-events: none;
    }

    p strong,
    p button,
    p span {
        display: block;
    }
    p {
        width: 100%;
        flex-wrap: wrap;
        overflow: hidden;
    }
    p + p {
        margin-top: 2%;
    }

    input {
        width: 100%;
        background: transparent;
    }
    input::placeholder {
        color: var(--color-form-placeholder);
    }
    input[name=title],
    input[name=title]::placeholder {
        font-weight: bold;
    }

    input[name=pwd],
    input[name=secret],
    input[name=pwd]::placeholder,
    input[name=secret]::placeholder {
        font-family: monospace;
    }
    input[name=pwd] + button,
    input[name=secret] + button {
        height: 25px;
    }

    nav {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    nav button:not(:first-child) {
        margin-left: 15px;
    }

    @media (min-width: 538px) {
        li {
            width: calc(100% / 2);
        }

        form {
            margin: 0 16px 16px 0;
            border-radius: 3px;
            border: 1px solid var(--color-form-border) !important;
        }

        blockquote {
            right: 32px;
        }

        [mode=edit] nav {
            justify-content: space-between;
        }

        nav button {
            font-size: 13px;
        }
    }

    @media (min-width: 769px) {
        li {
            width: calc(100% / 3);
        }
    }
</style>

<li {mode}>
    {#if mode === 'view'}
        <blockquote>{title.charAt(0)}</blockquote>
    {/if}

    <form spellcheck="false" autocomplete="off" on:submit|preventDefault="{mode === 'new' ? save : update}">
        <input type="hidden" name="uid" value="{uid}" bind:this={fieldUid}>

        <p>
            <input type="text" name="title" bind:value={title} bind:this={fieldTitle} required placeholder="Title" hidden="{hideInput}">
            <button type="button" class="color-blue" on:click="{edit}" hidden="{hideLabel}">
                <strong>{title}</strong>
            </button>

            <input type="text" name="link" bind:value={link} placeholder="Link" hidden="{hideInput}">
            <span hidden="{hideLabel}">
                {#if link}
                    <a href="https://{link.replace('https://', '')}" target="_blank" rel="noopener noreferrer">{link}</a>
                {/if}
            </span>

            <input type="text" name="user" bind:value={user} bind:this={fieldUser} placeholder="User" hidden="{hideInput}">
            <button type="button" on:click="{() => copy(fieldUser)}" use:tooltip="{'Copy User'}" hidden="{hideLabel}">{user}</button>
        </p>

        <p>
            <input type="text" name="pwd" bind:value={pwd} bind:this={fieldPwd} on:keyup={keyup} {strength} required placeholder="Password"  hidden="{hideInput}">
            <button type="button" on:click="{() => copy(fieldPwd)}" use:tooltip="{'Copy Password'}" hidden="{hideLabel}">{'•'.repeat(pwd.length)}</button>

            <input type="text" name="secret" bind:value={secret} bind:this={fieldSecret} placeholder="Secret" hidden="{hideInput}">
            <button type="button" on:click="{() => copy(fieldSecret)}" use:tooltip="{'Copy Secret'}" hidden="{hideLabel}">{'•'.repeat(secret.length)}</button>
        </p>

        <p>
            <input type="text" name="topic" bind:value={topic} placeholder="Topic" hidden="{hideInput}">
            <span class="color-grey" hidden="{hideLabel}">{topic}</span>
        </p>

        {#if mode !== 'view'}
            <nav>
                <button type="button" on:click="{cancel}" class="color-grey">Cancel</button>

                {#if mode === 'edit'}
                    <button type="button" on:click="{remove}" class="color-red">Remove</button>
                {/if}

                <button type="button" on:click="{random}" class="color-orange">Random</button>

                <button type="submit" class="color-blue">Save</button>
            </nav>
        {/if}
    </form>
</li>
