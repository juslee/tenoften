'use strict'

const pkg = require('../package.json');
var version = pkg.version.split('.').shift();

module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};