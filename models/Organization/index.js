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
  busyMorning: {
      start: String,
      end: String
    },
  slowMorning: {
    start: String,
    end: String
  },
  busyMidday: {
    start: String,
    end: String
  },
  slowMidday: {
    start: String,
    end: String
  },
  busyEvening: {
    start: String,
    end: String
  },
  slowEvening: {
    start: String,
    end: String
  },
  hours: {
    open: String,
    close: String
  },
  walkInPercentageRegular: String,
  walkInPercentageBusy: String,
  walkInPercentageSlow: String,
  updated:  {
    type: Date,
    default: Date.now
  },
  employees: [Employee]
});
