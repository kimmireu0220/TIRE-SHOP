const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const users = require('../controllers/users');

router.route('/edit')
  .get(isLoggedIn, users.goToEditUser)
  .post(isLoggedIn, catchAsync(users.editUser))

router.get('/myReservations', isLoggedIn, catchAsync(users.goToMyReservations))

router.route('/register')
  .get(users.goToRegister)
  .post(catchAsync(users.registerUser))

router.route('/login')
  .get(users.goToLogin)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.post('/logout', isLoggedIn, users.logout)

module.exports = router;    