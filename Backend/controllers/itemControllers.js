const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

// @desc    Create a new item under a specific category (and optionally under a subcategory)
// @route   POST /api/categories/:categoryId/subcategories/:subcategoryId?/items
// @access  Private

const createItem = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.params;  // Subcategory ID is optional
  const { name, image, description, taxApplicability, tax, baseAmount, totalAmount, discount } = req.body;

  if (!name || !baseAmount || !categoryId) {
    res.status(400);
    throw new Error('Please provide all the required fields');
  }

  
  const item = await Item.create({
    name,
    image,
    description,
    taxApplicability,
    tax,
    baseAmount,
    discount,
    totalAmount: baseAmount - discount,
    category: categoryId,
    subcategory: subcategoryId || undefined, // If subcategoryId is not provided, it's set to undefined
  });

  res.status(201).json(item);
});

// @desc    Get all items under a specific category (and optionally under a subcategory)
// @route   GET /api/categories/:categoryId/subcategories/:subcategoryId?/items
// @access  Public
const getAllItems = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId } = req.params;

  const filter = { category: categoryId };
  if (subcategoryId) {
    filter.subcategory = subcategoryId;
  }

  const items = await Item.find(filter).populate('category subcategory');

  if (!items || items.length === 0) {
    res.status(404);
    throw new Error('No items found for this category and subcategory');
  }

  res.status(200).json(items);
});

 // @desc    Get all items for a specific category, irrespective of subcategory
// @route   GET /api/categories/:categoryId/items
// @access  Public
const getAllItemsOfOneCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;  // Retrieve categoryId from route parameter

  // Find items where the category matches the categoryId in the route
  const items = await Item.find({ category: categoryId }).populate('category');

  if (!items || items.length === 0) {
      res.status(404);
      throw new Error('No items found for this category');
  }

  res.status(200).json(items);
});

 // @desc   getItem by id
// @route   PUT /api/categories/:categoryId/subcategories/:subcategoryId?/items
// @access  private
const getItembyName = asyncHandler(async (req, res) => {
  const { name } = req.query;  // Subcategory ID is optional
  const item = await Item.find({
    name: { $regex: name, $options: 'i' }}).populate('category').populate('subcategory');

  if(!item){
    res.status(404)
    throw new Error('Item not found')
  }

  res.status(200).json(item)

});
 // @desc   dalate by id
// @route   PUT /api/categories/:categoryId/subcategories/:subcategoryId?/items/:id
// @access  private
const deleteItemById = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId, id } = req.params;  // Subcategory ID is optional
  const item = await Item.findById({_id: id})

  if(!item){
    res.status(404)
    throw new Error('Item not found')
  }

   await Item.deleteOne({ _id: id})
  res.status(200).json({ message: 'item deleted successfully' })

});

const updateItem = asyncHandler(async (req, res) => {
  const { categoryId, subcategoryId, id } = req.params;  // Subcategory ID is optional
  const { name, image, description, taxApplicability, tax, baseAmount, discount, totalAmount } = req.body;

  // Find the item by ID
  const item = await Item.findById(id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Update the item with new data
  item.name = name || item.name;
  item.image = image || item.image;
  item.description = description || item.description;
  item.taxApplicability = taxApplicability || item.taxApplicability;
  item.tax = tax || item.tax;
  item.baseAmount = baseAmount || item.baseAmount;
  item.discount = discount || item.discount;
  item.totalAmount = totalAmount || item.totalAmount;

  // Save the updated item
  const updatedItem = await item.save();

  res.status(200).json(updatedItem);
});


  

module.exports = {createItem, getAllItems, getAllItemsOfOneCategory, getItembyName, deleteItemById, updateItem}