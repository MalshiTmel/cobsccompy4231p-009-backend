const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainWithEngine:
 *       type: object
 *       required:
 *         - FID
 *         - TID
 *         - EID
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the TrainWithEngine document.
 *         FID:
 *           type: string
 *           description: Full ID, which must be unique.
 *         TID:
 *           type: string
 *           description: Train ID, associated with the train.
 *         EID:
 *           type: string
 *           description: Engine ID, associated with the engine.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the document was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the document was last updated.
 */

const TrainWithEngineSchema = new mongoose.Schema({
  FID: { type: String, required: true, unique: true },
  TID: { type: String, required: true },
  EID: { type: String, required: true }
}, {
  collection: 'fullTrainWithEngine', // Correct collection name
  timestamps: true // Adds createdAt and updatedAt timestamps
});

/**
 * Model representing a train with an engine.
 * @typedef {Object} TrainWithEngine
 * @property {string} _id - Unique identifier for the TrainWithEngine document.
 * @property {string} FID - Full ID, which must be unique.
 * @property {string} TID - Train ID, associated with the train.
 * @property {string} EID - Engine ID, associated with the engine.
 * @property {string} createdAt - Timestamp when the document was created.
 * @property {string} updatedAt - Timestamp when the document was last updated.
 */

module.exports = mongoose.model('TrainWithEngine', TrainWithEngineSchema);
