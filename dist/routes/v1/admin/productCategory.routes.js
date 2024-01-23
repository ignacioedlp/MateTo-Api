"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productCategory = _interopRequireDefault(require("../../../controllers/admin/productCategory.controller"));
var _access = _interopRequireDefault(require("../../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all product categories.
 * @name GET /v1/admin/product-categories
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of product categories.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _productCategory["default"].getAllProductCategories);

/**
 * Route for getting a specific product category by its ID.
 * @name GET /v1/admin/product-categories/:id
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product category to retrieve.
 * @returns {Object} - The product category object.
 */
router.get('/:id', _access["default"].authorizeRoles('ADMIN'), _productCategory["default"].getProductCategoryById);

/**
 * Route for updating a product category.
 * @name PUT /v1/admin/product-categories/:id
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product category to update.
 * @returns {Object} - The updated product category object.
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN'), _productCategory["default"].updateProductCategory);

/**
 * Route for deleting a product category.
 * @name DELETE /v1/admin/product-categories/:id
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product category to delete.
 * @returns {Object} - The deleted product category object.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN'), _productCategory["default"].deleteProductCategory);

/**
 * Route for creating a new product category.
 * @name POST /v1/admin/product-categories
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @returns {Object} - The created product category object.
 */
router.post('/', _access["default"].authorizeRoles('ADMIN'), _productCategory["default"].createProductCategory);
var _default = exports["default"] = router;