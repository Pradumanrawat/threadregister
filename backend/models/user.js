const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const schema = new mongoose.Schema({
  companyName: {
    type: String,
    unique: true,
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
    required: true,
    unique: true,
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
  password: {
    type: String,
    require: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
})

schema.pre('save', async function (next) {
  const peoples = this;
  if (!peoples.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(peoples, this.password, salt)
    peoples.password = hashpassword
    next()
  } catch (err) {
    return next(err)



  }
})

const user = mongoose.model('user', schema)
module.exports = user;














