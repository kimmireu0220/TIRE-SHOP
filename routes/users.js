const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, currentPage } = require('../middleware');
const users = require('../controllers/users');

router.route('/edit_user')
  .get(isLoggedIn, users.goToEdit)
  .post(isLoggedIn, catchAsync(users.edit))

router.get('/my_reservations', isLoggedIn, catchAsync(users.goToMyReservations))

router.route('/register_user')
  .get(users.goToRegister)
  .post(catchAsync(users.register))

router.route('/login')
  .get(users.goToLogin)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.route('/logout')
  .get(isLoggedIn, users.logout)
  .post(isLoggedIn, users.logout)

module.exports = router;    