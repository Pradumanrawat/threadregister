const express = require('express');
const app = express();
const userroute = require('./routers/userroute')
const db = require('./db');

const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use('/user', userroute)

app.listen(7000, () => {
  console.log('server is live  at 5000')
})