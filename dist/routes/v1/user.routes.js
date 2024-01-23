"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("../../controllers/user.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/', _access["default"].authorizeRoles('ADMIN'), _user["default"].getAllUsers);
router.get('/:id', _access["default"].authorizeRoles('ADMIN'), _user["default"].getUserById);
router.put('/:id', _access["default"].authorizeRoles('ADMIN'), _user["default"].updateUser);
router["delete"]('/:id', _access["default"].authorizeRoles('ADMIN'), _user["default"].deleteUser);
var _default = exports["default"] = router;