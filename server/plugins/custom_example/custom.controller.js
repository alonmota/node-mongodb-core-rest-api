const httpStatus = require('http-status');
// var DbConnection = require('../../../config/mongo');
const APIError = require('../../helpers/APIError');
const logger = require('../../../config/winston');


const api = {  
  /**
  * Returns jwt token if valid username and password is provided
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async getGreet(req, res, next) {
    let name = req.query.name
    if (name === 'Error') {
      logger.error('An error has ocurred');
      return next(new APIError('Unable to greet Error'))
    }
    // Acess database
    // const db = await DbConnection.Get();
    // const collection = await db.collection(collectionName);
      
    return res.status(httpStatus.OK).send(`Hello${name ? ` ${name}`: ''}`);
  },
  
};

module.exports = api;
