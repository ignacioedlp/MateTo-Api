"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _size = _interopRequireDefault(require("../../../controllers/admin/size.controller"));
var _access = _interopRequireDefault(require("../../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all sizes.
 * @name GET /v1/admin/sizes
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of all sizes.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _size["default"].getAllSizes);

/**
 * Route for getting a size by its ID.
 * @name GET /v1/admin/sizes/:id
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the size to retrieve.
 * @returns {Object} - The size object with the specified ID.
 */
router.get('/:id', _access["default"].authorizeRoles('ADMIN'), _size["default"].getSizeById);

/**
 * Route for updating a size.
 * @name PUT /v1/admin/sizes/:id
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the size to update.
 * @returns {Object} - The updated size object.
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN'), _size["default"].updateSize);

/**
 * Route for deleting a size.
 * @name DELETE /v1/admin/sizes/:id
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the size to delete.
 * @returns {Object} - The deleted size object.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN'), _size["default"].deleteSize);

/**
 * Route for creating a new size.
 * @name POST /v1/admin/sizes
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Object} - The newly created size object.
 */
router.post('/', _access["default"].authorizeRoles('ADMIN'), _size["default"].createSize);
var _default = exports["default"] = router;