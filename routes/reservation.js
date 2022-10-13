const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin } = require('../middleware');
const reservation = require('../controllers/reservation')

router.get('/', isAdmin, catchAsync(reservation.index))

router.delete('/:id', isLoggedIn, catchAsync(reservation.delete))

module.exports = router;