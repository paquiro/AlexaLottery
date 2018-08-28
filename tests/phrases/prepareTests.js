const fs = require('fs');

const updateToken = require('./updateToken');
const simulations = require('./simulations');
const testObjects = require('./objects/testObjects.json');

const savePrepareTestFile = (phrasesResponses) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/objects/simulations.json`, JSON.stringify(phrasesResponses, null, 2), (err) => {
      if(err) {
        reject(err);
      }
      console.log(`The test file has been updated on ${__dirname}/objects/simulations.json`);
      resolve();
    });
  });
};

const prepareTests = async () => {
  const token = await updateToken.updateTokenIfCurrentIsNotValid();

  for (let i = 0 ; i < testObjects.length ; i ++) {
    console.log(`Creating ${i+1}/${testObjects.length} utterance`);
    console.log('\tMaking Simulation...');
    const reqId = await simulations.makeSimulation(token.access_token, testObjects[i].utterance.toLowerCase());
    console.log('\tGetting Simulation...');
    testObjects[i]['response'] = await simulations.getSimulation(token.access_token, reqId);
  }
  console.log(testObjects)

  savePrepareTestFile(testObjects);
};

prepareTests();
