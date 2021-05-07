// const request = require('supertest-as-promised');
// const httpStatus = require('http-status');
const chai = require('chai');
// const expect = chai.expect;
// const app = require('../../../index');

chai.config.includeStack = true;

describe('## Core API', () => {
  describe('GET /custom/greeting - Greet someone', function () {
    it('Should return hello with no params');
    it('Should return hello and the name with param name');
    it('Should return error with param name = Error');
  });
});
