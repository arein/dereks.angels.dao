var ethSigUtil = require('eth-sig-util');
var ethUtil = require('ethereumjs-util');
var web3 = require('web3');

const authn = (signature, publicAddress, balance) => {
    return new Promise((resolve, reject) => {
        const msg = `I own ${balance} tokens`;
        console.log(msg);

        // We now are in possession of msg, publicAddress and signature. We
        // will use a helper from eth-sig-util to extract the address from the signature
        const msgBufferHex = web3.utils.sha3(msg);
        console.log(msgBufferHex);
        const address = ethSigUtil.recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        });
        console.log('address', address);
        console.log('provided address ', publicAddress);
    
        // The signature verification is successful if the address found with
        // sigUtil.recoverPersonalSignature matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
};

module.exports.authn = authn;