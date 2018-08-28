require('dotenv').config({path: __dirname + '/../../.env'});
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const profiles = require('./objects/profiles.json');

const catchErrors = (err) => {
  console.log("Error -->", err);
  process.exit(-1);
}

const updateProfileJSON = async (newToken) => {
  profiles.profiles[process.env.alexa_profile].token = newToken;

  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/objects/profiles.json`, JSON.stringify(profiles), (err) => {
      if(err) {
        reject(err);
      }
      console.log(`The token has been updated on ${__dirname}/objects/profiles.json`);
      resolve();
    });
  });
};

const getNewToken = async (refreshToken) => {
  const headers = {
    "Content-Type": "application/json"
  };

  const data = {
    client_id: process.env.tests_client_id,
    client_secret: process.env.tests_client_secret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const req = {
    method: 'POST',
    headers,
    data,
    url: 'https://api.amazon.com/auth/o2/token'
  };

  return new Promise((resolve, reject) => {
    axios(req)
    .then( async (res) => {
      const token = res.data
      profiles.profiles[process.env.alexa_profile].token = token;
      token.expires_at = moment().add(3300, 's'); // 300s (6m) of margin
      resolve(token);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const refreshToken = async (refreshToken) => {
  const newToken = await getNewToken(refreshToken).catch(e => catchErrors(e));
  await updateProfileJSON(newToken).catch(e => catchErrors(e));
  return newToken;
};


const isAValidToken = (token) => {
  const now = moment();
  const whenExpiresToken = moment(token.expires_at);

  if (whenExpiresToken.diff(now, 's') > 0) {
    return true;
  }
  return false;
};

const updateTokenIfCurrentIsNotValid = async () => {
  let token = profiles.profiles[process.env.alexa_profile].token;
  if (!isAValidToken(token)){
    token = await refreshToken(token.refresh_token).catch(e => catchErrors(e));
  }
  else {
    console.log("The current token is valid.");
  }
  return token;
};

module.exports = {
  updateTokenIfCurrentIsNotValid,
}
