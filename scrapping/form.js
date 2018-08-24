const cheerio = require('cheerio');
const request = require('request');
const async = require('async');
const qs = require('querystring');

const parse = require('./parse');


const extractCsrfToken = (body) => {
  const $ = cheerio.load(body);
  //return $('form.comprueba [name=csrf-param]').val();
  return $('form.compruebanw [name=csrf-param]').val();
}

const getRequest = (url, cb) => {
  request
    .get(url, (err, res) => {
      if (err) return cb(err);
      return cb(null, res);
    });
};

const postRequest = (url, formData, getResponse, cb) => {
  const csrfToken = extractCsrfToken(getResponse.body);

  const cookies = getResponse.headers['set-cookie'];

  formData['csrf-param'] = csrfToken;
  const postData = qs.stringify(formData);

  const options = {
    url,
    form: postData,
    followAllRedirects: true,
    connection: 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: cookies
    }
  };

  request
    .post(options, (err, res, body) => {
      if (err) return cb(err);
      return cb(null, body);
    });
};

const getAlexaText = (postResponse, cb) => {
  const $ = cheerio.load(postResponse);

  let prize = $('.nopremio');
  if (prize.length === 0) {
    prize = $('.premio');
  }

  return cb(null, parse.diaryCoupon(prize));
};


const getAlexaResponse = (url, postData) => {
  return new Promise((resolve, reject) => {
    async.waterfall([
      async.apply(getRequest, url),
      async.apply(postRequest, url, postData),
      getAlexaText
    ], (err, result) => {
      if (err) reject(err);
      else return resolve(result);
    });
  });
};

module.exports = {
  getAlexaResponse,
};
