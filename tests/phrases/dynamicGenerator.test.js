const simulationsJSON = require('./objects/simulations.json');
const testFunctions = require('./simulations.test');

const generateDynamicTests = () => {
  for (let i = 0 ; i < simulationsJSON.length ; i ++) {
    describe(simulationsJSON[i].description, () => {
      const functionName = simulationsJSON[i].functionName;
      const response = simulationsJSON[i].response;

      testFunctions[functionName](response);
    });
  }
};

generateDynamicTests();
