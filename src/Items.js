import {arweave} from './Arweave';
import {encrypt, decrypt} from './Crypto';
import {APP_NAME} from './Constants';

export const getItems = async (wallet, address) => {
    const txIds = await arweave.arql(
        {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'from',
                expr2: address
            },
            expr2: {
                op: 'equals',
                expr1: 'App-Name',
                expr2: APP_NAME
            }
        }
    );

    if (!txIds.length) {
        return [];
    }

    const txId = txIds[0];
    const txData = await arweave.transactions.getData(txId, {decode: true});

    const decryptedDataBuffer = await decrypt(txData, wallet);
    const decryptedData = arweave.utils.bufferToString(decryptedDataBuffer);

    return JSON.parse(decryptedData);
};

export const publishItems = async (items, wallet, address) => {
    const encryptedData = await encrypt(JSON.stringify(items), address);
    const data = arweave.utils.concatBuffers([encryptedData]);

    const tx = await arweave.createTransaction({data}, wallet);

    tx['last_tx'] = await arweave.api.get('/tx_anchor').then(x => x.data);

    tx.addTag('App-Name', APP_NAME);

    await arweave.transactions.sign(tx, wallet);

    const response = await arweave.transactions.post(tx);

    if (response.status !== 200) {
        return alert(`Failed to submit transaction: ${response.data}`);
    }

    return console.log('Transaction ID:', tx.id);
};
