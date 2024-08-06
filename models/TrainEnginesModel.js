const mongoose = require('mongoose');

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

module.exports = mongoose.model('TrainEngine', trainEngineSchema);