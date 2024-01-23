"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _swagger = _interopRequireDefault(require("./config/swagger.json"));
var _v = _interopRequireDefault(require("./routes/v1"));
var _webhooks = _interopRequireDefault(require("./routes/webhooks"));
var error = _interopRequireWildcard(require("./middlewares/error.middleware"));
var _logger = _interopRequireDefault(require("./config/logger"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use((0, _cors["default"])());
// enable files upload
app.use((0, _expressFileupload["default"])());
// request logging. dev: console | production: file
app.use((0, _morgan["default"])('dev'));
// secure apps by setting various HTTP headers
app.use((0, _helmet["default"])());

// cors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Built-In Middleware

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// * Routes * //

app.use('/api/v1/health', _v["default"].health);
app.use('/api/v1/settings', _v["default"].info);
app.use('/api/v1/cart', _v["default"].cart);
app.use('/api/v1/auth', _v["default"].auth);
app.use('/api/v1/comments', _v["default"].comment);
app.use('/api/v1/discounts', _v["default"].discount);
app.use('/api/v1/favorites', _v["default"].favorite);
app.use('/api/v1/colors', _v["default"].color);
app.use('/api/v1/products', _v["default"].product);
app.use('/api/v1/users', _v["default"].user);
app.use('/api/v1/productCategories', _v["default"].productCategory);
app.use('/api/v1/productTypes', _v["default"].productType);
app.use('/api/v1/profile', _v["default"].profile);
app.use('/api/v1/purchases', _v["default"].purchases);
app.use('/api/v1/roles', _v["default"].role);
app.use('/api/v1/ratings', _v["default"].rating);
app.use('/api/v1/vendors', _v["default"].vendor);
app.use('/api/v1/sizes', _v["default"].size);
app.use('/api/v1/users', _v["default"].user);
app.use('/api/v1/orders', _v["default"].order);
app.use('/api/v1/analytics', _v["default"].analytic);

//
app.use('/webhooks/payments', _webhooks["default"].payments);
app.use('/api-docs/v1', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

// * Start * //

var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  return _logger["default"].info("server started on port ".concat(PORT, " (").concat(process.env.NODE_ENV, ")"));
});