const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainEngine:
 *       type: object
 *       required:
 *         - EID
 *         - EngNum
 *         - Capacity
 *         - YOM
 *         - EngType
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the train engine document.
 *         EID:
 *           type: string
 *           description: Engine ID, which must be unique.
 *         EngNum:
 *           type: string
 *           description: Engine number.
 *         Capacity:
 *           type: string
 *           description: Capacity of the engine (e.g., in tons).
 *         YOM:
 *           type: integer
 *           description: Year of manufacture of the engine.
 *         EngType:
 *           type: string
 *           description: Type of the engine (e.g., Diesel, Electric).
 *           enum:
 *             - Diesel
 *             - Electric
 */

const trainEngineSchema = new mongoose.Schema({
  EID: { type: String, required: true, unique: true },
  EngNum: { type: String, required: true },
  Capacity: { type: String, required: true },
  YOM: { type: Number, required: true },
  EngType: {
    type: String,
    enum: ['Diesel', 'Electric'],
    required: true
  }
}, { collection: 'TrainEngines' }); // Explicitly specify the collection name

/**
 * Model representing a train engine.
 * @typedef {Object} TrainEngine
 * @property {string} _id - Unique identifier for the train engine document.
 * @property {string} EID - Engine ID, which must be unique.
 * @property {string} EngNum - Engine number.
 * @property {string} Capacity - Capacity of the engine (e.g., in tons).
 * @property {number} YOM - Year of manufacture of the engine.
 * @property {string} EngType - Type of the engine (e.g., Diesel, Electric).
 */

module.exports = mongoose.model('TrainEngine', trainEngineSchema);
