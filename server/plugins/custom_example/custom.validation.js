const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {

  // GET /custom/greeting
  greeting: {
    params: {},
    query: {
      name: Joi.string(),
    },
    body: {},
  },
};
