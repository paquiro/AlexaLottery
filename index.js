'use strict';

require('dotenv').config();

const Alexa = require('alexa-sdk');


const myHandlers = require('./handlers');
const messages = require('./messages.json');

const APP_ID = process.env.APP_ID;

const handlers = {
    'LaunchRequest': function () {
      this.emit('Greeting');
    },
    'Greeting': myHandlers.greeting,
    'AMAZON.HelpIntent': function () {
        const speechOutput = messages.help;
        const reprompt = messages.help_reprompt;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(messages.stop);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(messages.stop);
        this.emit(':responseReady');
    },
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
