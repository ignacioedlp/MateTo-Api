"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _health = _interopRequireDefault(require("./health.routes"));
var _info = _interopRequireDefault(require("./info.routes"));
var _cart = _interopRequireDefault(require("./cart.routes"));
var _auth = _interopRequireDefault(require("./auth.routes"));
var _comment = _interopRequireDefault(require("./comment.routes"));
var _discount = _interopRequireDefault(require("./discount.routes"));
var _favorite = _interopRequireDefault(require("./favorite.routes"));
var _color = _interopRequireDefault(require("./admin/color.routes"));
var _product = _interopRequireDefault(require("./product.routes"));
var _user = _interopRequireDefault(require("./user.routes"));
var _productCategory = _interopRequireDefault(require("./admin/productCategory.routes"));
var _productType = _interopRequireDefault(require("./admin/productType.routes"));
var _profile = _interopRequireDefault(require("./profile.routes"));
var _purchase = _interopRequireDefault(require("./purchase.routes"));
var _role = _interopRequireDefault(require("./admin/role.routes"));
var _rating = _interopRequireDefault(require("./rating.routes"));
var _vendor = _interopRequireDefault(require("./vendor.routes"));
var _size = _interopRequireDefault(require("./admin/size.routes"));
var _order = _interopRequireDefault(require("./order.routes"));
var _analytic = _interopRequireDefault(require("./analytic.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = {
  health: _health["default"],
  info: _info["default"],
  cart: _cart["default"],
  auth: _auth["default"],
  comment: _comment["default"],
  discount: _discount["default"],
  favorite: _favorite["default"],
  color: _color["default"],
  product: _product["default"],
  user: _user["default"],
  productCategory: _productCategory["default"],
  productType: _productType["default"],
  profile: _profile["default"],
  purchases: _purchase["default"],
  role: _role["default"],
  rating: _rating["default"],
  vendor: _vendor["default"],
  size: _size["default"],
  order: _order["default"],
  analytic: _analytic["default"]
};