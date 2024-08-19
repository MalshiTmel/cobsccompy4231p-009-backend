const express = require('express');
const router = express.Router();
const {
  createTrainEngine,
  updateTrainEngine,
  deleteTrainEngine,
  getAllTrainEngines,
  getTrainEngineById,
  getRealTimeData
} = require('../controllers/TrainEnginesController');

/**
 * @swagger
 * tags:
 *   name: TrainEngines
 *   description: API endpoints for managing train engines.
 */

/**
 * @swagger
 * /train-engines:
 *   get:
 *     summary: Retrieve all train engines
 *     tags: [TrainEngines]
 *     responses:
 *       200:
 *         description: A list of train engines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainEngine'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', getAllTrainEngines);

/**
 * @swagger
 * /train-engines/{engine_id}:
 *   get:
 *     summary: Retrieve a specific train engine by ID
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the train engine
 *     responses:
 *       200:
 *         description: A specific train engine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainEngine'
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/:engine_id', getTrainEngineById);

/**
 * @swagger
 * /train-engines:
 *   post:
 *     summary: Create a new train engine
 *     tags: [TrainEngines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainEngine'
 *     responses:
 *       201:
 *         description: Train engine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainEngine'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/', createTrainEngine);

/**
 * @swagger
 * /train-engines/{engine_id}:
 *   put:
 *     summary: Update an existing train engine
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the train engine to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainEngine'
 *     responses:
 *       200:
 *         description: Train engine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainEngine'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.put('/:engine_id', updateTrainEngine);

/**
 * @swagger
 * /train-engines/{engine_id}:
 *   delete:
 *     summary: Delete a train engine
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the train engine to delete
 *     responses:
 *       200:
 *         description: Train engine deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.delete('/:engine_id', deleteTrainEngine);

/**
 * @swagger
 * /train-engines/{engine_id}/realtime:
 *   get:
 *     summary: Get real-time data for a specific train engine by ID
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the train engine
 *     responses:
 *       200:
 *         description: Real-time data for the train engine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 direction:
 *                   type: string
 *                   description: Current direction of the train
 *                 startStation:
 *                   type: string
 *                   description: The starting station
 *                 endStation:
 *                   type: string
 *                   description: The ending station
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   description: Start time of the journey
 *                 estimatedEndTime:
 *                   type: string
 *                   description: Estimated end time of the journey
 *                 currentStation:
 *                   type: string
 *                   description: Current station of the train
 *                 nextStation:
 *                   type: string
 *                   description: Next station of the train
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/:engine_id/realtime', getRealTimeData);

module.exports = router;
