const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
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
    taxType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
