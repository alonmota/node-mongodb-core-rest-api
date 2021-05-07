const express = require('express');
const ctrl = require('./api.controller');
const validate = require('express-validation');
const paramValidation = require('./api.validation');

const router = express.Router(); // eslint-disable-line new-cap

// router.post('*', validateSchema());
// router.put('*', validateSchema());
// router.patch('*', validateSchema());
  

/** GET / - List all collections */
router.get('/', validate(paramValidation.getCollections), ctrl.getCollections);

/** PUT /collection - Create a collection on the database. */
router.put('/:collection', validate(paramValidation.createCollection), ctrl.createCollection);

/** GET /collection - List documents from collection */
router.get('/:collection', validate(paramValidation.listElementsFromCollection), ctrl.listElementsFromCollection);

/** POST /collection - Insert one/many documents */
router.post('/:collection', validate(paramValidation.insertDocuments), ctrl.insertDocuments);

/** GET /collection/documentId - Get specific document */
router.get('/:collection/:documentId', validate(paramValidation.getDocument), ctrl.getDocument);

/** PUT /collection/documentId- Modify a document, The whole document is replaced with the request body. */
router.put('/:collection/:documentId', validate(paramValidation.replaceDocument), ctrl.replaceDocument);

/** PATCH /collection/* - Modify multiple documents, query parameter filter is mandatory */
// router.patch('/:collection/*', validate(paramValidation.modifyMultiple), ctrl.modifyMultiple);

/** PATCH /collection/documentId - Modify a document, Only the parameters in the request body are updated. */
// router.patch('/:collection/:documentId', validate(paramValidation.modifySingle), ctrl.modifySingle);

/** DELETE /collection/* - Delete multiple documents, query parameter filter is mandatory */
router.delete('/:collection/*', validate(paramValidation.deleteDocuments), ctrl.deleteDocuments);

/** DELETE /collection/documentId - Delete a document */
router.delete('/:collection/:documentId', validate(paramValidation.deleteDocument), ctrl.deleteDocument);

module.exports = router;
