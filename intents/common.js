const moment = require('moment-timezone');
const amazonDateParser = require('amazon-date-parser');

const isADateRange = (date) => {
  const {startDate, endDate } = amazonDateParser(date);
  const daysOfDifference = moment(startDate).diff(moment(endDate), 'days')
  return daysOfDifference === 0 ? false : true;
};


const setMissingIntents = (intents, comingIntents) => {
  for (let i = 0 ; i < intents.length ; i ++) {
    const intentValue = comingIntents.slots[intents[i].name].value;
    if (intentValue) intents[i].isMissing = false;
  }
};

const thereIsSomeMissingRequiredIntent = (intents) => {
  for (let i = 0 ; i < intents.length ; i ++) {
    if (intents[i].isRequired && intents[i].isMissing) return true;
  }

  return false;
};

const getValue = (slot, intent) => {
  if (intent.type === 'built-in') {
    return slot[intent.name].value;
  }

  return slot[intent.name].resolutions.resolutionsPerAuthority[0].values[0].value.id;
};

module.exports = {
  isADateRange,
  setMissingIntents,
  thereIsSomeMissingRequiredIntent,
  getValue
};
