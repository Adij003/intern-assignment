const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// @desc    Create a sub category
// @route   POST /api/categories
// @access  Private

const createSubCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params; 
    const { name, image, description, taxApplicability, tax } = req.body;
  
    if (!name || !categoryId) {
      res.status(400);
      throw new Error('Please include all required fields');
    }
  
    const subCategory = await SubCategory.create({
      name,
      image,
      description,
      taxApplicability,
      tax,
      categoryId,
    });
  
    res.status(201).json(subCategory);
  });

module.exports = {createSubCategory}

