const intents = require('./../intents');

const commonHandlers = {
  'AMAZON.HelpIntent': intents.HelpIntent,
  'AMAZON.CancelIntent': intents.CancelIntent,
  'AMAZON.StopIntent': intents.StopIntent,
  'Unhandled': intents.Unhandled
};

module.exports = {
  commonHandlers
};
