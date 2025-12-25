const ShoppingItem = require('../models/ShoppingItem');

exports.addToShoppingList = async (req, res) => {
  try {
    const item = await ShoppingItem.create({
      user: req.user._id,
      ...req.body
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getShoppingList = async (req, res) => {
  const items = await ShoppingItem.find({ user: req.user._id });
  res.json(items);
};

exports.removeFromShoppingList = async (req, res) => {
  const item = await ShoppingItem.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json({ message: 'Item removed from shopping list' });
};