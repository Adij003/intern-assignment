const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema(
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

module.exports = mongoose.model('SubCategory', subCategorySchema);
