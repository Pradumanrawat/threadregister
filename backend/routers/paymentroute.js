const express = require("express");
const initiatePayment = require("../controllers/paymentcontroller");

const router = express.Router();

router.post("/", initiatePayment);

module.exports = router;
