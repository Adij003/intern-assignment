const asyncHandler = require('express-async-handler');
const SubCategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');





// @desc    Create a sub category
// @route   POST /api/categories/:categoryId/subcategories
// @access  Private

const createSubCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params; 
    const { name, image, description, taxApplicability, tax } = req.body;
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
        res.status(404);
        throw new Error('Category not found');
      }
    if (!name || !categoryId) {
      res.status(400);
      throw new Error('Please include all required fields');
    }
  
    const subCategory = await SubCategory.create({
        name,
        image,
        description,
        taxApplicability: taxApplicability ?? categoryExists.taxApplicability, // Default to category taxApplicability
        tax: tax ?? categoryExists.tax, // Default to category tax
        category: categoryId, // Link the subcategory to the category
      });
    
      res.status(201).json(subCategory);
  });

    // @desc    get all sub category for a particular category
    // @route   GET /api/categories/:categoryId/subcategories
    // @access  Public

    const getAllSubCategories = asyncHandler(async (req, res) => {
        const { categoryId } = req.params; 
        
        
        const subCategories = await SubCategory.find({ category: categoryId });
    
        if (!subCategories || subCategories.length === 0) {
            res.status(404);
            throw new Error('No subcategories found for this category');
        }
    
        res.status(200).json(subCategories);
    });

      // @desc    get all sub category for a particular category
    // @route   GET /api/categories/:categoryId/subcategories
    // @access  Public

    const getSubCategoryById = asyncHandler(async (req, res) => {
        const { categoryId, id } = req.params; 
        
        
       const subCategory = await SubCategory.findById({_id: id, categoryId});
         
           if (!subCategory) {
             res.status(404);
             throw new Error('SubCategory not found');
           }
         
           
           res.status(200).json(subCategory);
    });

    // @desc    Update subcategory by ID under a specific category
    // @route   PUT /api/categories/:categoryId/subcategories/:id
    // @access  Private
    const updateSubCategory = asyncHandler(async (req, res) => {
        const { categoryId, id } = req.params;
        const { name, image, description, taxApplicability, tax } = req.body;
    
        const subCategory = await SubCategory.findOneAndUpdate(
        { _id: id, category: categoryId }, 
        {
            name,
            image,
            description,
            taxApplicability,
            tax,
        },
        { new: true } 
        );
    
        if (!subCategory) {
        res.status(404);
        throw new Error('Subcategory not found');
        }
    
        res.status(200).json(subCategory);
  });

    const deleteSubCategory = asyncHandler(async (req, res) => {
        const { categoryId, id } = req.params;
      
        const subCategory = await SubCategory.findOne({ _id: id,category: categoryId  });
      
        if (!subCategory) {
          res.status(404);
          throw new Error('Subcategory not found');
        }
        await SubCategory.deleteOne({ _id: id, category: categoryId })
        res.status(200).json({ message: 'Subcategory deleted successfully' })
      });

module.exports = {createSubCategory, getAllSubCategories, getSubCategoryById , updateSubCategory, deleteSubCategory}