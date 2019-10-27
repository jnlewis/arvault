import {arweave} from './Arweave';

/*
    Based on Weave Mail crypto.js
    https://github.com/ArweaveTeam/weavemail/blob/master/crypto.js
 */

export const encrypt = async (data, address) => {
    const key = await address2key(address);
    const contentEncoder = new TextEncoder();
    const contentBuffer = contentEncoder.encode(data);
    const keyBuffer = randomValues(256);

    const encryptedKey = await window.crypto.subtle.encrypt({name: 'RSA-OAEP'}, key, keyBuffer);
    const encryptedContent = await arweave.crypto.encrypt(contentBuffer, keyBuffer);

    return arweave.utils.concatBuffers([encryptedKey, encryptedContent]);
};

export const decrypt = async (data, wallet) => {
    const key = await wallet2key(wallet);

    const encryptedKey = new Uint8Array(data.slice(0, 512));
    const encryptedContent = new Uint8Array(data.slice(512));

    const symmetricKey = await window.crypto.subtle.decrypt({name: 'RSA-OAEP'}, key, encryptedKey);

    return arweave.crypto.decrypt(encryptedContent, symmetricKey);
};

const wallet2key = async wallet => {
    const keyData = Object.create(wallet);

    keyData.alg = 'RSA-OAEP-256';
    keyData.ext = true;

    return await window.crypto.subtle.importKey(
        'jwk',
        keyData,
        {name: 'RSA-OAEP', hash: {name: 'SHA-256'}},
        false,
        ['decrypt']
    );
};

const address2key = async address => {
    const txId = await arweave.wallets.getLastTransactionID(address);

    if (!txId) {
        return undefined;
    }

    const tx = await arweave.transactions.get(txId);

    if (!tx) {
        return undefined;
    }

    const keyData = {
        kty: 'RSA',
        e: 'AQAB',
        n: tx.owner,
        alg: 'RSA-OAEP-256',
        ext: true
    };

    return await crypto.subtle.importKey(
        'jwk',
        keyData,
        {name: 'RSA-OAEP', hash: {name: 'SHA-256'}},
        false,
        ['encrypt']
    );
};

const randomValues = length => {
    let array = new Uint8Array(length);

    window.crypto.getRandomValues(array);

    return array;
};
