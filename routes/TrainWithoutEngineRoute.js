const express = require('express');
const router = express.Router();
const {
  createTrainWithoutEngine,
  updateTrainWithoutEngine,
  deleteTrainWithoutEngine,
  getAllTrainsWithoutEngines,
  getRealTimeData,
  getTrainWithoutEngineByTID,
  getTrainsByRouteID
} = require('../controllers/TrainWithoutEngineController');

// Route for creating a TrainWithoutEngine
router.post('/', createTrainWithoutEngine);

// Route for updating a TrainWithoutEngine
router.put('/:train_id', updateTrainWithoutEngine);

// Route for deleting a TrainWithoutEngine
router.delete('/:train_id', deleteTrainWithoutEngine);

// Route for retrieving all TrainsWithoutEngines
router.get('/', getAllTrainsWithoutEngines);

// Route for retrieving real-time data of a specific TrainWithoutEngine
router.get('/:train_id/realtime', getRealTimeData);

// Route for retrieving a specific TrainWithoutEngine by TID
router.get('/:train_id', getTrainWithoutEngineByTID);

// Route for retrieving all TrainsWithoutEngines by Route ID
router.get('/route/:route_id', getTrainsByRouteID);


module.exports = router;