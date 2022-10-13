const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin, validateWheel, validateReservation } = require('../middleware');
const wheel = require('../controllers/wheel');

router.route('/:id')
  .get(catchAsync(wheel.goToShow))
  .put(isAdmin, validateWheel, catchAsync(wheel.edit))
  .delete(isAdmin, catchAsync(wheel.delete))

router.get('/:id/edit', isAdmin, catchAsync(wheel.goToEdit))

router.route('/:id/reserve')
  .get(isLoggedIn, catchAsync(wheel.goToReserve))
  .post(isLoggedIn, validateReservation, catchAsync(wheel.reserve))

router.delete('/:id/reservations/:reservationId', isLoggedIn, catchAsync(wheel.deleteReservation))

module.exports = router;