const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const bmw = require('../controllers/bmw');

router.get('/', catchAsync(bmw.index))

module.exports = router;