var express = require('express');
var routes = require('./routes');
var auth = require('./middleware/auth');
var db = require('./middleware/db');

module.exports = function(){
  var api = new express.Router();

  /////////////////////
  //// RESERVATIONS  //
  /////////////////////
  api.get('/reservations',     db, routes.reservations.get);
  api.get('/reservations/:id', db, routes.reservations.getOne);
  api.post('/reservations',    db, routes.reservations.create);
  api.put('/reservations/:id', db, routes.reservations.update);
  api.delete('/reservations/:id', db, routes.reservations.delete);

  //////////////
  //// USERS  //
  //////////////
  api.get('/users',     db, routes.reservations.get);
  // api.get('/users/:id', db, routes.reservations.getOne);
  // api.post('/users',    db, routes.reservations.create);
  // api.put('/users/:id', db, routes.reservations.update);
  // api.delete('/users/:id', db, routes.reservations.delete);

  /////////////////////////
  //// ACCOUNT SETTINGS  //
  /////////////////////////
  

  ///////////////
  //// TABLES  //
  ///////////////
  api.get('/tables', db, routes.tables.get);
  
  return api;
};
