"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _product = _interopRequireDefault(require("../../controllers/product.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all products.
 * @name GET /v1/products
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/', _product["default"].getAllProducts);

/**
 * Route for getting a product by its ID.
 * @name GET /v1/products/:id
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/:id', _product["default"].getProductById);

/**
 * Route for creating a new product.
 * @name POST /v1/products
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _product["default"].createProduct);

/**
 * Route for updating a product by its ID.
 * @name PUT /v1/products/:id
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _access["default"].checkIfIsTheSameVendorOrAdminProduct(), _product["default"].updateProduct);

/**
 * Route for deleting a product by its ID.
 * @name DELETE /v1/products/:id
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _access["default"].checkIfIsTheSameVendorOrAdminProduct(), _product["default"].deleteProduct);
var _default = exports["default"] = router;