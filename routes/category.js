const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin } = require('../middleware');
const category = require('../controllers/category');

router.route('/:id')
  .get(catchAsync(category.goToShow))
  .put(isAdmin, catchAsync(category.editWheel))
  .delete(isAdmin, catchAsync(category.deleteWheel))

router.get('/:id/edit', isAdmin, catchAsync(category.goToEdit))

router.get('/:id/reserve', isLoggedIn, catchAsync(category.goToReserve))

module.exports = router;