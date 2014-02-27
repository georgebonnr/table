var express = require('express');
var app = require('../app');

module.exports = function(){
  app.use(express.cookieParser('seeecret'));
  app.use(express.session({
    secret: 'SEKR37'
  }));
};
