const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const register = require('../controllers/register');

router.route('/wheels')
  .get(register.index)
  .post(catchAsync(register.wheel))

module.exports = router;