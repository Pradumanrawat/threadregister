
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require('../models/user');
const router = express.Router();


router.post('/', async (req, res) => {
  const { companyName, password } = req.body;
  try {
    // Find the user by companyName
    const user = await model.findOne({ companyName });
    if (!user) {
      return res.status(400).json({ error: 'Company name is incorrect' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Generate a JWT token with user details
    const token = jwt.sign(
      {
        id: user._id,
        companyName: user.companyName
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
