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

/**
 * @swagger
 * tags:
 *   name: TrainWithEngines
 *   description: API endpoints for managing trains with engines.
 */

/**
 * @swagger
 * /train-with-engines:
 *   post:
 *     summary: Create a new TrainWithEngine
 *     tags: [TrainWithEngines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainWithEngine'
 *     responses:
 *       201:
 *         description: TrainWithEngine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithEngine'
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
router.post('/', createTrainWithEngine);

/**
 * @swagger
 * /train-with-engines/unassign/{fulltrain_id}:
 *   patch:
 *     summary: Unassign engine from a TrainWithEngine
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: fulltrain_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithEngine to unassign
 *     responses:
 *       200:
 *         description: Engine unassigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: TrainWithEngine not found
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
router.patch('/unassign/:fulltrain_id', removeTrainFromEngine);

/**
 * @swagger
 * /train-with-engines/{fulltrain_id}:
 *   patch:
 *     summary: Modify an existing TrainWithEngine
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: fulltrain_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithEngine to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainWithEngine'
 *     responses:
 *       200:
 *         description: TrainWithEngine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithEngine'
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
 *         description: TrainWithEngine not found
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
router.patch('/:fulltrain_id', modifyTrainWithEngine);

/**
 * @swagger
 * /train-with-engines:
 *   get:
 *     summary: Retrieve all TrainWithEngines
 *     tags: [TrainWithEngines]
 *     responses:
 *       200:
 *         description: A list of TrainWithEngines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainWithEngine'
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
router.get('/', fetchAllTrainWithEngines);

/**
 * @swagger
 * /train-with-engines/{fulltrain_id}:
 *   get:
 *     summary: Retrieve a specific TrainWithEngine by ID
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: fulltrain_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the TrainWithEngine to retrieve
 *     responses:
 *       200:
 *         description: A specific TrainWithEngine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithEngine'
 *       404:
 *         description: TrainWithEngine not found
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
router.get('/:fulltrain_id', fetchTrainWithEngineById);

/**
 * @swagger
 * /train-with-engines/tid/{tid}:
 *   get:
 *     summary: Retrieve a specific TrainWithEngine by TID
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: The TID of the TrainWithEngine to retrieve
 *     responses:
 *       200:
 *         description: A specific TrainWithEngine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainWithEngine'
 *       404:
 *         description: TrainWithEngine not found
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
router.get('/tid/:tid', fetchTrainWithEngineByTID);

module.exports = router;
