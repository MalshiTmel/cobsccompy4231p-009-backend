const TrainEngine = require('../models/TrainEnginesModel');

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
