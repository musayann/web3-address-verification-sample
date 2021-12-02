
require('dotenv').config();

const Web3 = require('web3');
const HASH_STRING = process.env.HASH_STRING;
const web3 = new Web3(process.env.NODE_URL);

const clientSide = async () => {
    // generate a new account
    const {
        address,
        privateKey
    } = web3.eth.accounts.create();

    console.log('new-address', address);

    const hash = await web3.eth.accounts.hashMessage(HASH_STRING);


    const {
        signature
    } = await web3.eth.accounts.sign(hash, privateKey);

    return signature;
}

const serverSide = async (signature) => {
    const hash = await web3.eth.accounts.hashMessage(HASH_STRING);
    const publicKey = await web3.eth.accounts.recover(hash, signature);
    console.log('decrypted-address', publicKey);
}

const run = async () => {

    const signature = await clientSide();
    serverSide(signature);
};

run();