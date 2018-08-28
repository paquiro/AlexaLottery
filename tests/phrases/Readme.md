# Tests
To use the test, first you need to get a profile. To do that, install ask-cli: `$ npm install -g ask-cli`

When you have it installed, add to your `.env` file the name of you profile on `alexa_profile`.
Then, you can start with the tests.


## Test the simulations
#### Prepare Simulations
`$ npm run tests:prepareSimulations` will send to Amazon the simulations of the utterances and get the responses of them.

#### Test the simulations
`$ npm run tests:simulations` will test the simulations of the after command.
