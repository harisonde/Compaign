import web3 from './web3';
import compaignInterface from './compaignInterface';

const compaignObj =  new web3.eth.Contract(compaignInterface);

export default (address) =>{
  return new web3.eth.Contract(compaignInterface, address);
};
