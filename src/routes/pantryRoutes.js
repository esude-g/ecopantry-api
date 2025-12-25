const express = require('express');
const {
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    getExpiringItems,
    searchItems,
    getItemsByCategory
} = require('../controllers/pantryController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pantry
 *   description: Pantry management
 */

/**
 * @swagger
 * /api/pantry:
 *   post:
 *     summary: Add a new pantry item
 *     tags: [Pantry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Milk
 *               quantity:
 *                 type: number
 *                 example: 2
 *               category:
 *                 type: string
 *                 example: Dairy
 *               expirationDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Item added successfully
 *   get:
 *     summary: Get all pantry items
 *     tags: [Pantry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pantry items
 */
router.route('/')
  .post(protect, addItem)
  .get(protect, getItems);

  /**
 * @swagger
 * /api/pantry/expiring:
 *   get:
 *     summary: Get items expiring soon
 *     tags: [Pantry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expiring items
 */
router.get('/expiring', protect, getExpiringItems);

/**
 * @swagger
 * /api/pantry/search:
 *   get:
 *     summary: Search pantry items by name
 *     tags: [Pantry]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/search', protect, searchItems);

/**
 * @swagger
 * /api/pantry/category/{type}:
 *   get:
 *     summary: Filter pantry items by category
 *     tags: [Pantry]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *     responses:
 *       200:
 *         description: Category items
 */
router.get('/category/:type', protect, getItemsByCategory);

/**
 * @swagger
 * /api/pantry/{id}:
 *   get:
 *     summary: Get pantry item by ID
 *     tags: [Pantry]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item found
 *       404:
 *         description: Item not found
 *
 *   put:
 *     summary: Update pantry item
 *     tags: [Pantry]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Item updated
 *
 *   delete:
 *     summary: Delete pantry item
 *     tags: [Pantry]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Item deleted
 */
router.route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;