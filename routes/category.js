const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin, validateWheel, validateReservation } = require('../middleware');
const category = require('../controllers/category');

router.route('/:id')
  .get(catchAsync(category.goToShow))
  .put(isAdmin, validateWheel, catchAsync(category.editWheel))
  .delete(isAdmin, catchAsync(category.deleteWheel))

router.get('/:id/edit', isAdmin, catchAsync(category.goToEdit))

router.route('/:id/reserve')
  .get(isLoggedIn, catchAsync(category.goToReserve))
  .post(isLoggedIn, validateReservation, catchAsync(category.reserveWheel))

module.exports = router;