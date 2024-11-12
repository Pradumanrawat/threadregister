const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  ownerNumber: {
    type: Number,
    required: true,
  },
  altNumber: {
    type: Number,
  },
  companyEmail: {
    type: String,
  },
  gstNumber: {
    type: String,
    required: true
  },
  plotNumber: {
    type: Number,
    required: true,
  },
  sector: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
})

const user = mongoose.model('user', schema)
module.exports = user;














