"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _discount = _interopRequireDefault(require("../../controllers/discount.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * GET /api/v1/discounts
 * @description Get all discounts.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts
 * @function
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _discount["default"].getAllDiscounts);

/**
 * GET /api/v1/discounts/product/:id
 * @description Get all discounts by product ID.
 * @param {string} id - The ID of the product.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts/product/:id
 * @function
 */
router.get('/product/:id', _discount["default"].getAllDiscountsByProduct);

/**
 * GET /api/v1/discounts/vendor
 * @description Get all discounts by vendor.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts/vendor
 * @function
 */
router.get('/vendor', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _discount["default"].getDiscountsByVendor);

/**
 * GET /api/v1/discounts/:id
 * @description Get a discount by ID.
 * @param {string} id - The ID of the discount.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts/:id
 * @function
 */
router.get('/:id', _discount["default"].getDiscountById);

/**
 * POST /api/v1/discounts
 * @description Create a new discount.
 * @access Private (requires authentication)
 * @memberof module:routes/v1/discount.routes
 * @name POST/api/v1/discounts
 * @function
 */
router.post('/', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _discount["default"].createDiscount);

/**
 * PUT /api/v1/discounts/:id
 * @description Update a discount by ID.
 * @param {string} id - The ID of the discount.
 * @access Private (requires authentication)
 * @memberof module:routes/v1/discount.routes
 * @name PUT/api/v1/discounts/:id
 * @function
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _discount["default"].updateDiscount);

/**
 * DELETE /api/v1/discounts/:id
 * @description Delete a discount by ID.
 * @param {string} id - The ID of the discount.
 * @access Private (requires authentication)
 * @memberof module:routes/v1/discount.routes
 * @name DELETE/api/v1/discounts/:id
 * @function
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _discount["default"].deleteDiscount);
var _default = exports["default"] = router;