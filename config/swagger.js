const swaggerApi = require('../server/api/api.swagger');

const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Node.js plug ang play REST API for mongo',
    // eslint-disable-next-line max-len
    description: `This as a plug ang play REST API for mongodb, is heavily based on RESTHEART.
      All Queryes will work the same way as [restheart](https://restheart.org/docs/).
      Fell free to adapt this code to suit your need.
      Also check out the repo containing the api boilerplate used in this project 
      [express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)
    `,
    termsOfService: '',
    contact: {
      name: 'Alon Mota',
      email: 'alon.mota.l@gmail.com',
      url: 'https://github.com/alonmota',
    },
    license: 'MIT',
  },
  servers: [{
    url: 'http://localhost:4040',
    description: 'Dev',
  },
  {
    url: 'https://your.prod.dir',
    description: 'Prod',
  }],
  paths: {
    '/api/': {
      get: swaggerApi.getCollections,
    },
    '/api/{collection}': {
      put: swaggerApi.createCollection,
      get: swaggerApi.listElementsFromCollection,
      post: swaggerApi.insertDocuments,
    },
    '/api/{collection}/{documentId}': {
      get: swaggerApi.getDocument,
      put: swaggerApi.replaceDocument,
      patch: swaggerApi.modifySingle,
      delete: swaggerApi.deleteDocument,
    },
    '/api/{collection}/*': {
      patch: swaggerApi.modifyMultiple,
      delete: swaggerApi.deleteDocuments,
    },
  },
};
module.exports = swaggerDocument;
