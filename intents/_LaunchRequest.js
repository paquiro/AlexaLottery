const messages = require('./../messages');

function LaunchRequest() {
  this.handler.state = "ASK_FOR_COUPON";
  this.response
    .speak(messages.greeting.speak)
    .listen(messages.greeting.listen);
  this.emit(':responseReady');
}

module.exports = {
  LaunchRequest
};
