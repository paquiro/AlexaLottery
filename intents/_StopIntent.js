const messages = require('./../messages');

function StopIntent() {
  this.response.speak(messages.stop.speak);
  this.emit(':responseReady');
}

module.exports = {
  StopIntent
};
