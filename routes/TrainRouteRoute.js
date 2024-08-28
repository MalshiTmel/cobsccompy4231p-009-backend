const express = require('express');
const router = express.Router();
const routeController = require('../controllers/TrainRouteController');

/**
 * @swagger
 * tags:
 *   name: TrainRoutes
 *   description: API endpoints for managing train routes.
 */

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new train route
 *     tags: [TrainRoutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainRoute'
 *     responses:
 *       201:
 *         description: Train route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainRoute'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/', routeController.createRoute);

/**
 * @swagger
 * /routes/{route_id}:
 *   put:
 *     summary: Update an existing train route
 *     tags: [TrainRoutes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the route to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainRoute'
 *     responses:
 *       200:
 *         description: Train route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainRoute'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Train route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.put('/:route_id', routeController.updateRoute);

/**
 * @swagger
 * /routes/{route_id}:
 *   delete:
 *     summary: Delete a train route
 *     tags: [TrainRoutes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the route to delete
 *     responses:
 *       200:
 *         description: Train route deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Train route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.delete('/:route_id', routeController.deleteRoute);

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Retrieve all train routes
 *     tags: [TrainRoutes]
 *     responses:
 *       200:
 *         description: A list of train routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainRoute'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', routeController.getAllRoutes);

/**
 * @swagger
 * /routes/{route_id}:
 *   get:
 *     summary: Retrieve a specific train route by ID
 *     tags: [TrainRoutes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the route to retrieve
 *     responses:
 *       200:
 *         description: A specific train route
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainRoute'
 *       404:
 *         description: Train route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/:route_id', routeController.getRouteById);

module.exports = router;
