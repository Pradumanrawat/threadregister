const mongoose = require('mongoose');
const url = process.env.MONGO_URI
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('connected', () => {
  console.log('connected to mongodb server')
})

db.on('disconnected', () => {
  console.log('disconnected to mongodb server')
})

module.exports = db;
