const OldRecords = require('../models/OldRecords');

/**
 * @swagger
 * tags:
 *   name: OldRecords
 *   description: API endpoints for managing old records.
 */

/**
 * @swagger
 * /api/old-records:
 *   get:
 *     summary: Retrieve all old records
 *     description: Fetches all old records from the database. Each record represents historical data related to train engines.
 *     tags: [OldRecords]
 *     responses:
 *       200:
 *         description: A list of old records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the record.
 *                   EID:
 *                     type: string
 *                     description: The engine ID.
 *                   currentIndex:
 *                     type: integer
 *                     description: The current index of the engine in the route.
 *                   direction:
 *                     type: string
 *                     description: The direction of the engine (e.g., Upward, Downward).
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     description: The start time of the record.
 *                   lastStationUpdate:
 *                     type: string
 *                     format: date-time
 *                     description: The last station update time.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the record.
 *       500:
 *         description: Server error fetching old records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the error.
 *                 error:
 *                   type: object
 *                   description: Error details.
 */
exports.getAllOldRecords = async (req, res) => {
  try {
    const records = await OldRecords.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching old records', error });
  }
};
