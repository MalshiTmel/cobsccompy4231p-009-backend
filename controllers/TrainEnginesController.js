const TrainEngine = require('../models/TrainEnginesModel');
const TrainWithEngine = require('../models/TrainWithEngineModel');
const TrainWithoutEngine = require('../models/TrainWithoutEngineModel');

// Create Train Engine
exports.createTrainEngine = async (req, res) => {
  try {
    const newEngine = await TrainEngine.create(req.body);
    return res.status(201).json(newEngine);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Update Train Engine
exports.updateTrainEngine = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const updatedEngine = await TrainEngine.findOneAndUpdate(
      { EID: engine_id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEngine) return res.status(404).json({ error: 'Train Engine not found' });
    return res.json(updatedEngine);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Delete Train Engine
exports.deleteTrainEngine = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const deletedEngine = await TrainEngine.findOneAndDelete({ EID: engine_id });
    if (!deletedEngine) return res.status(404).json({ error: 'Train Engine not found' });
    return res.json({ message: 'Train Engine successfully deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get All Train Engines
exports.getAllTrainEngines = async (req, res) => {
  try {
    const engines = await TrainEngine.find();
    return res.json(engines);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get Train Engine by ID
exports.getTrainEngineById = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const engine = await TrainEngine.findOne({ EID: engine_id });
    if (!engine) return res.status(404).json({ error: 'Train Engine not found' });
    return res.json(engine);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get Real-Time Data for a Train Engine by Engine ID
exports.getRealTimeData = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const trainWithEngine = await TrainWithEngine.findOne({ EID: engine_id });
    if (!trainWithEngine) {
      return res.status(404).json({ error: 'TrainWithEngine not found' });
    }

    const trainWithoutEngine = await TrainWithoutEngine.findOne({ TID: trainWithEngine.TID });
    if (!trainWithoutEngine) {
      return res.status(404).json({ error: 'Train without engine not found' });
    }

    const { Stops } = trainWithoutEngine;
    const startStation = Stops[0];
    const endStation = Stops[Stops.length - 1];
    const directionOptions = [
      `${startStation} to ${endStation}`,
      `${endStation} to ${startStation}`
    ];

    const currentDirection = directionOptions[Math.floor(Math.random() * directionOptions.length)];
    const currentIndex = Math.floor(Math.random() * Stops.length);
    const currentStation = Stops[currentIndex];

    let nextStation;
    if (currentDirection === `${startStation} to ${endStation}`) {
      nextStation = Stops[currentIndex + 1] || 'End of Route';
    } else {
      nextStation = currentIndex > 0 ? Stops[currentIndex - 1] : 'Start of Route';
    }

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 100 * 60 * 60 * 1000);
    const estimatedEndTime = endTime.toLocaleTimeString();

    res.json({
      direction: currentDirection,
      startStation,
      endStation,
      startTime,
      estimatedEndTime,
      currentStation,
      nextStation
    });
  } catch (err) {
    console.error('Error fetching real-time data:', err);
    res.status(400).json({ error: err.message });
  }
};
