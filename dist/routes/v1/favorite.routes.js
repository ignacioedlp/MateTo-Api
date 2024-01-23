"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _favorite = _interopRequireDefault(require("../../controllers/favorite.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * GET /api/v1/favorites
 * @description Get all favorites.
 * @route GET /api/v1/favorites
 * @group Favorites - Operations related to favorites
 * @returns {Array} 200 - An array of favorite items
 * @returns {Error}  500 - Unexpected error
 */
router.get('/', _favorite["default"].getFavorites);

/**
 * GET /api/v1/favorites/:id
 * @description Add an item to favorites.
 * @route GET /api/v1/favorites/:id
 * @group Favorites - Operations related to favorites
 * @param {string} id.path.required - The ID of the item to add to favorites
 * @returns {Object} 200 - The added favorite item
 * @returns {Error}  500 - Unexpected error
 */
router.get('/:id', _favorite["default"].addToFavorites);

/**
 * DELETE /api/v1/favorites/:id
 * @description Remove an item from favorites.
 * @route DELETE /api/v1/favorites/:id
 * @group Favorites - Operations related to favorites
 * @param {string} id.path.required - The ID of the item to remove from favorites
 * @returns {Object} 200 - The removed favorite item
 * @returns {Error}  500 - Unexpected error
 */
router["delete"]('/:id', _favorite["default"].removeFromFavorites);
var _default = exports["default"] = router;