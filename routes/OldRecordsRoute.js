const express = require('express');
const router = express.Router();
const OldRecordsController = require('../controllers/OldRecordsController');

/**
 * @swagger
 * tags:
 *   name: OldRecords
 *   description: API endpoints for managing old records.
 */

/**
 * @swagger
 * /old-records:
 *   get:
 *     summary: Retrieve all old records
 *     tags: [OldRecords]
 *     responses:
 *       200:
 *         description: A list of old records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OldRecords'
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
router.get('/', OldRecordsController.getAllOldRecords);

module.exports = router;
