const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryByNameOrId,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

// Routes for creating a category and fetching all categories
router.route('/').post(protect, createCategory).get(getAllCategories);

// Route for updating and deleting a category by ID
router.route('/:id').put(protect, updateCategory).delete(protect, deleteCategory);

// Route for getting a category by name or ID
router.route('/search').get(getCategoryByNameOrId);

module.exports = router;
