
require('dotenv').config({path: __dirname + '/../../.env'});
const axios = require('axios');


const makeSimulation = (accessToken, utterance) => {
  const url = `https://api.amazonalexa.com/v1/skills/${process.env.APP_ID}/simulations`;

  const headers = {
    Authorization: accessToken,
    'content-type': 'application/json',
    accept: 'application/json'
  };

  const data = {
    "input": {
      "content": utterance
    },
    "device": {
      "locale": "es-ES"
    }
  };


  const req = {
    method: 'POST',
    headers,
    data,
    url
  };

  return new Promise((resolve, reject) => {
    axios(req)
      .then((res) => {
        resolve(res.data.id)
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSimulation = (accessToken, simulationId) => {
  const url = `https://api.amazonalexa.com/v1/skills/${process.env.APP_ID}/simulations/${simulationId}`;

  const headers = {
    Authorization: accessToken,
    'content-type': 'application/json',
    accept: 'application/json'
  };

  const req = {
    method: 'GET',
    headers,
    url
  };

  return new Promise((resolve, reject) => {
    axios(req)
      .then((res) => {
        if (res.data.status === 'IN_PROGRESS') {
          setTimeout(() => {
            return resolve(getSimulation(accessToken, simulationId));
          }, 1000);
        }
        else {
          resolve(res.data)
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  makeSimulation,
  getSimulation
};
