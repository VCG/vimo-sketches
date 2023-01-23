"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _MotifPanel = _interopRequireDefault(require("../components/MotifPanel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function PanelView(_ref) {
  var token = _ref.token;
  return /*#__PURE__*/_react.default.createElement(_MotifPanel.default, {
    token: token
  });
}
var _default = PanelView;
exports.default = _default;