const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const importedothers = require('../controllers/importedothers');

router.get('/', catchAsync(importedothers.index))

module.exports = router;