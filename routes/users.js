const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
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

router.post('/logout', isLoggedIn, users.logout)

module.exports = router;    