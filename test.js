const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/Vaccinations.json', 'utf8'));
// console.log(JSON.stringify(contract.abi));

console.log(contract.storage);