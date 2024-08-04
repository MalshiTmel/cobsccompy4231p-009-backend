const express = require('express');
const router = express.Router();
const routeController = require('../controllers/TrainRouteController');

// Route to create a new route
router.post('/', routeController.createRoute);

// Route to update an existing route
router.put('/:route_id', routeController.updateRoute);

// Route to delete a route
router.delete('/:route_id', routeController.deleteRoute);

// Route to get all routes
router.get('/', routeController.getAllRoutes);

// Route to get a route by ID
router.get('/:route_id', routeController.getRouteById);

module.exports = router;
