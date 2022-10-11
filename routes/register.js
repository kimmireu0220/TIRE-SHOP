const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isAdmin, validateWheel } = require('../middleware');
const register = require('../controllers/register');

router.route('/wheels')
  .get(isAdmin, register.index)
  .post(isAdmin, validateWheel, catchAsync(register.wheel))

module.exports = router;