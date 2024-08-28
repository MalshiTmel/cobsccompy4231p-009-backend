const TrainWithoutEngine = require('../models/TrainWithoutEngineModel');
const generateRealTimeData = require('../gpsData/generateRealTimeData'); // Import the function
const OldRecords = require('../models/OldRecords'); // Import OldRecords

/**
 * @swagger
 * /api/train-without-engines:
 *   post:
 *     summary: Create a new TrainWithoutEngine
 *     description: Adds a new train without an engine to the database.
 *     tags: [TrainWithoutEngines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TID:
 *                 type: string
 *                 description: Train ID.
 *               TName:
 *                 type: string
 *                 description: Train Name.
 *               RID:
 *                 type: string
 *                 description: Route ID.
 *               Stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of stops for the train.
 *     responses:
 *       201:
 *         description: TrainWithoutEngine successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the train.
 *                 TID:
 *                   type: string
 *                   description: Train ID.
 *                 TName:
 *                   type: string
 *                   description: Train Name.
 *                 RID:
 *                   type: string
 *                   description: Route ID.
 *                 Stops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of stops.
 *       400:
 *         description: Error creating train
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-without-engines/{train_id}:
 *   put:
 *     summary: Update an existing TrainWithoutEngine
 *     description: Updates details of an existing train without an engine.
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: The Train ID to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TID:
 *                 type: string
 *                 description: Train ID.
 *               TName:
 *                 type: string
 *                 description: Train Name.
 *               RID:
 *                 type: string
 *                 description: Route ID.
 *               Stops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of stops for the train.
 *     responses:
 *       200:
 *         description: TrainWithoutEngine successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the train.
 *                 TID:
 *                   type: string
 *                   description: Train ID.
 *                 TName:
 *                   type: string
 *                   description: Train Name.
 *                 RID:
 *                   type: string
 *                   description: Route ID.
 *                 Stops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of stops.
 *       404:
 *         description: Train not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Error updating train
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-without-engines/{train_id}:
 *   delete:
 *     summary: Delete a TrainWithoutEngine
 *     description: Removes a specific train without an engine from the database.
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: The Train ID to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TrainWithoutEngine successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Train not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Error deleting train
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-without-engines:
 *   get:
 *     summary: Get all TrainsWithoutEngines
 *     description: Retrieves a list of all trains without engines from the database.
 *     tags: [TrainWithoutEngines]
 *     responses:
 *       200:
 *         description: List of TrainsWithoutEngines successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the train.
 *                   TID:
 *                     type: string
 *                     description: Train ID.
 *                   TName:
 *                     type: string
 *                     description: Train Name.
 *                   RID:
 *                     type: string
 *                     description: Route ID.
 *                   Stops:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of stops.
 *       400:
 *         description: Error retrieving trains
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.getAllTrainsWithoutEngines = async (req, res) => {
  try {
    const trains = await TrainWithoutEngine.find();
    res.json(trains);
  } catch (error) {
    console.error('Error retrieving trains:', error);
    res.status(400).json({ error: 'Unable to retrieve trains' });
  }
};

/**
 * @swagger
 * /api/train-without-engines/{train_id}/real-time-data:
 *   get:
 *     summary: Get real-time data for a specific TrainWithoutEngine
 *     description: Retrieves real-time data for a specific train without an engine, including direction, current station, and next station.
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: The Train ID to fetch real-time data for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Real-time data successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 direction:
 *                   type: string
 *                   description: Current direction of the train.
 *                 startStation:
 *                   type: string
 *                   description: Start station of the train.
 *                 endStation:
 *                   type: string
 *                   description: End station of the train.
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   description: Start time of the journey.
 *                 estimatedEndTime:
 *                   type: string
 *                   description: Estimated end time of the journey.
 *                 currentStation:
 *                   type: string
 *                   description: Current station of the train.
 *                 nextStation:
 *                   type: string
 *                   description: Next station of the train.
 *       404:
 *         description: Train not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
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

/**
 * @swagger
 * /api/train-without-engines/{train_id}:
 *   get:
 *     summary: Get a single TrainWithoutEngine by TID
 *     description: Retrieves details of a specific train without an engine by its Train ID.
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: The Train ID to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TrainWithoutEngine successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the train.
 *                 TID:
 *                   type: string
 *                   description: Train ID.
 *                 TName:
 *                   type: string
 *                   description: Train Name.
 *                 RID:
 *                   type: string
 *                   description: Route ID.
 *                 Stops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of stops.
 *       404:
 *         description: Train not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Error retrieving train
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-without-engines/by-route/{route_id}:
 *   get:
 *     summary: Get all TrainsWithoutEngines by Route ID
 *     description: Retrieves a list of all trains without engines for a specific route ID.
 *     tags: [TrainWithoutEngines]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: The Route ID to fetch trains for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of TrainsWithoutEngines successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the train.
 *                   TID:
 *                     type: string
 *                     description: Train ID.
 *                   TName:
 *                     type: string
 *                     description: Train Name.
 *                   RID:
 *                     type: string
 *                     description: Route ID.
 *                   Stops:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of stops.
 *       404:
 *         description: No trains found for this route ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Error retrieving trains
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
exports.getTrainsByRouteID = async (req, res) => {
    const { route_id } = req.params;
    try {
      const trains = await TrainWithoutEngine.find({ RID: route_id });
      if (trains.length === 0) {
        return res.status(404).json({ error: 'No trains found for this route ID' });
      }
      res.json(trains);
    } catch (error) {
      console.error('Error retrieving trains by route ID:', error);
      res.status(400).json({ error: 'Unable to retrieve trains' });
    }
  };
