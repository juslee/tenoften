'use strict';

module.exports = function (app) {
  const Guid = require('guid');
  const Querystring = require('querystring');
  const Request = require('request');
  const path = require('path');
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');

  const csrf_guid = Guid.raw();
  const api_version = 'v1.1';
  const app_id = '385067331861019';
  const app_secret = 'b10358ef0fb47d907c9a220b582b964f';
  const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
  const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token';


  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/register.html'));
  });
}
