const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createCategory).get(getAllCategories)
router.route('/:id').get(getCategoryById).put(protect, updateCategory).delete(protect, deleteCategory)

module.exports = router;
