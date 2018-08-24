const moment = require('moment-timezone');

const common = require('./../common');

function intent__type_of_game (form, value) {

};

function intent__date (form, value) {
  if (common.isADateRange(value)) {
    // Return an error
  }

  const today = moment().tz("Europe/Madrid");
  const couponDate = moment(value).tz("Europe/Madrid");

  if (today.diff(couponDate, 'days') < 0) {
    couponDate.set('year', today.year())
  }

  form[this.formName] = couponDate.format('1,YYYYMMDD');
};

function intent__digits_number (form, value) {
  form[this.formName] = value;
};

function intent__digits_serie (form, value) {

  // La serie tiene que estar comprendida entre 1 y 55

  if (this.isMissing) return;

  form[this.formName] = value;
  form['checkCompraExtra'] = 1;
};

const intents = [
  {
    name: 'type_of_game',
    description: 'El tipo de juego',
    formName: null,
    isRequired: true,
    type: 'custom',
    isMissing: true,
    function: intent__type_of_game,
  },
  {
    name: 'date',
    description: 'La fecha',
    formName: 'fechaSorteo',
    isRequired: true,
    type: 'built-in',
    isMissing: true,
    function: intent__date,
  },
  {
    name: 'digits_number',
    description: 'El número del boleto',
    formName: 'numero',
    isRequired: true,
    type: 'built-in',
    isMissing: true,
    function: intent__digits_number,
  },
  {
    name: 'digits_serie',
    description: 'La serie',
    formName: 'serie',
    isRequired: false,
    type: 'built-in',
    isMissing: true,
    function: intent__digits_serie,
  }
];

module.exports = {
  intents
};
