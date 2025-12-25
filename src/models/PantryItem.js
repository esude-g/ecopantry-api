const mongoose = require('mongoose');

const pantryItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    category: {
      type: String,
      default: 'Other'
    },
    expirationDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PantryItem', pantryItemSchema);