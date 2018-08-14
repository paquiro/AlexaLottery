const messages = require('./../messages.json');

const greeting = function() {
  this.response.speak(messages.greeting);
  this.emit(':responseReady');
}

module.exports = {
  greeting,
};
