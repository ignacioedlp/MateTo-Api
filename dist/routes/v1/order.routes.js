"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
var _order = _interopRequireDefault(require("../../controllers/order.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _order["default"].getAllOrders);
var _default = exports["default"] = router;