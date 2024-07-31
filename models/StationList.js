const mongoose = require('mongoose');

const stationListSchema = new mongoose.Schema({
  line_name: { type: String, required: true },
  stations_list: [String] // Array of station names
});

module.exports = mongoose.model('StationList', stationListSchema);
