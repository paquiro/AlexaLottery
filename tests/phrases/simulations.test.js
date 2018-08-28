const { assert } = require('chai');

const test_successfulState = (response) => {
  const status = response.status;

  it('The status must be Successful', () => {
    assert.equal(status, 'SUCCESSFUL');
  });
};

const test_shouldEndSession = (response, boolean) => {
  const skillExecutionInfo = response.result.skillExecutionInfo;
  const shouldEndSession = skillExecutionInfo && skillExecutionInfo.invocationResponse.body.response.shouldEndSession;
  const testName = `The session must ${!boolean ? 'not ' : ''}be ended`;

  it (testName, () => {
    assert.equal(shouldEndSession, boolean);
  });
};

const test_isNewSession = (response, boolean) => {
  const skillExecutionInfo = response.result.skillExecutionInfo;
  const isNewSession = skillExecutionInfo && skillExecutionInfo.invocationRequest.body.session.new;
  const testName = `It\'s ${!boolean ? 'not ' : ''}a new Session`;

  it (testName, () => {
    assert.equal(isNewSession, boolean);
  });
};

// IntentRequest, LaunchRequest...
const test_typeOfRequest = (response, type) => {
  const skillExecutionInfo = response.result.skillExecutionInfo;
  const typeOfRequest = skillExecutionInfo && skillExecutionInfo.invocationRequest.body.request.type;
  const testName = `Request must be of type ${type}`;

  it (testName, () => {
    assert.equal(typeOfRequest, type);
  });
};

const test_hasCustomSlotValue = (slotName, response) => {
  const skillExecutionInfo = response.result.skillExecutionInfo;
  const slots = skillExecutionInfo && skillExecutionInfo.invocationRequest.body.request.intent.slots;
  const value = slots[slotName].resolutions.resolutionsPerAuthority[0].values[0].value.id;
  const testName = `Custom slot (${slotName}) must not be empty [${value}]`;

  it (testName, () => {
    assert.isNotEmpty(value);
  });

};
const test_hasBuiltInSlotValue = (slotName, response) => {
  const skillExecutionInfo = response.result.skillExecutionInfo;
  const slots = skillExecutionInfo && skillExecutionInfo.invocationRequest.body.request.intent.slots;
  const value = slots[slotName].value;
  const testName = `Built-In slot (${slotName}) must not be empty [${value}]`;

  it (testName, () => {
    assert.isNotEmpty(value);
  });
};

const openOnce = (response) => {
  test_successfulState(response);
  test_shouldEndSession(response, false);
  test_isNewSession(response, true);
  test_typeOfRequest(response, 'LaunchRequest');
};

const close = (response) => {
  test_successfulState(response);
  test_shouldEndSession(response, true);
  test_isNewSession(response, false);
  test_typeOfRequest(response, 'IntentRequest');
};

const fullDiaryLottery = (response) => {
  test_successfulState(response);
  test_shouldEndSession(response, true);
  test_isNewSession(response, false);
  test_typeOfRequest(response, 'IntentRequest');
  test_hasCustomSlotValue('type_of_game', response);
  test_hasBuiltInSlotValue('date', response);
  test_hasBuiltInSlotValue('digits_number', response);
  test_hasBuiltInSlotValue('digits_serie', response);
};


module.exports = {
  openOnce,
  close,
  fullDiaryLottery
};
