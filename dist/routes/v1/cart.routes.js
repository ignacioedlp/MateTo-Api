"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cart = _interopRequireDefault(require("../../controllers/cart.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * GET /api/v1/cart
 * @description Get the cart.
 * @route {GET} /api/v1/cart
 * @returns {Object} The cart object.
 */
router.get('/', _cart["default"].getCart);

/**
 * POST /api/v1/cart
 * @description Add an item to the cart.
 * @route {POST} /api/v1/cart
 * @returns {Object} The added item.
 */
router.post('/', _cart["default"].addToCart);

/**
 * DELETE /api/v1/cart/:id
 * @description Remove an item from the cart.
 * @route {DELETE} /api/v1/cart/:id
 * @param {string} id - The ID of the item to be removed.
 * @returns {Object} The removed item.
 */
router["delete"]('/:id', _cart["default"].removeFromCart);
var _default = exports["default"] = router;