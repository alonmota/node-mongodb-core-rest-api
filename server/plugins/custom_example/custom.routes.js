const express = require('express');
const ctrl = require('./custom.controller');
const validate = require('express-validation');
const paramValidation = require('./custom.validation');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /custom/greeting - Greet someone */
router.get('/custom/greeting', validate(paramValidation.greeting), ctrl.getGreet);

module.exports = router;
