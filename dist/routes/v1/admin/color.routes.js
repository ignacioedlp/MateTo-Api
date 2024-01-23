"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _color = _interopRequireDefault(require("../../../controllers/admin/color.controller"));
var _access = _interopRequireDefault(require("../../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all colors.
 * @name GET /v1/admin/colors
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of color objects.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _color["default"].getAllColors);

/**
 * Route for getting a color by its ID.
 * @name GET /v1/admin/colors/:id
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the color to retrieve.
 * @returns {Object} - The color object.
 */
router.get('/:id', _access["default"].authorizeRoles('ADMIN'), _color["default"].getColorById);

/**
 * Route for updating a color.
 * @name PUT /v1/admin/colors/:id
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the color to update.
 * @returns {Object} - The updated color object.
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN'), _color["default"].updateColor);

/**
 * Route for deleting a color.
 * @name DELETE /v1/admin/colors/:id
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the color to delete.
 * @returns {Object} - The deleted color object.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN'), _color["default"].deleteColor);

/**
 * Route for creating a new color.
 * @name POST /v1/admin/colors
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @returns {Object} - The created color object.
 */
router.post('/', _access["default"].authorizeRoles('ADMIN'), _color["default"].createColor);
var _default = exports["default"] = router;