const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const kia = require('../controllers/kia');

router.get('/', catchAsync(kia.index))

module.exports = router;