'use strict';
require('dotenv').config({path: __dirname + '/.env'});
const Alexa = require('alexa-sdk');

const myHandlers = require('./handlers');

const APP_ID = process.env.APP_ID;

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(myHandlers.newSessionHandler, myHandlers.askForCouponHandler);
  alexa.execute();
};
