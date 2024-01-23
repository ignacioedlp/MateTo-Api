"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _purchase = _interopRequireDefault(require("../../controllers/purchase.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all purchases.
 * @name GET /v1/purchases
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @param {string} role - The role of the user making the request.
 * @returns {Array} - An array of all purchases.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _purchase["default"].getAllPurchases);

/**
 * Route for getting all purchases of a specific vendor.
 * @name GET /v1/purchases/vendor/:id
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @param {string} role - The role of the user making the request.
 * @param {string} id - The ID of the vendor.
 * @returns {Array} - An array of all purchases of the specified vendor.
 */
router.get('/vendor/:id', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _purchase["default"].getAllProductsPurchasesOfOneVendor);

/**
 * Route for getting all purchases of a specific user.
 * @name GET /v1/purchases/user
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @returns {Array} - An array of all purchases made by the user.
 */
router.get('/user', _purchase["default"].getAllPurchasesOfOneUser);

/**
 * Route for getting a purchase by ID.
 * @name GET /v1/purchases/:id
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @param {string} role - The role of the user making the request.
 * @param {string} id - The ID of the purchase.
 * @returns {Object} - The purchase object.
 */
router.get('/:id', _access["default"].checkIfIsAuthorOrUserPurchase, _purchase["default"].getPurchaseById);

/**
 * Route for creating a new purchase.
 * @name POST /v1/purchases
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @returns {Object} - The created purchase object.
 */
router.post('/', _purchase["default"].createPurchase);
var _default = exports["default"] = router;