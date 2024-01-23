"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _comment = _interopRequireDefault(require("../../controllers/comment.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all comments.
 * @name GET /v1/comments
 * @function
 * @memberof module:routes/v1/comment.routes
 * @param {string} role - The role of the user making the request.
 * @returns {Array} - An array of comments.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _comment["default"].getAllComments);

/**
 * Route for getting comments of a specific product.
 * @name GET /v1/comments/:id
 * @function
 * @memberof module:routes/v1/comment.routes
 * @param {string} id - The ID of the product.
 * @returns {Array} - An array of comments.
 */
router.get('/:id', _comment["default"].getCommentsOfOneProduct);

/**
 * Route for creating a new comment.
 * @name POST /v1/comments
 * @function
 * @memberof module:routes/v1/comment.routes
 * @returns {Object} - The created comment.
 */
router.post('/', _comment["default"].createComment);

/**
 * Route for deleting a comment.
 * @name DELETE /v1/comments/:id
 * @function
 * @memberof module:routes/v1/comment.routes
 * @param {string} id - The ID of the comment to delete.
 * @returns {Object} - The deleted comment.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _comment["default"].deleteComment);
var _default = exports["default"] = router;