var express = require('express');
var routes = require('./routes');
var auth = require('./middleware/auth');
var db = require('./middleware/db');
var basicAuth = require('./middleware/basicAuth');


module.exports = function(){
  var api = new express.Router();

  /////////////////////
  //// RESERVATIONS  //
  /////////////////////
  api.get('/reservations',  basicAuth, db, routes.reservations.get);
  api.get('/reservations/:id', basicAuth, db, routes.reservations.getOne);
  api.post('/reservations', basicAuth, db, routes.reservations.create);
  api.put('/reservations/:id', basicAuth, db, routes.reservations.update);
  api.delete('/reservations/:id', basicAuth, db, routes.reservations.delete);

  //////////////
  //// USERS  //
  //////////////
  api.get('/users', basicAuth, db, routes.users.get);
  api.get('/users/:id', basicAuth, db, routes.users.getOne);
  api.post('/users', basicAuth, db, routes.users.create);
  api.put('/users/:id', basicAuth, db, routes.users.update);
  api.delete('/users/:id', basicAuth, db, routes.users.delete);

  /////////////////////////
  //// ACCOUNT SETTINGS  //
  /////////////////////////
  api.get('/preferences', basicAuth, db, routes.preferences.get);
  api.put('/preferences', basicAuth, db, routes.preferences.update);

  ///////////////
  //// TABLES  //
  ///////////////
  api.get('/tables', basicAuth, db, routes.tables.get);
  
  return api;
};
