const express = require('express');
const { addItem, getItems } = require('../controllers/pantryController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, addItem);
router.get('/', protect, getItems);

module.exports = router;