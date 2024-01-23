"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productType = _interopRequireDefault(require("../../../controllers/admin/productType.controller"));
var _access = _interopRequireDefault(require("../../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all product types.
 * @name GET /v1/admin/productTypes
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of product types.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _productType["default"].getAllProductTypes);

/**
 * Route for getting a specific product type by its ID.
 * @name GET /v1/admin/productTypes/:id
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product type to retrieve.
 * @returns {Object} - The product type object.
 */
router.get('/:id', _access["default"].authorizeRoles('ADMIN'), _productType["default"].getProductTypeById);

/**
 * Route for updating a specific product type.
 * @name PUT /v1/admin/productTypes/:id
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product type to update.
 * @returns {Object} - The updated product type object.
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN'), _productType["default"].updateProductType);

/**
 * Route for deleting a specific product type.
 * @name DELETE /v1/admin/productTypes/:id
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product type to delete.
 * @returns {Object} - The deleted product type object.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN'), _productType["default"].deleteProductType);

/**
 * Route for creating a new product type.
 * @name POST /v1/admin/productTypes
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Object} - The created product type object.
 */
router.post('/', _access["default"].authorizeRoles('ADMIN'), _productType["default"].createProductType);
var _default = exports["default"] = router;