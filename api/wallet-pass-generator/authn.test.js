const assert = require('assert');
const expect = require('chai');
const authn = require('./authn');


describe('Authn Test', () => {
    it('should login', (done) => {
        authn.authn('0xbdd517dcf268ca74861d35fce8b9939274c8137485a6b0f9e7c283e3383a70e1046aa47093ec6e9d0c05a7409f456390bf6c293e6951e763ee4a41945a6f0c8e1b', '0xf3ea39310011333095CFCcCc7c4Ad74034CABA63', 990).then((isAuthed) => {
            console.log(isAuthed);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});