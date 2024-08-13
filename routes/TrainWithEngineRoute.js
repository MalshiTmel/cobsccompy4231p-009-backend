// routes/TrainWithEngineRoute.js
const express = require('express');
const router = express.Router();
const {
  createTrainWithEngine,
  removeTrainFromEngine,
  modifyTrainWithEngine,
  fetchAllTrainWithEngines,
  fetchTrainWithEngineById,
  fetchTrainWithEngineByTID
} = require('../controllers/TrainWithEngineController');

// Create a new TrainWithEngine
router.post('/', createTrainWithEngine);

// Unassign engine (set EID to 'unassigned')
router.patch('/unassign/:fulltrain_id', removeTrainFromEngine);

// Modify a TrainWithEngine (update by TID)
router.patch('/:fulltrain_id', modifyTrainWithEngine);

// Retrieve all TrainWithEngines
router.get('/', fetchAllTrainWithEngines);

// Retrieve a single TrainWithEngine by ID
router.get('/:fulltrain_id', fetchTrainWithEngineById);

// Retrieve a single TrainWithEngine by TID
router.get('/tid/:tid', fetchTrainWithEngineByTID);

// Modify a TrainWithEngine (update by TID)
router.patch('/:fulltrain_id', modifyTrainWithEngine);

module.exports = router;
