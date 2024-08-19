const TrainRoute = require('../models/TrainRouteModel');

/**
 * @swagger
 * tags:
 *   name: TrainRoutes
 *   description: API endpoints for managing train routes.
 */

/**
 * @swagger
 * /api/train-routes:
 *   post:
 *     summary: Create a new train route
 *     description: Adds a new train route to the database.
 *     tags: [TrainRoutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RID:
 *                 type: string
 *                 description: The route ID.
 *               route_name:
 *                 type: string
 *                 description: The name of the route.
 *               [additionalProperties]:
 *                 type: string
 *                 description: Other properties of the train route.
 *     responses:
 *       201:
 *         description: Train route successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the route.
 *                 RID:
 *                   type: string
 *                   description: The route ID.
 *                 route_name:
 *                   type: string
 *                   description: The name of the route.
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the train route.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-routes/{route_id}:
 *   put:
 *     summary: Update a train route
 *     description: Updates an existing train route by its ID.
 *     tags: [TrainRoutes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: The route ID of the train route to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_name:
 *                 type: string
 *                 description: The name of the route.
 *               [additionalProperties]:
 *                 type: string
 *                 description: Other properties to update.
 *     responses:
 *       200:
 *         description: Train route successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the route.
 *                 RID:
 *                   type: string
 *                   description: The route ID.
 *                 route_name:
 *                   type: string
 *                   description: The name of the route.
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other updated properties of the train route.
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-routes/{route_id}:
 *   delete:
 *     summary: Delete a train route
 *     description: Deletes a train route by its ID.
 *     tags: [TrainRoutes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: The route ID of the train route to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train route successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-routes:
 *   get:
 *     summary: Retrieve all train routes
 *     description: Fetches all train routes from the database.
 *     tags: [TrainRoutes]
 *     responses:
 *       200:
 *         description: A list of train routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the route.
 *                   RID:
 *                     type: string
 *                     description: The route ID.
 *                   route_name:
 *                     type: string
 *                     description: The name of the route.
 *                   [additionalProperties]:
 *                     type: string
 *                     description: Other properties of the train route.
 *       404:
 *         description: No routes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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

/**
 * @swagger
 * /api/train-routes/{route_id}:
 *   get:
 *     summary: Retrieve a train route by ID
 *     description: Fetches a train route from the database by its ID.
 *     tags: [TrainRoutes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: The route ID of the train route to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested train route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the route.
 *                 RID:
 *                   type: string
 *                   description: The route ID.
 *                 route_name:
 *                   type: string
 *                   description: The name of the route.
 *                 [additionalProperties]:
 *                   type: string
 *                   description: Other properties of the train route.
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
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
