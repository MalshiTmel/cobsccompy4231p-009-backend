// controllers/TrainWithEngineController.js

const TrainWithEngine = require('../models/TrainWithEngineModel');

// Create a new TrainWithEngine
exports.createTrainWithEngine = async (req, res) => {
  try {
    const newTrainWithEngine = new TrainWithEngine(req.body);
    await newTrainWithEngine.save();
    console.log("Created TrainWithEngine:", newTrainWithEngine); // Log created data
    res.status(201).send(newTrainWithEngine);
  } catch (error) {
    console.error("Error creating TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error creating TrainWithEngine', details: error.message });
  }
};

// Unassign Engine (set EID to 'unassigned')
exports.removeTrainFromEngine = async (req, res) => {
  try {
    const { fulltrain_id } = req.params;
    console.log("Removing TrainWithEngine with TID:", fulltrain_id); // Log TID

    const updatedTrainWithEngine = await TrainWithEngine.findOneAndUpdate(
      { TID: fulltrain_id }, // Query by TID
      { $set: { EID: 'unassigned' } },
      { new: true }
    );

    if (!updatedTrainWithEngine) return res.status(404).send({ message: 'TrainWithEngine not found' });
    console.log("Removed TrainWithEngine:", updatedTrainWithEngine); // Log updated data
    res.send(updatedTrainWithEngine);
  } catch (error) {
    console.error("Error removing TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error removing TrainWithEngine', details: error.message });
  }
};

// Modify TrainWithEngine (update by TID)
exports.modifyTrainWithEngine = async (req, res) => {
    try {
      const { fulltrain_id } = req.params;
      const updateData = req.body;
  
      console.log("Updating TrainWithEngine with TID:", fulltrain_id, "and data:", updateData); // Log TID and data
  
      const updatedTrainWithEngine = await TrainWithEngine.findOneAndUpdate(
        { TID: fulltrain_id }, // Query by TID
        updateData,
        { new: true }
      );
  
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

// Fetch TrainWithEngine by TID
exports.fetchTrainWithEngineById = async (req, res) => {
  try {
    const { fulltrain_id } = req.params;
    console.log("Fetching TrainWithEngine with TID:", fulltrain_id); // Log TID
    const trainWithEngine = await TrainWithEngine.findOne({ TID: fulltrain_id }); // Find by TID
    if (!trainWithEngine) return res.status(404).send({ message: 'TrainWithEngine not found' });
    console.log("Fetched TrainWithEngine:", trainWithEngine); // Log fetched data
    res.send(trainWithEngine);
  } catch (error) {
    console.error("Error fetching TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error fetching TrainWithEngine', details: error.message });
  }
};

// Fetch TrainWithEngine by TID
exports.fetchTrainWithEngineByTID = async (req, res) => {
  try {
    const { tid } = req.params;
    console.log("Fetching TrainWithEngine with TID:", tid); // Log TID
    const trainWithEngine = await TrainWithEngine.findOne({ TID: tid }); // Find by TID
    if (!trainWithEngine) return res.status(404).send({ message: 'TrainWithEngine not found' });
    console.log("Fetched TrainWithEngine:", trainWithEngine); // Log fetched data
    res.send(trainWithEngine);
  } catch (error) {
    console.error("Error fetching TrainWithEngine:", error); // Log error
    res.status(400).send({ message: 'Error fetching TrainWithEngine', details: error.message });
  }
};
