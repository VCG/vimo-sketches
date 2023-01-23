"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function InfoButton(props) {
  return /*#__PURE__*/_react.default.createElement(_material.Fab, {
    hidden: props.hidden,
    variant: "extended",
    size: "small",
    disabled: props.disabled,
    color: props.color,
    sx: {
      ml: "0.5rem",
      mb: "0.7rem"
    }
  }, props.icon, props.disabled ? "" : props.text);
}
var _default = InfoButton;
exports.default = _default;