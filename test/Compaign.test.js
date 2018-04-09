const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const contracts = require('../ethereum/compile');
const compaignContract = contracts[':Compaign'];
const compaignFC = contracts[':CompaignFactory'];

const web3 = new Web3(ganache.provider());

let accounts;
let factoryContract;
let compaign;
let compaignAddress;
beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
  factoryContract = await new web3.eth.Contract(JSON.parse(compaignFC.interface))
  .deploy({data: compaignFC.bytecode, arguments:[]})
  .send({from: accounts[0], gas: 1000000});

  await factoryContract.methods.createCompaign(100).send({
    from: accounts[0],
    gas:1000000
  });

const compaigns = await factoryContract.methods.getDeployedCompaign().call({
  from: accounts[0]
});

compaignAddress = compaigns[0];
compaign = await new web3.eth.Contract(
  JSON.parse(compaignContract.interface),
  compaignAddress
);

});

describe('Compaigns', () =>{
  it('deploy compain and compaign factory contracts', () =>{
      assert.ok(factoryContract.options.address);
      assert.ok(compaign.options.address);
  });
});
