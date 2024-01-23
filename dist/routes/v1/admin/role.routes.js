"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _role = _interopRequireDefault(require("../../../controllers/admin/role.controller"));
var _access = _interopRequireDefault(require("../../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for getting all roles.
 * @name GET /v1/admin/roles
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.getAllRoles - Controller function for getting all roles.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN'), _role["default"].getAllRoles);

/**
 * Route for getting a role by ID.
 * @name GET /v1/admin/roles/:id
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.getRoleById - Controller function for getting a role by ID.
 */
router.get('/:id', _access["default"].authorizeRoles('ADMIN'), _role["default"].getRoleById);

/**
 * Route for updating a role.
 * @name PUT /v1/admin/roles/:id
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.updateRole - Controller function for updating a role.
 */
router.put('/:id', _access["default"].authorizeRoles('ADMIN'), _role["default"].updateRole);

/**
 * Route for deleting a role.
 * @name DELETE /v1/admin/roles/:id
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.deleteRole - Controller function for deleting a role.
 */
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN'), _role["default"].deleteRole);

/**
 * Route for creating a new role.
 * @name POST /v1/admin/roles
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.createRole - Controller function for creating a new role.
 */
router.post('/', _access["default"].authorizeRoles('ADMIN'), _role["default"].createRole);
var _default = exports["default"] = router;