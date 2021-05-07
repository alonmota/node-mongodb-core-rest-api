// const request = require('supertest-as-promised');
// const httpStatus = require('http-status');
const chai = require('chai');
// const expect = chai.expect;
// const app = require('../../../index');

chai.config.includeStack = true;

describe('## Core API', () => {
  describe('GET / - List all collections', function () {
    it('Should return empty list if no collections are present');
    it('Should return a string with the names of the collections when at least one exists');
    it('Should not return underline prepended collections');
  });
  describe('PUT /:collection - Create a collection on the database.', function () {
    it('Should create a collection if a collection with that name does not exists');
    it('Should return an erro if collection with name already created');
  });
  describe('GET /:collection - List documents in collection', function () {
    it('Should return an empty list if no records exist');
    it('Should return a paginated list of documents');
    it('Should respond to params page and pageSize');
    it('Should respond to params filter');
    it('Should respond to params sort');
    it('Should respond to params keys');
    it('Should return erro on any of the params invalid');
  });
  describe('POST /:collection - Insert one/many documents', function () {
    it('Should insert one document if insert body is object');
    it('Should insert all documents if insert body is array of object');
  });
  describe('GET /:collection/:documentId - Get specific document', function () {
    it('Should return the document if exists');
    it('Should return an error 401 if document does not exists');
  });
  describe('PUT /:collection/:documentId - Replace a document', function () {
    it('Should create document with specified documentId');
    it('Should create replace document if specified documentId already exists');
  });
  describe('PATCH /:collection/* - Modify multiple documents', function () {
    it('Should modify all documents that match filter');
    it('Should not modify documents that do not match filter');
    it('Should return error if filter is invalid');
    it('Should require filter if none is present');
  });
  describe('PATCH /:collection/:documentId - Modify a document', function () {
    it('Should modify a document by given id');
    it('Should not modify any other documents');
    it('Should return error 401 if documentId does not exists');
  });
  describe('DELETE /:collection/* - Delete multiple documents', function () {
    it('Should delete all documents that match filter');
    it('Should require filter');
    it('Should return error if filter is invalid');
    it('Should not delete documents that do not match filter');
  });
  describe('DELETE /:collection/:documentId - Delete a document', function () {
    it('Should delete document that matches documentId');
    it('Should not delete any other document');
    it('Should return erro 401 if documentId does not exists');
  });
});
