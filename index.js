const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://MalshiTmel:bruiCE1228@railwayapplication.hb6cxx3.mongodb.net/RailwayDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Import routes
const stationRoutes = require('./routes/stations');
const trainRoutes = require('./routes/trains');

// Use routes
app.use('/api/stations', stationRoutes);
app.use('/api/trains', trainRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Train Tracking System!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
