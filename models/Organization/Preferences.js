var Schema = require('mongoose').Schema;

module.exports = {
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
  walkInPercentageRegular: Number,
  walkInPercentageBusy: Number,
  walkInPercentageSlow: Number,
};
