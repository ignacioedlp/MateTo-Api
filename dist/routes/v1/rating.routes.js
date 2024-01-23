"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _rating = _interopRequireDefault(require("../../controllers/rating.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/', _access["default"].authorizeRoles('USER'), _rating["default"].createRating);
router.put('/:id', _access["default"].authorizeRoles('USER'), _rating["default"].updateRating);
var _default = exports["default"] = router;