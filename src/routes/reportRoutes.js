const express = require('express');
const { getSummary } = require('../controllers/reportController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Analytics endpoints
 */

/**
 * @swagger
 * /api/reports/summary:
 *   get:
 *     summary: Get pantry summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pantry analytics summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: number
 *                   example: 3
 *                 totalQuantity:
 *                   type: number
 *                   example: 6
 *                 categories:
 *                   type: object
 *                   example:
 *                     Dairy: 5
 *                     Vegetable: 1
 */
router.get('/summary', protect, getSummary);

module.exports = router;