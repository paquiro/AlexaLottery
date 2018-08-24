const messages = require('./../messages');

function Unhandled() {
  this.response.speak(messages.unhandled.speak);
  this.emit(':responseReady');
}

module.exports = {
  Unhandled
}
