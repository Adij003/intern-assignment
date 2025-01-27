const express = require('express');
const router = express.Router();
const {
    createItem
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
} = require('../controllers/itemControllers');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createItem)
// .get(getAllCategories)
// router.route('/:id').get(getCategoryById).put(protect, updateCategory).delete(protect, deleteCategory)

module.exports = router;
