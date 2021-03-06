const contracts = require('./compile');
const HdWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compaignContract = contracts[':Compaign'];
const compaignFactoryContract = contracts[':CompaignFactory'];

const provider = new HdWalletProvider(
  'canyon surprise disorder bomb fossil card about cement sorry december dog vocal',
  'https://rinkeby.infura.io/fzlIQSWc47A4Y7xOMoG3'
);

const web3 = new Web3(provider);

let accounts;
const deploy = async () => {
   accounts = await web3.eth.getAccounts();
   const contract = await new web3.eth.Contract(JSON.parse(compaignFactoryContract.interface))
   .deploy({data:compaignFactoryContract.bytecode, arguments:[]})
   .send({from: accounts[0], gas:1000000});

  console.log(compaignFactoryContract.interface);
  console.log('contract deployed at -', contract.options.address);
  console.log(compaignContract.interface);
};

deploy();
