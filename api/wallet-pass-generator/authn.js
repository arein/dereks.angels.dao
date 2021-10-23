var ethSigUtil = require('eth-sig-util');
var ethUtil = require('ethereumjs-util');

const authn = (signature, publicAddress, balance) => {
    return new Promise((resolve, reject) => {
        const msg = `I own ${balance} tokens`;

        // We now are in possession of msg, publicAddress and signature. We
        // will use a helper from eth-sig-util to extract the address from the signature
        const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
        const address = ethSigUtil.recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        });
    
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