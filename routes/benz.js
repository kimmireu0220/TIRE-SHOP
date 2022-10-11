const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const benz = require('../controllers/benz');

router.get('/', catchAsync(benz.index))

module.exports = router;