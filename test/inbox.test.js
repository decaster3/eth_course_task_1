const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile')

const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi bro!']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi bro!')
  });
  it('can change the method', async () => {
    await inbox.methods.setMessage('sex').send({from: accounts[0]})
    const message = await inbox.methods.message().call();
    assert.equal(message, 'sex')
  });
});