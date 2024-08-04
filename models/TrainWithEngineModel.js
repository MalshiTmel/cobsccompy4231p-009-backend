const mongoose = require('mongoose');

const TrainWithEngineSchema = new mongoose.Schema({
  FID: { type: String, required: true, unique: true },
  TID: { type: String, required: true },
  EID: { type: String, required: true }
}, {
  collection: 'fullTrainWithEngine', // Correct collection name
  timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('TrainWithEngine', TrainWithEngineSchema);
