const PantryItem = require('../models/PantryItem');

exports.getSummary = async (req, res) => {
  const items = await PantryItem.find({ user: req.user._id });

  const summary = {
    totalItems: items.length,
    totalQuantity: 0,
    categories: {}
  };

  items.forEach(item => {
    summary.totalQuantity += item.quantity;

    if (!summary.categories[item.category]) {
      summary.categories[item.category] = 0;
    }
    summary.categories[item.category] += item.quantity;
  });

  res.json(summary);
};