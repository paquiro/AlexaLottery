const Alexa = require('alexa-sdk');
const { commonHandlers } = require('./commonHandlers');
const { Lottery } = require('./../intents');

const askForCouponHandler = Alexa.CreateStateHandler("ASK_FOR_COUPON", Object.assign({}, commonHandlers, {
  'Lottery': Lottery
}));

module.exports = {
  askForCouponHandler
};
