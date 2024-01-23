"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _analytics = _interopRequireDefault(require("../../controllers/analytics.controller"));
var _access = _interopRequireDefault(require("../../middlewares/access.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();

/**
 * Route for retrieving analytics data.
 * @name GET /v1/analytics
 * @function
 * @memberof module:routes/v1/analytic.routes
 * @param {string} role - The role of the user making the request.
 * @returns {Object} The analytics data.
 */
router.get('/', _access["default"].authorizeRoles('ADMIN', 'VENDOR'), _analytics["default"].getAnalytics);
var _default = exports["default"] = router;