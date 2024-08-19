const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainRoute:
 *       type: object
 *       required:
 *         - RID
 *         - Rname
 *         - Start
 *         - End
 *         - Distance
 *         - Duration
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the train route document.
 *         RID:
 *           type: string
 *           description: Route ID, which must be unique.
 *         Rname:
 *           type: string
 *           description: Name of the route.
 *         Start:
 *           type: string
 *           description: Starting station of the route.
 *         End:
 *           type: string
 *           description: Ending station of the route.
 *         Distance:
 *           type: number
 *           description: Distance of the route in kilometers.
 *         Duration:
 *           type: number
 *           description: Duration of the route in minutes.
 */

const trainRouteSchema = new mongoose.Schema({
  RID: { type: String, required: true, unique: true },
  Rname: { type: String, required: true },
  Start: { type: String, required: true },
  End: { type: String, required: true },
  Distance: { type: Number, required: true },
  Duration: { type: Number, required: true }
}, { collection: 'trainRoutes' });

/**
 * Model representing a train route.
 * @typedef {Object} TrainRoute
 * @property {string} _id - Unique identifier for the train route document.
 * @property {string} RID - Route ID, which must be unique.
 * @property {string} Rname - Name of the route.
 * @property {string} Start - Starting station of the route.
 * @property {string} End - Ending station of the route.
 * @property {number} Distance - Distance of the route in kilometers.
 * @property {number} Duration - Duration of the route in minutes.
 */

module.exports = mongoose.model('TrainRoute', trainRouteSchema);
