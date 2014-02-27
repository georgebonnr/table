var app  = require('../app');

module.exports = function(){
  app.set('apiPath', '/api/v1');
  app.set('loginPrefix', '/login');
};
