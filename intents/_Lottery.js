const { intents } = require('./helpers/lottery');
const form = require('./../scrapping/form');
const common = require('./common');

const formData = {
  fechaSorteo: '',
  numero: '',
  serie: '001',
  checkCompraExtra: 0
};

const url = 'https://www.juegosonce.es/comprobar-cupon-diario';

async function Lottery () {
  const intentObj = this.event.request.intent;
  common.setMissingIntents(intents, intentObj);

  if (common.thereIsSomeMissingRequiredIntent(intents)) {
    // Emit what intents are missing
    message = `Necesito saber los intents que faltan`;
    this.response.speak(message);
    return this.emit(':responseReady');
  }

  for (let i = 0 ; i < intents.length ; i ++) {
    if (!intents[i].isMissing) {
      const intentValue = common.getValue(intentObj.slots, intents[i]);
      intents[i].function(formData, intentValue);
    }
  }
  const response = await form.getAlexaResponse(url, formData);
  // if response.length === 0 --> dar error

  this.response.speak(response);
  this.emit(':responseReady');
}


module.exports = {
  Lottery
};
