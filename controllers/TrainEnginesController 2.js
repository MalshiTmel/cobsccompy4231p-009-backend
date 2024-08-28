const TrainEngine = require('../models/TrainEnginesModel');
const generateRealTimeData = require('../gpsData/generateRealTimeData');

/**
 * @swagger
 * tags:
 *   name: TrainEngines
 *   description: API endpoints for managing train engines.
 */

/**
 * @swagger
 * /api/train-engines:
 *   post:
 *     summary: Create a new train engine
 *     description: Adds a new train engine to the database.
 *     tags: [TrainEngines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EID:
 *                 type: string
 *                 description: The engine ID.
 *               [additionalProperties]:
 *                 type: string
 *                 description: Other properties of the train engine.
 *     responses:
 *       201:
 *         description: Train engine successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the engine.
 *                 EID:
 *                   type: string
 *                   description: The engine ID.
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the train engine.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.createTrainEngine = async (req, res) => {
  try {
    const newEngine = await TrainEngine.create(req.body);
    return res.status(201).json(newEngine);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/train-engines/{engine_id}:
 *   put:
 *     summary: Update a train engine
 *     description: Updates an existing train engine by its ID.
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The engine ID of the train engine to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EID:
 *                 type: string
 *                 description: The engine ID.
 *               [additionalProperties]:
 *                 type: string
 *                 description: Other properties to update.
 *     responses:
 *       200:
 *         description: Train engine successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the engine.
 *                 EID:
 *                   type: string
 *                   description: The engine ID.
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other updated properties of the train engine.
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.updateTrainEngine = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const updatedEngine = await TrainEngine.findOneAndUpdate(
      { EID: engine_id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEngine) return res.status(404).json({ error: 'Train Engine not found' });
    return res.json(updatedEngine);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/train-engines/{engine_id}:
 *   delete:
 *     summary: Delete a train engine
 *     description: Deletes a train engine by its ID.
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The engine ID of the train engine to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train engine successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.deleteTrainEngine = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const deletedEngine = await TrainEngine.findOneAndDelete({ EID: engine_id });
    if (!deletedEngine) return res.status(404).json({ error: 'Train Engine not found' });
    return res.json({ message: 'Train Engine successfully deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/train-engines:
 *   get:
 *     summary: Retrieve all train engines
 *     description: Fetches all train engines from the database.
 *     tags: [TrainEngines]
 *     responses:
 *       200:
 *         description: A list of train engines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the engine.
 *                   EID:
 *                     type: string
 *                     description: The engine ID.
 *                   [additionalProperties]:
 *                     type: string
 *                     description: Other properties of the train engine.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.getAllTrainEngines = async (req, res) => {
  try {
    const engines = await TrainEngine.find();
    return res.json(engines);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/train-engines/{engine_id}:
 *   get:
 *     summary: Retrieve a train engine by ID
 *     description: Fetches a train engine from the database by its ID.
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The engine ID of the train engine to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested train engine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the engine.
 *                 EID:
 *                   type: string
 *                   description: The engine ID.
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the train engine.
 *       404:
 *         description: Train engine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.getTrainEngineById = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const engine = await TrainEngine.findOne({ EID: engine_id });
    if (!engine) return res.status(404).json({ error: 'Train Engine not found' });
    return res.json(engine);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

/**
 * @swagger
 * /api/train-engines/{engine_id}/real-time-data:
 *   get:
 *     summary: Get real-time data for a train engine
 *     description: Fetches real-time data for a specific train engine by its ID.
 *     tags: [TrainEngines]
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The engine ID of the train engine to fetch real-time data for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Real-time data for the requested train engine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Real-time data details.
 *       400:
 *         description: Error fetching real-time data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.getRealTimeData = async (req, res) => {
  const { engine_id } = req.params;
  try {
    const data = await generateRealTimeData(engine_id);
    res.json(data);
  } catch (err) {
    console.error('Error fetching real-time data:', err);
    res.status(400).json({ error: err.message });
  }
};
