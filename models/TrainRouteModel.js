const mongoose = require('mongoose');

const trainRouteSchema = new mongoose.Schema({
  RID: { type: String, required: true, unique: true },
  Rname: { type: String, required: true },
  Start: { type: String, required: true },
  End: { type: String, required: true },
  Distance: { type: Number, required: true },
  Duration: { type: Number, required: true }
}, { collection: 'trainRoutes' });

module.exports = mongoose.model('TrainRoute', trainRouteSchema);
