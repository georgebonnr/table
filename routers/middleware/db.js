var authDbCall = require('./authDbCall');

var mongoose = require('mongoose');
var models = require('../../models');

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/table';
var connection = mongoose.createConnection(dbUrl);

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.info('connected to database');
});

module.exports = function db (req, res, next) {
  console.log('req',req);
  req.db = {
    User: connection.model('User', models.User, 'users'),
    Organization: connection.model('Organization', models.Organization, 'organizations'),
    Reservation: connection.model('Reservation', models.Reservation, 'reservations')
  };
  if (!req.session.auth){
    authDbCall(req, res, next);
  } else {
    next();
  }
};
