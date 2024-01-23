"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.handler = exports.converter = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _expressValidation = _interopRequireDefault(require("express-validation"));
var _apiError = _interopRequireDefault(require("../config/errors/api-error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Error handler. Send stacktrace only during development
 * @public
 */
var handler = exports.handler = function handler(err, req, res) {
  var response = {
    code: err.status,
    message: err.message || _httpStatus["default"][err.status],
    errors: err.errors,
    stack: err.stack
  };
  if (process.env.NODE_ENV !== 'dev') {
    delete response.stack;
  }
  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
var converter = exports.converter = function converter(err, req, res) {
  var convertedError = err;
  if (err instanceof _expressValidation["default"].ValidationError) {
    convertedError = new _apiError["default"]({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack
    });
  } else if (!(err instanceof _apiError["default"])) {
    convertedError = new _apiError["default"]({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
var notFound = exports.notFound = function notFound(req, res) {
  var err = new _apiError["default"]({
    message: 'Not found',
    status: _httpStatus["default"].NOT_FOUND
  });
  return handler(err, req, res);
};