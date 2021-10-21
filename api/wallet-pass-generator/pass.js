const { Template } = require("@walletpass/pass-js");
var fs = require('fs');
var truncate = require("truncate-utf8-bytes")

const passKeyPw = process.env.PRIVATE_KEY_PW;

const getPass = () => {
    return new Promise((resolve, reject) => {
        try {
            const template = new Template("storeCard", {
                passTypeIdentifier: "pass.com.dereks.angels.gate",
                teamIdentifier: "Q338UYGFZ8",
                backgroundColor: "white",
                sharingProhibited: true,
                organizationName: "DereksAngels",
                logoText: "Derek's Angels",
                sharingProhibited: false
            });
            template.setCertificate(fs.readFileSync(__dirname + "/keys/cert.pem").toString());
            template.setPrivateKey(fs.readFileSync(__dirname + "/keys/key.pem").toString(), passKeyPw);
            const pubKey = fs.readFileSync(__dirname + "/keys/encryptionPublicKey.pem").toString().replace("\n", "");
            
            template.images.add("icon", fs.readFileSync(__dirname + "/Event.pass/icon.png")).then((images) => {
                template.images.add("logo", __dirname + "/Event.pass/logo.png").then((images) => {
                    const pass = template.createPass({
                        serialNumber: "123457",
                        description: "Token Gate",
                        nfc: {
                            message: truncate("HelloRichard, my love <3", 64),
                            encryptionPublicKey: pubKey
                        }
                    });
                    pass.asBuffer().then((buffer) => {
                        resolve(buffer);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.getPass = getPass;