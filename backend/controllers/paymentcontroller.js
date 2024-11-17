
const Razorpay = require("razorpay");
const dotenv = require('dotenv');
dotenv.config();
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpaySecretKey = process.env.RAZORPAY_SECRET_KEY;

const razorpayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpaySecretKey
});

//initiate payment
const initiatePayment = async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;

    // Create a new payment order with Razorpay
    const paymentOrder = await razorpayInstance.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      payment_capture: 1,
      notes: {
        name,
        email,
        phone,
        amount
      }
    });

    // Send the order details (including order_id) to the client
    res.json({
      name: paymentOrder.name,
      email: paymentOrder.email,
      phone: paymentOrder.phone,
      orderId: paymentOrder.id,  // Send orderId
      amount: paymentOrder.amount,
      currency: paymentOrder.currency
    });

  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};


module.exports = initiatePayment;
