const express = require('express');
const router = express.Router();
const StationList = require('../models/StationList');

// Get all station lists
router.get('/', async (req, res) => {
  try {
    const stations = await StationList.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific station list by ID
router.get('/:id', async (req, res) => {
  try {
    const station = await StationList.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station list not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new station list
router.post('/', async (req, res) => {
  const stationList = new StationList(req.body);
  try {
    const newStationList = await stationList.save();
    res.status(201).json(newStationList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a station list
router.patch('/:id', async (req, res) => {
  try {
    const stationList = await StationList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stationList) return res.status(404).json({ message: 'Station list not found' });
    res.json(stationList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a station list
router.delete('/:id', async (req, res) => {
  try {
    const stationList = await StationList.findByIdAndDelete(req.params.id);
    if (!stationList) return res.status(404).json({ message: 'Station list not found' });
    res.json({ message: 'Station list deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
