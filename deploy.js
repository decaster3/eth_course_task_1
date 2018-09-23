const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'soccer rare bomb attack always clarify slush trigger final potato wrestle firm',
  'https://rinkeby.infura.io/v3/d36fdb162bf94fa0ad6e58ade544b47b'
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying contract', accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x' + bytecode, arguments: ['Hey!']})
    .send({ from: accounts[0], gas: 4700000})

  console.log('Contract', result)
};

deploy();