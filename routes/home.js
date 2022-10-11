const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const home = require('../controllers/home');

router.get('/', catchAsync(home.index))

router.get('/greeting', home.greeting)

router.get('/show', home.show)

router.get('/navigation', home.direction)

module.exports = router;