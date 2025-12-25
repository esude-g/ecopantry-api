const express = require('express');
const {
  addToShoppingList,
  getShoppingList,
  removeFromShoppingList
} = require('../controllers/shoppingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, addToShoppingList);
router.get('/', protect, getShoppingList);
router.delete('/:id', protect, removeFromShoppingList);

module.exports = router;