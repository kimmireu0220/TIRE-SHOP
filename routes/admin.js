const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isAdmin, validateWheel } = require('../middleware');
const admin = require('../controllers/admin');

router.route('/register_wheel')
  .get(isAdmin, admin.goToRegisterWheel)
  .post(isAdmin, validateWheel, catchAsync(admin.registerWheel))

router.get('/reservations', isAdmin, catchAsync(admin.goToReservationList))

module.exports = router;