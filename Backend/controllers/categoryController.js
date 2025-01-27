const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// @desc    Create a category
// @route   POST /api/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  const { name, image, description, taxApplicability, tax, taxType } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Name is required');
  }

  const category = await Category.create({
    name,
    image,
    description,
    taxApplicability,
    tax,
    taxType,
  });

  res.status(201).json(category);
});

// @desc    get all categories
// @route   GET /api/categories
// @access  public
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find(); 
    res.status(200).json(categories); 
  });

// @desc    get category by id
// @route   GET /api/categories/:id
// @access  Public
// @desc    Get a category by name or ID along with its attributes
// @route   GET /api/categories/search
// @access  Public
const getCategoryByNameOrId = asyncHandler(async (req, res) => {
  const { id, name } = req.query; 

  let category;

  if (id) {
    category = await Category.findById(id);
  } else if (name) {
    category = await Category.findOne({ name: new RegExp(`^${name}$`, 'i') }); 
  }

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json(category);
});


    // @desc    update category by id
    // @route   PUT /api/categories/:id
    // @access  Private
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, image, description, taxApplicability, tax, taxType } = req.body;
  
    
    const category = await Category.findByIdAndUpdate(
      id, 
      { name, image, description, taxApplicability, tax, taxType },
      { new: true } 
    );
  
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
  
    
    res.status(200).json(category);
  });

// @desc    delete cat by id
// @route   DELETE /api/categories/:id
// @access  private
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    
    const category = await Category.findByIdAndDelete(id)
  
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
      
    res.status(200).json({ message: 'Category deleted :/' })
  });

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByNameOrId,
  updateCategory,
  deleteCategory
};
