const require = require('esm')(module);
const Web3 = require("web3");
const Web3Client = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/1c96603e022b4d97a08b70a95afae845"));
const abi = require('./abi');


const getBalance = (tokenAddress, walletAddress) => {
    const contract = new Web3Client.eth.Contract(abi, tokenAddress);
    return new Promise((resolve, reject) => {
        const result = contract.methods.balanceOf(walletAddress).call().then((result) => {
            const format = Web3Client.utils.fromWei(result);
        }).catch((error) => reject(error));
        const format = Web3Client.utils.fromWei(result);
        return resolve(format);
    });
};

module.exports.getBalance = getBalance;