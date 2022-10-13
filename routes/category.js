const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const category = require('../controllers/category');

router.get('/hyundai', catchAsync(category.hyundai))
router.get('/kia', catchAsync(category.kia))
router.get('/others', catchAsync(category.others))
router.get('/bmw', catchAsync(category.bmw))
router.get('/benz', catchAsync(category.benz))
router.get('/importedothers', catchAsync(category.importedothers))

module.exports = router;