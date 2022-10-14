const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const introduce = require('../controllers/introduce');

router.get('/recommend', catchAsync(introduce.recommend))

router.get('/greeting', introduce.greeting)

router.get('/show', introduce.show)

router.get('/direction', introduce.direction)

module.exports = router;