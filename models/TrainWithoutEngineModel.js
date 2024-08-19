const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainWithoutEngine:
 *       type: object
 *       required:
 *         - TID
 *         - TName
 *         - RID
 *         - Stops
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the TrainWithoutEngine document.
 *         TID:
 *           type: string
 *           description: Train ID, which must be unique.
 *         TName:
 *           type: string
 *           description: Name of the train.
 *         RID:
 *           type: string
 *           description: Route ID, associated with the route.
 *         Stops:
 *           type: array
 *           items:
 *             type: string
 *           description: List of stops for the train route.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the document was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the document was last updated.
 */

const trainWithoutEngineSchema = new mongoose.Schema({
  TID: { type: String, required: true, unique: true },
  TName: { type: String, required: true },
  RID: { type: String, required: true },
  Stops: [{ type: String, required: true }]
}, { collection: 'trainsWithoutEngines' }); // Explicitly specify the collection name

/**
 * Model representing a train without an engine.
 * @typedef {Object} TrainWithoutEngine
 * @property {string} _id - Unique identifier for the TrainWithoutEngine document.
 * @property {string} TID - Train ID, which must be unique.
 * @property {string} TName - Name of the train.
 * @property {string} RID - Route ID, associated with the route.
 * @property {string[]} Stops - List of stops for the train route.
 * @property {string} createdAt - Timestamp when the document was created.
 * @property {string} updatedAt - Timestamp when the document was last updated.
 */

module.exports = mongoose.model('TrainWithoutEngine', trainWithoutEngineSchema);
