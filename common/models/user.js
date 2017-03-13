'use strict';

module.exports = function (user) {

  const querystring = require('querystring');
  const request = require('request-promise-native');
  const path = require('path');
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');
  const environment = require('../../server/environment');

  /**
   * Authentication with Account Kit
   * @param {string} code This string contains an authorization code from AccountKit.
   * @param {string} csrf CSRF protection. A string containing a non-guessable value which should originate on the server.
   * @param {Function(Error, string)} callback
   */

  user.authAccountKit = function (code, csrf, callback) {
    // check csrf

    var app_access_token = ['AA', environment.facebook_app_id, environment.accountkit_app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: code,
      access_token: app_access_token
    };

    // exchange tokens
    var accountkit_token_exchange_url =
      environment.accountkit_token_exchange_base_url + '?' + querystring.stringify(params);
    request.get({
      url: accountkit_token_exchange_url,
      json: true
    }).then(function (body) {
      if (body.error) {
        console.log(body.error);
        return callback(body.error);
      }

      // get account details at /me endpoint
      var params = {
        access_token: body.access_token,
        appsecret_proof: crypto.createHmac(
          'sha256',
          environment.accountkit_app_secret
        ).update(body.access_token).digest('hex')
      };

      var accountkit_me_endpoint_url =
        environment.accountkit_me_endpoint_base_url + '?' + querystring.stringify(params);
      request.get({
        url: accountkit_me_endpoint_url,
        json: true
      }).then(function (body) {
        if (body.error) {
          console.log(body.error);
          return callback(body.error);
        }
        // check if number exists
        user.findOne({where: {phoneNumber: body.phone.number}}, function(err, userExist) {
          if (userExist) {
            console.log('User exists: ', userExist);
            return callback('number exists');
          } else {
            // create jwt payload
            var phoneToken = jwt.sign(body, environment.tenoften_app_secret);
            return callback(null, phoneToken);
          }
        });
      }).catch(function (err) {
        console.log(err)
        return callback(err);
      });
    }).catch(function (err) {
      console.log(err)
      return callback(err);
    });
  };
};
