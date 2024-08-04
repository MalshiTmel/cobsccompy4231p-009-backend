const express = require('express');
const router = express.Router();
const {
  createTrainEngine,
  updateTrainEngine,
  deleteTrainEngine,
  getAllTrainEngines,
  getTrainEngineById
} = require('../controllers/TrainEnginesController');

// Route to get all train engines
router.get('/', getAllTrainEngines);

// Route to get a specific train engine by ID
router.get('/:engine_id', getTrainEngineById);

// Route to create a new train engine
router.post('/', createTrainEngine);

// Route to update an existing train engine
router.put('/:engine_id', updateTrainEngine);

// Route to delete a train engine
router.delete('/:engine_id', deleteTrainEngine);

module.exports = router;
