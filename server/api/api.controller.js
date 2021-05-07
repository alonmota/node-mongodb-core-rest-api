const httpStatus = require('http-status');
var ObjectID = require('mongodb').ObjectID;   
const APIError = require('../helpers/APIError');
var DbConnection = require('../../config/mongo');
const { EJSON } = require('bson');

const api = {

  /**
  * Respond to clint with a list of collections on the database
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async getCollections(req, res, next) {
    try {
      let db = await DbConnection.Get();
      let result = await db.listCollections().toArray();
      result = result
        .filter(x => !x.name.startsWith('_'))
        .map(x => x.name);
      res.status(httpStatus.OK);
      res.setHeader('X-Total-Count', result.length);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },

  /**
  * Respond to clint a list of documents in a provided collection on the database
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async listElementsFromCollection(req, res, next) {
    const collectionName = req.params.collection;
    const pageSize = Math.min(1000, parseInt(req.query.pageSize || 100));
    const page = parseInt(req.query.page || 0);
    let sort;
    let filter;
    let projection;
    try {
      filter = EJSON.deserialize(req.query.filter || {});
    } catch (error) {
      return next(new APIError("Unable to deserialize param filter"));
    }
    try {
      sort = EJSON.deserialize(req.query.sort || {"_id": 1});
    } catch (error) {
      return next(new APIError("Unable to deserialize param sort"));
    }
    try {
      projection = EJSON.deserialize(req.query.keys || {});
    } catch (error) {
      return next(new APIError("Unable to deserialize param projection"));
    }
    try {
      const db = await DbConnection.Get();
      const collection = await db.collection(collectionName);
      let query = collection
        .find(filter)
        .project(projection)
        .sort( sort )
        .skip( page * pageSize )
        .limit( pageSize );
      let result = await query.toArray();
      let count = await query.count();
      res.setHeader('X-Total-Count', count);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },

  /**
  * Respond to clint a specific document from the provided collection
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async getDocument(req, res, next) {
    const collectionName = req.params.collection;
    let documentId = null;
    try {
      documentId = new ObjectID(req.params.documentId);
    } catch (error) {
      // In case id is not an ObjectId
      documentId = req.params.documentId;
    }
    try {
      const db = await DbConnection.Get();
      const collection = await db.collection(collectionName);
      let result = await collection.findOne({_id: documentId});
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },

  /**
  * Insert documents to a collection
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async insertDocuments(req, res, next) {
    const collectionName = req.params.collection;
    const payload = EJSON.deserialize(req.body);
    
    if (payload !== null) {
      try {
        const db = await DbConnection.Get();
        const collection = await db.collection(collectionName);
        const result = await collection.insert(payload);
        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }
  },

  /**
  * Replace or insert a document without duplications
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async replaceDocument(req, res, next) {
    const collectionName = req.params.collection;
    let documentId = null;
    try {
      documentId = new ObjectID(req.params.documentId);
    } catch (error) {
      // In case id is not an OnjectId
      documentId = req.params.documentId;
    }
    const payload = EJSON.deserialize(req.body);
    
    if (payload !== null) {
      try {
        const db = await DbConnection.Get();
        const collection = await db.collection(collectionName);
        const result = await collection.replaceOne({_id: documentId}, payload, {upsert: true});
        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }
  },

  

  /**
  * Creates a collection on the database
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async createCollection(req, res, next) {
    const collectionName = req.params.collection;
    
    try {
      const db = await DbConnection.Get();
      const collection = await db.createCollection(collectionName);
      return res.json(collection.collectionName);
    } catch (error) {
      return next(error);
    }
  },

  /**
  * Delete multiple documents from a collection
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async deleteDocuments(req, res, next) {
    const collectionName = req.params.collection;
    const filter = req.query.filter;

    try {
      const db = await DbConnection.Get();
      const collection = await db.collection(collectionName);
      const result = await collection.deleteMany(filter);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },

  /**
  * Delete one document from a collection
  * @param req
  * @param res
  * @param next
  * @returns {*}
  */
  async deleteDocument(req, res, next) {
    const collectionName = req.params.collection;
    let documentId = null;
    try {
      documentId = new ObjectID(req.params.documentId);
    } catch (error) {
      // In case id is not an ObjectId
      documentId = req.params.documentId;
    }

    try {
      const db = await DbConnection.Get();
      const collection = await db.collection(collectionName);
      const result = await collection.deleteOne({ _id: documentId });
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = api;
