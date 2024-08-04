const TrainWithEngine = require('../models/TrainWithEngineModel');

// Create TrainWithEngine
exports.createTrainWithEngine = async (req, res) => {
  try {
    const trainWithEngineData = req.body;
    console.log("Creating TrainWithEngine with data:", trainWithEngineData); // Log input data
    const newTrainWithEngine = await TrainWithEngine.create(trainWithEngineData);
    console.log("Created TrainWithEngine:", newTrainWithEngine); // Log created data
    res.status(201).json(newTrainWithEngine);
  } catch (error) {
    console.error("Error creating TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error creating TrainWithEngine', details: error.message });
  }
};

// Remove Train from Engine
exports.removeTrainFromEngine = async (req, res) => {
  try {
    const { fulltrain_id } = req.params;
    console.log("Removing TrainWithEngine with ID:", fulltrain_id); // Log ID
    const deletedTrainWithEngine = await TrainWithEngine.findByIdAndRemove(fulltrain_id);
    if (!deletedTrainWithEngine) return res.status(404).send({ message: 'TrainWithEngine not found' });
    console.log("Removed TrainWithEngine:", deletedTrainWithEngine); // Log deleted data
    res.send({ message: 'TrainWithEngine successfully removed' });
  } catch (error) {
    console.error("Error removing TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error removing TrainWithEngine', details: error.message });
  }
};

// Modify TrainWithEngine
exports.modifyTrainWithEngine = async (req, res) => {
  try {
    const { fulltrain_id } = req.params;
    console.log("Updating TrainWithEngine with ID:", fulltrain_id, "and data:", req.body); // Log ID and data
    const updatedTrainWithEngine = await TrainWithEngine.findByIdAndUpdate(fulltrain_id, req.body, { new: true });
    if (!updatedTrainWithEngine) return res.status(404).send({ message: 'TrainWithEngine not found' });
    console.log("Updated TrainWithEngine:", updatedTrainWithEngine); // Log updated data
    res.send(updatedTrainWithEngine);
  } catch (error) {
    console.error("Error updating TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error updating TrainWithEngine', details: error.message });
  }
};

// Fetch All TrainWithEngines
exports.fetchAllTrainWithEngines = async (req, res) => {
  try {
    console.log("Fetching all TrainWithEngines"); // Log fetching action
    const allTrainWithEngines = await TrainWithEngine.find();
    console.log("Fetched TrainWithEngines:", allTrainWithEngines); // Log fetched data
    res.send(allTrainWithEngines);
  } catch (error) {
    console.error("Error fetching TrainWithEngines:", error); // Log error
    res.status(400).send({ message: 'Error fetching TrainWithEngines', details: error.message });
  }
};

// Fetch TrainWithEngine by ID
exports.fetchTrainWithEngineById = async (req, res) => {
  try {
    const { fulltrain_id } = req.params;
    console.log("Fetching TrainWithEngine with ID:", fulltrain_id); // Log ID
    const trainWithEngine = await TrainWithEngine.findOne({ FID: fulltrain_id });
    if (!trainWithEngine) return res.status(404).send({ message: 'TrainWithEngine not found' });
    console.log("Fetched TrainWithEngine:", trainWithEngine); // Log fetched data
    res.send(trainWithEngine);
  } catch (error) {
    console.error("Error fetching TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error fetching TrainWithEngine', details: error.message });
  }
};
