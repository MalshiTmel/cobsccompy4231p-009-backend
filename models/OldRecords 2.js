const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     OldRecords:
 *       type: object
 *       required:
 *         - EID
 *         - currentIndex
 *         - direction
 *         - startTime
 *         - lastStationUpdate
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the old record.
 *         EID:
 *           type: string
 *           description: Engine ID.
 *         currentIndex:
 *           type: integer
 *           description: Current index of the train in its journey.
 *         direction:
 *           type: string
 *           description: Direction of the train's movement.
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time of the train's journey.
 *         lastStationUpdate:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp for the station.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was created.
 */

const OldRecordsSchema = new mongoose.Schema({
  EID: { type: String, required: true },
  currentIndex: { type: Number, required: true },
  direction: { type: String, required: true },
  startTime: { type: Date, required: true },
  lastStationUpdate: { type: Date, required: true },
  timestamp: { type: Date, default: Date.now },
});

/**
 * Model representing an old record of a train.
 * @typedef {Object} OldRecords
 * @property {string} _id - Unique identifier of the old record.
 * @property {string} EID - Engine ID.
 * @property {number} currentIndex - Current index of the train in its journey.
 * @property {string} direction - Direction of the train's movement.
 * @property {Date} startTime - Start time of the train's journey.
 * @property {Date} lastStationUpdate - Last update timestamp for the station.
 * @property {Date} timestamp - Timestamp when the record was created.
 */
const OldRecords = mongoose.model('OldRecords', OldRecordsSchema);

module.exports = OldRecords;
