var app  = require('../app');
var querystring  = require('querystring');

module.exports = function(){
  app.use(querystring);
  app.set('apiPath', '/api/v1');
  app.set('loginPrefix', '/login');
};
