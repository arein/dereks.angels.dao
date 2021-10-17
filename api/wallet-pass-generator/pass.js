const { Template } = require("@walletpass/pass-js");
// Create a Template from local folder, see __test__/resources/passes for examples
// .load will load all fields from pass.json,
// as well as all images and com.example.passbook.pem file as key
// and localization string too

const getPass = () => {
    console.log('go');
    return new Promise((resolve, reject) => {
        console.log('go2');
        try {
            console.log('go3');
            Template.load(
                __dirname + "/Event.pass",
                "secretKeyPassword"
            ).then((template) => {
                console.log('go4');
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
            console.log('go4');
            reject(err);
        }
    });
};

module.exports.getPass = getPass;