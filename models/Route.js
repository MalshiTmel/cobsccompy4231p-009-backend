const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  name: String,
  stations: [String]
});

module.exports = mongoose.model('Route', RouteSchema);