"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.json({
    message: 'Status OK'
  });
});
var _default = exports["default"] = router;