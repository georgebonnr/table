var Schema = require('mongoose').Schema;
var Roles = require('./Roles');

module.exports = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  creditCards: [{
    cardNumber: String,
    expiration: String
    //etc. info encrypted
  }],
  roles: [{
    type:String,
    enum: Roles,
    default: Roles[0]
  }],
  photoUrl: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated:  {
    type: Date,
    default: Date.now
  },
  organizations: [{
    username: String,
    admin: Boolean
  }],
  guest_organizations: [String]
});
