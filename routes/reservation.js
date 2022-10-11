const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin } = require('../middleware');
const reservation = require('../controllers/reservation')

router.route('/')
  .get(isAdmin, catchAsync(reservation.index))
  .post(isLoggedIn, catchAsync(reservation.wheel))

router.delete('/:id', isAdmin, catchAsync(reservation.delete))

module.exports = router;