const express = require('express');
const router = express.Router();
const {
  createTrainWithEngine,
  removeTrainFromEngine,
  modifyTrainWithEngine,
  fetchAllTrainWithEngines,
  fetchTrainWithEngineById
} = require('../controllers/TrainWithEngineController');

// Add a new TrainWithEngine
router.post('/', createTrainWithEngine);

// Remove a TrainWithEngine (delete by ID)
router.delete('/:fulltrain_id', removeTrainFromEngine);

// Modify a TrainWithEngine (by ID)
router.put('/:fulltrain_id', modifyTrainWithEngine);

// Retrieve all TrainWithEngines
router.get('/', fetchAllTrainWithEngines);

// Retrieve a single TrainWithEngine by ID
router.get('/:fulltrain_id', fetchTrainWithEngineById);

module.exports = router;
