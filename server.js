const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Connect to MongoDB
const dbUri = 'mongodb+srv://MalshiTmel:bruiCE1228@railwayapplication.hb6cxx3.mongodb.net/RailwayDB?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/train-engines', require('./routes/TrainEngineRoute'));
app.use('/api/train-routes', require('./routes/TrainRouteRoute'));
app.use('/api/train-with-engines', require('./routes/TrainWithEngineRoute'));
app.use('/api/trains-without-engines', require('./routes/TrainWithoutEngineRoute'));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
