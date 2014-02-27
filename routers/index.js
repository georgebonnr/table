var express           = require('express'),
    app               = require('../app'),
    path              = require('path'),
    auth              = require('./middleware/auth'),
    api               = require('./api')(),
    application       = require('./application');

module.exports = function(){
  app.use(app.get('apiPath'), api.middleware);
  app.use(app.get('loginPrefix'), auth.loginHelper);
  app.use(app.get('loginPrefix'), express.static(path.join(__dirname, '../public/build')));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../public/build')));

  application();
};
