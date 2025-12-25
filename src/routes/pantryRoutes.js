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

router.route('/')
  .post(protect, addItem)
  .get(protect, getItems);

router.get('/expiring', protect, getExpiringItems);

router.get('/search', protect, searchItems);
router.get('/category/:type', protect, getItemsByCategory);

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;