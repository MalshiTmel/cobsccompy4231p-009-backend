const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
  trainName: String,
  route: String,
  startTime: Date,
  estimatedEndTime: Date,
  currentLocation: String,
  nextStop: String,
  status: String
});

module.exports = mongoose.model('Train', TrainSchema);