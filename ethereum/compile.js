const path = require('path');
const solc = require('solc');
const fs = require('fs');

// const buildPath = path.resolve(__dirname, 'build');
// fs.removeSync(buildPath);

const pathToContract = path.resolve(__dirname, 'contracts', 'Compaign.sol');
const sourceCode = fs.readFileSync(pathToContract, 'utf8');
module.exports = solc.compile(sourceCode, 1).contracts;

//  const compaignCompiledCompiled = output[':Compaign'];
//  const compaignFactory = output[':CompaignFactory'];
//
//  console.log(compaignCompiledCompiled.interface);
//
// fs.ensureDirSync(buildPath);
//
// for(let contract in output){
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract + '.json'),
//     output[contract]
//   );
// }
