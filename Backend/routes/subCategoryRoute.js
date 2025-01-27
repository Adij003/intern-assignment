const express = require('express');
const router = express.Router();

const {createSubCategory} = require('../controllers/subCategoryController')
const {protect} = require('../middleware/authMiddleware')

router.post('/:categoryId/subcategories', createSubCategory)

module.exports = router

