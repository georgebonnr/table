var express = require('express');
var app = require('../app');

module.exports = function(){
  app.configure(function(){
    app.set('port', process.env.PORT || 3000  );
    app.use(express.favicon());
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
  });
};
