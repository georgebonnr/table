var Schema = require('mongoose').Schema;

module.exports = new Schema({
  phone: {
    type: String,
    required: true
  },
  email: String,
  organization: {
    type: String,
    index: true
  },
  table: String,
  size: Number,
  splitCheck: [{
    guest_id: Schema.ObjectId,
  }],
  cardOnFile: Boolean,
  paid: Boolean,
  time: {
    type: Date
  },
  notes: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated:  {
    type: Date,
    default: Date.now
  },
});
