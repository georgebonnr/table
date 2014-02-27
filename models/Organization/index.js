var Schema   = require('mongoose').Schema;
var Employee = require('./Employee');
var address  = require('./address');
var tables  = require('./tables');

module.exports = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  address: address,
  created: {
    type: Date,
    default: Date.now
  },
  tables: [tables],
  hours: {
    weekday: {
      open: String,
      close: String
    },
    weekend: {
      open: String,
      close: String
    }
  },
  updated:  {
    type: Date,
    default: Date.now
  },
  employees: [Employee]
});
