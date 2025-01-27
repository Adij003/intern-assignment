const express = require('express');
const router = express.Router();
const {
    createItem,
  getAllItems,
  getAllItemsOfOneCategory,
  getItembyName,
  deleteItemById,
  updateItem
//   getAllCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
} = require('../controllers/itemControllers');
const { protect } = require('../middleware/authMiddleware');

router.post('/:categoryId/subcategories/:subcategoryId?/items', protect, createItem);
router.get('/:categoryId/subcategories/:subcategoryId?/items',  getAllItems);
router.get('/:categoryId/items',  getAllItemsOfOneCategory);
router.get('/:categoryId/subcategories/:subcategoryId?/items/search',  getItembyName);
router.delete('/:categoryId/subcategories/:subcategoryId?/items/:id',  deleteItemById);
router.put('/:categoryId/subcategories/:subcategoryId?/items/:id',  updateItem);




module.exports = router;
