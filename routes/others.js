const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const others = require('../controllers/others');

router.get('/', catchAsync(others.index))

module.exports = router;