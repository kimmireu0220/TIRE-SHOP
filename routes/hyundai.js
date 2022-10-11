const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const hyundai = require('../controllers/hyundai');

router.get('/', catchAsync(hyundai.index))

module.exports = router;