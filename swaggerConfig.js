// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Train Tracking System API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Train Tracking System',
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Local Development Server',
    },
  ],
  components: {
    schemas: {
      OldRecords: {
        type: 'object',
        required: ['EID', 'currentIndex', 'direction', 'startTime', 'lastStationUpdate'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier of the old record.',
          },
          EID: {
            type: 'string',
            description: 'Engine ID.',
          },
          currentIndex: {
            type: 'integer',
            description: 'Current index of the train in its journey.',
          },
          direction: {
            type: 'string',
            description: 'Direction of the train\'s movement.',
          },
          startTime: {
            type: 'string',
            format: 'date-time',
            description: 'Start time of the train\'s journey.',
          },
          lastStationUpdate: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp for the station.',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the record was created.',
          },
        },
      },
      TrainEngine: {
        type: 'object',
        required: ['EID', 'EngNum', 'Capacity', 'YOM', 'EngType'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the train engine document.',
          },
          EID: {
            type: 'string',
            description: 'Engine ID, which must be unique.',
          },
          EngNum: {
            type: 'string',
            description: 'Engine number.',
          },
          Capacity: {
            type: 'string',
            description: 'Capacity of the engine (e.g., in tons).',
          },
          YOM: {
            type: 'integer',
            description: 'Year of manufacture of the engine.',
          },
          EngType: {
            type: 'string',
            enum: ['Diesel', 'Electric'],
            description: 'Type of the engine (e.g., Diesel, Electric).',
          },
        },
      },
      TrainRoute: {
        type: 'object',
        required: ['RID', 'Rname', 'Start', 'End', 'Distance', 'Duration'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the train route document.',
          },
          RID: {
            type: 'string',
            description: 'Route ID, which must be unique.',
          },
          Rname: {
            type: 'string',
            description: 'Name of the route.',
          },
          Start: {
            type: 'string',
            description: 'Starting station of the route.',
          },
          End: {
            type: 'string',
            description: 'Ending station of the route.',
          },
          Distance: {
            type: 'number',
            description: 'Distance of the route in kilometers.',
          },
          Duration: {
            type: 'number',
            description: 'Duration of the route in minutes.',
          },
        },
      },
      TrainWithEngine: {
        type: 'object',
        required: ['FID', 'TID', 'EID'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the TrainWithEngine document.',
          },
          FID: {
            type: 'string',
            description: 'Full ID, which must be unique.',
          },
          TID: {
            type: 'string',
            description: 'Train ID, associated with the train.',
          },
          EID: {
            type: 'string',
            description: 'Engine ID, associated with the engine.',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the document was created.',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the document was last updated.',
          },
        },
      },
      TrainWithoutEngine: {
        type: 'object',
        required: ['TID', 'TName', 'RID', 'Stops'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the TrainWithoutEngine document.',
          },
          TID: {
            type: 'string',
            description: 'Train ID, which must be unique.',
          },
          TName: {
            type: 'string',
            description: 'Name of the train.',
          },
          RID: {
            type: 'string',
            description: 'Route ID, associated with the route.',
          },
          Stops: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'List of stops for the train route.',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the document was created.',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the document was last updated.',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Paths to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
