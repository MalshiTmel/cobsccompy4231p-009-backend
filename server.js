const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Update to match your actual file path

const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Swagger UI route for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
const dbUri = 'mongodb+srv://MalshiTmel:bruiCE1228@railwayapplication.hb6cxx3.mongodb.net/RailwayDB?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/train-engines', require('./routes/TrainEngineRoute')); // Route for train engines
app.use('/api/train-routes', require('./routes/TrainRouteRoute')); // Route for train routes
app.use('/api/train-with-engines', require('./routes/TrainWithEngineRoute')); // Route for trains with engines
app.use('/api/trains-without-engines', require('./routes/TrainWithoutEngineRoute')); // Route for trains without engines
app.use('/api/old-records', require('./routes/OldRecordsRoute')); // Route for old records

// Server start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
