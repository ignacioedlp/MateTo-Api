"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _vendor = _interopRequireDefault(require("../../controllers/vendor.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/', _vendor["default"].getAllVendors);
router.get('/:id', _vendor["default"].getVendorById);
var _default = exports["default"] = router;