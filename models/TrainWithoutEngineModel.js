const mongoose = require('mongoose');

const trainWithoutEngineSchema = new mongoose.Schema({
  TID: { type: String, required: true, unique: true },
  TName: { type: String, required: true },
  RID: { type: String, required: true },
  Stops: [{ type: String, required: true }]
}, { collection: 'trainsWithoutEngines' });

module.exports = mongoose.model('TrainWithoutEngine', trainWithoutEngineSchema);