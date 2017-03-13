'use strict';

module.exports = function(Model, options) {
  const jwt = require('jsonwebtoken');
  const crypto = require('crypto');
  const environment = require('../../server/environment');

  Model.defineProperty('phoneNumber', {
    type: String,
    required: false
  });
  Model.settings.hidden.push("phoneNumber");

  Model.observe('before save', function event(ctx, next) {
    if(ctx.instance.phoneToken) {
      jwt.verify(ctx.instance.phoneToken, environment.tenoften_app_secret, function(err, decoded) {
        if (err) throw err;
        
        console.log(decoded);

        ctx.instance.phoneNumber = decoded.phone.number;
      });
    }
    next();
  });
};
