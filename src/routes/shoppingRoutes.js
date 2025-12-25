const express = require('express');
const {
  addToShoppingList,
  getShoppingList,
  removeFromShoppingList
} = require('../controllers/shoppingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shopping List
 *   description: Shopping list management
 */

/**
 * @swagger
 * /api/shopping-list:
 *   post:
 *     summary: Add item to shopping list
 *     tags: [Shopping List]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Eggs
 *               quantity:
 *                 type: number
 *                 example: 12
 *     responses:
 *       201:
 *         description: Item added to shopping list
 * 
 *   get:
 *     summary: Get shopping list
 *     tags: [Shopping List]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shopping list items
 */
router.post('/', protect, addToShoppingList);
router.get('/', protect, getShoppingList);

/**
 * @swagger
 * /api/shopping-list/{id}:
 *   delete:
 *     summary: Remove item from shopping list
 *     tags: [Shopping List]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Item not found
 */
router.delete('/:id', protect, removeFromShoppingList);

module.exports = router;