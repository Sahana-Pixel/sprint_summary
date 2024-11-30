
// main entry point
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { FunctionFactoryType } from './function-factory';
import { testRunner } from './test-runner/test-runner';
import { onWorkCreation } from './index';  // Import onWorkCreation function

(async () => {
  const argv = await yargs(hideBin(process.argv)).options({
    fixturePath: {
      require: true,
      type: 'string',
    },
    functionName: {
      require: true,
      type: 'string',
    },
  }).argv;

  if (!argv.fixturePath || !argv.functionName) {
    console.error('Please make sure you have passed fixturePath & functionName');
    process.exit(1);  // Exit if required arguments are not passed
  }

  // Check if the function name is 'onWorkCreation'
  if (argv.functionName === 'onWorkCreation') {
    // Example: Manually passing event payload or loading from fixture
    const eventPayload = require(argv.fixturePath);  // Assuming fixture is a JSON file
    try {
      const result = await onWorkCreation(eventPayload);
      console.log(result);
    } catch (error) {
      console.error('Error while handling work creation:', error);
    }
  } else {
    // Default test runner logic
    await testRunner({
      fixturePath: argv.fixturePath,
      functionName: argv.functionName as FunctionFactoryType,
    });
  }
})();
