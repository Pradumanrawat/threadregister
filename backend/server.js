const express = require('express');
const dotenv = require('dotenv')


dotenv.config();
const app = express();
const userroute = require('./routers/userroute')
const paymentRoutes = require("./routers/paymentroute");
const loginroute = require('./routers/loginroute')
const db = require('./db');

const bodyParser = require("body-parser");
const cors = require('cors');

const port = process.env.PORT || 7000
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userroute)
app.use("/pay", paymentRoutes)
app.use('/login', loginroute);
app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);
})