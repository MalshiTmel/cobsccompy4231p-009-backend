const TrainWithoutEngine = require('../models/TrainWithoutEngineModel');

// Create a new TrainWithoutEngine
exports.createTrainWithoutEngine = async (req, res) => {
  const { TID, TName, RID, Stops } = req.body;
  try {
    const trainData = { TID, TName, RID, Stops };
    const train = new TrainWithoutEngine(trainData);
    const savedTrain = await train.save();
    res.status(201).json(savedTrain);
  } catch (error) {
    console.error('Error creating train:', error);
    res.status(400).json({ error: 'Unable to create train' });
  }
};

// Update an existing TrainWithoutEngine
exports.updateTrainWithoutEngine = async (req, res) => {
  const { train_id } = req.params;
  const updateFields = req.body;
  try {
    const updatedTrain = await TrainWithoutEngine.findOneAndUpdate(
      { TID: train_id },
      updateFields,
      { new: true }
    );
    if (!updatedTrain) {
      console.warn('Train not found:', train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(updatedTrain);
  } catch (error) {
    console.error('Error updating train:', error);
    res.status(400).json({ error: 'Unable to update train' });
  }
};

// Delete a TrainWithoutEngine
exports.deleteTrainWithoutEngine = async (req, res) => {
  const { train_id } = req.params;
  try {
    const deletedTrain = await TrainWithoutEngine.findOneAndDelete({ TID: train_id });
    if (!deletedTrain) {
      console.warn('Train not found for deletion:', train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json({ message: 'Train deleted successfully' });
  } catch (error) {
    console.error('Error deleting train:', error);
    res.status(400).json({ error: 'Unable to delete train' });
  }
};

// Get all TrainsWithoutEngines
exports.getAllTrainsWithoutEngines = async (req, res) => {
  try {
    const trains = await TrainWithoutEngine.find();
    res.json(trains);
  } catch (error) {
    console.error('Error retrieving trains:', error);
    res.status(400).json({ error: 'Unable to retrieve trains' });
  }
};

// Get real-time data for a specific TrainWithoutEngine
exports.getRealTimeData = async (req, res) => {
  const { train_id } = req.params;
  try {
    const train = await TrainWithoutEngine.findOne({ TID: train_id });
    if (!train) {
      console.warn('Train not found for real-time data:', train_id);
      return res.status(404).json({ error: 'Train not found' });
    }

    const { Stops } = train;
    const startStation = Stops[0];
    const endStation = Stops[Stops.length - 1];
    const directionOptions = [
      `${startStation} to ${endStation}`,
      `${endStation} to ${startStation}`
    ];

    // Select direction if not specified or if it's invalid
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
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    res.status(400).json({ error: 'Unable to fetch real-time data' });
  }
};

// Get a single TrainWithoutEngine by TID
exports.getTrainWithoutEngineByTID = async (req, res) => {
  const { train_id } = req.params;
  try {
    const train = await TrainWithoutEngine.findOne({ TID: train_id });
    if (!train) {
      console.warn('Train not found:', train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    console.error('Error retrieving train:', error);
    res.status(400).json({ error: 'Unable to retrieve train' });
  }
};
