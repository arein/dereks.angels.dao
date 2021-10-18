const { Template } = require("@walletpass/pass-js");
// Create a Template from local folder, see __test__/resources/passes for examples
// .load will load all fields from pass.json,
// as well as all images and com.example.passbook.pem file as key
// and localization string too

const passCert = process.env.CERT;
const passKey = process.env.PRIVATE_KEY;
const passKeyPw = process.env.PRIVATE_KEY_PW;

const getPass = () => {
    return new Promise((resolve, reject) => {
        try {
            Template.load(
                __dirname + "/Event.pass",
                ""
            ).then((template) => {
                template.setCertificate(passCert);
                template.setPrivateKey(passKey, passKeyPw);
                const pass = template.createPass({
                    serialNumber: "123456",
                    description: "20% off"
                });
        
                pass.asBuffer().then((buffer) => {
                    resolve(buffer);
                }).catch((err) => {
                    reject(err);
                });
                
            }).catch((err) => {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports.getPass = getPass;