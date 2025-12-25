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

exports.getItemById = async (req, res) => {
  const item = await PantryItem.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
};

exports.updateItem = async (req, res) => {
  const item = await PantryItem.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await PantryItem.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json({ message: 'Item deleted' });
};

exports.getExpiringItems = async (req, res) => {
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

  const items = await PantryItem.find({
    user: req.user._id,
    expirationDate: {
      $gte: today,
      $lte: threeDaysLater
    }
  }).sort({ expirationDate: 1 });

  res.json(items);
};

exports.searchItems = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const items = await PantryItem.find({
    user: req.user._id,
    name: { $regex: name, $options: 'i' }
  });

  res.json(items);
};

exports.getItemsByCategory = async (req, res) => {
  const { type } = req.params;

  const items = await PantryItem.find({
    user: req.user._id,
    category: type
  });

  res.json(items);
};