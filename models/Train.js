const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_name: { type: String, required: true },
  route_name: { type: String, required: true },
  status: { type: String, default: 'Scheduled' },
  start_time: { type: Date, default: null },
  current_location: { type: String, default: null },
  next_stop: { type: String, default: null },
  estimated_end_time: { type: Date, default: null }
});

module.exports = mongoose.model('Train', trainSchema);
