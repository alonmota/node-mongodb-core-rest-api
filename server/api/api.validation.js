const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // GET /
  getCollections: {
    params: {},
    query: {},
    body: {},
  },
  
  // PUT /:collection
  createCollection: {
    params: {
      collection: Joi.string()
        .lowercase()
        .required(),
    },
    query: {},
    body: {},
  },
  
  // GET /:collection
  listElementsFromCollection: {
    params: {
      collection: Joi.string().required(),
    },
    query: {
      pageSize: Joi.number()
        .integer()
        .min(1)
        .max(1000),
      page: Joi.number()
        .integer()
        .min(1),
      sort: Joi.object(),
      filter: Joi.object(),
      keys: Joi.object(),
    },
    body: {},
  },
  
  // POST /:collection
  insertDocuments: {
    params: {
      collection: Joi.string().required(),
    },
    query: {},
  },
  
  // GET /:collection/:documentId
  getDocument: {
    params: {
      collection: Joi.string().required(),
      documentId: Joi.string().required(),
    },
    query: {},
    body: {},
  },
  
  // PUT /:collection/:documentId
  replaceDocument: {
    params: {
      collection: Joi.string().required(),
      documentId: Joi.string().required(),
    },
    query: {},
    body: Joi.object().required(),
  },

  // PATCH /:collection/*
  modifyMultiple: {
    params: {
      collection: Joi.string().required(),
    },
    query: {
      filter: Joi.object().required(),
    },
    body: Joi.object().required(),
  },
  
  // PATCH /:collection/:documentId
  modifySingle: {
    params: {
      collection: Joi.string().required(),
      documentId: Joi.string().required(),
    },
    query: {},
    body: Joi.object().required(),
  },

  // DELETE /:collection/*
  deleteDocuments: {
    params: {
      collection: Joi.string().required(),
    },
    query: {
      filter: Joi.object().required(),
    },
    body: {},
  },

  // DELETE /:collection/:documentId
  deleteDocument: {
    params: {
      collection: Joi.string().required(),
      documentId: Joi.string().required(),
    },
    query: {},
    body: {},
  },
};
