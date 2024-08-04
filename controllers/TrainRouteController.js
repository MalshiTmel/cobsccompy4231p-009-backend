const TrainRoute = require('../models/TrainRouteModel');

// Create Route
exports.createRoute = async (req, res) => {
  try {
    const routeData = req.body;
    const route = await TrainRoute.create(routeData);
    res.status(201).json(route);
  } catch (err) {
    console.error('Failed to create route:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Update Route
exports.updateRoute = async (req, res) => {
  const { route_id } = req.params; // This is the RID
  try {
    const updatedRoute = await TrainRoute.findOneAndUpdate(
      { RID: route_id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRoute) {
      console.warn('Route with RID not found for update:', route_id);
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(updatedRoute);
  } catch (err) {
    console.error('Failed to update route:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Delete Route
exports.deleteRoute = async (req, res) => {
  const { route_id } = req.params; // This is the RID
  try {
    const result = await TrainRoute.deleteOne({ RID: route_id });
    if (result.deletedCount === 0) {
      console.warn('Route with RID not found for deletion:', route_id);
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json({ message: 'Route successfully deleted' });
  } catch (err) {
    console.error('Failed to delete route:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get All Routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await TrainRoute.find();
    if (routes.length === 0) {
      console.warn('No routes available in the database');
      return res.status(404).json({ error: 'No routes found' });
    }
    res.json(routes);
  } catch (err) {
    console.error('Failed to fetch routes:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get Route by ID
exports.getRouteById = async (req, res) => {
  const { route_id } = req.params; // This is the RID
  try {
    const route = await TrainRoute.findOne({ RID: route_id });
    if (!route) {
      console.warn('Route with RID not found:', route_id);
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (err) {
    console.error('Failed to fetch route by ID:', err.message);
    res.status(400).json({ error: err.message });
  }
};
