const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
const port = process.env.PORT || 3001; // Use port 3001 to avoid conflicts

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://MalshiTmel:bruiCE1228@railwayapplication.hb6cxx3.mongodb.net/RailwayApplicationDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Models
const Train = mongoose.model('Train', new mongoose.Schema({
  train: String,
  route: String,
  status: String,
  starttime: Date,
  endtime: Date,
  currentlocation: String,
  nextstop: String
}));

const RouteMap = mongoose.model('RouteMap', new mongoose.Schema({
  route: String,
  stations: [String]
}), 'routesmap');  // Specify the exact collection name here

// Routes
const trainRoutes = express.Router();
const routeMapRoutes = express.Router();

// Train routes
trainRoutes.get('/', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    console.error('Error fetching trains:', err);
    res.status(500).json({ message: err.message });
  }
});

// RouteMap routes
routeMapRoutes.get('/', async (req, res) => {
  try {
    const routesmap = await RouteMap.find();
    console.log('Fetched RoutesMap:', routesmap);  // Log the fetched data
    if (routesmap.length === 0) {
      console.log('No data found in RouteMap collection.');
    }
    res.json(routesmap);
  } catch (err) {
    console.error('Error fetching routesmap:', err);
    res.status(500).json({ message: err.message });
  }
});

// Use routes
app.use('/api/trains', trainRoutes);
app.use('/api/routesmap', routeMapRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Railway Tracking System API');
});

// Listen on the port
app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});