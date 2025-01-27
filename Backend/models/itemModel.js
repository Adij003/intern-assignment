const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    taxApplicability: {
      type: Boolean,
      default: false,
    },
    tax: {
      type: Number,
      default: 0,
    },
    baseAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
