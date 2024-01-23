"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _profile = _interopRequireDefault(require("../../controllers/profile.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get('/', _profile["default"].getProfile);
router.put('/', _profile["default"].updateProfile);
var _default = exports["default"] = router;