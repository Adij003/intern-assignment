const express = require('express');
const router = express.Router();

const {createSubCategory, getAllSubCategories, getSubCategoryByNameOrId, updateSubCategory, deleteSubCategory} = require('../controllers/subCategoryController')
const {protect} = require('../middleware/authMiddleware')

router.post('/:categoryId/subcategories', protect, createSubCategory)

router.get('/:categoryId/subcategories', getAllSubCategories)

router.get('/:categoryId/subcategories/search', getSubCategoryByNameOrId)
router.put('/:categoryId/subcategories/:id', protect, updateSubCategory)
router.delete('/:categoryId/subcategories/:id', protect, deleteSubCategory)




module.exports = router

