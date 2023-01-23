"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Banner = _interopRequireDefault(require("./components/Banner"));
var _PanelView = _interopRequireDefault(require("./views/PanelView"));
var _GlobalContext = require("./contexts/GlobalContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Sketch(props) {
  // Wrap things in context that can use global context
  var token = props.token;
  return /*#__PURE__*/_react.default.createElement(_GlobalContext.ContextWrapper, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Banner.default, null), /*#__PURE__*/_react.default.createElement(_PanelView.default, {
    token: token
  })))
  // <span>testtesttest</span>
  ;
}
var _default = Sketch;
exports.default = _default;