const { Template } = require("@walletpass/pass-js");
var fs = require('fs');

const passKeyPw = process.env.PRIVATE_KEY_PW;

const getPass = () => {
    return new Promise((resolve, reject) => {
        try {
            const template = new Template("coupon", {
                passTypeIdentifier: "pass.com.dereks.angels.gate",
                teamIdentifier: "Q338UYGFZ8",
                backgroundColor: "red",
                sharingProhibited: true,
                organizationName: "DereksAngels",
                logoText: "Derek's Angels"
            });
            template.setCertificate(fs.readFileSync(__dirname + "/keys/cert.pem"));
            template.setPrivateKey(fs.readFileSync(__dirname + "/keys/key.pem"), passKeyPw);
            
            template.images.add("icon", fs.readFileSync(__dirname + "/Event.pass/icon.png")).then((images) => {
                template.images.add("logo", __dirname + "/Event.pass/logo.png").then((images) => {
                    const pass = template.createPass({
                        serialNumber: "123457",
                        description: "Token Gate",
                        nfc: {
                            message: "HelloRichard, my love <3",
                            encryptionPublicKey: fs.readFileSync(__dirname + "/keys/encryptionPublicKey.pem")
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