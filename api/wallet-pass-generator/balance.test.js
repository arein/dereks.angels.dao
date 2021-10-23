const assert = require('assert');
const expect = require('chai');
const balance = require('./balance');


describe('Balance Test', () => {
    it('should get the balance', (done) => {
        balance.getBalance().then((balance) => {
            expect(balance).to.equal(5);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});