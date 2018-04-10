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

  await factoryContract.methods.createCompaign('100').send({
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

  it('Contribute to compaing: success', async ()=>{
     await compaign.methods.contribute().send({
         from: accounts[1],
         value: 110,
         gas:1000000
       });

       const approvers = await compaign.methods.approversCount().call();
       assert.equal(1, approvers.length);
  });

  it('Contributing to compaign: Failure', async ()=>{
     try{
        await compaign.methods.contribute().send({
          from: accounts[0],
          value: 10,
          gas:1000000
        });
        assert(false);
     }catch(error){
       assert.ok(error);
     }
  });

 it('Create request to transfer funds', async()=> {
  const trans =  await compaign.methods.createRequest('Getting compuetrs', 100, accounts[1]).send({
      from: accounts[0],
      gas: 1000000
    });
    assert.ok(trans);

    const request = await compaign.methods.requests(0).call();
    assert.equal('Getting compuetrs', request.description);
    assert.equal('100', request.value);
    assert.equal(accounts[1], request.reciepint);
    assert.equal(0, request.approvalCount);
    assert.equal(false, request.complete);
 });

 it('Approve and Finalize request to transfer money', async ()=>{
   await compaign.methods.contribute().send({
       from: accounts[1],
       value: 110,
       gas:1000000
     });

     await compaign.methods.contribute().send({
         from: accounts[2],
         value: 110,
         gas:1000000
       });
     const contributionInd = await compaign.methods.approvers(accounts[1]).call();
     const contributionIndTwo = await compaign.methods.approvers(accounts[2]).call();
     assert.equal(true, contributionInd);
     assert.equal(true, contributionIndTwo);

  await compaign.methods.createRequest('Getting compuetrs', 100, accounts[1]).send({
       from: accounts[0],
       gas: 1000000
     });

await compaign.methods.approveRequest(0).send({
    from: accounts[1],
    gas:1000000
  });
await compaign.methods.approveRequest(0).send({
    from: accounts[2],
    gas:1000000
  });

   const request = await compaign.methods.requests(0).call();
   assert.equal('Getting compuetrs', request.description);
   assert.equal('100', request.value);
   assert.equal(accounts[1], request.reciepint);
   assert.equal(2, request.approvalCount);
   assert.equal(false, request.complete);

   await compaign.methods.finalizeRequest(0).send({
     from: accounts[0],
     gas:1000000
   });

   const result = await compaign.methods.requests(0).call();
   assert.equal(true, result.complete);
 });

});
