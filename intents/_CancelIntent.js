const messages = require('./../messages');

function CancelIntent() {
  this.response.speak(messages.stop.speak);
  this.emit(':responseReady');
}

module.exports = {
  CancelIntent
};
