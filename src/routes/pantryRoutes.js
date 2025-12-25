const express = require('express');
const {
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
} = require('../controllers/pantryController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addItem)
  .get(protect, getItems);

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;