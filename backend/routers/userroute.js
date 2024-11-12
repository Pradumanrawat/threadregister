const express = require('express');
const router = express.Router();
const model = require('../models/user')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newuser = new model(data);
    const response = await newuser.save();
    console.log('data saved')
    res.status(200).json(response)


  } catch (err) {

    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' });

  }
})

module.exports = router