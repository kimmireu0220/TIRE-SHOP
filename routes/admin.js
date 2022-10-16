const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const catchAsync = require('../utils/catchAsync');
const { isAdmin, validateWheel } = require('../middleware');
const admin = require('../controllers/admin');

router.route('/register_wheel')
  .get(isAdmin, admin.goToRegisterWheel)
  .post(isAdmin, upload.single('image'), validateWheel, catchAsync(admin.registerWheel))

router.get('/reservations', isAdmin, catchAsync(admin.goToReservationList))

router.delete('/reservations/:reservationId', catchAsync(admin.deleteReservation))

module.exports = router;