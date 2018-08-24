const { commonHandlers } = require('./commonHandlers');
const { LaunchRequest } = require('./../intents/_LaunchRequest');

const newSessionHandler = Object.assign({}, commonHandlers, {
  LaunchRequest
});

module.exports = {
  newSessionHandler
}
