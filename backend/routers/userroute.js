
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const model = require('../models/user');
router.post(
  '/',
  [
    body('companyName').isLength({ min: 3, max: 100 }).withMessage('Company name must be 3-100 characters long'),
    body('ownerName').isLength({ min: 3 }).withMessage('Owner name must be at least 3 characters long'),
    body('ownerNumber').matches(/^[6-9]\d{9}$/).withMessage('Invalid owner number format'),

    body('gstNumber').isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters long'),
    body('plotNumber').isNumeric().withMessage('Plot number must be numeric'),
    body('sector').isNumeric().withMessage('Sector must be numeric'),
    body('address').isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Return validation errors if any
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = req.body;
      const newuser = new model(data);
      const response = await newuser.save();
      console.log('Data saved successfully');
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;
