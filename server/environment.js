'use strict';
const guid = require('guid');

module.exports = {
  csrf_guid: guid.raw(), 
  tenoften_app_secret: process.env.TENOFTEN_APP_SECRET || 'b6437294a8ef1f2e9b687b2f312d5f04fa7a6a8cb5ef353d',  
  facebook_app_id: process.env.FACEBOOK_APP_ID || '385067331861019',
  
  accountkit_app_secret: process.env.ACCOUNTKIT_APP_SECRET || 'b10358ef0fb47d907c9a220b582b964f',
  accountkit_me_endpoint_base_url: 'https://graph.accountkit.com/v1.1/me',
  accountkit_token_exchange_base_url: 'https://graph.accountkit.com/v1.1/access_token',
  accountkit_api_version: 'v1.1'
};