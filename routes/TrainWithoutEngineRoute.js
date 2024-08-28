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

/**
 * @swagger
 * tags:
 *   name: TrainWithoutEngines
 *   description: API endpoints for managing trains without engines.
 */

/**
 * @swagger
 * /trains-without-engines:
 *   post:
 *     summary: Create a new TrainWithoutEngine
 *     tags: [TrainWithoutEngines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainWithoutEngine'
 *     responses:
 *       201:
 *         description: TrainWithoutEngine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithoutEngine'
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
router.post('/', createTrainWithoutEngine);

/**
 * @swagger
 * /trains-without-engines/{train_id}:
 *   put:
 *     summary: Update an existing TrainWithoutEngine
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithoutEngine to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainWithoutEngine'
 *     responses:
 *       200:
 *         description: TrainWithoutEngine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithoutEngine'
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
 *         description: TrainWithoutEngine not found
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
router.put('/:train_id', updateTrainWithoutEngine);

/**
 * @swagger
 * /trains-without-engines/{train_id}:
 *   delete:
 *     summary: Delete a TrainWithoutEngine
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithoutEngine to delete
 *     responses:
 *       200:
 *         description: TrainWithoutEngine deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: TrainWithoutEngine not found
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
router.delete('/:train_id', deleteTrainWithoutEngine);

/**
 * @swagger
 * /trains-without-engines:
 *   get:
 *     summary: Retrieve all TrainWithoutEngines
 *     tags: [TrainWithoutEngines]
 *     responses:
 *       200:
 *         description: A list of TrainWithoutEngines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainWithoutEngine'
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
router.get('/', getAllTrainsWithoutEngines);

/**
 * @swagger
 * /trains-without-engines/{train_id}/realtime:
 *   get:
 *     summary: Retrieve real-time data of a specific TrainWithoutEngine
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithoutEngine to retrieve real-time data
 *     responses:
 *       200:
 *         description: Real-time data of the TrainWithoutEngine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 realTimeData:
 *                   type: object
 *                   description: Real-time data details
 *       404:
 *         description: TrainWithoutEngine not found
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
router.get('/:train_id/realtime', getRealTimeData);

/**
 * @swagger
 * /trains-without-engines/{train_id}:
 *   get:
 *     summary: Retrieve a specific TrainWithoutEngine by TID
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithoutEngine to retrieve
 *     responses:
 *       200:
 *         description: A specific TrainWithoutEngine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithoutEngine'
 *       404:
 *         description: TrainWithoutEngine not found
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
router.get('/:train_id', getTrainWithoutEngineByTID);

/**
 * @swagger
 * /trains-without-engines/route/{route_id}:
 *   get:
 *     summary: Retrieve all TrainWithoutEngines by Route ID
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Route ID to retrieve trains for
 *     responses:
 *       200:
 *         description: A list of TrainWithoutEngines for the given Route ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainWithoutEngine'
 *       404:
 *         description: No trains found for the given Route ID
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
router.get('/route/:route_id', getTrainsByRouteID);

module.exports = router;
