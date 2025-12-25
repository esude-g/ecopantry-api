const PantryItem = require('../models/PantryItem');

exports.addItem = async (req, res) => {
  try {
    const item = await PantryItem.create({
      user: req.user._id,
      ...req.body
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  const items = await PantryItem.find({ user: req.user._id });
  res.json(items);
};