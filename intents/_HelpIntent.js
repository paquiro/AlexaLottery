const messages = require('./../messages');

function HelpIntent() {
  const speechOutput = messages.help.speak;
  const reprompt = messages.help_reprompt.speak;

  this.response.speak(speechOutput).listen(reprompt);
  this.emit(':responseReady');
}

module.exports = {
  HelpIntent
};
