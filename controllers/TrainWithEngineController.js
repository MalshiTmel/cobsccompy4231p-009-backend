const TrainWithEngine = require('../models/TrainWithEngineModel');

/**
 * @swagger
 * tags:
 *   name: TrainWithEngines
 *   description: API endpoints for managing train engines and their assignments.
 */

/**
 * @swagger
 * /api/train-with-engines:
 *   post:
 *     summary: Create a new TrainWithEngine
 *     description: Adds a new train engine assignment to the database.
 *     tags: [TrainWithEngines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TID:
 *                 type: string
 *                 description: Train ID
 *               EID:
 *                 type: string
 *                 description: Engine ID
 *               [additionalProperties]:
 *                 type: string
 *                 description: Other properties related to train engine assignments.
 *     responses:
 *       201:
 *         description: TrainWithEngine successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the assignment.
 *                 TID:
 *                   type: string
 *                   description: Train ID
 *                 EID:
 *                   type: string
 *                   description: Engine ID
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the assignment.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 details:
 *                   type: string
 *                   description: Error details.
 */
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

/**
 * @swagger
 * /api/train-with-engines/{fulltrain_id}:
 *   patch:
 *     summary: Unassign engine from a train
 *     description: Sets the engine ID (EID) to 'unassigned' for a specific train.
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: fulltrain_id
 *         required: true
 *         description: The Train ID for which to unassign the engine.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Engine successfully unassigned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the assignment.
 *                 TID:
 *                   type: string
 *                   description: Train ID
 *                 EID:
 *                   type: string
 *                   description: Engine ID
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the assignment.
 *       404:
 *         description: TrainWithEngine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 details:
 *                   type: string
 *                   description: Error details.
 */
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

/**
 * @swagger
 * /api/train-with-engines/{fulltrain_id}:
 *   put:
 *     summary: Modify a TrainWithEngine assignment
 *     description: Updates the details of a specific TrainWithEngine assignment.
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: fulltrain_id
 *         required: true
 *         description: The Train ID for which to update the assignment.
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
 *                 description: New Engine ID
 *               [additionalProperties]:
 *                 type: string
 *                 description: Other properties to update.
 *     responses:
 *       200:
 *         description: TrainWithEngine successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the assignment.
 *                 TID:
 *                   type: string
 *                   description: Train ID
 *                 EID:
 *                   type: string
 *                   description: Engine ID
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other updated properties of the assignment.
 *       404:
 *         description: TrainWithEngine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 details:
 *                   type: string
 *                   description: Error details.
 */
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

/**
 * @swagger
 * /api/train-with-engines:
 *   get:
 *     summary: Fetch all TrainWithEngines
 *     description: Retrieves all train engine assignments from the database.
 *     tags: [TrainWithEngines]
 *     responses:
 *       200:
 *         description: A list of all TrainWithEngines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the assignment.
 *                   TID:
 *                     type: string
 *                     description: Train ID
 *                   EID:
 *                     type: string
 *                     description: Engine ID
 *                   [additionalProperties]:
 *                     type: string
 *                     description: Other properties of the assignment.
 *       400:
 *         description: Error fetching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 details:
 *                   type: string
 *                   description: Error details.
 */
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

/**
 * @swagger
 * /api/train-with-engines/{fulltrain_id}:
 *   get:
 *     summary: Fetch TrainWithEngine by TID
 *     description: Retrieves a specific train engine assignment by its Train ID.
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: fulltrain_id
 *         required: true
 *         description: The Train ID to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TrainWithEngine successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the assignment.
 *                 TID:
 *                   type: string
 *                   description: Train ID
 *                 EID:
 *                   type: string
 *                   description: Engine ID
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the assignment.
 *       404:
 *         description: TrainWithEngine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Error fetching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 details:
 *                   type: string
 *                   description: Error details.
 */
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

/**
 * @swagger
 * /api/train-with-engines/tid/{tid}:
 *   get:
 *     summary: Fetch TrainWithEngine by TID
 *     description: Retrieves a specific train engine assignment by its Train ID (TID).
 *     tags: [TrainWithEngines]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         description: The Train ID (TID) to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TrainWithEngine successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the assignment.
 *                 TID:
 *                   type: string
 *                   description: Train ID
 *                 EID:
 *                   type: string
 *                   description: Engine ID
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the assignment.
 *       404:
 *         description: TrainWithEngine not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Error fetching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                 details:
 *                   type: string
 *                   description: Error details.
 */
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
