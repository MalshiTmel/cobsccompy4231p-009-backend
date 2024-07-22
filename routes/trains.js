const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// Get all trains
router.get('/', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;